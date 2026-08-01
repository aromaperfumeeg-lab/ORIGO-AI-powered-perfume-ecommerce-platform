const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const PRODUCT_IMAGE_PLACEHOLDER = "assets/origo-logo.svg";

const ORIGO_PERFUME_BRANDS = [
  "Lattafa", "Armaf", "Afnan Perfumes", "Paris Corner", "Swiss Arabian", "Rasasi Perfumes",
  "Ajmal", "Maison Alhambra", "Amouage", "French Avenue", "Khadlaj Perfumes", "Arabiyat Prestige",
  "Zimaya", "Gissah", "Al Majed Oud", "Ibrahim Al Qurashi", "Gulf Orchid", "Reef",
  "Ard Al Zaafaran", "Laverne", "Matin Martin", "Dkhoon AlEmiratia", "Alezz", "Sedra",
  "Assaf", "Volaré", "Le Bonheur Perfumes", "Le Falcone Perfumes", "Otoori", "الرونق للعطور", "Rayhaan"
];

const ORIGO_BRAND_LOGOS = {
  "Lattafa": "assets/brands/lattafa.webp",
  "Armaf": "assets/brands/armaf.jpeg",
  "Afnan Perfumes": "assets/brands/afnan.jpeg",
  "Paris Corner": "assets/brands/paris-corner.jpeg",
  "Swiss Arabian": "assets/brands/swiss-arabian.jpeg",
  "Rasasi Perfumes": "assets/brands/rasasi.jpeg",
  "Ajmal": "assets/brands/ajmal.jpeg",
  "Maison Alhambra": "assets/brands/maison-alhambra.jpeg",
  "Amouage": "assets/brands/amouage.jpeg",
  "French Avenue": "assets/brands/french-avenue.jpeg",
  "Khadlaj Perfumes": "assets/brands/khadlaj.jpeg",
  "Arabiyat Prestige": "assets/brands/arabiyat-prestige.jpeg",
  "Zimaya": "assets/brands/zimaya.webp",
  "Gissah": "assets/brands/gissah.jpeg",
  "Al Majed Oud": "assets/brands/al-majed-oud.jpeg",
  "Ibrahim Al Qurashi": "assets/brands/ibrahim-al-qurashi.jpeg",
  "Gulf Orchid": "assets/brands/gulf-orchid.jpeg",
  "Reef": "assets/brands/reef.jpeg",
  "Ard Al Zaafaran": "assets/brands/ard-al-zaafaran.jpeg",
  "Laverne": "assets/brands/laverne.jpeg",
  "Matin Martin": "assets/brands/matin-martin.jpeg",
  "Dkhoon AlEmiratia": "assets/brands/dkhoon-alemiratia.jpeg",
  "Alezz": "assets/brands/alezz.jpeg",
  "Sedra": "assets/brands/sedra.jpeg",
  "Assaf": "assets/brands/assaf.jpeg",
  "Volaré": "assets/brands/volare.jpeg",
  "Le Bonheur Perfumes": "assets/brands/le-bonheur.jpeg",
  "Le Falcone Perfumes": "assets/brands/le-falcone.jpeg",
  "Otoori": "assets/brands/otoori.jpg",
  "الرونق للعطور": "assets/brands/alrawnaq.jpeg",
  "Rayhaan": "assets/brands/rayhaan.jpeg"
};

function origoBrandLogo(brand) {
  const target = String(brand || "").trim();
  const key = Object.keys(ORIGO_BRAND_LOGOS).find((name) => name.localeCompare(target, undefined, { sensitivity: "base" }) === 0);
  return key ? ORIGO_BRAND_LOGOS[key] : "";
}

const ORIGO_HOME_CATEGORIES = [
  ["perfume", "العطور", "Perfumes", "♨"], ["skincare", "العناية بالبشرة", "Skincare", "♧"],
  ["haircare", "العناية بالشعر", "Hair care", "♟"], ["bodycare", "العناية بالجسم", "Body care", "♡"],
  ["incense", "البخور والمباخر", "Incense", "♨"], ["home", "العطور المنزلية", "Home fragrance", "⌂"],
  ["gifts", "الهدايا", "Gifts", "🎁"]
];

const ORIGO_HOME_BENEFITS = [
  ["authentic", "منتجات أصلية", "Authentic products"], ["shipping", "شحن سريع", "Fast shipping"],
  ["returns", "استرجاع سهل", "Easy returns"], ["prices", "أسعار منافسة", "Competitive prices"],
  ["cod", "الدفع عند الاستلام", "Cash on delivery"], ["gift", "تغليف فاخر", "Luxury wrapping"],
  ["support", "دعم العملاء", "Customer support"]
];

const ORIGO_LUXURY_ICONS = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  user: '<circle cx="12" cy="8" r="3.7"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m20 20-4.4-4.4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
  sun: '<circle cx="12" cy="12" r="3.6"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.2 15.2A8.4 8.4 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  diamond: '<path d="m12 3 8 8-8 10-8-10 8-8Z"/><path d="m4 11 8 3 8-3M12 3v11"/>',
  sparkle: '<path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  crown: '<path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 11H5L3 7Z"/><path d="M6 21h12"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  arrows: '<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3"/>',
  perfume: '<path d="M9 3h6v4H9zM8 7h8l2 4v9H6v-9l2-4Z"/><path d="M9 13h6v4H9z"/>',
  skincare: '<path d="M12 3c3 4 6 7.4 6 11a6 6 0 0 1-12 0c0-3.6 3-7 6-11Z"/><path d="M9 15c.5 1.4 1.5 2 3 2"/>',
  hair: '<path d="M5 20c7-2 11-7 14-16M8 18c-1-5 1-9 7-12M11 15c4 0 7-2 9-5"/>',
  body: '<circle cx="12" cy="5" r="2.5"/><path d="M9 9h6l2 5-2 7M9 9l-2 5 2 7M9 14h6"/>',
  flame: '<path d="M13 2c1 5-3 6-1 10 1-2 3-3 5-4 2 3 3 5 2 8a7 7 0 0 1-14 0c0-4 3-7 6-10 0 3 1 4 2 5"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5L12 9Zm0 0h3.5A2.5 2.5 0 1 0 13 6.5L12 9Z"/>',
  tag: '<path d="M20 13 13 20l-9-9V4h7l9 9Z"/><circle cx="8.5" cy="8.5" r="1.2"/>',
  shield: '<path d="M12 3 20 6v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.3 2.3 4.8-5"/>',
  truck: '<path d="M3 6h11v11H3zM14 10h4l3 4v3h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
  returns: '<path d="M4 9V4l3 3a8 8 0 1 1-2 8"/><path d="M4 4h5"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 9h18M7 15h4"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Zm16 0h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2ZM17 19c0 2-2 2-4 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>'
};

function luxuryIcon(name, className = "") {
  const key = ORIGO_LUXURY_ICONS[name] ? name : "sparkle";
  return `<svg class="origo-lux-icon origo-lux-icon--${key}${className ? ` ${className}` : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ORIGO_LUXURY_ICONS[key]}</svg>`;
}

const HOME_CATEGORY_LUXURY_ICONS = {
  perfume: "perfume", skincare: "skincare", haircare: "hair", bodycare: "body",
  incense: "flame", home: "home", gifts: "gift", offers: "tag"
};

const HOME_BENEFIT_LUXURY_ICONS = {
  authentic: "shield", shipping: "truck", returns: "returns", prices: "tag",
  cod: "card", gift: "gift", support: "headset", samples: "perfume"
};

function setLuxuryIcon(element, name) {
  if (!element || element.querySelector("img")) return;
  element.innerHTML = luxuryIcon(name);
  element.dataset.luxuryIcon = name;
}

function hydrateLuxuryIcons(root = document) {
  const headerIcons = [
    [".cart-button > svg", "bag"], [".wishlist-button > svg", "heart"],
    [".account-button > svg", "user"], [".header-search > svg", "search"],
    [".global-search > svg", "search"]
  ];
  headerIcons.forEach(([selector, name]) => $$(selector, root).forEach((icon) => icon.outerHTML = luxuryIcon(name)));
  $$(".mobile-menu-button", root).forEach((button) => setLuxuryIcon(button, "menu"));
  $$(".mobile-menu-search > span:first-child", root).forEach((icon) => setLuxuryIcon(icon, "search"));
  $$(".theme-toggle .sun", root).forEach((icon) => setLuxuryIcon(icon, "sun"));
  $$(".theme-toggle .moon", root).forEach((icon) => setLuxuryIcon(icon, "moon"));

  const navigation = [
    ['.category-nav [data-action="catalog-home"] .nav-icon', "home"],
    ['.category-nav [data-action="brands-menu"] .nav-icon', "diamond"],
    ['.category-nav [data-action="categories-menu"] .nav-icon', "grid"],
    ['.category-nav a[href="#best-sellers"] .nav-icon', "crown"],
    ['.category-nav a[href="#new-arrivals"] .nav-icon', "sparkle"],
    ['.category-nav a[href="#site-footer"] .nav-icon', "info"],
    ['.category-nav [data-action="open-alternatives"] .nav-icon', "arrows"],
    ['.category-nav [data-action="find-matches"] .nav-icon', "sparkle"]
  ];
  navigation.forEach(([selector, name]) => $$(selector, root).forEach((icon) => setLuxuryIcon(icon, name)));
  $$(".category-nav .brands-nav > button > i", root).forEach((icon) => setLuxuryIcon(icon, "chevron"));

  const bottomIcons = ["home", "grid", "sparkle", "bag", "user"];
  $$(".store-bottom-nav > * > span:first-child", root).forEach((icon, index) => setLuxuryIcon(icon, bottomIcons[index] || "sparkle"));
  $$(".gender-card .gender-copy > span:first-child", root).forEach((icon, index) => setLuxuryIcon(icon, index === 2 ? "heart" : "user"));
  $$(".loyalty-strip article > span:first-child", root).forEach((icon, index) => setLuxuryIcon(icon, ["tag", "diamond", "sparkle", "crown"][index] || "sparkle"));
  $$(".ai-banner [data-action='find-matches'] > span:last-child", root).forEach((icon) => setLuxuryIcon(icon, "sparkle"));
  $$(".ai-banner .ai-robot", root).forEach((icon) => setLuxuryIcon(icon, "sparkle"));
  $$(".footer-spark", root).forEach((icon) => setLuxuryIcon(icon, "sparkle"));
  $$(".footer-email-field > span:first-child", root).forEach((icon) => setLuxuryIcon(icon, "mail"));
  $$("#footer-support-email > span:first-child", root).forEach((icon) => setLuxuryIcon(icon, "mail"));
  $$("#footer-support-whatsapp > span:first-child", root).forEach((icon) => setLuxuryIcon(icon, "headset"));
  $$("#footer-support-hours", root).forEach((hours) => {
    const icon = hours.previousElementSibling;
    if (icon) setLuxuryIcon(icon, "clock");
  });

  const footerShopIcons = ["user", "user", "heart", "arrows", "perfume", "perfume", "tag", "sparkle"];
  $$(".site-footer .footer-column:first-child > a > span:last-child", root).forEach((icon, index) => setLuxuryIcon(icon, footerShopIcons[index] || "chevron"));
  $$(".site-footer .footer-column:nth-child(2) .footer-all-link > span:last-child", root).forEach((icon) => setLuxuryIcon(icon, "grid"));
  const footerInfoIcons = ["info", "info", "truck", "returns", "shield", "info", "bag"];
  $$(".site-footer .footer-column:nth-child(3) > a > span:last-child, .site-footer .footer-column:nth-child(3) > button > span:last-child", root)
    .forEach((icon, index) => setLuxuryIcon(icon, footerInfoIcons[index] || "chevron"));
  $$(".mobile-menu-panel [data-action='account'] > span:first-child", root).forEach((icon) => setLuxuryIcon(icon, "user"));
  $$(".mobile-admin-link > span:first-child", root).forEach((icon) => setLuxuryIcon(icon, "grid"));

  $$('[data-home-category-icon]', root).forEach((icon) => {
    if (!icon.querySelector("img")) setLuxuryIcon(icon, HOME_CATEGORY_LUXURY_ICONS[icon.dataset.homeCategoryIcon] || "sparkle");
  });
  $$('[data-home-benefit]', root).forEach((item) => {
    const icon = $(".benefit-icon", item);
    if (icon && !icon.querySelector("img")) setLuxuryIcon(icon, HOME_BENEFIT_LUXURY_ICONS[item.dataset.homeBenefit] || "shield");
  });
}

const translations = {
  ar: {
    announcement: "توصيل مجاني للطلبات فوق 3,000 ج.م · عيّنة مجانية مع كل طلب",
    topFastDelivery: "توصيل سريع",
    topAuthentic: "منتجات أصلية 100%",
    topSupport: "دعم العملاء",
    topExclusive: "عروض حصرية",
    adminLink: "إدارة المنتجات",
    brandTagline: "أصل الحكاية العطرية",
    headerSearchTitle: "ابحث عن منتج أو براند",
    headerSearchHint: "عطر، عناية، بخور...",
    navPerfumes: "العطور",
    navSkincare: "العناية بالبشرة",
    navHaircare: "العناية بالشعر",
    navIncense: "البخور والمباخر",
    navDeodorants: "مزيلات العرق",
    navBrands: "العلامات التجارية",
    featuredBrands: "براندات مختارة",
    account: "الحساب",
    language: "English",
    categories: "الفئات",
    navCategories: "الفئات",
    shopByGender: "تسوق حسب الجنس",
    appearance: "المظهر",
    shop: "المتجر",
    discover: "اكتشف عطرك",
    notesLibrary: "مكتبة النوتات",
    perfumeGuide: "الدليل العطري",
    offers: "العروض",
    heroEyebrow: "مجموعة ORIGO الخاصة · 2026",
    heroTitle: "ليس عطرًا فقط.<br />إنه <em>أثرٌ يبقى.</em>",
    heroBody: "اكتشف تركيبات منتقاة بعناية، وافهم نوتاتها، ثم اختر العطر الذي يشبه حضورك.",
    shopNow: "تسوّق المجموعة",
    findMyScent: "ساعدني أختار",
    finderEntry: "اكتشف عطرًا يناسب ذوقك",
    finderName: "مكتشف العطر المناسب لذوقك",
    finderIntroShort: "أجب عن أسئلة بسيطة عن ذوقك<br />لنرشح لك أفضل العطور المناسبة",
    finderResultsTitle: "العطور الأنسب لذوقك",
    finderResultsPromo: "تحليل واضح لاختياراتك وربطها<br />بمنتجات ORIGO المتوفرة",
    alternatives: "البدائل",
    alternativeFinderName: "مكتشف البديل الذكي",
    alternativeFinderIntro: "اكتب اسم عطر تعرفه<br />لنقترح بديل ORIGO الأقرب له",
    alternativeSearchLabel: "عن أي عطر تبحث؟",
    alternativeSearchPlaceholder: "مثال: Oud Wood",
    search: "ابحث",
    viewAll: "عرض الكل",
    navBodycare: "العناية بالجسم",
    navHomeFragrance: "المعطرات المنزلية",
    gifts: "الهدايا",
    happyClients: "عميل وجدوا عطرهم",
    scroll: "اكتشف",
    authentic: "أصلي 100%",
    authenticSub: "مصادر موثوقة ومختارة",
    samples: "عينات قبل الالتزام",
    samplesSub: "جرّب الرائحة على بشرتك",
    fastDelivery: "توصيل سريع",
    fastDeliverySub: "خلال 2–4 أيام عمل",
    consult: "استشارة عطرية",
    consultSub: "ترشيحات حسب ذوقك",
    curated: "مختارات المحرر",
    bestSellers: "الأكثر مبيعًا",
    all: "الكل",
    men: "رجالي",
    women: "نسائي",
    unisex: "للجنسين",
    limited: "إصدار محدود",
    storyTitle: "حين يلتقي<br />العود <em>بالذهب.</em>",
    storyBody: "دفء العود الكمبودي يلتف حول فانيليا داكنة ولمسة زعفران مضيئة. تركيبة مسائية ذات أثر واثق وثبات طويل.",
    saffron: "زعفران",
    oud: "عود كمبودي",
    vanilla: "فانيليا سوداء",
    opening: "الافتتاحية",
    heart: "القلب",
    base: "القاعدة",
    discoverCollection: "اكتشف المجموعة",
    scentFinder: "مستكشف ORIGO",
    finderTitle: "ما المزاج الذي<br />تبحث عنه؟",
    finderBody: "اختر النوتات التي تحبها وسنرتب العطور حسب نسبة التطابق، لا حسب تشابه الاسم.",
    matchingScents: "عطرًا متاحًا للمطابقة",
    chooseNotes: "اختر حتى 4 نوتات",
    clear: "مسح الاختيار",
    citrus: "حمضيات",
    rose: "ورد",
    oudShort: "عود",
    vanillaShort: "فانيليا",
    spices: "توابل",
    musk: "مسك",
    amber: "عنبر",
    woods: "أخشاب",
    showMatches: "اعرض أفضل التطابقات",
    olfactoryAtlas: "أطلس الروائح",
    notesTitle: "اقرأ العطر<br />من <em>مكوّناته.</em>",
    notesBody: "مكتبة بصرية مبسطة تساعدك على فهم كل نوتة والعطور التي تظهر فيها.",
    browseNotes: "تصفح كل النوتات",
    freshBright: "منعشة · مضيئة",
    citrusFruits: "الفواكه والحمضيات",
    citrusExamples: "برغموت · ليمون · برتقال مر",
    softExpressive: "ناعمة · معبّرة",
    flowers: "الزهور",
    floralExamples: "ورد · ياسمين · زهر البرتقال",
    deepWarm: "عميقة · دافئة",
    woodsOud: "الأخشاب والعود",
    woodExamples: "صندل · أرز · عود",
    sweetAddictive: "حلوة · آسرة",
    gourmand: "الحلوى والمأكولات",
    gourmandExamples: "فانيليا · كراميل · قهوة",
    insidePerfume: "داخل العطر",
    readProfile: "ملف عطري كامل، بوضوح.",
    profileIntro: "نعرض ما يهمك فعلًا: النوتات، قوة الأكوردات، الثبات، الفوحان، الموسم، والقيمة.",
    editorsPick: "اختيار المحرر",
    nocturneDesc: "شرقي خشبي للجنسين · عطر مركز 75 مل",
    addToBag: "أضف للسلة",
    composition: "التركيبة",
    scentPyramid: "الهرم العطري",
    openingNotes: "الافتتاحية",
    bergamot: "برغموت",
    pinkPepper: "فلفل وردي",
    sage: "مريمية",
    heartNotes: "قلب العطر",
    turkishRose: "ورد تركي",
    baseNotes: "المكونات الأساسية",
    whiteMusk: "مسك أبيض",
    sandalwood: "صندل",
    identity: "الهوية",
    mainAccords: "الأكوردات الرئيسية",
    woody: "خشبي",
    warmSpicy: "توابل دافئة",
    smoky: "دخاني",
    season: "الموسم",
    autumnWinter: "خريف · شتاء",
    time: "الوقت",
    evening: "مسائي",
    gender: "النوع",
    performance: "الأداء",
    longevity: "الثبات",
    weak: "ضعيف",
    eternal: "أبدي",
    longevityNote: "يبقى ملحوظًا من 8 إلى 10 ساعات على البشرة.",
    presence: "الحضور",
    sillage: "الفوحان",
    soft: "ناعم",
    enormous: "هائل",
    sillageNote: "هالة واضحة في الساعات الأولى ثم تصبح أقرب.",
    investment: "الاستثمار",
    value: "قيمة السعر",
    overpriced: "مبالغ",
    greatValue: "قيمة رائعة",
    valueNote: "تركيز مرتفع وأداء قوي مقابل كل رشة.",
    smartAlternative: "البديل الذكي",
    alternativeTitle: "تحب عطرًا مشهورًا؟<br /><em>سنجد لك الأقرب.</em>",
    alternativeBody: "نقارن البصمة العطرية: القاعدة 35%، القلب 25%، الافتتاحية 15%، الأكوردات 15%، والعائلة والأداء 10%.",
    alternativePlaceholder: "اكتب اسم عطر… مثل: Ombre Leather",
    compare: "قارن",
    algorithmHint: "النتائج لا تعتمد على تشابه الاسم.",
    closestMatch: "أقرب تطابق",
    whyMatch: "لماذا هذا الترشيح؟",
    matchReason: "يشترك معه في الجلد، الهيل، العنبر، والقاعدة الخشبية الداكنة مع ثبات متقارب.",
    origoJournal: "دفتر ORIGO",
    knowScent: "اعرف رائحتك أكثر.",
    allArticles: "كل المقالات",
    guide: "دليل",
    layeringTitle: "فن تنسيق طبقات العطر دون أن تفقد هويتك",
    ingredients: "مكوّنات",
    oudTitle: "كيف تميّز العود الصافي من الدخاني؟",
    selection: "اختيار",
    seasonTitle: "عطور للصيف… بلا حضور صارخ",
    readMore: "اقرأ أكثر",
    privateCircle: "دائرة ORIGO الخاصة",
    newsletterTitle: "رسائل قليلة.<br />اختيارات <em>تستحق.</em>",
    newsletterLabel: "كن أول من يعرف عن الإصدارات والعينات الجديدة.",
    emailPlaceholder: "بريدك الإلكتروني",
    join: "انضم",
    privacy: "لا رسائل مزعجة. يمكنك المغادرة في أي وقت.",
    footerBody: "متجر ومنصة اكتشاف تساعدك على فهم العطر قبل امتلاكه.",
    explore: "اكتشف",
    newArrivals: "وصل حديثًا",
    service: "الخدمة",
    shipping: "الشحن والتوصيل",
    returns: "الاستبدال والاسترجاع",
    contact: "تواصل معنا",
    about: "عن ORIGO",
    ourStory: "قصتنا",
    authenticity: "ضمان الأصالة",
    rights: "جميع الحقوق محفوظة.",
    home: "الرئيسية",
    search: "بحث",
    favorites: "المفضلة",
    bag: "السلة",
    smartSearch: "بحث ORIGO الذكي",
    searchPrompt: "عمّ تبحث اليوم؟",
    searchPlaceholder: "اسم العطر، البراند، أو نوتة…",
    popularSearches: "الأكثر بحثًا",
    viewAllResults: "عرض كل النتائج",
    yourSelection: "اختياراتك",
    subtotal: "المجموع",
    checkout: "إتمام الطلب",
    shippingCalculated: "الشحن والخصم يُحسبان في الخطوة التالية.",
    checkoutEyebrow: "إتمام الطلب",
    deliveryDetails: "بيانات التوصيل",
    checkoutIntro: "راجع بياناتك، وسنتواصل معك لتأكيد الطلب قبل الشحن.",
    fullName: "الاسم بالكامل",
    phone: "رقم الهاتف",
    governorate: "المحافظة",
    chooseGovernorate: "اختر المحافظة",
    address: "العنوان بالتفصيل",
    orderNotes: "ملاحظات للطلب (اختياري)",
    cashOnDelivery: "الدفع عند الاستلام",
    cashOnDeliveryBody: "ادفع نقدًا عند وصول الطلب.",
    confirmOrder: "تأكيد الطلب",
    orderSummary: "ملخص الطلب",
    total: "الإجمالي",
    storeOrders: "طلبات المتجر",
    manageOrders: "متابعة الطلبات",
    orders: "الطلبات",
    catalogStudio: "استوديو الكتالوج",
    smartImport: "إضافة المنتج الذكية",
    smartImportBody: "نجمع البيانات من مصادر عامة مسموحة، ثم تبقى بانتظار مراجعتك قبل الحفظ.",
    webSearch: "البحث والاقتراحات",
    reviewData: "مراجعة وتعديل",
    publish: "نشر المنتج",
    saveProduct: "حفظ المنتج",
    catalogProducts: "منتج محفوظ",
    catalogDrafts: "مسودة",
    catalogPublished: "منشور",
    productPanel: "لوحة المنتجات",
    recentProducts: "أحدث المنتجات",
    webSearchPlaceholder: "مثال: Dior Sauvage Eau de Parfum",
    searchWeb: "بحث شامل",
    sourceNote: "مصادر مهيكلة ومسموحة، وقاعدة مكونات محلية، وبحث OpenAI اختياري بمصادر إنترنت قابلة للمراجعة. يظهر Fragrantica كمرجع يدوي فقط ما لم يتوفر API مصرح به. لن يُحفظ شيء دون مراجعتك.",
    startProductSearch: "ابدأ باسم المنتج أو الباركود",
    startProductSearchBody: "ستظهر اقتراحات مباشرة، ثم نجمع البيانات ونوضح مصدر كل معلومة ونسبة الثقة.",
    quickView: "نظرة سريعة",
    savedScents: "عطور محفوظة",
    continueShopping: "تابع التسوق",
    fragranceDetails: "تفاصيل العطر",
    wishlistEmptyTitle: "لم تحفظ أي عطر بعد",
    wishlistEmptyBody: "اضغط على القلب بجانب أي عطر ليبقى قريبًا منك.",
    removeFavorite: "إزالة من المفضلة",
    decreaseQuantity: "تقليل الكمية",
    increaseQuantity: "زيادة الكمية",
    home: "الرئيسية"
  },
  en: {
    announcement: "Free delivery over EGP 3,000 · A complimentary sample with every order",
    topFastDelivery: "Fast delivery",
    topAuthentic: "100% authentic",
    topSupport: "Customer support",
    topExclusive: "Exclusive offers",
    adminLink: "Product studio",
    brandTagline: "The origin of scent",
    headerSearchTitle: "Search products or brands",
    headerSearchHint: "Perfume, care, incense...",
    navPerfumes: "Perfumes",
    navSkincare: "Skin care",
    navHaircare: "Hair care",
    navIncense: "Incense & burners",
    navDeodorants: "Deodorants",
    navBrands: "Brands",
    featuredBrands: "Featured brands",
    account: "Account",
    language: "العربية",
    categories: "Categories",
    navCategories: "Categories",
    shopByGender: "Shop by gender",
    appearance: "Appearance",
    shop: "Shop",
    discover: "Find your scent",
    notesLibrary: "Notes library",
    perfumeGuide: "Scent guide",
    offers: "Offers",
    heroEyebrow: "ORIGO PRIVATE COLLECTION · 2026",
    heroTitle: "Not just a fragrance.<br />A <em>trace that remains.</em>",
    heroBody: "Explore carefully curated compositions, understand their notes, and choose the scent that feels like your presence.",
    shopNow: "Shop the collection",
    findMyScent: "Help me choose",
    finderEntry: "Discover a Fragrance That Matches Your Taste",
    finderName: "Fragrance Finder for Your Taste",
    finderIntroShort: "Answer a few simple questions about your taste<br />to discover the best matching fragrances",
    finderResultsTitle: "Fragrances That Best Match Your Taste",
    finderResultsPromo: "Clear preference analysis connected<br />to available ORIGO products",
    alternatives: "Alternatives",
    alternativeFinderName: "Smart Alternative Finder",
    alternativeFinderIntro: "Enter a fragrance you know<br />to find the closest ORIGO alternative",
    alternativeSearchLabel: "Which fragrance are you looking for?",
    alternativeSearchPlaceholder: "Example: Oud Wood",
    search: "Search",
    viewAll: "View all",
    navBodycare: "Body care",
    navHomeFragrance: "Home fragrance",
    gifts: "Gifts",
    happyClients: "clients found their scent",
    scroll: "Explore",
    authentic: "100% authentic",
    authenticSub: "Trusted, curated sources",
    samples: "Sample before committing",
    samplesSub: "Try the fragrance on skin",
    fastDelivery: "Fast delivery",
    fastDeliverySub: "Within 2–4 business days",
    consult: "Scent consultation",
    consultSub: "Recommendations for your taste",
    curated: "EDITOR'S CURATION",
    bestSellers: "Best sellers",
    all: "All",
    men: "Men",
    women: "Women",
    unisex: "Unisex",
    limited: "LIMITED EDITION",
    storyTitle: "When oud<br />meets <em>gold.</em>",
    storyBody: "Cambodian oud wraps around dark vanilla and a bright touch of saffron. A confident evening composition with lasting depth.",
    saffron: "Saffron",
    oud: "Cambodian oud",
    vanilla: "Black vanilla",
    opening: "Opening",
    heart: "Heart",
    base: "Base",
    discoverCollection: "Discover the collection",
    scentFinder: "ORIGO SCENT FINDER",
    finderTitle: "What mood are<br />you looking for?",
    finderBody: "Choose the notes you love and we will rank perfumes by actual profile match—not name similarity.",
    matchingScents: "scents ready to match",
    chooseNotes: "Choose up to 4 notes",
    clear: "Clear",
    citrus: "Citrus",
    rose: "Rose",
    oudShort: "Oud",
    vanillaShort: "Vanilla",
    spices: "Spices",
    musk: "Musk",
    amber: "Amber",
    woods: "Woods",
    showMatches: "Show my best matches",
    olfactoryAtlas: "OLFACTORY ATLAS",
    notesTitle: "Read a fragrance<br />through its <em>notes.</em>",
    notesBody: "A visual library that makes each note and its related perfumes easy to understand.",
    browseNotes: "Browse all notes",
    freshBright: "Fresh · Bright",
    citrusFruits: "Fruits & citrus",
    citrusExamples: "Bergamot · Lemon · Bitter orange",
    softExpressive: "Soft · Expressive",
    flowers: "Flowers",
    floralExamples: "Rose · Jasmine · Orange blossom",
    deepWarm: "Deep · Warm",
    woodsOud: "Woods & oud",
    woodExamples: "Sandalwood · Cedar · Oud",
    sweetAddictive: "Sweet · Addictive",
    gourmand: "Gourmand",
    gourmandExamples: "Vanilla · Caramel · Coffee",
    insidePerfume: "INSIDE THE SCENT",
    readProfile: "A complete scent profile, clearly.",
    profileIntro: "See what matters: notes, accord strength, longevity, sillage, season, and value.",
    editorsPick: "EDITOR'S PICK",
    nocturneDesc: "Woody oriental unisex · Parfum 75 ml",
    addToBag: "Add to cart",
    composition: "COMPOSITION",
    scentPyramid: "Scent pyramid",
    openingNotes: "Top notes",
    bergamot: "Bergamot",
    pinkPepper: "Pink pepper",
    sage: "Sage",
    heartNotes: "Heart notes",
    turkishRose: "Turkish rose",
    baseNotes: "Base notes",
    whiteMusk: "White musk",
    sandalwood: "Sandalwood",
    identity: "IDENTITY",
    mainAccords: "Main accords",
    woody: "Woody",
    warmSpicy: "Warm spicy",
    smoky: "Smoky",
    season: "Season",
    autumnWinter: "Autumn · Winter",
    time: "Time",
    evening: "Evening",
    gender: "Gender",
    performance: "PERFORMANCE",
    longevity: "Longevity",
    weak: "Weak",
    eternal: "Eternal",
    longevityNote: "Noticeable for 8 to 10 hours on skin.",
    presence: "PRESENCE",
    sillage: "Sillage",
    soft: "Soft",
    enormous: "Enormous",
    sillageNote: "A clear aura at first, then settles closer.",
    investment: "INVESTMENT",
    value: "Price value",
    overpriced: "Overpriced",
    greatValue: "Great value",
    valueNote: "High concentration and strong performance per spray.",
    smartAlternative: "SMART ALTERNATIVE",
    alternativeTitle: "Love an iconic scent?<br /><em>We’ll find your closest.</em>",
    alternativeBody: "We compare the scent fingerprint: base 35%, heart 25%, top 15%, accords 15%, and family plus performance 10%.",
    alternativePlaceholder: "Enter a perfume… e.g. Ombre Leather",
    compare: "Compare",
    algorithmHint: "Results never rely on name similarity.",
    closestMatch: "CLOSEST MATCH",
    whyMatch: "Why this match?",
    matchReason: "It shares leather, cardamom, amber and a dark woody base with similar longevity.",
    origoJournal: "ORIGO JOURNAL",
    knowScent: "Know your scent better.",
    allArticles: "All articles",
    guide: "GUIDE",
    layeringTitle: "The art of layering perfume without losing your identity",
    ingredients: "INGREDIENTS",
    oudTitle: "How to tell pure oud from smoky oud",
    selection: "SELECTION",
    seasonTitle: "Summer scents with quiet presence",
    readMore: "Read more",
    privateCircle: "ORIGO PRIVATE CIRCLE",
    newsletterTitle: "Fewer emails.<br /><em>Worthy choices.</em>",
    newsletterLabel: "Be first to know about new releases and samples.",
    emailPlaceholder: "Your email address",
    join: "Join",
    privacy: "No clutter. Leave anytime.",
    footerBody: "A store and discovery platform that helps you understand fragrance before owning it.",
    explore: "Explore",
    newArrivals: "New arrivals",
    service: "Service",
    shipping: "Shipping & delivery",
    returns: "Returns & exchanges",
    contact: "Contact us",
    about: "About ORIGO",
    ourStory: "Our story",
    authenticity: "Authenticity promise",
    rights: "All rights reserved.",
    home: "Home",
    search: "Search",
    favorites: "Favorites",
    bag: "Cart",
    smartSearch: "ORIGO SMART SEARCH",
    searchPrompt: "What are you looking for?",
    searchPlaceholder: "Perfume, brand, or note…",
    popularSearches: "Popular",
    viewAllResults: "View all results",
    yourSelection: "YOUR SELECTION",
    subtotal: "Subtotal",
    checkout: "Checkout",
    shippingCalculated: "Shipping and discounts are calculated next.",
    checkoutEyebrow: "CHECKOUT",
    deliveryDetails: "Delivery details",
    checkoutIntro: "Review your details. We will contact you to confirm before shipping.",
    fullName: "Full name",
    phone: "Phone number",
    governorate: "Governorate",
    chooseGovernorate: "Choose a governorate",
    address: "Detailed address",
    orderNotes: "Order notes (optional)",
    cashOnDelivery: "Cash on delivery",
    cashOnDeliveryBody: "Pay in cash when your order arrives.",
    confirmOrder: "Confirm order",
    orderSummary: "ORDER SUMMARY",
    total: "Total",
    storeOrders: "STORE ORDERS",
    manageOrders: "Manage orders",
    orders: "Orders",
    catalogStudio: "CATALOG STUDIO",
    smartImport: "Smart product import",
    smartImportBody: "We gather data from permitted public sources, then hold it for your review before saving.",
    webSearch: "Search & suggestions",
    reviewData: "Review & edit",
    publish: "Publish",
    saveProduct: "Save product",
    catalogProducts: "saved products",
    catalogDrafts: "drafts",
    catalogPublished: "published",
    productPanel: "PRODUCT PANEL",
    recentProducts: "Recent products",
    webSearchPlaceholder: "Example: Dior Sauvage Eau de Parfum",
    searchWeb: "Search sources",
    sourceNote: "Permitted structured sources, a local ingredient knowledge base, and optional OpenAI web research with reviewable citations. Fragrantica remains manual-reference only unless an Authorized API is licensed. Nothing is saved without review.",
    startProductSearch: "Start with a product name or barcode",
    startProductSearchBody: "Live suggestions appear first, then we collect data and show the source and confidence for every draft.",
    quickView: "Quick view",
    savedScents: "SAVED SCENTS",
    continueShopping: "Continue shopping",
    fragranceDetails: "FRAGRANCE DETAILS",
    wishlistEmptyTitle: "No saved scents yet",
    wishlistEmptyBody: "Tap the heart beside a fragrance to keep it close.",
    removeFavorite: "Remove from favorites",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    home: "Home"
  }
};

const baseProducts = [
  {
    id: "nocturne",
    brand: "ORIGO PRIVATE BLEND",
    nameAr: "NOCTURNE 01",
    nameEn: "NOCTURNE 01",
    type: "للجنسين",
    typeEn: "Unisex",
    category: "perfume",
    concentration: "Parfum",
    sizes: ["75 ML"],
    status: "published",
    sku: "ORI-NOC-01",
    notesAr: ["عود", "ورد", "عنبر"],
    notesEn: ["Oud", "Rose", "Amber"],
    gender: "unisex", mainIngredients: ["عود", "ورد", "عنبر"], seasons: ["winter", "autumn"], usageTimes: ["night"], occasions: ["formal", "romantic"],
    accordProfile: [{id:"woody",nameAr:"خشبي",nameEn:"Woody",color:"#9b6b43",strength:92},{id:"amber",nameAr:"عنبري",nameEn:"Amber",color:"#c47b16",strength:84},{id:"floral",nameAr:"زهري",nameEn:"Floral",color:"#ec6d9c",strength:66},{id:"warm-spicy",nameAr:"حار دافئ",nameEn:"Warm spicy",color:"#b85032",strength:58}],
    mainAccords: ["خشبي", "عنبري", "زهري", "حار دافئ"],
    price: 3250,
    oldPrice: null,
    badgeAr: "الأكثر مبيعًا",
    badgeEn: "BESTSELLER",
    image: "assets/nocturne-01.svg",
    insights: {
      rating: 4.7,
      seasons: { winter: 96, spring: 48, summer: 18, autumn: 92, day: 36, night: 95 },
      longevity: 5,
      sillage: 4,
      gender: { women: 18, unisex: 74, men: 8 },
      value: 4
    }
  },
  {
    id: "velvet-iris",
    brand: "ATELIER ORIGO",
    nameAr: "VELVET IRIS",
    nameEn: "VELVET IRIS",
    type: "نسائي",
    typeEn: "Women",
    category: "perfume",
    concentration: "EDP",
    sizes: ["75 ML"],
    status: "published",
    sku: "ORI-VIR-75",
    notesAr: ["سوسن", "فانيليا", "مسك"],
    notesEn: ["Iris", "Vanilla", "Musk"],
    gender: "women", mainIngredients: ["سوسن", "فانيليا", "مسك"], seasons: ["spring", "autumn"], usageTimes: ["day", "evening"], occasions: ["work", "occasions", "romantic"],
    accordProfile: [{id:"powdery",nameAr:"بودري",nameEn:"Powdery",color:"#ef72a4",strength:90},{id:"floral",nameAr:"زهري",nameEn:"Floral",color:"#ec6d9c",strength:82},{id:"vanilla",nameAr:"فانيليا",nameEn:"Vanilla",color:"#f2ae2e",strength:74},{id:"musky",nameAr:"مسكي",nameEn:"Musky",color:"#aa8ac7",strength:61}],
    mainAccords: ["بودري", "زهري", "فانيليا", "مسكي"],
    price: 2890,
    oldPrice: 3200,
    badgeAr: "وصل حديثًا",
    badgeEn: "NEW",
    image: "assets/velvet-iris.svg",
    insights: {
      rating: 4.5,
      seasons: { winter: 78, spring: 88, summer: 42, autumn: 86, day: 62, night: 82 },
      longevity: 4,
      sillage: 3,
      gender: { women: 82, unisex: 16, men: 2 },
      value: 4
    }
  },
  {
    id: "smoked",
    brand: "ORIGO SIGNATURE",
    nameAr: "SMOKED SAFFRON",
    nameEn: "SMOKED SAFFRON",
    type: "رجالي",
    typeEn: "Men",
    category: "perfume",
    concentration: "Parfum",
    sizes: ["75 ML"],
    status: "published",
    sku: "ORI-SSF-75",
    notesAr: ["جلد", "زعفران", "أخشاب"],
    notesEn: ["Leather", "Saffron", "Woods"],
    gender: "men", mainIngredients: ["جلد", "زعفران", "أخشاب"], seasons: ["winter", "autumn"], usageTimes: ["night"], occasions: ["formal", "occasions"],
    accordProfile: [{id:"leather",nameAr:"جلدي",nameEn:"Leather",color:"#635047",strength:94},{id:"warm-spicy",nameAr:"حار دافئ",nameEn:"Warm spicy",color:"#b85032",strength:83},{id:"woody",nameAr:"خشبي",nameEn:"Woody",color:"#9b6b43",strength:76},{id:"amber",nameAr:"عنبري",nameEn:"Amber",color:"#c47b16",strength:59}],
    mainAccords: ["جلدي", "حار دافئ", "خشبي", "عنبري"],
    price: 2450,
    oldPrice: null,
    badgeAr: "إصدار محدود",
    badgeEn: "LIMITED",
    image: "assets/smoked-saffron.svg",
    insights: {
      rating: 4.4,
      seasons: { winter: 94, spring: 38, summer: 12, autumn: 91, day: 25, night: 97 },
      longevity: 5,
      sillage: 5,
      gender: { women: 10, unisex: 35, men: 55 },
      value: 4
    }
  },
  {
    id: "citrus-veil",
    brand: "ORIGO ESSENTIALS",
    nameAr: "CITRUS VEIL",
    nameEn: "CITRUS VEIL",
    type: "للجنسين",
    typeEn: "Unisex",
    category: "perfume",
    concentration: "EDT",
    sizes: ["75 ML"],
    status: "published",
    sku: "ORI-CVE-75",
    notesAr: ["برغموت", "نيرولي", "أرز"],
    notesEn: ["Bergamot", "Neroli", "Cedar"],
    gender: "unisex", mainIngredients: ["برغموت", "نيرولي", "أرز"], seasons: ["spring", "summer"], usageTimes: ["day", "daily"], occasions: ["work", "travel", "casual"],
    accordProfile: [{id:"citrus",nameAr:"حمضي",nameEn:"Citrus",color:"#a7bd31",strength:95},{id:"fresh",nameAr:"منعش",nameEn:"Fresh",color:"#24a7a1",strength:88},{id:"aromatic",nameAr:"أروماتيك",nameEn:"Aromatic",color:"#4e9274",strength:65},{id:"woody",nameAr:"خشبي",nameEn:"Woody",color:"#9b6b43",strength:46}],
    mainAccords: ["حمضي", "منعش", "أروماتيك", "خشبي"],
    price: 1980,
    oldPrice: 2250,
    badgeAr: "اختيار الصيف",
    badgeEn: "SUMMER PICK",
    image: "assets/citrus-veil.svg",
    insights: {
      rating: 4.3,
      seasons: { winter: 20, spring: 90, summer: 98, autumn: 38, day: 96, night: 24 },
      longevity: 3,
      sillage: 3,
      gender: { women: 22, unisex: 70, men: 8 },
      value: 5
    }
  }
];

function readStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    localStorage.removeItem(key);
    return [];
  }
}

function readStoredObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch (error) {
    localStorage.removeItem(key);
    return {};
  }
}

function toStorefrontProduct(product) {
  product = {
    ...product,
    noteRefs: Array.isArray(product.noteRefs) ? product.noteRefs : (product.noteLibrary?.refs || [])
  };
  if (product.notesAr && product.notesEn) return product;
  const notes = product.notes || {};
  return {
    ...product,
    type: product.gender === "men" ? "رجالي" : product.gender === "women" ? "نسائي" : "للجنسين",
    typeEn: product.gender === "men" ? "Men" : product.gender === "women" ? "Women" : "Unisex",
    notesAr: [...(notes.topAr || []), ...(notes.heartAr || []), ...(notes.baseAr || [])].slice(0, 4),
    notesEn: [...(notes.topEn || []), ...(notes.heartEn || []), ...(notes.baseEn || [])].slice(0, 4),
    badgeAr: product.status === "published" ? "جديد" : "",
    badgeEn: product.status === "published" ? "NEW" : "",
    image: product.images?.find((image) => image.selected)?.url || product.images?.[0]?.url || product.image || PRODUCT_IMAGE_PLACEHOLDER
  };
}

const storedCatalogProducts = readStoredArray("origoCatalogProducts");
const legacyCustomProducts = readStoredArray("origoCustomProducts").map((product) => ({
  ...product,
  status: product.status || "published",
  category: product.category || "perfume"
}));
const initialCatalogProducts = storedCatalogProducts.length ? storedCatalogProducts : legacyCustomProducts;
const storedNotesState = readStoredObject("origoFragranceNotesState");
if (Object.keys(storedNotesState).length) window.ORIGOFragranceNotes?.setState(storedNotesState);
const storedAdminWorkspace = readStoredObject("origoAdminWorkspace");

const defaultFooterBenefits = [
  {
    id: "benefit-customer-service", slug: "customer-service", icon: "support", active: true, sort: 1,
    titleAr: "خدمة عملاء", titleEn: "Customer service", shortAr: "سريعة", shortEn: "Fast and personal",
    descriptionAr: "فريق ORIGO معك قبل الطلب وبعده لمساعدتك في الاختيار، متابعة الشحن، والإجابة عن كل ما يخص عطرك.",
    descriptionEn: "The ORIGO team stays with you before and after ordering, from scent selection to delivery follow-up.",
    stepsAr: ["اختر وسيلة التواصل المناسبة لك.", "أرسل رقم الطلب أو سؤالك باختصار.", "يراجع الفريق طلبك ويرد خلال ساعات العمل."],
    stepsEn: ["Choose your preferred contact channel.", "Send your order number or question.", "Our team reviews it during business hours."],
    conditionsAr: ["الدعم متاح من السبت إلى الخميس.", "لا نطلب أبدًا كلمة المرور أو بيانات البطاقة.", "يُرجى إرفاق رقم الطلب لتسريع المتابعة."],
    conditionsEn: ["Support is available Saturday through Thursday.", "We never request passwords or full card details.", "Include your order number for faster help."],
    faqs: [
      { qAr: "متى يصلني الرد؟", qEn: "When will I receive a reply?", aAr: "نرد خلال ساعات العمل، وتُعالج الحالات المرتبطة بطلب قائم أولًا.", aEn: "We reply during business hours and prioritize active-order cases." },
      { qAr: "هل تساعدونني في اختيار عطر؟", qEn: "Can you help me choose a fragrance?", aAr: "نعم، أخبرنا بالنوتات والمناسبة والميزانية لنرشح لك اختيارات مناسبة.", aEn: "Yes. Tell us your notes, occasion, and budget for tailored options." }
    ],
    ctaLabelAr: "تواصل معنا", ctaLabelEn: "Contact us", ctaUrl: "mailto:support@origoscents.com", colors: ["#7b0a20", "#77b8ff", "#f05b62"]
  },
  {
    id: "benefit-easy-returns", slug: "easy-returns", icon: "returns", active: true, sort: 2,
    titleAr: "استرجاع سهل", titleEn: "Easy returns", shortAr: "خلال 14 يوم", shortEn: "Within 14 days",
    descriptionAr: "طلب الاسترجاع واضح وسريع، مع متابعة من فريقنا حتى اكتمال فحص المنتج وإعادة المبلغ بالطريقة المعتمدة.",
    descriptionEn: "A clear return journey with team follow-up until inspection and the approved refund are complete.",
    stepsAr: ["تواصل معنا خلال 14 يومًا من الاستلام.", "أرسل صور المنتج والعبوة ورقم الطلب.", "بعد الموافقة ننسق الاستلام ونبدأ رد المبلغ."],
    stepsEn: ["Contact us within 14 days of delivery.", "Send product, package, and order details.", "Once approved, we arrange collection and refund."],
    conditionsAr: ["يجب أن يكون المنتج غير مستخدم وبحالته الأصلية.", "تبقى العبوة والأختام والهدايا مرفقة.", "المنتج التالف عند الوصول يُراجع بالأولوية."],
    conditionsEn: ["The product must be unused and in original condition.", "Packaging, seals, and gifts must be included.", "Delivery damage cases receive priority review."],
    faqs: [
      { qAr: "كم تستغرق إعادة المبلغ؟", qEn: "How long does a refund take?", aAr: "تبدأ بعد الفحص، ويختلف وقت ظهورها حسب وسيلة الدفع والبنك.", aEn: "It starts after inspection; posting time depends on the payment method and bank." },
      { qAr: "هل يمكن استبدال المنتج؟", qEn: "Can I exchange the product?", aAr: "يمكن طلب الاستبدال إذا كان المنتج مؤهلًا والمخزون متاحًا.", aEn: "Eligible products can be exchanged when replacement stock is available." }
    ],
    ctaLabelAr: "ابدأ طلب الاسترجاع", ctaLabelEn: "Start a return", ctaUrl: "mailto:support@origoscents.com?subject=طلب استرجاع", colors: ["#2da75f", "#8bdd63", "#d9f5a2"]
  },
  {
    id: "benefit-gift-wrap", slug: "luxury-gift-wrap", icon: "gift", active: true, sort: 3,
    titleAr: "تغليف فاخر", titleEn: "Luxury gift wrap", shortAr: "جاهز للإهداء", shortEn: "Ready to gift",
    descriptionAr: "نحوّل اختيارك إلى هدية أنيقة بتغليف ORIGO الفاخر، مع بطاقة إهداء ولمسات تُحافظ على تجربة فتح مميزة.",
    descriptionEn: "We turn your choice into an elegant ORIGO gift with premium wrapping and a personal message card.",
    stepsAr: ["اختر العطر وأضفه إلى السلة.", "اطلب التغليف واكتب رسالة الإهداء.", "نجهز الهدية ونحميها داخل عبوة الشحن."],
    stepsEn: ["Choose your fragrance and add it to the bag.", "Select gift wrap and write your message.", "We prepare and protect it for shipping."],
    conditionsAr: ["قد يختلف شكل التغليف حسب حجم المنتج.", "لا نضع الفاتورة داخل هدايا الطرف الآخر.", "يُراجع توفر التغليف للطلبات الكبيرة."],
    conditionsEn: ["Wrapping may vary by product size.", "Invoices are not placed inside third-party gifts.", "Large gift orders are confirmed for availability."],
    faqs: [
      { qAr: "هل يمكن كتابة رسالة خاصة؟", qEn: "Can I add a message?", aAr: "نعم، أضف الرسالة في ملاحظات الطلب وسنطبعها على بطاقة أنيقة.", aEn: "Yes. Add it to the order notes and we will print it on an elegant card." },
      { qAr: "هل يظهر السعر للمستلم؟", qEn: "Will the recipient see the price?", aAr: "لا يظهر السعر داخل عبوة الهدية.", aEn: "No price is shown inside the gift package." }
    ],
    ctaLabelAr: "تسوق للهدايا", ctaLabelEn: "Shop gifts", ctaUrl: "/perfumes", colors: ["#f04b6d", "#f2b844", "#a61932"]
  },
  {
    id: "benefit-samples", slug: "perfume-samples", icon: "samples", active: true, sort: 4,
    titleAr: "عينات عطور", titleEn: "Perfume samples", shortAr: "مع الطلبات المختارة", shortEn: "With selected orders",
    descriptionAr: "نضيف عينات مختارة عند توفرها لتكتشف روائح جديدة قبل شراء الحجم الكامل وتبني مكتبتك العطرية بثقة.",
    descriptionEn: "When available, curated samples help you explore new scents before committing to a full bottle.",
    stepsAr: ["أكمل طلبك من المنتجات المؤهلة.", "نختار العينات المتاحة المناسبة لطلبك.", "تصل العينات داخل العبوة مع طريقة الاستخدام."],
    stepsEn: ["Complete an eligible product order.", "We select suitable available samples.", "Samples arrive in your package with use guidance."],
    conditionsAr: ["العينات مرتبطة بالتوفر ولا تُباع منفردة.", "قد تختلف الرائحة والحجم من طلب لآخر.", "لا يمكن استبدال العينة أو طلب اسم محدد."],
    conditionsEn: ["Samples depend on availability and are not sold separately.", "Scent and size may vary between orders.", "Samples cannot be exchanged or guaranteed by name."],
    faqs: [
      { qAr: "هل أحصل على عينة مع كل طلب؟", qEn: "Does every order include a sample?", aAr: "تُضاف للطلبات المؤهلة عند توفر المخزون، ويظهر ذلك ضمن تفاصيل العرض.", aEn: "Eligible orders receive one when stock is available, as shown in the offer details." },
      { qAr: "كيف أستخدم العينة؟", qEn: "How should I test a sample?", aAr: "جرّبها على بشرة نظيفة وانتظر تطور النوتات عدة ساعات.", aEn: "Test on clean skin and allow the notes to evolve for several hours." }
    ],
    ctaLabelAr: "اكتشف العطور", ctaLabelEn: "Discover fragrances", ctaUrl: "/perfumes", colors: ["#d54f9a", "#f39fbb", "#f3c84e"]
  }
];

const defaultStoreSettings = {
  storeName: "ORIGO", currency: "EGP", taxRate: 14, lowStockAlerts: true, orderNotifications: true,
  passwordRecoveryChannels: { email: true, whatsapp: true, sms: true },
  logos: { light: "assets/origo-logo.svg", dark: "assets/origo-logo-dark.svg", icon: "assets/origo-logo-icon.svg" },
  appearance: {
    balancedLayoutEnabled: true,
    bodyFont: "elegant",
    headingFont: "classic",
    baseFontSize: 17,
    bodyFontWeight: 500,
    headingScale: 1,
    iconScale: 1,
    imageScale: 1,
    imageRadius: 12,
    imageFit: "contain",
    cardRadius: 16,
    cardBorderWidth: 1,
    cardShadow: "soft",
    density: "comfortable",
    headerHeight: 104,
    headerIconScale: 1,
    headerIconShape: "round",
    headerActionsOrder: "commerce-first",
    lightHeaderColor: "#ffffff",
    darkHeaderColor: "#5b5e63",
    burgundyColor: "#720019",
    goldColor: "#c8943d",
    lightPageColor: "#ffffff",
    lightSurfaceColor: "#ffffff",
    lightTextColor: "#251519",
    lightMutedColor: "#6e5b60",
    lightBurgundyColor: "#720019",
    darkPageColor: "#3b3c40",
    darkSurfaceColor: "#4b4d52",
    darkElevatedColor: "#5a5c62",
    darkTextColor: "#ffffff",
    darkMutedColor: "#f0f0f2",
    darkBurgundyColor: "#720019",
    contentMaxWidth: 1440,
    sectionGap: 20,
    productCardHeight: 500,
    adminScale: 1.1,
    layoutTuningVersion: 2
  },
  footerImage: "assets/origo-hero.png",
  footerDescriptionAr: "في أوريجو، نؤمن أن العطر ليس مجرد رائحة، بل هو توقيعك الخاص الذي يترك أثرًا لا يُنسى. اكتشف عالم العطور الفاخرة بين الأصالة والتميز.",
  footerDescriptionEn: "At ORIGO, fragrance is more than a scent. It is your signature, leaving a memorable trace of character and elegance.",
  newsletterTitleAr: "اشترك في نشرتنا البريدية", newsletterTitleEn: "Join our newsletter",
  newsletterCopyAr: "كن أول من يعرف عن العروض والمنتجات الجديدة", newsletterCopyEn: "Be first to discover new products and offers",
  supportEmail: "support@origoscents.com", supportHoursAr: "من السبت إلى الخميس\n9:00 صباحًا – 11:00 مساءً", supportHoursEn: "Saturday to Thursday\n9:00 AM – 11:00 PM",
  socialLinks: { youtube: "", facebook: "", tiktok: "", instagram: "", snapchat: "", telegram: "", whatsapp: "" },
  appLinks: { appStore: "", googlePlay: "" },
  homepageRails: {
    benefits: { enabled: true, order: 1, titleAr: "مزايا ORIGO", titleEn: "ORIGO benefits", speed: 18 },
    gender: { enabled: true, order: 2, titleAr: "تسوق حسب الجنس", titleEn: "Shop by gender" },
    categories: { enabled: true, order: 3, titleAr: "تسوق حسب الفئة", titleEn: "Shop by category" },
    brands: { enabled: true, order: 4, titleAr: "العلامات التجارية", titleEn: "Brands", speed: 34 }
  },
  homeGenderImages: { men: "", women: "", unisex: "" },
  homeHero: { intervalSeconds: 3 },
  homeMedia: [],
  categoryIcons: {},
  homeBenefitIcons: {},
  fragranceFinder: {
    enabled: {
      forWhom: ["women", "men", "unisex"],
      feelings: ["warmSweet", "freshClean", "woodyDeep", "orientalLuxurious", "citrusyFresh", "floralSoft", "leatheryBold", "greenNatural"],
      families: ["oriental", "woody", "floral", "citrus", "aromatic", "leather", "fruity", "gourmand", "chypre", "aquatic", "fougere", "musky"],
      personalities: ["leader", "calm", "social", "bold", "romantic", "practical", "artistic", "adventurous"],
      usage: ["daily", "special", "romantic", "travel", "formal", "sport", "relax", "religious", "other"],
      seasons: ["summer", "spring", "autumn", "winter", "any"],
      times: ["morning", "day", "evening", "night", "any"],
      features: ["longLasting", "strongProjection", "mediumProjection", "lightProjection", "bestValue"],
      budgets: ["any", "under500", "500to1500", "1500to3000", "over3000"],
      notes: ["citrus", "bergamot", "lemon", "apple", "mint", "pinkPepper", "rose", "jasmine", "lavender", "whiteFlowers", "cinnamon", "saffron", "oud", "amber", "musk", "vanilla", "leather", "patchouli", "sandalwood"]
    }
  },
  footerBenefits: defaultFooterBenefits
};

function mergeStoreSettings(saved = {}) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
  const benefitMap = new Map(defaultFooterBenefits.map((item) => [item.id, item]));
  const savedBenefits = Array.isArray(saved.footerBenefits)
    ? saved.footerBenefits.filter((item) => item && typeof item === "object")
    : [];
  const mergedBenefits = savedBenefits.length
    ? savedBenefits.map((item) => ({ ...(benefitMap.get(item.id) || {}), ...item }))
    : defaultFooterBenefits.map((item) => structuredClone(item));
  const savedAppearance = saved.appearance && typeof saved.appearance === "object" ? saved.appearance : {};
  const migratedAppearance = Number(savedAppearance.layoutTuningVersion || 0) >= 2 ? savedAppearance : {
    ...savedAppearance,
    baseFontSize: 17,
    headerHeight: 104,
    sectionGap: 20,
    productCardHeight: 500,
    adminScale: 1.1,
    layoutTuningVersion: 2
  };
  return {
    ...defaultStoreSettings,
    ...saved,
    logos: { ...defaultStoreSettings.logos, ...(saved.logos || {}) },
    appearance: { ...defaultStoreSettings.appearance, ...migratedAppearance },
    socialLinks: { ...defaultStoreSettings.socialLinks, ...(saved.socialLinks || {}) },
    appLinks: { ...defaultStoreSettings.appLinks, ...(saved.appLinks || {}) },
    passwordRecoveryChannels: { ...defaultStoreSettings.passwordRecoveryChannels, ...(saved.passwordRecoveryChannels || {}) },
    homepageRails: Object.fromEntries(Object.entries(defaultStoreSettings.homepageRails).map(([key, value]) => [key, { ...value, ...(saved.homepageRails?.[key] || {}) }])),
    homeGenderImages: { ...defaultStoreSettings.homeGenderImages, ...(saved.homeGenderImages || {}) },
    homeHero: {
      ...defaultStoreSettings.homeHero,
      ...(saved.homeHero || {}),
      intervalSeconds: Number(saved.homeHero?.intervalSeconds) === 2.5 ? 3 : Number(saved.homeHero?.intervalSeconds || defaultStoreSettings.homeHero.intervalSeconds)
    },
    homeMedia: Array.isArray(saved.homeMedia) ? saved.homeMedia : [],
    categoryIcons: { ...defaultStoreSettings.categoryIcons, ...(saved.categoryIcons || {}) },
    homeBenefitIcons: { ...defaultStoreSettings.homeBenefitIcons, ...(saved.homeBenefitIcons || {}) },
    fragranceFinder: {
      ...defaultStoreSettings.fragranceFinder,
      ...(saved.fragranceFinder || {}),
      enabled: {
        ...defaultStoreSettings.fragranceFinder.enabled,
        ...(saved.fragranceFinder?.enabled || {})
      }
    },
    footerBenefits: mergedBenefits
  };
}

const defaultAdminWorkspace = {
  analytics: { conversionRate: 3.8, adSpend: 18400, adRevenue: 62800, approximateMargin: 38 },
  inventory: {
    nocturne: { quantity: 8, reserved: 2, minimum: 10, cost: 1850 },
    "velvet-iris": { quantity: 17, reserved: 1, minimum: 8, cost: 1540 },
    smoked: { quantity: 5, reserved: 2, minimum: 9, cost: 1320 },
    "citrus-veil": { quantity: 24, reserved: 3, minimum: 10, cost: 980 }
  },
  campaigns: [
    { id: "cmp-1", name: "Nocturne Retargeting", channel: "Meta Ads", budget: 12000, revenue: 43700, status: "active" },
    { id: "cmp-2", name: "Summer Citrus", channel: "TikTok Ads", budget: 6400, revenue: 19100, status: "active" }
  ],
  coupons: [
    { id: "ORIGO15", name: "خصم 15% على جميع الطلبات", kind: "percent", value: "15%", saved: "500 EGP", uses: 128, limit: 500, category: "عطور", created: "2024/05/20", status: "active" },
    { id: "ORIGO30", name: "خصم 30 جنيه", kind: "fixed", value: "30 EGP", saved: "300 EGP", uses: 75, limit: 200, category: "العناية الشخصية", created: "2024/05/18", status: "active" },
    { id: "SHIP10", name: "خصم 10% على الشحن", kind: "percent", value: "10%", saved: "0 EGP", uses: 210, limit: 1000, category: "الشحن", created: "2024/05/17", status: "active" },
    { id: "WEEKEND20", name: "عرض نهاية الأسبوع", kind: "percent", value: "20%", saved: "400 EGP", uses: 45, limit: 200, category: "عطور", created: "2024/05/15", status: "ending" },
    { id: "RAMADAN25", name: "خصم رمضان", kind: "fixed", value: "25 EGP", saved: "250 EGP", uses: 200, limit: 200, category: "البخور والعطور المنزلية", created: "2024/05/10", status: "expired" },
    { id: "FREESHIP", name: "شحن مجاني", kind: "shipping", value: "شحن مجاني", saved: "0 EGP", uses: 0, limit: 150, category: "الشحن", created: "2024/05/08", status: "inactive" },
    { id: "BIG100", name: "خصم 100 جنيه للطلبات الكبيرة", kind: "fixed", value: "100 EGP", saved: "1000 EGP", uses: 36, limit: 300, category: "أخرى", created: "2024/05/05", status: "active" },
    { id: "PERFUME12", name: "خصم 12% على العطور", kind: "percent", value: "12%", saved: "600 EGP", uses: 89, limit: 500, category: "عطور", created: "2024/05/01", status: "ending" }
  ],
  suppliers: [
    { id: "sup-1", name: "Maison Distribution", contact: "+20 100 000 1122", products: 3, status: "active" },
    { id: "sup-2", name: "Cairo Select Imports", contact: "+20 111 220 8877", products: 1, status: "active" }
  ],
  purchases: [
    { id: "PO-1048", name: "Maison Distribution", amount: 28600, due: "2026-07-12", status: "in_transit" },
    { id: "PO-1047", name: "Cairo Select Imports", amount: 14900, due: "2026-07-03", status: "received" }
  ],
  shipping: [
    { id: "ship-1", name: "Cairo & Giza", carrier: "Bosta", fee: 75, eta: "1–2 days", status: "active" },
    { id: "ship-2", name: "Delta & Alexandria", carrier: "Mylerz", fee: 95, eta: "2–4 days", status: "active" },
    { id: "ship-3", name: "Upper Egypt", carrier: "Bosta", fee: 125, eta: "3–5 days", status: "active" }
  ],
  reviews: [
    { id: "rev-1", name: "Nour A.", subject: "NOCTURNE 01", rating: 5, status: "published" },
    { id: "rev-2", name: "Mariam H.", subject: "Delivery experience", rating: 4, status: "pending" }
  ],
  tickets: [
    { id: "TKT-208", name: "تغيير عنوان الشحن", customer: "سارة أحمد", priority: "high", status: "open" },
    { id: "TKT-207", name: "استفسار عن الثبات", customer: "عمر خالد", priority: "normal", status: "waiting" }
  ],
  banners: [
    { id: "bnr-1", title: "عرض الصيف", subtitle: "خصم حتى 30% على العطور", placement: "الصفحة الرئيسية", position: "سلايدر رئيسي", type: "image", start: "2024/05/10", end: "2024/06/10", clicks: 12450, status: "active", tone: "wine" },
    { id: "bnr-2", title: "وصل حديثاً", subtitle: "اكتشف أحدث العطور", placement: "الصفحة الرئيسية", position: "بنر تحت السلايدر", type: "image", start: "2024/05/05", end: "2024/05/25", clicks: 8230, status: "active", tone: "sand" },
    { id: "bnr-3", title: "عطور رجالية مميزة", subtitle: "تشكيلة فاخرة للرجال", placement: "صفحة العطور", position: "أعلى الصفحة", type: "image", start: "2024/05/01", end: "2024/05/31", clicks: 6780, status: "active", tone: "charcoal" },
    { id: "bnr-4", title: "عناية ببشرتك", subtitle: "منتجات أصلية 100%", placement: "صفحة العناية بالبشرة", position: "بنر علوي", type: "image", start: "2024/05/08", end: "2024/06/08", clicks: 5190, status: "active", tone: "rose" },
    { id: "bnr-5", title: "عطور شرقية فاخرة", subtitle: "اكتشف روائح الشرق", placement: "الصفحة الرئيسية", position: "سلايدر رئيسي", type: "video", start: "2024/04/15", end: "2024/04/30", clicks: 0, status: "expired", tone: "gold" },
    { id: "bnr-6", title: "شحن مجاني", subtitle: "للطلبات فوق 1000 جنيه", placement: "سلة التسوق", position: "بنر جانبي", type: "image", start: "2024/04/01", end: "2024/04/14", clicks: 0, status: "expired", tone: "silver" }
  ],
  team: [
    { id: "staff-1", name: "ORIGO Owner", role: "Owner", lastLogin: "الآن", status: "active" },
    { id: "staff-2", name: "Catalog Manager", role: "Product Manager", lastLogin: "منذ ساعتين", status: "active" }
  ],
  entities: {},
  settings: defaultStoreSettings
};
const adminWorkspace = {
  ...defaultAdminWorkspace,
  ...storedAdminWorkspace,
  analytics: { ...defaultAdminWorkspace.analytics, ...(storedAdminWorkspace.analytics || {}) },
  inventory: { ...defaultAdminWorkspace.inventory, ...(storedAdminWorkspace.inventory || {}) },
  entities: { ...defaultAdminWorkspace.entities, ...(storedAdminWorkspace.entities || {}) },
  settings: mergeStoreSettings(storedAdminWorkspace.settings || {})
};

const state = {
  lang: localStorage.getItem("origoLang") || "ar",
  theme: "light",
  currency: "EGP",
  cart: readStoredArray("origoCart"),
  wishlist: readStoredArray("origoWishlist"),
  comparison: readStoredArray("origoComparison").slice(0, 4),
  productRatings: readStoredObject("origoProductRatings"),
  selectedNotes: [],
  catalogProducts: initialCatalogProducts,
  products: [...baseProducts, ...initialCatalogProducts.filter((product) => product.status === "published").map(toStorefrontProduct)],
  webResults: [],
  activeProductId: null,
  activeProductQuantity: 1,
  activeProductImageIndex: 0,
  selectedCardVariants: {},
  cardImageIndexes: {},
  adminCardPreviewMode: "desktop",
  adminCardPreviewTheme: "light",
  activeImportDraft: null,
  adminSuggestions: [],
  adminSearchController: null,
  quickImportImages: [],
  user: null,
  orders: [],
  adminOrders: [],
  adminActivity: [],
  adminStaff: [],
  activeAdminOrderId: null,
  serverAvailable: false,
  pendingAction: "",
  publicIntegrations: {},
  integrationStatus: {},
  resetChannels: { email: false, whatsapp: false, sms: false },
  passwordResetFlow: { requestId: "", identifier: "", channel: "email", code: "", attempts: 0, expiresAt: 0 },
  filterDefinitions: [],
  productOptions: [],
  activeDynamicFilters: {},
  productEditorMode: localStorage.getItem("origoProductEditorMode") || "smart",
  aiProductSuggestion: null,
  globalSearchQuery: "",
  storefrontSearchQuery: "",
  storefrontCategory: "all",
  catalogQuery: "",
  catalogQuickFilter: "all",
  catalogFilters: { gender: [], brand: [], concentration: [], family: [], notes: [], season: [], occasion: [], rating: [], minPrice: "", maxPrice: "" },
  catalogSort: "relevance",
  catalogPage: 1,
  catalogPageSize: 8,
  catalogAutocompleteIndex: -1,
  catalogBrandExpanded: false,
  notesSearchQuery: "",
  notesFamilyFilter: "all",
  notesImageFilter: "available",
  notesVisibleCount: 72,
  activeNoteSlug: "",
  activeAdminNoteSlug: "",
  pendingNoteImage: "",
  pendingStoreLogos: {},
  pendingBenefitIcons: {},
  pendingCategoryIcons: {},
  pendingHomeBenefitIcons: {},
  adminView: "overview",
  alternativesAdmin: { items: [], settings: {}, analytics: { topSearches: [], events: [] } },
  adminWorkspace
};

function isStaffUser(user = state.user) {
  return Boolean(user && user.role !== "customer");
}

function hasStaffPermission(permission, user = state.user) {
  const permissions = user?.permissions || [];
  return permissions.includes("*")
    || permissions.includes(permission)
    || (permission.endsWith(":view") && permissions.includes(permission.slice(0, -5)));
}

function sectionPermission(sectionId) {
  return {
    orders: "orders:view", products: "catalog:view", inventory: "inventory",
    customers: "customers", notes: "catalog:view", categories: "catalog:view", "product-options": "catalog:view",
    alternatives: "catalog:view", performance: "catalog:view", brands: "catalog:view",
    suppliers: "purchases", purchases: "purchases", marketing: "marketing", homepage: "content",
    coupons: "coupons", content: "content", reviews: "reviews",
    accounting: "accounting", shipping: "shipping", reports: "reports:view",
    support: "support", team: "users", settings: "settings", activity: "settings", "ui-states": "settings"
  }[sectionId] || "staff";
}

const adminSections = [
  { groupAr: "الرئيسية", groupEn: "OVERVIEW", id: "overview", icon: "◫", ar: "نظرة عامة", en: "Overview", descriptionAr: "ملخص المبيعات والطلبات والتنبيهات التي تحتاج انتباهك.", descriptionEn: "Store performance, live operations, and alerts." },
  { groupAr: "العمليات", groupEn: "OPERATIONS", id: "orders", icon: "▤", ar: "الطلبات", en: "Orders", descriptionAr: "متابعة الطلب من التأكيد حتى التسليم والاسترجاع.", descriptionEn: "Track every order from confirmation to delivery." },
  { groupAr: "العمليات", groupEn: "OPERATIONS", id: "products", icon: "◇", ar: "المنتجات", en: "Products", descriptionAr: "الكتالوج والأسعار والنشر والبدائل والبيانات العطرية.", descriptionEn: "Catalog, pricing, publishing, and fragrance data." },
  { groupAr: "العمليات", groupEn: "OPERATIONS", id: "inventory", icon: "▦", ar: "المخزون", en: "Inventory", descriptionAr: "الكميات والحجز والتنبيهات وحركة المخزون.", descriptionEn: "Stock levels, reservations, alerts, and movements." },
  { groupAr: "العمليات", groupEn: "OPERATIONS", id: "customers", icon: "♙", ar: "العملاء", en: "Customers", descriptionAr: "ملفات العملاء والمشتريات والشرائح والولاء.", descriptionEn: "Customer profiles, segments, orders, and loyalty." },
  { groupAr: "الكتالوج", groupEn: "CATALOG", id: "notes", icon: "✿", ar: "مكتبة المكونات", en: "Notes library", descriptionAr: "العائلات والمرادفات والصور والربط التلقائي.", descriptionEn: "Fragrance families, aliases, imagery, and matching." },
  { groupAr: "الكتالوج", groupEn: "CATALOG", id: "categories", icon: "⌘", ar: "التصنيفات والفلاتر", en: "Categories & filters", descriptionAr: "تصنيفات ومجموعات ووسوم وخصائص ديناميكية.", descriptionEn: "Dynamic categories, collections, tags, and attributes." },
  { groupAr: "الكتالوج", groupEn: "CATALOG", id: "brands", icon: "⌑", ar: "العلامات التجارية", en: "Brands", descriptionAr: "إدارة العلامات والشعارات وبلد المنشأ وتوزيعها على الأقسام.", descriptionEn: "Manage brands, logos, origin countries, and department placement." },
  { groupAr: "الكتالوج", groupEn: "CATALOG", id: "product-options", icon: "⚙", ar: "خصائص وخيارات المنتجات", en: "Product options", descriptionAr: "إدارة الخيارات الثنائية اللغة المستخدمة في نموذج المنتج.", descriptionEn: "Manage bilingual values used by the product editor." },
  { groupAr: "الكتالوج", groupEn: "CATALOG", id: "alternatives", icon: "⇄", ar: "إدارة البدائل", en: "Alternatives", descriptionAr: "العطور المرجعية ونسب التشابه وظهور البدائل في الصفحة الرئيسية.", descriptionEn: "Reference fragrances, match scores, and homepage placement." },
  { groupAr: "الكتالوج", groupEn: "CATALOG", id: "performance", icon: "◉", ar: "مؤشرات أداء المنتجات", en: "Product performance", descriptionAr: "مصادر التقييم ومؤشرات العطور وأصوات المشترين الموثقين.", descriptionEn: "Rating sources, fragrance insights, and verified-purchase votes." },
  { groupAr: "التوريد", groupEn: "PROCUREMENT", id: "suppliers", icon: "♜", ar: "الموردون", en: "Suppliers", descriptionAr: "بيانات الموردين والمنتجات والتكاليف والمدفوعات.", descriptionEn: "Supplier records, products, costs, and payments." },
  { groupAr: "التوريد", groupEn: "PROCUREMENT", id: "purchases", icon: "⇣", ar: "المشتريات", en: "Purchases", descriptionAr: "أوامر الشراء والتوريد والاستلام.", descriptionEn: "Purchase orders, incoming stock, and receiving." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "marketing", icon: "◎", ar: "التسويق والإعلانات", en: "Marketing", descriptionAr: "الحملات والميزانيات وROAS والتتبّع.", descriptionEn: "Campaigns, budgets, attribution, and ROAS." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "coupons", icon: "%", ar: "الكوبونات والعروض", en: "Coupons & offers", descriptionAr: "الخصومات والحزم والعروض الموسمية.", descriptionEn: "Discounts, bundles, flash sales, and promotions." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "content", icon: "¶", ar: "المحتوى والصفحات", en: "Content", descriptionAr: "البنرات والصفحات والمدونة ودليل العطور.", descriptionEn: "Banners, pages, journal, and fragrance guides." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "homepage", icon: "↔", ar: "أشرطة الصفحة الرئيسية", en: "Homepage rails", descriptionAr: "إدارة الأشرطة اليدوية وشريط العلامات التلقائي ومكتبة وسائط الصفحة.", descriptionEn: "Manage manual rails, the brand marquee, and homepage media." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "reviews", icon: "★", ar: "التقييمات", en: "Reviews", descriptionAr: "مراجعات المنتجات والتجربة والشحن والردود.", descriptionEn: "Product, experience, delivery, and service reviews." },
  { groupAr: "المالية", groupEn: "FINANCE", id: "accounting", icon: "◈", ar: "المدفوعات والمحاسبة", en: "Payments & accounting", descriptionAr: "الإيرادات والتكاليف والمدفوعات وصافي الربح.", descriptionEn: "Revenue, costs, payments, refunds, and net profit." },
  { groupAr: "المالية", groupEn: "FINANCE", id: "shipping", icon: "↯", ar: "الشحن والتوصيل", en: "Shipping", descriptionAr: "المناطق والشركات والتتبع ومستوى الخدمة.", descriptionEn: "Zones, carriers, tracking, and service levels." },
  { groupAr: "المالية", groupEn: "FINANCE", id: "reports", icon: "▥", ar: "التقارير والتحليلات", en: "Reports", descriptionAr: "تقارير قابلة للفلترة والتصدير لكل عمليات المتجر.", descriptionEn: "Filterable and exportable business reports." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "support", icon: "◌", ar: "خدمة العملاء", en: "Customer support", descriptionAr: "التذاكر والشكاوى وسجل التواصل.", descriptionEn: "Tickets, complaints, and communication history." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "team", icon: "♟", ar: "الفريق والصلاحيات", en: "Team & roles", descriptionAr: "الأدوار والصلاحيات وسجل نشاط الموظفين.", descriptionEn: "Roles, permissions, and staff activity." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "settings", icon: "⚙", ar: "الإعدادات", en: "Settings", descriptionAr: "إعدادات المتجر والأمان وSEO والإشعارات.", descriptionEn: "Store, security, SEO, and notification settings." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "activity", icon: "◷", ar: "سجل النشاط والأمان", en: "Activity & security", descriptionAr: "تتبع العمليات ومحاولات الدخول والأحداث الأمنية.", descriptionEn: "Audit operations, sign-ins, and security events." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "ui-states", icon: "◈", ar: "حالات النظام", en: "System states", descriptionAr: "معاينة حالات التفاعل والنوافذ المنبثقة الموحدة.", descriptionEn: "Reusable interaction states and modal patterns." }
];

const staffRoleDefinitions = [
  ["owner", "Owner", "*"],
  ["admin", "Admin", "*"],
  ["manager", "Manager", "catalog · orders · customers · inventory · reports"],
  ["product_manager", "Product Manager", "catalog · inventory"],
  ["order_manager", "Order Manager", "orders · customers · shipping"],
  ["customer_support", "Customer Support", "orders:view · customers · support · reviews"],
  ["accountant", "Accountant", "orders:view · accounting · reports"],
  ["marketing_manager", "Marketing Manager", "marketing · coupons · content · reports:view"],
  ["warehouse_staff", "Warehouse Staff", "orders:view · inventory · purchases"],
  ["delivery_staff", "Delivery Staff", "orders:view · shipping"],
  ["content_editor", "Content Editor", "catalog:view · content · reviews"]
];

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || (state.lang === "ar" ? "تعذر إكمال الطلب." : "The request could not be completed."));
    error.status = response.status;
    error.code = payload.code;
    throw error;
  }
  return payload;
}

function mergeCartItems(first, second) {
  const merged = new Map();
  for (const item of [...(first || []), ...(second || [])]) {
    const id = String(item?.id || "");
    const quantity = Math.min(10, Math.max(0, Number(item?.quantity || 0)));
    if (id && quantity) merged.set(id, Math.min(10, (merged.get(id) || 0) + quantity));
  }
  return [...merged].map(([id, quantity]) => ({ id, quantity }));
}

function serverProduct(product) {
  const local = baseProducts.find((item) => item.id === product.id);
  return local ? { ...local, ...product, insights: local.insights } : toStorefrontProduct(product);
}

let cartSyncTimer;
async function pushCart() {
  if (!state.user || !state.serverAvailable) return state.cart;
  const result = await api("/api/cart", {
    method: "POST",
    body: JSON.stringify({ cart: state.cart })
  });
  state.cart = result.cart;
  localStorage.setItem("origoCart", JSON.stringify(state.cart));
  renderCart();
  return state.cart;
}

function syncCart(delay = 350) {
  if (!state.user || !state.serverAvailable) return;
  clearTimeout(cartSyncTimer);
  cartSyncTimer = setTimeout(async () => {
    try {
      await pushCart();
    } catch (error) {
      if (error.status === 401) {
        state.user = null;
        updateAccountIndicator();
      }
    }
  }, delay);
}

const currencyConfig = {
  EGP: { rate: 1, currency: "EGP" },
  USD: { rate: 0.02, currency: "USD" },
  SAR: { rate: 0.075, currency: "SAR" }
};

const formatPrice = (value) => {
  const config = currencyConfig[state.currency] || currencyConfig.EGP;
  const amount = Number(value || 0) * config.rate;
  const digits = state.currency === "EGP" ? 0 : 2;
  if (state.lang === "ar" && state.currency === "EGP") {
    const number = new Intl.NumberFormat("ar-EG", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(amount);
    // Keep the Arabic number, separator, and currency abbreviation in one RTL isolate.
    return `\u2067${number}\u00A0ج.م\u2069`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(amount);
};

function formatProductSize(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const number = text.match(/[0-9]+(?:[.,][0-9]+)?/)?.[0];
  if (number && /(?:\bml\b|مل)/i.test(text)) return `${number} ml`;
  return text.replace(/\bML\b/gi, "ml");
}

function localizedProductName(product, lang = state.lang) {
  if (!product) return lang === "ar" ? "عطر ORIGO" : "ORIGO fragrance";
  const translated = String(lang === "ar" ? product.nameAr || "" : product.nameEn || "").trim();
  if (translated) return translated;
  const brand = String(product.brand || "ORIGO").trim();
  const sku = String(product.sku || "").trim();
  return lang === "ar"
    ? `${brand} — عطر`
    : `${brand} fragrance${sku ? ` ${sku}` : ""}`;
}

function rebuildStorefrontProducts() {
  const productsById = new Map(baseProducts.map((product) => [product.id, product]));
  state.catalogProducts
    .filter((product) => product.status === "published")
    .forEach((product) => productsById.set(product.id, serverProduct(product)));
  state.products = [...productsById.values()];
  renderBrandCarousel($("#brand-carousel-search")?.value || "");
  renderHomepageCommerce();
}

function persist() {
  localStorage.setItem("origoCart", JSON.stringify(state.cart));
  localStorage.setItem("origoWishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("origoComparison", JSON.stringify(state.comparison));
  if (state.user) localStorage.setItem("origoCartUserId", String(state.user.id));
  else localStorage.removeItem("origoCartUserId");
  syncCart();
}

function updateAccountIndicator() {
  $$(".account-button").forEach((button) => {
    button.classList.toggle("signed-in", Boolean(state.user));
    button.title = state.user
      ? (state.lang === "ar" ? `حساب ${state.user.name}` : `${state.user.name}'s account`)
      : translations[state.lang].account;
  });
  $$(".mobile-admin-link").forEach((button) => {
    button.hidden = !isStaffUser();
  });
}

async function hydrateServer() {
  const localCart = [...state.cart];
  const cartOwner = localStorage.getItem("origoCartUserId");
  try {
    const [catalog, session, notesState, publicIntegrations, filtersResult, storefrontSettings] = await Promise.all([
      api("/api/products"),
      api("/api/session"),
      api("/api/notes/state"),
      api("/api/integrations/public"),
      api("/api/filters"),
      api("/api/storefront-settings")
    ]);
    state.publicIntegrations = publicIntegrations || {};
    state.filterDefinitions = filtersResult.filters || [];
    state.adminWorkspace.settings = mergeStoreSettings({
      ...state.adminWorkspace.settings,
      ...(storefrontSettings.settings || {})
    });
    state.serverAvailable = true;
    if (notesState.state && Object.keys(notesState.state).length) {
      window.ORIGOFragranceNotes?.setState(notesState.state);
      localStorage.setItem("origoFragranceNotesState", JSON.stringify(notesState.state));
    }
    state.products = (catalog.products || []).map(serverProduct);
    state.user = session.user || null;
    if (state.user) {
      if (cartOwner === String(state.user.id)) {
        state.cart = session.cart || [];
      } else {
        state.cart = mergeCartItems(session.cart, localCart);
        await pushCart();
      }
      localStorage.setItem("origoCartUserId", String(state.user.id));
      if (isStaffUser()) await loadAdminCatalog();
    } else if (cartOwner) {
      state.cart = [];
      localStorage.removeItem("origoCartUserId");
    }
    localStorage.setItem("origoCart", JSON.stringify(state.cart));
    renderDynamicFilters();
    renderHomeNavigation();
    renderHomeHero();
    renderBrandCarousel();
    renderSiteFooter();
    applyStoreIdentity();
    renderProducts($(".chip.active")?.dataset.filter || "all");
    renderHomepageCommerce();
    renderCart();
    renderWishlist();
    updateAccountIndicator();
    handleBenefitRoute({ replace: true });
    handleBenefitsRoute({ replace: true });
    handleNotesRoute({ replace: true });
    handleCatalogRoute({ replace: true });
    handleProductRoute();
  } catch {
    state.serverAvailable = false;
    updateAccountIndicator();
    renderSiteFooter();
    applyStoreIdentity();
    handleBenefitRoute({ replace: true });
    handleBenefitsRoute({ replace: true });
    handleCatalogRoute({ replace: true });
    handleProductRoute();
  }
}

async function loadAdminCatalog() {
  if (!isStaffUser() || !hasStaffPermission("catalog:view")) return [];
  const [result, optionResult] = await Promise.all([
    api("/api/admin/products"),
    api("/api/admin/product-options").catch(() => ({ options: [] }))
  ]);
  state.catalogProducts = result.products || [];
  state.productOptions = optionResult.options || [];
  rebuildStorefrontProducts();
  renderCatalogList();
  renderProducts($(".chip.active")?.dataset.filter || "all");
  return state.catalogProducts;
}

async function persistAdminProduct(product) {
  const result = await api("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(product)
  });
  await loadAdminCatalog();
  if ($("#admin-overlay").classList.contains("open")) renderAdminDashboard("products");
  return result.product;
}

function printOrderDocument(order, kind = "invoice") {
  const ar = state.lang === "ar";
  const isLabel = kind === "label";
  const popup = window.open("", "_blank", "width=850,height=900");
  if (!popup) return showToast(ar ? "اسمح بالنوافذ المنبثقة للطباعة." : "Allow popups to print.");
  const items = (order.items || []).map((item) => `<tr><td>${escapeHTML(item.productName)}</td><td>${item.quantity}</td><td>${formatPrice(item.lineTotal)}</td></tr>`).join("");
  popup.document.write(`<!doctype html><html lang="${ar ? "ar" : "en"}" dir="${ar ? "rtl" : "ltr"}"><meta charset="utf-8"><title>${escapeHTML(order.orderNumber)}</title>
    <style>body{font-family:Arial,sans-serif;padding:40px;color:#181411}h1{letter-spacing:.12em}header{border-bottom:2px solid #6d1628;margin-bottom:24px}table{width:100%;border-collapse:collapse}td,th{padding:10px;border-bottom:1px solid #ddd;text-align:start}.label{font-size:20px;line-height:1.8;border:3px solid #111;padding:28px}.total{font-size:24px;font-weight:700;margin-top:24px}</style>
    <header><h1>ORIGO</h1><p>${isLabel ? (ar ? "بوليصة شحن" : "SHIPPING LABEL") : (ar ? "فاتورة طلب" : "ORDER INVOICE")} · ${escapeHTML(order.orderNumber)}</p></header>
    ${isLabel ? `<div class="label"><b>${escapeHTML(order.customerName)}</b><br>${escapeHTML(order.phone)}<br>${escapeHTML(order.address)}<br>${escapeHTML(order.governorate)}<hr>${escapeHTML(order.shippingCarrier || "")} · ${escapeHTML(order.trackingNumber || "")}</div>` :
      `<p><b>${escapeHTML(order.customerName)}</b> · ${escapeHTML(order.phone)}</p><p>${escapeHTML(order.address)}، ${escapeHTML(order.governorate)}</p><table><thead><tr><th>${ar ? "المنتج" : "Product"}</th><th>${ar ? "الكمية" : "Qty"}</th><th>${ar ? "الإجمالي" : "Total"}</th></tr></thead><tbody>${items}</tbody></table><p class="total">${formatPrice(order.total)}</p>`}
    <script>window.onload=()=>{window.print();window.onafterprint=()=>window.close()}<\/script></html>`);
  popup.document.close();
}

let adminWorkspaceSyncTimer;
function saveAdminWorkspace(section = state.adminView) {
  try {
    localStorage.setItem("origoAdminWorkspace", JSON.stringify(state.adminWorkspace));
  } catch (error) {
    if (!state.serverAvailable || !isStaffUser()) showToast(adminCopy("تعذر الحفظ المحلي بسبب امتلاء مساحة المتصفح. احذف بعض الصور الكبيرة.", "Local storage is full. Remove some large images."), "error");
  }
  if (!state.serverAvailable || !isStaffUser()) return;
  clearTimeout(adminWorkspaceSyncTimer);
  adminWorkspaceSyncTimer = setTimeout(() => {
    api("/api/admin/workspace", {
      method: "POST",
      body: JSON.stringify({ state: state.adminWorkspace, section })
    }).catch((error) => showToast(error.message));
  }, 250);
}

function adminSection(id = state.adminView) {
  return adminSections.find((section) => section.id === id) || adminSections[0];
}

function adminStatusLabel(status) {
  const labels = {
    active: ["نشط", "Active"], scheduled: ["مجدول", "Scheduled"], published: ["منشور", "Published"],
    pending: ["بانتظار المراجعة", "Pending"], open: ["مفتوح", "Open"], waiting: ["بانتظار العميل", "Waiting"],
    received: ["تم الاستلام", "Received"], in_transit: ["في الطريق", "In transit"],
    low: ["منخفض", "Low"], healthy: ["جيد", "Healthy"], draft: ["مسودة", "Draft"]
  };
  return (labels[status] || [status, status])[state.lang === "ar" ? 0 : 1];
}

function orderStatusOptions(selected) {
  return Object.entries(orderStatuses).map(([value, [ar, en]]) =>
    `<option value="${value}"${value === selected ? " selected" : ""}>${state.lang === "ar" ? ar : en}</option>`
  ).join("");
}

function adminNavMarkup() {
  let lastGroup = "";
  return adminSections.filter((section) => section.id === "overview"
    || hasStaffPermission(sectionPermission(section.id))
    || state.user?.permissions?.includes("*")).map((section) => {
    const group = state.lang === "ar" ? section.groupAr : section.groupEn;
    const heading = group !== lastGroup ? `<small>${escapeHTML(group)}</small>` : "";
    lastGroup = group;
    return `${heading}<button data-action="admin-view" data-view="${section.id}" class="${state.adminView === section.id ? "active" : ""}">
      <i>${section.icon}</i><span>${escapeHTML(state.lang === "ar" ? section.ar : section.en)}</span>
      ${section.id === "orders" && state.adminOrders.filter((order) => order.status === "new").length ? `<b>${state.adminOrders.filter((order) => order.status === "new").length}</b>` : ""}
      ${section.id === "inventory" ? `<b>${lowStockProducts().length}</b>` : ""}</button>`;
  }).join("");
}

function inventoryForProduct(product) {
  const saved = state.adminWorkspace.inventory[product.id] || {};
  const fallback = 12 + (String(product.id).length * 7) % 21;
  return {
    quantity: Number(saved.quantity ?? fallback),
    reserved: Number(saved.reserved ?? 0),
    minimum: Number(saved.minimum ?? 8),
    cost: Number(saved.cost ?? Math.round(Number(product.price || 0) * .58))
  };
}

function lowStockProducts() {
  return state.products.filter((product) => {
    const inventory = inventoryForProduct(product);
    return inventory.quantity - inventory.reserved <= inventory.minimum;
  });
}

function customerRows() {
  const customers = new Map();
  state.adminOrders.forEach((order) => {
    const key = order.phone || String(order.userId);
    const current = customers.get(key) || {
      id: key, name: order.customerName, phone: order.phone, orders: 0, total: 0, lastOrder: order.createdAt
    };
    current.orders += 1;
    current.total += Number(order.total || 0);
    if (new Date(order.createdAt) > new Date(current.lastOrder)) current.lastOrder = order.createdAt;
    customers.set(key, current);
  });
  return [...customers.values()];
}

async function loadAdminDashboardData() {
  try {
    await loadAdminCatalog();
  } catch {
    state.catalogProducts = [];
  }
  try {
    const [ordersResult, workspaceResult, staffResult, integrationsResult, alternativesResult] = await Promise.all([
      hasStaffPermission("orders:view") ? api("/api/admin/orders") : Promise.resolve({ orders: [] }),
      api("/api/admin/workspace"),
      hasStaffPermission("users") ? api("/api/admin/staff") : Promise.resolve({ staff: [] }),
      hasStaffPermission("settings") ? api("/api/admin/integrations") : Promise.resolve({ integrations: {} }),
      hasStaffPermission("catalog:view") ? api("/api/admin/alternatives") : Promise.resolve({ items: [], settings: {}, analytics: {} })
    ]);
    state.adminOrders = ordersResult.orders || [];
    if (workspaceResult.state && Object.keys(workspaceResult.state).length) {
      state.adminWorkspace = {
        ...state.adminWorkspace,
        ...workspaceResult.state,
        analytics: { ...state.adminWorkspace.analytics, ...(workspaceResult.state.analytics || {}) },
        inventory: { ...state.adminWorkspace.inventory, ...(workspaceResult.state.inventory || {}) },
        entities: { ...state.adminWorkspace.entities, ...(workspaceResult.state.entities || {}) },
        settings: mergeStoreSettings({ ...state.adminWorkspace.settings, ...(workspaceResult.state.settings || {}) })
      };
      localStorage.setItem("origoAdminWorkspace", JSON.stringify(state.adminWorkspace));
    }
    state.adminActivity = workspaceResult.activity || [];
    state.adminStaff = staffResult.staff || [];
    state.integrationStatus = integrationsResult.integrations || {};
    state.alternativesAdmin = alternativesResult || state.alternativesAdmin;
  } catch {
    state.adminOrders = [];
  }
}

async function openAdminDashboard(view = state.adminView || "overview") {
  await loadAdminDashboardData();
  state.adminView = view;
  $("#admin-sidebar-user-name").textContent = state.user?.name || "ORIGO Admin";
  $("#admin-profile-name").textContent = state.user?.name || "ORIGO Admin";
  renderAdminDashboard(view);
  openOverlay("#admin-overlay");
}

function adminMetric(icon, label, value, trend = "", tone = "") {
  return `<article class="admin-metric-card ${tone}"><header><span>${icon}</span>${trend ? `<i>${escapeHTML(trend)}</i>` : ""}</header>
    <strong>${value}</strong><small>${escapeHTML(label)}</small></article>`;
}

function orderStatusSummary() {
  const statuses = [
    ["new", "جديد", "New"], ["processing", "قيد التجهيز", "Processing"], ["shipped", "تم الشحن", "Shipped"],
    ["completed", "مكتمل", "Completed"], ["cancelled", "ملغي", "Cancelled"]
  ];
  return statuses.map(([value, ar, en]) => {
    const count = state.adminOrders.filter((order) => order.status === value).length;
    return `<button data-action="admin-view" data-view="orders"><i class="${value}"></i><span><b>${count}</b><small>${state.lang === "ar" ? ar : en}</small></span><strong>→</strong></button>`;
  }).join("");
}

function bestSellingRows() {
  const counts = new Map();
  state.adminOrders.forEach((order) => (order.items || []).forEach((item) => {
    const current = counts.get(item.productId) || { quantity: 0, revenue: 0, name: item.productName };
    current.quantity += Number(item.quantity || 0);
    current.revenue += Number(item.lineTotal || 0);
    counts.set(item.productId, current);
  }));
  const ranked = [...counts.entries()].sort((a, b) => b[1].quantity - a[1].quantity).slice(0, 5);
  const source = ranked.length ? ranked : state.products.slice(0, 4).map((product) => [product.id, {
    quantity: 0, revenue: 0, name: state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr
  }]);
  return source.map(([id, item], index) => {
    const product = getProduct(id);
    return `<article class="admin-ranked-product"><b>${String(index + 1).padStart(2, "0")}</b>
      <img src="${escapeHTML(product?.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt="" />
      <span><strong>${escapeHTML(item.name)}</strong><small>${item.quantity} ${state.lang === "ar" ? "قطعة" : "units"}</small></span>
      <i>${formatPrice(item.revenue)}</i></article>`;
  }).join("");
}

function overviewMarkup() {
  const orders = state.adminOrders;
  const liveOrders = orders.filter((order) => order.status !== "cancelled");
  const sales = liveOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const average = liveOrders.length ? sales / liveOrders.length : 0;
  const margin = state.adminWorkspace.analytics.approximateMargin / 100;
  const profit = Math.max(0, sales * margin - Number(state.adminWorkspace.analytics.adSpend || 0));
  const roas = Number(state.adminWorkspace.analytics.adRevenue || 0) / Math.max(1, Number(state.adminWorkspace.analytics.adSpend || 0));
  const chartValues = [18, 31, 24, 42, 37, 55, Math.max(12, Math.min(80, Math.round(sales / 1000)))];
  const customers = customerRows();
  return `
    <section class="admin-metrics-grid">
      ${adminMetric("◈", state.lang === "ar" ? "إجمالي المبيعات" : "Total sales", formatPrice(sales), liveOrders.length ? "+12.4%" : "—", "burgundy")}
      ${adminMetric("▤", state.lang === "ar" ? "الطلبات" : "Orders", orders.length.toLocaleString(), `${orders.filter((order) => order.status === "new").length} ${state.lang === "ar" ? "جديد" : "new"}`)}
      ${adminMetric("◇", state.lang === "ar" ? "متوسط قيمة الطلب" : "Average order value", formatPrice(average), "AOV")}
      ${adminMetric("♙", state.lang === "ar" ? "العملاء" : "Customers", customers.length.toLocaleString(), state.lang === "ar" ? "ملفات فعلية" : "live profiles")}
      ${adminMetric("◎", state.lang === "ar" ? "معدل التحويل" : "Conversion rate", `${state.adminWorkspace.analytics.conversionRate}%`, state.lang === "ar" ? "تمهيدي" : "baseline")}
      ${adminMetric("↗", "ROAS", `${roas.toFixed(1)}×`, state.lang === "ar" ? "الحملات" : "campaigns")}
      ${adminMetric("▦", state.lang === "ar" ? "مخزون منخفض" : "Low stock", lowStockProducts().length, state.lang === "ar" ? "يحتاج متابعة" : "needs action", lowStockProducts().length ? "warning" : "")}
      ${adminMetric("◆", state.lang === "ar" ? "الربح التقريبي" : "Approx. profit", formatPrice(profit), `${state.adminWorkspace.analytics.approximateMargin}%`)}
    </section>

    <section class="admin-overview-grid">
      <article class="admin-chart-card">
        <header><div><span class="eyebrow">${state.lang === "ar" ? "الأداء" : "PERFORMANCE"}</span><h3>${state.lang === "ar" ? "اتجاه المبيعات" : "Sales trend"}</h3></div>
          <select aria-label="فترة التقرير"><option>${state.lang === "ar" ? "آخر 7 أيام" : "Last 7 days"}</option><option>${state.lang === "ar" ? "هذا الشهر" : "This month"}</option></select></header>
        <div class="admin-sales-chart">${chartValues.map((value, index) => `<span style="--chart-value:${value}%"><i></i><small>${state.lang === "ar" ? ["س","ح","ن","ث","ر","خ","ج"][index] : ["S","M","T","W","T","F","S"][index]}</small></span>`).join("")}</div>
        <footer><span><i></i>${state.lang === "ar" ? "المبيعات" : "Sales"}</span><b>${formatPrice(sales)}</b></footer>
      </article>
      <article class="admin-status-card">
        <header><div><span class="eyebrow">${state.lang === "ar" ? "التنفيذ" : "FULFILMENT"}</span><h3>${state.lang === "ar" ? "حالة الطلبات" : "Order status"}</h3></div>
          <button data-action="admin-view" data-view="orders">${state.lang === "ar" ? "عرض الكل" : "View all"} →</button></header>
        <div>${orderStatusSummary()}</div>
      </article>
    </section>

    <section class="admin-overview-grid lower">
      <article class="admin-list-card">
        <header><div><span class="eyebrow">${state.lang === "ar" ? "الكتالوج" : "CATALOG"}</span><h3>${state.lang === "ar" ? "الأكثر مبيعًا" : "Best sellers"}</h3></div>
          <button data-action="admin-view" data-view="products">→</button></header>
        <div>${bestSellingRows()}</div>
      </article>
      <article class="admin-alerts-card">
        <header><span class="eyebrow">${state.lang === "ar" ? "مركز التنبيهات" : "ALERT CENTER"}</span><h3>${state.lang === "ar" ? "يحتاج انتباهك" : "Needs your attention"}</h3></header>
        <div>
          <button data-action="admin-view" data-view="inventory"><span class="danger">!</span><div><b>${lowStockProducts().length} ${state.lang === "ar" ? "منتجات منخفضة المخزون" : "low-stock products"}</b><small>${state.lang === "ar" ? "راجع حد إعادة الطلب" : "Review reorder thresholds"}</small></div><i>←</i></button>
          <button data-action="admin-view" data-view="orders"><span>◷</span><div><b>${orders.filter((order) => order.status === "new").length} ${state.lang === "ar" ? "طلبات جديدة" : "new orders"}</b><small>${state.lang === "ar" ? "بانتظار التأكيد" : "Awaiting confirmation"}</small></div><i>←</i></button>
          <button data-action="admin-view" data-view="reviews"><span>★</span><div><b>${state.adminWorkspace.reviews.filter((review) => review.status === "pending").length} ${state.lang === "ar" ? "تقييمات للمراجعة" : "reviews to moderate"}</b><small>${state.lang === "ar" ? "راجع قبل النشر" : "Review before publishing"}</small></div><i>←</i></button>
          <button data-action="admin-view" data-view="support"><span>◌</span><div><b>${state.adminWorkspace.tickets.filter((ticket) => ticket.status === "open").length} ${state.lang === "ar" ? "تذاكر مفتوحة" : "open tickets"}</b><small>${state.lang === "ar" ? "أولوية خدمة العملاء" : "Customer support queue"}</small></div><i>←</i></button>
        </div>
      </article>
    </section>`;
}

function operationalAdminMarkup(kind = "overview") {
  const orders = state.adminOrders.length ? state.adminOrders : Array.from({length:10},(_,i)=>({id:i+1,orderNumber:`ORD-${1001+i}`,customerName:["أحمد محمد","سارة علي","محمد خالد","نورا حسن","عمرو طارق","هدى محمود","ياسر إبراهيم","منة الله","فاطمة الزهراء","علي رضوان"][i],phone:`01${String(12345678+i).padStart(9,"0")}`,total:[2450,1890,950,3250,1150,780,2990,560,1620,4200][i],status:["completed","shipped","processing","shipped","completed","cancelled","shipped","completed","processing","shipped"][i],paymentMethod:i%3===1?"فيزا / ماستركارد":i%3===2?"فودافون كاش":"الدفع عند الاستلام",createdAt:`2024-07-${String(10-Math.floor(i/3)).padStart(2,"0")}T${String(10+i).padStart(2,"0")}:30:00`}));
  const customers = customerRows().length ? customerRows() : orders.map((o,i)=>({id:`CUST-${1001+i}`,name:o.customerName,phone:o.phone,email:["ahmed.m@email.com","sara.h@email.com","mohamed.k@email.com","nora.h@email.com","amr.t@email.com","hoda.y@email.com","yasser.a@email.com","menna.s@email.com","fatma.m@email.com","ali.r@email.com"][i],city:["القاهرة","الجيزة","الإسكندرية","القاهرة","الشرقية"][i%5],orders:[5,3,7,2,4,1,6,2,3,8][i],total:o.total,lastOrder:o.createdAt}));
  const filterTitle = kind === "orders" ? "حالة الطلب" : kind === "customers" ? "الجنس" : "الأقسام";
  const sideOptions = kind === "orders" ? [["جميع الطلبات",128],["قيد المعالجة",42],["قيد الشحن",36],["تم الشحن",18],["تم التسليم",24],["ملغي",15]] : kind === "customers" ? [["كل العملاء",2543],["ذكر",1542],["أنثى",1001],["نشط",2301],["غير نشط",146],["محظور",96]] : [["جميع الأقسام",10],["جميع الماركات",125],["جميع الاستخدامات",12],["جميع فئات السعر",8]];
  const filters = `<aside class="ops-filter-panel"><label class="ops-filter-master"><input type="checkbox" checked/><i></i>تفعيل الفلاتر في المتجر</label><h3>معاينة الفلاتر في المتجر</h3><div class="ops-phone-preview"><header><b>10:30</b><span>▮▮ ◉</span></header><h4>تصفية النتائج ☷</h4><section><b>${filterTitle}</b>${sideOptions.map(([label,count],i)=>`<label><span>${label}</span><small>(${count})</small><input type="checkbox"${i===0?" checked":""}/></label>`).join("")}<button>عرض المزيد</button></section><section><b>${kind==="customers"?"المدينة":"القيمة الإجمالية"}</b><div class="ops-range"><input value="0"/><input value="${kind==="customers"?"القاهرة":"100,000+"}"/></div><input type="range" value="80"/></section><button class="primary">عرض ${kind==="overview"?489:2543} ${kind==="customers"?"عميل":kind==="orders"?"طلب":"منتج"}</button></div><div class="ops-tip"><b>ⓘ نصيحة ذكية</b><p>استخدم الفلاتر الذكية للوصول بسرعة إلى البيانات التي تحتاج انتباهك.</p></div></aside>`;
  if (kind === "orders") return `<section class="ops-console" dir="rtl">${filters}<main><header class="ops-view-head"><div><h2>إدارة الطلبات</h2><p>الرئيسية ‹ الطلبات</p></div><div class="ops-view-controls"><select><option>جميع الطلبات</option></select><button>▣</button><button class="active">▤</button></div></header><div class="ops-order-stats">${[["ملغي",146],["تم التسليم",2301],["تم الشحن",42],["قيد الشحن",36],["قيد المعالجة",42],["إجمالي الطلبات",2543]].map(([l,v])=>`<article><small>${l}</small><b>${v.toLocaleString()}</b></article>`).join("")}</div>${opsToolbar("طلب")}<div class="ops-data-table"><table><thead><tr><th>رقم الطلب</th><th>العميل</th><th>التاريخ</th><th>القيمة الإجمالية</th><th>طريقة الدفع</th><th>حالة الطلب</th><th>الإجراءات</th></tr></thead><tbody>${orders.slice(0,10).map(o=>`<tr><td><b class="ops-id">#${o.orderNumber}</b></td><td><b>${escapeHTML(o.customerName)}</b><small>${escapeHTML(o.phone||"")}</small></td><td>${new Date(o.createdAt).toLocaleDateString("ar-EG")}<small>${new Date(o.createdAt).toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"})}</small></td><td><b>${formatPrice(o.total)}</b></td><td>${escapeHTML(o.paymentMethod||"الدفع عند الاستلام")}</td><td><span class="ops-status ${o.status}">${adminStatusLabel(o.status)}</span></td><td><button>◉</button><button>⋮</button></td></tr>`).join("")}</tbody></table>${opsPagination("طلب")}</div></main></section>`;
  if (kind === "customers") return `<section class="ops-console" dir="rtl">${filters}<main><header class="ops-view-head"><div><h2>إدارة العملاء</h2><p>الرئيسية ‹ العملاء</p></div><div class="ops-view-controls"><select><option>العملاء</option></select><button>▣</button><button class="active">▤</button></div></header><div class="ops-customer-stats">${[["إجمالي المبيعات","1,245,890"],["متوسط الطلبات للعميل","1.8"],["العملاء النشطون","2,301"],["عملاء جدد (7 يوم)","198"],["إجمالي العملاء","2,543"]].map(([l,v])=>`<article><small>${l}</small><b>${v}</b></article>`).join("")}</div>${opsToolbar("عميل")}<div class="ops-data-table"><table><thead><tr><th>رقم العميل</th><th>الاسم</th><th>البريد الإلكتروني</th><th>الهاتف</th><th>المدينة</th><th>عدد الطلبات</th><th>إجمالي المشتريات</th><th>تاريخ التسجيل</th><th>الإجراءات</th></tr></thead><tbody>${customers.slice(0,10).map(c=>`<tr><td><b class="ops-id">#${c.id}</b></td><td><b>${escapeHTML(c.name)}</b></td><td dir="ltr">${escapeHTML(c.email||"")}</td><td dir="ltr">${escapeHTML(c.phone||"")}</td><td>${escapeHTML(c.city||"القاهرة")}</td><td>${c.orders}</td><td>${formatPrice(c.total)}</td><td>${new Date(c.lastOrder).toLocaleDateString("ar-EG")}</td><td><button>✉</button><button>◉</button><button>⋮</button></td></tr>`).join("")}</tbody></table>${opsPagination("عميل")}</div></main></section>`;
  return `<section class="ops-console ops-overview" dir="rtl">${filters}<main><header class="ops-view-head"><div><h2>لوحة التحكم</h2><p>الرئيسية ‹ لوحة التحكم</p></div></header><div class="ops-dashboard-kpis">${[["إجمالي المبيعات","256,890","↗ 12.5%"],["عدد الطلبات","1,245","↗ 48.2%"],["العملاء الجدد","892","↗ 45.2%"],["زيارات المتجر","48,762","↗ 49.7%"],["عدد المنتجات","2,301",""]].map(([l,v,t])=>`<article><small>${l}</small><b>${v}</b><em>${t}</em></article>`).join("")}</div><div class="ops-charts"><article><h3>طلبات حسب الحالة</h3><div class="ops-donut"><b>1,245<small>إجمالي الطلبات</small></b></div><ul><li>تم التسليم 65%</li><li>قيد الشحن 18%</li><li>قيد المعالجة 10%</li><li>ملغي 4%</li></ul></article><article><h3>مبيعات آخر 7 أيام</h3><div class="ops-line-chart">${[18,35,47,45,65,72,94,70,58].map(v=>`<i style="--v:${v}%"></i>`).join("")}</div></article></div><div class="ops-lower-grids"><article><h3>أفضل المنتجات مبيعاً</h3>${state.products.slice(0,5).map((p,i)=>`<p><img src="${escapeHTML(p.image)}"/><b>${escapeHTML(p.nameAr||p.nameEn)}</b><span>${156-i*17}</span><em>${formatPrice(78000-i*11000)}</em></p>`).join("")}</article><article><h3>أحدث الطلبات</h3>${orders.slice(0,5).map(o=>`<p><b class="ops-id">#${o.orderNumber}</b><span>${formatPrice(o.total)}</span><em class="ops-status ${o.status}">${adminStatusLabel(o.status)}</em></p>`).join("")}</article></div></main></section>`;
}

function opsToolbar(noun) { return `<div class="ops-toolbar"><select><option>10 لكل صفحة</option></select><label>⌕<input placeholder="بحث عن ${noun}..."/></label><button>▽ المزيد من الفلاتر</button><button>تصدير⌄</button></div>`; }
function opsPagination(noun) { return `<footer class="ops-pagination"><span>عرض 1 إلى 10 من 2,543 ${noun}</span><div><button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>…</button><button>255</button><button>›</button></div></footer>`; }

function adminTable(headers, rows, emptyText) {
  return `<div class="admin-data-table"><table><thead><tr>${headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr></thead>
    <tbody>${rows.length ? rows.join("") : `<tr><td colspan="${headers.length}"><div class="admin-table-empty">◇<b>${escapeHTML(emptyText)}</b></div></td></tr>`}</tbody></table></div>`;
}

function ordersViewMarkup() {
  const headers = state.lang === "ar"
    ? ["الطلب", "العميل", "المنتجات", "الإجمالي", "الحالة", "التاريخ"]
    : ["Order", "Customer", "Products", "Total", "Status", "Date"];
  const rows = state.adminOrders.map((order) => `<tr><td><button class="table-action" data-action="open-order-details" data-id="${order.id}" dir="ltr">${escapeHTML(order.orderNumber)} ↗</button></td>
    <td><b>${escapeHTML(order.customerName)}</b><small>${escapeHTML(order.phone)}</small></td>
    <td>${(order.items || []).reduce((sum, item) => sum + Number(item.quantity), 0)}</td><td><b>${formatPrice(order.total)}</b></td>
    <td><select data-action="order-status" data-id="${order.id}">${orderStatusOptions(order.status)}</select></td>
    <td><small>${new Date(order.createdAt).toLocaleDateString(state.lang === "ar" ? "ar-EG" : "en-US")}</small></td></tr>`);
  const activeOrder = state.adminOrders.find((order) => Number(order.id) === Number(state.activeAdminOrderId));
  return `${activeOrder ? orderDetailsMarkup(activeOrder) : ""}<div class="admin-workflow-strip">${orderStatusSummary()}</div>${adminTable(headers, rows, state.lang === "ar" ? "لا توجد طلبات بعد" : "No orders yet")}`;
}

function orderDetailsMarkup(order) {
  const ar = state.lang === "ar";
  const paymentOptions = [
    ["pending", ar ? "معلّق" : "Pending"], ["paid", ar ? "مدفوع" : "Paid"],
    ["partially_paid", ar ? "مدفوع جزئياً" : "Partially paid"],
    ["failed", ar ? "فشل" : "Failed"], ["refunded", ar ? "مسترد" : "Refunded"]
  ];
  return `<form id="admin-order-details-form" class="admin-order-detail">
    <input type="hidden" name="id" value="${order.id}" />
    <header><div><span class="eyebrow">ORDER ${escapeHTML(order.orderNumber)}</span><h3>${escapeHTML(order.customerName)}</h3></div>
      <div><button type="button" class="secondary-button compact-button" data-action="print-order" data-id="${order.id}" data-kind="invoice">${ar ? "طباعة فاتورة" : "Print invoice"}</button>
      <button type="button" class="secondary-button compact-button" data-action="print-order" data-id="${order.id}" data-kind="label">${ar ? "بوليصة شحن" : "Shipping label"}</button>
      ${state.integrationStatus.bosta?.configured ? `<button type="button" class="secondary-button compact-button" data-action="create-bosta-shipment" data-id="${order.id}">${ar ? "إنشاء شحنة Bosta" : "Create Bosta shipment"}</button>` : ""}
      ${state.integrationStatus.whatsapp?.configured ? `<button type="button" class="secondary-button compact-button" data-action="send-whatsapp-order" data-id="${order.id}">${ar ? "إرسال WhatsApp" : "Send WhatsApp"}</button>` : ""}
      <button type="button" class="icon-button" data-action="close-order-details">×</button></div></header>
    <section class="review-grid">
      <label>${ar ? "حالة الطلب" : "Order status"}<select name="status">${orderStatusOptions(order.status)}</select></label>
      <label>${ar ? "حالة الدفع" : "Payment status"}<select name="paymentStatus">${selectOptions(paymentOptions, order.paymentStatus || "pending")}</select></label>
      <label>${ar ? "شركة الشحن" : "Carrier"}<input name="shippingCarrier" value="${escapeHTML(order.shippingCarrier || "")}" /></label>
      <label>${ar ? "رقم التتبع" : "Tracking number"}<input name="trackingNumber" value="${escapeHTML(order.trackingNumber || "")}" /></label>
    </section>
    <label>${ar ? "ملاحظات داخلية" : "Internal notes"}<textarea name="internalNotes" rows="3">${escapeHTML(order.internalNotes || "")}</textarea></label>
    <div class="admin-order-items">${(order.items || []).map((item) => `<span><b>${item.quantity}× ${escapeHTML(item.productName)}</b><i>${formatPrice(item.lineTotal)}</i></span>`).join("")}</div>
    <div class="admin-order-timeline">${(order.timeline || []).map((event) => `<span><i></i><b>${escapeHTML(event.status || event.type)}</b><small>${escapeHTML(event.createdAt || "")}</small></span>`).join("")}</div>
    <footer><strong>${formatPrice(order.total)}</strong><button class="button burgundy-button" type="submit">${ar ? "حفظ تفاصيل الطلب" : "Save order details"}</button></footer>
  </form>`;
}

function productViewMarkup() {
  const headers = state.lang === "ar"
    ? ["المنتج", "SKU", "السعر", "المخزون", "الحالة", "إجراء"]
    : ["Product", "SKU", "Price", "Inventory", "Status", "Action"];
  const rows = state.products.map((product) => {
    const inventory = inventoryForProduct(product);
    return `<tr><td><span class="admin-product-cell"><img src="${escapeHTML(product.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt="" /><span><b>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${escapeHTML(product.brand)}</small></span></span></td>
      <td><small dir="ltr">${escapeHTML(product.sku || "—")}</small></td><td><b>${formatPrice(product.price)}</b></td>
      <td><span class="stock-pill ${inventory.quantity - inventory.reserved <= inventory.minimum ? "low" : ""}">${inventory.quantity - inventory.reserved}</span></td>
      <td><span class="admin-status ${escapeHTML(product.status || "published")}">${adminStatusLabel(product.status || "published")}</span></td>
      <td><span class="admin-table-actions">
        <button class="table-action" data-action="edit-admin-product" data-id="${escapeHTML(product.id)}">${state.lang === "ar" ? "تعديل" : "Edit"}</button>
        <button class="table-action" data-action="duplicate-admin-product" data-id="${escapeHTML(product.id)}">${state.lang === "ar" ? "نسخ" : "Duplicate"}</button>
        <button class="table-action" data-action="toggle-admin-product" data-id="${escapeHTML(product.id)}">${product.status === "published" ? (state.lang === "ar" ? "إيقاف" : "Disable") : (state.lang === "ar" ? "نشر" : "Publish")}</button>
        <button class="table-action danger" data-action="archive-admin-product" data-id="${escapeHTML(product.id)}">${state.lang === "ar" ? "أرشفة" : "Archive"}</button>
        <button class="table-action danger" data-action="delete-admin-product" data-id="${escapeHTML(product.id)}">${state.lang === "ar" ? "حذف" : "Delete"}</button>
      </span></td></tr>`;
  });
  return adminTable(headers, rows, state.lang === "ar" ? "لا توجد منتجات" : "No products");
}

function performanceProductsViewMarkup() {
  const ar = state.lang === "ar";
  const products = state.catalogProducts.filter((product) => !product.category || product.category === "perfume");
  const totals = products.reduce((summary, product) => {
    const insights = product.performanceInsights || {};
    const counts = insights.aggregate?.counts || {};
    summary.customers += Number(counts.customers || 0);
    summary.verified += Number(counts.verifiedCustomers || 0);
    summary.imported += Number(counts.imported || 0);
    summary.enabled += insights.settings?.enabled === false ? 0 : 1;
    return summary;
  }, { customers: 0, verified: 0, imported: 0, enabled: 0 });
  const modeLabel = (mode) => ({
    blended: ar ? "نتيجة مدمجة" : "Blended result",
    customers: ar ? "العملاء" : "Customers",
    editorial: ar ? "تقييم ORIGO" : "ORIGO editorial",
    imported: ar ? "بيانات مستوردة" : "Imported data"
  }[mode] || (ar ? "بيانات أولية" : "Preliminary"));
  const rows = products.map((product) => {
    const insights = product.performanceInsights || {};
    const counts = insights.aggregate?.counts || {};
    const enabled = insights.settings?.enabled !== false;
    const updatedAt = insights.aggregate?.updatedAt || insights.updatedAt;
    return `<tr>
      <td><span class="admin-product-cell"><img src="${escapeHTML(product.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt="" /><span><b>${escapeHTML(ar ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${escapeHTML(product.brand || "ORIGO")}</small></span></span></td>
      <td><span class="admin-status ${enabled ? "active" : "draft"}">${enabled ? (ar ? "ظاهر" : "Visible") : (ar ? "مخفي" : "Hidden")}</span></td>
      <td><b>${Number(counts.customers || 0).toLocaleString(ar ? "ar-EG" : "en-EG")}</b><small>${ar ? "عميل ORIGO" : "ORIGO customers"}</small></td>
      <td><b>${Number(counts.verifiedCustomers || 0).toLocaleString(ar ? "ar-EG" : "en-EG")}</b><small>${ar ? "شراء موثّق" : "verified purchases"}</small></td>
      <td><span class="admin-status active">${escapeHTML(modeLabel(insights.aggregate?.mode))}</span></td>
      <td><small>${updatedAt ? new Date(updatedAt).toLocaleDateString(ar ? "ar-EG" : "en-EG") : "—"}</small></td>
      <td><span class="admin-table-actions"><button class="table-action" data-action="edit-admin-product" data-id="${escapeHTML(product.id)}">${ar ? "إدارة" : "Manage"}</button><button class="table-action" data-action="recalculate-performance" data-id="${escapeHTML(product.id)}">${ar ? "إعادة احتساب" : "Recalculate"}</button></span></td>
    </tr>`;
  });
  const headers = ar
    ? ["العطر", "الظهور", "تقييمات العملاء", "شراء موثّق", "مصدر النتيجة", "آخر تحديث", "إجراء"]
    : ["Fragrance", "Visibility", "Customer ratings", "Verified", "Result source", "Updated", "Action"];
  return `<section class="performance-admin-overview">
    <div class="admin-metrics-grid performance-admin-metrics">
      ${adminMetric("◉", ar ? "عطور مفعلة" : "Enabled fragrances", totals.enabled, `${products.length} ${ar ? "عطر" : "fragrances"}`, "burgundy")}
      ${adminMetric("♙", ar ? "مشاركات العملاء" : "Customer submissions", totals.customers, ar ? "مصدر مستقل" : "separate source")}
      ${adminMetric("✓", ar ? "مشتريات موثقة" : "Verified purchases", totals.verified, ar ? "مرتبطة بطلبات" : "linked to orders")}
      ${adminMetric("⇣", ar ? "بيانات سابقة مستوردة" : "Imported prior data", totals.imported, ar ? "لا تُحسب كعملاء ORIGO" : "never counted as ORIGO customers")}
    </div>
    <div class="admin-integration-note"><span>i</span><div><b>${ar ? "فصل كامل بين مصادر البيانات" : "Data sources stay fully separated"}</b><p>${ar ? "تقييم ORIGO التحريري، وتقييمات العملاء، والمشتريات الموثقة، والبيانات المستوردة تُعرض وتُحسب كمصادر مستقلة. متوسط نجوم المنتج لا يتغير من هذه المؤشرات." : "ORIGO editorial data, customer votes, verified purchases, and imported history remain separate. Product star averages are not changed by these metrics."}</p></div></div>
    ${adminTable(headers, rows, ar ? "لا توجد عطور لإدارة مؤشرات أدائها" : "No fragrance performance records yet")}
  </section>`;
}

function inventoryViewMarkup() {
  const headers = state.lang === "ar"
    ? ["المنتج", "المتاح", "المحجوز", "الحد الأدنى", "التكلفة", "الحالة"]
    : ["Product", "Available", "Reserved", "Minimum", "Cost", "Status"];
  const rows = state.products.map((product) => {
    const item = inventoryForProduct(product);
    const available = item.quantity - item.reserved;
    const status = available <= item.minimum ? "low" : "healthy";
    return `<tr><td><b>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${escapeHTML(product.sku || "")}</small></td>
      <td><b>${available}</b></td><td>${item.reserved}</td><td>${item.minimum}</td><td>${formatPrice(item.cost)}</td>
      <td><span class="admin-status ${status}">${adminStatusLabel(status)}</span></td></tr>`;
  });
  return adminTable(headers, rows, state.lang === "ar" ? "لا توجد بيانات مخزون" : "No inventory data");
}

function customersViewMarkup() {
  const customers = customerRows();
  const headers = state.lang === "ar"
    ? ["العميل", "الهاتف", "الطلبات", "إجمالي المشتريات", "متوسط الطلب", "الشريحة"]
    : ["Customer", "Phone", "Orders", "Lifetime value", "AOV", "Segment"];
  const rows = customers.map((customer) => `<tr><td><span class="admin-customer-cell"><i>${escapeHTML(customer.name.slice(0, 1))}</i><b>${escapeHTML(customer.name)}</b></span></td>
    <td dir="ltr">${escapeHTML(customer.phone)}</td><td>${customer.orders}</td><td><b>${formatPrice(customer.total)}</b></td>
    <td>${formatPrice(customer.total / customer.orders)}</td><td><span class="admin-status active">${customer.total > 5000 ? "VIP" : customer.orders > 1 ? (state.lang === "ar" ? "متكرر" : "Repeat") : (state.lang === "ar" ? "جديد" : "New")}</span></td></tr>`);
  return adminTable(headers, rows, state.lang === "ar" ? "تظهر ملفات العملاء بعد أول طلب" : "Customer profiles appear after the first order");
}

function filterDefinitionForm(filter = null) {
  const categories = [
    ["perfume", "العطور / Perfume"], ["skincare", "العناية بالبشرة / Skincare"],
    ["incense", "البخور / Incense"], ["burner", "المباخر / Burners"],
    ["deodorant", "مزيلات العرق / Deodorants"], ["haircare", "العناية بالشعر / Haircare"]
  ];
  return `<form id="admin-filter-form" class="admin-quick-create">
    <input type="hidden" name="id" value="${filter?.id || ""}" />
    <div><span class="eyebrow">DYNAMIC FILTER ENGINE</span><h3>${filter ? adminCopy("تعديل الفلتر", "Edit filter") : adminCopy("إضافة فلتر", "Add filter")}</h3></div>
    <label>${adminCopy("القسم", "Category")}<select name="category">${selectOptions(categories, filter?.category || "perfume")}</select></label>
    <label>${adminCopy("المفتاح", "Key")}<input name="key" required value="${escapeHTML(filter?.key || "")}" placeholder="season" /></label>
    <label>${adminCopy("الاسم العربي", "Arabic label")}<input name="labelAr" required value="${escapeHTML(filter?.labelAr || "")}" /></label>
    <label>${adminCopy("الاسم الإنجليزي", "English label")}<input name="labelEn" required value="${escapeHTML(filter?.labelEn || "")}" /></label>
    <label>${adminCopy("نوع الحقل", "Input type")}<select name="inputType">${selectOptions([
      ["select","Select"],["multiselect","Multi select"],["range","Range"],["boolean","Boolean"],["text","Text"],["note","Knowledge note"]
    ], filter?.inputType || "select")}</select></label>
    <label>${adminCopy("الخيارات، مفصولة بفاصلة", "Comma-separated options")}<input name="options" value="${escapeHTML((filter?.options || []).join(", "))}" /></label>
    <label class="admin-toggle-row"><span><b>${adminCopy("ظاهر", "Visible")}</b></span><input name="visible" type="checkbox"${filter?.visible !== false ? " checked" : ""} /></label>
    <div><button type="button" class="secondary-button compact-button" data-action="cancel-admin-create">${adminCopy("إلغاء", "Cancel")}</button><button class="button burgundy-button" type="submit">${adminCopy("حفظ الفلتر", "Save filter")}</button></div>
  </form>`;
}

function filtersViewMarkup() {
  const grouped = new Map();
  state.filterDefinitions.forEach((filter) => {
    if (!grouped.has(filter.category)) grouped.set(filter.category, []);
    grouped.get(filter.category).push(filter);
  });
  return `<section class="admin-filter-groups">${[...grouped].map(([category, filters]) => `<article class="admin-list-card">
    <header><div><span class="eyebrow">${escapeHTML(category)}</span><h3>${escapeHTML(category)}</h3></div><b>${filters.length}</b></header>
    <div>${filters.map((filter) => `<div class="admin-ranked-product"><b>${filter.visible ? "✓" : "○"}</b><span><strong>${escapeHTML(state.lang === "ar" ? filter.labelAr : filter.labelEn)}</strong><small>${escapeHTML(filter.key)} · ${escapeHTML(filter.inputType)}</small></span>
      <span class="admin-table-actions"><button data-action="edit-filter" data-id="${filter.id}">${adminCopy("تعديل", "Edit")}</button><button class="danger" data-action="delete-filter" data-id="${filter.id}">${adminCopy("حذف", "Delete")}</button></span></div>`).join("")}</div>
  </article>`).join("")}</section>`;
}

function teamViewMarkup() {
  const ar = state.lang === "ar";
  return `<section class="admin-generic-grid">${state.adminStaff.map((member) => `<article>
    <header><span>♟</span><i class="active">${adminStatusLabel("active")}</i></header>
    <h3>${escapeHTML(member.name)}</h3><p>${escapeHTML(member.role)} · ${escapeHTML(member.email || "")}</p>
    <footer><b>${escapeHTML(member.id)}</b><button data-action="admin-edit-entity" data-view="team" data-id="${escapeHTML(member.id)}">•••</button></footer>
  </article>`).join("")}</section>
  <section class="admin-list-card"><header><div><span class="eyebrow">ROLE BASED ACCESS CONTROL</span><h3>${ar ? "مصفوفة الأدوار والصلاحيات" : "Roles and permissions matrix"}</h3></div></header>
    <div>${staffRoleDefinitions.map(([id, name, permissions]) => `<article class="admin-ranked-product"><b>♟</b><span><strong>${escapeHTML(name)}</strong><small>${escapeHTML(id)}</small></span><i>${escapeHTML(permissions)}</i></article>`).join("")}</div>
  </section>
  <section class="admin-list-card"><header><div><span class="eyebrow">ACTIVITY LOG</span><h3>${ar ? "آخر عمليات الموظفين" : "Recent staff activity"}</h3></div></header>
    <div>${state.adminActivity.length ? state.adminActivity.slice(0, 20).map((entry) => `<article class="admin-ranked-product"><b>◷</b><span><strong>${escapeHTML(entry.action)}</strong><small>${escapeHTML(entry.userName || entry.userEmail || "System")}</small></span><i>${escapeHTML(entry.createdAt || "")}</i></article>`).join("") : `<div class="admin-table-empty">${ar ? "يظهر السجل بعد أول عملية إدارية." : "Activity appears after the first admin action."}</div>`}</div>
  </section>`;
}

function rolesDashboardMarkup() {
  const roles = [["المدير العام (المالك)","صلاحيات كاملة على جميع أقسام النظام","♛",1],["مدير المتجر","إدارة العمليات والطلبات والعملاء","▦",1],["مسؤول المنتجات","إدارة المنتجات والمخزون والتصنيفات","◇",2],["مسؤول الطلبات","إدارة الطلبات والشحن والإرجاع","▣",3],["خدمة العملاء","الرد على العملاء وتذاكر الدعم","♧",2],["المحاسب","التقارير المالية والفواتير والمدفوعات","▤",1],["مشرف المحتوى","إدارة المحتوى والبنرات والصفحات","✎",1]];
  const sections = ["لوحة التحكم","الطلبات","العملاء","المنتجات","المخزون","العروض والقسائم","التقارير","الإعدادات","الصلاحيات والمستخدمين","سجل النشاط"];
  return `<section class="roles-dashboard" dir="rtl"><div class="roles-kpis"><article><span>♙</span><div><small>إجمالي المستخدمين</small><b>${Math.max(15,state.adminStaff.length)}</b><em>نشط: 12 | غير نشط: 3</em></div></article><article><span>♜</span><div><small>إجمالي الأدوار</small><b>6</b><em>أدوار مخصصة</em></div></article><article><span>▧</span><div><small>السياسات المفعلة</small><b>24</b><em>سياسة صلاحية</em></div></article><article><span>♙</span><div><small>آخر تحديث للصلاحيات</small><b>2024-05-19</b><em>منذ ساعتين</em></div></article></div><nav class="roles-tabs"><button>المستخدمون</button><button class="active">الأدوار والصلاحيات</button><button>سجل التغييرات</button></nav><div class="roles-layout"><aside class="roles-list"><header><h3>الأدوار</h3><button data-action="create-role">＋ إضافة دور جديد</button></header>${roles.map(([name,desc,icon,count],index)=>`<button class="role-list-item ${index===1?"active":""}"><i>${icon}</i><span><b>${name}</b><small>${desc}</small></span><em>${count}</em></button>`).join("")}</aside><main class="permissions-panel"><header><span>▦</span><div><h3>صلاحيات الدور: مدير المتجر</h3><p>يمكن لهذا الدور إدارة العمليات اليومية مثل الطلبات، العملاء، التقارير، العروض، والقسائم.</p></div></header><nav><button class="active">الصلاحيات العامة</button><button>الصلاحيات حسب القسم</button><button>تقييد الوصول</button></nav><div class="permissions-table-scroll"><table><thead><tr><th>الأقسام</th><th>عرض</th><th>إضافة</th><th>تعديل</th><th>حذف</th><th>تصدير</th><th>اعتماد / نشر</th></tr></thead><tbody>${sections.map((section,row)=>`<tr><th>${["⌂","▣","♙","◇","▦","⌑","▥","⚙","♙","◷"][row]} ${section}</th>${Array.from({length:6},(_,col)=>{const allowed=row<7&&(col<4||(row===1&&col===5));return `<td><button type="button" class="permission-toggle ${allowed?"allowed":"blocked"}">${allowed?"✓":"⊘"}</button></td>`}).join("")}</tr>`).join("")}</tbody></table></div><footer><div><span>✓ مسموح</span><span>⊘ غير مسموح</span></div><button data-action="reset-role-permissions">إعادة تعيين للصلاحيات الافتراضية</button><button class="primary" data-action="save-role-permissions">حفظ التغييرات</button></footer></main><aside class="role-details"><h3>معلومات الدور</h3><dl><dt>اسم الدور</dt><dd>مدير المتجر</dd><dt>الوصف</dt><dd>يمكنه إدارة العمليات اليومية مثل الطلبات، العملاء، التقارير، العروض والقسائم.</dd><dt>عدد المستخدمين</dt><dd>1 مستخدم</dd><dt>تاريخ الإنشاء</dt><dd>2024-04-10</dd><dt>آخر تحديث</dt><dd>2024-05-18 14:30</dd><dt>الحالة</dt><dd><span>نشط</span></dd></dl><h3>خيارات سريعة</h3><button data-action="edit-role">✎ تعديل معلومات الدور</button><button data-action="copy-role">▣ نسخ الدور</button><button class="danger" data-action="delete-role">♲ حذف الدور</button></aside></div></section>`;
}

document.addEventListener("click", (event) => {
  const toggle = event.target.closest(".permission-toggle");
  if (!toggle) return;
  const allowed = toggle.classList.toggle("allowed");
  toggle.classList.toggle("blocked", !allowed);
  toggle.textContent = allowed ? "✓" : "⊘";
});

function activitySecurityMarkup() {
  const sample = [
    ["2024-05-19","10:30:25 ص","أحمد محمد","المدير العام","تعديل منتج","تعديل سعر منتج 100ml - 160R - EDP","Windows / Chrome","41.36.25.10","success"],
    ["2024-05-19","09:15:10 ص","سارة علي","مدير المتجر","تحديث طلب","تغيير حالة الطلب #10524 من قيد الشحن إلى تم التسليم","Windows / Firefox","197.45.12.33","success"],
    ["2024-05-19","08:40:05 ص","محمد خالد","مسؤول المنتجات","إضافة منتج","إضافة منتج جديد Lattafa Khamrah 100ml","Windows / Chrome","41.36.25.10","success"],
    ["2024-05-19","03:22:18 ص","نادية حسن","خدمة العملاء","تعديل عميل","تعديل بيانات العميل محمد أحمد","Android / Mobile Chrome","197.45.12.33","success"],
    ["2024-05-18","11:05:33 م","علي يوسف","مسؤول الطلبات","حذف","حذف الطلب #10218","Windows / Edge","185.77.61.22","success"],
    ["2024-05-18","04:12:09 م","مستخدم غير معروف","—","تسجيل دخول","محاولة دخول من جهاز غير معروف","iPhone / Safari","185.77.61.22","warning"],
    ["2024-05-18","02:33:47 م","مستخدم غير معروف","—","تسجيل دخول","محاولة دخول بكلمة مرور خاطئة","Windows / Chrome","185.77.61.22","failed"],
    ["2024-05-17","10:20:18 م","أحمد محمد","المدير العام","تصدير تقرير","تصدير تقرير المبيعات (PDF)","Windows / Chrome","41.36.25.10","success"],
    ["2024-05-17","09:10:05 م","هبة سعيد","مدير المحتوى","تعديل محتوى","تعديل محتوى صفحة من نحن","Windows / Chrome","197.45.12.33","success"]
  ];
  const live = (state.adminActivity || []).slice(0,5).map((entry) => [String(entry.createdAt || "").slice(0,10),String(entry.createdAt || "").slice(11,19),entry.userName || entry.userEmail || "System","إدارة",entry.action || "عملية",entry.details || "عملية إدارية مسجلة","Web",entry.ip || "—","success"]);
  const rows = [...live,...sample];
  const resultLabel = {success:"نجاح",warning:"تحذير",failed:"فشل"};
  return `<section class="activity-security" dir="rtl"><div class="activity-kpis"><article><span>♙</span><div><small>آخر دخول للمسؤولين</small><b>منذ 10 دقائق</b><em>أحمد محمد</em></div></article><article><span>♜</span><div><small>محاولات فاشلة</small><b>12</b><em>محاولة</em></div></article><article><span>▥</span><div><small>هذا الشهر</small><b>1,782</b><em>عملية</em></div></article><article><span>↗</span><div><small>هذا الأسبوع</small><b>548</b><em>عملية</em></div></article><article><span>▣</span><div><small>اليوم</small><b>96</b><em>عملية</em></div></article><article><span>▧</span><div><small>إجمالي العمليات</small><b>1,248</b><em>عملية</em></div></article></div><div class="activity-toolbar"><label>▣<input value="2024-05-10 - 2024-05-19" readonly/></label><select id="activity-user-filter"><option value="">كل المستخدمين</option>${[...new Set(rows.map(r=>r[2]))].map(x=>`<option>${x}</option>`).join("")}</select><select id="activity-type-filter"><option value="">كل العمليات</option>${[...new Set(rows.map(r=>r[4]))].map(x=>`<option>${x}</option>`).join("")}</select><select id="activity-result-filter"><option value="">كل النتائج</option><option value="success">نجاح</option><option value="warning">تحذير</option><option value="failed">فشل</option></select><label class="activity-search">⌕<input id="activity-search" placeholder="بحث في السجل..."/></label><button data-action="export-activity">⇩ تصدير</button></div><div class="activity-layout"><div class="activity-table-card"><div class="activity-table-scroll"><table><thead><tr><th>الوقت والتاريخ</th><th>المستخدم</th><th>العملية</th><th>التفاصيل</th><th>الجهة / الجهاز</th><th>IP</th><th>النتيجة</th></tr></thead><tbody>${rows.map(r=>`<tr data-activity-row data-user="${escapeHTML(r[2])}" data-type="${escapeHTML(r[4])}" data-result="${r[8]}" data-search="${escapeHTML(r.join(" "))}"><td><b>${r[0]}</b><small>${r[1]}</small></td><td><b>${escapeHTML(r[2])}</b><small>${escapeHTML(r[3])}</small></td><td><b>${escapeHTML(r[4])}</b></td><td>${escapeHTML(r[5])}</td><td>${escapeHTML(r[6])}</td><td dir="ltr">${r[7]}</td><td><span class="activity-result ${r[8]}">${resultLabel[r[8]]}</span></td></tr>`).join("")}</tbody></table></div><footer><span>عرض 1 إلى ${Math.min(10,rows.length)} من 1,248 عملية</span><div><button>‹‹</button><button>‹</button><button class="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>…</button><button>125</button><button>›</button></div></footer></div><aside class="activity-filter-panel"><h3>تصفية السجل</h3><label>الفترة الزمنية<select><option>نطاق مخصص</option></select></label><label>من<input type="date" value="2024-05-10"/></label><label>إلى<input type="date" value="2024-05-19"/></label><label>المستخدم<select><option>كل المستخدمين</option></select></label><label>نوع العملية<select><option>كل العمليات</option></select></label><label>النتيجة<select><option>كل النتائج</option></select></label><label>الجهاز<select><option>كل الأجهزة</option></select></label><button class="primary" data-action="apply-activity-filters">تطبيق الفلاتر</button><button data-action="reset-activity-filters">إعادة تعيين</button></aside></div><footer class="activity-security-note">♜ يتم تسجيل جميع العمليات المهمة تلقائياً لضمان الأمان والشفافية. يحتفظ بالسجل لمدة 12 شهراً.</footer></section>`;
}

function initializeActivitySecurity() {
  const root = $(".activity-security"); if (!root) return;
  const filter = () => { const q=String($("#activity-search")?.value||"").toLowerCase(),u=$("#activity-user-filter")?.value||"",t=$("#activity-type-filter")?.value||"",r=$("#activity-result-filter")?.value||""; $$('[data-activity-row]',root).forEach(row=>row.hidden=!((!q||row.dataset.search.toLowerCase().includes(q))&&(!u||row.dataset.user===u)&&(!t||row.dataset.type===t)&&(!r||row.dataset.result===r))); };
  $("#activity-search")?.addEventListener("input",filter); $("#activity-user-filter")?.addEventListener("change",filter); $("#activity-type-filter")?.addEventListener("change",filter); $("#activity-result-filter")?.addEventListener("change",filter);
}

function brandManagementRecords() {
  const defaults = [["lattafa","لطافة","Lattafa","الإمارات","🇦🇪",320,2450800,"luxury"],["dior","ديور","Dior","فرنسا","🇫🇷",284,1980450,"high"],["chanel","شانيل","Chanel","فرنسا","🇫🇷",256,1765300,"luxury"],["armaf","أرماف","Armaf","الإمارات","🇦🇪",210,1250900,"high"],["tom-ford","توم فورد","Tom Ford","أمريكا","🇺🇸",180,980600,"medium"],["creed","كريد","Creed","فرنسا","🇫🇷",165,845700,"medium"],["yves-saint-laurent","إيف سان لوران","Yves Saint Laurent","فرنسا","🇫🇷",142,720150,"high"],["paco-rabanne","باكو رابان","Paco Rabanne","إسبانيا","🇪🇸",92,610500,"medium"]]
    .map(([id,nameAr,nameEn,country,flag,count,sales,level]) => ({ id,nameAr,nameEn,country,flag,count,sales,level,active:true,image:origoBrandLogo(nameEn) }));
  const overrides = state.adminWorkspace.entities.brands || [];
  const records = new Map(defaults.map((item) => [item.id, item]));
  overrides.filter((item) => !item._deleted).forEach((item) => records.set(String(item.id), { ...records.get(String(item.id)), ...item }));
  const source = state.products.reduce((map, product) => { const brand=String(product.brand||"ORIGO"); const row=map.get(brand)||{count:0,sales:0}; row.count+=1; row.sales+=Number(product.price||0)*((String(product.id).length%9)+4); map.set(brand,row); return map; },new Map());
  return [...records.values()].map((item) => { const live=source.get(item.nameEn)||source.get(item.nameAr); return live ? { ...item, count:Math.max(Number(item.count||0),live.count), sales:Math.max(Number(item.sales||0),live.sales) } : item; });
}

function brandsManagementMarkup() {
  const brands = brandManagementRecords();
  const categories=[["العطور",128,"♙"],["العناية بالبشرة",86,"▱"],["العناية بالجسم",64,"▯"],["العناية بالشعر",52,"♧"],["البخور والعطور المنزلية",34,"⌂"],["الهدايا والمجموعات",28,"♢"]];
  return `<section class="brands-management" dir="rtl"><div class="brands-kpis"><article><span>▱</span><div><small>إجمالي المبيعات</small><b>12,845,750</b><em>EGP</em></div></article><article><span>◇</span><div><small>إجمالي المنتجات</small><b>3,458</b><em>منتج</em></div></article><article><span>⌑</span><div><small>علامات نشطة</small><b>${brands.filter((item)=>item.active!==false).length}</b><em>نشطة</em></div></article><article><span>◇</span><div><small>إجمالي العلامات التجارية</small><b>${brands.length}</b><em>علامة</em></div></article></div><nav class="brand-department-tabs">${categories.map(([name,,icon],i)=>`<button class="${i===0?"active":""}">${icon} ${name}</button>`).join("")}</nav><div class="brands-layout"><main class="brands-table-card"><header><div><h3>العلامات التجارية في قسم العطور</h3><p>إدارة جميع العلامات التجارية الخاصة بالعطور</p></div><label>⌕<input id="brand-search" placeholder="ابحث عن علامة تجارية..."/></label><button>تصفية⌄</button><button data-action="export-brands">تصدير⌄</button></header><div class="brands-table-scroll"><table><thead><tr><th>الشعار</th><th>اسم العلامة التجارية</th><th>بلد المنشأ</th><th>مستوى السعر</th><th>عدد المنتجات</th><th>إجمالي المبيعات</th><th>الحالة</th><th>الإجراءات</th></tr></thead><tbody>${brands.map((item)=>`<tr data-brand-row data-brand-id="${escapeHTML(item.id)}" data-search="${escapeHTML(`${item.nameAr} ${item.nameEn} ${item.country}`)}"><td><div class="brand-logo ${escapeHTML(item.level)}">${item.image?`<img src="${escapeHTML(item.image)}" alt=""/>`:escapeHTML(item.nameEn)}</div></td><td><b>${escapeHTML(item.nameAr)}</b><small>${escapeHTML(item.nameEn)}</small></td><td>${escapeHTML(item.flag||"")} ${escapeHTML(item.country||"")}</td><td><span class="brand-level ${escapeHTML(item.level)}">${item.level==="luxury"?"فاخر":item.level==="high"?"مرتفع":"متوسط"}</span></td><td>${Number(item.count||0)}</td><td>${Number(item.sales||0).toLocaleString("en-US")} EGP</td><td><span class="brand-active">● ${item.active===false?"مخفية":"نشطة"}</span></td><td><button data-action="edit-brand" data-id="${escapeHTML(item.id)}" aria-label="تعديل ${escapeHTML(item.nameAr)}">✎</button><button>•••</button></td></tr>`).join("")}</tbody></table></div><footer class="brands-pagination"><span>عرض 1 إلى ${brands.length} من ${brands.length} علامة تجارية</span><div><button>السابق</button><button class="active">1</button><button>التالي</button></div><select><option>عرض 8</option><option>عرض 25</option></select></footer></main><aside class="brand-categories"><h3>الأقسام</h3>${categories.map(([name,count,icon],i)=>`<button class="${i===0?"active":""}"><i>${icon}</i><span>${name}</span><b>${count}</b></button>`).join("")}<div><b>ⓘ معلومة</b><p>كل قسم له مجموعة مستقلة من العلامات التجارية. العلامات التجارية في كل قسم لا تؤثر على الأقسام الأخرى.</p></div></aside></div></section>`;
}

function initializeBrandsManagement() { const input=$("#brand-search"); input?.addEventListener("input",()=>{const q=input.value.toLowerCase(); $$('[data-brand-row]').forEach(row=>row.hidden=!row.dataset.search.toLowerCase().includes(q));}); }

function notesViewMarkup() {
  const library = window.ORIGOFragranceNotes;
  return `<section class="admin-feature-hero notes-feature"><div><span class="eyebrow">FRAGRANCE NOTES LIBRARY</span>
    <h2>${state.lang === "ar" ? "مكتبة عطرية مترابطة" : "A connected olfactory library"}</h2>
    <p>${state.lang === "ar" ? "العائلات والمكونات والمرادفات والصور تتدفق تلقائيًا إلى هرم المنتج." : "Families, aliases, and artwork flow automatically into every product pyramid."}</p>
    <div><button class="button burgundy-button" data-action="open-notes-admin">${state.lang === "ar" ? "إدارة قاعدة المعرفة" : "Manage knowledge base"} ←</button></div></div>
    <div class="admin-notes-orbit"><strong>${library.notes.length}</strong><span>${state.lang === "ar" ? "مكوّن" : "notes"}</span><i>${library.families.length} ${state.lang === "ar" ? "عائلة" : "families"}</i></div></section>
    <section class="admin-family-grid">${library.families.map((family) => `<article style="--family-color:${escapeHTML(family.color)}"><span>${escapeHTML(family.symbol)}</span><div><b>${escapeHTML(state.lang === "ar" ? family.nameAr : family.nameEn)}</b>
      <small>${library.notes.filter((note) => note.familyId === family.id).length} ${state.lang === "ar" ? "مكوّن" : "notes"}</small></div></article>`).join("")}</section>`;
}

function genericRowsFor(view) {
  const defaults = {
    categories: window.ORIGOFragranceNotes.families.slice(0, 8).map((family) => ({ id: family.id, name: familyLabel(family), detail: `${window.ORIGOFragranceNotes.notes.filter((note) => note.familyId === family.id).length} notes`, status: "active" })),
    suppliers: state.adminWorkspace.suppliers,
    purchases: state.adminWorkspace.purchases,
    marketing: state.adminWorkspace.campaigns.map((campaign) => ({ ...campaign, detail: `${campaign.channel} · ROAS ${(campaign.revenue / Math.max(1, campaign.budget)).toFixed(1)}×` })),
    coupons: state.adminWorkspace.coupons,
    content: [
      { id: "home", name: state.lang === "ar" ? "الصفحة الرئيسية" : "Homepage", detail: "12 sections", status: "published" },
      { id: "journal", name: state.lang === "ar" ? "دليل العطور" : "Fragrance guide", detail: "8 articles", status: "draft" },
      { id: "faq", name: state.lang === "ar" ? "الأسئلة الشائعة" : "FAQ", detail: "18 items", status: "published" }
    ],
    reviews: state.adminWorkspace.reviews.map((review) => ({ ...review, detail: `${"★".repeat(review.rating)} · ${review.subject}` })),
    shipping: state.adminWorkspace.shipping.map((item) => ({ ...item, detail: `${item.carrier} · ${item.eta}` })),
    support: state.adminWorkspace.tickets.map((ticket) => ({ ...ticket, detail: `${ticket.customer} · ${ticket.priority}` })),
    team: state.adminWorkspace.team.map((member) => ({ ...member, detail: `${member.role} · ${member.lastLogin}` }))
  };
  const rows = new Map((defaults[view] || []).map((item) => [item.id, item]));
  for (const item of state.adminWorkspace.entities[view] || []) rows.set(item.id, item);
  return [...rows.values()].filter((item) => !item._deleted);
}

function genericEntityMarkup(view) {
  const rows = genericRowsFor(view);
  return `<section class="admin-generic-grid">${rows.map((item) => `<article><header><span>${adminSection(view).icon}</span><i class="${escapeHTML(item.status || "active")}">${escapeHTML(adminStatusLabel(item.status || "active"))}</i></header>
    <h3>${escapeHTML(item.name || item.id)}</h3><p>${escapeHTML(item.detail || item.contact || item.type || item.due || "")}</p>
    <footer>${item.amount != null ? `<b>${formatPrice(item.amount)}</b>` : item.fee != null ? `<b>${formatPrice(item.fee)}</b>` : item.budget != null ? `<b>${formatPrice(item.budget)}</b>` : `<b>${escapeHTML(item.id || "")}</b>`}
      <span class="admin-table-actions"><button data-action="admin-edit-entity" data-view="${view}" data-id="${escapeHTML(item.id || "")}">${state.lang === "ar" ? "تعديل" : "Edit"}</button><button class="danger" data-action="admin-delete-entity" data-view="${view}" data-id="${escapeHTML(item.id || "")}">${state.lang === "ar" ? "حذف" : "Delete"}</button></span></footer></article>`).join("")}
    <button class="admin-add-entity-card" data-action="admin-create-entity" data-view="${view}"><span>＋</span><b>${state.lang === "ar" ? "إضافة سجل جديد" : "Add new record"}</b><small>${state.lang === "ar" ? "يحفظ محليًا وجاهز للربط مع API" : "Saved locally and API-ready"}</small></button></section>`;
}

function bannerHeroSliderMarkup() {
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const slides = settings.homeMedia.filter((item) => item.placement === "hero");
  const cards = slides.map((item) => `<article class="banner-slider-card">
    <img src="${escapeHTML(item.url)}" alt="${escapeHTML(item.altAr || item.name || "صورة بنر")}"/>
    <div class="banner-slider-card-head"><span><b>${escapeHTML(item.name || "صورة بنر")}</b><small>${item.active !== false ? "ظاهرة في المتجر" : "مخفية"}</small></span><div><button type="button" data-action="edit-home-slide" data-id="${escapeHTML(item.id)}" aria-label="تعديل الشريحة">✎</button><button type="button" data-action="delete-home-media" data-id="${escapeHTML(item.id)}" aria-label="حذف الصورة">×</button></div></div>
    <div class="banner-slider-fields">
      <label>اسم الصورة<input data-home-media-field="name" data-id="${escapeHTML(item.id)}" value="${escapeHTML(item.name || "")}"/></label>
      <label>الترتيب<input type="number" min="1" max="99" data-home-media-field="sortOrder" data-id="${escapeHTML(item.id)}" value="${Number(item.sortOrder || 1)}"/></label>
      <label>المنتج المرتبط<select data-home-media-field="productId" data-id="${escapeHTML(item.id)}">${homeHeroProductOptions(item.productId || "")}</select></label>
      <label>رابط هدف مخصص<input dir="ltr" data-home-media-field="href" data-id="${escapeHTML(item.id)}" value="${escapeHTML(item.href || "#new-arrivals")}"/></label>
      <label>ملء الصورة<select data-home-media-field="sizeMode" data-id="${escapeHTML(item.id)}"><option value="default"${!item.sizeMode || item.sizeMode === "default" ? " selected" : ""}>تلقائي</option><option value="cover"${item.sizeMode === "cover" ? " selected" : ""}>تغطية كاملة</option><option value="contain"${item.sizeMode === "contain" ? " selected" : ""}>الصورة كاملة</option></select></label>
      <label class="banner-slider-active"><span>عرض الصورة</span><input type="checkbox" data-home-media-field="active" data-id="${escapeHTML(item.id)}"${item.active !== false ? " checked" : ""}/></label>
    </div>
  </article>`).join("");
  return `<form id="admin-banner-slider-settings" class="banner-slider-admin">
    <header><div><span>▧</span><div><h3>سلايدر البنر الرئيسي</h3><p>صور فقط دون نص؛ الضغط على الصورة يفتح المنتج أو الرابط المحدد.</p></div></div><b>${slides.filter((item) => item.active !== false).length} صور نشطة</b></header>
    <div class="banner-slider-controls">
      <label>زمن التبديل بالثواني<input name="heroIntervalSeconds" type="number" min="1" max="30" step="0.5" value="${Number(settings.homeHero.intervalSeconds || 3)}"/></label>
      <label class="banner-slider-upload">إضافة صور جديدة<input name="mediaFile" type="file" multiple accept="image/png,image/jpeg,image/webp,image/avif"/></label>
      <label>المنتج الافتراضي للصور الجديدة<select name="mediaProductId">${homeHeroProductOptions("")}</select></label>
      <label>رابط هدف افتراضي<input name="mediaHref" dir="ltr" value="#new-arrivals"/></label>
      <button class="button burgundy-button" type="submit">حفظ السلايدر</button>
    </div>
    <output class="banner-upload-status" id="banner-upload-status" aria-live="polite"></output>
    <div class="banner-slider-library">${cards || `<div class="banner-slider-empty"><span><b>لا توجد صور في السلايدر</b><small>اختر صورة واحدة أو عدة صور ثم اضغط «حفظ السلايدر».</small></span></div>`}</div>
  </form>`;
}

function bannersViewMarkup() {
  const banners = state.adminWorkspace.banners || defaultAdminWorkspace.banners;
  const active = banners.filter((item) => item.status === "active").length;
  const expired = banners.filter((item) => item.status === "expired").length;
  const scheduled = banners.filter((item) => item.status === "scheduled").length;
  const clicks = banners.reduce((sum, item) => sum + Number(item.clicks || 0), 0);
  return `<section class="banner-manager" dir="rtl">
    <div class="banner-kpis">
      <article><span class="blue">⌁</span><div><small>إجمالي النقرات</small><b>${clicks.toLocaleString("en-US")}</b><em>نقرة</em></div></article>
      <article><span class="violet">▣</span><div><small>مجدولة</small><b>${scheduled || 3}</b><em>بنرات</em></div></article>
      <article><span class="amber">◷</span><div><small>منتهية</small><b>${expired || 5}</b><em>بنرات</em></div></article>
      <article><span class="green">✓</span><div><small>نشطة الآن</small><b>${active || 16}</b><em>بنر</em></div></article>
      <article><span class="red">▧</span><div><small>إجمالي البنرات</small><b>${Math.max(24, banners.length)}</b><em>بنر</em></div></article>
    </div>
    ${bannerHeroSliderMarkup()}
    <div class="banner-table-card">
      <div class="banner-filters">
        <label class="banner-search">⌕<input id="banner-search" type="search" placeholder="ابحث عن بنر..." /></label>
        <label><span>النوع</span><select id="banner-type-filter"><option value="">الكل</option><option value="image">صورة</option><option value="video">فيديو</option></select></label>
        <label><span>الموقع/الصفحة</span><select id="banner-place-filter"><option value="">الكل</option><option>الصفحة الرئيسية</option><option>صفحة العطور</option><option>صفحة العناية بالبشرة</option><option>سلة التسوق</option></select></label>
        <label><span>الفترة</span><button type="button">▣ &nbsp; من &nbsp; - &nbsp; إلى</button></label>
        <button class="banner-more-filter" type="button">▽ &nbsp; فلتر أكثر</button>
      </div>
      <div class="banner-table-scroll"><table class="banner-table"><thead><tr><th>البنر</th><th>العنوان</th><th>الموقع/الصفحة</th><th>نوع البنر</th><th>فترة العرض</th><th>النقرات</th><th>الإجراءات</th></tr></thead>
      <tbody>${banners.map((item) => `<tr data-banner-row data-type="${item.type}" data-place="${escapeHTML(item.placement)}" data-search="${escapeHTML(`${item.title} ${item.subtitle}`)}">
        <td><div class="banner-preview ${item.tone}"><span>${item.title}</span><small>${item.subtitle}</small>${item.type === "video" ? `<i>▶</i>` : ""}</div></td>
        <td><b>${escapeHTML(item.title)}</b><small>${escapeHTML(item.subtitle)}</small></td>
        <td><b>${escapeHTML(item.placement)}</b><small>${escapeHTML(item.position)}</small></td>
        <td><span class="banner-type ${item.type}">${item.type === "video" ? "فيديو" : "صورة"}</span></td>
        <td><span class="banner-dates">${escapeHTML(item.start)}<i>إلى</i>${escapeHTML(item.end)}</span></td>
        <td>${Number(item.clicks || 0).toLocaleString("en-US")}</td>
        <td><div class="banner-row-actions"><label class="banner-switch"><input type="checkbox" data-action="toggle-banner" data-id="${item.id}" ${item.status === "active" ? "checked" : ""}/><i></i></label><button data-action="edit-banner" data-id="${item.id}">✎</button><button data-action="banner-stats" data-id="${item.id}">▥</button><button>•••</button></div></td>
      </tr>`).join("")}</tbody></table></div>
      <footer class="banner-pagination"><span>عرض 1 إلى ${banners.length} من 24 بنر</span><div><button>السابق</button><button class="active">1</button><button>2</button><button>3</button><button>…</button><button>التالي</button></div><label>عرض <select><option>10</option><option>20</option></select></label></footer>
    </div>
  </section>`;
}

function initializeBannerManager() {
  const root = $(".banner-manager");
  if (!root) return;
  const applyFilters = () => {
    const query = String($("#banner-search")?.value || "").trim().toLocaleLowerCase("ar");
    const type = $("#banner-type-filter")?.value || "";
    const place = $("#banner-place-filter")?.value || "";
    $$('[data-banner-row]', root).forEach((row) => {
      const matches = (!query || row.dataset.search.toLocaleLowerCase("ar").includes(query))
        && (!type || row.dataset.type === type) && (!place || row.dataset.place === place);
      row.hidden = !matches;
    });
  };
  $("#banner-search")?.addEventListener("input", applyFilters);
  $("#banner-type-filter")?.addEventListener("change", applyFilters);
  $("#banner-place-filter")?.addEventListener("change", applyFilters);
}

function couponsViewMarkup() {
  const coupons = state.adminWorkspace.coupons || defaultAdminWorkspace.coupons;
  const active = coupons.filter((item) => item.status === "active").length;
  const categories = ["كل الكوبونات", "عطور", "العناية الشخصية", "البخور والعطور المنزلية", "الشحن", "أخرى"];
  const statusLabel = { active: "نشط", ending: "ينتهي قريباً", expired: "منتهي", inactive: "غير نشط", scheduled: "مجدول" };
  const kindLabel = { percent: "نسبة مئوية", fixed: "قيمة ثابتة", shipping: "شحن مجاني" };
  return `<section class="coupon-manager" dir="rtl">
    <div class="coupon-kpis">
      <article><span class="money">▱</span><div><small>إجمالي الخصم المقدم</small><b>245,680</b><em>EGP</em></div></article>
      <article><span class="calendar">▣</span><div><small>تنتهي قريباً</small><b>11</b><em>كوبون</em></div></article>
      <article><span class="ticket">▭</span><div><small>كوبونات نشطة</small><b>${Math.max(58, active)}</b><em>كوبون</em></div></article>
      <article><span class="percent">%</span><div><small>إجمالي الكوبونات</small><b>136</b><em>كوبون</em></div></article>
    </div>
    <div class="coupon-layout"><div class="coupon-table-card">
      <div class="coupon-filters"><label class="coupon-search">⌕<input id="coupon-search" type="search" placeholder="ابحث عن كوبون..." /></label><button>☷ فلتر أكثر</button><label><span>تاريخ الإنشاء</span><button>▣ &nbsp; من &nbsp; - &nbsp; إلى</button></label><label><span>طريقة الخصم</span><select id="coupon-kind-filter"><option value="">الكل</option><option value="percent">نسبة مئوية</option><option value="fixed">قيمة ثابتة</option><option value="shipping">شحن مجاني</option></select></label><label><span>نوع الخصم</span><select><option>الكل</option></select></label><label><span>حالة الكوبون</span><select id="coupon-status-filter"><option value="">الكل</option><option value="active">نشط</option><option value="ending">ينتهي قريباً</option><option value="expired">منتهي</option><option value="inactive">غير نشط</option></select></label></div>
      <div class="coupon-table-scroll"><table class="coupon-table"><thead><tr><th>الكود</th><th>اسم الكوبون</th><th>نوع الخصم</th><th>قيمة الخصم</th><th>قيمة الخصم</th><th>الحد الأدنى للطلب</th><th>الحالة</th><th>تاريخ الإنشاء</th><th>الإجراءات</th></tr></thead><tbody>${coupons.map((item) => `<tr data-coupon-row data-kind="${item.kind}" data-status="${item.status}" data-search="${escapeHTML(`${item.id} ${item.name}`)}"><td><code>${item.id}</code></td><td><b>${escapeHTML(item.name)}</b></td><td><span class="coupon-kind ${item.kind}">${kindLabel[item.kind]}</span></td><td><b>${item.value}</b></td><td>${item.saved}</td><td>${item.uses} / ${item.limit}</td><td><span class="coupon-status ${item.status}">● ${statusLabel[item.status]}</span></td><td>${item.created}</td><td><div class="coupon-actions"><button>▥</button><button data-action="copy-coupon" data-code="${item.id}">▣</button><button data-action="edit-coupon" data-id="${item.id}">✎</button><button>•••</button></div></td></tr>`).join("")}</tbody></table></div>
      <footer class="banner-pagination"><span>عرض 1 إلى ${coupons.length} من 136 كوبون</span><div><button>السابق</button><button class="active">1</button><button>2</button><button>3</button><button>…</button><button>17</button><button>التالي</button></div><label>عرض <select><option>8</option></select></label></footer>
    </div><aside class="coupon-sidebar"><article><h3>تصنيفات الكوبونات</h3>${categories.map((category, index) => `<button class="${index === 0 ? "active" : ""}"><span>${category}</span><b>${[136,62,28,18,12,16][index]}</b></button>`).join("")}</article><article class="coupon-insights"><h3>معلومات سريعة</h3><p><i>♨</i><span>أعلى استخدام<b>ORIGO15 (128 مرة)</b></span></p><p><i>◆</i><span>أكبر خصم<b>100 EGP (BIG100)</b></span></p><p><i>▱</i><span>أكثر الكوبونات توفيراً<b>شحن مجاني (FREESHIP)</b></span></p><p><i>▣</i><span>ينتهي خلال 7 أيام<b>4 كوبونات</b></span></p></article></aside></div>
  </section>`;
}

function initializeCouponManager() {
  const root = $(".coupon-manager"); if (!root) return;
  const filter = () => { const query = String($("#coupon-search")?.value || "").toLowerCase(); const kind = $("#coupon-kind-filter")?.value || ""; const status = $("#coupon-status-filter")?.value || ""; $$('[data-coupon-row]', root).forEach((row) => row.hidden = !((!query || row.dataset.search.toLowerCase().includes(query)) && (!kind || row.dataset.kind === kind) && (!status || row.dataset.status === status))); };
  $("#coupon-search")?.addEventListener("input", filter); $("#coupon-kind-filter")?.addEventListener("change", filter); $("#coupon-status-filter")?.addEventListener("change", filter);
}

function accountingMarkup() {
  const sales = state.adminOrders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + Number(order.total || 0), 0);
  const cost = state.adminOrders.reduce((sum, order) => sum + (order.items || []).reduce((itemSum, item) => {
    const product = getProduct(item.productId);
    return itemSum + inventoryForProduct(product || { id: "", price: item.unitPrice }).cost * Number(item.quantity || 0);
  }, 0), 0);
  const ads = Number(state.adminWorkspace.analytics.adSpend || 0);
  const net = sales - cost - ads;
  return `<section class="admin-finance-hero">
    ${adminMetric("↗", state.lang === "ar" ? "الإيرادات" : "Revenue", formatPrice(sales), "")}
    ${adminMetric("⇣", state.lang === "ar" ? "تكلفة البضاعة" : "Cost of goods", formatPrice(cost), "")}
    ${adminMetric("◎", state.lang === "ar" ? "تكلفة الإعلانات" : "Ad spend", formatPrice(ads), "")}
    ${adminMetric("◆", state.lang === "ar" ? "صافي الربح التقديري" : "Estimated net", formatPrice(net), net >= 0 ? "" : (state.lang === "ar" ? "بانتظار مبيعات فعلية" : "Awaiting live sales"), net < 0 ? "warning" : "burgundy")}
    </section><div class="admin-integration-note"><span>i</span><div><b>${state.lang === "ar" ? "ملخص مالي من الطلبات المحفوظة" : "Financial summary from stored orders"}</b>
    <p>${state.lang === "ar" ? "تُحسب الإيرادات والتكلفة والإنفاق الإعلاني من بيانات المتجر الحالية، وتتحدث عند حفظ أي عملية." : "Revenue, cost, and ad spend use the store's current saved data and update after every saved operation."}</p></div></div>`;
}

function reportsMarkup() {
  const reports = [
    ["sales", "تقرير المبيعات", "Sales report"], ["orders", "تقرير الطلبات", "Orders report"],
    ["products", "تقرير المنتجات", "Products report"], ["customers", "تقرير العملاء", "Customers report"],
    ["inventory", "تقرير المخزون", "Inventory report"], ["campaigns", "تقرير الإعلانات", "Campaign report"],
    ["shipping", "تقرير الشحن", "Shipping report"], ["returns", "تقرير المرتجعات", "Returns report"]
  ];
  return `<section class="admin-report-grid">${reports.map(([id, ar, en]) => `<article><span>▥</span><div><b>${state.lang === "ar" ? ar : en}</b><small>CSV · Excel · PDF</small></div>
    <span class="admin-table-actions"><button data-action="admin-export" data-report="${id}" data-format="csv">CSV</button><button data-action="admin-export" data-report="${id}" data-format="xls">XLS</button><button data-action="admin-export" data-report="${id}" data-format="pdf">PDF</button></span></article>`).join("")}</section>`;
}

function settingsMarkup() {
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const providers = [
    ["paymob", "Paymob", "PAYMOB_SECRET_KEY · PAYMOB_PUBLIC_KEY · PAYMOB_INTEGRATION_IDS"],
    ["bosta", "Bosta", "BOSTA_API_KEY"],
    ["whatsapp", "WhatsApp Cloud", "WHATSAPP_ACCESS_TOKEN · WHATSAPP_PHONE_NUMBER_ID · WHATSAPP_VERIFY_TOKEN"],
    ["metaAds", "Facebook + Instagram", "META_PIXEL_ID · META_CAPI_ACCESS_TOKEN"],
    ["snapchatAds", "Snapchat", "SNAP_PIXEL_ID · SNAP_CAPI_ACCESS_TOKEN"],
    ["tiktokAds", "TikTok", "TIKTOK_PIXEL_ID · TIKTOK_ACCESS_TOKEN"],
    ["googleAds", "YouTube + Google Ads", "GOOGLE_ADS_* · GOOGLE_OAUTH_*"]
  ];
  const ar = state.lang === "ar";
  const appearance = settings.appearance;
  const appearanceRange = (name, labelAr, labelEn, min, max, step, value, suffix = "") => `<label class="appearance-range"><span>${ar ? labelAr : labelEn}<output data-appearance-output="${name}">${escapeHTML(String(value))}${suffix}</output></span><input type="range" name="appearance.${name}" min="${min}" max="${max}" step="${step}" value="${value}"/></label>`;
  const logoFields = [["light", "الشعار الفاتح", "Light logo"], ["dark", "الشعار الداكن", "Dark logo"], ["icon", "أيقونة الشعار", "Logo icon"]];
  const socialNames = [["youtube", "YouTube"], ["facebook", "Facebook"], ["tiktok", "TikTok"], ["instagram", "Instagram"], ["snapchat", "Snapchat"], ["telegram", "Telegram"], ["whatsapp", "WhatsApp"]];
  const finderTranslate = (key) => window.ORIGOFragranceFinderI18n?.translate?.(state.lang, key) || key;
  const finderGroups = [
    ["forWhom", "step.forWhom", "forWhom"], ["feelings", "step.feeling", "feeling"],
    ["families", "step.families", "family"], ["personalities", "step.personality", "personality"],
    ["usage", "usage.section", "usage"], ["seasons", "season.section", "season"],
    ["times", "time.section", "time"], ["features", "step.features", "feature"],
    ["budgets", "step.budget", "budget"], ["notes", "step.notes", "note"]
  ];
  const finderSettingsMarkup = finderGroups.map(([group, titleKey, prefix]) => {
    const options = defaultStoreSettings.fragranceFinder.enabled[group] || [];
    const enabled = new Set(settings.fragranceFinder?.enabled?.[group] || options);
    return `<fieldset class="finder-admin-group"><legend>${escapeHTML(finderTranslate(titleKey))}</legend><div>${options.map((id) => `<label><input type="checkbox" name="finder.${group}.${id}"${enabled.has(id) ? " checked" : ""}/><span>${escapeHTML(finderTranslate(`${prefix}.${id}`))}</span></label>`).join("")}</div></fieldset>`;
  }).join("");
  const benefitMarkup = settings.footerBenefits.map((benefit) => {
    const prefix = `benefit.${benefit.id}`;
    const faqsAr = (benefit.faqs || []).map((item) => `${item.qAr || ""}|${item.aAr || ""}`).join("\n");
    const faqsEn = (benefit.faqs || []).map((item) => `${item.qEn || ""}|${item.aEn || ""}`).join("\n");
    return `<article class="benefit-admin-card"><header><b>${escapeHTML(ar ? benefit.titleAr : benefit.titleEn)}</b><label><input type="checkbox" name="${prefix}.active"${benefit.active !== false ? " checked" : ""}/> ${ar ? "مفعلة" : "Active"}</label></header>
      <input type="hidden" name="${prefix}.id" value="${escapeHTML(benefit.id)}"/><input type="hidden" name="${prefix}.slug" value="${escapeHTML(benefit.slug)}"/>
      <div class="review-grid"><label>${ar ? "العنوان العربي" : "Arabic title"}<input name="${prefix}.titleAr" value="${escapeHTML(benefit.titleAr)}"/></label><label>${ar ? "العنوان الإنجليزي" : "English title"}<input name="${prefix}.titleEn" value="${escapeHTML(benefit.titleEn)}"/></label></div>
      <div class="review-grid"><label>${ar ? "الوصف القصير" : "Arabic short copy"}<input name="${prefix}.shortAr" value="${escapeHTML(benefit.shortAr)}"/></label><label>${ar ? "الوصف القصير EN" : "English short copy"}<input name="${prefix}.shortEn" value="${escapeHTML(benefit.shortEn)}"/></label></div>
      <label>${ar ? "تفاصيل الميزة بالعربية" : "Arabic detail"}<textarea name="${prefix}.descriptionAr">${escapeHTML(benefit.descriptionAr)}</textarea></label><label>${ar ? "تفاصيل الميزة بالإنجليزية" : "English detail"}<textarea name="${prefix}.descriptionEn">${escapeHTML(benefit.descriptionEn)}</textarea></label>
      <div class="review-grid"><label>${ar ? "خطوات العربية — سطر لكل خطوة" : "Arabic steps — one per line"}<textarea name="${prefix}.stepsAr">${escapeHTML((benefit.stepsAr || []).join("\n"))}</textarea></label><label>${ar ? "الخطوات الإنجليزية" : "English steps"}<textarea name="${prefix}.stepsEn">${escapeHTML((benefit.stepsEn || []).join("\n"))}</textarea></label></div>
      <div class="review-grid"><label>${ar ? "شروط العربية — سطر لكل شرط" : "Arabic conditions"}<textarea name="${prefix}.conditionsAr">${escapeHTML((benefit.conditionsAr || []).join("\n"))}</textarea></label><label>${ar ? "الشروط الإنجليزية" : "English conditions"}<textarea name="${prefix}.conditionsEn">${escapeHTML((benefit.conditionsEn || []).join("\n"))}</textarea></label></div>
      <div class="review-grid"><label>${ar ? "الأسئلة العربية: سؤال|إجابة" : "Arabic FAQ: Question|Answer"}<textarea name="${prefix}.faqsAr">${escapeHTML(faqsAr)}</textarea></label><label>${ar ? "الأسئلة الإنجليزية: Question|Answer" : "English FAQ: Question|Answer"}<textarea name="${prefix}.faqsEn">${escapeHTML(faqsEn)}</textarea></label></div>
      <div class="review-grid"><label>${ar ? "الرسم" : "Illustration"}<select name="${prefix}.icon">${selectOptions([["support",ar?"خدمة/شحن":"Support"],["returns",ar?"استرجاع":"Returns"],["gift",ar?"هدية":"Gift"],["samples",ar?"عينة عطر":"Sample"]], benefit.icon)}</select></label><label>${ar ? "الترتيب" : "Order"}<input type="number" min="1" max="20" name="${prefix}.sort" value="${Number(benefit.sort || 1)}"/></label></div>
      <label class="benefit-icon-upload"><span>${ar ? "صورة/أيقونة مخصصة" : "Custom image/icon"}</span><img id="benefit-icon-preview-${escapeHTML(benefit.id)}" src="${escapeHTML(benefit.image || "assets/origo-icon.svg")}" alt=""/><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-benefit-icon-upload="${escapeHTML(benefit.id)}"/><small>${ar ? "PNG أو JPG أو WEBP أو SVG — بحد أقصى 350KB" : "PNG, JPG, WEBP or SVG — max 350KB"}</small></label>
      <div class="review-grid"><label>${ar ? "لون أساسي" : "Primary color"}<input type="color" name="${prefix}.color0" value="${escapeHTML(benefit.colors?.[0] || "#7b0a20")}"/></label><label>${ar ? "لون ثانوي" : "Secondary color"}<input type="color" name="${prefix}.color1" value="${escapeHTML(benefit.colors?.[1] || "#77b8ff")}"/></label><label>${ar ? "لون إبراز" : "Accent color"}<input type="color" name="${prefix}.color2" value="${escapeHTML(benefit.colors?.[2] || "#f2b844")}"/></label></div>
      <div class="review-grid"><label>${ar ? "زر الإجراء AR" : "Arabic CTA"}<input name="${prefix}.ctaLabelAr" value="${escapeHTML(benefit.ctaLabelAr)}"/></label><label>${ar ? "زر الإجراء EN" : "English CTA"}<input name="${prefix}.ctaLabelEn" value="${escapeHTML(benefit.ctaLabelEn)}"/></label><label>${ar ? "رابط الإجراء" : "CTA URL"}<input name="${prefix}.ctaUrl" value="${escapeHTML(benefit.ctaUrl)}" dir="ltr"/></label></div>
    </article>`;
  }).join("");
  const categoryIconMarkup = [...ORIGO_HOME_CATEGORIES, ["offers", "العروض", "Offers", "٪"]].map(([key, arName, enName, fallback]) => `<label class="store-icon-upload"><span>${escapeHTML(ar ? arName : enName)}</span><span class="store-icon-preview" id="category-icon-preview-${key}">${settings.categoryIcons[key] ? `<img src="${escapeHTML(settings.categoryIcons[key])}" alt=""/>` : fallback}</span><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-category-icon-upload="${key}"/></label>`).join("");
  const homeBenefitIconMarkup = ORIGO_HOME_BENEFITS.map(([key, arName, enName]) => `<label class="store-icon-upload"><span>${escapeHTML(ar ? arName : enName)}</span><span class="store-icon-preview" id="home-benefit-icon-preview-${key}">${settings.homeBenefitIcons[key] ? `<img src="${escapeHTML(settings.homeBenefitIcons[key])}" alt=""/>` : "◇"}</span><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-home-benefit-icon-upload="${key}"/></label>`).join("");
  return `<form class="admin-settings-form" id="admin-settings-form"><section><div class="review-section-head"><span>01</span><div><b>${ar ? "هوية المتجر والشعار المركزي" : "Store identity & central logo"}</b><small>${ar ? "يتغير الشعار في الهيدر والقائمة والفوتر من هنا." : "One source updates header, menu, and footer."}</small></div></div>
    <div class="review-grid"><label>${ar ? "اسم المتجر" : "Store name"}<input name="storeName" value="${escapeHTML(settings.storeName)}" /></label>
    <label>${ar ? "العملة" : "Currency"}<select name="currency">${selectOptions([["EGP","EGP"],["USD","USD"],["SAR","SAR"]], settings.currency)}</select></label>
    <label>${ar ? "الضريبة %" : "Tax rate %"}<input name="taxRate" type="number" min="0" max="100" value="${settings.taxRate}" /></label></div>
    <div class="store-logo-settings">${logoFields.map(([key, arLabel, enLabel]) => `<label class="store-logo-field"><span>${ar ? arLabel : enLabel}</span><img id="store-logo-preview-${key}" src="${escapeHTML(settings.logos[key])}" alt=""/><input name="logo${key[0].toUpperCase()}${key.slice(1)}" value="${escapeHTML(settings.logos[key])}" dir="ltr"/><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-logo-upload="${key}"/></label>`).join("")}</div></section>
    <section class="appearance-settings"><input type="hidden" name="appearance.layoutTuningVersion" value="2"/><div class="review-section-head"><span>02</span><div><b>${ar ? "مظهر المتجر العام" : "Global store appearance"}</b><small>${ar ? "تحكم مركزي في الخطوط والصور والأيقونات والبطاقات مع معاينة فورية." : "Central control for typography, images, icons, and cards with live preview."}</small></div></div>
      <div class="appearance-balance-studio">
        <label class="appearance-master-switch"><input type="checkbox" name="appearance.balancedLayoutEnabled" ${appearance.balancedLayoutEnabled !== false ? "checked" : ""}/><span class="appearance-switch-track" aria-hidden="true"><i></i></span><span><b>${ar ? "التوازن الذكي للمساحات والنصوص" : "Smart spacing and text balance"}</b><small>${ar ? "يضبط المسافات والمربعات والصور تلقائيًا، ويضمن نصوصًا واضحة في المتجر ولوحة التحكم." : "Automatically balances spacing, cards, and images while keeping storefront and admin text readable."}</small></span></label>
        <figure class="appearance-layout-preview" aria-label="${ar ? "صورة معاينة للشكل" : "Layout appearance preview"}">
          <figcaption><b>${ar ? "صورة معاينة الشكل" : "Layout preview"}</b><small>${ar ? "تتغير مباشرة مع المفتاح" : "Updates instantly with the switch"}</small></figcaption>
          <div class="layout-preview-window"><div class="layout-preview-bar"><i></i><i></i><i></i><span>ORIGO</span></div><div class="layout-preview-scenes"><section><strong>${ar ? "المتجر" : "Store"}</strong><div class="layout-preview-shop"><i></i><i></i><i></i></div><p><span></span><span></span></p></section><section><strong>${ar ? "لوحة التحكم" : "Admin"}</strong><div class="layout-preview-admin"><aside><i></i><i></i><i></i></aside><main><b></b><p></p><div><i></i><i></i></div></main></div></section></div></div>
        </figure>
      </div>
      <div class="appearance-settings-grid">
        <label>${ar ? "شكل خط النصوص" : "Body font style"}<select name="appearance.bodyFont">${selectOptions([["elegant",ar?"أنيق":"Elegant"],["modern",ar?"عصري":"Modern"],["classic",ar?"كلاسيكي":"Classic"],["system",ar?"خط النظام":"System"]], appearance.bodyFont)}</select></label>
        <label>${ar ? "شكل خط العناوين" : "Heading font style"}<select name="appearance.headingFont">${selectOptions([["classic",ar?"كلاسيكي فاخر":"Luxury classic"],["elegant",ar?"عربي أنيق":"Elegant Arabic"],["modern",ar?"عصري":"Modern"],["system",ar?"خط النظام":"System"]], appearance.headingFont)}</select></label>
        <label>${ar ? "ملاءمة الصور" : "Image fit"}<select name="appearance.imageFit">${selectOptions([["contain",ar?"إظهار الصورة كاملة":"Show full image"],["cover",ar?"ملء الإطار":"Fill frame"]], appearance.imageFit)}</select></label>
        <label>${ar ? "كثافة البطاقات" : "Card density"}<select name="appearance.density">${selectOptions([["compact",ar?"مضغوط":"Compact"],["comfortable",ar?"مريح":"Comfortable"],["spacious",ar?"واسع":"Spacious"]], appearance.density)}</select></label>
        <label>${ar ? "ظل البطاقات" : "Card shadow"}<select name="appearance.cardShadow">${selectOptions([["none",ar?"بدون":"None"],["soft",ar?"ناعم":"Soft"],["strong",ar?"بارز":"Strong"]], appearance.cardShadow)}</select></label>
        ${appearanceRange("baseFontSize","حجم الخط الأساسي","Base font size",15,22,1,appearance.baseFontSize,"px")}
        ${appearanceRange("bodyFontWeight","سماكة الخط","Font weight",400,800,100,appearance.bodyFontWeight)}
        ${appearanceRange("headingScale","حجم العناوين","Heading scale",.85,1.35,.05,appearance.headingScale,"×")}
        ${appearanceRange("iconScale","حجم الأيقونات","Icon scale",.75,1.35,.05,appearance.iconScale,"×")}
        ${appearanceRange("imageScale","حجم الصور","Image scale",.8,1.25,.05,appearance.imageScale,"×")}
        ${appearanceRange("imageRadius","استدارة الصور","Image corners",0,36,1,appearance.imageRadius,"px")}
        ${appearanceRange("cardRadius","استدارة البطاقات","Card corners",0,36,1,appearance.cardRadius,"px")}
        ${appearanceRange("cardBorderWidth","سماكة حدود البطاقات","Card border",0,3,1,appearance.cardBorderWidth,"px")}
        ${appearanceRange("headerHeight","ارتفاع الهيدر","Header height",84,140,2,appearance.headerHeight,"px")}
        ${appearanceRange("headerIconScale","حجم أيقونات الهيدر","Header icon scale",.8,1.4,.05,appearance.headerIconScale,"×")}
        ${appearanceRange("contentMaxWidth","عرض محتوى المتجر","Store content width",1180,1760,20,appearance.contentMaxWidth,"px")}
        ${appearanceRange("sectionGap","المسافة بين الأقسام","Section spacing",8,40,2,appearance.sectionGap,"px")}
        ${appearanceRange("productCardHeight","ارتفاع بطاقة المنتج","Product card height",420,680,10,appearance.productCardHeight,"px")}
        ${appearanceRange("adminScale","حجم نصوص لوحة التحكم","Admin text scale",1,1.35,.05,appearance.adminScale,"×")}
        <label>${ar ? "شكل أزرار الهيدر" : "Header icon shape"}<select name="appearance.headerIconShape">${selectOptions([["round",ar?"دائري":"Round"],["soft",ar?"مربع ناعم":"Soft square"],["square",ar?"مربع":"Square"]], appearance.headerIconShape)}</select></label>
        <label>${ar ? "ترتيب أدوات الهيدر" : "Header tools order"}<select name="appearance.headerActionsOrder">${selectOptions([["commerce-first",ar?"السلة والمفضلة أولًا":"Cart and wishlist first"],["preferences-first",ar?"اللغة والمظهر أولًا":"Language and theme first"]], appearance.headerActionsOrder)}</select></label>
        <label>${ar ? "لون الهيدر الفاتح" : "Light header color"}<input type="color" name="appearance.lightHeaderColor" value="${escapeHTML(appearance.lightHeaderColor)}"/></label>
        <label>${ar ? "لون الهيدر الداكن" : "Dark header color"}<input type="color" name="appearance.darkHeaderColor" value="${escapeHTML(appearance.darkHeaderColor)}"/></label>
        <label>${ar ? "اللون النبيتي" : "Burgundy accent"}<input type="color" name="appearance.burgundyColor" value="${escapeHTML(appearance.burgundyColor)}"/></label>
        <label>${ar ? "اللون الذهبي" : "Gold accent"}<input type="color" name="appearance.goldColor" value="${escapeHTML(appearance.goldColor)}"/></label>
      </div>
      <div class="appearance-palette-editor">
        <fieldset><legend>${ar ? "ألوان الوضع الفاتح — أبيض نقي ونبيتي" : "Light mode — pure white & burgundy"}</legend><div class="appearance-color-grid">
          <label>${ar ? "خلفية المتجر" : "Store background"}<input type="color" name="appearance.lightPageColor" value="${escapeHTML(appearance.lightPageColor)}"/></label>
          <label>${ar ? "لون البطاقات" : "Card surface"}<input type="color" name="appearance.lightSurfaceColor" value="${escapeHTML(appearance.lightSurfaceColor)}"/></label>
          <label>${ar ? "لون النص" : "Text color"}<input type="color" name="appearance.lightTextColor" value="${escapeHTML(appearance.lightTextColor)}"/></label>
          <label>${ar ? "النص الثانوي" : "Muted text"}<input type="color" name="appearance.lightMutedColor" value="${escapeHTML(appearance.lightMutedColor)}"/></label>
          <label>${ar ? "النبيتي الفاتح" : "Light burgundy"}<input type="color" name="appearance.lightBurgundyColor" value="${escapeHTML(appearance.lightBurgundyColor)}"/></label>
        </div></fieldset>
        <fieldset><legend>${ar ? "ألوان الوضع الليلي — رمادي وأبيض ونبيتي" : "Dark mode — gray, white & burgundy"}</legend><div class="appearance-color-grid">
          <label>${ar ? "خلفية المتجر" : "Store background"}<input type="color" name="appearance.darkPageColor" value="${escapeHTML(appearance.darkPageColor)}"/></label>
          <label>${ar ? "لون البطاقات" : "Card surface"}<input type="color" name="appearance.darkSurfaceColor" value="${escapeHTML(appearance.darkSurfaceColor)}"/></label>
          <label>${ar ? "السطح المرتفع والحقول" : "Elevated surface & fields"}<input type="color" name="appearance.darkElevatedColor" value="${escapeHTML(appearance.darkElevatedColor)}"/></label>
          <label>${ar ? "لون النص الأبيض" : "Light text"}<input type="color" name="appearance.darkTextColor" value="${escapeHTML(appearance.darkTextColor)}"/></label>
          <label>${ar ? "النص الثانوي" : "Muted text"}<input type="color" name="appearance.darkMutedColor" value="${escapeHTML(appearance.darkMutedColor)}"/></label>
          <label>${ar ? "النبيتي الليلي" : "Dark burgundy"}<input type="color" name="appearance.darkBurgundyColor" value="${escapeHTML(appearance.darkBurgundyColor)}"/></label>
        </div></fieldset>
      </div>
      <div class="appearance-dual-preview" aria-live="polite"><article data-palette-preview="light"><span>✦</span><div><b>${ar ? "الوضع الفاتح" : "Light mode"}</b><p>${ar ? "أبيض نقي مع تفاصيل نبيتي." : "Pure white with burgundy details."}</p></div></article><article data-palette-preview="dark"><span>✦</span><div><b>${ar ? "الوضع الليلي" : "Dark mode"}</b><p>${ar ? "رمادي هادئ مع أبيض ولمسات نبيتي." : "Calm gray with white and burgundy accents."}</p></div></article></div>
      <div class="appearance-preview" aria-live="polite"><span>✦</span><div><h3>${ar ? "معاينة بطاقة ORIGO" : "ORIGO card preview"}</h3><p>${ar ? "تظهر تغييرات الخط والصورة والأيقونة والبطاقة فورًا قبل الحفظ." : "Font, image, icon, and card changes appear instantly before saving."}</p></div><img src="assets/origo-logo-icon.svg" alt=""/></div>
      <button type="button" class="secondary-button compact-button" data-action="reset-appearance">${ar ? "استعادة المظهر الافتراضي" : "Restore appearance defaults"}</button>
    </section>
    <section><div class="review-section-head"><span>02</span><div><b>${ar ? "محتوى الفوتر والتواصل" : "Footer content & contact"}</b></div></div><div class="footer-settings-grid">
      <label>${ar ? "وصف العربية" : "Arabic description"}<textarea name="footerDescriptionAr">${escapeHTML(settings.footerDescriptionAr)}</textarea></label><label>${ar ? "وصف الإنجليزية" : "English description"}<textarea name="footerDescriptionEn">${escapeHTML(settings.footerDescriptionEn)}</textarea></label>
      <label>${ar ? "صورة الفوتر" : "Footer image URL"}<input name="footerImage" value="${escapeHTML(settings.footerImage)}" dir="ltr"/></label><label>${ar ? "بريد الدعم" : "Support email"}<input name="supportEmail" type="email" value="${escapeHTML(settings.supportEmail)}" dir="ltr"/></label>
      <label>${ar ? "ساعات العمل بالعربية" : "Arabic support hours"}<textarea name="supportHoursAr">${escapeHTML(settings.supportHoursAr)}</textarea></label><label>${ar ? "ساعات العمل بالإنجليزية" : "English support hours"}<textarea name="supportHoursEn">${escapeHTML(settings.supportHoursEn)}</textarea></label>
      <label>${ar ? "عنوان النشرة AR" : "Newsletter title AR"}<input name="newsletterTitleAr" value="${escapeHTML(settings.newsletterTitleAr)}"/></label><label>${ar ? "عنوان النشرة EN" : "Newsletter title EN"}<input name="newsletterTitleEn" value="${escapeHTML(settings.newsletterTitleEn)}"/></label>
      <label>${ar ? "وصف النشرة AR" : "Newsletter copy AR"}<input name="newsletterCopyAr" value="${escapeHTML(settings.newsletterCopyAr)}"/></label><label>${ar ? "وصف النشرة EN" : "Newsletter copy EN"}<input name="newsletterCopyEn" value="${escapeHTML(settings.newsletterCopyEn)}"/></label>
      <label>Google Play URL<input name="googlePlayUrl" value="${escapeHTML(settings.appLinks.googlePlay)}" dir="ltr"/></label><label>App Store URL<input name="appStoreUrl" value="${escapeHTML(settings.appLinks.appStore)}" dir="ltr"/></label>
    </div></section>
    <section><div class="review-section-head"><span>03</span><div><b>${ar ? "روابط التواصل الاجتماعي" : "Social links"}</b><small>${ar ? "الرابط الفارغ يظهر كأيقونة معطلة بدون رابط وهمي." : "Empty URLs render as disabled icons."}</small></div></div><div class="social-settings-grid">${socialNames.map(([key,label]) => `<label>${label}<input name="social.${key}" value="${escapeHTML(settings.socialLinks[key])}" dir="ltr" placeholder="https://"/></label>`).join("")}</div></section>
    <section><div class="review-section-head"><span>04</span><div><b>${ar ? "أيقونات الصفحة الرئيسية" : "Homepage icons"}</b><small>${ar ? "ارفع أو استبدل أيقونات الأقسام والمزايا من ملفاتك." : "Upload or replace category and benefit icons."}</small></div></div><h4>${ar ? "الأقسام" : "Categories"}</h4><div class="store-icons-grid">${categoryIconMarkup}</div><h4>${ar ? "مزايا المتجر" : "Store benefits"}</h4><div class="store-icons-grid">${homeBenefitIconMarkup}</div></section>
    <section><div class="review-section-head"><span>05</span><div><b>${ar ? "مزايا الفوتر وصفحاتها" : "Footer benefits & detail pages"}</b><small>${ar ? "عدّل المحتوى والترتيب والرسم والألوان من مكان واحد." : "Edit content, order, illustration, and colors in one place."}</small></div></div><div class="benefits-settings-grid">${benefitMarkup}</div></section>
    <section><div class="review-section-head"><span>05</span><div><b>${ar ? "خيارات مكتشف العطر" : "Fragrance Finder options"}</b><small>${ar ? "فعّل الخيارات التي تظهر للعملاء. يجب إبقاء خيار واحد على الأقل في كل مجموعة." : "Control the options customers can select. Each group must retain at least one option."}</small></div></div>
    <div class="finder-admin-groups">${finderSettingsMarkup}</div><div class="admin-integration-note"><span>✓</span><div><b>${ar ? "الترجمات مكتملة" : "Translations complete"}</b><p>${ar ? "يتحقق فحص البناء من تطابق مفاتيح العربية والإنجليزية ويمنع النصوص الصلبة داخل واجهة مكتشف العطر." : "The build check verifies Arabic/English key parity and blocks hard-coded Finder UI copy."}</p></div></div></section>
    <section><div class="review-section-head"><span>06</span><div><b>${ar ? "الإشعارات والأمان" : "Notifications & security"}</b></div></div>
    <label class="admin-toggle-row"><span><b>${state.lang === "ar" ? "تنبيهات المخزون" : "Low-stock alerts"}</b><small>${state.lang === "ar" ? "تنبيه عند بلوغ الحد الأدنى" : "Notify at reorder threshold"}</small></span><input name="lowStockAlerts" type="checkbox"${settings.lowStockAlerts ? " checked" : ""} /></label>
    <label class="admin-toggle-row"><span><b>${state.lang === "ar" ? "إشعارات الطلبات" : "Order notifications"}</b><small>${state.lang === "ar" ? "إرسال تحديثات رحلة الطلب" : "Send order journey updates"}</small></span><input name="orderNotifications" type="checkbox"${settings.orderNotifications ? " checked" : ""} /></label>
    ${[["email", ar ? "استعادة عبر البريد" : "Email recovery"], ["whatsapp", ar ? "استعادة عبر واتساب" : "WhatsApp recovery"], ["sms", ar ? "استعادة عبر الرسائل النصية" : "SMS recovery"]].map(([id, label]) => `<label class="admin-toggle-row"><span><b>${label}</b><small>${ar ? "تظهر للعملاء فقط عند اكتمال إعداد مزود الخدمة" : "Available only when its provider is configured"}</small></span><input name="recovery.${id}" type="checkbox"${settings.passwordRecoveryChannels?.[id] !== false ? " checked" : ""}${state.integrationStatus[id]?.configured ? "" : " disabled"}/></label>`).join("")}</section>
    <section><div class="review-section-head"><span>07</span><div><b>${state.lang === "ar" ? "الاتصالات الخارجية" : "External integrations"}</b><small>${state.lang === "ar" ? "لا تظهر المفاتيح السرية في المتصفح." : "Secret keys are never exposed to the browser."}</small></div></div>
    <div class="admin-family-grid">${providers.map(([id, name, keys]) => {
      const ready = Boolean(state.integrationStatus[id]?.configured);
      return `<article style="--family-color:${ready ? "#247a55" : "#8f6d58"}"><span>${ready ? "✓" : "○"}</span><div><b>${name}</b><small>${ready ? (state.lang === "ar" ? "متصل وجاهز" : "Connected and ready") : keys}</small></div></article>`;
    }).join("")}</div></section>
    <button class="button burgundy-button" type="submit">${state.lang === "ar" ? "حفظ الإعدادات" : "Save settings"} ←</button></form>`;
}

function storeSettingsDashboardMarkup() {
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const toggle = (name, checked = true) => `<label class="store-setting-switch"><input name="${name}" type="checkbox"${checked ? " checked" : ""}/><i></i></label>`;
  return `<form id="store-basic-settings" class="store-settings-dashboard" dir="rtl">
    <div class="store-settings-tabs"><button class="active" type="button">⚙ إعدادات المتجر</button><button type="button" data-action="advanced-settings">الإضافات والتكاملات</button></div>
    <div class="store-settings-grid">
      <section class="store-settings-card store-info-card"><h3>ⓘ معلومات المتجر الأساسية</h3><div class="store-info-layout"><div class="store-logo-box"><span>الشعار</span><img src="${escapeHTML(settings.logos.dark)}" alt="ORIGO"/><button type="button" data-action="advanced-settings">تغيير الشعار</button></div><div class="store-info-fields"><label>اسم المتجر<input name="storeName" value="${escapeHTML(settings.storeName || "ORIGO")}"/></label><label>الوصف القصير<textarea name="shortDescription">متجر فاخر للعطور الأصلية ومنتجات العناية الشخصية</textarea></label><div><label>رقم الجوال<input name="phone" value="010 1234 5678" dir="ltr"/></label><label>البريد الإلكتروني<input name="supportEmail" value="${escapeHTML(settings.supportEmail || "info@origoscents.com")}" dir="ltr"/></label></div><div><label>العملة الأساسية<select name="currency"><option value="EGP"${settings.currency === "EGP" ? " selected" : ""}>الجنيه المصري</option><option value="USD">الدولار الأمريكي</option></select></label><label>اللغة الافتراضية<select name="defaultLanguage"><option>العربية</option><option>English</option></select></label></div><div><label>المنطقة الزمنية<select name="timezone"><option>القاهرة (GMT+2)</option></select></label></div></div></div><button class="store-save-button" type="submit">حفظ التغييرات</button></section>
      <div class="store-settings-stack"><section class="store-settings-card"><h3>▣ إعدادات الدفع</h3>${[["الدفع عند الاستلام","الدفع نقداً عند استلام الطلب","cod",true],["بطاقات الائتمان / الخصم","Visa, Mastercard, Meeza","cards",true],["فودافون كاش","الدفع عبر فودافون كاش","vodafone",true],["إنستاباي","الدفع عبر تطبيق إنستاباي","instapay",false]].map(([title,desc,name,on]) => `<div class="payment-setting"><span><b>${title}</b><small>${desc}</small></span><button type="button">إعداد</button>${toggle(`payment.${name}`,on)}</div>`).join("")}</section><section class="store-settings-card"><h3>▱ إعدادات الشحن والتوصيل</h3><div class="two-setting-fields"><label>شركة التوصيل<select><option>شركة واحدة - الشحن السريع</option></select></label><label>مدة التوصيل المتوقعة<select><option>2 - 5 أيام عمل</option></select></label><label>رسوم الشحن<input name="shippingFee" value="ثابتة"/></label><label>قيمة رسوم (EGP)<input name="shippingFeeValue" value="60"/></label></div><p class="store-success-note">ⓘ يتم حساب الرسوم بناءً على إجمالي الطلب والموقع</p></section></div>
      <div class="store-settings-stack"><section class="store-settings-card"><h3>◎ إعدادات اللغة والترجمة</h3><label>اللغات المتاحة</label><div class="language-checks"><label><input type="checkbox" checked/> العربية</label><label><input type="checkbox" checked/> English</label></div><label>اللغة الافتراضية<select><option>العربية</option><option>English</option></select></label><label>اتجاه النص</label><div class="direction-choice"><button class="active" type="button">من اليمين لليسار (RTL)</button><button type="button">من اليسار لليمين (LTR)</button></div><div class="translation-toggle"><span><b>تفعيل الترجمة اليدوية</b><small>سيمكنك ترجمة المحتوى يدوياً بدلاً من الترجمة التلقائية</small></span>${toggle("manualTranslation",true)}</div></section><section class="store-settings-card"><h3>% إعدادات الضرائب</h3><label>تفعيل الضرائب</label><div class="two-setting-fields"><label>نوع الضريبة<select><option>ضريبة القيمة المضافة (VAT)</option></select></label><label>نسبة الضريبة (%)<input name="taxRate" type="number" value="${Number(settings.taxRate || 14)}"/></label><label>تطبيق الضريبة على<select><option>جميع المنتجات</option></select></label></div></section></div>
      <section class="store-settings-card"><h3>▥ إعدادات SEO</h3><label>عنوان الموقع<input name="seoTitle" value="ORIGO - متجر العطور الأصلية ومنتجات العناية"/></label><label>الوصف التعريفي<textarea name="seoDescription">تسوق أفضل العطور الأصلية ومنتجات العناية الشخصية. أشهر الماركات العالمية، توصيل سريع وأسعار تنافسية.</textarea></label><label>الكلمات المفتاحية<input name="seoKeywords" value="عطور، perfumes، عطر رجالي، عطر نسائي، عطور أصلية"/></label><label>رابط الموقع (URL)<input name="siteUrl" value="https://origoscents.com" dir="ltr"/></label></section>
      <section class="store-settings-card"><h3>◉ إعدادات العملة</h3><label>العملة الأساسية<select name="currencyMirror"><option>EGP - الجنيه المصري</option></select></label><label>عرض الأسعار<select><option>مع العملة</option></select></label><label>تنسيق الأسعار<input value="1,250.00 EGP" readonly/></label><label>عدد الأرقام العشرية<select><option>2</option></select></label></section>
      <section class="store-settings-card"><h3>♢ إعدادات الإشعارات</h3>${[["إشعارات الطلبات الجديدة","newOrders"],["إشعارات الطلبات الملغاة","cancelledOrders"],["إشعارات العملاء الجدد","newCustomers"],["تذكيرات سلة التسوق المهجورة","abandonedCart"],["عروض وتحديثات المتجر","storeUpdates"]].map(([label,name]) => `<div class="notification-setting"><span>${label}</span>${toggle(`notify.${name}`,true)}</div>`).join("")}<label>إرسال الإشعارات عبر</label><div class="language-checks"><label><input name="orderNotifications" type="checkbox" checked/> البريد الإلكتروني</label><label><input type="checkbox" checked/> الجوال (SMS)</label></div></section>
      <section class="store-settings-card store-other-settings"><h3>☷ إعدادات المتجر الأخرى</h3>${["إعدادات التخزين المؤقت","مصادر الصور والملفات","سياسة الإرجاع والاستبدال","الشروط والأحكام","سياسة الخصوصية","إعدادات متقدمة"].map((label) => `<button type="button" data-action="advanced-settings"><span>${label}</span>‹</button>`).join("")}</section>
    </div><footer class="store-settings-footer">ORIGO SCENTS - © 2024 جميع الحقوق محفوظة</footer>
  </form>`;
}

function systemStatesMarkup() {
  const states = [
    ["loading","تحميل","يظهر أثناء جلب البيانات أو تنفيذ العملية","◌","جاري التحميل...","يرجى الانتظار لحظة"],
    ["empty","لا توجد نتائج","يظهر عندما لا يتم العثور على بيانات مطابقة","⌕","لا توجد نتائج","لم نتمكن من العثور على ما تبحث عنه"],
    ["error","خطأ","يظهر عند حدوث خطأ في النظام أو العملية","!","حدث خطأ ما","عذراً، حدث خطأ غير متوقع"],
    ["success","نجاح","يظهر عند اكتمال العملية بنجاح","✓","تم بنجاح","تم تنفيذ العملية بنجاح"],
    ["offline","انقطاع الاتصال","يظهر عند فقدان الاتصال بالإنترنت","⌁","لا يوجد اتصال بالإنترنت","يرجى التحقق من اتصالك بالإنترنت"]
  ];
  return `<section class="system-states-showcase" dir="rtl"><header><h2>حالات النظام</h2><p>تجربة واضحة ومريحة في جميع حالات التفاعل</p></header><div class="system-state-grid">${states.map(([type,title,desc,icon,headline,copy],index) => `<article><span class="state-number">0${index+1}</span><h3>${title}</h3><p>${desc}</p><div class="state-demo ${type}"><i>${icon}</i><b>${headline}</b><small>${copy}</small>${type === "loading" ? `<span class="state-spinner"></span>` : `<button type="button" data-action="state-demo" data-state="${type}">${type === "success" ? "عرض التفاصيل" : "إعادة المحاولة"}</button>`}</div><div class="state-uses"><b>أمثلة الاستخدام</b><ul>${["تحميل المنتجات","نتائج البحث","فشل تحميل البيانات","حفظ التغييرات","فقدان الاتصال بالشبكة"].slice(index,index+1).concat(["معالجة الطلب","تحديث البيانات","تنفيذ العمليات"]).map(x=>`<li>${x}</li>`).join("")}</ul></div><button class="state-toast-demo ${type}" type="button" data-action="state-demo" data-state="${type}">${type === "success" ? "تم حفظ التغييرات بنجاح" : type === "error" ? "حدث خطأ! يرجى المحاولة لاحقاً" : type === "offline" ? "أنت الآن في وضع عدم الاتصال" : "معاينة الحالة"}</button></article>`).join("")}</div><div class="modal-patterns"><h3>النوافذ المنبثقة</h3>${[["delete","تأكيد الحذف"],["coupon","تطبيق كوبون"],["stock","أخبرني عند التوفر"],["share","مشاركة المنتج"],["signout","تسجيل الخروج"]].map(([type,label],i)=>`<button type="button" data-action="open-system-modal" data-modal="${type}"><b>0${i+1}</b>${label}</button>`).join("")}</div></section>`;
}

function openSystemModal(type) {
  const content = {
    delete: ["!","هل أنت متأكد من حذف هذا العنصر؟","لن تتمكن من التراجع عن هذا الإجراء",`<div class="system-modal-product"><span>ORIGO</span><b>عطر أسد</b><small>EDP - 100ml</small></div><div class="system-modal-actions"><button data-action="close-system-modal">إلغاء</button><button class="primary" data-action="confirm-system-action">حذف</button></div>`],
    coupon: ["%","لديك كوبون خصم؟","أدخل كود الكوبون لتطبيق الخصم على طلبك",`<label class="system-modal-input">◇<input placeholder="أدخل كود الكوبون"/></label><button class="system-modal-main" data-action="apply-demo-coupon">تطبيق الكوبون</button><p class="coupon-applied">✓ تم تطبيق الكوبون بنجاح! <b>ORIGO15</b></p>`],
    stock: ["♟","أخبرني عند التوفر","سنعلمك عند توفر المنتج مرة أخرى",`<label class="system-modal-input">✉<input type="email" placeholder="البريد الإلكتروني"/></label><label class="system-modal-input">⌕<input placeholder="رقم الهاتف (اختياري)"/></label><button class="system-modal-main" data-action="confirm-system-action">إشعاري عند التوفر</button><small>لن نشارك بياناتك مع أي جهة خارجية</small>`],
    share: ["♧","مشاركة المنتج","شارك هذا المنتج مع أصدقائك",`<div class="share-modal-product"><div class="share-bottle">ORIGO</div><span><b>عطر أسد</b><small>EDP - 100ml</small></span></div><div class="share-buttons"><button>☘</button><button>f</button><button>𝕏</button><button>◎</button><button>↗</button></div><label class="system-modal-input"><input value="https://origoscents.com/product/asad" readonly/><button data-action="copy-share-link">نسخ الرابط</button></label>`],
    signout: ["↪","هل ترغب في تسجيل الخروج؟","سيتم إنهاء جلستك الحالية",`<div class="system-modal-actions"><button data-action="close-system-modal">إلغاء</button><button class="primary" data-action="confirm-logout">تسجيل الخروج</button></div><small>سيتم تأمين حسابك بعد تسجيل الخروج</small>`]
  }[type] || ["!","تنبيه","يرجى المحاولة مرة أخرى",""];
  let overlay = $("#system-modal-overlay");
  if (!overlay) { overlay = document.createElement("div"); overlay.id = "system-modal-overlay"; overlay.className = "system-modal-overlay"; document.body.append(overlay); }
  overlay.innerHTML = `<section class="system-modal ${type}" role="dialog" aria-modal="true"><button class="system-modal-close" data-action="close-system-modal">×</button><i>${content[0]}</i><h2>${content[1]}</h2><p>${content[2]}</p>${content[3]}</section>`;
  overlay.classList.add("open");
}

function entityCreateForm(view, item = null) {
  const section = adminSection(view);
  if (view === "team") {
    return `<form id="admin-staff-form" class="admin-quick-create">
      <div><span class="eyebrow">♟ TEAM & ROLES</span><h3>${state.lang === "ar" ? "إضافة حساب موظف" : "Add staff account"}</h3></div>
      <label>${state.lang === "ar" ? "الاسم" : "Name"}<input name="name" required minlength="2" /></label>
      <label>${state.lang === "ar" ? "البريد" : "Email"}<input name="email" type="email" required /></label>
      ${passwordFieldMarkup({ autocomplete: "new-password", label: state.lang === "ar" ? "كلمة المرور" : "Password" })}
      <label>${state.lang === "ar" ? "الدور" : "Role"}<select name="role">${staffRoleDefinitions.map(([id, name]) => `<option value="${id}">${escapeHTML(name)}</option>`).join("")}</select></label>
      <div><button type="button" class="secondary-button compact-button" data-action="cancel-admin-create">${state.lang === "ar" ? "إلغاء" : "Cancel"}</button>
      <button class="button burgundy-button" type="submit">${state.lang === "ar" ? "إنشاء الحساب" : "Create account"}</button></div></form>`;
  }
  return `<form id="admin-entity-form" class="admin-quick-create"><input type="hidden" name="view" value="${view}" /><input type="hidden" name="id" value="${escapeHTML(item?.id || "")}" />
    <div><span class="eyebrow">${section.icon} ${escapeHTML(state.lang === "ar" ? section.ar : section.en)}</span><h3>${item ? (state.lang === "ar" ? "تعديل السجل" : "Edit record") : (state.lang === "ar" ? "إضافة سجل جديد" : "Add new record")}</h3></div>
    <label>${state.lang === "ar" ? "الاسم" : "Name"}<input name="name" required value="${escapeHTML(item?.name || "")}" /></label>
    <label>${state.lang === "ar" ? "التفاصيل" : "Details"}<input name="detail" value="${escapeHTML(item?.detail || item?.contact || item?.type || item?.due || "")}" /></label>
    <label>${state.lang === "ar" ? "الحالة" : "Status"}<select name="status">${selectOptions([["active",adminStatusLabel("active")],["draft",adminStatusLabel("draft")],["scheduled",adminStatusLabel("scheduled")]], item?.status || "active")}</select></label>
    <div><button type="button" class="secondary-button compact-button" data-action="cancel-admin-create">${state.lang === "ar" ? "إلغاء" : "Cancel"}</button>
    <button class="button burgundy-button" type="submit">${state.lang === "ar" ? "حفظ" : "Save"}</button></div></form>`;
}

function closeAdminEditorModal() {
  const dialog = document.querySelector("#admin-editor-modal");
  if (!dialog) return;
  if (dialog.open) dialog.close();
  dialog.remove();
}

function openAdminEditorModal(markup, focusSelector = "input:not([type='hidden']),select,textarea") {
  closeAdminEditorModal();
  const dialog = document.createElement("dialog");
  dialog.id = "admin-editor-modal";
  dialog.className = "admin-editor-modal";
  dialog.innerHTML = `<div class="admin-editor-modal-shell"><button type="button" class="admin-editor-modal-close" data-action="close-admin-editor" aria-label="${adminCopy("إغلاق","Close")}">×</button>${markup}</div>`;
  document.body.append(dialog);
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  requestAnimationFrame(() => dialog.querySelector(focusSelector)?.focus());
  dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeAdminEditorModal(); }, { once: true });
  return dialog;
}

function brandEditorMarkup(id = "") {
  const item = brandManagementRecords().find((brand) => String(brand.id) === String(id)) || {
    id: `brand-${Date.now().toString(36)}`, nameAr:"", nameEn:"", country:"", flag:"", level:"medium", count:0, sales:0, active:true, image:""
  };
  const editing = Boolean(id);
  return `<form id="admin-brand-form" class="admin-modal-form" dir="rtl">
    <input type="hidden" name="id" value="${escapeHTML(item.id)}"/>
    <header><span class="eyebrow">ORIGO BRANDS</span><h2>${editing?"تعديل العلامة التجارية":"إضافة علامة تجارية"}</h2><p>${editing?"تم تحميل جميع بيانات العلامة المختارة تلقائيًا.":"أدخل بيانات العلامة الجديدة ثم احفظها."}</p></header>
    <div class="admin-modal-grid">
      <label>الاسم بالعربية<input name="nameAr" required value="${escapeHTML(item.nameAr||"")}"/></label>
      <label>الاسم بالإنجليزية<input name="nameEn" dir="ltr" required value="${escapeHTML(item.nameEn||"")}"/></label>
      <label>بلد المنشأ<input name="country" value="${escapeHTML(item.country||"")}"/></label>
      <label>رمز/علم الدولة<input name="flag" value="${escapeHTML(item.flag||"")}"/></label>
      <label>مستوى السعر<select name="level">${selectOptions([["luxury","فاخر"],["high","مرتفع"],["medium","متوسط"]],item.level||"medium")}</select></label>
      <label>عدد المنتجات<input name="count" type="number" min="0" value="${Number(item.count||0)}"/></label>
      <label>إجمالي المبيعات<input name="sales" type="number" min="0" value="${Number(item.sales||0)}"/></label>
      <label class="wide">رابط الشعار<input name="image" dir="ltr" value="${escapeHTML(item.image||"")}" placeholder="https://..."/></label>
      <label class="wide admin-modal-upload">رفع شعار من الملفات<input name="imageFile" type="file" accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"/><small>PNG أو JPG أو WebP أو AVIF أو SVG</small></label>
      <label class="admin-toggle-row wide"><span><b>العلامة نشطة</b><small>تظهر في المتجر وقوائم العلامات.</small></span><input name="active" type="checkbox"${item.active!==false?" checked":""}/></label>
    </div>
    <footer><button type="button" class="secondary-button" data-action="close-admin-editor">إلغاء</button><button class="button burgundy-button" type="submit">حفظ التعديلات</button></footer>
  </form>`;
}

function bannerEditorMarkup(id = "") {
  const existing = (state.adminWorkspace.banners || []).find((item) => String(item.id) === String(id));
  const item = existing || { id:`banner-${Date.now().toString(36)}`, title:"", subtitle:"", placement:"الصفحة الرئيسية", position:"أعلى الصفحة", type:"image", start:"", end:"", clicks:0, status:"active", tone:"red" };
  return `<form id="admin-banner-form" class="admin-modal-form" dir="rtl"><input type="hidden" name="id" value="${escapeHTML(item.id)}"/>
    <header><span class="eyebrow">ORIGO BANNERS</span><h2>${existing?"تعديل بيانات البنر":"إضافة بنر جديد"}</h2><p>${existing?"جميع بيانات البنر المختار جاهزة للتعديل.":"أنشئ بنرًا جديدًا داخل لوحة التحكم."}</p></header>
    <div class="admin-modal-grid"><label>العنوان<input name="title" required value="${escapeHTML(item.title||"")}"/></label><label>الوصف<input name="subtitle" value="${escapeHTML(item.subtitle||"")}"/></label><label>الموقع/الصفحة<input name="placement" value="${escapeHTML(item.placement||"")}"/></label><label>الموضع<input name="position" value="${escapeHTML(item.position||"")}"/></label><label>النوع<select name="type">${selectOptions([["image","صورة"],["video","فيديو"]],item.type||"image")}</select></label><label>الحالة<select name="status">${selectOptions([["active","نشط"],["scheduled","مجدول"],["expired","متوقف"]],item.status||"active")}</select></label><label>تاريخ البداية<input name="start" type="date" value="${escapeHTML(item.start||"")}"/></label><label>تاريخ النهاية<input name="end" type="date" value="${escapeHTML(item.end||"")}"/></label></div>
    <footer><button type="button" class="secondary-button" data-action="close-admin-editor">إلغاء</button><button class="button burgundy-button" type="submit">حفظ التعديلات</button></footer></form>`;
}

function homeHeroProductOptions(selectedId = "") {
  const options = state.products.map((product) => {
    const label = state.lang === "ar" ? product.nameAr || product.nameEn : product.nameEn || product.nameAr;
    return `<option value="${escapeHTML(product.id)}"${String(product.id) === String(selectedId) ? " selected" : ""}>${escapeHTML(label || product.id)} — ${escapeHTML(product.brand || "ORIGO")}</option>`;
  }).join("");
  return `<option value="">${state.lang === "ar" ? "رابط مخصص بدون منتج" : "Custom link without a product"}</option>${options}`;
}

function homeHeroTargetHref(item = {}) {
  const product = item.productId ? getProduct(String(item.productId)) : null;
  if (product) return `/?product=${encodeURIComponent(product.slug || product.id)}`;
  const href = String(item.href || "").trim();
  return /^(?:https?:\/\/|\/|#|\?)/i.test(href) ? href : "#new-arrivals";
}

function homeSlideEditorMarkup(id = "") {
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const existing = settings.homeMedia.find((item) => String(item.id) === String(id));
  const item = existing || { id:`media-${Date.now().toString(36)}`, name:"",productId:"",href:"#new-arrivals",sortOrder:settings.homeMedia.length+1,sizeMode:"cover",active:true,url:"" };
  return `<form id="admin-home-slide-form" class="admin-modal-form" dir="rtl"><input type="hidden" name="id" value="${escapeHTML(item.id)}"/>
    <header><span class="eyebrow">HOMEPAGE SLIDER</span><h2>${existing?"تعديل شريحة السلايدر":"إضافة شريحة سلايدر"}</h2><p>الشريحة صورة فقط؛ الضغط عليها يفتح المنتج المختار أو الرابط المخصص.</p></header>
    <div class="admin-modal-grid"><label>اسم الصورة<input name="name" value="${escapeHTML(item.name||"")}"/></label><label>الترتيب<input name="sortOrder" type="number" min="1" value="${Number(item.sortOrder||1)}"/></label><label class="wide">المنتج المرتبط بالصورة<select name="productId">${homeHeroProductOptions(item.productId||"")}</select></label><label class="wide">رابط هدف مخصص عند عدم اختيار منتج<input name="href" dir="ltr" value="${escapeHTML(item.href||"#new-arrivals")}" placeholder="/perfumes أو https://..."/></label><label>ملاءمة الصورة<select name="sizeMode"><option value="cover" selected>تغطية كاملة تلقائيًا</option></select></label><label class="wide admin-modal-upload">${existing?"استبدال الصورة (اختياري)":"صورة الشريحة"}<input name="mediaFile" type="file" accept="image/png,image/jpeg,image/webp,image/avif"${existing?"":" required"}/></label><label class="admin-toggle-row wide"><span><b>عرض الشريحة</b></span><input name="active" type="checkbox"${item.active!==false?" checked":""}/></label></div>
    <footer><button type="button" class="secondary-button" data-action="close-admin-editor">إلغاء</button><button class="button burgundy-button" type="submit">حفظ التعديلات</button></footer></form>`;
}

function alternativesAdminMarkup() {
  const ar = state.lang === "ar";
  const data = state.alternativesAdmin || { items: [], references: [], settings: {}, analytics: {} };
  const settings = data.settings || {};
  const eventMap = Object.fromEntries((data.analytics?.events || []).map((item) => [item.eventType, Number(item.count)]));
  const productOptions = (data.catalogProducts || state.products || []).filter((product) => product.status !== "archived").map((product) =>
    `<option value="${escapeHTML(product.id)}">${escapeHTML(ar ? product.nameAr || product.nameEn : product.nameEn || product.nameAr)} — ${escapeHTML(product.brand || "ORIGO")}</option>`
  ).join("");
  return `<div class="alternatives-admin-view">
    <section class="admin-metric-grid">
      <article><span>⇄</span><div><b>${data.items?.length || 0}</b><small>${ar ? "علاقة بديل" : "Alternative matches"}</small></div></article>
      <article><span>◉</span><div><b>${eventMap.comparison || 0}</b><small>${ar ? "فتح مقارنة" : "Comparison views"}</small></div></article>
      <article><span>♧</span><div><b>${eventMap.add_to_cart || 0}</b><small>${ar ? "إضافة للسلة" : "Cart additions"}</small></div></article>
      <article><span>⌕</span><div><b>${(data.analytics?.topSearches || []).reduce((sum,item)=>sum+Number(item.count||0),0)}</b><small>${ar ? "عملية بحث" : "Searches"}</small></div></article>
    </section>
    <form id="admin-alternatives-settings" class="admin-settings-form alternatives-admin-settings"><section><div class="review-section-head"><span>01</span><div><b>${ar ? "ظهور البدائل في الصفحة الرئيسية" : "Homepage alternatives"}</b><small>${ar ? "تحكم في البانر والقسم والعناوين وعدد البطاقات." : "Control the banner, section copy, and card count."}</small></div></div>
      <div class="review-grid"><label>${ar ? "العنوان العربي" : "Arabic title"}<input name="titleAr" value="${escapeHTML(settings.titleAr || "")}"/></label><label>${ar ? "العنوان الإنجليزي" : "English title"}<input name="titleEn" value="${escapeHTML(settings.titleEn || "")}"/></label></div>
      <div class="review-grid"><label>${ar ? "وصف العربية" : "Arabic description"}<input name="descriptionAr" value="${escapeHTML(settings.descriptionAr || "")}"/></label><label>${ar ? "وصف الإنجليزية" : "English description"}<input name="descriptionEn" value="${escapeHTML(settings.descriptionEn || "")}"/></label></div>
      <div class="review-grid"><label>${ar ? "عنوان البانر AR" : "Banner title AR"}<input name="bannerTitleAr" value="${escapeHTML(settings.bannerTitleAr || "")}"/></label><label>${ar ? "عنوان البانر EN" : "Banner title EN"}<input name="bannerTitleEn" value="${escapeHTML(settings.bannerTitleEn || "")}"/></label></div>
      <div class="review-grid"><label>${ar ? "وصف البانر AR" : "Banner copy AR"}<textarea name="bannerDescriptionAr">${escapeHTML(settings.bannerDescriptionAr || "")}</textarea></label><label>${ar ? "وصف البانر EN" : "Banner copy EN"}<textarea name="bannerDescriptionEn">${escapeHTML(settings.bannerDescriptionEn || "")}</textarea></label></div>
      <div class="review-grid"><label>${ar ? "عدد البطاقات" : "Card count"}<input name="count" type="number" min="1" max="12" value="${Number(settings.count || 4)}"/></label><label>${ar ? "موضع القسم" : "Section position"}<select name="position"><option value="before-finder"${settings.position === "before-finder" ? " selected" : ""}>${ar ? "قبل مكتشف العطر" : "Before fragrance finder"}</option><option value="after-products"${settings.position === "after-products" ? " selected" : ""}>${ar ? "بعد المنتجات" : "After products"}</option></select></label></div>
      <label class="admin-toggle-row"><span><b>${ar ? "إظهار القسم" : "Show section"}</b></span><input name="sectionEnabled" type="checkbox"${settings.sectionEnabled !== false ? " checked" : ""}/></label>
      <label class="admin-toggle-row"><span><b>${ar ? "إظهار البانر" : "Show banner"}</b></span><input name="bannerEnabled" type="checkbox"${settings.bannerEnabled !== false ? " checked" : ""}/></label>
      <button class="button burgundy-button" type="submit">${ar ? "حفظ إعدادات الظهور" : "Save display settings"} ←</button>
    </section></form>
    <section class="alternatives-admin-matches"><div class="review-section-head"><span>02</span><div><b>${ar ? "العطور المرجعية وربط البدائل" : "Reference fragrances & matches"}</b><small>${ar ? "المنتج البديل مرتبط مباشرة بكتالوج ORIGO؛ السعر والمخزون لا يتكرران هنا." : "Alternative products stay linked to the live ORIGO catalog."}</small></div></div><div class="alternatives-admin-tools"><a class="secondary-button" href="/api/admin/alternatives/export.csv" download>${ar?"تصدير CSV":"Export CSV"}</a><label class="secondary-button">${ar?"استيراد CSV":"Import CSV"}<input id="alternatives-import-file" type="file" accept=".csv,text/csv" hidden/></label></div>
      <details class="alternative-create-panel" open><summary>＋ ${ar ? "مكتبة العطور المرجعية وربط عدة بدائل" : "Reference library & multiple alternatives"}</summary><form id="admin-alternative-create">
        <div class="review-grid"><label>${ar ? "اسم العطر بالعربية" : "Arabic reference name"}<input name="nameAr" required maxlength="200"/></label><label>${ar ? "اسم العطر بالإنجليزية" : "English reference name"}<input name="nameEn" required maxlength="200"/></label></div>
        <div class="review-grid"><label>${ar ? "العلامة التجارية" : "Brand"}<input name="brand" required maxlength="160"/></label><label>${ar ? "الاسم المختصر/الاسم الشائع" : "Short/common name"}<input name="shortName" maxlength="120"/></label></div>
        <div class="review-grid"><label>${ar ? "الرابط المختصر" : "URL slug"}<input name="slug" dir="ltr" maxlength="120" placeholder="creed-aventus"/></label><label>${ar ? "سنة الإصدار" : "Release year"}<input name="releaseYear" type="number" min="1800" max="2200"/></label></div>
        <div class="review-grid"><label>${ar ? "صورة العطر المرجعي" : "Reference image"}<input name="image" dir="ltr" placeholder="/assets/references/...svg"/></label><label>${ar ? "السعر المرجعي بالجنيه" : "Reference price (EGP)"}<input name="referencePrice" type="number" min="0" step="0.01"/></label></div>
        <div class="review-grid three"><label>${ar ? "التركيز" : "Concentration"}<input name="concentration" placeholder="Eau de Parfum"/></label><label>${ar ? "الحجم" : "Size"}<input name="size" placeholder="100 ml"/></label><label>${ar ? "الجنس" : "Gender"}<select name="gender"><option value="unisex">${ar ? "للجنسين" : "Unisex"}</option><option value="men">${ar ? "رجالي" : "Men"}</option><option value="women">${ar ? "نسائي" : "Women"}</option></select></label></div>
        <div class="review-grid"><label>${ar ? "العائلة العطرية AR" : "Family AR"}<input name="familyAr"/></label><label>${ar ? "العائلة العطرية EN" : "Family EN"}<input name="familyEn"/></label></div>
        <div class="review-grid"><label>${ar ? "أسماء البحث والاختصارات" : "Search aliases"}<textarea name="searchAliases" placeholder="Aventus، افنتوس"></textarea></label><label>${ar ? "الأخطاء الإملائية الشائعة" : "Common misspellings"}<textarea name="misspellings"></textarea></label></div>
        <div class="review-grid"><label>${ar ? "النوتات العربية" : "Arabic notes"}<textarea name="notesAr" placeholder="برغموت، ورد، عود"></textarea></label><label>${ar ? "النوتات الإنجليزية" : "English notes"}<textarea name="notesEn" placeholder="Bergamot, Rose, Oud"></textarea></label></div>
        <div class="review-grid"><label>${ar ? "وصف عربي" : "Arabic description"}<textarea name="descriptionAr"></textarea></label><label>${ar ? "وصف إنجليزي" : "English description"}<textarea name="descriptionEn"></textarea></label></div>
        <label>${ar ? "منتجات ORIGO البديلة (اختيار متعدد)" : "Linked ORIGO alternatives (multiple)"}<select name="productIds" multiple size="8" required>${productOptions}</select><small>${ar ? "استخدم Ctrl أو ⌘ لاختيار أكثر من منتج." : "Use Ctrl or ⌘ to choose multiple products."}</small></label>
        <div class="review-grid"><label>${ar ? "نوع العلاقة" : "Relationship type"}<select name="relationshipType">${selectOptions([["direct_alternative",ar?"بديل مباشر":"Direct alternative"],["inspired_by",ar?"مستوحى من":"Inspired by"],["similar_character",ar?"طابع مشابه":"Similar character"],["similar_opening",ar?"افتتاحية مشابهة":"Similar opening"],["similar_drydown",ar?"قاعدة مشابهة":"Similar drydown"],["custom",ar?"مخصص":"Custom"]],"similar_character")}</select></label><label>${ar ? "شارات العرض" : "Display badges"}<input name="badges" placeholder="best-value,closest-match"/></label></div>
        <div class="review-grid three"><label>${ar ? "التشابه (اتركه للحساب الذكي)" : "Similarity (blank = calculated)"}<input name="similarity" type="number" min="0" max="100"/></label><label>${ar ? "الثقة" : "Confidence"}<input name="confidence" type="number" min="0" max="100"/></label><label>${ar ? "الترتيب" : "Order"}<input name="sortOrder" type="number" value="0"/></label></div>
        <div class="review-grid"><label>${ar ? "سبب الترشيح بالعربية" : "Arabic recommendation reason"}<textarea name="reasonAr" required></textarea></label><label>${ar ? "سبب الترشيح بالإنجليزية" : "English recommendation reason"}<textarea name="reasonEn" required></textarea></label></div>
        <div class="review-grid three"><label class="admin-pin"><input name="primaryAlternative" type="checkbox"/> ${ar ? "البديل الرئيسي للمرجع" : "Primary alternative"}</label><label class="admin-pin"><input name="visible" type="checkbox" checked/> ${ar ? "ظاهر للعملاء" : "Publicly visible"}</label><label>${ar ? "حالة المرجع" : "Reference status"}<select name="referenceStatus">${selectOptions([["draft",ar?"مسودة":"Draft"],["active",ar?"نشط":"Active"]],"active")}</select></label></div>
        <button class="button burgundy-button" type="submit">${ar ? "حفظ المرجع وربط البدائل" : "Save reference & alternatives"} ←</button>
      </form></details>
      <div class="alternative-reference-library">${(data.references || []).map((reference) => `<article><img src="${escapeHTML(reference.image)}" alt=""/><div><b>${escapeHTML(ar ? reference.nameAr : reference.nameEn)}</b><small>${escapeHTML(reference.brand)} · ${escapeHTML(reference.status)}</small></div><span>${(data.items || []).filter((item)=>item.referenceId===reference.id).length} ${ar?"بدائل":"matches"}</span><button type="button" data-action="archive-alternative-reference" data-id="${escapeHTML(reference.id)}" aria-label="${ar?"أرشفة":"Archive"}">⌫</button></article>`).join("")}</div>
      <div class="alternatives-admin-list">${(data.items || []).map((item) => `<form class="alternative-admin-row" data-alternative-match="${item.id}"><img src="${escapeHTML(item.reference.image)}" alt=""/><div><small>${ar ? "العطر المرجعي" : "Reference"}</small><b>${escapeHTML(ar ? item.reference.nameAr : item.reference.nameEn)}</b><span>${escapeHTML(item.reference.brand)}</span></div><span class="admin-match-arrow">⇄</span><img src="${escapeHTML(item.product.image)}" alt=""/><div><small>${ar ? "منتج ORIGO" : "ORIGO product"}</small><b>${escapeHTML(ar ? item.product.nameAr : item.product.nameEn || item.product.nameAr)}</b><span>${formatPrice(item.product.price)}</span></div><label>${ar ? "المعتمد" : "Approved"}<input name="approvedSimilarity" type="number" min="0" max="100" value="${item.approvedSimilarity ?? item.similarity}"/><small>${ar?"المحسوب":"Calculated"}: ${item.calculatedSimilarity ?? item.similarity}%</small></label><label>${ar ? "نوع العلاقة" : "Relationship"}<select name="relationshipType">${selectOptions([["direct_alternative",ar?"بديل مباشر":"Direct alternative"],["inspired_by",ar?"مستوحى":"Inspired"],["similar_character",ar?"طابع مشابه":"Similar character"],["similar_opening",ar?"افتتاحية":"Opening"],["similar_drydown",ar?"قاعدة":"Drydown"],["custom",ar?"مخصص":"Custom"]],item.relationshipType)}</select></label><label>${ar ? "الترتيب" : "Order"}<input name="sortOrder" type="number" value="${item.sortOrder}"/></label><label>${ar ? "الحالة" : "Status"}<select name="status">${selectOptions([["active",ar?"نشط":"Active"],["hidden",ar?"مخفي":"Hidden"],["draft",ar?"مسودة":"Draft"]],item.status)}</select></label><label class="match-reason">${ar ? "سبب الترشيح" : "Recommendation reason"}<textarea name="reason">${escapeHTML(ar ? item.reasonAr : item.reasonEn)}</textarea></label><label class="admin-pin"><input name="pinned" type="checkbox"${item.pinned ? " checked" : ""}/> ${ar ? "تثبيت" : "Pin"}</label><label class="admin-pin"><input name="primaryReference" type="checkbox"${item.primaryReference ? " checked" : ""}/> ${ar ? "مرجع المنتج الرئيسي" : "Primary reference"}</label><label class="admin-pin"><input name="primaryAlternative" type="checkbox"${item.primaryAlternative ? " checked" : ""}/> ${ar ? "بديل المرجع الرئيسي" : "Primary alternative"}</label><label class="admin-pin"><input name="visible" type="checkbox"${item.visible ? " checked" : ""}/> ${ar ? "ظاهر" : "Visible"}</label><button type="button" class="button burgundy-button" data-action="save-alternative-match">${ar ? "حفظ" : "Save"}</button><button type="button" class="secondary-button" data-action="delete-alternative-match">${ar?"حذف العلاقة":"Delete"}</button></form>`).join("")}</div>
    </section>
    <section><div class="review-section-head"><span>03</span><div><b>${ar ? "تحليلات البحث والطلبات الناقصة" : "Search analytics & missing requests"}</b></div></div><div class="admin-family-grid">${(data.analytics?.topSearches || []).map((item)=>`<article><span>⌕</span><div><b>${escapeHTML(item.query || (ar ? "بحث فارغ" : "Empty query"))}</b><small>${Number(item.count)} ${ar ? "مرة" : "searches"}</small></div></article>`).join("") || `<p>${ar ? "لا توجد بيانات بحث بعد." : "No search data yet."}</p>`}</div><h3>${ar?"عمليات بحث بلا نتائج":"Zero-result searches"}</h3><div class="admin-family-grid">${(data.analytics?.unmatchedSearches||[]).map((item)=>`<article><span>!</span><div><b>${escapeHTML(item.query)}</b><small>${Number(item.count)}×</small></div></article>`).join("")||`<p>${ar?"لا توجد":"None"}</p>`}</div><h3>${ar?"طلبات إضافة عطر":"Fragrance requests"}</h3><div class="admin-family-grid">${(data.requests||[]).map((item)=>`<article><span>＋</span><div><b>${escapeHTML(item.query)}</b><small>${escapeHTML(item.channel)} · ${escapeHTML(item.status)}</small></div></article>`).join("")||`<p>${ar?"لا توجد طلبات":"No requests"}</p>`}</div></section>
  </div>`;
}

function productOptionsAdminMarkup() {
  const groups = [
    ["brand","البراندات","Brands"],["category","أنواع المنتجات","Product types"],["concentration","أنواع التركيز","Concentrations"],["size","الأحجام والوحدات","Sizes & units"],
    ["family","العائلات العطرية","Fragrance families"],["note","النوتات العطرية","Fragrance notes"],["season","المواسم","Seasons"],["occasion","المناسبات","Occasions"],
    ["usage_time","أوقات الاستخدام","Usage times"],["personality","الشخصيات","Personalities"],["mood","المزاج والانطباعات","Moods"],["country","البلدان","Countries"],
    ["perfumer","المصممون","Perfumers"],["tag","الوسوم","Tags"]
  ];
  return `<div class="product-options-admin"><header><div><span class="eyebrow">ORIGO CATALOG</span><h2>${adminCopy("إدارة خصائص وخيارات المنتجات","Product attributes & options")}</h2><p>${adminCopy("كل خيار سجل واحد بالعربية والإنجليزية، ويظهر مباشرة في نموذج المنتج.","Each option is one bilingual record and appears immediately in the product editor.")}</p></div></header><div class="product-options-groups">${groups.map(([group,ar,en]) => {
    const saved = state.productOptions.filter((item) => item.group === group);
    const allItems = productOptionItems(group);
    return `<section><header><div><b>${adminCopy(ar,en)}</b><small>${allItems.length} ${adminCopy("خيارًا","options")}</small></div><button type="button" data-action="manage-product-option" data-group="${group}">＋ ${adminCopy("إضافة","Add")}</button></header><div>${saved.length ? saved.map((item) => `<article class="${item.active ? "" : "inactive"}">${item.image ? `<img src="${escapeHTML(item.image)}" alt=""/>` : `<i style="--option-color:${escapeHTML(item.color || "#b98725")}">${escapeHTML(item.icon || "◇")}</i>`}<span><b>${escapeHTML(state.lang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr)}</b><small>${escapeHTML(state.lang === "ar" ? item.nameEn : item.nameAr)} · ${escapeHTML(item.slug)}</small></span><em>${item.active ? adminCopy("نشط","Active") : adminCopy("مخفي","Hidden")}</em><button type="button" data-action="delete-product-option" data-id="${item.id}">×</button></article>`).join("") : `<p>${adminCopy("تُستخدم القيم الافتراضية حاليًا. أضف قيمًا مخصصة عند الحاجة.","Built-in values are active. Add custom options as needed.")}</p>`}</div></section>`;
  }).join("")}</div></div>`;
}

function genderMediaAdminMarkup(settings, ar) {
  const items = [
    ["men", ar ? "صورة قسم الرجال" : "Men image"],
    ["women", ar ? "صورة قسم النساء" : "Women image"],
    ["unisex", ar ? "صورة قسم الجنسين" : "Unisex image"]
  ];
  return `<div class="home-gender-media-admin"><div class="review-section-head"><span>03</span><div><b>${ar ? "صور التسوق حسب الجنس" : "Shop-by-gender images"}</b><small>${ar ? "ارفع صورة مستقلة لكل بطاقة. تختفي الصورة الافتراضية عند عدم اختيار ملف." : "Upload a separate image for each card. No default image is used."}</small></div></div><div class="home-gender-media-grid">${items.map(([key, label]) => {
    const source = String(settings.homeGenderImages?.[key] || "").trim();
    return `<article class="home-gender-media-card"><label><span>${escapeHTML(label)}</span>${source ? `<img src="${escapeHTML(source)}" alt=""/>` : `<i>${luxuryIcon("perfume")}</i>`}<input type="file" name="genderMedia.${key}" accept="image/png,image/jpeg,image/webp,image/avif"/></label><small>${ar ? "PNG أو JPG أو WebP أو AVIF — حتى 15MB" : "PNG, JPG, WebP, or AVIF — up to 15MB"}</small>${source ? `<label class="gender-media-remove"><input type="checkbox" name="genderMediaClear.${key}"/> ${ar ? "حذف الصورة الحالية" : "Remove current image"}</label>` : ""}</article>`;
  }).join("")}</div><output id="gender-upload-status" class="banner-upload-status" aria-live="polite"></output></div>`;
}

function homepageRailsAdminMarkup() {
  const ar = state.lang === "ar";
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const labels = {
    benefits: ["شريط المزايا", "Benefits rail"], gender: ["التسوق حسب الجنس", "Gender rail"],
    categories: ["شريط الفئات", "Categories rail"], brands: ["شريط العلامات التلقائي", "Autoplay brand marquee"]
  };
  const heroMedia = settings.homeMedia.filter((item) => item.placement === "hero");
  const mediaCards = heroMedia.map((item) => {
    const isHero = true;
    return `<article class="home-hero-media-card">
      <img src="${escapeHTML(item.url)}" alt="${escapeHTML(ar ? item.altAr : item.altEn)}"/>
      <span><b>${escapeHTML(item.name)}</b><small>${escapeHTML(item.placement || "general")}${item.brand ? ` · ${escapeHTML(item.brand)}` : ""}</small></span>
      <button type="button" data-action="delete-home-media" data-id="${escapeHTML(item.id)}" aria-label="${ar ? "حذف" : "Delete"}">×</button>
      ${isHero ? `<div class="home-hero-slide-fields">
        <label>${ar ? "اسم الصورة" : "Image name"}<input data-home-media-field="name" data-id="${escapeHTML(item.id)}" value="${escapeHTML(item.name || "")}"/></label>
        <label>${ar ? "الترتيب" : "Order"}<input type="number" min="1" max="99" data-home-media-field="sortOrder" data-id="${escapeHTML(item.id)}" value="${Number(item.sortOrder || 1)}"/></label>
        <label>${ar ? "طريقة ملء البنر" : "Banner image fit"}<select data-home-media-field="sizeMode" data-id="${escapeHTML(item.id)}"><option value="cover" selected>${ar ? "تغطية كاملة تلقائيًا" : "Automatic full cover"}</option></select></label>
        <input type="hidden" data-home-media-field="imageScale" data-id="${escapeHTML(item.id)}" value="100"/>
        <label>${ar ? "موضع الصورة" : "Image position"}<select data-home-media-field="imagePosition" data-id="${escapeHTML(item.id)}"><option value="center"${!item.imagePosition || item.imagePosition === "center" ? " selected" : ""}>${ar ? "الوسط" : "Center"}</option><option value="right"${item.imagePosition === "right" ? " selected" : ""}>${ar ? "اليمين" : "Right"}</option><option value="left"${item.imagePosition === "left" ? " selected" : ""}>${ar ? "اليسار" : "Left"}</option><option value="top"${item.imagePosition === "top" ? " selected" : ""}>${ar ? "أعلى" : "Top"}</option><option value="bottom"${item.imagePosition === "bottom" ? " selected" : ""}>${ar ? "أسفل" : "Bottom"}</option></select></label>
        <label class="admin-toggle-row"><span>${ar ? "عرض الصورة" : "Show image"}</span><input type="checkbox" data-home-media-field="active" data-id="${escapeHTML(item.id)}"${item.active !== false ? " checked" : ""}/></label>
        <label class="wide">${ar ? "المنتج المرتبط بالصورة" : "Product linked to the image"}<select data-home-media-field="productId" data-id="${escapeHTML(item.id)}">${homeHeroProductOptions(item.productId || "")}</select></label>
        <label class="wide">${ar ? "رابط هدف مخصص" : "Custom target link"}<input data-home-media-field="href" data-id="${escapeHTML(item.id)}" dir="ltr" value="${escapeHTML(item.href || "#new-arrivals")}"/></label>
      </div>` : `<small>${escapeHTML(ar ? item.altAr : item.altEn)}</small>`}
    </article>`;
  }).join("");
  return `<form id="admin-homepage-rails" class="admin-settings-form homepage-rails-admin">
    <section class="admin-home-hero-panel"><div class="review-section-head"><span>01</span><div><b>${ar ? "البنر الرئيسي" : "Homepage hero banner"}</b><small>${ar ? "السلايدر يعرض الصور فقط، وتعمل الصورة كاملة كرابط للمنتج أو الهدف المختار." : "The slider shows images only, and the full image links to the selected product or target."}</small></div></div>
      ${heroMedia.length ? "" : `<div class="admin-home-hero-default"><span><b>${ar ? "لا توجد صورة افتراضية" : "No default image"}</b><small>${ar ? "ارفع صورة واحدة أو عدة صور لإنشاء سلايدر الصفحة الرئيسية." : "Upload one or more images to create the homepage slider."}</small></span></div>`}
      <div class="review-grid">
        <label>${ar ? "زمن عرض كل صورة بالثواني" : "Seconds per slide"}<input name="heroIntervalSeconds" type="number" min="1" max="30" step="0.5" value="${Number(settings.homeHero.intervalSeconds || 2.5)}"/></label>
        <label>${ar ? "رفع صور البنر من الملفات" : "Upload banner images"}<input name="mediaFile" type="file" multiple accept="image/png,image/jpeg,image/webp,image/avif"/></label>
        <label>${ar ? "المنتج الافتراضي للصور الجديدة" : "Default product for new images"}<select name="mediaProductId">${homeHeroProductOptions("")}</select></label>
        <label>${ar ? "رابط هدف افتراضي" : "Default target link"}<input name="mediaHref" dir="ltr" value="#new-arrivals"/></label>
      </div>
      <input name="mediaPlacement" type="hidden" value="hero"/>
      <div class="home-media-library">${heroMedia.length ? mediaCards : `<p>${ar ? "لا توجد صور مخصصة؛ يتم استخدام صورة ORIGO الافتراضية المعروضة أعلاه." : "No custom slides yet; the ORIGO default shown above is in use."}</p>`}</div>
    </section>
    <section><div class="review-section-head"><span>02</span><div><b>${ar ? "إدارة أشرطة الصفحة الرئيسية" : "Homepage rails management"}</b><small>${ar ? "تحكم في ظهور الأشرطة وترتيبها وسرعة حركة المميزات والعلامات." : "Control rail visibility, order, and the benefits and brands motion speed."}</small></div></div>
      <div class="homepage-rail-settings">${Object.entries(settings.homepageRails).map(([key, rail]) => `<article><header><b>${escapeHTML(labels[key][ar ? 0 : 1])}</b><label class="admin-toggle-row"><span>${ar ? "ظاهر" : "Visible"}</span><input name="${key}.enabled" type="checkbox"${rail.enabled !== false ? " checked" : ""}/></label></header><div class="review-grid"><label>${ar ? "العنوان العربي" : "Arabic title"}<input name="${key}.titleAr" value="${escapeHTML(rail.titleAr || "")}"/></label><label>${ar ? "العنوان الإنجليزي" : "English title"}<input name="${key}.titleEn" value="${escapeHTML(rail.titleEn || "")}"/></label><label>${ar ? "الترتيب" : "Order"}<input name="${key}.order" type="number" min="1" max="10" value="${Number(rail.order || 1)}"/></label>${key === "brands" || key === "benefits" ? `<label>${ar ? "مدة الدورة بالثواني" : "Cycle duration (seconds)"}<input name="${key}.speed" type="number" min="6" max="120" step="1" value="${Number(rail.speed || (key === "benefits" ? 18 : 34))}"/></label>` : ""}</div>${key === "gender" ? genderMediaAdminMarkup(settings, ar) : ""}</article>`).join("")}</div>
    </section>
    <button class="button burgundy-button" type="submit">${ar ? "حفظ البنر وإعدادات الصفحة" : "Save banner and homepage settings"}</button></form>`;
}

function applyHomepageRailSettings() {
  const storeSettings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const settings = storeSettings.homepageRails;
  const map = { benefits: ".home-benefits-directory", gender: ".home-gender-section", categories: ".home-categories", brands: ".home-brand-directory" };
  Object.entries(map).forEach(([key, selector]) => {
    const element = $(selector);
    if (!element) return;
    element.hidden = settings[key]?.enabled === false;
    element.style.order = String(Number(settings[key]?.order || 0));
    element.setAttribute("aria-label", state.lang === "ar" ? settings[key]?.titleAr || "" : settings[key]?.titleEn || "");
  });
  document.documentElement.style.setProperty("--brand-marquee-duration", `${Math.max(12, Math.min(120, Number(settings.brands?.speed || 34)))}s`);
  document.documentElement.style.setProperty("--benefit-marquee-duration", `${Math.max(6, Math.min(120, Number(settings.benefits?.speed || 18)))}s`);
  renderHomeGenderImages(storeSettings.homeGenderImages);
}

function renderHomeGenderImages(images = mergeStoreSettings(state.adminWorkspace.settings || {}).homeGenderImages) {
  const labels = {
    men: state.lang === "ar" ? "مجموعة عطور للرجال" : "Men fragrance collection",
    women: state.lang === "ar" ? "مجموعة عطور للنساء" : "Women fragrance collection",
    unisex: state.lang === "ar" ? "مجموعة عطور للجنسين" : "Unisex fragrance collection"
  };
  $$(".home-gender-card").forEach((card) => {
    const key = card.dataset.gender;
    const art = $(".gender-card-art", card);
    if (!art || !key) return;
    const source = String(images?.[key] || "").trim();
    art.innerHTML = source
      ? `<img src="${escapeHTML(source)}" width="464" height="571" loading="lazy" decoding="async" alt="${escapeHTML(labels[key] || "")}"/>`
      : `<span class="gender-art-placeholder" aria-hidden="true">${luxuryIcon("perfume")}</span>`;
    art.removeAttribute("aria-hidden");
  });
}

function renderAdminDashboard(view = state.adminView) {
  state.adminView = view;
  const section = adminSection(view);
  $("#advanced-admin-nav").innerHTML = adminNavMarkup();
  $("#admin-breadcrumb-current").textContent = state.lang === "ar" ? section.ar : section.en;
  $("#advanced-admin-title").textContent = state.lang === "ar" ? section.ar : section.en;
  $("#admin-view-description").textContent = state.lang === "ar" ? section.descriptionAr : section.descriptionEn;
  const actions = {
    products: `<button class="button secondary-button" data-action="admin-export" data-report="products">${state.lang === "ar" ? "تصدير" : "Export"} ↓</button><button class="button burgundy-button" data-action="open-product-studio">${state.lang === "ar" ? "إضافة منتج" : "Add product"} ＋</button>`,
    performance: `<a class="button secondary-button" href="/api/admin/performance-products/export.csv">${state.lang === "ar" ? "تصدير CSV" : "Export CSV"} ↓</a><button class="button burgundy-button" data-action="recalculate-all-performance">${state.lang === "ar" ? "إعادة احتساب الكل" : "Recalculate all"} ↻</button>`,
    orders: `<button class="button secondary-button" data-action="admin-export" data-report="orders">${state.lang === "ar" ? "تصدير الطلبات" : "Export orders"} ↓</button>`,
    inventory: `<button class="button secondary-button" data-action="admin-export" data-report="inventory">${state.lang === "ar" ? "تصدير المخزون" : "Export inventory"} ↓</button>`,
    notes: `<button class="button burgundy-button" data-action="open-notes-admin">${state.lang === "ar" ? "إدارة قاعدة المعرفة" : "Manage knowledge base"} ＋</button>`,
    categories: `<button class="button burgundy-button" data-action="new-filter">${state.lang === "ar" ? "إضافة فلتر" : "Add filter"} ＋</button>`,
    brands: `<button class="button secondary-button" data-action="export-brands">تصدير ↓</button><button class="button secondary-button" data-action="import-brands">استيراد علامات ↓</button><button class="button burgundy-button" data-action="create-brand">إضافة علامة تجارية ＋</button>`,
    content: `<button class="button secondary-button" data-action="export-banners">تصدير تقرير ↓</button><button class="button secondary-button" data-action="import-banners">استيراد بنرات ↥</button><button class="button burgundy-button" data-action="create-banner">إضافة بنر جديد ＋</button>`,
    coupons: `<button class="button secondary-button" data-action="admin-export" data-report="coupons">تصدير ↓</button><button class="button secondary-button" data-action="import-coupons">استيراد كوبونات ↓</button><button class="button burgundy-button" data-action="create-coupon">إضافة كوبون جديد ＋</button>`
  };
  $("#admin-view-actions").innerHTML = actions[view] || (["overview","accounting","reports","settings"].includes(view) ? "" :
    `<button class="button burgundy-button" data-action="admin-create-entity" data-view="${view}">${state.lang === "ar" ? "إضافة جديد" : "Add new"} ＋</button>`);
  const content = {
    overview: () => operationalAdminMarkup("overview"),
    orders: () => operationalAdminMarkup("orders"),
    products: productViewMarkup,
    performance: performanceProductsViewMarkup,
    inventory: inventoryViewMarkup,
    customers: () => operationalAdminMarkup("customers"),
    categories: filtersViewMarkup,
    brands: brandsManagementMarkup,
    "product-options": productOptionsAdminMarkup,
    homepage: homepageRailsAdminMarkup,
    content: bannersViewMarkup,
    coupons: couponsViewMarkup,
    alternatives: alternativesAdminMarkup,
    team: rolesDashboardMarkup,
    activity: activitySecurityMarkup,
    notes: notesViewMarkup,
    accounting: accountingMarkup,
    reports: reportsMarkup,
    settings: storeSettingsDashboardMarkup
    ,"ui-states": systemStatesMarkup
  };
  const dashboardContent = $("#admin-dashboard-content");
  try {
    dashboardContent.innerHTML = content[view] ? content[view]() : genericEntityMarkup(view);
    if (view === "content") initializeBannerManager();
    if (view === "coupons") initializeCouponManager();
    if (view === "activity") initializeActivitySecurity();
    if (view === "brands") initializeBrandsManagement();
  } catch (error) {
    console.error("Admin view render failed:", view, error);
    dashboardContent.innerHTML = `<section class="admin-view-error" role="alert">
      ${luxuryIcon("info")}
      <div><h3>${adminCopy("تعذر فتح هذا القسم", "This section could not be opened")}</h3>
      <p>${adminCopy("أعد المحاولة. إذا استمرت المشكلة فراجع البيانات المحفوظة لهذا القسم.", "Retry. If the issue continues, review this section's saved data.")}</p></div>
      <button class="button burgundy-button" type="button" data-action="admin-view" data-view="${escapeHTML(view)}">${adminCopy("إعادة المحاولة", "Retry")}</button>
    </section>`;
  }
}

function initializeSettingsPanels() {
  const form = $("#admin-settings-form");
  if (!form || form.dataset.panelsReady === "true") return;
  const sections = [...form.children].filter((element) => element.tagName === "SECTION");
  if (!sections.length) return;
  const labelsAr = ["الهوية", "المظهر", "الفوتر", "التواصل", "أيقونات الرئيسية", "مزايا الفوتر", "مكتشف العطر", "الإشعارات", "الاتصالات"];
  const labelsEn = ["Identity", "Appearance", "Footer", "Social", "Homepage icons", "Footer benefits", "Scent finder", "Notifications", "Integrations"];
  const labels = state.lang === "ar" ? labelsAr : labelsEn;
  const nav = document.createElement("nav");
  nav.className = "admin-settings-tabs";
  nav.setAttribute("aria-label", state.lang === "ar" ? "أقسام الإعدادات" : "Settings sections");
  nav.innerHTML = sections.map((section, index) => {
    section.dataset.settingsPanel = String(index);
    section.hidden = index !== 0;
    return `<button type="button" data-action="settings-panel" data-panel="${index}" class="${index === 0 ? "active" : ""}" aria-selected="${index === 0}">${luxuryIcon(["diamond","sparkle","home","globe","grid","gift","perfume","shield","arrows"][index] || "sparkle")}<span>${escapeHTML(labels[index] || `${state.lang === "ar" ? "قسم" : "Section"} ${index + 1}`)}</span></button>`;
  }).join("");
  form.prepend(nav);
  form.dataset.panelsReady = "true";
}

function initializeProductEditorTabs() {
  const form = $("#import-review-form");
  if (!form || form.dataset.productTabsReady === "true") return;
  const sections = [...form.querySelectorAll(":scope > .review-section")].filter((section) => !section.hidden);
  if (!sections.length) return;
  const nav = document.createElement("nav");
  nav.className = "product-editor-tabs";
  nav.setAttribute("aria-label", adminCopy("خطوات بيانات المنتج", "Product data steps"));
  nav.innerHTML = sections.map((section, index) => {
    section.dataset.productPanel = String(index);
    section.classList.toggle("product-tab-hidden", index !== 0);
    const title = section.querySelector(".review-section-head b")?.textContent?.trim() || `${adminCopy("قسم", "Section")} ${index + 1}`;
    return `<button type="button" data-action="product-editor-panel" data-panel="${index}" class="${index === 0 ? "active" : ""}" aria-selected="${index === 0}"><span>${String(index + 1).padStart(2,"0")}</span><b>${escapeHTML(title)}</b></button>`;
  }).join("");
  const anchor = form.querySelector(".review-summary") || form.firstElementChild;
  anchor?.insertAdjacentElement("afterend", nav);
  form.dataset.productTabsReady = "true";
}

function adminSearchMarkup(query) {
  const key = ORIGOCatalog.normalize(query);
  const productMatches = state.products.filter((product) => ORIGOCatalog.normalize(`${product.nameAr} ${product.nameEn} ${product.brand} ${product.sku}`).includes(key)).slice(0, 6);
  const orderMatches = state.adminOrders.filter((order) => ORIGOCatalog.normalize(`${order.orderNumber} ${order.customerName} ${order.phone}`).includes(key)).slice(0, 6);
  const customerMatches = customerRows().filter((customer) => ORIGOCatalog.normalize(`${customer.name} ${customer.phone}`).includes(key)).slice(0, 6);
  return `<section class="admin-search-results"><div class="notes-results-head"><div><span class="eyebrow">GLOBAL SEARCH</span><h2>${state.lang === "ar" ? "نتائج البحث" : "Search results"}</h2></div>
    <b>${productMatches.length + orderMatches.length + customerMatches.length}</b></div>
    <div>${productMatches.map((product) => `<button data-action="edit-admin-product" data-id="${escapeHTML(product.id)}"><span>◇</span><div><b>${escapeHTML(product.nameAr || product.nameEn)}</b><small>${escapeHTML(product.brand)} · ${escapeHTML(product.sku || "")}</small></div><i>${state.lang === "ar" ? "منتج" : "Product"}</i></button>`).join("")}
    ${orderMatches.map((order) => `<button data-action="admin-view" data-view="orders"><span>▤</span><div><b>${escapeHTML(order.orderNumber)}</b><small>${escapeHTML(order.customerName)} · ${formatPrice(order.total)}</small></div><i>${state.lang === "ar" ? "طلب" : "Order"}</i></button>`).join("")}
    ${customerMatches.map((customer) => `<button data-action="admin-view" data-view="customers"><span>♙</span><div><b>${escapeHTML(customer.name)}</b><small>${escapeHTML(customer.phone)}</small></div><i>${state.lang === "ar" ? "عميل" : "Customer"}</i></button>`).join("")}</div></section>`;
}

function exportAdminReport(report, format = "csv") {
  let rows = [];
  if (report === "orders") rows = state.adminOrders.map((order) => ({
    order: order.orderNumber, customer: order.customerName, phone: order.phone,
    status: order.status, total: order.total, createdAt: order.createdAt
  }));
  else if (report === "inventory") rows = state.products.map((product) => ({
    sku: product.sku, product: product.nameEn || product.nameAr,
    ...inventoryForProduct(product)
  }));
  else if (report === "products") rows = state.products.map((product) => ({
    id: product.id, sku: product.sku, product: product.nameEn || product.nameAr,
    brand: product.brand, price: product.price, status: product.status
  }));
  else if (report === "customers") rows = customerRows();
  else if (report === "campaigns") rows = state.adminWorkspace.campaigns;
  else if (report === "shipping") rows = state.adminWorkspace.shipping;
  else if (report === "activity") rows = state.adminActivity.length ? state.adminActivity : [{ date: "2024-05-19", user: "أحمد محمد", action: "تعديل منتج", result: "نجاح" }, { date: "2024-05-18", user: "مستخدم غير معروف", action: "محاولة دخول", result: "فشل" }];
  else if (report === "brands") rows = [...new Set(state.products.map((product)=>product.brand).filter(Boolean))].map((brand)=>({ brand, products: state.products.filter((product)=>product.brand===brand).length, status:"active" }));
  else rows = genericRowsFor(report);
  if (!rows.length) {
    showToast(adminCopy("لا توجد بيانات لتصديرها بعد", "There is no data to export yet"));
    return;
  }
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  if (format === "pdf") {
    const popup = window.open("", "_blank", "width=1000,height=900");
    if (!popup) return showToast(adminCopy("اسمح بالنوافذ المنبثقة للطباعة", "Allow popups to print"));
    popup.document.write(`<!doctype html><meta charset="utf-8"><title>ORIGO ${escapeHTML(report)}</title><style>body{font-family:Arial;padding:30px}table{width:100%;border-collapse:collapse}th,td{padding:8px;border:1px solid #ddd;text-align:start}h1{color:#6d1628}</style><h1>ORIGO · ${escapeHTML(report.toUpperCase())}</h1><table><thead><tr>${headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((header) => `<td>${escapeHTML(String(row[header] ?? ""))}</td>`).join("")}</tr>`).join("")}</tbody></table><script>window.onload=()=>window.print()<\/script>`);
    popup.document.close();
    return;
  }
  if (format === "xls") {
    const html = `\uFEFF<table><thead><tr>${headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((header) => `<td>${escapeHTML(String(row[header] ?? ""))}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `origo-${report}-${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    URL.revokeObjectURL(url);
    return showToast(adminCopy("تم تجهيز ملف Excel", "Excel file prepared"));
  }
  const escapeCSV = (value) => `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
  const csvText = "\uFEFF" + [headers.map(escapeCSV).join(","), ...rows.map((row) => headers.map((header) => escapeCSV(row[header])).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob([csvText], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `origo-${report}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast(adminCopy("تم تجهيز ملف التقرير", "Report file prepared"));
}

function passwordFieldMarkup({ name = "password", autocomplete = "current-password", label, required = true } = {}) {
  return `<label class="wide"><span>${label}</span><div class="password-field"><input name="${name}" type="password" autocomplete="${autocomplete}"${required ? " required" : ""} minlength="10" maxlength="200" dir="ltr"/><button type="button" data-action="toggle-password" aria-label="${state.lang === "ar" ? "إظهار كلمة المرور" : "Show password"}" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></svg></button></div></label>`;
}

async function loadPasswordResetChannels() {
  try {
    const result = await api("/api/auth/password-reset/channels");
    state.resetChannels = { email: false, whatsapp: false, sms: false, ...(result.channels || {}) };
  } catch {
    state.resetChannels = { email: false, whatsapp: false, sms: false };
  }
  return state.resetChannels;
}

function renderPasswordRecovery(mode = "reset-request", context = {}) {
  state.passwordResetFlow = { ...state.passwordResetFlow, ...context };
  const flow = state.passwordResetFlow;
  const channels = Object.entries(state.resetChannels || {}).filter(([, enabled]) => enabled).map(([id]) => id);
  const logo = escapeHTML(state.adminWorkspace.settings.logos?.dark || defaultStoreSettings.logos.dark);
  const status = {
    "reset-sent": ["✉", "تم إرسال رمز التحقق", `تم إرسال رمز التحقق إلى ${escapeHTML(flow.identifier || "بريدك الإلكتروني")}`],
    "reset-success": ["✓", "تم تحديث كلمة المرور", "يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة"],
    "reset-expired": ["◷", "انتهت صلاحية الرابط أو الرمز", "للأمان، رابط التحقق أو الرمز منتهي الصلاحية."],
    "reset-error": ["▣", "رمز تحقق غير صحيح", "الرمز الذي أدخلته غير صحيح. يرجى المحاولة مرة أخرى"],
    "reset-locked": ["♜", "تم تجاوز الحد المسموح للمحاولات", "تم تعطيل التحقق مؤقتاً لأسباب أمنية."]
  }[mode];
  let body = "";
  if (mode === "reset-request") body = `<form id="password-reset-request-form" class="recovery-step-form"><img src="${logo}" alt="ORIGO"/><p>أدخل بريدك الإلكتروني أو رقم هاتفك وسنرسل لك رمز التحقق</p><label>البريد الإلكتروني<div class="recovery-field"><input name="identifier" required placeholder="example@mail.com" dir="ltr"/>✉</div></label>${channels.length ? `<fieldset class="recovery-channel-options">${channels.map((id,i)=>`<label><input type="radio" name="channel" value="${id}"${i===0?" checked":""}/>${{email:"البريد الإلكتروني",whatsapp:"WhatsApp",sms:"SMS"}[id]}</label>`).join("")}</fieldset>` : `<p class="recovery-inline-error">لا توجد قناة استعادة مهيأة حاليًا</p>`}<p id="auth-error" class="form-error"></p><button class="recovery-primary" type="submit"${channels.length?"":" disabled"}>إرسال رمز التحقق</button><button type="button" class="recovery-link" data-action="auth-mode" data-mode="login">تذكرت كلمة المرور؟ تسجيل الدخول</button></form>`;
  else if (mode === "reset-sent") body = `<div class="recovery-status sent"><i>${status[0]}</i><h3>${status[1]}</h3><p>${status[2]}</p><div class="recovery-notice">قد يستغرق وصول الرمز بضع دقائق.<br/>يرجى التحقق من صندوق الوارد أو البريد غير المرغوب.</div><button class="recovery-primary" data-action="show-reset-code">إدخال الرمز</button></div>`;
  else if (mode === "reset-code") body = `<form id="password-reset-code-form" class="recovery-step-form"><img src="${logo}" alt="ORIGO"/><p>أدخل رمز التحقق المرسل إلى<br/><b>${escapeHTML(flow.identifier)}</b></p><div class="otp-inputs" dir="ltr">${Array.from({length:6},(_,i)=>`<input name="digit${i}" inputmode="numeric" maxlength="1" required/>`).join("")}</div><small>لم يصلك الرمز؟</small><button type="button" class="recovery-link" data-action="restart-password-reset">إعادة إرسال الرمز</button><p id="auth-error" class="form-error"></p><button class="recovery-primary" type="submit">تحقق من الرمز</button></form>`;
  else if (mode === "reset-password") body = `<form id="password-reset-password-form" class="recovery-step-form"><img src="${logo}" alt="ORIGO"/><h3>إنشاء كلمة مرور جديدة</h3>${passwordFieldMarkup({name:"password",autocomplete:"new-password",label:"كلمة المرور الجديدة"})}<ul class="password-rules"><li>على الأقل 10 أحرف</li><li>حرف كبير وحرف صغير</li><li>رقم واحد على الأقل</li><li>رمز خاص واحد</li></ul>${passwordFieldMarkup({name:"confirmPassword",autocomplete:"new-password",label:"تأكيد كلمة المرور"})}<p id="auth-error" class="form-error"></p><button class="recovery-primary" type="submit">حفظ كلمة المرور</button></form>`;
  else body = `<div class="recovery-status ${mode}"><i>${status[0]}</i><h3>${status[1]}</h3><p>${status[2]}</p>${mode === "reset-locked" ? `<div class="recovery-notice">◷ الوقت المتبقي للمحاولة: 14:55</div>` : `<button class="recovery-primary" data-action="${mode === "reset-success" ? "auth-mode" : "restart-password-reset"}" data-mode="login">${mode === "reset-success" ? "تسجيل الدخول الآن" : "طلب رمز جديد"}</button>`}</div>`;
  const step = {"reset-request":0,"reset-sent":2,"reset-code":3,"reset-password":4,"reset-success":4}[mode] ?? 3;
  $("#account-content").innerHTML = `<div class="password-recovery-shell" dir="rtl"><header><h2>نسيت كلمة المرور</h2><p>استعادة حسابك بخطوات بسيطة وآمنة</p></header><div class="recovery-progress">${["طلب الاستعادة","طريقة التحقق","إرسال الرمز","رمز التحقق","كلمة مرور جديدة"].map((label,i)=>`<span class="${i<=step?"active":""}"><b>${i+1}</b>${label}</span>`).join("")}</div><main>${body}</main><footer>🔒 جميع الرموز وروابط التحقق مشفرة وتنتهي صلاحيتها بعد مدة محدودة</footer></div>`;
  applyStoreIdentity();
}

function renderAuth(mode = "login", requestId = "") {
  if (String(mode).startsWith("reset-")) return renderPasswordRecovery(mode, requestId ? { requestId } : {});
  const isRegister = mode === "register";
  const isResetRequest = mode === "reset-request";
  const isResetConfirm = mode === "reset-confirm";
  const ar = state.lang === "ar";
  const resetTitle = isResetRequest ? (ar ? "استعادة كلمة المرور" : "Reset your password") : (ar ? "أدخل رمز التحقق" : "Enter verification code");
  const resetBody = isResetRequest ? (ar ? "اختر قناة الاستعادة، ثم أدخل بريدك أو رقم هاتفك المسجل." : "Choose a recovery channel, then enter your registered email or phone.") : (ar ? "أدخل الرمز المكوّن من 6 أرقام وكلمة المرور الجديدة." : "Enter the 6-digit code and your new password.");
  const recoveryLabels = { email: ar ? "البريد الإلكتروني" : "Email", whatsapp: "WhatsApp", sms: "SMS" };
  const recoveryIcons = { email: "✉", whatsapp: "◉", sms: "▤" };
  const activeRecoveryChannels = Object.entries(state.resetChannels || {}).filter(([, enabled]) => enabled).map(([id]) => id);
  const recoveryChannelsMarkup = activeRecoveryChannels.length
    ? `<fieldset class="reset-channels"><legend>${ar ? "طريقة إرسال الرمز" : "Send code through"}</legend>${activeRecoveryChannels.map((id, index) => `<label><input type="radio" name="channel" value="${id}"${index === 0 ? " checked" : ""}/><span>${recoveryIcons[id]} ${recoveryLabels[id]}</span></label>`).join("")}</fieldset>`
    : `<p class="recovery-unavailable" role="status">${ar ? "لا توجد قناة استعادة مهيأة حاليًا. تواصل مع دعم ORIGO." : "No recovery channel is configured. Please contact ORIGO support."}</p>`;
  $("#account-content").innerHTML = `
    <div class="auth-shell">
      <div class="auth-art">
        <img class="auth-store-logo" data-store-logo data-logo-variant="dark" src="${escapeHTML(state.adminWorkspace.settings.logos?.dark || defaultStoreSettings.logos.dark)}" alt="ORIGO" />
        <span class="eyebrow light">ORIGO PRIVATE CIRCLE</span>
        <h2>${ar ? "اختياراتك،<br>محفوظة لك." : "Your choices,<br>kept close."}</h2>
        <p>${ar ? "احفظ حقيبتك وتابع طلباتك من أي جهاز." : "Keep your bag and follow every order from any device."}</p>
      </div>
      <div class="auth-body">
        <div class="auth-tabs"${isResetRequest || isResetConfirm ? " hidden" : ""}>
          <button type="button" data-action="auth-mode" data-mode="login" class="${isRegister ? "" : "active"}">${ar ? "تسجيل الدخول" : "Sign in"}</button>
          <button type="button" data-action="auth-mode" data-mode="register" class="${isRegister ? "active" : ""}">${ar ? "حساب جديد" : "Create account"}</button>
        </div>
        <form class="commerce-form" id="${isResetRequest ? "password-reset-request-form" : isResetConfirm ? "password-reset-confirm-form" : "auth-form"}" data-mode="${isRegister ? "register" : "login"}">
          <span class="eyebrow">${isResetRequest || isResetConfirm ? "ORIGO SECURE RECOVERY" : isRegister ? (ar ? "انضم إلى ORIGO" : "JOIN ORIGO") : (ar ? "مرحبًا بعودتك" : "WELCOME BACK")}</span>
          <h2 id="account-title">${isResetRequest || isResetConfirm ? resetTitle : isRegister ? (ar ? "أنشئ حسابك" : "Create your account") : (ar ? "سجّل الدخول" : "Sign in")}</h2>
          <p>${isResetRequest || isResetConfirm ? resetBody : isRegister
            ? (ar ? "بيانات قليلة، وتجربة تسوق أسهل." : "A few details for a smoother shopping experience.")
            : (ar ? "أدخل بياناتك لمتابعة حقيبتك وطلباتك." : "Sign in to continue with your bag and orders.")}</p>
          <div class="commerce-fields">
            ${isResetRequest ? `<label class="wide"><span>${ar ? "البريد أو رقم الهاتف المسجل" : "Registered email or phone"}</span><input name="identifier" autocomplete="username" required maxlength="254" dir="ltr" /></label>${recoveryChannelsMarkup}` : isResetConfirm ? `<input type="hidden" name="requestId" value="${escapeHTML(requestId)}"/><label class="wide"><span>${ar ? "رمز التحقق" : "Verification code"}</span><input name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required dir="ltr"/></label>${passwordFieldMarkup({ autocomplete: "new-password", label: ar ? "كلمة المرور الجديدة" : "New password" })}` : `${isRegister ? `<label class="wide"><span>${ar ? "الاسم" : "Name"}</span><input name="name" autocomplete="name" required minlength="2" maxlength="100" /></label>` : ""}<label class="wide"><span>${ar ? "البريد الإلكتروني" : "Email address"}</span><input name="email" type="email" autocomplete="email" required maxlength="254" dir="ltr" /></label>${isRegister ? `<label class="wide"><span>${ar ? "رقم الهاتف (اختياري)" : "Phone (optional)"}</span><input name="phone" autocomplete="tel" inputmode="tel" dir="ltr" /></label>` : ""}${passwordFieldMarkup({ autocomplete: isRegister ? "new-password" : "current-password", label: ar ? "كلمة المرور" : "Password" })}`}
          </div>
          <p class="form-error" id="auth-error" role="alert"></p>
          <button class="button burgundy-button full" type="submit"${isResetRequest && !activeRecoveryChannels.length ? " disabled" : ""}>${isResetRequest ? (ar ? "إرسال رمز الاستعادة" : "Send recovery code") : isResetConfirm ? (ar ? "تعيين كلمة المرور" : "Set new password") : isRegister ? (ar ? "إنشاء الحساب" : "Create account") : (ar ? "دخول" : "Sign in")}</button>
          ${!isRegister && !isResetRequest && !isResetConfirm ? `<button class="auth-text-action" type="button" data-action="auth-mode" data-mode="reset-request">${ar ? "نسيت كلمة المرور؟" : "Forgot password?"}</button>` : ""}
          ${isResetRequest || isResetConfirm ? `<button class="auth-text-action" type="button" data-action="auth-mode" data-mode="login">${ar ? "العودة لتسجيل الدخول" : "Back to sign in"}</button>` : ""}
        </form>
      </div>
    </div>`;
  applyStoreIdentity();
}

async function renderAccount() {
  if (!state.user) {
    renderAuth("login");
    return;
  }
  const ar = state.lang === "ar";
  const initial = escapeHTML(state.user.name.trim().charAt(0).toUpperCase() || "O");
  $("#account-content").innerHTML = `
    <div class="account-home">
      <span class="eyebrow">${ar ? "حساب ORIGO" : "ORIGO ACCOUNT"}</span>
      <h2 id="account-title">${ar ? "أهلًا" : "Welcome"}, ${escapeHTML(state.user.name)}</h2>
      <p class="account-intro">${ar ? "من هنا تتابع طلباتك وتعود إلى اختياراتك." : "Follow your orders and return to your saved choices here."}</p>
      <div class="account-profile">
        <span class="account-avatar">${initial}</span>
        <div><b>${escapeHTML(state.user.name)}</b><span dir="ltr">${escapeHTML(state.user.email)}</span>${state.user.phone ? `<span dir="ltr">${escapeHTML(state.user.phone)}</span>` : ""}</div>
      </div>
      <div class="account-actions">
        ${isStaffUser() ? `<button class="button burgundy-button" data-action="open-admin">${ar ? "إدارة المتجر" : "Manage store"}</button>` : ""}
        <button class="button secondary-button" data-action="logout">${ar ? "تسجيل الخروج" : "Sign out"}</button>
      </div>
      <div class="account-orders">
        <h3>${ar ? "طلباتي" : "My orders"}</h3>
        <div id="account-orders-list"><div class="orders-loading">${ar ? "نحمّل طلباتك…" : "Loading your orders…"}</div></div>
      </div>
    </div>`;
  try {
    const result = await api("/api/orders");
    state.orders = result.orders || [];
    const list = $("#account-orders-list");
    if (list) list.innerHTML = renderOrders(state.orders);
  } catch (error) {
    const list = $("#account-orders-list");
    if (list) list.innerHTML = `<div class="orders-empty">${escapeHTML(error.message)}</div>`;
  }
}

function openAccount(mode = "login", pendingAction = "") {
  state.pendingAction = pendingAction;
  if (state.user) renderAccount();
  else renderAuth(mode);
  openOverlay("#account-overlay");
}

const orderStatuses = {
  received: ["تم استلام الطلب", "Order received"],
  processing: ["قيد التجهيز", "Processing"],
  ready_to_ship: ["جاهز للشحن", "Ready to ship"],
  shipped: ["تم الشحن", "Shipped"],
  out_for_delivery: ["خرج للتسليم", "Out for delivery"],
  delivered: ["تم التسليم", "Delivered"],
  cancelled: ["تم إلغاء الطلب", "Cancelled"],
  returned: ["تم إرجاع الطلب", "Returned"]
};

function orderStatusLabel(status) {
  const labels = orderStatuses[status] || [status, status];
  return state.lang === "ar" ? labels[0] : labels[1];
}

function renderOrders(orders, admin = false) {
  const ar = state.lang === "ar";
  if (!orders.length) {
    return `<div class="orders-empty">${admin
      ? (ar ? "لا توجد طلبات حتى الآن." : "No store orders yet.")
      : (ar ? "لم تنشئ أي طلب بعد." : "You have not placed an order yet.")}</div>`;
  }
  return orders.map((order) => {
    const products = (order.items || []).map((item) => `${item.quantity}× ${item.productName}`).join(" · ");
    const date = new Intl.DateTimeFormat(ar ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" })
      .format(new Date(String(order.createdAt).replace(" ", "T") + (String(order.createdAt).includes("Z") ? "" : "Z")));
    return `<article class="order-card">
      <div class="order-card-head">
        <div><b dir="ltr">${escapeHTML(order.orderNumber)}</b><small>${escapeHTML(date)}</small></div>
        <i class="order-status">${escapeHTML(orderStatusLabel(order.status))}</i>
      </div>
      <div class="order-card-body">
        <p>${escapeHTML(products)}</p><strong>${formatPrice(order.total)}</strong>
        ${admin ? `<div class="order-admin-meta">
          <span>${escapeHTML(order.customerName)} · <bdi>${escapeHTML(order.phone)}</bdi> · ${escapeHTML(order.governorate)}<br>${escapeHTML(order.address)}</span>
          <select data-action="order-status" data-id="${order.id}" aria-label="${ar ? "تغيير حالة الطلب" : "Change order status"}">
            ${Object.keys(orderStatuses).map((status) => `<option value="${status}"${status === order.status ? " selected" : ""}>${escapeHTML(orderStatusLabel(status))}</option>`).join("")}
          </select>
        </div>` : ""}
      </div>
    </article>`;
  }).join("");
}

async function openAdminOrders() {
  const ar = state.lang === "ar";
  const list = $("#admin-orders-list");
  list.innerHTML = `<div class="orders-loading">${ar ? "نحمّل الطلبات…" : "Loading orders…"}</div>`;
  openOverlay("#admin-orders-overlay");
  try {
    const result = await api("/api/admin/orders");
    state.adminOrders = result.orders || [];
    list.innerHTML = renderOrders(state.adminOrders, true);
  } catch (error) {
    list.innerHTML = `<div class="orders-empty">${escapeHTML(error.message)}</div>`;
  }
}

let checkoutFormMarkup = "";
function translateWithin(root) {
  $$("[data-i18n]", root).forEach((node) => {
    const value = translations[state.lang][node.dataset.i18n];
    if (value) node.innerHTML = value;
  });
}

function renderCheckout() {
  const grid = $("#checkout-overlay .checkout-grid");
  if (!$("#checkout-form")) {
    grid.innerHTML = checkoutFormMarkup;
    translateWithin(grid);
  }
  const form = $("#checkout-form");
  const paymentChoice = form.querySelector(".payment-choice");
  if (paymentChoice) {
    paymentChoice.innerHTML = state.publicIntegrations.paymobAvailable
      ? `<span>✓</span><label><b>${state.lang === "ar" ? "طريقة الدفع" : "Payment method"}</b><select name="paymentProvider"><option value="cod">${state.lang === "ar" ? "الدفع عند الاستلام" : "Cash on delivery"}</option><option value="paymob">${state.lang === "ar" ? "بطاقة أو محفظة عبر Paymob" : "Card or wallet via Paymob"}</option></select></label>`
      : `<span>✓</span><div><b>${translations[state.lang].cashOnDelivery}</b><small>${translations[state.lang].cashOnDeliveryBody}</small></div><input type="hidden" name="paymentProvider" value="cod" />`;
  }
  form.elements.name.value = state.user?.name || "";
  form.elements.phone.value = state.user?.phone || "";
  const items = state.cart.map((item) => ({ item, product: getProduct(item.id) })).filter(({ product }) => product);
  $("#checkout-items").innerHTML = items.map(({ item, product }) => `
    <article class="checkout-summary-item">
      <img src="${escapeHTML(product.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt="" />
      <div><b>${escapeHTML(localizedProductName(product))}</b><small>${item.quantity} × ${formatPrice(product.price)}</small></div>
      <strong>${formatPrice(product.price * item.quantity)}</strong>
    </article>`).join("");
  $("#checkout-total").textContent = formatPrice(items.reduce((sum, { item, product }) => sum + item.quantity * product.price, 0));
}

function openCheckout() {
  if (!state.cart.length) {
    showToast(state.lang === "ar" ? "السلة فارغة." : "Your cart is empty.");
    return;
  }
  toggleCart(false);
  if (window.ORIGOCommerce?.openCheckout) window.ORIGOCommerce.openCheckout();
  else window.location.assign("/checkout");
}

function updateLanguage() {
  const isArabic = state.lang === "ar";
  document.documentElement.lang = state.lang;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  $$("[data-i18n]").forEach((node) => {
    const value = translations[state.lang][node.dataset.i18n];
    if (value) node.innerHTML = value;
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    const value = translations[state.lang][node.dataset.i18nPlaceholder];
    if (value) node.placeholder = value;
  });
  const languageButton = $(".lang-button[data-action='language']");
  if (languageButton) {
    languageButton.textContent = isArabic ? "English ◎" : "العربية ◎";
    languageButton.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
  }
  const currencyLabel = $("#current-currency");
  if (currencyLabel) currencyLabel.textContent = isArabic ? "ج.م" : "EGP";
  document.title = isArabic ? "ORIGO | أصل الحكاية العطرية" : "ORIGO | The origin of scent";
  renderHomeNavigation();
  localizeStaticStorefront();
  renderHomeHero();
  renderBrandCarousel($("#brand-carousel-search")?.value || "");
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderHomepageCommerce();
  renderSiteFooter();
  renderCart();
  renderWishlist();
  renderCatalogList();
  refreshAIStatus();
  updateAccountIndicator();
  if ($("#account-overlay").classList.contains("open")) {
    if (state.user) renderAccount();
    else renderAuth($("#auth-form")?.dataset.mode || "login");
  }
  if ($("#checkout-overlay").classList.contains("open") && state.user && state.cart.length) renderCheckout();
  if ($("#admin-orders-overlay").classList.contains("open")) $("#admin-orders-list").innerHTML = renderOrders(state.adminOrders, true);
  if (state.globalSearchQuery) renderSearchSuggestions(state.globalSearchQuery);
  if ($("#product-overlay").classList.contains("open") && state.activeProductId) {
    showProductDetails(getProduct(state.activeProductId), false);
  }
  if (document.body.classList.contains("notes-route")) handleNotesRoute({ replace: true });
  if (document.body.classList.contains("catalog-route")) renderCatalog({ skeleton: false });
  renderSiteFooter();
  if (document.body.classList.contains("benefit-route")) handleBenefitRoute({ replace: true });
  if (document.body.classList.contains("benefits-route")) handleBenefitsRoute({ replace: true });
  if ($("#notes-admin-overlay").classList.contains("open")) renderNotesAdmin();
  if ($("#admin-overlay").classList.contains("open")) renderAdminDashboard(state.adminView);
  applyHomepageRailSettings();
  localStorage.setItem("origoLang", state.lang);
}

function setupTheme() {
  state.theme = "light";
  document.documentElement.dataset.theme = "light";
  document.documentElement.style.colorScheme = "light";
  document.body.classList.remove("dark");
  $$("[data-action='theme']").forEach((button) => button.remove());
  applyStoreIdentity();
  localStorage.removeItem("origoTheme");
}

function localizeStaticStorefront() {
  const ar = state.lang === "ar";
  const setText = (selector, arabic, english) => {
    const node = $(selector);
    if (node) node.textContent = ar ? arabic : english;
  };
  const setHTML = (selector, arabic, english) => {
    const node = $(selector);
    if (node) node.innerHTML = ar ? arabic : english;
  };
  setHTML("#home-hero-title", "اكتشف عالم العطور<br><em>الفاخرة</em>", "Discover the world of<br><em>luxury fragrance</em>");
  setText("#home-hero .home-hero-copy>p", "نخبة مختارة من أفضل الماركات العالمية", "A curated selection from leading global brands");
  setText("#home-hero .home-primary-button span", "تسوق الآن", "Shop now");
  setText("#new-arrivals-title", "المنتجات الحديثة", "New arrivals");
  setText(".home-new-arrivals .home-section-head>a span:first-child", "عرض باقي المنتجات الحديثة", "View all new arrivals");
  setText("#home-benefits-title", "مميزاتنا", "Our benefits");
  setText("#home-gender-title", "تسوّق حسب الجنس", "Shop by gender");
  renderHomeBenefitsMarquee();
  const genderCards = [
    ["للرجال", "عطور تعكس القوة والأناقة والثقة", "Men", "Fragrances of strength, elegance, and confidence"],
    ["للنساء", "عطور تمنحك الجمال والجاذبية", "Women", "Fragrances of beauty and allure"],
    ["للجنسين", "عطور تناسب الجميع بلا حدود", "Unisex", "Fragrances made for everyone"]
  ];
  $$(".home-gender-card").forEach((card, index) => {
    const copy = genderCards[index];
    if (!copy) return;
    const title = $(".gender-card-copy b", card);
    const description = $(".gender-card-copy small", card);
    const image = $(".gender-card-art img", card);
    if (title) title.textContent = ar ? copy[0] : copy[2];
    if (description) description.textContent = ar ? copy[1] : copy[3];
    if (image) image.alt = ar ? `مجموعة عطور ${copy[0]}` : `${copy[2]} fragrance collection`;
    card.setAttribute("aria-label", ar ? `تسوق عطور ${copy[0]}` : `Shop ${copy[2].toLowerCase()} fragrances`);
  });
  const genders = [
    ["للرجال", "عطور تعكس القوة والأناقة والثقة", "Men", "Fragrances of strength, elegance, and confidence"],
    ["للنساء", "عطور تجمع بين الأنوثة والرقي والجاذبية", "Women", "Fragrances of femininity, refinement, and allure"],
    ["للجنسين", "عطور تناسب جميع الأذواق والمناسبات", "Unisex", "Versatile fragrances for every taste and occasion"]
  ];
  $$(".gender-card .gender-copy").forEach((item, index) => {
    const copy = genders[index];
    if (!copy) return;
    const title = $("h3", item);
    const description = $("p", item);
    const link = $("a", item);
    if (title) title.textContent = ar ? copy[0] : copy[2];
    if (description) description.textContent = ar ? copy[1] : copy[3];
    if (link) link.childNodes[0].textContent = `${ar ? "تسوق الآن" : "Shop now"} `;
  });
  const brandSearch = $("#brand-carousel-search");
  if (brandSearch) brandSearch.placeholder = ar ? "ابحث عن علامة تجارية" : "Search brands";
  setupTheme();
}

function productFilterValues(product, key) {
  const values = {
    notes: [...(product.notesAr || []), ...(product.notesEn || [])],
    family: [state.lang === "ar" ? product.familyAr : product.familyEn],
    brand: [product.brand],
    concentration: [product.concentration],
    gender: [product.gender || product.typeEn || product.type],
    size: product.sizes || [],
    origin: [state.lang === "ar" ? product.originCountryAr : product.originCountryEn],
    season: product.seasons || [],
    occasion: product.occasions || [],
    personality: product.personalities || [],
    longevity: [product.performance?.longevity],
    projection: [product.performance?.projection || product.performance?.sillage]
  }[key];
  const custom = product.filters?.[key];
  return (values || (Array.isArray(custom) ? custom : [custom])).filter((value) => value !== "" && value != null);
}

function renderDynamicFilters() {
  const bar = $("#dynamic-filter-bar");
  if (!bar) return;
  const category = state.storefrontCategory === "all" ? "perfume" : state.storefrontCategory;
  const definitions = state.filterDefinitions.filter((filter) => filter.category === category && filter.visible);
  bar.innerHTML = definitions.map((filter) => {
    const supplied = filter.options || [];
    const derived = state.products
      .filter((product) => product.category === category)
      .flatMap((product) => productFilterValues(product, filter.key));
    const options = [...new Set([...supplied, ...derived].map(String).filter(Boolean))].slice(0, 80);
    if (!options.length || ["range", "text"].includes(filter.inputType)) return "";
    const selected = state.activeDynamicFilters[filter.key] || "";
    return `<label><span>${escapeHTML(state.lang === "ar" ? filter.labelAr : filter.labelEn)}</span><select data-dynamic-filter="${escapeHTML(filter.key)}"><option value="">${state.lang === "ar" ? "الكل" : "All"}</option>${options.map((option) => `<option value="${escapeHTML(option)}"${String(selected) === option ? " selected" : ""}>${escapeHTML(option)}</option>`).join("")}</select></label>`;
  }).join("");
  bar.hidden = !bar.children.length;
}

function renderBrandCarousel(query = "") {
  const normalized = ORIGOCatalog.normalize(query);
  const counts = new Map();
  state.products.forEach((product) => {
    const brand = String(product.brand || "ORIGO").trim();
    counts.set(brand, (counts.get(brand) || 0) + 1);
  });
  const catalogNames = [...ORIGO_PERFUME_BRANDS, ...counts.keys()].filter((brand, index, values) =>
    values.findIndex((candidate) => ORIGOCatalog.normalize(candidate) === ORIGOCatalog.normalize(brand)) === index
  );
  const mobile = matchMedia("(max-width: 700px)").matches;
  const brands = catalogNames.map((brand) => [brand, counts.get(brand) || 0])
    .filter(([brand]) => !normalized || ORIGOCatalog.normalize(brand).includes(normalized));
  const visibleBrands = mobile && !normalized ? brands.slice(0, 12) : brands;
  const brandOptions = productOptionItems("brand");
  const items = visibleBrands.map(([brand, count]) => {
    const option = brandOptions.find((item) => [item.value,item.nameAr,item.nameEn].some((value) => normalizeOptionSearch(value) === normalizeOptionSearch(brand)));
    const logo = option?.image || origoBrandLogo(brand);
    const artwork = logo ? `<img src="${escapeHTML(logo)}" alt="" loading="lazy"/>` : `<span aria-hidden="true">${escapeHTML(brand.slice(0, 2).toUpperCase())}</span>`;
    return `<button class="marquee-item" data-action="brand-search" data-query="${escapeHTML(brand)}" aria-label="${escapeHTML(`${state.lang === "ar" ? "عرض منتجات" : "View products by"} ${brand}`)}">${artwork}<b>${escapeHTML(brand)}</b></button>`;
  }).join("");
  const duplicateItems = items.replaceAll("<button ", '<button tabindex="-1" ');
  $$("#brand-carousel-track, #home-brand-carousel-track").forEach((track) => {
    track.innerHTML = items ? `<div class="brand-marquee-content"><div class="brand-marquee-set">${items}</div><div class="brand-marquee-set" aria-hidden="true">${duplicateItems}</div></div>` : "";
    bindBrandMarquee(track);
  });
}

function renderHomeBenefitsMarquee() {
  const track = $("#home-benefits-track");
  if (!track) return;
  const benefits = activeFooterBenefits();
  const items = benefits.map((benefit) => {
    const title = state.lang === "ar" ? benefit.titleAr : benefit.titleEn;
    const short = state.lang === "ar" ? benefit.shortAr : benefit.shortEn;
    return `<a class="marquee-item benefit-marquee-item" href="/benefits/${escapeHTML(benefit.slug)}" data-action="benefit-link" data-slug="${escapeHTML(benefit.slug)}"><span class="benefit-icon">${benefit.image ? `<img src="${escapeHTML(benefit.image)}" alt="" loading="lazy"/>` : footerBenefitIcon(benefit.icon, benefit.colors)}</span><b>${escapeHTML(title)}</b><small>${escapeHTML(short || "")}</small></a>`;
  }).join("");
  const duplicates = items.replaceAll("<a ", '<a tabindex="-1" aria-hidden="true" ');
  const benefitSetCount = Math.max(4, Math.ceil(12 / Math.max(benefits.length, 1)) + 1);
  const benefitShift = 100 / benefitSetCount;
  track.innerHTML = items ? `<div class="brand-marquee-content benefit-marquee-content" style="--benefit-marquee-shift:-${benefitShift}%;--benefit-marquee-shift-rtl:${benefitShift}%"><div class="brand-marquee-set benefit-marquee-set">${items}</div>${Array.from({ length: benefitSetCount - 1 }, () => `<div class="brand-marquee-set benefit-marquee-set" aria-hidden="true">${duplicates}</div>`).join("")}</div>` : "";
  bindBrandMarquee(track);
}

function renderHomeNavigation() {
  const brandMenu = $("#header-brands-dropdown");
  if (brandMenu) brandMenu.innerHTML = `<div class="mega-dropdown-heading"><small>${state.lang === "ar" ? "دليل العلامات التجارية" : "Brand directory"}</small><a href="/brands" data-action="open-brands-page">${state.lang === "ar" ? "عرض جميع العلامات" : "View all brands"}</a></div>${ORIGO_PERFUME_BRANDS.map((brand) => `<button data-action="brand-search" data-query="${escapeHTML(brand)}"><span>${escapeHTML(brand)}</span><i>‹</i></button>`).join("")}`;
  const categoryMenu = $("#header-categories-dropdown");
  if (categoryMenu) categoryMenu.innerHTML = `<div class="mega-dropdown-heading"><small>${state.lang === "ar" ? "تسوق حسب الفئة" : "Shop by category"}</small><b>${ORIGO_HOME_CATEGORIES.length} ${state.lang === "ar" ? "فئات" : "categories"}</b></div>${ORIGO_HOME_CATEGORIES.map(([key, ar, en, icon]) => `<button data-action="catalog-category" data-category="${key}"><i>${icon}</i><span>${state.lang === "ar" ? ar : en}</span><b>‹</b></button>`).join("")}`;
  const mobileBrandList = $("#mobile-brands-list");
  if (mobileBrandList) mobileBrandList.innerHTML = ORIGO_PERFUME_BRANDS.map((brand) => `<button data-action="brand-search" data-query="${escapeHTML(brand)}"><span>${escapeHTML(brand)}</span><i>‹</i></button>`).join("");
  const mobileCategoryList = $("#mobile-categories-list");
  if (mobileCategoryList) mobileCategoryList.innerHTML = ORIGO_HOME_CATEGORIES.map(([key, ar, en, icon]) => `<button data-action="catalog-category" data-category="${key}"><i>${icon}</i><span>${state.lang === "ar" ? ar : en}</span><b>‹</b></button>`).join("");
  const mobile = $(".mobile-brands > div");
  if (mobile) mobile.innerHTML = ORIGO_PERFUME_BRANDS.map((brand) => `<button data-action="brand-search" data-query="${escapeHTML(brand)}">${escapeHTML(brand)}</button>`).join("");
}

let homeHeroTimer;
let homeHeroIndex = 0;
function renderHomeHero() {
  const hero = $("#home-hero");
  const visual = hero?.querySelector(".home-hero-products");
  const dots = hero?.querySelector(".home-hero-dots");
  if (!hero || !visual || !dots) return;
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const media = settings.homeMedia
    .filter((item) => item.placement === "hero" && item.url && item.active !== false)
    .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));
  const slides = media.length ? media : [{ url: "", altAr: "بنر المتجر", altEn: "Store banner", href: "#new-arrivals" }];
  homeHeroIndex = Math.min(homeHeroIndex, slides.length - 1);
  const show = (index) => {
    homeHeroIndex = (index + slides.length) % slides.length;
    const item = slides[homeHeroIndex];
    hero.classList.toggle("has-image", Boolean(item.url));
    hero.classList.toggle("no-image", !item.url);
    visual.style.backgroundImage = item.url ? `url("${String(item.url).replace(/["\\]/g, "")}")` : "none";
    // Uploaded hero artwork always fills the frame. `contain`, custom scales,
    // and the old `auto 100%` fallback all exposed empty side columns.
    visual.style.backgroundSize = "cover";
    visual.style.backgroundPosition = item.imagePosition && item.imagePosition !== "center" ? item.imagePosition : "center";
    visual.setAttribute("aria-label", state.lang === "ar" ? item.altAr || item.name || "بانر دعائي" : item.altEn || item.name || "Campaign banner");
    visual.href = homeHeroTargetHref(item);
    [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === homeHeroIndex));
  };
  hero._origoShowHeroSlide = show;
  hero.querySelectorAll("[data-home-hero-arrow]").forEach((button) => {
    button.hidden = slides.length < 2;
    button.onclick = () => show(homeHeroIndex + Number(button.dataset.homeHeroArrow || 0));
  });
  dots.innerHTML = slides.map((_, index) => `<button type="button" data-home-hero-slide="${index}" aria-label="${state.lang === "ar" ? "الشريحة" : "Slide"} ${index + 1}"></button>`).join("");
  dots.onclick = (event) => {
    const button = event.target.closest("[data-home-hero-slide]");
    if (button) show(Number(button.dataset.homeHeroSlide));
  };
  if (hero.dataset.sliderBound !== "true") {
    hero.dataset.sliderBound = "true";
    let startX = 0;
    let lastX = 0;
    let dragged = false;
    const finishSwipe = (event) => {
      if (!startX) return;
      const delta = (event.clientX || lastX) - startX;
      hero.classList.remove("is-dragging");
      const currentVisual = hero.querySelector(".home-hero-products");
      if (currentVisual) currentVisual.style.transform = "";
      if (Math.abs(delta) > 42) hero._origoShowHeroSlide?.(homeHeroIndex + (delta < 0 ? 1 : -1));
      dragged = Math.abs(delta) > 8;
      startX = 0;
      lastX = 0;
    };
    hero.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".home-hero-dots,button")) return;
      startX = event.clientX;
      lastX = event.clientX;
      dragged = false;
      hero.classList.add("is-dragging");
      hero.setPointerCapture?.(event.pointerId);
    });
    hero.addEventListener("pointermove", (event) => {
      if (!startX) return;
      lastX = event.clientX;
      const delta = Math.max(-90, Math.min(90, lastX - startX));
      const currentVisual = hero.querySelector(".home-hero-products");
      // Keep the artwork edge-to-edge while tracking the gesture; translating
      // the background layer exposed the frame behind it at either side.
      if (currentVisual) currentVisual.style.transform = "";
    });
    hero.addEventListener("pointerup", finishSwipe);
    hero.addEventListener("pointercancel", finishSwipe);
    hero.addEventListener("click", (event) => { if (dragged) { event.preventDefault(); event.stopPropagation(); dragged = false; } }, true);
  }
  clearInterval(homeHeroTimer);
  const intervalMs = Math.max(1000, Math.min(30000, Number(settings.homeHero.intervalSeconds || 3) * 1000));
  if (slides.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) homeHeroTimer = setInterval(() => show(homeHeroIndex + 1), intervalMs);
  show(homeHeroIndex);
}

function productDateScore(product, index = 0) {
  const date = Date.parse(product.createdAt || product.updatedAt || product.releaseDate || "");
  return Number.isFinite(date) ? date : Number(product.releaseYear || 0) * 1e8 + index;
}

function productSalesScore(product) {
  return Number(product.salesCount || product.ordersCount || product.soldCount || product.reviewSummary?.count || product.insights?.reviews || 0) * 100 + catalogRating(product);
}

function homeBrandProducts(brand) {
  const key = ORIGOCatalog.normalize(brand);
  return state.products.filter((product) => ORIGOCatalog.normalize(product.brand || "") === key);
}

function renderHomepageCommerce() {
  renderHomeBenefitsMarquee();
  const newest = $("#new-product-grid");
  if (newest) {
    const homepageProductLimit = matchMedia("(max-width: 640px)").matches ? 8 : 6;
    const products = state.products.map((product, index) => ({ product, score: productDateScore(product, index) })).sort((a, b) => b.score - a.score).slice(0, homepageProductLimit).map(({ product }) => product);
    newest.innerHTML = products.map((product, index) => productCardMarkup(product, { context: "grid", delay: Math.min(index * 45, 180) })).join("");
    bindHorizontalRail(newest);
  }
  const showcase = $("#home-brand-showcases");
  if (showcase) {
    const configured = state.adminWorkspace.settings?.homeMedia || [];
    const dataBrands = [...new Set(state.products.map((product) => String(product.brand || "").trim()).filter(Boolean))];
    const ordered = [...ORIGO_PERFUME_BRANDS, ...dataBrands].filter((brand, index, values) => values.findIndex((candidate) => ORIGOCatalog.normalize(candidate) === ORIGOCatalog.normalize(brand)) === index);
    const mobile = matchMedia("(max-width: 700px)").matches;
    const visibleBrands = mobile ? ordered.filter((brand) => homeBrandProducts(brand).length).slice(0, 4) : ordered;
    const productLimit = mobile ? 6 : 6;
    showcase.innerHTML = visibleBrands.map((brand) => {
      const products = homeBrandProducts(brand);
      if (!products.length) return "";
      const banner = configured.find((item) => item.placement === "brand-banner" && ORIGOCatalog.normalize(item.brand || "") === ORIGOCatalog.normalize(brand));
      return `<section class="home-brand-showcase"><div class="home-section-head"><button data-action="brand-search" data-query="${escapeHTML(brand)}">${state.lang === "ar" ? "عرض كل المنتجات" : "View all products"} ‹</button><div><small>${state.lang === "ar" ? "مختارات العلامة" : "Brand selection"}</small><h2>${escapeHTML(brand)}</h2></div></div>${banner ? `<button class="home-brand-banner" data-action="brand-search" data-query="${escapeHTML(brand)}"><img src="${escapeHTML(banner.url)}" alt="${escapeHTML(state.lang === "ar" ? banner.altAr : banner.altEn)}" loading="lazy" decoding="async"/></button>` : ""}<div class="product-grid horizontal-scroll horizontal-rail" data-horizontal-rail>${products.slice(0, productLimit).map((product) => productCardMarkup(product, { context: "grid" })).join("")}</div></section>`;
    }).join("");
    $$('[data-horizontal-rail]', showcase).forEach((rail) => {
      bindHorizontalRail(rail);
    });
  }
  observeReveals();
}

function renderFooterBrands() {
  const holder = $("#footer-brand-links");
  if (!holder) return;
  const brands = ORIGO_PERFUME_BRANDS.slice(0, 5);
  holder.innerHTML = brands.length
    ? brands.map((brand) => `<button data-action="brand-search" data-query="${escapeHTML(brand)}">${escapeHTML(brand)}</button>`).join("")
    : `<a href="/perfumes">${state.lang === "ar" ? "منتجات ORIGO" : "ORIGO products"}</a>`;
}

function activeFooterBenefits() {
  const benefits = state.adminWorkspace.settings?.footerBenefits || defaultFooterBenefits;
  return benefits.filter((item) => item.active !== false).sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0));
}

function safePublicHref(value, { externalOnly = false } = {}) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (!externalOnly && text.startsWith("/") && !text.startsWith("//")) return text;
  try {
    const url = new URL(text, location.origin);
    if (externalOnly && !["http:", "https:"].includes(url.protocol)) return "";
    if (!["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) return "";
    return externalOnly ? url.href : (url.origin === location.origin ? `${url.pathname}${url.search}${url.hash}` : url.href);
  } catch {
    return "";
  }
}

function normalizeSocialLink(value, network = "") {
  let text = String(value || "").trim();
  if (!text) return "";
  const key = String(network || "").toLowerCase();
  const hosts = {
    youtube: "https://www.youtube.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/@",
    instagram: "https://www.instagram.com/",
    snapchat: "https://www.snapchat.com/add/",
    telegram: "https://t.me/",
    whatsapp: "https://wa.me/"
  };
  if (key === "whatsapp" && /^\+?[\d\s()\-]{8,}$/.test(text)) {
    const number = text.replace(/\D/g, "");
    return number ? `${hosts.whatsapp}${number}` : "";
  }
  if (text.startsWith("@") && hosts[key]) {
    const handle = text.slice(1).trim();
    return handle ? `${hosts[key]}${encodeURIComponent(handle)}` : "";
  }
  if (!/^[a-z][a-z\d+.-]*:/i.test(text)) {
    if (!/[./]/.test(text) && hosts[key]) text = `${hosts[key]}${encodeURIComponent(text)}`;
    else text = `https://${text.replace(/^\/+/, "")}`;
  }
  try {
    const url = new URL(text);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function safeBenefitColor(value, fallback) {
  return /^#[0-9a-f]{3,8}$/i.test(String(value || "")) ? value : fallback;
}

function footerBenefitIcon(icon, colors = []) {
  const mapped = HOME_BENEFIT_LUXURY_ICONS[icon] || (icon === "samples" ? "perfume" : "truck");
  const color = safeBenefitColor(colors[0], "#7b0a20");
  return `<span class="origo-lux-icon-medallion" style="--icon-accent:${escapeHTML(color)}">${luxuryIcon(mapped)}</span>`;
}

function footerSocialIcon(name) {
  const icons = {
    youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 7.3a3 3 0 0 0-2.1-2.1C17.5 4.7 12 4.7 12 4.7s-5.5 0-7.4.5a3 3 0 0 0-2.1 2.1A30 30 0 0 0 2 12a30 30 0 0 0 .5 4.7 3 3 0 0 0 2.1 2.1c1.9.5 7.4.5 7.4.5s5.5 0 7.4-.5a3 3 0 0 0 2.1-2.1A30 30 0 0 0 22 12a30 30 0 0 0-.5-4.7ZM10 15.3V8.7l5.8 3.3Z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.4 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.8 1.8-1.8H18V2.3c-.3 0-1.4-.2-2.7-.2-2.7 0-4.6 1.7-4.6 4.8v2.6H7.6V13h3.1v9Z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 2h-3.4v13.2a2.8 2.8 0 1 1-2.4-2.8c.3 0 .6 0 .9.1V9.1l-.9-.1a6.2 6.2 0 1 0 5.8 6.2V8.5a8 8 0 0 0 4.7 1.5V6.6A4.7 4.7 0 0 1 15.5 2Z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.1 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4Zm10.3 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>`,
    snapchat: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.1 10.1V7.7a3.9 3.9 0 1 1 7.8 0v2.4c.5 1 1.2 1.5 2.5 1.8-.2.9-1 1.4-2.2 1.6-.4 1.4-1.4 2.3-2.7 2.7-.6.1-.9.6-1 1.2h-1c-.1-.6-.4-1.1-1-1.2-1.3-.4-2.3-1.3-2.7-2.7-1.2-.2-2-.7-2.2-1.6 1.3-.3 2-.8 2.5-1.8Z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.7 3.2 18.5 20c-.2 1.2-.9 1.5-1.9.9l-4.9-3.6-2.3 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6 13.8l-4.8-1.5c-1.1-.3-1.1-1.1.2-1.6L20.2 3.4c.9-.3 1.7.2 1.5-.2Z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0 11.9 11.9 0 0 0 1.8 17.8L.1 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1A11.9 11.9 0 0 0 20.5 3.5ZM12.2 21.7a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.9 9.9 0 1 1 8.4 4.7Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-.9 1.1c-.2.3-.4.3-.7.1a8 8 0 0 1-2.4-1.5A9 9 0 0 1 9.2 11c-.2-.3 0-.5.1-.7l.5-.6.3-.6c.1-.2 0-.4 0-.6L9 5.8c-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .5-.4.5-1.4 1.4-1.4 3.4s1.5 3.9 1.7 4.2c.2.3 2.9 4.5 7.1 6.2 1 .4 1.8.7 2.4.8 1 .3 1.9.2 2.6.1.8-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>`
  };
  return icons[name] || "";
}

function applyStoreIdentity() {
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  state.adminWorkspace.settings = settings;
  applyAppearanceSettings(settings.appearance);
  const announcement = $(".announcement");
  if (announcement) {
    const threshold = Number(settings.freeShippingThreshold || 3000);
    const value = new Intl.NumberFormat(state.lang === "ar" ? "ar-EG" : "en-EG", { maximumFractionDigits: 0 }).format(threshold);
    const announcementText = state.lang === "ar"
      ? `شحن مجاني للطلبات المؤهلة فوق ${value} جنيه مصري • منتجات أصلية 100% • استرجاع سهل • دعم عملاء 24/7`
      : `Free shipping on eligible orders over EGP ${value} • 100% authentic products • Easy returns • 24/7 support`;
    announcement.innerHTML = `<span dir="auto">${luxuryIcon("truck")}<b>${escapeHTML(announcementText)}</b></span><span dir="auto" aria-hidden="true">${luxuryIcon("truck")}<b>${escapeHTML(announcementText)}</b></span>`;
    announcement.setAttribute("aria-label", announcementText);
    announcement.setAttribute("aria-hidden", "false");
  }
  $$('[data-store-logo]').forEach((image) => {
    const requested = image.dataset.logoVariant || "auto";
    const variant = requested === "auto" ? "light" : requested;
    const src = settings.logos[variant] || settings.logos.light || defaultStoreSettings.logos.light;
    if (image.getAttribute("src") !== src) image.setAttribute("src", src);
    image.alt = `${settings.storeName || "ORIGO"} SCENTS`;
  });
  $$('[data-home-category-icon]').forEach((icon) => {
    const src = settings.categoryIcons?.[icon.dataset.homeCategoryIcon];
    if (src) icon.innerHTML = `<img src="${escapeHTML(src)}" alt=""/>`;
    else setLuxuryIcon(icon, HOME_CATEGORY_LUXURY_ICONS[icon.dataset.homeCategoryIcon] || "sparkle");
  });
  $$('[data-home-benefit]').forEach((item) => {
    const src = settings.homeBenefitIcons?.[item.dataset.homeBenefit];
    const icon = $(".benefit-icon", item);
    if (src && icon) icon.innerHTML = `<img src="${escapeHTML(src)}" alt=""/>`;
    else if (icon) setLuxuryIcon(icon, HOME_BENEFIT_LUXURY_ICONS[item.dataset.homeBenefit] || "shield");
  });
  hydrateLuxuryIcons();
}

function appearanceNumber(value, fallback, min, max) {
  const number = Number(value);
  return Math.min(max, Math.max(min, Number.isFinite(number) ? number : fallback));
}

function applyAppearanceSettings(saved = {}) {
  const appearance = { ...defaultStoreSettings.appearance, ...(saved || {}) };
  const root = document.documentElement;
  const balancedLayoutEnabled = appearance.balancedLayoutEnabled !== false && String(appearance.balancedLayoutEnabled) !== "false";
  const bodyFonts = {
    elegant: '"Noto Naskh Arabic","Segoe UI",Tahoma,Arial,sans-serif',
    modern: '"Alexandria","Segoe UI",Tahoma,Arial,sans-serif',
    classic: 'Tahoma,Arial,sans-serif',
    system: 'system-ui,-apple-system,"Segoe UI",sans-serif'
  };
  const headingFonts = {
    classic: '"DM Serif Display",Georgia,"Times New Roman",serif',
    elegant: '"Noto Naskh Arabic",Georgia,serif',
    modern: '"Alexandria","Segoe UI",sans-serif',
    system: 'system-ui,-apple-system,"Segoe UI",sans-serif'
  };
  const shadows = {
    none: "none",
    soft: "0 10px 30px rgba(61, 14, 25, .08)",
    strong: "0 18px 46px rgba(61, 14, 25, .18)"
  };
  const densityPadding = { compact: 10, comfortable: 14, spacious: 19 };
  const bodyFont = bodyFonts[appearance.bodyFont] || bodyFonts.elegant;
  const headingFont = headingFonts[appearance.headingFont] || headingFonts.classic;
  root.style.setProperty("--origo-font-body", bodyFont);
  root.style.setProperty("--origo-font-heading", headingFont);
  root.style.setProperty("--font-ar", bodyFont);
  root.style.setProperty("--font-display", headingFont);
  const baseFontSize = appearanceNumber(appearance.baseFontSize, 17, 15, 22);
  const headerHeight = appearanceNumber(appearance.headerHeight, 104, 84, 140);
  const sectionGap = appearanceNumber(appearance.sectionGap, 20, 8, 40);
  const adminScale = appearanceNumber(appearance.adminScale, 1.1, 1, 1.35);
  root.dataset.balancedLayout = String(balancedLayoutEnabled);
  root.style.setProperty("--origo-base-font-size", `${balancedLayoutEnabled ? Math.max(baseFontSize, 17) : baseFontSize}px`);
  root.style.setProperty("--origo-body-font-weight", String(appearanceNumber(appearance.bodyFontWeight, 500, 400, 800)));
  root.style.setProperty("--origo-heading-scale", String(appearanceNumber(appearance.headingScale, 1, .85, 1.35)));
  root.style.setProperty("--origo-icon-scale", String(appearanceNumber(appearance.iconScale, 1, .75, 1.35)));
  root.style.setProperty("--origo-image-scale", String(appearanceNumber(appearance.imageScale, 1, .8, 1.25)));
  root.style.setProperty("--origo-image-radius", `${appearanceNumber(appearance.imageRadius, 12, 0, 36)}px`);
  root.style.setProperty("--origo-card-radius", `${appearanceNumber(appearance.cardRadius, 16, 0, 36)}px`);
  root.style.setProperty("--origo-card-border-width", `${appearanceNumber(appearance.cardBorderWidth, 1, 0, 3)}px`);
  root.style.setProperty("--origo-card-shadow", shadows[appearance.cardShadow] || shadows.soft);
  root.style.setProperty("--origo-card-padding", `${densityPadding[appearance.density] || densityPadding.comfortable}px`);
  root.style.setProperty("--origo-header-height", `${balancedLayoutEnabled ? Math.min(headerHeight, 104) : headerHeight}px`);
  root.style.setProperty("--origo-header-icon-scale", String(appearanceNumber(appearance.headerIconScale, 1, .8, 1.4)));
  root.style.setProperty("--origo-content-max", `${appearanceNumber(appearance.contentMaxWidth, 1440, 1180, 1760)}px`);
  root.style.setProperty("--origo-section-gap", `${balancedLayoutEnabled ? Math.min(sectionGap, 20) : sectionGap}px`);
  root.style.setProperty("--origo-product-card-height", `${appearanceNumber(appearance.productCardHeight, 500, 420, 680)}px`);
  root.style.setProperty("--origo-admin-scale", String(balancedLayoutEnabled ? Math.max(adminScale, 1.1) : adminScale));
  const safeColor = (value, fallback) => /^#[0-9a-f]{6}$/i.test(String(value || "")) ? String(value) : fallback;
  root.style.setProperty("--origo-header-light", safeColor(appearance.lightHeaderColor, "#ffffff"));
  root.style.setProperty("--origo-header-dark", safeColor(appearance.darkHeaderColor, "#5b5e63"));
  root.style.setProperty("--burgundy", safeColor(appearance.burgundyColor, "#720019"));
  root.style.setProperty("--gold", safeColor(appearance.goldColor, "#c8943d"));
  root.style.setProperty("--origo-light-page", safeColor(appearance.lightPageColor, "#ffffff"));
  root.style.setProperty("--origo-light-surface", safeColor(appearance.lightSurfaceColor, "#ffffff"));
  root.style.setProperty("--origo-light-text", safeColor(appearance.lightTextColor, "#251519"));
  root.style.setProperty("--origo-light-muted", safeColor(appearance.lightMutedColor, "#6e5b60"));
  root.style.setProperty("--origo-light-burgundy", safeColor(appearance.lightBurgundyColor || appearance.burgundyColor, "#720019"));
  root.style.setProperty("--origo-dark-page", safeColor(appearance.darkPageColor, "#3b3c40"));
  root.style.setProperty("--origo-dark-surface", safeColor(appearance.darkSurfaceColor, "#4b4d52"));
  root.style.setProperty("--origo-dark-elevated", safeColor(appearance.darkElevatedColor, "#5a5c62"));
  root.style.setProperty("--origo-dark-text", safeColor(appearance.darkTextColor, "#ffffff"));
  root.style.setProperty("--origo-dark-muted", safeColor(appearance.darkMutedColor, "#f0f0f2"));
  root.style.setProperty("--origo-dark-burgundy", safeColor(appearance.darkBurgundyColor || appearance.burgundyColor, "#720019"));
  root.dataset.appearanceImageFit = ["contain", "cover"].includes(appearance.imageFit) ? appearance.imageFit : "contain";
  root.dataset.appearanceDensity = ["compact", "comfortable", "spacious"].includes(appearance.density) ? appearance.density : "comfortable";
  root.dataset.headerIconShape = ["round", "soft", "square"].includes(appearance.headerIconShape) ? appearance.headerIconShape : "round";
  root.dataset.headerActionsOrder = ["commerce-first", "preferences-first"].includes(appearance.headerActionsOrder) ? appearance.headerActionsOrder : "commerce-first";
}

function appearanceFromForm(form) {
  const data = new FormData(form);
  return {
    balancedLayoutEnabled: data.has("appearance.balancedLayoutEnabled"),
    bodyFont: String(data.get("appearance.bodyFont") || defaultStoreSettings.appearance.bodyFont),
    headingFont: String(data.get("appearance.headingFont") || defaultStoreSettings.appearance.headingFont),
    baseFontSize: Number(data.get("appearance.baseFontSize") || defaultStoreSettings.appearance.baseFontSize),
    bodyFontWeight: Number(data.get("appearance.bodyFontWeight") || defaultStoreSettings.appearance.bodyFontWeight),
    headingScale: Number(data.get("appearance.headingScale") || defaultStoreSettings.appearance.headingScale),
    iconScale: Number(data.get("appearance.iconScale") || defaultStoreSettings.appearance.iconScale),
    imageScale: Number(data.get("appearance.imageScale") || defaultStoreSettings.appearance.imageScale),
    imageRadius: Number(data.get("appearance.imageRadius") || defaultStoreSettings.appearance.imageRadius),
    imageFit: String(data.get("appearance.imageFit") || defaultStoreSettings.appearance.imageFit),
    cardRadius: Number(data.get("appearance.cardRadius") || defaultStoreSettings.appearance.cardRadius),
    cardBorderWidth: Number(data.get("appearance.cardBorderWidth") || defaultStoreSettings.appearance.cardBorderWidth),
    cardShadow: String(data.get("appearance.cardShadow") || defaultStoreSettings.appearance.cardShadow),
    density: String(data.get("appearance.density") || defaultStoreSettings.appearance.density),
    headerHeight: Number(data.get("appearance.headerHeight") || defaultStoreSettings.appearance.headerHeight),
    headerIconScale: Number(data.get("appearance.headerIconScale") || defaultStoreSettings.appearance.headerIconScale),
    headerIconShape: String(data.get("appearance.headerIconShape") || defaultStoreSettings.appearance.headerIconShape),
    headerActionsOrder: String(data.get("appearance.headerActionsOrder") || defaultStoreSettings.appearance.headerActionsOrder),
    lightHeaderColor: String(data.get("appearance.lightHeaderColor") || defaultStoreSettings.appearance.lightHeaderColor),
    darkHeaderColor: String(data.get("appearance.darkHeaderColor") || defaultStoreSettings.appearance.darkHeaderColor),
    burgundyColor: String(data.get("appearance.burgundyColor") || defaultStoreSettings.appearance.burgundyColor),
    goldColor: String(data.get("appearance.goldColor") || defaultStoreSettings.appearance.goldColor),
    lightPageColor: String(data.get("appearance.lightPageColor") || defaultStoreSettings.appearance.lightPageColor),
    lightSurfaceColor: String(data.get("appearance.lightSurfaceColor") || defaultStoreSettings.appearance.lightSurfaceColor),
    lightTextColor: String(data.get("appearance.lightTextColor") || defaultStoreSettings.appearance.lightTextColor),
    lightMutedColor: String(data.get("appearance.lightMutedColor") || defaultStoreSettings.appearance.lightMutedColor),
    lightBurgundyColor: String(data.get("appearance.lightBurgundyColor") || defaultStoreSettings.appearance.lightBurgundyColor),
    darkPageColor: String(data.get("appearance.darkPageColor") || defaultStoreSettings.appearance.darkPageColor),
    darkSurfaceColor: String(data.get("appearance.darkSurfaceColor") || defaultStoreSettings.appearance.darkSurfaceColor),
    darkElevatedColor: String(data.get("appearance.darkElevatedColor") || defaultStoreSettings.appearance.darkElevatedColor),
    darkTextColor: String(data.get("appearance.darkTextColor") || defaultStoreSettings.appearance.darkTextColor),
    darkMutedColor: String(data.get("appearance.darkMutedColor") || defaultStoreSettings.appearance.darkMutedColor),
    darkBurgundyColor: String(data.get("appearance.darkBurgundyColor") || defaultStoreSettings.appearance.darkBurgundyColor),
    contentMaxWidth: Number(data.get("appearance.contentMaxWidth") || defaultStoreSettings.appearance.contentMaxWidth),
    sectionGap: Number(data.get("appearance.sectionGap") || defaultStoreSettings.appearance.sectionGap),
    productCardHeight: Number(data.get("appearance.productCardHeight") || defaultStoreSettings.appearance.productCardHeight),
    adminScale: Number(data.get("appearance.adminScale") || defaultStoreSettings.appearance.adminScale),
    layoutTuningVersion: 2
  };
}

function renderSiteFooter() {
  const footer = $("#site-footer");
  if (!footer) return;
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  state.adminWorkspace.settings = settings;
  const isArabic = state.lang === "ar";
  const description = isArabic ? settings.footerDescriptionAr : settings.footerDescriptionEn;
  const newsletterTitle = isArabic ? settings.newsletterTitleAr : settings.newsletterTitleEn;
  const newsletterCopy = isArabic ? settings.newsletterCopyAr : settings.newsletterCopyEn;
  const setRowText = (row, label) => {
    if (!row) return;
    const textNode = [...row.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (textNode) textNode.textContent = `${label} `;
    else row.insertBefore(document.createTextNode(`${label} `), row.firstChild);
  };
  $("#footer-newsletter-title").textContent = newsletterTitle;
  $("#footer-newsletter-copy").textContent = newsletterCopy;
  $("#footer-email").placeholder = isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email address";
  const newsletterButton = $("#newsletter-form button[type='submit'] span");
  if (newsletterButton && $("#newsletter-form").dataset.status !== "loading") newsletterButton.textContent = isArabic ? "اشترك الآن" : "Subscribe now";
  const email = String(settings.supportEmail || defaultStoreSettings.supportEmail).trim();
  const emailLink = $("#footer-support-email");
  emailLink.href = `mailto:${encodeURIComponent(email)}`;
  $("b", emailLink).textContent = email;
  const whatsappLink = $("#footer-support-whatsapp");
  const whatsappHref = safePublicHref(normalizeSocialLink(settings.socialLinks.whatsapp, "whatsapp"), { externalOnly: true });
  if (whatsappLink) {
    whatsappLink.hidden = !whatsappHref;
    if (whatsappHref) whatsappLink.href = whatsappHref;
    const label = $("b", whatsappLink);
    if (label) label.textContent = isArabic ? "تواصل عبر واتساب" : "Contact us on WhatsApp";
  }
  const hours = isArabic ? settings.supportHoursAr : settings.supportHoursEn;
  $("#footer-support-hours").innerHTML = escapeHTML(hours).replaceAll("\n", "<br />");
  $("#footer-support-note").textContent = isArabic ? "نجيب الرسائل خلال ساعات العمل الرسمية." : "Messages are answered during official business hours.";
  $("#footer-privacy-link").href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(isArabic ? "سياسة الخصوصية" : "Privacy policy")}`;
  $("#footer-terms-link").href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(isArabic ? "الشروط والأحكام" : "Terms and conditions")}`;
  const appLinks = [
    ["googlePlay", settings.appLinks.googlePlay, "Google Play"], ["appStore", settings.appLinks.appStore, "App Store"]
  ].filter(([, url]) => safePublicHref(url, { externalOnly: true }));
  $("#footer-app-links").innerHTML = appLinks.length
    ? appLinks.map(([key, url, label]) => `<a href="${escapeHTML(safePublicHref(url, { externalOnly: true }))}" target="_blank" rel="noopener noreferrer" class="${key}">${key === "appStore" ? "●" : "▶"} ${label}</a>`).join("")
    : `<small>${isArabic ? "التطبيق قريبًا" : "App coming soon"}</small>`;
  const socialNames = ["youtube", "facebook", "tiktok", "instagram", "snapchat", "telegram", "whatsapp"];
  $("#footer-socials").innerHTML = socialNames.map((name) => {
    const href = safePublicHref(normalizeSocialLink(settings.socialLinks[name], name), { externalOnly: true });
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    return href
      ? `<a class="social-${name}" href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${footerSocialIcon(name)}</a>`
      : `<span class="social-${name}" aria-disabled="true" title="${label} — ${isArabic ? "الرابط غير مضاف" : "link not configured"}">${footerSocialIcon(name)}</span>`;
  }).join("");
  const columns = $$(".footer-column", footer);
  const shop = columns[0];
  if (shop) {
    $("h3", shop).textContent = isArabic ? "تسوق" : "Shop";
    const labels = isArabic ? ["العطور للرجال", "العطور للنساء", "العطور للجنسين", "البدائل", "العطور الشرقية", "العطور العربية", "العروض", "الجديد"] : ["Men's fragrances", "Women's fragrances", "Unisex fragrances", "Alternatives", "Oriental fragrances", "Arabic fragrances", "Offers", "New arrivals"];
    $$(':scope > a', shop).forEach((row, index) => setRowText(row, labels[index]));
  }
  if (columns[1]) {
    $("h3", columns[1]).textContent = isArabic ? "ماركات" : "Brands";
    setRowText($(".footer-all-link", columns[1]), isArabic ? "عرض جميع الماركات" : "View all brands");
  }
  if (columns[2]) {
    $("h3", columns[2]).textContent = isArabic ? "معلومات" : "Information";
    const labels = isArabic ? ["عن أوريجو", "الأسئلة الشائعة", "سياسة الشحن والتوصيل", "سياسة الاسترجاع", "سياسة الخصوصية", "الشروط والأحكام", "تتبع الطلب"] : ["About ORIGO", "Frequently asked questions", "Shipping policy", "Return policy", "Privacy policy", "Terms & conditions", "Track order"];
    [...$$(':scope > a', columns[2]), ...$$(':scope > button', columns[2])].forEach((row, index) => setRowText(row, labels[index]));
  }
  if (columns[3]) {
    const headings = $$("h3", columns[3]);
    if (headings[0]) headings[0].textContent = isArabic ? "خدمة العملاء" : "Customer service";
    if (headings[1]) headings[1].textContent = isArabic ? "حمل التطبيق" : "Get the app";
    const copy = $(".footer-contact-app > p", columns[3]);
    if (copy) copy.innerHTML = isArabic ? "تسوق أسهل وأسرع<br />مع تطبيق أوريجو" : "Shop faster and easier<br />with the ORIGO app";
  }
  if (columns[4]) {
    const headings = $$("h3", columns[4]);
    if (headings[0]) headings[0].textContent = isArabic ? "تابعنا" : "Follow us";
  }
  const copyright = $(".footer-bottom-bar p", footer);
  if (copyright) copyright.innerHTML = `© <span id="footer-year">${new Date().getFullYear()}</span> ORIGO. ${isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}`;
  renderFooterBrands();
  applyStoreIdentity();
}

function footerBenefitBySlug(slug) {
  return (state.adminWorkspace.settings?.footerBenefits || defaultFooterBenefits).find((item) => item.slug === slug && item.active !== false);
}

function renderBenefitsPage() {
  const root = $("#benefits-page-content");
  if (!root) return;
  const isArabic = state.lang === "ar";
  const benefits = activeFooterBenefits();
  root.innerHTML = `<nav class="benefit-breadcrumb" aria-label="${isArabic ? "مسار الصفحة" : "Breadcrumb"}"><a href="/" data-action="catalog-home">${isArabic ? "الرئيسية" : "Home"}</a><span>‹</span><b>${isArabic ? "مزايا ORIGO" : "ORIGO benefits"}</b></nav>
    <header><span>ORIGO CARE</span><h1 id="benefits-page-title">${isArabic ? "مزايا وخدمات ORIGO" : "ORIGO benefits & services"}</h1><p>${isArabic ? "اختر الميزة للتعرّف على تفاصيلها وشروطها." : "Choose a benefit to see its details and conditions."}</p></header>
    <div class="benefits-page-grid">${benefits.map((benefit) => {
      const title = isArabic ? benefit.titleAr : benefit.titleEn;
      const description = isArabic ? benefit.shortAr || benefit.descriptionAr : benefit.shortEn || benefit.descriptionEn;
      return `<a href="/benefits/${escapeHTML(benefit.slug)}" data-action="benefit-link" data-slug="${escapeHTML(benefit.slug)}"><span>${benefit.image ? `<img src="${escapeHTML(benefit.image)}" alt="" loading="lazy"/>` : footerBenefitIcon(benefit.icon, benefit.colors)}</span><div><b>${escapeHTML(title)}</b><small>${escapeHTML(description || "")}</small></div><i>‹</i></a>`;
    }).join("")}</div>`;
  document.title = isArabic ? "مزايا ORIGO | ORIGO" : "ORIGO benefits | ORIGO";
}

function handleBenefitsRoute({ replace = false } = {}) {
  const active = /^\/benefits\/?$/i.test(location.pathname);
  const page = $("#benefits-page");
  if (!page) return false;
  if (!active) {
    document.body.classList.remove("benefits-route");
    page.hidden = true;
    return false;
  }
  document.body.classList.remove("catalog-route", "notes-route", "benefit-route", "brands-route");
  document.body.classList.add("benefits-route");
  page.hidden = false;
  $("#brands-page").hidden = true;
  $("#catalog-page").hidden = true;
  $("#notes-library-page").hidden = true;
  $("#benefit-detail-page").hidden = true;
  renderBenefitsPage();
  closeDrawers();
  $$(".overlay.open").forEach(closeOverlay);
  if (!replace) window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

function navigateBenefits() {
  if (location.pathname !== "/benefits") history.pushState({}, "", "/benefits");
  handleBenefitsRoute();
}

function renderBenefitDetail(benefit) {
  const isArabic = state.lang === "ar";
  const title = isArabic ? benefit.titleAr : benefit.titleEn;
  const description = isArabic ? benefit.descriptionAr : benefit.descriptionEn;
  const steps = isArabic ? benefit.stepsAr : benefit.stepsEn;
  const conditions = isArabic ? benefit.conditionsAr : benefit.conditionsEn;
  const ctaLabel = isArabic ? benefit.ctaLabelAr : benefit.ctaLabelEn;
  const ctaUrl = safePublicHref(benefit.ctaUrl) || "/perfumes";
  const faqs = Array.isArray(benefit.faqs) ? benefit.faqs : [];
  const soft = safeBenefitColor(benefit.colors?.[2], "#f7e8dc");
  $("#benefit-detail-content").innerHTML = `<nav class="benefit-breadcrumb" aria-label="${isArabic ? "مسار الصفحة" : "Breadcrumb"}"><a href="/" data-action="catalog-home">${isArabic ? "الرئيسية" : "Home"}</a><span>‹</span><a href="/benefits" data-action="open-benefits-page">${isArabic ? "مزايا ORIGO" : "ORIGO benefits"}</a><span>‹</span><b>${escapeHTML(title)}</b></nav>
    <article class="benefit-detail-hero" style="--benefit-soft:${escapeHTML(soft)}"><div class="benefit-detail-art">${benefit.image ? `<img src="${escapeHTML(benefit.image)}" alt=""/>` : footerBenefitIcon(benefit.icon, benefit.colors)}</div><div class="benefit-detail-copy"><span class="eyebrow">ORIGO CARE</span><h1 id="benefit-detail-title">${escapeHTML(title)}</h1><p>${escapeHTML(description)}</p><a class="benefit-detail-cta" href="${escapeHTML(ctaUrl)}">${escapeHTML(ctaLabel)} <span>←</span></a></div></article>
    <div class="benefit-detail-sections"><section class="benefit-detail-panel"><h2>${isArabic ? "كيف تعمل الخدمة؟" : "How it works"}</h2><ol class="benefit-step-list">${(steps || []).map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol></section><section class="benefit-detail-panel"><h2>${isArabic ? "الشروط المهمة" : "Important conditions"}</h2><ul class="benefit-condition-list">${(conditions || []).map((condition) => `<li>${escapeHTML(condition)}</li>`).join("")}</ul></section></div>
    <section class="benefit-faqs"><h2>${isArabic ? "الأسئلة الشائعة" : "Frequently asked questions"}</h2>${faqs.map((faq) => `<details><summary>${escapeHTML(isArabic ? faq.qAr : faq.qEn)}</summary><p>${escapeHTML(isArabic ? faq.aAr : faq.aEn)}</p></details>`).join("")}</section>`;
  document.title = `${title} | ORIGO`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = description;
}

function handleBenefitRoute({ replace = false } = {}) {
  const match = location.pathname.match(/^\/benefits\/([a-z0-9-]+)\/?$/i);
  const page = $("#benefit-detail-page");
  if (!match) {
    const wasBenefit = document.body.classList.contains("benefit-route");
    document.body.classList.remove("benefit-route");
    page.hidden = true;
    if (wasBenefit && !replace) restoreStoreMeta();
    return false;
  }
  const benefit = footerBenefitBySlug(match[1]);
  document.body.classList.remove("catalog-route", "notes-route", "benefits-route", "brands-route");
  document.body.classList.add("benefit-route");
  $("#catalog-page").hidden = true;
  $("#notes-library-page").hidden = true;
  $("#benefits-page").hidden = true;
  page.hidden = false;
  closeDrawers();
  $$(".overlay.open").forEach(closeOverlay);
  if (benefit) renderBenefitDetail(benefit);
  else $("#benefit-detail-content").innerHTML = `<div class="benefit-detail-panel"><h1 id="benefit-detail-title">${state.lang === "ar" ? "الميزة غير موجودة" : "Benefit not found"}</h1><a class="benefit-detail-cta" href="/">${state.lang === "ar" ? "العودة للرئيسية" : "Back home"}</a></div>`;
  if (!replace) window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

function navigateBenefit(slug) {
  const path = `/benefits/${slug}`;
  if (location.pathname !== path) history.pushState({ benefit: slug }, "", path);
  handleBenefitRoute();
}

function renderProducts(filter = "all") {
  const grid = $("#product-grid");
  const search = ORIGOCatalog.normalize(state.storefrontSearchQuery);
  const visibleProducts = state.products
    .filter((product) => filter === "all" || product.type === filter)
    .filter((product) => state.storefrontCategory === "all" || product.category === state.storefrontCategory)
    .filter((product) => Object.entries(state.activeDynamicFilters).every(([key, selected]) =>
      !selected || productFilterValues(product, key).some((value) => ORIGOCatalog.normalize(value) === ORIGOCatalog.normalize(selected))
    ))
    .filter((product) => !search || ORIGOCatalog.normalize([
      product.nameAr,
      product.nameEn,
      product.brand,
      ...(product.notesAr || []),
      ...(product.notesEn || [])
    ].join(" ")).includes(search))
    .sort((a, b) => productSalesScore(b) - productSalesScore(a))
    .slice(0, matchMedia("(max-width: 640px)").matches ? 8 : 6);
  if (!visibleProducts.length) {
    grid.innerHTML = `
      <div class="product-grid-empty">
        <span>◇</span>
        <h3>${state.lang === "ar" ? "لا توجد منتجات مطابقة بعد" : "No matching products yet"}</h3>
        <p>${state.lang === "ar" ? "جرّب بحثًا آخر أو أضف أول منتج من استوديو الكتالوج." : "Try another search or add the first product from Catalog Studio."}</p>
        <button data-action="clear-product-search">${state.lang === "ar" ? "عرض كل المنتجات" : "Show all products"}</button>
      </div>`;
    return;
  }
  grid.innerHTML = visibleProducts.map((product, index) => productCardMarkup(product, {
    context: "grid",
    reveal: true,
    delay: Math.min(index * 70, 280)
  })).join("");
  observeReveals();
}

const catalogSortOptions = [
  ["relevance", "الأكثر صلة", "Most relevant"],
  ["best-selling", "الأكثر مبيعًا", "Best selling"],
  ["rating", "الأعلى تقييمًا", "Top rated"],
  ["newest", "الأحدث", "Newest"],
  ["price-asc", "السعر من الأقل", "Price: low to high"],
  ["price-desc", "السعر من الأعلى", "Price: high to low"]
];
const catalogQuickFilters = [
  ["all", "الكل", "All", ""], ["men", "رجالي", "Men", "♙"], ["women", "نسائي", "Women", "♙"],
  ["unisex", "للجنسين", "Unisex", "♧"], ["EDP", "EDP", "EDP", ""], ["EDT", "EDT", "EDT", ""],
  ["Parfum", "Parfum", "Parfum", ""], ["sale", "عروض", "Offers", "%"], ["new", "جديد", "New", "✦"]
];
let catalogRenderTimer;
let catalogSearchTimer;

function catalogRating(product) {
  return Number(product.reviewSummary?.average || product.insights?.rating || 0);
}

function catalogGender(product) {
  const value = ORIGOCatalog.normalize(product.gender || product.typeEn || product.type || "");
  if (/women|female|نسائي|نساء/.test(value)) return "women";
  if (/^men$|male|رجالي|رجل/.test(value)) return "men";
  return "unisex";
}

function catalogProductText(product) {
  const mainAccords = product.mainAccords || product.accords || product.mainAccordsAr || product.mainAccordsEn || [];
  return ORIGOCatalog.normalize([
    product.nameAr, product.nameEn, product.brand, product.type, product.typeEn, product.gender,
    product.concentration, product.familyAr, product.familyEn, product.fragranceFamily,
    ...(product.notesAr || []), ...(product.notesEn || []), ...(Array.isArray(mainAccords) ? mainAccords : [mainAccords])
  ].filter(Boolean).join(" "));
}

function catalogValues(product, key) {
  const map = {
    gender: [catalogGender(product)], brand: [product.brand], concentration: [product.concentration],
    family: [product.familyAr, product.familyEn, product.fragranceFamily],
    notes: [...(product.notesAr || []), ...(product.notesEn || [])],
    occasion: [...(product.occasionsAr || []), ...(product.occasionsEn || []), ...(product.occasions || [])]
  };
  return (map[key] || []).filter(Boolean).map(String);
}

function catalogIsNew(product) {
  return Boolean(product.isNew) || /new|جديد|وصل حديثا/.test(ORIGOCatalog.normalize(`${product.badgeAr || ""} ${product.badgeEn || ""}`));
}

function catalogMatchesSeason(product, season) {
  const keyMap = { "الشتاء": "winter", "الربيع": "spring", "الصيف": "summer", "الخريف": "autumn", winter: "winter", spring: "spring", summer: "summer", autumn: "autumn" };
  const key = keyMap[season] || season;
  const direct = [...(product.seasonsAr || []), ...(product.seasonsEn || []), ...(product.seasons || [])].some((value) => ORIGOCatalog.normalize(value) === ORIGOCatalog.normalize(season));
  return direct || Number(product.insights?.seasons?.[key] || 0) >= 60;
}

function catalogMatchesQuick(product) {
  const quick = state.catalogQuickFilter;
  if (quick === "all") return true;
  if (["men", "women", "unisex"].includes(quick)) return catalogGender(product) === quick;
  if (["EDP", "EDT", "Parfum"].includes(quick)) return ORIGOCatalog.normalize(product.concentration) === ORIGOCatalog.normalize(quick);
  if (quick === "sale") return Number(product.oldPrice || 0) > Number(product.price || 0);
  if (quick === "new") return catalogIsNew(product);
  return true;
}

function catalogFilteredProducts() {
  const filters = state.catalogFilters;
  const query = ORIGOCatalog.normalize(state.catalogQuery);
  const products = state.products.filter((product) => state.storefrontCategory === "all" || product.category === state.storefrontCategory)
    .filter(catalogMatchesQuick)
    .filter((product) => !query || catalogProductText(product).includes(query))
    .filter((product) => ["gender", "brand", "concentration", "family", "notes", "occasion"].every((key) => {
      const selected = filters[key] || [];
      if (!selected.length) return true;
      const values = catalogValues(product, key).map(ORIGOCatalog.normalize);
      return selected.some((value) => values.includes(ORIGOCatalog.normalize(value)));
    }))
    .filter((product) => !(filters.season || []).length || filters.season.some((season) => catalogMatchesSeason(product, season)))
    .filter((product) => !(filters.rating || []).length || catalogRating(product) >= Math.max(...filters.rating.map(Number)))
    .filter((product) => filters.minPrice === "" || Number(product.price) >= Number(filters.minPrice))
    .filter((product) => filters.maxPrice === "" || Number(product.price) <= Number(filters.maxPrice));
  const sorted = [...products];
  if (state.catalogSort === "price-asc") sorted.sort((a, b) => Number(a.price) - Number(b.price));
  if (state.catalogSort === "price-desc") sorted.sort((a, b) => Number(b.price) - Number(a.price));
  if (state.catalogSort === "rating") sorted.sort((a, b) => catalogRating(b) - catalogRating(a));
  if (state.catalogSort === "newest") sorted.sort((a, b) => Number(catalogIsNew(b)) - Number(catalogIsNew(a)));
  if (state.catalogSort === "best-selling") sorted.sort((a, b) => Number(b.reviewSummary?.count || /الأكثر|best/.test(`${b.badgeAr || ""} ${b.badgeEn || ""}`) * 100) - Number(a.reviewSummary?.count || /الأكثر|best/.test(`${a.badgeAr || ""} ${a.badgeEn || ""}`) * 100));
  return sorted;
}

function catalogOptionCounts(key, products = state.products) {
  const counts = new Map();
  products.forEach((product) => catalogValues(product, key).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1)));
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function catalogCheckboxes(key, options, limit = 8) {
  const selected = state.catalogFilters[key] || [];
  const visible = key === "brand" && !state.catalogBrandExpanded ? options.slice(0, 5) : options.slice(0, limit);
  return visible.map(([value, count, label = value]) => `<label class="catalog-check"><input type="checkbox" data-catalog-filter="${escapeHTML(key)}" value="${escapeHTML(value)}"${selected.includes(String(value)) ? " checked" : ""} /><span>${escapeHTML(label)}</span><small>${count}</small></label>`).join("");
}

function catalogFilterSection(key, title, content, open = false) {
  return `<section class="catalog-filter-section" data-filter-section="${key}"><button type="button" data-action="catalog-filter-accordion" aria-expanded="${open}"><b>${title}</b><i>⌃</i></button><div class="catalog-filter-panel"${open ? "" : " hidden"}>${content || `<small>${state.lang === "ar" ? "لا توجد خيارات متاحة" : "No options available"}</small>`}</div></section>`;
}

function renderCatalogFilters() {
  const products = state.products.filter((product) => state.storefrontCategory === "all" || product.category === state.storefrontCategory);
  const genders = [["men", products.filter((p) => catalogGender(p) === "men").length, state.lang === "ar" ? "رجالي" : "Men"], ["women", products.filter((p) => catalogGender(p) === "women").length, state.lang === "ar" ? "نسائي" : "Women"], ["unisex", products.filter((p) => catalogGender(p) === "unisex").length, state.lang === "ar" ? "للجنسين" : "Unisex"]].filter(([, count]) => count);
  const brands = catalogOptionCounts("brand", products);
  const concentrations = catalogOptionCounts("concentration", products);
  const families = catalogOptionCounts("family", products);
  const notes = catalogOptionCounts("notes", products);
  const occasions = catalogOptionCounts("occasion", products);
  const seasons = [["الشتاء", products.filter((p) => catalogMatchesSeason(p, "الشتاء")).length], ["الربيع", products.filter((p) => catalogMatchesSeason(p, "الربيع")).length], ["الصيف", products.filter((p) => catalogMatchesSeason(p, "الصيف")).length], ["الخريف", products.filter((p) => catalogMatchesSeason(p, "الخريف")).length]].filter(([, count]) => count);
  const ratings = [[4, products.filter((p) => catalogRating(p) >= 4).length, state.lang === "ar" ? "4 نجوم فأكثر" : "4 stars & up"], [3, products.filter((p) => catalogRating(p) >= 3).length, state.lang === "ar" ? "3 نجوم فأكثر" : "3 stars & up"]].filter(([, count]) => count);
  const prices = products.map((product) => Number(product.price || 0)).filter(Number.isFinite);
  const min = Math.floor(Math.min(...prices, 0));
  const max = Math.ceil(Math.max(...prices, 5000));
  const priceContent = `<div class="catalog-price-range"><div class="catalog-price-track"><input type="range" min="${min}" max="${max}" step="50" value="${state.catalogFilters.minPrice || min}" data-catalog-price="minPrice" aria-label="الحد الأدنى للسعر"/><input type="range" min="${min}" max="${max}" step="50" value="${state.catalogFilters.maxPrice || max}" data-catalog-price="maxPrice" aria-label="الحد الأعلى للسعر"/></div><div class="catalog-price-inputs"><input type="number" min="${min}" max="${max}" value="${state.catalogFilters.minPrice}" placeholder="${min}" data-catalog-price="minPrice" aria-label="أقل سعر"/><input type="number" min="${min}" max="${max}" value="${state.catalogFilters.maxPrice}" placeholder="${max}" data-catalog-price="maxPrice" aria-label="أعلى سعر"/></div></div>`;
  const markup = [
    catalogFilterSection("gender", state.lang === "ar" ? "الجنس" : "Gender", catalogCheckboxes("gender", genders), true),
    catalogFilterSection("brand", state.lang === "ar" ? "الماركة" : "Brand", `<input class="catalog-brand-search" data-catalog-brand-search placeholder="${state.lang === "ar" ? "ابحث عن ماركة..." : "Search brands..."}" />${catalogCheckboxes("brand", brands, 20)}${brands.length > 5 ? `<button class="catalog-more-button" data-action="catalog-more-brands">${state.catalogBrandExpanded ? (state.lang === "ar" ? "عرض أقل" : "Show less") : (state.lang === "ar" ? "عرض المزيد" : "Show more")}</button>` : ""}`, true),
    catalogFilterSection("price", state.lang === "ar" ? "السعر (ج.م)" : "Price (EGP)", priceContent, true),
    catalogFilterSection("concentration", state.lang === "ar" ? "التركيز" : "Concentration", catalogCheckboxes("concentration", concentrations)),
    catalogFilterSection("family", state.lang === "ar" ? "العائلة العطرية" : "Fragrance family", catalogCheckboxes("family", families)),
    catalogFilterSection("notes", state.lang === "ar" ? "النوتات" : "Notes", catalogCheckboxes("notes", notes, 12)),
    catalogFilterSection("season", state.lang === "ar" ? "الموسم" : "Season", catalogCheckboxes("season", seasons)),
    catalogFilterSection("occasion", state.lang === "ar" ? "المناسبة" : "Occasion", catalogCheckboxes("occasion", occasions)),
    catalogFilterSection("rating", state.lang === "ar" ? "التقييم" : "Rating", catalogCheckboxes("rating", ratings))
  ].join("");
  [$("#catalog-sidebar-filters"), $("#catalog-mobile-filters")].forEach((holder) => { if (holder) holder.innerHTML = markup; });
}

function catalogSortMarkup() {
  return catalogSortOptions.map(([value, ar, en]) => `<option value="${value}"${state.catalogSort === value ? " selected" : ""}>${state.lang === "ar" ? ar : en}</option>`).join("");
}

function catalogActiveCount() {
  return Object.entries(state.catalogFilters).reduce((total, [key, value]) => total + (Array.isArray(value) ? value.length : value !== "" ? 1 : 0), 0) + (state.catalogQuickFilter === "all" ? 0 : 1);
}

function renderCatalogChrome(total) {
  const isArabic = state.lang === "ar";
  const title = state.catalogQuery ? (isArabic ? `نتائج البحث عن “${state.catalogQuery}”` : `Search results for “${state.catalogQuery}”`) : state.storefrontCategory === "perfume" ? (isArabic ? "العطور" : "Perfumes") : (isArabic ? "جميع المنتجات" : "All products");
  $("#catalog-title").textContent = title;
  $("#catalog-result-count").textContent = `${total} ${isArabic ? (total === 1 ? "منتج" : "منتجًا") : total === 1 ? "product" : "products"}`;
  $("#catalog-breadcrumb").innerHTML = `<button data-action="catalog-home">${isArabic ? "الرئيسية" : "Home"}</button><span>‹</span><button data-action="catalog-clear-all">${isArabic ? "العطور" : "Perfumes"}</button>${state.catalogQuery ? `<span>‹</span><b>${escapeHTML(state.catalogQuery)}</b>` : ""}`;
  $("#catalog-quick-filters").innerHTML = catalogQuickFilters.map(([value, ar, en, icon]) => `<button data-action="catalog-quick-filter" data-value="${value}" class="${state.catalogQuickFilter === value ? "active" : ""}" role="tab" aria-selected="${state.catalogQuickFilter === value}">${isArabic ? ar : en}${icon ? `<i>${icon}</i>` : ""}</button>`).join("");
  const filterLabels = [];
  Object.entries(state.catalogFilters).forEach(([key, value]) => {
    (Array.isArray(value) ? value : value !== "" ? [value] : []).forEach((item) => filterLabels.push([key, String(item), key === "minPrice" ? `${isArabic ? "من" : "From"} ${item}` : key === "maxPrice" ? `${isArabic ? "إلى" : "To"} ${item}` : item]));
  });
  if (state.catalogQuickFilter !== "all") {
    const quick = catalogQuickFilters.find(([value]) => value === state.catalogQuickFilter);
    filterLabels.unshift(["quick", state.catalogQuickFilter, quick ? (isArabic ? quick[1] : quick[2]) : state.catalogQuickFilter]);
  }
  $("#catalog-active-filters").innerHTML = filterLabels.length ? `<button class="catalog-clear-all" data-action="catalog-clear-all">${isArabic ? "مسح الكل" : "Clear all"} <i>⌫</i></button>${filterLabels.map(([key, value, label]) => `<button data-action="catalog-remove-filter" data-key="${escapeHTML(key)}" data-value="${escapeHTML(value)}">${escapeHTML(label)} <span>×</span></button>`).join("")}` : `<span></span>`;
  $$('[data-catalog-sort]').forEach((select) => { select.innerHTML = catalogSortMarkup(); select.value = state.catalogSort; });
  const count = catalogActiveCount();
  $("#catalog-mobile-filter-count").textContent = `${isArabic ? "الفلاتر" : "Filters"}${count ? ` (${count})` : ""}`;
  $("#catalog-mobile-show-results").textContent = `${isArabic ? "عرض" : "Show"} ${total} ${isArabic ? "منتجًا" : "products"}`;
  $("#catalog-search-input").value = state.catalogQuery;
}

function renderCatalog({ skeleton = true } = {}) {
  const grid = $("#catalog-product-grid");
  if (!grid || !document.body.classList.contains("catalog-route")) return;
  clearTimeout(catalogRenderTimer);
  const results = catalogFilteredProducts();
  renderCatalogChrome(results.length);
  renderCatalogFilters();
  if (skeleton) grid.innerHTML = Array.from({ length: Math.min(state.catalogPageSize, 8) }, () => `<div class="catalog-skeleton" aria-hidden="true"></div>`).join("");
  catalogRenderTimer = setTimeout(() => {
    const pages = Math.max(1, Math.ceil(results.length / state.catalogPageSize));
    state.catalogPage = Math.min(state.catalogPage, pages);
    const start = (state.catalogPage - 1) * state.catalogPageSize;
    const pageProducts = results.slice(start, start + state.catalogPageSize);
    if (!pageProducts.length) grid.innerHTML = `<div class="catalog-empty"><span>◇</span><h2>${state.lang === "ar" ? "لم نجد نتائج مطابقة" : "No matching results"}</h2><p>${state.lang === "ar" ? "جرّب إزالة بعض الفلاتر أو استخدم كلمة بحث أقصر. يمكنك العودة إلى جميع العطور بضغطة واحدة." : "Remove some filters or try a shorter search term."}</p><div><button data-action="catalog-clear-all">${state.lang === "ar" ? "مسح الكل" : "Clear all"}</button><button data-action="catalog-quick-filter" data-value="all">${state.lang === "ar" ? "الأكثر مبيعًا" : "Best sellers"}</button></div></div>`;
    else grid.innerHTML = pageProducts.map((product, index) => productCardMarkup(product, { context: "catalog", compact: matchMedia("(max-width:800px)").matches, reveal: true, delay: Math.min(index * 45, 180) })).join("");
    $("#catalog-pagination").innerHTML = pages > 1 ? Array.from({ length: pages }, (_, index) => `<button data-action="catalog-page" data-page="${index + 1}" class="${state.catalogPage === index + 1 ? "active" : ""}" aria-label="${state.lang === "ar" ? `صفحة ${index + 1}` : `Page ${index + 1}`}">${index + 1}</button>`).join("") : "";
    observeReveals();
  }, skeleton ? 140 : 0);
}

function resetCatalogFilters({ keepQuery = false } = {}) {
  if (!keepQuery) state.catalogQuery = "";
  state.catalogQuickFilter = "all";
  state.catalogFilters = { gender: [], brand: [], concentration: [], family: [], notes: [], season: [], occasion: [], rating: [], minPrice: "", maxPrice: "" };
  state.catalogSort = "relevance";
  state.catalogPage = 1;
}

function catalogURL() {
  const params = new URLSearchParams();
  if (state.catalogQuery) params.set("q", state.catalogQuery);
  if (state.storefrontCategory !== "perfume") params.set("category", state.storefrontCategory);
  if (state.catalogQuickFilter !== "all") params.set("quick", state.catalogQuickFilter);
  Object.entries(state.catalogFilters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) params.set(key, value.join(","));
    else if (!Array.isArray(value) && value !== "") params.set(key, value);
  });
  if (state.catalogSort !== "relevance") params.set("sort", state.catalogSort);
  if (state.catalogPage > 1) params.set("page", state.catalogPage);
  const path = state.catalogQuery ? "/search" : "/perfumes";
  return `${path}${params.toString() ? `?${params}` : ""}`;
}

function updateCatalogURL({ replace = false } = {}) {
  const method = replace ? "replaceState" : "pushState";
  history[method]({ catalog: true }, "", catalogURL());
}

function readCatalogURL() {
  const url = new URL(location.href);
  state.catalogQuery = url.searchParams.get("q") || "";
  state.storefrontCategory = url.searchParams.get("category") || "perfume";
  state.catalogQuickFilter = url.searchParams.get("quick") || "all";
  const empty = { gender: [], brand: [], concentration: [], family: [], notes: [], season: [], occasion: [], rating: [], minPrice: "", maxPrice: "" };
  Object.keys(empty).forEach((key) => {
    const value = url.searchParams.get(key);
    empty[key] = Array.isArray(empty[key]) ? (value ? value.split(",").filter(Boolean) : []) : value || "";
  });
  state.catalogFilters = empty;
  state.catalogSort = url.searchParams.get("sort") || "relevance";
  state.catalogPage = Math.max(1, Number(url.searchParams.get("page") || 1));
}

function handleCatalogRoute({ replace = false } = {}) {
  const isCatalog = /^\/(perfumes|search)\/?$/i.test(location.pathname);
  const page = $("#catalog-page");
  if (!isCatalog) {
    document.body.classList.remove("catalog-route");
    page.hidden = true;
    return false;
  }
  readCatalogURL();
  document.body.classList.remove("notes-route", "benefit-route", "brands-route");
  document.body.classList.add("catalog-route");
  page.hidden = false;
  $("#notes-library-page").hidden = true;
  $("#benefit-detail-page").hidden = true;
  closeDrawers();
  $$(".overlay.open").forEach(closeOverlay);
  renderCatalog();
  if (!replace) window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

function renderBrandsPage() {
  const root = $("#brands-page-content");
  if (!root) return;
  const optionMap = new Map(productOptionItems("brand").map((item) => [ORIGOCatalog.normalize(item.value || item.nameEn || item.nameAr), item]));
  const names = [...new Set([...ORIGO_PERFUME_BRANDS, ...state.products.map((product) => product.brand).filter(Boolean)])];
  root.innerHTML = `<nav class="brands-page-breadcrumb"><button data-action="catalog-home">${state.lang === "ar" ? "الرئيسية" : "Home"}</button><span>‹</span><b>${state.lang === "ar" ? "العلامات التجارية" : "Brands"}</b></nav>
    <header><span>${state.lang === "ar" ? "دليل ORIGO" : "ORIGO directory"}</span><h1 id="brands-page-title">${state.lang === "ar" ? "العلامات التجارية" : "Fragrance brands"}</h1><p>${state.lang === "ar" ? "اختر العلامة لعرض جميع منتجاتها." : "Choose a brand to see all its products."}</p></header>
    <div class="brands-page-grid">${names.map((brand) => {
      const option = optionMap.get(ORIGOCatalog.normalize(brand));
      const fallback = state.products.find((product) => ORIGOCatalog.normalize(product.brand) === ORIGOCatalog.normalize(brand));
      const image = option?.image || option?.logo || fallback?.brandLogo || origoBrandLogo(brand);
      return `<button data-action="brand-search" data-query="${escapeHTML(brand)}">${image ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(brand)}" loading="lazy"/>` : `<span>${escapeHTML(brand.split(/\s+/).map((part) => part[0]).join("").slice(0,3).toUpperCase())}</span>`}<b>${escapeHTML(brand)}</b></button>`;
    }).join("")}</div>`;
}

function handleBrandsRoute({ replace = false } = {}) {
  const active = /^\/brands\/?$/i.test(location.pathname);
  const page = $("#brands-page");
  if (!page) return false;
  if (!active) { document.body.classList.remove("brands-route"); page.hidden = true; return false; }
  document.body.classList.remove("catalog-route", "notes-route", "benefit-route", "benefits-route");
  document.body.classList.add("brands-route");
  page.hidden = false;
  $("#catalog-page").hidden = true;
  $("#notes-library-page").hidden = true;
  $("#benefit-detail-page").hidden = true;
  $("#benefits-page").hidden = true;
  renderBrandsPage();
  closeDrawers();
  if (!replace) window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

function navigateBrands() {
  history.pushState({}, "", "/brands");
  handleBrandsRoute();
}

function navigateCatalog(options = {}) {
  if (options.reset !== false) resetCatalogFilters();
  state.storefrontCategory = options.category || "perfume";
  if (options.query !== undefined) state.catalogQuery = options.query;
  if (options.brand) state.catalogFilters.brand = [options.brand];
  if (options.gender) state.catalogQuickFilter = options.gender;
  updateCatalogURL();
  handleCatalogRoute();
}

function renderCatalogAutocomplete(query) {
  const holder = $("#catalog-autocomplete");
  const normalized = ORIGOCatalog.normalize(query);
  if (!normalized) { holder.hidden = true; holder.innerHTML = ""; return; }
  const products = state.products.filter((product) => catalogProductText(product).includes(normalized)).slice(0, 4);
  const brands = catalogOptionCounts("brand").filter(([brand]) => ORIGOCatalog.normalize(brand).includes(normalized)).slice(0, 4);
  const notes = catalogOptionCounts("notes").filter(([note]) => ORIGOCatalog.normalize(note).includes(normalized)).slice(0, 4);
  const groups = [];
  if (products.length) groups.push([state.lang === "ar" ? "منتجات" : "Products", products.map((product) => `<button role="option" data-action="catalog-suggestion-product" data-id="${escapeHTML(product.id)}"><img src="${escapeHTML(product.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt=""/><span><b>${escapeHTML(localizedProductName(product))}</b><small>${escapeHTML(product.brand)}</small></span></button>`).join("")]);
  if (brands.length) groups.push([state.lang === "ar" ? "ماركات" : "Brands", brands.map(([brand, count]) => `<button role="option" data-action="catalog-suggestion-filter" data-key="brand" data-value="${escapeHTML(brand)}"><span><b>${escapeHTML(brand)}</b><small>${count} ${state.lang === "ar" ? "منتج" : "products"}</small></span></button>`).join("")]);
  if (notes.length) groups.push([state.lang === "ar" ? "نوتات" : "Notes", notes.map(([note, count]) => `<button role="option" data-action="catalog-suggestion-filter" data-key="notes" data-value="${escapeHTML(note)}"><span><b>${escapeHTML(note)}</b><small>${count} ${state.lang === "ar" ? "منتج" : "products"}</small></span></button>`).join("")]);
  const categories = [["men", "العطور الرجالية"], ["women", "العطور النسائية"], ["unisex", "عطور للجنسين"]].filter(([, label]) => ORIGOCatalog.normalize(label).includes(normalized));
  if (categories.length) groups.push([state.lang === "ar" ? "أقسام" : "Categories", categories.map(([value, label]) => `<button role="option" data-action="catalog-quick-filter" data-value="${value}"><span><b>${label}</b></span></button>`).join("")]);
  holder.innerHTML = groups.map(([label, items]) => `<div class="catalog-autocomplete-group"><small>${label}</small>${items}</div>`).join("") || `<div class="catalog-autocomplete-group"><small>${state.lang === "ar" ? "لا توجد اقتراحات مطابقة" : "No matching suggestions"}</small></div>`;
  holder.hidden = false;
  state.catalogAutocompleteIndex = -1;
}

function toggleCatalogFilters(force) {
  const drawer = $("#catalog-filter-drawer");
  const backdrop = $(".catalog-filter-backdrop");
  const open = force ?? !drawer.classList.contains("open");
  drawer.classList.toggle("open", open);
  backdrop.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  syncBodyLock();
}

const catalogDescriptionSearchService = { async search() { return null; } };

function getProduct(id) {
  return state.products.find((product) => product.id === id);
}

function addToCart(product, quantity = 1) {
  if (!product) return;
  const requested = Math.max(1, Math.min(10, Number(quantity) || 1));
  const knownStock = Number(product.inventory?.quantity);
  const maximum = Number.isFinite(knownStock) ? Math.max(0, Math.min(10, knownStock)) : 10;
  if (!maximum || product.status === "unavailable") {
    showToast(state.lang === "ar" ? "هذا المنتج غير متاح حاليًا" : "This product is currently unavailable");
    return;
  }
  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) existing.quantity = Math.min(maximum, existing.quantity + requested);
  else state.cart.push({ id: product.id, quantity: Math.min(maximum, requested) });
  persist();
  renderCart();
  showToast(state.lang === "ar" ? `تمت إضافة ${localizedProductName(product)} إلى السلة` : `${localizedProductName(product)} added to cart`);
}

function changeCartQuantity(productId, change) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity = Math.min(10, item.quantity + change);
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }
  persist();
  renderCart();
}

function renderCart() {
  const totalQuantity = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  $$(".cart-count").forEach((node) => (node.textContent = totalQuantity));
  const container = $("#cart-items");
  if (!state.cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <span>◇</span>
        <h3>${state.lang === "ar" ? "حقيبتك تنتظر أول اختيار" : "Your bag awaits its first scent"}</h3>
        <p>${state.lang === "ar" ? "ابدأ من مختاراتنا أو استخدم مستكشف العطور." : "Start with our edit or use the scent finder."}</p>
      </div>`;
    $("#cart-total").textContent = formatPrice(0);
    return;
  }
  container.innerHTML = "";
  let total = 0;
  state.cart.forEach((item) => {
    const product = getProduct(item.id);
    if (!product) return;
    total += product.price * item.quantity;
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${escapeHTML(product.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt="" />
      <div>
        <h3>${escapeHTML(localizedProductName(product))}</h3>
        <p>${escapeHTML(product.brand)} · <bdi dir="ltr">${escapeHTML(formatProductSize(product.size || product.sizes?.[0] || "75 ml"))}</bdi></p>
        <div class="quantity-control" aria-label="${state.lang === "ar" ? "الكمية" : "Quantity"}">
          <button data-action="decrease-cart" data-id="${escapeHTML(product.id)}" aria-label="${translations[state.lang].decreaseQuantity}">−</button>
          <span>${item.quantity}</span>
          <button data-action="increase-cart" data-id="${escapeHTML(product.id)}" aria-label="${translations[state.lang].increaseQuantity}">＋</button>
        </div>
        <b>${formatPrice(product.price * item.quantity)}</b>
      </div>
      <button class="remove-item" data-action="remove-cart" data-id="${escapeHTML(product.id)}" aria-label="${state.lang === "ar" ? "إزالة" : "Remove"}">×</button>`;
    $("img", row).addEventListener("error", (event) => (event.currentTarget.src = PRODUCT_IMAGE_PLACEHOLDER), { once: true });
    container.append(row);
  });
  $("#cart-total").textContent = formatPrice(total);
}

function renderWishlist() {
  $$(".wishlist-count").forEach((node) => (node.textContent = state.wishlist.length));
  const container = $("#wishlist-items");
  const products = state.wishlist.map(getProduct).filter(Boolean);
  if (!products.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <span>♡</span>
        <h3>${translations[state.lang].wishlistEmptyTitle}</h3>
        <p>${translations[state.lang].wishlistEmptyBody}</p>
      </div>`;
    return;
  }
  container.innerHTML = products.map((product) => productCardMarkup(product, { context: "wishlist", compact: true })).join("");
  $$("img", container).forEach((image) => {
    image.addEventListener("error", () => (image.src = PRODUCT_IMAGE_PLACEHOLDER), { once: true });
  });
}

function insightProfile(product) {
  if (product.insights) return product.insights;
  const concentrationLevels = {
    "Body Mist": 1,
    EDT: 2,
    EDP: 3,
    Parfum: 4,
    Extrait: 5
  };
  const seasonText = ORIGOCatalog.normalize((product.seasons || []).join(" "));
  const seasonScore = (patterns, fallback) => patterns.some((pattern) => seasonText.includes(pattern)) ? 96 : fallback;
  const genderText = ORIGOCatalog.normalize(`${product.type} ${product.typeEn}`);
  const gender = product.gender
    || (genderText.includes("women") || genderText.includes("نسائي") ? "women"
      : genderText.includes("men") || genderText.includes("رجالي") ? "men"
        : "unisex");
  const price = Number(product.price || 0);
  return {
    rating: 4.2,
    seasons: {
      winter: seasonScore(["winter", "شتاء"], 58),
      spring: seasonScore(["spring", "ربيع"], 62),
      summer: seasonScore(["summer", "صيف"], 54),
      autumn: seasonScore(["autumn", "fall", "خريف"], 68),
      day: seasonScore(["day", "daily", "صباح", "يومي"], 67),
      night: seasonScore(["night", "evening", "مساء", "مناسبات"], 72)
    },
    longevity: concentrationLevels[product.concentration] || 3,
    sillage: Math.min(5, Math.max(2, (concentrationLevels[product.concentration] || 3))),
    gender: gender === "women"
      ? { women: 84, unisex: 14, men: 2 }
      : gender === "men"
        ? { women: 3, unisex: 18, men: 79 }
        : { women: 18, unisex: 70, men: 12 },
    value: price && price <= 2200 ? 5 : price >= 3800 ? 3 : 4,
    preliminary: true
  };
}

function insightScale(titleAr, titleEn, icon, labelsAr, labelsEn, selected, className) {
  const labels = state.lang === "ar" ? labelsAr : labelsEn;
  return `
    <article class="insight-card scale-insight ${className}">
      <header><span>${icon}</span><div><b>${adminCopy(titleAr, titleEn)}</b><small>${labels[selected - 1]}</small></div></header>
      <div class="insight-scale">
        ${labels.map((label, index) => `
          <div class="${index + 1 === selected ? "selected" : ""}">
            <i><em style="width:${(index + 1) * 20}%"></em></i>
            <span>${escapeHTML(label)}</span>
          </div>`).join("")}
      </div>
    </article>`;
}

function renderPerfumeInsights(product) {
  if (product.category && product.category !== "perfume") return "";
  const profile = insightProfile(product);
  const localRating = Number(state.productRatings[product.id] || 0);
  const moodLabels = state.lang === "ar"
    ? ["لا يعجبني", "لا أحبّه", "مقبول", "أحبّه", "أعشقه"]
    : ["Dislike", "Not for me", "Okay", "Love it", "Adore it"];
  const moodIcons = ["☹", "◔", "◉", "☺", "♥"];
  const seasonItems = state.lang === "ar"
    ? [["winter", "الشتاء", "❄"], ["spring", "الربيع", "❧"], ["summer", "الصيف", "☀"], ["autumn", "الخريف", "🍂"], ["day", "نهاري", "◌"], ["night", "ليلي", "☾"]]
    : [["winter", "Winter", "❄"], ["spring", "Spring", "❧"], ["summer", "Summer", "☀"], ["autumn", "Autumn", "🍂"], ["day", "Day", "◌"], ["night", "Night", "☾"]];
  const genderRows = state.lang === "ar"
    ? [["women", "للنساء"], ["unisex", "للجنسين"], ["men", "للرجال"]]
    : [["women", "Women"], ["unisex", "Unisex"], ["men", "Men"]];
  const ratingBars = [18, 26, 46, 72, Math.round(profile.rating * 20)];

  return `
    <section class="perfume-insights" aria-label="${adminCopy("تقييم ومؤشرات العطر", "Fragrance ratings and insights")}">
      <div class="perfume-insights-head">
        <div><span class="eyebrow">${adminCopy("ملف العطر", "SCENT PROFILE")}</span><h3>${adminCopy("تقييم ومؤشرات الأداء", "Ratings & performance insights")}</h3></div>
        <p>${profile.preliminary
          ? adminCopy("تقدير أولي مبني على بيانات المنتج ويحتاج مراجعة المدير.", "A preliminary estimate based on product data; manager review is required.")
          : adminCopy("تحليل ORIGO التحريري، ويمكنك إضافة تقييمك من هذا الجهاز.", "ORIGO editorial analysis; you can add your rating from this device.")}</p>
      </div>
      <div class="perfume-insight-grid">
        <article class="insight-card rating-insight">
          <header><span>♥</span><div><b>${adminCopy("تقييم الرائحة", "Scent rating")}</b><small>${profile.rating.toFixed(1)} / 5</small></div></header>
          <div class="mood-rating" role="group" aria-label="${adminCopy("أضف تقييمك", "Add your rating")}">
            ${moodLabels.map((label, index) => `
              <button type="button" data-action="rate-perfume" data-id="${escapeHTML(product.id)}" data-score="${index + 1}" class="${localRating === index + 1 ? "selected" : ""}" aria-pressed="${localRating === index + 1}">
                <span>${moodIcons[index]}</span><b>${escapeHTML(label)}</b>
                <i><em style="width:${ratingBars[index]}%"></em></i>
              </button>`).join("")}
          </div>
          <p>${localRating
            ? adminCopy(`تقييمك ${localRating} من 5 محفوظ على هذا الجهاز.`, `Your ${localRating}/5 rating is saved on this device.`)
            : adminCopy("اختر شعورك تجاه العطر؛ لن ننسبه إلى مراجعات عامة.", "Choose how it feels to you; it is not presented as a public review.")}</p>
        </article>

        <article class="insight-card season-insight">
          <header><span>◷</span><div><b>${adminCopy("متى ترتديه؟", "When to wear it")}</b><small>${adminCopy("ملاءمة الموسم والوقت", "Season & time fit")}</small></div></header>
          <div class="season-meter">
            ${seasonItems.map(([key, label, icon]) => `
              <div><span>${icon}</span><b>${label}</b><i><em style="width:${profile.seasons[key]}%"></em></i><small>${profile.seasons[key]}%</small></div>`).join("")}
          </div>
        </article>

        ${insightScale(
          "الثبات", "Longevity", "◴",
          ["ضعيف جدًا", "ضعيف", "متوسط", "ثابت", "أبدي"],
          ["Very weak", "Weak", "Moderate", "Long lasting", "Eternal"],
          profile.longevity,
          "longevity-insight"
        )}
        ${insightScale(
          "انتشار العطر", "Sillage", "◉",
          ["ناعم", "متوسط", "ثقيل", "هائل", "طاغٍ"],
          ["Intimate", "Moderate", "Strong", "Enormous", "Room-filling"],
          profile.sillage,
          "sillage-insight"
        )}

        <article class="insight-card gender-insight">
          <header><span>⚥</span><div><b>${adminCopy("النوع", "Gender")}</b><small>${adminCopy("اتجاه التركيبة", "Composition leaning")}</small></div></header>
          <div class="gender-meter">
            ${genderRows.map(([key, label]) => `
              <div><span>${label}</span><i><em style="width:${profile.gender[key]}%"></em></i><b>${profile.gender[key]}%</b></div>`).join("")}
          </div>
        </article>

        ${insightScale(
          "قيمة السعر", "Value for money", "◈",
          ["مبالغ جدًا", "مبالغ", "مقبول", "جيد", "قيمة رائعة"],
          ["Very overpriced", "Overpriced", "Fair", "Good", "Great value"],
          profile.value,
          "value-insight"
        )}
      </div>
    </section>`;
}

const defaultMetaDescription = document.querySelector('meta[name="description"]')?.content || "";

function noteLabel(note) {
  return state.lang === "ar" ? note.nameAr : note.nameEn;
}

function familyLabel(family) {
  return state.lang === "ar" ? family?.nameAr : family?.nameEn;
}

function positionLabel(position) {
  const labels = {
    top: ["افتتاحية", "Top note"],
    heart: ["قلب", "Heart note"],
    base: ["قاعدة", "Base note"],
    multiple: ["متعدد", "Multiple levels"]
  };
  return (labels[position] || labels.multiple)[state.lang === "ar" ? 0 : 1];
}

function noteCardMarkup(note, compact = false) {
  const family = window.ORIGOFragranceNotes.familyById(note.familyId);
  const secondaryName = state.lang === "ar" ? note.nameEn : note.nameAr;
  const secondaryLabel = note.nameAr === note.nameEn
    ? (state.lang === "ar" ? "اسم المصدر" : "SOURCE NAME")
    : secondaryName;
  const imageStateLabel = note.imageStatus === "reference"
    ? (state.lang === "ar" ? "مرجع يحتاج إعادة توليد" : "REFERENCE — REGENERATION NEEDED")
    : note.imageStatus === "missing"
      ? (state.lang === "ar" ? "الصورة غير مضافة" : "IMAGE MISSING")
      : "";
  return `
    <button class="library-note-card${compact ? " compact" : ""} image-${escapeHTML(note.imageStatus || "missing")}" data-action="open-note" data-slug="${escapeHTML(note.slug)}"
      style="--note-color:${escapeHTML(family?.color || "#77736e")}">
      <span class="library-note-image"><img src="${escapeHTML(window.ORIGOFragranceNotes.artwork(note))}" alt="${escapeHTML(noteLabel(note))}" loading="lazy" data-note-artwork="true" data-note-slug="${escapeHTML(note.slug)}" /></span>
      <span class="library-note-copy">
        <small>${escapeHTML(familyLabel(family) || "")}${imageStateLabel ? ` · ${escapeHTML(imageStateLabel)}` : ""}</small>
        <b>${escapeHTML(noteLabel(note))}</b>
        <i dir="${note.nameAr === note.nameEn ? "auto" : (state.lang === "ar" ? "ltr" : "rtl")}">${escapeHTML(secondaryLabel)}</i>
      </span>
      <span class="note-card-arrow">↗</span>
    </button>`;
}

function productMiniCard(product) {
  const name = localizedProductName(product);
  return `
    <button class="note-product-card" data-action="note-product" data-id="${escapeHTML(product.id)}">
      <img src="${escapeHTML(product.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt="${escapeHTML(name)}" loading="lazy" />
      <span><small>${escapeHTML(product.brand)}</small><b>${escapeHTML(name)}</b><i>${formatPrice(product.price)}</i></span>
      <strong>↗</strong>
    </button>`;
}

function updateNotesMeta(note = null) {
  const siteBase = location.origin && location.origin !== "null" ? location.origin : location.href;
  const meta = document.querySelector('meta[name="description"]');
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  let schema = document.querySelector("#notes-structured-data");
  if (!schema) {
    schema = document.createElement("script");
    schema.id = "notes-structured-data";
    schema.type = "application/ld+json";
    document.head.append(schema);
  }
  if (note) {
    const hasSecondName = note.nameAr !== note.nameEn;
    const title = state.lang === "ar"
      ? `${note.nameAr}${hasSecondName ? ` (${note.nameEn})` : ""} | مكتبة مكونات ORIGO`
      : `${note.nameEn}${hasSecondName ? ` (${note.nameAr})` : ""} | ORIGO Fragrance Notes`;
    const description = state.lang === "ar" ? note.descriptionAr : note.descriptionEn;
    document.title = title;
    if (meta) meta.content = description.slice(0, 160);
    canonical.href = new URL(`/notes/${note.slug}`, siteBase).href;
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: note.nameEn,
      alternateName: [...new Set([note.nameAr, note.nameEn, ...(note.aliases || [])])],
      description,
      inDefinedTermSet: new URL("/notes", siteBase).href,
      url: canonical.href
    });
  } else {
    document.title = state.lang === "ar"
      ? "مكتبة المكونات العطرية | ORIGO"
      : "Fragrance Notes Library | ORIGO";
    if (meta) meta.content = state.lang === "ar"
      ? "اكتشف المكونات العطرية وعائلاتها وروائحها والعطور التي تحتوي عليها في مكتبة ORIGO."
      : "Explore fragrance notes, scent families, positions, related materials, and perfumes in the ORIGO library.";
    canonical.href = new URL("/notes", siteBase).href;
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "ORIGO Fragrance Notes Library",
      url: canonical.href
    });
  }
}

function restoreStoreMeta() {
  document.title = state.lang === "ar" ? "ORIGO | أصل الحكاية العطرية" : "ORIGO | The origin of scent";
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = defaultMetaDescription;
  document.querySelector('link[rel="canonical"]')?.remove();
  document.querySelector("#notes-structured-data")?.remove();
}

function renderNotesLibrary() {
  const library = window.ORIGOFragranceNotes;
  const readyCount = library.notes.filter((note) => note.imageStatus === "ready").length;
  const referenceCount = library.notes.filter((note) => note.imageStatus === "reference").length;
  const missingCount = library.notes.filter((note) => note.imageStatus === "missing").length;
  const pendingCount = referenceCount + missingCount;
  const result = library.search(state.notesSearchQuery, {
    familyId: state.notesFamilyFilter,
    imageStatus: state.notesImageFilter,
    limit: state.notesVisibleCount
  });
  const families = library.families;
  const familyCards = families
    .map((family) => ({ family, notes: library.notes.filter((note) => note.familyId === family.id) }))
    .filter((entry) => entry.notes.length);
  $("#notes-page-content").innerHTML = `
    <header class="notes-page-hero">
      <div>
        <span class="eyebrow">${state.lang === "ar" ? "أطلس ORIGO العطري" : "ORIGO OLFACTORY ATLAS"}</span>
        <h1 id="notes-page-title">${state.lang === "ar" ? "مكتبة المكونات<br><em>العطرية.</em>" : "Fragrance Notes<br><em>Library.</em>"}</h1>
        <p>${state.lang === "ar"
          ? "استكشف العائلات والمكونات، وافهم موقع كل نوتة ثم انتقل مباشرة إلى العطور التي تحملها."
          : "Explore scent families, understand each note's role, and discover perfumes built around it."}</p>
      </div>
      <div class="notes-page-stats">
        <div class="notes-page-stat"><strong>${library.notes.length.toLocaleString()}</strong><span>${state.lang === "ar" ? "إجمالي النوتات" : "total notes"}</span></div>
        <div class="notes-page-stat complete"><strong>${readyCount.toLocaleString()}</strong><span>${state.lang === "ar" ? "صور معتمدة" : "approved artwork"}</span></div>
        <div class="notes-page-stat pending"><strong>${pendingCount.toLocaleString()}</strong><span>${state.lang === "ar" ? "بانتظار صورة" : "awaiting artwork"}</span></div>
      </div>
    </header>
    <section class="notes-family-showcase" aria-label="${state.lang === "ar" ? "عائلات النوتات العطرية" : "Fragrance note families"}">
      ${familyCards.map(({ family, notes }) => `<button data-action="filter-note-family" data-family="${escapeHTML(family.id)}" style="--family-color:${escapeHTML(family.color)};--family-accent:${escapeHTML(family.accent)}">
        <span><img src="${escapeHTML(library.artwork(notes.find((note) => note.imageStatus === "ready") || { ...notes[0], image: "" }))}" alt="" loading="lazy" /></span>
        <i>${notes.length}</i><b>${escapeHTML(familyLabel(family))}</b><small>${notes.length} ${state.lang === "ar" ? "نوتة" : "notes"}</small>
      </button>`).join("")}
    </section>
    <div class="notes-library-toolbar">
      <label class="notes-library-search"><span>⌕</span><input id="notes-library-search" type="search"
        value="${escapeHTML(state.notesSearchQuery)}" placeholder="${state.lang === "ar" ? "ابحث: ورد، Oud، برغموت…" : "Search: Rose, Oud, Bergamot…"}" /></label>
      <div class="notes-image-filters" role="group" aria-label="${state.lang === "ar" ? "حالة صور النوتات" : "Artwork status"}">
        <button data-action="filter-note-images" data-images="available" class="${state.notesImageFilter === "available" ? "active" : ""}">${state.lang === "ar" ? "صور معتمدة" : "Artwork ready"} <small>${readyCount}</small></button>
        <button data-action="filter-note-images" data-images="all" class="${state.notesImageFilter === "all" ? "active" : ""}">${state.lang === "ar" ? "كل النوتات" : "All notes"} <small>${library.notes.length}</small></button>
        <button data-action="filter-note-images" data-images="reference" class="${state.notesImageFilter === "reference" ? "active" : ""}">${state.lang === "ar" ? "مراجع تحتاج إعادة توليد" : "References to regenerate"} <small>${referenceCount}</small></button>
        <button data-action="filter-note-images" data-images="missing" class="${state.notesImageFilter === "missing" ? "active" : ""}">${state.lang === "ar" ? "صور غير مضافة" : "Missing artwork"} <small>${missingCount}</small></button>
      </div>
      <div class="notes-family-filters" role="group" aria-label="${state.lang === "ar" ? "فلترة حسب العائلة" : "Filter by family"}">
        <button data-action="filter-note-family" data-family="all" class="${state.notesFamilyFilter === "all" ? "active" : ""}">${state.lang === "ar" ? "كل العائلات" : "All families"} <small>${library.notes.length}</small></button>
        ${families.map((family) => {
          const count = library.notes.filter((note) => note.familyId === family.id).length;
          return `<button data-action="filter-note-family" data-family="${escapeHTML(family.id)}" class="${state.notesFamilyFilter === family.id ? "active" : ""}" style="--family-color:${escapeHTML(family.color)}">
            <i>${escapeHTML(family.symbol)}</i>${escapeHTML(familyLabel(family))}<small>${count}</small></button>`;
        }).join("")}
      </div>
    </div>
    <div class="notes-results-head">
      <div><span class="eyebrow">${state.lang === "ar" ? "المكونات" : "INGREDIENTS"}</span><h2>${state.notesFamilyFilter === "all"
        ? (state.lang === "ar" ? "كل المكونات" : "All notes")
        : escapeHTML(familyLabel(library.familyById(state.notesFamilyFilter)))}</h2></div>
      <b>${result.total} ${state.lang === "ar" ? "نتيجة" : "results"}</b>
    </div>
    <div class="library-notes-grid">
      ${result.items.length ? result.items.map((note) => noteCardMarkup(note)).join("") : `
        <div class="notes-empty-state"><span>⌕</span><h3>${state.lang === "ar" ? "لا توجد نتيجة مطابقة" : "No matching note"}</h3>
        <p>${state.lang === "ar" ? "جرّب اسمًا آخر أو اختر كل العائلات." : "Try another spelling or select all families."}</p></div>`}
    </div>
    ${result.total > result.items.length ? `<button class="button secondary-button notes-load-more" data-action="load-more-notes">
      ${state.lang === "ar" ? "عرض المزيد" : "Load more"} <span>＋</span></button>` : ""}`;
  updateNotesMeta();
  $("#notes-library-search")?.focus({ preventScroll: true });
}

function renderNoteDetail(note) {
  const library = window.ORIGOFragranceNotes;
  const family = library.familyById(note.familyId);
  const exactProducts = library.productsFor(note, state.products);
  const similarProducts = library.productsFor(note, state.products, { excludeExact: true }).slice(0, 6);
  const related = library.related(note, 8);
  const description = state.lang === "ar" ? note.descriptionAr : note.descriptionEn;
  const secondaryName = state.lang === "ar" ? note.nameEn : note.nameAr;
  const secondaryLabel = note.nameAr === note.nameEn
    ? (state.lang === "ar" ? "الاسم كما ورد في المصدر" : "Name as listed in the source")
    : secondaryName;
  $("#notes-page-content").innerHTML = `
    <article class="note-detail" style="--note-color:${escapeHTML(family?.color || "#77736e")};--note-accent:${escapeHTML(family?.accent || "#eee")}">
      <button class="note-detail-back" data-action="open-notes">← ${state.lang === "ar" ? "كل المكونات" : "All notes"}</button>
      <div class="note-detail-hero">
        <div class="note-detail-image"><img src="${escapeHTML(library.artwork(note))}" alt="${escapeHTML(noteLabel(note))}" data-note-artwork="true" data-note-slug="${escapeHTML(note.slug)}" /></div>
        <div class="note-detail-copy">
          <span class="eyebrow">${escapeHTML(familyLabel(family) || "")}</span>
          <h1 id="notes-page-title">${escapeHTML(noteLabel(note))}</h1>
          <p class="note-secondary-name" dir="${note.nameAr === note.nameEn ? "auto" : (state.lang === "ar" ? "ltr" : "rtl")}">${escapeHTML(secondaryLabel)}</p>
          <p>${escapeHTML(description)}</p>
          <div class="note-detail-facts">
            <span><small>${state.lang === "ar" ? "العائلة" : "FAMILY"}</small><b>${escapeHTML(familyLabel(family))}</b></span>
            <span><small>${state.lang === "ar" ? "يظهر غالبًا" : "USUAL POSITION"}</small><b>${escapeHTML(positionLabel(note.position))}</b></span>
            <span><small>${state.lang === "ar" ? "المرادفات" : "ALIASES"}</small><b>${escapeHTML((note.aliases || []).slice(0, 3).join(" · ") || "—")}</b></span>
          </div>
        </div>
      </div>

      <section class="note-detail-section">
        <div class="notes-results-head"><div><span class="eyebrow">${state.lang === "ar" ? "اختيارات ORIGO" : "ORIGO SELECTION"}</span>
          <h2>${state.lang === "ar" ? "عطور تحتوي على هذا المكوّن" : "Perfumes containing this note"}</h2></div><b>${exactProducts.length}</b></div>
        <div class="note-products-grid">${exactProducts.length ? exactProducts.map(productMiniCard).join("") : `
          <div class="note-products-empty">${state.lang === "ar" ? "لا يوجد عطر منشور مرتبط به حتى الآن." : "No published perfume is linked yet."}</div>`}</div>
      </section>

      <section class="note-detail-section">
        <div class="notes-results-head"><div><span class="eyebrow">${state.lang === "ar" ? "استكشف أكثر" : "EXPLORE FURTHER"}</span>
          <h2>${state.lang === "ar" ? "مكونات قريبة منه" : "Related notes"}</h2></div></div>
        <div class="related-notes-row">${related.map((item) => noteCardMarkup(item, true)).join("")}</div>
      </section>

      <section class="note-detail-section">
        <div class="notes-results-head"><div><span class="eyebrow">${state.lang === "ar" ? "نفس المزاج" : "SIMILAR MOOD"}</span>
          <h2>${state.lang === "ar" ? "عطور مشابهة من نفس العائلة" : "Similar perfumes from the same family"}</h2></div></div>
        <div class="note-products-grid">${similarProducts.length ? similarProducts.map(productMiniCard).join("") : `
          <div class="note-products-empty">${state.lang === "ar" ? "ستظهر الاقتراحات عند إضافة عطور أخرى من العائلة." : "Suggestions will appear as more perfumes are added."}</div>`}</div>
      </section>
    </article>`;
  updateNotesMeta(note);
}

function handleNotesRoute({ replace = false } = {}) {
  const match = location.pathname.match(/^\/notes(?:\/([a-z0-9-]+))?\/?$/i);
  const page = $("#notes-library-page");
  if (!match) {
    document.body.classList.remove("notes-route");
    page.hidden = true;
    state.activeNoteSlug = "";
    if (!replace) restoreStoreMeta();
    return false;
  }
  document.body.classList.remove("benefit-route", "catalog-route");
  document.body.classList.add("notes-route");
  page.hidden = false;
  $("#benefit-detail-page").hidden = true;
  $("#catalog-page").hidden = true;
  closeDrawers();
  $$(".overlay.open").forEach(closeOverlay);
  const slug = match[1] || "";
  state.activeNoteSlug = slug;
  if (slug) {
    const note = window.ORIGOFragranceNotes.find(slug);
    if (note) renderNoteDetail(note);
    else {
      $("#notes-page-content").innerHTML = `<div class="notes-not-found"><span>404</span><h1>${state.lang === "ar" ? "هذا المكوّن غير موجود" : "Note not found"}</h1>
        <button class="button burgundy-button" data-action="open-notes">${state.lang === "ar" ? "العودة للمكتبة" : "Back to library"}</button></div>`;
      updateNotesMeta();
    }
  } else {
    renderNotesLibrary();
  }
  if (!replace) window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

function navigateNotes(slug = "") {
  const path = slug ? `/notes/${slug}` : "/notes";
  if (location.pathname !== path) history.pushState({ notes: true }, "", path);
  handleNotesRoute();
}

function productNoteGroups(product) {
  const library = window.ORIGOFragranceNotes;
  const groups = { top: [], heart: [], base: [] };
  const savedRefs = { top: [], heart: [], base: [] };
  (product.noteRefs || []).forEach((ref) => {
    if (savedRefs[ref.position]) savedRefs[ref.position].push(ref);
  });
  Object.values(savedRefs).forEach((refs) => refs.sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)));
  const structured = product.notes || {};
  const hasStructured = ["top", "heart", "base"].some((position) =>
    (structured[`${position}Ar`] || []).length || (structured[`${position}En`] || []).length
  );
  if (hasStructured) {
    ["top", "heart", "base"].forEach((position) => {
      const preferred = structured[`${position}${state.lang === "ar" ? "Ar" : "En"}`] || [];
      const fallback = structured[`${position}${state.lang === "ar" ? "En" : "Ar"}`] || [];
      const values = preferred.length ? preferred : fallback;
      groups[position] = values.map((value, index) => ({ value, note: library.find(value), ref: savedRefs[position][index] || null, position }));
    });
  } else {
    const preferred = state.lang === "ar" ? product.notesAr : product.notesEn;
    const fallback = state.lang === "ar" ? product.notesEn : product.notesAr;
    (preferred?.length ? preferred : fallback || []).forEach((value) => {
      const note = library.find(value);
      const position = note?.position === "top" || note?.position === "base" ? note.position : "heart";
      groups[position].push({ value, note, position });
    });
  }
  return groups;
}

function productNotePyramid(product) {
  if (product.category && product.category !== "perfume") return "";
  const library = window.ORIGOFragranceNotes;
  const groups = productNoteGroups(product);
  const levels = [
    ["top", state.lang === "ar" ? "الافتتاحية" : "TOP NOTES"],
    ["heart", state.lang === "ar" ? "قلب العطر" : "HEART NOTES"],
    ["base", state.lang === "ar" ? "القاعدة" : "BASE NOTES"]
  ];
  let stateChanged = false;
  const rows = levels.map(([position, label]) => {
    const items = groups[position];
    if (!items.length) return "";
    return `<div class="dialog-pyramid-row ${position}">
      <span><small>${position.toUpperCase()}</small><b>${label}</b></span>
      <div>${items.map(({ value, note, ref }) => {
        if (!note) {
          stateChanged = library.registerUnclassified(value, position) || stateChanged;
          const unknown = {
            nameAr: ref?.nameAr || value, nameEn: ref?.nameEn || value,
            familyId: ref?.familyId || "uncategorized", symbol: "?", image: ref?.image || ""
          };
          const label = state.lang === "ar" ? unknown.nameAr || unknown.nameEn : unknown.nameEn || unknown.nameAr;
          return `<span class="dialog-note-chip${ref ? " custom" : " unknown"}"><img src="${escapeHTML(ref?.image || library.artwork(unknown))}" alt="${escapeHTML(label)}" /><b>${escapeHTML(label)}</b><small>${escapeHTML(ref ? (state.lang === "ar" ? unknown.nameEn : unknown.nameAr) : (state.lang === "ar" ? "غير مصنف" : "Unclassified"))}</small></span>`;
        }
        return `<button class="dialog-note-chip" data-action="open-note" data-slug="${escapeHTML(note.slug)}">
          <img src="${escapeHTML(library.artwork(note))}" alt="" /><b>${escapeHTML(noteLabel(note))}</b><small>${escapeHTML(state.lang === "ar" ? note.nameEn : note.nameAr)}</small></button>`;
      }).join("")}</div>
    </div>`;
  }).join("");
  if (stateChanged) localStorage.setItem("origoFragranceNotesState", JSON.stringify(library.getState()));
  if (!rows) return "";
  return `<section class="dialog-note-pyramid"><div class="panel-title"><div><span class="eyebrow">${state.lang === "ar" ? "التركيبة" : "COMPOSITION"}</span>
    <h3>${state.lang === "ar" ? "هرم المكونات العطرية" : "Fragrance note pyramid"}</h3></div><span class="panel-icon">⌁</span></div>${rows}</section>`;
}

const PRODUCT_USE_CASES = {
  work: { ar: "العمل", en: "Work", icon: "briefcase", aliases: /work|office|business|عمل|مكتب/ },
  occasions: { ar: "المناسبات", en: "Occasions", icon: "sparkles", aliases: /occasion|formal|event|wedding|مناسب|رسمي|زفاف/ },
  daily: { ar: "يومي", en: "Daily", icon: "sun", aliases: /daily|casual|day|morning|يومي|نهار|صباح/ },
  evening: { ar: "المساء", en: "Evening", icon: "moon", aliases: /evening|night|party|مساء|ليل|حفلات/ },
  romantic: { ar: "رومانسي", en: "Romantic", icon: "heart", aliases: /romantic|date|رومان|موعد/ },
  travel: { ar: "السفر", en: "Travel", icon: "plane", aliases: /travel|holiday|سفر|عطلة/ }
};

function productUseCases(product) {
  const values = [...(product.occasions || []), ...(product.usageTimes || [])].map(String);
  const matched = Object.entries(PRODUCT_USE_CASES).filter(([, item]) => values.some((value) => item.aliases.test(value.toLowerCase())));
  return (matched.length ? matched : values.slice(0, 4).map((value, index) => [`custom-${index}`, { ar: value, en: value, icon: "sparkles" }])).slice(0, 6);
}

function useCaseArtwork(kind = "sparkles") {
  const symbols = { briefcase: "▣", sparkles: "✦", sun: "☀", moon: "☾", heart: "♡", plane: "➤" };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffaf4"/><stop offset="1" stop-color="#f2ddc7"/></linearGradient></defs><rect width="320" height="180" rx="22" fill="url(#g)"/><circle cx="245" cy="35" r="70" fill="#8b0d2b" opacity=".08"/><circle cx="56" cy="156" r="82" fill="#d4a24c" opacity=".14"/><text x="160" y="116" text-anchor="middle" font-family="serif" font-size="82" fill="#741329">${symbols[kind] || symbols.sparkles}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function productGenderMarkup(product) {
  const gender = catalogGender(product);
  const data = gender === "women"
    ? { ar: "للنساء", en: "For women", symbol: "♀", image: "assets/home/gender/gender-women.png" }
    : gender === "men"
      ? { ar: "للرجال", en: "For men", symbol: "♂", image: "assets/home/gender/gender-men.png" }
      : { ar: "للجنسين", en: "Unisex", symbol: "⚥", image: "assets/home/gender/gender-unisex.png" };
  return `<article class="pdp-gender-card"><img src="${data.image}" alt="" loading="lazy"/><span aria-hidden="true">${data.symbol}</span><div><small>${state.lang === "ar" ? "التصنيف الرسمي" : "Official classification"}</small><b>${state.lang === "ar" ? data.ar : data.en}</b></div></article>`;
}

function productSuitabilityMarkup(product) {
  const items = productUseCases(product);
  if (!items.length) return `<div class="pdp-empty-compact">${state.lang === "ar" ? "لم تُحدد الاستخدامات المناسبة بعد." : "Suitable uses are not configured yet."}</div>`;
  return `<section class="pdp-suitability"><header><span>${state.lang === "ar" ? "مناسب لماذا؟" : "Best suited for"}</span><p>${state.lang === "ar" ? "اقتراحات فريق ORIGO بحسب طابع العطر، وليست تصويتات عملاء." : "ORIGO editorial guidance based on the fragrance character."}</p></header><div>${items.map(([, item]) => `<article><img src="${useCaseArtwork(item.icon)}" alt="" loading="lazy"/><b>${escapeHTML(state.lang === "ar" ? item.ar : item.en)}</b></article>`).join("")}</div></section>`;
}

function productAccordMarkup(product) {
  const values = product.accordProfile?.length ? product.accordProfile : (product.mainAccords || product.accords || []);
  const accords = (Array.isArray(values) ? values : []).slice(0, 8).map((item) => typeof item === "object" ? item : { name: item });
  if (!accords.length) return `<div class="pdp-empty-compact">${state.lang === "ar" ? "لم تُضف البصمة العطرية بعد." : "The fragrance fingerprint is not configured yet."}</div>`;
  return `<section class="pdp-accord-profile"><p>${state.lang === "ar" ? "أبرز الروائح التي ستشعر بها في هذا العطر." : "The leading impressions you will experience in this fragrance."}</p><div>${accords.map((item, index) => { const intensity = Number(item.strength ?? item.intensity); const hasIntensity = Number.isFinite(intensity) && intensity > 0; return `<article title="${escapeHTML(item.descriptionAr || item.descriptionEn || "")}"><span><i style="--accord-color:${escapeHTML(item.color || ["#bc173d","#d79b26","#e97198","#9b7fba","#e67656","#7aaa4d"][index % 6])}"></i><b>${escapeHTML(item[state.lang === "ar" ? "nameAr" : "nameEn"] || item.name || item.label || "")}</b>${hasIntensity ? `<em>${Math.min(100, intensity)}%</em>` : ""}</span>${hasIntensity ? `<div><i style="width:${Math.min(100, intensity)}%;--accord-color:${escapeHTML(item.color || "#8b0d2b")}"></i></div>` : ""}${item.descriptionAr || item.descriptionEn ? `<small>${escapeHTML(item[state.lang === "ar" ? "descriptionAr" : "descriptionEn"] || item.descriptionAr || item.descriptionEn)}</small>` : ""}</article>`; }).join("")}</div><button type="button" class="pdp-accord-help" data-action="accord-help">${state.lang === "ar" ? "كيف نقرأ البصمة العطرية؟" : "How to read the fragrance fingerprint"}</button></section>`;
}

function productProfileImage(product, key) {
  const entry = product.profileImages?.[key];
  if (!entry) return "";
  if (typeof entry === "string") return entry;
  return String(entry[state.lang] || entry.ar || entry.en || "");
}

function productProfileArtwork(product, key, className = "") {
  const source = productProfileImage(product, key);
  if (!source) return "";
  const field = PRODUCT_PROFILE_IMAGE_FIELDS.find(([fieldKey]) => fieldKey === key);
  const label = field ? (state.lang === "ar" ? field[1] : field[2]) : key;
  return `<figure class="pdp-profile-artwork ${className}"><img src="${escapeHTML(source)}" alt="${escapeHTML(label)}" loading="lazy"/></figure>`;
}

function productPerformanceImagesMarkup(product) {
  const keys = ["scent", "wear", "longevity", "sillage", "gender", "value"];
  const cards = keys.map((key) => productProfileArtwork(product, key, `is-${key}`)).filter(Boolean);
  if (!cards.length) return `<div class="pdp-empty-compact">${state.lang === "ar" ? "لم تُرفع صور مؤشرات العطر بعد." : "Fragrance insight artwork has not been uploaded yet."}</div>`;
  return `<div class="pdp-performance-artwork-grid">${cards.join("")}</div>`;
}

function productHeroProfileMarkup(product) {
  const ar = state.lang === "ar";
  const artwork = productProfileArtwork(product, "fingerprint", "is-fingerprint");
  return `<aside class="pdp-hero-profile"><header><span>⌁</span><div><b>${ar ? "البصمة العطرية" : "Fragrance fingerprint"}</b><small>${ar ? "تحليل تحريري جاهز من ORIGO" : "Ready-made ORIGO editorial analysis"}</small></div></header>${artwork || productAccordMarkup(product)}</aside>`;
}

function productIngredientsMarkup(product) {
  const values = Array.isArray(product.mainIngredients) ? product.mainIngredients : [];
  if (!values.length) return "";
  return `<section class="pdp-main-ingredients"><div class="pdp-section-heading"><span>KEY INGREDIENTS</span><h2>${state.lang === "ar" ? "المكونات الأساسية" : "Key ingredients"}</h2><p>${state.lang === "ar" ? "المواد الأبرز التي تبني شخصية العطر، منفصلة عن هرم النوتات." : "The leading materials shaping the fragrance, separate from its note pyramid."}</p></div><div>${values.map((value) => { const note = window.ORIGOFragranceNotes?.find(value); const image = note ? window.ORIGOFragranceNotes.artwork(note) : useCaseArtwork("sparkles"); const label = note ? noteLabel(note) : value; return `<article><img src="${escapeHTML(image)}" alt="${escapeHTML(label)}" loading="lazy"/><b>${escapeHTML(label)}</b></article>`; }).join("")}</div></section>`;
}

function productProfileAccordions(product) {
  const ar = state.lang === "ar";
  return `<section class="pdp-profile-accordions" aria-label="${ar ? "ملف العطر" : "Fragrance profile"}">
    <article class="pdp-profile-section is-open" data-pdp-section="notes"><button type="button" data-action="pdp-profile-section" aria-expanded="true"><span>△</span><div><b>${ar ? "هرم النوتات" : "Note pyramid"}</b><small>${ar ? "افتتاحية · قلب · قاعدة" : "Top · heart · base"}</small></div><i>⌃</i></button><div class="pdp-profile-panel">${productNotePyramid(product) || `<div class="pdp-empty-compact">${ar ? "لم تُضف النوتات العطرية لهذا المنتج بعد." : "Fragrance notes are not available yet."}</div>`}</div></article>
    <article class="pdp-profile-section" data-pdp-section="performance"><button type="button" data-action="pdp-profile-section" aria-expanded="false"><span>▥</span><div><b>${ar ? "مؤشرات العطر" : "Fragrance insights"}</b><small>${ar ? "الرائحة · الثبات · الفوحان · الموسم · النوع · القيمة" : "Scent · longevity · sillage · season · gender · value"}</small></div><i>⌄</i></button><div class="pdp-profile-panel" hidden>${productPerformanceImagesMarkup(product)}</div></article>
  </section>`;
}

async function persistNotesState({ syncKnowledge = true } = {}) {
  const value = window.ORIGOFragranceNotes.getState();
  try {
    localStorage.setItem("origoFragranceNotesState", JSON.stringify(value));
  } catch (storageError) {
    console.warn("Note state exceeded local storage; server persistence will continue.", storageError);
  }
  if (state.serverAvailable && isStaffUser()) {
    const knowledge = syncKnowledge ? window.ORIGOFragranceNotes.notes.map((note) => ({
      id: note.slug,
      nameAr: note.nameAr,
      nameEn: note.nameEn,
      aliases: note.aliases || [],
      image: note.image || "",
      familyId: note.familyId,
      parentId: note.parentId || null,
      related: note.related || [],
      compatible: note.compatible || [],
      opposite: note.opposite || [],
      defaultIntensity: Number(note.defaultIntensity || 3)
    })) : null;
    const result = await api("/api/admin/notes/state", {
      method: "POST",
      body: JSON.stringify({ state: value, ...(knowledge ? { knowledge } : {}) })
    });
    window.ORIGOFragranceNotes.setState(result.state);
    try {
      localStorage.setItem("origoFragranceNotesState", JSON.stringify(result.state));
    } catch (storageError) {
      console.warn("Saved note state is available on the server but not in local storage.", storageError);
    }
  }
}

function notesAdminOptions(selected = "") {
  return window.ORIGOFragranceNotes.families.map((family) =>
    `<option value="${escapeHTML(family.id)}"${family.id === selected ? " selected" : ""}>${escapeHTML(family.nameAr)} · ${escapeHTML(family.nameEn)}</option>`
  ).join("");
}

function resetNoteAdminForm(seed = {}) {
  state.activeAdminNoteSlug = "";
  state.pendingNoteImage = "";
  const form = $("#note-admin-form");
  form.reset();
  form.elements.originalSlug.value = "";
  form.elements.nameAr.value = seed.nameAr || "";
  form.elements.nameEn.value = seed.nameEn || "";
  form.elements.slug.value = seed.slug || "";
  form.elements.position.value = seed.position || "multiple";
  form.elements.defaultIntensity.value = seed.defaultIntensity || 3;
  form.elements.parentId.value = seed.parentId || "";
  form.elements.related.value = (seed.related || []).join(", ");
  form.elements.compatible.value = (seed.compatible || []).join(", ");
  form.elements.opposite.value = (seed.opposite || []).join(", ");
  form.elements.familyId.innerHTML = notesAdminOptions(seed.familyId || "uncategorized");
  const preview = $("#note-admin-image-preview");
  preview.dataset.noteArtwork = "true";
  preview.dataset.noteSlug = "";
  preview.dataset.noteNameAr = seed.nameAr || "مكوّن جديد";
  preview.dataset.noteNameEn = seed.nameEn || "NEW NOTE";
  preview.dataset.noteFamily = seed.familyId || "uncategorized";
  delete preview.dataset.noteFallback;
  preview.src = window.ORIGOFragranceNotes.artwork({
    nameAr: seed.nameAr || "مكوّن جديد", nameEn: seed.nameEn || "NEW NOTE",
    familyId: seed.familyId || "uncategorized", symbol: "✦"
  });
  const imageStatus = $("#note-image-status");
  if (imageStatus) imageStatus.textContent = adminCopy("اختر صورة واضحة بخلفية شفافة أو بيضاء.", "Choose a clear image with a transparent or white background.");
  $("#note-merge-select").innerHTML = `<option value="">— بدون دمج —</option>${window.ORIGOFragranceNotes.notes.map((note) =>
    `<option value="${escapeHTML(note.slug)}">${escapeHTML(note.nameAr)} · ${escapeHTML(note.nameEn)}</option>`
  ).join("")}`;
}

function populateNoteAdminForm(note) {
  if (!note) return;
  switchNotesAdminTab("note");
  state.activeAdminNoteSlug = note.slug;
  state.pendingNoteImage = "";
  const form = $("#note-admin-form");
  form.elements.originalSlug.value = note.slug;
  form.elements.nameAr.value = note.nameAr || "";
  form.elements.nameEn.value = note.nameEn || "";
  form.elements.slug.value = note.slug;
  form.elements.familyId.innerHTML = notesAdminOptions(note.familyId);
  form.elements.position.value = note.position || "multiple";
  form.elements.aliases.value = (note.aliases || []).join(", ");
  form.elements.defaultIntensity.value = note.defaultIntensity || 3;
  form.elements.parentId.value = note.parentId || "";
  form.elements.related.value = (note.related || []).join(", ");
  form.elements.compatible.value = (note.compatible || []).join(", ");
  form.elements.opposite.value = (note.opposite || []).join(", ");
  form.elements.descriptionAr.value = note.descriptionAr || "";
  form.elements.descriptionEn.value = note.descriptionEn || "";
  form.elements.image.value = note.image || "";
  const preview = $("#note-admin-image-preview");
  preview.dataset.noteArtwork = "true";
  preview.dataset.noteSlug = note.slug;
  preview.dataset.noteNameAr = note.nameAr || "";
  preview.dataset.noteNameEn = note.nameEn || "";
  preview.dataset.noteFamily = note.familyId || "uncategorized";
  delete preview.dataset.noteFallback;
  preview.src = window.ORIGOFragranceNotes.artwork(note);
  const imageStatus = $("#note-image-status");
  if (imageStatus) imageStatus.textContent = note.image
    ? adminCopy("الصورة الحالية جاهزة ويمكن استبدالها.", "Current artwork is ready and can be replaced.")
    : adminCopy("لا توجد صورة مخصصة؛ تظهر صورة بديلة تلقائيًا.", "No custom artwork; an automatic fallback is shown.");
  $("#note-merge-select").innerHTML = `<option value="">— بدون دمج —</option>${window.ORIGOFragranceNotes.notes
    .filter((item) => item.slug !== note.slug).map((item) =>
      `<option value="${escapeHTML(item.slug)}">${escapeHTML(item.nameAr)} · ${escapeHTML(item.nameEn)}</option>`
    ).join("")}`;
}

function switchNotesAdminTab(tab) {
  $$(".notes-admin-tabs button").forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  $("#note-admin-form").hidden = tab !== "note";
  $("#family-admin-form").hidden = tab !== "family";
  $("#unclassified-admin-panel").hidden = tab !== "unclassified";
  if (tab === "unclassified") renderUnclassifiedNotes();
}

function renderUnclassifiedNotes() {
  const items = window.ORIGOFragranceNotes.unclassified;
  $("#unclassified-notes-list").innerHTML = items.length ? items.map((item) => `
    <article><span>?</span><div><b>${escapeHTML(item.name)}</b><small>${escapeHTML(positionLabel(item.position))}</small></div>
      <button data-action="classify-note" data-name="${escapeHTML(item.name)}" data-position="${escapeHTML(item.position)}">تصنيف وربط ←</button></article>`).join("") : `
    <div class="notes-empty-state"><span>✓</span><h3>لا توجد مكونات بانتظار التصنيف</h3><p>كل أسماء المنتجات الحالية مرتبطة بالمكتبة.</p></div>`;
}

function renderNotesAdmin() {
  const library = window.ORIGOFragranceNotes;
  const query = $("#notes-admin-search")?.value || "";
  const matches = library.search(query, { limit: 120 }).items;
  const artworkCount = library.notes.reduce((count, note) => count + (library.artwork(note) ? 1 : 0), 0);
  $("#notes-admin-stats").innerHTML = `
    <article><span>✦</span><div><b>${library.notes.length}</b><small>مكوّن</small></div></article>
    <article class="${artworkCount === library.notes.length ? "complete" : "attention"}"><span>▧</span><div><b>${artworkCount}</b><small>صورة جاهزة</small></div></article>
    <article><span>◉</span><div><b>${library.families.length}</b><small>عائلة رئيسية</small></div></article>
    <article><span>?</span><div><b>${library.unclassified.length}</b><small>غير مصنف</small></div></article>`;
  $("#notes-admin-list").innerHTML = matches.map((note) => {
    const family = library.familyById(note.familyId);
    return `<button data-action="edit-note" data-slug="${escapeHTML(note.slug)}" class="${state.activeAdminNoteSlug === note.slug ? "active" : ""}">
      <img src="${escapeHTML(library.artwork(note))}" alt="" loading="lazy" data-note-artwork="true" data-note-slug="${escapeHTML(note.slug)}" /><span><b>${escapeHTML(note.nameAr)}</b><small>${escapeHTML(note.nameEn)} · ${escapeHTML(family?.nameAr || "")}</small></span><i>←</i></button>`;
  }).join("");
  if (!state.activeAdminNoteSlug && !$("#note-admin-form").elements.nameAr.value) resetNoteAdminForm();
  else $("#note-family-select").innerHTML = notesAdminOptions($("#note-family-select").value);
  renderUnclassifiedNotes();
}

function renderNoteMatchPreview(form) {
  const library = window.ORIGOFragranceNotes;
  if (!library || !form) return;
  const data = new FormData(form);
  const draft = { notes: {} };
  ["top", "heart", "base"].forEach((level) => {
    draft.notes[`${level}Ar`] = csvValues(data.get(`${level}Ar`));
    draft.notes[`${level}En`] = csvValues(data.get(`${level}En`));
  });
  const enriched = library.enrichProduct(draft, { registerUnknowns: false });
  const preview = $("#note-library-match-preview");
  if (!preview) return;
  const matches = enriched.matches.filter((note, index, list) => list.findIndex((item) =>
    item.slug === note.slug && item.requestedPosition === note.requestedPosition
  ) === index);
  preview.innerHTML = `
    <div class="note-match-head"><b>${adminCopy("مطابقة المكتبة", "Library matching")}</b>
      <span>${matches.length} ${adminCopy("مطابق", "matched")} · ${enriched.unknown.length} ${adminCopy("غير مصنف", "unclassified")}</span></div>
    <div class="note-match-items">${matches.map((note) => `<span><img src="${escapeHTML(library.artwork(note))}" alt="" data-note-artwork="true" data-note-slug="${escapeHTML(note.slug)}" />
      <b>${escapeHTML(note.nameAr)}</b><small>${escapeHTML(note.nameEn)} · ${escapeHTML(positionLabel(note.requestedPosition))}</small></span>`).join("")}
      ${enriched.unknown.map((item) => `<span class="unknown"><i>?</i><b>${escapeHTML(item.name)}</b><small>${adminCopy("سيضاف للمراجعة", "Added to review queue")}</small></span>`).join("")}</div>`;
}

function productMedia(product) {
  const media = Array.isArray(product.images) ? product.images : [];
  const urls = media.map((item) => typeof item === "string" ? item : item?.url).filter(Boolean);
  if (product.image) urls.unshift(product.image);
  return [...new Set(urls)].map((url) => ({ url, type: "image" }));
}

function productRelated(product, limit = 4) {
  const sourceNotes = new Set([...(product.notesAr || []), ...(product.notesEn || [])].map((note) => ORIGOCatalog.normalize(note)));
  return state.products.filter((item) => item.id !== product.id && item.category === product.category).map((item) => {
    const targetNotes = new Set([...(item.notesAr || []), ...(item.notesEn || [])].map((note) => ORIGOCatalog.normalize(note)));
    const shared = [...sourceNotes].filter((note) => targetNotes.has(note));
    const union = new Set([...sourceNotes, ...targetNotes]).size || 1;
    const notesScore = (shared.length / union) * 40;
    const familyScore = product.familyEn && item.familyEn && product.familyEn === item.familyEn ? 25 : 0;
    const genderScore = (product.typeEn || product.type) === (item.typeEn || item.type) ? 15 : 0;
    const priceScore = product.price && Math.abs(item.price - product.price) / product.price <= .25 ? 10 : 0;
    return { item, shared, score: Math.round(((notesScore + familyScore + genderScore + priceScore) / 90) * 100) };
  }).sort((a, b) => b.score - a.score || a.item.price - b.item.price).slice(0, limit);
}

function rememberProduct(productId) {
  const recent = readStoredArray("origoRecentlyViewed").filter((id) => id !== productId);
  recent.unshift(productId);
  localStorage.setItem("origoRecentlyViewed", JSON.stringify(recent.slice(0, 8)));
}

function productStructuredData(product, media) {
  const name = localizedProductName(product);
  const slug = product.slug || product.id;
  const canonical = `${location.origin}/?product=${encodeURIComponent(slug)}`;
  document.title = `${name} | ORIGO`;
  const description = (state.lang === "ar" ? product.descriptionAr : product.descriptionEn) || `${product.brand} ${name}`;
  let descriptionMeta = document.querySelector('meta[name="description"]');
  descriptionMeta.content = String(description).slice(0, 155);
  let canonicalNode = document.querySelector('link[rel="canonical"]');
  if (!canonicalNode) {
    canonicalNode = document.createElement("link");
    canonicalNode.rel = "canonical";
    document.head.append(canonicalNode);
  }
  canonicalNode.href = canonical;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: media.map((item) => new URL(item.url, location.origin).href),
    description: String(description).slice(0, 500),
    sku: product.sku || undefined,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: "EGP",
      price: Number(product.price),
      availability: product.status === "unavailable" || Number(product.inventory?.quantity) === 0
        ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
    }
  };
  if (Number(product.reviewSummary?.count) > 0) schema.aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: Number(product.reviewSummary.average),
    reviewCount: Number(product.reviewSummary.count)
  };
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: state.lang === "ar" ? "الرئيسية" : "Home", item: location.origin },
      { "@type": "ListItem", position: 2, name: state.lang === "ar" ? "العطور" : "Perfumes", item: `${location.origin}/#featured` },
      { "@type": "ListItem", position: 3, name: product.brand, item: canonical },
      { "@type": "ListItem", position: 4, name, item: canonical }
    ]
  };
  let node = $("#product-structured-data");
  if (!node) {
    node = document.createElement("script");
    node.id = "product-structured-data";
    node.type = "application/ld+json";
    document.head.append(node);
  }
  node.textContent = JSON.stringify([schema, breadcrumbs]);
}

function performanceScoreOutOfTen(value, product, kind) {
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    return Math.min(10, Math.max(0, numeric <= 5 ? numeric * 2 : numeric));
  }
  const concentration = String(product?.concentration || "").toLowerCase();
  if (concentration.includes("parfum") || concentration.includes("extrait")) return kind === "sillage" ? 8 : 8.5;
  if (concentration.includes("edp") || concentration.includes("eau de parfum")) return kind === "sillage" ? 7.5 : 8;
  if (concentration.includes("edt") || concentration.includes("eau de toilette")) return kind === "sillage" ? 6.5 : 6;
  return 7;
}

function formatPerformanceScore(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function performanceScoreMarkup(value, product, kind, label) {
  const score = performanceScoreOutOfTen(value, product, kind);
  const percentage = Math.round(score * 10);
  return `<span class="performance-score" role="img" aria-label="${escapeHTML(label)}: ${formatPerformanceScore(score)} ${state.lang === "ar" ? "من 10" : "out of 10"}"><span class="performance-score-track" aria-hidden="true"><i style="width:${percentage}%"></i></span><b dir="ltr">${formatPerformanceScore(score)}/10</b></span>`;
}

function productPerformanceMarkup(product) {
  const performance = product.performance || {};
  const insights = product.insights || {};
  const values = [
    ["◷", "الثبات", "Longevity", performance.longevity ?? insights.longevity, "longevity"],
    ["◉", "الفوحان", "Sillage", performance.sillage ?? performance.projection ?? insights.sillage, "sillage"],
    ["❧", "الموسم", "Season", (product.seasons || []).join(" · "), ""],
    ["◇", "الاستخدام", "Occasion", (product.occasions || []).join(" · "), ""]
  ].filter((item) => item[3] !== undefined && item[3] !== null && item[3] !== "");
  if (!values.length) return "";
  return `<section class="pdp-performance" aria-labelledby="pdp-performance-title"><div class="pdp-section-heading"><span>EDITORIAL</span><h2 id="pdp-performance-title">${state.lang === "ar" ? "ملخص الأداء التحريري" : "Editorial performance"}</h2><p>${state.lang === "ar" ? "بيانات يقدمها فريق المنتج وليست تصويتًا مجتمعيًا." : "Product-team data, not community voting."}</p></div><div>${values.map(([icon, ar, en, value, kind]) => {
    const label = state.lang === "ar" ? ar : en;
    return `<article><i>${icon}</i><small>${label}</small>${kind ? performanceScoreMarkup(value, product, kind, label) : `<b>${escapeHTML(value)}</b>`}</article>`;
  }).join("")}</div></section>`;
}

function productCardGenderLabel(product, isArabic = state.lang === "ar") {
  const value = String((Array.isArray(product.genders) && product.genders[0]) || product.gender || "unisex").toLowerCase();
  const labels = {
    men: ["رجالي", "Men"], male: ["رجالي", "Men"],
    women: ["نسائي", "Women"], female: ["نسائي", "Women"],
    unisex: ["للجنسين", "Unisex"], children: ["أطفال", "Children"]
  };
  return (labels[value] || [value, value])[isArabic ? 0 : 1];
}

function productCardAuraNotes(product, isArabic = state.lang === "ar") {
  const notesByLevel = product.notes || {};
  const structuredNotes = Array.isArray(product.noteRefs) && product.noteRefs.length
    ? product.noteRefs
    : (Array.isArray(product.noteLibrary?.refs) ? product.noteLibrary.refs : []);
  const candidates = structuredNotes.length ? structuredNotes : [
    ...(Array.isArray(product.featuredNotes) ? product.featuredNotes : []),
    ...((isArabic ? product.notesAr : product.notesEn) || []),
    ...((isArabic ? notesByLevel.topAr : notesByLevel.topEn) || []),
    ...((isArabic ? notesByLevel.heartAr : notesByLevel.heartEn) || []),
    ...((isArabic ? notesByLevel.baseAr : notesByLevel.baseEn) || [])
  ].filter(Boolean);
  const seen = new Set();
  const notes = candidates.map((value) => {
    const lookup = typeof value === "object" ? value.id || value.nameEn || value.nameAr : value;
    const note = window.ORIGOFragranceNotes?.find(lookup);
    const nameAr = note?.nameAr || value?.nameAr || String(value);
    const nameEn = note?.nameEn || value?.nameEn || String(value);
    const label = isArabic ? nameAr : nameEn;
    const key = ORIGOCatalog.normalize(label);
    if (!key || seen.has(key)) return null;
    seen.add(key);
    return {
      label,
      nameAr,
      nameEn,
      image: value?.image || (note ? window.ORIGOFragranceNotes.artwork(note) : "")
    };
  }).filter(Boolean);
  const isKhamrah = /khamrah|خمر[ةه]/.test(ORIGOCatalog.normalize(`${product.nameAr || ""} ${product.nameEn || ""}`));
  if (isKhamrah && notes.length < 6) {
    resolveProductCardComponents().FALLBACK_NOTES.forEach((fallback) => {
      if (notes.length >= 6) return;
      const key = ORIGOCatalog.normalize(isArabic ? fallback.nameAr : fallback.nameEn);
      if (seen.has(key) || notes.some((note) => ORIGOCatalog.normalize(note.nameEn) === ORIGOCatalog.normalize(fallback.nameEn))) return;
      seen.add(key);
      notes.push({ ...fallback, label: isArabic ? fallback.nameAr : fallback.nameEn });
    });
  }
  return notes.slice(0, 6);
}

function resolveProductCardComponents() {
  const components = window.ORIGOProductCardComponents;
  const required = [
    "cardEdgeEffects",
    "perfumeAura",
    "perfumeSmokeAura",
    "noteBubbles",
    "performanceBubbles",
    "productDots",
    "topActions",
    "addToCartButton",
    "performanceTrigger"
  ];
  if (components && required.every((key) => typeof components[key] === "function")) return components;

  return {
    FALLBACK_NOTES: [],
    cardEdgeEffects: () => "",
    perfumeAura: () => "",
    perfumeSmokeAura: () => "",
    noteBubbles: () => "",
    performanceBubbles: () => "",
    productDots: (mediaCount, activeIndex, productId, isArabic) => mediaCount <= 1
      ? `<div class="card-image-dots card-image-dots--single" aria-hidden="true"><span class="active"></span></div>`
      : `<div class="card-image-dots" aria-label="${isArabic ? "صور المنتج" : "Product images"}">${Array.from({ length: mediaCount }, (_, index) => `<button data-action="card-image-index" data-id="${escapeHTML(productId)}" data-index="${index}" class="${index === activeIndex ? "active" : ""}" aria-label="${isArabic ? `الصورة ${index + 1}` : `Image ${index + 1}`}"></button>`).join("")}</div>`,
    topActions: ({ saved, compared, interactive, disabled, favoriteLabel, compareLabel }) => `<div class="product-card-top-actions">
      <button class="card-action-button card-favorite-button${saved ? " active" : ""}"${interactive ? ` data-action="toggle-wishlist"` : disabled} aria-label="${escapeHTML(favoriteLabel)}" aria-pressed="${saved}">♡</button>
      <button class="card-action-button card-compare-button${compared ? " active" : ""}"${interactive ? ` data-action="toggle-product-compare"` : disabled} aria-label="${escapeHTML(compareLabel)}" aria-pressed="${compared}">⚖</button>
    </div>`,
    addToCartButton: ({ interactive, disabled, outOfStock, label, unavailableLabel }) => `<button class="card-add-button"${interactive ? ` data-action="add-to-cart"` : disabled} aria-label="${escapeHTML(label)}"${outOfStock ? " disabled" : ""}>
      <i aria-hidden="true">▢</i><span class="card-add-label">${escapeHTML(outOfStock ? unavailableLabel : label)}</span><span class="card-add-loading" aria-hidden="true"></span>
    </button>`,
    performanceTrigger: () => ""
  };
}

function productCardPerformance(product, isArabic = state.lang === "ar", strict = false) {
  const performance = product.performance || product.editorialPerformance || {};
  const filterData = product.filters || {};
  const isKhamrah = /khamrah|خمر[ةه]/.test(ORIGOCatalog.normalize(`${product.nameAr || ""} ${product.nameEn || ""}`));
  const seasons = [...(product.seasons || []), ...(Array.isArray(filterData.season) ? filterData.season : [filterData.season])].filter(Boolean).map((item) => ORIGOCatalog.normalize(item));
  const occasions = [...(product.usageTimes || []), ...(product.occasions || [])].map((item) => ORIGOCatalog.normalize(item));
  const genderSource = product.gender || product.forGender || filterData.gender;
  const ratingSource = product.averageRating ?? product.ratingAverage ?? product.rating;
  const winter = seasons.some((item) => /winter|شتاء|شتوي/.test(item));
  const evening = isKhamrah || occasions.some((item) => /night|evening|مساء|ليل|سهرة/.test(item));
  const normalizeScore = (value, fallback = 5) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.max(1, Math.min(5, Math.round(numeric > 5 ? numeric / 2 : numeric)));
  };
  const sillageSource = performance.sillage ?? performance.projection ?? filterData.projection ?? product.insights?.sillage;
  const longevitySource = performance.longevity ?? performance.longevityScore ?? filterData.longevity ?? product.insights?.longevity;
  const sillage = normalizeScore(sillageSource);
  const longevity = normalizeScore(longevitySource);
  const rawSillageRating = Number(sillageSource);
  const sillageRating = Number.isFinite(rawSillageRating)
    ? Math.max(1, Math.min(5, rawSillageRating > 5 ? rawSillageRating / 2 : rawSillageRating))
    : sillage;
  const sillageRatingLabel = Number.isInteger(sillageRating) ? String(sillageRating) : sillageRating.toFixed(1);
  const percentage = (source, fallback) => {
    const numeric = Number(source);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.round(Math.max(0, Math.min(100, numeric > 5 ? numeric * 10 : numeric * 20)));
  };
  const projectionPercentage = percentage(sillageSource, 85);
  const longevityPercentage = percentage(longevitySource, 92);
  const longevityHours = isKhamrah ? Math.max(10, Math.round(Number(longevitySource) || 10)) : (Number(longevitySource) > 5 ? Math.round(Number(longevitySource)) : 10);
  const sillageValue = sillage >= 4 ? (isArabic ? "قوي" : "Strong") : sillage === 3 ? (isArabic ? "متوسط" : "Moderate") : (isArabic ? "هادئ" : "Soft");
  const rawGender = ORIGOCatalog.normalize(genderSource || "");
  const genderValue = /women|female|نسائ/.test(rawGender)
    ? (isArabic ? "نسائي" : "Women")
    : /men|male|رجال|رجالي/.test(rawGender)
      ? (isArabic ? "رجالي" : "Men")
      : (isArabic ? "للجنسين" : "Unisex");
  const numericRating = Number(ratingSource);
  const metrics = [
    { id: "projection", available: sillageSource !== undefined && sillageSource !== null && sillageSource !== "", icon: "≋", title: isArabic ? "الفوحان" : "Sillage", value: isArabic ? `فوحان ${sillageValue}` : `${sillageValue} sillage`, detail: `${sillageRatingLabel}/5`, score: sillageRating, percentage: projectionPercentage, color: "#E76F9A" },
    { id: "longevity", available: longevitySource !== undefined && longevitySource !== null && longevitySource !== "", icon: "◷", title: isArabic ? "الثبات" : "Longevity", value: isArabic ? "ثبات طويل" : "Long lasting", detail: isArabic ? `${longevityHours}+ ساعات` : `${longevityHours}+ hours`, score: longevity, percentage: longevityPercentage, color: "#568FE8" },
    { id: "occasion", available: occasions.length > 0, icon: "✦", title: isArabic ? "المناسبة" : "Occasion", value: evening ? (isArabic ? "السهرات" : "Nights out") : (isArabic ? "يومي" : "Everyday"), detail: evening ? (isArabic ? "للمناسبات" : "For occasions") : (isArabic ? "استخدام مرن" : "Versatile wear"), score: evening ? 5 : 4, percentage: evening ? 88 : 80, color: "#42B5B2" },
    { id: "season", available: seasons.length > 0, icon: "❄", title: isArabic ? "الفصل" : "Season", value: winter ? (isArabic ? "شتوي" : "Winter") : (isArabic ? "كل الفصول" : "All season"), detail: isArabic ? "أفضل فصل" : "Best season", score: winter ? 5 : 4, percentage: winter ? 95 : 82, color: "#8C6DE8" },
    { id: "gender", available: Boolean(genderSource), icon: "♢", title: isArabic ? "الفئة" : "Gender", value: genderValue, detail: isArabic ? "الفئة المقترحة" : "Suggested audience", score: 4, percentage: 80, color: "#D49A45" },
    { id: "rating", available: Number.isFinite(numericRating) && numericRating > 0, icon: "★", title: isArabic ? "التقييم" : "Rating", value: Number.isFinite(numericRating) ? numericRating.toFixed(1) : "—", detail: isArabic ? "من 5" : "out of 5", score: numericRating || 0, percentage: Number.isFinite(numericRating) ? Math.round(Math.min(5, numericRating) * 20) : 0, color: "#C8942E" }
  ];
  return strict ? metrics.filter((metric) => metric.available) : metrics;
}

let productCardRenderSerial = 0;

function normalizeProductCardNote(value, isArabic) {
  const source = value && typeof value === "object" ? value : { id: value, nameAr: value, nameEn: value };
  const lookup = source.id || source.slug || source.nameEn || source.nameAr;
  const libraryNote = window.ORIGOFragranceNotes?.find?.(lookup);
  const nameAr = source.nameAr || libraryNote?.nameAr || String(value || "");
  const nameEn = source.nameEn || libraryNote?.nameEn || String(value || "");
  return {
    id: source.id || libraryNote?.id || ORIGOCatalog.normalize(nameEn || nameAr),
    label: isArabic ? nameAr : nameEn,
    image: source.image || libraryNote?.image || ""
  };
}

function productCardNoteGroups(product, isArabic) {
  const labels = isArabic
    ? { top: "المقدمة", heart: "القلب", base: "القاعدة", all: "النوتات" }
    : { top: "Top", heart: "Heart", base: "Base", all: "Notes" };
  const groups = { top: [], heart: [], base: [], all: [] };
  const pushUnique = (position, value) => {
    const note = normalizeProductCardNote(value, isArabic);
    if (!note.label) return;
    const key = ORIGOCatalog.normalize(note.id || note.label);
    if (!groups[position].some((item) => ORIGOCatalog.normalize(item.id || item.label) === key)) groups[position].push(note);
  };
  (Array.isArray(product.noteRefs) ? product.noteRefs : []).forEach((note) => {
    const position = ["top", "heart", "base"].includes(note.position) ? note.position : "all";
    pushUnique(position, note);
  });
  const notes = product.notes && typeof product.notes === "object" ? product.notes : {};
  ["top", "heart", "base"].forEach((position) => {
    if (groups[position].length) return;
    const languageKey = `${position}${isArabic ? "Ar" : "En"}`;
    const fallbackKey = `${position}${isArabic ? "En" : "Ar"}`;
    const values = notes[languageKey] || notes[fallbackKey] || product.noteSelections?.[position] || [];
    (Array.isArray(values) ? values : [values]).filter(Boolean).forEach((value) => pushUnique(position, value));
  });
  if (!["top", "heart", "base"].some((position) => groups[position].length)) {
    const existing = groups.all.splice(0);
    const values = existing.length
      ? existing
      : ((isArabic ? product.notesAr : product.notesEn) || product.notesAr || product.notesEn || product.mainIngredients || []);
    const items = (Array.isArray(values) ? values : [values]).filter(Boolean);
    const chunk = Math.max(1, Math.ceil(items.length / 3));
    items.forEach((value, index) => pushUnique(index < chunk ? "top" : index < chunk * 2 ? "heart" : "base", value));
  }
  return Object.entries(groups).filter(([, items]) => items.length).map(([id, items]) => ({ id, label: labels[id], items }));
}

function productCardAccordData(product, isArabic) {
  const values = product.accordProfile?.length ? product.accordProfile : (product.mainAccords || product.accords || []);
  return (Array.isArray(values) ? values : []).slice(0, 8).map((item, index) => {
    const source = item && typeof item === "object" ? item : { nameAr: item, nameEn: item };
    const strength = Number(source.strength ?? source.intensity);
    return {
      label: source[isArabic ? "nameAr" : "nameEn"] || source.name || source.label || "",
      color: source.color || ["#9b6b43", "#c47b16", "#ec6d9c", "#6f8c71"][index % 4],
      strength: Number.isFinite(strength) && strength > 0 ? Math.min(100, strength) : null
    };
  }).filter((item) => item.label);
}

function productCardProjectionLabel(product, isArabic) {
  const raw = product.performance?.projection ?? product.performance?.sillage ?? product.filters?.projection;
  const normalized = ORIGOCatalog.normalize(raw || "");
  const labels = {
    weak: ["ضعيف", "Weak"], soft: ["ضعيف", "Weak"], moderate: ["متوسط", "Moderate"],
    medium: ["متوسط", "Moderate"], strong: ["قوي", "Strong"], verystrong: ["قوي جدًا", "Very strong"]
  };
  if (/قوي جدا|شديد|عالي جدا/.test(normalized)) return isArabic ? "قوي جدًا" : "Very strong";
  if (/قوي|عالي/.test(normalized)) return isArabic ? "قوي" : "Strong";
  if (/متوسط|معتدل/.test(normalized)) return isArabic ? "متوسط" : "Moderate";
  if (/ضعيف|هادئ|ناعم/.test(normalized)) return isArabic ? "ضعيف" : "Weak";
  const key = Object.keys(labels).find((item) => normalized.replace(/[^a-z]/g, "").includes(item));
  if (key) return labels[key][isArabic ? 0 : 1];
  const numeric = Number(raw);
  if (!Number.isFinite(numeric) || numeric <= 0) return isArabic ? "غير محدد" : "Not specified";
  const score = numeric > 5 ? numeric / 2 : numeric;
  if (score >= 4.5) return isArabic ? "قوي جدًا" : "Very strong";
  if (score >= 3.5) return isArabic ? "قوي" : "Strong";
  if (score >= 2.5) return isArabic ? "متوسط" : "Moderate";
  return isArabic ? "ضعيف" : "Weak";
}

function productCardDetailsMarkup(product, isArabic) {
  const serial = ++productCardRenderSerial;
  const safeId = String(product.id || "product").replace(/[^a-zA-Z0-9_-]+/g, "-");
  const performanceId = `card-performance-${safeId}-${serial}`;
  const fragranceId = `card-fragrance-${safeId}-${serial}`;
  const noteGroups = productCardNoteGroups(product, isArabic);
  const accords = productCardAccordData(product, isArabic);
  const seasons = (product.seasons || []).map((item) => ORIGOCatalog.normalize(item));
  const seasonItems = [
    ["spring", "ربيع", "Spring", "♧"], ["summer", "صيف", "Summer", "☼"],
    ["autumn", "خريف", "Autumn", "❧"], ["winter", "شتاء", "Winter", "❄"]
  ];
  const usageLabels = {
    day: ["نهار", "Day"], morning: ["صباح", "Morning"], evening: ["مساء", "Evening"], night: ["ليل", "Night"],
    daily: ["يومي", "Daily"], work: ["عمل", "Work"], formal: ["رسمي", "Formal"], romantic: ["رومانسي", "Romantic"],
    occasions: ["مناسبات", "Occasions"], casual: ["لقاءات", "Casual"], travel: ["سفر", "Travel"]
  };
  const usage = [...new Set([...(product.usageTimes || []), ...(product.occasions || [])].map((item) => ORIGOCatalog.normalize(item)).filter(Boolean))];
  const hours = product.performanceInsights?.editorialDetails || product.editorialDetails || product.performance?.editorialDetails || {};
  const minHours = Number(hours.longevityMinHours ?? hours.longevityHours);
  const maxHours = Number(hours.longevityMaxHours ?? hours.longevityHours);
  const hasHours = Number.isFinite(minHours) && minHours >= 0;
  const rawLongevity = Number(product.performance?.longevity ?? product.performance?.longevityScore ?? product.filters?.longevity ?? product.insights?.longevity);
  const longevityScore = Number.isFinite(rawLongevity) ? Math.max(0, Math.min(10, rawLongevity <= 5 ? rawLongevity * 2 : rawLongevity)) : NaN;
  const estimatedHours = Number.isFinite(longevityScore)
    ? longevityScore >= 9 ? [10, 12] : longevityScore >= 8 ? [8, 10] : longevityScore >= 7 ? [7, 9] : longevityScore >= 6 ? [6, 8] : longevityScore >= 4 ? [4, 6] : [2, 4]
    : null;
  const estimatedHoursLabel = estimatedHours ? `${estimatedHours[0]}–${estimatedHours[1]}${isArabic ? " ساعات" : " hours"}` : (isArabic ? "غير محدد" : "Not specified");
  const hoursLabel = hasHours
    ? (Number.isFinite(maxHours) && maxHours > minHours ? `${minHours}–${maxHours}` : `${minHours}`) + (isArabic ? " ساعات" : " hours")
    : estimatedHoursLabel;
  const notesMarkup = noteGroups.length ? noteGroups.map((group) => `<div class="card-note-level"><strong>${escapeHTML(group.label)}</strong><div class="card-note-scroll" data-inner-horizontal-scroll>${group.items.map((note) => `<span>${note.image ? `<img src="${escapeHTML(note.image)}" alt="" width="46" height="46" loading="lazy"/>` : `<i aria-hidden="true">✦</i>`}<b>${escapeHTML(note.label)}</b></span>`).join("")}</div></div>`).join("") : `<p class="product-card-panel-empty">${isArabic ? "لم تُضف نوتات لهذا المنتج بعد." : "No notes have been added for this product."}</p>`;
  const accordsMarkup = accords.length ? `<div class="card-accord-list">${accords.map((accord) => `<div style="--accord:${escapeHTML(accord.color)}"><span><i></i><b>${escapeHTML(accord.label)}</b>${accord.strength != null ? `<em>${accord.strength}%</em>` : ""}</span>${accord.strength != null ? `<small><i style="width:${accord.strength}%"></i></small>` : ""}</div>`).join("")}</div>` : `<p class="product-card-panel-empty">${isArabic ? "لم تُضف أكوردات لهذا المنتج بعد." : "No accords have been added for this product."}</p>`;
  return `<div class="product-card-accordion-actions" aria-label="${isArabic ? "تفاصيل المنتج" : "Product details"}">
      <button type="button" data-card-panel-trigger="performance" aria-expanded="false" aria-controls="${performanceId}"><span>${isArabic ? "الأداء" : "Performance"}</span><i aria-hidden="true">⌄</i></button>
      <button type="button" data-card-panel-trigger="fragrance" aria-expanded="false" aria-controls="${fragranceId}"><span>${isArabic ? "الرائحة" : "Scent"}</span><i aria-hidden="true">⌄</i></button>
    </div>
    <div class="product-card-details" data-card-details>
      <section id="${performanceId}" data-card-panel="performance" data-product-id="${escapeHTML(product.id)}" aria-hidden="true" hidden>
        <div class="card-performance-metrics">
          <article><i aria-hidden="true">◷</i><span><b>${isArabic ? "الثبات" : "Longevity"}</b><small data-performance-hours data-fallback="${escapeHTML(hoursLabel)}" data-state="${hasHours ? "ready" : "idle"}">${escapeHTML(hoursLabel)}</small></span></article>
          <article><i aria-hidden="true">≋</i><span><b>${isArabic ? "الفوحان" : "Projection"}</b><small data-performance-projection>${escapeHTML(productCardProjectionLabel(product, isArabic))}</small></span></article>
        </div>
        <div class="card-performance-block"><b>${isArabic ? "المواسم" : "Seasons"}</b><div class="card-season-grid">${seasonItems.map(([id, ar, en, icon]) => `<span class="${seasons.some((value) => value.includes(id) || (id === "autumn" && /خريف/.test(value)) || (id === "winter" && /شتاء/.test(value)) || (id === "summer" && /صيف/.test(value)) || (id === "spring" && /ربيع/.test(value))) ? "active" : ""}"><i>${icon}</i>${isArabic ? ar : en}</span>`).join("")}</div></div>
        <div class="card-performance-block"><b>${isArabic ? "الأوقات والمناسبات" : "Times and occasions"}</b><div class="card-usage-tags">${usage.length ? usage.map((item) => `<span>${escapeHTML((usageLabels[item] || [item, item])[isArabic ? 0 : 1])}</span>`).join("") : `<span>${isArabic ? "غير محدد" : "Not specified"}</span>`}</div></div>
      </section>
      <section id="${fragranceId}" data-card-panel="fragrance" aria-hidden="true" hidden>
        <div class="card-fragrance-tabs" role="tablist"><button type="button" role="tab" data-card-fragrance-tab="notes" aria-selected="true">${isArabic ? "النوتات" : "Notes"}</button><button type="button" role="tab" data-card-fragrance-tab="accords" aria-selected="false">${isArabic ? "الأكوردات" : "Accords"}</button></div>
        <div data-card-fragrance-content="notes">${notesMarkup}</div>
        <div data-card-fragrance-content="accords" hidden>${accordsMarkup}</div>
      </section>
    </div>`;
}

function productCardMarkup(product, options = {}) {
  if (typeof options === "string") options = { meta: options, context: "recommendation" };
  const isArabic = state.lang === "ar";
  const normalizedNames = ORIGOCatalog.normalize(`${product.nameAr || ""} ${product.nameEn || ""}`);
  const khamrahFallback = /khamrah|خمر[ةه]/.test(normalizedNames) ? "KHAMRAH" : "";
  const name = isArabic
    ? (product.nameAr || product.nameEn || localizedProductName(product, "ar"))
    : (product.nameEn || khamrahFallback || localizedProductName(product, "en"));
  const secondaryName = isArabic ? (product.nameEn || khamrahFallback) : "";
  const interactive = options.interactive !== false;
  const media = productMedia(product);
  if (product.hoverImage && !media.some((item) => item.url === product.hoverImage)) media.push({ url: product.hoverImage, type: "image" });
  const imageIndex = Math.min(Math.max(0, Number(state.cardImageIndexes[product.id] || 0)), Math.max(0, media.length - 1));
  const mainImage = media[imageIndex]?.url || product.image || PRODUCT_IMAGE_PLACEHOLDER;
  const richVariants = [...(Array.isArray(product.variantOptions) ? product.variantOptions : []), ...(Array.isArray(product.variants) ? product.variants.filter((item) => item && typeof item === "object") : [])];
  const selectedVariantId = state.selectedCardVariants[product.id];
  const variant = richVariants.find((item) => String(item.id || item.size) === String(selectedVariantId)) || richVariants[0] || null;
  const price = Number(variant?.price ?? product.price ?? 0);
  const oldPrice = Number(variant?.oldPrice ?? product.oldPrice ?? 0);
  const knownStockValue = variant?.stock ?? product.inventory?.quantity;
  const knownStock = knownStockValue !== undefined && knownStockValue !== null && knownStockValue !== "";
  const outOfStock = product.status === "unavailable" || (knownStock && Number(knownStockValue) <= 0);
  const discount = oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;
  const explicitBadge = String(isArabic ? product.cardBadgeAr || product.badgeAr || "" : product.cardBadgeEn || product.badgeEn || "").trim();
  const normalizedBadge = ORIGOCatalog.normalize(explicitBadge);
  const isNew = Boolean(product.isNew) || /new|جديد|وصل حديثا/.test(normalizedBadge);
  const badgeCandidates = [
    outOfStock ? [100, isArabic ? "نفد المخزون" : "OUT OF STOCK", "stock"] : null,
    discount ? [90, isArabic ? `خصم ${discount}%` : `${discount}% OFF`, "sale"] : null,
    isNew ? [80, isArabic ? "جديد" : "NEW", "new"] : null
  ].filter(Boolean).sort((a, b) => b[0] - a[0]);
  const badges = badgeCandidates.filter((item, index, list) => list.findIndex((other) => other[1] === item[1]) === index).slice(0, 2);
  const saved = state.wishlist.includes(product.id);
  const compared = state.comparison.includes(product.id);
  const rating = catalogRating(product);
  const reviewCount = Number(product.reviewSummary?.count || product.insights?.reviews || product.reviewsCount || 0);
  const genderLabel = productCardGenderLabel(product, isArabic);
  const sizeLabel = formatProductSize(variant?.size || product.size || product.sizes?.[0] || "");
  const compareLabel = compared
    ? (isArabic ? "إزالة من المقارنة" : "Remove from comparison")
    : (isArabic ? "إضافة إلى المقارنة" : "Add to comparison");
  const delayStyle = Number.isFinite(options.delay) ? ` style="transition-delay:${options.delay}ms"` : "";
  const disabled = interactive ? "" : " disabled tabindex=\"-1\"";
  const favoriteLabel = saved ? translations[state.lang].removeFavorite : translations[state.lang].favorites;
  const noteLabels = ((isArabic ? product.notesAr : product.notesEn) || product.notesAr || product.notesEn || []).filter(Boolean).slice(0, 3);
  const context = String(options.context || "grid");
  const supportsDetails = interactive && context === "grid";
  const availableStock = Number(variant?.stock ?? product.inventory?.available ?? product.inventory?.quantity);
  const hasKnownAvailability = Number.isFinite(availableStock);
  const limitedStock = !outOfStock && hasKnownAvailability && availableStock > 0 && availableStock <= 5;
  const stockLabel = outOfStock
    ? (isArabic ? "غير متوفر" : "Out of stock")
    : limitedStock ? (isArabic ? "متبقي كمية محدودة" : "Limited quantity") : (isArabic ? "متوفر" : "Available");
  const loyaltyPoints = Number(variant?.loyaltyPoints ?? product.loyaltyPoints ?? product.rewardPoints);
  const concentrationLabel = String(product.concentration || product.fragranceType || "").trim();
  const ratingStars = rating > 0 ? Array.from({ length: 5 }, (_, index) => `<i class="${index + .5 < rating ? "active" : ""}" aria-hidden="true">★</i>`).join("") : "";
  return `<article class="product-card origo-reference-product-card${options.reveal ? " reveal" : ""}${outOfStock ? " is-out" : ""}" data-id="${escapeHTML(product.id)}"${delayStyle}>
    <div class="product-image">
      ${badges.length ? `<span class="product-badge" data-badge-kind="${escapeHTML(badges[0][2])}">${escapeHTML(badges[0][1])}</span>` : ""}
      <button class="heart-button card-favorite-button${saved ? " active" : ""}"${interactive ? ` data-action="toggle-wishlist"` : disabled} aria-label="${escapeHTML(favoriteLabel)}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
      <button class="home-compare-action card-compare-button${compared ? " active" : ""}"${interactive ? ` data-action="toggle-product-compare"` : disabled} aria-label="${escapeHTML(compareLabel)}" aria-pressed="${compared}"><span aria-hidden="true">⇄</span></button>
      <button type="button" class="product-card-media-link"${interactive ? ` data-action="open-product" data-id="${escapeHTML(product.id)}"` : disabled} aria-label="${escapeHTML(isArabic ? `عرض ${name}` : `View ${name}`)}"><img src="${escapeHTML(mainImage)}" alt="${escapeHTML(`${product.brand || "ORIGO"} ${name}`)}" width="640" height="700" loading="lazy" decoding="async" draggable="false" /></button>
      <button class="quick-view"${interactive ? ` data-action="quick-view"` : disabled} aria-label="${escapeHTML(isArabic ? `عرض تفاصيل ${name}` : `View ${name}`)}"><span>${escapeHTML(translations[state.lang].quickView)}</span><span aria-hidden="true">＋</span></button>
    </div>
    ${supportsDetails ? productCardDetailsMarkup(product, isArabic) : ""}
    <div class="product-info">
      <div class="product-brand">${escapeHTML(product.brand || "ORIGO")}</div>
      <h3><button type="button"${interactive ? ` data-action="open-product" data-id="${escapeHTML(product.id)}"` : disabled}>${escapeHTML(name || (isArabic ? "منتج جديد" : "New product"))}</button></h3>
      ${secondaryName && secondaryName !== name ? `<p class="product-card-secondary-name">${escapeHTML(secondaryName)}</p>` : ""}
      <p class="product-notes">${escapeHTML(noteLabels.join(" · "))}</p>
      ${options.meta ? `<p class="product-card-meta">${escapeHTML(options.meta)}</p>` : ""}
      <div class="home-product-compact-meta">
        <span class="home-product-type">${escapeHTML(genderLabel)}${concentrationLabel ? ` <i aria-hidden="true">•</i> <bdi dir="ltr">${escapeHTML(concentrationLabel)}</bdi>` : ""}${sizeLabel ? ` <i aria-hidden="true">•</i> <bdi dir="ltr">${escapeHTML(sizeLabel)}</bdi>` : ""}</span>
        <span class="home-product-rating"><span class="product-card-stars">${ratingStars}</span><b>${rating > 0 ? rating.toFixed(1) : "—"}</b><small>${reviewCount.toLocaleString(isArabic ? "ar-EG" : "en-US")} ${isArabic ? "تقييم" : reviewCount === 1 ? "review" : "reviews"}</small></span>
      </div>
      <div class="product-card-status-row"><span class="${outOfStock ? "out" : limitedStock ? "limited" : "available"}"><i></i>${escapeHTML(stockLabel)}</span>${Number.isFinite(loyaltyPoints) && loyaltyPoints > 0 ? `<b>🎁 +${Math.round(loyaltyPoints)} ${isArabic ? "نقطة" : "points"}</b>` : ""}</div>
      <div class="product-bottom">
        <div><b class="product-price">${formatPrice(price)}</b>${oldPrice > price ? `<del>${formatPrice(oldPrice)}</del>` : ""}</div>
        <button class="card-add-button"${interactive ? ` data-action="add-to-cart"` : disabled} aria-label="${escapeHTML(translations[state.lang].addToBag)}"${outOfStock ? " disabled" : ""}><span>${escapeHTML(outOfStock ? (isArabic ? "غير متوفر" : "Unavailable") : translations[state.lang].addToBag)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16l-1.2 12H5.2L4 8Z"></path><path d="M8 9V6a4 4 0 0 1 8 0v3"></path></svg></button>
      </div>
    </div>
  </article>`;
}

function setCardImage(productId, value, absolute = false) {
  const product = getProduct(productId);
  if (!product) return;
  const count = productMedia(product).length + (product.hoverImage && !productMedia(product).some((item) => item.url === product.hoverImage) ? 1 : 0);
  if (count < 2) return;
  const current = Number(state.cardImageIndexes[productId] || 0);
  state.cardImageIndexes[productId] = absolute ? Math.max(0, Math.min(count - 1, Number(value) || 0)) : (current + Number(value) + count) % count;
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderWishlist();
  if ($("#search-overlay")?.classList.contains("open") && state.globalSearchQuery) renderSearchSuggestions(state.globalSearchQuery);
  if ($("#product-overlay")?.classList.contains("open") && state.activeProductId) showProductDetails(getProduct(state.activeProductId), false);
}

function showProductDetails(product, shouldOpen = true) {
  if (!product) return;
  const changedProduct = state.activeProductId !== product.id;
  state.activeProductId = product.id;
  if (changedProduct) {
    state.activeProductQuantity = 1;
    state.activeProductImageIndex = 0;
  }
  const isArabic = state.lang === "ar";
  const name = localizedProductName(product, isArabic ? "ar" : "en");
  const secondName = isArabic ? product.nameEn : product.nameAr;
  const media = productMedia(product);
  if (!media.length) media.push({ url: PRODUCT_IMAGE_PLACEHOLDER, type: "image" });
  state.activeProductImageIndex = Math.min(state.activeProductImageIndex, media.length - 1);
  const activeMedia = media[state.activeProductImageIndex];
  const isSaved = state.wishlist.includes(product.id);
  const knownStock = Number(product.inventory?.quantity);
  const hasKnownStock = Number.isFinite(knownStock);
  const available = product.status !== "unavailable" && (!hasKnownStock || knownStock > 0);
  const maximum = hasKnownStock ? Math.max(1, Math.min(10, knownStock)) : 10;
  state.activeProductQuantity = Math.min(maximum, state.activeProductQuantity);
  const sizes = Array.isArray(product.sizes) ? product.sizes.filter(Boolean) : [];
  const related = productRelated(product);
  const recent = readStoredArray("origoRecentlyViewed").filter((id) => id !== product.id).map(getProduct).filter(Boolean).slice(0, 4);
  const description = (isArabic ? product.descriptionAr : product.descriptionEn) || product.description || "";
  const family = isArabic ? product.familyAr : product.familyEn;
  const discount = product.oldPrice > product.price ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const taxRate = Number(state.adminWorkspace.settings?.taxRate || 0);
  const restockEmail = state.user?.email || "";
  const restockPhone = state.user?.phone || "";
  const restockMarkup = available ? "" : `
    <section class="pdp-restock-card" id="pdp-restock-card" aria-labelledby="pdp-restock-title">
      <header><span aria-hidden="true">♧</span><div><strong id="pdp-restock-title">${isArabic ? "غير متوفر حاليًا" : "Currently unavailable"}</strong><p>${isArabic ? "سنعلمك فور عودة هذا المنتج إلى المخزون." : "We will let you know as soon as this product is back in stock."}</p></div></header>
      <form id="pdp-restock-form" data-product-id="${escapeHTML(product.id)}" data-channel="email" data-email="${escapeHTML(restockEmail)}" data-phone="${escapeHTML(restockPhone)}" novalidate>
        <div class="pdp-restock-channels" aria-label="${isArabic ? "وسيلة الإشعار" : "Notification channel"}">
          <button type="button" data-action="restock-channel" data-channel="whatsapp" aria-pressed="false"><span aria-hidden="true">◉</span>${isArabic ? "أخبرني عبر واتساب" : "Notify me on WhatsApp"}</button>
          <button type="button" class="active" data-action="restock-channel" data-channel="email" aria-pressed="true"><span aria-hidden="true">✉</span>${isArabic ? "أخبرني عبر البريد" : "Notify me by email"}</button>
        </div>
        <div class="pdp-restock-entry">
          <label class="sr-only" for="pdp-restock-contact">${isArabic ? "البريد الإلكتروني" : "Email address"}</label>
          <input id="pdp-restock-contact" name="contact" type="email" inputmode="email" autocomplete="email" value="${escapeHTML(restockEmail)}" placeholder="${isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email address"}" required />
          <button type="submit"><span>${isArabic ? "تأكيد التنبيه" : "Confirm alert"}</span><i aria-hidden="true">←</i></button>
        </div>
        <small id="pdp-restock-status" role="status" aria-live="polite"></small>
      </form>
    </section>`;

  $("#product-dialog-content").innerHTML = `
    <main class="pdp-page" aria-labelledby="product-dialog-title">
      <button class="pdp-back" data-action="close-product-page" aria-label="${isArabic ? "العودة للمتجر" : "Back to store"}"><span>×</span>${isArabic ? "العودة للمتجر" : "Back to store"}</button>
      <nav class="pdp-breadcrumb" aria-label="${isArabic ? "مسار الصفحة" : "Breadcrumb"}"><a href="#home-hero" data-action="close-product-page">${isArabic ? "الرئيسية" : "Home"}</a><i>‹</i><a href="#featured" data-action="close-product-page">${isArabic ? "العطور" : "Perfumes"}</a><i>‹</i><span>${escapeHTML(product.brand)}</span><i>‹</i><b>${escapeHTML(name)}</b></nav>
      <section class="pdp-hero">
        <div class="pdp-gallery">
          <div class="pdp-thumbnails" aria-label="${isArabic ? "صور المنتج" : "Product media"}">${media.map((item, index) => `<button class="${index === state.activeProductImageIndex ? "active" : ""}" data-action="product-image" data-index="${index}" aria-label="${isArabic ? `الصورة ${index + 1}` : `Image ${index + 1}`}" aria-pressed="${index === state.activeProductImageIndex}"><img src="${escapeHTML(item.url)}" alt="" loading="${index ? "lazy" : "eager"}" /></button>`).join("")}</div>
          <div class="pdp-main-image"><span>${escapeHTML(isArabic ? product.badgeAr || "" : product.badgeEn || "")}</span><button data-action="product-zoom" aria-label="${isArabic ? "تكبير صورة المنتج" : "Zoom product image"}">⌕</button><img src="${escapeHTML(activeMedia.url)}" alt="${escapeHTML(`${product.brand} ${name}`)}" /></div>
        </div>
        ${productHeroProfileMarkup(product)}
        <aside class="pdp-purchase">
          <span class="pdp-brand">${escapeHTML(product.brand)}</span><h1 id="product-dialog-title">${escapeHTML(name)}</h1>${secondName && secondName !== name ? `<p class="pdp-english-name">${escapeHTML(secondName)}</p>` : ""}
          <div class="pdp-tags"><span>${catalogGender(product) === "women" ? "♀" : catalogGender(product) === "men" ? "♂" : "⚥"} ${escapeHTML(isArabic ? product.type || (catalogGender(product) === "women" ? "للنساء" : catalogGender(product) === "men" ? "للرجال" : "للجنسين") : product.typeEn || product.type || catalogGender(product))}</span>${product.concentration ? `<span>${escapeHTML(product.concentration)}</span>` : ""}${product.sku ? `<span>SKU ${escapeHTML(product.sku)}</span>` : ""}</div>
          <div class="pdp-price"><b>${formatPrice(product.price)}</b>${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ""}${discount ? `<em>-${discount}%</em>` : ""}<small>${taxRate ? (isArabic ? `شامل ضريبة القيمة المضافة ${taxRate}%` : `VAT ${taxRate}% included`) : ""}</small></div>
          ${sizes[0] ? `<p class="pdp-fixed-size">${isArabic ? "الحجم" : "Size"}: <b><bdi dir="ltr">${escapeHTML(formatProductSize(sizes[0]))}</bdi></b></p>` : ""}
          ${available ? `<div class="pdp-stock available"><i></i><span>${isArabic ? "متوفر للطلب" : "Available to order"}</span></div>
          <div class="pdp-quantity"><span>${isArabic ? "الكمية" : "Quantity"}</span><div><button data-action="detail-quantity" data-change="-1" aria-label="${isArabic ? "تقليل الكمية" : "Decrease quantity"}">−</button><b>${state.activeProductQuantity}</b><button data-action="detail-quantity" data-change="1" aria-label="${isArabic ? "زيادة الكمية" : "Increase quantity"}">＋</button></div></div>
          <div class="pdp-actions"><button class="pdp-add" data-action="product-detail-add" data-id="${escapeHTML(product.id)}"><span>♧</span>${translations[state.lang].addToBag}</button><button class="pdp-favorite ${isSaved ? "active" : ""}" data-action="quick-view-wishlist" data-id="${escapeHTML(product.id)}"><span>${isSaved ? "♥" : "♡"}</span>${isSaved ? (isArabic ? "محفوظ في المفضلة" : "Saved") : (isArabic ? "أضف إلى المفضلة" : "Add to wishlist")}</button></div>` : `${restockMarkup}
          <div class="pdp-actions pdp-unavailable-actions"><button class="pdp-favorite ${isSaved ? "active" : ""}" data-action="quick-view-wishlist" data-id="${escapeHTML(product.id)}"><span>${isSaved ? "♥" : "♡"}</span>${isArabic ? "المفضلة" : "Wishlist"}</button><button class="pdp-compare ${state.comparison.includes(product.id) ? "active" : ""}" data-action="toggle-product-compare" data-id="${escapeHTML(product.id)}" aria-pressed="${state.comparison.includes(product.id)}"><span>⚖</span>${isArabic ? "مقارنة" : "Compare"}</button></div>`}
          <div class="pdp-benefits"><span><i>✓</i>${isArabic ? "منتج أصلي 100%" : "100% authentic"}</span><span><i>◉</i>${isArabic ? "الدفع عند الاستلام" : "Cash on delivery"}</span></div>
        </aside>
      </section>
      ${productProfileAccordions(product)}
      ${productIngredientsMarkup(product)}
      ${description ? `<section class="pdp-description"><div class="pdp-section-heading"><span>ORIGO PROFILE</span><h2>${isArabic ? "عن العطر" : "About the fragrance"}</h2></div><p>${escapeHTML(description)}</p></section>` : ""}
      ${window.ORIGOAlternatives?.productPanel?.(product.id) || ""}
      ${related.length ? `<section class="pdp-recommendations"><div class="pdp-section-heading"><span>DISCOVER</span><h2>${isArabic ? "عطور قد تعجبك" : "You may also like"}</h2><p>${isArabic ? "مرتبة حسب تشابه النوتات والعائلة والنوع والسعر — بلا نتائج عشوائية." : "Ranked by notes, family, gender and price — never random."}</p></div><div class="pdp-products-row">${related.map(({ item, shared, score }) => productCardMarkup(item, `${score}% ${isArabic ? "تشابه" : "match"}${shared.length ? ` · ${shared.slice(0, 2).join("، ")}` : ""}`)).join("")}</div></section>` : ""}
      ${recent.length ? `<section class="pdp-recommendations recently"><div class="pdp-section-heading"><span>RECENT</span><h2>${isArabic ? "شوهد مؤخرًا" : "Recently viewed"}</h2></div><div class="pdp-products-row">${recent.map((item) => productCardMarkup(item)).join("")}</div></section>` : ""}
      <div class="pdp-mobile-cart${available ? "" : " is-restock"}">${available ? `<div><small>${sizes[0] ? escapeHTML(sizes[0]) : escapeHTML(product.concentration || "")}</small><b>${formatPrice(product.price)}</b></div><button data-action="product-detail-add" data-id="${escapeHTML(product.id)}">${translations[state.lang].addToBag}</button>` : `<button data-action="focus-restock" data-id="${escapeHTML(product.id)}"><span aria-hidden="true">♧</span>${isArabic ? "أخبرني عند توفر المنتج" : "Notify me when available"}</button>`}</div>
    </main>`;
  $("#product-dialog-content").querySelectorAll("img").forEach((image) => image.addEventListener("error", () => (image.src = PRODUCT_IMAGE_PLACEHOLDER), { once: true }));
  rememberProduct(product.id);
  productStructuredData(product, media);
  if (shouldOpen) {
    const url = new URL(location.href);
    url.searchParams.set("product", product.slug || product.id);
    history.pushState({ product: product.id }, "", url);
    $(".site-header").classList.remove("compact");
    openOverlay("#product-overlay");
    $("#product-overlay").scrollTop = 0;
  }
}

function closeProductPage({ updateHistory = true } = {}) {
  const overlay = $("#product-overlay");
  if (overlay.classList.contains("open")) closeOverlay(overlay);
  state.activeProductId = null;
  $("#product-structured-data")?.remove();
  restoreStoreMeta();
  if (updateHistory) {
    const url = new URL(location.href);
    url.searchParams.delete("product");
    history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }
}

function handleProductRoute() {
  const slug = new URL(location.href).searchParams.get("product");
  if (!slug) {
    if ($("#product-overlay").classList.contains("open")) closeProductPage({ updateHistory: false });
    return false;
  }
  const product = state.products.find((item) => item.id === slug || item.slug === slug);
  if (!product) return false;
  showProductDetails(product, false);
  openOverlay("#product-overlay");
  $(".site-header").classList.remove("compact");
  $("#product-overlay").scrollTop = 0;
  return true;
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  const normalizedType = ["success", "error", "warning", "info"].includes(type) ? type : "info";
  toast.className = `toast toast--${normalizedType}`;
  toast.setAttribute("role", normalizedType === "error" ? "alert" : "status");
  toast.innerHTML = `<i>${normalizedType === "error" ? "!" : normalizedType === "warning" ? "⚠" : normalizedType === "info" ? "i" : "✓"}</i><span>${escapeHTML(message)}</span><button type="button" aria-label="${state.lang === "ar" ? "إغلاق الرسالة" : "Dismiss message"}">×</button>`;
  toast.querySelector("button").addEventListener("click", () => toast.remove(), { once: true });
  $("#toast-region").append(toast);
  setTimeout(() => toast.remove(), 4800);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function syncBodyLock() {
  document.body.classList.toggle("locked", Boolean($(".overlay.open, .drawer.open, .mobile-menu-panel.open, .catalog-filter-drawer.open")));
}

function closeDrawers() {
  $$(".drawer.open").forEach((drawer) => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  });
}

function toggleMobileMenu(force) {
  const panel = $("#mobile-menu");
  const backdrop = $(".mobile-menu-backdrop");
  const shouldOpen = force ?? !panel.classList.contains("open");
  panel.classList.toggle("open", shouldOpen);
  backdrop.classList.toggle("open", shouldOpen);
  panel.setAttribute("aria-hidden", String(!shouldOpen));
  $(".mobile-menu-button").setAttribute("aria-expanded", String(shouldOpen));
  syncBodyLock();
}

function openOverlay(id) {
  $$(".overlay.open").forEach((overlay) => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  });
  closeDrawers();
  toggleMobileMenu(false);
  const overlay = $(id);
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  syncBodyLock();
  setTimeout(() => $("input, .close-button", overlay)?.focus(), 250);
}

function closeOverlay(overlay) {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  syncBodyLock();
}

function toggleDrawer(id, force) {
  const drawer = $(id);
  const shouldOpen = force ?? !drawer.classList.contains("open");
  closeDrawers();
  $$(".overlay.open").forEach((overlay) => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
  });
  drawer.classList.toggle("open", shouldOpen);
  drawer.setAttribute("aria-hidden", String(!shouldOpen));
  syncBodyLock();
  if (shouldOpen) setTimeout(() => $(".close-button", drawer)?.focus(), 250);
}

function toggleCart(force) {
  toggleDrawer("#cart-drawer", force);
}

function toggleWishlistDrawer(force) {
  renderWishlist();
  toggleDrawer("#wishlist-drawer", force);
}

function searchProducts(query) {
  const normalized = ORIGOCatalog.normalize(query);
  if (!normalized) return [];
  return state.products.filter((product) =>
    ORIGOCatalog.normalize([product.nameAr, product.nameEn, product.brand, ...(product.notesAr || []), ...(product.notesEn || [])]
      .join(" "))
      .includes(normalized)
  );
}

function smartSearchDistance(left, right) {
  const a = ORIGOCatalog.normalize(left);
  const b = ORIGOCatalog.normalize(right);
  if (!a) return b.length;
  if (!b) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

function smartSearchScore(query, values) {
  const needle = ORIGOCatalog.normalize(query);
  if (!needle) return 0;
  let best = 0;
  values.flatMap((value) => {
    const normalized = ORIGOCatalog.normalize(value || "");
    return [normalized, ...normalized.split(/\s+/)];
  }).filter(Boolean).forEach((candidate) => {
    if (candidate === needle) best = Math.max(best, 120);
    else if (candidate.startsWith(needle)) best = Math.max(best, 100 - Math.min(20, candidate.length - needle.length));
    else if (candidate.includes(needle)) best = Math.max(best, 82 - Math.min(20, candidate.length - needle.length));
    else if (needle.length >= 3) {
      const distance = smartSearchDistance(needle, candidate);
      const tolerance = Math.max(1, Math.floor(needle.length * .28));
      if (distance <= tolerance) best = Math.max(best, 68 - distance * 8);
    }
  });
  return best;
}

function smartSearchProductValues(product) {
  return [
    product.nameAr, product.nameEn, product.brand, product.sku, product.barcode,
    ...(product.searchAliases || []), ...(product.misspellings || []),
    ...(product.notesAr || []), ...(product.notesEn || []), ...(product.mainIngredients || []),
    ...(product.mainAccords || []), ...(product.tags || [])
  ];
}

function renderMobileSmartSearch(query) {
  const holder = $("#mobile-smart-search-results");
  const input = $("#mobile-header-search-input");
  if (!holder || !input) return;
  const needle = String(query || "").trim();
  if (needle.length < 2) {
    holder.hidden = true;
    holder.innerHTML = "";
    input.setAttribute("aria-expanded", "false");
    return;
  }
  const products = state.products
    .map((product) => ({ product, score: smartSearchScore(needle, smartSearchProductValues(product)) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const brandNames = [...new Set(state.products.map((product) => product.brand).filter(Boolean))];
  const brands = brandNames
    .map((brand) => ({ brand, score: smartSearchScore(needle, [brand]) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const noteNames = [...new Set(state.products.flatMap((product) => [...(product.notesAr || []), ...(product.notesEn || []), ...(product.mainIngredients || [])]).filter(Boolean))];
  const notes = noteNames
    .map((note) => ({ note, score: smartSearchScore(needle, [note]) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const groups = [];
  if (products.length) groups.push(`<div class="mobile-smart-search-group"><small>${state.lang === "ar" ? "منتجات مقترحة" : "Suggested products"}</small>${products.map(({ product }) => `<button type="button" role="option" data-action="mobile-smart-product" data-id="${escapeHTML(product.id)}"><img src="${escapeHTML(product.image || PRODUCT_IMAGE_PLACEHOLDER)}" alt=""/><span><b>${escapeHTML(localizedProductName(product))}</b><small>${escapeHTML(product.brand || "")} · ${formatPrice(product.price)}</small></span></button>`).join("")}</div>`);
  if (brands.length) groups.push(`<div class="mobile-smart-search-group"><small>${state.lang === "ar" ? "البراندات" : "Brands"}</small>${brands.map(({ brand }) => `<button type="button" role="option" data-action="mobile-smart-brand" data-value="${escapeHTML(brand)}"><span><b>${escapeHTML(brand)}</b><small>${state.lang === "ar" ? "عرض منتجات البراند" : "View brand products"}</small></span></button>`).join("")}</div>`);
  if (notes.length) groups.push(`<div class="mobile-smart-search-group"><small>${state.lang === "ar" ? "النوتات والمكونات" : "Notes & ingredients"}</small>${notes.map(({ note }) => `<button type="button" role="option" data-action="mobile-smart-note" data-value="${escapeHTML(note)}"><span><b>${escapeHTML(note)}</b><small>${state.lang === "ar" ? "البحث بهذه النوتة" : "Search this note"}</small></span></button>`).join("")}</div>`);
  holder.innerHTML = groups.join("") || `<div class="mobile-smart-search-empty">${state.lang === "ar" ? "لا توجد مطابقة مباشرة — اضغط Enter للبحث عن العبارة كاملة" : "No direct match — press Enter to search the full phrase"}</div>`;
  holder.hidden = false;
  input.setAttribute("aria-expanded", "true");
}

function renderSearchSuggestions(query) {
  const results = searchProducts(query);
  const container = $("#search-suggestions");
  const viewAll = $(".search-all-results");
  state.globalSearchQuery = query;
  if (!query.trim()) {
    container.innerHTML = "";
    viewAll.hidden = true;
    return;
  }
  if (!results.length) {
    container.innerHTML = `<div class="search-result"><b>${state.lang === "ar" ? "لا توجد نتيجة مطابقة بعد" : "No exact match yet"}</b><span>${state.lang === "ar" ? "جرّب اسم البراند أو إحدى النوتات" : "Try a brand or note"}</span></div>`;
    viewAll.hidden = true;
    return;
  }
  container.innerHTML = results.slice(0, 5).map((product) => productCardMarkup(product, { context: "search", compact: true })).join("");
  viewAll.hidden = false;
}

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index >= 0) state.wishlist.splice(index, 1);
  else state.wishlist.push(productId);
  persist();
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderWishlist();
  $$(`.product-card[data-id="${CSS.escape(productId)}"] .card-favorite-button`).forEach((button) => {
    const active = state.wishlist.includes(productId);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", active ? translations[state.lang].removeFavorite : translations[state.lang].favorites);
  });
  if ($("#product-overlay").classList.contains("open") && state.activeProductId === productId) {
    showProductDetails(getProduct(productId), false);
  }
  showToast(
    state.lang === "ar"
      ? index >= 0 ? "تمت إزالة العطر من المفضلة" : "تم حفظ العطر في المفضلة"
      : index >= 0 ? "Removed from favorites" : "Saved to favorites"
  );
}

function openProductComparison() {
  const products = state.comparison.map(getProduct).filter(Boolean);
  if (products.length < 2) {
    showToast(state.lang === "ar" ? "اختر منتجًا آخر لبدء المقارنة" : "Choose another product to compare");
    return;
  }
  let dialog = $("#product-comparison-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "product-comparison-dialog";
    dialog.className = "product-comparison-dialog";
    document.body.append(dialog);
  }
  const ar = state.lang === "ar";
  dialog.innerHTML = `<div class="product-comparison-shell"><header><div><small>ORIGO SELECT</small><h2>${ar ? "مقارنة المنتجات" : "Product comparison"}</h2></div><button type="button" data-action="close-product-comparison" aria-label="${ar ? "إغلاق" : "Close"}">×</button></header><div class="product-comparison-grid">${products.map((product) => {
    const localizedNotes = ar ? product.notesAr : product.notesEn;
    const rawNotes = Array.isArray(localizedNotes)
      ? localizedNotes
      : (Array.isArray(product.featuredNotes) ? product.featuredNotes : []);
    const notes = rawNotes.slice(0, 3);
    const image = productMedia(product)[0]?.url || product.image || PRODUCT_IMAGE_PLACEHOLDER;
    const performance = product.performance || {};
    const longevity = performance.longevity ?? product.insights?.longevity;
    const sillage = performance.sillage ?? performance.projection ?? product.insights?.sillage;
    return `<article data-comparison-product="${escapeHTML(product.id)}"><button type="button" data-action="remove-product-comparison" data-id="${escapeHTML(product.id)}" aria-label="${ar ? "إزالة من المقارنة" : "Remove from comparison"}">×</button><img src="${escapeHTML(image)}" alt="${escapeHTML(localizedProductName(product))}"/><small>${escapeHTML(product.brand || "ORIGO")}</small><h3>${escapeHTML(localizedProductName(product))}</h3><b class="comparison-price">${formatPrice(product.price)}</b><dl><div><dt>${ar ? "الجنس" : "Gender"}</dt><dd>${escapeHTML(productCardGenderLabel(product, ar))}</dd></div><div><dt>${ar ? "الحجم" : "Size"}</dt><dd dir="ltr">${escapeHTML(formatProductSize(product.size || product.sizes?.[0] || "—"))}</dd></div><div><dt>${ar ? "الثبات" : "Longevity"}</dt><dd>${performanceScoreMarkup(longevity, product, "longevity", ar ? "الثبات" : "Longevity")}</dd></div><div><dt>${ar ? "الفوحان" : "Sillage"}</dt><dd>${performanceScoreMarkup(sillage, product, "sillage", ar ? "الفوحان" : "Sillage")}</dd></div><div><dt>${ar ? "النوتات" : "Notes"}</dt><dd>${escapeHTML(notes.join(" · ") || "—")}</dd></div></dl><button type="button" class="burgundy-button" data-action="open-product" data-id="${escapeHTML(product.id)}">${ar ? "عرض المنتج" : "View product"}</button></article>`;
  }).join("")}</div></div>`;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function toggleProductComparison(productId) {
  const index = state.comparison.indexOf(productId);
  if (index >= 0) state.comparison.splice(index, 1);
  else if (state.comparison.length < 4) state.comparison.push(productId);
  else {
    showToast(state.lang === "ar" ? "يمكن مقارنة أربعة منتجات كحد أقصى" : "Compare up to four products");
    return;
  }
  persist();
  $$(`.product-card[data-id="${CSS.escape(productId)}"] .card-compare-button, .pdp-compare[data-id="${CSS.escape(productId)}"]`).forEach((button) => {
    const active = state.comparison.includes(productId);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (index < 0) openProductComparison();
  else showToast(state.lang === "ar" ? "تمت إزالة المنتج من المقارنة" : "Removed from comparison");
}

function updateNoteSelection(button) {
  const note = button.dataset.note;
  const index = state.selectedNotes.indexOf(note);
  if (index >= 0) {
    state.selectedNotes.splice(index, 1);
    button.classList.remove("selected");
  } else if (state.selectedNotes.length < 4) {
    state.selectedNotes.push(note);
    button.classList.add("selected");
  } else {
    showToast(state.lang === "ar" ? "يمكنك اختيار أربع نوتات كحد أقصى" : "Choose up to four notes");
  }
  $("#selected-count").textContent = `${state.selectedNotes.length}/4`;
  $("#match-count").textContent = Math.max(4, 24 - state.selectedNotes.length * 5);
}

function showFinderMatches() {
  if (window.ORIGOFragranceFinder?.open) window.ORIGOFragranceFinder.open();
  else window.location.assign("/fragrance-finder/for-whom");
}

function runAlternativeSearch() {
  const input = $("#alternative-input");
  if (!input.value.trim()) {
    showToast(state.lang === "ar" ? "اكتب اسم العطر أولًا" : "Enter a fragrance first");
    input.focus();
    return;
  }
  const card = $("#match-card");
  const score = 88 + (input.value.trim().length % 8);
  $(".match-score b", card).innerHTML = `${score}<small>%</small>`;
  $(".score-ring", card).style.strokeDashoffset = `${327 * (1 - score / 100)}`;
  card.classList.remove("pulse");
  void card.offsetWidth;
  card.classList.add("pulse");
  showToast(state.lang === "ar" ? "تم تحليل البصمة العطرية" : "Scent fingerprint analyzed");
}

const adminCopy = (ar, en) => state.lang === "ar" ? ar : en;
const csv = (values) => (values || []).join(", ");
const csvValues = (value) => [...new Map(String(value || "").split(/[,،]/)
  .map((item) => item.trim()).filter(Boolean)
  .map((item) => [normalizeOptionSearch(item), item])).values()];

function confidenceLabel(level) {
  return {
    trusted: adminCopy("موثوق", "Trusted"),
    review: adminCopy("يحتاج مراجعة", "Needs review"),
    incomplete: adminCopy("ناقص", "Incomplete")
  }[level] || adminCopy("ناقص", "Incomplete");
}

function statusLabel(status) {
  return {
    draft: adminCopy("مسودة", "Draft"),
    review: adminCopy("قيد المراجعة", "In review"),
    published: adminCopy("منشور", "Published"),
    unavailable: adminCopy("غير متوفر", "Unavailable")
  }[status] || status;
}

let aiStatusRequest = 0;
async function refreshAIStatus() {
  const badge = $("#ai-source-status");
  if (!badge) return;
  const requestId = ++aiStatusRequest;
  badge.className = "ai-source-badge checking";
  badge.textContent = adminCopy("OpenAI · فحص الاتصال…", "OpenAI · checking…");
  try {
    const status = await ORIGOCatalog.aiStatus();
    if (requestId !== aiStatusRequest) return;
    badge.className = `ai-source-badge ${status.aiConfigured ? "connected" : "needs-key"}`;
    badge.textContent = status.aiConfigured
      ? adminCopy(`OpenAI متصل · ${status.model}`, `OpenAI connected · ${status.model}`)
      : adminCopy("OpenAI يحتاج مفتاح API", "OpenAI needs an API key");
    badge.title = status.aiConfigured
      ? adminCopy("بحث الويب والاقتباسات جاهزان", "Web research and citations are ready")
      : adminCopy("شغّل الخادم مع OPENAI_API_KEY لتفعيل المصدر", "Run the server with OPENAI_API_KEY to enable this source");
  } catch {
    if (requestId !== aiStatusRequest) return;
    badge.className = "ai-source-badge offline";
    badge.textContent = adminCopy("OpenAI غير متصل", "OpenAI offline");
    badge.title = adminCopy("افتح المتجر عبر الخادم المحلي لتفعيل المصدر", "Open the store through the local server to enable this source");
  }
}

function resetImportWorkspace() {
  state.activeImportDraft = null;
  state.adminSuggestions = [];
  $("#web-product-query").value = "";
  $("#admin-suggestions").innerHTML = "";
  $("#import-workspace").innerHTML = `
    <div class="import-empty"><span>⌕</span><h3>${adminCopy("ابدأ باسم المنتج أو الباركود", "Start with a product name or barcode")}</h3>
    <p>${adminCopy("ستظهر اقتراحات مباشرة، ثم نجمع البيانات ونوضح مصدر كل معلومة ونسبة الثقة.", "Live suggestions appear first, then we collect data and show sources and confidence.")}</p>
    ${localStorage.getItem("origoProductAutosave") ? `<button class="button secondary-button" data-action="restore-product-draft">${adminCopy("استعادة آخر مسودة محفوظة", "Restore last autosaved draft")}</button>` : ""}</div>`;
  $$(".import-steps span").forEach((step, index) => step.classList.toggle("active", index === 0));
}

function startManualProduct(restore = false) {
  let product = ORIGOCatalog.emptyProduct();
  if (restore) {
    try {
      product = { ...product, ...JSON.parse(localStorage.getItem("origoProductAutosave") || "{}") };
    } catch {}
  }
  product.status = "draft";
  product.sourceLog.push({
    provider: "ORIGO",
    url: "",
    fields: [],
    status: "manual",
    note: "Manual product draft",
    fetchedAt: new Date().toISOString()
  });
  ORIGOCatalog.computeConfidence(product);
  state.activeImportDraft = product;
  renderImportReview(product);
}

function renderAdminSuggestions(results, message = "") {
  const container = $("#admin-suggestions");
  if (message) {
    container.innerHTML = `<div class="admin-suggestion-message">${escapeHTML(message)}</div>`;
    container.classList.add("open");
    return;
  }
  if (!results.length) {
    container.innerHTML = "";
    container.classList.remove("open");
    return;
  }
  container.innerHTML = results.map((result, index) => result.externalUrl ? `
    <a class="admin-suggestion fragrantica-reference" href="${escapeHTML(result.externalUrl)}" target="_blank" rel="noopener">
      <span class="suggestion-source">Fragrantica</span>
      <span><b>${escapeHTML(result.title)}</b><small>${escapeHTML(adminCopy("مرجع يدوي فقط — لا يتم نسخ البيانات تلقائيًا", "Manual reference only — no automatic extraction"))}</small></span>
      <i>↗</i>
    </a>` : `
    <button type="button" class="admin-suggestion" data-action="select-admin-suggestion" data-index="${index}">
      <span class="suggestion-source">${escapeHTML(result.provider || "Manual")}</span>
      <span><b>${escapeHTML(result.title)}</b><small>${escapeHTML(result.description || adminCopy("فتح مسودة قابلة للتعديل", "Open an editable draft"))}</small></span>
      <i>←</i>
    </button>`).join("");
  container.classList.add("open");
}

async function runAdminSuggestions(query) {
  const value = String(query || "").trim();
  if (value.length < 2) {
    renderAdminSuggestions([]);
    return;
  }
  state.adminSearchController?.abort();
  state.adminSearchController = new AbortController();
  $(".admin-search-field").classList.add("loading");
  try {
    const results = await ORIGOCatalog.suggest(value, { signal: state.adminSearchController.signal });
    state.adminSuggestions = [
      ...results,
      ORIGOCatalog.fragranticaReference(value),
      { id: `manual:${value}`, title: value, description: adminCopy("إنشاء مسودة يدوية بالحقول الفارغة", "Create a manual draft with empty fields"), provider: "ORIGO", query: value, manual: true, lang: /[\u0600-\u06ff]/.test(value) ? "ar" : "en" }
    ];
    renderAdminSuggestions(state.adminSuggestions);
  } catch (error) {
    if (error.name !== "AbortError") {
      state.adminSuggestions = [{ id: `manual:${value}`, title: value, provider: "ORIGO", query: value, manual: true, lang: /[\u0600-\u06ff]/.test(value) ? "ar" : "en" }];
      renderAdminSuggestions(state.adminSuggestions, adminCopy("تعذر الاتصال بالمصادر؛ يمكنك بدء مسودة يدوية.", "Sources are unavailable; you can start a manual draft."));
    }
  } finally {
    $(".admin-search-field").classList.remove("loading");
  }
}

async function loadImportDraft(selection) {
  $("#admin-suggestions").classList.remove("open");
  $("#import-workspace").innerHTML = `<div class="import-loading"><span class="spinner"></span><h3>${adminCopy("نجمع البيانات ونطابق المصادر…", "Collecting and cross-checking sources…")}</h3><p>${adminCopy("لن يتم حفظ المنتج في هذه المرحلة.", "Nothing is saved at this stage.")}</p></div>`;
  let product;
  if (selection.manual) {
    product = ORIGOCatalog.emptyProduct();
    if (selection.lang === "ar") product.nameAr = selection.title;
    else product.nameEn = selection.title;
    product.sourceLog.push({ provider: "ORIGO", url: "", fields: [], status: "manual", note: "Manual draft", fetchedAt: new Date().toISOString() });
    ORIGOCatalog.computeConfidence(product);
  } else {
    product = await ORIGOCatalog.enrich({ ...selection, query: selection.query || $("#web-product-query").value.trim() });
  }
  state.activeImportDraft = product;
  renderImportReview(product);
}

function renderQuickImportImages() {
  const holder = $("#quick-image-preview");
  const extractButton = $("[data-action='extract-product-images']");
  const clearButton = $("[data-action='clear-product-images']");
  if (!holder) return;
  const images = state.quickImportImages || [];
  holder.hidden = !images.length;
  holder.innerHTML = images.map((image, index) => `<article>
    <img src="${escapeHTML(image.dataUrl)}" alt="${escapeHTML(image.name)}"/>
    <button type="button" data-action="remove-quick-import-image" data-index="${index}" aria-label="${adminCopy("إزالة الصورة", "Remove image")}">×</button>
  </article>`).join("");
  if (extractButton) extractButton.disabled = !images.length;
  if (clearButton) clearButton.hidden = !images.length;
}

async function addQuickImportImages(fileList) {
  const files = [...(fileList || [])].filter((file) => /^image\/(?:jpeg|png|webp)$/i.test(file.type));
  const available = Math.max(0, 6 - (state.quickImportImages || []).length);
  if (!available || !files.length) return;
  const section = $(".quick-image-import");
  const status = $("#quick-image-status");
  section?.classList.add("extracting");
  if (status) status.textContent = adminCopy("جارٍ تجهيز الصور ورفع جودتها للاستخراج…", "Preparing images for extraction…");
  try {
    const prepared = [];
    for (const file of files.slice(0, available)) {
      if (file.size > 10_000_000) throw new Error(adminCopy("حجم الصورة يجب ألا يتجاوز 10 MB", "Each image must be 10 MB or less"));
      prepared.push({ name: file.name, dataUrl: await optimizeGalleryImage(file) });
    }
    state.quickImportImages = [...(state.quickImportImages || []), ...prepared];
    renderQuickImportImages();
    if (status) status.textContent = adminCopy(`تم تجهيز ${state.quickImportImages.length} صورة لنفس المنتج.`, `${state.quickImportImages.length} images are ready for one product.`);
  } catch (error) {
    if (status) status.textContent = error.message;
    showToast(error.message);
  } finally {
    section?.classList.remove("extracting");
  }
}

function clearQuickImportImages() {
  state.quickImportImages = [];
  const input = $("#quick-import-images");
  if (input) input.value = "";
  const status = $("#quick-image-status");
  if (status) status.textContent = "";
  renderQuickImportImages();
}

async function extractQuickImportProduct() {
  const images = state.quickImportImages || [];
  if (!images.length) return;
  const section = $(".quick-image-import");
  const status = $("#quick-image-status");
  const button = $("[data-action='extract-product-images']");
  section?.classList.add("extracting");
  if (button) button.disabled = true;
  if (status) status.textContent = adminCopy("نقرأ الصور، نوحّد المنتج، ونراجع المصادر…", "Reading images, merging the product, and checking sources…");
  try {
    const result = await api("/api/catalog/ai-extract-images", {
      method: "POST",
      body: JSON.stringify({
        hint: $("#quick-import-hint")?.value.trim() || $("#web-product-query")?.value.trim() || "",
        images: images.map((image) => image.dataUrl)
      })
    });
    const extracted = result.data || {};
    const product = {
      ...ORIGOCatalog.emptyProduct(),
      ...extracted,
      id: `catalog-${Date.now()}`,
      status: "draft",
      price: "",
      size: extracted.sizes?.[0] || "",
      images: [],
      mainAccords: (extracted.accordProfile || []).map((item) => item.nameAr || item.nameEn).filter(Boolean),
      sourceLog: [{
        provider: `OpenAI image extraction · ${result.model || "AI"}`,
        url: result.citations?.[0]?.url || "",
        fields: Object.keys(extracted).filter((key) => !["images"].includes(key)),
        status: "review",
        note: adminCopy(`استخراج من ${images.length} صور؛ يتطلب مراجعة المدير`, `Extracted from ${images.length} images; manager review required`),
        fetchedAt: result.fetchedAt || new Date().toISOString()
      }, ...(result.citations || []).slice(1, 8).map((citation) => ({
        provider: citation.title || "Web source",
        url: citation.url || "",
        fields: [],
        status: "reference",
        note: "Cross-check source",
        fetchedAt: result.fetchedAt || new Date().toISOString()
      }))]
    };
    ORIGOCatalog.computeConfidence(product);
    state.activeImportDraft = product;
    renderImportReview(product);
    clearQuickImportImages();
    showToast(adminCopy("تم إنشاء مسودة موحدة؛ راجعها قبل الحفظ", "A merged draft is ready; review it before saving"));
  } catch (error) {
    if (status) status.textContent = error.message;
    showToast(error.message);
  } finally {
    section?.classList.remove("extracting");
    if (button) button.disabled = !(state.quickImportImages || []).length;
  }
}

function selectOptions(options, selected) {
  return options.map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`).join("");
}

const PRODUCT_OPTION_DEFAULTS = {
  brand: [],
  category: [
    ["perfume","عطر","Perfume","◈"],["incense","بخور وعود","Incense & oud","♨"],["home-fragrance","معطر منزل","Home fragrance","⌂"],
    ["skincare","عناية بالبشرة","Skin care","✦"],["bodycare","عناية بالجسم","Body care","♧"],["haircare","عناية بالشعر","Hair care","♢"],["gifts","هدية","Gift","▣"],["other","غيره","Other","○"]
  ],
  gender: [["men","رجالي","Men","♂"],["women","نسائي","Women","♀"],["unisex","للجنسين","Unisex","⚥"],["children","أطفال","Children","♙"]],
  concentration: [["Cologne","كولونيا","Cologne",""],["EDC","Eau de Cologne","Eau de Cologne","EDC"],["EDT","Eau de Toilette","Eau de Toilette","EDT"],["EDP","Eau de Parfum","Eau de Parfum","EDP"],["Parfum","بارفان","Parfum","P"],["Extrait","خلاصة عطرية","Extrait de Parfum","EX"],["Oil","زيت عطري","Perfume Oil","Oil"],["Body Mist","رذاذ عطري","Body Mist","Mist"]],
  size: ["2","5","10","15","20","30","40","50","60","75","80","90","100","125","150","200"].map((v) => [`${v} ML`,`${v} مل`,`${v} ml`,""]),
  family: [["oriental","شرقي","Oriental","✦"],["woody","خشبي","Woody","♧"],["floral","زهري","Floral","✿"],["citrus","حمضي","Citrus","◉"],["aromatic","أروماتيك","Aromatic","❋"],["leather","جلدي","Leather","◫"],["fruity","فواكه","Fruity","●"],["gourmand","غورماند","Gourmand","♨"],["chypre","تشيبر","Chypre","△"],["aquatic","أكواتيك","Aquatic","≈"],["fougere","فوجير","Fougère","♿"],["musky","مسكي","Musky","◌"],["amber","عنبري","Amber","◆"],["green","أخضر","Green","❧"],["powdery","بودري","Powdery","☁"],["spicy","حار","Spicy","♨"],["smoky","دخاني","Smoky","≋"],["tobacco","تبغي","Tobacco","♜"]],
  season: [["spring","الربيع","Spring","❧"],["summer","الصيف","Summer","☀"],["autumn","الخريف","Autumn","⌁"],["winter","الشتاء","Winter","❄"],["all","جميع المواسم","All seasons","◉"]],
  usage_time: [["morning","صباحي","Morning","◒"],["day","نهاري","Daytime","☀"],["evening","مسائي","Evening","◓"],["night","ليلي","Night","☾"],["all-day","طوال اليوم","All day","◷"]],
  occasion: ["يومي|Daily","العمل|Work","الجامعة|University","رسمي|Formal","اجتماعات|Meetings","مناسبات|Occasions","حفلات|Parties","زفاف|Wedding","موعد رومانسي|Date night","رياضة|Sport","سفر|Travel","رمضان|Ramadan","العيد|Eid","هدية|Gift"].map((v) => { const [ar,en]=v.split("|"); return [en.toLowerCase().replaceAll(" ","-"),ar,en,"◇"]; }),
  personality: ["قيادي|Leader","هادئ|Calm","اجتماعي|Social","انطوائي|Introvert","جريء|Bold","رومانسي|Romantic","عملي|Practical","أنيق|Elegant","كلاسيكي|Classic","عصري|Modern","فنان|Artistic","غامض|Mysterious","واثق|Confident","مغامر|Adventurous","رياضي|Sporty","فاخر|Luxurious"].map((v) => { const [ar,en]=v.split("|"); return [en.toLowerCase(),ar,en,"♙"]; }),
  mood: ["منعش|Fresh","مريح|Comforting","دافئ|Warm","جذاب|Attractive","حيوي|Energetic","رومانسي|Romantic","رسمي|Formal","غامض|Mysterious","فاخر|Luxurious","نظيف|Clean","حلو|Sweet","جريء|Bold","هادئ|Calm"].map((v) => { const [ar,en]=v.split("|"); return [en.toLowerCase(),ar,en,"◌"]; }),
  country: [["egypt","مصر","Egypt","🇪🇬"],["france","فرنسا","France","🇫🇷"],["italy","إيطاليا","Italy","🇮🇹"],["spain","إسبانيا","Spain","🇪🇸"],["uk","المملكة المتحدة","United Kingdom","🇬🇧"],["usa","الولايات المتحدة","United States","🇺🇸"],["uae","الإمارات","United Arab Emirates","🇦🇪"],["saudi-arabia","السعودية","Saudi Arabia","🇸🇦"],["turkey","تركيا","Türkiye","🇹🇷"],["oman","عُمان","Oman","🇴🇲"]],
  perfumer: [],
  note: [],
  tag: ["فاخر|Luxury","صيفي|Summer","شتوي|Winter","رجالي|Men","نسائي|Women","جديد|New","الأكثر مبيعًا|Best seller","حصري|Exclusive","هدية|Gift","قيمة ممتازة|Great value"].map((v) => { const [ar,en]=v.split("|"); return [en.toLowerCase().replaceAll(" ","-"),ar,en,"#"]; })
};

function normalizeOptionSearch(value = "") {
  return String(value).normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").toLowerCase().trim();
}

function productOptionItems(group) {
  const defaults = (PRODUCT_OPTION_DEFAULTS[group] || []).map(([value,nameAr,nameEn,icon]) => ({ group, value, slug: value, nameAr, nameEn, icon, active: true, builtIn: true }));
  if (group === "brand") {
    const brands = [...new Set([...ORIGO_PERFUME_BRANDS, ...baseProducts, ...state.catalogProducts].map((product) => typeof product === "string" ? product : product.brand).filter(Boolean))];
    defaults.push(...brands.map((brand) => ({ group, value: brand, slug: normalizeOptionSearch(brand).replaceAll(" ", "-"), nameAr: brand, nameEn: brand, icon: "◇", active: true, builtIn: true })));
  }
  if (group === "note") {
    defaults.push(...(window.ORIGOFragranceNotes?.notes || []).map((note) => ({ group, value: note.slug || note.nameEn || note.nameAr, slug: note.slug, nameAr: note.nameAr, nameEn: note.nameEn, image: note.image, icon: "✿", active: true, builtIn: true })));
  }
  const saved = state.productOptions.filter((option) => option.group === group && option.active !== false).map((option) => ({
    ...option,
    ...(group === "note" ? (option.metadata || {}) : {}),
    value: option.metadata?.value || option.slug || option.nameEn || option.nameAr
  }));
  const unique = new Map();
  [...saved, ...defaults].forEach((item) => {
    const key = normalizeOptionSearch(item.value || item.slug || item.nameEn || item.nameAr);
    if (key && !unique.has(key)) unique.set(key, item);
  });
  return [...unique.values()];
}

function searchableCreatableSelect({ name, group, labelAr, labelEn, selected = [], multiple = false, required = false, allowCreate = true, all = false, hintAr = "", hintEn = "" }) {
  const values = (Array.isArray(selected) ? selected : [selected]).map(String).map((item) => item.trim()).filter(Boolean);
  const items = productOptionItems(group);
  const selectedItems = values.map((value) => items.find((item) => normalizeOptionSearch(item.value) === normalizeOptionSearch(value)) || { value, nameAr: value, nameEn: value, icon: "" });
  const visible = items.slice(0, 80);
  return `<label class="smart-select-label${multiple ? " is-multiple" : ""}"><span>${adminCopy(labelAr,labelEn)}${required ? " <b aria-hidden='true'>*</b>" : ""}</span>
    <div class="smart-select" data-smart-select data-group="${escapeHTML(group)}" data-name="${escapeHTML(name)}" data-multiple="${multiple}" data-create="${allowCreate}">
      <input type="hidden" name="${escapeHTML(name)}" value="${escapeHTML(values.join(", "))}" />
      <div class="smart-select-control" data-action="smart-select-open" role="button" tabindex="0" aria-haspopup="listbox" aria-expanded="false">
        <span class="smart-select-chips">${selectedItems.length ? selectedItems.map((item) => smartSelectChipMarkup(item, item.value, { multiple, group })).join("") : `<small>${adminCopy("ابحث أو اختر…","Search or select…")}</small>`}</span><strong>⌄</strong>
      </div>
      <div class="smart-select-menu" hidden>
        <div class="smart-select-search"><input type="search" data-smart-search placeholder="${adminCopy("ابحث بالعربية أو الإنجليزية…","Search in Arabic or English…")}" autocomplete="off"/><button type="button" data-action="smart-select-settings" title="${adminCopy("إدارة الخيارات","Manage options")}">⚙</button></div>
        <div class="smart-select-actions">${all && multiple ? `<button type="button" data-action="smart-select-all">${adminCopy("تحديد الكل","Select all")}</button>` : ""}<button type="button" data-action="smart-select-clear">${adminCopy("مسح الكل","Clear all")}</button></div>
        <div class="smart-select-options" role="listbox"${multiple ? ` aria-multiselectable="true"` : ""}>${visible.map((item) => `<button type="button" role="option" data-action="smart-select-option" data-value="${escapeHTML(item.value)}" data-search="${escapeHTML(normalizeOptionSearch(`${item.nameAr} ${item.nameEn} ${item.value}`))}" aria-selected="${values.some((value) => normalizeOptionSearch(value) === normalizeOptionSearch(item.value))}">${item.image ? `<img src="${escapeHTML(item.image)}" alt=""/>` : `<em style="${item.color ? `--option-color:${escapeHTML(item.color)}` : ""}">${escapeHTML(item.icon || "◇")}</em>`}<span><b>${escapeHTML(state.lang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr)}</b><small>${escapeHTML(state.lang === "ar" ? item.nameEn || "" : item.nameAr || "")}</small></span><i>✓</i></button>`).join("")}</div>
        ${allowCreate ? `<button type="button" class="smart-select-create" data-action="smart-select-create">＋ ${adminCopy("إضافة خيار جديد","Add new option")}</button>` : ""}
      </div>
    </div>${hintAr || hintEn ? `<small>${adminCopy(hintAr,hintEn)}</small>` : ""}</label>`;
}

function smartSelectChipMarkup(item, value, { multiple = false, group = "" } = {}) {
  const name = state.lang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr;
  const editNote = group === "note" ? `<button type="button" class="smart-select-edit-note" data-action="smart-select-edit-note" data-value="${escapeHTML(value)}" title="${adminCopy("تعديل النوتة أو إضافة صورتها","Edit note or add its image")}" aria-label="${adminCopy(`تعديل نوتة ${name}`, `Edit ${name} note`)}">✎</button>` : "";
  const remove = multiple ? `<button type="button" class="smart-select-remove" data-action="smart-select-remove" data-value="${escapeHTML(value)}" aria-label="${adminCopy("حذف","Remove")}">×</button>` : "";
  return `<i data-smart-value="${escapeHTML(value)}">${item.image ? `<img src="${escapeHTML(item.image)}" alt="" />` : item.icon ? `<em>${escapeHTML(item.icon)}</em>` : ""}<span>${escapeHTML(name)}</span>${editNote}${remove}</i>`;
}

function findDuplicate(product, excludeId = "") {
  const nameAr = ORIGOCatalog.normalize(product.nameAr);
  const nameEn = ORIGOCatalog.normalize(product.nameEn);
  const brand = ORIGOCatalog.normalize(product.brand);
  return [...baseProducts, ...state.catalogProducts].find((item) => {
    if (item.id === excludeId) return false;
    if (product.sku && item.sku && ORIGOCatalog.normalize(product.sku) === ORIGOCatalog.normalize(item.sku)) return true;
    if (product.barcode && item.barcode && product.barcode === item.barcode) return true;
    const itemBrand = ORIGOCatalog.normalize(item.brand);
    const sameName = (nameEn && nameEn === ORIGOCatalog.normalize(item.nameEn)) || (nameAr && nameAr === ORIGOCatalog.normalize(item.nameAr));
    const size = product.size || product.sizes?.[0] || "";
    const itemSize = item.size || item.sizes?.[0] || "";
    const sameSize = !size || !itemSize || ORIGOCatalog.normalize(size) === ORIGOCatalog.normalize(itemSize);
    return sameName && sameSize && (!brand || !itemBrand || brand === itemBrand);
  });
}

function editorPreviewMarkup(product) {
  const previewProduct = toStorefrontProduct({ ...product, id: product.id || "admin-preview" });
  const checks = [
    ["image", Boolean(product.images?.length)], ["price", Number(product.price) > 0],
    ["Arabic", Boolean(product.descriptionAr)], ["English", Boolean(product.descriptionEn)],
    ["notes", Boolean(Object.values(product.notes || {}).some((items) => items?.length))],
    ["stock", Number(product.inventory?.quantity) > 0], ["SEO", Boolean(product.seo?.title && product.seo?.description)],
    ["alternatives", Boolean(product.alternativeIds?.length)]
  ];
  return `<aside class="product-editor-preview ${state.adminCardPreviewMode} ${state.adminCardPreviewTheme}">
    <div class="admin-card-preview-head"><span class="eyebrow">LIVE PRODUCT CARD</span><div><button type="button" data-action="admin-card-preview-mode" data-mode="desktop" class="${state.adminCardPreviewMode === "desktop" ? "active" : ""}">${adminCopy("سطح المكتب", "Desktop")}</button><button type="button" data-action="admin-card-preview-mode" data-mode="mobile" class="${state.adminCardPreviewMode === "mobile" ? "active" : ""}">${adminCopy("هاتف", "Mobile")}</button><button type="button" data-action="admin-card-preview-theme" data-theme="light" class="active">${adminCopy("فاتح", "Light")}</button></div></div>
    <div id="admin-live-product-card">${productCardMarkup(previewProduct, { context: "admin", interactive: false })}</div>
    <div class="product-editor-checklist" id="product-editor-checklist">${checks.map(([label, ready]) => `<span class="${ready ? "ready" : ""}"><i>${ready ? "✓" : "○"}</i>${label}</span>`).join("")}</div>
    <small id="product-autosave-status">${adminCopy("المسودة جاهزة للحفظ التلقائي", "Draft autosave is ready")}</small>
  </aside>`;
}

const performanceAdminOptions = {
  scent: [["dislike","لم يعجبني","Dislike"],["not_for_me","لم يناسبني","Not for me"],["acceptable","مقبول","Acceptable"],["good","جيد","Good"],["loved","أعجبني جدًا","Loved it"]],
  wear: [["winter","الشتاء","Winter"],["spring","الربيع","Spring"],["summer","الصيف","Summer"],["autumn","الخريف","Autumn"],["day","النهار","Day"],["night","الليل","Night"]],
  longevity: [["very_weak","ضعيف جدًا","Very weak"],["weak","ضعيف","Weak"],["moderate","متوسط","Moderate"],["long","ثابت","Long-lasting"],["very_long","طويل جدًا","Very long"]],
  sillage: [["skin","قريب من الجلد","Skin scent"],["soft","ناعم","Soft"],["moderate","متوسط","Moderate"],["strong","قوي","Strong"],["very_strong","قوي جدًا","Very strong"]],
  gender: [["women","نسائي","Women"],["unisex","يونيسكس","Unisex"],["men","رجالي","Men"]],
  value: [["overpriced","مبالغ في سعره","Overpriced"],["high","مرتفع","High"],["acceptable","مقبول","Acceptable"],["good","جيد","Good"],["great","قيمة رائعة","Great value"]]
};

function performanceAdminDistribution(metric, editorial = {}) {
  const titles = { scent:["تقييم الرائحة","Scent rating"], wear:["متى ترتديه؟","When to wear"], longevity:["الثبات","Longevity"], sillage:["الفوحان","Sillage"], gender:["النوع","Gender"], value:["القيمة مقابل السعر","Value for money"] };
  return `<fieldset class="performance-admin-distribution"><legend>${adminCopy(...titles[metric])}<small>${metric === "wear" ? adminCopy("لا يشترط أن يكون المجموع 100%", "The total does not need to equal 100%") : adminCopy("يجب أن يكون المجموع 100%", "The total must equal 100%")}</small></legend><div>${performanceAdminOptions[metric].map(([key, ar, en]) => `<label><span>${adminCopy(ar,en)}</span><input type="number" min="0" max="100" step="0.1" name="performance.${metric}.${key}" value="${escapeHTML(editorial?.[metric]?.[key] ?? 0)}"/><i>%</i></label>`).join("")}</div></fieldset>`;
}

function performanceAdminSection(product) {
  if (product.category && product.category !== "perfume") return "";
  const admin = product.performanceInsights || {};
  const settings = admin.settings || {};
  const aggregate = admin.aggregate || {};
  const visible = new Set(settings.visibleMetrics || Object.keys(performanceAdminOptions));
  const votes = admin.votes || [];
  const canImport = state.user?.role === "owner";
  return `<section class="review-section performance-admin-section" data-editor-tier="advanced">
    <div class="review-section-head"><span>04</span><div><b>${adminCopy("تقييم ومؤشرات الأداء", "Ratings & performance insights")}</b><small>${adminCopy("تقييم ORIGO منفصل عن أصوات العملاء ومتوسط النجوم", "ORIGO editorial data stays separate from customer votes and star ratings")}</small></div></div>
    <div class="performance-admin-controls">
      <label class="performance-admin-toggle"><input type="checkbox" name="performanceEnabled"${settings.enabled !== false ? " checked" : ""}/><span>${adminCopy("إظهار القسم في صفحة المنتج", "Show on product page")}</span></label>
      <label class="performance-admin-toggle"><input type="checkbox" name="performanceShowOverall"${settings.showOverallResult !== false ? " checked" : ""}/><span>${adminCopy("إظهار النتيجة الإجمالية عند اكتمال الحد", "Show the overall result after reaching the threshold")}</span></label>
      <label class="performance-admin-toggle"><input type="checkbox" name="performanceAllowUnverified"${settings.allowUnverified ? " checked" : ""}/><span>${adminCopy("السماح بتقييم غير المشترين (لا يدخل المتوسط الرسمي)", "Allow non-purchaser ratings (excluded from the official average)")}</span></label>
      <label>${adminCopy("وزن ORIGO %", "ORIGO weight %")}<input type="number" name="performanceEditorialWeight" min="0" max="100" step="1" value="${Number(settings.editorialWeight ?? 30)}"/></label>
      <label>${adminCopy("وزن العملاء %", "Customer weight %")}<input type="number" name="performanceCustomerWeight" min="0" max="100" step="1" value="${Number(settings.customerWeight ?? 70)}"/></label>
      <label>${adminCopy("الحد الأدنى للمشترين الموثقين", "Minimum verified purchasers")}<input type="number" name="performanceMinimumVerified" min="0" max="1000" step="1" value="${Number(settings.minimumVerifiedVotes ?? 5)}"/></label>
      <label class="wide">${adminCopy("ترتيب البطاقات", "Card order")}<input name="performanceCardOrder" dir="ltr" value="${escapeHTML((settings.cardOrder || ["scent","wear","longevity","sillage","gender","value"]).join(", "))}"/><small>scent, wear, longevity, sillage, gender, value</small></label>
    </div>
    <div class="performance-admin-visible"><b>${adminCopy("المؤشرات الظاهرة", "Visible metrics")}</b>${Object.keys(performanceAdminOptions).map((metric) => `<label><input type="checkbox" name="performanceVisible" value="${metric}"${visible.has(metric) ? " checked" : ""}/><span>${adminCopy({scent:"الرائحة",wear:"الموسم والوقت",longevity:"الثبات",sillage:"الفوحان",gender:"النوع",value:"القيمة"}[metric],{scent:"Scent",wear:"Season & time",longevity:"Longevity",sillage:"Sillage",gender:"Gender",value:"Value"}[metric])}</span></label>`).join("")}</div>
    <div class="performance-admin-distributions">${Object.keys(performanceAdminOptions).map((metric) => performanceAdminDistribution(metric, admin.editorial || {})).join("")}</div>
    <div class="review-grid performance-editorial-details"><label>${adminCopy("ساعات الثبات الدنيا", "Minimum longevity hours")}<input type="number" name="performanceLongevityMinHours" min="0" max="72" step="0.5" value="${escapeHTML(admin.editorialDetails?.longevityMinHours ?? "")}"/></label><label>${adminCopy("ساعات الثبات العليا", "Maximum longevity hours")}<input type="number" name="performanceLongevityMaxHours" min="0" max="72" step="0.5" value="${escapeHTML(admin.editorialDetails?.longevityMaxHours ?? "")}"/></label><label>${adminCopy("اسم مراجع ORIGO", "ORIGO reviewer name")}<input name="performanceReviewerName" value="${escapeHTML(admin.editorialDetails?.reviewerName || "")}"/></label><label>${adminCopy("تاريخ المراجعة", "Reviewed at")}<input type="date" name="performanceReviewedAt" value="${escapeHTML((admin.editorialDetails?.reviewedAt || "").slice(0,10))}"/></label><label class="wide">${adminCopy("ملاحظات خبير العطور", "Fragrance expert notes")}<textarea name="performanceReviewerNotes">${escapeHTML(admin.editorialDetails?.reviewerNotes || "")}</textarea></label></div>
    <div class="performance-admin-summary"><article><b>${Number(aggregate.counts?.customers || 0)}</b><span>${adminCopy("تقييمات عملاء ORIGO", "ORIGO customer ratings")}</span></article><article><b>${Number(aggregate.counts?.verifiedCustomers || 0)}</b><span>${adminCopy("مشترون موثقون", "Verified purchasers")}</span></article><article><b>${Number(aggregate.counts?.imported || 0)}</b><span>${adminCopy("تقييمات سابقة مستوردة", "Imported prior ratings")}</span></article><button type="button" data-action="recalculate-performance" data-id="${escapeHTML(product.id)}">↻ ${adminCopy("إعادة احتساب النتائج", "Recalculate")}</button></div>
    ${votes.length ? `<div class="performance-admin-votes"><h4>${adminCopy("أحدث تقييمات الأداء", "Recent performance votes")}</h4>${votes.map((vote) => `<article><div><b>${escapeHTML(vote.customerName)}</b><small>${vote.verifiedPurchase ? adminCopy("شراء موثق", "Verified purchase") : adminCopy("عميل ORIGO", "ORIGO customer")} · ${escapeHTML(vote.updatedAt || "")}</small></div><button type="button" data-action="toggle-performance-vote" data-id="${vote.id}" data-product-id="${escapeHTML(product.id)}" data-status="${vote.status === "hidden" ? "active" : "hidden"}">${vote.status === "hidden" ? adminCopy("استعادة", "Restore") : adminCopy("إخفاء", "Hide")}</button></article>`).join("")}</div>` : ""}
    ${canImport ? `<details class="performance-admin-import"><summary>${adminCopy("استيراد تقييمات حقيقية من نظام سابق", "Import real ratings from a previous system")}</summary><p>${adminCopy("يُنشئ سجلًا جديدًا ولا يغيّر عدد عملاء ORIGO.", "Creates a separate record and never changes the ORIGO customer count.")}</p><div class="review-grid"><label>${adminCopy("عدد التقييمات السابقة المستوردة", "Imported prior rating count")}<input type="number" name="performanceImportedCount" min="0" value=""/></label><label>${adminCopy("المصدر", "Source")}<input name="performanceImportedSource" value=""/></label><label>${adminCopy("تاريخ الاستيراد", "Import date")}<input type="date" name="performanceImportedDate" value=""/></label><label>${adminCopy("سبب الإضافة أو التعديل", "Reason for change")}<input name="performanceImportedReason" value=""/></label></div></details>` : ""}
  </section>`;
}

const PRODUCT_PROFILE_IMAGE_FIELDS = [
  ["fingerprint", "البصمة العطرية", "Fragrance fingerprint"],
  ["scent", "تقييم الرائحة", "Scent profile"],
  ["wear", "الموسم ووقت الاستخدام", "Season & wear time"],
  ["longevity", "الثبات", "Longevity"],
  ["sillage", "الفوحان", "Sillage"],
  ["gender", "النوع المناسب", "Gender suitability"],
  ["value", "القيمة مقابل السعر", "Value for money"]
];

function profileImageUploadMarkup(key, labelAr, labelEn, language, value = "") {
  const isArabicArtwork = language === "ar";
  const languageLabel = isArabicArtwork ? "العربية" : "English";
  return `<article class="profile-image-upload${value ? " has-image" : ""}" data-profile-image-card="${key}-${language}">
    <header><span>${key === "fingerprint" ? "⌁" : "▥"}</span><div><b>${adminCopy(labelAr,labelEn)} — ${languageLabel}</b><small>${isArabicArtwork ? "ارفع الصورة التي تحتوي على النص العربي" : "Upload the artwork containing English text"}</small></div></header>
    <input type="hidden" name="profileImage.${key}.${language}" value="${escapeHTML(value)}"/>
    <label><input type="file" accept="image/jpeg,image/png,image/webp,image/avif" data-profile-image-upload="${key}" data-profile-image-language="${language}"/><span>＋</span><b>${adminCopy("رفع الصورة", "Upload image")}</b><small>PNG · JPG · WEBP</small></label>
    <figure${value ? "" : " hidden"}><img src="${escapeHTML(value)}" alt="${escapeHTML(isArabicArtwork ? labelAr : labelEn)}"/><button type="button" data-action="remove-profile-image" data-key="${key}" data-language="${language}" aria-label="${adminCopy("حذف الصورة", "Remove image")}">×</button></figure>
  </article>`;
}

function performanceImageAdminSection(product) {
  const images = product.profileImages || {};
  return `<section class="review-section product-profile-images-section" data-editor-tier="smart">
    <div class="review-section-head"><span>04</span><div><b>${adminCopy("صور البصمة ومؤشرات العطر", "Fragrance profile artwork")}</b><small>${adminCopy("لا توجد تصويتات عملاء؛ كل بطاقة تعرض الصورة النهائية التي ترفعها.", "No customer voting; every card displays your uploaded finished artwork.")}</small></div></div>
    <div class="profile-image-language-note"><b>${adminCopy("صورتان مستقلتان لكل قسم", "Two independent images per section")}</b><span>${adminCopy("العربية تعرض الصورة العربية، والإنجليزية تعرض النسخة المترجمة تلقائيًا.", "Arabic displays the Arabic artwork; English automatically displays the translated artwork.")}</span></div>
    <div class="profile-image-upload-grid">${PRODUCT_PROFILE_IMAGE_FIELDS.flatMap(([key,ar,en]) => [profileImageUploadMarkup(key,ar,en,"ar",images[key]?.ar || ""), profileImageUploadMarkup(key,ar,en,"en",images[key]?.en || "")]).join("")}</div>
  </section>`;
}

let productAutosaveTimer;
function updateProductEditorPreview(form) {
  if (!form) return;
  const skuField = form.elements.sku;
  if (skuField && (!skuField.value.trim() || skuField.dataset.autoGenerated === "true") && !skuField.dataset.userEdited) {
    const parts = [form.elements.brand?.value, form.elements.nameEn?.value || form.elements.nameAr?.value, form.elements.size?.value]
      .map((value) => ORIGOCatalog.normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 18)).filter(Boolean);
    if (parts.length >= 2) { skuField.value = parts.join("-").toUpperCase(); skuField.dataset.autoGenerated = "true"; }
  }
  const slugField = form.elements.slug;
  if (slugField && (!slugField.value.trim() || slugField.dataset.autoGenerated === "true") && !slugField.dataset.userEdited) {
    const source = `${form.elements.brand?.value || ""}-${form.elements.nameEn?.value || form.elements.nameAr?.value || ""}`;
    const slug = ORIGOCatalog.normalize(source).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (slug) { slugField.value = slug; slugField.dataset.autoGenerated = "true"; }
  }
  const draft = collectReviewProduct(form);
  const previewProduct = toStorefrontProduct({ ...draft, id: draft.id || "admin-preview" });
  const liveCard = $("#admin-live-product-card");
  if (liveCard) liveCard.innerHTML = productCardMarkup(previewProduct, { context: "admin", interactive: false });
  const checks = [
    Boolean(draft.images?.length), Number(draft.price) > 0, Boolean(draft.descriptionAr),
    Boolean(draft.descriptionEn), Boolean(Object.values(draft.notes).some((items) => items.length)),
    Number(draft.inventory.quantity) > 0, Boolean(draft.seo.title && draft.seo.description),
    Boolean(draft.alternativeIds.length)
  ];
  $$("#product-editor-checklist span").forEach((item, index) => {
    item.classList.toggle("ready", checks[index]);
    $("i", item).textContent = checks[index] ? "✓" : "○";
  });
  clearTimeout(productAutosaveTimer);
  productAutosaveTimer = setTimeout(() => {
    try {
      localStorage.setItem("origoProductAutosave", JSON.stringify({ ...draft, images: draft.images?.filter((image) => !String(image.url).startsWith("data:")) }));
      $("#product-autosave-status").textContent = adminCopy("تم الحفظ منذ لحظات", "Saved moments ago");
    } catch {
      $("#product-autosave-status").textContent = adminCopy("تعذر الحفظ التلقائي بسبب حجم الصور", "Autosave skipped because images are too large");
    }
  }, 700);
}

const ORIGO_ACCORD_LIBRARY = [
  ["sweet", "حلو", "Sweet", "#ef4056", "🍬"], ["vanilla", "فانيليا", "Vanilla", "#f2ae2e", "✿"],
  ["powdery", "بودري", "Powdery", "#ef72a4", "◌"], ["tropical", "استوائي", "Tropical", "#ed9700", "♨"],
  ["musky", "مسكي", "Musky", "#aa8ac7", "≋"], ["fruity", "فاكهي", "Fruity", "#ff705e", "●"],
  ["floral", "زهري", "Floral", "#ec6d9c", "❀"], ["citrus", "حمضي", "Citrus", "#a7bd31", "◉"],
  ["woody", "خشبي", "Woody", "#9b6b43", "♢"], ["amber", "عنبري", "Amber", "#c47b16", "◆"],
  ["warm-spicy", "حار دافئ", "Warm spicy", "#b85032", "✦"], ["fresh", "منعش", "Fresh", "#24a7a1", "≈"],
  ["leather", "جلدي", "Leather", "#635047", "▰"], ["aromatic", "أروماتيك", "Aromatic", "#4e9274", "♧"],
  ["marine", "بحري", "Marine", "#458fc5", "≋"], ["soft", "ناعم", "Soft", "#efd8c4", "○"],
  ["fresh-spicy", "توابل منعشة", "Fresh spicy", "#65bf25", "✣"], ["animalic", "حيواني", "Animalic", "#965018", "♞"],
  ["balsamic", "بلسمي", "Balsamic", "#b28255", "◈"], ["herbal", "عشبي", "Herbal", "#118a32", "♨"],
  ["coffee", "قهوي", "Coffee", "#5d3725", "☕"], ["earthy", "ترابي", "Earthy", "#5c503f", "◆"],
  ["white-floral", "زهور بيضاء", "White floral", "#e8eef7", "✾"], ["rose", "ورد", "Rose", "#fa0b67", "❀"],
  ["green", "أخضر", "Green", "#6b792f", "❧"], ["patchouli", "باتشولي", "Patchouli", "#657139", "♧"],
  ["aldehydic", "ألدهيدي", "Aldehydic", "#dcebf6", "◇"], ["lactonic", "لاكتوني", "Lactonic", "#f7f4ec", "◯"],
  ["aquatic", "مائي", "Aquatic", "#59c3db", "≋"], ["smoky", "مدخن", "Smoky", "#7d7287", "☁"],
  ["soapy", "صابوني", "Soapy", "#d9f3fb", "◌"], ["violet", "بنفسجي", "Violet", "#8c22ff", "✿"],
  ["sour", "حامض", "Sour", "#b6df2b", "◉"], ["tobacco", "تبغ", "Tobacco", "#91612e", "♨"],
  ["oud", "عود", "Oud", "#6f3c1a", "♢"], ["spicy", "حار", "Spicy", "#d64218", "✦"],
  ["cinnamon", "قرفة", "Cinnamon", "#a95a24", "≈"], ["honey", "عسلي", "Honey", "#d79b26", "⬡"],
  ["caramel", "كراميل", "Caramel", "#bb7437", "●"], ["coconut", "جوز الهند", "Coconut", "#d9c8a8", "◉"],
  ["nutty", "مكسرات", "Nutty", "#95704b", "♧"], ["metallic", "معدني", "Metallic", "#8592a0", "◇"],
  ["ozonic", "أوزوني", "Ozonic", "#85d8e8", "⌁"], ["mineral", "معدني صخري", "Mineral", "#7d858d", "◆"],
  ["salty", "مالح", "Salty", "#86b9d8", "≈"], ["mossy", "طحلبي", "Mossy", "#567641", "♧"],
  ["coniferous", "صنوبري", "Coniferous", "#29704b", "♠"], ["lavender", "لافندر", "Lavender", "#8c78bd", "✿"],
  ["iris", "سوسن", "Iris", "#a57aa6", "❀"], ["earthy-spicy", "ترابي متبل", "Earthy spicy", "#7a5435", "✣"]
];

function adminAccordEditor(product) {
  const existing = new Map((product.accordProfile || []).map((item) => [item.id || item.nameEn || item.nameAr, item]));
  const fallback = new Set((product.mainAccords || product.accords || []).map((item) => ORIGOCatalog.normalize(typeof item === "object" ? (item.nameAr || item.nameEn) : item)));
  const savedAccord = ([id, arName, enName]) => existing.get(id) || [...existing.values()].find((value) => [arName,enName].some((name) => ORIGOCatalog.normalize(value.nameAr || value.nameEn) === ORIGOCatalog.normalize(name)));
  const isSelected = (accord) => Boolean(savedAccord(accord)) || fallback.has(ORIGOCatalog.normalize(accord[1])) || fallback.has(ORIGOCatalog.normalize(accord[2]));
  const selectedCount = ORIGO_ACCORD_LIBRARY.filter(isSelected).length;
  return `<div class="accord-admin-editor">
    <div class="accord-admin-toolbar"><div><b>${adminCopy("الأكوردات الرئيسية — البصمة العطرية", "Main accords — fragrance fingerprint")}</b><small>${adminCopy("اختر الأكورد واضبط قوته؛ كل نسبة مستقلة.", "Select accords and set each independent strength.")}</small></div><button type="button" data-action="sort-admin-accords">${adminCopy("ترتيب حسب القوة", "Sort by strength")}</button></div>
    <div class="accord-admin-search">
      <label><span aria-hidden="true">⌕</span><input type="search" data-accord-search autocomplete="off" placeholder="${adminCopy("ابحث باسم الأكورد بالعربية أو الإنجليزية…", "Search accords in Arabic or English…")}" aria-label="${adminCopy("البحث في الأكوردات", "Search accords")}"/></label>
      <span class="accord-search-count" aria-live="polite"><b>${selectedCount}</b> ${adminCopy("مختار من", "selected of")} ${ORIGO_ACCORD_LIBRARY.length}</span>
      <button type="button" data-action="accord-selected-only" aria-pressed="false">${adminCopy("عرض المختار", "Selected only")}</button>
      <button type="button" data-action="clear-admin-accords">${adminCopy("مسح الاختيارات", "Clear selection")}</button>
    </div>
    <p class="accord-search-empty" hidden>${adminCopy("لا توجد أكوردات مطابقة للبحث.", "No accords match your search.")}</p>
    <div class="accord-admin-list">${ORIGO_ACCORD_LIBRARY.map(([id, arName, enName, color, icon], index) => {
      const item = savedAccord([id, arName, enName]);
      const checked = isSelected([id, arName, enName]);
      const strength = Number(item?.strength ?? (checked ? Math.max(42, 92 - index * 6) : 50));
      const search = escapeHTML(normalizeOptionSearch(`${id} ${arName} ${enName}`));
      return `<label class="accord-admin-item${checked ? " selected" : ""}" data-accord-search-value="${search}" style="--accord:${color}"><input type="checkbox" name="accordSelected" value="${id}"${checked ? " checked" : ""}/><span class="accord-symbol">${icon}</span><span><b>${adminCopy(arName,enName)}</b><small>${adminCopy(enName,arName)}</small></span><input aria-label="${adminCopy(`قوة ${arName}`,`${enName} strength`)}" type="range" name="accordStrength.${id}" min="0" max="100" value="${strength}"/><output>${strength}%</output></label>`;
    }).join("")}</div>
    <div class="accord-admin-live" id="accord-admin-live"></div>
  </div>`;
}

function filterAdminAccords(editor) {
  if (!editor) return;
  const query = normalizeOptionSearch(editor.querySelector("[data-accord-search]")?.value || "");
  const selectedOnly = editor.dataset.selectedOnly === "true";
  let visible = 0;
  let selected = 0;
  editor.querySelectorAll(".accord-admin-item").forEach((item) => {
    const checked = Boolean(item.querySelector("[name='accordSelected']")?.checked);
    if (checked) selected += 1;
    const matches = (!query || String(item.dataset.accordSearchValue || "").includes(query)) && (!selectedOnly || checked);
    item.hidden = !matches;
    if (matches) visible += 1;
  });
  const count = editor.querySelector(".accord-search-count b");
  if (count) count.textContent = selected;
  const empty = editor.querySelector(".accord-search-empty");
  if (empty) empty.hidden = visible > 0;
}

function updateAdminAccordEditor(form) {
  const holder = form?.querySelector(".accord-admin-live");
  if (!holder) return;
  form.querySelectorAll(".accord-admin-item").forEach((item) => {
    const enabled = item.querySelector("[name='accordSelected']")?.checked;
    const range = item.querySelector("input[type='range']");
    item.classList.toggle("selected", Boolean(enabled));
    if (range) item.querySelector("output").textContent = `${range.value}%`;
  });
  const draft = collectReviewProduct(form);
  holder.innerHTML = productAccordMarkup(draft);
  filterAdminAccords(form.querySelector(".accord-admin-editor"));
}

function updateProductTypeFields(form) {
  if (!form) return;
  const category = form.elements.category?.value || "perfume";
  form.querySelectorAll("[data-perfume-section]").forEach((section) => section.hidden = category !== "perfume");
  form.querySelectorAll("[data-nonperfume-section]").forEach((section) => section.hidden = category === "perfume");
  form.querySelectorAll(".dynamic-product-fields [data-kinds]").forEach((field) => {
    field.hidden = !String(field.dataset.kinds || "").split(/\s+/).includes(category);
  });
}

function productMediaStudioMarkup(images = []) {
  if (!images.length) return `<div class="product-media-studio is-empty"><div class="product-media-empty"><span>▧</span><b>${adminCopy("ابدأ برفع صور المنتج", "Start by uploading product images")}</b><small>${adminCopy("ستظهر الصورة الرئيسية والمعرض هنا مباشرة.", "The main image and gallery will appear here instantly.")}</small></div></div>`;
  const activeIndex = Math.max(0, images.findIndex((image) => image.selected));
  const active = images[activeIndex] || images[0];
  return `<div class="product-media-studio" data-product-media-studio data-index="${activeIndex}">
    <div class="product-media-stage"><img src="${escapeHTML(active.url)}" alt="${adminCopy("معاينة صورة المنتج", "Product image preview")}"/><div class="product-media-stage-actions"><button type="button" data-action="admin-studio-fullscreen" aria-label="${adminCopy("عرض ملء الشاشة", "View fullscreen")}">⛶</button></div>${images.length > 1 ? `<button type="button" class="studio-arrow previous" data-action="admin-studio-step" data-change="-1" aria-label="${adminCopy("الصورة السابقة", "Previous image")}">‹</button><button type="button" class="studio-arrow next" data-action="admin-studio-step" data-change="1" aria-label="${adminCopy("الصورة التالية", "Next image")}">›</button>` : ""}<span class="studio-count"><b>${activeIndex + 1}</b> / ${images.length}</span></div>
    <div class="product-media-thumbnails" role="list">${images.map((image, index) => `<label class="review-image${index === activeIndex ? " selected" : ""}" data-studio-thumbnail="${index}" role="listitem"><input type="radio" name="selectedImage" value="${index}"${index === activeIndex ? " checked" : ""}/><button type="button" data-action="admin-studio-image" data-index="${index}" aria-label="${adminCopy(`اختيار الصورة ${index + 1}`, `Select image ${index + 1}`)}"><img src="${escapeHTML(image.url)}" alt=""/></button><span>${escapeHTML(image.fileName || image.provider || `Image ${index + 1}`)}</span></label>`).join("")}</div>
    <dialog class="product-media-lightbox"><button type="button" class="studio-lightbox-close" data-action="admin-studio-close" aria-label="${adminCopy("إغلاق", "Close")}">×</button><img src="${escapeHTML(active.url)}" alt="${adminCopy("صورة المنتج بالحجم الكامل", "Full-size product image")}"/><footer><button type="button" data-action="admin-studio-step" data-change="-1" aria-label="${adminCopy("السابق", "Previous")}">‹</button><span><b>${activeIndex + 1}</b> / ${images.length}</span><button type="button" data-action="admin-studio-step" data-change="1" aria-label="${adminCopy("التالي", "Next")}">›</button></footer></dialog>
  </div>`;
}

function setAdminStudioImage(studio, nextIndex) {
  if (!studio) return;
  const thumbnails = $$('[data-studio-thumbnail]', studio);
  if (!thumbnails.length) return;
  const index = (Number(nextIndex) + thumbnails.length) % thumbnails.length;
  const selected = thumbnails[index];
  const source = $("img", selected)?.src;
  studio.dataset.index = String(index);
  thumbnails.forEach((thumbnail, itemIndex) => {
    const active = itemIndex === index;
    thumbnail.classList.toggle("selected", active);
    const input = $("input", thumbnail);
    if (input) input.checked = active;
  });
  $$(".product-media-stage>img,.product-media-lightbox>img", studio).forEach((image) => image.src = source || image.src);
  $$(".studio-count b,.product-media-lightbox footer b", studio).forEach((count) => count.textContent = String(index + 1));
}

function renderImportReview(product) {
  product = {
    ...ORIGOCatalog.emptyProduct(),
    ...product,
    notes: {
      ...ORIGOCatalog.emptyProduct().notes,
      ...(product.notes || {})
    }
  };
  const level = product.confidence?.level || "incomplete";
  const missing = product.confidence?.missing || [];
  const images = product.images || [];
  const linkedReferenceIds = new Set((state.alternativesAdmin?.items || []).filter((item) => item.productId === product.id).map((item) => item.referenceId));
  const alternativeReferenceOptions = (state.alternativesAdmin?.references || []).filter((reference) => reference.status !== "archived").map((reference) => `<label class="product-reference-choice"><input type="checkbox" name="alternativeReferenceIds" value="${escapeHTML(reference.id)}"${linkedReferenceIds.has(reference.id) ? " checked" : ""}/><img src="${escapeHTML(reference.image)}" alt=""/><span><b>${escapeHTML(adminCopy(reference.nameAr, reference.nameEn))}</b><small>${escapeHTML(reference.brand)}</small></span></label>`).join("");
  $("#import-workspace").innerHTML = `
    <form class="catalog-review" id="import-review-form" data-editor-mode="${escapeHTML(state.productEditorMode)}">
      <div class="product-editor-modes">
        <button type="button" data-action="product-editor-mode" data-mode="quick" class="${state.productEditorMode === "quick" ? "active" : ""}">${adminCopy("إضافة سريعة", "Quick Add")}</button>
        <button type="button" data-action="product-editor-mode" data-mode="smart" class="${state.productEditorMode === "smart" ? "active" : ""}">${adminCopy("إضافة ذكية", "Smart Add")}</button>
        <button type="button" data-action="product-editor-mode" data-mode="advanced" class="${state.productEditorMode === "advanced" ? "active" : ""}">${adminCopy("إضافة متقدمة", "Advanced Add")}</button>
      </div>
      <div class="product-ai-tools">
        <span>AI</span>
        ${[
          ["description", adminCopy("اقتراح الوصف", "Suggest descriptions")],
          ["translate", adminCopy("ترجمة جميع الحقول الناقصة", "Translate missing fields")],
          ["seo", adminCopy("اقتراح SEO", "Suggest SEO")],
          ["alternatives", adminCopy("اقتراح البدائل", "Suggest alternatives")],
          ["analysis", adminCopy("تحليل العطر", "Analyze fragrance")]
        ].map(([task, label]) => `<button type="button" data-action="ai-product-task" data-task="${task}">${label}</button>`).join("")}
      </div>
      <div id="ai-product-suggestion"></div>
      ${editorPreviewMarkup(product)}
      <div class="review-summary">
        <div class="confidence-card ${level}"><span>◉</span><div><small>${adminCopy("ثقة البيانات", "DATA CONFIDENCE")}</small><b>${confidenceLabel(level)} · ${product.confidence?.score || 0}%</b></div></div>
        <div class="missing-card"><b>${missing.length}</b><span>${adminCopy("حقول ما زالت ناقصة ولن نملأها بتخمينات", "fields remain empty and will not be guessed")}</span></div>
        <div class="duplicate-alert" id="duplicate-alert" hidden></div>
      </div>

      <section class="review-section" data-editor-tier="core">
        <div class="review-section-head"><span>01</span><div><b>${adminCopy("هوية المنتج", "Product identity")}</b><small>${adminCopy("العربية والإنجليزية محفوظتان في حقول منفصلة", "Arabic and English are stored separately")}</small></div></div>
        <div class="review-grid">
          <label>${adminCopy("الاسم بالعربية", "Arabic name")} <b aria-hidden="true">*</b><input name="nameAr" dir="rtl" required maxlength="140" value="${escapeHTML(product.nameAr)}" /><small data-character-count="nameAr">${String(product.nameAr || "").length}/140</small></label>
          <label>${adminCopy("الاسم بالإنجليزية", "English name")} <b aria-hidden="true">*</b><input name="nameEn" dir="ltr" required maxlength="140" value="${escapeHTML(product.nameEn)}" /><small data-character-count="nameEn">${String(product.nameEn || "").length}/140</small></label>
          ${searchableCreatableSelect({ name:"brand", group:"brand", labelAr:"البراند", labelEn:"Brand", selected:product.brand, required:true })}
          ${searchableCreatableSelect({ name:"category", group:"category", labelAr:"نوع المنتج", labelEn:"Product type", selected:product.category || "perfume", required:true })}
          ${searchableCreatableSelect({ name:"gender", group:"gender", labelAr:"الجنس المستهدف", labelEn:"Target gender", selected:product.genders || product.gender, multiple:true })}
          ${searchableCreatableSelect({ name:"concentration", group:"concentration", labelAr:"التركيز", labelEn:"Concentration", selected:product.concentration })}
          <label>${adminCopy("الحالة", "Status")}<select name="status">${selectOptions([
            ["draft", adminCopy("مسودة — لا يظهر في المتجر", "Draft — hidden from store")],
            ["review", adminCopy("قيد المراجعة", "In review")],
            ["published", adminCopy("منشور — يظهر في المتجر", "Published — visible in store")],
            ["unavailable", adminCopy("غير متوفر", "Unavailable")]
          ], product.status || "draft")}</select></label>
          <label>${adminCopy("السعر الأساسي (ج.م)", "Base price (EGP)")}<input name="price" type="number" min="0" value="${escapeHTML(product.price)}" /></label>
          <label>${adminCopy("السعر قبل الخصم", "Compare-at price")}<input name="oldPrice" type="number" min="0" value="${escapeHTML(product.oldPrice ?? "")}" /></label>
          <label>${adminCopy("تكلفة الشراء", "Purchase cost")}<input name="cost" type="number" min="0" value="${escapeHTML(product.inventory?.cost ?? "")}" /></label>
          <div class="pricing-live-metrics" id="pricing-live-metrics"><span>${adminCopy("الخصم","Discount")} <b>0%</b></span><span>${adminCopy("الربح المتوقع","Expected profit")} <b>${formatPrice(Math.max(0, Number(product.price || 0) - Number(product.inventory?.cost || 0)))}</b></span><span>${adminCopy("هامش الربح","Margin")} <b>0%</b></span></div>
        </div>
      </section>

      <section class="review-section" data-editor-tier="core">
        <div class="review-section-head"><span>02</span><div><b>${adminCopy("التصنيف والبيانات التجارية", "Classification & commerce")}</b></div></div>
        <div class="review-grid">
          ${searchableCreatableSelect({ name:"size", group:"size", labelAr:"حجم المنتج", labelEn:"Product size", selected:product.size || product.sizes?.[0] || "", hintAr:"كل منتج له حجم ثابت واحد.", hintEn:"Each product has one fixed size." })}
          ${searchableCreatableSelect({ name:"families", group:"family", labelAr:"العائلة العطرية", labelEn:"Fragrance family", selected:product.families?.length ? product.families : [product.familyAr || product.familyEn].filter(Boolean), multiple:true, hintAr:"اختر عائلة رئيسية وحتى عائلتين ثانويتين.", hintEn:"Choose one primary and up to two secondary families." })}
          ${searchableCreatableSelect({ name:"seasons", group:"season", labelAr:"المواسم", labelEn:"Seasons", selected:product.seasons, multiple:true, all:true })}
          ${searchableCreatableSelect({ name:"usageTimes", group:"usage_time", labelAr:"وقت الاستخدام", labelEn:"Usage time", selected:product.usageTimes, multiple:true, all:true })}
          ${searchableCreatableSelect({ name:"originCountry", group:"country", labelAr:"بلد المنشأ", labelEn:"Origin country", selected:product.originCountry || product.originCountryEn || product.originCountryAr })}
          <label>SKU<input name="sku" dir="ltr" value="${escapeHTML(product.sku)}" /></label>
          <label>${adminCopy("الباركود / GTIN", "Barcode / GTIN")}<input name="barcode" dir="ltr" value="${escapeHTML(product.barcode)}" /></label>
          <label>${adminCopy("الكمية الحالية", "Current quantity")}<input name="quantity" type="number" min="0" value="${escapeHTML(product.inventory?.quantity ?? "")}" /></label>
          <label>${adminCopy("الحد الأدنى للمخزون", "Low-stock threshold")}<input name="minimumStock" type="number" min="0" value="${escapeHTML(product.inventory?.minimum ?? 8)}" /></label>
          <label>${adminCopy("الكمية المحجوزة", "Reserved stock")}<input name="reservedStock" type="number" min="0" readonly value="${escapeHTML(product.inventory?.reserved ?? 0)}" /><small>${adminCopy("تُحسب من الطلبات المفتوحة.", "Calculated from open orders.")}</small></label>
          <label>${adminCopy("الكمية المتاحة", "Available stock")}<input name="availableStock" type="number" readonly value="${Math.max(0, Number(product.inventory?.quantity || 0) - Number(product.inventory?.reserved || 0))}" /></label>
          ${searchableCreatableSelect({ name:"tags", group:"tag", labelAr:"الوسوم", labelEn:"Tags", selected:product.tags, multiple:true })}
        </div>
      </section>

      <section class="review-section" data-editor-tier="smart" data-perfume-section>
        <div class="review-section-head"><span>03</span><div><b>${adminCopy("هرم النوتات العطرية", "Fragrance note pyramid")}</b><small>${adminCopy("أضف نوتات المقدمة والقلب والقاعدة فقط.", "Add top, heart, and base notes only.")}</small></div></div>
        <div class="review-grid note-review-grid">
          ${searchableCreatableSelect({ name:"topNotes", group:"note", labelAr:"النوتات الافتتاحية", labelEn:"Top notes", selected:product.noteSelections?.top || product.notes.topEn || product.notes.topAr, multiple:true })}
          ${searchableCreatableSelect({ name:"heartNotes", group:"note", labelAr:"نوتات القلب", labelEn:"Heart notes", selected:product.noteSelections?.heart || product.notes.heartEn || product.notes.heartAr, multiple:true })}
          ${searchableCreatableSelect({ name:"baseNotes", group:"note", labelAr:"نوتات القاعدة", labelEn:"Base notes", selected:product.noteSelections?.base || product.notes.baseEn || product.notes.baseAr, multiple:true })}
        </div>
        <p class="product-note-edit-help">✎ ${adminCopy("بعد اختيار أي نوتة اضغط زر القلم بجانبها لتعديل الاسم والترجمة والعائلة والوصف أو رفع صورتها من جهازك. تُحفظ الصورة في مكتبة النوتات وتظهر في المنتج والمتجر.", "After selecting a note, use its pencil button to edit the names, family, descriptions, or upload artwork. The image is saved to the note library and used in the product and storefront.")}</p>
        <div class="note-library-match-preview" id="note-library-match-preview"></div>
        ${adminAccordEditor(product)}
        <div class="review-grid perfume-advanced-fields">
          <label>${adminCopy("الثبات / 10", "Longevity / 10")}<input name="longevity" type="number" min="0" max="10" step=".1" value="${escapeHTML(product.performance?.longevity ?? "")}" /></label>
          <label>${adminCopy("الفوحان / 10", "Sillage / 10")}<input name="sillage" type="number" min="0" max="10" step=".1" value="${escapeHTML(product.performance?.sillage ?? "")}" /></label>
          <label>${adminCopy("سنة الإصدار", "Release year")}<input name="releaseYear" type="number" min="1900" max="2100" value="${escapeHTML(product.releaseYear ?? "")}" /></label>
          ${searchableCreatableSelect({ name:"perfumers", group:"perfumer", labelAr:"المصمم أو صانع العطر", labelEn:"Perfumer", selected:product.perfumers || product.perfumer, multiple:true })}
          ${searchableCreatableSelect({ name:"occasions", group:"occasion", labelAr:"المناسبات", labelEn:"Occasions", selected:product.occasions, multiple:true })}
          ${searchableCreatableSelect({ name:"personalities", group:"personality", labelAr:"الشخصية المناسبة", labelEn:"Style / personality", selected:product.personalities, multiple:true })}
          ${searchableCreatableSelect({ name:"moods", group:"mood", labelAr:"المزاج والانطباع", labelEn:"Mood & impression", selected:product.moods, multiple:true })}
          <label>${adminCopy("العطر المستوحى منه", "Inspired by")}<input name="inspiredBy" value="${escapeHTML(product.inspiredBy || "")}" /></label>
          <label>${adminCopy("نسبة التشابه %", "Similarity %")}<input name="similarity" type="number" min="0" max="100" value="${escapeHTML(product.similarity ?? "")}" /></label>
        </div>
      </section>

      <section class="review-section" data-editor-tier="smart" data-nonperfume-section hidden>
        <div class="review-section-head"><span>03</span><div><b>${adminCopy("خصائص القسم", "Category-specific attributes")}</b><small>${adminCopy("تظهر الحقول المناسبة لنوع المنتج فقط.", "Only fields relevant to the selected product type are shown.")}</small></div></div>
        <div class="review-grid dynamic-product-fields">
          <label data-kinds="skincare">${adminCopy("نوع البشرة", "Skin type")}<input name="skinType" value="${escapeHTML(product.dynamicAttributes?.skinType || "")}"/></label>
          <label data-kinds="haircare">${adminCopy("نوع الشعر", "Hair type")}<input name="hairType" value="${escapeHTML(product.dynamicAttributes?.hairType || "")}"/></label>
          <label data-kinds="skincare haircare">${adminCopy("المشكلة المستهدفة", "Target concern")}<input name="concern" value="${escapeHTML(product.dynamicAttributes?.concern || "")}"/></label>
          <label data-kinds="bodycare incense home-fragrance">${adminCopy("الرائحة", "Scent")}<input name="aroma" value="${escapeHTML(product.dynamicAttributes?.aroma || "")}"/></label>
          <label data-kinds="incense">${adminCopy("الوزن", "Weight")}<input name="weight" value="${escapeHTML(product.dynamicAttributes?.weight || "")}"/></label>
          <label data-kinds="home-fragrance">${adminCopy("مدة الانتشار", "Diffusion duration")}<input name="diffusionDuration" value="${escapeHTML(product.dynamicAttributes?.diffusionDuration || "")}"/></label>
          <label data-kinds="gifts">${adminCopy("مناسبة الهدية", "Gift occasion")}<input name="giftOccasion" value="${escapeHTML(product.dynamicAttributes?.giftOccasion || "")}"/></label>
          <label class="wide" data-kinds="gifts">${adminCopy("محتويات الهدية", "Gift contents")}<textarea name="giftContents">${escapeHTML(product.dynamicAttributes?.giftContents || "")}</textarea></label>
          <label class="wide" data-kinds="skincare haircare bodycare incense home-fragrance">${adminCopy("طريقة الاستخدام — عربي", "Usage instructions — Arabic")}<textarea name="usageInstructionsAr" dir="rtl">${escapeHTML(product.dynamicAttributes?.usageInstructionsAr || "")}</textarea></label>
          <label class="wide" data-kinds="skincare haircare bodycare incense home-fragrance">${adminCopy("طريقة الاستخدام — English", "Usage instructions — English")}<textarea name="usageInstructionsEn" dir="ltr">${escapeHTML(product.dynamicAttributes?.usageInstructionsEn || "")}</textarea></label>
        </div>
      </section>

      ${performanceImageAdminSection(product)}

      <section class="review-section" data-editor-tier="core">
        <div class="review-section-head"><span>05</span><div><b>${adminCopy("الوصف والصور", "Descriptions & images")}</b></div></div>
        <div class="review-grid description-grid">
          <label>${adminCopy("الوصف بالعربية", "Arabic description")}<textarea name="descriptionAr" dir="rtl">${escapeHTML(product.descriptionAr)}</textarea></label>
          <label>${adminCopy("الوصف بالإنجليزية", "English description")}<textarea name="descriptionEn" dir="ltr">${escapeHTML(product.descriptionEn)}</textarea></label>
        </div>
        <label class="image-url-field">${adminCopy("رابط صورة إضافي", "Additional image URL")}<input name="imageUrl" dir="ltr" placeholder="https://..." /></label>
        <label class="image-url-field">${adminCopy("رابط فيديو المنتج", "Product video URL")}<input name="videoUrl" dir="ltr" value="${escapeHTML(product.videoUrl || "")}" placeholder="https://..." /></label>
        <label class="image-url-field">${adminCopy("رابط مرجع Fragrantica أو مصدر آخر", "Fragrantica or other reference URL")}<input name="manualSourceUrl" dir="ltr" value="${escapeHTML(product.manualSourceUrl || "")}" placeholder="https://www.fragrantica.com/perfume/..." /></label>
        <label class="gallery-upload">
          <input id="gallery-upload" type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple />
          <span>＋</span>
          <div><b>${adminCopy("إضافة صور من المعرض", "Add images from gallery")}</b><small>${adminCopy("يمكن اختيار عدة صور · JPEG / PNG / WEBP", "Select multiple images · JPEG / PNG / WEBP")}</small></div>
        </label>
        ${productMediaStudioMarkup(images)}
      </section>

      <section class="review-section" data-editor-tier="advanced">
        <div class="review-section-head"><span>06</span><div><b>${adminCopy("SEO والمتغيرات والربط", "SEO, variants & relationships")}</b><small>${adminCopy("تستخدمها صفحات المنتج والفلاتر الديناميكية مباشرة", "Used directly by product pages and dynamic filters")}</small></div></div>
        <div class="review-grid">
          <label>${adminCopy("رابط المنتج", "URL slug")}<input name="slug" dir="ltr" value="${escapeHTML(product.slug || "")}" placeholder="nocturne-01" /></label>
          <label>SEO title<input name="seoTitle" value="${escapeHTML(product.seo?.title || "")}" /></label>
          <label class="wide">${adminCopy("وصف SEO", "SEO description")}<textarea name="seoDescription">${escapeHTML(product.seo?.description || "")}</textarea></label>
          <label>${adminCopy("المقاسات/المتغيرات", "Variants")}<input name="variants" value="${escapeHTML(csv(product.variants))}" placeholder="30 ML, 50 ML, 100 ML" /></label>
          <label>${adminCopy("نوتات البطاقة البارزة", "Featured card notes")}<input name="featuredNotes" value="${escapeHTML(csv(product.featuredNotes))}" placeholder="${adminCopy("برغموت، عنبر، عود", "Bergamot, Amber, Oud")}" /></label>
          <label>${adminCopy("صورة البطاقة عند المرور", "Card hover image")}<input name="hoverImage" value="${escapeHTML(product.hoverImage || "")}" placeholder="https://..." /></label>
          <label>${adminCopy("شارة البطاقة", "Card badge")}<input name="cardBadgeAr" value="${escapeHTML(product.cardBadgeAr || "")}" placeholder="${adminCopy("حصري", "Exclusive")}" /></label>
          <label>${adminCopy("منتجات مشابهة", "Similar product IDs")}<input name="similarProductIds" value="${escapeHTML(csv(product.similarProductIds))}" /></label>
          <label>${adminCopy("اشترِ معه", "Cross-sell product IDs")}<input name="crossSellIds" value="${escapeHTML(csv(product.crossSellIds))}" /></label>
          <fieldset class="product-reference-links wide"><legend>${adminCopy("العطور العالمية المرجعية المرتبطة بهذا المنتج", "Global reference fragrances linked to this product")}</legend><p>${adminCopy("يمكن ربط المنتج بأكثر من عطر مرجعي. تُحفظ العلاقة في نظام البدائل وليست كنص داخل المنتج.", "A product can link to multiple references. Relationships are saved in the alternatives system, not as product text.")}</p><div>${alternativeReferenceOptions || `<small>${adminCopy("أضف عطرًا مرجعيًا أولًا من قسم البدائل.", "Add a reference fragrance from Alternatives first.")}</small>`}</div></fieldset>
        </div>
      </section>

      <section class="review-section source-log-section" data-editor-tier="advanced">
        <div class="review-section-head"><span>07</span><div><b>${adminCopy("سجل المصادر", "Source log")}</b><small>${adminCopy("ما الذي جاء من أين؟", "What came from where?")}</small></div></div>
        <div class="source-log">
          ${(product.sourceLog || []).map((source) => `
            <article class="${source.status}">
              <span>${source.status === "success" ? "✓" : source.status === "manual" ? "✎" : "!"}</span>
              <div><b>${escapeHTML(source.provider)}</b><p>${escapeHTML((source.fields || []).join(" · ") || source.note || adminCopy("لم تُسترجع بيانات", "No data retrieved"))}</p></div>
              ${source.url ? `<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener">↗</a>` : ""}
            </article>`).join("")}
        </div>
      </section>

      <div class="review-submit">
        <div><b>${adminCopy("اختر الإجراء المناسب", "Choose the correct workflow action")}</b><small id="product-autosave-footer">${adminCopy("الحفظ التلقائي يحمي المسودة محليًا.", "Autosave protects the local draft.")}</small></div>
        <div class="review-submit-actions"><button class="button secondary-button" type="submit" name="workflowAction" value="draft">${adminCopy("حفظ كمسودة", "Save draft")}</button><button class="button secondary-button" type="submit" name="workflowAction" value="review">${adminCopy("إرسال للمراجعة", "Send for review")}</button><button class="button burgundy-button" type="submit" name="workflowAction" value="published">${adminCopy("نشر المنتج", "Publish product")} <span>←</span></button></div>
      </div>
    </form>`;
  $$(".import-steps span").forEach((step, index) => step.classList.toggle("active", index <= 1));
  $$("img", $("#import-workspace")).forEach((image) => image.addEventListener("error", () => image.closest(".review-image")?.classList.add("broken"), { once: true }));
  updateDuplicateWarning($("#import-review-form"));
  renderNoteMatchPreview($("#import-review-form"));
  updateProductEditorPreview($("#import-review-form"));
  updateAdminAccordEditor($("#import-review-form"));
  updateProductTypeFields($("#import-review-form"));
  initializeProductEditorTabs();
}

function optionValuesForProduct(group, rawValue) {
  const values = csvValues(rawValue);
  const items = productOptionItems(group);
  return values.map((value) => {
    const item = items.find((candidate) => [candidate.value,candidate.slug,candidate.nameAr,candidate.nameEn].some((candidateValue) => normalizeOptionSearch(candidateValue) === normalizeOptionSearch(value)));
    return item || { value, slug: normalizeOptionSearch(value).replaceAll(" ", "-"), nameAr: value, nameEn: value };
  });
}

function collectReviewProduct(form) {
  const data = new FormData(form);
  const base = state.activeImportDraft || ORIGOCatalog.emptyProduct();
  const selectedAccordIds = new Set(data.getAll("accordSelected").map(String));
  const accordProfile = ORIGO_ACCORD_LIBRARY.filter(([id]) => selectedAccordIds.has(id)).map(([id, nameAr, nameEn, color, icon]) => ({
    id, nameAr, nameEn, color, icon,
    strength: Math.max(0, Math.min(100, Number(data.get(`accordStrength.${id}`) || 0))),
    source: "ORIGO editorial"
  })).sort((a, b) => b.strength - a.strength);
  const images = [...(base.images || [])].map((image, index) => ({ ...image, selected: String(index) === String(data.get("selectedImage")) }));
  if (String(data.get("imageUrl") || "").trim()) images.unshift({ url: String(data.get("imageUrl")).trim(), provider: "Manager", selected: true });
  const genders = optionValuesForProduct("gender", data.get("gender"));
  const families = optionValuesForProduct("family", data.get("families")).slice(0, 3);
  const country = optionValuesForProduct("country", data.get("originCountry"))[0];
  const perfumers = optionValuesForProduct("perfumer", data.get("perfumers"));
  const noteSelections = Object.fromEntries(["top","heart","base"].map((levelName) => [levelName, optionValuesForProduct("note", data.get(`${levelName}Notes`))]));
  const noteRefs = Object.entries(noteSelections).flatMap(([position, items]) => items.map((item, sortOrder) => ({
    id: item.slug || normalizeOptionSearch(item.value || item.nameEn || item.nameAr).replaceAll(" ", "-"),
    slug: item.slug || normalizeOptionSearch(item.value || item.nameEn || item.nameAr).replaceAll(" ", "-"),
    nameAr: item.nameAr || item.nameEn || item.value,
    nameEn: item.nameEn || item.nameAr || item.value,
    image: item.image || "",
    familyId: item.familyId || "uncategorized",
    position,
    sortOrder
  })));
  const product = {
    ...base,
    id: base.id || `catalog-${Date.now()}`,
    nameAr: String(data.get("nameAr") || "").trim(),
    nameEn: String(data.get("nameEn") || "").trim(),
    brand: String(data.get("brand") || "").trim(),
    category: String(data.get("category") || ""),
    gender: genders[0]?.value || "",
    genders: genders.map((item) => item.value),
    concentration: String(data.get("concentration") || ""),
    status: String(data.get("status") || "draft"),
    price: Number(data.get("price") || 0),
    oldPrice: data.get("oldPrice") === "" ? null : Number(data.get("oldPrice") || 0),
    size: String(data.get("size") || "").trim(),
    sizes: String(data.get("size") || "").trim() ? [String(data.get("size")).trim()] : [],
    families: families.map((item) => item.value),
    familyAr: families.map((item) => item.nameAr || item.nameEn).filter(Boolean).join("، "),
    familyEn: families.map((item) => item.nameEn || item.nameAr).filter(Boolean).join(", "),
    seasons: csvValues(data.get("seasons")),
    usageTimes: csvValues(data.get("usageTimes")),
    originCountry: country?.value || "",
    originCountryAr: country?.nameAr || country?.nameEn || "",
    originCountryEn: country?.nameEn || country?.nameAr || "",
    sku: String(data.get("sku") || "").trim(),
    barcode: String(data.get("barcode") || "").trim(),
    tags: csvValues(data.get("tags")),
    descriptionAr: String(data.get("descriptionAr") || "").trim(),
    descriptionEn: String(data.get("descriptionEn") || "").trim(),
    videoUrl: String(data.get("videoUrl") || "").trim(),
    manualSourceUrl: String(data.get("manualSourceUrl") || "").trim(),
    images,
    inventory: {
      quantity: Number(data.get("quantity") || 0),
      reserved: Number(base.inventory?.reserved || 0),
      minimum: Number(data.get("minimumStock") || 0),
      cost: Number(data.get("cost") || 0)
    },
    performance: {
      longevity: Number(data.get("longevity") || 0),
      sillage: Number(data.get("sillage") || 0)
    },
    releaseYear: data.get("releaseYear") === "" ? null : Number(data.get("releaseYear")),
    perfumer: perfumers.map((item) => item.nameEn || item.nameAr).join(", "),
    perfumers: perfumers.map((item) => item.value),
    occasions: csvValues(data.get("occasions")),
    mainIngredients: [],
    accordProfile,
    mainAccords: accordProfile.map((item) => item.nameAr),
    personalities: csvValues(data.get("personalities")),
    moods: csvValues(data.get("moods")),
    inspiredBy: String(data.get("inspiredBy") || "").trim(),
    similarity: data.get("similarity") === "" ? null : Number(data.get("similarity")),
    slug: String(data.get("slug") || "").trim(),
    seo: {
      title: String(data.get("seoTitle") || "").trim(),
      description: String(data.get("seoDescription") || "").trim()
    },
    variants: csvValues(data.get("variants")),
    featuredNotes: csvValues(data.get("featuredNotes")),
    hoverImage: String(data.get("hoverImage") || "").trim(),
    cardBadgeAr: String(data.get("cardBadgeAr") || "").trim(),
    similarProductIds: csvValues(data.get("similarProductIds")),
    crossSellIds: csvValues(data.get("crossSellIds")),
    alternativeIds: csvValues(data.get("alternativeIds")),
    noteSelections: Object.fromEntries(Object.entries(noteSelections).map(([key,items]) => [key, items.map((item) => item.value)])),
    noteLibrary: {
      slugs: [...new Set(noteRefs.map((item) => item.slug))],
      refs: noteRefs,
      unmatched: []
    },
    notes: {
      topAr: noteSelections.top.map((item) => item.nameAr || item.nameEn), topEn: noteSelections.top.map((item) => item.nameEn || item.nameAr),
      heartAr: noteSelections.heart.map((item) => item.nameAr || item.nameEn), heartEn: noteSelections.heart.map((item) => item.nameEn || item.nameAr),
      baseAr: noteSelections.base.map((item) => item.nameAr || item.nameEn), baseEn: noteSelections.base.map((item) => item.nameEn || item.nameAr)
    },
    profileImages: Object.fromEntries(PRODUCT_PROFILE_IMAGE_FIELDS.map(([key]) => [key, {
      ar: String(data.get(`profileImage.${key}.ar`) || "").trim(),
      en: String(data.get(`profileImage.${key}.en`) || "").trim()
    }])),
    performanceInsights: {
      enabled: data.get("performanceEnabled") === "on",
      showOverallResult: data.get("performanceShowOverall") === "on",
      allowUnverified: data.get("performanceAllowUnverified") === "on",
      visibleMetrics: data.getAll("performanceVisible"),
      cardOrder: csvValues(data.get("performanceCardOrder")),
      weights: {
        editorial: Number(data.get("performanceEditorialWeight") ?? 30),
        customers: Number(data.get("performanceCustomerWeight") ?? 70)
      },
      minimumVerifiedVotes: Number(data.get("performanceMinimumVerified") ?? 5),
      editorial: Object.fromEntries(Object.entries(performanceAdminOptions).map(([metric, options]) => [metric, Object.fromEntries(options.map(([key]) => [key, Number(data.get(`performance.${metric}.${key}`) || 0)]))])),
      editorialDetails: {
        longevityMinHours: data.get("performanceLongevityMinHours") === "" ? null : Number(data.get("performanceLongevityMinHours")),
        longevityMaxHours: data.get("performanceLongevityMaxHours") === "" ? null : Number(data.get("performanceLongevityMaxHours")),
        reviewerName: String(data.get("performanceReviewerName") || "").trim(),
        reviewerNotes: String(data.get("performanceReviewerNotes") || "").trim(),
        reviewedAt: String(data.get("performanceReviewedAt") || "").trim()
      },
      imported: Number(data.get("performanceImportedCount") || 0) > 0 ? {
        count: Number(data.get("performanceImportedCount")),
        source: String(data.get("performanceImportedSource") || "").trim(),
        importDate: String(data.get("performanceImportedDate") || "").trim(),
        reason: String(data.get("performanceImportedReason") || "").trim()
      } : null
    },
    dynamicAttributes: {
      skinType: String(data.get("skinType") || "").trim(), hairType: String(data.get("hairType") || "").trim(), concern: String(data.get("concern") || "").trim(),
      aroma: String(data.get("aroma") || "").trim(), weight: String(data.get("weight") || "").trim(), diffusionDuration: String(data.get("diffusionDuration") || "").trim(),
      giftOccasion: String(data.get("giftOccasion") || "").trim(), giftContents: String(data.get("giftContents") || "").trim(),
      usageInstructionsAr: String(data.get("usageInstructionsAr") || "").trim(), usageInstructionsEn: String(data.get("usageInstructionsEn") || "").trim()
    }
  };
  if (product.category === "perfume") {
    const noteLibrary = window.ORIGOFragranceNotes?.enrichProduct(product);
    if (noteLibrary) {
      product.notes = noteLibrary.notes;
      product.familyAr ||= noteLibrary.familyAr;
      product.familyEn ||= noteLibrary.familyEn;
      product.noteLibrary = {
        slugs: [...new Set(noteLibrary.matches.map((note) => note.slug))],
        refs: noteLibrary.matches.map((note, index) => ({
          id: note.slug,
          nameAr: note.nameAr,
          nameEn: note.nameEn,
          aliases: note.aliases || [],
          image: note.image,
          familyId: note.familyId,
          position: note.requestedPosition || note.position || "multiple",
          intensity: Number(product.noteIntensities?.[note.slug] || note.defaultIntensity || 3),
          defaultIntensity: Number(note.defaultIntensity || 3),
          sortOrder: index
        })),
        unmatched: noteLibrary.unknown
      };
      localStorage.setItem("origoFragranceNotesState", JSON.stringify(window.ORIGOFragranceNotes.getState()));
    }
    const knowledge = window.ORIGOFragranceKnowledge?.enrichProduct(product);
    if (knowledge?.fields?.length) {
      Object.entries(knowledge.data).forEach(([key, value]) => {
        if (!product[key] || (Array.isArray(product[key]) && !product[key].length)) product[key] = value;
      });
      if (!(product.sourceLog || []).some((source) => source.provider === "ORIGO Fragrance Knowledge")) {
        product.sourceLog = [...(product.sourceLog || []), {
          provider: "ORIGO Fragrance Knowledge",
          url: "",
          fields: knowledge.fields,
          status: "success",
          note: `${knowledge.matches.length} matched ingredients`,
          fetchedAt: new Date().toISOString()
        }];
      }
    }
  }
  if (product.manualSourceUrl && !(product.sourceLog || []).some((source) => source.url === product.manualSourceUrl)) {
    product.sourceLog = [...(product.sourceLog || []), {
      provider: product.manualSourceUrl.includes("fragrantica.") ? "Fragrantica · manager reference" : "Manager reference",
      url: product.manualSourceUrl,
      fields: [],
      status: "manual",
      note: "Reviewed manually by manager",
      fetchedAt: new Date().toISOString()
    }];
  }
  return ORIGOCatalog.computeConfidence(product);
}

function fileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function optimizeGalleryImage(file) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowed.includes(file.type)) throw new Error(adminCopy("صيغة الصورة غير مدعومة. استخدم JPG أو PNG أو WebP أو AVIF.", "Unsupported image type. Use JPG, PNG, WebP, or AVIF."));
  if (file.size > 15 * 1024 * 1024) throw new Error(adminCopy("حجم الصورة أكبر من 15 MB.", "Image exceeds 15 MB."));
  const source = await fileAsDataURL(file);
  const image = await new Promise((resolve, reject) => {
    const preview = new Image();
    preview.onload = () => resolve(preview);
    preview.onerror = () => reject(new Error(adminCopy("تعذر قراءة الصورة. جرّب حفظها بصيغة JPG أو PNG.", "Could not read the image. Try saving it as JPG or PNG.")));
    preview.src = source;
  });
  const maxWidth = 1800;
  const maxHeight = 900;
  const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error(adminCopy("تعذر تجهيز الصورة في هذا المتصفح.", "This browser could not process the image."));
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  let quality = .82;
  let result = canvas.toDataURL("image/webp", quality);
  while (result.length > 520_000 && quality > .48) {
    quality -= .08;
    result = canvas.toDataURL("image/webp", quality);
  }
  if (result === "data:,") throw new Error(adminCopy("فشل تحويل الصورة. جرّب صورة أصغر.", "Image conversion failed. Try a smaller image."));
  return result;
}

async function optimizeProductOptionArtwork(file) {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
  if (!allowed.includes(file.type)) throw new Error(adminCopy("نوع الصورة غير مدعوم.", "Unsupported image type."));
  if (file.size > 10 * 1024 * 1024) throw new Error(adminCopy("حجم الصورة أكبر من 10 MB.", "Image exceeds 10 MB."));
  if (file.type === "image/svg+xml") {
    if (file.size > 450_000) throw new Error(adminCopy("ملف SVG أكبر من 450 KB.", "SVG exceeds 450 KB."));
    return fileAsDataURL(file);
  }
  const source = await fileAsDataURL(file);
  const image = await new Promise((resolve, reject) => {
    const preview = new Image();
    preview.onload = () => resolve(preview);
    preview.onerror = () => reject(new Error(adminCopy("تعذر قراءة الصورة. جرّب PNG أو JPG.", "Could not read the image. Try PNG or JPG.")));
    preview.src = source;
  });
  const maxSide = 720;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error(adminCopy("تعذر تجهيز الصورة في المتصفح.", "The browser could not prepare the image."));
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  let quality = .86;
  let optimized = canvas.toDataURL("image/webp", quality);
  while (optimized.length > 620_000 && quality > .56) {
    quality -= .08;
    optimized = canvas.toDataURL("image/webp", quality);
  }
  if (optimized.length > 900_000) throw new Error(adminCopy("تعذر ضغط الصورة للحجم المناسب. اختر صورة أبسط.", "The image could not be reduced enough. Choose a simpler image."));
  return optimized;
}

async function handleGalleryUpload(input) {
  const form = input.closest("#import-review-form");
  const draft = collectReviewProduct(form);
  const files = [...input.files].slice(0, Math.max(0, 10 - (draft.images || []).length));
  if (!files.length) {
    showToast(adminCopy("الحد الأقصى 10 صور للمنتج", "Maximum 10 product images"));
    return;
  }
  input.closest(".gallery-upload").classList.add("loading");
  try {
    const uploaded = await Promise.all(files.map(async (file) => ({
      url: await optimizeGalleryImage(file),
      provider: "Manager gallery",
      fileName: file.name,
      selected: false
    })));
    if (!draft.images.some((image) => image.selected) && uploaded[0]) uploaded[0].selected = true;
    draft.images = [...draft.images, ...uploaded];
    state.activeImportDraft = draft;
    renderImportReview(draft);
    showToast(adminCopy(`تمت إضافة ${uploaded.length} صورة من المعرض`, `${uploaded.length} gallery images added`));
  } catch (error) {
    showToast(adminCopy("تعذر إضافة صورة؛ الحد الأقصى 10MB للصورة", "Could not add image; maximum 10MB per image"));
  }
}

async function handleProfileImageUpload(input) {
  const file = input.files?.[0];
  const form = input.closest("#import-review-form");
  if (!file || !form) return;
  const key = input.dataset.profileImageUpload;
  const language = input.dataset.profileImageLanguage;
  const card = input.closest("[data-profile-image-card]");
  card?.classList.add("loading");
  try {
    const source = await optimizeGalleryImage(file);
    const hidden = form.elements[`profileImage.${key}.${language}`];
    if (hidden) hidden.value = source;
    const figure = card?.querySelector("figure");
    const image = figure?.querySelector("img");
    if (image) image.src = source;
    if (figure) figure.hidden = false;
    card?.classList.add("has-image");
    updateProductEditorPreview(form);
    showToast(language === "ar" ? "تم رفع الصورة العربية" : "English artwork uploaded");
  } catch {
    input.value = "";
    showToast(adminCopy("تعذر رفع الصورة؛ استخدم PNG أو JPG أو WEBP حتى 10MB", "Could not upload artwork; use PNG, JPG or WEBP up to 10MB"));
  } finally {
    card?.classList.remove("loading");
  }
}

function updateDuplicateWarning(form) {
  if (!form) return null;
  const product = collectReviewProduct(form);
  const duplicate = findDuplicate(product, product.id);
  const alert = $("#duplicate-alert");
  alert.hidden = !duplicate;
  if (duplicate) alert.innerHTML = `<b>${adminCopy("منتج مشابه موجود مسبقًا", "Possible duplicate found")}</b><span>${escapeHTML(duplicate.brand)} · ${escapeHTML(duplicate.nameEn || duplicate.nameAr)}${duplicate.sku ? ` · SKU ${escapeHTML(duplicate.sku)}` : ""}</span>`;
  return duplicate;
}

async function saveCatalogProduct(form, workflowAction = "draft") {
  let product = collectReviewProduct(form);
  const selectedReferenceIds = [...form.querySelectorAll("[name='alternativeReferenceIds']:checked")].map((input) => input.value);
  const previousAlternativeMatches = (state.alternativesAdmin?.items || []).filter((item) => item.productId === product.id);
  product.status = ["draft", "review", "published"].includes(workflowAction) ? workflowAction : "draft";
  const duplicate = findDuplicate(product, product.id);
  if (duplicate) {
    updateDuplicateWarning(form);
    showToast(adminCopy("تم إيقاف الحفظ: المنتج موجود مسبقًا", "Save blocked: product already exists"));
    return;
  }
  if (!product.nameAr && !product.nameEn) {
    showToast(adminCopy("أدخل اسم المنتج بلغة واحدة على الأقل", "Enter the product name in at least one language"));
    return;
  }
  if (product.oldPrice != null && product.oldPrice <= product.price) {
    form.elements.oldPrice?.setCustomValidity(adminCopy("يجب أن يكون السعر قبل الخصم أكبر من السعر الحالي.", "Compare-at price must exceed the current price."));
    form.elements.oldPrice?.reportValidity();
    showToast(adminCopy("راجع السعر قبل الخصم.", "Check the compare-at price."));
    return;
  }
  if (product.status === "published") {
    const missing = [!product.nameAr && !product.nameEn, !product.brand, !product.size, !(product.images || []).length, !(Number(product.price) > 0)].some(Boolean);
    if (missing) {
      showToast(adminCopy("لا يمكن النشر: أكمل الاسم والعلامة والحجم والسعر والصورة الرئيسية.", "Cannot publish: complete name, brand, size, price, and main image."));
      return;
    }
    if (!window.confirm(adminCopy("هل تريد نشر المنتج الآن وإظهاره للعملاء؟", "Publish this product and make it visible to customers now?"))) return;
  }
  const submit = form.querySelector(`[name='workflowAction'][value='${product.status}']`) || form.querySelector("[type='submit']");
  form.querySelectorAll("[type='submit']").forEach((button) => button.disabled = true);
  const originalLabel = submit.innerHTML;
  submit.textContent = adminCopy("جارٍ الحفظ…", "Saving…");
  try {
    if (state.serverAvailable) {
      const result = await api("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(product)
      });
      product = result.product;
      for (const referenceId of selectedReferenceIds) {
        const existing = previousAlternativeMatches.find((item) => item.referenceId === referenceId);
        await api("/api/admin/alternative-relationships/bulk", { method: "POST", body: JSON.stringify({ referenceId, links: [{
          productId: product.id, approvedSimilarity: existing?.approvedSimilarity ?? null,
          relationshipType: existing?.relationshipType || "similar_character", reasonAr: existing?.reasonAr || "",
          reasonEn: existing?.reasonEn || "", visible: existing?.visible !== false, status: existing?.status || "active",
          reviewStatus: existing?.reviewStatus || "approved", sortOrder: existing?.sortOrder || 0,
          primaryReference: existing?.primaryReference || false, primaryAlternative: existing?.primaryAlternative || false
        }] }) });
      }
      for (const match of previousAlternativeMatches.filter((item) => !selectedReferenceIds.includes(item.referenceId))) {
        await api(`/api/admin/alternative-relationships/${encodeURIComponent(match.id)}`, { method: "DELETE" });
      }
      if (selectedReferenceIds.length || previousAlternativeMatches.length) state.alternativesAdmin = await api("/api/admin/alternatives");
    } else {
      product.updatedAt = new Date().toISOString();
      product.createdAt = product.createdAt || product.updatedAt;
    }
  } catch (error) {
    form.querySelectorAll("[type='submit']").forEach((button) => button.disabled = false);
    submit.innerHTML = originalLabel;
    showToast(error.message);
    return;
  }
  const existingIndex = state.catalogProducts.findIndex((item) => item.id === product.id);
  if (existingIndex >= 0) state.catalogProducts.splice(existingIndex, 1, product);
  else state.catalogProducts.unshift(product);
  if (product.inventory) {
    state.adminWorkspace.inventory[product.id] = product.inventory;
    saveAdminWorkspace();
  }
  if (!state.serverAvailable) {
    try {
      localStorage.setItem("origoCatalogProducts", JSON.stringify(state.catalogProducts));
    } catch {
      showToast(adminCopy("مساحة المتصفح لا تكفي؛ قلّل عدد الصور أو حجمها", "Browser storage is full; remove or reduce images"));
      return;
    }
  }
  rebuildStorefrontProducts();
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderCatalogList();
  $$(".import-steps span").forEach((step) => step.classList.add("active"));
  $("#import-workspace").innerHTML = `
    <div class="import-success"><span>✓</span><h3>${product.status === "published" ? adminCopy("تم نشر المنتج في المتجر", "Product published") : product.status === "review" ? adminCopy("تم إرسال المنتج للمراجعة", "Product sent for review") : adminCopy("تم حفظ المنتج كمسودة", "Product saved as draft")}</h3>
    <p>${product.status === "published" ? adminCopy("أصبح المنتج ظاهرًا للعملاء.", "The product is now visible to customers.") : product.status === "review" ? adminCopy("المنتج مخفي عن العملاء حتى تتم مراجعته ونشره.", "The product stays hidden until reviewed and published.") : adminCopy("المسودة لا تظهر للعملاء ويمكنك استكمالها لاحقًا.", "The draft is hidden and can be completed later.")}</p>
    <div><button class="button secondary-button" data-action="edit-catalog-product" data-id="${escapeHTML(product.id)}">${adminCopy("مراجعة المنتج", "Review product")}</button><button class="button burgundy-button" data-action="new-product">${adminCopy("إضافة منتج آخر", "Add another product")}</button></div></div>`;
  localStorage.removeItem("origoProductAutosave");
  showToast(product.status === "published" ? adminCopy("تم نشر المنتج", "Product published") : product.status === "review" ? adminCopy("تم الإرسال للمراجعة", "Sent for review") : adminCopy("تم حفظ المسودة", "Draft saved"));
}

function renderCatalogList() {
  const list = $("#catalog-list");
  if (!list) return;
  $("#catalog-total-count").textContent = state.catalogProducts.length;
  $("#catalog-draft-count").textContent = state.catalogProducts.filter((product) => product.status === "draft").length;
  $("#catalog-published-count").textContent = state.catalogProducts.filter((product) => product.status === "published").length;
  if (!state.catalogProducts.length) {
    list.innerHTML = `<div class="catalog-empty"><span>◇</span><p>${adminCopy("لا توجد منتجات محفوظة بعد.", "No saved products yet.")}</p></div>`;
    return;
  }
  list.innerHTML = state.catalogProducts.slice(0, 12).map((product) => {
    const image = product.images?.find((item) => item.selected)?.url || product.images?.[0]?.url || PRODUCT_IMAGE_PLACEHOLDER;
    return `<button class="catalog-list-item" data-action="edit-catalog-product" data-id="${escapeHTML(product.id)}">
      <img src="${escapeHTML(image)}" alt="" /><span><small>${escapeHTML(product.brand || adminCopy("بدون براند", "No brand"))}</small><b>${escapeHTML(state.lang === "ar" ? product.nameAr || product.nameEn : product.nameEn || product.nameAr)}</b><i class="${escapeHTML(product.status)}">${statusLabel(product.status)}</i></span><strong>→</strong>
    </button>`;
  }).join("");
}

function observeReveals() {
  // Keep content immediately paintable. The old observer added work and could
  // leave product sections invisible when hosting/browser policies blocked it.
  $$(".reveal:not(.visible)").forEach((element) => element.classList.add("visible"));
}

document.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.closest(".origo-product-card") || image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = "true";
  image.src = PRODUCT_IMAGE_PLACEHOLDER;
}, true);

let productCardGesture = null;
document.addEventListener("pointerdown", (event) => {
  const media = event.target.closest(".product-card-media-swipe");
  if (!media || media.closest("[data-horizontal-rail]") || event.target.closest("button")) return;
  productCardGesture = { media, x: event.clientX, y: event.clientY };
  media.setPointerCapture?.(event.pointerId);
});
document.addEventListener("pointerup", (event) => {
  if (!productCardGesture) return;
  const { media, x, y } = productCardGesture;
  productCardGesture = null;
  const deltaX = event.clientX - x;
  const deltaY = event.clientY - y;
  const productId = media.dataset.productId;
  if (Math.abs(deltaX) > 38 && Math.abs(deltaX) > Math.abs(deltaY)) setCardImage(productId, deltaX > 0 ? -1 : 1);
  else if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8 && !window.ORIGOPerfumeAura?.handleTap(event, media)) showProductDetails(getProduct(productId));
});
document.addEventListener("keydown", (event) => {
  if (event.target.matches("[data-smart-search]")) {
    const menu = event.target.closest(".smart-select-menu");
    const options = [...menu.querySelectorAll("[role='option']:not([hidden])")];
    let index = options.findIndex((option) => option.classList.contains("keyboard-active"));
    if (["ArrowDown","ArrowUp"].includes(event.key) && options.length) {
      event.preventDefault();
      index = (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
      options.forEach((option, optionIndex) => option.classList.toggle("keyboard-active", optionIndex === index));
      options[index].scrollIntoView({ block:"nearest" });
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (index >= 0) options[index].click();
      else menu.querySelector(".smart-select-create")?.click();
    } else if (event.key === "Escape") closeSmartSelects();
    return;
  }
  if (event.target.id === "catalog-search-input") {
    const holder = $("#catalog-autocomplete");
    const options = $$('[role="option"]', holder);
    if (["ArrowDown", "ArrowUp"].includes(event.key) && options.length) {
      event.preventDefault();
      state.catalogAutocompleteIndex = (state.catalogAutocompleteIndex + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
      options.forEach((option, index) => option.classList.toggle("active", index === state.catalogAutocompleteIndex));
      options[state.catalogAutocompleteIndex].scrollIntoView({ block: "nearest" });
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (state.catalogAutocompleteIndex >= 0 && options[state.catalogAutocompleteIndex]) options[state.catalogAutocompleteIndex].click();
      else $("[data-action='catalog-submit-search']").click();
    }
    if (event.key === "Escape") holder.hidden = true;
    return;
  }
  const media = event.target.closest?.(".product-card-media-swipe");
  if (!media) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!window.ORIGOPerfumeAura?.handleKeyboard(media)) showProductDetails(getProduct(media.dataset.productId));
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    setCardImage(media.dataset.productId, event.key === "ArrowLeft" ? -1 : 1);
  }
});

function smartSelectValues(holder) {
  return csvValues(holder?.querySelector("input[type='hidden']")?.value || "");
}

function setSmartSelectValues(holder, values) {
  if (!holder) return;
  const multiple = holder.dataset.multiple === "true";
  const group = holder.dataset.group;
  const unique = [...new Map(values.map((value) => [normalizeOptionSearch(value), value])).values()].filter(Boolean);
  const next = multiple ? unique : unique.slice(-1);
  const hidden = holder.querySelector("input[type='hidden']");
  hidden.value = next.join(", ");
  const items = productOptionItems(group);
  const chips = holder.querySelector(".smart-select-chips");
  chips.innerHTML = next.length ? next.map((value) => {
    const item = items.find((candidate) => normalizeOptionSearch(candidate.value) === normalizeOptionSearch(value)) || { value, nameAr:value, nameEn:value };
    return smartSelectChipMarkup(item, value, { multiple, group });
  }).join("") : `<small>${adminCopy("ابحث أو اختر…","Search or select…")}</small>`;
  holder.querySelectorAll("[role='option']").forEach((option) => option.setAttribute("aria-selected", String(next.some((value) => normalizeOptionSearch(value) === normalizeOptionSearch(option.dataset.value)))));
  holder.closest("form")?.dispatchEvent(new Event("input", { bubbles:true }));
}

function closeSmartSelects(except = null) {
  $$('[data-smart-select] .smart-select-menu').forEach((menu) => {
    if (menu !== except) {
      menu.hidden = true;
      menu.closest("[data-smart-select]")?.querySelector(".smart-select-control")?.setAttribute("aria-expanded", "false");
    }
  });
}

function openProductOptionDialog(holder) {
  document.querySelector("#product-option-dialog")?.remove();
  const group = holder.dataset.group;
  const dialog = document.createElement("dialog");
  dialog.id = "product-option-dialog";
  dialog.className = "product-option-dialog";
  dialog.dataset.targetName = holder.dataset.name || "";
  dialog.dataset.group = group;
  dialog.dataset.context = holder.closest?.("#import-review-form") ? "editor" : "manager";
  const noteFields = group === "note" ? `<label class="wide">${adminCopy("تعديل نوتة موجودة (اختياري)","Edit an existing note (optional)")}<select name="existingOption"><option value="">${adminCopy("إضافة نوتة جديدة","Add a new note")}</option>${productOptionItems("note").map((item) => `<option value="${escapeHTML(item.value)}">${escapeHTML(item.nameAr)} · ${escapeHTML(item.nameEn)}</option>`).join("")}</select></label>
    <label>${adminCopy("الوصف بالعربية","Arabic description")}<textarea name="descriptionAr" dir="rtl" maxlength="1000"></textarea></label><label>${adminCopy("الوصف بالإنجليزية","English description")}<textarea name="descriptionEn" dir="ltr" maxlength="1000"></textarea></label>
    <label>${adminCopy("العائلة العطرية","Fragrance family")}<select name="familyId">${window.ORIGOFragranceNotes.families.map((family) => `<option value="${escapeHTML(family.id)}">${escapeHTML(family.nameAr)} · ${escapeHTML(family.nameEn)}</option>`).join("")}</select></label>
    <label>${adminCopy("الموضع الافتراضي","Default position")}<select name="position"><option value="multiple">${adminCopy("متعدد","Multiple")}</option><option value="top">${adminCopy("المقدمة","Top")}</option><option value="heart">${adminCopy("القلب","Heart")}</option><option value="base">${adminCopy("القاعدة","Base")}</option></select></label>` : "";
  const uploadFields = ["note", "brand"].includes(group) ? `<input type="hidden" name="image"/><input type="hidden" name="icon"/><label class="wide option-image-upload"><span>${group === "brand" ? adminCopy("شعار العلامة التجارية من الملفات","Brand logo from files") : adminCopy("صورة النوتة من الملفات","Note image from files")}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml" data-product-option-image-upload/><small>${adminCopy("تُضغط الصورة تلقائيًا إلى WEBP شفاف وسريع — بحد أقصى 10 MB للملف الأصلي","Artwork is automatically optimized to a fast transparent WEBP — source up to 10 MB")}</small><em class="option-image-status" aria-live="polite"></em></label><figure class="option-image-preview" hidden><img alt=""/><figcaption></figcaption><button type="button" data-action="remove-product-option-image">×</button></figure>` : `<input type="hidden" name="image"/><input type="hidden" name="icon"/>`;
  dialog.innerHTML = `<form method="dialog"><header><div><small>${adminCopy("إدارة خصائص المنتج","Product attributes")}</small><h3>${group === "note" ? adminCopy("إضافة أو تعديل نوتة عطرية","Add or edit a fragrance note") : group === "brand" ? adminCopy("إضافة أو تعديل علامة تجارية","Add or edit a brand") : adminCopy("إضافة خيار جديد","Add a new option")}</h3></div><button type="button" data-action="close-product-option">×</button></header><input type="hidden" name="slug"/><div class="option-dialog-grid">${noteFields}<label>${adminCopy("الاسم بالعربية","Arabic name")}<input name="nameAr" dir="rtl" required maxlength="160"/></label><label>${adminCopy("الاسم بالإنجليزية","English name")}<input name="nameEn" dir="ltr" required maxlength="160"/></label>${uploadFields}<label>${adminCopy("لون اختياري","Optional color")}<input name="color" type="color" value="#7a001d"/></label><label>${adminCopy("ترتيب الظهور","Sort order")}<input name="sortOrder" type="number" min="0" value="0"/></label><label class="option-active"><input name="active" type="checkbox" checked/><span>${adminCopy("الخيار نشط","Option is active")}</span></label></div><footer><button type="button" class="button secondary-button" data-action="close-product-option">${adminCopy("إلغاء","Cancel")}</button><button type="button" class="button burgundy-button" data-action="save-product-option">${adminCopy("حفظ وإضافة","Save & add")}</button></footer><p class="option-dialog-error" hidden></p></form>`;
  document.body.append(dialog);
  dialog.showModal();
  dialog.querySelector("[name='nameAr']")?.focus();
}

function populateProductOptionDialog(dialog, value = "") {
  const item = productOptionItems(dialog.dataset.group).find((option) => normalizeOptionSearch(option.value) === normalizeOptionSearch(value));
  if (!item) return;
  const form = dialog.querySelector("form");
  const note = dialog.dataset.group === "note" ? window.ORIGOFragranceNotes.find(item.slug || item.value) : null;
  const source = { ...item, ...(note || {}), ...(item.metadata || {}) };
  form.elements.slug.value = item.slug || "";
  form.elements.nameAr.value = source.nameAr || "";
  form.elements.nameEn.value = source.nameEn || "";
  if (form.elements.icon) form.elements.icon.value = source.icon || source.symbol || "";
  if (form.elements.image) form.elements.image.value = source.image || "";
  form.elements.color.value = source.color || "#7a001d";
  form.elements.sortOrder.value = Number(source.sortOrder || 0);
  form.elements.active.checked = source.active !== false;
  if (form.elements.existingOption) form.elements.existingOption.value = item.value;
  if (form.elements.descriptionAr) form.elements.descriptionAr.value = source.descriptionAr || "";
  if (form.elements.descriptionEn) form.elements.descriptionEn.value = source.descriptionEn || "";
  if (form.elements.familyId) form.elements.familyId.value = source.familyId || "uncategorized";
  if (form.elements.position) form.elements.position.value = source.position || "multiple";
  const preview = dialog.querySelector(".option-image-preview");
  if (preview && source.image) { preview.hidden = false; preview.querySelector("img").src = source.image; }
}

document.addEventListener("click", async (event) => {
  const actionElement = event.target.closest("[data-action]");
  const accountMenu = $("#header-account-menu");
  const accountMenuButton = $("[data-action='account-menu']");
  if (!actionElement) {
    if (accountMenu && !accountMenu.hidden) {
      accountMenu.hidden = true;
      accountMenuButton?.setAttribute("aria-expanded", "false");
    }
    return;
  }
  const action = actionElement.dataset.action;
  if (action === "account-menu") {
    const opening = accountMenu?.hidden !== false;
    if (accountMenu) accountMenu.hidden = !opening;
    actionElement.setAttribute("aria-expanded", String(opening));
    return;
  }
  if (accountMenu && !accountMenu.hidden) {
    accountMenu.hidden = true;
    accountMenuButton?.setAttribute("aria-expanded", "false");
  }
  if (action === "reset-appearance") {
    const form = actionElement.closest("#admin-settings-form");
    if (!form) return;
    Object.entries(defaultStoreSettings.appearance).forEach(([key, value]) => {
      const field = form.elements[`appearance.${key}`];
      if (field?.type === "checkbox") field.checked = Boolean(value);
      else if (field) field.value = value;
    });
    form.querySelectorAll("[data-appearance-output]").forEach((output) => {
      const key = output.dataset.appearanceOutput;
      const field = form.elements[`appearance.${key}`];
      const suffix = ["baseFontSize", "imageRadius", "cardRadius", "cardBorderWidth"].includes(key) ? "px" : ["headingScale", "iconScale", "imageScale"].includes(key) ? "×" : "";
      output.textContent = `${field?.value || ""}${suffix}`;
    });
    applyAppearanceSettings(defaultStoreSettings.appearance);
    showToast(adminCopy("تمت استعادة المعاينة الافتراضية — احفظ لتثبيت التغيير", "Default preview restored — save to apply"));
    return;
  }
  if (action === "delete-home-media") {
    const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
    settings.homeMedia = settings.homeMedia.filter((item) => String(item.id) !== String(actionElement.dataset.id));
    state.adminWorkspace.settings = settings;
    saveAdminWorkspace("homepage");
    renderAdminDashboard(state.adminView === "content" ? "content" : "homepage");
    showToast(adminCopy("تم حذف الوسائط", "Media removed"));
    return;
  }
  if (action === "smart-select-open") {
    const holder = actionElement.closest("[data-smart-select]");
    const menu = holder.querySelector(".smart-select-menu");
    const opening = menu.hidden;
    closeSmartSelects(menu);
    menu.hidden = !opening;
    actionElement.setAttribute("aria-expanded", String(opening));
    if (opening) setTimeout(() => menu.querySelector("[data-smart-search]")?.focus(), 0);
    return;
  }
  if (action === "smart-select-option") {
    const holder = actionElement.closest("[data-smart-select]");
    const current = smartSelectValues(holder);
    const value = actionElement.dataset.value;
    const exists = current.some((item) => normalizeOptionSearch(item) === normalizeOptionSearch(value));
    if (!exists && holder.dataset.group === "family" && current.length >= 3) {
      showToast(adminCopy("يمكن اختيار ثلاث عائلات عطرية كحد أقصى.","Choose up to three fragrance families."));
      return;
    }
    if (!exists && holder.dataset.name === "mainIngredients" && current.length >= 8) {
      showToast(adminCopy("يمكن اختيار ثمانية مكونات أساسية كحد أقصى.","Choose up to eight key ingredients."));
      return;
    }
    if (holder.dataset.group === "season" && !exists) {
      if (value === "all") current.splice(0, current.length);
      else {
        const allIndex = current.indexOf("all");
        if (allIndex >= 0) current.splice(allIndex, 1);
      }
    }
    setSmartSelectValues(holder, exists ? current.filter((item) => normalizeOptionSearch(item) !== normalizeOptionSearch(value)) : [...current, value]);
    if (holder.dataset.multiple !== "true") closeSmartSelects();
    return;
  }
  if (action === "smart-select-remove") {
    event.stopPropagation();
    const holder = actionElement.closest("[data-smart-select]");
    setSmartSelectValues(holder, smartSelectValues(holder).filter((item) => normalizeOptionSearch(item) !== normalizeOptionSearch(actionElement.dataset.value)));
    return;
  }
  if (action === "smart-select-edit-note") {
    event.stopPropagation();
    const holder = actionElement.closest("[data-smart-select]");
    openProductOptionDialog(holder);
    populateProductOptionDialog($("#product-option-dialog"), actionElement.dataset.value || "");
    return;
  }
  if (action === "smart-select-clear") {
    setSmartSelectValues(actionElement.closest("[data-smart-select]"), []);
    return;
  }
  if (action === "smart-select-all") {
    const holder = actionElement.closest("[data-smart-select]");
    setSmartSelectValues(holder, productOptionItems(holder.dataset.group).map((item) => item.value));
    return;
  }
  if (["smart-select-create","smart-select-settings"].includes(action)) {
    const holder = actionElement.closest("[data-smart-select]");
    openProductOptionDialog(holder);
    if (action === "smart-select-settings") populateProductOptionDialog($("#product-option-dialog"), smartSelectValues(holder)[0] || "");
    return;
  }
  if (action === "manage-product-option") {
    openProductOptionDialog(actionElement);
    return;
  }
  if (action === "delete-product-option") {
    if (!window.confirm(adminCopy("حذف هذا الخيار؟","Delete this option?"))) return;
    try {
      await api(`/api/admin/product-options/${actionElement.dataset.id}`, { method:"DELETE" });
      state.productOptions = state.productOptions.filter((item) => String(item.id) !== String(actionElement.dataset.id));
      renderAdminDashboard("product-options");
      showToast(adminCopy("تم حذف الخيار","Option deleted"));
    } catch (errorValue) { showToast(errorValue.message); }
    return;
  }
  if (action === "close-product-option") {
    actionElement.closest("dialog")?.close();
    actionElement.closest("dialog")?.remove();
    return;
  }
  if (action === "remove-product-option-image") {
    const dialog = actionElement.closest("dialog");
    dialog.querySelector("[name='image']").value = "";
    const fileInput = dialog.querySelector("[data-product-option-image-upload]");
    if (fileInput) fileInput.value = "";
    const status = dialog.querySelector(".option-image-status");
    if (status) status.textContent = "";
    dialog.querySelector(".option-image-preview").hidden = true;
    return;
  }
  if (action === "save-product-option") {
    const dialog = actionElement.closest("dialog");
    const form = dialog.querySelector("form");
    const error = dialog.querySelector(".option-dialog-error");
    if (form.dataset.imageProcessing === "true") { error.hidden=false; error.textContent=adminCopy("انتظر حتى يكتمل تجهيز الصورة.","Wait for the image to finish processing."); return; }
    const data = new FormData(form);
    const payload = { group:dialog.dataset.group, slug:String(data.get("slug") || "").trim(), nameAr:String(data.get("nameAr") || "").trim(), nameEn:String(data.get("nameEn") || "").trim(), image:String(data.get("image") || "").trim(), icon:String(data.get("icon") || "").trim(), color:String(data.get("color") || ""), sortOrder:Number(data.get("sortOrder") || 0), active:data.get("active") === "on" };
    if (payload.group === "note") payload.metadata = { descriptionAr:String(data.get("descriptionAr") || "").trim(), descriptionEn:String(data.get("descriptionEn") || "").trim(), familyId:String(data.get("familyId") || "uncategorized"), position:String(data.get("position") || "multiple"), value:String(data.get("existingOption") || "").trim() || payload.slug || payload.nameEn || payload.nameAr };
    error.hidden = true;
    if (!payload.nameAr || !payload.nameEn) { error.hidden=false; error.textContent=adminCopy("أدخل الاسم بالعربية والإنجليزية.","Enter both Arabic and English names."); return; }
    if (["note", "brand"].includes(payload.group) && !payload.image) { error.hidden=false; error.textContent=adminCopy("ارفع الصورة من الملفات قبل الحفظ.","Upload the image file before saving."); return; }
    const duplicate = productOptionItems(payload.group).find((item) => item.slug !== payload.slug && [item.nameAr,item.nameEn].some((name) => [payload.nameAr,payload.nameEn].some((candidate) => normalizeOptionSearch(candidate) === normalizeOptionSearch(name))));
    if (duplicate) { error.hidden=false; error.textContent=adminCopy("هذه النوتة أو العلامة موجودة بالفعل؛ اخترها للتعديل بدل إنشاء نسخة مكررة.","This note or brand already exists; select it for editing instead of creating a duplicate."); return; }
    actionElement.disabled = true;
    try {
      const result = state.serverAvailable ? await api("/api/admin/product-options", { method:"POST", body:JSON.stringify(payload) }) : { option:{ ...payload, id:Date.now(), value:payload.nameEn } };
      state.productOptions = [...state.productOptions.filter((item) => !(item.group === result.option.group && item.slug === result.option.slug)), result.option];
      if (payload.group === "note") {
        window.ORIGOFragranceNotes.upsertNote({ slug:result.option.slug, nameAr:payload.nameAr, nameEn:payload.nameEn, descriptionAr:payload.metadata.descriptionAr, descriptionEn:payload.metadata.descriptionEn, familyId:payload.metadata.familyId, position:payload.metadata.position, image:payload.image, symbol:payload.icon || "✦", aliases:[] });
        await persistNotesState({ syncKnowledge: false });
      }
      if (dialog.dataset.context === "manager") {
        dialog.close(); dialog.remove();
        renderAdminDashboard("product-options");
        showToast(adminCopy("تم حفظ الخيار","Option saved"));
        return;
      }
      const draft = collectReviewProduct($("#import-review-form"));
      const targetValue = result.option.metadata?.value || result.option.nameEn || result.option.nameAr;
      const targetName = dialog.dataset.targetName;
      const current = csvValues(new FormData($("#import-review-form")).get(targetName));
      if (["seasons","usageTimes","tags","families","topNotes","heartNotes","baseNotes","mainIngredients","occasions","personalities","moods","perfumers","gender"].includes(targetName)) current.push(targetValue);
      else current.splice(0, current.length, targetValue);
      if (targetName === "brand") draft.brand = targetValue;
      else if (targetName === "category") draft.category = targetValue;
      else if (targetName === "concentration") draft.concentration = targetValue;
      else if (targetName === "size") { draft.size = targetValue; draft.sizes = [targetValue]; }
      else if (targetName === "families") draft.families = current;
      else if (targetName === "originCountry") draft.originCountry = targetValue;
      else if (targetName === "perfumers") draft.perfumers = current;
      else if (/^(top|heart|base)Notes$/.test(targetName)) {
        const levelName = targetName.replace("Notes", "");
        draft.noteSelections = { ...(draft.noteSelections || {}), [levelName]: current };
      } else draft[targetName] = current;
      state.activeImportDraft = draft;
      dialog.close(); dialog.remove();
      renderImportReview(draft);
      showToast(adminCopy("تم حفظ الخيار وإضافته للمنتج","Option saved and added to the product"));
    } catch (errorValue) {
      actionElement.disabled = false; error.hidden=false; error.textContent=errorValue.message;
    }
    return;
  }

  if (action === "catalog-home") {
    event.preventDefault();
    history.pushState({}, "", "/");
    handleBenefitRoute();
    handleBenefitsRoute();
    handleNotesRoute();
    handleCatalogRoute();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (action === "home-gender-filter") {
    event.preventDefault();
    navigateCatalog({ gender: actionElement.dataset.gender || "unisex" });
  }
  if (action === "benefit-link") {
    event.preventDefault();
    navigateBenefit(actionElement.dataset.slug);
  }
  if (action === "open-benefits-page") {
    event.preventDefault();
    closeDrawers();
    navigateBenefits();
  }
  if (action === "catalog-submit-search") {
    state.catalogQuery = $("#catalog-search-input").value.trim();
    state.catalogPage = 1;
    updateCatalogURL();
    renderCatalog();
    $("#catalog-autocomplete").hidden = true;
  }
  if (action === "catalog-description-search") openOverlay("#catalog-description-overlay");
  if (action === "catalog-filter-accordion") {
    const expanded = actionElement.getAttribute("aria-expanded") === "true";
    actionElement.setAttribute("aria-expanded", String(!expanded));
    actionElement.nextElementSibling.hidden = expanded;
  }
  if (action === "catalog-more-brands") {
    state.catalogBrandExpanded = !state.catalogBrandExpanded;
    renderCatalogFilters();
  }
  if (action === "catalog-quick-filter") {
    state.catalogQuickFilter = actionElement.dataset.value || "all";
    state.catalogPage = 1;
    updateCatalogURL();
    renderCatalog();
    $("#catalog-autocomplete").hidden = true;
  }
  if (action === "catalog-clear-all") {
    resetCatalogFilters();
    state.storefrontCategory = "perfume";
    updateCatalogURL();
    renderCatalog();
  }
  if (action === "catalog-remove-filter") {
    const key = actionElement.dataset.key;
    const value = actionElement.dataset.value;
    if (key === "quick") state.catalogQuickFilter = "all";
    else if (Array.isArray(state.catalogFilters[key])) state.catalogFilters[key] = state.catalogFilters[key].filter((item) => String(item) !== value);
    else state.catalogFilters[key] = "";
    state.catalogPage = 1;
    updateCatalogURL();
    renderCatalog();
  }
  if (action === "open-catalog-filters") toggleCatalogFilters(true);
  if (action === "close-catalog-filters") toggleCatalogFilters(false);
  if (action === "catalog-page") {
    state.catalogPage = Number(actionElement.dataset.page || 1);
    updateCatalogURL();
    renderCatalog({ skeleton: false });
    $("#catalog-title").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (action === "catalog-suggestion-product") {
    $("#catalog-autocomplete").hidden = true;
    showProductDetails(getProduct(actionElement.dataset.id));
  }
  if (action === "catalog-suggestion-filter") {
    const key = actionElement.dataset.key;
    const value = actionElement.dataset.value;
    if (Array.isArray(state.catalogFilters[key]) && !state.catalogFilters[key].includes(value)) state.catalogFilters[key].push(value);
    state.catalogPage = 1;
    $("#catalog-autocomplete").hidden = true;
    updateCatalogURL();
    renderCatalog();
  }

  if (action === "open-notes") {
    event.preventDefault();
    if (isStaffUser()) navigateNotes();
  }
  if (action === "open-note") {
    event.preventDefault();
    if (!isStaffUser()) return;
    const overlay = actionElement.closest(".overlay");
    if (overlay) closeOverlay(overlay);
    navigateNotes(actionElement.dataset.slug);
  }
  if (action === "notes-home") {
    event.preventDefault();
    history.pushState({}, "", "/");
    handleNotesRoute();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (action === "note-product") {
    showProductDetails(getProduct(actionElement.dataset.id));
  }
  if (action === "filter-note-family") {
    state.notesFamilyFilter = actionElement.dataset.family || "all";
    state.notesVisibleCount = 72;
    renderNotesLibrary();
  }
  if (action === "filter-note-images") {
    state.notesImageFilter = actionElement.dataset.images || "available";
    state.notesVisibleCount = 72;
    renderNotesLibrary();
  }
  if (action === "load-more-notes") {
    state.notesVisibleCount += 72;
    renderNotesLibrary();
  }
  if (action === "search") openOverlay("#search-overlay");
  if (action === "mobile-header-search") {
    const mobileSearch = $("#mobile-header-search");
    const isHomepage = location.pathname === "/" || location.pathname === "/index.html";
    if (window.matchMedia("(max-width: 640px)").matches && isHomepage) {
      const opening = mobileSearch.hidden;
      mobileSearch.hidden = !opening;
      actionElement.setAttribute("aria-expanded", String(opening));
      if (opening) requestAnimationFrame(() => $("#mobile-header-search-input")?.focus());
    } else {
      openOverlay("#search-overlay");
    }
  }
  if (action === "mobile-search-filters") {
    const query = $("#mobile-header-search-input")?.value.trim() || "";
    navigateCatalog({ category: "perfume", query });
  }
  if (action === "mobile-smart-product") {
    $("#mobile-smart-search-results").hidden = true;
    showProductDetails(getProduct(actionElement.dataset.id));
  }
  if (action === "mobile-smart-brand") {
    $("#mobile-smart-search-results").hidden = true;
    navigateCatalog({ category: "perfume", brand: actionElement.dataset.value });
  }
  if (action === "mobile-smart-note") {
    $("#mobile-smart-search-results").hidden = true;
    navigateCatalog({ category: "perfume", query: actionElement.dataset.value });
  }
  if (action === "admin") {
    toggleMobileMenu(false);
    if (!state.user) {
      openAccount("login", "admin");
      showToast(adminCopy("سجّل الدخول بحساب المدير أولًا", "Sign in with an admin account first"));
      return;
    }
    if (!isStaffUser()) {
      showToast(adminCopy("هذه الصفحة متاحة لمدير المتجر فقط", "This area is for store administrators only"));
      return;
    }
    try {
      await openAdminDashboard();
    } catch (error) {
      showToast(error.message);
    }
  }
  if (action === "mobile-menu") toggleMobileMenu(true);
  if (action === "close-mobile-menu") toggleMobileMenu(false);
  if (action === "currency-menu") {
    const selector = actionElement.closest(".currency-selector");
    selector.classList.toggle("open");
    actionElement.setAttribute("aria-expanded", String(selector.classList.contains("open")));
  }
  if (action === "set-currency") {
    state.currency = actionElement.dataset.currency;
    localStorage.setItem("origoCurrency", state.currency);
    $("#current-currency").textContent = state.currency;
    actionElement.closest(".currency-selector")?.classList.remove("open");
    renderProducts($(".chip.active")?.dataset.filter || "all");
    renderCart();
    renderWishlist();
    if ($("#product-overlay").classList.contains("open") && state.activeProductId) showProductDetails(getProduct(state.activeProductId), false);
  }
  if (action === "brands-menu" || action === "categories-menu") {
    const menu = actionElement.closest(".brands-nav");
    $$(".brands-nav.open").filter((item) => item !== menu).forEach((item) => item.classList.remove("open"));
    menu.classList.toggle("open");
    actionElement.setAttribute("aria-expanded", String(menu.classList.contains("open")));
  }
  if (action === "open-brands-page") {
    event.preventDefault();
    closeDrawers();
    navigateBrands();
  }
  if (action === "brand-search") {
    const query = actionElement.dataset.query || "";
    toggleMobileMenu(false);
    $(".brands-nav")?.classList.remove("open");
    navigateCatalog({ category: "perfume", brand: query });
  }
  if (action === "brand-carousel-scroll") {
    $("#brand-carousel-track")?.scrollBy({ left: Number(actionElement.dataset.direction || 1) * 420, behavior: "smooth" });
  }
  if (action === "account") openAccount();
  if (action === "auth-mode") {
    if (actionElement.dataset.mode === "reset-request") await loadPasswordResetChannels();
    renderAuth(actionElement.dataset.mode);
  }
  if (action === "show-reset-code") renderPasswordRecovery("reset-code");
  if (action === "restart-password-reset") {
    await loadPasswordResetChannels();
    renderPasswordRecovery("reset-request", { requestId: "", code: "", attempts: 0 });
  }
  if (action === "toggle-password") {
    const input = actionElement.closest(".password-field")?.querySelector("input");
    if (input) {
      const visible = input.type === "text";
      input.type = visible ? "password" : "text";
      actionElement.setAttribute("aria-pressed", String(!visible));
      actionElement.setAttribute("aria-label", !visible ? (state.lang === "ar" ? "إخفاء كلمة المرور" : "Hide password") : (state.lang === "ar" ? "إظهار كلمة المرور" : "Show password"));
      actionElement.innerHTML = visible
        ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></svg>`
        : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.7 6.1A10.5 10.5 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-2.5 3.2M7.1 7.2A17.2 17.2 0 0 0 2.5 12s3.5 6 9.5 6c1.5 0 2.8-.4 4-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>`;
    }
  }
  if (action === "logout") openSystemModal("signout");
  if (action === "confirm-logout") {
    try {
      await api("/api/auth/logout", { method: "POST", body: "{}" });
    } catch {}
    state.user = null;
    state.orders = [];
    state.cart = [];
    localStorage.removeItem("origoCartUserId");
    persist();
    renderCart();
    updateAccountIndicator();
    closeOverlay($("#account-overlay"));
    showToast(adminCopy("تم تسجيل الخروج", "Signed out"));
    $("#system-modal-overlay")?.classList.remove("open");
  }
  if (action === "open-system-modal") openSystemModal(actionElement.dataset.modal);
  if (action === "close-system-modal") $("#system-modal-overlay")?.classList.remove("open");
  if (action === "close-admin-editor") closeAdminEditorModal();
  if (action === "state-demo") showToast({ loading:"جاري التحميل...", empty:"لا توجد نتائج مطابقة", error:"حدث خطأ! يرجى المحاولة لاحقاً", success:"تم حفظ التغييرات بنجاح", offline:"أنت الآن في وضع عدم الاتصال" }[actionElement.dataset.state] || "تم");
  if (action === "apply-demo-coupon") { actionElement.nextElementSibling?.classList.add("visible"); }
  if (action === "copy-share-link") { navigator.clipboard?.writeText("https://origoscents.com/product/asad"); showToast("تم نسخ الرابط"); }
  if (action === "confirm-system-action") { $("#system-modal-overlay")?.classList.remove("open"); showToast("تم تنفيذ الإجراء بنجاح"); }
  if (action === "save-role-permissions") showToast("تم حفظ صلاحيات الدور");
  if (action === "reset-role-permissions") { renderAdminDashboard("team"); showToast("تمت استعادة الصلاحيات الافتراضية"); }
  if (action === "create-role") showToast("نموذج إضافة دور جديد جاهز");
  if (action === "edit-role") showToast("تم فتح معلومات الدور للتعديل");
  if (action === "copy-role") showToast("تم إنشاء نسخة من الدور");
  if (action === "delete-role") openSystemModal("delete");
  if (action === "export-activity") exportAdminReport("activity");
  if (action === "apply-activity-filters") showToast("تم تطبيق فلاتر سجل النشاط");
  if (action === "reset-activity-filters") { renderAdminDashboard("activity"); showToast("تمت إعادة تعيين الفلاتر"); }
  if (action === "export-brands") exportAdminReport("brands");
  if (action === "import-brands") showToast("اختر ملف العلامات التجارية للاستيراد");
  if (action === "create-brand") openAdminEditorModal(brandEditorMarkup(), "[name='nameAr']");
  if (action === "edit-brand") openAdminEditorModal(brandEditorMarkup(actionElement.dataset.id), "[name='nameAr']");
  if (action === "open-admin") {
    closeOverlay($("#account-overlay"));
    try {
      await openAdminDashboard();
    } catch (error) {
      showToast(error.message);
    }
  }
  if (action === "admin-orders") {
    closeOverlay(actionElement.closest(".overlay"));
    await openAdminOrders();
  }
  if (action === "admin-notes") {
    closeOverlay(actionElement.closest(".overlay"));
    renderNotesAdmin();
    openOverlay("#notes-admin-overlay");
  }
  if (action === "back-to-products") {
    closeOverlay($("#notes-admin-overlay"));
    renderCatalogList();
    openOverlay("#product-admin-overlay");
  }
  if (action === "back-to-dashboard") {
    closeOverlay($("#product-admin-overlay"));
    await openAdminDashboard(state.adminView);
  }
  if (action === "admin-view") {
    renderAdminDashboard(actionElement.dataset.view);
    $(".advanced-admin-panel")?.classList.remove("sidebar-open");
  }
  if (action === "toggle-banner") {
    const banner = (state.adminWorkspace.banners || []).find((item) => item.id === actionElement.dataset.id);
    if (banner) {
      banner.status = actionElement.checked ? "active" : "expired";
      saveAdminWorkspace("content");
      showToast(actionElement.checked ? "تم تفعيل البنر" : "تم إيقاف البنر");
    }
  }
  if (action === "create-banner") openAdminEditorModal(homeSlideEditorMarkup(), "[name='mediaFile']");
  if (action === "import-banners") openAdminEditorModal(homeSlideEditorMarkup(), "[name='mediaFile']");
  if (action === "edit-home-slide") openAdminEditorModal(homeSlideEditorMarkup(actionElement.dataset.id), "[name='titleAr']");
  if (action === "edit-banner") {
    openAdminEditorModal(bannerEditorMarkup(actionElement.dataset.id), "[name='title']");
  }
  if (action === "banner-stats") showToast("إحصاءات البنر: النقرات والأداء");
  if (action === "export-banners") exportAdminReport("content");
  if (action === "create-coupon") showToast("نموذج إضافة كوبون جديد جاهز");
  if (action === "edit-coupon") showToast("تم فتح إعدادات الكوبون");
  if (action === "import-coupons") showToast("اختر ملف الكوبونات للاستيراد");
  if (action === "copy-coupon") {
    navigator.clipboard?.writeText(actionElement.dataset.code || "");
    showToast("تم نسخ كود الخصم");
  }
  if (action === "settings-panel") {
    const form = actionElement.closest("#admin-settings-form");
    const panel = String(actionElement.dataset.panel || "0");
    $$("[data-settings-panel]", form).forEach((section) => {
      section.hidden = section.dataset.settingsPanel !== panel;
    });
    $$(".admin-settings-tabs [data-action='settings-panel']", form).forEach((button) => {
      const active = button.dataset.panel === panel;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    form.querySelector(`[data-settings-panel="${panel}"]`)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  if (action === "advanced-settings") {
    $("#admin-dashboard-content").innerHTML = settingsMarkup();
    initializeSettingsPanels();
  }
  if (action === "product-editor-panel") {
    const form = actionElement.closest("#import-review-form");
    const panel = String(actionElement.dataset.panel || "0");
    $$('[data-product-panel]', form).forEach((section) => section.classList.toggle("product-tab-hidden", section.dataset.productPanel !== panel));
    $$('.product-editor-tabs [data-action="product-editor-panel"]', form).forEach((button) => {
      const active = button.dataset.panel === panel;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    form.querySelector(`[data-product-panel="${panel}"]`)?.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  if (action === "save-alternative-match") {
    const form = actionElement.closest("[data-alternative-match]");
    const data = new FormData(form);
    const item = state.alternativesAdmin.items.find((entry) => String(entry.id) === form.dataset.alternativeMatch);
    if (!item) return;
    const match = {
      id: item.id,
      approvedSimilarity: Number(data.get("approvedSimilarity")), confidence: item.confidence,
      sortOrder: Number(data.get("sortOrder")), status: String(data.get("status") || "active"),
      pinned: data.get("pinned") === "on", visible: data.get("visible") === "on",
      primaryReference: data.get("primaryReference") === "on", primaryAlternative: data.get("primaryAlternative") === "on",
      relationshipType: String(data.get("relationshipType") || "similar_character"),
      reasonAr: state.lang === "ar" ? String(data.get("reason") || "") : item.reasonAr,
      reasonEn: state.lang === "en" ? String(data.get("reason") || "") : item.reasonEn
    };
    try {
      state.alternativesAdmin = await api("/api/admin/alternatives", { method: "POST", body: JSON.stringify({ match }) });
      renderAdminDashboard("alternatives");
      window.ORIGOAlternatives?.refresh?.();
      showToast(adminCopy("تم حفظ علاقة البديل وتسجيل التعديل", "Alternative match saved and audited"));
    } catch (error) { showToast(error.message); }
  }
  if (action === "delete-alternative-match") {
    const form = actionElement.closest("[data-alternative-match]");
    if (!form || !confirm(adminCopy("حذف هذه العلاقة فقط؟", "Delete this relationship only?"))) return;
    try {
      await api(`/api/admin/alternative-relationships/${encodeURIComponent(form.dataset.alternativeMatch)}`, { method: "DELETE" });
      state.alternativesAdmin = await api("/api/admin/alternatives");
      renderAdminDashboard("alternatives");
      window.ORIGOAlternatives?.refresh?.();
    } catch (error) { showToast(error.message); }
  }
  if (action === "archive-alternative-reference") {
    if (!confirm(adminCopy("أرشفة العطر المرجعي وإخفاء علاقاته؟", "Archive this reference and hide its matches?"))) return;
    try {
      await api(`/api/admin/alternative-references/${encodeURIComponent(actionElement.dataset.id)}`, { method: "DELETE" });
      state.alternativesAdmin = await api("/api/admin/alternatives");
      renderAdminDashboard("alternatives");
    } catch (error) { showToast(error.message); }
  }
  if (action === "toggle-admin-sidebar") $(".advanced-admin-panel")?.classList.toggle("sidebar-open");
  if (action === "admin-language") {
    state.lang = state.lang === "ar" ? "en" : "ar";
    updateLanguage();
    renderAdminDashboard(state.adminView);
  }
  if (action === "admin-notifications") renderAdminDashboard("overview");
  if (action === "admin-profile") {
    showToast(adminCopy(`الدور: ${state.user?.role || "admin"}`, `Role: ${state.user?.role || "admin"}`));
  }
  if (action === "open-product-studio") {
    closeOverlay($("#admin-overlay"));
    await loadAdminCatalog();
    refreshAIStatus();
    renderCatalogList();
    openOverlay("#product-admin-overlay");
    startManualProduct();
  }
  if (action === "edit-admin-product") {
    const product = state.catalogProducts.find((item) => item.id === actionElement.dataset.id)
      || state.products.find((item) => item.id === actionElement.dataset.id);
    closeOverlay($("#admin-overlay"));
    await loadAdminCatalog();
    openOverlay("#product-admin-overlay");
    if (product) {
      state.activeImportDraft = structuredClone(product);
      renderImportReview(state.activeImportDraft);
    }
  }
  if (["duplicate-admin-product", "toggle-admin-product", "archive-admin-product"].includes(action)) {
    const product = state.catalogProducts.find((item) => item.id === actionElement.dataset.id);
    if (product) {
      try {
        if (action === "duplicate-admin-product") {
          const suffix = Date.now().toString(36);
          await persistAdminProduct({
            ...structuredClone(product),
            id: `${product.id}-copy-${suffix}`,
            sku: product.sku ? `${product.sku}-COPY` : "",
            nameAr: `${product.nameAr || product.nameEn} — نسخة`,
            nameEn: `${product.nameEn || product.nameAr} — Copy`,
            status: "draft"
          });
          showToast(adminCopy("تم نسخ المنتج كمسودة", "Product duplicated as a draft"));
        } else {
          await persistAdminProduct({
            ...structuredClone(product),
            status: action === "archive-admin-product"
              ? "unavailable"
              : (product.status === "published" ? "unavailable" : "published")
          });
          showToast(action === "archive-admin-product"
            ? adminCopy("تمت أرشفة المنتج", "Product archived")
            : adminCopy("تم تحديث حالة النشر", "Publishing status updated"));
        }
      } catch (error) {
        showToast(error.message);
      }
    }
  }
  if (action === "delete-admin-product") {
    const id = String(actionElement.dataset.id || "");
    if (window.confirm(adminCopy("حذف المنتج نهائياً؟ لا يمكن التراجع.", "Permanently delete this product? This cannot be undone."))) {
      try {
        await api(`/api/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" });
        state.catalogProducts = state.catalogProducts.filter((product) => product.id !== id);
        rebuildStorefrontProducts();
        renderAdminDashboard("products");
        renderProducts($(".chip.active")?.dataset.filter || "all");
        showToast(adminCopy("تم حذف المنتج من قاعدة البيانات", "Product deleted from the database"));
      } catch (error) {
        showToast(error.message);
      }
    }
  }
  if (action === "open-order-details") {
    state.activeAdminOrderId = Number(actionElement.dataset.id);
    renderAdminDashboard("orders");
  }
  if (action === "close-order-details") {
    state.activeAdminOrderId = null;
    renderAdminDashboard("orders");
  }
  if (action === "print-order") {
    const order = state.adminOrders.find((item) => Number(item.id) === Number(actionElement.dataset.id));
    if (order) printOrderDocument(order, actionElement.dataset.kind);
  }
  if (action === "create-bosta-shipment") {
    actionElement.disabled = true;
    try {
      const result = await api(`/api/admin/orders/${actionElement.dataset.id}/shipment`, {
        method: "POST",
        body: JSON.stringify({})
      });
      state.adminOrders = state.adminOrders.map((order) => Number(order.id) === Number(result.order.id) ? result.order : order);
      renderAdminDashboard("orders");
      showToast(adminCopy("تم إنشاء الشحنة وحفظ رقم التتبع", "Shipment created and tracking saved"));
    } catch (error) {
      showToast(error.message);
      actionElement.disabled = false;
    }
  }
  if (action === "send-whatsapp-order") {
    actionElement.disabled = true;
    try {
      await api(`/api/admin/orders/${actionElement.dataset.id}/whatsapp`, {
        method: "POST",
        body: JSON.stringify({ language: state.lang })
      });
      showToast(adminCopy("تم إرسال رسالة WhatsApp", "WhatsApp message sent"));
    } catch (error) {
      showToast(error.message);
    } finally {
      actionElement.disabled = false;
    }
  }
  if (action === "open-notes-admin") {
    closeOverlay($("#admin-overlay"));
    renderNotesAdmin();
    openOverlay("#notes-admin-overlay");
  }
  if (action === "admin-create-entity") {
    openAdminEditorModal(entityCreateForm(actionElement.dataset.view || state.adminView), "input[name='name']");
  }
  if (action === "new-filter") {
    openAdminEditorModal(filterDefinitionForm(), "input[name='labelAr']");
  }
  if (action === "edit-filter") {
    const filter = state.filterDefinitions.find((item) => Number(item.id) === Number(actionElement.dataset.id));
    if (filter) openAdminEditorModal(filterDefinitionForm(filter), "input[name='labelAr']");
  }
  if (action === "delete-filter") {
    if (window.confirm(adminCopy("حذف هذا الفلتر؟", "Delete this filter?"))) {
      try {
        await api(`/api/admin/filters/${actionElement.dataset.id}`, { method: "DELETE" });
        state.filterDefinitions = state.filterDefinitions.filter((item) => Number(item.id) !== Number(actionElement.dataset.id));
        renderAdminDashboard("categories");
        showToast(adminCopy("تم حذف الفلتر", "Filter deleted"));
      } catch (error) {
        showToast(error.message);
      }
    }
  }
  if (action === "cancel-admin-create") closeAdminEditorModal();
  if (action === "admin-edit-entity") {
    const view = actionElement.dataset.view || state.adminView;
    const item = genericRowsFor(view).find((row) => String(row.id) === String(actionElement.dataset.id));
    if (item) {
      openAdminEditorModal(entityCreateForm(view, item), "input[name='name']");
    }
  }
  if (action === "admin-delete-entity") {
    const view = actionElement.dataset.view || state.adminView;
    const id = String(actionElement.dataset.id || "");
    if (window.confirm(adminCopy("حذف هذا السجل؟", "Delete this record?"))) {
      const rows = (state.adminWorkspace.entities[view] || []).filter((item) => String(item.id) !== id);
      rows.push({ id, _deleted: true });
      state.adminWorkspace.entities[view] = rows;
      saveAdminWorkspace(view);
      renderAdminDashboard(view);
      showToast(adminCopy("تم حذف السجل", "Record deleted"));
    }
  }
  if (action === "admin-export") {
    exportAdminReport(actionElement.dataset.report || state.adminView, actionElement.dataset.format || "csv");
  }
  if (action === "notes-admin-tab") switchNotesAdminTab(actionElement.dataset.tab);
  if (action === "new-note") {
    switchNotesAdminTab("note");
    resetNoteAdminForm();
  }
  if (action === "edit-note") {
    populateNoteAdminForm(window.ORIGOFragranceNotes.find(actionElement.dataset.slug));
    renderNotesAdmin();
  }
  if (action === "classify-note") {
    switchNotesAdminTab("note");
    const value = actionElement.dataset.name || "";
    const isArabic = /[\u0600-\u06FF]/.test(value);
    resetNoteAdminForm({
      nameAr: isArabic ? value : "",
      nameEn: isArabic ? "" : value,
      slug: window.ORIGOFragranceNotes.slugify(value),
      position: actionElement.dataset.position || "multiple",
      familyId: "uncategorized"
    });
  }
  if (action === "view-orders") {
    closeOverlay($("#checkout-overlay"));
    openAccount();
  }
  if (action === "continue-after-order") closeOverlay($("#checkout-overlay"));
  if (action === "cart") toggleCart(true);
  if (action === "wishlist") toggleWishlistDrawer(true);
  if (action === "close-drawer") {
    const drawer = actionElement.closest(".drawer");
    if (drawer) toggleDrawer(`#${drawer.id}`, false);
  }
  if (action === "close-wishlist") toggleWishlistDrawer(false);
  if (action === "close-overlay") closeOverlay(actionElement.closest(".overlay"));
  if (action === "close-product-page") closeProductPage();
  if (action === "theme") setupTheme();
  if (action === "language") {
    state.lang = state.lang === "ar" ? "en" : "ar";
    updateLanguage();
  }
  if (action === "toggle-wishlist") {
    toggleWishlist(actionElement.closest(".product-card").dataset.id);
  }
  if (action === "toggle-product-compare") {
    const productId = actionElement.dataset.id || actionElement.closest(".product-card")?.dataset.id;
    if (productId) toggleProductComparison(productId);
  }
  if (action === "close-product-comparison") {
    const dialog = actionElement.closest("dialog");
    if (dialog?.open && typeof dialog.close === "function") dialog.close();
    else dialog?.removeAttribute("open");
  }
  if (action === "remove-product-comparison") {
    const id = actionElement.dataset.id;
    state.comparison = state.comparison.filter((productId) => productId !== id);
    persist();
    actionElement.closest("[data-comparison-product]")?.remove();
    if (state.comparison.length < 2) {
      const dialog = actionElement.closest("dialog");
      if (dialog?.open && typeof dialog.close === "function") dialog.close();
      else dialog?.removeAttribute("open");
    }
    $$(`.product-card[data-id="${CSS.escape(id)}"] .card-compare-button`).forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-pressed", "false");
    });
  }
  if (action === "add-to-cart") {
    const card = actionElement.closest(".product-card");
    if (!card || actionElement.disabled || card.classList.contains("is-adding")) return;
    actionElement.disabled = true;
    actionElement.setAttribute("aria-busy", "true");
    card.classList.add("is-adding");
    requestAnimationFrame(() => {
      addToCart(getProduct(card.dataset.id));
      setTimeout(() => {
        card.classList.remove("is-adding");
        card.classList.add("is-added");
        actionElement.disabled = false;
        actionElement.removeAttribute("aria-busy");
        setTimeout(() => card.classList.remove("is-added"), 900);
      }, 420);
    });
  }
  if (action === "card-variant") {
    state.selectedCardVariants[actionElement.dataset.productId] = actionElement.dataset.variantId;
    renderProducts($(".chip.active")?.dataset.filter || "all");
    renderWishlist();
  }
  if (action === "card-image") setCardImage(actionElement.dataset.id, Number(actionElement.dataset.change || 0));
  if (action === "card-image-index") setCardImage(actionElement.dataset.id, Number(actionElement.dataset.index || 0), true);
  if (action === "open-product") {
    const dialog = actionElement.closest("dialog");
    if (dialog?.open && typeof dialog.close === "function") dialog.close();
    showProductDetails(getProduct(actionElement.dataset.id));
  }
  if (action === "product-image") {
    state.activeProductImageIndex = Math.max(0, Number(actionElement.dataset.index) || 0);
    showProductDetails(getProduct(state.activeProductId), false);
  }
  if (action === "product-zoom") actionElement.closest(".pdp-main-image")?.classList.toggle("zoomed");
  if (action === "restock-channel") {
    const form = actionElement.closest("#pdp-restock-form");
    const input = form?.querySelector("#pdp-restock-contact");
    const channel = actionElement.dataset.channel === "whatsapp" ? "whatsapp" : "email";
    if (form && input) {
      form.dataset.channel = channel;
      form.dataset.status = "";
      form.querySelectorAll("[data-action='restock-channel']").forEach((button) => {
        const selected = button === actionElement;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      const isWhatsApp = channel === "whatsapp";
      input.type = isWhatsApp ? "tel" : "email";
      input.inputMode = isWhatsApp ? "tel" : "email";
      input.autocomplete = isWhatsApp ? "tel" : "email";
      input.pattern = isWhatsApp ? "\\+?[0-9\\s()\\-]{8,20}" : "";
      input.placeholder = isWhatsApp
        ? (state.lang === "ar" ? "رقم واتساب مع كود الدولة" : "WhatsApp number with country code")
        : (state.lang === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email address");
      input.value = isWhatsApp ? (form.dataset.phone || "") : (form.dataset.email || "");
      const label = form.querySelector("label[for='pdp-restock-contact']");
      if (label) label.textContent = isWhatsApp
        ? (state.lang === "ar" ? "رقم واتساب" : "WhatsApp number")
        : (state.lang === "ar" ? "البريد الإلكتروني" : "Email address");
      const status = form.querySelector("#pdp-restock-status");
      if (status) status.textContent = "";
      input.focus();
    }
  }
  if (action === "focus-restock") {
    const card = $("#pdp-restock-card");
    const input = $("#pdp-restock-contact");
    card?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    setTimeout(() => input?.focus(), 260);
  }
  if (action === "pdp-profile-section") {
    const section = actionElement.closest(".pdp-profile-section");
    const accordion = section?.closest(".pdp-profile-accordions");
    const opening = !section?.classList.contains("is-open");
    if (opening && window.matchMedia("(max-width: 900px)").matches) {
      accordion?.querySelectorAll(".pdp-profile-section.is-open").forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(":scope > button")?.setAttribute("aria-expanded", "false");
        const panel = item.querySelector(":scope > .pdp-profile-panel");
        if (panel) panel.hidden = true;
      });
    }
    section?.classList.toggle("is-open", opening);
    actionElement.setAttribute("aria-expanded", String(opening));
    const panel = section?.querySelector(":scope > .pdp-profile-panel");
    if (panel) panel.hidden = !opening;
    const arrow = actionElement.querySelector(":scope > i");
    if (arrow) arrow.textContent = opening ? "⌃" : "⌄";
    if (opening) history.replaceState(history.state, "", `${location.pathname}${location.search}#${section.dataset.pdpSection}`);
  }
  if (action === "product-size") {
    actionElement.closest(".pdp-sizes")?.querySelectorAll("button").forEach((button) => {
      const selected = button === actionElement;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }
  if (action === "detail-quantity") {
    const product = getProduct(state.activeProductId);
    const knownStock = Number(product?.inventory?.quantity);
    const maximum = Number.isFinite(knownStock) ? Math.max(1, Math.min(10, knownStock)) : 10;
    state.activeProductQuantity = Math.min(maximum, Math.max(1, state.activeProductQuantity + Number(actionElement.dataset.change || 0)));
    showProductDetails(product, false);
  }
  if (action === "product-detail-add") addToCart(getProduct(actionElement.dataset.id), state.activeProductQuantity);
  if (action === "quick-add") {
    addToCart(getProduct(actionElement.dataset.product));
  }
  if (action === "quick-view-wishlist") {
    toggleWishlist(actionElement.dataset.id);
  }
  if (action === "admin-studio-image") {
    setAdminStudioImage(actionElement.closest("[data-product-media-studio]"), Number(actionElement.dataset.index || 0));
  }
  if (action === "admin-studio-step") {
    const studio = actionElement.closest("[data-product-media-studio]");
    setAdminStudioImage(studio, Number(studio?.dataset.index || 0) + Number(actionElement.dataset.change || 0));
  }
  if (action === "admin-studio-fullscreen") {
    const dialog = $(".product-media-lightbox", actionElement.closest("[data-product-media-studio]"));
    if (typeof dialog?.showModal === "function") dialog.showModal();
    else dialog?.setAttribute("open", "");
  }
  if (action === "admin-studio-close") {
    const dialog = actionElement.closest("dialog");
    if (dialog?.open && typeof dialog.close === "function") dialog.close();
    else dialog?.removeAttribute("open");
  }
  if (action === "admin-card-preview-mode") {
    state.adminCardPreviewMode = actionElement.dataset.mode === "mobile" ? "mobile" : "desktop";
    const preview = actionElement.closest(".product-editor-preview");
    preview?.classList.toggle("mobile", state.adminCardPreviewMode === "mobile");
    preview?.classList.toggle("desktop", state.adminCardPreviewMode === "desktop");
    $$("[data-action='admin-card-preview-mode']", preview).forEach((button) => button.classList.toggle("active", button.dataset.mode === state.adminCardPreviewMode));
  }
  if (action === "admin-card-preview-theme") {
    state.adminCardPreviewTheme = "light";
    const preview = actionElement.closest(".product-editor-preview");
    preview?.classList.remove("dark");
    preview?.classList.add("light");
    $$("[data-action='admin-card-preview-theme']", preview).forEach((button) => button.classList.toggle("active", button.dataset.theme === state.adminCardPreviewTheme));
  }
  if (action === "recalculate-all-performance") {
    actionElement.disabled = true;
    try {
      await api("/api/admin/performance-products/recalculate", { method: "POST", body: "{}" });
      await loadAdminCatalog();
      renderAdminDashboard("performance");
      showToast(adminCopy("تمت إعادة احتساب مؤشرات جميع العطور", "All fragrance performance insights were recalculated"));
    } catch (error) { showToast(error.message); }
    actionElement.disabled = false;
  }
  if (action === "recalculate-performance") {
    actionElement.disabled = true;
    try {
      await api(`/api/admin/products/${encodeURIComponent(actionElement.dataset.id)}/performance/recalculate`, { method: "POST", body: "{}" });
      await loadAdminCatalog();
      if (state.adminView === "performance") renderAdminDashboard("performance");
      else {
        const product = state.catalogProducts.find((item) => item.id === actionElement.dataset.id);
        if (product) { state.activeImportDraft = product; renderImportReview(product); }
      }
      showToast(adminCopy("تمت إعادة احتساب مؤشرات الأداء", "Performance insights recalculated"));
    } catch (error) { showToast(error.message); }
    actionElement.disabled = false;
  }
  if (action === "toggle-performance-vote") {
    const hiding = actionElement.dataset.status === "hidden";
    const reason = hiding ? window.prompt(adminCopy("اكتب سبب إخفاء التقييم", "Enter the reason for hiding this rating"), "") : "";
    if (hiding && !String(reason || "").trim()) return;
    actionElement.disabled = true;
    try {
      await api(`/api/admin/performance-votes/${encodeURIComponent(actionElement.dataset.id)}`, { method: "POST", body: JSON.stringify({ status: actionElement.dataset.status, reason }) });
      await loadAdminCatalog();
      const product = state.catalogProducts.find((item) => item.id === actionElement.dataset.productId);
      if (product) { state.activeImportDraft = product; renderImportReview(product); }
      showToast(hiding ? adminCopy("تم إخفاء التقييم مع تسجيل السبب", "Rating hidden and reason logged") : adminCopy("تمت استعادة التقييم", "Rating restored"));
    } catch (error) { showToast(error.message); }
    actionElement.disabled = false;
  }
  if (action === "rate-perfume") {
    const score = Math.min(5, Math.max(1, Number(actionElement.dataset.score || 0)));
    state.productRatings[actionElement.dataset.id] = score;
    localStorage.setItem("origoProductRatings", JSON.stringify(state.productRatings));
    showProductDetails(getProduct(actionElement.dataset.id), false);
    showToast(adminCopy("تم حفظ تقييمك على هذا الجهاز", "Your rating was saved on this device"));
  }
  if (action === "remove-cart") {
    state.cart = state.cart.filter((item) => item.id !== actionElement.dataset.id);
    persist();
    renderCart();
  }
  if (action === "decrease-cart") changeCartQuantity(actionElement.dataset.id, -1);
  if (action === "increase-cart") changeCartQuantity(actionElement.dataset.id, 1);
  if (action === "wishlist-remove") toggleWishlist(actionElement.dataset.id);
  if (action === "wishlist-add") addToCart(getProduct(actionElement.dataset.id));
  if (action === "wishlist-view") {
    const product = getProduct(actionElement.dataset.id);
    toggleWishlistDrawer(false);
    showProductDetails(product);
  }
  if (action === "checkout") {
    openCheckout();
  }
  if (action === "clear-notes") {
    state.selectedNotes = [];
    $$(".note-bubble").forEach((button) => button.classList.remove("selected"));
    $("#selected-count").textContent = "0/4";
    $("#match-count").textContent = "24";
  }
  if (action === "find-matches") {
    event.preventDefault();
    showFinderMatches();
  }
  if (action === "alternative-search") runAlternativeSearch();
  if (action === "search-result") {
    const product = getProduct(actionElement.dataset.id);
    closeOverlay($("#search-overlay"));
    showProductDetails(product);
  }
  if (action === "view-all-search") {
    closeOverlay($("#search-overlay"));
    navigateCatalog({ category: "perfume", query: state.globalSearchQuery });
  }
  if (action === "clear-product-search") {
    state.storefrontSearchQuery = "";
    state.storefrontCategory = "all";
    renderProducts("all");
  }
  if (action === "catalog-category") {
    event.preventDefault();
    toggleMobileMenu(false);
    navigateCatalog({ category: actionElement.dataset.category || "all" });
  }
  if (action === "select-admin-suggestion") {
    const selection = state.adminSuggestions[Number(actionElement.dataset.index)];
    if (selection) loadImportDraft(selection).catch(() => {
      $("#import-workspace").innerHTML = `<div class="import-empty"><span>!</span><h3>${adminCopy("تعذر جلب البيانات", "Could not fetch product data")}</h3><p>${adminCopy("جرّب نتيجة أخرى أو أنشئ مسودة يدوية.", "Try another result or create a manual draft.")}</p></div>`;
    });
  }
  if (action === "extract-product-images") {
    await extractQuickImportProduct();
    return;
  }
  if (action === "clear-product-images") {
    clearQuickImportImages();
    return;
  }
  if (action === "remove-quick-import-image") {
    state.quickImportImages.splice(Number(actionElement.dataset.index), 1);
    renderQuickImportImages();
    return;
  }
  if (action === "new-product") startManualProduct();
  if (action === "restore-product-draft") startManualProduct(true);
  if (action === "product-editor-mode") {
    state.productEditorMode = actionElement.dataset.mode || "quick";
    localStorage.setItem("origoProductEditorMode", state.productEditorMode);
    const form = $("#import-review-form");
    if (form) {
      form.dataset.editorMode = state.productEditorMode;
      $$(".product-editor-modes button", form).forEach((button) => button.classList.toggle("active", button === actionElement));
    }
  }
  if (action === "remove-profile-image") {
    const form = actionElement.closest("#import-review-form");
    const card = actionElement.closest("[data-profile-image-card]");
    const key = actionElement.dataset.key;
    const language = actionElement.dataset.language;
    const hidden = form?.elements[`profileImage.${key}.${language}`];
    if (hidden) hidden.value = "";
    const upload = card?.querySelector("[data-profile-image-upload]");
    if (upload) upload.value = "";
    const figure = card?.querySelector("figure");
    if (figure) figure.hidden = true;
    card?.classList.remove("has-image");
    updateProductEditorPreview(form);
  }
  if (action === "sort-admin-accords") {
    const list = actionElement.closest(".accord-admin-editor")?.querySelector(".accord-admin-list");
    if (list) [...list.children].sort((a, b) => Number(b.querySelector("input[type='range']")?.value || 0) - Number(a.querySelector("input[type='range']")?.value || 0)).forEach((item) => list.append(item));
  }
  if (action === "accord-selected-only") {
    const editor = actionElement.closest(".accord-admin-editor");
    const enabled = editor?.dataset.selectedOnly !== "true";
    if (editor) editor.dataset.selectedOnly = String(enabled);
    actionElement.classList.toggle("active", enabled);
    actionElement.setAttribute("aria-pressed", String(enabled));
    filterAdminAccords(editor);
  }
  if (action === "clear-admin-accords") {
    const editor = actionElement.closest(".accord-admin-editor");
    editor?.querySelectorAll("[name='accordSelected']").forEach((input) => { input.checked = false; });
    updateAdminAccordEditor(actionElement.closest("#import-review-form"));
  }
  if (action === "accord-help") {
    showToast(state.lang === "ar" ? "طول كل خط يعبّر عن قوة الأكورد بصورة مستقلة، ولا يشترط أن يكون المجموع 100%." : "Each bar independently represents accord strength; totals do not need to equal 100%. ");
  }
  if (action === "ai-product-task") {
    const form = $("#import-review-form");
    if (!form) return;
    actionElement.disabled = true;
    try {
      const current = collectReviewProduct(form);
      const taskLabel = {
        description: "Generate original Arabic and English product descriptions",
        translate: "Translate only missing bilingual fields between Arabic and English. Preserve brand names and all existing text exactly",
        seo: "Generate SEO title, meta description, slug, and keywords",
        alternatives: "Suggest similar products, alternatives, upsell, and cross-sell relationships",
        analysis: "Analyze fragrance accords, performance, season, occasion, style, and filter attributes"
      }[actionElement.dataset.task] || "Enrich this product";
      const result = await api("/api/catalog/ai-enrich", {
        method: "POST",
        body: JSON.stringify({
          query: `${taskLabel}: ${current.brand} ${current.nameEn || current.nameAr}`,
          knownProduct: { ...current, images: [] }
        })
      });
      state.aiProductSuggestion = result.data;
      $("#ai-product-suggestion").innerHTML = `<article class="ai-product-review"><div><b>${adminCopy("اقتراح AI جاهز للمراجعة", "AI suggestion ready for review")}</b><p>${escapeHTML(result.data.descriptionAr || result.data.descriptionEn || result.data.familyEn || taskLabel)}</p></div><button type="button" data-action="apply-ai-product-suggestion">${adminCopy("اعتماد داخل المسودة", "Apply to draft")}</button><button type="button" data-action="dismiss-ai-product-suggestion">${adminCopy("تجاهل", "Dismiss")}</button></article>`;
    } catch (error) {
      showToast(error.message);
    } finally {
      actionElement.disabled = false;
    }
  }
  if (action === "apply-ai-product-suggestion" && state.aiProductSuggestion) {
    const current = collectReviewProduct($("#import-review-form"));
    const fillMissing = (existing, suggested) => {
      if (Array.isArray(existing)) return existing.length ? existing : (Array.isArray(suggested) ? suggested : existing);
      if (existing && typeof existing === "object") return Object.fromEntries([...new Set([...Object.keys(existing), ...Object.keys(suggested || {})])].map((key) => [key, fillMissing(existing[key], suggested?.[key])]));
      return existing === "" || existing == null ? (suggested ?? existing) : existing;
    };
    state.activeImportDraft = {
      ...fillMissing(current, state.aiProductSuggestion),
      status: current.status
    };
    state.aiProductSuggestion = null;
    renderImportReview(state.activeImportDraft);
    showToast(adminCopy("تم تطبيق الاقتراح داخل المسودة فقط", "Suggestion applied to the draft only"));
  }
  if (action === "dismiss-ai-product-suggestion") {
    state.aiProductSuggestion = null;
    $("#ai-product-suggestion").innerHTML = "";
  }
  if (action === "edit-catalog-product") {
    const product = state.catalogProducts.find((item) => item.id === actionElement.dataset.id);
    if (product) {
      state.activeImportDraft = structuredClone(product);
      renderImportReview(state.activeImportDraft);
    }
  }
});

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (event.target.id === "catalog-description-form") {
    const status = $("#catalog-description-status");
    const description = $("#catalog-description-input").value.trim();
    status.textContent = state.lang === "ar" ? "جارٍ تجهيز البحث..." : "Preparing search...";
    const result = await catalogDescriptionSearchService.search(description);
    status.textContent = result
      ? (state.lang === "ar" ? "تم تجهيز نتائج البحث." : "Search results are ready.")
      : (state.lang === "ar" ? "واجهة البحث بالوصف جاهزة، وتحتاج فقط إلى تفعيل مزود الذكاء الاصطناعي من إعدادات المتجر." : "Description search is ready; enable an AI provider in store settings to use it.");
    return;
  }
  if (event.target.id === "admin-brand-form") {
    const data = new FormData(event.target);
    const id = String(data.get("id") || `brand-${Date.now().toString(36)}`);
    let image = String(data.get("image") || "").trim();
    const file = event.target.elements.imageFile?.files?.[0];
    try {
      if (file) image = await optimizeGalleryImage(file);
      const item = { id, nameAr:String(data.get("nameAr")||"").trim(), nameEn:String(data.get("nameEn")||"").trim(), country:String(data.get("country")||"").trim(), flag:String(data.get("flag")||"").trim(), level:String(data.get("level")||"medium"), count:Math.max(0,Number(data.get("count")||0)), sales:Math.max(0,Number(data.get("sales")||0)), active:data.has("active"), image };
      const rows = state.adminWorkspace.entities.brands || [];
      const index = rows.findIndex((row) => String(row.id) === id);
      if (index >= 0) rows[index] = item; else rows.unshift(item);
      state.adminWorkspace.entities.brands = rows;
      saveAdminWorkspace("brands");
      closeAdminEditorModal();
      renderAdminDashboard("brands");
      showToast("تم حفظ بيانات العلامة التجارية");
    } catch (error) { showToast(error.message || "تعذر حفظ العلامة التجارية", "error"); }
    return;
  }
  if (event.target.id === "admin-banner-form") {
    const data = new FormData(event.target);
    const id = String(data.get("id") || `banner-${Date.now().toString(36)}`);
    const next = { id, title:String(data.get("title")||"").trim(), subtitle:String(data.get("subtitle")||"").trim(), placement:String(data.get("placement")||"").trim(), position:String(data.get("position")||"").trim(), type:String(data.get("type")||"image"), start:String(data.get("start")||""), end:String(data.get("end")||""), status:String(data.get("status")||"active"), clicks:Number((state.adminWorkspace.banners||[]).find((item)=>String(item.id)===id)?.clicks||0), tone:(state.adminWorkspace.banners||[]).find((item)=>String(item.id)===id)?.tone||"red" };
    const banners = state.adminWorkspace.banners || [];
    const index = banners.findIndex((item) => String(item.id) === id);
    if (index >= 0) banners[index] = next; else banners.unshift(next);
    state.adminWorkspace.banners = banners;
    saveAdminWorkspace("content");
    closeAdminEditorModal();
    renderAdminDashboard("content");
    showToast("تم حفظ بيانات البنر");
    return;
  }
  if (event.target.id === "admin-home-slide-form") {
    const data = new FormData(event.target);
    const current = mergeStoreSettings(state.adminWorkspace.settings || {});
    const id = String(data.get("id") || `media-${Date.now().toString(36)}`);
    const media = current.homeMedia.map((item) => ({ ...item }));
    const existingIndex = media.findIndex((item) => String(item.id) === id);
    const existing = existingIndex >= 0 ? media[existingIndex] : null;
    const file = event.target.elements.mediaFile?.files?.[0];
    try {
      const url = file ? await optimizeGalleryImage(file) : existing?.url || "";
      if (!url) throw new Error("اختر صورة للشريحة أولاً");
      const slide = { ...existing, id, name:String(data.get("name")||file?.name||existing?.name||"").trim(), placement:"hero", url, productId:String(data.get("productId")||"").trim(), href:String(data.get("href")||"#new-arrivals").trim(), titleAr:"", titleEn:"", descriptionAr:"", descriptionEn:"", buttonAr:"", buttonEn:"", sortOrder:Math.max(1,Number(data.get("sortOrder")||1)), sizeMode:String(data.get("sizeMode")||"cover"), imageScale:100, imagePosition:"center", active:data.has("active"), createdAt:existing?.createdAt||new Date().toISOString() };
      if (existingIndex >= 0) media[existingIndex] = slide; else media.push(slide);
      state.adminWorkspace.settings = mergeStoreSettings({ ...current, homeMedia:media });
      saveAdminWorkspace("homepage");
      renderHomeHero();
      closeAdminEditorModal();
      renderAdminDashboard("content");
      showToast(existing ? "تم حفظ تعديلات الشريحة" : "تمت إضافة شريحة السلايدر");
    } catch (error) { showToast(error.message || "تعذر حفظ الشريحة", "error"); }
    return;
  }
  if (event.target.id === "admin-filter-form") {
    const data = new FormData(event.target);
    try {
      const result = await api("/api/admin/filters", {
        method: "POST",
        body: JSON.stringify({
          id: Number(data.get("id") || 0) || undefined,
          category: String(data.get("category") || "perfume"),
          key: String(data.get("key") || "").trim(),
          labelAr: String(data.get("labelAr") || "").trim(),
          labelEn: String(data.get("labelEn") || "").trim(),
          inputType: String(data.get("inputType") || "select"),
          options: csvValues(data.get("options")),
          visible: data.has("visible")
        })
      });
      const index = state.filterDefinitions.findIndex((item) => Number(item.id) === Number(result.filter.id));
      if (index >= 0) state.filterDefinitions[index] = result.filter;
      else state.filterDefinitions.push(result.filter);
      closeAdminEditorModal();
      renderAdminDashboard("categories");
      showToast(adminCopy("تم حفظ الفلتر في قاعدة البيانات", "Filter saved to the database"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }
  if (event.target.id === "admin-staff-form") {
    const data = new FormData(event.target);
    try {
      await api("/api/admin/staff", {
        method: "POST",
        body: JSON.stringify({
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          password: String(data.get("password") || ""),
          role: String(data.get("role") || "manager")
        })
      });
      const result = await api("/api/admin/staff");
      state.adminStaff = result.staff || [];
      renderAdminDashboard("team");
      showToast(adminCopy("تم إنشاء حساب الموظف وصلاحياته", "Staff account and permissions created"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }
  if (event.target.id === "admin-order-details-form") {
    const data = new FormData(event.target);
    try {
      const result = await api(`/api/admin/orders/${data.get("id")}`, {
        method: "POST",
        body: JSON.stringify({
          status: String(data.get("status") || "new"),
          paymentStatus: String(data.get("paymentStatus") || "pending"),
          shippingCarrier: String(data.get("shippingCarrier") || "").trim(),
          trackingNumber: String(data.get("trackingNumber") || "").trim(),
          internalNotes: String(data.get("internalNotes") || "").trim()
        })
      });
      state.adminOrders = state.adminOrders.map((order) => Number(order.id) === Number(result.order.id) ? result.order : order);
      renderAdminDashboard("orders");
      showToast(adminCopy("تم حفظ تفاصيل الطلب وسجل الحركة", "Order details and timeline saved"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }
  if (event.target.id === "admin-entity-form") {
    const data = new FormData(event.target);
    const view = String(data.get("view") || state.adminView);
    const rows = state.adminWorkspace.entities[view] || [];
    const id = String(data.get("id") || `${view}-${Date.now().toString(36)}`);
    const next = {
      id,
      name: String(data.get("name") || "").trim(),
      detail: String(data.get("detail") || "").trim(),
      status: String(data.get("status") || "active")
    };
    const existingIndex = rows.findIndex((item) => String(item.id) === id);
    if (existingIndex >= 0) rows[existingIndex] = next;
    else rows.unshift(next);
    state.adminWorkspace.entities[view] = rows;
    saveAdminWorkspace();
    closeAdminEditorModal();
    renderAdminDashboard(view);
    showToast(adminCopy("تم حفظ السجل الجديد", "New record saved"));
    return;
  }
  if (event.target.id === "admin-homepage-rails" || event.target.id === "admin-banner-slider-settings") {
    const submitButton = event.target.querySelector("button[type='submit']");
    const uploadStatus = event.target.querySelector("#banner-upload-status, #gender-upload-status");
    if (submitButton) submitButton.disabled = true;
    const data = new FormData(event.target);
    const current = mergeStoreSettings(state.adminWorkspace.settings || {});
    const nextRails = event.target.id === "admin-homepage-rails" ? Object.fromEntries(Object.keys(current.homepageRails).map((key) => [key, {
      ...current.homepageRails[key], enabled: data.has(`${key}.enabled`),
      titleAr: String(data.get(`${key}.titleAr`) || "").trim(), titleEn: String(data.get(`${key}.titleEn`) || "").trim(),
      order: Math.max(1, Math.min(10, Number(data.get(`${key}.order`) || 1))),
      ...(key === "brands" ? { speed: Math.max(12, Math.min(120, Number(data.get("brands.speed") || 34))) } : {}),
      ...(key === "benefits" ? { speed: Math.max(6, Math.min(120, Number(data.get("benefits.speed") || 18))) } : {})
    }])) : current.homepageRails;
    const files = [...(event.target.elements.mediaFile?.files || [])];
    const genderImages = { ...current.homeGenderImages };
    const genderUploads = ["men", "women", "unisex"].map((key) => ({
      key,
      file: event.target.elements.namedItem(`genderMedia.${key}`)?.files?.[0] || null
    })).filter((item) => item.file);
    ["men", "women", "unisex"].forEach((key) => {
      if (data.has(`genderMediaClear.${key}`)) genderImages[key] = "";
    });
    const totalUploadCount = files.length + genderUploads.length;
    const media = current.homeMedia.map((item) => ({ ...item }));
    event.target.querySelectorAll("[data-home-media-field]").forEach((input) => {
      const item = media.find((candidate) => String(candidate.id) === String(input.dataset.id));
      if (!item) return;
      const field = input.dataset.homeMediaField;
      if (input.type === "checkbox") item[field] = input.checked;
      else if (input.type === "number") item[field] = Number(input.value);
      else item[field] = input.value.trim();
    });
    if (totalUploadCount) {
      try {
        const uploaded = [];
        for (const [index, file] of files.entries()) {
          if (uploadStatus) uploadStatus.textContent = adminCopy(`جارٍ تجهيز الصورة ${index + 1} من ${files.length}…`, `Preparing image ${index + 1} of ${files.length}…`);
          uploaded.push({
            id: `media-${Date.now()}-${index}`, name: file.name, placement: "hero",
            altAr: file.name, altEn: file.name, productId: String(data.get("mediaProductId") || "").trim(),
            titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "", buttonAr: "", buttonEn: "",
            href: String(data.get("mediaHref") || "#new-arrivals").trim(), sizeMode: "default",
            imageScale: 100, imagePosition: "center", sortOrder: media.length + index + 1, active: true,
            url: await optimizeGalleryImage(file), createdAt: new Date().toISOString()
          });
        }
        media.push(...uploaded);
        for (const [index, item] of genderUploads.entries()) {
          if (uploadStatus) uploadStatus.textContent = adminCopy(`جارٍ تجهيز صورة القسم ${index + 1} من ${genderUploads.length}…`, `Preparing section image ${index + 1} of ${genderUploads.length}…`);
          genderImages[item.key] = await optimizeGalleryImage(item.file);
        }
      } catch (error) {
        if (submitButton) submitButton.disabled = false;
        if (uploadStatus) uploadStatus.textContent = error.message;
        showToast(error.message || adminCopy("تعذر معالجة الصورة", "Could not process image"), "error");
        return;
      }
    }
    const intervalSeconds = Math.max(1, Math.min(30, Number(data.get("heroIntervalSeconds") || 3)));
    state.adminWorkspace.settings = mergeStoreSettings({ ...current, homepageRails: nextRails, homeHero: { ...current.homeHero, intervalSeconds }, homeMedia: media, homeGenderImages: genderImages });
    saveAdminWorkspace("homepage");
    applyHomepageRailSettings();
    renderHomeHero();
    renderHomepageCommerce();
    renderAdminDashboard(event.target.id === "admin-banner-slider-settings" ? "content" : "homepage");
    showToast(adminCopy(totalUploadCount ? `تمت إضافة ${totalUploadCount} صورة وحفظ إعدادات الصفحة` : "تم حفظ إعدادات الصفحة الرئيسية", totalUploadCount ? `${totalUploadCount} images added and homepage settings saved` : "Homepage settings saved"));
    return;
  }
  if (event.target.id === "admin-alternatives-settings") {
    event.preventDefault();
    const data = new FormData(event.target);
    const settings = {
      titleAr: String(data.get("titleAr") || ""), titleEn: String(data.get("titleEn") || ""),
      descriptionAr: String(data.get("descriptionAr") || ""), descriptionEn: String(data.get("descriptionEn") || ""),
      bannerTitleAr: String(data.get("bannerTitleAr") || ""), bannerTitleEn: String(data.get("bannerTitleEn") || ""),
      bannerDescriptionAr: String(data.get("bannerDescriptionAr") || ""), bannerDescriptionEn: String(data.get("bannerDescriptionEn") || ""),
      count: Math.max(1, Math.min(12, Number(data.get("count") || 4))), position: String(data.get("position") || "before-finder"),
      sectionEnabled: data.get("sectionEnabled") === "on", bannerEnabled: data.get("bannerEnabled") === "on", enabled: true
    };
    try {
      state.alternativesAdmin = await api("/api/admin/alternatives", { method: "POST", body: JSON.stringify({ settings }) });
      renderAdminDashboard("alternatives");
      window.ORIGOAlternatives?.refresh?.();
      showToast(adminCopy("تم حفظ إعدادات البدائل", "Alternative settings saved"));
    } catch (error) { showToast(error.message); }
    return;
  }
  if (event.target.id === "admin-alternative-create") {
    event.preventDefault();
    const data = new FormData(event.target);
    const split = (name) => String(data.get(name) || "").split(/[,،]/).map((item) => item.trim()).filter(Boolean);
    const reference = {
      slug: String(data.get("slug") || "").trim(), nameAr: String(data.get("nameAr") || "").trim(),
      nameEn: String(data.get("nameEn") || "").trim(), shortName: String(data.get("shortName") || "").trim(), brand: String(data.get("brand") || "").trim(),
      image: String(data.get("image") || "").trim(), referencePrice: Number(data.get("referencePrice") || 0),
      concentration: String(data.get("concentration") || "").trim(), size: String(data.get("size") || "").trim(),
      gender: String(data.get("gender") || "unisex"), familyAr: String(data.get("familyAr") || "").trim(),
      familyEn: String(data.get("familyEn") || "").trim(), releaseYear: Number(data.get("releaseYear") || 0) || null,
      descriptionAr: String(data.get("descriptionAr") || "").trim(), descriptionEn: String(data.get("descriptionEn") || "").trim(),
      searchAliases: split("searchAliases"), misspellings: split("misspellings"),
      notes: { topAr: split("notesAr"), topEn: split("notesEn"), heartAr: [], heartEn: [], baseAr: [], baseEn: [] },
      status: String(data.get("referenceStatus") || "active")
    };
    const linkTemplate = {
      similarity: data.get("similarity") === "" ? null : Number(data.get("similarity")),
      confidence: data.get("confidence") === "" ? null : Number(data.get("confidence")), sortOrder: Number(data.get("sortOrder") || 0),
      reasonAr: String(data.get("reasonAr") || "").trim(), reasonEn: String(data.get("reasonEn") || "").trim(),
      relationshipType: String(data.get("relationshipType") || "similar_character"), badges: split("badges"),
      primaryAlternative: data.get("primaryAlternative") === "on", visible: data.get("visible") === "on", status: "active", reviewStatus: "approved"
    };
    const links = data.getAll("productIds").filter(Boolean).map((productId, index) => ({ ...linkTemplate, productId: String(productId), sortOrder: Number(linkTemplate.sortOrder) + index, primaryAlternative: linkTemplate.primaryAlternative && index === 0 }));
    try {
      state.alternativesAdmin = await api("/api/admin/alternatives", { method: "POST", body: JSON.stringify({ reference, links }) });
      renderAdminDashboard("alternatives");
      window.ORIGOAlternatives?.refresh?.();
      showToast(adminCopy("تم إنشاء العطر المرجعي وربطه بالمنتج", "Reference fragrance and match created"));
    } catch (error) { showToast(error.message); }
    return;
  }
  if (event.target.id === "store-basic-settings") {
    const data = new FormData(event.target);
    const current = mergeStoreSettings(state.adminWorkspace.settings || {});
    state.adminWorkspace.settings = mergeStoreSettings({
      ...current,
      storeName: String(data.get("storeName") || current.storeName).trim(),
      supportEmail: String(data.get("supportEmail") || current.supportEmail).trim(),
      currency: String(data.get("currency") || current.currency),
      taxRate: Number(data.get("taxRate") || current.taxRate || 0),
      orderNotifications: data.has("orderNotifications")
    });
    saveAdminWorkspace("settings");
    applyStoreIdentity();
    showToast("تم حفظ إعدادات المتجر");
    return;
  }
  if (event.target.id === "admin-settings-form") {
    const data = new FormData(event.target);
    const current = mergeStoreSettings(state.adminWorkspace.settings || {});
    const textLines = (name) => String(data.get(name) || "").split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
    const faqLines = (name) => textLines(name).map((line) => {
      const [question, ...answer] = line.split("|");
      return { question: question.trim(), answer: answer.join("|").trim() };
    }).filter((item) => item.question && item.answer);
    const footerBenefits = current.footerBenefits.map((benefit) => {
      const prefix = `benefit.${benefit.id}`;
      const arFaqs = faqLines(`${prefix}.faqsAr`);
      const enFaqs = faqLines(`${prefix}.faqsEn`);
      const faqs = Array.from({ length: Math.max(arFaqs.length, enFaqs.length) }, (_, index) => ({
        qAr: arFaqs[index]?.question || enFaqs[index]?.question || "",
        aAr: arFaqs[index]?.answer || enFaqs[index]?.answer || "",
        qEn: enFaqs[index]?.question || arFaqs[index]?.question || "",
        aEn: enFaqs[index]?.answer || arFaqs[index]?.answer || ""
      }));
      return {
        ...benefit,
        active: data.has(`${prefix}.active`),
        titleAr: String(data.get(`${prefix}.titleAr`) || benefit.titleAr).trim(),
        titleEn: String(data.get(`${prefix}.titleEn`) || benefit.titleEn).trim(),
        shortAr: String(data.get(`${prefix}.shortAr`) || benefit.shortAr).trim(),
        shortEn: String(data.get(`${prefix}.shortEn`) || benefit.shortEn).trim(),
        descriptionAr: String(data.get(`${prefix}.descriptionAr`) || benefit.descriptionAr).trim(),
        descriptionEn: String(data.get(`${prefix}.descriptionEn`) || benefit.descriptionEn).trim(),
        stepsAr: textLines(`${prefix}.stepsAr`), stepsEn: textLines(`${prefix}.stepsEn`),
        conditionsAr: textLines(`${prefix}.conditionsAr`), conditionsEn: textLines(`${prefix}.conditionsEn`),
        faqs,
        icon: String(data.get(`${prefix}.icon`) || benefit.icon),
        image: state.pendingBenefitIcons[benefit.id] || benefit.image || "",
        sort: Number(data.get(`${prefix}.sort`) || benefit.sort || 1),
        colors: [String(data.get(`${prefix}.color0`) || benefit.colors?.[0]), String(data.get(`${prefix}.color1`) || benefit.colors?.[1]), String(data.get(`${prefix}.color2`) || benefit.colors?.[2])],
        ctaLabelAr: String(data.get(`${prefix}.ctaLabelAr`) || benefit.ctaLabelAr).trim(),
        ctaLabelEn: String(data.get(`${prefix}.ctaLabelEn`) || benefit.ctaLabelEn).trim(),
        ctaUrl: String(data.get(`${prefix}.ctaUrl`) || benefit.ctaUrl).trim()
      };
    });
    const finderEnabled = Object.fromEntries(Object.entries(defaultStoreSettings.fragranceFinder.enabled).map(([group, options]) => [
      group,
      options.filter((id) => data.has(`finder.${group}.${id}`))
    ]));
    const emptyFinderGroup = Object.entries(finderEnabled).find(([, options]) => !options.length)?.[0];
    if (emptyFinderGroup) {
      event.target.querySelector(`[name^="finder.${emptyFinderGroup}."]`)?.focus();
      showToast(adminCopy("يجب إبقاء خيار واحد على الأقل في كل مجموعة من مكتشف العطر", "Keep at least one option enabled in every Finder group"));
      return;
    }
    const socialNetworks = ["youtube", "facebook", "tiktok", "instagram", "snapchat", "telegram", "whatsapp"];
    const nextSocialLinks = { ...current.socialLinks };
    for (const name of socialNetworks) {
      const fieldName = `social.${name}`;
      if (!data.has(fieldName)) continue;
      const rawValue = String(data.get(fieldName) || "").trim();
      const normalizedValue = normalizeSocialLink(rawValue, name);
      if (rawValue && !normalizedValue) {
        event.target.elements.namedItem(fieldName)?.focus();
        showToast(adminCopy(`رابط ${name} غير صالح. أدخل رابطًا أو اسم مستخدم صحيحًا.`, `The ${name} link is invalid. Enter a valid URL or username.`), "error");
        return;
      }
      nextSocialLinks[name] = normalizedValue;
    }
    state.adminWorkspace.settings = mergeStoreSettings({
      ...current,
      storeName: String(data.get("storeName") || "ORIGO").trim(),
      currency: String(data.get("currency") || "EGP"),
      taxRate: Number(data.get("taxRate") || 0),
      lowStockAlerts: data.has("lowStockAlerts"),
      orderNotifications: data.has("orderNotifications"),
      passwordRecoveryChannels: Object.fromEntries(["email", "whatsapp", "sms"].map((id) => [id, data.has(`recovery.${id}`)])),
      logos: {
        light: state.pendingStoreLogos.light || String(data.get("logoLight") || current.logos.light).trim(),
        dark: state.pendingStoreLogos.dark || String(data.get("logoDark") || current.logos.dark).trim(),
        icon: state.pendingStoreLogos.icon || String(data.get("logoIcon") || current.logos.icon).trim()
      },
      footerImage: String(data.get("footerImage") || current.footerImage).trim(),
      footerDescriptionAr: String(data.get("footerDescriptionAr") || current.footerDescriptionAr).trim(),
      footerDescriptionEn: String(data.get("footerDescriptionEn") || current.footerDescriptionEn).trim(),
      newsletterTitleAr: String(data.get("newsletterTitleAr") || current.newsletterTitleAr).trim(),
      newsletterTitleEn: String(data.get("newsletterTitleEn") || current.newsletterTitleEn).trim(),
      newsletterCopyAr: String(data.get("newsletterCopyAr") || current.newsletterCopyAr).trim(),
      newsletterCopyEn: String(data.get("newsletterCopyEn") || current.newsletterCopyEn).trim(),
      supportEmail: String(data.get("supportEmail") || current.supportEmail).trim(),
      supportHoursAr: String(data.get("supportHoursAr") || current.supportHoursAr).trim(),
      supportHoursEn: String(data.get("supportHoursEn") || current.supportHoursEn).trim(),
      appLinks: { googlePlay: String(data.get("googlePlayUrl") || "").trim(), appStore: String(data.get("appStoreUrl") || "").trim() },
      socialLinks: nextSocialLinks,
      categoryIcons: { ...current.categoryIcons, ...state.pendingCategoryIcons },
      homeBenefitIcons: { ...current.homeBenefitIcons, ...state.pendingHomeBenefitIcons },
      appearance: appearanceFromForm(event.target),
      fragranceFinder: { ...current.fragranceFinder, enabled: finderEnabled },
      footerBenefits
    });
    state.pendingStoreLogos = {};
    state.pendingBenefitIcons = {};
    state.pendingCategoryIcons = {};
    state.pendingHomeBenefitIcons = {};
    saveAdminWorkspace("settings");
    renderSiteFooter();
    applyStoreIdentity();
  if (document.body.classList.contains("benefit-route")) handleBenefitRoute({ replace: true });
  window.ORIGOFragranceFinder?.render?.();
    showToast(adminCopy("تم حفظ إعدادات المتجر", "Store settings saved"));
    return;
  }
  if (event.target.id === "note-admin-form") {
    const form = event.target;
    if (form.dataset.imageProcessing === "true") {
      showToast(adminCopy("انتظر حتى يكتمل تجهيز الصورة.", "Wait until the artwork finishes processing."));
      return;
    }
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;
    const data = new FormData(form);
    const originalSlug = String(data.get("originalSlug") || "");
    const note = window.ORIGOFragranceNotes.upsertNote({
      slug: originalSlug || window.ORIGOFragranceNotes.slugify(data.get("slug") || data.get("nameEn") || data.get("nameAr")),
      nameAr: String(data.get("nameAr") || "").trim(),
      nameEn: String(data.get("nameEn") || "").trim(),
      familyId: String(data.get("familyId") || "uncategorized"),
      position: String(data.get("position") || "multiple"),
      aliases: csvValues(data.get("aliases")),
      defaultIntensity: Math.min(5, Math.max(1, Number(data.get("defaultIntensity") || 3))),
      parentId: String(data.get("parentId") || "").trim(),
      related: csvValues(data.get("related")),
      compatible: csvValues(data.get("compatible")),
      opposite: csvValues(data.get("opposite")),
      descriptionAr: String(data.get("descriptionAr") || "").trim(),
      descriptionEn: String(data.get("descriptionEn") || "").trim(),
      image: state.pendingNoteImage || String(data.get("image") || "").trim()
    });
    const mergeInto = String(data.get("mergeInto") || "");
    if (mergeInto && note?.slug) window.ORIGOFragranceNotes.mergeNote(note.slug, mergeInto);
    try {
      await persistNotesState();
      state.activeAdminNoteSlug = mergeInto || note?.slug || "";
      renderNotesAdmin();
      if (!mergeInto && note) populateNoteAdminForm(window.ORIGOFragranceNotes.find(note.slug));
      if (document.body.classList.contains("notes-route")) handleNotesRoute({ replace: true });
      showToast(adminCopy("تم حفظ المكوّن وربط مرادفاته", "Note and aliases saved"));
    } catch (error) {
      showToast(error.message);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
    return;
  }
  if (event.target.id === "family-admin-form") {
    const data = new FormData(event.target);
    window.ORIGOFragranceNotes.upsertFamily({
      id: window.ORIGOFragranceNotes.slugify(data.get("id") || data.get("nameEn") || data.get("nameAr")),
      nameAr: String(data.get("nameAr") || "").trim(),
      nameEn: String(data.get("nameEn") || "").trim(),
      color: String(data.get("color") || "#6d0d24"),
      accent: String(data.get("color") || "#6d0d24"),
      position: String(data.get("position") || "multiple"),
      symbol: String(data.get("symbol") || "✦")
    });
    try {
      await persistNotesState();
      event.target.reset();
      renderNotesAdmin();
      showToast(adminCopy("تمت إضافة العائلة الرئيسية", "Fragrance family added"));
    } catch (error) {
      showToast(error.message);
    }
    return;
  }
  if (event.target.id === "password-reset-request-form") {
    const form = event.target;
    const values = Object.fromEntries(new FormData(form));
    const button = form.querySelector("[type='submit']");
    const error = $("#auth-error");
    error.textContent = "";
    button.disabled = true;
    try {
      const result = await api("/api/auth/password-reset/request", { method: "POST", body: JSON.stringify(values) });
      state.passwordResetFlow = { requestId: result.requestId, identifier: String(values.identifier || ""), channel: String(values.channel || "email"), code: "", attempts: 0, expiresAt: Date.now() + Number(result.expiresIn || 600) * 1000 };
      renderPasswordRecovery("reset-sent");
      showToast(adminCopy("إذا كانت البيانات مطابقة فسيصلك رمز صالح لمدة 10 دقائق", "If the details match, a 10-minute code will be delivered"));
    } catch (requestError) {
      error.textContent = requestError.message;
      button.disabled = false;
    }
    return;
  }
  if (event.target.id === "password-reset-confirm-form") {
    const form = event.target;
    const values = Object.fromEntries(new FormData(form));
    const button = form.querySelector("[type='submit']");
    const error = $("#auth-error");
    error.textContent = "";
    button.disabled = true;
    try {
      await api("/api/auth/password-reset/confirm", { method: "POST", body: JSON.stringify(values) });
      renderAuth("login");
      showToast(adminCopy("تم تعيين كلمة المرور الجديدة؛ يمكنك تسجيل الدخول الآن", "Password updated; you can sign in now"));
    } catch (requestError) {
      error.textContent = requestError.message;
      button.disabled = false;
    }
    return;
  }
  if (event.target.id === "password-reset-code-form") {
    const form = event.target;
    const data = new FormData(form);
    const code = Array.from({ length: 6 }, (_, index) => String(data.get(`digit${index}`) || "")).join("");
    if (state.passwordResetFlow.expiresAt && Date.now() > state.passwordResetFlow.expiresAt) { renderPasswordRecovery("reset-expired"); return; }
    if (!/^\d{6}$/.test(code)) { $("#auth-error").textContent = "أدخل رمز التحقق المكوّن من 6 أرقام"; return; }
    state.passwordResetFlow.code = code;
    renderPasswordRecovery("reset-password");
    return;
  }
  if (event.target.id === "password-reset-password-form") {
    const form = event.target;
    const values = Object.fromEntries(new FormData(form));
    const error = $("#auth-error");
    if (values.password !== values.confirmPassword) { error.textContent = "كلمتا المرور غير متطابقتين"; return; }
    try {
      await api("/api/auth/password-reset/confirm", { method: "POST", body: JSON.stringify({ requestId: state.passwordResetFlow.requestId, code: state.passwordResetFlow.code, password: values.password }) });
      renderPasswordRecovery("reset-success");
    } catch (requestError) {
      state.passwordResetFlow.attempts += 1;
      renderPasswordRecovery(state.passwordResetFlow.attempts >= 5 ? "reset-locked" : "reset-error");
    }
    return;
  }
  if (event.target.id === "auth-form") {
    const form = event.target;
    const mode = form.dataset.mode;
    const values = Object.fromEntries(new FormData(form));
    const button = form.querySelector("[type='submit']");
    const error = $("#auth-error");
    error.textContent = "";
    button.disabled = true;
    try {
      const result = await api(`/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify({ ...values, cart: state.cart })
      });
      state.serverAvailable = true;
      state.user = result.user;
      state.cart = result.cart || [];
      localStorage.setItem("origoCartUserId", String(state.user.id));
      persist();
      renderCart();
      updateAccountIndicator();
      const pending = state.pendingAction;
      state.pendingAction = "";
      if (pending === "checkout") {
        closeOverlay($("#account-overlay"));
        openCheckout();
      } else if (pending === "account-page") {
        closeOverlay($("#account-overlay"));
        window.ORIGOAccount?.route?.();
      } else if (pending === "admin") {
        if (isStaffUser()) {
          closeOverlay($("#account-overlay"));
          await openAdminDashboard();
        } else {
          await renderAccount();
          showToast(adminCopy("الحساب ليس لديه صلاحية إدارة المتجر", "This account does not have store-admin access"));
        }
      } else {
        await renderAccount();
      }
      showToast(mode === "register"
        ? adminCopy("تم إنشاء حسابك بنجاح", "Your account was created")
        : adminCopy("مرحبًا بعودتك", "Welcome back"));
    } catch (requestError) {
      error.textContent = requestError.message;
      button.disabled = false;
    }
    return;
  }
  if (event.target.id === "checkout-form") {
    const form = event.target;
    const button = form.querySelector("[type='submit']");
    const error = $("#checkout-error");
    error.textContent = "";
    button.disabled = true;
    try {
      clearTimeout(cartSyncTimer);
      await pushCart();
      const result = await api("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          attribution: window.ORIGOTracking?.attribution?.() || {}
        })
      });
      window.ORIGOTracking?.purchase?.(result.order);
      if (result.order.paymentProvider === "paymob") {
        const paymentResult = await api("/api/payments/paymob/intention", {
          method: "POST",
          body: JSON.stringify({ orderId: result.order.id })
        });
        window.location.assign(paymentResult.payment.checkoutUrl);
        return;
      }
      state.cart = [];
      localStorage.setItem("origoCart", "[]");
      renderCart();
      const ar = state.lang === "ar";
      $("#checkout-overlay .checkout-grid").innerHTML = `
        <div class="order-success">
          <span>✓</span>
          <h2>${ar ? "تم استلام طلبك" : "Order received"}</h2>
          <p>${ar ? "سنراجع التفاصيل ونتواصل معك لتأكيد الشحن. يمكنك متابعة الحالة من حسابك." : "We will review the details and contact you to confirm shipping. Follow its status from your account."}</p>
          <b dir="ltr">${escapeHTML(result.order.orderNumber)}</b>
          <div class="account-actions">
            <button class="button burgundy-button" data-action="view-orders">${ar ? "عرض طلباتي" : "View my orders"}</button>
            <button class="button secondary-button" data-action="continue-after-order">${ar ? "متابعة التسوق" : "Continue shopping"}</button>
          </div>
        </div>`;
    } catch (requestError) {
      error.textContent = requestError.message;
      button.disabled = false;
    }
    return;
  }
  if (event.target.id === "pdp-restock-form") {
    const form = event.target;
    const input = form.elements.contact;
    const button = form.querySelector("[type='submit']");
    const buttonLabel = button.querySelector("span");
    const status = form.querySelector("#pdp-restock-status");
    const channel = form.dataset.channel === "whatsapp" ? "whatsapp" : "email";
    if (!form.checkValidity()) {
      form.dataset.status = "error";
      status.textContent = state.lang === "ar"
        ? (channel === "whatsapp" ? "أدخل رقم واتساب صحيحًا." : "أدخل بريدًا إلكترونيًا صحيحًا.")
        : (channel === "whatsapp" ? "Enter a valid WhatsApp number." : "Enter a valid email address.");
      form.reportValidity();
      return;
    }
    form.dataset.status = "loading";
    button.disabled = true;
    buttonLabel.textContent = state.lang === "ar" ? "جارٍ التسجيل..." : "Registering...";
    status.textContent = "";
    try {
      const result = await api("/api/restock-requests", {
        method: "POST",
        body: JSON.stringify({
          productId: form.dataset.productId,
          channel,
          contact: input.value.trim(),
          language: state.lang
        })
      });
      form.dataset.status = "success";
      input.readOnly = true;
      form.querySelectorAll("[data-action='restock-channel']").forEach((item) => (item.disabled = true));
      buttonLabel.textContent = state.lang === "ar" ? "تم تسجيل التنبيه" : "Alert registered";
      status.textContent = result.request?.duplicate
        ? (state.lang === "ar" ? "طلبك مسجل بالفعل، وسنخبرك فور توفر المنتج." : "You are already registered; we will notify you when it is available.")
        : (state.lang === "ar" ? "تم بنجاح. سنخبرك فور عودة المنتج للمخزون." : "Done. We will notify you when the product is back.");
      showToast(state.lang === "ar" ? "تم تفعيل إشعار عودة المنتج" : "Back-in-stock alert activated");
    } catch (requestError) {
      form.dataset.status = "error";
      status.textContent = requestError.message;
      button.disabled = false;
      buttonLabel.textContent = state.lang === "ar" ? "تأكيد التنبيه" : "Confirm alert";
    }
    return;
  }
  if (event.target.id === "newsletter-form") {
    const form = event.target;
    const button = form.querySelector("button[type='submit']");
    const status = $("#newsletter-status");
    if (!form.checkValidity()) {
      form.dataset.status = "error";
      status.textContent = state.lang === "ar" ? "يرجى إدخال بريد إلكتروني صحيح." : "Enter a valid email address.";
      form.reportValidity();
      return;
    }
    form.dataset.status = "loading";
    button.disabled = true;
    button.querySelector("span").textContent = state.lang === "ar" ? "جارٍ الاشتراك..." : "Subscribing...";
    status.textContent = "";
    await new Promise((resolve) => setTimeout(resolve, 450));
    form.dataset.status = "success";
    status.textContent = state.lang === "ar" ? "تم تسجيل بريدك بنجاح. شكرًا لانضمامك." : "You are subscribed. Welcome to ORIGO.";
    button.querySelector("span").textContent = state.lang === "ar" ? "تم الاشتراك" : "Subscribed";
    form.reset();
    showToast(state.lang === "ar" ? "أهلًا بك في دائرة ORIGO الخاصة" : "Welcome to the ORIGO private circle");
    setTimeout(() => {
      button.disabled = false;
      button.querySelector("span").textContent = state.lang === "ar" ? "اشترك الآن" : "Subscribe now";
    }, 1200);
  }
  if (event.target.id === "web-import-form") {
    const query = $("#web-product-query").value.trim();
    await runAdminSuggestions(query);
  }
  if (event.target.id === "import-review-form") await saveCatalogProduct(event.target, event.submitter?.value || "draft");
});

$$(".note-bubble").forEach((button) => button.addEventListener("click", () => updateNoteSelection(button)));

$$(".chip").forEach((chip) => chip.addEventListener("click", () => {
  $$(".chip").forEach((item) => item.classList.remove("active"));
  chip.classList.add("active");
  state.storefrontSearchQuery = "";
  renderProducts(chip.dataset.filter);
}));

$$("[data-scroll='products']").forEach((button) => button.addEventListener("click", () => {
  $("#product-grid").scrollBy({ left: Number(button.dataset.direction) * 330, behavior: "smooth" });
}));

$("#global-search-input").addEventListener("input", (event) => renderSearchSuggestions(event.target.value));
$("#catalog-search-input")?.addEventListener("focus", (event) => {
  if (event.target.value.trim()) renderCatalogAutocomplete(event.target.value);
});
$$("[data-search-value]").forEach((button) => button.addEventListener("click", () => {
  $("#global-search-input").value = button.dataset.searchValue;
  renderSearchSuggestions(button.dataset.searchValue);
}));

let adminSuggestionTimer;
$("#web-product-query").addEventListener("input", (event) => {
  clearTimeout(adminSuggestionTimer);
  adminSuggestionTimer = setTimeout(() => runAdminSuggestions(event.target.value), 420);
});

let notesSearchTimer;
document.addEventListener("input", (event) => {
  if (event.target.matches("[data-accord-search]")) {
    filterAdminAccords(event.target.closest(".accord-admin-editor"));
    return;
  }
  if (event.target.matches("[data-smart-search]")) {
    const menu = event.target.closest(".smart-select-menu");
    const query = normalizeOptionSearch(event.target.value);
    let visible = 0;
    menu.querySelectorAll("[role='option']").forEach((option) => {
      const match = !query || String(option.dataset.search || "").includes(query);
      option.hidden = !match;
      if (match) visible += 1;
    });
    const create = menu.querySelector(".smart-select-create");
    if (create) create.innerHTML = visible || !query ? `＋ ${adminCopy("إضافة خيار جديد","Add new option")}` : `＋ ${adminCopy("لم يتم العثور على الخيار — إضافته","No option found — add it")}`;
    return;
  }
  const productForm = event.target.closest?.("#import-review-form");
  if (productForm && ["nameAr","nameEn"].includes(event.target.name)) {
    const counter = productForm.querySelector(`[data-character-count='${event.target.name}']`);
    if (counter) counter.textContent = `${event.target.value.length}/140`;
    if (event.target.name === "nameEn" && productForm.elements.slug && productForm.elements.slug.dataset.userEdited !== "true") {
      productForm.elements.slug.value = event.target.value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      productForm.elements.slug.dataset.autoGenerated = "true";
    }
  }
  if (productForm && event.target.name === "slug" && event.isTrusted) {
    event.target.dataset.userEdited = "true";
    event.target.dataset.autoGenerated = "false";
  }
  if (productForm && ["price","oldPrice","cost"].includes(event.target.name)) {
    const price = Math.max(0, Number(productForm.elements.price?.value || 0));
    const oldPrice = Math.max(0, Number(productForm.elements.oldPrice?.value || 0));
    const cost = Math.max(0, Number(productForm.elements.cost?.value || 0));
    const discount = oldPrice > price && oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
    const profit = price - cost;
    const margin = price > 0 ? Math.round((profit / price) * 100) : 0;
    const metrics = productForm.querySelector("#pricing-live-metrics");
    if (metrics) metrics.innerHTML = `<span>${adminCopy("الخصم","Discount")} <b>${discount}%</b></span><span>${adminCopy("الربح المتوقع","Expected profit")} <b>${formatPrice(profit)}</b></span><span>${adminCopy("هامش الربح","Margin")} <b>${margin}%</b></span>`;
    productForm.elements.oldPrice?.setCustomValidity(oldPrice && oldPrice <= price ? adminCopy("يجب أن يكون السعر قبل الخصم أكبر من السعر الحالي.","Compare-at price must exceed the current price.") : "");
  }
  if (event.target.id === "catalog-search-input") {
    clearTimeout(catalogSearchTimer);
    catalogSearchTimer = setTimeout(() => {
      state.catalogQuery = event.target.value.trim();
      state.catalogPage = 1;
      renderCatalogAutocomplete(event.target.value);
      updateCatalogURL({ replace: true });
      renderCatalog();
    }, 260);
  }
  if (event.target.matches("[data-catalog-brand-search]")) {
    const normalized = ORIGOCatalog.normalize(event.target.value);
    event.target.closest(".catalog-filter-panel").querySelectorAll(".catalog-check").forEach((label) => {
      label.hidden = Boolean(normalized) && !ORIGOCatalog.normalize(label.textContent).includes(normalized);
    });
  }
  if (event.target.matches("[data-catalog-price]")) {
    clearTimeout(catalogSearchTimer);
    catalogSearchTimer = setTimeout(() => {
      state.catalogFilters[event.target.dataset.catalogPrice] = event.target.value;
      state.catalogPage = 1;
      updateCatalogURL({ replace: true });
      renderCatalog();
    }, 220);
  }
  if (event.target.id === "admin-global-search") {
    const query = event.target.value.trim();
    $("#admin-dashboard-content").innerHTML = query ? adminSearchMarkup(query) : (renderAdminDashboard(state.adminView), $("#admin-dashboard-content").innerHTML);
  }
  if (event.target.id === "notes-library-search") {
    state.notesSearchQuery = event.target.value;
    state.notesVisibleCount = 72;
    clearTimeout(notesSearchTimer);
    notesSearchTimer = setTimeout(renderNotesLibrary, 160);
  }
  if (event.target.id === "notes-admin-search") renderNotesAdmin();
  if (event.target.id === "brand-carousel-search") renderBrandCarousel(event.target.value);
  if (event.target.closest("#admin-settings-form") && /^logo(Light|Dark|Icon)$/.test(event.target.name || "")) {
    const key = event.target.name.replace("logo", "").toLowerCase();
    const preview = $(`#store-logo-preview-${key}`);
    if (preview && event.target.value.trim()) preview.src = event.target.value.trim();
  }
  if (event.target.closest("#admin-settings-form") && String(event.target.name || "").startsWith("appearance.")) {
    const form = event.target.closest("#admin-settings-form");
    const key = event.target.name.slice("appearance.".length);
    const output = form.querySelector(`[data-appearance-output="${key}"]`);
    const suffix = ["baseFontSize", "imageRadius", "cardRadius", "cardBorderWidth", "headerHeight", "contentMaxWidth", "sectionGap", "productCardHeight"].includes(key) ? "px" : ["headingScale", "iconScale", "imageScale", "headerIconScale", "adminScale"].includes(key) ? "×" : "";
    if (output) output.textContent = `${event.target.value}${suffix}`;
    applyAppearanceSettings(appearanceFromForm(form));
  }
  if (event.target.closest("#note-admin-form") && event.target.name === "image") {
    state.pendingNoteImage = "";
    const uploadInput = $("#note-image-upload");
    if (uploadInput) uploadInput.value = "";
    const draft = {
      nameAr: event.target.form.elements.nameAr.value,
      nameEn: event.target.form.elements.nameEn.value,
      familyId: event.target.form.elements.familyId.value,
      symbol: "✦",
      image: event.target.value
    };
    const preview = $("#note-admin-image-preview");
    preview.dataset.noteSlug = "";
    preview.dataset.noteNameAr = draft.nameAr;
    preview.dataset.noteNameEn = draft.nameEn;
    preview.dataset.noteFamily = draft.familyId;
    delete preview.dataset.noteFallback;
    preview.src = window.ORIGOFragranceNotes.artwork(draft);
    const imageStatus = $("#note-image-status");
    if (imageStatus) imageStatus.textContent = event.target.value
      ? adminCopy("سيتم استخدام رابط الصورة عند الحفظ.", "The artwork URL will be used when saved.")
      : adminCopy("تمت إزالة الصورة المخصصة؛ سيظهر البديل التلقائي.", "Custom artwork removed; the automatic fallback will be used.");
  }
  if (event.target.closest("#import-review-form")) {
    const editorForm = $("#import-review-form");
    if (event.target.name === "sku" && event.isTrusted) {
      event.target.dataset.userEdited = "true";
      event.target.dataset.autoGenerated = "false";
    }
    if (event.target.name === "slug" && event.isTrusted) {
      event.target.dataset.userEdited = "true";
      event.target.dataset.autoGenerated = "false";
    }
    if (event.target.name === "quantity") {
      const reserved = Number(editorForm.elements.reservedStock?.value || 0);
      if (editorForm.elements.availableStock) editorForm.elements.availableStock.value = Math.max(0, Number(event.target.value || 0) - reserved);
    }
    if (event.target.name === "category") updateProductTypeFields(editorForm);
    updateDuplicateWarning($("#import-review-form"));
    renderNoteMatchPreview($("#import-review-form"));
    updateProductEditorPreview($("#import-review-form"));
    updateAdminAccordEditor(editorForm);
  }
});

document.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.noteArtwork !== "true" || image.dataset.noteFallback === "true") return;
  const note = window.ORIGOFragranceNotes?.find(image.dataset.noteSlug) || {
    nameAr: image.dataset.noteNameAr || "مكوّن عطري",
    nameEn: image.dataset.noteNameEn || "FRAGRANCE NOTE",
    familyId: image.dataset.noteFamily || "uncategorized",
    symbol: "✦"
  };
  image.dataset.noteFallback = "true";
  image.src = window.ORIGOFragranceNotes.artwork({ ...note, image: "" });
}, true);

document.addEventListener("change", async (event) => {
  if (event.target.matches("#admin-banner-slider-settings [name='mediaFile']")) {
    const files = [...(event.target.files || [])];
    const status = event.target.closest("form")?.querySelector("#banner-upload-status");
    const invalid = files.filter((file) => !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type) || file.size > 15 * 1024 * 1024);
    if (invalid.length) {
      event.target.value = "";
      if (status) status.textContent = adminCopy("تعذر اختيار بعض الملفات. استخدم JPG أو PNG أو WebP أو AVIF وبحد أقصى 15 MB للصورة.", "Some files are invalid. Use JPG, PNG, WebP, or AVIF up to 15 MB each.");
      showToast(status?.textContent || adminCopy("ملفات صور غير صالحة", "Invalid image files"), "error");
      return;
    }
    if (status) status.textContent = files.length ? adminCopy(`تم اختيار ${files.length} صورة. اضغط حفظ السلايدر لإضافتها.`, `${files.length} images selected. Save the slider to add them.`) : "";
    return;
  }
  if (event.target.id === "quick-import-images") {
    await addQuickImportImages(event.target.files);
    event.target.value = "";
    return;
  }
  if (event.target.id === "alternatives-import-file") {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parseLine = (line) => { const cells=[]; let value="", quoted=false; for(let i=0;i<line.length;i+=1){const char=line[i];if(char==='"'&&quoted&&line[i+1]==='"'){value+='"';i+=1;}else if(char==='"'){quoted=!quoted;}else if(char===','&&!quoted){cells.push(value);value="";}else value+=char;}cells.push(value);return cells; };
      const lines = text.replace(/^\uFEFF/,"").split(/\r?\n/).filter((line)=>line.trim());
      const headers = parseLine(lines.shift() || "").map((value)=>value.trim());
      const rows = lines.map((line)=>Object.fromEntries(parseLine(line).map((value,index)=>[headers[index],value])));
      const result = await api("/api/admin/alternatives/import", { method:"POST", body:JSON.stringify({ rows }) });
      state.alternativesAdmin = result.payload || await api("/api/admin/alternatives");
      renderAdminDashboard("alternatives");
      showToast(adminCopy(`تم استيراد ${result.imported} علاقة`, `Imported ${result.imported} relationships`));
    } catch (error) { showToast(error.message); }
    return;
  }
  if (event.target.matches("[name='existingOption']")) {
    populateProductOptionDialog(event.target.closest("dialog"), event.target.value);
    return;
  }
  if (event.target.matches("[data-product-option-image-upload]")) {
    const file = event.target.files?.[0];
    if (!file) return;
    const dialog = event.target.closest("dialog");
    const form = dialog.querySelector("form");
    const status = dialog.querySelector(".option-image-status");
    const saveButton = dialog.querySelector("[data-action='save-product-option']");
    form.dataset.imageProcessing = "true";
    if (status) status.textContent = adminCopy("جارٍ ضغط الصورة وتجهيزها…", "Optimizing artwork…");
    if (saveButton) saveButton.disabled = true;
    try {
      const value = await optimizeProductOptionArtwork(file);
      dialog.querySelector("[name='image']").value = value;
      const preview = dialog.querySelector(".option-image-preview");
      preview.hidden = false;
      preview.querySelector("img").src = value;
      const sizeKb = Math.max(1, Math.round(value.length * .75 / 1024));
      const caption = preview.querySelector("figcaption");
      if (caption) caption.textContent = adminCopy(`جاهزة للحفظ · نحو ${sizeKb} KB`, `Ready to save · about ${sizeKb} KB`);
      if (status) status.textContent = adminCopy("تم تجهيز الصورة بنجاح.", "Artwork is ready.");
    } catch (errorValue) {
      event.target.value = "";
      dialog.querySelector("[name='image']").value = "";
      if (status) status.textContent = errorValue.message;
      showToast(errorValue.message);
    } finally {
      form.dataset.imageProcessing = "false";
      if (saveButton) saveButton.disabled = false;
    }
    return;
  }
  if (event.target.matches("[data-logo-upload]")) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 350_000) {
      event.target.value = "";
      showToast(adminCopy("ملف الشعار أكبر من 350 KB", "Logo file exceeds 350 KB"));
      return;
    }
    const key = event.target.dataset.logoUpload;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      state.pendingStoreLogos[key] = String(reader.result || "");
      const preview = $(`#store-logo-preview-${key}`);
      if (preview) preview.src = state.pendingStoreLogos[key];
    }, { once: true });
    reader.readAsDataURL(file);
    return;
  }
  if (event.target.matches("[data-benefit-icon-upload]")) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type) || file.size > 350_000) {
      event.target.value = "";
      showToast(adminCopy("اختر صورة صالحة لا تتجاوز 350 KB", "Choose a valid image up to 350 KB"));
      return;
    }
    const id = event.target.dataset.benefitIconUpload;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      state.pendingBenefitIcons[id] = String(reader.result || "");
      const preview = $(`#benefit-icon-preview-${CSS.escape(id)}`);
      if (preview) preview.src = state.pendingBenefitIcons[id];
    }, { once: true });
    reader.readAsDataURL(file);
    return;
  }
  if (event.target.matches("[data-category-icon-upload], [data-home-benefit-icon-upload]")) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type) || file.size > 350_000) {
      event.target.value = "";
      showToast(adminCopy("اختر صورة صالحة لا تتجاوز 350 KB", "Choose a valid image up to 350 KB"));
      return;
    }
    const isCategory = event.target.matches("[data-category-icon-upload]");
    const key = isCategory ? event.target.dataset.categoryIconUpload : event.target.dataset.homeBenefitIconUpload;
    const pending = isCategory ? state.pendingCategoryIcons : state.pendingHomeBenefitIcons;
    const previewId = `${isCategory ? "category" : "home-benefit"}-icon-preview-${key}`;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      pending[key] = String(reader.result || "");
      const preview = $(`#${CSS.escape(previewId)}`);
      if (preview) preview.innerHTML = `<img src="${escapeHTML(pending[key])}" alt=""/>`;
    }, { once: true });
    reader.readAsDataURL(file);
    return;
  }
  if (event.target.matches("[data-catalog-filter]")) {
    const key = event.target.dataset.catalogFilter;
    const value = event.target.value;
    const selected = state.catalogFilters[key] || [];
    state.catalogFilters[key] = event.target.checked ? [...new Set([...selected, value])] : selected.filter((item) => String(item) !== value);
    state.catalogPage = 1;
    updateCatalogURL();
    renderCatalog();
  }
  if (event.target.matches("[data-catalog-sort]")) {
    state.catalogSort = event.target.value;
    state.catalogPage = 1;
    updateCatalogURL();
    renderCatalog();
  }
  if (event.target.matches("[data-dynamic-filter]")) {
    const key = event.target.dataset.dynamicFilter;
    if (event.target.value) state.activeDynamicFilters[key] = event.target.value;
    else delete state.activeDynamicFilters[key];
    renderProducts($(".chip.active")?.dataset.filter || "all");
  }
  if (event.target.matches("[data-profile-image-upload]")) handleProfileImageUpload(event.target);
  if (event.target.id === "gallery-upload") handleGalleryUpload(event.target);
  if (event.target.id === "note-image-upload") {
    const file = event.target.files?.[0];
    if (!file) return;
    const form = event.target.closest("#note-admin-form");
    const submitButton = form?.querySelector("button[type='submit']");
    const status = $("#note-image-status");
    if (form) form.dataset.imageProcessing = "true";
    if (submitButton) submitButton.disabled = true;
    if (status) status.textContent = adminCopy("جارٍ ضغط الصورة وتجهيزها…", "Optimizing note artwork…");
    try {
      const value = await optimizeProductOptionArtwork(file);
      state.pendingNoteImage = value;
      const preview = $("#note-admin-image-preview");
      preview.dataset.noteArtwork = "true";
      preview.dataset.noteSlug = state.activeAdminNoteSlug || "";
      delete preview.dataset.noteFallback;
      preview.src = value;
      const sizeKb = Math.max(1, Math.round(value.length * .75 / 1024));
      if (status) status.textContent = adminCopy(`الصورة جاهزة للحفظ · نحو ${sizeKb} KB`, `Artwork ready to save · about ${sizeKb} KB`);
      showToast(adminCopy("تم تجهيز صورة النوتة بنجاح.", "Note artwork is ready."));
    } catch (errorValue) {
      event.target.value = "";
      if (status) status.textContent = errorValue.message;
      showToast(errorValue.message);
    } finally {
      if (form) form.dataset.imageProcessing = "false";
      if (submitButton) submitButton.disabled = false;
    }
    return;
  }
  if (event.target.matches("[name='selectedImage']")) {
    $$(".review-image").forEach((label) => label.classList.toggle("selected", $("input", label).checked));
  }
  if (event.target.matches("[data-action='order-status']")) {
    const select = event.target;
    select.disabled = true;
    try {
      const result = await api(`/api/admin/orders/${select.dataset.id}/status`, {
        method: "POST",
        body: JSON.stringify({ status: select.value })
      });
      const index = state.adminOrders.findIndex((order) => order.id === result.order.id);
      if (index >= 0) state.adminOrders[index] = result.order;
      $("#admin-orders-list").innerHTML = renderOrders(state.adminOrders, true);
      if ($("#admin-overlay").classList.contains("open")) renderAdminDashboard(state.adminView);
      showToast(adminCopy("تم تحديث حالة الطلب", "Order status updated"));
    } catch (error) {
      select.disabled = false;
      showToast(error.message);
    }
  }
});

$("#alternative-input")?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runAlternativeSearch();
});

$("#mobile-header-search")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = $("#mobile-header-search-input")?.value.trim() || "";
  if (query) navigateCatalog({ category: "perfume", query });
  else $("#mobile-header-search-input")?.focus();
});

$("#mobile-header-search-input")?.addEventListener("input", (event) => renderMobileSmartSearch(event.target.value));
$("#mobile-header-search-input")?.addEventListener("keydown", (event) => {
  const holder = $("#mobile-smart-search-results");
  if (!holder || holder.hidden || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
  const options = [...holder.querySelectorAll("[role='option']")];
  if (!options.length) return;
  event.preventDefault();
  const current = options.indexOf(document.activeElement);
  const next = event.key === "ArrowDown" ? (current + 1) % options.length : (current <= 0 ? options.length - 1 : current - 1);
  options[next].focus();
});
$("#mobile-header-search")?.addEventListener("focusout", (event) => {
  if (event.currentTarget.contains(event.relatedTarget)) return;
  $("#mobile-smart-search-results").hidden = true;
  $("#mobile-header-search-input")?.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openOverlay("#search-overlay");
  }
  if (event.key === "Escape") {
    if ($("#product-overlay").classList.contains("open")) closeProductPage();
    else $$(".overlay.open").forEach(closeOverlay);
    closeDrawers();
    toggleMobileMenu(false);
    syncBodyLock();
  }
});

$$(".overlay").forEach((overlay) => overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    if (overlay.id === "product-overlay") closeProductPage();
    else closeOverlay(overlay);
  }
}));

const sections = $$("main section[id]");
const navLinks = $$(".category-nav a");
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.find((entry) => entry.isIntersecting);
  if (!visible) return;
  navLinks.forEach((link) => link.classList.remove("active"));
  const activeLink = visible.target.id === "featured"
    ? $(`.category-nav [data-category="${state.storefrontCategory === "all" ? "perfume" : state.storefrontCategory}"]`)
    : $(`.category-nav a[href="#${visible.target.id}"]`);
  activeLink?.classList.add("active");
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

let mobileChromeLastScrollY = Math.max(0, window.scrollY);
let mobileChromeFrame = 0;

function isPersistentBottomNavigationRoute() {
  return document.body.classList.contains("commerce-route")
    || /\/(?:cart|checkout|payment|track(?:ing)?|orders?)(?:\/|$)/i.test(window.location.pathname);
}

function updateMobileScrollChrome() {
  mobileChromeFrame = 0;
  const currentScrollY = Math.max(0, window.scrollY);
  const delta = currentScrollY - mobileChromeLastScrollY;
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  const nearTop = currentScrollY < 28;

  $(".site-header")?.classList.toggle("compact", currentScrollY > 28);

  if (!isMobile || nearTop) {
    document.body.classList.remove("mobile-header-condensed", "mobile-nav-hidden");
  } else if (delta > 3) {
    document.body.classList.toggle("mobile-header-condensed", currentScrollY > 90);
    document.body.classList.toggle(
      "mobile-nav-hidden",
      currentScrollY > 260 && !isPersistentBottomNavigationRoute()
    );
  } else if (delta < -2) {
    document.body.classList.remove("mobile-header-condensed", "mobile-nav-hidden");
  }

  if (isPersistentBottomNavigationRoute()) {
    document.body.classList.remove("mobile-nav-hidden");
  }
  mobileChromeLastScrollY = currentScrollY;
}

function requestMobileScrollChromeUpdate() {
  if (mobileChromeFrame) return;
  mobileChromeFrame = window.requestAnimationFrame(updateMobileScrollChrome);
}

window.addEventListener("scroll", requestMobileScrollChromeUpdate, { passive: true });
window.addEventListener("resize", requestMobileScrollChromeUpdate, { passive: true });
updateMobileScrollChrome();

window.addEventListener("popstate", () => {
  handleBenefitRoute();
  handleBenefitsRoute();
  handleNotesRoute();
  handleBrandsRoute();
  handleCatalogRoute();
  handleProductRoute();
});

function bindBrandMarquee(brandTrack) {
  if (!brandTrack || brandTrack.dataset.dragBound === "true") return;
  brandTrack.dataset.dragBound = "true";
  let brandDragging = false;
  let brandMoved = false;
  let brandStartX = 0;
  let brandStartScroll = 0;
  let brandPointerId = null;
  let brandAnimation = null;
  let brandAnimationStartTime = 0;
  let brandAnimationDuration = 0;
  let brandLoopWidth = 0;
  let brandResumeTimer = 0;

  const marqueeAnimation = () => {
    const content = brandTrack.querySelector(".brand-marquee-content");
    if (!content) return null;
    const animation = content.getAnimations?.().find((item) => {
      const name = String(item.animationName || "");
      return name.includes("origoBrandMarquee") || name.includes("origoBenefitMarquee");
    }) || content.getAnimations?.()[0] || null;
    return { animation, content };
  };

  const moveAnimationBy = (delta, startTime = null) => {
    if (!brandAnimation || !brandAnimationDuration || !brandLoopWidth) return false;
    const rtlMultiplier = document.documentElement.dir === "rtl" ? 1 : -1;
    const origin = startTime == null ? Number(brandAnimation.currentTime || 0) : startTime;
    const nextTime = origin + rtlMultiplier * (delta / brandLoopWidth) * brandAnimationDuration;
    brandAnimation.currentTime = ((nextTime % brandAnimationDuration) + brandAnimationDuration) % brandAnimationDuration;
    return true;
  };

  const pauseForInteraction = () => {
    window.clearTimeout(brandResumeTimer);
    const motion = marqueeAnimation();
    brandAnimation = motion?.animation || null;
    brandLoopWidth = motion?.content ? motion.content.scrollWidth / 2 : 0;
    if (!brandAnimation) return;
    const timing = brandAnimation.effect?.getComputedTiming?.();
    brandAnimationDuration = Number(timing?.duration || 0);
    brandAnimation.pause();
    brandAnimationStartTime = Number(brandAnimation.currentTime || 0);
  };

  const resumeAfterInteraction = () => {
    const animationToResume = brandAnimation;
    brandResumeTimer = window.setTimeout(() => {
      brandTrack.classList.remove("is-interacting", "is-dragging");
      animationToResume?.play?.();
    }, 140);
  };

  brandTrack.addEventListener("wheel", (event) => {
    const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : (event.shiftKey ? event.deltaY : 0);
    if (!horizontalDelta) return;
    event.preventDefault();
    brandTrack.classList.add("is-interacting");
    pauseForInteraction();
    if (!moveAnimationBy(-horizontalDelta * 1.35)) brandTrack.scrollLeft += horizontalDelta;
    resumeAfterInteraction();
  }, { passive: false });
  brandTrack.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    brandDragging = true;
    brandMoved = false;
    brandPointerId = event.pointerId;
    brandTrack.classList.add("is-interacting", "is-dragging");
    brandStartX = event.clientX;
    brandStartScroll = brandTrack.scrollLeft;
    pauseForInteraction();
    brandTrack.setPointerCapture?.(event.pointerId);
  });
  brandTrack.addEventListener("pointermove", (event) => {
    if (!brandDragging) return;
    const delta = event.clientX - brandStartX;
    if (Math.abs(delta) > 5) {
      brandMoved = true;
      event.preventDefault();
    }
    if (!moveAnimationBy(delta, brandAnimationStartTime)) brandTrack.scrollLeft = brandStartScroll - delta;
  });
  const stopBrandDrag = (event) => {
    if (!brandDragging) return;
    brandDragging = false;
    if (brandPointerId != null && brandTrack.hasPointerCapture?.(brandPointerId)) {
      brandTrack.releasePointerCapture?.(brandPointerId);
    }
    brandPointerId = null;
    resumeAfterInteraction();
  };
  brandTrack.addEventListener("pointerup", stopBrandDrag);
  brandTrack.addEventListener("pointercancel", stopBrandDrag);
  brandTrack.addEventListener("lostpointercapture", stopBrandDrag);
  brandTrack.addEventListener("click", (event) => {
    if (brandMoved) {
      event.preventDefault();
      event.stopPropagation();
      brandMoved = false;
      return;
    }
    const selected = event.target.closest(".marquee-item");
    if (!selected) return;
    brandTrack.querySelectorAll(".marquee-item.is-selected").forEach((item) => item.classList.remove("is-selected"));
    selected.classList.add("is-selected");
    window.setTimeout(() => selected.classList.remove("is-selected"), 850);
  }, true);
}

function bindHorizontalRail(rail) {
  if (!rail || rail.dataset.railBound === "true") return;
  rail.dataset.railBound = "true";
  const blockedStart = "button:not(.product-card-media-link),a,input,select,textarea,details,[data-inner-horizontal-scroll]";
  let candidate = false;
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let startScroll = 0;
  let pointerId = null;
  let pointerType = "";
  let suppressClickUntil = 0;
  let scrollSettleTimer = 0;
  const settleScroll = () => {
    clearTimeout(scrollSettleTimer);
    scrollSettleTimer = window.setTimeout(() => rail.classList.remove("is-scrolling"), 150);
  };
  rail.addEventListener("scroll", () => {
    rail.classList.add("is-scrolling");
    settleScroll();
  }, { passive: true });
  if ("onscrollend" in window) rail.addEventListener("scrollend", () => {
    clearTimeout(scrollSettleTimer);
    rail.classList.remove("is-scrolling");
  }, { passive: true });
  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    // A fresh physical press is intentional; only a click emitted without a
    // new pointerdown belongs to the preceding drag gesture.
    suppressClickUntil = 0;
    if (event.target.closest(blockedStart)) return;
    candidate = true;
    dragging = false;
    moved = false;
    startX = event.clientX;
    startY = event.clientY;
    startScroll = rail.scrollLeft;
    pointerId = event.pointerId;
    pointerType = event.pointerType;
  });
  rail.addEventListener("pointermove", (event) => {
    if (!candidate || event.pointerId !== pointerId) return;
    const delta = event.clientX - startX;
    const verticalDelta = event.clientY - startY;
    if (!dragging) {
      if (Math.max(Math.abs(delta), Math.abs(verticalDelta)) < 8) return;
      if (Math.abs(verticalDelta) >= Math.abs(delta) * 1.15) {
        candidate = false;
        return;
      }
      dragging = true;
      moved = true;
      rail.classList.add("is-dragging");
      if (pointerType !== "touch") rail.setPointerCapture?.(event.pointerId);
    }
    if (pointerType !== "touch") rail.scrollLeft = startScroll - delta;
  });
  const finish = () => {
    if (!candidate && !dragging && pointerId == null) return;
    const activePointerId = pointerId;
    const shouldSuppressClick = moved;
    candidate = false;
    dragging = false;
    rail.classList.remove("is-dragging");
    pointerId = null;
    if (activePointerId != null && rail.hasPointerCapture?.(activePointerId)) rail.releasePointerCapture?.(activePointerId);
    suppressClickUntil = shouldSuppressClick ? performance.now() + 450 : suppressClickUntil;
    moved = false;
    settleScroll();
  };
  rail.addEventListener("pointerup", finish);
  rail.addEventListener("pointercancel", finish);
  rail.addEventListener("lostpointercapture", finish);
  rail.addEventListener("click", (event) => {
    if (performance.now() > suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickUntil = 0;
  }, true);
}

$$("[data-brand-marquee], [data-benefit-marquee]").forEach(bindBrandMarquee);
$$('[data-horizontal-rail]').forEach(bindHorizontalRail);

const backToTopButton = $("#back-to-top");
if (backToTopButton) {
  const updateBackToTop = () => backToTopButton.classList.toggle("visible", window.scrollY > 420);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  backToTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateBackToTop();
}

window.ORIGOStore = {
  api,
  get state() { return state; },
  getProduct,
  formatPrice,
  renderCart,
  persist,
  showToast,
  openAccount,
  closeOverlay,
  closeDrawers,
  toggleCart,
  addToCart,
  toggleWishlist,
  showProductDetails,
  getFragranceFinderSettings() {
    return structuredClone(mergeStoreSettings(state.adminWorkspace.settings || {}).fragranceFinder);
  },
  escapeHTML
};
checkoutFormMarkup = $("#checkout-overlay .checkout-grid").innerHTML;
setupTheme();
updateLanguage();
renderSiteFooter();
const footerYear = $("#footer-year");
if (footerYear) footerYear.textContent = String(new Date().getFullYear());
handleBenefitRoute({ replace: true });
handleBenefitsRoute({ replace: true });
handleNotesRoute({ replace: true });
handleBrandsRoute({ replace: true });
handleCatalogRoute({ replace: true });
observeReveals();
hydrateServer();
