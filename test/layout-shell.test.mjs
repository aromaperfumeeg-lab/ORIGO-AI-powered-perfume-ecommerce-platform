import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = async (name) => readFile(new URL(`../${name}`, import.meta.url), "utf8");

test("shared header has separated commerce, brand, and preference zones", async () => {
  const html = await source("index.html");
  assert.match(html, /class="header-commerce-zone"/);
  assert.match(html, /class="header-commerce-actions"/);
  assert.match(html, /class="header-preference-actions"/);
  assert.equal((html.match(/class="header-search"/g) || []).length, 1);
  assert.match(html, /shell\.css\?v=4/);
});

test("layout shell is balanced and defines one responsive content system", async () => {
  const css = await source("shell.css");
  const balance = [...css].reduce((value, char) => value + (char === "{" ? 1 : char === "}" ? -1 : 0), 0);
  assert.equal(balance, 0);
  assert.match(css, /--shell-content:\s*1320px/);
  assert.match(css, /grid-template-areas:\s*"commerce brand preferences"/);
  assert.match(css, /#account-root\[data-view\]:not\(\[data-view="dashboard"\]\) \.account-content/);
  assert.match(css, /@media \(max-width: 1080px\)/);
  assert.match(css, /\.home-benefits,[\s\S]*footer\.origo-footer[\s\S]*max-width:\s*none/);
  assert.match(css, /\.commerce-shell,[\s\S]*\.benefit-detail-shell[\s\S]*max-width:\s*none/);
  assert.match(css, /footer\.origo-footer[\s\S]*width:[^;]+!important;[\s\S]*max-width:\s*none\s*!important/);
  assert.match(css, /\.perfume-product-card \.product-card-commerce,[\s\S]*margin-top:\s*auto/);
  assert.match(css, /\.checkout-layout\.three[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\)/);
});

test("cart wording is consistent and checkout benefits are not duplicated", async () => {
  const [html, app, finder, commerce] = await Promise.all([
    source("index.html"),
    source("app.js"),
    source("fragrance-finder-i18n.js"),
    source("commerce.js")
  ]);
  const visibleCopy = `${html}\n${app}\n${finder}`;
  assert.doesNotMatch(visibleCopy, /أضف إلى الحقيبة|Add to bag/);
  assert.match(visibleCopy, /أضف للسلة/);
  assert.doesNotMatch(commerce, /benefitSide\(\)\}<\/div>\$\{trustBar\(\)\}/);
  assert.equal((commerce.match(/\$\{summary\(\)\}\$\{benefitSide\(\)\}<\/div>`;/g) || []).length, 2);
});

test("every customer-facing surface declares a compact responsive layout", async () => {
  const files = [
    "home.css",
    "catalog.css",
    "commerce.css",
    "account.css",
    "fragrance-finder.css",
    "product-card.css",
    "product-detail.css",
    "footer.css"
  ];
  const styles = await Promise.all(files.map(source));
  styles.forEach((css, index) => {
    assert.match(css, /@media\s*\(max-width:\s*(?:[3-8]\d{2}|900)px\)/, `${files[index]} needs a mobile breakpoint`);
  });
  const shell = await source("shell.css");
  assert.match(shell, /\.checkout-layout > \*/);
  assert.match(shell, /\.pdp-hero > \*[\s\S]*min-width:\s*0/);
  assert.match(shell, /fieldset[\s\S]*min-inline-size:\s*0/);
});

test("checkout and account route teardown cannot hide another active page", async () => {
  const commerce = await source("commerce.js");
  const account = await source("account.js");
  assert.match(commerce, /const anotherRoute = \["account-route", "finder-route"/);
  assert.match(account, /const anotherRoute=\['commerce-route','finder-route'/);
});

test("homepage rails separate manual drag from brand autoplay", async () => {
  const [html, app, home] = await Promise.all([source("index.html"), source("app.js"), source("home.css")]);
  assert.equal((html.match(/data-horizontal-rail/g) || []).length, 5);
  assert.equal((html.match(/data-brand-marquee/g) || []).length, 1);
  assert.match(home, /\.horizontal-rail\{[^}]*overflow-x:auto/);
  assert.match(home, /scroll-snap-type:x mandatory/);
  assert.match(home, /brand-marquee-content[^}]*animation:/);
  assert.match(home, /prefers-reduced-motion:reduce/);
  assert.match(app, /homepageRailsAdminMarkup/);
  assert.match(app, /admin-homepage-rails/);
  assert.match(app, /homeMedia/);
});

test("public cards expose one size label without variant selectors", async () => {
  const [app, cards] = await Promise.all([source("app.js"), source("product-card.css")]);
  assert.doesNotMatch(app, /class="product-card-variants"/);
  assert.doesNotMatch(app, /class="pdp-sizes"/);
  assert.match(app, /class="product-card-size"/);
  assert.doesNotMatch(app, /متوفر — \$\{knownStock\}|\$\{knownStock\} in stock/);
  assert.match(cards, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)!important/);
  assert.match(cards, /product-card-primary\{object-fit:contain/);
});
