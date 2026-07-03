const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const translations = {
  ar: {
    announcement: "توصيل مجاني للطلبات فوق 1,500 ج.م · عيّنة مجانية مع كل طلب",
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
    navBrands: "البراندات",
    featuredBrands: "براندات مختارة",
    account: "الحساب",
    language: "English",
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
    bestSellers: "الأكثر حضورًا",
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
    addToBag: "أضف إلى الحقيبة",
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
    bag: "الحقيبة",
    smartSearch: "بحث ORIGO الذكي",
    searchPrompt: "عمّ تبحث اليوم؟",
    searchPlaceholder: "اسم العطر، البراند، أو نوتة…",
    popularSearches: "الأكثر بحثًا",
    viewAllResults: "عرض كل النتائج",
    yourSelection: "اختياراتك",
    subtotal: "المجموع",
    checkout: "إتمام الطلب",
    shippingCalculated: "الشحن والخصم يُحسبان في الخطوة التالية.",
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
    increaseQuantity: "زيادة الكمية"
  },
  en: {
    announcement: "Free delivery over EGP 1,500 · A complimentary sample with every order",
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
    bestSellers: "Most magnetic",
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
    addToBag: "Add to bag",
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
    bag: "Bag",
    smartSearch: "ORIGO SMART SEARCH",
    searchPrompt: "What are you looking for?",
    searchPlaceholder: "Perfume, brand, or note…",
    popularSearches: "Popular",
    viewAllResults: "View all results",
    yourSelection: "YOUR SELECTION",
    subtotal: "Subtotal",
    checkout: "Checkout",
    shippingCalculated: "Shipping and discounts are calculated next.",
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
    increaseQuantity: "Increase quantity"
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
    image: product.images?.find((image) => image.selected)?.url || product.images?.[0]?.url || product.image || "assets/origo-hero.png"
  };
}

const storedCatalogProducts = readStoredArray("origoCatalogProducts");
const legacyCustomProducts = readStoredArray("origoCustomProducts").map((product) => ({
  ...product,
  status: product.status || "published",
  category: product.category || "perfume"
}));
const initialCatalogProducts = storedCatalogProducts.length ? storedCatalogProducts : legacyCustomProducts;

const state = {
  lang: localStorage.getItem("origoLang") || "ar",
  theme: localStorage.getItem("origoTheme") || "light",
  currency: localStorage.getItem("origoCurrency") || "EGP",
  cart: readStoredArray("origoCart"),
  wishlist: readStoredArray("origoWishlist"),
  productRatings: readStoredObject("origoProductRatings"),
  selectedNotes: [],
  catalogProducts: initialCatalogProducts,
  products: [...baseProducts, ...initialCatalogProducts.filter((product) => product.status === "published").map(toStorefrontProduct)],
  webResults: [],
  activeProductId: null,
  activeImportDraft: null,
  adminSuggestions: [],
  adminSearchController: null,
  globalSearchQuery: "",
  storefrontSearchQuery: "",
  storefrontCategory: "all"
};

const currencyConfig = {
  EGP: { rate: 1, currency: "EGP" },
  USD: { rate: 0.02, currency: "USD" },
  SAR: { rate: 0.075, currency: "SAR" }
};

const formatPrice = (value) => {
  const config = currencyConfig[state.currency] || currencyConfig.EGP;
  return new Intl.NumberFormat(state.lang === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: state.currency === "EGP" ? 0 : 2,
    maximumFractionDigits: state.currency === "EGP" ? 0 : 2
  }).format(Number(value || 0) * config.rate);
};

function rebuildStorefrontProducts() {
  state.products = [
    ...baseProducts,
    ...state.catalogProducts.filter((product) => product.status === "published").map(toStorefrontProduct)
  ];
}

function persist() {
  localStorage.setItem("origoCart", JSON.stringify(state.cart));
  localStorage.setItem("origoWishlist", JSON.stringify(state.wishlist));
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
  $("[data-action='language']").textContent = isArabic ? "EN" : "ع";
  $("#current-currency").textContent = state.currency;
  document.title = isArabic ? "ORIGO | أصل الحكاية العطرية" : "ORIGO | The origin of scent";
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderCart();
  renderWishlist();
  renderCatalogList();
  refreshAIStatus();
  if (state.globalSearchQuery) renderSearchSuggestions(state.globalSearchQuery);
  if ($("#product-overlay").classList.contains("open") && state.activeProductId) {
    showProductDetails(getProduct(state.activeProductId), false);
  }
  localStorage.setItem("origoLang", state.lang);
}

function setupTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");
  localStorage.setItem("origoTheme", state.theme);
}

