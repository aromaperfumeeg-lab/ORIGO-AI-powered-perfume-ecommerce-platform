import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  assertStorefrontSettingsBudget,
  externalizeStorefrontSettingsMedia,
  parseStorefrontDataImage,
  STOREFRONT_IMAGE_MAX_BYTES,
  STOREFRONT_SETTINGS_MAX_BYTES
} from "../storefront-media.mjs";

const server = await readFile(new URL("../server.mjs", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

function dataImage(bytes, mime = "image/webp") {
  return `data:${mime};base64,${Buffer.alloc(bytes, 7).toString("base64")}`;
}

test("legacy storefront data images externalize once and preserve their settings positions", async () => {
  const shared = dataImage(70_000);
  const settings = {
    homeMedia:[{ id:"hero", url:shared }],
    homeBenefitIcons:{ gift:shared },
    footerBenefits:[{ id:"gift", image:shared }],
    authenticityBadge:dataImage(14_000)
  };
  const persisted = [];
  const result = await externalizeStorefrontSettingsMedia(settings, async (image) => {
    persisted.push(image);
    return `/uploads/storefront/settings/settings-${image.hash.slice(0, 32)}.${image.extension}`;
  });
  assert.equal(result.changed, true);
  assert.equal(result.converted, 2);
  assert.equal(persisted.length, 2);
  assert.equal(result.settings.homeMedia[0].url, result.settings.homeBenefitIcons.gift);
  assert.equal(result.settings.footerBenefits[0].image, result.settings.homeMedia[0].url);
  assert.doesNotMatch(JSON.stringify(result.settings), /data:image\//);
  assert.equal(assertStorefrontSettingsBudget(result.settings) < STOREFRONT_SETTINGS_MAX_BYTES, true);
});

test("storefront media enforces the 100 KB file and settings budgets", () => {
  assert.equal(parseStorefrontDataImage(dataImage(STOREFRONT_IMAGE_MAX_BYTES)).bytes.length, STOREFRONT_IMAGE_MAX_BYTES);
  assert.throws(() => parseStorefrontDataImage(dataImage(STOREFRONT_IMAGE_MAX_BYTES + 1)), /STOREFRONT_IMAGE_REQUIRES_COMPRESSION/);
  assert.throws(() => assertStorefrontSettingsBudget({ image:dataImage(100) }), /STOREFRONT_SETTINGS_EMBEDDED_MEDIA/);
  assert.throws(() => assertStorefrontSettingsBudget({ copy:"x".repeat(STOREFRONT_SETTINGS_MAX_BYTES) }), /STOREFRONT_SETTINGS_BUDGET_EXCEEDED/);
});

test("storefront settings API migrates legacy media and new uploads store URLs only", () => {
  assert.match(server, /migrateWorkspaceStorefrontMedia\(getAdminWorkspaceState\(\)\)/);
  assert.match(server, /externalizeStorefrontSettingsMedia\(body\.state\?\.settings/);
  assert.match(server, /assertStorefrontSettingsBudget\(settings\)/);
  assert.match(server, /return `\/uploads\/storefront\/\$\{folder\}\/\$\{filename\}`/);
  assert.match(server, /flag: "wx"/);
  assert.match(app, /api\("\/api\/admin\/uploads\/storefront-image"/);
  assert.match(app, /encodedImageBytes\(result\) > 100 \* 1024/);
});

test("product summaries and lazy product detail deduplication remain enabled", () => {
  assert.match(server, /listProducts\(\{ limit, offset, summary: true \}\)/);
  assert.match(app, /const productDetailRequests = new Map\(\)/);
  assert.match(app, /productDetailRequests\.has\(product\.id\)/);
  assert.match(app, /api\(`\/api\/products\/\$\{encodeURIComponent\(product\.id\)\}`\)/);
});
