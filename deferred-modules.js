(() => {
  const route = window.location.pathname;
  const routeScripts = [
    ["alternatives.js?v=2", /\/alternatives(?:\/|$)/],
    ["performance-insights.js?v=2", /\/performance(?:\/|$)/],
    ["commerce.js?v=2", /\/(?:cart|checkout|payment|track(?:ing)?|orders?)(?:\/|$)/],
    ["account.js?v=2", /\/(?:account|login|register|profile)(?:\/|$)/],
    ["fragrance-finder.js?v=1", /\/fragrance-finder(?:\/|$)/, true]
  ];

  const loadScript = ([src, , module]) => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    if (module) script.type = "module";
    document.body.append(script);
  };

  const routeSpecific = routeScripts.filter((entry) => entry[1].test(route));
  routeSpecific.forEach(loadScript);

  const deferred = routeScripts.filter((entry) => !routeSpecific.includes(entry));
  const loadDeferred = () => deferred.forEach(loadScript);

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadDeferred, { timeout: 3000 });
  } else {
    window.addEventListener("load", () => setTimeout(loadDeferred, 800), { once: true });
  }
})();
