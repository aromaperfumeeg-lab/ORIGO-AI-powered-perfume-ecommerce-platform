import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { DatabaseSync } from 'node:sqlite';

const context = vm.createContext({ window: {} });
for (const file of ['fragrance-knowledge.js', 'fragrance-notes-library.js']) {
  vm.runInContext(await readFile(file, 'utf8'), context);
}
const library = context.window.ORIGOFragranceNotes;
const db = new DatabaseSync('data/origo.db', { readOnly: true });
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(r => r.name);
const state = tables.includes('fragrance_notes_state') ? db.prepare('SELECT payload_json FROM fragrance_notes_state WHERE id=1').get() : null;
if (state) library.setState(JSON.parse(state.payload_json));
const products = tables.includes('products') ? db.prepare('SELECT * FROM products').all() : [];
db.close();
const rows = [];
for (const note of library.notes) {
  const url = note.image || '';
  let hash = null;
  let status = url ? (note.imageValidationStatus || 'NEEDS_REVIEW') : 'MISSING_IMAGE';
  if (url && /^\/?assets\//.test(url)) {
    try { hash = createHash('sha256').update(await readFile(url.replace(/^\//, ''))).digest('hex'); }
    catch { status = 'MISSING_IMAGE'; }
  }
  rows.push({ canonicalKey: note.slug, nameAr: note.nameAr, nameEn: note.nameEn, sourceName: note.sourceName,
    imageUrl: url, filename: url.split('/').pop(), hash, status,
    validation: note.imageValidationStatus || 'UNVERIFIED', aliases: note.aliases });
}
const reverse = new Map();
for (const row of rows) {
  const key = row.hash || row.imageUrl;
  if (!key) continue;
  if (!reverse.has(key)) reverse.set(key, []);
  reverse.get(key).push(row.canonicalKey);
}
const duplicates = [...reverse].filter(([,keys]) => new Set(keys).size > 1).map(([asset, canonicalKeys]) => ({asset,canonicalKeys}));
for (const duplicate of duplicates) for (const row of rows) if (duplicate.canonicalKeys.includes(row.canonicalKey)) row.status='DUPLICATE_IMAGE_ACROSS_NOTES';
const report = { generatedAt:new Date().toISOString(), scope:'Library plus persisted note overrides; SQLite opened read-only. Visual semantics are not certified by filenames or hashes.',
  notes:rows.length, products:products.length, valid:rows.filter(r=>r.status==='VALID').length, missing:rows.filter(r=>r.status==='MISSING_IMAGE').length,
  duplicateGroups:duplicates.length, needsReview:rows.filter(r=>r.status==='NEEDS_REVIEW').length, duplicates, rows,
  productNoteFields:products.map(p=>({id:p.id,fields:Object.fromEntries(Object.entries(p).filter(([k])=>/note/i.test(k)))})) };
report.productOccurrences = products.flatMap(product => {
  const values = [];
  for (const [field, raw] of Object.entries(product)) {
    if (!/note/i.test(field)) continue;
    let parsed = raw;
    try { if (typeof raw === 'string') parsed=JSON.parse(raw); } catch {}
    if (Array.isArray(parsed)) for (const name of parsed) if (typeof name === 'string') {
      const note=library.find(name);
      values.push({productId:product.id, sourceField:field, requestedName:name,
        canonicalKey:note?.canonicalKey || note?.slug || null,
        imageUrl:note?.image || null, status:note ? (note.imageValidationStatus || 'NEEDS_REVIEW') : 'WRONG_MAPPING'});
    }
  }
  return values;
});
await mkdir('reports', {recursive:true});
const output = process.argv[2] || 'reports/note-image-audit.json';
await writeFile(output, JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output,notes:report.notes,products:report.products,valid:report.valid,missing:report.missing,duplicateGroups:report.duplicateGroups,needsReview:report.needsReview}));
