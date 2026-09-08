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
    sugar:"sugar", mahonial:"mahonial"
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
      [note.nameAr, note.nameEn, ...note.aliases].forEach((alias) => curatedIndex.set(normalize(alias), note));
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
      const bundledImage = generatedImageFor(slug);
      result.set(slug, {
        ...result.get(slug),
        ...override,
        ...(bundledImage && !approvedManagerArtwork.has(slug) ? { image:bundledImage } : {}),
        slug
      });
    });

    notes = [...result.values()]
      .filter((note) => !customState.merges[note.slug])
      .map((note) => {
        const image = note.image || "";
        return {
          ...note,
          image,
          imageStatus: !image
            ? "missing"
            : image.includes("/extracted/")
              ? "reference"
              : "ready"
        };
      });
    notesBySlug = new Map(notes.map((note) => [note.slug, note]));
    aliasIndex = new Map();
    notes.forEach((note) => {
      [note.slug, note.nameAr, note.nameEn, note.sourceName, ...(note.aliases || [])].forEach((alias) => {
        const key = normalize(alias);
        if (key && !aliasIndex.has(key)) aliasIndex.set(key, note.slug);
      });
    });
    Object.entries(customState.merges).forEach(([from, to]) => {
      const source = result.get(from);
      if (!source || !notesBySlug.has(to)) return;
      [source.slug, source.nameAr, source.nameEn, source.sourceName, ...(source.aliases || [])].forEach((alias) => {
        const key = normalize(alias);
        if (key) aliasIndex.set(key, to);
      });
    });
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
    if (key.length < 4) return null;
    const partial = [...aliasIndex.entries()].find(([candidate]) => candidate.includes(key) || key.includes(candidate));
    return partial ? notesBySlug.get(partial[1]) || null : null;
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
    if (note?.image) {
      const source = String(note.image).trim();
      if (/^(?:data:|blob:|https?:|\/\/|\/)/i.test(source)) return source;
      return `/${source.replace(/^\.\//, "")}`;
    }
    const family = familyById(note?.familyId) || familyBlueprints.uncategorized;
    const title = escapeXML(String(note?.nameEn || note?.nameAr || "ORIGO").slice(0, 20).toUpperCase());
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs><radialGradient id="g" cx=".32" cy=".24" r=".9"><stop stop-color="${family.accent}"/><stop offset="1" stop-color="${family.color}"/></radialGradient></defs>
      <rect width="640" height="640" rx="44" fill="url(#g)"/>
      <circle cx="320" cy="280" r="154" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2"/>
      <circle cx="320" cy="280" r="112" fill="rgba(255,255,255,.12)"/>
      <text x="320" y="330" text-anchor="middle" font-size="145" fill="white" font-family="Georgia,serif">${escapeXML(note?.symbol || family.symbol)}</text>
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
    if (!notesBySlug.has(fromSlug) || !notesBySlug.has(intoSlug) || fromSlug === intoSlug) return false;
    customState.merges[fromSlug] = intoSlug;
    rebuild();
    return true;
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
    search,
    artwork,
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
