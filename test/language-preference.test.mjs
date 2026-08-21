import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const block = app.slice(app.indexOf('const LANGUAGE_PREFERENCE_KEY'), app.indexOf('const state ='));

function languageApi({ languages = [], language = "", stored = {} } = {}) {
  const storage = new Map(Object.entries(stored));
  const localStorage = { getItem:key => storage.get(key) ?? null, setItem:(key,value) => storage.set(key,value) };
  return Function("navigator", "localStorage", `${block}; return { browserLanguage, normalizeLanguagePreference, savedLanguagePreference, resolveEffectiveLanguage, key:LANGUAGE_PREFERENCE_KEY };`)({ languages, language }, localStorage);
}

test("auto resolves Arabic browser languages and otherwise falls back to English", () => {
  assert.equal(languageApi({ languages:["ar-EG","en-US"] }).resolveEffectiveLanguage("auto"), "ar");
  assert.equal(languageApi({ languages:["fr-FR"], language:"en-US" }).resolveEffectiveLanguage("auto"), "en");
});

test("manual and saved selections override browser language", () => {
  const arabicBrowser = languageApi({ languages:["ar-EG"], stored:{ origoLanguagePreference:"en" } });
  assert.equal(arabicBrowser.savedLanguagePreference(), "en");
  assert.equal(arabicBrowser.resolveEffectiveLanguage(arabicBrowser.savedLanguagePreference()), "en");
  const englishBrowser = languageApi({ languages:["en-US"], stored:{ origoLanguagePreference:"ar" } });
  assert.equal(englishBrowser.resolveEffectiveLanguage(englishBrowser.savedLanguagePreference()), "ar");
});

test("auto remains saved as auto and legacy preference migrates safely", () => {
  assert.equal(languageApi({ stored:{ origoLanguagePreference:"auto" } }).savedLanguagePreference(), "auto");
  assert.equal(languageApi({ stored:{ origoLang:"ar" } }).savedLanguagePreference(), "ar");
  assert.equal(languageApi({ stored:{ origoLanguagePreference:"invalid" } }).savedLanguagePreference(), "auto");
});

test("language application controls direction and exposes Arabic English Auto settings", () => {
  assert.match(app, /document\.documentElement\.dir = isArabic \? "rtl" : "ltr"/);
  assert.match(app, /document\.documentElement\.lang = state\.lang/);
  assert.match(app, /data-language-preference/);
  for (const value of ["auto", "ar", "en"]) assert.match(app, new RegExp(`option value="${value}"`));
  assert.match(app, /localStorage\.setItem\(LANGUAGE_PREFERENCE_KEY, state\.languagePreference\)/);
});

test("language switching is presentation-only and Latin digit formatting stays active", () => {
  const setter = app.slice(app.indexOf("function setLanguagePreference"), app.indexOf("function updateLanguage"));
  assert.doesNotMatch(setter, /perfumeBundle|accord|notes|seasonScores|usageTimeScores|seo/);
  assert.match(app, /numberingSystem:\s*"latn"/);
  assert.match(app, /normalizeRenderedLatinDigits\(document\)/);
});