function renderProducts(filter = "all") {
  const grid = $("#product-grid");
  const template = $("#product-template");
  const search = ORIGOCatalog.normalize(state.storefrontSearchQuery);
  const visibleProducts = state.products
    .filter((product) => filter === "all" || product.type === filter)
    .filter((product) => state.storefrontCategory === "all" || product.category === state.storefrontCategory)
    .filter((product) => !search || ORIGOCatalog.normalize([
      product.nameAr,
      product.nameEn,
      product.brand,
      ...(product.notesAr || []),
      ...(product.notesEn || [])
    ].join(" ")).includes(search));
  grid.innerHTML = "";
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
  visibleProducts.forEach((product, index) => {
      const fragment = template.content.cloneNode(true);
      const card = $(".product-card", fragment);
      card.dataset.id = product.id;
      card.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
      $(".product-badge", card).textContent = state.lang === "ar" ? product.badgeAr || "" : product.badgeEn || product.badgeAr || "";
      const image = $("img", card);
      image.src = product.image || "assets/origo-hero.png";
      image.alt = `${product.brand} ${product.nameEn || product.nameAr}`;
      image.addEventListener("error", () => {
        image.src = "assets/origo-hero.png";
        image.style.objectPosition = "24% center";
      }, { once: true });
      $(".heart-button", card).classList.toggle("active", state.wishlist.includes(product.id));
      $(".heart-button", card).textContent = state.wishlist.includes(product.id) ? "♥" : "♡";
      $(".heart-button", card).setAttribute(
        "aria-label",
        state.lang === "ar"
          ? (state.wishlist.includes(product.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة")
          : (state.wishlist.includes(product.id) ? "Remove from favorites" : "Add to favorites")
      );
      $(".quick-view span", card).textContent = translations[state.lang].quickView;
      $(".product-brand", card).textContent = product.brand;
      $(".product-info h3", card).textContent = state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr;
      $(".product-notes", card).textContent = (state.lang === "ar" ? product.notesAr : product.notesEn || product.notesAr).join(" · ");
      $(".product-price", card).textContent = formatPrice(product.price);
      $("del", card).textContent = product.oldPrice ? formatPrice(product.oldPrice) : "";
      const addButton = $("[data-action='add-to-cart']", card);
      addButton.setAttribute("aria-label", translations[state.lang].addToBag);
      $("span", addButton).textContent = translations[state.lang].addToBag;
      grid.append(fragment);
  });
  observeReveals();
}

function getProduct(id) {
  return state.products.find((product) => product.id === id);
}

function addToCart(product) {
  if (!product) return;
  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: product.id, quantity: 1 });
  persist();
  renderCart();
  showToast(state.lang === "ar" ? `تمت إضافة ${product.nameAr} إلى الحقيبة` : `${product.nameEn || product.nameAr} added to bag`);
}

