import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {buildBreadcrumbStructuredData,buildCanonicalUrl,buildCategorySeo,buildHomepageStructuredData,buildImageAlt,buildProductSeo,buildProductStructuredData,buildSitemap,injectRouteContent,injectSeoIntoHtml,robotsTxt,seoForRoute} from "../seo.mjs";

const product={id:"p1",slug:"asad-bourbon",status:"published",category:"perfume",nameAr:"أسد بوربون",nameEn:"Asad Bourbon",brandAr:"لطافة",brandEn:"Lattafa",brand:"Lattafa",size:"100 ml",concentration:"EDP",price:1500,sku:"ASAD-100",barcode:"1234567890123",inventory:{quantity:2},images:[{url:"/asad.webp"}],seasonScores:{winter:100,summer:25},usageTimeScores:{day:60,night:100},gender:"men",updatedAt:"2026-08-21T00:00:00Z",reviewSummary:{average:4.5,count:3},ratingDetails:{source:"External reference",type:"external_community",is_origo_customer_rating:false}};
const afnanProduct={...product,id:"p2",slug:"afnan-9pm",nameAr:"أفنان 9 بي إم",nameEn:"Afnan 9 PM",brandAr:"أفنان",brandEn:"Afnan",brand:"Afnan",sku:"AFNAN-9PM",barcode:"1234567890124"};

test("product SEO is unique, deterministic and manual values win",()=>{const fallback=buildProductSeo(product);assert.match(fallback.title,/أسد بوربون/);assert.match(fallback.title,/لطافة/);assert.equal(fallback.canonical,"https://origoscents.com/perfume/asad-bourbon");const manual=buildProductSeo({...product,seo:{title:"Manual title",description:"Manual description"}});assert.equal(manual.title,"Manual title");assert.equal(manual.description,"Manual description")});
test("canonical URLs discard queries and duplicate metadata is removed",()=>{assert.equal(buildCanonicalUrl("/perfumes/winter?sort=price"),"https://origoscents.com/perfumes/winter");const html=injectSeoIntoHtml('<html><head><title>Old</title><meta name="description" content="old"><link rel="canonical" href="old"><meta property="og:title" content="old"></head></html>',seoForRoute("/perfume/asad-bourbon",[product]));assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert.match(html,/name="robots" content="index,follow"/)});
test("Product and Breadcrumb JSON-LD use real commerce data",()=>{const data=buildProductStructuredData(product);assert.equal(data.offers.priceCurrency,"EGP");assert.match(data.offers.availability,/InStock$/);assert.equal(data.brand.name,"لطافة");assert.equal(data.gtin,product.barcode);assert.equal(data.aggregateRating,undefined);assert.equal(buildProductStructuredData({...product,barcode:""}).gtin,undefined);const crumbs=buildBreadcrumbStructuredData([{name:"الرئيسية",path:"/"},{name:"العطر",path:"/perfume/asad-bourbon"}]);assert.equal(crumbs["@type"],"BreadcrumbList");assert.equal(crumbs.itemListElement.length,2)});

test("external reference ratings never enter Product structured data",()=>{
  const schema=buildProductStructuredData({...product,rating:4.9,reviewSummary:{average:4.9,count:9000},ratingDetails:{source:"External site",type:"external_community",is_origo_customer_rating:false}});
  assert.equal(schema.aggregateRating,undefined);assert.equal(schema.review,undefined);
});

test("verified ORIGO customer review aggregates may enter Product structured data",()=>{
  const schema=buildProductStructuredData({...product,origoReviewSummary:{average:4.75,count:12,source:"origo_customer_reviews",verified:true}});
  assert.deepEqual(schema.aggregateRating,{"@type":"AggregateRating",ratingValue:4.75,reviewCount:12});assert.equal(schema.review,undefined);
  assert.equal(buildProductStructuredData({...product,origoReviewSummary:{average:4.75,count:12,source:"external_reference",verified:true}}).aggregateRating,undefined);
});
test("product social metadata uses the Product Open Graph type",()=>{const html=injectSeoIntoHtml('<html><head><title>x</title><meta name="description" content="x"></head></html>',seoForRoute("/perfume/asad-bourbon",[product]));assert.match(html,/property="og:type" content="product"/)});
test("brand, category and image helpers are dynamic",()=>{const category=buildCategorySeo("winter","عطور شتوية",1);assert.equal(category.robots,"index,follow");assert.match(category.title,/شتوية/);assert.equal(buildImageAlt(product),"عطر أسد بوربون من لطافة");assert.match(buildImageAlt(product,"en"),/Asad Bourbon by Lattafa/)});
test("sitemap includes published URLs and excludes drafts and private routes",()=>{const xml=buildSitemap([product,{...product,id:"draft",slug:"draft",status:"draft"}]);assert.match(xml,/perfume\/asad-bourbon/);assert.doesNotMatch(xml,/perfume\/draft|admin|account|checkout/);assert.match(xml,/perfumes\/winter/)});
test("search and personal finder results are noindex",()=>{assert.equal(seoForRoute("/search",[product]).robots,"noindex,follow");assert.equal(seoForRoute("/fragrance-finder/results",[product]).robots,"noindex,follow");assert.match(robotsTxt(),/Sitemap: https:\/\/origoscents\.com\/sitemap\.xml/)});

