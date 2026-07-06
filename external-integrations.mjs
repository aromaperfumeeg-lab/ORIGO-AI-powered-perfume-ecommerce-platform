import { createHash } from "node:crypto";

const value = (name) => String(process.env[name] || "").trim();
const configured = (...names) => names.every((name) => Boolean(value(name)));
const asList = (name) => value(name).split(",").map((item) => item.trim()).filter(Boolean);

async function requestJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(Number(process.env.ORIGO_INTEGRATION_TIMEOUT_MS || 12_000)),
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || payload.error?.message || `Provider returned ${response.status}.`);
    error.status = response.status;
    error.providerPayload = payload;
    throw error;
  }
  return payload;
}

const sha256 = (input) => createHash("sha256").update(String(input || "").trim().toLowerCase()).digest("hex");
const graphVersion = () => value("META_GRAPH_VERSION") || "v23.0";

export function integrationStatus() {
  return {
    paymob: {
      configured: configured("PAYMOB_SECRET_KEY", "PAYMOB_PUBLIC_KEY", "PAYMOB_INTEGRATION_IDS"),
      mode: value("PAYMOB_MODE") || "production"
    },
    bosta: {
      configured: configured("BOSTA_API_KEY"),
      mode: value("BOSTA_MODE") || "production"
    },
    whatsapp: {
      configured: configured("WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_VERIFY_TOKEN"),
      graphVersion: graphVersion()
    },
    metaAds: {
      configured: configured("META_PIXEL_ID", "META_CAPI_ACCESS_TOKEN"),
      browserPixel: Boolean(value("META_PIXEL_ID"))
    },
    googleAds: {
      configured: configured(
        "GOOGLE_ADS_DEVELOPER_TOKEN", "GOOGLE_ADS_CUSTOMER_ID", "GOOGLE_ADS_CONVERSION_ACTION_ID",
        "GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET", "GOOGLE_OAUTH_REFRESH_TOKEN"
      ),
      browserTag: Boolean(value("GOOGLE_ADS_TAG_ID"))
    },
    tiktokAds: {
      configured: configured("TIKTOK_PIXEL_ID", "TIKTOK_ACCESS_TOKEN"),
      browserPixel: Boolean(value("TIKTOK_PIXEL_ID"))
    },
    snapchatAds: {
      configured: configured("SNAP_PIXEL_ID", "SNAP_CAPI_ACCESS_TOKEN"),
      browserPixel: Boolean(value("SNAP_PIXEL_ID"))
    }
  };
}

export function publicTrackingConfig() {
  return {
    paymobAvailable: integrationStatus().paymob.configured,
    metaPixelId: value("META_PIXEL_ID"),
    googleTagId: value("GOOGLE_ADS_TAG_ID"),
    googleConversionLabel: value("GOOGLE_ADS_CONVERSION_LABEL"),
    tiktokPixelId: value("TIKTOK_PIXEL_ID"),
    snapchatPixelId: value("SNAP_PIXEL_ID")
  };
}

export async function createPaymobIntention(order, customer = {}) {
  if (!integrationStatus().paymob.configured) throw new Error("Paymob is not configured.");
  const base = value("PAYMOB_BASE_URL") || "https://accept.paymob.com";
  const items = (order.items || []).map((item) => ({
    name: item.productName,
    amount: Math.round(Number(item.lineTotal) * 100),
    description: item.sku || item.productName,
    quantity: Number(item.quantity)
  }));
  const [firstName, ...lastName] = String(order.customerName || customer.name || "ORIGO Customer").split(/\s+/);
  const payload = await requestJSON(`${base}/v1/intention/`, {
    method: "POST",
    headers: { Authorization: `Token ${value("PAYMOB_SECRET_KEY")}` },
    body: JSON.stringify({
      amount: Math.round(Number(order.total) * 100),
      currency: value("ORIGO_CURRENCY") || "EGP",
      payment_methods: asList("PAYMOB_INTEGRATION_IDS").map((id) => /^\d+$/.test(id) ? Number(id) : id),
      items,
      billing_data: {
        first_name: firstName,
        last_name: lastName.join(" ") || firstName,
        phone_number: order.phone,
        email: customer.email || "customer@origo.local",
        street: order.address,
        city: order.governorate,
        country: value("ORIGO_COUNTRY_CODE") || "EG"
      },
      customer: { first_name: firstName, last_name: lastName.join(" ") || firstName, email: customer.email || "" },
      special_reference: order.orderNumber,
      notification_url: `${value("ORIGO_PUBLIC_URL")}/api/webhooks/paymob`,
      redirection_url: `${value("ORIGO_PUBLIC_URL")}/?payment=complete`
    })
  });
  return {
    id: payload.id,
    clientSecret: payload.client_secret,
    checkoutUrl: `${base}/unifiedcheckout/?publicKey=${encodeURIComponent(value("PAYMOB_PUBLIC_KEY"))}&clientSecret=${encodeURIComponent(payload.client_secret)}`
  };
}