function changeCartQuantity(productId, change) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += change;
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
      <img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="" />
      <div>
        <h3>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</h3>
        <p>${escapeHTML(product.brand)} · 75 ML</p>
        <div class="quantity-control" aria-label="${state.lang === "ar" ? "الكمية" : "Quantity"}">
          <button data-action="decrease-cart" data-id="${escapeHTML(product.id)}" aria-label="${translations[state.lang].decreaseQuantity}">−</button>
          <span>${item.quantity}</span>
          <button data-action="increase-cart" data-id="${escapeHTML(product.id)}" aria-label="${translations[state.lang].increaseQuantity}">＋</button>
        </div>
        <b>${formatPrice(product.price * item.quantity)}</b>
      </div>
      <button class="remove-item" data-action="remove-cart" data-id="${escapeHTML(product.id)}" aria-label="${state.lang === "ar" ? "إزالة" : "Remove"}">×</button>`;
    $("img", row).addEventListener("error", (event) => (event.currentTarget.src = "assets/origo-hero.png"), { once: true });
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
  container.innerHTML = products.map((product) => `
    <article class="wishlist-item">
      <button class="wishlist-preview" data-action="wishlist-view" data-id="${escapeHTML(product.id)}" aria-label="${translations[state.lang].quickView}">
        <img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="" />
      </button>
      <div>
        <small>${escapeHTML(product.brand)}</small>
        <h3>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</h3>
        <p>${escapeHTML((state.lang === "ar" ? product.notesAr : product.notesEn || product.notesAr).join(" · "))}</p>
        <b>${formatPrice(product.price)}</b>
        <button class="wishlist-add" data-action="wishlist-add" data-id="${escapeHTML(product.id)}">${translations[state.lang].addToBag} <span>＋</span></button>
      </div>
      <button class="remove-item" data-action="wishlist-remove" data-id="${escapeHTML(product.id)}" aria-label="${translations[state.lang].removeFavorite}">×</button>
    </article>
  `).join("");
  $$("img", container).forEach((image) => {
    image.addEventListener("error", () => (image.src = "assets/origo-hero.png"), { once: true });
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

function showProductDetails(product, shouldOpen = true) {
  if (!product) return;
  state.activeProductId = product.id;
  const name = state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr;
  const notes = (state.lang === "ar" ? product.notesAr : product.notesEn || product.notesAr) || [];
  const sourcedDescription = state.lang === "ar"
    ? product.descriptionAr || product.description
    : product.descriptionEn || product.description;
  const description = sourcedDescription
    ? String(sourcedDescription).slice(0, 520)
    : (state.lang === "ar"
      ? `تركيبة ${product.type || "للجنسين"} تجمع ${notes.join("، ")} في بصمة متوازنة وواضحة.`
      : `A ${product.typeEn || "unisex"} composition built around ${notes.join(", ")} with a balanced, distinctive trail.`);
  const isSaved = state.wishlist.includes(product.id);
  $("#product-dialog-content").innerHTML = `
    <div class="product-dialog-grid">
      <div class="product-dialog-image">
        <span>${escapeHTML(state.lang === "ar" ? product.badgeAr || "" : product.badgeEn || product.badgeAr || "")}</span>
        <img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="${escapeHTML(`${product.brand} ${name}`)}" />
      </div>
      <div class="product-dialog-copy">
        <span class="eyebrow">${translations[state.lang].fragranceDetails}</span>
        <small>${escapeHTML(product.brand)}</small>
        <h2 id="product-dialog-title">${escapeHTML(name)}</h2>
        <p class="product-dialog-notes">${escapeHTML(notes.join(" · "))}</p>
        <p class="product-dialog-description">${escapeHTML(description)}</p>
        <div class="product-dialog-meta">
          <span><small>${state.lang === "ar" ? "النوع" : "TYPE"}</small><b>${escapeHTML(state.lang === "ar" ? product.type : product.typeEn || product.type)}</b></span>
          <span><small>${state.lang === "ar" ? "الحجم" : "SIZE"}</small><b>75 ML</b></span>
        </div>
        <div class="product-dialog-price"><b>${formatPrice(product.price)}</b>${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ""}</div>
        <div class="product-dialog-actions">
          <button class="button burgundy-button" data-action="quick-view-add" data-id="${escapeHTML(product.id)}">${translations[state.lang].addToBag} <span>＋</span></button>
          <button class="dialog-wishlist${isSaved ? " active" : ""}" data-action="quick-view-wishlist" data-id="${escapeHTML(product.id)}" aria-label="${isSaved ? translations[state.lang].removeFavorite : translations[state.lang].favorites}">${isSaved ? "♥" : "♡"}</button>
        </div>
      </div>
    </div>
    ${renderPerfumeInsights(product)}`;
  const image = $("#product-dialog-content img");
  image.addEventListener("error", () => (image.src = "assets/origo-hero.png"), { once: true });
  if (shouldOpen) openOverlay("#product-overlay");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i>✓</i><span>${escapeHTML(message)}</span>`;
  $("#toast-region").append(toast);
  setTimeout(() => toast.remove(), 3200);
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
  document.body.classList.toggle("locked", Boolean($(".overlay.open, .drawer.open, .mobile-menu-panel.open")));
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
  container.innerHTML = results.slice(0, 5).map((product) => `
    <button class="search-result product-search-result" data-action="search-result" data-id="${escapeHTML(product.id)}">
      <img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="" />
      <span>
        <small>${escapeHTML(product.brand)}</small>
        <b>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</b>
        <i>${escapeHTML((state.lang === "ar" ? product.notesAr : product.notesEn || product.notesAr).join(" · "))}</i>
      </span>
      <strong>${formatPrice(product.price)}</strong>
    </button>
  `).join("");
  viewAll.hidden = false;
}

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index >= 0) state.wishlist.splice(index, 1);
  else state.wishlist.push(productId);
  persist();
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderWishlist();
  if ($("#product-overlay").classList.contains("open") && state.activeProductId === productId) {
    showProductDetails(getProduct(productId), false);
  }
  showToast(
    state.lang === "ar"
      ? index >= 0 ? "تمت إزالة العطر من المفضلة" : "تم حفظ العطر في المفضلة"
      : index >= 0 ? "Removed from favorites" : "Saved to favorites"
  );
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
  if (!state.selectedNotes.length) {
    showToast(state.lang === "ar" ? "اختر نوتة واحدة على الأقل" : "Choose at least one note");
    return;
  }
  const matched = state.products
    .map((product) => ({
      ...product,
      score: product.notesAr.filter((note) => state.selectedNotes.some((selected) => note.includes(selected) || selected.includes(note))).length
    }))
    .sort((a, b) => b.score - a.score)[0];
  showToast(
    state.lang === "ar"
      ? `أفضل تطابق: ${matched.nameAr} — ${Math.min(96, 72 + matched.score * 8)}%`
      : `Best match: ${matched.nameEn || matched.nameAr} — ${Math.min(96, 72 + matched.score * 8)}%`
  );
  $("#featured").scrollIntoView({ behavior: "smooth" });
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
const csvValues = (value) => String(value || "").split(/[,،]/).map((item) => item.trim()).filter(Boolean);

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
    <p>${adminCopy("ستظهر اقتراحات مباشرة، ثم نجمع البيانات ونوضح مصدر كل معلومة ونسبة الثقة.", "Live suggestions appear first, then we collect data and show sources and confidence.")}</p></div>`;
  $$(".import-steps span").forEach((step, index) => step.classList.toggle("active", index === 0));
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

function selectOptions(options, selected) {
  return options.map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`).join("");
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
    return sameName && (!brand || !itemBrand || brand === itemBrand);
  });
}

