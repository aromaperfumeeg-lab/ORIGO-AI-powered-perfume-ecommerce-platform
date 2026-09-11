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
