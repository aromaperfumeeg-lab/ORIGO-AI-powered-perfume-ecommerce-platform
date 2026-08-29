import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

test('brand aliases and legacy records resolve to one current saved image', async () => {
  const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');
  const source = app.slice(app.indexOf('function storefrontBrandEntries('), app.indexOf('function renderHomeRailDots('));
  const state = {productOptions:[
    {id:1,group:'brand',slug:'old-house',nameEn:'Test House',nameAr:'دار الاختبار',image:'/old.webp',updatedAt:'2026-08-01'},
    {id:2,group:'brand',slug:'test-house',nameEn:'Test House',nameAr:'دار الاختبار',image:'/new.webp',updatedAt:'2026-08-28'}
  ]};
  const context = {state, brandIdentity:(s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-')};
  runInNewContext(source, context);
  const names = ['Test House','test-house','دار الاختبار','old-house'];
  let entries = context.storefrontBrandEntries(names);
  assert.equal(entries.length,1);
  assert.equal(entries[0].option.image,'/new.webp');
  state.productOptions[1].image='';
  entries=context.storefrontBrandEntries(names);
  assert.equal(entries.length,1);
  assert.equal(entries[0].option.image,'');
  state.productOptions[1].active=false;
  assert.equal(context.storefrontBrandEntries(names).length,0);
  state.productOptions[1].active=true;
  state.productOptions[1].metadata={deleted:true};
  assert.equal(context.storefrontBrandEntries(names).length,0);
});

test('saved brands never fall back to obsolete default artwork after clearing their image', async () => {
  const app=await readFile(new URL('../app.js', import.meta.url),'utf8');
  assert.ok(app.includes('const logo = option ? option.image : origoBrandLogo(brand);'));
});

test('homepage contains one managed brand rail and no legacy carousel', async () => {
  const [html, app] = await Promise.all(['index.html','app.js'].map(file => readFile(new URL('../' + file, import.meta.url),'utf8')));
  assert.equal((html.match(/id="home-brand-carousel-track"/g) || []).length, 1);
  assert.equal((html.match(/id="brand-carousel-track"/g) || []).length, 0);
  assert.ok(!html.includes('class="brand-carousel-section"'));
  assert.ok(!app.includes('$("#brand-carousel-track")'));
  assert.ok(!app.includes('action === "brand-carousel-scroll"'));
});

test('brand rail stays empty until current server options finish loading', async () => {
  const app = await readFile(new URL('../app.js', import.meta.url),'utf8');
  assert.ok(app.includes('brandOptionsReady: false'));
  assert.ok(app.includes('state.brandOptionsReady = true'));
  const render = app.slice(app.indexOf('function renderBrandCarousel('), app.indexOf('function storefrontBrandEntries('));
  assert.ok(render.indexOf('if (!state.brandOptionsReady)') < render.indexOf('ORIGO_PERFUME_BRANDS'));
  assert.ok(render.includes('track.innerHTML = ""'));
  assert.ok(render.includes('aria-busy'));
  assert.ok(render.includes('window.ORIGOBrandSlider.mount(track, items, seconds)'));
});