function renderImportReview(product) {
  const level = product.confidence?.level || "incomplete";
  const missing = product.confidence?.missing || [];
  const images = product.images || [];
  $("#import-workspace").innerHTML = `
    <form class="catalog-review" id="import-review-form">
      <div class="review-summary">
        <div class="confidence-card ${level}"><span>◉</span><div><small>${adminCopy("ثقة البيانات", "DATA CONFIDENCE")}</small><b>${confidenceLabel(level)} · ${product.confidence?.score || 0}%</b></div></div>
        <div class="missing-card"><b>${missing.length}</b><span>${adminCopy("حقول ما زالت ناقصة ولن نملأها بتخمينات", "fields remain empty and will not be guessed")}</span></div>
        <div class="duplicate-alert" id="duplicate-alert" hidden></div>
      </div>

      <section class="review-section">
        <div class="review-section-head"><span>01</span><div><b>${adminCopy("هوية المنتج", "Product identity")}</b><small>${adminCopy("العربية والإنجليزية محفوظتان في حقول منفصلة", "Arabic and English are stored separately")}</small></div></div>
        <div class="review-grid">
          <label>${adminCopy("الاسم بالعربية", "Arabic name")}<input name="nameAr" dir="rtl" value="${escapeHTML(product.nameAr)}" /></label>
          <label>${adminCopy("الاسم بالإنجليزية", "English name")}<input name="nameEn" dir="ltr" value="${escapeHTML(product.nameEn)}" /></label>
          <label>${adminCopy("البراند", "Brand")}<input name="brand" value="${escapeHTML(product.brand)}" /></label>
          <label>${adminCopy("نوع المنتج", "Product type")}<select name="category">${selectOptions([
            ["", adminCopy("غير محدد", "Not set")], ["perfume", adminCopy("عطر", "Perfume")], ["skincare", adminCopy("عناية بالبشرة", "Skin care")],
            ["haircare", adminCopy("عناية بالشعر", "Hair care")], ["incense", adminCopy("بخور / مبخرة", "Incense / burner")],
            ["deodorant", adminCopy("مزيل عرق", "Deodorant")], ["other", adminCopy("غيره", "Other")]
          ], product.category)}</select></label>
          <label>${adminCopy("الجنس المستهدف", "Target gender")}<select name="gender">${selectOptions([
            ["", adminCopy("غير محدد", "Not set")], ["men", adminCopy("رجالي", "Men")], ["women", adminCopy("نسائي", "Women")], ["unisex", adminCopy("للجنسين", "Unisex")]
          ], product.gender)}</select></label>
          <label>${adminCopy("التركيز", "Concentration")}<select name="concentration">${selectOptions([
            ["", adminCopy("غير محدد", "Not set")], ["EDP", "EDP"], ["EDT", "EDT"], ["Parfum", "Parfum"], ["Extrait", "Extrait"], ["Body Mist", "Body Mist"]
          ], product.concentration)}</select></label>
          <label>${adminCopy("الحالة", "Status")}<select name="status">${selectOptions([
            ["draft", adminCopy("مسودة — لا يظهر في المتجر", "Draft — hidden from store")],
            ["published", adminCopy("منشور — يظهر في المتجر", "Published — visible in store")],
            ["unavailable", adminCopy("غير متوفر", "Unavailable")]
          ], product.status || "draft")}</select></label>
          <label>${adminCopy("السعر الأساسي (ج.م)", "Base price (EGP)")}<input name="price" type="number" min="0" value="${escapeHTML(product.price)}" /></label>
        </div>
      </section>

      <section class="review-section">
        <div class="review-section-head"><span>02</span><div><b>${adminCopy("التصنيف والبيانات التجارية", "Classification & commerce")}</b></div></div>
        <div class="review-grid">
          <label>${adminCopy("الأحجام المتاحة", "Available sizes")}<input name="sizes" value="${escapeHTML(csv(product.sizes))}" placeholder="50 ML, 75 ML, 100 ML" /></label>
          <label>${adminCopy("العائلة العطرية — عربي", "Fragrance family — Arabic")}<input name="familyAr" dir="rtl" value="${escapeHTML(product.familyAr)}" /></label>
          <label>${adminCopy("العائلة العطرية — English", "Fragrance family — English")}<input name="familyEn" dir="ltr" value="${escapeHTML(product.familyEn)}" /></label>
          <label>${adminCopy("المواسم", "Seasons")}<input name="seasons" value="${escapeHTML(csv(product.seasons))}" placeholder="${adminCopy("شتاء، خريف", "Winter, Autumn")}" /></label>
          <label>${adminCopy("وقت الاستخدام", "Usage time")}<input name="usageTimes" value="${escapeHTML(csv(product.usageTimes))}" placeholder="${adminCopy("مسائي، مناسبات", "Evening, occasions")}" /></label>
          <label>${adminCopy("بلد المنشأ — عربي", "Origin country — Arabic")}<input name="originCountryAr" dir="rtl" value="${escapeHTML(product.originCountryAr)}" /></label>
          <label>${adminCopy("بلد المنشأ — English", "Origin country — English")}<input name="originCountryEn" dir="ltr" value="${escapeHTML(product.originCountryEn)}" /></label>
          <label>SKU<input name="sku" dir="ltr" value="${escapeHTML(product.sku)}" /></label>
          <label>${adminCopy("الباركود / GTIN", "Barcode / GTIN")}<input name="barcode" dir="ltr" value="${escapeHTML(product.barcode)}" /></label>
        </div>
      </section>

      <section class="review-section">
        <div class="review-section-head"><span>03</span><div><b>${adminCopy("النوتات العطرية", "Fragrance notes")}</b><small>${adminCopy("كل مستوى واللغة في حقل مستقل", "Each level and language has its own field")}</small></div></div>
        <div class="review-grid note-review-grid">
          ${["top", "heart", "base"].map((level) => `
            <label>${level === "top" ? adminCopy("المقدمة — عربي", "Top — Arabic") : level === "heart" ? adminCopy("القلب — عربي", "Heart — Arabic") : adminCopy("القاعدة — عربي", "Base — Arabic")}<input name="${level}Ar" dir="rtl" value="${escapeHTML(csv(product.notes[`${level}Ar`]))}" /></label>
            <label>${level === "top" ? "Top — English" : level === "heart" ? "Heart — English" : "Base — English"}<input name="${level}En" dir="ltr" value="${escapeHTML(csv(product.notes[`${level}En`]))}" /></label>`).join("")}
        </div>
      </section>

      <section class="review-section">
        <div class="review-section-head"><span>04</span><div><b>${adminCopy("الوصف والصور", "Descriptions & images")}</b></div></div>
        <div class="review-grid description-grid">
          <label>${adminCopy("الوصف بالعربية", "Arabic description")}<textarea name="descriptionAr" dir="rtl">${escapeHTML(product.descriptionAr)}</textarea></label>
          <label>${adminCopy("الوصف بالإنجليزية", "English description")}<textarea name="descriptionEn" dir="ltr">${escapeHTML(product.descriptionEn)}</textarea></label>
        </div>
        <label class="image-url-field">${adminCopy("رابط صورة إضافي", "Additional image URL")}<input name="imageUrl" dir="ltr" placeholder="https://..." /></label>
        <label class="image-url-field">${adminCopy("رابط مرجع Fragrantica أو مصدر آخر", "Fragrantica or other reference URL")}<input name="manualSourceUrl" dir="ltr" value="${escapeHTML(product.manualSourceUrl || "")}" placeholder="https://www.fragrantica.com/perfume/..." /></label>
        <label class="gallery-upload">
          <input id="gallery-upload" type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple />
          <span>＋</span>
          <div><b>${adminCopy("إضافة صور من المعرض", "Add images from gallery")}</b><small>${adminCopy("يمكن اختيار عدة صور · JPEG / PNG / WEBP", "Select multiple images · JPEG / PNG / WEBP")}</small></div>
        </label>
        <div class="review-images">
          ${images.length ? images.map((image, index) => `
            <label class="review-image${image.selected || index === 0 ? " selected" : ""}">
              <input type="radio" name="selectedImage" value="${index}"${image.selected || index === 0 ? " checked" : ""} />
              <img src="${escapeHTML(image.url)}" alt="" />
              <span>${escapeHTML(image.provider || "Source")}</span>
            </label>`).join("") : `<div class="no-images">${adminCopy("لا توجد صور؛ أضف رابطًا يدويًا.", "No images found; add a URL manually.")}</div>`}
        </div>
      </section>

      <section class="review-section source-log-section">
        <div class="review-section-head"><span>05</span><div><b>${adminCopy("سجل المصادر", "Source log")}</b><small>${adminCopy("ما الذي جاء من أين؟", "What came from where?")}</small></div></div>
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
        <div><b>${adminCopy("لن يتم الحفظ قبل ضغطك على الزر", "Nothing is saved until you press the button")}</b><small>${adminCopy("الحالة الافتراضية مسودة وغير منشورة.", "The default status is draft and unpublished.")}</small></div>
        <button class="button burgundy-button" type="submit">${adminCopy("إضافة المنتج للمتجر", "Add product to store")} <span>←</span></button>
      </div>
    </form>`;
  $$(".import-steps span").forEach((step, index) => step.classList.toggle("active", index <= 1));
  $$("img", $("#import-workspace")).forEach((image) => image.addEventListener("error", () => image.closest(".review-image")?.classList.add("broken"), { once: true }));
  updateDuplicateWarning($("#import-review-form"));
}

