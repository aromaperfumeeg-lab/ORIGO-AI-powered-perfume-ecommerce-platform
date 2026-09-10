import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
const context=vm.createContext({window:{}});
for(const file of ['fragrance-knowledge.js','fragrance-notes-library.js']) vm.runInContext(await readFile(new URL('../'+file,import.meta.url),'utf8'),context);
const library=context.window.ORIGOFragranceNotes;
const pairs=[['Bergamot','Lime'],['Bergamot','Kaffir Lime'],['Bergamot','Lemon'],['Pear','Apple'],['Jasmine','White Flower'],['Rose','Peony'],['Cedarwood','Sandalwood'],['Vanilla','Tonka Bean'],['Orange Blossom','Orange'],['قشر البرتقال','Orange'],['أوراق البنفسج','Violet'],['أوراق التين','Fig'],['Coriander Seed','Coriander Leaf'],['Cardamom Pod','Cardamom Leaf'],['Rose Petal','Rose Hip'],['Cedarwood','Cedar Leaf'],['Vanilla Bean','Vanilla Flower'],['Blackcurrant Bud','Blackcurrant Fruit']];
for(const [a,b] of pairs) test(`${a} must never resolve to ${b}`,()=>{
  const x=library.find(a),y=library.find(b);
  if(x&&y) assert.notEqual(x.canonicalKey,y.canonicalKey);
  // Unknown exact names must not silently inherit another ingredient's artwork.
  if(!x) assert.equal(library.validateNoteImage(x).valid,false);
  if(!y) assert.equal(library.validateNoteImage(y).valid,false);
});
test('reordering notes preserves canonical mapping',()=>{
 const before=['Bergamot','Pear','Rose'].map(n=>library.find(n));
 for(const note of [...before].reverse()) assert.equal(library.find(note.canonicalKey).image,note.image);
});
test('conflicting id and displayed note name fail closed',()=>{
 assert.equal(library.resolveReference({id:'bergamot',nameEn:'Lemon'}),null);
 assert.equal(library.resolveReference({canonicalKey:'bergamot',nameEn:'Bergamot',nameAr:'برغموت'}).slug,'bergamot');
});
test('uploaded validation flags cannot certify or substitute artwork',()=>{
 const original=library.getState();
 try {
  library.upsertNote({slug:'test-upload',nameEn:'Test upload',image:'assets/notes/generated/bergamot.webp',validated:true,imageValidationStatus:'VALID'});
  const note=library.find('test-upload');
  assert.equal(note.validated,false);
  assert.match(library.artwork(note),/^data:image\/svg/);
  assert.equal(library.validateNoteImage(note,{noteKey:'bergamot',imageUrl:note.image}).status,'WRONG_MAPPING');
 } finally {library.setState(original);}
});
test('cross identity merges cannot replace a note',()=>{
 assert.equal(library.mergeNote('bergamot','lemon'),false);
 assert.equal(library.find('Bergamot').slug,'bergamot');
});
test('generation refuses undefined visual representation',()=>{
 assert.throws(()=>library.generationSpec('Musk'),/NEEDS_REVIEW/);
 const spec=library.generationSpec('bergamot');
 assert.equal(spec.plantPart,'fruit');
 assert.equal(spec.canonicalKey,'bergamot');
});
test('different identities cannot share content under renamed files',()=>{
 const first={noteKey:'bergamot',imageUrl:'a.webp',sha256:'same',sourceImageId:'original'};
 const second={noteKey:'lemon',imageUrl:'b.webp',sha256:'same'};
 assert.equal(library.validateAssetOwnership(second,[first]).status,'DUPLICATE_IMAGE_ACROSS_NOTES');
 assert.equal(library.validateAssetOwnership({...second,sha256:'changed',sourceImageId:'original'},[first]).valid,false);
});
test('same canonical note can reuse its asset across products',()=>{
 const asset={noteKey:'bergamot',sha256:'same'};
 assert.equal(library.validateAssetOwnership(asset,[{...asset}]).valid,true);
});
test('every approved asset still matches the reviewed bytes and locked identity',async()=>{
 for(const [key,asset] of Object.entries(library.reviewedImageAssets)) {
  const note=library.find(key);
  assert.ok(note);
  assert.equal(note.canonicalKey,key);
  assert.equal(library.validateNoteImage(note).valid,true);
  assert.equal(createHash('sha256').update(await readFile(new URL('../'+asset.imageUrl,import.meta.url))).digest('hex'),asset.sha256);
 }
});
