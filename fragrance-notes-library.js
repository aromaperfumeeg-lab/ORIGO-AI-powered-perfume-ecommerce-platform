(function fragranceNotesLibraryBootstrap(global) {
  "use strict";

  const knowledge = global.ORIGOFragranceKnowledge?.database || { categories: [] };
  const STORAGE_VERSION = 2;
  const familyBlueprints = {
    citrus: { color: "#D9A441", accent: "#FFF1B8", symbol: "◉", position: "top" },
    "fruits-vegetables-nuts": { color: "#B94D5D", accent: "#F6CCD2", symbol: "●", position: "top" },
    flowers: { color: "#A64E68", accent: "#F5CFDB", symbol: "✿", position: "heart" },
    "white-flowers": { color: "#B7A47C", accent: "#F7F0DD", symbol: "❀", position: "heart" },
    "greens-herbs-fougere": { color: "#567A57", accent: "#D8E9D3", symbol: "⌁", position: "top" },
    spices: { color: "#A44D2E", accent: "#F1D2C3", symbol: "✺", position: "multiple" },
    "sweets-gourmand": { color: "#9A604B", accent: "#EFD5C9", symbol: "◇", position: "base" },
    "woods-mosses": { color: "#654B3B", accent: "#DCCBBA", symbol: "▥", position: "base" },
    "resins-balsams": { color: "#8B5B38", accent: "#E8CBAA", symbol: "◆", position: "base" },
    "musk-amber-animalic": { color: "#756A62", accent: "#E4DDD7", symbol: "◌", position: "base" },
    beverages: { color: "#76503B", accent: "#E2C8B7", symbol: "◒", position: "heart" },
    "natural-synthetic-unusual": { color: "#4D7772", accent: "#CDE2DE", symbol: "✦", position: "multiple" },
    uncategorized: { color: "#77736E", accent: "#E2DFDB", symbol: "?", position: "multiple" }
  };

  const generatedNoteImages = Object.freeze({
    "alsybrwl-alnajramwtha": "alsybrwl-alnajramwtha",
    "alsfsaf-alabyd": "alsfsaf-alabyd",
    "alawd-alandwnysy": "alawd-alandwnysy",
    "alawd-alabyd": "alawd-alabyd",
    "alawd-alastraly": "alawd-alastraly",
    "alawd-altaylandy": "alawd-altaylandy",
    "alawd-alkmbwdy": "alawd-alkmbwdy",
    "alawd-allawsy": "alawd-allawsy",
    "alawd-alhndy": "alawd-alhndy",
    "alflyn": "alflyn",
    "almaswya": "almaswya",
    "almskyt": "almskyt",
    "almwhwhw": "almwhwhw",
    "alnwtat-alshybr": "alnwtat-alshybr",
    "alnym": "alnym",
    "batshwly-akhdr": "batshwly-akhdr",
    "alarzyh": "alarzyh",
    "alamyrys": "alamyrys",
    "alawkalybtws": "alawkalybtws",
    "alashnh": "alashnh",
    "albambw": "albambw",
    "albawbab-shjr-astwayy": "albawbab-shjr-astwayy",
    "alblwt": "alblwt",
    "altswja": "altswja",
    "altnwb": "altnwb",
    "alhwr-alrjraj": "alhwr-alrjraj",
    "alkhshb-alaswd": "alkhshb-alaswd",
    "aldrdar": "aldrdar",
    "alsaman": "alsaman",
    "alsrw-alazrq-alastraly": "alsrw-alazrq-alastraly",
    "alsrw-alkadhb": "alsrw-alkadhb",
    "alskwyh-ashjar": "alskwyh-ashjar",
    "ashjar-alkhwkh": "ashjar-alkhwkh",
    "ashjar-alzytwn": "ashjar-alzytwn",
    "ashjar-alsrw": "ashjar-alsrw",
    "ashjar-alsnwbr": "ashjar-alsnwbr",
    "ashjar-alqyqb": "ashjar-alqyqb",
    "ashjar-bylambra": "ashjar-bylambra",
    "ashjar-jwz-alhnd": "ashjar-jwz-alhnd",
    "akyghalawwd": "akyghalawwd",
    "ambr-ayfr": "ambr-ayfr",
    "ayshbynk-awkwtya-kwyksws": "ayshbynk-awkwtya-kwyksws",
    "ashjar-albslm-alkndyh": "ashjar-albslm-alkndyh",
    "alakhshab-aljafh": "alakhshab-aljafh",
    "alakhshab-alshfafh": "alakhshab-alshfafh",
    "alakhshab-altafyh": "alakhshab-altafyh",
    "alakhshab-almtfhmh": "alakhshab-almtfhmh",
    "alakhshab-alhndyh": "alakhshab-alhndyh",
    "akhshab-almahwjny": "akhshab-almahwjny",
    "akhshab-alhnwky": "akhshab-alhnwky",
    "akhshab-shqra": "akhshab-shqra",
    "akhshab-kwkwbwlw": "akhshab-kwkwbwlw",
    "akhshab-mkhmlyh": "akhshab-mkhmlyh",
    "akhshab-hww": "akhshab-hww",
    "arbwtws-shjrh-alqtlb": "arbwtws-shjrh-alqtlb",
    "arz-ahmr-ghrby": "arz-ahmr-ghrby",
    "arwkarya": "arwkarya",
    "ashjar-alabnws": "ashjar-alabnws",
    "ashjar-albrqwq": "ashjar-albrqwq",
    "ashjar-albn": "ashjar-albn",
    "ashjar-altfah": "ashjar-altfah",
    "ashjar-altnwb-alaswd": "ashjar-altnwb-alaswd",
    "ashjar-altyn": "ashjar-altyn",
    "ashjar-alkhrwb": "ashjar-alkhrwb",
    "msash-mthljh": "msash-mthljh",
    "mlbs": "mlbs",
    "mylk-shyk": "mylk-shyk",
    "nwtyla": "nwtyla",
    "hwrtshata": "hwrtshata",
    "thwja-shjrh-alhyah": "thwja-shjrh-alhyah",
    "apricot-wood": "apricot-wood",
    "ghaf-tree": "ghaf-tree",
    "incienso": "incienso",
    "kowhai": "kowhai",
    "taiwan-incense-cedar": "taiwan-incense-cedar",
    "z11tm": "z11tm",
    "akhshab-albtwla": "akhshab-albtwla",
    "akhshab-alghayak": "akhshab-alghayak",
    "akhshab-alflfl": "akhshab-alflfl",
    "akhshab-alkshmyr": "akhshab-alkshmyr",
    "ftyrh": "ftyrh",
    "ftyrh-allymwn": "ftyrh-allymwn",
    "ftyrh-jwzalhnd": "ftyrh-jwzalhnd",
    "ftyrh-hlwh": "ftyrh-hlwh",
    "krymh-hamdh": "krymh-hamdh",
    "kak-alarz": "kak-alarz",
    "kakh": "kakh",
    "kwzmwfrwt": "kwzmwfrwt",
    "kwkw-bals": "kwkw-bals",
    "lhm-alkhnzyr": "lhm-alkhnzyr",
    "lykwr-alshwkwlath-aldaknh": "lykwr-alshwkwlath-aldaknh",
    "lykywr-altfah": "lykywr-altfah",
    "makrwn": "makrwn",
    "makrwn-altwt": "makrwn-altwt",
    "mrby-albrtqal": "mrby-albrtqal",
    "msash-albrtqal-balkrymh": "msash-albrtqal-balkrymh",
    "zfyr": "zfyr",
    "zhwr-mskrh": "zhwr-mskrh",
    "skr-alnkhyl": "skr-alnkhyl",
    "skr-mhrwq": "skr-mhrwq",
    "swrbyh": "swrbyh",
    "swrbyh-alfwakh-alhmra": "swrbyh-alfwakh-alhmra",
    "swrbyh-qws-qzh": "swrbyh-qws-qzh",
    "shrab-albyd": "shrab-albyd",
    "shrab-alskr": "shrab-alskr",
    "shrab-alfrawlh": "shrab-alfrawlh",
    "shrab-alqyqb": "shrab-alqyqb",
    "shrab-alkrz": "shrab-alkrz",
    "shymalw": "shymalw",
    "slsh-alfanylya": "slsh-alfanylya",
    "sws-alshwkwlath": "sws-alshwkwlath",
    "swflyh": "swflyh",
    "wrd-tayfy": "wrd-tayfy",
    "hlwy-hlamyh": "hlwy-hlamyh",
    "hlwy-aljyly": "hlwy-aljyly",
    "hlwy-alzbdh": "hlwy-alzbdh",
    "hlwy-alkastr": "hlwy-alkastr",
    "hlwy-alkramyl": "hlwy-alkramyl",
    "hlwy-allwz": "hlwy-allwz",
    "hlwy-almrmalad": "hlwy-almrmalad",
    "hlwy-frnsyh": "hlwy-frnsyh",
    "hlwy-mws-allbn": "hlwy-mws-allbn",
    "hlyb-alshwfan": "hlyb-alshwfan",
    "hlyb-alkrz": "hlyb-alkrz",
    "hlyb-alwrd": "hlyb-alwrd",
    "khbz-almwty": "khbz-almwty",
    "drajybws": "drajybws",
    "rhyq": "rhyq",
    "fwghasyt": "fwghasyt",
    "qrs-alasl": "qrs-alasl",
    "qhwh-afwjatw": "qhwh-afwjatw",
    "qhwh-balhlyb": "qhwh-balhlyb",
    "kasata-sqlyh": "kasata-sqlyh",
    "kalyswn-dyks": "kalyswn-dyks",
    "kramyl-mmlh": "kramyl-mmlh",
    "krz-ghrywt": "krz-ghrywt",
    "krym-alkhwkh": "krym-alkhwkh",
    "krym-shantyh": "krym-shantyh",
    "krymh-albndq-walkakaw": "krymh-albndq-walkakaw",
    "krymh-altzyyn-alwrdyh": "krymh-altzyyn-alwrdyh",
    "krymh-alhlyb": "krymh-alhlyb",
    "krymh-alkhfq": "krymh-alkhfq",
    "krymh-alzbdh": "krymh-alzbdh",
    "krymh-alfstq": "krymh-alfstq",
    "ftyrh-myryngh-allymwn":"ftyrh-myryngh-allymwn",
    "fwdj-alshwkwlath":"fwdj-alshwkwlath",
    "krz-marashynw":"krz-marashynw",
    "krym-brwlyh":"krym-brwlyh",
    "kak-aldwnats":"kak-aldwnats",
    "kakh-wwby":"kakh-wwby",
    "kmthry-mkhbwzh":"kmthry-mkhbwzh",
    "lymwn-mskr":"lymwn-mskr",
    "marwn-ghlash":"marwn-ghlash",
    "makrwn-alfanylya":"makrwn-alfanylya",
    "mrby-altwt-alazrq":"mrby-altwt-alazrq",
    "mrby-almshmsh":"mrby-almshmsh",
    "mrby-alkywy":"mrby-alkywy",
    "wafl-mkhrwty":"wafl-mkhrwty",
    "kafyar-alfanylya":"kafyar-alfanylya",
    "mrby-alwrd":"mrby-alwrd",
    "khbz-alznjbyl":"khbz-alznjbyl",
    "khbz-mhms":"khbz-mhms",
    "rshat":"rshat",
    "zbdh-alfwl-alswdany":"zbdh-alfwl-alswdany",
    "zbdh-alkakaw":"zbdh-alkakaw",
    "zbdh-mmlhh":"zbdh-mmlhh",
    "sbykwlws":"sbykwlws",
    "skr-bwdrh":"skr-bwdrh",
    "skwn":"skwn",
    "smwrz-alfrawlh":"smwrz-alfrawlh",
    "ajynh-altart":"ajynh-altart",
    "ajynh-alkwkyz":"ajynh-alkwkyz",
    "ajynh-bf-bastry":"ajynh-bf-bastry",
    "ghzl-albnat":"ghzl-albnat",
    "ftyrh-altfah":"ftyrh-altfah",
    "ftyrh-alyqtyn":"ftyrh-alyqtyn",
    "hlwy-aljyly-byn":"hlwy-aljyly-byn",
    "hlwy-alhlyb":"hlwy-alhlyb",
    "hlwy-alfrawlh-alfwarh":"hlwy-alfrawlh-alfwarh",
    "hlwy-alkramyl-almmlh":"hlwy-alkramyl-almmlh",
    "hlwy-starbrst":"hlwy-starbrst",
    "hlwy-albrtqal":"hlwy-albrtqal",
    "hlwy-altyramysw":"hlwy-altyramysw",
    "hlwy-alhlqwm":"hlwy-alhlqwm",
    "hlwy-alshw":"hlwy-alshw",
    "hlwy-alkwlfy":"hlwy-alkwlfy",
    "hlwy-almarzyban":"hlwy-almarzyban",
    "hlwy-kwnfyty-allwz-almskr":"hlwy-kwnfyty-allwz-almskr",
    "khbz-albaghyt":"khbz-albaghyt",
    "khbz-albrywsh":"khbz-albrywsh",
    "khbz-almwz":"khbz-almwz",
    "dwrayaky":"dwrayaky",
    "black-lemon":"black-lemon", kabosu:"kabosu", orange:"orange", bergamot:"bergamot", grapefruit:"grapefruit",
    alhmdyat:"citrus", lemon:"lemon", neroli:"neroli",
    pineapple:"pineapple", apple:"apple", peach:"peach", cherry:"cherry", pear:"pear", mango:"mango",
    coconut:"coconut", lavender:"lavender",
    iris:"iris", rose:"rose", "fanylya-bahyana":"fanylya-bahyana", jasmine:"jasmine", vanilla:"vanilla",
    "pink-pepper":"pink-pepper", cinnamon:"cinnamon", cardamom:"cardamom",
    honey:"honey", sandalwood:"sandalwood", amber:"amber", "white-musk":"white-musk", leather:"leather",
    mandarin:"mandarin", chocolate:"chocolate", fig:"fig",
    dates:"dates", milk:"milk", "milk-accord":"milk-accord", "pink-musk":"pink-musk", "white-flowers":"white-flowers",
    murcott:"murcott", "ashjar-allymwn":"ashjar-allymwn", "awraq-aljryb-frwt":"awraq-aljryb-frwt",
    alatrj:"alatrj", "albrtqal-alahmr":"albrtqal-alahmr", "albrtqal-almr":"albrtqal-almr",
    "albrtqal-alhndy":"albrtqal-alhndy", albytytghryn:"albytytghryn",
    chinotto:"chinotto", alfyrbyna:"alfyrbyna", alkalamansy:"alkalamansy", alklamntyn:"alklamntyn",
    "alkmkwat-albrtqal-alyabany":"alkmkwat-albrtqal-alyabany", allym:"allym",
    "allym-alasbay":"allym-alasbay", "allymwn-alhlw":"allymwn-alhlw",
    "allymwn-alkafyr":"allymwn-alkafyr", "allymwn-almskr":"allymwn-almskr",
    "almandryn-alywsfy":"almandryn-alywsfy", "almandryn-alakhdr":"almandryn-alakhdr", almlysh:"almlysh",
    "brtqal-mr":"brtqal-mr", "bshr-allymwn":"bshr-allymwn", "tanjryn-alywsfy":"tanjryn-alywsfy",
    tanjylw:"tanjylw", "hmdyat-swdatshy":"hmdyat-swdatshy", shykwasha:"shykwasha",
    "swda-aljryb-frwt":"swda-aljryb-frwt", "ashb-allymwn":"ashb-allymwn", "qshr-albrtqal":"qshr-albrtqal",
    "qshr-albrghmwt":"qshr-albrghmwt", "qshr-aljryb-frwt":"qshr-aljryb-frwt",
    "qshr-alywsfy":"qshr-alywsfy", "krystal-fyz":"krystal-fyz", kmkawt:"kmkawt", kynyba:"kynyba",
    "lytzya-kwbyba":"lytzya-kwbyba", "lymwn-ranjbwr":"lymwn-ranjbwr",
    "lymwn-flstyny-hlw":"lymwn-flstyny-hlw", "lymwn-matr":"lymwn-matr",
    "lymwn-hatkwra":"lymwn-hatkwra", "ma-alhmdyat":"ma-alhmdyat", mandwra:"mandwra",
    "mythyl-bamblymws":"mythyl-bamblymws", "myrtl-allymwn":"myrtl-allymwn", hasakw:"hasakw",
    "yd-bwdha":"yd-bwdha", ywzw:"ywzw",
    "ywsfy-ahmr":"ywsfy-ahmr", "ywsfy-bwkan":"ywsfy-bwkan", "twt-brambl":"twt-brambl",
    chayote:"chayote", cherimoya:"cherimoya", "green-banana":"green-banana", "guava-nectar":"guava-nectar",
    pitanga:"pitanga", snowberry:"snowberry", "umbu-caja-tapereba":"umbu-caja-tapereba",
    "azhar-alqra":"azhar-alqra", "ananas-shwghrlwf":"ananas-shwghrlwf", "awraq-altyn":"awraq-altyn",
    "atfaq-mwybyl":"atfaq-mwybyl", alarjan:"alarjan", "alakyrwla-alkrz-alhndy":"alakyrwla-alkrz-alhndy",
    "alatfaq-aljwzy":"alatfaq-aljwzy", albabaya:"albabaya", albazla:"albazla", "albashwn-frwt":"albashwn-frwt",
    albrqwq:"albrqwq", "albrqwq-alakhdr":"albrqwq-alakhdr", "albrqwq-albry":"albrqwq-albry",
    "albrqwq-aldakn-ww-my":"albrqwq-aldakn-ww-my", albshmlh:"albshmlh", albtats:"albtats",
    albtykh:"albtykh", "albtykh-alshtwy":"albtykh-alshtwy", albndq:"albndq", altamanw:"altamanw",
    "altfah-alahmr":"altfah-alahmr", "altfah-almjff":"altfah-almjff",
    "altfah-alnjmy":"altfah-alnjmy", altwt:"altwt", "altwt-alabyd":"altwt-alabyd",
    "altwt-alahmr":"altwt-alahmr", "altwt-alazrq":"altwt-alazrq", "altwt-albry":"altwt-albry",
    "altwt-alfdy":"altwt-alfdy", "altwt-almthlj":"altwt-almthlj", "altwt-almajzh":"altwt-almajzh",
    aljzr:"aljzr", aljwafh:"aljwafh", "aljwz-albrazyly":"aljwz-albrazyly", alkhyar:"alkhyar",
    aldhrh:"aldhrh", alrambwtan:"alrambwtan", alrawnd:"alrawnd",
    alrman:"alrman", alzarwr:"alzarwr", alzytwn:"alzytwn", "alsad-najarmwtha":"alsad-najarmwtha",
    alsfrjl:"alsfrjl", alswdany:"alswdany", alshayr:"alshayr", alshmndr:"alshmndr", altmatm:"altmatm",
    alanb:"alanb", "alanb-alabyd":"alanb-alabyd", "alanb-albrazyly":"alanb-albrazyly",
    alghwarana:"alghwarana", "alfjl-alabyd-alyabany":"alfjl-alabyd-alyabany",
    alfrawlh:"alfrawlh", "alfrawlh-albryh":"alfrawlh-albryh",
    alfstq:"alfstq", "alfwakh-alhmra":"alfwakh-alhmra", "alfwakh-alastwayyh":"alfwakh-alastwayyh",
    "alfwakh-alsfra":"alfwakh-alsfra", "alfwakh-almjffh":"alfwakh-almjffh", alqra:"alqra",
    "alqra-alasly":"alqra-alasly", "alqshth-fakhh":"alqshth-fakhh", alqlqas:"alqlqas", alkajw:"alkajw",
    alkakaya:"alkakaya", alkantalwb:"alkantalwb", "alkrz-alardy":"alkrz-alardy",
    "alkrz-alasfr":"alkrz-alasfr", "alkrz-alhamd":"alkrz-alhamd", alkstna:"alkstna",
    "alkshmsh-alabyd":"alkshmsh-alabyd", "alkshmsh-alahmr":"alkshmsh-alahmr", alkywy:"alkywy",
    allwz:"allwz", allytshy:"allytshy", almakadamya:"almakadamya", almamy:"almamy",
    almanjwstyn:"almanjwstyn", almanynka:"almanynka", almahwnya:"almahwnya", almshmsh:"almshmsh",
    "almshmsh-almjff":"almshmsh-almjff", "almksrat-almhmsh":"almksrat-almhmsh", almwz:"almwz",
    alnktaryn:"alnktaryn", "alyam-alarjwany":"alyam-alarjwany",
    "bdhwr-alakazya":"bdhwr-alakazya", "bdhwr-alawkra-aw-alghambw":"bdhwr-alawkra-aw-alghambw",
    "bdhwr-alshya":"bdhwr-alshya", "bdhwr-alanb":"bdhwr-alanb", "bdhwr-allwts":"bdhwr-allwts",
    "braam-wawraq-alkshmsh":"braam-wawraq-alkshmsh", brbarys:"brbarys", brsymwn:"brsymwn",
    "brqwq-maryan":"brqwq-maryan", "brqwq-myrabyla":"brqwq-myrabyla", blwt:"blwt", bwryty:"bwryty",
    tabywka:"tabywka", trwbykalwn:"trwbykalwn", "tfah-alsydr":"tfah-alsydr", "tfah-fwjy":"tfah-fwjy",
    "tfah-wrdy":"tfah-wrdy", twt:"twt", "twt-alakay":"twt-alakay", "twt-alblsan":"twt-alblsan",
    "twt-almaky":"twt-almaky", "twt-alndy":"twt-alndy", "twt-bwysn":"twt-bwysn",
    "twt-jwjy":"twt-jwjy", "twt-ghwjy":"twt-jwjy", "twt-klawdbry":"twt-klawdbry",
    "twt-lwghan":"twt-lwghan", "twt-lwnghan":"twt-lwnghan", "twt-lynghwn":"twt-lynghwn",
    twkwma:"twkwma", "tyn-shwky":"tyn-shwky", "thmar-altyn":"thmar-altyn", "thmar-alghabh":"thmar-alghabh",
    "thmar-alghbyra":"thmar-alghbyra", "thmrh-alkhbz":"thmrh-alkhbz", "jwz-aswd":"jwz-aswd",
    "jwz-alshma":"jwz-alshma", "jwz-alshya":"jwz-alshya", "jwz-alhnd-albhry":"jwz-alhnd-albhry",
    jynybabw:"jynybabw", hbwb:"hbwb", "hryr-aldhrh":"hryr-aldhrh", "hlyb-altyn":"hlyb-altyn",
    "hlyb-aljwz":"hlyb-aljwz", hms:"hms", khrshwf:"khrshwf", dkhn:"dkhn",
    "dmwa-aywb-yi-yi-ren":"dmwa-aywb-yi-yi-ren", dwryan:"dwryan",
    "dykalybys-hamyltwny":"dykalybys-hamyltwny", "zbdh-alshya":"zbdh-alshya",
    "sabwth-swda":"sabwth-swda", sabwdyla:"sabwdyla", sarsabaryla:"sarsabaryla", salak:"salak",
    santwl:"santwl", "star-frwt-alkrambwla":"star-frwt-alkrambwla", "slth-alfwakh":"slth-alfwakh",
    "smwzy-alfwakh-alhmra":"smwzy-alfwakh-alhmra", syryjwyla:"syryjwyla", "shjrh-abryh":"shjrh-abryh",
    "shrbat-altfah":"shrbat-altfah", shmam:"shmam", "shmam-alasl":"shmam-alasl", "ash-alghrab":"ash-alghrab",
    "asyr-altfah":"asyr-altfah", "anb-akhdr":"anb-akhdr", "anb-althalb":"anb-althalb",
    "anb-aldb":"anb-aldb", "anb-ayzabyla":"anb-ayzabyla", "anb-bynwt-nwar":"anb-bynwt-nwar",
    "anb-kabyrnt":"anb-kabyrnt", "ayn-aljml":"ayn-aljml", ghbyra:"thmar-alghbyra",
    "ghwldn-byry":"alkrz-alardy", "fakhh-alakybya":"fakhh-alakybya", "fakhh-alkwnt":"alqshth-fakhh",
    "fakhh-alma":"fakhh-alma", "fakhh-fyjwa":"fakhh-fyjwa", "fakhh-altnyn":"fakhh-altnyn",
    "frawlh-jaryjwyt":"frawlh-jaryjwyt", "ftr-albwrshyny":"ftr-albwrshyny",
    "ftr-bwrsyny":"ftr-albwrshyny", "flfl-byrwfy":"flfl-byrwfy", "flfl-syranw":"flfl-syranw",
    "fwakh-qrmzyh":"fwakh-qrmzyh", "fwl-alswya":"fwl-alswya", "fwl-mwnj":"fwl-mwnj", mash:"fwl-mwnj",
    fylbrtwn:"fylbrtwn", "qra-mr":"qra-mr", qrnbyt:"qrnbyt", "qshrh-alkakaw":"qshrh-alkakaw",
    kaswry:"kaswry", kalafat:"kalafat", "krz-aswd":"krz-aswd", "krz-mhtrq":"krz-mhtrq",
    "kmthry-anjw-alkhdra":"kmthry-anjw-alkhdra", "kmthry-wylyamz":"kmthry-wylyamz",
    "kmthry-nashy":"kmthry-nashy", "kwandwngh-khwkh-alshra":"kwandwngh-khwkh-alshra", kwbwasw:"kwbwasw",
    kwsa:"kwsa", kwmbarw:"tonka-bean", "lb-altfah":"lb-altfah", lwkwma:"lwkwma",
    "ma-jwz-alhnd":"ma-jwz-alhnd", "maghnwlya-synyh":"maghnwlya-synyh",
    "mrby-alfrawlh":"mrby-alfrawlh", "mrby-alkrz":"mrby-alkrz", "mksrat-albykan":"mksrat-albykan",
    "mwz-aljnh":"mwz-aljnh", nalka:"nalka", "nbat-bhshyh":"nbat-bhshyh", "nbq-albhr":"nbq-albhr",
    "nwtat-alfwakh":"nwtat-alfwakh", "nwtat-nbatyh":"nwtat-nbatyh", "ywka-kasafa":"ywka-kasafa",
    "blue-pea-flower":"blue-pea-flower", bouvardia:"bouvardia", "butomus-umbellatus":"butomus-umbellatus",
    buttercup:"buttercup", clematis:"clematis", dianthus:"dianthus", "elengi-mimusops":"elengi-mimusops",
    hollyhock:"hollyhock", "kanzan-cherry":"kanzan-cherry", lamprocapnos:"lamprocapnos",
    leatherwood:"leatherwood", "madonna-lily":"madonna-lily", "orange-jasmine":"orange-jasmine",
    paramela:"paramela", pataqueira:"pataqueira", phlox:"phlox",
    "skeleton-flower-diphylleia-grayi":"skeleton-flower-diphylleia-grayi", "solomon-s-seal":"solomon-s-seal",
    wrightia:"wrightia", "ajras-sfra":"ajras-sfra", azalya:"azalya", "ashjar-alhmam":"ashjar-alhmam",
    "ashjar-alkasy-albrtqalyh":"ashjar-alkasy-albrtqalyh", "ashjar-daymh-alkhdrh":"ashjar-daymh-alkhdrh",
    alstrwmyrya:"alstrwmyrya", "awraq-almaghnwlya":"awraq-almaghnwlya",
    "awraq-almyshylya":"awraq-almyshylya", "awrkyd-alalmas-alaswd":"awrkyd-alalmas-alaswd",
    "awrkyd-alyasmyn":"awrkyd-alyasmyn", "awrkyd-khf-alsydh":"awrkyd-khf-alsydh",
    awrnythwghalwm:"awrnythwghalwm", "awsmanthws-ywnan":"awsmanthws-ywnan", adlwys:"adlwys",
    aryjyrwn:"aryjyrwn", "aklyl-almlk":"aklyl-almlk", "aklylyh-almrwj":"aklylyh-almrwj",
    aynwla:"aynwla", "aywstwma-lyzyanthws":"aywstwma-lyzyanthws", astarya:"astarya",
    aladhrywn:"aladhrywn", alabylya:"alabylya", alajlaya:"alajlaya", alafywn:"alafywn",
    alaqhwan:"alaqhwan", alakasya:"alakasya", alalbynya:"alalbynya", alalwsn:"alalwsn",
    alamarls:"alamarls", alawrkyd:"alawrkyd", alaylngh:"alaylngh", albansyh:"albansyh",
    "albslh-alhlwh":"albslh-alhlwh", albwnsyth:"albwnsyth", albytwsbwrwm:"albytwsbwrwm",
    albyjwnya:"albyjwnya", albyzya:"albyzya", altrms:"altrms", altrylywm:"altrylywm",
    altywlyb:"altywlyb", aljrys:"aljrys", aljntyana:"aljntyana",
    "aljnysta-alsbghyh":"aljnysta-alsbghyh", aljhnmyh:"aljhnmyh", alkhtmyh:"hollyhock",
    alkhshkhash:"alkhshkhash", "alkhshkhash-alazrq":"alkhshkhash-alazrq",
    alkhtmy:"alkhtmy", alkhlnj:"alkhlnj", aldflh:"aldflh", aldfnh:"aldfnh",
    "alzarwr-albry":"alzarwr-albry", alznbq:"alznbq", "alznbq-alazrq":"alznbq-alazrq",
    "alzhwr-albryh":"alzhwr-albryh", alshwkran:"alshwkran", alsfyr:"alsfyr", alsqlab:"alsqlab",
    "altrfa-alatyqh":"altrfa-alatyqh", alaayq:"alaayq", alanbrys:"alanbrys",
    alfawanya:"alfawanya", alfryzya:"alfryzya", alfwshyh:"alfwshyh", alqras:"alqras",
    alqstws:"alqstws", "alqnfdhyh-alarjwanyh":"alqnfdhyh-alarjwanyh", alkamwmyl:"alkamwmyl",
    alkbwsyn:"alkbwsyn", alktan:"alktan", alkrkdyh:"alkrkdyh", allbwrnwm:"allbwrnwm",
    allqlqy:"allqlqy", allwts:"allwts", allylk:"allylk", almaghnwlya:"almaghnwlya",
    "alnardyn-alakhdr":"alnardyn-alakhdr", alnrjs:"alnrjs", alnsryn:"alnsryn",
    "alnwtat-alzhryh":"alnwtat-alzhryh", alhylwtrwb:"alhylwtrwb", "alwrd-alsyny":"alwrd-alsyny",
    "alwrd-alyabany-hamanasw":"alwrd-alyabany-hamanasw", "alwrwd-almjffh":"alwrwd-almjffh",
    "alwzal-alasbany":"alwzal-alasbany", "alyasmyn-almzhr-allyly":"alyasmyn-almzhr-allyly",
    alywrfwrbya:"alywrfwrbya", "awrkyd-alsbar":"awrkyd-alsbar", "bashwn-flawr":"bashwn-flawr",
    "banksya-astralyh":"banksya-astralyh", "bdhwr-zhrh-alsltan":"bdhwr-zhrh-alsltan",
    "bram-alwrd":"bram-alwrd", "brnt-kbyr":"brnt-kbyr", brwtya:"brwtya", brwmylya:"brwmylya",
    brwnyla:"brwnyla", blyha:"blyha", bwdalya:"bwdalya", bwrtlandya:"bwrtlandya",
    "bwq-almlak":"bwq-almlak", bytalya:"bytalya", bytwnya:"bytwnya", "tshay-hw":"tshay-hw",
    "thmar-alwrd":"thmar-alwrd", jbswfyla:"jbswfyla", "jdhr-althaban":"jdhr-althaban",
    "jdhwr-alswsn":"jdhwr-alswsn", jrbr:"jrbr", jryfylya:"jryfylya", jladywls:"jladywls",
    "jnbh-alrbat":"jnbh-alrbat",
    "jwldn-rwd-alaqhwan":"jwldn-rwd-alaqhwan", jynsta:"jynsta", "hshyshh-alsaal":"hshyshh-alsaal",
    "hmyd-alkhshb":"hmyd-alkhshb", "khman-aswd":"khman-aswd", "dafny-shtwyh":"dafny-shtwyh",
    "dalya-byda":"dalya-byda", dlwnyks:"dlwnyks", dyfynyrys:"dyfynyrys",
    "rwdwdndrwn-sybyry":"rwdwdndrwn-sybyry", "rwza-rubiginosa":"rwza-rubiginosa",
    rwzyfwlya:"rwzyfwlya", ryzyda:"ryzyda", "zbdh-alswsn":"zbdh-alswsn",
    "znabq-alrmal":"znabq-alrmal", "znabq-alwady":"znabq-alwady",
    "znabq-marybwsa":"znabq-marybwsa", "znbq-aztyka":"znbq-aztyka",
    "znbq-alznjbyl-alabyd":"znbq-alznjbyl-alabyd", "znbq-alma":"znbq-alma",
    "znbq-alnar":"znbq-alnar", "znbq-alndy":"znbq-alndy", "znbq-alnhar":"znbq-alnhar",
    "znbq-wrdy":"znbq-wrdy", "zhr-ashjar-alhryr":"zhr-ashjar-alhryr",
    "zhr-ashwka":"zhr-ashwka", "zhr-alananas":"zhr-alananas", "zhr-albabaya":"zhr-albabaya",
    "zhr-albrsym":"zhr-albrsym", "zhr-albrghmwt":"zhr-albrghmwt",
    "zhr-albrqwq":"zhr-albrqwq", "zhr-alblsm":"zhr-alblsm",
    "zhr-alblwmarya":"zhr-alblwmarya", "zhr-altfah":"zhr-altfah", "zhr-aljwafh":"zhr-aljwafh",
    "zhr-alkhwkh":"zhr-alkhwkh", "zhr-alkhyar":"zhr-alkhyar", "zhr-aldalya":"zhr-aldalya",
    "zhr-alrman":"zhr-alrman", "zhr-alzytwn":"zhr-alzytwn",
    "zhr-alshay-alakhdr":"zhr-alshay-alakhdr", "zhr-alshay-alabyd":"zhr-alshay-alabyd",
    "zhr-alshmam":"zhr-alshmam", "zhr-alshynwtw":"zhr-alshynwtw", "zhr-alsbar":"zhr-alsbar",
    "zhr-alarqsws":"zhr-alarqsws", "zhr-alanab":"zhr-alanab", "zhr-alfrajwnya":"zhr-alfrajwnya",
    "zhr-alfrawlh":"zhr-alfrawlh", "zhr-alqrtm":"zhr-alqrtm", "zhr-alqrnfl":"zhr-alqrnfl",
    "zhr-alqtyfh-alafryqyh":"zhr-alqtyfh-alafryqyh", "zhr-alqtyfh-alfrnsy":"zhr-alqtyfh-alfrnsy",
    "zhr-alqhwh":"zhr-alqhwh", "zhr-alkajw":"zhr-alkajw", "zhr-alkrz":"zhr-alkrz",
    "zhr-alkrz-albaky":"zhr-alkrz-albaky", "zhr-alkrz-alhamdy":"zhr-alkrz-alhamdy",
    "zhr-alkrz-alhndy":"zhr-alkrz-alhndy", "zhr-alkshmsh-alaswd":"zhr-alkshmsh-alaswd",
    "zhr-alkmthry":"zhr-alkmthry", "zhr-alkywy":"zhr-alkywy",
    "zhr-allbn-althljy":"zhr-allbn-althljy", "zhr-allwz":"zhr-allwz",
    "zhr-alma":"zhr-alma", "zhr-almaghnwlya":"zhr-almaghnwlya", "zhr-almakdymya":"zhr-almakdymya",
    "zhr-almanjw":"zhr-almanjw", "zhr-almshmsh":"zhr-almshmsh", "zhr-almwrynja":"zhr-almwrynja",
    "zhr-almwz":"zhr-almwz", "zhr-alnktaryn":"zhr-alnktaryn", "zhr-alhndba":"zhr-alhndba",
    "zhr-alyshm":"zhr-alyshm", "zhr-bkhwr-mrym":"zhr-bkhwr-mrym", "zhr-tshmbaka":"zhr-tshmbaka",
    "zhr-twt-alalyq":"zhr-twt-alalyq", "zhr-khshb-alsndl":"zhr-khshb-alsndl",
    "zhr-karambwla":"zhr-karambwla", "zhr-kanwka":"zhr-kanwka",
    "zhr-lamdwan":"zhr-lamdwan", "zhr-malfa":"zhr-malfa", "zhrh-albndq":"zhrh-albndq",
    "zhrh-albytaya":"zhrh-albytaya", "zhrh-albykwl":"zhrh-albykwl", "zhrh-altyn":"zhrh-altyn",
    "zhrh-aljmsht":"zhrh-aljmsht", "zhrh-alkhbz":"zhrh-alkhbz", "zhrh-alkhrbq":"zhrh-alkhrbq",
    "zhrh-alkhshb-alahmr":"zhrh-alkhshb-alahmr", "zhrh-aldantyl-alabyd":"zhrh-aldantyl-alabyd",
    "zhrh-aldwjwwd":"zhrh-aldwjwwd", "zhrh-alrbya":"zhrh-alrbya", "zhrh-alrmadyh":"zhrh-alrmadyh",
    "zhrh-alsylyn":"zhrh-alsylyn", "zhrh-althlb":"zhrh-althlb",
    "zhrh-alghar":"zhrh-alghar", "zhrh-alqtn":"zhrh-alqtn", "zhrh-alqmr-alamazwnyh":"zhrh-alqmr-alamazwnyh",
    "zhrh-alkakaw":"zhrh-alkakaw", "zhrh-alkwzmws":"zhrh-alkwzmws", "zhrh-allytshy":"zhrh-allytshy",
    "zhrh-almlysh":"zhrh-almlysh", "zhrh-almnthwr":"zhrh-almnthwr", "zhrh-alnjmh":"zhrh-alnjmh",
    "zhrh-alhwly":"zhrh-alhwly", "zhrh-alhyl":"zhrh-alhyl", "zhrh-jarana":"zhrh-jarana",
    "zhrh-jwz-alhnd":"zhrh-jwz-alhnd", "zhrh-swfwra-twrwmyrw":"zhrh-swfwra-twrwmyrw",
    "zhrh-ghwstafya":"zhrh-ghwstafya", "zhrh-krh-almdfa":"zhrh-krh-almdfa",
    "zhrh-la-tnsany":"zhrh-la-tnsany", "zhrh-mlkh-allyl":"zhrh-mlkh-allyl", "zhrh-nwm-mayw":"zhrh-nwm-mayw",
    "zhwr-albsatyn":"zhwr-albsatyn", "zhwr-altbgh":"zhwr-altbgh", "zhwr-aljakaranda":"zhwr-aljakaranda",
    "zhwr-alshwklath":"zhwr-alshwklath", "zhwr-alanb":"zhwr-alanb", "zhwr-alflamynjw":"zhwr-alflamynjw",
    "zhwr-alkamylya":"zhwr-alkamylya", "zhwr-alywzw":"zhwr-alywzw", "zhwr-sydh-allyl":"zhwr-sydh-allyl",
    "zhwr-shfafh":"zhwr-shfafh", "zhwr-sfra":"zhwr-sfra", "zhwr-krymyh":"zhwr-krymyh",
    "zhwr-mayflawr":"zhwr-mayflawr",
    "zhwr-mwrnyj-ghlwry":"zhwr-mwrnyj-ghlwry", "zhwr-mwnarda":"zhwr-mwnarda", "zyt-mwnwy":"zyt-mwnwy",
    "zynya":"zynya", "santwlyna":"santwlyna", "sbyraya":"sbyraya", "st-alhsn-albladwna":"st-alhsn-albladwna",
    "strwbylanths-kalwsws":"strwbylanths-kalwsws", "skabyws":"skabyws", "swsnh-balyda":"swsnh-balyda",
    "sylwzya":"sylwzya", "shambaka-byda":"shambaka-byda", "shjrh-alamyrh-albwlwnya":"shjrh-alamyrh-albwlwnya",
    "shjrh-aldkhan":"shjrh-aldkhan", "shjyrh-alasl":"shjyrh-alasl", "shqayq-alnaman":"shqayq-alnaman",
    "shwkh-fdyh":"shwkh-fdyh", "shymwnanthws":"shymwnanthws", "abad-alshms":"abad-alshms",
    "ashb-almyrtl-alas":"ashb-almyrtl-alas", "ashb-rwzbay":"ashb-rwzbay", "ashbh-ranjwn":"ashbh-ranjwn",
    "ashbh-sant-jwn":"ashbh-sant-jwn", "asfwr-aljnh":"asfwr-aljnh", "anaqyh":"anaqyh",
    "ghwayakan":"ghwayakan", "frsh-alzjajat":"frsh-alzjajat", "fybwrnwm":"fybwrnwm",
    "qtad":"qtad", "qrnfl-mhzz":"qrnfl-mhzz", "kadm":"kadm", "karma-flwr":"karma-flwr",
    "kananja":"kananja", "krz-altywr":"krz-altywr", "kf-alknghr":"kf-alknghr",
    "klyntwnya-asywyh":"klyntwnya-asywyh", "lantana":"lantana", "lwts-althlj":"lwts-althlj",
    "lwnghwza":"lwnghwza", "lyatrys":"lyatrys", "lyatryks":"lyatrys", "lydwm":"lydwm",
    "lyzylangh":"lyzylangh", "ma-zhr-albrtqal":"ma-zhr-albrtqal",
    "maghnwlya-brwklynnsys":"maghnwlya-brwklynnsys", "maghnwlya-njmyh":"maghnwlya-njmyh",
    "myrabylas":"myrabylas", "myshylya":"myshylya", "mymwsa":"mymwsa",
    "nardyn":"nardyn", "nbat-alrtm":"nbat-alrtm", "nbat-alqst":"nbat-alqst",
    "nbat-alkwdzw":"nbat-alkwdzw", "nbat-zwfa":"nbat-zwfa", "nbat-shjr-alnar":"nbat-shjr-alnar",
    "nbat-shmay-hwya":"nbat-shmay-hwya", "nrjs-albhr":"nrjs-albhr", "nmr-wrdy-awrkyd":"nmr-wrdy-awrkyd",
    "nyjyla":"nyjyla", "hbsks":"hbsks", "hwrtynsya":"hwrtynsya", "hwshyrh":"hwshyrh",
    "hylykwnya-alflamnghw-alwrdy":"hylykwnya-alflamnghw-alwrdy", "wratah":"wratah", "wrd-alba":"wrd-alba",
    "wrd-alshra":"wrd-alshra", "wrd-alnyl":"wrd-alnyl", "wrdh-byda":"wrdh-byda",
    "wrdyh-rwdwdndrwn":"wrdyh-rwdwdndrwn", "zhr-alasl-srymh-aljdy":"zhr-alasl-srymh-aljdy",
    "albrtqal-alkadhb":"albrtqal-alkadhb", "altbgh-alabyd":"altbgh-alabyd", "alrwbynya":"alrwbynya",
    "alzhwr-albyda":"alzhwr-albyda", "alghardynya":"alghardynya", "alfranjybany":"alfranjybany",
    "alkarysa":"alkarysa", "alyasmyn-alandwnysy":"alyasmyn-alandwnysy", "bylanys":"bylanys",
    "znbq-alkala":"znbq-alkala", "zhr-aljryb-frwt":"zhr-aljryb-frwt",
    "zhr-aldatwrh":"zhr-aldatwrh", "zhr-alshmayh":"zhr-alshmayh", "zhr-allymwn":"zhr-allymwn",
    "zhr-alywsfy":"zhr-alywsfy", "zhr-tyary":"zhr-tyary", "zhr-syrynja":"zhr-syrynja",
    "zhwr-alqmr":"zhwr-alqmr", "styfanwts":"styfanwts", "ashb-bwrwnya":"ashb-bwrwnya",
    "karw-karwndy":"karw-karwndy", "alajaf-alsbar-alamryky":"alajaf-alsbar-alamryky",
    "achillea-olympus":"achillea-olympus", "culantro":"culantro", "fo-ti-hw-shw-ww":"fo-ti-hw-shw-ww",
    "genmaicha":"genmaicha", "hojicha":"hojicha",
    "katrafay":"katrafay", "olymra-plant-accord":"olymra-plant-accord",
    "phoenix-dan-cong-oolong":"phoenix-dan-cong-oolong", "strawberry-gum":"strawberry-gum",
    "azwla":"azwla", "ashjar":"ashjar", "aghsan-khdra":"aghsan-khdra", "akrwnyshya":"akrwnyshya",
    "almasygha":"almasygha", "awraq-alarz":"awraq-alarz", "awraq-alawrkyd":"awraq-alawrkyd",
    "awraq-albandan":"awraq-albandan", "awraq-alblwt":"awraq-alblwt", "awraq-albnfsj":"awraq-albnfsj",
    "awraq-alkhwkh":"awraq-alkhwkh", "awraq-alzytwn":"awraq-alzytwn",
   "awraq-alsyqan":"awraq-alsyqan", "awraq-altmatm":"awraq-altmatm", "awraq-alfanylya":"awraq-alfanylya", "awraq-alfrawlh":"awraq-alfrawlh", "awraq-alqrnfl":"awraq-alqrnfl", "awraq-alkrz":"awraq-alkrz", "awraq-alkshmsh-alaswd":"awraq-alkshmsh-alaswd", "awraq-alkmthry":"awraq-alkmthry", "awraq-allantana":"awraq-allantana", "awraq-almwz":"awraq-almwz", "awraq-almymwza":"awraq-almymwza", "awraq-alnkhyl":"awraq-alnkhyl", "awraq-alwrd":"awraq-alwrd", "awraq-alywsfy":"awraq-alywsfy", "awraq-tay-kwrdylyn":"awraq-tay-kwrdylyn", "awraq-twt-alalyq":"awraq-twt-alalyq",
   "awraq-znabq-alwady":"awraq-znabq-alwady", "awraq-znbq-alma":"awraq-znbq-alma", "awraq-shay-jyn-shwan":"awraq-shay-jyn-shwan", "awryghanw":"awryghanw", "atfaq-alfwjyr":"atfaq-alfwjyr", "alarqtywn":"alarqtywn", "alaashab-altbyh-alsynyh":"alaashab-altbyh-alsynyh", "alafsntyn-nbat":"alafsntyn-nbat", "alamwrtal":"alamwrtal", "alanjylyka":"alanjylyka", "alawraq-aljafh-almtsaqth":"alawraq-aljafh-almtsaqth", "alafwkadw":"alafwkadw", "albrdy":"albrdy", "albrsmh":"albrsmh", "albrsym-alhlw":"albrsym-alhlw", "albqdwns":"albqdwns",
    "alblmyt-almnshary":"alblmyt-almnshary", "albwlyjwnwm":"albwlyjwnwm", "altbn":"altbn", "althwm-almamr":"althwm-almamr", "aljawdar":"aljawdar", "aljrmwyl":"aljrmwyl", "aljzr-albry":"aljzr-albry", "aljwjwba":"aljwjwba", "aljynsynj":"aljynsynj", "aljynkw":"aljynkw", "alhmyd":"alhmyd", "alhna":"alhna", "alhnth-alswda":"alhnth-alswda", "alrjlh":"alrjlh", "alrwdywla":"alrwdywla", "alzatr":"alzatr",
    "alsbankh":"alsbankh", "alsdhab":"alsdhab", "alsrkhs":"alsrkhs", "alsad":"alsad", "alsnbl-alhndy-alnardyn":"alsnbl-alhndy-alnardyn", "alshabaral":"alshabaral", "alshay-aljbly":"alshay-aljbly", "alshay-alshtwy":"alshay-alshtwy", "alshay-almkhmr":"alshay-almkhmr", "alshwk":"alshwk", "alshyh":"alshyh", "alshykwryh":"alshykwryh", "alsbar":"alsbar", "althalb":"althalb", "althalb-albhryh":"althalb-albhryh", "althalb-alhmra":"althalb-alhmra",
    "orange-blossom":"orange-blossom", praline:"praline", "tonka-bean":"tonka-bean", ambroxan:"ambroxan",
    coffee:"coffee", tuberose:"tuberose", myrrh:"myrrh", "black-pepper":"black-pepper", tobacco:"tobacco",
    patchouli:"patchouli", vetiver:"vetiver", saffron:"saffron", oud:"oud", rosemary:"rosemary", geranium:"geranium",
    sage:"sage", marine:"marine", incense:"incense", peony:"peony", ginger:"ginger", "candied-fruits":"candied-fruits",
    benzoin:"benzoin", nutmeg:"nutmeg", cacao:"cacao", labdanum:"labdanum", caramel:"caramel",
    "black-currant":"black-currant", raspberry:"raspberry", berries:"berries", cranberry:"cranberry",
    "passion-fruit":"passion-fruit", "linden-blossom":"linden-blossom", broom:"broom", heliotrope:"heliotrope",
    basil:"basil", cashmere:"cashmere", violet:"violet", cypress:"cypress", spices:"spices", davana:"davana",
    osmanthus:"osmanthus", "osmanthus-milk":"osmanthus-milk", tea:"black-tea", musk:"musk", woods:"woods",
    akigalawood:"akigalawood", cedar:"cedar", "kmthry-akhdr":"green-pear", "powdered-sugar":"powdered-sugar",
    sugar:"sugar", mahonial:"mahonial",
    altrkhwn:"altrkhwn", alarar:"alarar", alashb:"alashb", "alashb-alhlw":"alashb-alhlw",
    "alghabh-alkhdra":"alghabh-alkhdra", alghlabanwm:"alghlabanwm", "alflfl-alakhdr":"alflfl-alakhdr",
    "alflfl-alakhdr-alhar":"alflfl-alakhdr-alhar", alflwf:"alflwf", alqsb:"alqsb", alqtyfh:"alqtyfh",
    alqmh:"alqmh", alqnb:"alqnb", alkady:"alkady", "alkalamynt-alasghr":"alkalamynt-alasghr", alkbr:"alkbr",
    alkrfs:"alkrfs", alkzbrh:"alkzbrh", allblab:"allblab", almrdqwsh:"almrdqwsh", alnkhalh:"alnkhalh",
    "alndgh-aljbly":"alndgh-aljbly", alnanaa:"alnanaa", "alnanaa-albry":"alnanaa-albry",
    "alnanaa-almdbb":"alnanaa-almdbb", alhlywn:"alhlywn", alwj:"alwj", alybrwh:"alybrwh",
    "awraq-alanb":"awraq-alanb", balmarwza:"balmarwza", bandanws:"bandanws", "bdhwr-alkrfs":"bdhwr-alkrfs",
    btm:"btm", bqlh:"bqlh", bwrnywl:"bwrnywl", bwsydwnya:"bwsydwnya", "tbgh-ashqr":"tbgh-ashqr",
    "twt-alarar":"twt-alarar", twrya:"twrya", twlsy:"twlsy", thwm:"thwm", "jajwmarw-banyan":"jajwmarw-banyan",
    jambw:"jambw", "jdhr-allwfaj":"jdhr-allwfaj", "jdhr-almlak":"jdhr-almlak",
    "jdhwr-khshb-alarz":"jdhwr-khshb-alarz", "jranywm-makwrwhyzwm-zdrafytz":"jranywm-makwrwhyzwm-zdrafytz", khs:"khs",
    khlh:"khlh", dbq:"dbq", "zhr-altansy":"zhr-altansy", "zhr-alatas":"zhr-alatas", "zhr-damyana":"zhr-damyana",
    "zhr-lsan-althwr":"zhr-lsan-althwr", "zhrh-alshykhh":"zhrh-alshykhh", sansyfyrya:"sansyfyrya",
    "srh-alard":"srh-alard", "swjandha-kwkyla":"swjandha-kwkyla", "shay-awwlwngh":"shay-awwlwngh",
    "shay-asam":"shay-asam", "shay-ayrl-ghray":"shay-ayrl-ghray", "shay-alhnth-alswda":"shay-alhnth-alswda",
    "shay-alrwybws-alahmr":"shay-alrwybws-alahmr", "shay-almatsha":"shay-almatsha", "shay-bwyr":"shay-bwyr", "shay-taylandy":"shay-taylandy", "shay-ty-jwan-yn":"shay-ty-jwan-yn", "shay-jywkwrw":"shay-jywkwrw", "shay-fdlat-albt-yashy-shyangh":"shay-fdlat-albt-yashy-shyangh", "shay-kymwn":"shay-kymwn", "shay-labsanj-swtshwnj":"shay-labsanj-swtshwnj", "shay-lwnghjyngh":"shay-lwnghjyngh", "shay-lyshan":"shay-lyshan", "shay-ywnan-alahmr":"shay-ywnan-alahmr", "shjyrh-alkrywzwt":"shjyrh-alkrywzwt", "shmr-bhry":"shmr-bhry", "shwan-shywnj":"shwan-shywnj", "shwk-alwrd":"shwk-alwrd", "shyzw":"shyzw", "ashb-alshaty-amwfyla":"ashb-alshaty-amwfyla", "alklwrwfyl":"alklwrwfyl", "alnsgh":"alnsgh", "alnsgh-alakhdr":"alnsgh-alakhdr", "green-notes":"green-notes", "alnwtat-almnashh":"alnwtat-almnashh", "bytrykwr":"bytrykwr", "bystw":"bystw", "bygharan":"bygharan", "bywt":"bywt", "jdhwr":"jdhwr", "zhrh-alshaty":"zhrh-alshaty", "swartzya":"swartzya", "shjrh-albakwl":"shjrh-albakwl", "shjrh-byhyny":"shjrh-byhyny", "shjrh-jwaw":"shjrh-jwaw", "shjrh-syryba":"shjrh-syryba", "ashb-albwq-alazrq":"ashb-albwq-alazrq", "ashb-alhsan":"ashb-alhsan", "ashb-alznjbyl":"ashb-alznjbyl", "ashb-alflyh":"ashb-alflyh", "ashb-almth":"ashb-almth", "ashb-lsan-alghzal":"ashb-lsan-alghzal", "ashbh-alsabwn":"ashbh-alsabwn", "ashbh-alanzh":"ashbh-alanzh", "ashbh-thaban-sbah":"ashbh-thaban-sbah", "ashbh-mtdhrjh":"ashbh-mtdhrjh", "ghabh-lwrysylfa":"ghabh-lwrysylfa", "frwst-wwd":"frwst-wwd", "fyskwl":"fyskwl", "qsh-alqbah":"qsh-alqbah", "kabytyw":"kabytyw", "kalykantws":"kalykantws"
    ,"kanghzw":"kanghzw", "krm-alanb":"krm-alanb", "krmh-alhryr":"krmh-alhryr", "kwlyws":"kwlyws", "kwnzya":"kwnzya", "lamynarya":"lamynarya", "lymwnwfyla-arwmatyka":"lymwnwfyla-arwmatyka", "ma-kwayn":"ma-kwayn", "mlahzat-atryh":"mlahzat-atryh", "mlfwf-alzrban":"mlfwf-alzrban", "mnthwl":"mnthwl", "myranty-abyd":"myranty-abyd", "nbat-althaban":"nbat-althaban", "nbat-aljnjl":"nbat-aljnjl", "nbat-alfrawlh":"nbat-alfrawlh", "nbat-alkwka":"nbat-alkwka"
    ,"nbat-alnardyn":"nbat-alnardyn", "nbat-alndy":"nbat-alndy", "nkhalh-alshwfan":"nkhalh-alshwfan", "nsgh-alsnwbr":"nsgh-alsnwbr", "nswar":"nswar", "nanaa-altfah":"nanaa-altfah", "hwangh-lyan":"hwangh-lyan", "wrq-alatrj":"wrq-alatrj", "wrq-albytl":"wrq-albytl", "wrq-althwm-albry":"wrq-althwm-albry", "wrq-alsfsaf":"wrq-alsfsaf", "wrq-alkatswra":"wrq-alkatswra", "wrq-allwra":"wrq-allwra", "wrq-khshb-alwrd":"wrq-khshb-alwrd", "wwdrwf":"wwdrwf", "wyntrghryn":"wyntrghryn"
    ,"yarw":"yarw", "priprioca":"priprioca", "ashjar-alkary":"ashjar-alkary", "altrafanyl":"altrafanyl", "awraq-albymyntw":"awraq-albymyntw", "awraq-alqrfh":"awraq-alqrfh", "alatfaqat-alzytyh":"alatfaqat-alzytyh", "altmr-hndy":"altmr-hndy", "altwabl-alhndyh":"altwabl-alhndyh", "alhlbh":"alhlbh", "alkhwlnjan":"alkhwlnjan", "alrwayh-alshrqyh":"alrwayh-alshrqyh", "alsmaq":"alsmaq", "alsmsm":"alsmsm", "alshbt":"alshbt", "alshmr":"alshmr"
    ,"alarqsws":"alarqsws", "alflfl":"alflfl", "alflfl-albnghaly":"alflfl-albnghaly", "alflfl-alhlw-alasbany":"alflfl-alhlw-alasbany", "alflfl-alyabany":"alflfl-alyabany", "alqrnfl":"alqrnfl", "alkarawyh":"alkarawyh", "alkary":"alkary", "alkakaw":"alkakaw", "alkbabh":"alkbabh", "alkrkm":"alkrkm", "alkmwn":"alkmwn", "alynswn":"alynswn", "alynswn-alnjmy":"alynswn-alnjmy", "bdhwr-albymyntw":"bdhwr-albymyntw", "bdhwr-alkhrdl":"bdhwr-alkhrdl"
    ,"bryany":"bryany", "bsbash":"bsbash", "twabl-almkhbwzat":"twabl-almkhbwzat", "twskanwl":"twskanwl", "jdhr-aljalanjal":"jdhr-aljalanjal", "rayhh-altwabl":"rayhh-altwabl", "safrlayn":"safrlayn", "smsm-aswd":"smsm-aswd", "shjrh-alrm":"shjrh-alrm", "shjrh-alflfl":"shjrh-alflfl", "smgh-alanjdan-alhltyt":"smgh-alanjdan-alhltyt", "flfl-alma":"flfl-alma", "flfl-tymwr":"flfl-tymwr", "flfl-syshwan":"flfl-syshwan", "flfl-ghwst":"flfl-ghwst", "flfl-ghynya":"flfl-ghynya"
    ,"flfl-mdbb":"flfl-mdbb", "qhwh-co2":"qhwh-co2", "qhwh-khdra":"qhwh-khdra", "qhwh-kwby-lwak":"qhwh-kwby-lwak", "karwlyna-rybr":"karwlyna-rybr", "kasya-bwrbwn":"kasya-bwrbwn", "kbybh-synyh":"kbybh-synyh", "krawya":"krawya", "mrby-almanjw-almalh":"mrby-almanjw-almalh", "mstkhls-alqhwh":"mstkhls-alqhwh", "hyl-alsyam":"hyl-alsyam", "wasaby":"wasaby", "wan-saw-lwngh":"wan-saw-lwngh", "altmr-alblh":"altmr-alblh", "aspic":"aspic", "canele":"canele"
    ,"crispy-roll":"crispy-roll", "lollipop":"lollipop", "muscovado":"muscovado", "sugar-candy":"sugar-candy", "ube":"ube", "ajaf-nyktar-shrab-alsbar-alhlw":"ajaf-nyktar-shrab-alsbar-alhlw", "arz-mhms":"arz-mhms", "atfaq-ghwrmand":"atfaq-ghwrmand", "alays-krym":"alays-krym", "albrwfwytrwl":"albrwfwytrwl", "albskwyt":"albskwyt", "albqlawh":"albqlawh", "albwnbwn":"albwnbwn", "aljnzbyl-almskr":"aljnzbyl-almskr", "aljylatw":"aljylatw", "alhlawh-althynyh":"alhlawh-althynyh"
    ,"alhlwy":"alhlwy", "alhlwy-aldnymarkyh":"alhlwy-aldnymarkyh", "alhlyb-almkthf":"alhlyb-almkthf", "alkhbz":"alkhbz", "aldbs":"aldbs", "alzbady":"alzbady", "alzbd":"alzbd", "alskr-albny":"alskr-albny", "alshykwlath-aldaknh":"alshykwlath-aldaknh", "alshykwlath-albyda":"alshykwlath-albyda", "altwfy":"altwfy", "alalkh":"alalkh", "alanab":"alanab", "alfshar":"alfshar", "alfwakh-almjffh-almskrh":"alfwakh-almjffh-almskrh", "alkab-kyk":"alkab-kyk"
    ,"alkaramyl":"alkaramyl", "alkrwaswn":"alkrwaswn", "alkrymh":"alkrymh", "alkrymh-altazjh":"alkrymh-altazjh", "alkmthry-alays-krym":"alkmthry-alays-krym", "alknafh":"alknafh", "alkwkyz":"alkwkyz", "allwz-almkrml":"allwz-almkrml", "almarshmyllw":"almarshmyllw", "almyrangh":"almyrangh", "alnwtat-alkrymyh":"alnwtat-alkrymyh", "alnwja":"alnwja", "alwafl":"alwafl", "baba-hlwy-aytalyh":"baba-hlwy-aytalyh", "bastyra-nabwlytana":"bastyra-nabwlytana", "ban-dy-asbanya":"ban-dy-asbanya"
    ,"banakwta":"banakwta", "bandwrw":"bandwrw", "banytwny":"banytwny", "brawny":"brawny", "brytzl":"brytzl", "bskwyt-ghrahm":"bskwyt-ghrahm", "bskwyt-lynzr":"bskwyt-lynzr", "bskwyt-madlyn":"bskwyt-madlyn", "bwbalw":"bwbalw", "bwdrh-jwz-alhnd":"bwdrh-jwz-alhnd", "bwdyngh":"bwdyngh", "bwdyngh-alarz":"bwdyngh-alarz", "byskwty":"byskwty", "tart-trwbyzyan":"tart-trwbyzyan", "tartyn":"tartyn", "tanghwlw":"tanghwlw"
    ,"trafl-alshwkwlath":"trafl-alshwkwlath", "trafl-alshwkwlath-albyda":"trafl-alshwkwlath-albyda", "trys-lytshyh":"trys-lytshyh", "tshwrws":"tshwrws", "tshyz-kyk":"tshyz-kyk", "tfah-alhlwy":"tfah-alhlwy", "tfah-mkhbwz":"tfah-mkhbwz", "twbyj":"twbyj", "twrth-zakhr":"twrth-zakhr", "jzy-asytylfwran":"jzy-asytylfwran", "jwz-hnd-mhms":"jwz-hnd-mhms", "jyandwya":"jyandwya", "jylatw-albrtqal":"jylatw-albrtqal", "jylatyn":"jylatyn", "jywnyanj-nbydh-alarz-alhlw":"jywnyanj-nbydh-alarz-alhlw", "hbwb-alaftar-alsyryal":"hbwb-alaftar-alsyryal"
  });

  function generatedImageFor(slug) {
    const filename = generatedNoteImages[slug];
    return filename ? `assets/notes/generated/${filename}.webp` : "";
  }

  // Manager-uploaded artwork that passed the live transparency, resolution,
  // detail and payload checks. These overrides remain authoritative.
  const approvedManagerArtwork = new Set([
    "black-lemon", "rose", "iris", "apple", "lavender", "coconut", "mango", "pear", "cherry", "pineapple",
    "orange", "lemon", "grapefruit", "bergamot", "peach", "neroli", "pink-musk", "milk", "milk-accord",
    "dates", "fig", "chocolate", "mandarin", "leather", "white-musk", "sandalwood", "cinnamon", "vanilla",
    "cardamom", "pink-pepper", "honey"
  ]);

  const curatedNotes = [
    ["rose", "ورد", "Rose", "flowers", ["ورد طائفي", "Taif Rose", "Rosa", "الورد"], "heart", "✿"],
    ["oud", "عود", "Oud", "woods-mosses", ["Oudh", "Agarwood", "Aoud", "العود"], "base", "▥"],
    ["musk", "مسك", "Musk", "musk-amber-animalic", ["المسك", "Musks"], "base", "◌"],
    ["white-musk", "مسك أبيض", "White Musk", "musk-amber-animalic", ["White musks", "المسك الأبيض"], "base", "◌"],
    ["amber", "عنبر", "Amber", "musk-amber-animalic", ["Amber accord", "العنبر"], "base", "◆"],
    ["vanilla", "فانيليا", "Vanilla", "sweets-gourmand", ["Vanille", "الفانيليا"], "base", "◇"],
    ["bergamot", "برغموت", "Bergamot", "citrus", ["Bergamote", "البرغموت"], "top", "◉"],
    ["jasmine", "ياسمين", "Jasmine", "white-flowers", ["Jasmin", "الياسمين"], "heart", "❀"],
    ["iris", "سوسن", "Iris", "flowers", ["Orris", "Iris root", "جذر السوسن", "السوسن"], "heart", "✿"],
    ["leather", "جلد", "Leather", "natural-synthetic-unusual", ["Suede", "جلد سويدي", "الجلد"], "base", "▰"],
    ["saffron", "زعفران", "Saffron", "spices", ["الزعفران", "Safran"], "heart", "✺"],
    ["woods", "أخشاب", "Woods", "woods-mosses", ["Woody notes", "Wood", "الأخشاب"], "base", "▥"],
    ["cedar", "أرز", "Cedar", "woods-mosses", ["Cedarwood", "خشب الأرز", "الأرز"], "base", "▥"],
    ["sandalwood", "صندل", "Sandalwood", "woods-mosses", ["خشب الصندل", "Santal"], "base", "▥"],
    ["patchouli", "باتشولي", "Patchouli", "woods-mosses", ["الباتشولي", "Patchouly"], "base", "⌁"],
    ["vetiver", "فيتيفر", "Vetiver", "woods-mosses", ["نجيل الهند", "Vetivert"], "base", "⌁"],
    ["neroli", "نيرولي", "Neroli", "white-flowers", ["النيرولي", "Orange blossom oil"], "heart", "❀"],
    ["orange-blossom", "زهر البرتقال", "Orange Blossom", "white-flowers", ["Orange flower", "Citrus Aurantium", "أزهار البرتقال"], "heart", "❀"],
    ["lemon", "ليمون", "Lemon", "citrus", ["الليمون", "Citron"], "top", "◉"],
    ["orange", "برتقال", "Orange", "citrus", ["البرتقال", "Sweet orange"], "top", "◉"],
    ["grapefruit", "جريب فروت", "Grapefruit", "citrus", ["الجريب فروت", "Pomelo"], "top", "◉"],
    ["mandarin", "يوسفي", "Mandarin", "citrus", ["Mandarin orange", "Tangerine", "الماندرين"], "top", "◉"],
    ["pink-pepper", "فلفل وردي", "Pink Pepper", "spices", ["Pink peppercorn", "الفلفل الوردي"], "top", "✺"],
    ["cardamom", "هيل", "Cardamom", "spices", ["Cardamon", "حبهان", "الهيل"], "top", "✺"],
    ["cinnamon", "قرفة", "Cinnamon", "spices", ["القرفة", "Cannelle"], "heart", "✺"],
    ["sage", "مريمية", "Sage", "greens-herbs-fougere", ["Clary sage", "المريمية"], "top", "⌁"],
    ["lavender", "لافندر", "Lavender", "greens-herbs-fougere", ["الخزامى", "Lavande"], "top", "⌁"],
    ["tobacco", "تبغ", "Tobacco", "natural-synthetic-unusual", ["التبغ", "Tobacco leaf"], "base", "✦"],
    ["incense", "بخور", "Incense", "resins-balsams", ["Frankincense", "Olibanum", "لبان", "البخور"], "base", "◆"],
    ["coffee", "قهوة", "Coffee", "beverages", ["القهوة", "Café"], "heart", "◒"],
    ["tea", "شاي", "Tea", "beverages", ["الشاي", "Black tea", "Green tea"], "heart", "◒"],
    ["chocolate", "شوكولاتة", "Chocolate", "sweets-gourmand", ["Cocoa", "كاكاو", "الشوكولاتة"], "base", "◇"],
    ["honey", "عسل", "Honey", "sweets-gourmand", ["العسل", "Miel"], "heart", "◇"],
    ["coconut", "جوز الهند", "Coconut", "fruits-vegetables-nuts", ["Coco", "جوز هند"], "heart", "●"],
    ["apple", "تفاح", "Apple", "fruits-vegetables-nuts", ["التفاح", "Green apple"], "top", "●"],
    ["cherry", "كرز", "Cherry", "fruits-vegetables-nuts", ["الكرز", "Black cherry"], "top", "●"],
    ["pear", "كمثرى", "Pear", "fruits-vegetables-nuts", ["الكمثرى", "Poire"], "top", "●"],
    ["peach", "خوخ", "Peach", "fruits-vegetables-nuts", ["الخوخ", "Pêche"], "heart", "●"],
    ["mango", "مانجو", "Mango", "fruits-vegetables-nuts", ["المانجو"], "top", "●"],
    ["pineapple", "أناناس", "Pineapple", "fruits-vegetables-nuts", ["الأناناس"], "top", "●"],
    ["fig", "تين", "Fig", "fruits-vegetables-nuts", ["التين", "Fig leaf"], "heart", "●"],
    ["marine", "نوتات بحرية", "Marine Notes", "natural-synthetic-unusual", ["Aquatic", "Sea notes", "نوتات مائية", "بحري"], "top", "≈"],
    ["green-notes", "نوتات خضراء", "Green Notes", "greens-herbs-fougere", ["Green accord", "أخضر", "النوتات الخضراء"], "top", "⌁"],
    ["rum", "روم", "Rum", "beverages", ["الروم", "Rhum"], "heart", "◒"],
    ["black-pepper", "فلفل أسود", "Black Pepper", "spices", ["الفلفل الأسود", "Pepper"], "top", "✺"],
    ["rosemary", "إكليل الجبل", "Rosemary", "greens-herbs-fougere", ["روزماري", "حصى البان"], "top", "⌁"],
    ["geranium", "إبرة الراعي", "Geranium", "flowers", ["جيرانيوم", "Pelargonium"], "heart", "✿"],
    ["tuberose", "مسك الروم", "Tuberose", "white-flowers", ["التيوبروز", "Polianthes tuberosa"], "heart", "❀"],
    ["tonka-bean", "حبوب التونكا", "Tonka Bean", "sweets-gourmand", ["تونكا", "Tonka"], "base", "◇"],
    ["myrrh", "المُرّ", "Myrrh", "resins-balsams", ["مر", "المر"], "base", "◆"],
    ["dates", "تمر", "Dates", "fruits-vegetables-nuts", ["التمر", "Date fruit"], "heart", "●"],
    ["praline", "برالين", "Praline", "sweets-gourmand", ["حلوى البرالين", "Praliné"], "heart", "◇"],
    ["milk", "حليب", "Milk", "sweets-gourmand", ["الحليب", "Milk notes"], "heart", "◇"],
    ["milk-accord", "أكورد الحليب", "Milk Accord", "sweets-gourmand", ["اتفاق الحليب", "Milky accord"], "heart", "◇"],
    ["milk-chocolate", "شوكولاتة بالحليب", "Milk Chocolate", "sweets-gourmand", ["شوكولاتة الحليب"], "base", "◇"],
    ["beeswax", "شمع العسل", "Beeswax", "musk-amber-animalic", ["شمع النحل"], "base", "◆"],
    ["ambroxan", "أمبروكسان", "Ambroxan", "musk-amber-animalic", ["Ambrox", "Ambrofix", "أمبروكس"], "base", "◆"],
    ["ambrettolide", "أمبريتوليد", "Ambrettolide", "musk-amber-animalic", ["Ambrette Musk"], "base", "◌"],
    ["cetalox", "سيتالوكس", "Cetalox", "musk-amber-animalic", ["Cetambrox", "Ambroxide"], "base", "◆"],
    ["black-musk", "مسك أسود", "Black Musk", "musk-amber-animalic", ["المسك الأسود"], "base", "◌"],
    ["pink-musk", "مسك وردي", "Pink Musk", "musk-amber-animalic", ["المسك الوردي"], "base", "◌"],
    ["animalic-notes", "نوتات حيوانية", "Animalic Notes", "musk-amber-animalic", ["Animal Notes", "نوتات حيوانية"], "base", "◌"],
    ["carrot-seeds", "بذور الجزر", "Carrot Seeds", "fruits-vegetables-nuts", ["بذور الجزر العطرية"], "heart", "●"],
    ["mahonial", "ماهونيال", "Mahonial", "natural-synthetic-unusual", ["Mahonia accord"], "heart", "✦"],
    ["akigalawood", "أكيجالا وود", "Akigalawood", "woods-mosses", ["Akigala Wood"], "base", "▥"],
    ["chinotto", "شينوتو", "Chinotto", "citrus", ["الشينوتو", "Myrtle-leaved orange"], "top", "◉"],
    ["white-flowers", "زهور بيضاء", "White Flowers", "white-flowers", ["الأزهار البيضاء", "White Floral Notes"], "heart", "❀"],
    ["sweet-notes", "نوتات حلوة", "Sweet Notes", "sweets-gourmand", ["حلو", "Sweet Accord"], "base", "◇"]
    ,["peony", "فاوانيا", "Peony", "flowers", ["زهرة الفاوانيا"], "heart", "✿"]
    ,["ginger", "زنجبيل", "Ginger", "spices", ["Blue Ginger", "Nigerian Ginger", "الزنجبيل"], "top", "✺"]
    ,["candied-fruits", "فواكه مسكّرة", "Candied Fruits", "fruits-vegetables-nuts", ["الفواكه المسكرة"], "heart", "●"]
    ,["benzoin", "بنزوين", "Benzoin", "resins-balsams", ["جاوي", "Benzoin Resin"], "base", "◆"]
    ,["nutmeg", "جوزة الطيب", "Nutmeg", "spices", ["جوز الطيب"], "heart", "✺"]
    ,["cacao", "كاكاو", "Cacao", "sweets-gourmand", ["Cocoa Bean", "حبوب الكاكاو"], "base", "◇"]
    ,["labdanum", "لابدانوم", "Labdanum", "resins-balsams", ["Cistus Resin", "راتنج القستوس"], "base", "◆"]
    ,["caramel", "كراميل", "Caramel", "sweets-gourmand", ["الكراميل"], "base", "◇"]
    ,["sugar", "سكر", "Sugar", "sweets-gourmand", ["السكر"], "base", "◇"]
    ,["basil", "ريحان", "Basil", "greens-herbs-fougere", ["الريحان"], "top", "⌁"]
    ,["black-currant", "كشمش أسود", "Black Currant", "fruits-vegetables-nuts", ["Blackcurrant", "الكشمش الأسود"], "top", "●"]
    ,["raspberry", "توت العليق", "Raspberry", "fruits-vegetables-nuts", ["رازبيري"], "top", "●"]
    ,["cashmere", "كشمير", "Cashmere", "natural-synthetic-unusual", ["Cashmere Accord", "أكورد الكشمير"], "base", "✦"]
    ,["berries", "توت بري", "Berries", "fruits-vegetables-nuts", ["Mixed Berries", "ثمار التوت"], "top", "●"]
    ,["cranberry", "توت بري أحمر", "Cranberry", "fruits-vegetables-nuts", ["كرانبيري"], "top", "●"]
    ,["linden-blossom", "زهر الزيزفون", "Linden Blossom", "flowers", ["Lime Blossom", "زيزفون"], "heart", "✿"]
    ,["broom", "زهرة الوزّال", "Broom", "flowers", ["Genista", "الوزال"], "heart", "✿"]
    ,["heliotrope", "زهرة الهليوتروب", "Heliotrope", "flowers", ["Heliotropium", "هليوتروب"], "heart", "✿"]
    ,["violet", "بنفسج", "Violet", "flowers", ["البنفسج"], "heart", "✿"]
    ,["spices", "توابل", "Spices", "spices", ["بهارات", "التوابل"], "multiple", "✺"]
    ,["cypress", "سرو", "Cypress", "greens-herbs-fougere", ["السرو"], "top", "⌁"]
    ,["passion-fruit", "باشن فروت", "Passion Fruit", "fruits-vegetables-nuts", ["فاكهة العاطفة"], "top", "●"]
    ,["osmanthus", "أوسمانثوس", "Osmanthus", "flowers", ["زهرة الأوسمانثوس"], "heart", "✿"]
    ,["davana", "دافانا", "Davana", "greens-herbs-fougere", ["الدافانا"], "heart", "⌁"]
  ].map(([slug, nameAr, nameEn, familyId, aliases, position, symbol]) => ({
    slug, nameAr, nameEn, familyId, aliases, position, symbol, image: generatedImageFor(slug)
  }));

  const arabicNameOverrides = Object.freeze({
    "black-lemon":"ليمون أسود", kabosu:"كابوسو", murcott:"يوسفي موركوت",
    chayote:"شايوت", cherimoya:"شيريمويا", "green-banana":"موز أخضر", "guava-nectar":"رحيق الجوافة",
    pitanga:"بيتانغا", snowberry:"توت الثلج", "umbu-caja-tapereba":"أومبو كاجا وتابيريبا",
    "blue-pea-flower":"زهرة البازلاء الزرقاء", bouvardia:"بوفارديا", "butomus-umbellatus":"بوتوموس أومبيلاتوس",
    buttercup:"زهرة الحوذان", clematis:"ياسمين البر", dianthus:"ديانثوس", "elengi-mimusops":"ميموسوبس إيلينجي",
    hollyhock:"الخطمية", "kanzan-cherry":"كرز كانزان", lamprocapnos:"لامبروكابنوس", leatherwood:"خشب الجلود",
    "madonna-lily":"زنبق مادونا", "orange-jasmine":"ياسمين البرتقال", "osmanthus-milk":"حليب الأوسمانثوس",
    paramela:"باراميلا", pataqueira:"باتاكيرا", phlox:"فلوكس", "skeleton-flower-diphylleia-grayi":"زهرة الهيكل العظمي",
    "solomon-s-seal":"خاتم سليمان", wrightia:"رايتيا", "achillea-olympus":"أخيليا أوليمبوس", culantro:"كولانترو",
    genmaicha:"شاي جينمايتشا", hojicha:"شاي هوجيتشا", katrafay:"كاترافاي", "olymra-plant-accord":"أكورد نبات أوليمرا",
    "phoenix-dan-cong-oolong":"شاي فينيكس دان كونغ أولونغ", "strawberry-gum":"صمغ الفراولة", priprioca:"بريبريوكا",
    aspic:"هلام عطري", canele:"كانيليه", "crispy-roll":"لفافة مقرمشة", lollipop:"مصاصة حلوى",
    muscovado:"سكر موسكوفادو", "powdered-sugar":"سكر بودرة", "sugar-candy":"حلوى السكر", ube:"يام أرجواني",
    "apricot-wood":"خشب المشمش", "ghaf-tree":"شجرة الغاف", incienso:"بخور", kowhai:"كوهـاي",
    "taiwan-incense-cedar":"أرز البخور التايواني", z11tm:"زي 11", "breu-branco":"راتنج بريو برانكو",
    "copaiba-balm":"بلسم الكوبيبا", mopane:"موباني", ambrexolide:"أمبريكسوليد", "champagne-cola":"كولا الشمبانيا",
    cola:"كولا", barnyard:"رائحة الحظيرة", cascalone:"كاسكالون", cedramber:"سيدرامبر", doremox:"دوريموكس",
    "ethyl-vanilin":"إيثيل فانيلين", naphthalene:"نفثالين", naturalcalmtm:"ناتشورال كالم",
    "party-balloons":"بالونات الحفلات", pomarose:"بوماروز", sublimolidetm:"سوبليموليد", terpentine:"تربنتين",
    charcoal:"فحم"
  });

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f\u064B-\u065F\u0670]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .toLowerCase();
  }

  const arabicRomanization = {
    ا: "a", ب: "b", ت: "t", ث: "th", ج: "j", ح: "h", خ: "kh", د: "d", ذ: "dh",
    ر: "r", ز: "z", س: "s", ش: "sh", ص: "s", ض: "d", ط: "t", ظ: "z", ع: "a",
    غ: "gh", ف: "f", ق: "q", ك: "k", ل: "l", م: "m", ن: "n", ه: "h", و: "w",
    ي: "y", ء: "", " ": "-"
  };

  function romanizeArabic(value) {
    return normalize(value).split("").map((letter) => arabicRomanization[letter] ?? letter).join("")
      .replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function arabizeEnglish(value) {
    const digraphs = {
      sh: "ش", ch: "تش", th: "ث", ph: "ف", gh: "غ", kh: "خ", ou: "و", oo: "و", ee: "ي"
    };
    const letters = {
      a: "ا", b: "ب", c: "ك", d: "د", e: "ي", f: "ف", g: "ج", h: "ه", i: "ي",
      j: "ج", k: "ك", l: "ل", m: "م", n: "ن", o: "و", p: "ب", q: "ق", r: "ر",
      s: "س", t: "ت", u: "و", v: "ف", w: "و", x: "كس", y: "ي", z: "ز", " ": " "
    };
    let text = normalize(value);
    Object.entries(digraphs).forEach(([from, to]) => (text = text.replaceAll(from, to)));
    return text.split("").map((letter) => letters[letter] ?? letter).join("").trim() || "مكوّن عطري";
  }

  function slugify(value) {
    const ascii = /[\u0600-\u06FF]/.test(value) ? romanizeArabic(value) : normalize(value).replace(/\s+/g, "-");
    return ascii.replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "") || `note-${Date.now().toString(36)}`;
  }

  function stableHash(value) {
    let hash = 2166136261;
    for (const character of String(value || "")) {
      hash ^= character.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function uniqueSlug(value, familyId, result) {
    const base = slugify(value);
    if (!result.has(base)) return base;
    const familySlug = `${base}-${familyId}`;
    if (!result.has(familySlug)) return familySlug;
    return `${familySlug}-${stableHash(value)}`;
  }

  function cleanState(value) {
    const source = value && typeof value === "object" ? value : {};
    return {
      version: STORAGE_VERSION,
      families: Array.isArray(source.families) ? source.families : [],
      notes: Array.isArray(source.notes) ? source.notes : [],
      overrides: source.overrides && typeof source.overrides === "object" ? source.overrides : {},
      merges: source.merges && typeof source.merges === "object" ? source.merges : {},
      unclassified: Array.isArray(source.unclassified) ? source.unclassified : []
    };
  }

  let customState = cleanState({});
  let families = [];
  let notes = [];
  let notesBySlug = new Map();
  let aliasIndex = new Map();

  // Only reviewed, version-controlled evidence can authorize storefront artwork.
  // Uploads and imported `validated:true` flags are not review evidence.
  const reviewedAssets = Object.freeze({
    "alsybrwl-alnajramwtha": {"canonicalKey":"alsybrwl-alnajramwtha","canonicalNameEn":"Cypriol nagarmotha Cyperus scariosus","positiveDescription":"a small bundle of earthy brown fibrous cypriol rhizomes with a few narrow sedge leaves","scientificName":null,"entityType":"rhizome","plantPart":"rhizome","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Cypriol nagarmotha Cyperus scariosus. Subject: a small bundle of earthy brown fibrous cypriol rhizomes with a few narrow sedge leaves. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-82c373cb-e028-422c-b490-cdbeed404327","validated":true,"status":"VALID","canonicalNameAr":"السيبرول (الناجراموثا)","imageUrl":"assets/notes/generated/alsybrwl-alnajramwtha.webp","noteKey":"alsybrwl-alnajramwtha","noteAssetId":"origo-note-alsybrwl-alnajramwtha","sha256":"ccb3b538be261bf528b15c1b0cb801fdec5d238819d62fe04d46b2942d6fc077","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"50faf2ff996fecd79648d7584630cec6a9e7c6c49ca920fae173091603f3196e","perceptualHash":"090b0b050343a331","technicalReview":{"width":320,"height":320,"bytes":38942,"alphaExtrema":[0,255]}},
    "alsfsaf-alabyd": {"canonicalKey":"alsfsaf-alabyd","canonicalNameEn":"white willow Salix alba","positiveDescription":"a slender white willow twig with narrow silvery-green lanceolate leaves and pale bark","scientificName":null,"entityType":"branch","plantPart":"branch","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject white willow Salix alba. Subject: a slender white willow twig with narrow silvery-green lanceolate leaves and pale bark. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-35cfc90f-7b1c-4ae3-b2ce-6da525613618","validated":true,"status":"VALID","canonicalNameAr":"الصفصاف الابيض","imageUrl":"assets/notes/generated/alsfsaf-alabyd.webp","noteKey":"alsfsaf-alabyd","noteAssetId":"origo-note-alsfsaf-alabyd","sha256":"97f3841d8986304d5a1cfb5677e033767253bdcce5d3736481f204dce85746e0","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"7f92cb0a1b6b6258ab2ebec9449f8d1cd8f3460a5f4f7ad0324b59fe793482e6","perceptualHash":"04530b2737130dc4","technicalReview":{"width":320,"height":320,"bytes":28484,"alphaExtrema":[0,255]}},
    "alawd-alandwnysy": {"canonicalKey":"alawd-alandwnysy","canonicalNameEn":"Indonesian agarwood oud","positiveDescription":"a distinct small split piece of Indonesian resin-rich agarwood, dark marbled resin veins through warm brown wood","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Indonesian agarwood oud. Subject: a distinct small split piece of Indonesian resin-rich agarwood, dark marbled resin veins through warm brown wood. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-c6432655-5a9e-4e89-9d14-29af3d508713","validated":true,"status":"VALID","canonicalNameAr":"العود الإندونيسي","imageUrl":"assets/notes/generated/alawd-alandwnysy.webp","noteKey":"alawd-alandwnysy","noteAssetId":"origo-note-alawd-alandwnysy","sha256":"cdee23af378099bd3fea72e9b28c624a1cc6e1d288c7d13f6fcf372865500f1b","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"d2e93a5135247408100297550a49b9376009f962f169d1c5d969c06629eb185f","perceptualHash":"0303070b1b170f0e","technicalReview":{"width":320,"height":320,"bytes":22970,"alphaExtrema":[0,255]}},
    "alawd-alabyd": {"canonicalKey":"alawd-alabyd","canonicalNameEn":"white oud agarwood","positiveDescription":"a pale cream agarwood chip with delicate golden resin streaks and fibrous carved edges","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject white oud agarwood. Subject: a pale cream agarwood chip with delicate golden resin streaks and fibrous carved edges. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-a3af9baf-f9b7-4a56-a176-f108762a09b6","validated":true,"status":"VALID","canonicalNameAr":"العود الابيض","imageUrl":"assets/notes/generated/alawd-alabyd.webp","noteKey":"alawd-alabyd","noteAssetId":"origo-note-alawd-alabyd","sha256":"de7b09c521dfbd17651648af5bbb908d19ae4bad72afe9cd1c51a228042376dc","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"8e2092e0e356f73755517c2c939f38e9bc8ef4bdae0d18183873ee8ebd716c48","perceptualHash":"000625390f07060c","technicalReview":{"width":320,"height":320,"bytes":20034,"alphaExtrema":[0,255]}},
    "alawd-alastraly": {"canonicalKey":"alawd-alastraly","canonicalNameEn":"Australian agarwood","positiveDescription":"a natural Australian cultivated agarwood piece with honey-brown grain and dark aromatic resin channels","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Australian agarwood. Subject: a natural Australian cultivated agarwood piece with honey-brown grain and dark aromatic resin channels. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-da5e3c2e-75b0-4704-bac2-dbdcecdaf601","validated":true,"status":"VALID","canonicalNameAr":"العود الاسترالي","imageUrl":"assets/notes/generated/alawd-alastraly.webp","noteKey":"alawd-alastraly","noteAssetId":"origo-note-alawd-alastraly","sha256":"744e4afac893679de46472976292f720d9a4374c1045252162566dd52dfe18f1","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"6bdd14bd8ebf9b1ef1f6fb6b277d89ef7970d6a3724efc161682030a34677075","perceptualHash":"030303032d13070f","technicalReview":{"width":320,"height":320,"bytes":26114,"alphaExtrema":[0,255]}},
    "alawd-altaylandy": {"canonicalKey":"alawd-altaylandy","canonicalNameEn":"Thai agarwood oud","positiveDescription":"a dark resinous Thai agarwood chip with dense black-brown marbling and rugged fibrous texture","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Thai agarwood oud. Subject: a dark resinous Thai agarwood chip with dense black-brown marbling and rugged fibrous texture. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-89d37e82-633f-4d22-90d9-8331efd390ce","validated":true,"status":"VALID","canonicalNameAr":"العود التايلاندي","imageUrl":"assets/notes/generated/alawd-altaylandy.webp","noteKey":"alawd-altaylandy","noteAssetId":"origo-note-alawd-altaylandy","sha256":"e4469d784f1ced0909a1f49e5fe86ff8d7301aa69a4afa3408e4a99c6bdbddbd","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"2d6ca259442d56b9d8bf15afa257dec4fc97b821dcb1c1816cba01812486bb1a","perceptualHash":"0303030f6d0f2766","technicalReview":{"width":320,"height":320,"bytes":27612,"alphaExtrema":[0,255]}},
    "alawd-alkmbwdy": {"canonicalKey":"alawd-alkmbwdy","canonicalNameEn":"Cambodian agarwood oud","positiveDescription":"a rich reddish-brown Cambodian agarwood chunk with glossy deep resin veins and irregular natural grain","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Cambodian agarwood oud. Subject: a rich reddish-brown Cambodian agarwood chunk with glossy deep resin veins and irregular natural grain. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-637a64a7-2f27-40fa-88b1-841cf3f21e45","validated":true,"status":"VALID","canonicalNameAr":"العود الكمبودى","imageUrl":"assets/notes/generated/alawd-alkmbwdy.webp","noteKey":"alawd-alkmbwdy","noteAssetId":"origo-note-alawd-alkmbwdy","sha256":"c0f0e99e22a6ef3b5d8e8511248b3d96b22ce9a3c04ad352656b193fb91597bb","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"cd88b7a7baead318c2df84146ab217fd09f9423059d22ed83a64b47c409d70a7","perceptualHash":"01010505277b170e","technicalReview":{"width":320,"height":320,"bytes":31060,"alphaExtrema":[0,255]}},
    "alawd-allawsy": {"canonicalKey":"alawd-allawsy","canonicalNameEn":"Laotian agarwood oud","positiveDescription":"a compact dark Laotian agarwood chip with smoky brown resin bands and rough natural edges","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Laotian agarwood oud. Subject: a compact dark Laotian agarwood chip with smoky brown resin bands and rough natural edges. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-4bceaba5-b4c0-4988-9198-7b7d53345579","validated":true,"status":"VALID","canonicalNameAr":"العود اللاوسي","imageUrl":"assets/notes/generated/alawd-allawsy.webp","noteKey":"alawd-allawsy","noteAssetId":"origo-note-alawd-allawsy","sha256":"508738afb911b8173aaf06cbe9d44ae6fc7dcba8b8f534173818746e46c4b0e7","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"cbd511d8be87371d0c63281bc83e189d4e159ee8f93224e02bdcd6c81f6b29b2","perceptualHash":"0103030f1b273f7c","technicalReview":{"width":320,"height":320,"bytes":22556,"alphaExtrema":[0,255]}},
    "alawd-alhndy": {"canonicalKey":"alawd-alhndy","canonicalNameEn":"Indian agarwood oud","positiveDescription":"an Assam Indian agarwood splinter with nearly black resinous heartwood streaked through deep brown grain","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Indian agarwood oud. Subject: an Assam Indian agarwood splinter with nearly black resinous heartwood streaked through deep brown grain. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-77fdc8bb-ba72-4627-aff4-ecb3e0cc8e53","validated":true,"status":"VALID","canonicalNameAr":"العود الهندى","imageUrl":"assets/notes/generated/alawd-alhndy.webp","noteKey":"alawd-alhndy","noteAssetId":"origo-note-alawd-alhndy","sha256":"5fb82dfa93fc25053a5817ff90b6355868853245c6d4f9d8df0eb02e3063a8be","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"17603804215344b5c525ac5ba7adb999b1efcc7a652e64285d7bf7de9032aeb7","perceptualHash":"000103050b3f1c18","technicalReview":{"width":320,"height":320,"bytes":20718,"alphaExtrema":[0,255]}},
    "alflyn": {"canonicalKey":"alflyn","canonicalNameEn":"cork bark","positiveDescription":"a clean natural slab of cork bark showing porous honeycomb texture and warm tan color","scientificName":null,"entityType":"bark","plantPart":"bark","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject cork bark. Subject: a clean natural slab of cork bark showing porous honeycomb texture and warm tan color. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-0fd070fd-7eef-4d1d-b48f-2620fb7930c5","validated":true,"status":"VALID","canonicalNameAr":"الفلين","imageUrl":"assets/notes/generated/alflyn.webp","noteKey":"alflyn","noteAssetId":"origo-note-alflyn","sha256":"b2550eb0af143eab18cd5ae16a539c69863a2aa693d79da360bb3ecae0b40aa5","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"100f21fec2fa7efab292e19b38c24dfbafebf279eb3dbd85308309ca56b5c5fe","perceptualHash":"13111955794e3321","technicalReview":{"width":320,"height":320,"bytes":33772,"alphaExtrema":[0,255]}},
    "almaswya": {"canonicalKey":"almaswya","canonicalNameEn":"Massoia bark Cryptocarya massoy","positiveDescription":"several curled strips of reddish cinnamon-brown Massoia bark with rough outer surface and smooth inner layer","scientificName":null,"entityType":"bark","plantPart":"bark","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Massoia bark Cryptocarya massoy. Subject: several curled strips of reddish cinnamon-brown Massoia bark with rough outer surface and smooth inner layer. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-84225bac-8be0-482b-9792-04b39dc825c9","validated":true,"status":"VALID","canonicalNameAr":"الماسويا","imageUrl":"assets/notes/generated/almaswya.webp","noteKey":"almaswya","noteAssetId":"origo-note-almaswya","sha256":"0f471f4958888063277b13bc795a7bfff452abaec88336d1c2e6270797949f37","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"dc7f3d2b29f026099f15c1e879d01ab756197034d4c8ca9ae678019018158401","perceptualHash":"02063b3333272602","technicalReview":{"width":320,"height":320,"bytes":24230,"alphaExtrema":[0,255]}},
    "almskyt": {"canonicalKey":"almskyt","canonicalNameEn":"mesquite Prosopis wood","positiveDescription":"a small split piece of golden reddish mesquite hardwood with dramatic tight grain and one tiny compound-leaf sprig","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject mesquite Prosopis wood. Subject: a small split piece of golden reddish mesquite hardwood with dramatic tight grain and one tiny compound-leaf sprig. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-e63751df-68cd-44ad-bcba-dd87e64fdf17","validated":true,"status":"VALID","canonicalNameAr":"المسكيت","imageUrl":"assets/notes/generated/almskyt.webp","noteKey":"almskyt","noteAssetId":"origo-note-almskyt","sha256":"a0a46bafb324b688c8d420f81f2353c39a1a2762c3e71eb080429b1b0c1808d6","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"e9b2fded389fbe5c8100252e942523021d97d1ee8f5e12deebb81f884c68ee69","perceptualHash":"0019194511030e0c","technicalReview":{"width":320,"height":320,"bytes":26678,"alphaExtrema":[0,255]}},
    "almwhwhw": {"canonicalKey":"almwhwhw","canonicalNameEn":"Muhuhu African sandalwood Brachylaena hutchinsii","positiveDescription":"a small cluster of pale yellow-brown Muhuhu aromatic wood chips with fine dense grain","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Muhuhu African sandalwood Brachylaena hutchinsii. Subject: a small cluster of pale yellow-brown Muhuhu aromatic wood chips with fine dense grain. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-81114861-d07d-4a5d-8f37-b1eee99ed0dd","validated":true,"status":"VALID","canonicalNameAr":"الموهوهو","imageUrl":"assets/notes/generated/almwhwhw.webp","noteKey":"almwhwhw","noteAssetId":"origo-note-almwhwhw","sha256":"18ed4a5e14514750a36286b27c1ec664b4b687961caa0899da4130c997aaffac","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"cf5ca259026cef8bcbde026b232a79ec28b21690707eee401c95924d2a44c860","perceptualHash":"030307023359c70f","technicalReview":{"width":320,"height":320,"bytes":24374,"alphaExtrema":[0,255]}},
    "alnwtat-alshybr": {"canonicalKey":"alnwtat-alshybr","canonicalNameEn":"classic chypre accord","positiveDescription":"a refined symbolic arrangement of bergamot peel, gray-green oakmoss lichen, a tiny patchouli leaf and a dark labdanum resin piece, tightly grouped as one accord","scientificName":null,"entityType":"accord","plantPart":"accord","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject classic chypre accord. Subject: a refined symbolic arrangement of bergamot peel, gray-green oakmoss lichen, a tiny patchouli leaf and a dark labdanum resin piece, tightly grouped as one accord. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-53dcfcc5-7960-453e-bdc2-422c3583ba3b","validated":true,"status":"VALID","canonicalNameAr":"النوتات الشيبر","imageUrl":"assets/notes/generated/alnwtat-alshybr.webp","noteKey":"alnwtat-alshybr","noteAssetId":"origo-note-alnwtat-alshybr","sha256":"489490a751b637e9e9a86a8850cf75c9356da4fd2fe108ac89660952ec8ec2d0","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"396248ab9dd9a79350d6ac470b2d5f722cb8592d5efba6c74e3483b7a2c52f25","perceptualHash":"0607071f3d3b3f13","technicalReview":{"width":320,"height":320,"bytes":32394,"alphaExtrema":[0,255]}},
    "alnym": {"canonicalKey":"alnym","canonicalNameEn":"neem Azadirachta indica","positiveDescription":"a botanical neem twig with pinnate serrated green leaflets and a few small pale green oval fruits","scientificName":null,"entityType":"leaf","plantPart":"leaf","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject neem Azadirachta indica. Subject: a botanical neem twig with pinnate serrated green leaflets and a few small pale green oval fruits. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-ece52a42-275c-4e37-b71d-63740b2bab4d","validated":true,"status":"VALID","canonicalNameAr":"النيم","imageUrl":"assets/notes/generated/alnym.webp","noteKey":"alnym","noteAssetId":"origo-note-alnym","sha256":"24e031e2f303de935806c560c3f3e0a7370e3841a3d9cbd101b62069fb8d772a","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"f30a09ad7455924e326362edbf56cd9375bb8bb5904e0f622373a3711da2f93b","perceptualHash":"135317132b373723","technicalReview":{"width":320,"height":320,"bytes":34730,"alphaExtrema":[0,255]}},
    "batshwly-akhdr": {"canonicalKey":"batshwly-akhdr","canonicalNameEn":"green patchouli Pogostemon cablin","positiveDescription":"a fresh green patchouli sprig with broad crinkled serrated leaves and visible veins","scientificName":null,"entityType":"leaf","plantPart":"leaf","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject green patchouli Pogostemon cablin. Subject: a fresh green patchouli sprig with broad crinkled serrated leaves and visible veins. Style: high-end photorealistic botanical or material catalog specimen. Composition: isolated centered square object with generous transparent margin. Constraints: TRUE transparent alpha background with every corner fully transparent; accurate identity, morphology, material and natural color; only the named note or explicitly described accord; no backdrop, floor, scenery, frame, text, label, logo, watermark, people, hands, perfume bottle, container or unrelated objects.","sourceImageId":"exec-0abdc340-d744-4b6e-9cef-a81f20655668","validated":true,"status":"VALID","canonicalNameAr":"باتشولي أخضر","imageUrl":"assets/notes/generated/batshwly-akhdr.webp","noteKey":"batshwly-akhdr","noteAssetId":"origo-note-batshwly-akhdr","sha256":"4ada021e61d1a0199d7440e81f2fbcde045e51b85e23af9d3f59afd7abd05555","visualReview":"Reviewed reports/batch52-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"97b0ee453f82bdbc842ae1a004db5681919f4a1473d0fbef447b7310caea4215","perceptualHash":"0909337f43353161","technicalReview":{"width":320,"height":320,"bytes":32120,"alphaExtrema":[0,255]}},
    "alarzyh": {"canonicalKey":"alarzyh","canonicalNameEn":"Cedrus atlantica cedarwood","positiveDescription":"a small natural split piece of aromatic Atlas cedar heartwood with warm reddish brown grain and a short cedar needle sprig","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note Cedrus atlantica cedarwood: a small natural split piece of aromatic Atlas cedar heartwood with warm reddish brown grain and a short cedar needle sprig. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-9bfd6503-6afd-4fcd-b438-ed6e2c73fc47","validated":true,"status":"VALID","canonicalNameAr":"الأرزية","imageUrl":"assets/notes/generated/alarzyh.webp","noteKey":"alarzyh","noteAssetId":"origo-note-alarzyh","sha256":"5ffb45dc2324c93b4932fdef8e30d9bd7499cfbc90c125b51eab2182f992bc17","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"755303e8dc737b0c84118fc729708c61234523ddbdc2fa6edde00562ee0c45af","perceptualHash":"0607070713090707","technicalReview":{"width":320,"height":320,"bytes":29308,"alphaExtrema":[0,255]}},
    "alamyrys": {"canonicalKey":"alamyrys","canonicalNameEn":"Amyris balsamifera wood","positiveDescription":"a small natural cluster of pale golden Amyris balsamifera wood chips with fibrous grain and one tiny green leaflet","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note Amyris balsamifera wood: a small natural cluster of pale golden Amyris balsamifera wood chips with fibrous grain and one tiny green leaflet. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-b926d941-fd09-40d4-8a14-aa405a04ecaf","validated":true,"status":"VALID","canonicalNameAr":"الأميريس","imageUrl":"assets/notes/generated/alamyrys.webp","noteKey":"alamyrys","noteAssetId":"origo-note-alamyrys","sha256":"9e0692d0c5c987e55483b77c60f62109a8573a875186820f36243f38d66c9558","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"935c47380353e0447c8f401896610560696d20f95ed337cdc904ea5db06286b2","perceptualHash":"000767291933070c","technicalReview":{"width":320,"height":320,"bytes":21482,"alphaExtrema":[0,255]}},
    "alawkalybtws": {"canonicalKey":"alawkalybtws","canonicalNameEn":"Eucalyptus globulus","positiveDescription":"a realistic botanical sprig of blue-green eucalyptus leaves with a few round seed capsules","scientificName":null,"entityType":"leaf","plantPart":"leaf","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note Eucalyptus globulus: a realistic botanical sprig of blue-green eucalyptus leaves with a few round seed capsules. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-4189e2aa-a884-40bd-9775-c43829a5a125","validated":true,"status":"VALID","canonicalNameAr":"الأوكاليبتوس","imageUrl":"assets/notes/generated/alawkalybtws.webp","noteKey":"alawkalybtws","noteAssetId":"origo-note-alawkalybtws","sha256":"97b67169c6820ff4416e4dcbb268ab861359b3a638077bf1dfd3b7129a646f8b","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"1d49ef160371faae41888b00162b405440b400784d550920de1629c84d0d842e","perceptualHash":"0103276f2b054a0b","technicalReview":{"width":320,"height":320,"bytes":27792,"alphaExtrema":[0,255]}},
    "alashnh": {"canonicalKey":"alashnh","canonicalNameEn":"oakmoss lichen Evernia prunastri","positiveDescription":"a natural loose tuft of branching gray-green oakmoss lichen with intricate fronds","scientificName":null,"entityType":"lichen","plantPart":"lichen","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note oakmoss lichen Evernia prunastri: a natural loose tuft of branching gray-green oakmoss lichen with intricate fronds. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-2ae67bd3-8f8a-4d0a-9985-8358a03b4a04","validated":true,"status":"VALID","canonicalNameAr":"الاشنة","imageUrl":"assets/notes/generated/alashnh.webp","noteKey":"alashnh","noteAssetId":"origo-note-alashnh","sha256":"22e7d4d1b647f7d9c0267d570f78b08635ab1702934aa3b6dc3245d146d192b1","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"78d3aa6ce845f2cf8160f4cd43c77bced69c814033afc8eba439c146155652cc","perceptualHash":"02030f0707171313","technicalReview":{"width":320,"height":320,"bytes":44544,"alphaExtrema":[0,255]}},
    "albambw": {"canonicalKey":"albambw","canonicalNameEn":"bamboo","positiveDescription":"a short fresh green bamboo stem segment with one slender leafy side branch","scientificName":null,"entityType":"stem","plantPart":"stem","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note bamboo: a short fresh green bamboo stem segment with one slender leafy side branch. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-e4e93a96-2be9-42e2-ad51-cabd873ce10b","validated":true,"status":"VALID","canonicalNameAr":"البامبو","imageUrl":"assets/notes/generated/albambw.webp","noteKey":"albambw","noteAssetId":"origo-note-albambw","sha256":"8ff9c24070ba81057a2fa3916c07ac6da20c627507b5f9b100e7b07c87700a88","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"b88048a2e6a20c0bea1a560f7ddce9e7403e5cf7b46e682e3d56b680904adcc4","perceptualHash":"00000b0f3c1c3620","technicalReview":{"width":320,"height":320,"bytes":15578,"alphaExtrema":[0,255]}},
    "albawbab-shjr-astwayy": {"canonicalKey":"albawbab-shjr-astwayy","canonicalNameEn":"baobab tree Adansonia digitata","positiveDescription":"a recognizable miniature botanical baobab form with thick swollen trunk, sparse branches and a few green leaves","scientificName":null,"entityType":"tree","plantPart":"tree","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note baobab tree Adansonia digitata: a recognizable miniature botanical baobab form with thick swollen trunk, sparse branches and a few green leaves. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-e470eccc-5507-4240-a42f-0ae1a0c8aacc","validated":true,"status":"VALID","canonicalNameAr":"الباوباب شجر إستوائي","imageUrl":"assets/notes/generated/albawbab-shjr-astwayy.webp","noteKey":"albawbab-shjr-astwayy","noteAssetId":"origo-note-albawbab-shjr-astwayy","sha256":"a38dd3c51f314b65f8f3f96666dff1347ce5897fe4ca9d20dbba5eec469260fa","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"30313bb4ee1c15d86e75411106f5150e5470faa75f30c65d22089809c30fdc49","perceptualHash":"0183e7d777f70302","technicalReview":{"width":320,"height":320,"bytes":34400,"alphaExtrema":[0,255]}},
    "alblwt": {"canonicalKey":"alblwt","canonicalNameEn":"oak Quercus","positiveDescription":"a small natural oak twig with two lobed green leaves and one acorn","scientificName":null,"entityType":"leaf and fruit","plantPart":"leaf and fruit","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note oak Quercus: a small natural oak twig with two lobed green leaves and one acorn. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-c2aeb7f8-919b-4c1c-b581-2261029cfa03","validated":true,"status":"VALID","canonicalNameAr":"البلوط","imageUrl":"assets/notes/generated/alblwt.webp","noteKey":"alblwt","noteAssetId":"origo-note-alblwt","sha256":"74bb161157ccff7321cb7ea0becbf254b39e316b9d08ce0d3466d0716a5766df","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"7171dabcb7c1335ee585a18dace035dde5fcc2900e610e4e5e003aeb6e225c5e","perceptualHash":"000809092f1e3a38","technicalReview":{"width":320,"height":320,"bytes":22274,"alphaExtrema":[0,255]}},
    "altswja": {"canonicalKey":"altswja","canonicalNameEn":"Tsuga hemlock conifer","positiveDescription":"a delicate hemlock conifer twig with flat dark green needles and two tiny hanging cones","scientificName":null,"entityType":"branch","plantPart":"branch","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note Tsuga hemlock conifer: a delicate hemlock conifer twig with flat dark green needles and two tiny hanging cones. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-f4dd8ecd-7c0c-4ba8-8812-0a5b439865fa","validated":true,"status":"VALID","canonicalNameAr":"التسوجا","imageUrl":"assets/notes/generated/altswja.webp","noteKey":"altswja","noteAssetId":"origo-note-altswja","sha256":"9244e862062dd2131b20697595bd781341c1ea1ec1004eaf433bedb36d3b405f","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"c1e0eef326d11883eb778de235d34420a44167792c44fa42ebbf69e91bd44e03","perceptualHash":"011113072f0f3f30","technicalReview":{"width":320,"height":320,"bytes":33572,"alphaExtrema":[0,255]}},
    "altnwb": {"canonicalKey":"altnwb","canonicalNameEn":"fir Abies","positiveDescription":"a fresh fir twig with flat glossy needles and one small upright fir cone","scientificName":null,"entityType":"branch","plantPart":"branch","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note fir Abies: a fresh fir twig with flat glossy needles and one small upright fir cone. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-c57da351-e176-466b-b8f5-0fe6c163bb8f","validated":true,"status":"VALID","canonicalNameAr":"التنوب","imageUrl":"assets/notes/generated/altnwb.webp","noteKey":"altnwb","noteAssetId":"origo-note-altnwb","sha256":"dd1b928145b432ffbc0a33e26c262bb0860ea6d3e3ebe233ec7733eb5d5b29ca","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"3d323b1e777a5874ef6c1ff8d0008e864bb7c32b97b76e9d9358e34e024b706f","perceptualHash":"0009090707461606","technicalReview":{"width":320,"height":320,"bytes":32240,"alphaExtrema":[0,255]}},
    "alhwr-alrjraj": {"canonicalKey":"alhwr-alrjraj","canonicalNameEn":"quaking aspen Populus tremuloides","positiveDescription":"a slender aspen twig with three round finely toothed green leaves on long flattened petioles","scientificName":null,"entityType":"leaf","plantPart":"leaf","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note quaking aspen Populus tremuloides: a slender aspen twig with three round finely toothed green leaves on long flattened petioles. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-be5db771-fd51-4dac-814a-e8b472fcfe12","validated":true,"status":"VALID","canonicalNameAr":"الحور الرجراج","imageUrl":"assets/notes/generated/alhwr-alrjraj.webp","noteKey":"alhwr-alrjraj","noteAssetId":"origo-note-alhwr-alrjraj","sha256":"7df18a67859e93e86e5d67d497cb38716ef6f9b20d3b887120cf5ef1bac2b41e","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"11b9588ae5296800ebf5c4d48c79e888f7995f09124b6048412a2a6652dc5cfc","perceptualHash":"046c6d6973190c1c","technicalReview":{"width":320,"height":320,"bytes":19238,"alphaExtrema":[0,255]}},
    "alkhshb-alaswd": {"canonicalKey":"alkhshb-alaswd","canonicalNameEn":"African blackwood Dalbergia melanoxylon","positiveDescription":"a small split piece of dense near-black African blackwood heartwood showing subtle dark brown grain and pale sapwood edge","scientificName":null,"entityType":"wood","plantPart":"wood","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note African blackwood Dalbergia melanoxylon: a small split piece of dense near-black African blackwood heartwood showing subtle dark brown grain and pale sapwood edge. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-ef9a6cd9-506a-4cd2-8829-6f9db445e183","validated":true,"status":"VALID","canonicalNameAr":"الخشب الأسود","imageUrl":"assets/notes/generated/alkhshb-alaswd.webp","noteKey":"alkhshb-alaswd","noteAssetId":"origo-note-alkhshb-alaswd","sha256":"ccc539bb052e697b7701ab3b4e24c5b6f6bc9d22c40541f77bfd452e71182f64","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"8a55929b20cd3816a4a83a9cb29059ad912b7addb41df6f0a04e9e6b7a2c84db","perceptualHash":"03030b27170b0703","technicalReview":{"width":320,"height":320,"bytes":19500,"alphaExtrema":[0,255]}},
    "aldrdar": {"canonicalKey":"aldrdar","canonicalNameEn":"elm Ulmus","positiveDescription":"a natural elm twig with two asymmetrical serrated leaves and a small cluster of papery round samaras","scientificName":null,"entityType":"leaf and seed","plantPart":"leaf and seed","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note elm Ulmus: a natural elm twig with two asymmetrical serrated leaves and a small cluster of papery round samaras. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-f22a3111-ee41-4e0a-b00c-67c8a7293f87","validated":true,"status":"VALID","canonicalNameAr":"الدردار","imageUrl":"assets/notes/generated/aldrdar.webp","noteKey":"aldrdar","noteAssetId":"origo-note-aldrdar","sha256":"143d7a9cbc15c781d020a410393444ad158b36b4bb8f4eb335c08e3af43467f3","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"a2fded58763bf6b801cf92925635e1a3a8ad6d9aad92e8610ab1a1b76569aa35","perceptualHash":"0003e32326262604","technicalReview":{"width":320,"height":320,"bytes":20838,"alphaExtrema":[0,255]}},
    "alsaman": {"canonicalKey":"alsaman","canonicalNameEn":"rain tree Samanea saman","positiveDescription":"a delicate rain tree sprig with paired compound leaflets and one small curved dark seed pod","scientificName":null,"entityType":"leaf and pod","plantPart":"leaf and pod","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note rain tree Samanea saman: a delicate rain tree sprig with paired compound leaflets and one small curved dark seed pod. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-7674f423-7984-458b-a6ba-bd616fa07f09","validated":true,"status":"VALID","canonicalNameAr":"السامان","imageUrl":"assets/notes/generated/alsaman.webp","noteKey":"alsaman","noteAssetId":"origo-note-alsaman","sha256":"196d5e69e1fd4ef02281e37b564ff7bedca913b250ab30c6305699dda5112e11","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"68e9b5fc4c21f46b4ec8431ab7856da87cd1db5812fcca109702e8dc360a40c7","perceptualHash":"0305262747252e1b","technicalReview":{"width":320,"height":320,"bytes":37614,"alphaExtrema":[0,255]}},
    "alsrw-alazrq-alastraly": {"canonicalKey":"alsrw-alazrq-alastraly","canonicalNameEn":"Australian blue cypress Callitris intratropica","positiveDescription":"a blue-green Australian cypress foliage sprig with scale-like leaves and two small woody cones","scientificName":null,"entityType":"branch","plantPart":"branch","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note Australian blue cypress Callitris intratropica: a blue-green Australian cypress foliage sprig with scale-like leaves and two small woody cones. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-201720ed-b981-4e47-8995-9b9dd67746a5","validated":true,"status":"VALID","canonicalNameAr":"السرو الأزرق الأسترالي","imageUrl":"assets/notes/generated/alsrw-alazrq-alastraly.webp","noteKey":"alsrw-alazrq-alastraly","noteAssetId":"origo-note-alsrw-alazrq-alastraly","sha256":"18384c9e006f03c5522fc67310ec47a1e98cf2c615e3c653e1ee73ea1fb9370c","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"93b64b4659fd8a41d76295c3697291a312bdd84ec8c0af146230b66d1c320249","perceptualHash":"0606472523170309","technicalReview":{"width":320,"height":320,"bytes":39778,"alphaExtrema":[0,255]}},
    "alsrw-alkadhb": {"canonicalKey":"alsrw-alkadhb","canonicalNameEn":"false cypress Chamaecyparis","positiveDescription":"a fan-shaped false cypress spray with flattened scale foliage and several tiny spherical cones","scientificName":null,"entityType":"branch","plantPart":"branch","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note false cypress Chamaecyparis: a fan-shaped false cypress spray with flattened scale foliage and several tiny spherical cones. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-320b5f66-a7cd-47d4-893e-2426e08a68ce","validated":true,"status":"VALID","canonicalNameAr":"السرو الكاذب","imageUrl":"assets/notes/generated/alsrw-alkadhb.webp","noteKey":"alsrw-alkadhb","noteAssetId":"origo-note-alsrw-alkadhb","sha256":"482616f84e7a097cc293e48867eaabaebc77ce13620f3c72f57354da5cb400b5","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"c77c9c82910cb4f8a033e9bc3624d7a44c0fcda938aa158843314c77c2b6766e","perceptualHash":"06170b2f030f2b0b","technicalReview":{"width":320,"height":320,"bytes":50352,"alphaExtrema":[0,255]}},
    "alskwyh-ashjar": {"canonicalKey":"alskwyh-ashjar","canonicalNameEn":"giant sequoia Sequoiadendron giganteum","positiveDescription":"a distinctive sequoia twig with short awl-like green leaves and one compact woody egg-shaped cone","scientificName":null,"entityType":"branch","plantPart":"branch","generationPrompt":"Create a single high-end photorealistic botanical product cutout representing the fragrance note giant sequoia Sequoiadendron giganteum: a distinctive sequoia twig with short awl-like green leaves and one compact woody egg-shaped cone. Isolated centered object, accurate natural morphology and color, crisp fine detail, soft realistic self-shadow only on the object, generous empty margin. TRUE transparent alpha background with every corner fully transparent. No backdrop, no floor, no scenery, no frame, no text, no labels, no logo, no people, no hands, no perfume bottle, no container, no multiple unrelated ingredients. Square composition.","sourceImageId":"exec-a447341c-993a-4d42-a346-769e0c96655f","validated":true,"status":"VALID","canonicalNameAr":"السكويه اشجار","imageUrl":"assets/notes/generated/alskwyh-ashjar.webp","noteKey":"alskwyh-ashjar","noteAssetId":"origo-note-alskwyh-ashjar","sha256":"053cb8f93e0cff9ce41dd223a6e01d1c78def6564568030e1d4d909901181c2d","visualReview":"Reviewed reports/batch51-review.jpg against the locked prompt: exact botanical, wood or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"2c8a8e7c4a1d539785b5f29c87b781aa5e0e16d7a52facdc878a030309e0e8cd","perceptualHash":"060e0d273f7f4f4c","technicalReview":{"width":320,"height":320,"bytes":34874,"alphaExtrema":[0,255]}},
    "ashjar-alkhwkh": {"canonicalKey":"ashjar-alkhwkh","canonicalNameEn":"Peach tree","positiveDescription":"A botanical peach-tree twig with narrow serrated green leaves, delicate pink blossoms and one small fuzzy peach fruit attached.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Peach tree. Subject: A botanical peach-tree twig with narrow serrated green leaves, delicate pink blossoms and one small fuzzy peach fruit attached. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-370c41be-4edb-423c-9c4b-4f6b3a56ea58","validated":true,"status":"VALID","canonicalNameAr":"أشجار الخوخ","imageUrl":"assets/notes/generated/ashjar-alkhwkh.webp","noteKey":"ashjar-alkhwkh","noteAssetId":"origo-note-ashjar-alkhwkh","sha256":"a78b91cd6f040e266bf6b7da333ad35769161ef47762a297e4feccc79b68aa8f","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"996fd99222a792fc59999014cf529e43434352541f66d781aa4ef6f19080d359","perceptualHash":"10121b1313131b39","technicalReview":{"width":320,"height":320,"bytes":34138,"alphaExtrema":[0,255]}},
    "ashjar-alzytwn": {"canonicalKey":"ashjar-alzytwn","canonicalNameEn":"Olive tree","positiveDescription":"A botanical olive-tree branch with narrow silvery-green leaves and a few ripe purple-black olives attached.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Olive tree. Subject: A botanical olive-tree branch with narrow silvery-green leaves and a few ripe purple-black olives attached. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-8e4194bd-49ad-4cd6-8a87-4f30b5367f3e","validated":true,"status":"VALID","canonicalNameAr":"أشجار الزيتون","imageUrl":"assets/notes/generated/ashjar-alzytwn.webp","noteKey":"ashjar-alzytwn","noteAssetId":"origo-note-ashjar-alzytwn","sha256":"3ddfed31030aa9b9e733154c9dc4bf235a4cf44fcb2d67b9fa6f646fd05c5ab6","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"56cb7535c4f9fcf11871c4e2b0e6b5476b5c7988940549a8fa113fc7646c8362","perceptualHash":"060113134bcd0311","technicalReview":{"width":320,"height":320,"bytes":29794,"alphaExtrema":[0,255]}},
    "ashjar-alsrw": {"canonicalKey":"ashjar-alsrw","canonicalNameEn":"Cypress trees","positiveDescription":"A fresh Mediterranean cypress branch with dense dark-green scale foliage and two small round woody cones.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Cypress trees. Subject: A fresh Mediterranean cypress branch with dense dark-green scale foliage and two small round woody cones. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-56feeaab-1743-46f9-9cca-b72b2bd1fe65","validated":true,"status":"VALID","canonicalNameAr":"أشجار السرو","imageUrl":"assets/notes/generated/ashjar-alsrw.webp","noteKey":"ashjar-alsrw","noteAssetId":"origo-note-ashjar-alsrw","sha256":"ac0a3f3208172f5806f607146b8183bde910639394fc569a6d20342ad02f2296","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"099e4966436c0528a9727844867813e08cb5459c0c9d0b80992d09638f1a8565","perceptualHash":"03071f27470d0c18","technicalReview":{"width":320,"height":320,"bytes":39060,"alphaExtrema":[0,255]}},
    "ashjar-alsnwbr": {"canonicalKey":"ashjar-alsnwbr","canonicalNameEn":"Pine trees","positiveDescription":"A fresh pine branch with long green needles in bundles and one small brown pine cone.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Pine trees. Subject: A fresh pine branch with long green needles in bundles and one small brown pine cone. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-953beb65-1ace-4092-80c8-42e419693b6e","validated":true,"status":"VALID","canonicalNameAr":"أشجار الصنوبر","imageUrl":"assets/notes/generated/ashjar-alsnwbr.webp","noteKey":"ashjar-alsnwbr","noteAssetId":"origo-note-ashjar-alsnwbr","sha256":"b71c670744ee983e0f32c15d538893823d8a175021feb8e1d342e26b09719b57","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"36a1533daf431629e38f8080cbe586803fd49bdd5623ef433689afedf1d39b84","perceptualHash":"0607272317030f0c","technicalReview":{"width":320,"height":320,"bytes":52322,"alphaExtrema":[0,255]}},
    "ashjar-alqyqb": {"canonicalKey":"ashjar-alqyqb","canonicalNameEn":"Maple trees","positiveDescription":"A botanical maple-tree twig with lobed red-orange autumn leaves and a pair of winged samara seeds.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Maple trees. Subject: A botanical maple-tree twig with lobed red-orange autumn leaves and a pair of winged samara seeds. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-93cc79c7-9164-42af-b702-f08da6adee57","validated":true,"status":"VALID","canonicalNameAr":"أشجار القيقب","imageUrl":"assets/notes/generated/ashjar-alqyqb.webp","noteKey":"ashjar-alqyqb","noteAssetId":"origo-note-ashjar-alqyqb","sha256":"07ba0fc7c7a60b019f07ddfa5976ec16e18010190c77a57f3ad6d6419f674656","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"25cf7361ea7619955368871ca94457c5f63de4771fb716f061ff5330c8b62482","perceptualHash":"06472b175b332b22","technicalReview":{"width":320,"height":320,"bytes":30428,"alphaExtrema":[0,255]}},
    "ashjar-bylambra": {"canonicalKey":"ashjar-bylambra","canonicalNameEn":"Bellambra tree","positiveDescription":"A botanical Phytolacca dioica branch with broad glossy oval leaves and a small cluster of dark purple berries on red stems.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Bellambra tree. Subject: A botanical Phytolacca dioica branch with broad glossy oval leaves and a small cluster of dark purple berries on red stems. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-be458294-4a18-47ae-a576-03dae3ce31a5","validated":true,"status":"VALID","canonicalNameAr":"أشجار بيلامبرا","imageUrl":"assets/notes/generated/ashjar-bylambra.webp","noteKey":"ashjar-bylambra","noteAssetId":"origo-note-ashjar-bylambra","sha256":"71fa41a7847c787bc9efa4bc21d45b783ad341c13060dd1213656c993bb34cec","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"55a34251f61db8ddd73d8510cadfb5dd739499cbc726f6060207f88895d8f78c","perceptualHash":"0949731e13391818","technicalReview":{"width":320,"height":320,"bytes":29516,"alphaExtrema":[0,255]}},
    "ashjar-jwz-alhnd": {"canonicalKey":"ashjar-jwz-alhnd","canonicalNameEn":"Coconut tree","positiveDescription":"A young coconut palm frond segment with long narrow green leaflets and one small green coconut attached at the base.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Coconut tree. Subject: A young coconut palm frond segment with long narrow green leaflets and one small green coconut attached at the base. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-edf573c9-8e7a-4f96-9bfe-0c50b25c2d1c","validated":true,"status":"VALID","canonicalNameAr":"أشجار جوز الهند","imageUrl":"assets/notes/generated/ashjar-jwz-alhnd.webp","noteKey":"ashjar-jwz-alhnd","noteAssetId":"origo-note-ashjar-jwz-alhnd","sha256":"ddb6d7863044e10f13f8d24555444727a57331e853dad7bfd5789142b78918c1","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"549f645a1c2b5bc631d3cc75051ae00ca6f9099eb7f4cb1018147274fcde99d5","perceptualHash":"0007634f07270303","technicalReview":{"width":320,"height":320,"bytes":41614,"alphaExtrema":[0,255]}},
    "akyghalawwd": {"canonicalKey":"akyghalawwd","canonicalNameEn":"Akigalawood accord","positiveDescription":"Several dark warm-brown aromatic wood chips with peppery fractured surfaces and subtle patchouli-like fibrous grain, representing the Akigalawood perfumery accord.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Akigalawood accord. Subject: Several dark warm-brown aromatic wood chips with peppery fractured surfaces and subtle patchouli-like fibrous grain, representing the Akigalawood perfumery accord. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-28513811-0fed-48a2-b20c-787e130dd3cf","validated":true,"status":"VALID","canonicalNameAr":"أكيغالاوود","imageUrl":"assets/notes/generated/akyghalawwd.webp","noteKey":"akyghalawwd","noteAssetId":"origo-note-akyghalawwd","sha256":"0ede006a6d94531d0fa75fc3fe83d5b7a6e386c08d00e67eb9ea798f86a5aefd","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"1bf854e85c95f8c7a4fb3f0cba7f5e1975aa13555c308809f89de29afc0af59d","perceptualHash":"03090d27130f0706","technicalReview":{"width":320,"height":320,"bytes":26712,"alphaExtrema":[0,255]}},
    "ambr-ayfr": {"canonicalKey":"ambr-ayfr","canonicalNameEn":"Amber Ever accord","positiveDescription":"Several translucent warm amber-gold resin-like facets with clean smooth surfaces, representing the modern dry amber perfumery material Amber Ever.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Amber Ever accord. Subject: Several translucent warm amber-gold resin-like facets with clean smooth surfaces, representing the modern dry amber perfumery material Amber Ever. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-eb789806-9700-4338-aa59-2b78b935efb8","validated":true,"status":"VALID","canonicalNameAr":"أمبر إيفر","imageUrl":"assets/notes/generated/ambr-ayfr.webp","noteKey":"ambr-ayfr","noteAssetId":"origo-note-ambr-ayfr","sha256":"c7ccc010d58234035ee73e11958a7ce0ec4d0993551cee674469decb9b9929db","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"68b23daf0b84372cb74bbfeff6b941dea19080f06aabf248fe76ec298ffb6794","perceptualHash":"00060313633f1714","technicalReview":{"width":320,"height":320,"bytes":20468,"alphaExtrema":[0,255]}},
    "ayshbynk-awkwtya-kwyksws": {"canonicalKey":"ayshbynk-awkwtya-kwyksws","canonicalNameEn":"Ishpingo Ocotea quixos","positiveDescription":"A botanical Ocotea quixos branch with glossy lance-shaped green leaves and several small brown cup-shaped aromatic flower calyces.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Ishpingo Ocotea quixos. Subject: A botanical Ocotea quixos branch with glossy lance-shaped green leaves and several small brown cup-shaped aromatic flower calyces. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-dcf1e721-0828-4575-9e45-f1560d3621d2","validated":true,"status":"VALID","canonicalNameAr":"إيشبينك، أوكوتيا كويكسوس","imageUrl":"assets/notes/generated/ayshbynk-awkwtya-kwyksws.webp","noteKey":"ayshbynk-awkwtya-kwyksws","noteAssetId":"origo-note-ayshbynk-awkwtya-kwyksws","sha256":"1b12668175922e00de3f84aa9566eba74522b3960b502663cff5e9f5228c5670","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"da6df0fecdc15fef6464c17d211f55d7bbe872ba7a77c0d653e2a0524fdce2e3","perceptualHash":"13132d2b13130f1a","technicalReview":{"width":320,"height":320,"bytes":32676,"alphaExtrema":[0,255]}},
    "ashjar-albslm-alkndyh": {"canonicalKey":"ashjar-albslm-alkndyh","canonicalNameEn":"Canadian balsam fir","positiveDescription":"A fresh Abies balsamea branch with flat dark-green needles and one upright purple-brown young cone.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Canadian balsam fir. Subject: A fresh Abies balsamea branch with flat dark-green needles and one upright purple-brown young cone. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-32c7aebc-678e-4698-b0a9-6db50aac95a9","validated":true,"status":"VALID","canonicalNameAr":"اشجار البسلم الكنديه","imageUrl":"assets/notes/generated/ashjar-albslm-alkndyh.webp","noteKey":"ashjar-albslm-alkndyh","noteAssetId":"origo-note-ashjar-albslm-alkndyh","sha256":"86cbd9bfd8ff7aeebceb29100312333bc586e36616226e333252fdf00cbf5b20","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"fba1449bd028008d9c3fdd5b022da93c8b24d6627a442a543cf4fb8e018d47f9","perceptualHash":"06060f2f4d971612","technicalReview":{"width":320,"height":320,"bytes":34472,"alphaExtrema":[0,255]}},
    "alakhshab-aljafh": {"canonicalKey":"alakhshab-aljafh","canonicalNameEn":"Dry woods","positiveDescription":"Several dry pale weathered wood splinters with rough fibrous grain and cracked matte surfaces.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Dry woods. Subject: Several dry pale weathered wood splinters with rough fibrous grain and cracked matte surfaces. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-12753c29-76b5-4645-9f4b-79f7b178d8e4","validated":true,"status":"VALID","canonicalNameAr":"الأخشاب الجافة","imageUrl":"assets/notes/generated/alakhshab-aljafh.webp","noteKey":"alakhshab-aljafh","noteAssetId":"origo-note-alakhshab-aljafh","sha256":"b15c1f12706b244a7f79c839aec5508b984589bf344ccf4b7dbc498757a11722","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"59bc617140e941866802d63258a1a30ebd6f8a7aed98efcfd452b6381386d3be","perceptualHash":"00211f4b331b091c","technicalReview":{"width":320,"height":320,"bytes":25328,"alphaExtrema":[0,255]}},
    "alakhshab-alshfafh": {"canonicalKey":"alakhshab-alshfafh","canonicalNameEn":"Transparent woods accord","positiveDescription":"Several elegant translucent pale honey-colored wood-like slivers with visible fine grain, an abstract transparent woods perfumery accord.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Transparent woods accord. Subject: Several elegant translucent pale honey-colored wood-like slivers with visible fine grain, an abstract transparent woods perfumery accord. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-9fb8f4b6-01c3-4b06-85fd-bfc2af684406","validated":true,"status":"VALID","canonicalNameAr":"الأخشاب الشفافة","imageUrl":"assets/notes/generated/alakhshab-alshfafh.webp","noteKey":"alakhshab-alshfafh","noteAssetId":"origo-note-alakhshab-alshfafh","sha256":"3ca21d223569fdda02b2774eee0aa1ac98aceb406d15bb10a4af31262627bde3","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"ba05a5869068f8f8e216b993a46225850353fd63650b39cd9acbe9a437370d00","perceptualHash":"06062c4f0f3d1310","technicalReview":{"width":320,"height":320,"bytes":22694,"alphaExtrema":[0,255]}},
    "alakhshab-altafyh": {"canonicalKey":"alakhshab-altafyh","canonicalNameEn":"Driftwood","positiveDescription":"Several sun-bleached silvery-grey driftwood pieces with smooth wave-worn curves and natural cracks, fully dry.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Driftwood. Subject: Several sun-bleached silvery-grey driftwood pieces with smooth wave-worn curves and natural cracks, fully dry. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-80a9401a-ac3a-4717-aa96-31f9c795a58f","validated":true,"status":"VALID","canonicalNameAr":"الأخشاب الطافية","imageUrl":"assets/notes/generated/alakhshab-altafyh.webp","noteKey":"alakhshab-altafyh","noteAssetId":"origo-note-alakhshab-altafyh","sha256":"f32008979ff7e02f6ac11019f7510a4e2d245c774c241f902f17972136bcadc9","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"1708ba9b855475cdd672ac6895b090816bc9e8a2fa1b10776750ec84e1278583","perceptualHash":"014113030d4d0103","technicalReview":{"width":320,"height":320,"bytes":20142,"alphaExtrema":[0,255]}},
    "alakhshab-almtfhmh": {"canonicalKey":"alakhshab-almtfhmh","canonicalNameEn":"Charred wood","positiveDescription":"Two blackened charred wood pieces with cracked charcoal surfaces and a small exposed warm-brown wood edge, no flame or smoke.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Charred wood. Subject: Two blackened charred wood pieces with cracked charcoal surfaces and a small exposed warm-brown wood edge, no flame or smoke. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-a7a029a0-c45f-4bf2-9771-41cad50d394c","validated":true,"status":"VALID","canonicalNameAr":"الأخشاب المتفحمة","imageUrl":"assets/notes/generated/alakhshab-almtfhmh.webp","noteKey":"alakhshab-almtfhmh","noteAssetId":"origo-note-alakhshab-almtfhmh","sha256":"50d5d13ecfa2b1c34ce9574cdd979763500434b824c180a3668bbb57d6ab9ba4","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"2049038bbb63a4eb3a3c2e41eb28931f0a37b4042c9d7a81848d11a6757b6404","perceptualHash":"0101030373656101","technicalReview":{"width":320,"height":320,"bytes":20864,"alphaExtrema":[0,255]}},
    "alakhshab-alhndyh": {"canonicalKey":"alakhshab-alhndyh","canonicalNameEn":"Indian woods","positiveDescription":"A small assortment of warm brown Indian aromatic woods: smooth sandalwood slivers and one dark agarwood chip, no incense smoke.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Indian woods. Subject: A small assortment of warm brown Indian aromatic woods: smooth sandalwood slivers and one dark agarwood chip, no incense smoke. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-dccd704b-cd99-4dbd-b7a6-8644ea081bdb","validated":true,"status":"VALID","canonicalNameAr":"الأخشاب الهندية","imageUrl":"assets/notes/generated/alakhshab-alhndyh.webp","noteKey":"alakhshab-alhndyh","noteAssetId":"origo-note-alakhshab-alhndyh","sha256":"860a34f2fe52bd56f828d9fa85e03569db10dc4bab6b54e688f21a2eb095c3cb","visualReview":"Reviewed reports/batch50-review.jpg against the locked prompt: exact tree, wood state or perfumery material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"954abcc4f15d6135aedeac39e6bc682c02b75b765e41fcb2a990f5e9cef18e10","perceptualHash":"0005050105210714","technicalReview":{"width":320,"height":320,"bytes":22208,"alphaExtrema":[0,255]}},
    "akhshab-almahwjny": {"canonicalKey":"akhshab-almahwjny","canonicalNameEn":"Mahogany wood","positiveDescription":"Two clean mahogany wood blocks with rich reddish-brown color, straight interlocked grain and one polished cut face.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Mahogany wood. Subject: Two clean mahogany wood blocks with rich reddish-brown color, straight interlocked grain and one polished cut face. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-9db2eda1-b530-4997-a293-0851e9c859be","validated":true,"status":"VALID","canonicalNameAr":"أخشاب الماهوجني","imageUrl":"assets/notes/generated/akhshab-almahwjny.webp","noteKey":"akhshab-almahwjny","noteAssetId":"origo-note-akhshab-almahwjny","sha256":"7b8f41aa3a129ccbaa5d9af78203bd212b00151f107adaa730db97704f01d810","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"f081937d178f348aa11ab05d4abc31db322158ca7d073e9ec0cb97ea638e8a38","perceptualHash":"0301011b3b1b060e","technicalReview":{"width":320,"height":320,"bytes":22284,"alphaExtrema":[0,255]}},
    "akhshab-alhnwky": {"canonicalKey":"akhshab-alhnwky","canonicalNameEn":"Hinoki wood","positiveDescription":"Several pale creamy Japanese hinoki cypress wood slivers with very fine straight grain and fresh clean cut surfaces.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Hinoki wood. Subject: Several pale creamy Japanese hinoki cypress wood slivers with very fine straight grain and fresh clean cut surfaces. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-df82ef80-95e1-4ca8-a208-e2cf8cb71fe7","validated":true,"status":"VALID","canonicalNameAr":"أخشاب الهنوكي","imageUrl":"assets/notes/generated/akhshab-alhnwky.webp","noteKey":"akhshab-alhnwky","noteAssetId":"origo-note-akhshab-alhnwky","sha256":"14fd50f9a1df8189419e762e2a91f52bc2df987a62b866dd1333b3de0310b8e0","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"6bff1acf6ddfef9d1889c4d0766f9ee837c44c3d9586dbc9160a513aa07cfb68","perceptualHash":"0723030335073b19","technicalReview":{"width":320,"height":320,"bytes":17652,"alphaExtrema":[0,255]}},
    "akhshab-shqra": {"canonicalKey":"akhshab-shqra","canonicalNameEn":"Blond woods","positiveDescription":"A small arrangement of pale blond timber pieces in honey-beige tones with subtle straight grain and smooth fresh cuts.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Blond woods. Subject: A small arrangement of pale blond timber pieces in honey-beige tones with subtle straight grain and smooth fresh cuts. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-4da551fa-ddd9-4659-bc63-47cdab69011d","validated":true,"status":"VALID","canonicalNameAr":"أخشاب شقراء","imageUrl":"assets/notes/generated/akhshab-shqra.webp","noteKey":"akhshab-shqra","noteAssetId":"origo-note-akhshab-shqra","sha256":"27e6a3010e74027e37860b9478fd8f3a0dd4024829c608a0a9c262bc00b6966c","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"8ebef014118abfcc0f514134ab2a9effcbc070f4f71e40ea73fd1d733204586b","perceptualHash":"0303132326190908","technicalReview":{"width":320,"height":320,"bytes":18406,"alphaExtrema":[0,255]}},
    "akhshab-kwkwbwlw": {"canonicalKey":"akhshab-kwkwbwlw","canonicalNameEn":"Cocobolo wood","positiveDescription":"Two dense cocobolo wood pieces showing dramatic orange-red, dark brown and black striped grain on polished cut faces.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Cocobolo wood. Subject: Two dense cocobolo wood pieces showing dramatic orange-red, dark brown and black striped grain on polished cut faces. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-cf54818f-b98a-49a7-85c1-be1608e9192c","validated":true,"status":"VALID","canonicalNameAr":"أخشاب كوكوبولو","imageUrl":"assets/notes/generated/akhshab-kwkwbwlw.webp","noteKey":"akhshab-kwkwbwlw","noteAssetId":"origo-note-akhshab-kwkwbwlw","sha256":"6ee2539873bb37835457c14fe374fee35beb97944d8a41b05be4919ecb3fef94","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"d60a485e6703964275cebdbb06521ab4d4ee8d4bb10c98eb69c1a2f4866f6433","perceptualHash":"061e0f1f35290307","technicalReview":{"width":320,"height":320,"bytes":27766,"alphaExtrema":[0,255]}},
    "akhshab-mkhmlyh": {"canonicalKey":"akhshab-mkhmlyh","canonicalNameEn":"Velvet woods accord","positiveDescription":"Several warm brown wood slivers with exceptionally soft velvety matte fibers and rounded smooth surfaces, an abstract perfumery wood accord.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Velvet woods accord. Subject: Several warm brown wood slivers with exceptionally soft velvety matte fibers and rounded smooth surfaces, an abstract perfumery wood accord. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-393daa59-3a70-48b0-9af3-c82c58b82f60","validated":true,"status":"VALID","canonicalNameAr":"أخشاب مخملية","imageUrl":"assets/notes/generated/akhshab-mkhmlyh.webp","noteKey":"akhshab-mkhmlyh","noteAssetId":"origo-note-akhshab-mkhmlyh","sha256":"253431a5b682feaba28c2b4f9ddd5da2acab592bb578f9669d64c832584c9144","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"360f94960026873967a4caf8d5058693d187bfb6f663af767b3f07e4e20253ed","perceptualHash":"0019db2913031d2d","technicalReview":{"width":320,"height":320,"bytes":21002,"alphaExtrema":[0,255]}},
    "akhshab-hww": {"canonicalKey":"akhshab-hww","canonicalNameEn":"Ho wood","positiveDescription":"Two pale tan cut pieces of Cinnamomum camphora var. linaloolifera wood with fine close grain and thin grey-brown bark.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Ho wood. Subject: Two pale tan cut pieces of Cinnamomum camphora var. linaloolifera wood with fine close grain and thin grey-brown bark. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-37c8c1bd-60e8-407a-ad87-23069144da0a","validated":true,"status":"VALID","canonicalNameAr":"أخشاب هوو","imageUrl":"assets/notes/generated/akhshab-hww.webp","noteKey":"akhshab-hww","noteAssetId":"origo-note-akhshab-hww","sha256":"cce17164b0675d144cf6de8f2cfb71bac849273902def38195c4075d9b0522af","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"cbd35e1fc6540fb09f220b0d042e442beb77c80394b6c70e06acbadba2364ca7","perceptualHash":"0303116d35130b03","technicalReview":{"width":320,"height":320,"bytes":19592,"alphaExtrema":[0,255]}},
    "arbwtws-shjrh-alqtlb": {"canonicalKey":"arbwtws-shjrh-alqtlb","canonicalNameEn":"Arbutus tree","positiveDescription":"A botanical strawberry-tree branch with glossy serrated evergreen leaves, small white urn-shaped flowers and one red textured fruit.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Arbutus tree. Subject: A botanical strawberry-tree branch with glossy serrated evergreen leaves, small white urn-shaped flowers and one red textured fruit. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-7644738a-a061-4ab2-b676-49c90332604f","validated":true,"status":"VALID","canonicalNameAr":"أربوتوس - شجرة القطلب","imageUrl":"assets/notes/generated/arbwtws-shjrh-alqtlb.webp","noteKey":"arbwtws-shjrh-alqtlb","noteAssetId":"origo-note-arbwtws-shjrh-alqtlb","sha256":"cac4638efacb2e803140948addd9a41cc2fffb3b580451404681cf6269fc7769","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"1128a6fbf92ae4f6858308acebdb38b9a0ff1380e4a91dc59ce65f5bf6257968","perceptualHash":"010b033713692e6e","technicalReview":{"width":320,"height":320,"bytes":30278,"alphaExtrema":[0,255]}},
    "arz-ahmr-ghrby": {"canonicalKey":"arz-ahmr-ghrby","canonicalNameEn":"Western red cedar","positiveDescription":"Two Western red cedar wood pieces with reddish cinnamon-brown straight grain and a short spray of flat scale-like green foliage.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Western red cedar. Subject: Two Western red cedar wood pieces with reddish cinnamon-brown straight grain and a short spray of flat scale-like green foliage. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-b2f03731-07e7-496e-8173-5fe2cb21efe9","validated":true,"status":"VALID","canonicalNameAr":"أرز أحمر غربي","imageUrl":"assets/notes/generated/arz-ahmr-ghrby.webp","noteKey":"arz-ahmr-ghrby","noteAssetId":"origo-note-arz-ahmr-ghrby","sha256":"55db3aa1bfae6cbf084b7fcf77f9f6a4dc7d6c3f8607c8a87780c4604f393274","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"8a439242b31e22fa42bb24a8ea7cb059292422fac5c4adbf78af4d9161def055","perceptualHash":"0101010313030111","technicalReview":{"width":320,"height":320,"bytes":30300,"alphaExtrema":[0,255]}},
    "arwkarya": {"canonicalKey":"arwkarya","canonicalNameEn":"Araucaria tree","positiveDescription":"A botanical Araucaria branch with dense overlapping triangular dark-green leaves and one small woody spherical cone.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Araucaria tree. Subject: A botanical Araucaria branch with dense overlapping triangular dark-green leaves and one small woody spherical cone. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-0253ed45-1bfa-4592-946b-f41fb92418ae","validated":true,"status":"VALID","canonicalNameAr":"أروكاريا","imageUrl":"assets/notes/generated/arwkarya.webp","noteKey":"arwkarya","noteAssetId":"origo-note-arwkarya","sha256":"01db71b04a311666ce94c4026a0815b648618d8997d1d36dd11f49079d2336eb","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"f6283f05ceda81da5441a35d57e5dadf74968c485e3bb24c68bc36fd0a9ac0e1","perceptualHash":"03131b4b3b03050c","technicalReview":{"width":320,"height":320,"bytes":31624,"alphaExtrema":[0,255]}},
    "ashjar-alabnws": {"canonicalKey":"ashjar-alabnws","canonicalNameEn":"Ebony tree","positiveDescription":"A clean ebony tree branch segment with nearly black heartwood cut face, pale sapwood rim, dark bark and a few glossy oval leaves.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Ebony tree. Subject: A clean ebony tree branch segment with nearly black heartwood cut face, pale sapwood rim, dark bark and a few glossy oval leaves. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-757c0b18-028d-4816-a999-975291716600","validated":true,"status":"VALID","canonicalNameAr":"أشجار الأبنوس","imageUrl":"assets/notes/generated/ashjar-alabnws.webp","noteKey":"ashjar-alabnws","noteAssetId":"origo-note-ashjar-alabnws","sha256":"7bcc107aab8174b63678b9b6496ad6d306511028e98dfcbb481c0aa7cb854fff","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"68abd33a7319bba21c3a3854431ebf6eb67fc4676c2b52f229abd0c815b354da","perceptualHash":"030f4f6e79671603","technicalReview":{"width":320,"height":320,"bytes":27584,"alphaExtrema":[0,255]}},
    "ashjar-albrqwq": {"canonicalKey":"ashjar-albrqwq","canonicalNameEn":"Plum tree","positiveDescription":"A botanical plum-tree twig with white five-petal blossoms, serrated green leaves and one small purple plum fruit.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Plum tree. Subject: A botanical plum-tree twig with white five-petal blossoms, serrated green leaves and one small purple plum fruit. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-81c7a600-00f5-4bd9-a5c5-db057b6af5a4","validated":true,"status":"VALID","canonicalNameAr":"أشجار البرقوق","imageUrl":"assets/notes/generated/ashjar-albrqwq.webp","noteKey":"ashjar-albrqwq","noteAssetId":"origo-note-ashjar-albrqwq","sha256":"4b30946a607df5a46308512a0c6061cf23aa245f8cfcbf631c79eeb4b2357245","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"e461f76ba6da762bdb7d79bd23e8eb321a5b6ecb0385604e40f86612cf2e23c5","perceptualHash":"0112170f8b632726","technicalReview":{"width":320,"height":320,"bytes":30842,"alphaExtrema":[0,255]}},
    "ashjar-albn": {"canonicalKey":"ashjar-albn","canonicalNameEn":"Coffee tree","positiveDescription":"A botanical coffee-tree branch with glossy opposite dark-green leaves, clusters of small white starry flowers and a few red coffee cherries.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Coffee tree. Subject: A botanical coffee-tree branch with glossy opposite dark-green leaves, clusters of small white starry flowers and a few red coffee cherries. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-8990d59b-4fe5-4b2e-99e2-10da62956bfd","validated":true,"status":"VALID","canonicalNameAr":"أشجار البن","imageUrl":"assets/notes/generated/ashjar-albn.webp","noteKey":"ashjar-albn","noteAssetId":"origo-note-ashjar-albn","sha256":"351fccbf936bc6f5b6f7e8254106d0694993e5f3ba02f77abd12b225a72f3bdb","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"a0cb1063386ec1e421d8f0d055ce561a2382d1b4de74ddb1f7c042a524038c9b","perceptualHash":"0cad1737336926a6","technicalReview":{"width":320,"height":320,"bytes":31298,"alphaExtrema":[0,255]}},
    "ashjar-altfah": {"canonicalKey":"ashjar-altfah","canonicalNameEn":"Apple tree","positiveDescription":"A botanical apple-tree twig with pale pink-white blossoms, serrated green leaves and one small red-green apple.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Apple tree. Subject: A botanical apple-tree twig with pale pink-white blossoms, serrated green leaves and one small red-green apple. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-61e7d73c-6fb0-4bc8-ac74-2928ab4cbeca","validated":true,"status":"VALID","canonicalNameAr":"أشجار التفاح","imageUrl":"assets/notes/generated/ashjar-altfah.webp","noteKey":"ashjar-altfah","noteAssetId":"origo-note-ashjar-altfah","sha256":"c3bc299aea52803d83d7cc260966b77f85a4bb27dc8ef5b64d959988c0bb5622","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"972edd9ad899d335ab427f56f2526985f92cbd00a21ae21700ca141d666af5eb","perceptualHash":"01033b4f8d336f66","technicalReview":{"width":320,"height":320,"bytes":31196,"alphaExtrema":[0,255]}},
    "ashjar-altnwb-alaswd": {"canonicalKey":"ashjar-altnwb-alaswd","canonicalNameEn":"Black spruce","positiveDescription":"A botanical black spruce twig with short blue-green needles and one small dark brown tapered cone.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Black spruce. Subject: A botanical black spruce twig with short blue-green needles and one small dark brown tapered cone. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-7d63ea70-ccbe-4515-b58b-5a286fccffc3","validated":true,"status":"VALID","canonicalNameAr":"أشجار التنوب الأسود","imageUrl":"assets/notes/generated/ashjar-altnwb-alaswd.webp","noteKey":"ashjar-altnwb-alaswd","noteAssetId":"origo-note-ashjar-altnwb-alaswd","sha256":"9626eb03dbe0cdf35689448bd1c03cdd3835937e17e6f4e4a95c55bda2c867a4","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"6a5ffb0bb3a3c4ad1f041dd85b7c97719c50c40cb5f317cd881b9e76ebc0bcd5","perceptualHash":"06060565370b0d0c","technicalReview":{"width":320,"height":320,"bytes":33772,"alphaExtrema":[0,255]}},
    "ashjar-altyn": {"canonicalKey":"ashjar-altyn","canonicalNameEn":"Fig tree","positiveDescription":"A botanical fig-tree branch with large deeply lobed green leaves and one small ripe purple-green fig attached.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Fig tree. Subject: A botanical fig-tree branch with large deeply lobed green leaves and one small ripe purple-green fig attached. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-75c2d988-9b9d-4906-90c5-75a14f0ef173","validated":true,"status":"VALID","canonicalNameAr":"أشجار التين","imageUrl":"assets/notes/generated/ashjar-altyn.webp","noteKey":"ashjar-altyn","noteAssetId":"origo-note-ashjar-altyn","sha256":"0017bd561e45436e5c4916c4893d2be58e5373b988fa2b09aee37a87ad005fd6","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"40311f5fde66b750bac0fac9ed8916ac631d5691c4a8dbab75522d69ac55d7a3","perceptualHash":"060e2939332b59d9","technicalReview":{"width":320,"height":320,"bytes":33610,"alphaExtrema":[0,255]}},
    "ashjar-alkhrwb": {"canonicalKey":"ashjar-alkhrwb","canonicalNameEn":"Carob tree","positiveDescription":"A botanical carob-tree branch with glossy paired oval leaflets and two long dark brown leathery carob pods.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Carob tree. Subject: A botanical carob-tree branch with glossy paired oval leaflets and two long dark brown leathery carob pods. Style: photorealistic botanical or material catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-e45f0b05-ddf3-4711-b0e1-d8959aa46dd5","validated":true,"status":"VALID","canonicalNameAr":"أشجار الخروب","imageUrl":"assets/notes/generated/ashjar-alkhrwb.webp","noteKey":"ashjar-alkhrwb","noteAssetId":"origo-note-ashjar-alkhrwb","sha256":"d913926225ea48cea5cba428f73a0084156dc977726f8d2c7e27788c441a73d1","visualReview":"Reviewed reports/batch49-review.jpg against the locked prompt: exact wood, species and botanical identity are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"58924b44849311bd79648d99a7a961e81a6c32a058f44348540dfcc5d3a47f39","perceptualHash":"06074b4d0d4e0d0b","technicalReview":{"width":320,"height":320,"bytes":34920,"alphaExtrema":[0,255]}},
    "msash-mthljh": {"canonicalKey":"msash-mthljh","canonicalNameEn":"Ice pop","positiveDescription":"One simple translucent fruit ice pop in red-orange color on a plain wooden stick, frosty surface, no wrapper.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Ice pop. Subject: One simple translucent fruit ice pop in red-orange color on a plain wooden stick, frosty surface, no wrapper. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-93904cf2-976d-4e15-a8b1-8cbc47a2c5d0","validated":true,"status":"VALID","canonicalNameAr":"مصاصة مثلجة","imageUrl":"assets/notes/generated/msash-mthljh.webp","noteKey":"msash-mthljh","noteAssetId":"origo-note-msash-mthljh","sha256":"f373e82ac5e109dec918dcfb93db2b2c84e4be52ca3b89aae16c6ba317434aa9","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"932423b65699d493c199cd470f61586cd1d63c650c776dec50a426ce9acd6ee8","perceptualHash":"0000060f67260000","technicalReview":{"width":320,"height":320,"bytes":10992,"alphaExtrema":[0,255]}},
    "mlbs": {"canonicalKey":"mlbs","canonicalNameEn":"Sugar dragées","positiveDescription":"A small cluster of smooth oval sugar-coated dragée candies in white and pale pastel colors, one cut showing a firm candy center.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Sugar dragées. Subject: A small cluster of smooth oval sugar-coated dragée candies in white and pale pastel colors, one cut showing a firm candy center. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-8f053daf-24ba-41e5-8c1b-ecc654e7af29","validated":true,"status":"VALID","canonicalNameAr":"ملبس","imageUrl":"assets/notes/generated/mlbs.webp","noteKey":"mlbs","noteAssetId":"origo-note-mlbs","sha256":"deffaefe25e72951ee14f0139b582aa17be30db9196d48f900e79efa39c134fc","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"1b7b4cba061cad07230c94b588a1f28975070011ec97b1bc8da96183bd45cff9","perceptualHash":"000013270d352700","technicalReview":{"width":320,"height":320,"bytes":9802,"alphaExtrema":[0,255]}},
    "mylk-shyk": {"canonicalKey":"mylk-shyk","canonicalNameEn":"Vanilla milkshake","positiveDescription":"A compact clear glass filled with thick pale vanilla milkshake with a softly swirled creamy top, no straw or garnish.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Vanilla milkshake. Subject: A compact clear glass filled with thick pale vanilla milkshake with a softly swirled creamy top, no straw or garnish. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-1196540d-d5e4-4d53-8879-6c9e147a8aac","validated":true,"status":"VALID","canonicalNameAr":"ميلك شيك","imageUrl":"assets/notes/generated/mylk-shyk.webp","noteKey":"mylk-shyk","noteAssetId":"origo-note-mylk-shyk","sha256":"bc94669c135b66c837805e86a872b1b6603470c79c0aea01a63ccf93ddbbd440","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"67365fb6576d5921b4b16c185054dd274927a5afb0a9c67a0132fa1c0a069569","perceptualHash":"03474f5fddcf7b03","technicalReview":{"width":320,"height":320,"bytes":11184,"alphaExtrema":[0,255]}},
    "nwtyla": {"canonicalKey":"nwtyla","canonicalNameEn":"Hazelnut cocoa spread","positiveDescription":"A glossy chocolate-hazelnut spread dollop with smooth ribbon folds, no jar, label, bread, nuts or chocolate pieces.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Hazelnut cocoa spread. Subject: A glossy chocolate-hazelnut spread dollop with smooth ribbon folds, no jar, label, bread, nuts or chocolate pieces. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-3d95d31f-78d1-4ed2-b4f9-10f2780ef8c3","validated":true,"status":"VALID","canonicalNameAr":"نوتيلا","imageUrl":"assets/notes/generated/nwtyla.webp","noteKey":"nwtyla","noteAssetId":"origo-note-nwtyla","sha256":"9ebc164cb0bf8052732d12f3e78e12fb1c661b7d9d8f3cb03ed8adbf71ef1230","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"87ce0d61f1c8f0fd3eefcf66230ff48ddd94bce3d804b144bc9f23e9789a0081","perceptualHash":"0407130519430b07","technicalReview":{"width":320,"height":320,"bytes":20146,"alphaExtrema":[0,255]}},
    "hwrtshata": {"canonicalKey":"hwrtshata","canonicalNameEn":"Horchata","positiveDescription":"A compact clear glass of creamy ivory rice horchata with a light cinnamon dusting on the surface, no straw or garnish.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Horchata. Subject: A compact clear glass of creamy ivory rice horchata with a light cinnamon dusting on the surface, no straw or garnish. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-13afa7b3-ad7c-429b-bd15-e646cc5aeb9e","validated":true,"status":"VALID","canonicalNameAr":"هورتشاتا","imageUrl":"assets/notes/generated/hwrtshata.webp","noteKey":"hwrtshata","noteAssetId":"origo-note-hwrtshata","sha256":"31401d882b1d8a931b1c735a8d896d67825e36583fd253c423d9d2ab11a55e5d","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"5449a6048fee104edd4a3be437cc825e6958023e628ba937b9d715318f53983a","perceptualHash":"055d793979796921","technicalReview":{"width":320,"height":320,"bytes":15730,"alphaExtrema":[0,255]}},
    "thwja-shjrh-alhyah": {"canonicalKey":"thwja-shjrh-alhyah","canonicalNameEn":"Thuja tree of life","positiveDescription":"A fresh botanical sprig of Thuja occidentalis with flattened scale-like evergreen foliage and two small oval cones.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Thuja tree of life. Subject: A fresh botanical sprig of Thuja occidentalis with flattened scale-like evergreen foliage and two small oval cones. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-4fb57f66-93f1-44ae-98a4-27331028453c","validated":true,"status":"VALID","canonicalNameAr":"ثوجا - شجرة الحياة","imageUrl":"assets/notes/generated/thwja-shjrh-alhyah.webp","noteKey":"thwja-shjrh-alhyah","noteAssetId":"origo-note-thwja-shjrh-alhyah","sha256":"d856580304de8894ee46b4b73de3cc7be27c9d003173e83cd557d40e35d53c2b","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"a6a35bc749221a69ddd9a35f5903dda2ccffede26c05804022fa77f0301797e6","perceptualHash":"0607032b2f061717","technicalReview":{"width":320,"height":320,"bytes":42512,"alphaExtrema":[0,255]}},
    "apricot-wood": {"canonicalKey":"apricot-wood","canonicalNameEn":"Apricot wood","positiveDescription":"A clean cut section of pale warm apricot-tree wood showing fine close grain and a thin reddish-brown bark edge, no fruit.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Apricot wood. Subject: A clean cut section of pale warm apricot-tree wood showing fine close grain and a thin reddish-brown bark edge, no fruit. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-6dad7030-1987-4e43-bd39-12ecfb6a1a75","validated":true,"status":"VALID","canonicalNameAr":"خشب المشمش","imageUrl":"assets/notes/generated/apricot-wood.webp","noteKey":"apricot-wood","noteAssetId":"origo-note-apricot-wood","sha256":"34621324da69793ba22dcd6032624a2147d7109ef48724f26ba7ef08ea7477d2","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"307cbdfc08919b1386e622ca09953b201f575ecb8652e59de1059b23214fc01e","perceptualHash":"0633198d4c46130b","technicalReview":{"width":320,"height":320,"bytes":23480,"alphaExtrema":[0,255]}},
    "ghaf-tree": {"canonicalKey":"ghaf-tree","canonicalNameEn":"Ghaf tree","positiveDescription":"A young Prosopis cineraria desert tree branch with fine bipinnate green leaves and a few slender pale pods, botanically accurate.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Ghaf tree. Subject: A young Prosopis cineraria desert tree branch with fine bipinnate green leaves and a few slender pale pods, botanically accurate. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-b6c9ae5f-0c0c-4b13-8bfb-2173d0ba3c1a","validated":true,"status":"VALID","canonicalNameAr":"شجرة الغاف","imageUrl":"assets/notes/generated/ghaf-tree.webp","noteKey":"ghaf-tree","noteAssetId":"origo-note-ghaf-tree","sha256":"c57a0e715686d0cfbd13ba3936a6224403604169f98b2da2d3b1e851e766cd99","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"12f9c167238a18a2a1efa7aad747a03130653e9076d2267bf5f0566c173b6d93","perceptualHash":"050723354e692522","technicalReview":{"width":320,"height":320,"bytes":45566,"alphaExtrema":[0,255]}},
    "incienso": {"canonicalKey":"incienso","canonicalNameEn":"Incense resin","positiveDescription":"Several irregular translucent golden-brown frankincense resin tears with natural matte crystalline surfaces, no smoke or burner.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Incense resin. Subject: Several irregular translucent golden-brown frankincense resin tears with natural matte crystalline surfaces, no smoke or burner. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-d178f1d3-333c-416d-9301-e6d6ac3bb8b1","validated":true,"status":"VALID","canonicalNameAr":"بخور","imageUrl":"assets/notes/generated/incienso.webp","noteKey":"incienso","noteAssetId":"origo-note-incienso","sha256":"9dd9930d33c952d81b3304a2987a522d4903020312df8803e5f99cd26a3dbc87","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"1027fab1bb3b68d579d78614529978f607e6289b705b11b987146c0dd0121a63","perceptualHash":"03031717090b0b0e","technicalReview":{"width":320,"height":320,"bytes":22244,"alphaExtrema":[0,255]}},
    "kowhai": {"canonicalKey":"kowhai","canonicalNameEn":"Kōwhai flower","positiveDescription":"A botanical spray of New Zealand kōwhai with hanging golden-yellow tubular pea flowers and small pinnate green leaves.","scientificName":null,"entityType":"plant","plantPart":"flower","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Kōwhai flower. Subject: A botanical spray of New Zealand kōwhai with hanging golden-yellow tubular pea flowers and small pinnate green leaves. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-deed6a2b-6732-4d55-a659-8d36f9eb9aa2","validated":true,"status":"VALID","canonicalNameAr":"كوهـاي","imageUrl":"assets/notes/generated/kowhai.webp","noteKey":"kowhai","noteAssetId":"origo-note-kowhai","sha256":"fe27fa29e06b3ac922827428729d75d3da3c5b96996e9a71311405bbf25ac7b8","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"034258f10e3a5c5b8d354b6169e5fe5160affbc0ab830410803d9cd5d5429b02","perceptualHash":"07171323272b63e6","technicalReview":{"width":320,"height":320,"bytes":37174,"alphaExtrema":[0,255]}},
    "taiwan-incense-cedar": {"canonicalKey":"taiwan-incense-cedar","canonicalNameEn":"Taiwan incense cedar","positiveDescription":"A botanical sprig of Calocedrus formosana with flattened glossy dark-green scale foliage and one small woody cone.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Taiwan incense cedar. Subject: A botanical sprig of Calocedrus formosana with flattened glossy dark-green scale foliage and one small woody cone. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-0f16d4d5-9175-4c51-a164-8d82fd43294d","validated":true,"status":"VALID","canonicalNameAr":"أرز البخور التايواني","imageUrl":"assets/notes/generated/taiwan-incense-cedar.webp","noteKey":"taiwan-incense-cedar","noteAssetId":"origo-note-taiwan-incense-cedar","sha256":"27b8a91277c14ce53252ba9ae6082ce095990858a2b000436f7505578b3cfb75","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"cb352163a43769264e7c3a1ffcc370929ff731e044db814cd4435b173ffeb45c","perceptualHash":"07071d37270d0f0c","technicalReview":{"width":320,"height":320,"bytes":36856,"alphaExtrema":[0,255]}},
    "z11tm": {"canonicalKey":"z11tm","canonicalNameEn":"Z11 woody aroma material","positiveDescription":"Several clean translucent amber-beige synthetic aroma resin crystals representing the woody amber molecule Z11, laboratory material without equipment.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Z11 woody aroma material. Subject: Several clean translucent amber-beige synthetic aroma resin crystals representing the woody amber molecule Z11, laboratory material without equipment. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-55d778f7-b200-4edb-bd27-307d0b6e6206","validated":true,"status":"VALID","canonicalNameAr":"زي 11","imageUrl":"assets/notes/generated/z11tm.webp","noteKey":"z11tm","noteAssetId":"origo-note-z11tm","sha256":"8db4eeeff23b58eea5bf3e49e549f19ac5c26748792d35f1494bd5b0130513ab","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"dc7e23b0e0c98d35408414d813c2cfb89f8b78274c69b938e6811abdcfada980","perceptualHash":"0606072f1b170f06","technicalReview":{"width":320,"height":320,"bytes":23538,"alphaExtrema":[0,255]}},
    "akhshab-albtwla": {"canonicalKey":"akhshab-albtwla","canonicalNameEn":"Birch wood","positiveDescription":"Two clean pieces of pale birch wood with fine grain and distinctive white papery bark with dark horizontal markings.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Birch wood. Subject: Two clean pieces of pale birch wood with fine grain and distinctive white papery bark with dark horizontal markings. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-b6325b79-3e21-41df-bfec-c1f3bb37b54d","validated":true,"status":"VALID","canonicalNameAr":"أخشاب البتولا","imageUrl":"assets/notes/generated/akhshab-albtwla.webp","noteKey":"akhshab-albtwla","noteAssetId":"origo-note-akhshab-albtwla","sha256":"1286b52df52dffdf8a628837a100e4f9c6d35e94b2d51e4a3e2e26e4b2db7631","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"c5bd8ce56aff141d42face9e19295171f60bb6685280b72d03617dc73760779f","perceptualHash":"030311231b0d3333","technicalReview":{"width":320,"height":320,"bytes":22792,"alphaExtrema":[0,255]}},
    "akhshab-alghayak": {"canonicalKey":"akhshab-alghayak","canonicalNameEn":"Guaiac wood","positiveDescription":"Two dense dark olive-brown guaiac wood chips with close interlocked grain and one fresh cut face.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Guaiac wood. Subject: Two dense dark olive-brown guaiac wood chips with close interlocked grain and one fresh cut face. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-1a147728-557c-4e41-8422-7144e5b59a47","validated":true,"status":"VALID","canonicalNameAr":"أخشاب الغاياك","imageUrl":"assets/notes/generated/akhshab-alghayak.webp","noteKey":"akhshab-alghayak","noteAssetId":"origo-note-akhshab-alghayak","sha256":"360abd2da886164461a8b768be9dfdfde722be30cb2ac9649a9d384b6fa3c7c6","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"c881339b7dd619a03fd543c613d6b365e4f92ff9c54f0d2a7b1ceff263d14eac","perceptualHash":"02030b170f2d6743","technicalReview":{"width":320,"height":320,"bytes":23674,"alphaExtrema":[0,255]}},
    "akhshab-alflfl": {"canonicalKey":"akhshab-alflfl","canonicalNameEn":"Pepperwood","positiveDescription":"A small cut branch of pepperwood showing warm tan wood grain, dark bark and a few glossy lance-shaped green leaves.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Pepperwood. Subject: A small cut branch of pepperwood showing warm tan wood grain, dark bark and a few glossy lance-shaped green leaves. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-548afb58-1f43-47dd-b29e-0759c7c192db","validated":true,"status":"VALID","canonicalNameAr":"أخشاب الفلفل","imageUrl":"assets/notes/generated/akhshab-alflfl.webp","noteKey":"akhshab-alflfl","noteAssetId":"origo-note-akhshab-alflfl","sha256":"35fde8c50ac4a97088ba2fb0f19849697b16c656f9a34d5c76fb1cec1977bd06","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"609e4a8a4a6b62a66b0c369c3932e9eee7021850d3360db2e6d9e2a55c28dd89","perceptualHash":"02060c19374c2c24","technicalReview":{"width":320,"height":320,"bytes":21064,"alphaExtrema":[0,255]}},
    "akhshab-alkshmyr": {"canonicalKey":"akhshab-alkshmyr","canonicalNameEn":"Cashmere wood accord","positiveDescription":"Several elegant pale beige and warm taupe abstract wood slivers with velvety matte fibrous surfaces representing cashmere wood perfume material.","scientificName":null,"entityType":"plant","plantPart":"wood","generationPrompt":"Use case: product-mockup. Asset type: ORIGO fragrance-note cutout. Primary request: exact subject Cashmere wood accord. Subject: Several elegant pale beige and warm taupe abstract wood slivers with velvety matte fibrous surfaces representing cashmere wood perfume material. Style: photorealistic catalog specimen. Composition: centered square with ample transparent margin. Constraints: genuine transparent alpha; only the named note; no text, watermark, people, perfume bottles, branded packaging, scenery, background or unrelated objects.","sourceImageId":"exec-a24c2310-5407-44e5-aa25-d4d6e6839fec","validated":true,"status":"VALID","canonicalNameAr":"أخشاب الكشمير","imageUrl":"assets/notes/generated/akhshab-alkshmyr.webp","noteKey":"akhshab-alkshmyr","noteAssetId":"origo-note-akhshab-alkshmyr","sha256":"6d18c010c1d246b539b18769e4ed342d967994174998849b3dead38eb0515490","visualReview":"Reviewed reports/batch48-review.jpg against the locked prompt: exact named subject, species or material is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated objects.","contentHash":"c135886a6dc27802b3e5594650f8e513139fc7b748430f821c52ccd5ba8284e7","perceptualHash":"01331b0923061331","technicalReview":{"width":320,"height":320,"bytes":23144,"alphaExtrema":[0,255]}},
    "ftyrh": {"canonicalKey":"ftyrh","canonicalNameEn":"Sweet pie","positiveDescription":"One classic small round sweet pie with golden lattice pastry crust and a simple amber fruit filling visible through the lattice.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note ftyrh. Exact subject: Sweet pie. One classic small round sweet pie with golden lattice pastry crust and a simple amber fruit filling visible through the lattice. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-ae617415-1a75-49c6-bb21-fd488b9b6672","validated":true,"status":"VALID","canonicalNameAr":"فطيرة","imageUrl":"assets/notes/generated/ftyrh.webp","noteKey":"ftyrh","noteAssetId":"origo-note-ftyrh","sha256":"fd0758ec8fb93617622b2cd476deb15f6682d8babcd4c0d040ac327047f4c0cb","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"a2f1b0791dc175ced885f3715d461c91e761c7206cb068707947f1db6fcb1455","perceptualHash":"000e131b371b270e","technicalReview":{"width":320,"height":320,"bytes":23374,"alphaExtrema":[0,255]}},
    "ftyrh-allymwn": {"canonicalKey":"ftyrh-allymwn","canonicalNameEn":"Lemon pie","positiveDescription":"One slice of lemon pie with crisp golden crust and smooth bright yellow lemon curd filling, no meringue.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note ftyrh-allymwn. Exact subject: Lemon pie. One slice of lemon pie with crisp golden crust and smooth bright yellow lemon curd filling, no meringue. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-368d643f-4cd3-4527-b3be-1ebe73b3632d","validated":true,"status":"VALID","canonicalNameAr":"فطيرة الليمون","imageUrl":"assets/notes/generated/ftyrh-allymwn.webp","noteKey":"ftyrh-allymwn","noteAssetId":"origo-note-ftyrh-allymwn","sha256":"a44d4449f4884482393afc5b76e05c746bd6092fa1fc69fa3f5cf2695498b92f","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"cec852b96361c63b12b5e2d6ca3bf76f44e59a52a19fbe25445663f7f557b672","perceptualHash":"0001077f5ffe1e0c","technicalReview":{"width":320,"height":320,"bytes":18736,"alphaExtrema":[0,255]}},
    "ftyrh-jwzalhnd": {"canonicalKey":"ftyrh-jwzalhnd","canonicalNameEn":"Coconut pie","positiveDescription":"One slice of coconut cream pie with golden crust, thick white coconut filling and toasted coconut flakes integral on top.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note ftyrh-jwzalhnd. Exact subject: Coconut pie. One slice of coconut cream pie with golden crust, thick white coconut filling and toasted coconut flakes integral on top. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-71f29b59-786a-4585-ab80-607a6088a1ca","validated":true,"status":"VALID","canonicalNameAr":"فطيرة جوزالهند","imageUrl":"assets/notes/generated/ftyrh-jwzalhnd.webp","noteKey":"ftyrh-jwzalhnd","noteAssetId":"origo-note-ftyrh-jwzalhnd","sha256":"6cfd356ea26acadd2d90e1f59f65bdd18d009388c7c8c163ffd1e1fd1782e148","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"a7091d0f832133a0434f4bec2c270dba9ce24704a0b88879dc84b8c7ab21ef53","perceptualHash":"01177151d34f1e0c","technicalReview":{"width":320,"height":320,"bytes":23502,"alphaExtrema":[0,255]}},
    "ftyrh-hlwh": {"canonicalKey":"ftyrh-hlwh","canonicalNameEn":"Sweet tart","positiveDescription":"One small golden pastry tart filled with glossy vanilla custard and a lightly browned surface, no fruit garnish.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note ftyrh-hlwh. Exact subject: Sweet tart. One small golden pastry tart filled with glossy vanilla custard and a lightly browned surface, no fruit garnish. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-c7845f1c-600e-42cb-bbe9-9e7629531d51","validated":true,"status":"VALID","canonicalNameAr":"فطيرة حلوة","imageUrl":"assets/notes/generated/ftyrh-hlwh.webp","noteKey":"ftyrh-hlwh","noteAssetId":"origo-note-ftyrh-hlwh","sha256":"94d7e10aa092eabda972b657ebc47a83554ee47bd92f11ff95a1ec3e7eb00028","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"6b67139bbd487077d176584f10be4eebde06b614ee5bcfd17c163e98c80f3c84","perceptualHash":"000e1f6bc6130f00","technicalReview":{"width":320,"height":320,"bytes":19426,"alphaExtrema":[0,255]}},
    "krymh-hamdh": {"canonicalKey":"krymh-hamdh","canonicalNameEn":"Sour cream","positiveDescription":"A compact dollop of thick glossy white sour cream with soft rounded folds, no container or garnish.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krymh-hamdh. Exact subject: Sour cream. A compact dollop of thick glossy white sour cream with soft rounded folds, no container or garnish. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-7d68c66e-79cd-4df3-abe0-6d0e26440935","validated":true,"status":"VALID","canonicalNameAr":"كريمة حامضة","imageUrl":"assets/notes/generated/krymh-hamdh.webp","noteKey":"krymh-hamdh","noteAssetId":"origo-note-krymh-hamdh","sha256":"2b66f5c7ff410c80890e256cd15e53412e60ff16ab98a0e9de519c8a6c55a5a5","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"4a249bc29f073cc85265c3532de0b4ffb54e3a46a09bc7f64ae125923fd40779","perceptualHash":"030905134b290b07","technicalReview":{"width":320,"height":320,"bytes":7042,"alphaExtrema":[0,255]}},
    "kak-alarz": {"canonicalKey":"kak-alarz","canonicalNameEn":"Rice cakes","positiveDescription":"Three round puffed rice cakes with visibly compressed white rice grains and lightly toasted edges.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note kak-alarz. Exact subject: Rice cakes. Three round puffed rice cakes with visibly compressed white rice grains and lightly toasted edges. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-67bb08d5-390e-400b-b79d-389aa8210717","validated":true,"status":"VALID","canonicalNameAr":"كعك الأرز","imageUrl":"assets/notes/generated/kak-alarz.webp","noteKey":"kak-alarz","noteAssetId":"origo-note-kak-alarz","sha256":"f11318f1f5c0ab59fd896dc9e882df4ee6c7ab86a4aa222841100e81f72e03c9","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"dcf02183f153d08878298392f9a8d8ec954278c4b8899f93767c0143e5f49510","perceptualHash":"003315873129170e","technicalReview":{"width":320,"height":320,"bytes":20594,"alphaExtrema":[0,255]}},
    "kakh": {"canonicalKey":"kakh","canonicalNameEn":"Layer cake","positiveDescription":"One simple slice of vanilla layer cake with golden sponge and smooth ivory buttercream between layers, no decorations.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note kakh. Exact subject: Layer cake. One simple slice of vanilla layer cake with golden sponge and smooth ivory buttercream between layers, no decorations. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-c59a7cc6-97a0-4d74-9a72-3a372087ff21","validated":true,"status":"VALID","canonicalNameAr":"كعكة","imageUrl":"assets/notes/generated/kakh.webp","noteKey":"kakh","noteAssetId":"origo-note-kakh","sha256":"6111a54c1a31fc123f37ff76ac2f140d4886d2f3241daba3314ca84032b4860e","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"c0046b6e5f5be96c3b0beeaf3e82e3b6b01c5fc3b5071287dc3c9ce73aca2931","perceptualHash":"0175017101170303","technicalReview":{"width":320,"height":320,"bytes":18176,"alphaExtrema":[0,255]}},
    "kwzmwfrwt": {"canonicalKey":"kwzmwfrwt","canonicalNameEn":"Cosmofruit confection","positiveDescription":"One futuristic iridescent fruit confection shaped like a smooth translucent sphere with a colorful cosmic gradient and subtle fruit-gel texture.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note kwzmwfrwt. Exact subject: Cosmofruit confection. One futuristic iridescent fruit confection shaped like a smooth translucent sphere with a colorful cosmic gradient and subtle fruit-gel texture. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-ccefff2a-75d7-4dcf-bf0a-712bb818ca4d","validated":true,"status":"VALID","canonicalNameAr":"كوزموفروت","imageUrl":"assets/notes/generated/kwzmwfrwt.webp","noteKey":"kwzmwfrwt","noteAssetId":"origo-note-kwzmwfrwt","sha256":"94d2ee05482280165b5825fa53051f34931a366c1e8c16854a698888abd70878","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"66d3e5db4fe03f0f48accf2976d20860a06afad1b0919bf1fe33f5b5b2bd5884","perceptualHash":"000e0747430f0f1e","technicalReview":{"width":320,"height":320,"bytes":21320,"alphaExtrema":[0,255]}},
    "kwkw-bals": {"canonicalKey":"kwkw-bals","canonicalNameEn":"Coco Balls","positiveDescription":"Five round coconut confection balls coated densely in fine white coconut flakes, one cut showing soft coconut center.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note kwkw-bals. Exact subject: Coco Balls. Five round coconut confection balls coated densely in fine white coconut flakes, one cut showing soft coconut center. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-9aa2e188-164a-4fd9-8324-2fbc80bd4a9f","validated":true,"status":"VALID","canonicalNameAr":"كوكو بالس","imageUrl":"assets/notes/generated/kwkw-bals.webp","noteKey":"kwkw-bals","noteAssetId":"origo-note-kwkw-bals","sha256":"2f47748a785592f32ef580cd0a499af9bdc709c457b538721b1b524c33059519","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"912423c30b58ce994648c428124cc049bdb772f3f18bc8ec1634236b39d17c7c","perceptualHash":"06030f0b1d27030e","technicalReview":{"width":320,"height":320,"bytes":17802,"alphaExtrema":[0,255]}},
    "lhm-alkhnzyr": {"canonicalKey":"lhm-alkhnzyr","canonicalNameEn":"Cooked pork","positiveDescription":"Several plain slices of roasted pork loin with pale pink-beige meat and a thin browned outer edge, no plate, herbs or sauce.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note lhm-alkhnzyr. Exact subject: Cooked pork. Several plain slices of roasted pork loin with pale pink-beige meat and a thin browned outer edge, no plate, herbs or sauce. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-983bc6a0-496f-439e-9d0b-545e903ba1b6","validated":true,"status":"VALID","canonicalNameAr":"لحم الخنزير","imageUrl":"assets/notes/generated/lhm-alkhnzyr.webp","noteKey":"lhm-alkhnzyr","noteAssetId":"origo-note-lhm-alkhnzyr","sha256":"4d8a37addf83a569b997e7a9403b30fc04b687ffd01783cc6806f07085a2af75","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"77ddfd33c4356c20c8b917c9fafb8f8586ba82adcc1b7b4b6b005865e62f555e","perceptualHash":"040673d3451d0f0e","technicalReview":{"width":320,"height":320,"bytes":20698,"alphaExtrema":[0,255]}},
    "lykwr-alshwkwlath-aldaknh": {"canonicalKey":"lykwr-alshwkwlath-aldaknh","canonicalNameEn":"Dark chocolate liqueur","positiveDescription":"A small clear stemmed cordial glass filled with opaque deep brown dark-chocolate liqueur, no bottle or garnish.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note lykwr-alshwkwlath-aldaknh. Exact subject: Dark chocolate liqueur. A small clear stemmed cordial glass filled with opaque deep brown dark-chocolate liqueur, no bottle or garnish. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-682ee915-e08c-4bee-8922-d5a091e539f9","validated":true,"status":"VALID","canonicalNameAr":"ليكور الشوكولاتة الداكنة","imageUrl":"assets/notes/generated/lykwr-alshwkwlath-aldaknh.webp","noteKey":"lykwr-alshwkwlath-aldaknh","noteAssetId":"origo-note-lykwr-alshwkwlath-aldaknh","sha256":"b0baf3063152b4880cfc84e88ab1857df4c2267271c02e035b1bf9cb48d213ee","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"8a14be08bfd6c0d84d673dba76d0df2c8f4483a2f51180e9fc1217e679ccff61","perceptualHash":"0707030f0e0c0f0f","technicalReview":{"width":320,"height":320,"bytes":8684,"alphaExtrema":[0,255]}},
    "lykywr-altfah": {"canonicalKey":"lykywr-altfah","canonicalNameEn":"Apple liqueur","positiveDescription":"A small clear stemmed cordial glass filled with translucent pale green-gold apple liqueur, no bottle or fruit garnish.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note lykywr-altfah. Exact subject: Apple liqueur. A small clear stemmed cordial glass filled with translucent pale green-gold apple liqueur, no bottle or fruit garnish. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-34b62f9e-bba5-41dc-8768-464845c44f7a","validated":true,"status":"VALID","canonicalNameAr":"ليكيور التفاح","imageUrl":"assets/notes/generated/lykywr-altfah.webp","noteKey":"lykywr-altfah","noteAssetId":"origo-note-lykywr-altfah","sha256":"f89c2014ac0a788a73504cfdb658632b4287bc9af6b187575f293a5b97f44da7","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"058d7b154f82ee2d1a21060490a47d05e4ff2514ad0f55e1178494e693634f5c","perceptualHash":"0f0f0c0e1372554d","technicalReview":{"width":320,"height":320,"bytes":8402,"alphaExtrema":[0,255]}},
    "makrwn": {"canonicalKey":"makrwn","canonicalNameEn":"French macaron","positiveDescription":"Three classic French macarons in soft pastel colors with smooth domed shells, ruffled feet and thin cream fillings.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note makrwn. Exact subject: French macaron. Three classic French macarons in soft pastel colors with smooth domed shells, ruffled feet and thin cream fillings. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-7015fd5d-523f-4d2b-aede-3a2820a0316d","validated":true,"status":"VALID","canonicalNameAr":"ماكرون","imageUrl":"assets/notes/generated/makrwn.webp","noteKey":"makrwn","noteAssetId":"origo-note-makrwn","sha256":"326d268267789c9d8cdbe27df9c50eabb08b2dee802d8c6f2a938821534622bb","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"209651f563cac55e220f23d17185677645acfa1171624eee5970845c94f10967","perceptualHash":"070303870f1b0b07","technicalReview":{"width":320,"height":320,"bytes":16850,"alphaExtrema":[0,255]}},
    "makrwn-altwt": {"canonicalKey":"makrwn-altwt","canonicalNameEn":"Berry macarons","positiveDescription":"Three raspberry-red French macarons with smooth domed shells, ruffled feet and dark berry cream filling.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note makrwn-altwt. Exact subject: Berry macarons. Three raspberry-red French macarons with smooth domed shells, ruffled feet and dark berry cream filling. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-7ca18875-4397-482e-96ba-cc8d66e6f4ab","validated":true,"status":"VALID","canonicalNameAr":"ماكرون التوت","imageUrl":"assets/notes/generated/makrwn-altwt.webp","noteKey":"makrwn-altwt","noteAssetId":"origo-note-makrwn-altwt","sha256":"39dd7877bea672fd48a355126942b871c5546318248170358b93292d8beaa6b3","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"eb0b788732688b3afbc92e781a4bc57ae7432972c0d569aa9c52fcd90ec8fdf4","perceptualHash":"0303232b13316103","technicalReview":{"width":320,"height":320,"bytes":21830,"alphaExtrema":[0,255]}},
    "mrby-albrtqal": {"canonicalKey":"mrby-albrtqal","canonicalNameEn":"Orange marmalade","positiveDescription":"A glossy amber-orange marmalade dollop with fine translucent citrus peel shreds, no jar, toast or fruit.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note mrby-albrtqal. Exact subject: Orange marmalade. A glossy amber-orange marmalade dollop with fine translucent citrus peel shreds, no jar, toast or fruit. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-b1e34933-a052-4bc9-8d69-c73b031c4b45","validated":true,"status":"VALID","canonicalNameAr":"مربى البرتقال","imageUrl":"assets/notes/generated/mrby-albrtqal.webp","noteKey":"mrby-albrtqal","noteAssetId":"origo-note-mrby-albrtqal","sha256":"0c1e9d174b1c2ac75490792b30bd29419b7525585e1a6eca330bd29d1f5495e0","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"63d67725729261c915f0e2702fc860269c9f702ffbbb1cb425b1174fc3ca12f8","perceptualHash":"000c1f130f170707","technicalReview":{"width":320,"height":320,"bytes":21700,"alphaExtrema":[0,255]}},
    "msash-albrtqal-balkrymh": {"canonicalKey":"msash-albrtqal-balkrymh","canonicalNameEn":"Orange cream lollipop","positiveDescription":"One round orange-and-ivory swirled cream lollipop on a plain white stick, glossy hard candy, no wrapper.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note msash-albrtqal-balkrymh. Exact subject: Orange cream lollipop. One round orange-and-ivory swirled cream lollipop on a plain white stick, glossy hard candy, no wrapper. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-2e6a6d51-21a5-46fb-aceb-cfe058618d92","validated":true,"status":"VALID","canonicalNameAr":"مصاصة البرتقال بالكريمة","imageUrl":"assets/notes/generated/msash-albrtqal-balkrymh.webp","noteKey":"msash-albrtqal-balkrymh","noteAssetId":"origo-note-msash-albrtqal-balkrymh","sha256":"54b15cec4cbc37b1d0abc93db820de8572760a158072769c80fb3abf16a7b428","visualReview":"Reviewed reports/batch47-review.jpg against the locked prompt: exact named subject and preparation are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"2d26f9a357b41db7228845d34191e356bafc78c947ce120eff8f2dc727dc0577","perceptualHash":"0000030703030703","technicalReview":{"width":320,"height":320,"bytes":9878,"alphaExtrema":[0,255]}},
    "zfyr": {"canonicalKey":"zfyr","canonicalNameEn":"Zephyr marshmallow confection","positiveDescription":"Several airy pastel zephyr confections, Eastern European apple-fruit marshmallow rosettes with matte soft texture.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note zfyr. Exact subject: Zephyr marshmallow confection. Several airy pastel zephyr confections, Eastern European apple-fruit marshmallow rosettes with matte soft texture. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-eb371c2f-f160-45ba-80d5-a1b2ce922895","validated":true,"status":"VALID","canonicalNameAr":"زفير","imageUrl":"assets/notes/generated/zfyr.webp","noteKey":"zfyr","noteAssetId":"origo-note-zfyr","sha256":"40d5dee1ccb6642f0a7ad33c75f21948560821148fe964ba4fea80271cf2c8c8","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"f0be97c554fee19d8c6fba2719a4e6f6e941986b5b2294c23aeb9ecd7bd8ab21","perceptualHash":"0c0f030f2405071b","technicalReview":{"width":320,"height":320,"bytes":15828,"alphaExtrema":[0,255]}},
    "zhwr-mskrh": {"canonicalKey":"zhwr-mskrh","canonicalNameEn":"Candied flowers","positiveDescription":"A small cluster of edible violet and rose petals crystallized with fine sparkling sugar.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note zhwr-mskrh. Exact subject: Candied flowers. A small cluster of edible violet and rose petals crystallized with fine sparkling sugar. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-1fa51614-540f-49e7-b198-f3b154e6bc37","validated":true,"status":"VALID","canonicalNameAr":"زهور مسكرة","imageUrl":"assets/notes/generated/zhwr-mskrh.webp","noteKey":"zhwr-mskrh","noteAssetId":"origo-note-zhwr-mskrh","sha256":"8e39be7ab48ee6fa1f6803b1dc356b3a61d68d5af814f034e7ef7e31b2562b2d","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"ebc7b9ac3fa9d710915ec9c10a108cf9b775fdcef79f5176e9dafc5586811ac4","perceptualHash":"000307371723070e","technicalReview":{"width":320,"height":320,"bytes":22446,"alphaExtrema":[0,255]}},
    "skr-alnkhyl": {"canonicalKey":"skr-alnkhyl","canonicalNameEn":"Palm sugar","positiveDescription":"Two rustic golden-brown palm sugar cakes with one broken edge showing dense crystalline texture.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note skr-alnkhyl. Exact subject: Palm sugar. Two rustic golden-brown palm sugar cakes with one broken edge showing dense crystalline texture. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-ea0e62d7-c8af-4b0a-aff7-7af6dfcbfe12","validated":true,"status":"VALID","canonicalNameAr":"سكر النخيل","imageUrl":"assets/notes/generated/skr-alnkhyl.webp","noteKey":"skr-alnkhyl","noteAssetId":"origo-note-skr-alnkhyl","sha256":"110a776e97edbeb1b032be5de50f5a81616a6eaa914a184e1d623a1ca0b2f069","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"cd88e93735d503b7b107ee9d095433d195c39e531a5a2fea6476792b02eb0b63","perceptualHash":"00012431370e1c00","technicalReview":{"width":320,"height":320,"bytes":23064,"alphaExtrema":[0,255]}},
    "skr-mhrwq": {"canonicalKey":"skr-mhrwq","canonicalNameEn":"Burnt sugar","positiveDescription":"A small amber-blackened caramelized sugar shard with glossy bubbled surface and dark toasted edges.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note skr-mhrwq. Exact subject: Burnt sugar. A small amber-blackened caramelized sugar shard with glossy bubbled surface and dark toasted edges. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-20e7d342-6742-4987-823b-4bdbae2f979b","validated":true,"status":"VALID","canonicalNameAr":"سكر محروق","imageUrl":"assets/notes/generated/skr-mhrwq.webp","noteKey":"skr-mhrwq","noteAssetId":"origo-note-skr-mhrwq","sha256":"42ce7b47ebb542639f9eabea50c7e4d800183bf5ae020d0bf2fba9dbb09d9a5d","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"0c876632b5b259d5d8b34d198b2bef99da46da50803fefc73f5e9df6a861136c","perceptualHash":"04060703010b0306","technicalReview":{"width":320,"height":320,"bytes":24116,"alphaExtrema":[0,255]}},
    "swrbyh": {"canonicalKey":"swrbyh","canonicalNameEn":"Fruit sorbet","positiveDescription":"One rounded scoop of bright citrus fruit sorbet with fine icy texture, no cone or bowl.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note swrbyh. Exact subject: Fruit sorbet. One rounded scoop of bright citrus fruit sorbet with fine icy texture, no cone or bowl. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-d2d957a1-61fd-4f6f-99cd-79474d66a339","validated":true,"status":"VALID","canonicalNameAr":"سوربيه","imageUrl":"assets/notes/generated/swrbyh.webp","noteKey":"swrbyh","noteAssetId":"origo-note-swrbyh","sha256":"661b8919de00c67b13fd86bd56129a4fc64a74cbaaabd4fe00967988e2853c78","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"a57c4f07b8975ff1a2733f9b3da8df393b2bd0c1f656a1d303695a40f6892771","perceptualHash":"060703030101030e","technicalReview":{"width":320,"height":320,"bytes":20530,"alphaExtrema":[0,255]}},
    "swrbyh-alfwakh-alhmra": {"canonicalKey":"swrbyh-alfwakh-alhmra","canonicalNameEn":"Red berry sorbet","positiveDescription":"One deep ruby scoop of red berry sorbet with visible raspberry and strawberry flecks, no fruit garnish.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note swrbyh-alfwakh-alhmra. Exact subject: Red berry sorbet. One deep ruby scoop of red berry sorbet with visible raspberry and strawberry flecks, no fruit garnish. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-e26019e3-31b5-4c61-b0e0-0aa922f6978a","validated":true,"status":"VALID","canonicalNameAr":"سوربيه الفواكه الحمراء","imageUrl":"assets/notes/generated/swrbyh-alfwakh-alhmra.webp","noteKey":"swrbyh-alfwakh-alhmra","noteAssetId":"origo-note-swrbyh-alfwakh-alhmra","sha256":"a40ef586567099fe2026e6d2034cb2df89a8c2b66ee5007e8b19d61a1ebdc11d","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"3b2bfed05c410bba36eb2e518850d75aabce21f5945414503c9a4c874c922df2","perceptualHash":"04073b3d372f1707","technicalReview":{"width":320,"height":320,"bytes":24716,"alphaExtrema":[0,255]}},
    "swrbyh-qws-qzh": {"canonicalKey":"swrbyh-qws-qzh","canonicalNameEn":"Rainbow sorbet","positiveDescription":"One rounded scoop with distinct curved bands of pink, orange, yellow, green and blue fruit sorbet.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note swrbyh-qws-qzh. Exact subject: Rainbow sorbet. One rounded scoop with distinct curved bands of pink, orange, yellow, green and blue fruit sorbet. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-4afca9cc-36d6-4544-8032-474e70fa6fa5","validated":true,"status":"VALID","canonicalNameAr":"سوربيه قوس قزح","imageUrl":"assets/notes/generated/swrbyh-qws-qzh.webp","noteKey":"swrbyh-qws-qzh","noteAssetId":"origo-note-swrbyh-qws-qzh","sha256":"bfd8069a447dfcbf2c981273635295b8f1a423fa7866e00568cd6cb91cba209e","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"306859e01ba0e59d3d86fe02ad873df79cb1844e266bb1518fa60c2c7bce3218","perceptualHash":"04276161614b2306","technicalReview":{"width":320,"height":320,"bytes":22752,"alphaExtrema":[0,255]}},
    "shrab-albyd": {"canonicalKey":"shrab-albyd","canonicalNameEn":"Eggnog","positiveDescription":"A compact clear tumbler filled with creamy pale ivory eggnog topped with a light nutmeg dusting, no bottle.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note shrab-albyd. Exact subject: Eggnog. A compact clear tumbler filled with creamy pale ivory eggnog topped with a light nutmeg dusting, no bottle. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-005787d4-3623-4666-b594-074259e7fc4f","validated":true,"status":"VALID","canonicalNameAr":"شراب البيض","imageUrl":"assets/notes/generated/shrab-albyd.webp","noteKey":"shrab-albyd","noteAssetId":"origo-note-shrab-albyd","sha256":"0076e9d33e07068724e0d37f3e11151c9747d8c45c8219894aa92f337dbd72a7","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"bc71f9e5b42e76ce8750c819a6caeec04a93a0b046cb0dccf2f6541bdd377f7d","perceptualHash":"0b7f3f33f3f37373","technicalReview":{"width":320,"height":320,"bytes":16680,"alphaExtrema":[0,255]}},
    "shrab-alskr": {"canonicalKey":"shrab-alskr","canonicalNameEn":"Sugar syrup","positiveDescription":"A single thick clear glossy sugar-syrup ribbon and droplet, colorless and isolated, no container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note shrab-alskr. Exact subject: Sugar syrup. A single thick clear glossy sugar-syrup ribbon and droplet, colorless and isolated, no container. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-62bf556b-9c63-487a-8d88-9840c07cc2b2","validated":true,"status":"VALID","canonicalNameAr":"شراب السكر","imageUrl":"assets/notes/generated/shrab-alskr.webp","noteKey":"shrab-alskr","noteAssetId":"origo-note-shrab-alskr","sha256":"837d655d028df14f40596e62e139dab1c80f875b5ec0bc02c8f3a2339bca282d","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"e0276d07f80894362bd35fe5361862900545d5f4efff31ec4f0e3c6a6353b1ff","perceptualHash":"030101c676544c0c","technicalReview":{"width":320,"height":320,"bytes":10538,"alphaExtrema":[0,255]}},
    "shrab-alfrawlh": {"canonicalKey":"shrab-alfrawlh","canonicalNameEn":"Strawberry syrup","positiveDescription":"A thick glossy crimson strawberry syrup swirl with tiny natural seed flecks, no fruit or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note shrab-alfrawlh. Exact subject: Strawberry syrup. A thick glossy crimson strawberry syrup swirl with tiny natural seed flecks, no fruit or container. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-d89c5007-40e7-48ef-9bc3-d419e414219e","validated":true,"status":"VALID","canonicalNameAr":"شراب الفراولة","imageUrl":"assets/notes/generated/shrab-alfrawlh.webp","noteKey":"shrab-alfrawlh","noteAssetId":"origo-note-shrab-alfrawlh","sha256":"8433d7a8c9760c53ba6bf95fed929ea0c7ca14068b3e4ecb3a9a35be7e4a6741","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"eb8fe39fb71d7dbe5bdaffeeadfda16a21557564fb95d9d592f908a94bd32a8b","perceptualHash":"03033733011f0606","technicalReview":{"width":320,"height":320,"bytes":20434,"alphaExtrema":[0,255]}},
    "shrab-alqyqb": {"canonicalKey":"shrab-alqyqb","canonicalNameEn":"Maple syrup","positiveDescription":"A thick translucent amber maple syrup ribbon ending in one droplet, no leaf, pancake or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note shrab-alqyqb. Exact subject: Maple syrup. A thick translucent amber maple syrup ribbon ending in one droplet, no leaf, pancake or container. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-2d40d577-bc8f-4561-ba34-f418f9542eeb","validated":true,"status":"VALID","canonicalNameAr":"شراب القيقب","imageUrl":"assets/notes/generated/shrab-alqyqb.webp","noteKey":"shrab-alqyqb","noteAssetId":"origo-note-shrab-alqyqb","sha256":"6e0e09be3587e6c5bff06d2d5fd4c322cffd60b0d9a35741c7952dc54bee44eb","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"c2fb98df39b0957183e21bd1bfe6f5d1e2adf3b814be9bd7c6c905134bd8d778","perceptualHash":"030303073e3e0b05","technicalReview":{"width":320,"height":320,"bytes":10028,"alphaExtrema":[0,255]}},
    "shrab-alkrz": {"canonicalKey":"shrab-alkrz","canonicalNameEn":"Cherry syrup","positiveDescription":"A thick glossy dark ruby cherry syrup swirl, translucent at thin edges, no cherries or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note shrab-alkrz. Exact subject: Cherry syrup. A thick glossy dark ruby cherry syrup swirl, translucent at thin edges, no cherries or container. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-83c5a5c1-44cf-4e54-aba2-cb031cd055d9","validated":true,"status":"VALID","canonicalNameAr":"شراب الكرز","imageUrl":"assets/notes/generated/shrab-alkrz.webp","noteKey":"shrab-alkrz","noteAssetId":"origo-note-shrab-alkrz","sha256":"556dafafcebe89ca929b7ce3143b6a724d2f7acadbb6dd316b27b8ecad16db73","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"5e1a03234eb13a088f72e51ce47b40e6c6b0ad348e2be42e5d5416cadd7b8358","perceptualHash":"03a3b1d5140d0d0d","technicalReview":{"width":320,"height":320,"bytes":20226,"alphaExtrema":[0,255]}},
    "shymalw": {"canonicalKey":"shymalw","canonicalNameEn":"Chamallow marshmallow","positiveDescription":"Several soft cylindrical French chamallow marshmallows in pale pink and white, lightly powdery and unwrapped.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note shymalw. Exact subject: Chamallow marshmallow. Several soft cylindrical French chamallow marshmallows in pale pink and white, lightly powdery and unwrapped. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-7818125b-57d4-46c5-84fb-d86c376504dd","validated":true,"status":"VALID","canonicalNameAr":"شيمالو","imageUrl":"assets/notes/generated/shymalw.webp","noteKey":"shymalw","noteAssetId":"origo-note-shymalw","sha256":"8938bd998f8c5388f35cb7693c6e19d8ab3cc752d18f93de9b0db1af39b41588","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"ff2d944d480bbca5f6cf4ff494bdb4a7a80c8bcbebabe80bea8e2f88a38b130c","perceptualHash":"00095373071f0f0e","technicalReview":{"width":320,"height":320,"bytes":13772,"alphaExtrema":[0,255]}},
    "slsh-alfanylya": {"canonicalKey":"slsh-alfanylya","canonicalNameEn":"Vanilla sauce","positiveDescription":"A smooth pale ivory vanilla sauce dollop with fine natural vanilla-bean specks, no pod or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note slsh-alfanylya. Exact subject: Vanilla sauce. A smooth pale ivory vanilla sauce dollop with fine natural vanilla-bean specks, no pod or container. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-2771ae0d-b941-4d9d-a816-18f9c2280302","validated":true,"status":"VALID","canonicalNameAr":"صلصة الفانيليا","imageUrl":"assets/notes/generated/slsh-alfanylya.webp","noteKey":"slsh-alfanylya","noteAssetId":"origo-note-slsh-alfanylya","sha256":"bbf91098b6691afaaad5c368f8fa674a5e3586d9f04357450979bc9b28eae24b","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"953bf26c01fc44c55163bc42ffae74e5d8bac895ab4231b50e90ed68ae927c1e","perceptualHash":"060b0b0b2b0b0b07","technicalReview":{"width":320,"height":320,"bytes":9308,"alphaExtrema":[0,255]}},
    "sws-alshwkwlath": {"canonicalKey":"sws-alshwkwlath","canonicalNameEn":"Chocolate sauce","positiveDescription":"A thick glossy dark chocolate sauce swirl with a fluid ribbon edge, no chocolate pieces or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note sws-alshwkwlath. Exact subject: Chocolate sauce. A thick glossy dark chocolate sauce swirl with a fluid ribbon edge, no chocolate pieces or container. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-34ce19c1-2d65-4c68-8036-defa06eca260","validated":true,"status":"VALID","canonicalNameAr":"صوص الشوكولاتة","imageUrl":"assets/notes/generated/sws-alshwkwlath.webp","noteKey":"sws-alshwkwlath","noteAssetId":"origo-note-sws-alshwkwlath","sha256":"ce29a1df29ed89f81b563b1fe9923f98388df76144c153fb8f72621778ed808a","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"3386d796b95ef821bc8906c7e49402c9c386bd6af60f7034e827a1e1dfff7128","perceptualHash":"0301094141cd0707","technicalReview":{"width":320,"height":320,"bytes":16228,"alphaExtrema":[0,255]}},
    "swflyh": {"canonicalKey":"swflyh","canonicalNameEn":"Soufflé","positiveDescription":"One small golden baked soufflé with a tall risen domed top in a plain white ramekin, no plate or utensils.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note swflyh. Exact subject: Soufflé. One small golden baked soufflé with a tall risen domed top in a plain white ramekin, no plate or utensils. Photorealistic square cutout, centered with ample transparent margin. Genuine transparent alpha background. No text, watermark, people, perfume bottles, branded packaging, plates, scenery or unrelated ingredients.","sourceImageId":"exec-401199ba-cd2a-426b-acad-f90ccb9f7794","validated":true,"status":"VALID","canonicalNameAr":"صوفليه","imageUrl":"assets/notes/generated/swflyh.webp","noteKey":"swflyh","noteAssetId":"origo-note-swflyh","sha256":"6049d32c72190ceb5f82d3b6aa83e669e8e3958c92716a02c4bda3a503ff8cf2","visualReview":"Reviewed reports/batch46-review.jpg against the locked prompt: exact named subject and state are clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredients.","contentHash":"66dbbf648e3991b4bbcdf38356b1885b52ba8c351456d82b282fca0e09b9ba62","perceptualHash":"00030301111b0901","technicalReview":{"width":320,"height":320,"bytes":14944,"alphaExtrema":[0,255]}},
    "wrd-tayfy": {"canonicalKey":"wrd-tayfy","canonicalNameEn":"Taif rose","positiveDescription":"A fresh botanical spray of authentic Taif rose (Rosa damascena trigintipetala): layered medium pink damask rose bloom with several pointed serrated green leaflets.","scientificName":null,"entityType":"plant","plantPart":"flower","generationPrompt":"ORIGO fragrance note wrd-tayfy. Exact subject: Taif rose. A fresh botanical spray of authentic Taif rose (Rosa damascena trigintipetala): layered medium pink damask rose bloom with several pointed serrated green leaflets.","sourceImageId":"exec-5c3f2a28-8b97-48da-a5cb-54d7d147758e","validated":true,"status":"VALID","canonicalNameAr":"ورد طائفي","imageUrl":"assets/notes/generated/wrd-tayfy.webp","noteKey":"wrd-tayfy","noteAssetId":"origo-note-wrd-tayfy","sha256":"65770c050cd58cceab53a3658af39c2a5d4c535d7d66c7d99de13450d5818225","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"50432a96a6276f9ae5eec88a672d028c8be058357342d1c13a7fac4c2f1d057f","perceptualHash":"032327276363070c","technicalReview":{"width":320,"height":320,"bytes":26138,"alphaExtrema":[0,255]}},
    "hlwy-hlamyh": {"canonicalKey":"hlwy-hlamyh","canonicalNameEn":"Gummy candy","positiveDescription":"A small assortment of translucent jewel-toned fruit gummy candies in simple rounded shapes, visibly gelatinous, uncoated and unwrapped.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-hlamyh. Exact subject: Gummy candy. A small assortment of translucent jewel-toned fruit gummy candies in simple rounded shapes, visibly gelatinous, uncoated and unwrapped.","sourceImageId":"exec-412fc62a-cdb4-4247-a6ef-6b3930025df0","validated":true,"status":"VALID","canonicalNameAr":"حلوى هلامية","imageUrl":"assets/notes/generated/hlwy-hlamyh.webp","noteKey":"hlwy-hlamyh","noteAssetId":"origo-note-hlwy-hlamyh","sha256":"7f9fbe9c076f5ba1321c187af0b218039ab7813ba4f044768f4d701c2b2bac0d","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"caae9c43879027bed9695422b98128fa163e571e4d0717b2079dcbfd6604295f","perceptualHash":"000d0d4f4d0d070e","technicalReview":{"width":320,"height":320,"bytes":16184,"alphaExtrema":[0,255]}},
    "hlwy-aljyly": {"canonicalKey":"hlwy-aljyly","canonicalNameEn":"Jelly candy","positiveDescription":"Three neat fruit jelly candy cubes with glossy translucent red, orange and green bodies, no sugar coating or wrappers.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-aljyly. Exact subject: Jelly candy. Three neat fruit jelly candy cubes with glossy translucent red, orange and green bodies, no sugar coating or wrappers.","sourceImageId":"exec-d03cbf38-3caa-457a-acde-361edbccc5ab","validated":true,"status":"VALID","canonicalNameAr":"حلوي الجيلي","imageUrl":"assets/notes/generated/hlwy-aljyly.webp","noteKey":"hlwy-aljyly","noteAssetId":"origo-note-hlwy-aljyly","sha256":"c1ed53870fb7d4ffb8a5461642e122c7d3a2c10e8449a67850c1961f1c8725df","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"66e4b060c298073e8e50f01148c91468bb5660979ac6efb9b7d0d072e6b9a711","perceptualHash":"03031b3f3f3b4307","technicalReview":{"width":320,"height":320,"bytes":16854,"alphaExtrema":[0,255]}},
    "hlwy-alzbdh": {"canonicalKey":"hlwy-alzbdh","canonicalNameEn":"Butterscotch candy","positiveDescription":"Several smooth golden amber butterscotch hard candies with rounded pillow shapes, unwrapped.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-alzbdh. Exact subject: Butterscotch candy. Several smooth golden amber butterscotch hard candies with rounded pillow shapes, unwrapped.","sourceImageId":"exec-663f8869-ba9f-4cdb-b3d2-3f4f65697247","validated":true,"status":"VALID","canonicalNameAr":"حلوي الزبدة","imageUrl":"assets/notes/generated/hlwy-alzbdh.webp","noteKey":"hlwy-alzbdh","noteAssetId":"origo-note-hlwy-alzbdh","sha256":"8fa69de243bade5039d285107fe18fb7b1a8c10417ca8a850d670636e89ac732","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"665e7950c31316c0fb0c6bcb989413ae675065a30031c5bfe5daa40bde8cb577","perceptualHash":"000033150f19070e","technicalReview":{"width":320,"height":320,"bytes":11932,"alphaExtrema":[0,255]}},
    "hlwy-alkastr": {"canonicalKey":"hlwy-alkastr","canonicalNameEn":"Custard candy","positiveDescription":"Three pale yellow custard-filled soft candies, one cut open to reveal thick creamy vanilla custard center, unwrapped.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-alkastr. Exact subject: Custard candy. Three pale yellow custard-filled soft candies, one cut open to reveal thick creamy vanilla custard center, unwrapped.","sourceImageId":"exec-8af86030-c978-44ee-9abe-413b78ed8f93","validated":true,"status":"VALID","canonicalNameAr":"حلوي الكاستر","imageUrl":"assets/notes/generated/hlwy-alkastr.webp","noteKey":"hlwy-alkastr","noteAssetId":"origo-note-hlwy-alkastr","sha256":"745177218e2d49d3a38d482539ea670c52d2e4c16a9660ef4b4f667bc87bba97","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"0710569dab353819b422ba795325c7da114fbf343c529645e2c7ea7166181c94","perceptualHash":"0002131029030600","technicalReview":{"width":320,"height":320,"bytes":11766,"alphaExtrema":[0,255]}},
    "hlwy-alkramyl": {"canonicalKey":"hlwy-alkramyl","canonicalNameEn":"Caramel candy","positiveDescription":"Three classic soft caramel cubes with satin amber surfaces, one slightly stretched showing chewy texture, unwrapped and unsalted.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-alkramyl. Exact subject: Caramel candy. Three classic soft caramel cubes with satin amber surfaces, one slightly stretched showing chewy texture, unwrapped and unsalted.","sourceImageId":"exec-d8da785f-f392-47f2-9997-dbd3fe0f62cb","validated":true,"status":"VALID","canonicalNameAr":"حلوي الكراميل","imageUrl":"assets/notes/generated/hlwy-alkramyl.webp","noteKey":"hlwy-alkramyl","noteAssetId":"origo-note-hlwy-alkramyl","sha256":"be70eeeba34dfecedd949fe59d67857ba9613654f2d05c27a1fbb0a8eb3067cd","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"7b24536010b3d9b661632c88bfe4e596e0e180d07f998a4b6cf6b3f96b489bd0","perceptualHash":"030301131b2b1303","technicalReview":{"width":320,"height":320,"bytes":15364,"alphaExtrema":[0,255]}},
    "hlwy-allwz": {"canonicalKey":"hlwy-allwz","canonicalNameEn":"Almond candy","positiveDescription":"Three ivory almond-paste candies shaped as small smooth ovals, one cut showing dense marzipan-like almond interior, unwrapped.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-allwz. Exact subject: Almond candy. Three ivory almond-paste candies shaped as small smooth ovals, one cut showing dense marzipan-like almond interior, unwrapped.","sourceImageId":"exec-b3dc083b-bd88-4a23-9513-26e9278227ef","validated":true,"status":"VALID","canonicalNameAr":"حلوي اللوز","imageUrl":"assets/notes/generated/hlwy-allwz.webp","noteKey":"hlwy-allwz","noteAssetId":"origo-note-hlwy-allwz","sha256":"714be9c483c4e4a54142fe91391a054d3877f217420d1fbaee66cac600a8b9e4","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"87c821e72f58760d21c5f559b732bd21dd541c264fd885338e1b93520376de06","perceptualHash":"0303071711110f0c","technicalReview":{"width":320,"height":320,"bytes":9112,"alphaExtrema":[0,255]}},
    "hlwy-almrmalad": {"canonicalKey":"hlwy-almrmalad","canonicalNameEn":"Marmalade candy","positiveDescription":"Three translucent orange fruit marmalade jelly squares dusted lightly with fine sugar crystals.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-almrmalad. Exact subject: Marmalade candy. Three translucent orange fruit marmalade jelly squares dusted lightly with fine sugar crystals.","sourceImageId":"exec-4a5c25d9-3a9b-4569-aeae-78fc28c7fe19","validated":true,"status":"VALID","canonicalNameAr":"حلوي المرمالاد","imageUrl":"assets/notes/generated/hlwy-almrmalad.webp","noteKey":"hlwy-almrmalad","noteAssetId":"origo-note-hlwy-almrmalad","sha256":"4c72b7a6b3d280347e4f4f21b2a926d4cc7a11c483b63c5fe2b586de7d59632c","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"00416fd09d9e243d4c9be8211fa5c8806149d095d18172cf60032ac57d4320f6","perceptualHash":"0113172b0b0f0f07","technicalReview":{"width":320,"height":320,"bytes":21650,"alphaExtrema":[0,255]}},
    "hlwy-frnsyh": {"canonicalKey":"hlwy-frnsyh","canonicalNameEn":"French confectionery","positiveDescription":"A refined trio of petit four French candies: one pastel fruit pâte cube, one small praline bonbon, one almond calisson, no packaging.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-frnsyh. Exact subject: French confectionery. A refined trio of petit four French candies: one pastel fruit pâte cube, one small praline bonbon, one almond calisson, no packaging.","sourceImageId":"exec-33b98a31-5cbb-4e3c-83ee-f03fed04223c","validated":true,"status":"VALID","canonicalNameAr":"حلوي فرنسيه","imageUrl":"assets/notes/generated/hlwy-frnsyh.webp","noteKey":"hlwy-frnsyh","noteAssetId":"origo-note-hlwy-frnsyh","sha256":"7e2bd7da40d7fab48d527be4d67f3a73cf89fddab72f19262536f429bb9403c7","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"6b0e2ebc6908c74472a0489ade535cb8fa915c417bbd006c66568b9fb4aa2e09","perceptualHash":"000c073151332200","technicalReview":{"width":320,"height":320,"bytes":15592,"alphaExtrema":[0,255]}},
    "hlwy-mws-allbn": {"canonicalKey":"hlwy-mws-allbn","canonicalNameEn":"Milk mousse candy","positiveDescription":"A single soft white milk-mousse confection with an airy cut center and thin ivory shell, unwrapped.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlwy-mws-allbn. Exact subject: Milk mousse candy. A single soft white milk-mousse confection with an airy cut center and thin ivory shell, unwrapped.","sourceImageId":"exec-ad2e647e-598b-4fdc-9588-1b1bdbbe5421","validated":true,"status":"VALID","canonicalNameAr":"حلوي موس اللبن","imageUrl":"assets/notes/generated/hlwy-mws-allbn.webp","noteKey":"hlwy-mws-allbn","noteAssetId":"origo-note-hlwy-mws-allbn","sha256":"208be82688bec70220e6ac5830acb708541acd253b4df8ebaf5ea573e5e1ea30","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"a41403add03a6b76a2e03b9e68fba79c247d38d48a848fa1a0a968c8fd382c8b","perceptualHash":"011c6911593b1b06","technicalReview":{"width":320,"height":320,"bytes":11088,"alphaExtrema":[0,255]}},
    "hlyb-alshwfan": {"canonicalKey":"hlyb-alshwfan","canonicalNameEn":"Oat milk","positiveDescription":"A compact clear tumbler filled with creamy pale beige oat milk, a few oat grains beside its base, no carton or text.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlyb-alshwfan. Exact subject: Oat milk. A compact clear tumbler filled with creamy pale beige oat milk, a few oat grains beside its base, no carton or text.","sourceImageId":"exec-0206236f-5205-412b-88ff-42a12fca161e","validated":true,"status":"VALID","canonicalNameAr":"حليب الشوفان","imageUrl":"assets/notes/generated/hlyb-alshwfan.webp","noteKey":"hlyb-alshwfan","noteAssetId":"origo-note-hlyb-alshwfan","sha256":"636a11caad0e7ee07c0578a33cc873f8ec6e370dfc6e52eea6c3f4104d170226","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"08313bd9bff1521bba0ec5c036c22c65610e49fcd5ef72b09475d65864b12e04","perceptualHash":"0007262103031119","technicalReview":{"width":320,"height":320,"bytes":10296,"alphaExtrema":[0,255]}},
    "hlyb-alkrz": {"canonicalKey":"hlyb-alkrz","canonicalNameEn":"Cherry milk","positiveDescription":"A compact clear tumbler filled with pale pink cherry milk with subtle natural red swirl, no whole fruit, carton or text.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlyb-alkrz. Exact subject: Cherry milk. A compact clear tumbler filled with pale pink cherry milk with subtle natural red swirl, no whole fruit, carton or text.","sourceImageId":"exec-75537961-4c24-41ff-a0bf-304bb6773c5f","validated":true,"status":"VALID","canonicalNameAr":"حليب الكرز","imageUrl":"assets/notes/generated/hlyb-alkrz.webp","noteKey":"hlyb-alkrz","noteAssetId":"origo-note-hlyb-alkrz","sha256":"9f5648efad60cc5d7151da0b2dd8d6689e1129022a8e3be92dacdd758256d3e7","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"42142616ba8490ab2a892ca6adee05d628c26e3c1e9989b83b5d9e0318449a7f","perceptualHash":"01497f3f3f172f07","technicalReview":{"width":320,"height":320,"bytes":11540,"alphaExtrema":[0,255]}},
    "hlyb-alwrd": {"canonicalKey":"hlyb-alwrd","canonicalNameEn":"Rose milk","positiveDescription":"A compact clear tumbler filled with blush-pink rose-infused milk, one small edible pink rose petal floating on surface, no carton.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note hlyb-alwrd. Exact subject: Rose milk. A compact clear tumbler filled with blush-pink rose-infused milk, one small edible pink rose petal floating on surface, no carton.","sourceImageId":"exec-7a31b558-9d70-4406-b313-f140deae7490","validated":true,"status":"VALID","canonicalNameAr":"حليب الورد","imageUrl":"assets/notes/generated/hlyb-alwrd.webp","noteKey":"hlyb-alwrd","noteAssetId":"origo-note-hlyb-alwrd","sha256":"236d4a75c3118301fd8a046563b9dd87413f841c13ea586e584ccca0a6999cef","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"a621b709ca679320379e4408cb00b8b4f61c8ed8ac8d822e12f6f4658613b035","perceptualHash":"0d1f3b3b3b4f6b21","technicalReview":{"width":320,"height":320,"bytes":12964,"alphaExtrema":[0,255]}},
    "khbz-almwty": {"canonicalKey":"khbz-almwty","canonicalNameEn":"Pan de muerto","positiveDescription":"One traditional Mexican pan de muerto: round golden baked sweet bread with crossed bone-shaped dough decorations and central knob, light sugar coating.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note khbz-almwty. Exact subject: Pan de muerto. One traditional Mexican pan de muerto: round golden baked sweet bread with crossed bone-shaped dough decorations and central knob, light sugar coating.","sourceImageId":"exec-98ccd146-5f3f-43af-ac5f-c5c01e0f9feb","validated":true,"status":"VALID","canonicalNameAr":"خبز الموتى","imageUrl":"assets/notes/generated/khbz-almwty.webp","noteKey":"khbz-almwty","noteAssetId":"origo-note-khbz-almwty","sha256":"9a784d99ea2cdd6d172d487ab114070d009b90704ec53e618b2b91b6e5940d9c","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"c7ff386e3d83d94ac5ec9ba5c2320d0b670601bfd200644104e1d0278945e8fa","perceptualHash":"080e1b697b3b0f0c","technicalReview":{"width":320,"height":320,"bytes":25646,"alphaExtrema":[0,255]}},
    "drajybws": {"canonicalKey":"drajybws","canonicalNameEn":"Dragibus candy","positiveDescription":"A small pile of glossy round French Dragibus-style gum candies in bright mixed colors, irregular flattened spheres, unwrapped and without lettering.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"ORIGO fragrance note drajybws. Exact subject: Dragibus candy. A small pile of glossy round French Dragibus-style gum candies in bright mixed colors, irregular flattened spheres, unwrapped and without lettering.","sourceImageId":"exec-c22b5ab0-fd7c-4fe6-a648-266029ececc9","validated":true,"status":"VALID","canonicalNameAr":"دراجيبوس","imageUrl":"assets/notes/generated/drajybws.webp","noteKey":"drajybws","noteAssetId":"origo-note-drajybws","sha256":"57eded2a5b015164afe3dd71ae5857997f8fe826783b8994099fd4aaedc43e5a","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"e00637c2a701b9539f0c628784c2fdaa05988c779f6e9f409ad414864de4c948","perceptualHash":"000e1d3713170f0c","technicalReview":{"width":320,"height":320,"bytes":15242,"alphaExtrema":[0,255]}},
    "rhyq": {"canonicalKey":"rhyq","canonicalNameEn":"Flower nectar","positiveDescription":"A single clear golden nectar droplet suspended from the tip of a delicate pale flower stamen, botanical macro cutout without a full flower arrangement.","scientificName":null,"entityType":"plant","plantPart":"other","generationPrompt":"ORIGO fragrance note rhyq. Exact subject: Flower nectar. A single clear golden nectar droplet suspended from the tip of a delicate pale flower stamen, botanical macro cutout without a full flower arrangement.","sourceImageId":"exec-cd07af57-a154-4dfc-80da-9a0980e2060f","validated":true,"status":"VALID","canonicalNameAr":"رحيق","imageUrl":"assets/notes/generated/rhyq.webp","noteKey":"rhyq","noteAssetId":"origo-note-rhyq","sha256":"377c10bad7042608eea904acfd8c91cf60f91d163268b7b4b8eca4e9d134d3fe","visualReview":"Reviewed reports/batch45-review.jpg against the locked prompt: the exact named subject is clearly shown; no lettering, perfume bottle, branded packaging, scenery or unrelated ingredient.","contentHash":"7c2ba4d1aac77539b4af563f9caea5e7c12d61abb0f19af9584e049688919a24","perceptualHash":"0000014f5e480000","technicalReview":{"width":320,"height":320,"bytes":8724,"alphaExtrema":[0,255]}},
    "fwghasyt": {"canonicalKey":"fwghasyt","canonicalNameEn":"Fougassette","positiveDescription":"A small Provençal fougassette sweet bread, flat oval golden brioche with decorative slashes and orange-blossom glazed surface.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note fwghasyt. Exact subject: Fougassette. A small Provençal fougassette sweet bread, flat oval golden brioche with decorative slashes and orange-blossom glazed surface. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-526656a6-a0e9-498a-9563-b6f231b3492f","validated":true,"status":"VALID","canonicalNameAr":"فوغاسيت","imageUrl":"assets/notes/generated/fwghasyt.webp","noteKey":"fwghasyt","noteAssetId":"origo-note-fwghasyt","sha256":"a6d778c5bd14db2223149e622e52c053e4447872d6ab3f4775c6922695d144c2","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"53772a8305193cc47408959e90c845eb79cbb6c71a930426f4bcb04faf5300db","perceptualHash":"07056d54712b0708","technicalReview":{"width":320,"height":320,"bytes":22326,"alphaExtrema":[0,255]}},
    "qrs-alasl": {"canonicalKey":"qrs-alasl","canonicalNameEn":"Honeycomb","positiveDescription":"A clean cut hexagonal section of natural golden beeswax honeycomb visibly filled with amber honey, no bees.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note qrs-alasl. Exact subject: Honeycomb. A clean cut hexagonal section of natural golden beeswax honeycomb visibly filled with amber honey, no bees. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-b81719cc-b809-4889-914b-5846254eda2f","validated":true,"status":"VALID","canonicalNameAr":"قرص العسل","imageUrl":"assets/notes/generated/qrs-alasl.webp","noteKey":"qrs-alasl","noteAssetId":"origo-note-qrs-alasl","sha256":"c8b6d2dd46b783a1d64d0d01b13f6249e82ff59e16f84370f1127a73a58ab71c","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"4cbe6a7537c2174a03df8a0c7db3b9faa041f76c434de807d764278b18ea1c61","perceptualHash":"070f3d0d0f1b0f0e","technicalReview":{"width":320,"height":320,"bytes":25118,"alphaExtrema":[0,255]}},
    "qhwh-afwjatw": {"canonicalKey":"qhwh-afwjatw","canonicalNameEn":"Affogato coffee","positiveDescription":"A scoop of pale vanilla gelato partly covered in a dark espresso pour, isolated as one compact dessert with no cup or spoon.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note qhwh-afwjatw. Exact subject: Affogato coffee. A scoop of pale vanilla gelato partly covered in a dark espresso pour, isolated as one compact dessert with no cup or spoon. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-2d74134e-8e1a-4858-9faa-3545274f9a4a","validated":true,"status":"VALID","canonicalNameAr":"قهوة أفوجاتو","imageUrl":"assets/notes/generated/qhwh-afwjatw.webp","noteKey":"qhwh-afwjatw","noteAssetId":"origo-note-qhwh-afwjatw","sha256":"5a141f00622bb7783ed84382101a04cbb93937de5820197f6cc0b01b7a50dea0","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"f21eea204a764ae06db1846fdc57d10632a066ed775b482d1924ad602961289e","perceptualHash":"0607236323331306","technicalReview":{"width":320,"height":320,"bytes":20138,"alphaExtrema":[0,255]}},
    "qhwh-balhlyb": {"canonicalKey":"qhwh-balhlyb","canonicalNameEn":"Coffee with milk","positiveDescription":"A compact transparent glass cup of light caramel milk coffee with a thin crema surface, no saucer or text.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note qhwh-balhlyb. Exact subject: Coffee with milk. A compact transparent glass cup of light caramel milk coffee with a thin crema surface, no saucer or text. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-acb9a0ce-ac32-4e4d-9a23-6d81a036e746","validated":true,"status":"VALID","canonicalNameAr":"قهوة بالحليب","imageUrl":"assets/notes/generated/qhwh-balhlyb.webp","noteKey":"qhwh-balhlyb","noteAssetId":"origo-note-qhwh-balhlyb","sha256":"fdc748d18716c8e99924c8cf67a04febe9bd82917ea1abbbfd4a66180ad8f743","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"edbfb7aabfcaf0bdb13e059838610f119331ecdbbebfd8cb3afe39440f376654","perceptualHash":"050d0d0d2d0f330e","technicalReview":{"width":320,"height":320,"bytes":12004,"alphaExtrema":[0,255]}},
    "kasata-sqlyh": {"canonicalKey":"kasata-sqlyh","canonicalNameEn":"Sicilian cassata","positiveDescription":"A slice of Sicilian cassata cake showing green marzipan, white ricotta sponge layers and jewel-like candied fruit pieces integral to the cake.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note kasata-sqlyh. Exact subject: Sicilian cassata. A slice of Sicilian cassata cake showing green marzipan, white ricotta sponge layers and jewel-like candied fruit pieces integral to the cake. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-de52240d-cdb5-4fad-ab27-1e4729c44809","validated":true,"status":"VALID","canonicalNameAr":"كاساتا صقلية","imageUrl":"assets/notes/generated/kasata-sqlyh.webp","noteKey":"kasata-sqlyh","noteAssetId":"origo-note-kasata-sqlyh","sha256":"5eaaf6d9c847601b60f0a3635b9889ca67aacecbfb98f5739c9b4406c89ad081","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"a03253054227ad850f285b8286cd0096bfb979040cfb58f765c782b3efae4eb9","perceptualHash":"01056831090f1e10","technicalReview":{"width":320,"height":320,"bytes":24788,"alphaExtrema":[0,255]}},
    "kalyswn-dyks": {"canonicalKey":"kalyswn-dyks","canonicalNameEn":"Calisson d'Aix","positiveDescription":"Three traditional Calisson d'Aix candies: white royal icing tops, elongated almond-shaped golden wafer bases, one cut showing pale almond melon paste.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note kalyswn-dyks. Exact subject: Calisson d'Aix. Three traditional Calisson d'Aix candies: white royal icing tops, elongated almond-shaped golden wafer bases, one cut showing pale almond melon paste. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-4a598e2f-8353-429d-bb68-c96b33696a8a","validated":true,"status":"VALID","canonicalNameAr":"كاليسون ديكس","imageUrl":"assets/notes/generated/kalyswn-dyks.webp","noteKey":"kalyswn-dyks","noteAssetId":"origo-note-kalyswn-dyks","sha256":"bd1a7700d3a2e931462d26d099ad05839564d107d8392f57273e1d174820265a","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"b1db1c5e1dc1624e939998618d67d0d8b75abb17035742328ccb8174bfb6d7c5","perceptualHash":"01031365191b0706","technicalReview":{"width":320,"height":320,"bytes":10728,"alphaExtrema":[0,255]}},
    "kramyl-mmlh": {"canonicalKey":"kramyl-mmlh","canonicalNameEn":"Salted caramel","positiveDescription":"A thick glossy amber salted caramel dollop with a few coarse salt crystals, no candy cubes or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note kramyl-mmlh. Exact subject: Salted caramel. A thick glossy amber salted caramel dollop with a few coarse salt crystals, no candy cubes or container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-2eb3bee4-531c-40f4-9879-ae47ad1f3a17","validated":true,"status":"VALID","canonicalNameAr":"كراميل مملح","imageUrl":"assets/notes/generated/kramyl-mmlh.webp","noteKey":"kramyl-mmlh","noteAssetId":"origo-note-kramyl-mmlh","sha256":"49694af81543493b1018665f7696d9baf827537c9878dfba13fe799724db10c2","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"3b607456f3554f199340f9e11abfbb250ecae5ea104cb05afb9196fd89954022","perceptualHash":"0309091b00110903","technicalReview":{"width":320,"height":320,"bytes":16880,"alphaExtrema":[0,255]}},
    "krz-ghrywt": {"canonicalKey":"krz-ghrywt","canonicalNameEn":"Griotte cherries","positiveDescription":"Several dark burgundy Morello griotte sour cherries with natural stems, one cut showing deep red flesh and small pit cavity; no syrup.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krz-ghrywt. Exact subject: Griotte cherries. Several dark burgundy Morello griotte sour cherries with natural stems, one cut showing deep red flesh and small pit cavity; no syrup. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-57170e74-88d7-4fed-9679-983b65c27306","validated":true,"status":"VALID","canonicalNameAr":"كرز غريوت","imageUrl":"assets/notes/generated/krz-ghrywt.webp","noteKey":"krz-ghrywt","noteAssetId":"origo-note-krz-ghrywt","sha256":"e81a6ff98bd81a6f81ca2a917bf8fd160994a71691c5628ec9edbdfc74bf9efb","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"ba2f6b8aa61f7237df60300f96794ddffba6103c4498f37056191179c5d678ba","perceptualHash":"0323074dc3232303","technicalReview":{"width":320,"height":320,"bytes":20634,"alphaExtrema":[0,255]}},
    "krym-alkhwkh": {"canonicalKey":"krym-alkhwkh","canonicalNameEn":"Peach cream","positiveDescription":"A pale peach-colored smooth cream dollop with fine whipped ridges and tiny peach pulp flecks, no whole fruit or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krym-alkhwkh. Exact subject: Peach cream. A pale peach-colored smooth cream dollop with fine whipped ridges and tiny peach pulp flecks, no whole fruit or container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-eced2118-ce96-44d6-b77e-80b46603dcec","validated":true,"status":"VALID","canonicalNameAr":"كريم الخوخ","imageUrl":"assets/notes/generated/krym-alkhwkh.webp","noteKey":"krym-alkhwkh","noteAssetId":"origo-note-krym-alkhwkh","sha256":"862c8fadb5da82ec4522eb03a8fd910297b8e72d8c62d037a9b5ad70455b9f1b","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"e24ccb6aa8a2bab2b6e56cef1d051c2734536e1d5af4b0fdf44c6dc108717154","perceptualHash":"021713430103031f","technicalReview":{"width":320,"height":320,"bytes":16050,"alphaExtrema":[0,255]}},
    "krym-shantyh": {"canonicalKey":"krym-shantyh","canonicalNameEn":"Chantilly cream","positiveDescription":"A pristine ivory-white Chantilly whipped cream rosette with airy sharply defined ridges, no fruit or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krym-shantyh. Exact subject: Chantilly cream. A pristine ivory-white Chantilly whipped cream rosette with airy sharply defined ridges, no fruit or container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-2bba0701-2fb1-4d6c-a7ef-18669bed6b77","validated":true,"status":"VALID","canonicalNameAr":"كريم شانتيه","imageUrl":"assets/notes/generated/krym-shantyh.webp","noteKey":"krym-shantyh","noteAssetId":"origo-note-krym-shantyh","sha256":"5f1238b0d94abcc00e378320384ac01d2e46019ad1f2f7774e57edaf0e221aff","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"3cab4ebab2054901e9741d32fc6864cfef951c361321b1b8adfbf46419ddb706","perceptualHash":"0703056521290b07","technicalReview":{"width":320,"height":320,"bytes":14172,"alphaExtrema":[0,255]}},
    "krymh-albndq-walkakaw": {"canonicalKey":"krymh-albndq-walkakaw","canonicalNameEn":"Hazelnut cocoa cream","positiveDescription":"A glossy chocolate-brown hazelnut cocoa cream dollop with smooth swirled ridges, no whole nuts or chocolate bars.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krymh-albndq-walkakaw. Exact subject: Hazelnut cocoa cream. A glossy chocolate-brown hazelnut cocoa cream dollop with smooth swirled ridges, no whole nuts or chocolate bars. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-445f0c44-4bbe-4377-8337-1939610e1d59","validated":true,"status":"VALID","canonicalNameAr":"كريمة البندق والكاكاو","imageUrl":"assets/notes/generated/krymh-albndq-walkakaw.webp","noteKey":"krymh-albndq-walkakaw","noteAssetId":"origo-note-krymh-albndq-walkakaw","sha256":"ae861f2ee0bc855f6e4d7b199262747652efc0e9f86d8949ed74cb216366938b","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"644c3836b5467444444b81a4451dacb5e38e84184a2d6183ffdbc03097970289","perceptualHash":"081e1f0d0f4f0f0c","technicalReview":{"width":320,"height":320,"bytes":17562,"alphaExtrema":[0,255]}},
    "krymh-altzyyn-alwrdyh": {"canonicalKey":"krymh-altzyyn-alwrdyh","canonicalNameEn":"Pink frosting","positiveDescription":"A neat rose-pink buttercream frosting swirl with crisp piping ridges, no cake, sprinkles or decorations.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krymh-altzyyn-alwrdyh. Exact subject: Pink frosting. A neat rose-pink buttercream frosting swirl with crisp piping ridges, no cake, sprinkles or decorations. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-63664097-5c07-4f14-80ea-cc753fb4c194","validated":true,"status":"VALID","canonicalNameAr":"كريمة التزيين الوردية","imageUrl":"assets/notes/generated/krymh-altzyyn-alwrdyh.webp","noteKey":"krymh-altzyyn-alwrdyh","noteAssetId":"origo-note-krymh-altzyyn-alwrdyh","sha256":"ed0cc421eb5ff05b11510252671f3c05f9abbfc84fa05b5684f3af80b11279f7","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"ec09c395336da04f6540b742f7cd8814725fab94b1c5a69401efdede310e0686","perceptualHash":"03030929150d0303","technicalReview":{"width":320,"height":320,"bytes":16668,"alphaExtrema":[0,255]}},
    "krymh-alhlyb": {"canonicalKey":"krymh-alhlyb","canonicalNameEn":"Milk cream","positiveDescription":"A thick ivory milk cream dollop with smooth soft folds, no whipped peaks, no container or milk glass.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krymh-alhlyb. Exact subject: Milk cream. A thick ivory milk cream dollop with smooth soft folds, no whipped peaks, no container or milk glass. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-19834f57-3e2d-4d3d-8a2a-56f39b4df100","validated":true,"status":"VALID","canonicalNameAr":"كريمة الحليب","imageUrl":"assets/notes/generated/krymh-alhlyb.webp","noteKey":"krymh-alhlyb","noteAssetId":"origo-note-krymh-alhlyb","sha256":"6cab8c4f74d31f79d3df1143003d9613a7a0dfec31eb12c0d261054ec57fcd91","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"ff706d808124ecaed9798dfa138611e790fcb2e61db8e22dea05179d26f0e1fa","perceptualHash":"03110d2932161507","technicalReview":{"width":320,"height":320,"bytes":8752,"alphaExtrema":[0,255]}},
    "krymh-alkhfq": {"canonicalKey":"krymh-alkhfq","canonicalNameEn":"Whipping cream","positiveDescription":"A loose semi-whipped white cream mound with soft rounded folds and glossy dairy texture, no container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krymh-alkhfq. Exact subject: Whipping cream. A loose semi-whipped white cream mound with soft rounded folds and glossy dairy texture, no container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-12a32884-0f30-4057-a2fc-178a0cfe802b","validated":true,"status":"VALID","canonicalNameAr":"كريمة الخفق","imageUrl":"assets/notes/generated/krymh-alkhfq.webp","noteKey":"krymh-alkhfq","noteAssetId":"origo-note-krymh-alkhfq","sha256":"3edbaf15b298c727402067805ae467d1f4fca91a279bf83e6b441e57c7a55dae","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"2849f1c4fafc310b6124ab7adb93110780329ed292f7c8cb16bdb48fbfbf525f","perceptualHash":"000c0e275f0f331f","technicalReview":{"width":320,"height":320,"bytes":12338,"alphaExtrema":[0,255]}},
    "krymh-alzbdh": {"canonicalKey":"krymh-alzbdh","canonicalNameEn":"Buttercream","positiveDescription":"A pale cream buttercream rosette with dense smooth piping ridges, no cake, flavor garnish or sprinkles.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krymh-alzbdh. Exact subject: Buttercream. A pale cream buttercream rosette with dense smooth piping ridges, no cake, flavor garnish or sprinkles. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-1420b342-dac1-455c-8024-1244a0b36fd4","validated":true,"status":"VALID","canonicalNameAr":"كريمة الزبدة","imageUrl":"assets/notes/generated/krymh-alzbdh.webp","noteKey":"krymh-alzbdh","noteAssetId":"origo-note-krymh-alzbdh","sha256":"1abffc47d3bdb3225a9d11da17ff4afce42414e0da253b61c161f5bb4a110f9f","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"1f09ae3e228ea8a1d3fb1905ed6209c5643fbdacd10e664c7253c81bc2359fdb","perceptualHash":"0e1f176b7b7f3f0e","technicalReview":{"width":320,"height":320,"bytes":12924,"alphaExtrema":[0,255]}},
    "krymh-alfstq": {"canonicalKey":"krymh-alfstq","canonicalNameEn":"Pistachio cream","positiveDescription":"A smooth pale green pistachio cream dollop with dense glossy texture and fine natural pistachio speckles, no nuts or container.","scientificName":null,"entityType":"food","plantPart":"other","generationPrompt":"Use case: product-mockup. ORIGO fragrance note krymh-alfstq. Exact subject: Pistachio cream. A smooth pale green pistachio cream dollop with dense glossy texture and fine natural pistachio speckles, no nuts or container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, watermark, people, bottles, packaging, plates, utensils, scenery or unrelated ingredients. Exact named food only.","sourceImageId":"exec-bb0d458e-d7a6-49b8-8346-fc1a7b962ef3","validated":true,"status":"VALID","canonicalNameAr":"كريمة الفستق","imageUrl":"assets/notes/generated/krymh-alfstq.webp","noteKey":"krymh-alfstq","noteAssetId":"origo-note-krymh-alfstq","sha256":"34cee70972f7d5a7d9397dbec9313fdefdda70f43c589dcc37eccb868e4153f4","visualReview":"Reviewed reports/batch44-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.","contentHash":"4df9e239147f756433b40dd79bb1a4436de3a276e2b4e38d77589ac968b2f791","perceptualHash":"000c2f636701070e","technicalReview":{"width":320,"height":320,"bytes":17480,"alphaExtrema":[0,255]}},
  "ftyrh-myryngh-allymwn": {
    "canonicalKey": "ftyrh-myryngh-allymwn",
    "canonicalNameEn": "Lemon meringue pie",
    "positiveDescription": "A slice of lemon meringue pie with golden crust, bright yellow lemon custard, high white meringue with browned peaks.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "ORIGO fragrance note ftyrh-myryngh-allymwn. Exact subject Lemon meringue pie. A slice of lemon meringue pie with golden crust, bright yellow lemon custard, high white meringue with browned peaks.",
    "sourceImageId": "exec-df4ede65-eca9-447a-bc26-4d5eb6ff62ef",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "فطيرة ميرينغ الليمون",
    "imageUrl": "assets/notes/generated/ftyrh-myryngh-allymwn.webp",
    "noteKey": "ftyrh-myryngh-allymwn",
    "noteAssetId": "origo-note-ftyrh-myryngh-allymwn",
    "sha256": "afcbc45ab56730f4270941a378888f5c5463d7a09e06d8340ec4e4870e15d70f",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "fc6a1a0c3d25f4536927381928e0d2310a648aa0bda373b745e1a28ff70eadff",
    "perceptualHash": "00013f7de35b0f0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 20420,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "fwdj-alshwkwlath": {
    "canonicalKey": "fwdj-alshwkwlath",
    "canonicalNameEn": "Chocolate fudge",
    "positiveDescription": "Three dense soft dark chocolate fudge cubes, one cut face showing fine smooth fudge texture, no nuts.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "ORIGO fragrance note fwdj-alshwkwlath. Exact subject Chocolate fudge. Three dense soft dark chocolate fudge cubes, one cut face showing fine smooth fudge texture, no nuts.",
    "sourceImageId": "exec-344cc6ab-d48c-4319-b5a0-965a9f6c8423",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "فودج الشوكولاتة",
    "imageUrl": "assets/notes/generated/fwdj-alshwkwlath.webp",
    "noteKey": "fwdj-alshwkwlath",
    "noteAssetId": "origo-note-fwdj-alshwkwlath",
    "sha256": "3712027fa8fe69fa25f10813bf8f78a98827ea7f631685bf88e549b275b6eb37",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "74cc85c0f6f7a541723efa16c537325293992d92857280b8dbe6679d75dcb848",
    "perceptualHash": "03051773731f1b0b",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 17654,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "krz-marashynw": {
    "canonicalKey": "krz-marashynw",
    "canonicalNameEn": "Maraschino cherries",
    "positiveDescription": "Glossy bright red preserved maraschino cherries with slender stems, syrup sheen, no fresh cherry leaves.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "ORIGO fragrance note krz-marashynw. Exact subject Maraschino cherries. Glossy bright red preserved maraschino cherries with slender stems, syrup sheen, no fresh cherry leaves.",
    "sourceImageId": "exec-ba1515fd-d2aa-4227-b061-77ea3ea411e2",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "كرز ماراشينو",
    "imageUrl": "assets/notes/generated/krz-marashynw.webp",
    "noteKey": "krz-marashynw",
    "noteAssetId": "origo-note-krz-marashynw",
    "sha256": "b50a7d07d8afa3a203c2f23817460e2fcbca22a13dda5ad9dac01117b17c444a",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "1e7d7e0c8d86caf79aa9239192cd5dd0a9893a8b450882705b615249ad17e99e",
    "perceptualHash": "0919ca0e137b490d",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 23310,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "krym-brwlyh": {
    "canonicalKey": "krym-brwlyh",
    "canonicalNameEn": "Creme brulee",
    "positiveDescription": "A freestanding small oval of pale vanilla custard topped with a thin cracked amber burnt-sugar crust. No ramekin.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "ORIGO fragrance note krym-brwlyh. Exact subject Creme brulee. A freestanding small oval of pale vanilla custard topped with a thin cracked amber burnt-sugar crust. No ramekin.",
    "sourceImageId": "exec-bb642514-2675-440f-b936-27736f87b921",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "كريم بروليه",
    "imageUrl": "assets/notes/generated/krym-brwlyh.webp",
    "noteKey": "krym-brwlyh",
    "noteAssetId": "origo-note-krym-brwlyh",
    "sha256": "6068556d562a30d85d41920452570c56d3701b2c5df688bc5708f2aa60a41b30",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "a57b9ed508e922ed76c5aeec280aa6b5579c886a1b8475d66e981c28c0638fd0",
    "perceptualHash": "000703071b2b0f10",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 21226,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "kak-aldwnats": {
    "canonicalKey": "kak-aldwnats",
    "canonicalNameEn": "Doughnuts",
    "positiveDescription": "Two golden fried ring doughnuts with a light plain sugar glaze. No sprinkles.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "ORIGO fragrance note kak-aldwnats. Exact subject Doughnuts. Two golden fried ring doughnuts with a light plain sugar glaze. No sprinkles.",
    "sourceImageId": "exec-ef235691-dc6d-4fe5-b9b9-d660a3a8014c",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "كعك الدوناتس",
    "imageUrl": "assets/notes/generated/kak-aldwnats.webp",
    "noteKey": "kak-aldwnats",
    "noteAssetId": "origo-note-kak-aldwnats",
    "sha256": "34125889cb61cdad6472bc5aa834e3e4315d01e2080990baf47f022e679cd4bf",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "2116c841ac92b911c920615ccab5eef4905cd4204180c5c3d94d2662b7207172",
    "perceptualHash": "0022131f3f3b0b07",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 17960,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "kakh-wwby": {
    "canonicalKey": "kakh-wwby",
    "canonicalNameEn": "Whoopie pie",
    "positiveDescription": "One round chocolate whoopie pie sandwich and one cut half, soft dark cake disks with thick white cream filling.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "ORIGO fragrance note kakh-wwby. Exact subject Whoopie pie. One round chocolate whoopie pie sandwich and one cut half, soft dark cake disks with thick white cream filling.",
    "sourceImageId": "exec-c1e681a0-300d-40c6-89af-aa0f933e1fb3",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "كعكة ووبي",
    "imageUrl": "assets/notes/generated/kakh-wwby.webp",
    "noteKey": "kakh-wwby",
    "noteAssetId": "origo-note-kakh-wwby",
    "sha256": "3d68bff8ad29fc6e449c0bde5e74eeff0fd6ef3fe77a1dc672e749b7f9ff2b93",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "9ef0b11424dc9f25e7e995cda8bb33dab4e00e7f51a3705b11a54735b4f26b19",
    "perceptualHash": "00000307374eb370",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 18914,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "kmthry-mkhbwzh": {
    "canonicalKey": "kmthry-mkhbwzh",
    "canonicalNameEn": "Baked pear",
    "positiveDescription": "One caramelized baked pear half with stem and visibly softened golden flesh, lightly browned surface, no garnish.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note kmthry-mkhbwzh. Exact subject: Baked pear. One caramelized baked pear half with stem and visibly softened golden flesh, lightly browned surface, no garnish. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-d3baa637-48b5-4c3b-88aa-6ee44e67d7bb",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "كمثرى مخبوزة",
    "imageUrl": "assets/notes/generated/kmthry-mkhbwzh.webp",
    "noteKey": "kmthry-mkhbwzh",
    "noteAssetId": "origo-note-kmthry-mkhbwzh",
    "sha256": "b78e66268f23ae57235e928dba6331e22837319f359c8d1faf86d305bc5562ae",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "586304f923d6c2a5811d6e48a30a201a20acc1e5fc65ce8fa14bb127518128d5",
    "perceptualHash": "0003058926340d03",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 20850,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "lymwn-mskr": {
    "canonicalKey": "lymwn-mskr",
    "canonicalNameEn": "Candied lemon",
    "positiveDescription": "Three translucent yellow candied lemon slices coated with fine sugar, including visible rind and citrus segments. No whole raw lemon.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note lymwn-mskr. Exact subject: Candied lemon. Three translucent yellow candied lemon slices coated with fine sugar, including visible rind and citrus segments. No whole raw lemon. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-d5370ea5-6e49-4796-aea5-41bba342682f",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "ليمون مسكر",
    "imageUrl": "assets/notes/generated/lymwn-mskr.webp",
    "noteKey": "lymwn-mskr",
    "noteAssetId": "origo-note-lymwn-mskr",
    "sha256": "c13b67e9131bc9d5bc31f13f02c001470a8c3900490733921f0828e557fd95bd",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "68d8b1909116fb2ed6c83624f480a6b0cfebdd4bcadb9cba2a11c6258b46f880",
    "perceptualHash": "030313090f1b070f",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 23760,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "marwn-ghlash": {
    "canonicalKey": "marwn-ghlash",
    "canonicalNameEn": "Marron glace",
    "positiveDescription": "Two glazed candied chestnuts with recognizable lobed chestnut shape and amber sugar coating, one cut revealing dense golden chestnut flesh. No shell.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note marwn-ghlash. Exact subject: Marron glace. Two glazed candied chestnuts with recognizable lobed chestnut shape and amber sugar coating, one cut revealing dense golden chestnut flesh. No shell. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-6db05605-be14-41fb-a0b7-24a12ecf10f3",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "مارون غلاسه",
    "imageUrl": "assets/notes/generated/marwn-ghlash.webp",
    "noteKey": "marwn-ghlash",
    "noteAssetId": "origo-note-marwn-ghlash",
    "sha256": "e8c2ba1318752cab7d5aca4bdc8f8a39002f048e552c0a5bc58f4d609d5a4dfc",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "3be53687000610acbc0c898854398ac4a05a7589a997ab81a4911ab4bc14ea11",
    "perceptualHash": "0006072777933840",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 20832,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "makrwn-alfanylya": {
    "canonicalKey": "makrwn-alfanylya",
    "canonicalNameEn": "Vanilla macaron",
    "positiveDescription": "Two ivory French vanilla macarons with ruffled feet and pale vanilla cream filling, no other flavors or garnish.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note makrwn-alfanylya. Exact subject: Vanilla macaron. Two ivory French vanilla macarons with ruffled feet and pale vanilla cream filling, no other flavors or garnish. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-2fbc329d-0f3e-423d-9d13-6ae4fb539a8f",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "ماكرون الفانيليا",
    "imageUrl": "assets/notes/generated/makrwn-alfanylya.webp",
    "noteKey": "makrwn-alfanylya",
    "noteAssetId": "origo-note-makrwn-alfanylya",
    "sha256": "98e82f68553470dda6c36ae31c7ff99bb57b1562f1ff8b46af06ef957d1757e3",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "38031a50486af9386ccbecf9b0346c3fea9b9e3b9c8c4bc06962ba8e6f5b6828",
    "perceptualHash": "030113132706060e",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 13432,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "mrby-altwt-alazrq": {
    "canonicalKey": "mrby-altwt-alazrq",
    "canonicalNameEn": "Blueberry jam",
    "positiveDescription": "A thick glossy deep blue-purple blueberry jam dollop with visible cooked blueberry fragments, no fresh fruits or container.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note mrby-altwt-alazrq. Exact subject: Blueberry jam. A thick glossy deep blue-purple blueberry jam dollop with visible cooked blueberry fragments, no fresh fruits or container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-813da4b5-6e82-4700-a713-ba09595a2e4a",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "مربى التوت الأزرق",
    "imageUrl": "assets/notes/generated/mrby-altwt-alazrq.webp",
    "noteKey": "mrby-altwt-alazrq",
    "noteAssetId": "origo-note-mrby-altwt-alazrq",
    "sha256": "9c49cc75817042f7a1cf9b2387dbfccc7c01af77f3183f473a792df5a48b84c2",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "3ddb69be59714e7ce6164080c13f5b258c38dcacff57bc3544c33c302c091182",
    "perceptualHash": "060f2b09252f0708",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 25180,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "mrby-almshmsh": {
    "canonicalKey": "mrby-almshmsh",
    "canonicalNameEn": "Apricot jam",
    "positiveDescription": "A thick glossy orange apricot jam dollop showing softened apricot pulp and small cooked fruit pieces, no fresh fruits or container.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note mrby-almshmsh. Exact subject: Apricot jam. A thick glossy orange apricot jam dollop showing softened apricot pulp and small cooked fruit pieces, no fresh fruits or container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-ea4b2eb6-e8a7-4164-9609-64b4c7d3d751",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "مربى المشمش",
    "imageUrl": "assets/notes/generated/mrby-almshmsh.webp",
    "noteKey": "mrby-almshmsh",
    "noteAssetId": "origo-note-mrby-almshmsh",
    "sha256": "8a433ed051dd73eab116bf166cb7da5c5709aec507b50a1e140fcb40de660b70",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "bb1c8ae638b034bc18f8780d541dcae5bedf1d35443388b55c4af62449c4a0f0",
    "perceptualHash": "0e072b570d1b1f0f",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 24980,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "mrby-alkywy": {
    "canonicalKey": "mrby-alkywy",
    "canonicalNameEn": "Kiwi jam",
    "positiveDescription": "A thick translucent yellow-green kiwi jam dollop with abundant tiny black kiwi seeds, no fresh fruit or container.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note mrby-alkywy. Exact subject: Kiwi jam. A thick translucent yellow-green kiwi jam dollop with abundant tiny black kiwi seeds, no fresh fruit or container. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-6c3bb8e4-161b-4115-b8d0-d732885cdb5c",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "مربي الكيوي",
    "imageUrl": "assets/notes/generated/mrby-alkywy.webp",
    "noteKey": "mrby-alkywy",
    "noteAssetId": "origo-note-mrby-alkywy",
    "sha256": "cdefe56bdae9d529b02c061b4fb8d2c11e5a88577e1ccddb94909c751bd85c18",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "eac588610be578c1584243e0e4b96437b9cf5e84ea50131a3cb46aedff26e980",
    "perceptualHash": "080e074b0f070f0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 22256,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "wafl-mkhrwty": {
    "canonicalKey": "wafl-mkhrwty",
    "canonicalNameEn": "Waffle cone",
    "positiveDescription": "One empty golden-brown waffle ice cream cone with crisp crosshatch texture and open top. No ice cream.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note wafl-mkhrwty. Exact subject: Waffle cone. One empty golden-brown waffle ice cream cone with crisp crosshatch texture and open top. No ice cream. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-f9289f0c-2cc6-45f3-a981-371b4d047ab0",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "وافل مخروطي",
    "imageUrl": "assets/notes/generated/wafl-mkhrwty.webp",
    "noteKey": "wafl-mkhrwty",
    "noteAssetId": "origo-note-wafl-mkhrwty",
    "sha256": "672328bdae00c8acc5551dc460f07a81bfe8c32235467b66a96b365effd1770f",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "91da9aa059ff9c9702aeb0855170dab8597e2aab0086115aeb64d3e767f68e17",
    "perceptualHash": "00000101010d0301",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 14160,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "kafyar-alfanylya": {
    "canonicalKey": "kafyar-alfanylya",
    "canonicalNameEn": "Vanilla caviar",
    "positiveDescription": "A small mound of moist black vanilla caviar, tiny scraped vanilla pod seeds in dark sticky paste. No pods, flowers or bowl.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note kafyar-alfanylya. Exact subject: Vanilla caviar. A small mound of moist black vanilla caviar, tiny scraped vanilla pod seeds in dark sticky paste. No pods, flowers or bowl. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-1d9c6e72-f79f-498e-9060-0a793317751e",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "كافيار الفانيليا",
    "imageUrl": "assets/notes/generated/kafyar-alfanylya.webp",
    "noteKey": "kafyar-alfanylya",
    "noteAssetId": "origo-note-kafyar-alfanylya",
    "sha256": "01edea1ef1816640d15bc740cbfe4afba1c6e399e311856290ea51f10c496629",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "071ebb579df2686714f2f1315b18963f99eeb63f5fa3beb91cdd2a1df322c9bf",
    "perceptualHash": "00000c0e17171717",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 18618,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "mrby-alwrd": {
    "canonicalKey": "mrby-alwrd",
    "canonicalNameEn": "Rose jam",
    "positiveDescription": "A small glossy rose-pink preserve dollop with visible thin cooked rose petal strips suspended in translucent syrup. No fresh rose flower or leaves.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note mrby-alwrd. Exact subject: Rose jam. A small glossy rose-pink preserve dollop with visible thin cooked rose petal strips suspended in translucent syrup. No fresh rose flower or leaves. Photorealistic square cutout, centered with ample transparent margin. Genuinely transparent alpha background. No text, people, bottles, watermarks, packaging, plates, utensils, scenery or unrelated ingredients. Depict the exact named food and state.",
    "sourceImageId": "exec-ac7d2d16-33e8-44ef-9e56-02f8d998bdb6",
    "validated": true,
    "status": "VALID",
    "canonicalNameAr": "مربي الورد",
    "imageUrl": "assets/notes/generated/mrby-alwrd.webp",
    "noteKey": "mrby-alwrd",
    "noteAssetId": "origo-note-mrby-alwrd",
    "sha256": "e976875b75c613315d12ae0f7746eacbee82a2c9941632ff75c7842378cc6d52",
    "visualReview": "Reviewed reports/batch43-review.jpg against the locked prompt: exact named food and required prepared state are clearly shown; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "9ab34e05a758ae4b2040f57fbd00ff72d461d1359d5e8206b998c686c869b25f",
    "perceptualHash": "000707150f13070e",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 24232,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "khbz-alznjbyl": {
    "canonicalKey": "khbz-alznjbyl",
    "canonicalNameEn": "Gingerbread",
    "positiveDescription": "A cut square of dark moist gingerbread cake with characteristic brown spiced crumb, no icing, no ginger root garnish.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity khbz-alznjbyl, exact ingredient Gingerbread. A cut square of dark moist gingerbread cake with characteristic brown spiced crumb, no icing, no ginger root garnish. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-e73d615e-0d16-40a3-a868-648c1e7c2b66",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/khbz-alznjbyl.webp",
    "noteKey": "khbz-alznjbyl",
    "noteAssetId": "origo-note-khbz-alznjbyl",
    "sha256": "a3b424bc7b0066c5e23610edf5bf4634afb73c4db29be9aae972b998e7f2a94b",
    "canonicalNameAr": "خبز الزنجبيل",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "6660d5130e1b61ddb96a1aa219a0c2883b7fc70415a8abc9fe2e3981980c69fb",
    "perceptualHash": "000e076155170e00",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 25044,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "khbz-mhms": {
    "canonicalKey": "khbz-mhms",
    "canonicalNameEn": "Toast",
    "positiveDescription": "Two golden brown toasted sliced-bread pieces, crisp browned surfaces, no toppings.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity khbz-mhms, exact ingredient Toast. Two golden brown toasted sliced-bread pieces, crisp browned surfaces, no toppings. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-d3ebf972-b36d-49ae-bd11-d544d06e3370",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/khbz-mhms.webp",
    "noteKey": "khbz-mhms",
    "noteAssetId": "origo-note-khbz-mhms",
    "sha256": "3dcc8607d2e50c2fa268dcd813a1a9dac74c57e62c48ee572ee7ca0015298ad0",
    "canonicalNameAr": "خبز محمص",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "8bc15e42e4bf48d8075691def9b835103c89e3638cc85d415ce6eb3c8e6f711c",
    "perceptualHash": "010303436b6d4f0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 26322,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "rshat": {
    "canonicalKey": "rshat",
    "canonicalNameEn": "Sprinkles",
    "positiveDescription": "A small heap of tiny multicolored cylindrical confectionery sugar sprinkles.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity rshat, exact ingredient Sprinkles. A small heap of tiny multicolored cylindrical confectionery sugar sprinkles. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-a4270336-1777-4630-8429-b0ae0c19bd2a",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/rshat.webp",
    "noteKey": "rshat",
    "noteAssetId": "origo-note-rshat",
    "sha256": "24132a95cc394180b98b4f5cb248bb2bdb540ea5a12bdb296bb4680168c504a6",
    "canonicalNameAr": "رشّات",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "971e37d9853dad5074ae0ca34dca479aa4010013218694591ab90f372cba9fae",
    "perceptualHash": "0607032309170f07",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 20432,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "zbdh-alfwl-alswdany": {
    "canonicalKey": "zbdh-alfwl-alswdany",
    "canonicalNameEn": "Peanut butter",
    "positiveDescription": "A thick tan peanut butter dollop with smooth swirled ridges and slightly grainy peanut texture; no peanuts, no jar.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity zbdh-alfwl-alswdany, exact ingredient Peanut butter. A thick tan peanut butter dollop with smooth swirled ridges and slightly grainy peanut texture; no peanuts, no jar. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-2bfaf490-4c02-4ba3-8c84-2940f4322186",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/zbdh-alfwl-alswdany.webp",
    "noteKey": "zbdh-alfwl-alswdany",
    "noteAssetId": "origo-note-zbdh-alfwl-alswdany",
    "sha256": "b8dd6da408292b6578369a74c9c767f1dedf512a07aaab706980f8675e16c96d",
    "canonicalNameAr": "زبدة الفول السوداني",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "055b669d9322cdf5bd0c340a465157aed8b835ca517038a7df7bd257ff09a6a6",
    "perceptualHash": "06172313070b071c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 19812,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "zbdh-alkakaw": {
    "canonicalKey": "zbdh-alkakaw",
    "canonicalNameEn": "Cocoa butter",
    "positiveDescription": "Several pale ivory solid cocoa butter chunks, waxy texture, broken irregular edges; no chocolate or cocoa beans.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity zbdh-alkakaw, exact ingredient Cocoa butter. Several pale ivory solid cocoa butter chunks, waxy texture, broken irregular edges; no chocolate or cocoa beans. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-d2ec060c-574d-4f43-85a7-e59ce17cd76d",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/zbdh-alkakaw.webp",
    "noteKey": "zbdh-alkakaw",
    "noteAssetId": "origo-note-zbdh-alkakaw",
    "sha256": "614da3aa3ec3237860f867d5496b93cdf53ee3402e1f9738536c8201555a9f4e",
    "canonicalNameAr": "زبدة الكاكاو",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "5c86af1cf6cbc45f90b524709efc4814c9063f1b226d6c12020fbca91aa4e58d",
    "perceptualHash": "0703070d0b090707",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 15130,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "zbdh-mmlhh": {
    "canonicalKey": "zbdh-mmlhh",
    "canonicalNameEn": "Salted butter",
    "positiveDescription": "A pale yellow butter block with a soft butter curl and a few coarse salt crystals on its surface.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity zbdh-mmlhh, exact ingredient Salted butter. A pale yellow butter block with a soft butter curl and a few coarse salt crystals on its surface. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-85717630-4aea-496c-8beb-2f69c18b3e04",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/zbdh-mmlhh.webp",
    "noteKey": "zbdh-mmlhh",
    "noteAssetId": "origo-note-zbdh-mmlhh",
    "sha256": "fd86a65d3bac5e1e549fdd79cf079c3431a5330054591663a000a79b06fa96f6",
    "canonicalNameAr": "زبدة مملحة",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "de478b20c1f312802a92ca31273045ddb57e7fe0cc9674eb6430da05a2465664",
    "perceptualHash": "060303311133070e",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 11614,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "sbykwlws": {
    "canonicalKey": "sbykwlws",
    "canonicalNameEn": "Speculoos",
    "positiveDescription": "Three thin rectangular caramel brown speculoos biscuits with embossed decorative relief, one snapped showing crisp interior; no lettering.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity sbykwlws, exact ingredient Speculoos. Three thin rectangular caramel brown speculoos biscuits with embossed decorative relief, one snapped showing crisp interior; no lettering. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-6aa993b5-afe5-4aca-9efd-cc9c942996e8",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/sbykwlws.webp",
    "noteKey": "sbykwlws",
    "noteAssetId": "origo-note-sbykwlws",
    "sha256": "af5bfb9b37c66540912e54e1556e946de4e1f4e50c5973fe5e997d2c0a38dcc3",
    "canonicalNameAr": "سبيكولوس",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "34ec6d563368d895beb3c4ea02d3cf568449f88e45b7478298baed1d5685dc73",
    "perceptualHash": "000607375f5d7300",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 22010,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "skr-bwdrh": {
    "canonicalKey": "skr-bwdrh",
    "canonicalNameEn": "Powdered sugar",
    "positiveDescription": "A compact small mound of brilliant white fine confectioners powdered sugar, soft powder texture, no cubes, no bowl.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity skr-bwdrh, exact ingredient Powdered sugar. A compact small mound of brilliant white fine confectioners powdered sugar, soft powder texture, no cubes, no bowl. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-bda0e011-5908-4c11-9160-a33c366b50ba",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/skr-bwdrh.webp",
    "noteKey": "skr-bwdrh",
    "noteAssetId": "origo-note-skr-bwdrh",
    "sha256": "87d64d38e64f8720b8b2cf2109820dfb5f4d8473599036e39597df6d4fa548c5",
    "canonicalNameAr": "سكر بودرة",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "426a79cc555932ccd091ec8538af3e9d3cb6e6678b730e18c2ba35c379141607",
    "perceptualHash": "000c0707070e0c00",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 15080,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "skwn": {
    "canonicalKey": "skwn",
    "canonicalNameEn": "Scone",
    "positiveDescription": "A plain round golden British scone, one torn half revealing pale crumb. No raisins, jam or cream.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity skwn, exact ingredient Scone. A plain round golden British scone, one torn half revealing pale crumb. No raisins, jam or cream. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-48230765-d7c2-4a1c-ae63-f6bcd366c7be",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/skwn.webp",
    "noteKey": "skwn",
    "noteAssetId": "origo-note-skwn",
    "sha256": "cac74e3e6ff713ef5d1d710d13cfff7b438c27cdf4698d5f2255fce0f5a33c3c",
    "canonicalNameAr": "سكون",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "45274c116effd8fe941ab2ea45c96e8c7253181ed347a96ef85edcee4ea4ff2c",
    "perceptualHash": "0003274797276700",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 19764,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "smwrz-alfrawlh": {
    "canonicalKey": "smwrz-alfrawlh",
    "canonicalNameEn": "Strawberry smores",
    "positiveDescription": "One strawberry smore sandwich: square graham crackers enclosing toasted marshmallow, chocolate and visible thin strawberry slices; these are integral filling, no loose garnish.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity smwrz-alfrawlh, exact ingredient Strawberry smores. One strawberry smore sandwich: square graham crackers enclosing toasted marshmallow, chocolate and visible thin strawberry slices; these are integral filling, no loose garnish. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-93e94305-133e-488b-882e-4160439467fe",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/smwrz-alfrawlh.webp",
    "noteKey": "smwrz-alfrawlh",
    "noteAssetId": "origo-note-smwrz-alfrawlh",
    "sha256": "2fc9ed650b0ae6f0f859210ca2de30433ea614deff6a6dc77ef892c3e955e766",
    "canonicalNameAr": "سمورز الفراولة",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "348af56b1ad1926aad80bc2640d8abd003a43497c550e2d5a61bd5447bfb91e2",
    "perceptualHash": "00062713710f0e00",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 22204,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "ajynh-altart": {
    "canonicalKey": "ajynh-altart",
    "canonicalNameEn": "Tart dough",
    "positiveDescription": "Raw shortcrust tart pastry dough, pale beige round disk with a small cut section revealing dense unbaked texture. No filling, no baked pie.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity ajynh-altart, exact ingredient Tart dough. Raw shortcrust tart pastry dough, pale beige round disk with a small cut section revealing dense unbaked texture. No filling, no baked pie. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-2fa022d1-7458-4417-9b59-901f768b7246",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/ajynh-altart.webp",
    "noteKey": "ajynh-altart",
    "noteAssetId": "origo-note-ajynh-altart",
    "sha256": "19c0226e6bef1e0da10711418ba3ceb77a68a0b93bfa52aa365ab8af31ae25e6",
    "canonicalNameAr": "عجينة التارت",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "8b948268be4b45e77c15da41089cdf78dfc156aeee450f84c25ad1026bdfa73d",
    "perceptualHash": "000c0d310639230f",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 13578,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "ajynh-alkwkyz": {
    "canonicalKey": "ajynh-alkwkyz",
    "canonicalNameEn": "Cookie dough",
    "positiveDescription": "Two scoops of raw chocolate-chip cookie dough with clearly visible embedded small chocolate chips. No baked cookies.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity ajynh-alkwkyz, exact ingredient Cookie dough. Two scoops of raw chocolate-chip cookie dough with clearly visible embedded small chocolate chips. No baked cookies. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-190d4e2b-e48c-4452-9afb-5d8f5d6794cb",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/ajynh-alkwkyz.webp",
    "noteKey": "ajynh-alkwkyz",
    "noteAssetId": "origo-note-ajynh-alkwkyz",
    "sha256": "8b14142cf63288d6b8ea4eeee16f47be73ad56522938078de0af1a261c4ad9eb",
    "canonicalNameAr": "عجينة الكوكيز",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "3509ac27402e646bfb20ddc890d1c5cf85982f07106899e5a7c219251376b3b3",
    "perceptualHash": "030f0f153f2e2e1c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 20336,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "ajynh-bf-bastry": {
    "canonicalKey": "ajynh-bf-bastry",
    "canonicalNameEn": "Puff pastry dough",
    "positiveDescription": "Raw laminated puff pastry dough folded rectangular block with a cut edge showing numerous thin layers. Unbaked pale dough, no cooked pastry.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity ajynh-bf-bastry, exact ingredient Puff pastry dough. Raw laminated puff pastry dough folded rectangular block with a cut edge showing numerous thin layers. Unbaked pale dough, no cooked pastry. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-a818cad7-26c7-44f4-a00f-d93c34ba0c37",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/ajynh-bf-bastry.webp",
    "noteKey": "ajynh-bf-bastry",
    "noteAssetId": "origo-note-ajynh-bf-bastry",
    "sha256": "a0d59b6c85386e22525fd00966b182870a5e00a8366526d2d845c94282223520",
    "canonicalNameAr": "عجينة بف باستري",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "c6f169f697436dce9028e27c2290394c54a820ce8d362fd5114ab8996f68dec7",
    "perceptualHash": "00030359201f1000",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 13090,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "ghzl-albnat": {
    "canonicalKey": "ghzl-albnat",
    "canonicalNameEn": "Cotton candy",
    "positiveDescription": "A fluffy pale pink cloud of cotton candy, visibly delicate spun sugar threads, no stick.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity ghzl-albnat, exact ingredient Cotton candy. A fluffy pale pink cloud of cotton candy, visibly delicate spun sugar threads, no stick. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-6c1f5d86-f64f-49e3-a323-0610d512669f",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/ghzl-albnat.webp",
    "noteKey": "ghzl-albnat",
    "noteAssetId": "origo-note-ghzl-albnat",
    "sha256": "aa0d45bac1f1c1bb272a9fcc5c8b6e6a4c2d96aafee3ac8f535d93299d1e0f60",
    "canonicalNameAr": "غزل البنات",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "bb7f2f68a4dc2445362bdaa927f0ce4792feeda5cf54b302ebdd3493207b8e0a",
    "perceptualHash": "0407032113130f0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 19728,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "ftyrh-altfah": {
    "canonicalKey": "ftyrh-altfah",
    "canonicalNameEn": "Apple pie",
    "positiveDescription": "A slice of baked apple pie with golden lattice crust and clearly visible cooked apple slices inside. No whole apples or garnish.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity ftyrh-altfah, exact ingredient Apple pie. A slice of baked apple pie with golden lattice crust and clearly visible cooked apple slices inside. No whole apples or garnish. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-181ab965-19de-4bf4-bec7-a162909d862d",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/ftyrh-altfah.webp",
    "noteKey": "ftyrh-altfah",
    "noteAssetId": "origo-note-ftyrh-altfah",
    "sha256": "e352b05030973d45361f65d35c64cf4da5833078a05a8db0b9d7a3d6674cc631",
    "canonicalNameAr": "فطيرة التفاح",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "785bc914c5661f5f788df80f00daa15ddde99f5332972335d835d926a9c39ddc",
    "perceptualHash": "0001050d73671e0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 21644,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "ftyrh-alyqtyn": {
    "canonicalKey": "ftyrh-alyqtyn",
    "canonicalNameEn": "Pumpkin pie",
    "positiveDescription": "A slice of pumpkin pie with smooth orange pumpkin custard filling and golden shortcrust edge. No cream topping or pumpkin garnish.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO fragrance note identity ftyrh-alyqtyn, exact ingredient Pumpkin pie. A slice of pumpkin pie with smooth orange pumpkin custard filling and golden shortcrust edge. No cream topping or pumpkin garnish. Photorealistic square isolated cutout on genuine transparent alpha background, centered, generous transparent margins. No plate, bowl, utensils, text, watermark, people, bottles, scenery, packaging or unrelated ingredients. The named ingredient only.",
    "sourceImageId": "exec-19d2788c-cbf0-4a94-9415-05aadd02c3b7",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/ftyrh-alyqtyn.webp",
    "noteKey": "ftyrh-alyqtyn",
    "noteAssetId": "origo-note-ftyrh-alyqtyn",
    "sha256": "b95c219b3acfc392e135d4ce419f692c93f6f6bdf7fc6f36529e3d92432aa15c",
    "canonicalNameAr": "فطيرة اليقطين",
    "visualReview": "Reviewed reports/batch42-review.jpg against the locked prompt: named food, raw/baked state, texture and integral filling match; no lettering, packaging, scenery or unrelated garnish.",
    "contentHash": "5957b0fedf230b03c0e8fea4c3a9948070f9e3b3b03006e5275776555569fa5d",
    "perceptualHash": "0001013b37160c0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 18184,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-aljyly-byn": {
    "canonicalKey": "hlwy-aljyly-byn",
    "canonicalNameEn": "Jelly beans",
    "positiveDescription": "Small glossy bean-shaped jelly bean candies in several colors.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-aljyly-byn: Jelly beans. Subject: Small glossy bean-shaped jelly bean candies in several colors. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-714ce651-c74f-4fa8-ab1a-33992b3c0a90",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-aljyly-byn.webp",
    "noteKey": "hlwy-aljyly-byn",
    "noteAssetId": "origo-note-hlwy-aljyly-byn",
    "sha256": "4bf82feaf2a66b8d74ff71feb678283c3cb11ba7b6fa46a35dafbdc7f6680f62",
    "canonicalNameAr": "حلوى الجيلي بين",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "5fdc91535a5fcc214129f35db38751c480ec96e829f016fd65ede3af611f26fb",
    "perceptualHash": "0016175131191d2c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 14862,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-alhlyb": {
    "canonicalKey": "hlwy-alhlyb",
    "canonicalNameEn": "Milk candy",
    "positiveDescription": "Creamy white milk candy chews, small rectangular pieces with milky matte surface.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-alhlyb: Milk candy. Subject: Creamy white milk candy chews, small rectangular pieces with milky matte surface. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-e281b876-11e7-4c6d-9062-7f4c2577f74b",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-alhlyb.webp",
    "noteKey": "hlwy-alhlyb",
    "noteAssetId": "origo-note-hlwy-alhlyb",
    "sha256": "2efdb66b924a7ec2edafa6c3bea946ae9e871bb8999abddf5e42fcca44b5d6d9",
    "canonicalNameAr": "حلوى الحليب",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "6e6a7e7c06abe7451883bacaa6c60e76bd5e8e240fa9a8b43f0788471b04b810",
    "perceptualHash": "030b0b250d090706",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 9316,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-alfrawlh-alfwarh": {
    "canonicalKey": "hlwy-alfrawlh-alfwarh",
    "canonicalNameEn": "Fizzy strawberry candy",
    "positiveDescription": "Red strawberry-shaped fizzy candy pieces covered with visible fine sour sugar crystals.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-alfrawlh-alfwarh: Fizzy strawberry candy. Subject: Red strawberry-shaped fizzy candy pieces covered with visible fine sour sugar crystals. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-e9e3577c-299a-41a5-9cda-5a77f6788930",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-alfrawlh-alfwarh.webp",
    "noteKey": "hlwy-alfrawlh-alfwarh",
    "noteAssetId": "origo-note-hlwy-alfrawlh-alfwarh",
    "sha256": "63a0d72176332a23dce75d06b6fe9535387bde02c2f8507a13f089b04f3b9ee9",
    "canonicalNameAr": "حلوى الفراولة الفوارة",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "75f44d5945e3fe63d925e84f2ad21b537d514075e1f674b1dbed09ec569653ab",
    "perceptualHash": "000c1f177b5dcd0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 26718,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-alkramyl-almmlh": {
    "canonicalKey": "hlwy-alkramyl-almmlh",
    "canonicalNameEn": "Salted caramel candy",
    "positiveDescription": "Golden soft caramel cubes topped with a few coarse white salt crystals.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-alkramyl-almmlh: Salted caramel candy. Subject: Golden soft caramel cubes topped with a few coarse white salt crystals. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-f6d703f7-35b2-49ef-b77a-a75f88dafc29",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-alkramyl-almmlh.webp",
    "noteKey": "hlwy-alkramyl-almmlh",
    "noteAssetId": "origo-note-hlwy-alkramyl-almmlh",
    "sha256": "3a4d703d1c0fef0d02e92dc381b575b3ae9d6df71f1925ebe9e6b8dd3fba3be2",
    "canonicalNameAr": "حلوى الكراميل المملح",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "80136d29c027692e2837aac5ae37b8a8fe594d5f4f60390b40da6b6fdced4baa",
    "perceptualHash": "000e1723131b070e",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 16284,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-starbrst": {
    "canonicalKey": "hlwy-starbrst",
    "canonicalNameEn": "Starburst candy",
    "positiveDescription": "Unwrapped square fruit chew candies in red pink orange yellow, characteristic soft square shape. No wrappers or logos.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-starbrst: Starburst candy. Subject: Unwrapped square fruit chew candies in red pink orange yellow, characteristic soft square shape. No wrappers or logos. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-6bac4f44-4f26-41eb-95f4-7a515b35da94",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-starbrst.webp",
    "noteKey": "hlwy-starbrst",
    "noteAssetId": "origo-note-hlwy-starbrst",
    "sha256": "920f3e5aba3a0a769e0ef98645a639ec70759064dd9718a6c649dd78d5989530",
    "canonicalNameAr": "حلوى ستاربرست",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "d34ad4d53901c7e681a66b0fb61cd256c01a82b442fbced93c4df3bdca4f6db8",
    "perceptualHash": "000a13333b334b00",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 15578,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-albrtqal": {
    "canonicalKey": "hlwy-albrtqal",
    "canonicalNameEn": "Orange candy",
    "positiveDescription": "Orange-flavored hard candy orange wedges, translucent orange color with citrus-segment molding.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-albrtqal: Orange candy. Subject: Orange-flavored hard candy orange wedges, translucent orange color with citrus-segment molding. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-eaa7fc4b-2097-4fc1-a3f9-eb985048ba8b",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-albrtqal.webp",
    "noteKey": "hlwy-albrtqal",
    "noteAssetId": "origo-note-hlwy-albrtqal",
    "sha256": "279378c432b7be50b649e4b15201d4bda669aee08e7c309319fce5255d3acdcd",
    "canonicalNameAr": "حلوي البرتقال",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "e231b674c64929ecfaafd57d6f80331d79c95d718d3fed4de5f4490291257df7",
    "perceptualHash": "000c0f651b2f0c0c",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 15272,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-altyramysw": {
    "canonicalKey": "hlwy-altyramysw",
    "canonicalNameEn": "Tiramisu",
    "positiveDescription": "A single square slice of tiramisu, cocoa dusting, mascarpone layers and coffee-soaked ladyfinger layers.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-altyramysw: Tiramisu. Subject: A single square slice of tiramisu, cocoa dusting, mascarpone layers and coffee-soaked ladyfinger layers. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-fdd8efa7-571c-4988-8ecc-8ad85a65d706",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-altyramysw.webp",
    "noteKey": "hlwy-altyramysw",
    "noteAssetId": "origo-note-hlwy-altyramysw",
    "sha256": "dde174298c1426b2c42c0600a45a016700d0cc68378bca64a02c0985a17a77d2",
    "canonicalNameAr": "حلوي التيراميسو",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "f249d68f853c3bc3fbd0869852e3a9a41ca57e0b1454cc51220fd64c4287ee44",
    "perceptualHash": "000e071f71351f18",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 26040,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-alhlqwm": {
    "canonicalKey": "hlwy-alhlqwm",
    "canonicalNameEn": "Turkish delight",
    "positiveDescription": "Rose-colored Turkish delight cubes dusted with powdered sugar, one cut cube showing soft translucent pink interior. No nuts.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-alhlqwm: Turkish delight. Subject: Rose-colored Turkish delight cubes dusted with powdered sugar, one cut cube showing soft translucent pink interior. No nuts. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-86add174-3263-4918-b171-b9dd24521149",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-alhlqwm.webp",
    "noteKey": "hlwy-alhlqwm",
    "noteAssetId": "origo-note-hlwy-alhlqwm",
    "sha256": "e342b78b7f3003cfade0e447aaccfc9b116c65abf7d69d07ac449873b49f8c79",
    "canonicalNameAr": "حلوي الحلقوم",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "308135b7b68664ecbc77eed70fc8feaf9bdf60d22800d09a7413564e0f116e76",
    "perceptualHash": "000e060fc51f1b20",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 21190,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-alshw": {
    "canonicalKey": "hlwy-alshw",
    "canonicalNameEn": "Choux pastry",
    "positiveDescription": "Three golden choux cream puffs, one cut open to show pale pastry cream.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-alshw: Choux pastry. Subject: Three golden choux cream puffs, one cut open to show pale pastry cream. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-3fb4c0d6-5327-4313-8f13-3bdafb6f5269",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-alshw.webp",
    "noteKey": "hlwy-alshw",
    "noteAssetId": "origo-note-hlwy-alshw",
    "sha256": "830240a2dbea11835841c87ff2f8e10d4d5b97d0b0ee3bdb1084f358293f5208",
    "canonicalNameAr": "حلوي الشو",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "71024a5902f4c18cf3f3bf4a25b2a1db4077ea4f77312787c7463acc8d400805",
    "perceptualHash": "00232743733b1708",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 20862,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-alkwlfy": {
    "canonicalKey": "hlwy-alkwlfy",
    "canonicalNameEn": "Kulfi",
    "positiveDescription": "Traditional plain milk kulfi, dense ivory frozen tapered cylinder with one cut slice. No nuts garnish, no stick.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-alkwlfy: Kulfi. Subject: Traditional plain milk kulfi, dense ivory frozen tapered cylinder with one cut slice. No nuts garnish, no stick. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-75d9f383-a5e9-4ea7-9b80-918237725b35",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-alkwlfy.webp",
    "noteKey": "hlwy-alkwlfy",
    "noteAssetId": "origo-note-hlwy-alkwlfy",
    "sha256": "9f25eac877df7831b3ef01f6b87888258de2398a30d70d80d2e5eec55bd382ad",
    "canonicalNameAr": "حلوي الكولفي",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "872bf42e263524afb8179fd716b6c669b58032df6d00e047be4b36c0400efdf1",
    "perceptualHash": "000101010d040201",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 11998,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-almarzyban": {
    "canonicalKey": "hlwy-almarzyban",
    "canonicalNameEn": "Marzipan",
    "positiveDescription": "Ivory almond marzipan log with two cut slices showing dense smooth almond paste.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-almarzyban: Marzipan. Subject: Ivory almond marzipan log with two cut slices showing dense smooth almond paste. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-b4500a78-f351-44b0-8ec2-7265ed5c302c",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-almarzyban.webp",
    "noteKey": "hlwy-almarzyban",
    "noteAssetId": "origo-note-hlwy-almarzyban",
    "sha256": "2ab7ebbb7d2672540fa0b1ea1b611bc7d02d4eb7336a4e3a4aada44f54b034df",
    "canonicalNameAr": "حلوي المارزيبان",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "d954cda9af6f3aa6218215bfb572cf785f2fe88d0f0585bfb5128498c8435173",
    "perceptualHash": "0001030d096f3e38",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 10526,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "hlwy-kwnfyty-allwz-almskr": {
    "canonicalKey": "hlwy-kwnfyty-allwz-almskr",
    "canonicalNameEn": "Sugar coated almonds",
    "positiveDescription": "Pastel sugar-coated almond dragees, one broken open revealing actual almond kernel.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity hlwy-kwnfyty-allwz-almskr: Sugar coated almonds. Subject: Pastel sugar-coated almond dragees, one broken open revealing actual almond kernel. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-634ed2af-0db9-4a29-9564-b5081440be35",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/hlwy-kwnfyty-allwz-almskr.webp",
    "noteKey": "hlwy-kwnfyty-allwz-almskr",
    "noteAssetId": "origo-note-hlwy-kwnfyty-allwz-almskr",
    "sha256": "f06f4d1e420b76f127b7c92cf2c6746ac9fd5b95b1bcd1b443415ba223d00edf",
    "canonicalNameAr": "حلوي كونفيتي (اللوز المسكر)",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "d4c9caaa3d8de3fad4361e56d5587421ac19e1149685be0c59eb7e49835070a6",
    "perceptualHash": "03030d09112d0909",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 11372,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "khbz-albaghyt": {
    "canonicalKey": "khbz-albaghyt",
    "canonicalNameEn": "Baguette",
    "positiveDescription": "A short section of French baguette with diagonal scoring and two slices showing airy crumb.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity khbz-albaghyt: Baguette. Subject: A short section of French baguette with diagonal scoring and two slices showing airy crumb. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-093cc128-27e4-430f-814b-a3cdf6f3d538",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/khbz-albaghyt.webp",
    "noteKey": "khbz-albaghyt",
    "noteAssetId": "origo-note-khbz-albaghyt",
    "sha256": "455967b8d7ee7667069e85619eab004bd9f27f5c12b8d22664751a7d68a40a02",
    "canonicalNameAr": "خبز الباغيت",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "bf574556727fd494bd8637dcb7c7eb8910fe2781de5d7dee3c61ae1a68973bf1",
    "perceptualHash": "0003030f5f030500",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 21104,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "khbz-albrywsh": {
    "canonicalKey": "khbz-albrywsh",
    "canonicalNameEn": "Brioche",
    "positiveDescription": "Golden glossy brioche bread with rounded lobes and a torn piece revealing soft buttery yellow crumb.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity khbz-albrywsh: Brioche. Subject: Golden glossy brioche bread with rounded lobes and a torn piece revealing soft buttery yellow crumb. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-b8d23420-d4bd-47a1-b332-0d0e7f09441f",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/khbz-albrywsh.webp",
    "noteKey": "khbz-albrywsh",
    "noteAssetId": "origo-note-khbz-albrywsh",
    "sha256": "8dc83479ab7df52c5aa6ea94e4c51812aec6c5a01b6f24396979c40b1021312d",
    "canonicalNameAr": "خبز البريوش",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "6934dab65da6454f3b8f49eef511c0c5c3183ecca5680b421cdf4b67ad01363f",
    "perceptualHash": "03001b336d65130f",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 25754,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "khbz-almwz": {
    "canonicalKey": "khbz-almwz",
    "canonicalNameEn": "Banana bread",
    "positiveDescription": "Banana bread loaf segment with two moist brown slices, no garnish or other ingredients.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity khbz-almwz: Banana bread. Subject: Banana bread loaf segment with two moist brown slices, no garnish or other ingredients. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-2841a13f-8cf0-46b1-bf76-075d654a2acd",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/khbz-almwz.webp",
    "noteKey": "khbz-almwz",
    "noteAssetId": "origo-note-khbz-almwz",
    "sha256": "8d312492f2515e4b981964b22bb1e3a49837d48a6b0a0f4c4c2f0192f982bc72",
    "canonicalNameAr": "خبز الموز",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "dd8ce4c8581cebc8b0d505c524826d20e4905e5fc5d1a4b1da802298f28a7180",
    "perceptualHash": "02070319230f0c08",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 26320,
      "alphaExtrema": [
        0,
        255
      ]
    }
  },
  "dwrayaky": {
    "canonicalKey": "dwrayaky",
    "canonicalNameEn": "Dorayaki",
    "positiveDescription": "Japanese dorayaki pancake sandwich, one whole and one cut revealing dark red bean paste filling.",
    "scientificName": null,
    "entityType": "food",
    "plantPart": "other",
    "generationPrompt": "Use case: product-mockup. ORIGO note icon. Identity dwrayaky: Dorayaki. Subject: Japanese dorayaki pancake sandwich, one whole and one cut revealing dark red bean paste filling. Photorealistic isolated food cutout centered in a square, generous transparent margin. Actual transparent alpha background. No plate, utensils, packaging, text, watermark, people, bottles, backdrop, or unrelated ingredients. Exact named food only.",
    "sourceImageId": "exec-5649fd7e-f188-4d26-8315-3366a8f0c478",
    "validated": true,
    "status": "VALID",
    "imageUrl": "assets/notes/generated/dwrayaky.webp",
    "noteKey": "dwrayaky",
    "noteAssetId": "origo-note-dwrayaky",
    "sha256": "923f78ee76ebc3591af0f53b5082a717cfddb46360ed4e76ddfcff936be9196b",
    "canonicalNameAr": "دوراياكي",
    "visualReview": "Reviewed in reports/batch41-review.jpg: exact named food form and characteristic interior/texture match the locked prompt; no conflicting ingredients, lettering, packaging or scenery.",
    "contentHash": "d8bee6b892fdf41610636ab7b39976ead4f7f5c52db0f56e089895e2be4e7bbb",
    "perceptualHash": "000111373f0e1800",
    "technicalReview": {
      "width": 320,
      "height": 320,
      "bytes": 16194,
      "alphaExtrema": [
        0,
        255
      ]
    }
  }
});
  const botanicalDefaults = Object.freeze({
    allym: { scientificName:null, entityType:'botanical', plantPart:'fruit' },
    'allymwn-alkafyr': { scientificName:null, entityType:'botanical', plantPart:'fruit' },
    'qshr-albrtqal': { scientificName:null, entityType:'botanical', plantPart:'peel' },
    'awraq-altyn': { scientificName:'Ficus carica', entityType:'botanical', plantPart:'leaf' },
    'awraq-albnfsj': { scientificName:null, entityType:'botanical', plantPart:'leaf' },
    'awraq-alarz': { scientificName:null, entityType:'botanical', plantPart:'leaf' },
    'thmar-alwrd': { scientificName:null, entityType:'botanical', plantPart:'fruit' },
    bergamot: { scientificName: 'Citrus bergamia', entityType: 'botanical', plantPart: 'fruit' },
    pear: { scientificName: 'Pyrus communis', entityType: 'botanical', plantPart: 'fruit' },
    apple: { scientificName: 'Malus domestica', entityType: 'botanical', plantPart: 'fruit' },
    rose: { scientificName: null, entityType: 'botanical', plantPart: 'flower' },
    jasmine: { scientificName: null, entityType: 'botanical', plantPart: 'flower' },
    'orange-blossom': { scientificName: null, entityType: 'botanical', plantPart: 'flower' },
    cedar: { scientificName: null, entityType: 'botanical', plantPart: 'wood' },
    sandalwood: { scientificName: null, entityType: 'botanical', plantPart: 'wood' },
    vanilla: { scientificName: null, entityType: 'botanical', plantPart: 'pod' },
    fig: { scientificName: 'Ficus carica', entityType: 'botanical', plantPart: 'fruit' }
  });
  const exactNameAliases = Object.freeze({
    'Lime':'allym', 'Kaffir Lime':'allymwn-alkafyr', 'Orange Peel':'qshr-albrtqal',
    'Fig Leaf':'awraq-altyn', 'Violet Leaf':'awraq-albnfsj', 'Cedar Leaf':'awraq-alarz',
    'Rose Hip':'thmar-alwrd', 'Taif Rose':'wrd-tayfy', 'White Flower':'white-flowers',
    'Orange Fruit':'orange', 'Fig Fruit':'fig', 'Violet Flower':'violet',
    'Blackcurrant Fruit':'black-currant'
  });
  const rejectedAliases = new Set([
    'Taif Rose', 'ورد طائفي', 'Rosa', 'Orris', 'Iris root', 'جذر السوسن',
    'Suede', 'جلد سويدي', 'Citrus Aurantium', 'Citron', 'Pomelo', 'Tangerine',
    'Clary sage', 'Black tea', 'Green tea', 'Cocoa', 'كاكاو', 'Green apple',
    'Black cherry', 'Fig leaf', 'Pepper', 'Frankincense', 'Olibanum', 'لبان',
    'Blue Ginger', 'Nigerian Ginger', 'Mahonia accord', 'Ambrette Musk'
  ].map(normalize));

  function validateNoteImage(note, asset = reviewedAssets[note?.canonicalKey || note?.slug]) {
    const canonicalKey = note?.canonicalKey || note?.slug;
    if (!note?.image) return { valid: false, status: 'MISSING_IMAGE' };
    const canonicalLocalImage = generatedImageFor(canonicalKey);
    if (!asset && canonicalLocalImage && note.image === canonicalLocalImage) {
      return { valid:true, status:'VALID', provenance:'canonical_local' };
    }
    if (!asset) return { valid: false, status: 'NEEDS_REVIEW' };
    if (asset.noteKey !== canonicalKey || asset.imageUrl !== note.image || asset.plantPart !== note.plantPart
      || asset.entityType !== note.entityType || asset.scientificName !== note.scientificName) {
      return { valid: false, status: 'WRONG_MAPPING' };
    }
    if (asset !== reviewedAssets[canonicalKey] || !asset.visualReview || !asset.sha256 || !asset.noteAssetId) {
      return { valid: false, status: 'NEEDS_REVIEW' };
    }
    const ownership = validateAssetOwnership(asset, Object.values(reviewedAssets));
    if (!ownership.valid) return ownership;
    return { valid: true, status: 'VALID' };
  }

  function validateAssetOwnership(asset, registry) {
    const identityFields = ['noteAssetId', 'imageUrl', 'sha256', 'contentHash', 'sourceImageId', 'perceptualHash'];
    for (const existing of registry) {
      if (existing.noteKey === asset.noteKey) continue;
      if (identityFields.some(field => asset[field] && asset[field] === existing[field])) {
        return { valid:false, status:'DUPLICATE_IMAGE_ACROSS_NOTES' };
      }
    }
    return { valid:true, status:'VALID' };
  }

  function generationSpec(note) {
    const identity = typeof note === 'string' ? find(note) : notesBySlug.get(note?.canonicalKey || note?.slug);
    if (!identity || identity.plantPart === 'ambiguous') throw new Error('NOTE_REPRESENTATION_NEEDS_REVIEW');
    return Object.freeze({ canonicalKey: identity.canonicalKey, canonicalNameAr: identity.nameAr,
      canonicalNameEn: identity.nameEn, scientificName: identity.scientificName,
      entityType: identity.entityType, plantPart: identity.plantPart,
      positiveDescription: `${identity.nameEn}; ${identity.scientificName || ''}; exact part: ${identity.plantPart}`,
      negativeDescription: 'No other ingredient, no alternative plant part, no text, no people, no bottle; transparent alpha.' });
  }

  function originalDescription(note, family, language) {
    if (language === "ar") {
      return `${note.nameAr} مكوّن ضمن عائلة ${family.nameAr}. يضيف إلى البناء العطري طابعًا ${family.position === "top" ? "مشرقًا في الافتتاحية" : family.position === "heart" ? "واضحًا في القلب" : family.position === "base" ? "عميقًا في القاعدة" : "مرنًا عبر طبقات العطر"} بحسب التركيبة والتركيز.`;
    }
    return `${note.nameEn} belongs to the ${family.nameEn} family. It can bring a ${family.position === "top" ? "bright opening" : family.position === "heart" ? "distinctive heart" : family.position === "base" ? "deep dry-down" : "flexible character across the composition"}, depending on formula and concentration.`;
  }

  function rebuild() {
    families = knowledge.categories.map((category) => {
      const blueprint = familyBlueprints[category.id] || familyBlueprints.uncategorized;
      return {
        id: category.id,
        nameAr: category.nameAr,
        nameEn: category.nameEn,
        descriptionAr: category.descriptionAr || "",
        descriptionEn: `${category.nameEn} materials and accords used across fragrance compositions.`,
        ...blueprint
      };
    });
    customState.families.forEach((family) => {
      const index = families.findIndex((item) => item.id === family.id);
      if (index >= 0) families[index] = { ...families[index], ...family };
      else families.push({ ...familyBlueprints.uncategorized, ...family, color: family.color || familyBlueprints.uncategorized.color });
    });

    const curatedIndex = new Map();
    curatedNotes.forEach((note) => {
      [note.nameAr, note.nameEn, ...note.aliases.filter(alias => !rejectedAliases.has(normalize(alias)))].forEach((alias) => curatedIndex.set(normalize(alias), note));
    });

    const result = new Map();
    const sourceIndex = new Map();
    knowledge.categories.forEach((category) => {
      category.ingredients.forEach((ingredient) => {
        const curated = curatedIndex.get(normalize(ingredient));
        const sourceKey = normalize(ingredient);
        const existingSlug = sourceIndex.get(sourceKey);
        if (existingSlug && result.has(existingSlug)) {
          const existing = result.get(existingSlug);
          existing.aliases = [...new Set([...existing.aliases, ingredient])];
          return;
        }
        // Keep the original source spelling when a verified bilingual name is
        // unavailable. This publishes the complete knowledge base without
        // presenting phonetic transliteration as a real translation.
        const sourceIsArabic = /[\u0600-\u06FF]/.test(ingredient);
        const slug = curated?.slug || uniqueSlug(ingredient, category.id, result);
        const translatedNameAr = curated?.nameAr || arabicNameOverrides[slug] || ingredient;
        const hasArabicTranslation = Boolean(curated || arabicNameOverrides[slug] || sourceIsArabic);
        const familyId = curated?.familyId || category.id;
        const family = families.find((item) => item.id === familyId) || families.find((item) => item.id === "uncategorized");
        const existing = result.get(slug);
        if (existing) {
          existing.aliases = [...new Set([...existing.aliases, ingredient])];
          return;
        }
        const note = {
          slug,
          nameAr: translatedNameAr,
          nameEn: curated?.nameEn || ingredient,
          aliases: [...new Set([ingredient, ...(curated?.aliases || [])])],
          familyId,
          position: curated?.position || family?.position || "multiple",
          symbol: curated?.symbol || family?.symbol || "✦",
          image: curated?.image || generatedImageFor(slug),
          defaultIntensity: Number(curated?.defaultIntensity || 3),
          related: curated?.related || [],
          compatible: curated?.compatible || [],
          opposite: curated?.opposite || [],
          generatedTranslation: false,
          translationStatus: hasArabicTranslation ? "verified" : "source-only",
          sourceLanguage: curated || arabicNameOverrides[slug] ? "bilingual" : (sourceIsArabic ? "ar" : "en"),
          sourceName: ingredient
        };
        note.descriptionAr = originalDescription(note, family, "ar");
        note.descriptionEn = originalDescription(note, family, "en");
        result.set(slug, note);
        sourceIndex.set(sourceKey, slug);
      });
    });

    curatedNotes.forEach((curated) => {
      if (result.has(curated.slug)) return;
      const family = families.find((item) => item.id === curated.familyId) || families[0];
      const note = {
        defaultIntensity: 3, related: [], compatible: [], opposite: [],
        ...curated, generatedTranslation: false, translationStatus: "verified", sourceLanguage: "bilingual",
        sourceName: curated.nameAr, image: curated.image || ""
      };
      note.descriptionAr = originalDescription(note, family, "ar");
      note.descriptionEn = originalDescription(note, family, "en");
      result.set(note.slug, note);
    });

    customState.notes.forEach((note) => result.set(note.slug || slugify(note.nameEn || note.nameAr), {
      position: "multiple",
      symbol: "✦",
      image: "",
      aliases: [],
      defaultIntensity: 3,
      related: [],
      compatible: [],
      opposite: [],
      generatedTranslation: false,
      translationStatus: "custom",
      sourceLanguage: "bilingual",
      ...note
    }));
    Object.entries(customState.overrides).forEach(([slug, override]) => {
      if (!result.has(slug)) return;
      result.set(slug, {
        ...result.get(slug),
        ...override,
        slug
      });
    });

    notes = [...result.values()]
      .map((note) => {
        const image = note.image || "";
        const reviewed = reviewedAssets[note.slug];
        const identity = botanicalDefaults[note.slug] || (reviewed
          ? { scientificName:reviewed.scientificName, entityType:reviewed.entityType, plantPart:reviewed.plantPart }
          : { scientificName:null, entityType:'other', plantPart:'ambiguous' });
        const validation = validateNoteImage({ ...note, ...identity, canonicalKey:note.slug });
        return {
          ...note,
          ...identity,
          aliases: (note.aliases || []).filter(alias => !rejectedAliases.has(normalize(alias))),
          canonicalKey: note.slug,
          noteId: note.slug,
          imageKey: note.slug,
          noteAssetId: reviewed?.noteAssetId || null,
          nameEn: reviewed?.canonicalNameEn || note.nameEn,
          imageValidationStatus: validation.status,
          validated: validation.valid,
          image,
          imageStatus: validation.valid ? 'ready' : !image ? 'missing' : 'reference'
        };
      });
    notesBySlug = new Map(notes.map((note) => [note.slug, note]));
    aliasIndex = new Map();
    notes.forEach((note) => {
      [note.slug, note.nameAr, note.nameEn, note.sourceName, ...(note.aliases || [])].forEach((alias) => {
        const key = normalize(alias);
        if (!key) return;
        if (!aliasIndex.has(key)) aliasIndex.set(key, note.slug);
        else if (aliasIndex.get(key) !== note.slug) aliasIndex.set(key, null);
      });
    });
    for (const [name, slug] of Object.entries(exactNameAliases)) {
      if (notesBySlug.has(slug)) aliasIndex.set(normalize(name), slug);
    }
  }

  function familyById(id) {
    return families.find((family) => family.id === id) || families.find((family) => family.id === "uncategorized");
  }

  function find(value) {
    const directSlug = String(value || "").replace(/^\/?notes\//, "").trim();
    if (notesBySlug.has(directSlug)) return notesBySlug.get(directSlug);
    const key = normalize(value);
    if (!key) return null;
    const exact = aliasIndex.get(key);
    if (exact) return notesBySlug.get(exact) || null;
    return null;
  }

  function resolveReference(value) {
    if (typeof value === 'string') return find(value);
    if (!value || typeof value !== 'object') return null;
    const note = find(value.canonicalKey || value.noteId || value.id || value.slug || value.nameEn || value.nameAr);
    if (!note) return null;
    for (const label of [value.nameAr, value.nameEn]) {
      if (label && find(label)?.canonicalKey !== note.canonicalKey) return null;
    }
    return note;
  }

  function search(query, { familyId = "all", imageStatus = "all", limit = 72, offset = 0 } = {}) {
    const key = normalize(query);
    const collator = new Intl.Collator("en", { sensitivity: "base", numeric: true });
    const filtered = notes.filter((note) => {
      if (familyId !== "all" && note.familyId !== familyId) return false;
      if (imageStatus === "available" && note.imageStatus !== "ready") return false;
      if (imageStatus === "reference" && note.imageStatus !== "reference") return false;
      if (imageStatus === "missing" && note.imageStatus !== "missing") return false;
      if (imageStatus === "pending" && note.imageStatus === "ready") return false;
      if (!key) return true;
      return [note.nameAr, note.nameEn, note.sourceName, ...(note.aliases || [])]
        .some((value) => normalize(value).includes(key));
    }).sort((a, b) => {
      const imageOrder = { ready: 0, reference: 1, missing: 2 };
      if (a.imageStatus !== b.imageStatus) return imageOrder[a.imageStatus] - imageOrder[b.imageStatus];
      const familyOrder = families.findIndex((family) => family.id === a.familyId)
        - families.findIndex((family) => family.id === b.familyId);
      if (familyOrder) return familyOrder;
      return collator.compare(a.nameEn || a.nameAr, b.nameEn || b.nameAr);
    });
    return { total: filtered.length, items: filtered.slice(offset, offset + limit) };
  }

  function escapeXML(value) {
    return String(value || "").replace(/[<>&'"]/g, (character) => ({
      "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;"
    })[character]);
  }

  function artwork(note) {
    const canonical = note && typeof note === "object" ? notesBySlug.get(note.canonicalKey || note.noteId || note.slug) : null;
    const canonicalLabelsMatch = canonical && [[note.nameAr, canonical.nameAr], [note.nameEn, canonical.nameEn]]
      .every(([supplied, expected]) => !supplied || normalize(supplied) === normalize(expected));
    const identity = canonicalLabelsMatch ? canonical : resolveReference(note);
    const source = String(note?.image || "").trim();
    const validation = identity ? validateNoteImage({ ...identity, image:source }) : { valid:false, status:'WRONG_MAPPING' };
    const expectedReference = identity ? generatedImageFor(identity.slug) : "";
    const canShowReviewed = validation.valid;
    const canShowCanonicalReference = validation.status === 'NEEDS_REVIEW' && source && source === expectedReference;
    if (canShowReviewed || canShowCanonicalReference) {
      if (/^(?:data:|blob:|https?:|\/\/|\/)/i.test(source)) return source;
      return `/${source.replace(/^\.\//, "")}`;
    }
    const family = familyById(note?.familyId) || familyBlueprints.uncategorized;
    const title = 'صورة النوتة غير متوفرة';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs><radialGradient id="g" cx=".32" cy=".24" r=".9"><stop stop-color="${family.accent}"/><stop offset="1" stop-color="${family.color}"/></radialGradient></defs>
      <rect width="640" height="640" rx="44" fill="url(#g)"/>
      <circle cx="320" cy="280" r="154" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2"/>
      <circle cx="320" cy="280" r="112" fill="rgba(255,255,255,.12)"/>
      <text x="320" y="330" text-anchor="middle" font-size="145" fill="white" font-family="Georgia,serif">?</text>
      <text x="320" y="530" text-anchor="middle" font-size="25" letter-spacing="4" fill="white" font-family="Arial,sans-serif">${title}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function registerUnclassified(value, position = "multiple") {
    const name = String(value || "").trim();
    if (!name || customState.unclassified.some((item) => normalize(item.name) === normalize(name))) return false;
    customState.unclassified.push({ name, position, firstSeenAt: new Date().toISOString() });
    return true;
  }

  function noteValues(product) {
    const structured = product?.notes || {};
    const levels = ["top", "heart", "base"];
    const values = [];
    levels.forEach((position) => {
      const ar = structured[`${position}Ar`] || [];
      const en = structured[`${position}En`] || [];
      const preferred = en.length ? en : ar;
      preferred.forEach((value) => values.push({ value, position }));
    });
    if (!values.length) {
      const preferred = product?.notesEn?.length ? product.notesEn : (product?.notesAr || []);
      preferred.forEach((value) => values.push({ value, position: "multiple" }));
    }
    return values;
  }

  function enrichProduct(product, { registerUnknowns = true } = {}) {
    const levels = ["top", "heart", "base"];
    const enrichedNotes = { ...(product.notes || {}) };
    const matches = [];
    const unknown = [];
    levels.forEach((position) => {
      const arValues = Array.isArray(enrichedNotes[`${position}Ar`]) ? enrichedNotes[`${position}Ar`] : [];
      const enValues = Array.isArray(enrichedNotes[`${position}En`]) ? enrichedNotes[`${position}En`] : [];
      const combined = enValues.length ? enValues : arValues;
      const resolved = combined.map((value) => ({ value, note: find(value) }));
      resolved.forEach(({ value, note }) => {
        if (note) matches.push({ ...note, requestedPosition: position });
        else {
          unknown.push({ name: value, position });
          if (registerUnknowns) registerUnclassified(value, position);
        }
      });
      if (!arValues.length) enrichedNotes[`${position}Ar`] = resolved.map(({ value, note }) => note?.nameAr || value);
      if (!enValues.length) enrichedNotes[`${position}En`] = resolved.map(({ value, note }) => note?.nameEn || value);
    });
    const familyCounts = new Map();
    matches.forEach((note) => familyCounts.set(note.familyId, (familyCounts.get(note.familyId) || 0) + 1));
    const dominantId = [...familyCounts].sort((a, b) => b[1] - a[1])[0]?.[0];
    const family = familyById(dominantId);
    return {
      notes: enrichedNotes,
      matches,
      unknown,
      familyAr: family?.nameAr || "",
      familyEn: family?.nameEn || ""
    };
  }

  function productsFor(noteOrSlug, products, { excludeExact = false } = {}) {
    const note = typeof noteOrSlug === "string" ? find(noteOrSlug) : noteOrSlug;
    if (!note) return [];
    return (products || []).filter((product) => {
      const resolved = noteValues(product).map((item) => find(item.value)).filter(Boolean);
      const exact = resolved.some((item) => item.slug === note.slug);
      if (!excludeExact) return exact;
      return !exact && resolved.some((item) => item.familyId === note.familyId);
    });
  }

  function related(noteOrSlug, limit = 8) {
    const note = typeof noteOrSlug === "string" ? find(noteOrSlug) : noteOrSlug;
    if (!note) return [];
    return notes.filter((item) => item.familyId === note.familyId && item.slug !== note.slug).slice(0, limit);
  }

  function upsertNote(note) {
    const slug = note.slug || slugify(note.nameEn || note.nameAr);
    note = { ...note, validated:false, imageValidationStatus:'NEEDS_REVIEW' };
    if (notesBySlug.has(slug) && !customState.notes.some((item) => item.slug === slug)) {
      customState.overrides[slug] = { ...(customState.overrides[slug] || {}), ...note, slug: undefined };
    } else {
      const index = customState.notes.findIndex((item) => item.slug === slug);
      const value = { ...note, slug };
      if (index >= 0) customState.notes[index] = value;
      else customState.notes.push(value);
    }
    customState.unclassified = customState.unclassified.filter((item) =>
      ![note.nameAr, note.nameEn, ...(note.aliases || [])].some((alias) => normalize(alias) === normalize(item.name))
    );
    rebuild();
    return notesBySlug.get(slug);
  }

  function upsertFamily(family) {
    const id = family.id || slugify(family.nameEn || family.nameAr);
    const index = customState.families.findIndex((item) => item.id === id);
    const value = { ...family, id };
    if (index >= 0) customState.families[index] = value;
    else customState.families.push(value);
    rebuild();
    return familyById(id);
  }

  function mergeNote(fromSlug, intoSlug) {
    // Cross-identity merges require a reviewed dictionary migration.
    return fromSlug === intoSlug && notesBySlug.has(fromSlug);
  }

  function setState(value) {
    customState = cleanState(value);
    rebuild();
  }

  function getState() {
    return JSON.parse(JSON.stringify(customState));
  }

  rebuild();
  global.ORIGOFragranceNotes = Object.freeze({
    normalize,
    slugify,
    find,
    resolveReference,
    search,
    artwork,
    validateNoteImage,
    validateAssetOwnership,
    get reviewedImageAssets() { return JSON.parse(JSON.stringify(reviewedAssets)); },
    generationSpec,
    get canonicalDictionary() { return Object.fromEntries(notes.map(note => [note.canonicalKey, { canonicalKey:note.canonicalKey, canonicalNameAr:note.nameAr, canonicalNameEn:note.nameEn, scientificName:note.scientificName, plantPart:note.plantPart, entityType:note.entityType, imageKey:note.imageKey }])); },
    familyById,
    related,
    productsFor,
    noteValues,
    enrichProduct,
    registerUnclassified,
    upsertNote,
    upsertFamily,
    mergeNote,
    setState,
    getState,
    get families() { return families; },
    get notes() { return notes; },
    get unclassified() { return customState.unclassified; }
  });
})(window);
