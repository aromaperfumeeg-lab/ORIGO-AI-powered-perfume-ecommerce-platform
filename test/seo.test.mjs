import test from "node:test";
import assert from "node:assert/strict";
import {buildBreadcrumbStructuredData,buildCanonicalUrl,buildCategorySeo,buildHomepageStructuredData,buildImageAlt,buildProductSeo,buildProductStructuredData,buildSitemap,injectSeoIntoHtml,robotsTxt,seoForRoute} from "../seo.mjs";

const product={id:"p1",slug:"asad-bourbon",status:"published",category:"perfume",nameAr:"أسد بوربون",nameEn:"Asad Bourbon",brandAr:"لطافة",brandEn:"Lattafa",brand:"Lattafa",size:"100 ml",concentration:"EDP",price:1500,sku:"ASAD-100",barcode:"1234567890123",inventory:{quantity:2},images:[{url:"/asad.webp"}],seasonScores:{winter:100,summer:25},usageTimeScores:{day:60,night:100},gender:"men",updatedAt:"2026-08-21T00:00:00Z",reviewSummary:{average:4.5,count:3}};

test("product SEO is unique, deterministic and manual values win",()=>{const fallback=buildProductSeo(product);assert.match(fallback.title,/أسد بوربون/);assert.match(fallback.title,/لطافة/);assert.equal(fallback.canonical,"https://origoscents.com/perfume/asad-bourbon");const manual=buildProductSeo({...product,seo:{title:"Manual title",description:"Manual description"}});assert.equal(manual.title,"Manual title");assert.equal(manual.description,"Manual description")});
test("canonical URLs discard queries and duplicate metadata is removed",()=>{assert.equal(buildCanonicalUrl("/perfumes/winter?sort=price"),"https://origoscents.com/perfumes/winter");const html=injectSeoIntoHtml('<html><head><title>Old</title><meta name="description" content="old"><link rel="canonical" href="old"><meta property="og:title" content="old"></head></html>',seoForRoute("/perfume/asad-bourbon",[product]));assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert.match(html,/name="robots" content="index,follow"/)});
test("Product and Breadcrumb JSON-LD use real commerce data",()=>{const data=buildProductStructuredData(product);assert.equal(data.offers.priceCurrency,"EGP");assert.match(data.offers.availability,/InStock$/);assert.equal(data.brand.name,"لطافة");assert.equal(data.gtin,product.barcode);assert.equal(data.aggregateRating.reviewCount,3);assert.equal(buildProductStructuredData({...product,barcode:""}).gtin,undefined);const crumbs=buildBreadcrumbStructuredData([{name:"الرئيسية",path:"/"},{name:"العطر",path:"/perfume/asad-bourbon"}]);assert.equal(crumbs["@type"],"BreadcrumbList");assert.equal(crumbs.itemListElement.length,2)});
test("brand, category and image helpers are dynamic",()=>{const category=buildCategorySeo("winter","عطور شتوية",1);assert.equal(category.robots,"index,follow");assert.match(category.title,/شتوية/);assert.equal(buildImageAlt(product),"عطر أسد بوربون من لطافة");assert.match(buildImageAlt(product,"en"),/Asad Bourbon by Lattafa/)});
test("sitemap includes published URLs and excludes drafts and private routes",()=>{const xml=buildSitemap([product,{...product,id:"draft",slug:"draft",status:"draft"}]);assert.match(xml,/perfume\/asad-bourbon/);assert.doesNotMatch(xml,/perfume\/draft|admin|account|checkout/);assert.match(xml,/perfumes\/winter/)});
test("search and personal finder results are noindex",()=>{assert.equal(seoForRoute("/search",[product]).robots,"noindex,follow");assert.equal(seoForRoute("/fragrance-finder/results",[product]).robots,"noindex,follow");assert.match(robotsTxt(),/Sitemap: https:\/\/origoscents\.com\/sitemap\.xml/)});

test("homepage identifies ORIGO Scents and Arabic brand variants without keywords stuffing",()=>{
  const seo=seoForRoute("/",[product]);
  assert.equal(seo.robots,"index,follow");
  assert.equal(seo.canonical,"https://origoscents.com/");
  assert.match(seo.title,/ORIGO Scents/);assert.match(seo.title,/أوريجو سينتس/);assert.match(seo.title,/عطور أصلية/);
  const [website,organization]=buildHomepageStructuredData();
  assert.equal(website["@type"],"WebSite");assert.ok(website.alternateName.includes("ORIGO"));assert.ok(website.alternateName.includes("أوريجو"));assert.ok(website.alternateName.includes("اوريجو"));
  assert.equal(organization["@type"],"Organization");assert.equal(organization.legalName,"ORIGO");
  assert.doesNotMatch(JSON.stringify(seo),/meta keywords/i);
});

test("original perfumes landing is canonical, indexable with products and breadcrumb enabled",()=>{
  const seo=seoForRoute("/perfumes/original",[product]);
  assert.equal(seo.robots,"index,follow");assert.equal(seo.canonical,"https://origoscents.com/perfumes/original");assert.match(seo.title,/عطور أصلية/);
  assert.equal(seo.jsonLd[0]["@type"],"BreadcrumbList");assert.equal(seo.jsonLd[0].itemListElement.at(-1).name,"عطور أصلية");
  assert.equal(seoForRoute("/perfumes/original",[]).robots,"noindex,follow");
  assert.match(buildSitemap([product]),/https:\/\/origoscents\.com\/perfumes\/original/);
  assert.doesNotMatch(buildSitemap([]),/perfumes\/original/);
});

test("server injection keeps exactly one metadata set and restores og site name",()=>{
  const source='<html><head><title>Old</title><meta name="description" content="old"><meta name="robots" content="noindex"><link rel="canonical" href="old"><meta property="og:site_name" content="OLD"><meta property="og:title" content="old"><meta name="twitter:title" content="old"></head></html>';
  const once=injectSeoIntoHtml(source,seoForRoute("/",[product]));
  const twice=injectSeoIntoHtml(once,seoForRoute("/",[product]));
  for(const pattern of [/rel="canonical"/g,/name="description"/g,/name="robots"/g,/property="og:site_name"/g,/property="og:title"/g,/name="twitter:title"/g])assert.equal((twice.match(pattern)||[]).length,1);
  assert.match(twice,/property="og:site_name" content="ORIGO Scents"/);
  assert.equal((twice.match(/data-origo-seo="WebSite"/g)||[]).length,1);
  assert.equal((twice.match(/data-origo-seo="Organization"/g)||[]).length,1);
});

test("private commerce routes remain noindex and product schemas stay truthful",()=>{
  for(const route of ["/admin","/account","/checkout","/cart"])assert.equal(seoForRoute(route,[product]).robots,"noindex,follow");
  const data=buildProductStructuredData({...product,barcode:"not-a-gtin",reviewSummary:{average:4.5,count:0}});
  assert.equal(data.gtin,undefined);assert.equal(data.aggregateRating,undefined);assert.match(data.name,/أسد بوربون/);assert.match(data.name,/Asad Bourbon/);
  const productSeo=seoForRoute("/perfume/asad-bourbon",[product]);assert.ok(productSeo.jsonLd.some(item=>item["@type"]==="Product"));assert.ok(productSeo.jsonLd.some(item=>item["@type"]==="BreadcrumbList"));
});
