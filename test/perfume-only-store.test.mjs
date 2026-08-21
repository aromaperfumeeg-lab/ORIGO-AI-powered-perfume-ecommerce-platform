import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source=await readFile(new URL("../app.js",import.meta.url),"utf8");
const css=await readFile(new URL("../appearance.css",import.meta.url),"utf8");

test("perfumes-only mode is enabled and controlled from admin settings",()=>{assert.match(source,/perfumeOnlyMode:\s*true/);assert.match(source,/name="perfumeOnlyMode"/);assert.match(source,/perfumeOnlyMode:\s*data\.has\("perfumeOnlyMode"\)/)});
test("mode hides department controls and filters storefront products",()=>{assert.match(source,/classList\.toggle\("perfume-only-store", perfumeOnly\)/);assert.match(css,/\.perfume-only-store \.categories-nav/);assert.match(source,/!perfumeOnly \|\| product\.category === "perfume"/)});
