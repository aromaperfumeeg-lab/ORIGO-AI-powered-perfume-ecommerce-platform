import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8'),css=fs.readFileSync('styles.css','utf8')+fs.readFileSync('smart-finder.css','utf8')+fs.readFileSync('alternative-finder.css','utf8'),js=fs.readFileSync('app.js','utf8');
const adminHtml=fs.readFileSync('admin.html','utf8'),adminCss=fs.readFileSync('admin.css','utf8')+fs.readFileSync('admin-icons.css','utf8')+fs.readFileSync('admin-ai.css','utf8'),adminJs=fs.readFileSync('admin.js','utf8');
const adminLoginHtml=fs.readFileSync('admin-login.html','utf8'),adminLoginCss=fs.readFileSync('admin-login.css','utf8'),adminLoginJs=fs.readFileSync('admin-login.js','utf8');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8')),serviceWorker=fs.readFileSync('service-worker.js','utf8'),notFound=fs.readFileSync('404.html','utf8'),offline=fs.readFileSync('offline.html','utf8');
const ids=new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]));
const hashLinks=[...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]).filter(Boolean);
const checks=[
 ['Arabic RTL',html.includes('dir="rtl"')],
 ['Responsive viewport',html.includes('viewport')],
 ['Six studio product assets',(html+js).match(/-studio-v2\.webp/g)?.length>=6],
 ['Mobile breakpoint',css.includes('@media(max-width:720px)')],
 ['Safe cart persistence',js.includes('readStoredList')&&js.includes('localStorage')],
 ['Arabic/English switch',js.includes('applyLanguage')&&js.includes("dir=lang==='ar'?'rtl':'ltr'")],
 ['Light/dark switch',js.includes('applyTheme')&&css.includes('data-theme="dark"')],
 ['Accessible labels and inert surfaces',html.includes('aria-label')&&html.includes(' inert>')],
 ['Keyboard filter tabs',html.includes('role="tab"')&&js.includes("ArrowLeft")],
 ['Quiz flow',js.includes('quizView')],
 ['Eight-stage full-screen smart finder',js.includes('finderSteps')&&js.includes('finderSelections')&&js.includes('finderSummary')&&css.includes('.finder-progress')],
 ['Preference-based fragrance ranking',js.includes('finderProfiles')&&js.includes('finderRankProducts')&&js.includes('hits*4+budgetScore')],
 ['Dual smart discovery tools',html.includes('smart-tools-grid')&&html.includes('data-open-alternative')&&html.includes('data-open-quiz')],
 ['Smart alternative search and comparison',js.includes('alternativeCatalog')&&js.includes('alternativeResultsView')&&js.includes('alternativeCompareView')&&css.includes('.alternative-result-card')],
 ['Generated alternative product imagery',['silver-crest-v1.webp','noir-intense-v1.webp','origo-majestic-oud-v1.webp'].every(name=>fs.existsSync(`assets/alternatives/${name}`))],
 ['Optimized alternative imagery',['silver-crest-v1.webp','noir-intense-v1.webp','origo-majestic-oud-v1.webp'].every(name=>fs.statSync(`assets/alternatives/${name}`).size<200000)],
 ['Product detail flow',html.includes('product-modal-content')&&js.includes('openProduct')&&js.includes("[data-quick]")],
 ['Wishlist flow',html.includes('favorites-items')&&js.includes('openFavorites')&&js.includes('renderFavorites')],
 ['Two-product comparison flow',html.includes('compare-content')&&js.includes('toggleCompare')&&js.includes('openCompare')],
 ['Four-stage checkout flow',html.includes('checkout-view')&&js.includes("steps:['السلة','العنوان','الدفع','تأكيد الطلب']")&&js.includes('data-place-order')],
 ['Expressive SVG thumbnail system',(html.match(/<symbol id="i-/g)||[]).length>=14&&js.includes('noteIconName')&&css.includes('.visual-thumb')],
 ['Unified navigation icon system',(html.match(/<symbol id="i-/g)||[]).length>=26&&html.includes('#i-home')&&html.includes('id="i-eye"')&&js.includes("'#i-sun':'#i-moon'")],
 ['Modern bilingual typography',css.includes('ORIGO Dubai')&&css.includes('Segoe UI Variable Display')],
 ['Account and order tracking',html.includes('account-content')&&js.includes('openAccount')&&js.includes('data-track-order')],
 ['Cart quantity, promo and rewards',js.includes('data-qty')&&js.includes('ORIGO10')&&js.includes('ORIGO Rewards')],
 ['Secure card fields',js.includes('autocomplete="cc-number"')&&js.includes('autocomplete="cc-csc"')],
 ['Customer rating details',js.includes('customer-reviews')&&css.includes('.rating-bars')],
 ['Interactive expressive product thumbnails',js.includes('renderGalleryView')&&js.includes('data-gallery-view')&&css.includes('.gallery-thumbs')],
 ['Advanced catalog filters',html.includes('catalog-filter-form')&&js.includes('catalogFilters')&&css.includes('.filter-drawer')],
 ['Smart bilingual search suggestions',html.includes('search-suggestions')&&js.includes('renderSearchSuggestions')&&js.includes('origo-searches')&&css.includes('.suggestion-item')],
 ['Admin dashboard shell',adminHtml.includes('admin-sidebar')&&adminJs.includes('function overview')],
 ['Admin orders and inventory',adminJs.includes('function orders')&&adminJs.includes('function productAdmin')],
 ['Admin customers and marketing',adminJs.includes('function customersPage')&&adminJs.includes('function marketingPage')],
 ['Admin advanced analytics',adminJs.includes('function analyticsPage')&&adminCss.includes('.horizontal-bars')],
 ['Admin order detail drawer',adminJs.includes('function openOrderDetail')&&adminHtml.includes('order-detail-content')],
 ['Admin product editor',adminJs.includes('function openProductEditor')&&adminHtml.includes('product-editor-content')],
 ['Admin notifications center',adminJs.includes('function openNotifications')&&adminHtml.includes('notifications-content')],
 ['Admin secure login',adminLoginHtml.includes('admin-login-form')&&adminLoginJs.includes('origo-admin-session')&&adminLoginCss.includes('.login-visual')],
 ['Professional 404 and offline states',notFound.includes('error-code')&&offline.includes('offline-page')],
 ['Installable PWA',manifest.display==='standalone'&&serviceWorker.includes("caches.open(CACHE)")&&html.includes('manifest.webmanifest')],
 ['Offline icon and admin assets',serviceWorker.includes('/admin-icons.css')&&serviceWorker.includes('/admin-ai.css')&&serviceWorker.includes('/assets/icons/admin-sprite.svg')&&serviceWorker.includes('origo-majestic-oud-v1.webp')],
 ['Admin bilingual dark mode',adminJs.includes('origo-admin-lang')&&adminCss.includes('data-theme="dark"')],
 ['Unified admin iconography',adminJs.includes('upgradeAdminIcons')&&adminHtml.includes('admin-sprite.svg#moon')&&adminCss.includes('.channel-icon svg')],
 ['Smart systems administration',adminHtml.includes('data-section="ai-tools"')&&adminJs.includes('aiToolsPage')&&adminCss.includes('.ai-system-card')],
 ['All hash links resolve',hashLinks.every(id=>ids.has(id))],
 ['No missing placeholders',!/(TODO|lorem ipsum|placeholder image)/i.test(html+css+js)]
];
let failed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)failed++}process.exitCode=failed?1:0;
