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
    const identity = resolveReference(note);
    if (identity && validateNoteImage({ ...identity, image:note.image }).valid) {
      const source = String(note.image).trim();
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
