import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

test('list controls are added once outside home and expose localized pressed state', async () => {
  const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');
  const source = app.slice(app.indexOf('function setMobileProductColumns('), app.indexOf('function initializeMobileProductColumns('));
  const element = () => ({dataset:{}, attrs:{}, classList:{toggle(){}, add(){}, remove(){}}, setAttribute(k,v){this.attrs[k]=v;}, getAttribute(k){return this.attrs[k];}});
  const makeControl = (home) => Object.assign(element(), {
    closest:() => home, querySelector(){return this.button;}, querySelectorAll:() => [],
    append(button){this.button=button; this.added=(this.added||0)+1;}
  });
  const home = makeControl(true), catalog = makeControl(false);
  const root = {dataset:{catalogLayout:'list'}};
  const context = {document:{documentElement:root,createElement:element}, state:{lang:'ar'},
    $$:(selector) => selector === '.catalog-layout-control' ? [catalog] : [home,catalog]};
  runInNewContext(source, context);
  context.setMobileProductColumns('2', false);
  assert.equal(home.added, undefined);
  assert.equal(catalog.added, 1);
  assert.equal(catalog.button.attrs['aria-pressed'], 'true');
  assert.equal(catalog.button.attrs['aria-label'], 'عرض المنتجات كقائمة');
  root.dataset.catalogLayout='grid'; context.state.lang='en';
  context.setMobileProductColumns('2', false);
  assert.equal(catalog.added, 1);
  assert.equal(catalog.button.attrs['aria-pressed'], 'false');
  assert.equal(catalog.button.attrs['aria-label'], 'Show products as a list');
});

test('list styles target non-home collections and retain accessible sized controls', async () => {
  const css = await readFile(new URL('../appearance.css', import.meta.url), 'utf8');
  const rules = css.split('\n').filter(line => line.includes('data-catalog-layout'));
  assert.ok(rules.length >= 4);
  assert.ok(rules.every(line => !line.includes('#home') && !line.includes('home-product-row')));
  assert.match(css, /grid-template-columns:clamp\(110px,25vw,220px\) minmax\(0,1fr\)/);
  assert.match(css, /min-width:44px;min-height:44px/);
});