function collectReviewProduct(form) {
  const data = new FormData(form);
  const base = state.activeImportDraft || ORIGOCatalog.emptyProduct();
  const images = [...(base.images || [])].map((image, index) => ({ ...image, selected: String(index) === String(data.get("selectedImage")) }));
  if (String(data.get("imageUrl") || "").trim()) images.unshift({ url: String(data.get("imageUrl")).trim(), provider: "Manager", selected: true });
  const product = {
    ...base,
    id: base.id || `catalog-${Date.now()}`,
    nameAr: String(data.get("nameAr") || "").trim(),
    nameEn: String(data.get("nameEn") || "").trim(),
    brand: String(data.get("brand") || "").trim(),
    category: String(data.get("category") || ""),
    gender: String(data.get("gender") || ""),
    concentration: String(data.get("concentration") || ""),
    status: String(data.get("status") || "draft"),
    price: Number(data.get("price") || 0),
    sizes: csvValues(data.get("sizes")),
    familyAr: String(data.get("familyAr") || "").trim(),
    familyEn: String(data.get("familyEn") || "").trim(),
    seasons: csvValues(data.get("seasons")),
    usageTimes: csvValues(data.get("usageTimes")),
    originCountryAr: String(data.get("originCountryAr") || "").trim(),
    originCountryEn: String(data.get("originCountryEn") || "").trim(),
    sku: String(data.get("sku") || "").trim(),
    barcode: String(data.get("barcode") || "").trim(),
    descriptionAr: String(data.get("descriptionAr") || "").trim(),
    descriptionEn: String(data.get("descriptionEn") || "").trim(),
    manualSourceUrl: String(data.get("manualSourceUrl") || "").trim(),
    images,
    notes: {
      topAr: csvValues(data.get("topAr")), topEn: csvValues(data.get("topEn")),
      heartAr: csvValues(data.get("heartAr")), heartEn: csvValues(data.get("heartEn")),
      baseAr: csvValues(data.get("baseAr")), baseEn: csvValues(data.get("baseEn"))
    }
  };
  if (product.category === "perfume") {
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
  if (!file.type.startsWith("image/")) throw new Error("unsupported-image");
  if (file.size > 10 * 1024 * 1024) throw new Error("image-too-large");
  const source = await fileAsDataURL(file);
  const image = await new Promise((resolve, reject) => {
    const preview = new Image();
    preview.onload = () => resolve(preview);
    preview.onerror = reject;
    preview.src = source;
  });
  const maxSide = 1400;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/webp", .82);
}

async function handleGalleryUpload(input) {
  const files = [...input.files].slice(0, 8);
  if (!files.length) return;
  const form = input.closest("#import-review-form");
  const draft = collectReviewProduct(form);
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

function updateDuplicateWarning(form) {
  if (!form) return null;
  const product = collectReviewProduct(form);
  const duplicate = findDuplicate(product, product.id);
  const alert = $("#duplicate-alert");
  alert.hidden = !duplicate;
  if (duplicate) alert.innerHTML = `<b>${adminCopy("منتج مشابه موجود مسبقًا", "Possible duplicate found")}</b><span>${escapeHTML(duplicate.brand)} · ${escapeHTML(duplicate.nameEn || duplicate.nameAr)}${duplicate.sku ? ` · SKU ${escapeHTML(duplicate.sku)}` : ""}</span>`;
  return duplicate;
}

function saveCatalogProduct(form) {
  const product = collectReviewProduct(form);
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
  product.updatedAt = new Date().toISOString();
  product.createdAt = product.createdAt || product.updatedAt;
  const existingIndex = state.catalogProducts.findIndex((item) => item.id === product.id);
  if (existingIndex >= 0) state.catalogProducts.splice(existingIndex, 1, product);
  else state.catalogProducts.unshift(product);
  try {
    localStorage.setItem("origoCatalogProducts", JSON.stringify(state.catalogProducts));
  } catch (error) {
    showToast(adminCopy("مساحة المتصفح لا تكفي؛ قلّل عدد الصور أو حجمها", "Browser storage is full; remove or reduce images"));
    if (existingIndex >= 0) state.catalogProducts.splice(existingIndex, 1, state.activeImportDraft);
    else state.catalogProducts.shift();
    return;
  }
  rebuildStorefrontProducts();
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderCatalogList();
  $$(".import-steps span").forEach((step) => step.classList.add("active"));
  $("#import-workspace").innerHTML = `
    <div class="import-success"><span>✓</span><h3>${adminCopy("تمت إضافة المنتج إلى لوحة المنتجات", "Product added to the product panel")}</h3>
    <p>${product.status === "published" ? adminCopy("اخترت حالة منشور، لذلك أصبح ظاهرًا في المتجر.", "You selected Published, so it is now visible in the store.") : adminCopy("حُفظ كمسودة ولن يظهر للعميل حتى تغيّر حالته إلى منشور.", "Saved as a draft and hidden until you change its status to Published.")}</p>
    <div><button class="button secondary-button" data-action="edit-catalog-product" data-id="${escapeHTML(product.id)}">${adminCopy("مراجعة المنتج", "Review product")}</button><button class="button burgundy-button" data-action="new-product">${adminCopy("إضافة منتج آخر", "Add another product")}</button></div></div>`;
  showToast(adminCopy("تم حفظ المنتج بنجاح", "Product saved successfully"));
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
    const image = product.images?.find((item) => item.selected)?.url || product.images?.[0]?.url || "assets/origo-hero.png";
    return `<button class="catalog-list-item" data-action="edit-catalog-product" data-id="${escapeHTML(product.id)}">
      <img src="${escapeHTML(image)}" alt="" /><span><small>${escapeHTML(product.brand || adminCopy("بدون براند", "No brand"))}</small><b>${escapeHTML(state.lang === "ar" ? product.nameAr || product.nameEn : product.nameEn || product.nameAr)}</b><i class="${escapeHTML(product.status)}">${statusLabel(product.status)}</i></span><strong>→</strong>
    </button>`;
  }).join("");
}

