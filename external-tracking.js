(() => {
  const CONSENT_KEY = "origoMarketingConsent";
  const ATTRIBUTION_KEY = "origoAttribution";
  let config = {};
  let initialized = false;

  function captureAttribution() {
    const params = new URLSearchParams(location.search);
    const previous = JSON.parse(localStorage.getItem(ATTRIBUTION_KEY) || "{}");
    const next = {
      ...previous,
      gclid: params.get("gclid") || previous.gclid || "",
      fbclid: params.get("fbclid") || previous.fbclid || "",
      ttclid: params.get("ttclid") || previous.ttclid || "",
      scClickId: params.get("ScCid") || params.get("sccid") || previous.scClickId || "",
      landingUrl: previous.landingUrl || location.href,
      capturedAt: new Date().toISOString()
    };
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
    return next;
  }

  function loadScript(src, id) {
    if (id && document.getElementById(id)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    if (id) script.id = id;
    document.head.appendChild(script);
  }

  function initMeta() {
    if (!config.metaPixelId || window.fbq) return;
    const fbq = window.fbq = function () { fbq.callMethod ? fbq.callMethod(...arguments) : fbq.queue.push(arguments); };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    loadScript("https://connect.facebook.net/en_US/fbevents.js", "origo-meta-pixel");
    fbq("init", config.metaPixelId);
    fbq("track", "PageView");
  }

  function initGoogleYouTube() {
    if (!config.googleTagId || window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.googleTagId)}`, "origo-google-tag");
    window.gtag("js", new Date());
    window.gtag("config", config.googleTagId);
  }

  function initTikTok() {
    if (!config.tiktokPixelId || window.ttq) return;
    const ttq = window.ttq = [];
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie"];
    ttq.setAndDefer = (target, method) => { target[method] = (...args) => target.push([method, ...args]); };
    ttq.methods.forEach((method) => ttq.setAndDefer(ttq, method));
    loadScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(config.tiktokPixelId)}&lib=ttq`, "origo-tiktok-pixel");
    ttq.page();
  }

  function initSnapchat() {
    if (!config.snapchatPixelId || window.snaptr) return;
    const snaptr = window.snaptr = function () { snaptr.handleRequest ? snaptr.handleRequest(...arguments) : snaptr.queue.push(arguments); };
    snaptr.queue = [];
    loadScript("https://sc-static.net/scevent.min.js", "origo-snap-pixel");
    snaptr("init", config.snapchatPixelId);
    snaptr("track", "PAGE_VIEW");
  }

  function initialize() {
    if (initialized || localStorage.getItem(CONSENT_KEY) !== "granted") return;
    initialized = true;
    initMeta();
    initGoogleYouTube();
    initTikTok();
    initSnapchat();
  }

  function renderConsent() {
    if (localStorage.getItem(CONSENT_KEY)) return initialize();
    const arabic = document.documentElement.lang === "ar";
    const banner = document.createElement("aside");
    banner.className = "marketing-consent";
    banner.innerHTML = `<p><b>${arabic ? "خصوصيتك أولاً" : "Your privacy comes first"}</b><span>${arabic ? "نستخدم أدوات قياس Facebook وInstagram وSnapchat وTikTok وYouTube بعد موافقتك فقط." : "We use Facebook, Instagram, Snapchat, TikTok, and YouTube measurement tools only with your consent."}</span></p><div><button data-consent="denied">${arabic ? "رفض" : "Reject"}</button><button data-consent="granted">${arabic ? "موافقة" : "Allow"}</button></div>`;
    banner.addEventListener("click", (event) => {
      const consent = event.target.closest("[data-consent]")?.dataset.consent;
      if (!consent) return;
      localStorage.setItem(CONSENT_KEY, consent);
      banner.remove();
      if (consent === "granted") initialize();
    });
    document.body.appendChild(banner);
  }

  async function boot() {
    captureAttribution();
    try {
      const response = await fetch("/api/integrations/public", { credentials: "same-origin" });
      if (response.ok) config = await response.json();
    } catch {}
    if (Object.values(config).some(Boolean)) renderConsent();
  }

  window.ORIGOTracking = {
    attribution: captureAttribution,
    consent(value) {
      localStorage.setItem(CONSENT_KEY, value === "granted" ? "granted" : "denied");
      initialize();
    },
    purchase(order) {
      if (!initialized || !order) return;
      const eventId = `purchase-${order.orderNumber}`;
      const payload = {
        value: Number(order.total),
        currency: "EGP",
        transaction_id: order.orderNumber,
        items: (order.items || []).map((item) => ({
          item_id: item.sku || item.productId,
          item_name: item.productName,
          price: Number(item.unitPrice),
          quantity: Number(item.quantity)
        }))
      };
      window.fbq?.("track", "Purchase", payload, { eventID: eventId });
      window.gtag?.("event", "purchase", payload);
      window.ttq?.track?.("CompletePayment", payload, { event_id: eventId });
      window.snaptr?.("track", "PURCHASE", { ...payload, transaction_id: eventId });
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
