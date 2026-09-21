/* Continuous brand rail: one compositor animation and one inert loop copy. */
(() => {
  const controllers = new WeakMap();
  const interval = (value) => Math.max(1, Math.min(120, Number(value) || 3)) * 1000;
  const indices = (length, start, size) => Array.from({ length:Math.min(length, size) }, (_, offset) => ((start + offset) % length + length) % length);
  function mount(track, items, seconds = 3) {
    controllers.get(track)?.destroy();
    const mobile = matchMedia("(max-width: 700px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const abort = new AbortController();
    let animation = null;
    let resizeFrame = 0;
    let dragFrame = 0;
    let resumeTimer = 0;
    let pointerX = null;
    let pointerY = null;
    let latestX = null;
    let animationStartTime = 0;
    let loopDistance = 0;
    let horizontalDrag = false;
    let verticalGesture = false;
    let hovered = false;
    let focused = false;
    let visible = true;
    let delay = interval(seconds);
    const rtl = () => document.documentElement.dir === "rtl";
    const paused = () => reduced.matches || document.hidden || !visible || hovered || focused || pointerX !== null;
    const syncPlayback = () => {
      if (!animation) return;
      if (paused()) animation.pause();
      else animation.play();
    };
    const buildAnimation = () => {
      animation?.cancel();
      animation = null;
      const gap = mobile.matches ? 12 : 20;
      const size = mobile.matches ? 4.5 : 13;
      const width = Math.max(44, (track.clientWidth - gap * (Math.ceil(size) - 1)) / size);
      track.style.setProperty("--brand-card-width", `${width}px`);
      track.style.setProperty("--brand-gap", `${gap}px`);
      const group = track.querySelector(".brand-motion-group");
      const distance = group?.scrollWidth || 0;
      loopDistance = distance;
      if (!distance || typeof track.querySelector(".brand-motion-track")?.animate !== "function") return;
      const motion = track.querySelector(".brand-motion-track");
      const travel = rtl() ? distance : -distance;
      animation = motion.animate(
        [{ transform:"translate3d(0,0,0)" }, { transform:`translate3d(${travel}px,0,0)` }],
        { duration:Math.max(1000, delay * items.length), iterations:Infinity, easing:"linear" }
      );
      syncPlayback();
    };
    track.classList.remove("brand-paged-slider");
    track.classList.add("brand-continuous-track");
    const primary = items.join("");
    const duplicate = primary.replaceAll("<button", '<button tabindex="-1"');
    track.innerHTML = `<div class="brand-motion-track"><div class="brand-motion-group">${primary}</div><div class="brand-motion-group" aria-hidden="true" inert>${duplicate}</div></div>`;
    const step = (direction) => {
      if (!animation) return;
      const cardDuration = delay;
      const totalDuration = Math.max(1000, delay * items.length);
      animation.currentTime = (Number(animation.currentTime || 0) + direction * (rtl() ? -1 : 1) * cardDuration + totalDuration) % totalDuration;
      syncPlayback();
    };
    const applyDrag = () => {
      dragFrame = 0;
      if (!animation || pointerX === null || latestX === null || !loopDistance) return;
      const delta = latestX - pointerX;
      const totalDuration = Math.max(1000, delay * items.length);
      const timeDelta = (delta / loopDistance) * totalDuration * (rtl() ? 1 : -1);
      animation.currentTime = ((animationStartTime + timeDelta) % totalDuration + totalDuration) % totalDuration;
    };
    const resumeAfterDrag = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(syncPlayback, 700);
    };
    const listen = (target, name, handler) => target.addEventListener(name, handler, { signal:abort.signal });
    listen(track, "pointerenter", (event) => { if (event.pointerType === "mouse") { hovered = true; syncPlayback(); } });
    listen(track, "pointerleave", () => { hovered = false; syncPlayback(); });
    listen(track, "focusin", () => { focused = true; syncPlayback(); });
    listen(track, "focusout", (event) => { focused = track.contains(event.relatedTarget); syncPlayback(); });
    listen(track, "pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      clearTimeout(resumeTimer);
      pointerX = latestX = event.clientX;
      pointerY = event.clientY;
      animationStartTime = Number(animation?.currentTime || 0);
      horizontalDrag = false;
      verticalGesture = false;
      syncPlayback();
      track.setPointerCapture?.(event.pointerId);
    });
    listen(track, "pointermove", (event) => {
      if (pointerX === null || verticalGesture) return;
      const deltaX = event.clientX - pointerX;
      const deltaY = event.clientY - pointerY;
      if (!horizontalDrag) {
        if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 7) return;
        if (Math.abs(deltaY) >= Math.abs(deltaX) * 1.15) {
          verticalGesture = true;
          track.releasePointerCapture?.(event.pointerId);
          return;
        }
        horizontalDrag = true;
      }
      latestX = event.clientX;
      if (!dragFrame) dragFrame = requestAnimationFrame(applyDrag);
    });
    const finishDrag = (event) => {
      if (pointerX === null) return;
      const delta = (event.clientX ?? latestX) - pointerX;
      if (dragFrame) { cancelAnimationFrame(dragFrame); applyDrag(); }
      pointerX = null;
      pointerY = null;
      latestX = null;
      if (horizontalDrag && Math.abs(delta) > 8) {
        track.dataset.suppressBrandClick = "1";
        setTimeout(() => delete track.dataset.suppressBrandClick, 0);
      }
      horizontalDrag = false;
      verticalGesture = false;
      resumeAfterDrag();
    };
    listen(track, "pointerup", finishDrag);
    listen(track, "pointercancel", finishDrag);
    listen(track, "lostpointercapture", finishDrag);
    listen(document, "visibilitychange", syncPlayback);
    listen(mobile, "change", () => buildAnimation());
    listen(reduced, "change", syncPlayback);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(buildAnimation);
    });
    observer?.observe(track);
    const visibilityObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      syncPlayback();
    }, { rootMargin:"120px" });
    visibilityObserver?.observe(track);
    const controller = {
      step,
      setSpeed(value) { delay = interval(value); buildAnimation(); },
      destroy() { animation?.cancel(); clearTimeout(resumeTimer); cancelAnimationFrame(dragFrame); cancelAnimationFrame(resizeFrame); observer?.disconnect(); visibilityObserver?.disconnect(); abort.abort(); }
    };
    controllers.set(track, controller);
    buildAnimation();
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

if (typeof Event === "function") window.dispatchEvent?.(new Event("origo:brand-slider-ready"));
