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
const storedNotesState = readStoredObject("origoFragranceNotesState");
if (Object.keys(storedNotesState).length) window.ORIGOFragranceNotes?.setState(storedNotesState);
const storedAdminWorkspace = readStoredObject("origoAdminWorkspace");
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
    { id: "ORIGO10", name: "ORIGO10", type: "10%", uses: 42, status: "active" },
    { id: "WELCOME", name: "WELCOME", type: "150 EGP", uses: 18, status: "scheduled" }
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
  team: [
    { id: "staff-1", name: "ORIGO Owner", role: "Owner", lastLogin: "الآن", status: "active" },
    { id: "staff-2", name: "Catalog Manager", role: "Product Manager", lastLogin: "منذ ساعتين", status: "active" }
  ],
  entities: {},
  settings: { storeName: "ORIGO", currency: "EGP", taxRate: 14, lowStockAlerts: true, orderNotifications: true }
};
const adminWorkspace = {
  ...defaultAdminWorkspace,
  ...storedAdminWorkspace,
  analytics: { ...defaultAdminWorkspace.analytics, ...(storedAdminWorkspace.analytics || {}) },
  inventory: { ...defaultAdminWorkspace.inventory, ...(storedAdminWorkspace.inventory || {}) },
  entities: { ...defaultAdminWorkspace.entities, ...(storedAdminWorkspace.entities || {}) },
  settings: { ...defaultAdminWorkspace.settings, ...(storedAdminWorkspace.settings || {}) }
};

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
  filterDefinitions: [],
  activeDynamicFilters: {},
  productEditorMode: localStorage.getItem("origoProductEditorMode") || "quick",
  aiProductSuggestion: null,
  globalSearchQuery: "",
  storefrontSearchQuery: "",
  storefrontCategory: "all",
  notesSearchQuery: "",
  notesFamilyFilter: "all",
  notesVisibleCount: 72,
  activeNoteSlug: "",
  activeAdminNoteSlug: "",
  pendingNoteImage: "",
  adminView: "overview",
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
    customers: "customers", notes: "catalog:view", categories: "catalog:view",
    suppliers: "purchases", purchases: "purchases", marketing: "marketing",
    coupons: "coupons", content: "content", reviews: "reviews",
    accounting: "accounting", shipping: "shipping", reports: "reports:view",
    support: "support", team: "users", settings: "settings"
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
  { groupAr: "التوريد", groupEn: "PROCUREMENT", id: "suppliers", icon: "♜", ar: "الموردون", en: "Suppliers", descriptionAr: "بيانات الموردين والمنتجات والتكاليف والمدفوعات.", descriptionEn: "Supplier records, products, costs, and payments." },
  { groupAr: "التوريد", groupEn: "PROCUREMENT", id: "purchases", icon: "⇣", ar: "المشتريات", en: "Purchases", descriptionAr: "أوامر الشراء والتوريد والاستلام.", descriptionEn: "Purchase orders, incoming stock, and receiving." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "marketing", icon: "◎", ar: "التسويق والإعلانات", en: "Marketing", descriptionAr: "الحملات والميزانيات وROAS والتتبّع.", descriptionEn: "Campaigns, budgets, attribution, and ROAS." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "coupons", icon: "%", ar: "الكوبونات والعروض", en: "Coupons & offers", descriptionAr: "الخصومات والحزم والعروض الموسمية.", descriptionEn: "Discounts, bundles, flash sales, and promotions." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "content", icon: "¶", ar: "المحتوى والصفحات", en: "Content", descriptionAr: "البنرات والصفحات والمدونة ودليل العطور.", descriptionEn: "Banners, pages, journal, and fragrance guides." },
  { groupAr: "النمو", groupEn: "GROWTH", id: "reviews", icon: "★", ar: "التقييمات", en: "Reviews", descriptionAr: "مراجعات المنتجات والتجربة والشحن والردود.", descriptionEn: "Product, experience, delivery, and service reviews." },
  { groupAr: "المالية", groupEn: "FINANCE", id: "accounting", icon: "◈", ar: "المدفوعات والمحاسبة", en: "Payments & accounting", descriptionAr: "الإيرادات والتكاليف والمدفوعات وصافي الربح.", descriptionEn: "Revenue, costs, payments, refunds, and net profit." },
  { groupAr: "المالية", groupEn: "FINANCE", id: "shipping", icon: "↯", ar: "الشحن والتوصيل", en: "Shipping", descriptionAr: "المناطق والشركات والتتبع ومستوى الخدمة.", descriptionEn: "Zones, carriers, tracking, and service levels." },
  { groupAr: "المالية", groupEn: "FINANCE", id: "reports", icon: "▥", ar: "التقارير والتحليلات", en: "Reports", descriptionAr: "تقارير قابلة للفلترة والتصدير لكل عمليات المتجر.", descriptionEn: "Filterable and exportable business reports." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "support", icon: "◌", ar: "خدمة العملاء", en: "Customer support", descriptionAr: "التذاكر والشكاوى وسجل التواصل.", descriptionEn: "Tickets, complaints, and communication history." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "team", icon: "♟", ar: "الفريق والصلاحيات", en: "Team & roles", descriptionAr: "الأدوار والصلاحيات وسجل نشاط الموظفين.", descriptionEn: "Roles, permissions, and staff activity." },
  { groupAr: "الإدارة", groupEn: "MANAGEMENT", id: "settings", icon: "⚙", ar: "الإعدادات", en: "Settings", descriptionAr: "إعدادات المتجر والأمان وSEO والإشعارات.", descriptionEn: "Store, security, SEO, and notification settings." }
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
  return new Intl.NumberFormat(state.lang === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: state.currency === "EGP" ? 0 : 2,
    maximumFractionDigits: state.currency === "EGP" ? 0 : 2
  }).format(Number(value || 0) * config.rate);
};

function rebuildStorefrontProducts() {
  const productsById = new Map(baseProducts.map((product) => [product.id, product]));
  state.catalogProducts
    .filter((product) => product.status === "published")
    .forEach((product) => productsById.set(product.id, serverProduct(product)));
  state.products = [...productsById.values()];
  if ($("#brand-carousel-track")) renderBrandCarousel($("#brand-carousel-search")?.value || "");
}

function persist() {
  localStorage.setItem("origoCart", JSON.stringify(state.cart));
  localStorage.setItem("origoWishlist", JSON.stringify(state.wishlist));
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
}