let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
  }
  $$(".reveal:not(.visible)").forEach((element) => revealObserver.observe(element));
}

document.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;
  const action = actionElement.dataset.action;

  if (action === "search") openOverlay("#search-overlay");
  if (action === "admin") {
    renderCatalogList();
    refreshAIStatus();
    openOverlay("#admin-overlay");
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
  if (action === "brands-menu") {
    const menu = actionElement.closest(".brands-nav");
    menu.classList.toggle("open");
    actionElement.setAttribute("aria-expanded", String(menu.classList.contains("open")));
  }
  if (action === "brand-search") {
    const query = actionElement.dataset.query || "";
    toggleMobileMenu(false);
    $(".brands-nav")?.classList.remove("open");
    openOverlay("#search-overlay");
    $("#global-search-input").value = query;
    renderSearchSuggestions(query);
  }
  if (action === "account") showToast(adminCopy("تسجيل الدخول جاهز للربط بنظام الحسابات", "Sign-in is ready for account integration"));
  if (action === "cart") toggleCart(true);
  if (action === "wishlist") toggleWishlistDrawer(true);
  if (action === "close-drawer") {
    const drawer = actionElement.closest(".drawer");
    if (drawer) toggleDrawer(`#${drawer.id}`, false);
  }
  if (action === "close-wishlist") toggleWishlistDrawer(false);
  if (action === "close-overlay") closeOverlay(actionElement.closest(".overlay"));
  if (action === "theme") {
    state.theme = state.theme === "light" ? "dark" : "light";
    setupTheme();
  }
  if (action === "language") {
    state.lang = state.lang === "ar" ? "en" : "ar";
    updateLanguage();
  }
  if (action === "toggle-wishlist") {
    toggleWishlist(actionElement.closest(".product-card").dataset.id);
  }
  if (action === "add-to-cart") {
    addToCart(getProduct(actionElement.closest(".product-card").dataset.id));
  }
  if (action === "quick-view") {
    const product = getProduct(actionElement.closest(".product-card").dataset.id);
    showProductDetails(product);
  }
  if (action === "quick-add") {
    addToCart(getProduct(actionElement.dataset.product));
  }
  if (action === "quick-view-add") {
    addToCart(getProduct(actionElement.dataset.id));
  }
  if (action === "quick-view-wishlist") {
    toggleWishlist(actionElement.dataset.id);
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
    showToast(state.lang === "ar" ? "نموذج الدفع جاهز للربط ببوابة الدفع" : "Checkout is ready for payment integration");
  }
  if (action === "clear-notes") {
    state.selectedNotes = [];
    $$(".note-bubble").forEach((button) => button.classList.remove("selected"));
    $("#selected-count").textContent = "0/4";
    $("#match-count").textContent = "24";
  }
  if (action === "find-matches") showFinderMatches();
  if (action === "alternative-search") runAlternativeSearch();
  if (action === "search-result") {
    const product = getProduct(actionElement.dataset.id);
    closeOverlay($("#search-overlay"));
    showProductDetails(product);
  }
  if (action === "view-all-search") {
    state.storefrontSearchQuery = state.globalSearchQuery;
    state.storefrontCategory = "all";
    closeOverlay($("#search-overlay"));
    renderProducts("all");
    $("#featured").scrollIntoView({ behavior: "smooth" });
  }
  if (action === "clear-product-search") {
    state.storefrontSearchQuery = "";
    state.storefrontCategory = "all";
    renderProducts("all");
  }
  if (action === "catalog-category") {
    state.storefrontCategory = actionElement.dataset.category || "all";
    state.storefrontSearchQuery = "";
    $$(".category-nav [data-category]").forEach((link) => link.classList.toggle("active", link === actionElement));
    renderProducts("all");
  }
  if (action === "select-admin-suggestion") {
    const selection = state.adminSuggestions[Number(actionElement.dataset.index)];
    if (selection) loadImportDraft(selection).catch(() => {
      $("#import-workspace").innerHTML = `<div class="import-empty"><span>!</span><h3>${adminCopy("تعذر جلب البيانات", "Could not fetch product data")}</h3><p>${adminCopy("جرّب نتيجة أخرى أو أنشئ مسودة يدوية.", "Try another result or create a manual draft.")}</p></div>`;
    });
  }
  if (action === "new-product") resetImportWorkspace();
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
  if (event.target.id === "newsletter-form") {
    event.target.reset();
    showToast(state.lang === "ar" ? "أهلًا بك في دائرة ORIGO الخاصة" : "Welcome to the ORIGO private circle");
  }
  if (event.target.id === "web-import-form") {
    const query = $("#web-product-query").value.trim();
    await runAdminSuggestions(query);
  }
  if (event.target.id === "import-review-form") saveCatalogProduct(event.target);
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
$$("[data-search-value]").forEach((button) => button.addEventListener("click", () => {
  $("#global-search-input").value = button.dataset.searchValue;
  renderSearchSuggestions(button.dataset.searchValue);
}));

let adminSuggestionTimer;
$("#web-product-query").addEventListener("input", (event) => {
  clearTimeout(adminSuggestionTimer);
  adminSuggestionTimer = setTimeout(() => runAdminSuggestions(event.target.value), 420);
});

document.addEventListener("input", (event) => {
  if (event.target.closest("#import-review-form")) updateDuplicateWarning($("#import-review-form"));
});

document.addEventListener("change", (event) => {
  if (event.target.id === "gallery-upload") handleGalleryUpload(event.target);
  if (event.target.matches("[name='selectedImage']")) {
    $$(".review-image").forEach((label) => label.classList.toggle("selected", $("input", label).checked));
  }
});

$("#alternative-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") runAlternativeSearch();
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openOverlay("#search-overlay");
  }
  if (event.key === "Escape") {
    $$(".overlay.open").forEach(closeOverlay);
    closeDrawers();
    toggleMobileMenu(false);
    syncBodyLock();
  }
});

$$(".overlay").forEach((overlay) => overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeOverlay(overlay);
}));

const sections = $$("main section[id]");
const navLinks = $$(".category-nav a");
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.find((entry) => entry.isIntersecting);
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  $(".site-header").classList.toggle("compact", window.scrollY > 28);
}, { passive: true });

setupTheme();
updateLanguage();
observeReveals();
