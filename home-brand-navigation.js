/* Continuous brand rail: recycle existing cards without duplicate controls. */
(() => {
  const controllers = new WeakMap();
  const interval = (value) => Math.max(1, Math.min(120, Number(value) || 3)) * 1000;
  const indices = (length, start, size) => Array.from({ length:Math.min(length, size) }, (_, offset) => ((start + offset) % length + length) % length);
  function mount(track, items, seconds = 3) {
    controllers.get(track)?.destroy();
    const mobile = matchMedia("(max-width: 700px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const abort = new AbortController();
    let frame;
    let previous = 0;
    let offset = 0;
    let pitch = 1;
    let pointerX = null;
    let hovered = false;
    let focused = false;
    let delay = interval(seconds);
    const sign = () => document.documentElement.dir === "rtl" ? -1 : 1;
    const measure = () => {
      const gap = mobile.matches ? 12 : 20;
      const size = mobile.matches ? 4.5 : 13;
      const width = Math.max(44, (track.clientWidth - gap * (Math.ceil(size) - 1)) / size);
      track.style.setProperty("--brand-card-width", `${width}px`);
      pitch = width + gap;
      offset = Math.abs(track.scrollLeft);
    };
    track.classList.remove("brand-paged-slider");
    track.classList.add("brand-continuous-track");
    track.innerHTML = items.join("");
    const move = (distance) => {
      offset = Math.abs(track.scrollLeft) + distance;
      while (offset >= pitch && track.children.length > 1) { track.append(track.firstElementChild); offset -= pitch; }
      while (offset < 0 && track.children.length > 1) { track.prepend(track.lastElementChild); offset += pitch; }
      track.scrollLeft = sign() * offset;
    };
    const tick = (now) => {
      const elapsed = previous ? Math.min(50, now - previous) : 0;
      previous = now;
      if (track.isConnected && !track.closest("[hidden]") && !document.body.classList.contains("admin-mode")) move(pitch * elapsed / delay);
      frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (track.scrollWidth <= track.clientWidth + 1 || reduced.matches || document.hidden || hovered || focused || pointerX !== null) return;
      frame = requestAnimationFrame(tick);
    };
    const step = (direction) => {
      if (track.scrollWidth > track.clientWidth + 1) move(direction * pitch);
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
      if (Math.abs(delta) > 35) { track.dataset.suppressBrandClick = "1"; step((delta < 0 ? 1 : -1) * sign()); setTimeout(() => delete track.dataset.suppressBrandClick, 0); }
      else schedule();
    });
    listen(window, "pointercancel", () => { pointerX = null; schedule(); });
    listen(document, "visibilitychange", schedule);
    listen(mobile, "change", () => { measure(); schedule(); });
    listen(reduced, "change", schedule);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => { measure(); schedule(); });
    observer?.observe(track);
    const controller = { step, setInterval(value) { delay = interval(value); schedule(); }, destroy() { cancelAnimationFrame(frame); observer?.disconnect(); abort.abort(); } };
    controllers.set(track, controller);
    measure();
    schedule();
    return controller;
  }
  window.ORIGOBrandSlider = { mount, indices, interval, get: (track) => controllers.get(track) };
})();

/* Brand cards remain real navigation controls. */
document.addEventListener("click", (event) => {
  const target = event.target.closest(
    "#home-brand-carousel-track [data-action='brand-search'], #home-benefits-track [data-action='benefit-link']"
  );
  if (!target) return;
  if (target.closest(".brand-continuous-track")?.dataset.suppressBrandClick) { event.preventDefault(); event.stopImmediatePropagation(); return; }

  const brand = target.dataset.query?.trim();
  if (!brand) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.assign(`/search?q=${encodeURIComponent(brand)}`);
}, true);
