(() => {
  const route = window.location.pathname;
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

  const routeSpecific = routeScripts.filter((entry) => entry[1].test(route));
  routeSpecific.forEach(loadScript);

  const deferred = routeScripts.filter((entry) => !routeSpecific.includes(entry));
  const loadDeferred = () => deferred.forEach(loadScript);

  const scheduleDeferred = () => {
    if ("requestIdleCallback" in window) requestIdleCallback(loadDeferred, { timeout: 5000 });
    else setTimeout(loadDeferred, 1200);
  };
  // Starting every route bundle before `load` made the homepage navigation
  // wait for code that the visitor had not requested yet.
  if (document.readyState === "complete") scheduleDeferred();
  else window.addEventListener("load", scheduleDeferred, { once: true });
})();
