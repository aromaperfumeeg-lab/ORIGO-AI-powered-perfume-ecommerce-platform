/* Paged brand carousel: each mobile step replaces all four visible brands. */
(() => {
  const controllers = new WeakMap();
  const interval = (value) => Math.max(1, Math.min(120, Number(value) || 3)) * 1000;
  const indices = (length, start, size) => Array.from({ length:Math.min(length, size) }, (_, offset) => ((start + offset) % length + length) % length);
  function mount(track, items, seconds = 3) {
    controllers.get(track)?.destroy();
    const mobile = matchMedia("(max-width: 700px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const abort = new AbortController();
    let start = 0;
    let timer;
    let pointerX = null;
    let hovered = false;
    let focused = false;
    let delay = interval(seconds);
    const size = () => mobile.matches ? 4 : 12;
    const draw = (animate = false) => {
      track.classList.add("brand-paged-slider");
      track.innerHTML = `<div class="brand-slider-page">${indices(items.length, start, size()).map((index) => items[index]).join("")}</div>`;
      track.dataset.brandStart = String(start);
      if (animate && !reduced.matches) track.firstElementChild?.animate?.([{ opacity:0, transform:`translateX(${document.documentElement.dir === "rtl" ? "-" : ""}20px)` }, { opacity:1, transform:"translateX(0)" }], { duration:350, easing:"ease-out" });
    };
    const schedule = () => {
      clearTimeout(timer);
      if (items.length <= size() || reduced.matches || document.hidden || hovered || focused || pointerX !== null) return;
      timer = setTimeout(() => { if (track.isConnected && !track.closest("[hidden]") && !document.body.classList.contains("admin-mode")) step(1); else schedule(); }, delay);
    };
    const step = (direction) => {
      if (items.length > size()) start = ((start + direction * size()) % items.length + items.length) % items.length;
      draw(true);
      schedule();
    };
    const listen = (target, name, handler) => target.addEventListener(name, handler, { signal:abort.signal });
    listen(track, "pointerenter", (event) => { if (event.pointerType === "mouse") { hovered = true; schedule(); } });
    listen(track, "pointerleave", () => { hovered = false; schedule(); });
    listen(track, "focusin", () => { focused = true; schedule(); });
    listen(track, "focusout", (event) => { focused = track.contains(event.relatedTarget); schedule(); });
    listen(track, "pointerdown", (event) => { pointerX = event.clientX; schedule(); });
    listen(window, "pointerup", (event) => {
      if (pointerX === null) return;
      const delta = event.clientX - pointerX;
      pointerX = null;
      if (Math.abs(delta) > 35) { track.dataset.suppressBrandClick = "1"; step((delta < 0 ? 1 : -1) * (document.documentElement.dir === "rtl" ? -1 : 1)); setTimeout(() => delete track.dataset.suppressBrandClick, 0); }
      else schedule();
    });
    listen(window, "pointercancel", () => { pointerX = null; schedule(); });
    listen(document, "visibilitychange", schedule);
    listen(mobile, "change", () => { start = 0; draw(); schedule(); });
    listen(reduced, "change", schedule);
    const controller = { step, setInterval(value) { delay = interval(value); schedule(); }, destroy() { clearTimeout(timer); abort.abort(); } };
    controllers.set(track, controller);
    draw();
    schedule();
    return controller;
  }
  window.ORIGOBrandSlider = { mount, indices, interval, get: (track) => controllers.get(track) };
})();

/* Brand cards remain real navigation controls. */
document.addEventListener("click", (event) => {
  const target = event.target.closest(
    "#home-brand-carousel-track [data-action='brand-search'], #brand-carousel-track [data-action='brand-search'], #home-benefits-track [data-action='benefit-link']"
  );
  if (!target) return;
  if (target.closest(".brand-paged-slider")?.dataset.suppressBrandClick) { event.preventDefault(); event.stopImmediatePropagation(); return; }

  const brand = target.dataset.query?.trim();
  if (!brand) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.assign(`/search?q=${encodeURIComponent(brand)}`);
}, true);
