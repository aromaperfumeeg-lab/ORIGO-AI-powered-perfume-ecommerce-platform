import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('brand action labels override legacy fixed square buttons and keep touch targets', async () => {
  const css = await readFile(new URL('../admin-ui-fixes.css', import.meta.url), 'utf8');
  const rule = css.match(/\.brands-table-card \.brand-row-actions>button\{([^}]+)\}/)?.[1];
  assert.ok(rule);
  for (const declaration of ['width:auto', 'height:auto', 'min-height:44px', 'flex:0 0 auto', 'white-space:nowrap']) assert.ok(rule.includes(declaration));
  assert.match(css, /\.brand-row-actions\{[^}]*flex-wrap:wrap/);
  assert.match(css, /\.brand-row-actions small\{flex-basis:100%/);
  const [html, loader] = await Promise.all(['index.html', 'runtime-loader.js'].map(file => readFile(new URL('../' + file, import.meta.url), 'utf8')));
  assert.ok(html.includes('admin-ui-fixes.css?v=9'));
  assert.ok(loader.includes('admin-ui-fixes.css?v=9'));
});

test('brand deletion is offered for empty defaults and still guards linked products', async () => {
  const source = await readFile(new URL('../app.js', import.meta.url), 'utf8');
  const table = source.slice(source.indexOf('function brandsManagementMarkup('), source.indexOf('function brandsManagementMarkup(') + 6000);
  assert.ok(table.includes('data-action="delete-empty-brand"'));
  assert.ok(table.includes('count || saved?.usageCount > 0'));
  assert.ok(table.includes('!item.metadata?.deleted'));
  assert.ok(!table.includes('Built-in brand — can be hidden'));
  const handler = source.slice(source.indexOf('if (action === "delete-empty-brand")'), source.indexOf('if (action === "delete-product-option")'));
  assert.ok(handler.includes('linkedBrandProducts(brand).length'));
  assert.ok(handler.includes('window.confirm'));
  assert.ok(handler.includes('actionElement.disabled = true'));
  assert.ok(handler.includes('deleted:true'));
});
