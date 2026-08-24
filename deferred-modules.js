(() => {
  "use strict";
  const loaded = new Set([...document.scripts].map((script) => script.src).filter(Boolean));
  const route = location.pathname;
  const routeScripts = [
    ["alternatives.js?v=7", /\/(?:alternatives|perfume)(?:\/|$)/],
    ["performance-insights.js?v=2", /\/performance(?:\/|$)/],
    ["commerce.js?v=3", /\/(?:cart|checkout|payment|track(?:ing)?|orders?)(?:\/|$)/],
    ["account.js?v=3", /\/(?:account|login|register|profile)(?:\/|$)/]
  ];
  const routeStyles = [
    ["catalog", /^\/(?:perfumes|search|brands)(?:\/|$)/],
    ["commerce", /^\/(?:cart|checkout|payment|track(?:ing)?|orders?)(?:\/|$)/],
    ["account", /^\/(?:account|login|register|profile)(?:\/|$)/],
    ["finder", /^\/fragrance-finder(?:\/|$)/],
    ["alternatives", /^\/alternatives(?:\/|$)/],
    ["performance", /^\/performance(?:\/|$)/]
  ];

  function loadScript(src, module = false) {
    const absolute = new URL(src, location.href).href;
    if (loaded.has(absolute)) return Promise.resolve();
    loaded.add(absolute);
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      if (module) script.type = "module";
      script.onload = script.onerror = resolve;
      document.body.append(script);
    });
  }

  function loadStyles(selector) {
    document.querySelectorAll(selector).forEach((placeholder) => {
      const href = placeholder.dataset.idleHref || placeholder.dataset.deferredHref || placeholder.dataset.adminHref || placeholder.dataset.routeHref;
      if (href && !placeholder.href) placeholder.href = href;
    });
  }

  function loadIdleScripts() {
    [...document.querySelectorAll("script[data-idle-src]")]
      .reduce((chain, placeholder) => chain.then(() => loadScript(placeholder.dataset.idleSrc)), Promise.resolve());
  }

  let knowledgePromise;
  function loadKnowledgeResources() {
    if (knowledgePromise) return knowledgePromise;
    knowledgePromise = [...document.querySelectorAll("script[data-knowledge-src]")]
      .reduce((chain, placeholder) => chain.then(() => loadScript(placeholder.dataset.knowledgeSrc)), Promise.resolve())
      .then(() => window.dispatchEvent(new Event("origo:knowledge-ready")));
    return knowledgePromise;
  }

  let finderPromise;
  function loadFinderResources() {
    if (finderPromise) return finderPromise;
    finderPromise = [...document.querySelectorAll("script[data-finder-src]")]
      .reduce((chain, placeholder) => chain.then(() => loadScript(placeholder.dataset.finderSrc)), Promise.resolve());
    return finderPromise;
  }

  function loadAdminResources() {
    loadStyles("link[data-admin-href],link[data-deferred-href]");
    document.querySelectorAll("script[data-admin-src]").forEach((placeholder) => loadScript(placeholder.dataset.adminSrc));
  }

  function prefetchLikelyRoutes() {
    const connection = navigator.connection;
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "")) return;
    routeScripts.filter((entry) => !entry[1].test(route)).forEach(([href]) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "script";
      link.href = href;
      document.head.append(link);
    });
  }

  routeScripts.filter((entry) => entry[1].test(route)).forEach(([src, , module]) => loadScript(src, module));
  routeStyles.filter((entry) => entry[1].test(route)).forEach(([id]) => loadStyles(`link[data-route="${id}"]`));
  if (new URL(location.href).searchParams.has("product")) loadStyles("link[data-deferred-href]");

  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest("[data-action],a[href]");
    const action = target?.dataset.action || "";
    const href = target?.getAttribute("href") || "";
    if (/admin|product-studio/.test(action)) loadAdminResources();
    if (/product|quick-view|note/.test(action) || /[?&]product=|\/notes(?:\/|$)/.test(href)) {
      loadStyles("link[data-deferred-href]");
      loadKnowledgeResources();
      if (/product|quick-view/.test(action) || /[?&]product=|\/perfume(?:\/|$)/.test(href)) loadScript("alternatives.js?v=7");
    }
    const match = routeScripts.find((entry) => entry[1].test(href));
    if (match) loadScript(match[0], match[2]);
    const styleMatch = routeStyles.find((entry) => entry[1].test(href));
    if (styleMatch) loadStyles(`link[data-route="${styleMatch[0]}"]`);
  }, { passive:true, capture:true });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action],a[href]");
    if (!target || target.dataset.knowledgeReady === "true") return;
    const action = target.dataset.action || "";
    const href = target.getAttribute("href") || "";
    if (!/open-product|quick-view|open-note|admin-notes/.test(action) && !/\/notes(?:\/|$)/.test(href)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    Promise.all([loadKnowledgeResources(), /open-product|quick-view/.test(action) ? loadScript("alternatives.js?v=7") : Promise.resolve()]).then(() => {
      target.dataset.knowledgeReady = "true";
      target.click();
      delete target.dataset.knowledgeReady;
    });
  }, true);

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action],a[href]");
    if (!target || target.dataset.finderReady === "true") return;
    const action = target.dataset.action || "";
    const href = target.getAttribute("href") || "";
    if (!/fragrance-finder|open-finder/.test(`${action} ${href}`)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    loadStyles('link[data-route="finder"]');
    loadFinderResources().then(() => {
      target.dataset.finderReady = "true";
      target.click();
      delete target.dataset.finderReady;
    });
  }, true);

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action || "";
    if (/admin|product-studio/.test(action)) loadAdminResources();
    if (/product|quick-view/.test(action)) loadStyles("link[data-deferred-href]");
  }, true);

  const afterLoad = () => {
    const idle = (callback, timeout) => "requestIdleCallback" in window
      ? requestIdleCallback(callback, { timeout })
      : setTimeout(callback, Math.min(timeout, 1500));
    idle(() => loadStyles("link[data-idle-href]"), 1200);
    idle(loadIdleScripts, 2600);
    idle(() => navigator.serviceWorker?.register("/sw.js").catch(() => {}), 6500);
  };
  if (/^\/fragrance-finder(?:\/|$)/.test(route)) loadFinderResources();
  if (new URL(location.href).searchParams.has("product") || /^\/notes(?:\/|$)/.test(route)) loadKnowledgeResources();
  if (document.readyState === "complete") afterLoad();
  else addEventListener("load", afterLoad, { once:true });
})();