test("homepage identifies ORIGO Scents and Arabic brand variants without keywords stuffing",()=>{
  const seo=seoForRoute("/",[product]);
  assert.equal(seo.robots,"index,follow");
  assert.equal(seo.canonical,"https://origoscents.com/");
  assert.match(seo.title,/ORIGO Scents/);assert.match(seo.title,/أوريجو سينتس/);assert.match(seo.title,/عطور أصلية/);
  const [website,organization]=buildHomepageStructuredData();
  assert.equal(website["@type"],"WebSite");assert.ok(website.alternateName.includes("ORIGO"));assert.ok(website.alternateName.includes("أوريجو"));
  assert.equal(organization["@type"],"Organization");assert.equal(organization.legalName,undefined);assert.equal(organization.areaServed.name,"Egypt");
  assert.deepEqual(organization.alternateName,["ORIGO","Origo Scents","أوريجو سينتس","أوريجو"]);
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

test("brand SEO is dynamic across multiple published brands",async()=>{
  const products=[product,afnanProduct];
  const lattafa=seoForRoute("/brands/lattafa",products),afnan=seoForRoute("/brands/afnan",products),missing=seoForRoute("/brands/missing-brand",products);
  assert.equal(lattafa.canonical,"https://origoscents.com/brands/lattafa");
  assert.equal(afnan.canonical,"https://origoscents.com/brands/afnan");
  assert.notEqual(lattafa.title,afnan.title);assert.match(lattafa.title,/لطافة/);assert.match(afnan.title,/أفنان/);
  assert.equal(lattafa.robots,"index,follow");assert.equal(afnan.robots,"index,follow");assert.equal(missing.robots,"noindex,follow");
  assert.ok(lattafa.jsonLd.some(item=>item["@type"]==="BreadcrumbList"));assert.ok(afnan.jsonLd.some(item=>item["@type"]==="CollectionPage"));
  const sitemap=buildSitemap(products);assert.match(sitemap,/\/brands\/lattafa/);assert.match(sitemap,/\/brands\/afnan/);assert.doesNotMatch(sitemap,/missing-brand/);
  const source=await readFile(new URL("../seo.mjs",import.meta.url),"utf8"),generalBrandCode=source.slice(source.indexOf("export function buildBrandSeo"),source.indexOf("export function buildCategorySeo"));
  assert.doesNotMatch(generalBrandCode,/Lattafa/i);
});

test("server-rendered product HTML exposes crawlable facts without JavaScript",()=>{
  const shell='<html lang="ar" dir="rtl"><body><div class="origo-home" id="home"></div><section class="catalog-page" id="catalog-page" hidden><h1 id="catalog-title">العطور</h1><div class="catalog-product-grid" id="catalog-product-grid" aria-live="polite"></div></section><section id="brands-page" hidden><div class="brands-page-shell" id="brands-page-content"></div></section><div class="overlay product-overlay" id="product-overlay" aria-hidden="true"><div id="product-dialog-content"></div></div></body></html>';
  const html=injectRouteContent(shell,"/perfume/asad-bourbon",[product]);
  assert.match(html,/<h1 id="product-dialog-title">أسد بوربون<\/h1>/);
  assert.match(html,/href="\/brands"/);assert.match(html,/href="\/brands\/lattafa"/);
  assert.match(html,/1500|١٬٥٠٠/);assert.match(html,/متوفر/);
  assert.match(html,/loading="eager"/);assert.match(html,/fetchpriority="high"/);
});

test("brands and catalog routes contain discoverable HTML links",()=>{
  const shell='<div class="origo-home" id="home"></div><section id="brands-page" hidden><div class="brands-page-shell" id="brands-page-content"></div></section><section id="catalog-page" hidden><h1 id="catalog-title">العطور</h1><div class="catalog-product-grid" id="catalog-product-grid" aria-live="polite"></div></section>';
  const brands=injectRouteContent(shell,"/brands",[product,afnanProduct]);
  assert.match(brands,/href="\/brands\/lattafa"/);assert.match(brands,/href="\/brands\/afnan"/);
  const catalog=injectRouteContent(shell,"/perfumes",[product,afnanProduct]);
  assert.equal((catalog.match(/href="\/perfume\//g)||[]).length,4);
  assert.match(buildSitemap([product]),/https:\/\/origoscents\.com\/brands<\/loc>/);
  assert.equal(seoForRoute("/brands",[product]).robots,"index,follow");
});

test("future published brands and products receive SEO, SSR links and sitemap URLs automatically",()=>{
  const future={...product,id:"future-1",slug:"future-house-future-scent",nameAr:"عطر المستقبل",nameEn:"Future Scent",brand:"Future House",brandEn:"Future House",brandAr:"دار المستقبل",descriptionAr:"وصف حقيقي محفوظ للمنتج التجريبي.",status:"published"};
  const products=[product,future],brandPath="/brands/future-house",productRoute="/perfume/future-house-future-scent";
  const brandSeo=seoForRoute(brandPath,products),productSeo=seoForRoute(productRoute,products),sitemap=buildSitemap(products);
  assert.equal(brandSeo.robots,"index,follow");assert.match(brandSeo.title,/دار المستقبل/);assert.equal(productSeo.robots,"index,follow");assert.ok(productSeo.jsonLd.some(item=>item["@type"]==="Product"));
  assert.match(sitemap,/brands\/future-house/);assert.match(sitemap,/perfume\/future-house-future-scent/);
  const shell='<div class="origo-home" id="home"></div><section id="catalog-page" hidden><h1 id="catalog-title">العطور</h1><div class="catalog-product-grid" id="catalog-product-grid" aria-live="polite"></div></section><div class="overlay product-overlay" id="product-overlay" aria-hidden="true"><div id="product-dialog-content"></div></div>';
  const brandHtml=injectRouteContent(shell,brandPath,products),productHtml=injectRouteContent(shell,productRoute,products);
  assert.match(brandHtml,/href="\/perfume\/future-house-future-scent"/);assert.match(brandHtml,/عطور دار المستقبل الأصلية/);
  assert.match(productHtml,/<h1 id="product-dialog-title">عطر المستقبل<\/h1>/);assert.match(productHtml,/وصف حقيقي محفوظ/);
});

test("a brand created in admin appears automatically but stays noindex until it has a published product",()=>{
  const option={slug:"future-house",nameAr:"دار المستقبل",nameEn:"Future House",active:true,updatedAt:"2026-09-19T12:00:00Z",metadata:{descriptionAr:"علامة تجريبية موثقة."}};
  const emptySeo=seoForRoute("/brands/future-house",[],[option]);
  assert.equal(emptySeo.robots,"noindex,follow");assert.match(emptySeo.title,/دار المستقبل/);
  const shell='<div class="origo-home" id="home"></div><section id="brands-page" hidden><div class="brands-page-shell" id="brands-page-content"></div></section><section id="catalog-page" hidden><nav class="catalog-breadcrumb" id="catalog-breadcrumb" aria-label="مسار الصفحة"></nav><h1 id="catalog-title">العطور</h1><div class="catalog-product-grid" id="catalog-product-grid" aria-live="polite"></div></section>';
  assert.match(injectRouteContent(shell,"/brands",[],[option]),/href="\/brands\/future-house"/);
  assert.doesNotMatch(buildSitemap([],[option]),/brands\/future-house/);
  const future={...product,id:"future-option-product",slug:"future-option-scent",brand:"Future House",brandEn:"Future House",brandAr:"دار المستقبل",status:"published"};
  assert.equal(seoForRoute("/brands/future-house",[future],[option]).robots,"index,follow");
  assert.match(buildSitemap([future],[option]),/brands\/future-house/);
});

test("product SSR preserves note pyramid and brand-first crawlable breadcrumbs",()=>{
  const layered={...product,noteSelectionsBundle:{top:[{ar:"برغموت"}],heart:[{ar:"ورد"}],base:[{ar:"مسك"}]}};
  const shell='<div class="overlay product-overlay" id="product-overlay" aria-hidden="true"><div id="product-dialog-content"></div></div>';
  const html=injectRouteContent(shell,"/perfume/asad-bourbon",[layered]);
  assert.match(html,/href="\/brands">العلامات التجارية/);assert.match(html,/النوتات الافتتاحية/);assert.match(html,/نوتات القلب/);assert.match(html,/النوتات الأساسية/);
  const crumbs=seoForRoute("/perfume/asad-bourbon",[layered]).jsonLd.find(item=>item["@type"]==="BreadcrumbList");
  assert.equal(crumbs.itemListElement[1].item,"https://origoscents.com/brands");
});

test("Product schema omits unverified offer data instead of emitting null values",()=>{
  const schema=buildProductStructuredData({...product,price:undefined});
  assert.equal(schema.offers,undefined);
});

test("homepage SSR creates natural internal links to every current brand and a bounded product sample",()=>{
  const shell='<div class="brand-carousel-track" id="home-brand-carousel-track" data-brand-marquee aria-live="off"></div><div class="home-configured-product-rows" id="home-configured-product-rows" aria-live="polite"></div>';
  const html=injectRouteContent(shell,"/",[product,afnanProduct]);
  assert.match(html,/href="\/brands\/lattafa"/);assert.match(html,/href="\/brands\/afnan"/);assert.match(html,/href="\/perfume\/asad-bourbon"/);
});
