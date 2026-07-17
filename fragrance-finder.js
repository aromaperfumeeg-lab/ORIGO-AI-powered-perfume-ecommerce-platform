import { createEmptyFinderAnswers, FINDER_STEP_IDS, rankFragrances } from "./fragrance-finder-engine.js";
import { translateFinder } from "./fragrance-finder-i18n.js";

const store = window.ORIGOStore;
const page = document.querySelector("#fragrance-finder-page");
const root = document.querySelector("#fragrance-finder-root");

if (store && page && root) {
  const STORAGE_KEY = "origoFragranceFinderSession.v2";
  const steps = [...FINDER_STEP_IDS];
  const stepKeys = ["forWhom", "feeling", "families", "notes", "personality", "usage", "features", "budget", "results"];
  const siblings = [...document.querySelectorAll("#storefront-main > *:not(#fragrance-finder-page)")];
  const initialHidden = new Map(siblings.map((node) => [node, node.hidden]));
  const multi = (ids, prefix, icons = []) => ids.map((id, index) => ({ id, label: `${prefix}.${id}`, icon: icons[index] || "✦" }));
  const config = {
    forWhom: [
      { id: "women", label: "forWhom.women", description: "forWhom.womenDesc", image: "assets/home/gender/gender-women.png" },
      { id: "men", label: "forWhom.men", description: "forWhom.menDesc", image: "assets/home/gender/gender-men.png" },
      { id: "unisex", label: "forWhom.unisex", description: "forWhom.unisexDesc", image: "assets/home/gender/gender-unisex.png" }
    ],
    feelings: multi(["warmSweet", "freshClean", "woodyDeep", "orientalLuxurious", "citrusyFresh", "floralSoft", "leatheryBold", "greenNatural"], "feeling", ["♨", "❋", "♜", "♛", "◉", "✿", "◆", "❧"]),
    families: multi(["oriental", "woody", "floral", "citrus", "aromatic", "leather", "fruity", "gourmand", "chypre", "aquatic", "fougere", "musky"], "family", ["♨", "▥", "✿", "◉", "❧", "◆", "●", "♨", "♠", "≈", "❧", "○"]),
    personalities: multi(["leader", "calm", "social", "bold", "romantic", "practical", "artistic", "adventurous"], "personality", ["♛", "❧", "♙", "↗", "♡", "▣", "◌", "△"]),
    usage: multi(["daily", "special", "romantic", "travel", "formal", "sport", "relax", "religious", "other"], "usage", ["▣", "✦", "♡", "↗", "♛", "◉", "☾", "◇", "…"]),
    seasons: multi(["summer", "spring", "autumn", "winter", "any"], "season", ["☀", "❧", "🍂", "❄", "◌"]),
    times: multi(["morning", "day", "evening", "night", "any"], "time", ["◒", "☀", "◓", "☾", "◌"]),
    features: multi(["longLasting", "strongProjection", "mediumProjection", "lightProjection", "bestValue"], "feature", ["◷", "♨", "◉", "○", "◇"]),
    budgets: [
      { id: "any", label: "budget.any", description: "budget.anyDesc", icon: "…" },
      { id: "under500", label: "budget.under500", icon: "♙" },
      { id: "500to1500", label: "budget.500to1500", icon: "▤" },
      { id: "1500to3000", label: "budget.1500to3000", icon: "◇" },
      { id: "over3000", label: "budget.over3000", icon: "♛" }
    ],
    notes: {
      top: multi(["citrus", "bergamot", "lemon", "apple", "mint", "pinkPepper"], "note", ["◉", "●", "◉", "●", "❧", "✦"]),
      heart: multi(["rose", "jasmine", "lavender", "whiteFlowers", "cinnamon", "saffron"], "note", ["✿", "❀", "❋", "❁", "≋", "✦"]),
      base: multi(["oud", "amber", "musk", "vanilla", "leather", "patchouli", "sandalwood"], "note", ["▥", "◆", "○", "✿", "◆", "❧", "▥"])
    }
  };
  const optionKey = new Map(Object.values(config).flatMap((value) => Array.isArray(value) ? value : []).map((item) => [item.id, item.label]));
  Object.values(config.notes).flat().forEach((item) => optionKey.set(item.id, item.label));
  const state = restore();
  let resultsVisible = 5;
  let referenceQuery = "";
  let syncTimer;

  function language() { return document.documentElement.lang === "en" ? "en" : "ar"; }
  function t(key, variables) { return translateFinder(language(), key, variables); }
  function enabledOptions(group) {
    const configured = store.getFragranceFinderSettings?.()?.enabled?.[group];
    return Array.isArray(configured) ? new Set(configured) : null;
  }
  function available(items, group) {
    const enabled = enabledOptions(group);
    return enabled ? items.filter((item) => enabled.has(item.id)) : items;
  }
  function sanitizeAnswers() {
    let changed = false;
    const scalarGroups = [["forWhom", "forWhom"], ["budget", "budgets"]];
    scalarGroups.forEach(([answerKey, settingKey]) => {
      const enabled = enabledOptions(settingKey);
      if (enabled && state.answers[answerKey] && !enabled.has(state.answers[answerKey])) {
        state.answers[answerKey] = null;
        changed = true;
      }
    });
    const listGroups = [["feelings", "feelings"], ["families", "families"], ["personality", "personalities"], ["usage", "usage"], ["seasons", "seasons"], ["times", "times"], ["features", "features"]];
    listGroups.forEach(([answerKey, settingKey]) => {
      const enabled = enabledOptions(settingKey);
      if (!enabled) return;
      const filtered = state.answers[answerKey].filter((id) => enabled.has(id));
      if (filtered.length !== state.answers[answerKey].length) {
        state.answers[answerKey] = filtered;
        changed = true;
      }
    });
    const notesEnabled = enabledOptions("notes");
    if (notesEnabled) ["liked", "disliked"].forEach((key) => {
      const filtered = state.answers.notes[key].filter((id) => notesEnabled.has(id));
      if (filtered.length !== state.answers.notes[key].length) {
        state.answers.notes[key] = filtered;
        changed = true;
      }
    });
    return changed;
  }
  function esc(value = "") { return store.escapeHTML(String(value)); }
  function money(value) { return new Intl.NumberFormat(language() === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(Number(value || 0)); }
  function productName(product) { return language() === "ar" ? product.nameAr || product.nameEn : product.nameEn || product.nameAr; }
  function emptySession() { return { version: 2, started: false, currentStep: 0, answers: createEmptyFinderAnswers(), updatedAt: new Date().toISOString() }; }
  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.version === 2 && saved.answers) return { ...emptySession(), ...saved, answers: { ...createEmptyFinderAnswers(), ...saved.answers, notes: { liked: [], disliked: [], ...(saved.answers.notes || {}) } } };
    } catch {}
    return emptySession();
  }
  function persist({ sync = true } = {}) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (sync && store.state.user) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(() => store.api("/api/account/fragrance-finder", { method: "POST", body: JSON.stringify({ session: state }) }).catch(() => {}), 350);
    }
  }
  async function hydrateAccountSession() {
    if (!store.state.user || state.started || state.currentStep) return;
    try {
      const result = await store.api("/api/account/fragrance-finder");
      if (result.session?.version === 2 && new Date(result.session.updatedAt || 0) > new Date(state.updatedAt || 0)) Object.assign(state, result.session);
    } catch {}
  }
  function routeIndex() {
    const match = location.pathname.match(/^\/fragrance-finder\/([a-z-]+)\/?$/i);
    return match ? steps.indexOf(match[1]) : -1;
  }
  function setActive(active) {
    document.body.classList.toggle("finder-route", active);
    page.hidden = !active;
    if (active) siblings.forEach((node) => { node.hidden = true; });
    else {
      root.innerHTML = "";
      const anotherRoute = ["account-route", "commerce-route", "notes-route", "catalog-route", "benefit-route"].some((name) => document.body.classList.contains(name));
      if (!anotherRoute) siblings.forEach((node) => { node.hidden = Boolean(initialHidden.get(node)); });
    }
  }
  function go(index, { replace = false } = {}) {
    const next = Math.max(0, Math.min(8, index));
    state.currentStep = next;
    persist();
    const path = `/fragrance-finder/${steps[next]}`;
    history[replace ? "replaceState" : "pushState"]({ finderStep: next }, "", path);
    render();
    scrollTo({ top: 0, behavior: "smooth" });
  }
  function completion() {
    const a = state.answers;
    const completed = [a.forWhom, a.feelings.length, a.families.length, a.notes.liked.length || a.notes.disliked.length, a.personality.length, a.usage.length || a.seasons.length || a.times.length, a.features.length, a.budget].filter(Boolean).length;
    return Math.round(completed / 8 * 100);
  }
  function progress() {
    return `<nav class="finder-progress" aria-label="${esc(t("progress.label", { current: state.currentStep + 1 }))}">${steps.map((step, index) => `<button data-finder-go="${index}" class="${index === state.currentStep ? "active" : ""} ${index < state.currentStep ? "done" : ""}" ${index > state.currentStep ? "disabled" : ""} aria-current="${index === state.currentStep ? "step" : "false"}"><i>${index < state.currentStep ? "✓" : index + 1}</i><span>${esc(t(`step.${stepKeys[index]}`))}</span></button>`).join("")}</nav>`;
  }
  function optionCard(item, group, selected, { single = false, visual = false, compact = false } = {}) {
    return `<button class="finder-option ${selected ? "selected" : ""} ${visual ? "visual" : ""} ${compact ? "compact" : ""}" data-finder-option="${esc(group)}" data-value="${esc(item.id)}" data-single="${single}" aria-pressed="${selected}">${item.image ? `<img src="${esc(item.image)}" alt=""/>` : `<i>${item.icon || "✦"}</i>`}<strong>${esc(t(item.label))}</strong>${item.description ? `<small>${esc(t(item.description))}</small>` : ""}<b aria-hidden="true">${selected ? "✓" : ""}</b></button>`;
  }
  function multiGrid(items, group, options = {}) {
    const selected = nested(group);
    return `<div class="finder-options ${options.className || ""}">${items.map((item) => optionCard(item, group, selected.includes(item.id), options)).join("")}</div>`;
  }
  function nested(group) {
    if (group.startsWith("notes.")) return state.answers.notes[group.split(".")[1]];
    return state.answers[group] || [];
  }
  function intro() {
    return `<section class="finder-intro"><div><span class="finder-eyebrow">${esc(t("feature.name"))}</span><h1>${esc(t("intro.title"))}</h1><p>${esc(t("intro.description"))}</p><button data-finder-action="start">${esc(t("intro.start"))} <b>←</b></button><ul><li>9</li><li>ORIGO</li><li>100%</li></ul></div><div class="finder-intro-art"><img src="assets/home/banners/ai-perfume.png" alt="ORIGO"/></div></section>`;
  }
  function stageHeading(key) { return `<header class="finder-stage-heading"><small>${esc(t("progress.label", { current: state.currentStep + 1 }))}</small><h1>${esc(t(`${key}.title`))}</h1><p>${esc(t(`${key}.body`))}</p></header>`; }
  function forWhom() { return `${stageHeading("forWhom")}<div class="finder-options for-whom">${available(config.forWhom, "forWhom").map((item) => optionCard(item, "forWhom", state.answers.forWhom === item.id, { single: true, visual: true })).join("")}</div>`; }
  function feeling() { return `${stageHeading("feeling")}${multiGrid(available(config.feelings, "feelings"), "feelings", { visual: true })}${tip()}`; }
  function families() { return `${stageHeading("families")}${multiGrid(available(config.families, "families"), "families", { visual: true })}${selectedChips("families")}${tip()}`; }
  function notes() {
    return `${stageHeading("notes")}<div class="finder-note-columns">${Object.entries(config.notes).map(([group, items]) => `<section><h2>${esc(t(`notes.${group}`))}</h2>${multiGrid(available(items, "notes"), "notes.liked", { compact: true })}</section>`).join("")}</div><section class="finder-disliked"><h2>${esc(t("notes.disliked"))}</h2>${multiGrid(available(Object.values(config.notes).flat(), "notes"), "notes.disliked", { compact: true })}</section>${tip()}`;
  }
  function personality() { return `${stageHeading("personality")}${multiGrid(available(config.personalities, "personalities"), "personality")}${tip()}`; }
  function usage() {
    return `${stageHeading("usage")}<section class="finder-choice-section"><h2>${esc(t("usage.section"))}</h2>${multiGrid(available(config.usage, "usage"), "usage", { compact: true })}</section><section class="finder-choice-section"><h2>${esc(t("season.section"))}</h2>${multiGrid(available(config.seasons, "seasons"), "seasons", { compact: true })}</section><section class="finder-choice-section"><h2>${esc(t("time.section"))}</h2>${multiGrid(available(config.times, "times"), "times", { compact: true })}</section>${tip()}`;
  }
  function features() { return `${stageHeading("features")}${multiGrid(available(config.features, "features"), "features")}${tip()}`; }
  function budget() {
    const suggestions = referenceSuggestions();
    const selected = store.getProduct(state.answers.referenceProductId);
    return `${stageHeading("budget")}<div class="finder-options budget-options">${available(config.budgets, "budgets").map((item) => optionCard(item, "budget", state.answers.budget === item.id, { single: true })).join("")}</div><section class="finder-reference"><h2>${esc(t("reference.title"))}</h2><p>${esc(t("reference.body"))}</p><label><input id="finder-reference-search" value="${esc(referenceQuery)}" placeholder="${esc(t("reference.placeholder"))}" autocomplete="off"/><span>⌕</span></label>${referenceQuery ? `<div class="finder-reference-suggestions">${suggestions.length ? suggestions.map((product) => `<button data-reference-product="${esc(product.id)}"><img src="${esc(product.image || "assets/origo-hero.png")}" alt=""/><span><b>${esc(productName(product))}</b><small>${esc(product.brand)} · ${money(product.price)}</small></span></button>`).join("") : `<p>${esc(t("results.empty"))}</p>`}</div>` : ""}${selected ? `<article class="finder-reference-selected"><img src="${esc(selected.image || "assets/origo-hero.png")}" alt=""/><b>${esc(productName(selected))}</b><small>${esc(selected.brand)}</small><button data-finder-action="remove-reference">×</button></article>` : `<small>${esc(t("reference.none"))}</small>`}</section>${tip()}`;
  }
  function referenceSuggestions() {
    const query = referenceQuery.trim().toLowerCase();
    if (!query) return [];
    return store.state.products.filter((product) => product.category === "perfume" && `${product.nameAr} ${product.nameEn} ${product.brand}`.toLowerCase().includes(query)).slice(0, 6);
  }
  function selectedChips(group) {
    const values = nested(group);
    if (!values.length) return "";
    return `<div class="finder-selected-chips"><b>${esc(t("common.selected"))}</b>${values.map((id) => `<button data-finder-remove="${esc(group)}" data-value="${esc(id)}">${esc(t(optionKey.get(id) || id))} ×</button>`).join("")}</div>`;
  }
  function tip() { return `<aside class="finder-tip"><i>☼</i><div><b>${esc(t("common.tip"))}</b><p>${esc(t("tip.general"))}</p></div></aside>`; }
  function summary() {
    const groups = [
      ["forWhom", state.answers.forWhom ? [state.answers.forWhom] : []], ["feeling", state.answers.feelings], ["families", state.answers.families],
      ["notes", state.answers.notes.liked], ["personality", state.answers.personality], ["usage", [...state.answers.usage, ...state.answers.seasons, ...state.answers.times]],
      ["features", state.answers.features], ["budget", state.answers.budget ? [state.answers.budget] : []]
    ].filter(([, values]) => values.length);
    return `<aside class="finder-summary"><h2>${esc(t("common.summary"))}</h2>${groups.length ? groups.map(([key, values]) => `<section><b>${esc(t(`step.${key}`))}</b><p>${values.map((id) => esc(t(optionKey.get(id) || `${key}.${id}`))).join("، ")}</p></section>`).join("") : `<p>${esc(t("summary.empty"))}</p>`}<div class="finder-completion"><i style="--value:${completion()}"><b>${completion()}%</b></i><span>${esc(t("summary.completion", { value: completion() }))}</span></div></aside>`;
  }
  function reasonMarkup(result) { return result.reasons.map((reason) => `<li>✓ ${esc(t(`reason.${reason}`))}</li>`).join(""); }
  function resultCard(result, index) {
    const product = result.product;
    const discount = Number(product.oldPrice || 0) > Number(product.price || 0) ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
    const saved = store.state.wishlist.includes(product.id);
    return `<article class="finder-result-card"><span class="finder-rank">${index + 1}</span><img loading="lazy" src="${esc(product.image || "assets/origo-hero.png")}" alt="${esc(productName(product))}"/><div class="finder-result-product"><small>${esc(product.brand)}</small><h2>${esc(productName(product))}</h2><div class="finder-result-tags">${[...(result.matchedFamilies || []).map((id) => t(`family.${id}`)), ...(result.matchedNotes || []).map((id) => t(`note.${id}`))].slice(0, 4).map((label) => `<span>${esc(label)}</span>`).join("")}</div><p><b>${money(product.price)}</b>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}${discount ? `<em>-${discount}%</em>` : ""}</p><small>${esc(product.sizes?.[0] || product.concentration || "")} · ${esc(t(result.available ? "results.available" : "results.unavailable"))}</small></div><div class="finder-match"><i style="--match:${result.percentage}"><b>${result.percentage}%</b></i><span>${esc(t("results.match"))}</span></div><div class="finder-reasons"><b>${esc(t("results.why"))}</b><ul>${reasonMarkup(result)}</ul></div><div class="finder-result-actions"><button data-result-action="details" data-id="${esc(product.id)}">${esc(t("results.details"))}</button><button data-result-action="add" data-id="${esc(product.id)}" ${result.available ? "" : "disabled"}>${esc(t("results.add"))}</button><button class="${saved ? "active" : ""}" data-result-action="favorite" data-id="${esc(product.id)}" aria-label="${esc(t("results.favorite"))}">${saved ? "♥" : "♡"}</button><button data-result-action="compare" data-id="${esc(product.id)}" aria-label="${esc(t("results.compare"))}">⇄</button></div></article>`;
  }
  function results() {
    const ranked = rankFragrances(store.state.products, state.answers, { limit: 10 });
    const visible = matchMedia("(max-width:780px)").matches ? ranked.available.slice(0, resultsVisible) : ranked.available;
    const overall = ranked.available.length ? Math.round(ranked.available.reduce((sum, item) => sum + item.percentage, 0) / ranked.available.length) : 0;
    return `<header class="finder-results-heading"><small>${esc(t("progress.label", { current: 9 }))}</small><h1>${esc(t("results.title"))}</h1><p>${esc(t("results.body"))}</p><div><i style="--match:${overall}"><b>${overall}%</b></i><span>${esc(t("results.overall"))}</span></div></header><div class="finder-results-list">${visible.length ? visible.map(resultCard).join("") : `<div class="finder-empty">${esc(t("results.empty"))}</div>`}</div>${visible.length < ranked.available.length ? `<button class="finder-show-more" data-finder-action="more-results">${esc(t("results.more"))} (${ranked.available.length - visible.length})</button>` : ""}${ranked.unavailable.length ? `<section class="finder-unavailable"><h2>${esc(t("results.unavailableTitle"))}</h2>${ranked.unavailable.slice(0, 3).map((result) => `<article><img src="${esc(result.product.image || "assets/origo-hero.png")}" alt=""/><b>${esc(productName(result.product))}</b><span>${result.percentage}%</span><button data-result-action="notify" data-id="${esc(result.product.id)}">${esc(t("results.notify"))}</button></article>`).join("")}</section>` : ""}<div class="finder-results-footer"><button data-finder-action="edit">${esc(t("results.edit"))}</button><button data-finder-action="save-results">${esc(t("results.save"))}</button><button data-finder-action="restart">${esc(t("results.restart"))}</button></div>`;
  }
  function currentContent() {
    return [forWhom, feeling, families, notes, personality, usage, features, budget, results][state.currentStep]();
  }
  function footer() {
    if (state.currentStep === 8) return "";
    const skippable = state.currentStep > 0 && state.currentStep < 7;
    return `<footer class="finder-actions ${skippable ? "" : "no-skip"}"><button data-finder-nav="previous">${esc(t("common.previous"))} <span>←</span></button>${skippable ? `<button data-finder-nav="skip">${esc(t("common.skip"))}</button>` : ""}<button class="primary" data-finder-nav="next">${esc(t("common.next"))}: ${esc(t(`step.${stepKeys[state.currentStep + 1]}`))} <span>←</span></button></footer>`;
  }
  function render() {
    if (!document.body.classList.contains("finder-route")) return;
    if (sanitizeAnswers()) persist();
    document.documentElement.dir = language() === "ar" ? "rtl" : "ltr";
    if (!state.started && state.currentStep === 0) {
      root.innerHTML = intro();
      return;
    }
    root.innerHTML = `${progress()}<div class="finder-layout"><main class="finder-main">${currentContent()}${footer()}</main>${state.currentStep > 0 && state.currentStep < 8 ? `<details class="finder-summary-mobile"><summary>${esc(t("common.summary"))}</summary>${summary()}</details>${summary()}` : ""}</div>`;
  }
  function setNested(group, value, single) {
    if (group === "forWhom" || group === "budget") { state.answers[group] = value; return; }
    const target = nested(group);
    const index = target.indexOf(value);
    if (single) { target.splice(0, target.length, value); return; }
    if ((group === "seasons" || group === "times") && value === "any") { target.splice(0, target.length, "any"); return; }
    if ((group === "seasons" || group === "times") && value !== "any") { const anyIndex = target.indexOf("any"); if (anyIndex >= 0) target.splice(anyIndex, 1); }
    if (index >= 0) target.splice(index, 1); else target.push(value);
    if (group === "notes.liked" && target.includes(value)) { const disliked = state.answers.notes.disliked.indexOf(value); if (disliked >= 0) state.answers.notes.disliked.splice(disliked, 1); }
    if (group === "notes.disliked" && target.includes(value)) { const liked = state.answers.notes.liked.indexOf(value); if (liked >= 0) state.answers.notes.liked.splice(liked, 1); }
  }
  function validCurrent() { return state.currentStep !== 0 || Boolean(state.answers.forWhom); }
  async function route() {
    const index = routeIndex();
    if (index < 0) { setActive(false); return; }
    setActive(true);
    state.currentStep = index;
    await hydrateAccountSession();
    if (state.currentStep !== index) state.currentStep = index;
    persist({ sync: false });
    render();
  }
  function open() { state.started = false; state.currentStep = 0; persist(); location.assign("/fragrance-finder/for-whom"); }

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("finder-route")) return;
    const option = event.target.closest("[data-finder-option]");
    if (option) { setNested(option.dataset.finderOption, option.dataset.value, option.dataset.single === "true"); persist(); render(); return; }
    const remove = event.target.closest("[data-finder-remove]");
    if (remove) { setNested(remove.dataset.finderRemove, remove.dataset.value, false); persist(); render(); return; }
    const goButton = event.target.closest("[data-finder-go]");
    if (goButton && !goButton.disabled) { go(Number(goButton.dataset.finderGo)); return; }
    const nav = event.target.closest("[data-finder-nav]")?.dataset.finderNav;
    if (nav === "previous") { if (state.currentStep === 0) { state.started = false; persist(); render(); } else go(state.currentStep - 1); return; }
    if (nav === "skip") { go(state.currentStep + 1); return; }
    if (nav === "next") { if (!validCurrent()) { store.showToast(t("common.required")); return; } go(state.currentStep + 1); return; }
    const action = event.target.closest("[data-finder-action]")?.dataset.finderAction;
    if (action === "start") { state.started = true; persist(); render(); }
    if (action === "remove-reference") { state.answers.referenceProductId = null; persist(); render(); }
    if (action === "more-results") { resultsVisible += 5; render(); }
    if (action === "edit") go(7);
    if (action === "restart") { Object.assign(state, emptySession(), { started: true }); localStorage.removeItem(STORAGE_KEY); go(0, { replace: true }); }
    if (action === "save-results") { const ranked = rankFragrances(store.state.products, state.answers, { limit: 10 }).available; ranked.forEach(({ product }) => { if (!store.state.wishlist.includes(product.id)) store.toggleWishlist(product.id); }); store.showToast(t("toast.saved")); render(); }
    const reference = event.target.closest("[data-reference-product]");
    if (reference) { state.answers.referenceProductId = reference.dataset.referenceProduct; referenceQuery = ""; persist(); render(); }
    const resultAction = event.target.closest("[data-result-action]");
    if (resultAction) {
      const product = store.getProduct(resultAction.dataset.id);
      if (resultAction.dataset.resultAction === "details") store.showProductDetails(product);
      if (resultAction.dataset.resultAction === "add") { store.addToCart(product); store.showToast(t("toast.added")); }
      if (resultAction.dataset.resultAction === "favorite") { store.toggleWishlist(product.id); store.showToast(t("toast.saved")); render(); }
      if (resultAction.dataset.resultAction === "compare") { const values = JSON.parse(localStorage.getItem("origoFinderCompare") || "[]").filter((id) => id !== product.id); values.push(product.id); localStorage.setItem("origoFinderCompare", JSON.stringify(values.slice(-3))); store.showToast(t("toast.compare")); }
      if (resultAction.dataset.resultAction === "notify") { const alerts = JSON.parse(localStorage.getItem("origoStockAlerts") || "[]"); localStorage.setItem("origoStockAlerts", JSON.stringify([...new Set([...alerts, product.id])])); store.showToast(t("toast.notify")); }
    }
  });
  document.addEventListener("input", (event) => {
    if (event.target.id !== "finder-reference-search") return;
    referenceQuery = event.target.value;
    render();
    const input = document.querySelector("#finder-reference-search");
    input?.focus();
    input?.setSelectionRange(referenceQuery.length, referenceQuery.length);
  });
  window.addEventListener("popstate", route);
  window.addEventListener("resize", () => { if (document.body.classList.contains("finder-route") && state.currentStep === 8) render(); }, { passive: true });
  window.ORIGOFragranceFinder = { route, render, open, state };
  route();
}
