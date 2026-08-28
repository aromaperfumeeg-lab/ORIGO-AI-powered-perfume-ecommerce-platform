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
