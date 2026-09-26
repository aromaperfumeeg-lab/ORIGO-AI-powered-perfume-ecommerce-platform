(() => {
  "use strict";
  const promises = new Map();
  const cssPromises = new Map();
  let adminTemplatePromise;
  const assets = {
    core:["chunks/storefront-core.min.js?v=63"],
    admin:["chunks/admin-runtime.min.js?v=11"],
    productEditor:["chunks/product-editor-runtime.min.js?v=7"],
    storefrontSettings:["chunks/storefront-settings-runtime.min.js?v=6"],
    finder:["fragrance-finder-engine.js?v=3","fragrance-finder-i18n.js?v=5","fragrance-finder.js?v=7"]
  };
  const foundationStyles = ["chunks/styles.min.css?v=16","chunks/home.min.css?v=8","chunks/shell.min.css?v=4","chunks/home-gender-slider.min.css?v=4","chunks/origo-identity.min.css?v=4","chunks/appearance.min.css?v=39"];

  function script(src) {
    if (promises.has(src)) return promises.get(src);
    const pending = new Promise((resolve, reject) => {
      const node = document.createElement("script");
      node.src = src;
      node.async = false;
      node.onload = resolve;
      node.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.append(node);
    });
    promises.set(src, pending);
    return pending;
  }

  function style(href) {
    if (cssPromises.has(href)) return cssPromises.get(href);
    const pending = new Promise((resolve, reject) => {
      const node = document.createElement("link");
      node.rel = "stylesheet";
      node.href = href;
      node.onload = resolve;
      node.onerror = reject;
      document.head.append(node);
    });
    cssPromises.set(href, pending);
    return pending;
  }

  async function ensureAdminTemplate() {
    const template = document.querySelector("#admin-runtime-template");
    if (!template || template.content.childElementCount) return template;
    if (!adminTemplatePromise) adminTemplatePromise = fetch(template.dataset.runtimeFragment || "/admin-runtime-fragment", { credentials:"same-origin" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Admin interface request failed (${response.status})`);
        template.innerHTML = await response.text();
        return template;
      })
      .catch((error) => { adminTemplatePromise = undefined; throw error; });
    return adminTemplatePromise;
  }

  async function load(name) {
    if (name === "core" && window.__origoEarlyCorePromise) {
      const earlyCore = window.__origoEarlyCorePromise;
      promises.set("chunks/storefront-core.min.js?v=63", earlyCore);
      return earlyCore;
    }
    if (name !== "core") await load("core");
    if (["admin", "productEditor", "storefrontSettings"].includes(name)) {
      const template = await ensureAdminTemplate();
      if (template) {
        document.body.insertBefore(template.content.cloneNode(true), template);
        template.remove();
      }
    }
    if (name === "admin") await Promise.all([...foundationStyles.map(style), style("admin-ui-fixes.css?v=9"), style("admin-order-center.css?v=1")]);
    if (name === "productEditor") await style("product-editor-runtime.css?v=4");
    if (name === "storefrontSettings") await style("storefront-settings-runtime.css?v=4");
    if (name === "finder") await style("fragrance-finder.css?v=3");
    for (const src of assets[name] || []) await script(src);
  }

  window.ORIGORuntime = { load, loaded:promises };

  const warmCore = (event) => {
    const target = event.target?.closest?.("[data-action],button,input,select,textarea");
    if (target) load("core").catch(() => {});
  };
  document.addEventListener("pointerover", warmCore, { passive:true, capture:true });
  document.addEventListener("pointerdown", warmCore, { passive:true, capture:true });
  document.addEventListener("focusin", warmCore, { passive:true, capture:true });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action],a[href]");
    if (!target || target.dataset.runtimeReady) return;
    const action = target.dataset.action || "";
    const href = target.getAttribute("href") || "";
    let runtime = "";
    if (/fragrance-finder|open-finder|find-matches/.test(`${action} ${href}`)) runtime = "finder";
    else if ((action === "admin-view" && ["products", "brands", "product-options", "benefits"].includes(target.dataset.view)) || /product-studio|catalog-product|save-catalog|admin-studio|smart-select|product-option|managed-brand|managed-benefit/.test(action)) runtime = "productEditor";
    else if (/admin-view/.test(action) && target.dataset.view === "settings") runtime = "storefrontSettings";
    else if (/admin/.test(action) || /^\/admin(?:\/|$)/.test(href)) runtime = "admin";
    if (!runtime && action && !target.matches("a[href]")) runtime = "core";
    if (!runtime) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const dependencies = runtime === "productEditor" ? [load("admin"), load("productEditor")] : runtime === "storefrontSettings" ? [load("admin"), load("storefrontSettings")] : [load(runtime)];
    Promise.all(dependencies).then(() => {
      target.dataset.runtimeReady = "1";
      target.click();
      // Assets stay loaded. Keep this marker across other loaders' async click replays.
    });
  }, true);

  document.addEventListener("submit", (event) => {
    if (promises.has("chunks/storefront-core.min.js?v=63")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = event.target;
    load("core").then(() => form.requestSubmit?.(event.submitter));
  }, true);

  if (/^\/admin(?:\/|$)/.test(location.pathname)) load("admin");
  if (/^\/fragrance-finder(?:\/|$)/.test(location.pathname)) {
    load("finder").then(() => window.ORIGOFragranceFinder?.open(false));
  }
})();
