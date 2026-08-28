import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('desktop cards are capped, spaced and keep list mode independent', async () => {
  const css = await readFile(new URL('../appearance.css', import.meta.url), 'utf8');
  const block = css.slice(css.indexOf('/* Smaller desktop cards'));
  assert.match(block, /@media\(min-width:1121px\)/);
  assert.match(block, /flex-basis:min\(220px,calc/);
  assert.match(block, /gap:clamp\(28px,2\.4vw,48px\)!important/);
  assert.match(block, /html:not\(\[data-catalog-layout="list"\]\)/);
  assert.match(css, /\.product-card:hover\{\s*border:0!important;box-shadow:none!important/);
});

test('add-to-cart text has balanced icon gutters for true centering in either language', async () => {
  const css = await readFile(new URL('../appearance.css', import.meta.url), 'utf8');
  assert.match(css, /grid-template-columns:20px minmax\(0,1fr\) 20px!important/);
  assert.match(css, /\.card-add-button>span\{grid-column:2;grid-row:1;min-width:0;width:100%;text-align:center!important/);
  assert.match(css, /\.card-add-button>svg\{grid-column:1;grid-row:1/);
});
