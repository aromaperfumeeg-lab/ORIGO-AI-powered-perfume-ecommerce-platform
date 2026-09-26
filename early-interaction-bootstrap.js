(() => {
  "use strict";
  const targetFor = (node) => node?.closest?.("[data-action],button,input,select,textarea");
  const needsRuntime = (node) => {
    const target = targetFor(node);
    return Boolean(target && !target.matches("a[href]") && target.dataset.action);
  };
  const ensureCore = () => {
    if (window.__origoEarlyCorePromise) return window.__origoEarlyCorePromise;
    window.__origoEarlyCorePromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "chunks/storefront-core.min.js?v=63";
      script.async = true;
      script.onload = resolve;
      script.onerror = resolve;
      document.head.append(script);
    });
    return window.__origoEarlyCorePromise;
  };
  const revealSsrBrands = () => document.querySelectorAll(".brands-loading").forEach((node) => node.classList.remove("brands-loading"));
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", revealSsrBrands, { once: true });
  else revealSsrBrands();
  document.addEventListener("pointerdown", (event) => {
    if (needsRuntime(event.target)) ensureCore();
  }, { capture: true, passive: true });
  document.addEventListener("click", (event) => {
    const target = targetFor(event.target);
    if (!needsRuntime(target) || target.dataset.origoEarlyReplay === "1" || window.ORIGORuntime) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    target.dataset.origoEarlyReplay = "1";
    ensureCore().then(() => {
      if (target.isConnected) target.click();
      delete target.dataset.origoEarlyReplay;
    });
  }, { capture: true });
})();
