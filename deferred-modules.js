(() => {
  const routeScripts = [
    ["alternatives.js?v=3", /\/alternatives(?:\/|$)/],
    ["performance-insights.js?v=2", /\/performance(?:\/|$)/],
    ["commerce.js?v=2", /\/(?:cart|checkout|payment|track(?:ing)?|orders?)(?:\/|$)/],
    ["account.js?v=3", /\/(?:account|login|register|profile)(?:\/|$)/],
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

  const loadForCurrentRoute = () => {
    const route = window.location.pathname;
    routeScripts
      .filter((entry) => entry[1].test(route))
      .forEach(loadScript);
  };

  loadForCurrentRoute();

  window.addEventListener("popstate", loadForCurrentRoute);

  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    queueMicrotask(loadForCurrentRoute);
  };

  const originalReplaceState = history.replaceState;
  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    queueMicrotask(loadForCurrentRoute);
  };
})();
