import assert from "node:assert/strict";
import test from "node:test";
import {
  createBostaDelivery,
  createPaymobIntention,
  dispatchPurchaseEvents,
  integrationStatus,
  sendEmailVerificationCode,
  sendWhatsAppTemplate
} from "../external-integrations.mjs";

test("unconfigured external providers stay disabled without network calls", async () => {
  const names = [
    "PAYMOB_SECRET_KEY", "PAYMOB_PUBLIC_KEY", "PAYMOB_INTEGRATION_IDS", "BOSTA_API_KEY",
    "WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_VERIFY_TOKEN",
    "META_PIXEL_ID", "META_CAPI_ACCESS_TOKEN", "TIKTOK_PIXEL_ID", "TIKTOK_ACCESS_TOKEN",
    "SNAP_PIXEL_ID", "SNAP_CAPI_ACCESS_TOKEN", "GOOGLE_ADS_DEVELOPER_TOKEN"
  ];
  const saved = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  names.forEach((name) => delete process.env[name]);
  try {
    const status = integrationStatus();
    assert.equal(status.paymob.configured, false);
    assert.equal(status.bosta.configured, false);
    assert.equal(status.whatsapp.configured, false);
    assert.equal(status.metaAds.configured, false);
    assert.equal(status.snapchatAds.configured, false);
    assert.equal(status.tiktokAds.configured, false);
    assert.equal(status.googleAds.configured, false);
    await assert.rejects(() => createPaymobIntention({}), /not configured/);
    await assert.rejects(() => createBostaDelivery({}), /not configured/);
    await assert.rejects(() => sendWhatsAppTemplate({}), /not configured/);
    const events = await dispatchPurchaseEvents({ orderNumber: "TEST", total: 10, phone: "201000000000" });
    assert.equal(events.every((event) => event.ok && event.result.skipped), true);
  } finally {
    names.forEach((name) => {
      if (saved[name] == null) delete process.env[name];
      else process.env[name] = saved[name];
    });
  }
});

test("email sending rejects malformed or ambiguous recipients before SMTP", async () => {
  const names = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
  const saved = Object.fromEntries(names.map((name) => [name, process.env[name]]));
  Object.assign(process.env, {
    SMTP_HOST:"smtp.example.com", SMTP_PORT:"465", SMTP_USER:"mailer@example.com",
    SMTP_PASS:"test-secret", SMTP_FROM:"ORIGO <mailer@example.com>"
  });
  try {
    await assert.rejects(() => sendEmailVerificationCode({ to:'"target@example.com"@internal.test', code:"123456" }), /Invalid email recipient/);
    await assert.rejects(() => sendEmailVerificationCode({ to:"first@example.com,second@example.com", code:"123456" }), /Invalid email recipient/);
  } finally {
    names.forEach((name) => {
      if (saved[name] == null) delete process.env[name];
      else process.env[name] = saved[name];
    });
  }
});