export async function createBostaDelivery(order) {
  if (!integrationStatus().bosta.configured) throw new Error("Bosta is not configured.");
  const base = value("BOSTA_BASE_URL") || "https://app.bosta.co/api/v2";
  return requestJSON(`${base}/deliveries`, {
    method: "POST",
    headers: { Authorization: value("BOSTA_API_KEY") },
    body: JSON.stringify({
      type: 10,
      specs: { packageType: "Parcel", size: "SMALL", packageDetails: { itemsCount: (order.items || []).length } },
      notes: order.notes || "",
      cod: order.paymentStatus === "paid" ? 0 : Number(order.total),
      dropOffAddress: {
        city: order.governorate,
        zone: order.governorate,
        district: order.governorate,
        firstLine: order.address
      },
      receiver: { firstName: order.customerName, phone: order.phone },
      businessReference: order.orderNumber
    })
  });
}

export async function sendWhatsAppTemplate({ to, template, language = "ar", parameters = [] }) {
  if (!integrationStatus().whatsapp.configured) throw new Error("WhatsApp is not configured.");
  return requestJSON(`https://graph.facebook.com/${graphVersion()}/${value("WHATSAPP_PHONE_NUMBER_ID")}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${value("WHATSAPP_ACCESS_TOKEN")}` },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: String(to).replace(/[^\d]/g, ""),
      type: "template",
      template: {
        name: template,
        language: { code: language },
        components: parameters.length ? [{
          type: "body",
          parameters: parameters.map((text) => ({ type: "text", text: String(text) }))
        }] : undefined
      }
    })
  });
}

export async function sendMetaPurchase(order, context = {}) {
  if (!integrationStatus().metaAds.configured) return { skipped: true };
  const eventId = context.eventId || `purchase-${order.orderNumber}`;
  return requestJSON(`https://graph.facebook.com/${graphVersion()}/${value("META_PIXEL_ID")}/events?access_token=${encodeURIComponent(value("META_CAPI_ACCESS_TOKEN"))}`, {
    method: "POST",
    body: JSON.stringify({
      data: [{
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: context.url || value("ORIGO_PUBLIC_URL"),
        user_data: {
          ph: [sha256(order.phone)],
          em: context.email ? [sha256(context.email)] : undefined,
          client_ip_address: context.ip,
          client_user_agent: context.userAgent
        },
        custom_data: { currency: value("ORIGO_CURRENCY") || "EGP", value: Number(order.total), order_id: order.orderNumber }
      }],
      test_event_code: value("META_TEST_EVENT_CODE") || undefined
    })
  });
}

export async function sendTikTokPurchase(order, context = {}) {
  if (!integrationStatus().tiktokAds.configured) return { skipped: true };
  return requestJSON(value("TIKTOK_EVENTS_URL") || "https://business-api.tiktok.com/open_api/v1.3/event/track/", {
    method: "POST",
    headers: { "Access-Token": value("TIKTOK_ACCESS_TOKEN") },
    body: JSON.stringify({
      event_source: "web",
      event_source_id: value("TIKTOK_PIXEL_ID"),
      data: [{
        event: "Purchase",
        event_id: context.eventId || `purchase-${order.orderNumber}`,
        event_time: Math.floor(Date.now() / 1000),
        user: { phone: sha256(order.phone), email: context.email ? sha256(context.email) : undefined },
        properties: { currency: value("ORIGO_CURRENCY") || "EGP", value: Number(order.total), order_id: order.orderNumber }
      }]
    })
  });
}

