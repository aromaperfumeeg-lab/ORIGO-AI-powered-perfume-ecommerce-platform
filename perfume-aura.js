(() => {
  const STATES = Object.freeze({
    idle: "idle",
    auraStarting: "auraStarting",
    firstNote: "firstNote",
    notesSequence: "notesSequence",
    fullAura: "fullAura",
    fading: "fading",
    returning: "returning"
  });

  const timings = {
    auraStarting: 600,
    firstNote: 500,
    notesSequence: 2200,
    fullAura: 1200,
    fading: 800,
    returning: 500
  };

  const sessions = new WeakMap();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  function sessionFor(card) {
    if (!sessions.has(card)) sessions.set(card, { timers: [], running: false });
    return sessions.get(card);
  }

  function clearSession(card) {
    const session = sessionFor(card);
    session.timers.forEach(clearTimeout);
    session.timers = [];
    session.running = false;
  }

  function setState(card, value) {
    card.dataset.auraState = value;
    card.setAttribute("aria-busy", value !== STATES.idle && value !== STATES.fullAura ? "true" : "false");
  }

  function schedule(card, callback, delay) {
    const session = sessionFor(card);
    const timer = setTimeout(callback, delay);
    session.timers.push(timer);
  }

  function start(card) {
    if (!card || card.matches(".is-out") || sessionFor(card).running) return false;
    clearSession(card);
    const session = sessionFor(card);
    session.running = true;

    if (reducedMotion.matches) {
      setState(card, STATES.fullAura);
      schedule(card, () => setState(card, STATES.fading), 1400);
      schedule(card, () => setState(card, STATES.returning), 1800);
      schedule(card, () => {
        setState(card, STATES.idle);
        session.running = false;
      }, 2150);
      return true;
    }

    let elapsed = 0;
    setState(card, STATES.auraStarting);
    elapsed += timings.auraStarting;
    schedule(card, () => setState(card, STATES.firstNote), elapsed);
    elapsed += timings.firstNote;
    schedule(card, () => setState(card, STATES.notesSequence), elapsed);
    elapsed += timings.notesSequence;
    schedule(card, () => setState(card, STATES.fullAura), elapsed);
    elapsed += timings.fullAura;
    schedule(card, () => setState(card, STATES.fading), elapsed);
    elapsed += timings.fading;
    schedule(card, () => setState(card, STATES.returning), elapsed);
    elapsed += timings.returning;
    schedule(card, () => {
      setState(card, STATES.idle);
      session.running = false;
    }, elapsed);
    return true;
  }

  function handleTap(event, media) {
    if (!["touch", "pen"].includes(event.pointerType) || event.target.closest("button")) return false;
    const card = media?.closest(".perfume-product-card");
    if (!card) return false;
    if (card.dataset.auraTapArmed === "true") {
      card.dataset.auraTapArmed = "false";
      return false;
    }
    card.dataset.auraTapArmed = "true";
    start(card);
    schedule(card, () => { card.dataset.auraTapArmed = "false"; }, 7000);
    return true;
  }

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const card = event.target.closest(".perfume-product-card");
    if (!card || card.contains(event.relatedTarget)) return;
    start(card);
  });

  document.addEventListener("focusin", (event) => {
    const card = event.target.closest(".perfume-product-card");
    if (card && !card.contains(event.relatedTarget)) start(card);
  });

  document.addEventListener("aura:preview", (event) => start(event.target.closest(".perfume-product-card")));

  window.ORIGOPerfumeAura = Object.freeze({ STATES, start, handleTap });
})();
