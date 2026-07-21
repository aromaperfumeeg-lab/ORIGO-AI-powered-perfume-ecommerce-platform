const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const ORIGO_PERFUME_BRANDS = [
  "Lattafa", "Armaf", "Afnan Perfumes", "Paris Corner", "Swiss Arabian", "Rasasi Perfumes",
  "Ajmal", "Maison Alhambra", "Amouage", "French Avenue", "Khadlaj Perfumes", "Arabiyat Prestige",
  "Zimaya", "Gissah", "Al Majed Oud", "Ibrahim Al Qurashi", "Gulf Orchid", "Reef",
  "Ard Al Zaafaran", "Laverne", "Matin Martin", "Dkhoon AlEmiratia", "Alezz", "Sedra",
  "Assaf", "Volaré", "Le Bonheur Perfumes", "Le Falcone Perfumes", "Otoori", "الرونق للعطور"
];

const ORIGO_HOME_CATEGORIES = [
  ["perfume", "العطور", "Perfumes", "♨"], ["skincare", "العناية بالبشرة", "Skincare", "♧"],
  ["haircare", "العناية بالشعر", "Hair care", "♟"], ["bodycare", "العناية بالجسم", "Body care", "♡"],
  ["incense", "البخور والمباخر", "Incense", "♨"], ["home", "العطور المنزلية", "Home fragrance", "⌂"],
  ["gifts", "الهدايا", "Gifts", "🎁"]
];

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
  logos: { light: "assets/origo-logo.svg", dark: "assets/origo-logo-dark.svg", icon: "assets/origo-logo-icon.svg" },
  footerImage: "assets/origo-hero.png",
  footerDescriptionAr: "في أوريجو، نؤمن أن العطر ليس مجرد رائحة، بل هو توقيعك الخاص الذي يترك أثرًا لا يُنسى. اكتشف عالم العطور الفاخرة بين الأصالة والتميز.",
  footerDescriptionEn: "At ORIGO, fragrance is more than a scent. It is your signature, leaving a memorable trace of character and elegance.",
  newsletterTitleAr: "اشترك في نشرتنا البريدية", newsletterTitleEn: "Join our newsletter",
  newsletterCopyAr: "كن أول من يعرف عن العروض والمنتجات الجديدة", newsletterCopyEn: "Be first to discover new products and offers",
  supportEmail: "support@origoscents.com", supportHoursAr: "من السبت إلى الخميس\n9:00 صباحًا – 11:00 مساءً", supportHoursEn: "Saturday to Thursday\n9:00 AM – 11:00 PM",
  socialLinks: { youtube: "", facebook: "", tiktok: "", instagram: "", snapchat: "", telegram: "", whatsapp: "" },
  appLinks: { appStore: "", googlePlay: "" },
  homepageRails: {
    benefits: { enabled: true, order: 1, titleAr: "مزايا ORIGO", titleEn: "ORIGO benefits" },
    gender: { enabled: true, order: 2, titleAr: "تسوق حسب الجنس", titleEn: "Shop by gender" },
    categories: { enabled: true, order: 3, titleAr: "تسوق حسب الفئة", titleEn: "Shop by category" },
    brands: { enabled: true, order: 4, titleAr: "العلامات التجارية", titleEn: "Brands", speed: 34 }
  },
  homeMedia: [],
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
  const benefitMap = new Map(defaultFooterBenefits.map((item) => [item.id, item]));
  const savedBenefits = Array.isArray(saved.footerBenefits) ? saved.footerBenefits : [];
  const mergedBenefits = savedBenefits.length
    ? savedBenefits.map((item) => ({ ...(benefitMap.get(item.id) || {}), ...item }))
    : defaultFooterBenefits.map((item) => structuredClone(item));
  return {
    ...defaultStoreSettings,
    ...saved,
    logos: { ...defaultStoreSettings.logos, ...(saved.logos || {}) },
    socialLinks: { ...defaultStoreSettings.socialLinks, ...(saved.socialLinks || {}) },
    appLinks: { ...defaultStoreSettings.appLinks, ...(saved.appLinks || {}) },
    homepageRails: Object.fromEntries(Object.entries(defaultStoreSettings.homepageRails).map(([key, value]) => [key, { ...value, ...(saved.homepageRails?.[key] || {}) }])),
    homeMedia: Array.isArray(saved.homeMedia) ? saved.homeMedia : [],
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
  theme: localStorage.getItem("origoTheme") || "light",
  currency: "EGP",
  cart: readStoredArray("origoCart"),
  wishlist: readStoredArray("origoWishlist"),
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
  notesVisibleCount: 72,
  activeNoteSlug: "",
  activeAdminNoteSlug: "",
  pendingNoteImage: "",
  pendingStoreLogos: {},
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
    alternatives: "catalog:view", performance: "catalog:view",
    suppliers: "purchases", purchases: "purchases", marketing: "marketing", homepage: "content",
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
  renderBrandCarousel($("#brand-carousel-search")?.value || "");
  renderHomepageCommerce();
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
    state.adminWorkspace.settings = mergeStoreSettings(storefrontSettings.settings || state.adminWorkspace.settings);
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
    handleNotesRoute({ replace: true });
    handleCatalogRoute({ replace: true });
    handleProductRoute();
  } catch {
    state.serverAvailable = false;
    updateAccountIndicator();
    renderSiteFooter();
    applyStoreIdentity();
    handleBenefitRoute({ replace: true });
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
      <td><span class="admin-product-cell"><img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="" /><span><b>${escapeHTML(ar ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${escapeHTML(product.brand || "ORIGO")}</small></span></span></td>
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
      <div class="review-grid"><label>${ar ? "لون أساسي" : "Primary color"}<input type="color" name="${prefix}.color0" value="${escapeHTML(benefit.colors?.[0] || "#7b0a20")}"/></label><label>${ar ? "لون ثانوي" : "Secondary color"}<input type="color" name="${prefix}.color1" value="${escapeHTML(benefit.colors?.[1] || "#77b8ff")}"/></label><label>${ar ? "لون إبراز" : "Accent color"}<input type="color" name="${prefix}.color2" value="${escapeHTML(benefit.colors?.[2] || "#f2b844")}"/></label></div>
      <div class="review-grid"><label>${ar ? "زر الإجراء AR" : "Arabic CTA"}<input name="${prefix}.ctaLabelAr" value="${escapeHTML(benefit.ctaLabelAr)}"/></label><label>${ar ? "زر الإجراء EN" : "English CTA"}<input name="${prefix}.ctaLabelEn" value="${escapeHTML(benefit.ctaLabelEn)}"/></label><label>${ar ? "رابط الإجراء" : "CTA URL"}<input name="${prefix}.ctaUrl" value="${escapeHTML(benefit.ctaUrl)}" dir="ltr"/></label></div>
    </article>`;
  }).join("");
  return `<form class="admin-settings-form" id="admin-settings-form"><section><div class="review-section-head"><span>01</span><div><b>${ar ? "هوية المتجر والشعار المركزي" : "Store identity & central logo"}</b><small>${ar ? "يتغير الشعار في الهيدر والقائمة والفوتر من هنا." : "One source updates header, menu, and footer."}</small></div></div>
    <div class="review-grid"><label>${ar ? "اسم المتجر" : "Store name"}<input name="storeName" value="${escapeHTML(settings.storeName)}" /></label>
    <label>${ar ? "العملة" : "Currency"}<select name="currency">${selectOptions([["EGP","EGP"],["USD","USD"],["SAR","SAR"]], settings.currency)}</select></label>
    <label>${ar ? "الضريبة %" : "Tax rate %"}<input name="taxRate" type="number" min="0" max="100" value="${settings.taxRate}" /></label></div>
    <div class="store-logo-settings">${logoFields.map(([key, arLabel, enLabel]) => `<label class="store-logo-field"><span>${ar ? arLabel : enLabel}</span><img id="store-logo-preview-${key}" src="${escapeHTML(settings.logos[key])}" alt=""/><input name="logo${key[0].toUpperCase()}${key.slice(1)}" value="${escapeHTML(settings.logos[key])}" dir="ltr"/><input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-logo-upload="${key}"/></label>`).join("")}</div></section>
    <section><div class="review-section-head"><span>02</span><div><b>${ar ? "محتوى الفوتر والتواصل" : "Footer content & contact"}</b></div></div><div class="footer-settings-grid">
      <label>${ar ? "وصف العربية" : "Arabic description"}<textarea name="footerDescriptionAr">${escapeHTML(settings.footerDescriptionAr)}</textarea></label><label>${ar ? "وصف الإنجليزية" : "English description"}<textarea name="footerDescriptionEn">${escapeHTML(settings.footerDescriptionEn)}</textarea></label>
      <label>${ar ? "صورة الفوتر" : "Footer image URL"}<input name="footerImage" value="${escapeHTML(settings.footerImage)}" dir="ltr"/></label><label>${ar ? "بريد الدعم" : "Support email"}<input name="supportEmail" type="email" value="${escapeHTML(settings.supportEmail)}" dir="ltr"/></label>
      <label>${ar ? "ساعات العمل بالعربية" : "Arabic support hours"}<textarea name="supportHoursAr">${escapeHTML(settings.supportHoursAr)}</textarea></label><label>${ar ? "ساعات العمل بالإنجليزية" : "English support hours"}<textarea name="supportHoursEn">${escapeHTML(settings.supportHoursEn)}</textarea></label>
      <label>${ar ? "عنوان النشرة AR" : "Newsletter title AR"}<input name="newsletterTitleAr" value="${escapeHTML(settings.newsletterTitleAr)}"/></label><label>${ar ? "عنوان النشرة EN" : "Newsletter title EN"}<input name="newsletterTitleEn" value="${escapeHTML(settings.newsletterTitleEn)}"/></label>
      <label>${ar ? "وصف النشرة AR" : "Newsletter copy AR"}<input name="newsletterCopyAr" value="${escapeHTML(settings.newsletterCopyAr)}"/></label><label>${ar ? "وصف النشرة EN" : "Newsletter copy EN"}<input name="newsletterCopyEn" value="${escapeHTML(settings.newsletterCopyEn)}"/></label>
      <label>Google Play URL<input name="googlePlayUrl" value="${escapeHTML(settings.appLinks.googlePlay)}" dir="ltr"/></label><label>App Store URL<input name="appStoreUrl" value="${escapeHTML(settings.appLinks.appStore)}" dir="ltr"/></label>
    </div></section>
    <section><div class="review-section-head"><span>03</span><div><b>${ar ? "روابط التواصل الاجتماعي" : "Social links"}</b><small>${ar ? "الرابط الفارغ يظهر كأيقونة معطلة بدون رابط وهمي." : "Empty URLs render as disabled icons."}</small></div></div><div class="social-settings-grid">${socialNames.map(([key,label]) => `<label>${label}<input name="social.${key}" value="${escapeHTML(settings.socialLinks[key])}" dir="ltr" placeholder="https://"/></label>`).join("")}</div></section>
    <section><div class="review-section-head"><span>04</span><div><b>${ar ? "مزايا الفوتر وصفحاتها" : "Footer benefits & detail pages"}</b><small>${ar ? "عدّل المحتوى والترتيب والرسم والألوان من مكان واحد." : "Edit content, order, illustration, and colors in one place."}</small></div></div><div class="benefits-settings-grid">${benefitMarkup}</div></section>
    <section><div class="review-section-head"><span>05</span><div><b>${ar ? "خيارات مكتشف العطر" : "Fragrance Finder options"}</b><small>${ar ? "فعّل الخيارات التي تظهر للعملاء. يجب إبقاء خيار واحد على الأقل في كل مجموعة." : "Control the options customers can select. Each group must retain at least one option."}</small></div></div>
    <div class="finder-admin-groups">${finderSettingsMarkup}</div><div class="admin-integration-note"><span>✓</span><div><b>${ar ? "الترجمات مكتملة" : "Translations complete"}</b><p>${ar ? "يتحقق فحص البناء من تطابق مفاتيح العربية والإنجليزية ويمنع النصوص الصلبة داخل واجهة مكتشف العطر." : "The build check verifies Arabic/English key parity and blocks hard-coded Finder UI copy."}</p></div></div></section>
    <section><div class="review-section-head"><span>06</span><div><b>${ar ? "الإشعارات والأمان" : "Notifications & security"}</b></div></div>
    <label class="admin-toggle-row"><span><b>${state.lang === "ar" ? "تنبيهات المخزون" : "Low-stock alerts"}</b><small>${state.lang === "ar" ? "تنبيه عند بلوغ الحد الأدنى" : "Notify at reorder threshold"}</small></span><input name="lowStockAlerts" type="checkbox"${settings.lowStockAlerts ? " checked" : ""} /></label>
    <label class="admin-toggle-row"><span><b>${state.lang === "ar" ? "إشعارات الطلبات" : "Order notifications"}</b><small>${state.lang === "ar" ? "إرسال تحديثات رحلة الطلب" : "Send order journey updates"}</small></span><input name="orderNotifications" type="checkbox"${settings.orderNotifications ? " checked" : ""} /></label></section>
    <section><div class="review-section-head"><span>07</span><div><b>${state.lang === "ar" ? "الاتصالات الخارجية" : "External integrations"}</b><small>${state.lang === "ar" ? "لا تظهر المفاتيح السرية في المتصفح." : "Secret keys are never exposed to the browser."}</small></div></div>
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

function alternativesAdminMarkup() {
  const ar = state.lang === "ar";
  const data = state.alternativesAdmin || { items: [], settings: {}, analytics: {} };
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
    <section class="alternatives-admin-matches"><div class="review-section-head"><span>02</span><div><b>${ar ? "العطور المرجعية وربط البدائل" : "Reference fragrances & matches"}</b><small>${ar ? "المنتج البديل مرتبط مباشرة بكتالوج ORIGO؛ السعر والمخزون لا يتكرران هنا." : "Alternative products stay linked to the live ORIGO catalog."}</small></div></div>
      <details class="alternative-create-panel"><summary>＋ ${ar ? "إضافة عطر مرجعي وربطه بمنتج" : "Add a reference fragrance and link a product"}</summary><form id="admin-alternative-create">
        <div class="review-grid"><label>${ar ? "اسم العطر بالعربية" : "Arabic reference name"}<input name="nameAr" required maxlength="200"/></label><label>${ar ? "اسم العطر بالإنجليزية" : "English reference name"}<input name="nameEn" required maxlength="200"/></label></div>
        <div class="review-grid"><label>${ar ? "العلامة التجارية" : "Brand"}<input name="brand" required maxlength="160"/></label><label>${ar ? "الرابط المختصر (اختياري)" : "URL slug (optional)"}<input name="slug" dir="ltr" maxlength="120" placeholder="creed-aventus"/></label></div>
        <div class="review-grid"><label>${ar ? "صورة العطر المرجعي" : "Reference image"}<input name="image" dir="ltr" placeholder="/assets/references/...svg"/></label><label>${ar ? "السعر المرجعي بالجنيه" : "Reference price (EGP)"}<input name="referencePrice" type="number" min="0" step="0.01"/></label></div>
        <div class="review-grid three"><label>${ar ? "التركيز" : "Concentration"}<input name="concentration" placeholder="Eau de Parfum"/></label><label>${ar ? "الحجم" : "Size"}<input name="size" placeholder="100 ml"/></label><label>${ar ? "الجنس" : "Gender"}<select name="gender"><option value="unisex">${ar ? "للجنسين" : "Unisex"}</option><option value="men">${ar ? "رجالي" : "Men"}</option><option value="women">${ar ? "نسائي" : "Women"}</option></select></label></div>
        <div class="review-grid"><label>${ar ? "العائلة العطرية AR" : "Family AR"}<input name="familyAr"/></label><label>${ar ? "العائلة العطرية EN" : "Family EN"}<input name="familyEn"/></label></div>
        <div class="review-grid"><label>${ar ? "النوتات العربية" : "Arabic notes"}<textarea name="notesAr" placeholder="برغموت، ورد، عود"></textarea></label><label>${ar ? "النوتات الإنجليزية" : "English notes"}<textarea name="notesEn" placeholder="Bergamot, Rose, Oud"></textarea></label></div>
        <label>${ar ? "منتج ORIGO البديل" : "Linked ORIGO product"}<select name="productId" required><option value="">${ar ? "اختر منتجًا من الكتالوج" : "Select a catalog product"}</option>${productOptions}</select></label>
        <div class="review-grid three"><label>${ar ? "التشابه (اتركه للحساب الذكي)" : "Similarity (blank = calculated)"}<input name="similarity" type="number" min="0" max="100"/></label><label>${ar ? "الثقة" : "Confidence"}<input name="confidence" type="number" min="0" max="100"/></label><label>${ar ? "الترتيب" : "Order"}<input name="sortOrder" type="number" value="0"/></label></div>
        <div class="review-grid"><label>${ar ? "سبب الترشيح بالعربية" : "Arabic recommendation reason"}<textarea name="reasonAr" required></textarea></label><label>${ar ? "سبب الترشيح بالإنجليزية" : "English recommendation reason"}<textarea name="reasonEn" required></textarea></label></div>
        <button class="button burgundy-button" type="submit">${ar ? "إنشاء العلاقة ونشرها" : "Create and publish match"} ←</button>
      </form></details>
      <div class="alternatives-admin-list">${(data.items || []).map((item) => `<form class="alternative-admin-row" data-alternative-match="${item.id}"><img src="${escapeHTML(item.reference.image)}" alt=""/><div><small>${ar ? "العطر المرجعي" : "Reference"}</small><b>${escapeHTML(ar ? item.reference.nameAr : item.reference.nameEn)}</b><span>${escapeHTML(item.reference.brand)}</span></div><span class="admin-match-arrow">⇄</span><img src="${escapeHTML(item.product.image)}" alt=""/><div><small>${ar ? "منتج ORIGO" : "ORIGO product"}</small><b>${escapeHTML(ar ? item.product.nameAr : item.product.nameEn || item.product.nameAr)}</b><span>${formatPrice(item.product.price)}</span></div><label>${ar ? "التشابه" : "Similarity"}<input name="similarity" type="number" min="0" max="100" value="${item.similarity}"/></label><label>${ar ? "الثقة" : "Confidence"}<input name="confidence" type="number" min="0" max="100" value="${item.confidence}"/></label><label>${ar ? "الترتيب" : "Order"}<input name="sortOrder" type="number" value="${item.sortOrder}"/></label><label>${ar ? "الحالة" : "Status"}<select name="status">${selectOptions([["active",ar?"نشط":"Active"],["hidden",ar?"مخفي":"Hidden"],["draft",ar?"مسودة":"Draft"]],item.status)}</select></label><label class="match-reason">${ar ? "سبب الترشيح" : "Recommendation reason"}<textarea name="reason">${escapeHTML(ar ? item.reasonAr : item.reasonEn)}</textarea></label><label class="admin-pin"><input name="pinned" type="checkbox"${item.pinned ? " checked" : ""}/> ${ar ? "تثبيت" : "Pin"}</label><button type="button" class="button burgundy-button" data-action="save-alternative-match">${ar ? "حفظ" : "Save"}</button></form>`).join("")}</div>
    </section>
    <section><div class="review-section-head"><span>03</span><div><b>${ar ? "أكثر عمليات البحث" : "Top searches"}</b></div></div><div class="admin-family-grid">${(data.analytics?.topSearches || []).map((item)=>`<article><span>⌕</span><div><b>${escapeHTML(item.query || (ar ? "بحث فارغ" : "Empty query"))}</b><small>${Number(item.count)} ${ar ? "مرة" : "searches"}</small></div></article>`).join("") || `<p>${ar ? "لا توجد بيانات بحث بعد." : "No search data yet."}</p>`}</div></section>
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

function homepageRailsAdminMarkup() {
  const ar = state.lang === "ar";
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
  const labels = {
    benefits: ["شريط المزايا", "Benefits rail"], gender: ["التسوق حسب الجنس", "Gender rail"],
    categories: ["شريط الفئات", "Categories rail"], brands: ["شريط العلامات التلقائي", "Autoplay brand marquee"]
  };
  return `<form id="admin-homepage-rails" class="admin-settings-form homepage-rails-admin"><section><div class="review-section-head"><span>01</span><div><b>${ar ? "إدارة أشرطة الصفحة الرئيسية" : "Homepage rails management"}</b><small>${ar ? "الثلاثة الأولى يدوية فقط، وشريط العلامات وحده يتحرك تلقائيًا." : "The first three are manual-only; only the brand marquee autoplays."}</small></div></div>
    <div class="homepage-rail-settings">${Object.entries(settings.homepageRails).map(([key, rail]) => `<article><header><b>${escapeHTML(labels[key][ar ? 0 : 1])}</b><label class="admin-toggle-row"><span>${ar ? "ظاهر" : "Visible"}</span><input name="${key}.enabled" type="checkbox"${rail.enabled !== false ? " checked" : ""}/></label></header><div class="review-grid"><label>${ar ? "العنوان العربي" : "Arabic title"}<input name="${key}.titleAr" value="${escapeHTML(rail.titleAr || "")}"/></label><label>${ar ? "العنوان الإنجليزي" : "English title"}<input name="${key}.titleEn" value="${escapeHTML(rail.titleEn || "")}"/></label><label>${ar ? "الترتيب" : "Order"}<input name="${key}.order" type="number" min="1" max="10" value="${Number(rail.order || 1)}"/></label>${key === "brands" ? `<label>${ar ? "مدة الدورة بالثواني" : "Cycle duration (seconds)"}<input name="brands.speed" type="number" min="12" max="120" value="${Number(rail.speed || 34)}"/></label>` : ""}</div></article>`).join("")}</div></section>
    <section><div class="review-section-head"><span>02</span><div><b>${ar ? "مكتبة وسائط الصفحة الرئيسية" : "Homepage media library"}</b><small>${ar ? "ارفع بانرات الدعاية أو بانرًا مميزًا لعلامة بعينها، مع نص بديل للغتين." : "Upload campaign banners or a featured brand banner with bilingual alt text."}</small></div></div><div class="review-grid"><label>${ar ? "اسم الأصل" : "Asset name"}<input name="mediaName"/></label><label>${ar ? "مكان العرض" : "Placement"}<select name="mediaPlacement"><option value="hero">${ar ? "بانر الدعاية المتغير" : "Rotating campaign banner"}</option><option value="brand-banner">${ar ? "بانر علامة تجارية" : "Brand feature banner"}</option><option value="general">${ar ? "وسائط عامة" : "General media"}</option></select></label><label>${ar ? "العلامة (لبانر العلامة فقط)" : "Brand (brand banner only)"}<input name="mediaBrand" list="homepage-brand-list"/><datalist id="homepage-brand-list">${ORIGO_PERFUME_BRANDS.map((brand) => `<option value="${escapeHTML(brand)}"></option>`).join("")}</datalist></label><label>${ar ? "النص البديل العربي" : "Arabic alt text"}<input name="mediaAltAr"/></label><label>${ar ? "النص البديل الإنجليزي" : "English alt text"}<input name="mediaAltEn"/></label><label>${ar ? "رفع صورة" : "Upload image"}<input name="mediaFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"/></label></div><div class="home-media-library">${settings.homeMedia.length ? settings.homeMedia.map((item) => `<article><img src="${escapeHTML(item.url)}" alt="${escapeHTML(ar ? item.altAr : item.altEn)}"/><span><b>${escapeHTML(item.name)}</b><small>${escapeHTML(item.placement || "general")}${item.brand ? ` · ${escapeHTML(item.brand)}` : ""}<br/>${escapeHTML(ar ? item.altAr : item.altEn)}</small></span><button type="button" data-action="delete-home-media" data-id="${escapeHTML(item.id)}" aria-label="${ar ? "حذف" : "Delete"}">×</button></article>`).join("") : `<p>${ar ? "لم تتم إضافة وسائط بعد." : "No media assets yet."}</p>`}</div></section><button class="button burgundy-button" type="submit">${ar ? "حفظ إعدادات الأشرطة" : "Save rail settings"}</button></form>`;
}

function applyHomepageRailSettings() {
  const settings = mergeStoreSettings(state.adminWorkspace.settings || {}).homepageRails;
  const map = { benefits: ".home-benefits", gender: ".home-gender-section", categories: ".home-categories", brands: ".home-brand-directory" };
  Object.entries(map).forEach(([key, selector]) => {
    const element = $(selector);
    if (!element) return;
    element.hidden = settings[key]?.enabled === false;
    element.style.order = String(Number(settings[key]?.order || 0));
    element.setAttribute("aria-label", state.lang === "ar" ? settings[key]?.titleAr || "" : settings[key]?.titleEn || "");
  });
  document.documentElement.style.setProperty("--brand-marquee-duration", `${Math.max(12, Math.min(120, Number(settings.brands?.speed || 34)))}s`);
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
    categories: `<button class="button burgundy-button" data-action="new-filter">${state.lang === "ar" ? "إضافة فلتر" : "Add filter"} ＋</button>`
  };
  $("#admin-view-actions").innerHTML = actions[view] || (["overview","accounting","reports","settings"].includes(view) ? "" :
    `<button class="button burgundy-button" data-action="admin-create-entity" data-view="${view}">${state.lang === "ar" ? "إضافة جديد" : "Add new"} ＋</button>`);
  const content = {
    overview: overviewMarkup,
    orders: ordersViewMarkup,
    products: productViewMarkup,
    performance: performanceProductsViewMarkup,
    inventory: inventoryViewMarkup,
    customers: customersViewMarkup,
    categories: filtersViewMarkup,
    "product-options": productOptionsAdminMarkup,
    homepage: homepageRailsAdminMarkup,
    alternatives: alternativesAdminMarkup,
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

function passwordFieldMarkup({ name = "password", autocomplete = "current-password", label, required = true } = {}) {
  return `<label class="wide"><span>${label}</span><div class="password-field"><input name="${name}" type="password" autocomplete="${autocomplete}"${required ? " required" : ""} minlength="10" maxlength="200" dir="ltr"/><button type="button" data-action="toggle-password" aria-label="${state.lang === "ar" ? "إظهار كلمة المرور" : "Show password"}" aria-pressed="false">◉</button></div></label>`;
}

function renderAuth(mode = "login", requestId = "") {
  const isRegister = mode === "register";
  const isResetRequest = mode === "reset-request";
  const isResetConfirm = mode === "reset-confirm";
  const ar = state.lang === "ar";
  const resetTitle = isResetRequest ? (ar ? "استعادة كلمة المرور" : "Reset your password") : (ar ? "أدخل رمز التحقق" : "Enter verification code");
  const resetBody = isResetRequest ? (ar ? "اختر قناة الاستعادة، ثم أدخل بريدك أو رقم هاتفك المسجل." : "Choose a recovery channel, then enter your registered email or phone.") : (ar ? "أدخل الرمز المكوّن من 6 أرقام وكلمة المرور الجديدة." : "Enter the 6-digit code and your new password.");
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
            ${isResetRequest ? `<label class="wide"><span>${ar ? "البريد أو رقم الهاتف المسجل" : "Registered email or phone"}</span><input name="identifier" autocomplete="username" required maxlength="254" dir="ltr" /></label><fieldset class="reset-channels"><legend>${ar ? "طريقة إرسال الرمز" : "Send code through"}</legend><label><input type="radio" name="channel" value="email" checked/><span>✉ ${ar ? "البريد" : "Email"}</span></label><label><input type="radio" name="channel" value="whatsapp"/><span>◉ WhatsApp</span></label><label><input type="radio" name="channel" value="sms"/><span>▤ SMS</span></label></fieldset>` : isResetConfirm ? `<input type="hidden" name="requestId" value="${escapeHTML(requestId)}"/><label class="wide"><span>${ar ? "رمز التحقق" : "Verification code"}</span><input name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required dir="ltr"/></label>${passwordFieldMarkup({ autocomplete: "new-password", label: ar ? "كلمة المرور الجديدة" : "New password" })}` : `${isRegister ? `<label class="wide"><span>${ar ? "الاسم" : "Name"}</span><input name="name" autocomplete="name" required minlength="2" maxlength="100" /></label>` : ""}<label class="wide"><span>${ar ? "البريد الإلكتروني" : "Email address"}</span><input name="email" type="email" autocomplete="email" required maxlength="254" dir="ltr" /></label>${isRegister ? `<label class="wide"><span>${ar ? "رقم الهاتف (اختياري)" : "Phone (optional)"}</span><input name="phone" autocomplete="tel" inputmode="tel" dir="ltr" /></label>` : ""}${passwordFieldMarkup({ autocomplete: isRegister ? "new-password" : "current-password", label: ar ? "كلمة المرور" : "Password" })}`}
          </div>
          <p class="form-error" id="auth-error" role="alert"></p>
          <button class="button burgundy-button full" type="submit">${isResetRequest ? (ar ? "إرسال رمز الاستعادة" : "Send recovery code") : isResetConfirm ? (ar ? "تعيين كلمة المرور" : "Set new password") : isRegister ? (ar ? "إنشاء الحساب" : "Create account") : (ar ? "دخول" : "Sign in")}</button>
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
      <img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt="" />
      <div><b>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${item.quantity} × ${formatPrice(product.price)}</small></div>
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
  $("[data-action='language']").textContent = isArabic ? "العربية ◎" : "Arabic ◎";
  const currencyLabel = $("#current-currency");
  if (currencyLabel) currencyLabel.textContent = isArabic ? "ج.م" : "EGP";
  document.title = isArabic ? "ORIGO | أصل الحكاية العطرية" : "ORIGO | The origin of scent";
  renderHomeNavigation();
  renderHomeHero();
  renderBrandCarousel($("#brand-carousel-search")?.value || "");
  renderProducts($(".chip.active")?.dataset.filter || "all");
  renderHomepageCommerce();
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
  if ($("#notes-admin-overlay").classList.contains("open")) renderNotesAdmin();
  if ($("#admin-overlay").classList.contains("open")) renderAdminDashboard(state.adminView);
  applyHomepageRailSettings();
  localStorage.setItem("origoLang", state.lang);
}

function setupTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");
  $$("[data-action='theme']").forEach((button) => {
    button.setAttribute("aria-pressed", String(state.theme === "dark"));
    button.setAttribute("aria-label", state.theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع المظلم");
  });
  applyStoreIdentity();
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
  const normalized = ORIGOCatalog.normalize(query);
  const counts = new Map();
  state.products.forEach((product) => {
    const brand = String(product.brand || "ORIGO").trim();
    counts.set(brand, (counts.get(brand) || 0) + 1);
  });
  const catalogNames = [...ORIGO_PERFUME_BRANDS, ...counts.keys()].filter((brand, index, values) =>
    values.findIndex((candidate) => ORIGOCatalog.normalize(candidate) === ORIGOCatalog.normalize(brand)) === index
  );
  const brands = catalogNames.map((brand) => [brand, counts.get(brand) || 0])
    .filter(([brand]) => !normalized || ORIGOCatalog.normalize(brand).includes(normalized));
  const brandOptions = productOptionItems("brand");
  const items = brands.map(([brand, count]) => {
    const option = brandOptions.find((item) => [item.value,item.nameAr,item.nameEn].some((value) => normalizeOptionSearch(value) === normalizeOptionSearch(brand)));
    const artwork = option?.image ? `<img src="${escapeHTML(option.image)}" alt="" loading="lazy"/>` : `<span aria-hidden="true">${escapeHTML(brand.slice(0, 2).toUpperCase())}</span>`;
    return `<button data-action="brand-search" data-query="${escapeHTML(brand)}" aria-label="${escapeHTML(`${state.lang === "ar" ? "عرض منتجات" : "View products by"} ${brand}`)}">${artwork}<b>${escapeHTML(brand)}</b><small>${count} ${state.lang === "ar" ? "منتج" : "products"}</small></button>`;
  }).join("");
  const duplicateItems = items.replaceAll("<button ", '<button tabindex="-1" ');
  $$("#brand-carousel-track, #home-brand-carousel-track").forEach((track) => {
    track.innerHTML = items ? `<div class="brand-marquee-content"><div class="brand-marquee-set">${items}</div><div class="brand-marquee-set" aria-hidden="true">${duplicateItems}</div></div>` : "";
    bindBrandMarquee(track);
  });
}

function renderHomeNavigation() {
  const brandMenu = $("#header-brands-dropdown");
  if (brandMenu) brandMenu.innerHTML = `<div class="mega-dropdown-heading"><small>${state.lang === "ar" ? "دليل العلامات التجارية" : "Brand directory"}</small><b>${ORIGO_PERFUME_BRANDS.length} ${state.lang === "ar" ? "علامة" : "brands"}</b></div>${ORIGO_PERFUME_BRANDS.map((brand) => `<button data-action="brand-search" data-query="${escapeHTML(brand)}"><span>${escapeHTML(brand)}</span><i>‹</i></button>`).join("")}`;
  const categoryMenu = $("#header-categories-dropdown");
  if (categoryMenu) categoryMenu.innerHTML = `<div class="mega-dropdown-heading"><small>${state.lang === "ar" ? "تسوق حسب الفئة" : "Shop by category"}</small><b>${ORIGO_HOME_CATEGORIES.length} ${state.lang === "ar" ? "فئات" : "categories"}</b></div>${ORIGO_HOME_CATEGORIES.map(([key, ar, en, icon]) => `<button data-action="catalog-category" data-category="${key}"><i>${icon}</i><span>${state.lang === "ar" ? ar : en}</span><b>‹</b></button>`).join("")}`;
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
  const media = (state.adminWorkspace.settings?.homeMedia || []).filter((item) => item.placement === "hero" && item.url);
  const slides = media.length ? media : [{ url: "assets/home/hero/hero-main.png", altAr: "مجموعة عطور فاخرة", altEn: "Luxury perfume collection" }];
  homeHeroIndex = Math.min(homeHeroIndex, slides.length - 1);
  const show = (index) => {
    homeHeroIndex = (index + slides.length) % slides.length;
    const item = slides[homeHeroIndex];
    visual.style.backgroundImage = `url("${String(item.url).replace(/["\\]/g, "")}")`;
    visual.setAttribute("aria-label", state.lang === "ar" ? item.altAr || item.name || "بانر دعائي" : item.altEn || item.name || "Campaign banner");
    [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === homeHeroIndex));
  };
  dots.innerHTML = slides.map((_, index) => `<button type="button" data-home-hero-slide="${index}" aria-label="${state.lang === "ar" ? "الشريحة" : "Slide"} ${index + 1}"></button>`).join("");
  dots.onclick = (event) => {
    const button = event.target.closest("[data-home-hero-slide]");
    if (button) show(Number(button.dataset.homeHeroSlide));
  };
  if (hero.dataset.sliderBound !== "true") {
    hero.dataset.sliderBound = "true";
    let startX = 0;
    hero.addEventListener("pointerdown", (event) => { startX = event.clientX; });
    hero.addEventListener("pointerup", (event) => {
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 55) show(homeHeroIndex + (delta < 0 ? 1 : -1));
    });
  }
  clearInterval(homeHeroTimer);
  if (slides.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) homeHeroTimer = setInterval(() => show(homeHeroIndex + 1), 6500);
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
  const newest = $("#new-product-grid");
  if (newest) {
    const products = state.products.map((product, index) => ({ product, score: productDateScore(product, index) })).sort((a, b) => b.score - a.score).slice(0, 12).map(({ product }) => product);
    newest.innerHTML = products.map((product, index) => productCardMarkup(product, { context: "grid", delay: Math.min(index * 45, 180) })).join("");
    bindHorizontalRail(newest);
  }
  const showcase = $("#home-brand-showcases");
  if (showcase) {
    const configured = state.adminWorkspace.settings?.homeMedia || [];
    const dataBrands = [...new Set(state.products.map((product) => String(product.brand || "").trim()).filter(Boolean))];
    const ordered = [...ORIGO_PERFUME_BRANDS, ...dataBrands].filter((brand, index, values) => values.findIndex((candidate) => ORIGOCatalog.normalize(candidate) === ORIGOCatalog.normalize(brand)) === index);
    showcase.innerHTML = ordered.map((brand) => {
      const products = homeBrandProducts(brand);
      if (!products.length) return "";
      const banner = configured.find((item) => item.placement === "brand-banner" && ORIGOCatalog.normalize(item.brand || "") === ORIGOCatalog.normalize(brand));
      return `<section class="home-brand-showcase"><div class="home-section-head"><button data-action="brand-search" data-query="${escapeHTML(brand)}">${state.lang === "ar" ? "عرض كل المنتجات" : "View all products"} ‹</button><div><small>${state.lang === "ar" ? "مختارات العلامة" : "Brand selection"}</small><h2>${escapeHTML(brand)}</h2></div></div>${banner ? `<button class="home-brand-banner" data-action="brand-search" data-query="${escapeHTML(brand)}"><img src="${escapeHTML(banner.url)}" alt="${escapeHTML(state.lang === "ar" ? banner.altAr : banner.altEn)}" loading="lazy"/></button>` : ""}<div class="product-grid horizontal-scroll horizontal-rail" data-horizontal-rail>${products.slice(0, 12).map((product) => productCardMarkup(product, { context: "grid" })).join("")}</div></section>`;
    }).join("");
    $$('[data-horizontal-rail]', showcase).forEach(bindHorizontalRail);
  }
  observeReveals();
}

function renderFooterBrands() {
  const holder = $("#footer-brand-links");
  if (!holder) return;
  const brands = [...new Set(state.products.map((product) => String(product.brand || "").trim()).filter(Boolean))].slice(0, 5);
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

function safeBenefitColor(value, fallback) {
  return /^#[0-9a-f]{3,8}$/i.test(String(value || "")) ? value : fallback;
}

function footerBenefitIcon(icon, colors = []) {
  const a = safeBenefitColor(colors[0], "#7b0a20");
  const b = safeBenefitColor(colors[1], "#77b8ff");
  const c = safeBenefitColor(colors[2], "#f2b844");
  const common = `viewBox="0 0 112 112" role="img" aria-hidden="true" focusable="false"`;
  if (icon === "returns") return `<svg ${common}><circle cx="56" cy="56" r="38" fill="${escapeHTML(c)}" opacity=".2"/><path d="M27 46a31 31 0 0 1 51-14" fill="none" stroke="${escapeHTML(a)}" stroke-width="8" stroke-linecap="round"/><path d="m74 18 10 15-18 3" fill="none" stroke="${escapeHTML(a)}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M85 66a31 31 0 0 1-51 14" fill="none" stroke="${escapeHTML(b)}" stroke-width="8" stroke-linecap="round"/><path d="m38 94-10-15 18-3" fill="none" stroke="${escapeHTML(b)}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M49 46h20v18H49z" fill="#fff" stroke="${escapeHTML(a)}" stroke-width="3"/></svg>`;
  if (icon === "gift") return `<svg ${common}><rect x="22" y="43" width="68" height="51" rx="7" fill="${escapeHTML(a)}"/><rect x="18" y="35" width="76" height="20" rx="6" fill="${escapeHTML(b)}"/><path d="M56 36v58" stroke="${escapeHTML(c)}" stroke-width="9"/><path d="M55 34C39 34 31 27 34 19c4-10 19 2 21 15Zm2 0c16 0 24-7 21-15-4-10-19 2-21 15Z" fill="none" stroke="${escapeHTML(c)}" stroke-width="7" stroke-linejoin="round"/><circle cx="29" cy="72" r="4" fill="#fff" opacity=".7"/><path d="m80 60 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#fff"/></svg>`;
  if (icon === "samples") return `<svg ${common}><path d="M47 15h19v15H47z" fill="${escapeHTML(c)}" stroke="${escapeHTML(a)}" stroke-width="3"/><rect x="42" y="28" width="29" height="11" rx="4" fill="${escapeHTML(a)}"/><path d="M36 40h41l7 45c1 7-4 12-11 12H40c-7 0-12-5-11-12Z" fill="${escapeHTML(b)}" opacity=".78" stroke="${escapeHTML(a)}" stroke-width="4"/><path d="M40 49h33l3 35H36z" fill="#fff" opacity=".55"/><circle cx="80" cy="70" r="14" fill="#ffd4df"/><circle cx="80" cy="70" r="5" fill="${escapeHTML(c)}"/><path d="M80 51c6 4 7 9 0 14-7-5-6-10 0-14Zm19 19c-4 6-9 7-14 0 5-7 10-6 14 0ZM80 89c-6-4-7-9 0-14 7 5 6 10 0 14ZM61 70c4-6 9-7 14 0-5 7-10 6-14 0Z" fill="${escapeHTML(a)}" opacity=".82"/></svg>`;
  return `<svg ${common}><rect x="17" y="49" width="67" height="35" rx="7" fill="${escapeHTML(b)}"/><path d="M22 49h48l-8-17H33z" fill="#d8edff" stroke="${escapeHTML(a)}" stroke-width="3"/><path d="M84 59h13l9 11v14H84Z" fill="${escapeHTML(a)}"/><path d="m91 62 8 9h-8Z" fill="#fff" opacity=".8"/><circle cx="36" cy="86" r="10" fill="#303b50"/><circle cx="36" cy="86" r="4" fill="${escapeHTML(c)}"/><circle cx="88" cy="86" r="10" fill="#303b50"/><circle cx="88" cy="86" r="4" fill="${escapeHTML(c)}"/><path d="M10 58h22M5 67h24M14 76h18" stroke="${escapeHTML(a)}" stroke-width="5" stroke-linecap="round"/><path d="m75 24 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="${escapeHTML(c)}"/></svg>`;
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
  const announcement = $(".announcement");
  if (announcement) {
    const threshold = Number(settings.freeShippingThreshold || 3000);
    const value = new Intl.NumberFormat(state.lang === "ar" ? "ar-EG" : "en-EG", { maximumFractionDigits: 0 }).format(threshold);
    announcement.textContent = state.lang === "ar"
      ? `🚚 شحن مجاني للطلبات المؤهلة فوق ${value} جنيه مصري`
      : `🚚 Free shipping on eligible orders over EGP ${value}`;
    announcement.setAttribute("aria-hidden", "false");
  }
  $$('[data-store-logo]').forEach((image) => {
    const requested = image.dataset.logoVariant || "auto";
    const variant = requested === "auto" ? (state.theme === "dark" ? "dark" : "light") : requested;
    const src = settings.logos[variant] || settings.logos.light || defaultStoreSettings.logos.light;
    if (image.getAttribute("src") !== src) image.setAttribute("src", src);
    image.alt = `${settings.storeName || "ORIGO"} SCENTS`;
  });
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
  $("#footer-description").textContent = description;
  $("#footer-newsletter-title").textContent = newsletterTitle;
  $("#footer-newsletter-copy").textContent = newsletterCopy;
  $("#footer-email").placeholder = isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email address";
  const newsletterButton = $("#newsletter-form button[type='submit'] span");
  if (newsletterButton && $("#newsletter-form").dataset.status !== "loading") newsletterButton.textContent = isArabic ? "اشترك الآن" : "Subscribe now";
  const storyImage = $("#footer-story-image");
  if (storyImage && settings.footerImage) storyImage.src = settings.footerImage;
  $("#footer-benefits").innerHTML = activeFooterBenefits().map((benefit) => `<a class="footer-benefit-card" href="/benefits/${escapeHTML(benefit.slug)}" data-action="benefit-link" data-slug="${escapeHTML(benefit.slug)}">
    <span class="footer-benefit-icon">${footerBenefitIcon(benefit.icon, benefit.colors)}</span>
    <b>${escapeHTML(isArabic ? benefit.titleAr : benefit.titleEn)}</b><small>${escapeHTML(isArabic ? benefit.shortAr : benefit.shortEn)}</small></a>`).join("");
  const email = String(settings.supportEmail || defaultStoreSettings.supportEmail).trim();
  const emailLink = $("#footer-support-email");
  emailLink.href = `mailto:${encodeURIComponent(email)}`;
  $("b", emailLink).textContent = email;
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
    const href = safePublicHref(settings.socialLinks[name], { externalOnly: true });
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
  if (columns[1]) { $("h3", columns[1]).textContent = isArabic ? "ماركات" : "Brands"; setRowText($(".footer-all-link", columns[1]), isArabic ? "عرض جميع الماركات" : "View all brands"); }
  if (columns[2]) {
    $("h3", columns[2]).textContent = isArabic ? "معلومات" : "Information";
    const labels = isArabic ? ["عن أوريجو", "الأسئلة الشائعة", "سياسة الشحن والتوصيل", "سياسة الاسترجاع", "سياسة الخصوصية", "الشروط والأحكام", "تتبع الطلب"] : ["About ORIGO", "Frequently asked questions", "Shipping policy", "Return policy", "Privacy policy", "Terms & conditions", "Track order"];
    [...$$(':scope > a', columns[2]), ...$$(':scope > button', columns[2])].forEach((row, index) => setRowText(row, labels[index]));
  }
  if (columns[3]) $("h3", columns[3]).textContent = isArabic ? "خدمة العملاء" : "Customer service";
  if (columns[4]) {
    const headings = $$("h3", columns[4]);
    if (headings[0]) headings[0].textContent = isArabic ? "حمل التطبيق" : "Get the app";
    if (headings[1]) headings[1].textContent = isArabic ? "تابعنا" : "Follow us";
    const copy = $(":scope > p", columns[4]);
    if (copy) copy.innerHTML = isArabic ? "تسوق أسهل وأسرع<br />مع تطبيق أوريجو" : "Shop faster and easier<br />with the ORIGO app";
  }
  const copyright = $(".footer-bottom-bar p", footer);
  if (copyright) copyright.innerHTML = `© <span id="footer-year">${new Date().getFullYear()}</span> ORIGO. ${isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}`;
  renderFooterBrands();
  applyStoreIdentity();
}

function footerBenefitBySlug(slug) {
  return (state.adminWorkspace.settings?.footerBenefits || defaultFooterBenefits).find((item) => item.slug === slug && item.active !== false);
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
  $("#benefit-detail-content").innerHTML = `<nav class="benefit-breadcrumb" aria-label="${isArabic ? "مسار الصفحة" : "Breadcrumb"}"><a href="/" data-action="catalog-home">${isArabic ? "الرئيسية" : "Home"}</a><span>‹</span><a href="#site-footer">${isArabic ? "مزايا ORIGO" : "ORIGO benefits"}</a><span>‹</span><b>${escapeHTML(title)}</b></nav>
    <article class="benefit-detail-hero" style="--benefit-soft:${escapeHTML(soft)}"><div class="benefit-detail-art">${footerBenefitIcon(benefit.icon, benefit.colors)}</div><div class="benefit-detail-copy"><span class="eyebrow">ORIGO CARE</span><h1 id="benefit-detail-title">${escapeHTML(title)}</h1><p>${escapeHTML(description)}</p><a class="benefit-detail-cta" href="${escapeHTML(ctaUrl)}">${escapeHTML(ctaLabel)} <span>←</span></a></div></article>
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
  document.body.classList.remove("catalog-route", "notes-route");
  document.body.classList.add("benefit-route");
  $("#catalog-page").hidden = true;
  $("#notes-library-page").hidden = true;
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
    .slice(0, 12);
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
  document.body.classList.remove("notes-route", "benefit-route");
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
  if (products.length) groups.push([state.lang === "ar" ? "منتجات" : "Products", products.map((product) => `<button role="option" data-action="catalog-suggestion-product" data-id="${escapeHTML(product.id)}"><img src="${escapeHTML(product.image || "assets/origo-hero.png")}" alt=""/><span><b>${escapeHTML(state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr)}</b><small>${escapeHTML(product.brand)}</small></span></button>`).join("")]);
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
  showToast(state.lang === "ar" ? `تمت إضافة ${product.nameAr} إلى السلة` : `${product.nameEn || product.nameAr} added to cart`);
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
  container.innerHTML = products.map((product) => productCardMarkup(product, { context: "wishlist", compact: true })).join("");
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
  const name = state.lang === "ar" ? product.nameAr : product.nameEn || product.nameAr;
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

function productPerformanceMarkup(product) {
  const performance = product.performance || {};
  const insights = product.insights || {};
  const values = [
    ["◷", "الثبات", "Longevity", performance.longevity ?? insights.longevity],
    ["◉", "الفوحان", "Sillage", performance.sillage ?? performance.projection ?? insights.sillage],
    ["❧", "الموسم", "Season", (product.seasons || []).join(" · ")],
    ["◇", "الاستخدام", "Occasion", (product.occasions || []).join(" · ")]
  ].filter((item) => item[3] !== undefined && item[3] !== null && item[3] !== "");
  if (!values.length) return "";
  return `<section class="pdp-performance" aria-labelledby="pdp-performance-title"><div class="pdp-section-heading"><span>EDITORIAL</span><h2 id="pdp-performance-title">${state.lang === "ar" ? "ملخص الأداء التحريري" : "Editorial performance"}</h2><p>${state.lang === "ar" ? "بيانات يقدمها فريق المنتج وليست تصويتًا مجتمعيًا." : "Product-team data, not community voting."}</p></div><div>${values.map(([icon, ar, en, value]) => `<article><i>${icon}</i><small>${state.lang === "ar" ? ar : en}</small><b>${escapeHTML(typeof value === "number" ? `${value}/5` : value)}</b></article>`).join("")}</div></section>`;
}

function productCardMarkup(product, options = {}) {
  if (typeof options === "string") options = { meta: options, context: "recommendation" };
  const isArabic = state.lang === "ar";
  const name = isArabic ? product.nameAr : product.nameEn || product.nameAr;
  const secondaryName = isArabic ? product.nameEn : product.nameAr;
  const interactive = options.interactive !== false;
  const media = productMedia(product);
  if (product.hoverImage && !media.some((item) => item.url === product.hoverImage)) media.push({ url: product.hoverImage, type: "image" });
  const imageIndex = Math.min(Math.max(0, Number(state.cardImageIndexes[product.id] || 0)), Math.max(0, media.length - 1));
  const mainImage = media[imageIndex]?.url || product.image || "assets/origo-hero.png";
  const richVariants = [...(Array.isArray(product.variantOptions) ? product.variantOptions : []), ...(Array.isArray(product.variants) ? product.variants.filter((item) => item && typeof item === "object") : [])];
  const selectedVariantId = state.selectedCardVariants[product.id];
  const variant = richVariants.find((item) => String(item.id || item.size) === String(selectedVariantId)) || richVariants[0] || null;
  const price = Number(variant?.price ?? product.price ?? 0);
  const oldPrice = Number(variant?.oldPrice ?? product.oldPrice ?? 0);
  const knownStockValue = variant?.stock ?? product.inventory?.quantity;
  const knownStock = knownStockValue !== undefined && knownStockValue !== null && knownStockValue !== "";
  const outOfStock = product.status === "unavailable" || (knownStock && Number(knownStockValue) <= 0);
  const discount = oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;
  const explicitBadge = String(isArabic ? product.cardBadgeAr || product.badgeAr || "" : product.cardBadgeEn || product.badgeEn || product.badgeAr || "").trim();
  const normalizedBadge = ORIGOCatalog.normalize(explicitBadge);
  const isNew = Boolean(product.isNew) || /new|جديد|وصل حديثا/.test(normalizedBadge);
  const badgeCandidates = [
    outOfStock ? [100, isArabic ? "نفد المخزون" : "OUT OF STOCK", "stock"] : null,
    isNew ? [90, isArabic ? "جديد" : "NEW", "new"] : null,
    discount ? [80, `-${discount}%`, "sale"] : null
  ].filter(Boolean).sort((a, b) => b[0] - a[0]);
  const badges = badgeCandidates.filter((item, index, list) => list.findIndex((other) => other[1] === item[1]) === index).slice(0, 2);
  const preferredNotes = Array.isArray(product.featuredNotes) && product.featuredNotes.length
    ? product.featuredNotes
    : (isArabic ? product.notesAr : product.notesEn || product.notesAr) || [];
  const notes = preferredNotes.slice(0, 3).map((value) => {
    const note = window.ORIGOFragranceNotes?.find(value);
    return { label: note ? noteLabel(note) : value, image: note ? window.ORIGOFragranceNotes.artwork(note) : "" };
  });
  const saved = state.wishlist.includes(product.id);
  const sizeLabel = variant?.size || (product.sizes || [])[0] || "";
  const loyaltyPoints = Number(variant?.loyaltyPoints ?? product.loyaltyPoints);
  const delayStyle = Number.isFinite(options.delay) ? ` style="transition-delay:${options.delay}ms"` : "";
  const context = escapeHTML(options.context || "grid");
  const disabled = interactive ? "" : " disabled tabindex=\"-1\"";
  return `<article class="product-card perfume-product-card origo-product-card origo-product-card--${context}${options.reveal ? " reveal" : ""}${outOfStock ? " is-out" : ""}${options.compact ? " is-compact" : ""}" data-id="${escapeHTML(product.id)}"${delayStyle}>
    <div class="product-image product-card-media product-card-media-swipe" data-product-id="${escapeHTML(product.id)}" role="link" tabindex="${interactive ? "0" : "-1"}" aria-label="${escapeHTML(isArabic ? `عرض تفاصيل ${name}` : `View ${name}`)}">
      <img class="product-card-primary" src="${escapeHTML(mainImage)}" alt="${escapeHTML(`${product.brand} ${name}`)}" width="640" height="700" loading="lazy" decoding="async" />
      <div class="product-card-badges">${badges.map(([, label, kind]) => `<span class="product-badge badge-${kind}">${escapeHTML(label)}</span>`).join("")}</div>
      <button class="heart-button${saved ? " active" : ""}"${interactive ? ` data-action="toggle-wishlist"` : disabled} aria-label="${escapeHTML(saved ? translations[state.lang].removeFavorite : translations[state.lang].favorites)}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
      ${media.length > 1 ? `<button class="card-image-arrow previous" data-action="card-image" data-id="${escapeHTML(product.id)}" data-change="-1" aria-label="${isArabic ? "الصورة السابقة" : "Previous image"}">‹</button><button class="card-image-arrow next" data-action="card-image" data-id="${escapeHTML(product.id)}" data-change="1" aria-label="${isArabic ? "الصورة التالية" : "Next image"}">›</button><div class="card-image-dots" aria-label="${isArabic ? "صور المنتج" : "Product images"}">${media.map((_, index) => `<button data-action="card-image-index" data-id="${escapeHTML(product.id)}" data-index="${index}" class="${index === imageIndex ? "active" : ""}" aria-label="${isArabic ? `الصورة ${index + 1}` : `Image ${index + 1}`}"></button>`).join("")}</div>` : ""}
    </div>
    <div class="product-info product-card-info">
      <div class="product-card-summary">
        <div class="product-card-identity"><div class="product-brand">${escapeHTML(product.brand || "ORIGO")}</div><div class="product-card-title-row"><div><h3>${escapeHTML(name || (isArabic ? "منتج جديد" : "New product"))}</h3>${secondaryName && secondaryName !== name ? `<p class="product-card-secondary-name">${escapeHTML(secondaryName)}</p>` : ""}</div><p class="product-card-type">${escapeHTML([isArabic ? product.type : product.typeEn || product.type, sizeLabel, product.concentration].filter(Boolean).join(" | "))}</p></div></div>
        <div class="product-card-price-row"><b class="product-price">${formatPrice(price)}</b>${oldPrice > price ? `<span><del>${formatPrice(oldPrice)}</del><em>-${discount}%</em></span>` : ""}${Number.isFinite(loyaltyPoints) && loyaltyPoints > 0 ? `<small>◉ +${Math.round(loyaltyPoints)} ${isArabic ? "نقطة ORIGO" : "ORIGO points"}</small>` : ""}</div>
      </div>
      ${notes.length ? `<div class="product-notes product-card-notes">${notes.map((note) => `<span>${note.image ? `<img src="${escapeHTML(note.image)}" alt="" loading="lazy" />` : `<i>✦</i>`}<b>${escapeHTML(note.label)}</b></span>`).join("")}</div>` : ""}
      ${options.meta ? `<p class="product-card-meta">${escapeHTML(options.meta)}</p>` : ""}
      ${sizeLabel ? `<p class="product-card-size" dir="ltr">${escapeHTML(sizeLabel)}</p>` : ""}
      <div class="product-card-commerce"><button class="card-add-button"${interactive ? ` data-action="add-to-cart"` : disabled} aria-label="${translations[state.lang].addToBag}"${outOfStock ? " disabled" : ""}><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 8.5h11l1 12h-13l1-12Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg></i><span>${outOfStock ? (isArabic ? "غير متوفر" : "Unavailable") : translations[state.lang].addToBag}</span></button></div>
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
  const name = isArabic ? product.nameAr : product.nameEn || product.nameAr;
  const secondName = isArabic ? product.nameEn : product.nameAr;
  const media = productMedia(product);
  if (!media.length) media.push({ url: "assets/origo-hero.png", type: "image" });
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

  $("#product-dialog-content").innerHTML = `
    <main class="pdp-page" aria-labelledby="product-dialog-title">
      <button class="pdp-back" data-action="close-product-page" aria-label="${isArabic ? "العودة للمتجر" : "Back to store"}"><span>×</span>${isArabic ? "العودة للمتجر" : "Back to store"}</button>
      <nav class="pdp-breadcrumb" aria-label="${isArabic ? "مسار الصفحة" : "Breadcrumb"}"><a href="#home-hero" data-action="close-product-page">${isArabic ? "الرئيسية" : "Home"}</a><i>‹</i><a href="#featured" data-action="close-product-page">${isArabic ? "العطور" : "Perfumes"}</a><i>‹</i><span>${escapeHTML(product.brand)}</span><i>‹</i><b>${escapeHTML(name)}</b></nav>
      <section class="pdp-hero">
        <div class="pdp-gallery">
          <div class="pdp-thumbnails" aria-label="${isArabic ? "صور المنتج" : "Product media"}">${media.map((item, index) => `<button class="${index === state.activeProductImageIndex ? "active" : ""}" data-action="product-image" data-index="${index}" aria-label="${isArabic ? `الصورة ${index + 1}` : `Image ${index + 1}`}" aria-pressed="${index === state.activeProductImageIndex}"><img src="${escapeHTML(item.url)}" alt="" loading="${index ? "lazy" : "eager"}" /></button>`).join("")}</div>
          <div class="pdp-main-image"><span>${escapeHTML(isArabic ? product.badgeAr || "" : product.badgeEn || product.badgeAr || "")}</span><button data-action="product-zoom" aria-label="${isArabic ? "تكبير صورة المنتج" : "Zoom product image"}">⌕</button><img src="${escapeHTML(activeMedia.url)}" alt="${escapeHTML(`${product.brand} ${name}`)}" /></div>
        </div>
        ${productHeroProfileMarkup(product)}
        <aside class="pdp-purchase">
          <span class="pdp-brand">${escapeHTML(product.brand)}</span><h1 id="product-dialog-title">${escapeHTML(name)}</h1>${secondName && secondName !== name ? `<p class="pdp-english-name">${escapeHTML(secondName)}</p>` : ""}
          <div class="pdp-tags"><span>${catalogGender(product) === "women" ? "♀" : catalogGender(product) === "men" ? "♂" : "⚥"} ${escapeHTML(isArabic ? product.type || (catalogGender(product) === "women" ? "للنساء" : catalogGender(product) === "men" ? "للرجال" : "للجنسين") : product.typeEn || product.type || catalogGender(product))}</span>${product.concentration ? `<span>${escapeHTML(product.concentration)}</span>` : ""}${product.sku ? `<span>SKU ${escapeHTML(product.sku)}</span>` : ""}</div>
          <div class="pdp-price"><b>${formatPrice(product.price)}</b>${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ""}${discount ? `<em>-${discount}%</em>` : ""}<small>${taxRate ? (isArabic ? `شامل ضريبة القيمة المضافة ${taxRate}%` : `VAT ${taxRate}% included`) : ""}</small></div>
          ${sizes[0] ? `<p class="pdp-fixed-size">${isArabic ? "الحجم" : "Size"}: <b>${escapeHTML(sizes[0])}</b></p>` : ""}
          <div class="pdp-stock ${available ? "available" : "unavailable"}"><i></i><span>${available ? (isArabic ? "متوفر للطلب" : "Available to order") : (isArabic ? "غير متوفر حاليًا" : "Currently unavailable")}</span></div>
          <div class="pdp-quantity"><span>${isArabic ? "الكمية" : "Quantity"}</span><div><button data-action="detail-quantity" data-change="-1" aria-label="${isArabic ? "تقليل الكمية" : "Decrease quantity"}">−</button><b>${state.activeProductQuantity}</b><button data-action="detail-quantity" data-change="1" aria-label="${isArabic ? "زيادة الكمية" : "Increase quantity"}">＋</button></div></div>
          <div class="pdp-actions"><button class="pdp-add" data-action="product-detail-add" data-id="${escapeHTML(product.id)}"${available ? "" : " disabled"}><span>♧</span>${translations[state.lang].addToBag}</button><button class="pdp-favorite ${isSaved ? "active" : ""}" data-action="quick-view-wishlist" data-id="${escapeHTML(product.id)}"><span>${isSaved ? "♥" : "♡"}</span>${isSaved ? (isArabic ? "محفوظ في المفضلة" : "Saved") : (isArabic ? "أضف إلى المفضلة" : "Add to wishlist")}</button></div>
          <div class="pdp-benefits"><span><i>✓</i>${isArabic ? "منتج أصلي 100%" : "100% authentic"}</span><span><i>◉</i>${isArabic ? "الدفع عند الاستلام" : "Cash on delivery"}</span></div>
        </aside>
      </section>
      ${productProfileAccordions(product)}
      ${productIngredientsMarkup(product)}
      ${description ? `<section class="pdp-description"><div class="pdp-section-heading"><span>ORIGO PROFILE</span><h2>${isArabic ? "عن العطر" : "About the fragrance"}</h2></div><p>${escapeHTML(description)}</p></section>` : ""}
      ${window.ORIGOAlternatives?.productPanel?.(product.id) || ""}
      ${related.length ? `<section class="pdp-recommendations"><div class="pdp-section-heading"><span>DISCOVER</span><h2>${isArabic ? "عطور قد تعجبك" : "You may also like"}</h2><p>${isArabic ? "مرتبة حسب تشابه النوتات والعائلة والنوع والسعر — بلا نتائج عشوائية." : "Ranked by notes, family, gender and price — never random."}</p></div><div class="pdp-products-row">${related.map(({ item, shared, score }) => productCardMarkup(item, `${score}% ${isArabic ? "تشابه" : "match"}${shared.length ? ` · ${shared.slice(0, 2).join("، ")}` : ""}`)).join("")}</div></section>` : ""}
      ${recent.length ? `<section class="pdp-recommendations recently"><div class="pdp-section-heading"><span>RECENT</span><h2>${isArabic ? "شوهد مؤخرًا" : "Recently viewed"}</h2></div><div class="pdp-products-row">${recent.map((item) => productCardMarkup(item)).join("")}</div></section>` : ""}
      <div class="pdp-mobile-cart"><div><small>${sizes[0] ? escapeHTML(sizes[0]) : escapeHTML(product.concentration || "")}</small><b>${formatPrice(product.price)}</b></div><button data-action="product-detail-add" data-id="${escapeHTML(product.id)}"${available ? "" : " disabled"}>${translations[state.lang].addToBag}</button></div>
    </main>`;
  $("#product-dialog-content").querySelectorAll("img").forEach((image) => image.addEventListener("error", () => (image.src = "assets/origo-hero.png"), { once: true }));
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
        <span class="smart-select-chips">${selectedItems.length ? selectedItems.map((item) => `<i data-smart-value="${escapeHTML(item.value)}">${item.image ? `<img src="${escapeHTML(item.image)}" alt="" />` : item.icon ? `<em>${escapeHTML(item.icon)}</em>` : ""}${escapeHTML(state.lang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr)}${multiple ? `<button type="button" data-action="smart-select-remove" data-value="${escapeHTML(item.value)}" aria-label="${adminCopy("حذف","Remove")}">×</button>` : ""}</i>`).join("") : `<small>${adminCopy("ابحث أو اختر…","Search or select…")}</small>`}</span><strong>⌄</strong>
      </div>
      <div class="smart-select-menu" hidden>
        <div class="smart-select-search"><input type="search" data-smart-search placeholder="${adminCopy("ابحث بالعربية أو الإنجليزية…","Search in Arabic or English…")}" autocomplete="off"/><button type="button" data-action="smart-select-settings" title="${adminCopy("إدارة الخيارات","Manage options")}">⚙</button></div>
        <div class="smart-select-actions">${all && multiple ? `<button type="button" data-action="smart-select-all">${adminCopy("تحديد الكل","Select all")}</button>` : ""}<button type="button" data-action="smart-select-clear">${adminCopy("مسح الكل","Clear all")}</button></div>
        <div class="smart-select-options" role="listbox"${multiple ? ` aria-multiselectable="true"` : ""}>${visible.map((item) => `<button type="button" role="option" data-action="smart-select-option" data-value="${escapeHTML(item.value)}" data-search="${escapeHTML(normalizeOptionSearch(`${item.nameAr} ${item.nameEn} ${item.value}`))}" aria-selected="${values.some((value) => normalizeOptionSearch(value) === normalizeOptionSearch(item.value))}">${item.image ? `<img src="${escapeHTML(item.image)}" alt=""/>` : `<em style="${item.color ? `--option-color:${escapeHTML(item.color)}` : ""}">${escapeHTML(item.icon || "◇")}</em>`}<span><b>${escapeHTML(state.lang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr)}</b><small>${escapeHTML(state.lang === "ar" ? item.nameEn || "" : item.nameAr || "")}</small></span><i>✓</i></button>`).join("")}</div>
        ${allowCreate ? `<button type="button" class="smart-select-create" data-action="smart-select-create">＋ ${adminCopy("إضافة خيار جديد","Add new option")}</button>` : ""}
      </div>
    </div>${hintAr || hintEn ? `<small>${adminCopy(hintAr,hintEn)}</small>` : ""}</label>`;
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
    <div class="admin-card-preview-head"><span class="eyebrow">LIVE PRODUCT CARD</span><div><button type="button" data-action="admin-card-preview-mode" data-mode="desktop" class="${state.adminCardPreviewMode === "desktop" ? "active" : ""}">${adminCopy("سطح المكتب", "Desktop")}</button><button type="button" data-action="admin-card-preview-mode" data-mode="mobile" class="${state.adminCardPreviewMode === "mobile" ? "active" : ""}">${adminCopy("هاتف", "Mobile")}</button><button type="button" data-action="admin-card-preview-theme" data-theme="light" class="${state.adminCardPreviewTheme === "light" ? "active" : ""}">${adminCopy("فاتح", "Light")}</button><button type="button" data-action="admin-card-preview-theme" data-theme="dark" class="${state.adminCardPreviewTheme === "dark" ? "active" : ""}">${adminCopy("مظلم", "Dark")}</button></div></div>
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
  ["marine", "بحري", "Marine", "#458fc5", "≋"]
];

function adminAccordEditor(product) {
  const existing = new Map((product.accordProfile || []).map((item) => [item.id || item.nameEn || item.nameAr, item]));
  const fallback = new Set((product.mainAccords || product.accords || []).map((item) => ORIGOCatalog.normalize(typeof item === "object" ? (item.nameAr || item.nameEn) : item)));
  return `<div class="accord-admin-editor">
    <div class="accord-admin-toolbar"><div><b>${adminCopy("الأكوردات الرئيسية — البصمة العطرية", "Main accords — fragrance fingerprint")}</b><small>${adminCopy("اختر الأكورد واضبط قوته؛ كل نسبة مستقلة.", "Select accords and set each independent strength.")}</small></div><button type="button" data-action="sort-admin-accords">${adminCopy("ترتيب حسب القوة", "Sort by strength")}</button></div>
    <div class="accord-admin-list">${ORIGO_ACCORD_LIBRARY.map(([id, arName, enName, color, icon], index) => {
      const item = existing.get(id) || [...existing.values()].find((value) => ORIGOCatalog.normalize(value.nameAr || value.nameEn) === ORIGOCatalog.normalize(arName));
      const checked = Boolean(item) || fallback.has(ORIGOCatalog.normalize(arName)) || fallback.has(ORIGOCatalog.normalize(enName));
      const strength = Number(item?.strength ?? (checked ? Math.max(42, 92 - index * 6) : 50));
      return `<label class="accord-admin-item${checked ? " selected" : ""}" style="--accord:${color}"><input type="checkbox" name="accordSelected" value="${id}"${checked ? " checked" : ""}/><span class="accord-symbol">${icon}</span><span><b>${adminCopy(arName,enName)}</b><small>${adminCopy(enName,arName)}</small></span><input aria-label="${adminCopy(`قوة ${arName}`,`${enName} strength`)}" type="range" name="accordStrength.${id}" min="0" max="100" value="${strength}"/><output>${strength}%</output></label>`;
    }).join("")}</div>
    <div class="accord-admin-live" id="accord-admin-live"></div>
  </div>`;
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
        <div class="review-section-head"><span>03</span><div><b>${adminCopy("البنية العطرية والبصمة", "Fragrance structure & fingerprint")}</b><small>${adminCopy("هرم النوتات والمكونات الأساسية والأكوردات أقسام مستقلة.", "Notes pyramid, key ingredients, and accords stay separate.")}</small></div></div>
        <h4 class="fragrance-editor-subtitle">${adminCopy("هرم النوتات العطرية", "Fragrance note pyramid")}</h4>
        <div class="review-grid note-review-grid">
          ${searchableCreatableSelect({ name:"topNotes", group:"note", labelAr:"النوتات الافتتاحية", labelEn:"Top notes", selected:product.noteSelections?.top || product.notes.topEn || product.notes.topAr, multiple:true })}
          ${searchableCreatableSelect({ name:"heartNotes", group:"note", labelAr:"نوتات القلب", labelEn:"Heart notes", selected:product.noteSelections?.heart || product.notes.heartEn || product.notes.heartAr, multiple:true })}
          ${searchableCreatableSelect({ name:"baseNotes", group:"note", labelAr:"نوتات القاعدة", labelEn:"Base notes", selected:product.noteSelections?.base || product.notes.baseEn || product.notes.baseAr, multiple:true })}
        </div>
        <div class="note-library-match-preview" id="note-library-match-preview"></div>
        <div class="review-grid">${searchableCreatableSelect({ name:"mainIngredients", group:"note", labelAr:"المكونات الأساسية", labelEn:"Key ingredients", selected:product.mainIngredients, multiple:true, hintAr:"اختر من 3 إلى 8 مكونات رئيسية مستقلة عن هرم النوتات.", hintEn:"Choose 3–8 key ingredients, separate from the note pyramid." })}</div>
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
          <label>${adminCopy("بدائل العطر", "Alternative product IDs")}<input name="alternativeIds" value="${escapeHTML(csv(product.alternativeIds))}" /></label>
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
    mainIngredients: csvValues(data.get("mainIngredients")),
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

document.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.closest(".origo-product-card") || image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = "true";
  image.src = "assets/origo-hero.png";
}, true);

let productCardGesture = null;
document.addEventListener("pointerdown", (event) => {
  const media = event.target.closest(".product-card-media-swipe");
  if (!media || event.target.closest("button")) return;
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
  else if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) showProductDetails(getProduct(productId));
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
    showProductDetails(getProduct(media.dataset.productId));
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
    return `<i data-smart-value="${escapeHTML(value)}">${item.image ? `<img src="${escapeHTML(item.image)}" alt="" />` : item.icon ? `<em>${escapeHTML(item.icon)}</em>` : ""}${escapeHTML(state.lang === "ar" ? item.nameAr || item.nameEn : item.nameEn || item.nameAr)}${multiple ? `<button type="button" data-action="smart-select-remove" data-value="${escapeHTML(value)}" aria-label="${adminCopy("حذف","Remove")}">×</button>` : ""}</i>`;
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
  const uploadFields = ["note", "brand"].includes(group) ? `<label class="wide option-image-upload"><span>${group === "brand" ? adminCopy("شعار العلامة التجارية","Brand logo") : adminCopy("صورة أو أيقونة النوتة","Note image or icon")}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml" data-product-option-image-upload/><small>${adminCopy("PNG أو JPG أو WEBP — يمكن استبدال الصورة لاحقًا","PNG, JPG or WEBP — replaceable later")}</small></label><figure class="option-image-preview" hidden><img alt=""/><button type="button" data-action="remove-product-option-image">×</button></figure>` : "";
  dialog.innerHTML = `<form method="dialog"><header><div><small>${adminCopy("إدارة خصائص المنتج","Product attributes")}</small><h3>${group === "note" ? adminCopy("إضافة أو تعديل نوتة عطرية","Add or edit a fragrance note") : group === "brand" ? adminCopy("إضافة أو تعديل علامة تجارية","Add or edit a brand") : adminCopy("إضافة خيار جديد","Add a new option")}</h3></div><button type="button" data-action="close-product-option">×</button></header><input type="hidden" name="slug"/><div class="option-dialog-grid">${noteFields}<label>${adminCopy("الاسم بالعربية","Arabic name")}<input name="nameAr" dir="rtl" required maxlength="160"/></label><label>${adminCopy("الاسم بالإنجليزية","English name")}<input name="nameEn" dir="ltr" required maxlength="160"/></label><label>${adminCopy("أيقونة اختيارية","Optional icon")}<input name="icon" maxlength="12" placeholder="✦"/></label><label>${adminCopy("رابط صورة اختيارية","Optional image URL")}<input name="image" dir="ltr" maxlength="2000000" placeholder="https://…"/></label>${uploadFields}<label>${adminCopy("لون اختياري","Optional color")}<input name="color" type="color" value="#7a001d"/></label><label>${adminCopy("ترتيب الظهور","Sort order")}<input name="sortOrder" type="number" min="0" value="0"/></label><label class="option-active"><input name="active" type="checkbox" checked/><span>${adminCopy("الخيار نشط","Option is active")}</span></label></div><footer><button type="button" class="button secondary-button" data-action="close-product-option">${adminCopy("إلغاء","Cancel")}</button><button type="button" class="button burgundy-button" data-action="save-product-option">${adminCopy("حفظ وإضافة","Save & add")}</button></footer><p class="option-dialog-error" hidden></p></form>`;
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
  form.elements.icon.value = source.icon || source.symbol || "";
  form.elements.image.value = source.image || "";
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
  if (!actionElement) return;
  const action = actionElement.dataset.action;
  if (action === "delete-home-media") {
    const settings = mergeStoreSettings(state.adminWorkspace.settings || {});
    settings.homeMedia = settings.homeMedia.filter((item) => String(item.id) !== String(actionElement.dataset.id));
    state.adminWorkspace.settings = settings;
    saveAdminWorkspace("homepage");
    renderAdminDashboard("homepage");
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
    dialog.querySelector(".option-image-preview").hidden = true;
    return;
  }
  if (action === "save-product-option") {
    const dialog = actionElement.closest("dialog");
    const form = dialog.querySelector("form");
    const data = new FormData(form);
    const payload = { group:dialog.dataset.group, slug:String(data.get("slug") || "").trim(), nameAr:String(data.get("nameAr") || "").trim(), nameEn:String(data.get("nameEn") || "").trim(), image:String(data.get("image") || "").trim(), icon:String(data.get("icon") || "").trim(), color:String(data.get("color") || ""), sortOrder:Number(data.get("sortOrder") || 0), active:data.get("active") === "on" };
    if (payload.group === "note") payload.metadata = { descriptionAr:String(data.get("descriptionAr") || "").trim(), descriptionEn:String(data.get("descriptionEn") || "").trim(), familyId:String(data.get("familyId") || "uncategorized"), position:String(data.get("position") || "multiple"), value:String(data.get("existingOption") || "").trim() || payload.slug || payload.nameEn || payload.nameAr };
    const error = dialog.querySelector(".option-dialog-error");
    if (!payload.nameAr || !payload.nameEn) { error.hidden=false; error.textContent=adminCopy("أدخل الاسم بالعربية والإنجليزية.","Enter both Arabic and English names."); return; }
    const duplicate = productOptionItems(payload.group).find((item) => item.slug !== payload.slug && [item.nameAr,item.nameEn].some((name) => [payload.nameAr,payload.nameEn].some((candidate) => normalizeOptionSearch(candidate) === normalizeOptionSearch(name))));
    if (duplicate) { error.hidden=false; error.textContent=adminCopy("هذه النوتة أو العلامة موجودة بالفعل؛ اخترها للتعديل بدل إنشاء نسخة مكررة.","This note or brand already exists; select it for editing instead of creating a duplicate."); return; }
    actionElement.disabled = true;
    try {
      const result = state.serverAvailable ? await api("/api/admin/product-options", { method:"POST", body:JSON.stringify(payload) }) : { option:{ ...payload, id:Date.now(), value:payload.nameEn } };
      state.productOptions = [...state.productOptions.filter((item) => !(item.group === result.option.group && item.slug === result.option.slug)), result.option];
      if (payload.group === "note") {
        window.ORIGOFragranceNotes.upsertNote({ slug:result.option.slug, nameAr:payload.nameAr, nameEn:payload.nameEn, descriptionAr:payload.metadata.descriptionAr, descriptionEn:payload.metadata.descriptionEn, familyId:payload.metadata.familyId, position:payload.metadata.position, image:payload.image, symbol:payload.icon || "✦", aliases:[] });
        await persistNotesState();
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
    handleNotesRoute();
    handleCatalogRoute();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  if (action === "benefit-link") {
    event.preventDefault();
    navigateBenefit(actionElement.dataset.slug);
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
  if (action === "brands-menu" || action === "categories-menu") {
    const menu = actionElement.closest(".brands-nav");
    $$(".brands-nav.open").filter((item) => item !== menu).forEach((item) => item.classList.remove("open"));
    menu.classList.toggle("open");
    actionElement.setAttribute("aria-expanded", String(menu.classList.contains("open")));
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
  if (action === "auth-mode") renderAuth(actionElement.dataset.mode);
  if (action === "toggle-password") {
    const input = actionElement.closest(".password-field")?.querySelector("input");
    if (input) {
      const visible = input.type === "text";
      input.type = visible ? "password" : "text";
      actionElement.setAttribute("aria-pressed", String(!visible));
      actionElement.setAttribute("aria-label", !visible ? (state.lang === "ar" ? "إخفاء كلمة المرور" : "Hide password") : (state.lang === "ar" ? "إظهار كلمة المرور" : "Show password"));
      actionElement.textContent = visible ? "◉" : "⊘";
    }
  }
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
  if (action === "save-alternative-match") {
    const form = actionElement.closest("[data-alternative-match]");
    const data = new FormData(form);
    const item = state.alternativesAdmin.items.find((entry) => String(entry.id) === form.dataset.alternativeMatch);
    if (!item) return;
    const match = {
      id: item.id,
      similarity: Number(data.get("similarity")), confidence: Number(data.get("confidence")),
      sortOrder: Number(data.get("sortOrder")), status: String(data.get("status") || "active"),
      pinned: data.get("pinned") === "on",
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
  if (action === "close-product-page") closeProductPage();
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
    const card = actionElement.closest(".product-card");
    card?.classList.add("is-added");
    setTimeout(() => card?.classList.remove("is-added"), 1200);
  }
  if (action === "card-variant") {
    state.selectedCardVariants[actionElement.dataset.productId] = actionElement.dataset.variantId;
    renderProducts($(".chip.active")?.dataset.filter || "all");
    renderWishlist();
  }
  if (action === "card-image") setCardImage(actionElement.dataset.id, Number(actionElement.dataset.change || 0));
  if (action === "card-image-index") setCardImage(actionElement.dataset.id, Number(actionElement.dataset.index || 0), true);
  if (action === "open-product") showProductDetails(getProduct(actionElement.dataset.id));
  if (action === "product-image") {
    state.activeProductImageIndex = Math.max(0, Number(actionElement.dataset.index) || 0);
    showProductDetails(getProduct(state.activeProductId), false);
  }
  if (action === "product-zoom") actionElement.closest(".pdp-main-image")?.classList.toggle("zoomed");
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
  if (action === "admin-card-preview-mode") {
    state.adminCardPreviewMode = actionElement.dataset.mode === "mobile" ? "mobile" : "desktop";
    const preview = actionElement.closest(".product-editor-preview");
    preview?.classList.toggle("mobile", state.adminCardPreviewMode === "mobile");
    preview?.classList.toggle("desktop", state.adminCardPreviewMode === "desktop");
    $$("[data-action='admin-card-preview-mode']", preview).forEach((button) => button.classList.toggle("active", button.dataset.mode === state.adminCardPreviewMode));
  }
  if (action === "admin-card-preview-theme") {
    state.adminCardPreviewTheme = actionElement.dataset.theme === "dark" ? "dark" : "light";
    const preview = actionElement.closest(".product-editor-preview");
    preview?.classList.toggle("dark", state.adminCardPreviewTheme === "dark");
    preview?.classList.toggle("light", state.adminCardPreviewTheme === "light");
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
  if (event.target.id === "admin-homepage-rails") {
    const data = new FormData(event.target);
    const current = mergeStoreSettings(state.adminWorkspace.settings || {});
    const nextRails = Object.fromEntries(Object.keys(current.homepageRails).map((key) => [key, {
      ...current.homepageRails[key], enabled: data.has(`${key}.enabled`),
      titleAr: String(data.get(`${key}.titleAr`) || "").trim(), titleEn: String(data.get(`${key}.titleEn`) || "").trim(),
      order: Math.max(1, Math.min(10, Number(data.get(`${key}.order`) || 1))),
      ...(key === "brands" ? { speed: Math.max(12, Math.min(120, Number(data.get("brands.speed") || 34))) } : {})
    }]));
    const file = event.target.elements.mediaFile?.files?.[0];
    const media = [...current.homeMedia];
    if (file) {
      try {
        const url = await optimizeGalleryImage(file);
        media.unshift({ id: `media-${Date.now()}`, name: String(data.get("mediaName") || file.name).trim(), placement: String(data.get("mediaPlacement") || "hero"), brand: String(data.get("mediaBrand") || "").trim(), altAr: String(data.get("mediaAltAr") || "").trim(), altEn: String(data.get("mediaAltEn") || "").trim(), url, createdAt: new Date().toISOString() });
      } catch (error) { showToast(adminCopy("تعذر معالجة الصورة", "Could not process image")); return; }
    }
    state.adminWorkspace.settings = mergeStoreSettings({ ...current, homepageRails: nextRails, homeMedia: media });
    saveAdminWorkspace("homepage");
    applyHomepageRailSettings();
    renderHomeHero();
    renderHomepageCommerce();
    renderAdminDashboard("homepage");
    showToast(adminCopy("تم حفظ إعدادات الأشرطة", "Homepage rails saved"));
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
      nameEn: String(data.get("nameEn") || "").trim(), brand: String(data.get("brand") || "").trim(),
      image: String(data.get("image") || "").trim(), referencePrice: Number(data.get("referencePrice") || 0),
      concentration: String(data.get("concentration") || "").trim(), size: String(data.get("size") || "").trim(),
      gender: String(data.get("gender") || "unisex"), familyAr: String(data.get("familyAr") || "").trim(),
      familyEn: String(data.get("familyEn") || "").trim(),
      notes: { topAr: split("notesAr"), topEn: split("notesEn"), heartAr: [], heartEn: [], baseAr: [], baseEn: [] },
      status: "active"
    };
    const link = {
      productId: String(data.get("productId") || ""), similarity: data.get("similarity") === "" ? null : Number(data.get("similarity")),
      confidence: data.get("confidence") === "" ? null : Number(data.get("confidence")), sortOrder: Number(data.get("sortOrder") || 0),
      reasonAr: String(data.get("reasonAr") || "").trim(), reasonEn: String(data.get("reasonEn") || "").trim(), status: "active"
    };
    try {
      state.alternativesAdmin = await api("/api/admin/alternatives", { method: "POST", body: JSON.stringify({ reference, link }) });
      renderAdminDashboard("alternatives");
      window.ORIGOAlternatives?.refresh?.();
      showToast(adminCopy("تم إنشاء العطر المرجعي وربطه بالمنتج", "Reference fragrance and match created"));
    } catch (error) { showToast(error.message); }
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
    state.adminWorkspace.settings = mergeStoreSettings({
      ...current,
      storeName: String(data.get("storeName") || "ORIGO").trim(),
      currency: String(data.get("currency") || "EGP"),
      taxRate: Number(data.get("taxRate") || 0),
      lowStockAlerts: data.has("lowStockAlerts"),
      orderNotifications: data.has("orderNotifications"),
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
      socialLinks: Object.fromEntries(["youtube", "facebook", "tiktok", "instagram", "snapchat", "telegram", "whatsapp"].map((name) => [name, String(data.get(`social.${name}`) || "").trim()])),
      fragranceFinder: { ...current.fragranceFinder, enabled: finderEnabled },
      footerBenefits
    });
    state.pendingStoreLogos = {};
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
  if (event.target.id === "password-reset-request-form") {
    const form = event.target;
    const values = Object.fromEntries(new FormData(form));
    const button = form.querySelector("[type='submit']");
    const error = $("#auth-error");
    error.textContent = "";
    button.disabled = true;
    try {
      const result = await api("/api/auth/password-reset/request", { method: "POST", body: JSON.stringify(values) });
      renderAuth("reset-confirm", result.requestId);
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
  if (event.target.closest("#note-admin-form") && event.target.name === "image") {
    $("#note-admin-image-preview").src = event.target.value || window.ORIGOFragranceNotes.artwork({
      nameAr: event.target.form.elements.nameAr.value,
      nameEn: event.target.form.elements.nameEn.value,
      familyId: event.target.form.elements.familyId.value,
      symbol: "✦"
    });
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

document.addEventListener("change", async (event) => {
  if (event.target.matches("[name='existingOption']")) {
    populateProductOptionDialog(event.target.closest("dialog"), event.target.value);
    return;
  }
  if (event.target.matches("[data-product-option-image-upload]")) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 900_000) { event.target.value = ""; showToast(adminCopy("حجم الصورة أكبر من 900 KB", "Image exceeds 900 KB")); return; }
    const dialog = event.target.closest("dialog");
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const value = String(reader.result || "");
      dialog.querySelector("[name='image']").value = value;
      const preview = dialog.querySelector(".option-image-preview");
      preview.hidden = false;
      preview.querySelector("img").src = value;
    }, { once:true });
    reader.readAsDataURL(file);
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

window.addEventListener("scroll", () => {
  $(".site-header").classList.toggle("compact", window.scrollY > 28);
}, { passive: true });

window.addEventListener("popstate", () => {
  handleBenefitRoute();
  handleNotesRoute();
  handleCatalogRoute();
  handleProductRoute();
});

function bindBrandMarquee(brandTrack) {
  if (!brandTrack || brandTrack.dataset.dragBound === "true") return;
  brandTrack.dataset.dragBound = "true";
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
    brandTrack.classList.add("is-interacting");
    brandStartX = event.clientX;
    brandStartScroll = brandTrack.scrollLeft;
    brandTrack.setPointerCapture?.(event.pointerId);
  });
  brandTrack.addEventListener("pointermove", (event) => {
    if (brandDragging) brandTrack.scrollLeft = brandStartScroll - (event.clientX - brandStartX);
  });
  const stopBrandDrag = () => {
    brandDragging = false;
    window.setTimeout(() => brandTrack.classList.remove("is-interacting"), 900);
  };
  brandTrack.addEventListener("pointerup", stopBrandDrag);
  brandTrack.addEventListener("pointercancel", stopBrandDrag);
}

function bindHorizontalRail(rail) {
  if (!rail || rail.dataset.railBound === "true") return;
  rail.dataset.railBound = "true";
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startScroll = 0;
  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    moved = false;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    rail.classList.add("is-dragging");
    rail.setPointerCapture?.(event.pointerId);
  });
  rail.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 6) moved = true;
    rail.scrollLeft = startScroll - delta;
  });
  const finish = () => { dragging = false; rail.classList.remove("is-dragging"); };
  rail.addEventListener("pointerup", finish);
  rail.addEventListener("pointercancel", finish);
  rail.addEventListener("click", (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
  }, true);
}

$$("[data-brand-marquee]").forEach(bindBrandMarquee);
$$('[data-horizontal-rail]').forEach(bindHorizontalRail);

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
handleNotesRoute({ replace: true });
handleCatalogRoute({ replace: true });
observeReveals();
hydrateServer();