async function hydrateServer() {
  const localCart = [...state.cart];
  const cartOwner = localStorage.getItem("origoCartUserId");
  try {
    const [catalog, session, notesState, publicIntegrations, filtersResult] = await Promise.all([
      api("/api/products"),
      api("/api/session"),
      api("/api/notes/state"),
      api("/api/integrations/public"),
      api("/api/filters")
    ]);
    state.publicIntegrations = publicIntegrations || {};
    state.filterDefinitions = filtersResult.filters || [];
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
    renderBrandCarousel();
    renderProducts($(".chip.active")?.dataset.filter || "all");
    renderCart();
    renderWishlist();
    updateAccountIndicator();
    handleNotesRoute({ replace: true });
  } catch {
    state.serverAvailable = false;
    updateAccountIndicator();
  }
}

async function loadAdminCatalog() {
  if (!isStaffUser() || !hasStaffPermission("catalog:view")) return [];
  const result = await api("/api/admin/products");
  state.catalogProducts = result.products || [];
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
  localStorage.setItem("origoAdminWorkspace", JSON.stringify(state.adminWorkspace));
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
    const [ordersResult, workspaceResult, staffResult, integrationsResult] = await Promise.all([
      hasStaffPermission("orders:view") ? api("/api/admin/orders") : Promise.resolve({ orders: [] }),
      api("/api/admin/workspace"),
      hasStaffPermission("users") ? api("/api/admin/staff") : Promise.resolve({ staff: [] }),
      hasStaffPermission("settings") ? api("/api/admin/integrations") : Promise.resolve({ integrations: {} })
    ]);
    state.adminOrders = ordersResult.orders || [];
    if (workspaceResult.state && Object.keys(workspaceResult.state).length) {
      state.adminWorkspace = {
        ...state.adminWorkspace,
        ...workspaceResult.state,
        analytics: { ...state.adminWorkspace.analytics, ...(workspaceResult.state.analytics || {}) },
        inventory: { ...state.adminWorkspace.inventory, ...(workspaceResult.state.inventory || {}) },
        entities: { ...state.adminWorkspace.entities, ...(workspaceResult.state.entities || {}) },
        settings: { ...state.adminWorkspace.settings, ...(workspaceResult.state.settings || {}) }
      };
      localStorage.setItem("origoAdminWorkspace", JSON.stringify(state.adminWorkspace));
    }
    state.adminActivity = workspaceResult.activity || [];
    state.adminStaff = staffResult.staff || [];
    state.integrationStatus = integrationsResult.integrations || {};
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
      <img src="${escapeHTML(product?.image || "assets/origo-hero.png")}" alt="" />
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
    return `<tr><td><span class="admin-product-cell"><img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="" /><span><b>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${escapeHTML(product.brand)}</small></span></span></td>
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
  const settings = state.adminWorkspace.settings;
  const providers = [
    ["paymob", "Paymob", "PAYMOB_SECRET_KEY · PAYMOB_PUBLIC_KEY · PAYMOB_INTEGRATION_IDS"],
    ["bosta", "Bosta", "BOSTA_API_KEY"],
    ["whatsapp", "WhatsApp Cloud", "WHATSAPP_ACCESS_TOKEN · WHATSAPP_PHONE_NUMBER_ID · WHATSAPP_VERIFY_TOKEN"],
    ["metaAds", "Facebook + Instagram", "META_PIXEL_ID · META_CAPI_ACCESS_TOKEN"],
    ["snapchatAds", "Snapchat", "SNAP_PIXEL_ID · SNAP_CAPI_ACCESS_TOKEN"],
    ["tiktokAds", "TikTok", "TIKTOK_PIXEL_ID · TIKTOK_ACCESS_TOKEN"],
    ["googleAds", "YouTube + Google Ads", "GOOGLE_ADS_* · GOOGLE_OAUTH_*"]
  ];
  return `<form class="admin-settings-form" id="admin-settings-form"><section><div class="review-section-head"><span>01</span><div><b>${state.lang === "ar" ? "هوية المتجر" : "Store identity"}</b></div></div>
    <div class="review-grid"><label>${state.lang === "ar" ? "اسم المتجر" : "Store name"}<input name="storeName" value="${escapeHTML(settings.storeName)}" /></label>
    <label>${state.lang === "ar" ? "العملة" : "Currency"}<select name="currency">${selectOptions([["EGP","EGP"],["USD","USD"],["SAR","SAR"]], settings.currency)}</select></label>
    <label>${state.lang === "ar" ? "الضريبة %" : "Tax rate %"}<input name="taxRate" type="number" min="0" max="100" value="${settings.taxRate}" /></label></div></section>
    <section><div class="review-section-head"><span>02</span><div><b>${state.lang === "ar" ? "الإشعارات والأمان" : "Notifications & security"}</b></div></div>
    <label class="admin-toggle-row"><span><b>${state.lang === "ar" ? "تنبيهات المخزون" : "Low-stock alerts"}</b><small>${state.lang === "ar" ? "تنبيه عند بلوغ الحد الأدنى" : "Notify at reorder threshold"}</small></span><input name="lowStockAlerts" type="checkbox"${settings.lowStockAlerts ? " checked" : ""} /></label>
    <label class="admin-toggle-row"><span><b>${state.lang === "ar" ? "إشعارات الطلبات" : "Order notifications"}</b><small>${state.lang === "ar" ? "إرسال تحديثات رحلة الطلب" : "Send order journey updates"}</small></span><input name="orderNotifications" type="checkbox"${settings.orderNotifications ? " checked" : ""} /></label></section>
    <section><div class="review-section-head"><span>03</span><div><b>${state.lang === "ar" ? "الاتصالات الخارجية" : "External integrations"}</b><small>${state.lang === "ar" ? "لا تظهر المفاتيح السرية في المتصفح." : "Secret keys are never exposed to the browser."}</small></div></div>
    <div class="admin-family-grid">${providers.map(([id, name, keys]) => {
      const ready = Boolean(state.integrationStatus[id]?.configured);
      return `<article style="--family-color:${ready ? "#247a55" : "#8f6d58"}"><span>${ready ? "✓" : "○"}</span><div><b>${name}</b><small>${ready ? (state.lang === "ar" ? "متصل وجاهز" : "Connected and ready") : keys}</small></div></article>`;
    }).join("")}</div></section>
    <button class="button burgundy-button" type="submit">${state.lang === "ar" ? "حفظ الإعدادات" : "Save settings"} ←</button></form>`;
}

function entityCreateForm(view, item = null) {
  const section = adminSection(view);
  if (view === "team") {
    return `<form id="admin-staff-form" class="admin-quick-create">
      <div><span class="eyebrow">♟ TEAM & ROLES</span><h3>${state.lang === "ar" ? "إضافة حساب موظف" : "Add staff account"}</h3></div>
      <label>${state.lang === "ar" ? "الاسم" : "Name"}<input name="name" required minlength="2" /></label>
      <label>${state.lang === "ar" ? "البريد" : "Email"}<input name="email" type="email" required /></label>
      <label>${state.lang === "ar" ? "كلمة المرور" : "Password"}<input name="password" type="password" minlength="10" required /></label>
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

function renderAdminDashboard(view = state.adminView) {
  state.adminView = view;
  const section = adminSection(view);
  $("#advanced-admin-nav").innerHTML = adminNavMarkup();
  $("#admin-breadcrumb-current").textContent = state.lang === "ar" ? section.ar : section.en;
  $("#advanced-admin-title").textContent = state.lang === "ar" ? section.ar : section.en;
  $("#admin-view-description").textContent = state.lang === "ar" ? section.descriptionAr : section.descriptionEn;
  const actions = {
    products: `<button class="button secondary-button" data-action="admin-export" data-report="products">${state.lang === "ar" ? "تصدير" : "Export"} ↓</button><button class="button burgundy-button" data-action="open-product-studio">${state.lang === "ar" ? "إضافة منتج" : "Add product"} ＋</button>`,
    orders: `<button class="button secondary-button" data-action="admin-export" data-report="orders">${state.lang === "ar" ? "تصدير الطلبات" : "Export orders"} ↓</button>`,
    inventory: `<button class="button secondary-button" data-action="admin-export" data-report="inventory">${state.lang === "ar" ? "تصدير المخزون" : "Export inventory"} ↓</button>`,
    notes: `<button class="button burgundy-button" data-action="open-notes-admin">${state.lang === "ar" ? "إدارة قاعدة المعرفة" : "Manage knowledge base"} ＋</button>`,
    categories: `<button class="button burgundy-button" data-action="new-filter">${state.lang === "ar" ? "إضافة فلتر" : "Add filter"} ＋</button>`
  };
  $("#admin-view-actions").innerHTML = actions[view] || (["overview","accounting","reports","settings"].includes(view) ? "" :
    `<button class="button burgundy-button" data-action="admin-create-entity" data-view="${view}">${state.lang === "ar" ? "إضافة جديد" : "Add new"} ＋</button>`);
  const content = {
    overview: overviewMarkup,
    orders: ordersViewMarkup,
    products: productViewMarkup,
    inventory: inventoryViewMarkup,
    customers: customersViewMarkup,
    categories: filtersViewMarkup,
    team: teamViewMarkup,
    notes: notesViewMarkup,
    accounting: accountingMarkup,
    reports: reportsMarkup,
    settings: settingsMarkup
  };
  $("#admin-dashboard-content").innerHTML = content[view] ? content[view]() : genericEntityMarkup(view);
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

function renderAuth(mode = "login") {
  const isRegister = mode === "register";
  const ar = state.lang === "ar";
  $("#account-content").innerHTML = `
    <div class="auth-shell">
      <div class="auth-art">
        <span class="eyebrow light">ORIGO PRIVATE CIRCLE</span>
        <h2>${ar ? "اختياراتك،<br>محفوظة لك." : "Your choices,<br>kept close."}</h2>
        <p>${ar ? "احفظ حقيبتك وتابع طلباتك من أي جهاز." : "Keep your bag and follow every order from any device."}</p>
      </div>
      <div class="auth-body">
        <div class="auth-tabs">
          <button type="button" data-action="auth-mode" data-mode="login" class="${isRegister ? "" : "active"}">${ar ? "تسجيل الدخول" : "Sign in"}</button>
          <button type="button" data-action="auth-mode" data-mode="register" class="${isRegister ? "active" : ""}">${ar ? "حساب جديد" : "Create account"}</button>
        </div>
        <form class="commerce-form" id="auth-form" data-mode="${isRegister ? "register" : "login"}">
          <span class="eyebrow">${isRegister ? (ar ? "انضم إلى ORIGO" : "JOIN ORIGO") : (ar ? "مرحبًا بعودتك" : "WELCOME BACK")}</span>
          <h2 id="account-title">${isRegister ? (ar ? "أنشئ حسابك" : "Create your account") : (ar ? "سجّل الدخول" : "Sign in")}</h2>
          <p>${isRegister
            ? (ar ? "بيانات قليلة، وتجربة تسوق أسهل." : "A few details for a smoother shopping experience.")
            : (ar ? "أدخل بياناتك لمتابعة حقيبتك وطلباتك." : "Sign in to continue with your bag and orders.")}</p>
          <div class="commerce-fields">
            ${isRegister ? `<label class="wide"><span>${ar ? "الاسم" : "Name"}</span><input name="name" autocomplete="name" required minlength="2" maxlength="100" /></label>` : ""}
            <label class="wide"><span>${ar ? "البريد الإلكتروني" : "Email address"}</span><input name="email" type="email" autocomplete="email" required maxlength="254" dir="ltr" /></label>
            ${isRegister ? `<label class="wide"><span>${ar ? "رقم الهاتف (اختياري)" : "Phone (optional)"}</span><input name="phone" autocomplete="tel" inputmode="tel" dir="ltr" /></label>` : ""}
            <label class="wide"><span>${ar ? "كلمة المرور" : "Password"}</span><input name="password" type="password" autocomplete="${isRegister ? "new-password" : "current-password"}" required minlength="10" maxlength="200" dir="ltr" /></label>
          </div>
          <p class="form-error" id="auth-error" role="alert"></p>
          <button class="button burgundy-button full" type="submit">${isRegister ? (ar ? "إنشاء الحساب" : "Create account") : (ar ? "دخول" : "Sign in")}</button>
        </form>
      </div>
    </div>`;
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
  new: ["جديد", "New"],
  confirmed: ["تم التأكيد", "Confirmed"],
  processing: ["قيد التجهيز", "Processing"],
  ready_to_ship: ["جاهز للشحن", "Ready to ship"],
  shipped: ["تم الشحن", "Shipped"],
  delivered: ["تم التسليم", "Delivered"],
  completed: ["مكتمل", "Completed"],
  cancelled: ["ملغي", "Cancelled"],
  returned: ["مرتجع", "Returned"],
  refunded: ["مسترد", "Refunded"]
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
      <img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="" />
      <div><b>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${item.quantity} × ${formatPrice(product.price)}</small></div>
      <strong>${formatPrice(product.price * item.quantity)}</strong>
    </article>`).join("");
  $("#checkout-total").textContent = formatPrice(items.reduce((sum, { item, product }) => sum + item.quantity * product.price, 0));
}

function openCheckout() {
  if (!state.cart.length) {
    showToast(state.lang === "ar" ? "الحقيبة فارغة." : "Your bag is empty.");
    return;
  }
  if (!state.user) {
    toggleCart(false);
    openAccount("login", "checkout");
    showToast(state.lang === "ar" ? "سجّل الدخول أولًا لإتمام الطلب." : "Sign in first to complete checkout.");
    return;
  }
  renderCheckout();
  toggleCart(false);
  openOverlay("#checkout-overlay");
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
  if ($("#notes-admin-overlay").classList.contains("open")) renderNotesAdmin();
  if ($("#admin-overlay").classList.contains("open")) renderAdminDashboard(state.adminView);
  localStorage.setItem("origoLang", state.lang);
}

function setupTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");
  localStorage.setItem("origoTheme", state.theme);
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
  const track = $("#brand-carousel-track");
  if (!track) return;
  const normalized = ORIGOCatalog.normalize(query);
  const counts = new Map();
  state.products.forEach((product) => {
    const brand = String(product.brand || "ORIGO").trim();
    counts.set(brand, (counts.get(brand) || 0) + 1);
  });
  const brands = [...counts].sort((a, b) => {
    const aPinned = /^ORIGO/i.test(a[0]) ? 1 : 0;
    const bPinned = /^ORIGO/i.test(b[0]) ? 1 : 0;
    return bPinned - aPinned || b[1] - a[1] || a[0].localeCompare(b[0]);
  }).filter(([brand]) => !normalized || ORIGOCatalog.normalize(brand).includes(normalized));
  track.innerHTML = brands.map(([brand, count]) => `<button data-action="brand-search" data-query="${escapeHTML(brand)}"><span>${escapeHTML(brand.slice(0, 2).toUpperCase())}</span><b>${escapeHTML(brand)}</b><small>${count} ${state.lang === "ar" ? "منتج" : "products"}</small></button>`).join("");
}

function renderProducts(filter = "all") {
  const grid = $("#product-grid");
  const template = $("#product-template");
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
  if (existing) existing.quantity = Math.min(10, existing.quantity + 1);
  else state.cart.push({ id: product.id, quantity: 1 });
  persist();
  renderCart();
  showToast(state.lang === "ar" ? `تمت إضافة ${product.nameAr} إلى الحقيبة` : `${product.nameEn || product.nameAr} added to bag`);
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
  return `
    <button class="library-note-card${compact ? " compact" : ""}" data-action="open-note" data-slug="${escapeHTML(note.slug)}"
      style="--note-color:${escapeHTML(family?.color || "#77736e")}">
      <span class="library-note-image"><img src="${escapeHTML(window.ORIGOFragranceNotes.artwork(note))}" alt="${escapeHTML(noteLabel(note))}" loading="lazy" /></span>
      <span class="library-note-copy">
        <small>${escapeHTML(familyLabel(family) || "")}</small>
        <b>${escapeHTML(noteLabel(note))}</b>
        <i dir="${state.lang === "ar" ? "ltr" : "rtl"}">${escapeHTML(state.lang === "ar" ? note.nameEn : note.nameAr)}</i>
      </span>
      <span class="note-card-arrow">↗</span>
    </button>`;
}

function productMiniCard(product) {
  const name = state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr;
  return `
    <button class="note-product-card" data-action="note-product" data-id="${escapeHTML(product.id)}">
      <img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="${escapeHTML(name)}" loading="lazy" />
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
    const title = state.lang === "ar"
      ? `${note.nameAr} (${note.nameEn}) | مكتبة مكونات ORIGO`
      : `${note.nameEn} (${note.nameAr}) | ORIGO Fragrance Notes`;
    const description = state.lang === "ar" ? note.descriptionAr : note.descriptionEn;
    document.title = title;
    if (meta) meta.content = description.slice(0, 160);
    canonical.href = new URL(`/notes/${note.slug}`, siteBase).href;
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: note.nameEn,
      alternateName: [note.nameAr, ...(note.aliases || [])],
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
  const result = library.search(state.notesSearchQuery, {
    familyId: state.notesFamilyFilter,
    limit: state.notesVisibleCount
  });
  const families = library.families;
  $("#notes-page-content").innerHTML = `
    <header class="notes-page-hero">
      <div>
        <span class="eyebrow">${state.lang === "ar" ? "أطلس ORIGO العطري" : "ORIGO OLFACTORY ATLAS"}</span>
        <h1 id="notes-page-title">${state.lang === "ar" ? "مكتبة المكونات<br><em>العطرية.</em>" : "Fragrance Notes<br><em>Library.</em>"}</h1>
        <p>${state.lang === "ar"
          ? "استكشف العائلات والمكونات، وافهم موقع كل نوتة ثم انتقل مباشرة إلى العطور التي تحملها."
          : "Explore scent families, understand each note's role, and discover perfumes built around it."}</p>
      </div>
      <div class="notes-page-stat"><strong>${library.notes.length.toLocaleString()}</strong><span>${state.lang === "ar" ? "مكوّنًا منظّمًا" : "organized notes"}</span></div>
    </header>
    <div class="notes-library-toolbar">
      <label class="notes-library-search"><span>⌕</span><input id="notes-library-search" type="search"
        value="${escapeHTML(state.notesSearchQuery)}" placeholder="${state.lang === "ar" ? "ابحث: ورد، Oud، برغموت…" : "Search: Rose, Oud, Bergamot…"}" /></label>
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
  $("#notes-page-content").innerHTML = `
    <article class="note-detail" style="--note-color:${escapeHTML(family?.color || "#77736e")};--note-accent:${escapeHTML(family?.accent || "#eee")}">
      <button class="note-detail-back" data-action="open-notes">← ${state.lang === "ar" ? "كل المكونات" : "All notes"}</button>
      <div class="note-detail-hero">
        <div class="note-detail-image"><img src="${escapeHTML(library.artwork(note))}" alt="${escapeHTML(noteLabel(note))}" /></div>
        <div class="note-detail-copy">
          <span class="eyebrow">${escapeHTML(familyLabel(family) || "")}</span>
          <h1 id="notes-page-title">${escapeHTML(noteLabel(note))}</h1>
          <p class="note-secondary-name" dir="${state.lang === "ar" ? "ltr" : "rtl"}">${escapeHTML(state.lang === "ar" ? note.nameEn : note.nameAr)}</p>
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
  if (match && !isStaffUser()) {
    document.body.classList.remove("notes-route");
    page.hidden = true;
    history.replaceState({}, "", "/#discover");
    restoreStoreMeta();
    return false;
  }
  if (!match) {
    document.body.classList.remove("notes-route");
    page.hidden = true;
    state.activeNoteSlug = "";
    if (!replace) restoreStoreMeta();
    return false;
  }
  document.body.classList.add("notes-route");
  page.hidden = false;
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
  const structured = product.notes || {};
  const hasStructured = ["top", "heart", "base"].some((position) =>
    (structured[`${position}Ar`] || []).length || (structured[`${position}En`] || []).length
  );
  if (hasStructured) {
    ["top", "heart", "base"].forEach((position) => {
      const preferred = structured[`${position}${state.lang === "ar" ? "Ar" : "En"}`] || [];
      const fallback = structured[`${position}${state.lang === "ar" ? "En" : "Ar"}`] || [];
      const values = preferred.length ? preferred : fallback;
      groups[position] = values.map((value) => ({ value, note: library.find(value), position }));
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
      <div>${items.map(({ value, note }) => {
        if (!note) {
          stateChanged = library.registerUnclassified(value, position) || stateChanged;
          const unknown = {
            nameAr: value, nameEn: value, familyId: "uncategorized", symbol: "?", image: ""
          };
          return `<span class="dialog-note-chip unknown"><img src="${escapeHTML(library.artwork(unknown))}" alt="" /><b>${escapeHTML(value)}</b><small>${state.lang === "ar" ? "غير مصنف" : "Unclassified"}</small></span>`;
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

async function persistNotesState() {
  const value = window.ORIGOFragranceNotes.getState();
  localStorage.setItem("origoFragranceNotesState", JSON.stringify(value));
  if (state.serverAvailable && isStaffUser()) {
    const knowledge = window.ORIGOFragranceNotes.notes.map((note) => ({
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
    }));
    const result = await api("/api/admin/notes/state", {
      method: "POST",
      body: JSON.stringify({ state: value, knowledge })
    });
    window.ORIGOFragranceNotes.setState(result.state);
    localStorage.setItem("origoFragranceNotesState", JSON.stringify(result.state));
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
  $("#note-admin-image-preview").src = window.ORIGOFragranceNotes.artwork({
    nameAr: seed.nameAr || "مكوّن جديد", nameEn: seed.nameEn || "NEW NOTE",
    familyId: seed.familyId || "uncategorized", symbol: "✦"
  });
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
  $("#note-admin-image-preview").src = window.ORIGOFragranceNotes.artwork(note);
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
  $("#notes-admin-stats").innerHTML = `
    <article><span>✦</span><div><b>${library.notes.length}</b><small>مكوّن</small></div></article>
    <article><span>◉</span><div><b>${library.families.length}</b><small>عائلة رئيسية</small></div></article>
    <article><span>?</span><div><b>${library.unclassified.length}</b><small>غير مصنف</small></div></article>`;
  $("#notes-admin-list").innerHTML = matches.map((note) => {
    const family = library.familyById(note.familyId);
    return `<button data-action="edit-note" data-slug="${escapeHTML(note.slug)}" class="${state.activeAdminNoteSlug === note.slug ? "active" : ""}">
      <img src="${escapeHTML(library.artwork(note))}" alt="" loading="lazy" /><span><b>${escapeHTML(note.nameAr)}</b><small>${escapeHTML(note.nameEn)} · ${escapeHTML(family?.nameAr || "")}</small></span><i>←</i></button>`;
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
    <div class="note-match-items">${matches.map((note) => `<span><img src="${escapeHTML(library.artwork(note))}" alt="" />
      <b>${escapeHTML(note.nameAr)}</b><small>${escapeHTML(note.nameEn)} · ${escapeHTML(positionLabel(note.requestedPosition))}</small></span>`).join("")}
      ${enriched.unknown.map((item) => `<span class="unknown"><i>?</i><b>${escapeHTML(item.name)}</b><small>${adminCopy("سيضاف للمراجعة", "Added to review queue")}</small></span>`).join("")}</div>`;
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
    ${productNotePyramid(product)}
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

function editorPreviewMarkup(product) {
  const image = product.images?.find((item) => item.selected)?.url || product.images?.[0]?.url || "assets/origo-hero.png";
  const checks = [
    ["image", Boolean(product.images?.length)], ["price", Number(product.price) > 0],
    ["Arabic", Boolean(product.descriptionAr)], ["English", Boolean(product.descriptionEn)],
    ["notes", Boolean(Object.values(product.notes || {}).some((items) => items?.length))],
    ["stock", Number(product.inventory?.quantity) > 0], ["SEO", Boolean(product.seo?.title && product.seo?.description)],
    ["alternatives", Boolean(product.alternativeIds?.length)]
  ];
  return `<aside class="product-editor-preview">
    <span class="eyebrow">LIVE PREVIEW</span><img id="editor-preview-image" src="${escapeHTML(image)}" alt="" />
    <small id="editor-preview-brand">${escapeHTML(product.brand || "ORIGO")}</small>
    <h3 id="editor-preview-name">${escapeHTML(product.nameAr || product.nameEn || adminCopy("منتج جديد", "New product"))}</h3>
    <b id="editor-preview-price">${formatPrice(product.price || 0)}</b>
    <p id="editor-preview-notes">${escapeHTML([...(product.notes?.topEn || []), ...(product.notes?.heartEn || []), ...(product.notes?.baseEn || [])].slice(0, 4).join(" · "))}</p>
    <button type="button" disabled>${adminCopy("أضف إلى الحقيبة", "Add to bag")}</button>
    <div class="product-editor-checklist" id="product-editor-checklist">${checks.map(([label, ready]) => `<span class="${ready ? "ready" : ""}"><i>${ready ? "✓" : "○"}</i>${label}</span>`).join("")}</div>
    <small id="product-autosave-status">${adminCopy("المسودة جاهزة للحفظ التلقائي", "Draft autosave is ready")}</small>
  </aside>`;
}

let productAutosaveTimer;
function updateProductEditorPreview(form) {
  if (!form) return;
  const data = new FormData(form);
  const name = String(data.get(state.lang === "ar" ? "nameAr" : "nameEn") || data.get("nameAr") || data.get("nameEn") || "");
  $("#editor-preview-name").textContent = name || adminCopy("منتج جديد", "New product");
  $("#editor-preview-brand").textContent = String(data.get("brand") || "ORIGO");
  $("#editor-preview-price").textContent = formatPrice(Number(data.get("price") || 0));
  $("#editor-preview-notes").textContent = [
    ...csvValues(data.get("topEn") || data.get("topAr")),
    ...csvValues(data.get("heartEn") || data.get("heartAr")),
    ...csvValues(data.get("baseEn") || data.get("baseAr"))
  ].slice(0, 4).join(" · ");
  const draft = collectReviewProduct(form);
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
  $("#import-workspace").innerHTML = `
    <form class="catalog-review" id="import-review-form" data-editor-mode="${escapeHTML(state.productEditorMode)}">
      <div class="product-editor-modes">
        <button type="button" data-action="product-editor-mode" data-mode="quick" class="${state.productEditorMode === "quick" ? "active" : ""}">${adminCopy("إضافة سريعة", "Quick Add")}</button>
        <button type="button" data-action="product-editor-mode" data-mode="smart" class="${state.productEditorMode === "smart" ? "active" : ""}">${adminCopy("إضافة ذكية", "Smart Add")}</button>
        <button type="button" data-action="product-editor-mode" data-mode="advanced" class="${state.productEditorMode === "advanced" ? "active" : ""}">${adminCopy("متقدم", "Advanced")}</button>
      </div>
      <div class="product-ai-tools">
        <span>AI</span>
        ${[
          ["description", adminCopy("اقتراح الوصف", "Suggest descriptions")],
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
          <label>${adminCopy("السعر قبل الخصم", "Compare-at price")}<input name="oldPrice" type="number" min="0" value="${escapeHTML(product.oldPrice ?? "")}" /></label>
          <label>${adminCopy("تكلفة الشراء", "Purchase cost")}<input name="cost" type="number" min="0" value="${escapeHTML(product.inventory?.cost ?? "")}" /></label>
        </div>
      </section>

      <section class="review-section" data-editor-tier="smart">
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
          <label>${adminCopy("الكمية الحالية", "Current quantity")}<input name="quantity" type="number" min="0" value="${escapeHTML(product.inventory?.quantity ?? "")}" /></label>
          <label>${adminCopy("الحد الأدنى للمخزون", "Low-stock threshold")}<input name="minimumStock" type="number" min="0" value="${escapeHTML(product.inventory?.minimum ?? 8)}" /></label>
          <label>${adminCopy("الكمية المحجوزة", "Reserved stock")}<input name="reservedStock" type="number" min="0" value="${escapeHTML(product.inventory?.reserved ?? 0)}" /></label>
          <label>${adminCopy("الوسوم", "Tags")}<input name="tags" value="${escapeHTML(csv(product.tags))}" placeholder="${adminCopy("فاخر، مسائي، شتوي", "luxury, evening, winter")}" /></label>
        </div>
      </section>

      <section class="review-section" data-editor-tier="smart">
        <div class="review-section-head"><span>03</span><div><b>${adminCopy("النوتات العطرية", "Fragrance notes")}</b><small>${adminCopy("كل مستوى واللغة في حقل مستقل", "Each level and language has its own field")}</small></div></div>
        <div class="review-grid note-review-grid">
          ${["top", "heart", "base"].map((level) => `
            <label>${level === "top" ? adminCopy("المقدمة — عربي", "Top — Arabic") : level === "heart" ? adminCopy("القلب — عربي", "Heart — Arabic") : adminCopy("القاعدة — عربي", "Base — Arabic")}<input name="${level}Ar" dir="rtl" value="${escapeHTML(csv(product.notes[`${level}Ar`]))}" /></label>
            <label>${level === "top" ? "Top — English" : level === "heart" ? "Heart — English" : "Base — English"}<input name="${level}En" dir="ltr" value="${escapeHTML(csv(product.notes[`${level}En`]))}" /></label>`).join("")}
        </div>
        <div class="note-library-match-preview" id="note-library-match-preview"></div>
        <div class="review-grid perfume-advanced-fields">
          <label>${adminCopy("الثبات / 10", "Longevity / 10")}<input name="longevity" type="number" min="0" max="10" step=".1" value="${escapeHTML(product.performance?.longevity ?? "")}" /></label>
          <label>${adminCopy("الفوحان / 10", "Sillage / 10")}<input name="sillage" type="number" min="0" max="10" step=".1" value="${escapeHTML(product.performance?.sillage ?? "")}" /></label>
          <label>${adminCopy("سنة الإصدار", "Release year")}<input name="releaseYear" type="number" min="1900" max="2100" value="${escapeHTML(product.releaseYear ?? "")}" /></label>
          <label>${adminCopy("المصمم", "Perfumer")}<input name="perfumer" value="${escapeHTML(product.perfumer || "")}" /></label>
          <label>${adminCopy("المناسبات", "Occasions")}<input name="occasions" value="${escapeHTML(csv(product.occasions))}" /></label>
          <label>${adminCopy("الشخصية المناسبة", "Style/personality")}<input name="personalities" value="${escapeHTML(csv(product.personalities))}" /></label>
          <label>${adminCopy("العطر المستوحى منه", "Inspired by")}<input name="inspiredBy" value="${escapeHTML(product.inspiredBy || "")}" /></label>
          <label>${adminCopy("نسبة التشابه %", "Similarity %")}<input name="similarity" type="number" min="0" max="100" value="${escapeHTML(product.similarity ?? "")}" /></label>
        </div>
      </section>

      <section class="review-section" data-editor-tier="core">
        <div class="review-section-head"><span>04</span><div><b>${adminCopy("الوصف والصور", "Descriptions & images")}</b></div></div>
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
        <div class="review-images">
          ${images.length ? images.map((image, index) => `
            <label class="review-image${image.selected || index === 0 ? " selected" : ""}">
              <input type="radio" name="selectedImage" value="${index}"${image.selected || index === 0 ? " checked" : ""} />
              <img src="${escapeHTML(image.url)}" alt="" />
              <span>${escapeHTML(image.provider || "Source")}</span>
            </label>`).join("") : `<div class="no-images">${adminCopy("لا توجد صور؛ أضف رابطًا يدويًا.", "No images found; add a URL manually.")}</div>`}
        </div>
      </section>

      <section class="review-section" data-editor-tier="advanced">
        <div class="review-section-head"><span>05</span><div><b>${adminCopy("SEO والمتغيرات والربط", "SEO, variants & relationships")}</b><small>${adminCopy("تستخدمها صفحات المنتج والفلاتر الديناميكية مباشرة", "Used directly by product pages and dynamic filters")}</small></div></div>
        <div class="review-grid">
          <label>${adminCopy("رابط المنتج", "URL slug")}<input name="slug" dir="ltr" value="${escapeHTML(product.slug || "")}" placeholder="nocturne-01" /></label>
          <label>SEO title<input name="seoTitle" value="${escapeHTML(product.seo?.title || "")}" /></label>
          <label class="wide">${adminCopy("وصف SEO", "SEO description")}<textarea name="seoDescription">${escapeHTML(product.seo?.description || "")}</textarea></label>
          <label>${adminCopy("المقاسات/المتغيرات", "Variants")}<input name="variants" value="${escapeHTML(csv(product.variants))}" placeholder="30 ML, 50 ML, 100 ML" /></label>
          <label>${adminCopy("منتجات مشابهة", "Similar product IDs")}<input name="similarProductIds" value="${escapeHTML(csv(product.similarProductIds))}" /></label>
          <label>${adminCopy("اشترِ معه", "Cross-sell product IDs")}<input name="crossSellIds" value="${escapeHTML(csv(product.crossSellIds))}" /></label>
          <label>${adminCopy("بدائل العطر", "Alternative product IDs")}<input name="alternativeIds" value="${escapeHTML(csv(product.alternativeIds))}" /></label>
        </div>
      </section>

      <section class="review-section source-log-section" data-editor-tier="advanced">
        <div class="review-section-head"><span>06</span><div><b>${adminCopy("سجل المصادر", "Source log")}</b><small>${adminCopy("ما الذي جاء من أين؟", "What came from where?")}</small></div></div>
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
  renderNoteMatchPreview($("#import-review-form"));
  updateProductEditorPreview($("#import-review-form"));
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
    oldPrice: data.get("oldPrice") === "" ? null : Number(data.get("oldPrice") || 0),
    sizes: csvValues(data.get("sizes")),
    familyAr: String(data.get("familyAr") || "").trim(),
    familyEn: String(data.get("familyEn") || "").trim(),
    seasons: csvValues(data.get("seasons")),
    usageTimes: csvValues(data.get("usageTimes")),
    originCountryAr: String(data.get("originCountryAr") || "").trim(),
    originCountryEn: String(data.get("originCountryEn") || "").trim(),
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
      reserved: Number(data.get("reservedStock") || 0),
      minimum: Number(data.get("minimumStock") || 0),
      cost: Number(data.get("cost") || 0)
    },
    performance: {
      longevity: Number(data.get("longevity") || 0),
      sillage: Number(data.get("sillage") || 0)
    },
    releaseYear: data.get("releaseYear") === "" ? null : Number(data.get("releaseYear")),
    perfumer: String(data.get("perfumer") || "").trim(),
    occasions: csvValues(data.get("occasions")),
    personalities: csvValues(data.get("personalities")),
    inspiredBy: String(data.get("inspiredBy") || "").trim(),
    similarity: data.get("similarity") === "" ? null : Number(data.get("similarity")),
    slug: String(data.get("slug") || "").trim(),
    seo: {
      title: String(data.get("seoTitle") || "").trim(),
      description: String(data.get("seoDescription") || "").trim()
    },
    variants: csvValues(data.get("variants")),
    similarProductIds: csvValues(data.get("similarProductIds")),
    crossSellIds: csvValues(data.get("crossSellIds")),
    alternativeIds: csvValues(data.get("alternativeIds")),
    notes: {
      topAr: csvValues(data.get("topAr")), topEn: csvValues(data.get("topEn")),
      heartAr: csvValues(data.get("heartAr")), heartEn: csvValues(data.get("heartEn")),
      baseAr: csvValues(data.get("baseAr")), baseEn: csvValues(data.get("baseEn"))
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

async function saveCatalogProduct(form) {
  let product = collectReviewProduct(form);
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
  const submit = form.querySelector("[type='submit']");
  submit.disabled = true;
  const originalLabel = submit.innerHTML;
  submit.textContent = adminCopy("جارٍ الحفظ…", "Saving…");
  try {
    if (state.serverAvailable) {
      const result = await api("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(product)
      });
      product = result.product;
    } else {
      product.updatedAt = new Date().toISOString();
      product.createdAt = product.createdAt || product.updatedAt;
    }
  } catch (error) {
    submit.disabled = false;
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
    <div class="import-success"><span>✓</span><h3>${adminCopy("تمت إضافة المنتج إلى لوحة المنتجات", "Product added to the product panel")}</h3>
    <p>${product.status === "published" ? adminCopy("اخترت حالة منشور، لذلك أصبح ظاهرًا في المتجر.", "You selected Published, so it is now visible in the store.") : adminCopy("حُفظ كمسودة ولن يظهر للعميل حتى تغيّر حالته إلى منشور.", "Saved as a draft and hidden until you change its status to Published.")}</p>
    <div><button class="button secondary-button" data-action="edit-catalog-product" data-id="${escapeHTML(product.id)}">${adminCopy("مراجعة المنتج", "Review product")}</button><button class="button burgundy-button" data-action="new-product">${adminCopy("إضافة منتج آخر", "Add another product")}</button></div></div>`;
  localStorage.removeItem("origoProductAutosave");
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

document.addEventListener("click", async (event) => {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) return;
  const action = actionElement.dataset.action;

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
  if (action === "load-more-notes") {
    state.notesVisibleCount += 72;
    renderNotesLibrary();
  }
  if (action === "search") openOverlay("#search-overlay");
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
  if (action === "brands-menu") {
    const menu = actionElement.closest(".brands-nav");
    menu.classList.toggle("open");
    actionElement.setAttribute("aria-expanded", String(menu.classList.contains("open")));
  }
  if (action === "brand-search") {
    const query = actionElement.dataset.query || "";
    toggleMobileMenu(false);
    $(".brands-nav")?.classList.remove("open");
    state.storefrontSearchQuery = query;
    state.storefrontCategory = "all";
    renderProducts("all");
    $("#featured")?.scrollIntoView({ behavior: "smooth" });
  }
  if (action === "brand-carousel-scroll") {
    $("#brand-carousel-track")?.scrollBy({ left: Number(actionElement.dataset.direction || 1) * 420, behavior: "smooth" });
  }
  if (action === "account") openAccount();
  if (action === "auth-mode") renderAuth(actionElement.dataset.mode);
  if (action === "logout") {
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
  }
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
    const content = $("#admin-dashboard-content");
    content.insertAdjacentHTML("afterbegin", entityCreateForm(actionElement.dataset.view || state.adminView));
    content.querySelector("#admin-entity-form input[name='name']")?.focus();
  }
  if (action === "new-filter") {
    $("#admin-dashboard-content").insertAdjacentHTML("afterbegin", filterDefinitionForm());
  }
  if (action === "edit-filter") {
    const filter = state.filterDefinitions.find((item) => Number(item.id) === Number(actionElement.dataset.id));
    if (filter) $("#admin-dashboard-content").insertAdjacentHTML("afterbegin", filterDefinitionForm(filter));
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
  if (action === "cancel-admin-create") renderAdminDashboard(state.adminView);
  if (action === "admin-edit-entity") {
    const view = actionElement.dataset.view || state.adminView;
    const item = genericRowsFor(view).find((row) => String(row.id) === String(actionElement.dataset.id));
    if (item) {
      const content = $("#admin-dashboard-content");
      content.insertAdjacentHTML("afterbegin", entityCreateForm(view, item));
      content.querySelector("#admin-entity-form input[name='name']")?.focus();
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
    openCheckout();
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
    state.activeDynamicFilters = {};
    $$(".category-nav [data-category]").forEach((link) => link.classList.toggle("active", link === actionElement));
    renderDynamicFilters();
    renderProducts("all");
  }
  if (action === "select-admin-suggestion") {
    const selection = state.adminSuggestions[Number(actionElement.dataset.index)];
    if (selection) loadImportDraft(selection).catch(() => {
      $("#import-workspace").innerHTML = `<div class="import-empty"><span>!</span><h3>${adminCopy("تعذر جلب البيانات", "Could not fetch product data")}</h3><p>${adminCopy("جرّب نتيجة أخرى أو أنشئ مسودة يدوية.", "Try another result or create a manual draft.")}</p></div>`;
    });
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
  if (action === "ai-product-task") {
    const form = $("#import-review-form");
    if (!form) return;
    actionElement.disabled = true;
    try {
      const current = collectReviewProduct(form);
      const taskLabel = {
        description: "Generate original Arabic and English product descriptions",
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
    state.activeImportDraft = {
      ...current,
      ...state.aiProductSuggestion,
      notes: { ...current.notes, ...(state.aiProductSuggestion.notes || {}) },
      seo: { ...current.seo, ...(state.aiProductSuggestion.seo || {}) },
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
    renderAdminDashboard(view);
    showToast(adminCopy("تم حفظ السجل الجديد", "New record saved"));
    return;
  }
  if (event.target.id === "admin-settings-form") {
    const data = new FormData(event.target);
    state.adminWorkspace.settings = {
      ...state.adminWorkspace.settings,
      storeName: String(data.get("storeName") || "ORIGO").trim(),
      currency: String(data.get("currency") || "EGP"),
      taxRate: Number(data.get("taxRate") || 0),
      lowStockAlerts: data.has("lowStockAlerts"),
      orderNotifications: data.has("orderNotifications")
    };
    saveAdminWorkspace();
    showToast(adminCopy("تم حفظ إعدادات المتجر", "Store settings saved"));
    return;
  }
  if (event.target.id === "note-admin-form") {
    const form = event.target;
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
  if (event.target.id === "newsletter-form") {
    event.target.reset();
    showToast(state.lang === "ar" ? "أهلًا بك في دائرة ORIGO الخاصة" : "Welcome to the ORIGO private circle");
  }
  if (event.target.id === "web-import-form") {
    const query = $("#web-product-query").value.trim();
    await runAdminSuggestions(query);
  }
  if (event.target.id === "import-review-form") await saveCatalogProduct(event.target);
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

let notesSearchTimer;
document.addEventListener("input", (event) => {
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
  if (event.target.closest("#note-admin-form") && event.target.name === "image") {
    $("#note-admin-image-preview").src = event.target.value || window.ORIGOFragranceNotes.artwork({
      nameAr: event.target.form.elements.nameAr.value,
      nameEn: event.target.form.elements.nameEn.value,
      familyId: event.target.form.elements.familyId.value,
      symbol: "✦"
    });
  }
  if (event.target.closest("#import-review-form")) {
    updateDuplicateWarning($("#import-review-form"));
    renderNoteMatchPreview($("#import-review-form"));
    updateProductEditorPreview($("#import-review-form"));
  }
});

document.addEventListener("change", async (event) => {
  if (event.target.matches("[data-dynamic-filter]")) {
    const key = event.target.dataset.dynamicFilter;
    if (event.target.value) state.activeDynamicFilters[key] = event.target.value;
    else delete state.activeDynamicFilters[key];
    renderProducts($(".chip.active")?.dataset.filter || "all");
  }
  if (event.target.id === "gallery-upload") handleGalleryUpload(event.target);
  if (event.target.id === "note-image-upload") {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 900_000) {
      event.target.value = "";
      showToast(adminCopy("صورة المكوّن أكبر من 900 KB", "Note image exceeds 900 KB"));
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      state.pendingNoteImage = String(reader.result || "");
      $("#note-admin-image-preview").src = state.pendingNoteImage;
    }, { once: true });
    reader.readAsDataURL(file);
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

window.addEventListener("popstate", () => handleNotesRoute());

const brandTrack = $("#brand-carousel-track");
if (brandTrack) {
  let brandDragging = false;
  let brandStartX = 0;
  let brandStartScroll = 0;
  brandTrack.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    brandTrack.scrollLeft += event.deltaY;
  }, { passive: false });
  brandTrack.addEventListener("pointerdown", (event) => {
    brandDragging = true;
    brandStartX = event.clientX;
    brandStartScroll = brandTrack.scrollLeft;
    brandTrack.setPointerCapture?.(event.pointerId);
  });
  brandTrack.addEventListener("pointermove", (event) => {
    if (brandDragging) brandTrack.scrollLeft = brandStartScroll - (event.clientX - brandStartX);
  });
  brandTrack.addEventListener("pointerup", () => { brandDragging = false; });
  brandTrack.addEventListener("pointercancel", () => { brandDragging = false; });
}

checkoutFormMarkup = $("#checkout-overlay .checkout-grid").innerHTML;
setupTheme();
updateLanguage();
handleNotesRoute({ replace: true });
observeReveals();
hydrateServer();
