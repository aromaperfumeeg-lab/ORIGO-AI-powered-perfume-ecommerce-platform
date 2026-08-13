/* Brand cards are real navigation controls, even while their visual rail moves. */
document.addEventListener("click", (event) => {
  const target = event.target.closest(
    "#home-brand-carousel-track [data-action='brand-search'], #brand-carousel-track [data-action='brand-search']"
  );
  if (!target) return;

  const brand = target.dataset.query?.trim();
  if (!brand) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  window.location.assign(`/search?q=${encodeURIComponent(brand)}`);
}, true);