export async function sendSnapchatPurchase(order, context = {}) {
  if (!integrationStatus().snapchatAds.configured) return { skipped: true };
  return requestJSON(`https://tr.snapchat.com/v3/${value("SNAP_PIXEL_ID")}/events?access_token=${encodeURIComponent(value("SNAP_CAPI_ACCESS_TOKEN"))}`, {
    method: "POST",
    body: JSON.stringify({
      data: [{
        event_name: "PURCHASE",
        event_time: Math.floor(Date.now() / 1000),
        event_id: context.eventId || `purchase-${order.orderNumber}`,
        action_source: "WEB",
        event_source_url: context.url || value("ORIGO_PUBLIC_URL"),
        user_data: {
          ph: [sha256(order.phone)],
          em: context.email ? [sha256(context.email)] : undefined,
          client_ip_address: context.ip,
          client_user_agent: context.userAgent,
          sc_click_id: context.scClickId
        },
        custom_data: {
          currency: value("ORIGO_CURRENCY") || "EGP",
          value: Number(order.total),
          transaction_id: order.orderNumber
        }
      }]
    })
  });
}

async function googleAccessToken() {
  const body = new URLSearchParams({
    client_id: value("GOOGLE_OAUTH_CLIENT_ID"),
    client_secret: value("GOOGLE_OAUTH_CLIENT_SECRET"),
    refresh_token: value("GOOGLE_OAUTH_REFRESH_TOKEN"),
    grant_type: "refresh_token"
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(12_000)
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error_description || "Google OAuth failed.");
  return payload.access_token;
}

export async function sendGooglePurchase(order, context = {}) {
  if (!integrationStatus().googleAds.configured || !context.gclid) return { skipped: true };
  const customerId = value("GOOGLE_ADS_CUSTOMER_ID").replaceAll("-", "");
  const token = await googleAccessToken();
  return requestJSON(`https://googleads.googleapis.com/v24/customers/${customerId}:uploadClickConversions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "developer-token": value("GOOGLE_ADS_DEVELOPER_TOKEN"),
      ...(value("GOOGLE_ADS_LOGIN_CUSTOMER_ID") ? { "login-customer-id": value("GOOGLE_ADS_LOGIN_CUSTOMER_ID").replaceAll("-", "") } : {})
    },
    body: JSON.stringify({
      conversions: [{
        gclid: context.gclid,
        conversionAction: `customers/${customerId}/conversionActions/${value("GOOGLE_ADS_CONVERSION_ACTION_ID")}`,
        conversionDateTime: new Date().toISOString().replace("T", " ").replace("Z", "+00:00"),
        conversionValue: Number(order.total),
        currencyCode: value("ORIGO_CURRENCY") || "EGP",
        orderId: order.orderNumber,
        consent: { adUserData: "GRANTED", adPersonalization: "GRANTED" }
      }],
      partialFailure: true
    })
  });
}

export async function dispatchPurchaseEvents(order, context = {}) {
  const eventId = context.eventId || `purchase-${order.orderNumber}`;
  const results = await Promise.allSettled([
    sendMetaPurchase(order, { ...context, eventId }),
    sendTikTokPurchase(order, { ...context, eventId }),
    sendSnapchatPurchase(order, { ...context, eventId }),
    sendGooglePurchase(order, { ...context, eventId })
  ]);
  return results.map((result, index) => ({
    provider: ["meta", "tiktok", "snapchat", "google"][index],
    ok: result.status === "fulfilled",
    result: result.status === "fulfilled" ? result.value : undefined,
    error: result.status === "rejected" ? result.reason.message : undefined
  }));
}
