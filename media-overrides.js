(()=>{
const sourceSlots={
 'khamrah-studio-v2.webp':'product-khamrah','asad-studio-v2.webp':'product-asad','club-studio-v2.webp':'product-club','caprice-studio-v2.webp':'product-caprice','naque-studio-v2.webp':'product-naque','fakhar-studio-v2.webp':'product-fakhar','silver-crest-v1.webp':'alternative-reference','noir-intense-v1.webp':'alternative-noir','origo-majestic-oud-v1.webp':'alternative-majestic'
};
let media={};
['icon-original','icon-shipping','icon-return','icon-support'].forEach((slot,index)=>{const el=document.querySelectorAll('.benefit-icon')[index];if(el)el.dataset.mediaIconSlot=slot});
['icon-smart-finder','icon-alternative-finder'].forEach((slot,index)=>{const el=document.querySelectorAll('.smart-tool-icon')[index];if(el)el.dataset.mediaIconSlot=slot});
function slotFor(img){if(img.dataset.mediaSlot)return img.dataset.mediaSlot;const src=img.getAttribute('src')||'';return Object.entries(sourceSlots).find(([key])=>src.includes(key))?.[1]}
function apply(root=document){root.querySelectorAll?.('img').forEach(img=>{const slot=slotFor(img),item=media[slot];if(!item||img.dataset.mediaApplied===item.url)return;img.src=item.url;img.alt=document.documentElement.lang==='en'?(item.altEn||item.altAr||img.alt):(item.altAr||item.altEn||img.alt);img.dataset.mediaApplied=item.url});root.querySelectorAll?.('[data-media-icon-slot]').forEach(box=>{const item=media[box.dataset.mediaIconSlot];if(item&&box.dataset.mediaApplied!==item.url){box.innerHTML=`<img class="uploaded-media-icon" src="${item.url}" alt="">`;box.dataset.mediaApplied=item.url}})}
fetch('/api/media').then(r=>r.json()).then(r=>{media=r.media||{};apply();new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)apply(node)}))).observe(document.body,{childList:true,subtree:true})}).catch(()=>{});
})();
