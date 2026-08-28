(() => {
  "use strict";
  const promises = new Map();
  const cssPromises = new Map();
  const assets = {
    admin:["chunks/admin-runtime.min.js?v=10"],
    productEditor:["chunks/product-editor-runtime.min.js?v=5"],
    storefrontSettings:["chunks/storefront-settings-runtime.min.js?v=6"],
    finder:["fragrance-finder-engine.js?v=2","fragrance-finder-i18n.js?v=3","fragrance-finder.js?v=5"]
  };

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

  async function load(name) {
    if (["admin", "productEditor", "storefrontSettings"].includes(name)) {
      const template = document.querySelector("#admin-runtime-template");
      if (template) {
        document.body.insertBefore(template.content.cloneNode(true), template);
        template.remove();
      }
    }
    if (name === "admin") await Promise.all([style("admin-ui-fixes.css?v=9"), style("admin-order-center.css?v=1")]);
    if (name === "productEditor") await style("product-editor-runtime.css?v=4");
    if (name === "storefrontSettings") await style("storefront-settings-runtime.css?v=4");
    if (name === "finder") await style("fragrance-finder.css?v=3");
    for (const src of assets[name] || []) await script(src);
  }

  window.ORIGORuntime = { load, loaded:promises };

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

  if (/^\/admin(?:\/|$)/.test(location.pathname)) load("admin");
  if (/^\/fragrance-finder(?:\/|$)/.test(location.pathname)) {
    load("finder").then(() => window.ORIGOFragranceFinder?.open(false));
  }
})();
