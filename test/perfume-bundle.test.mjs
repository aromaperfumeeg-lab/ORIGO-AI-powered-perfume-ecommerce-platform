import test from "node:test";
import assert from "node:assert/strict";
import "../perfume-bundle.js";

const bundle={perfume:{
  name_ar:"أسد بوربون",name_en:"Asad Bourbon",brand_ar:"لطافة",brand_en:"Lattafa Perfumes",
  gender_ar:"رجالي",gender_en:"Men",concentration_ar:"أو دو بارفان",concentration_en:"Eau de Parfum",concentration_code:"EDP",
  size_ml:100,release_year:2025,fragrance_family_ar:"شرقي",fragrance_family_en:"Oriental",
  accords:[{name_ar:"فانيليا",name_en:"Vanilla",percentage:100},{name_ar:"كاكاو",name_en:"Cacao",percentage:91}],
  notes:{top:[{name_ar:"الفلفل الوردي",name_en:"Pink Pepper"}],heart:[{name_ar:"الكاكاو",name_en:"Cacao"}],base:[{name_ar:"فانيليا بوربون",name_en:"Bourbon Vanilla"}]},
  performance:{longevity_ar:"سبع ساعات",longevity_en:"Seven hours",longevity_hours:7,projection_ar:"قوي",projection_en:"Strong"},
  seasons:{winter:100,autumn:100,spring:60,summer:40},time:{day:60,night:100},
  occasions:[{name_ar:"السهرات",name_en:"Evening events"}],
  short_description_ar:"وصف عربي مستورد",short_description_en:"Imported English description.",
  scent_character_ar:["دافئ","جذاب"],scent_character_en:["Warm","Captivating"],
  search_keywords_ar:["أسد بوربون","عطر لطافة"],search_keywords_en:["Asad Bourbon","Lattafa perfume"]
}};

test("new ORIGO bundle imports every perfume field",()=>{const api=globalThis.ORIGOPerfumeBundle,n=api.normalizePerfumeBundle(bundle),existing={price:1200,sku:"KEEP",inventory:{quantity:0,minimum:4,cost:600},images:[{url:"/keep.webp"}],slug:"manual-slug",seo:{title:"Manual",description:"Manual description",keywords:["old"]}},p=api.applyPerfumeBundleToProduct(existing,n);assert.equal(p.nameAr,"أسد بوربون");assert.equal(p.nameEn,"Asad Bourbon");assert.equal(p.gender,"men");assert.equal(p.concentration,"EDP");assert.equal(p.size,"100 ml");assert.equal(p.releaseYear,2025);assert.equal(p.fragranceFamilyEn,"Oriental");assert.equal(p.accordProfile[0].strength,100);assert.deepEqual(n.notes.top[0],{ar:"الفلفل الوردي",en:"Pink Pepper"});assert.equal(p.performance.longevityHours,7);assert.equal(p.performance.projection,"strong");assert.equal(p.seasonScores.winter,100);assert.equal(p.usageTimeScores.night,100);assert.equal(p.descriptionAr,"وصف عربي مستورد");assert.deepEqual(p.scentCharacterEn,["Warm","Captivating"]);assert.deepEqual(p.seo.keywords,["أسد بوربون","عطر لطافة","Asad Bourbon","Lattafa perfume"]);assert.equal(p.price,1200);assert.equal(p.sku,"KEEP");assert.equal(p.inventory.quantity,0);assert.equal(p.images[0].url,"/keep.webp");assert.equal(p.slug,"manual-slug");assert.equal(p.seo.title,"Manual")});

test("a new import replaces old perfume draft values but preserves commerce and images",()=>{const api=globalThis.ORIGOPerfumeBundle,old={performance:{longevity:8},seasonScores:{winter:30},accordProfile:[{nameEn:"Woody",strength:50}],price:900,inventory:{quantity:0},images:[{url:"/old.webp"}]},p=api.applyPerfumeBundleToProduct(old,bundle);assert.equal(p.performance.longevity,7);assert.equal(p.seasonScores.winter,100);assert.equal(p.accordProfile[0].nameEn,"Vanilla");assert.equal(p.accordProfile[0].strength,100);assert.equal(p.price,900);assert.equal(p.inventory.quantity,0);assert.equal(p.images.length,1)});

test("new schema round-trips without perfume data loss",()=>{const api=globalThis.ORIGOPerfumeBundle,p=api.applyPerfumeBundleToProduct({},bundle),out=api.buildPerfumeBundleFromProduct(p);assert.equal(out.perfume.name_ar,bundle.perfume.name_ar);assert.deepEqual(out.perfume.notes,bundle.perfume.notes);assert.equal(out.perfume.accords[0].percentage,100);assert.equal(out.perfume.performance.longevity_hours,7);assert.deepEqual(out.perfume.seasons,bundle.perfume.seasons);assert.deepEqual(out.perfume.time,bundle.perfume.time);assert.equal(out.perfume.short_description_ar,bundle.perfume.short_description_ar);assert.deepEqual(out.perfume.scent_character_en,bundle.perfume.scent_character_en)});

test("validation rejects legacy schema with a clear message",()=>{const legacy={perfume:{name_ar:"قديم"},accords:[],notes:{top:[],heart:[],base:[]},derived:{}};assert.throws(()=>globalThis.ORIGOPerfumeBundle.validatePerfumeBundle(legacy),/صيغة حزمة العطر غير مدعومة/)});

test("validation reports percentage ranges and accepts null and zero",()=>{assert.equal(globalThis.ORIGOPerfumeBundle.validatePerfumeBundle(bundle),true);const bad=structuredClone(bundle);bad.perfume.seasons.winter=101;assert.throws(()=>globalThis.ORIGOPerfumeBundle.validatePerfumeBundle(bad),/perfume\.seasons\.winter/);const oldScale=structuredClone(bundle);oldScale.perfume.time.night=5;assert.equal(globalThis.ORIGOPerfumeBundle.validatePerfumeBundle(oldScale),true);const nullable=structuredClone(bundle);nullable.perfume.size_ml=null;nullable.perfume.release_year=null;nullable.perfume.performance.longevity_hours=null;nullable.perfume.seasons.winter=null;nullable.perfume.time.day=0;assert.equal(globalThis.ORIGOPerfumeBundle.validatePerfumeBundle(nullable),true)});
