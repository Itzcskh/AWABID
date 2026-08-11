export interface CuratedStory {
  text: string;
  sources: { title: string; url: string }[];
}

export const CURATED_FALLBACK_STORIES: Record<string, Record<string, CuratedStory>> = {
  diriyah: {
    ar: {
      text: `أهلاً وسهلاً بكم، أخوكم أبو فيصل يحييكم من أطياف نجد العذية! أقف معكم اليوم في حي الطريف التاريخي بالدرعية، مهد الدولة السعودية الأولى النبيلة التي تأسست عام 1727م على يد الإمام محمد بن سعود. هنا بين القشور والطين الشامخ وعلى رأسها قصر سلوى العظيم، شُيِّدت عاصمة المجد والحضارة بأسلوب العمارة النجدية الأصيلة على ضفاف وادي حنيفة الخالد. أدعوكم لزيارة هذا المعلم العريق المدرج لدى اليونسكو والاستمتاع بعبق التاريخ وتأمل هندسة اللبن والنخل التي صمدت لعقود طويلة. أهلاً بكم في الدرعية عاصمة الفخر!`,
      sources: [
        { title: 'Ministry of Culture - Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'Diriyah Gate Development Authority (DGDA)', url: 'https://www.dgda.gov.sa/' },
        { title: 'UNESCO World Heritage - At-Turaif District', url: 'https://whc.unesco.org/en/list/1329/' }
      ]
    },
    en: {
      text: `Welcome! I am Abu Faisal, greeting you from the proud heart of Najd. Today I welcome you to At-Turaif District in Diriyah, the noble birthplace of the First Saudi State founded in 1727 by Imam Muhammad bin Saud. Here, amid magnificent Najdi mud-brick palaces led by the historic Salwa Palace, a glorious capital flourished along the banks of Wadi Hanifa. I warmly invite you to explore this UNESCO World Heritage gem and experience our living heritage and traditional architecture.`,
      sources: [
        { title: 'Ministry of Culture - Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage - At-Turaif District', url: 'https://whc.unesco.org/en/list/1329/' }
      ]
    },
    zh: {
      text: `欢迎大家！我是阿布·费萨尔，在内志的大地上向您致意。今天在德里耶的阿图拉伊夫区，这里是1727年由伊玛目穆罕默德·本·沙特建立的第一沙特王国的发祥地。在宏伟的萨尔瓦宫与泥砖建筑群之间，沿哈尼法山谷见证着辉煌的历史。热烈欢迎您亲临这处联合国教科文组织世界遗产。`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' }
      ]
    }
  },
  hegra: {
    ar: {
      text: `حياكم الله جميعاً، أخوكم أبو فيصل يحدثكم من صحراء العلا الساحرة! نرحب بكم في الحِجر (مدائن صالح)، أول موقع سعودي أُدرج في قائمة التراث العالمي لليونسكو عام 2008م. هنا نحت الأنباط قبل أكثر من ألفي عام أكثر من 110 مقابر ضخمة في جبال الصخر الرملي، وأشهرها "قصر الفريد" الشامخ بمفرده. كان الحِجر محطة رئيسية للتجار على طريق البخور القديم تجمع بين العظمة والمعمار الفريد. أتمنى لكم رحلة ساحرة تتأملون فيها عجائب الصخر وعبق العصور القديمة!`,
      sources: [
        { title: 'Royal Commission for AlUla (RCU)', url: 'https://www.rcu.gov.sa/' },
        { title: 'UNESCO World Heritage - Hegra Archeological Site', url: 'https://whc.unesco.org/en/list/1293/' }
      ]
    },
    en: {
      text: `Greetings! Abu Faisal welcomes you to the magical desert of AlUla! We stand in Hegra (Mada'in Saleh), Saudi Arabia's first UNESCO World Heritage Site inscribed in 2008. Over two thousand years ago, the Nabataeans carved more than 110 monumental tombs directly into giant sandstone rocks, including the famed Lonely Castle (Qasr al-Farid). It was a vital crossroads on the ancient Incense Road. Welcome to an unforgettable journey through time!`,
      sources: [
        { title: 'Royal Commission for AlUla (RCU)', url: 'https://www.rcu.gov.sa/' },
        { title: 'UNESCO World Heritage - Hegra', url: 'https://whc.unesco.org/en/list/1293/' }
      ]
    },
    zh: {
      text: `大家好！阿布·费萨尔在埃尔奥拉沙漠欢迎您！我们来到黑格拉，这是沙特于2008年列入世界遗产的首个遗址。两千多年前，纳巴泰人在巨石上雕刻了110多座庄严的陵墓，包括著名的独石宫（Qasr al-Farid）。欢迎来到这里探索千年古迹。`,
      sources: [
        { title: 'Royal Commission for AlUla', url: 'https://www.rcu.gov.sa/' },
        { title: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' }
      ]
    }
  },
  'alula-old-town': {
    ar: {
      text: `أهلاً ومرحباً بكم، أخوكم أبو فيصل يحييكم من بين نخيل واحة العلا الغنّاء! بلدة العلا القديمة هي متاهة تراثية حية تضم أكثر من 900 منزل طيني عتيق وقلعة تاريخية مطلة على الوادي. عاش فيها أجدادنا لقرون طويلة، وكانت محطة استراحة وراحة حيوية للحجاج والتجار القادمين عبر طريق البخور والقرنفل. أتمنى لكم جولة ممتعة بين أزقتها المظللة وأسواقها الدفئة بالقهوة والترحيب الحجازي!`,
      sources: [
        { title: 'Royal Commission for AlUla - Old Town', url: 'https://www.rcu.gov.sa/' },
        { title: 'Experience AlUla Heritage', url: 'https://www.experiencealula.com/' }
      ]
    },
    en: {
      text: `Welcome! Abu Faisal greets you from the lush palm oases of AlUla! AlUla Old Town is a living heritage labyrinth featuring over 900 historic mudbrick homes and a hilltop castle. For centuries, merchants and pilgrims gathered here along the Incense Road. Enjoy walking through its shaded alleys and vibrant traditional markets.`,
      sources: [
        { title: 'Royal Commission for AlUla', url: 'https://www.rcu.gov.sa/' }
      ]
    },
    zh: {
      text: `欢迎！阿布·费萨尔在埃尔奥拉棕榈绿洲向您致意！埃尔奥拉古城拥有900多间泥砖住宅和古堡，曾是香料之路上的繁情驿站。愿您漫步于古老的小巷与充满当地风情的集市中。`,
      sources: [
        { title: 'Experience AlUla', url: 'https://www.experiencealula.com/' }
      ]
    }
  },
  'historic-jeddah': {
    ar: {
      text: `حياكم الله أهل الجود، أبو فيصل يرحب بكم من عروس البحر الأحمر "جدة التاريخية - البلد"! هذا الموقع المدرج لدى اليونسكو منذ 2014م يُعد البوابة التاريخية للحرمين الشريفين. تشتهر البلد ببيوتها المرجانية الشامخة والمشربيات الخشبية الرواشين المنحوتة بدقة وفن. ستستمتعون هنا برائحة البخور والقهوة الشاذلية وأزقتها المضيئة بالدفء. يسعدني جداً حضوركم واكتشافكم لهذا الفن المعماري الفريد!`,
      sources: [
        { title: 'Jeddah Historic District Program (MoC)', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage - Historic Jeddah', url: 'https://whc.unesco.org/en/list/1361/' }
      ]
    },
    en: {
      text: `Warm greetings! Abu Faisal welcomes you to Historic Jeddah (Al-Balad) on the Red Sea! A UNESCO World Heritage Site since 2014, Al-Balad is the historic gateway to the Holy Mosques, famous for its multi-story coral-stone mansions and intricately carved wooden Roshan balconies. Experience the scent of frankincense and Hijazi hospitality in every corner!`,
      sources: [
        { title: 'Jeddah Historic District Program', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage - Historic Jeddah', url: 'https://whc.unesco.org/en/list/1361/' }
      ]
    },
    zh: {
      text: `热烈欢迎！阿布·费萨尔在红海之滨的吉达古城（阿巴拉德）欢迎您！作为2014年列入世遗的圣地门户，吉达古城以其多层珊瑚石大宅与精美的木雕窗台（Roshan）而闻名。邀请您亲临体验这独特的红海港口风姿。`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' }
      ]
    }
  },
  'rijal-almaa': {
    ar: {
      text: `أهلاً بكم يا كرام، أبو فيصل يحييكم من جبال عسير الخضراء في قرية رجال ألمع التراثية! تشخص هذه القرية بقصورها الحجرية الصلبة التي يزيد عمرها عن 700 عام، وتزدين بنوافذها الملونة بالفن الألمعي الشغبي الفريد وحواف الحجر الأبيض المزخرف. كانت رجال ألمع مركزاً تجارياً وثقافياً بارزاً بين اليمن والحجاز. أدعوكم بشغف لزيارة هذه الدرة الجبلية والتمتع بكرم أهل الجنوب وطبيعتها الساحرة!`,
      sources: [
        { title: 'Asir Development Authority (ASDA)', url: 'https://asda.gov.sa/' },
        { title: 'Saudi Heritage Commission - Rijal Almaa', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    en: {
      text: `Greetings of respect! Abu Faisal welcomes you to the green Asir Mountains at Rijal Almaa Heritage Village! Standing proud for over 700 years, its multi-story stone fortresses feature bright geometric Qatt Al-Asiri artwork and gleaming white quartz framing. Historically a major trade hub, it offers breathtaking views and warm southern hospitality.`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    zh: {
      text: `大家好！阿布·费萨尔在阿西尔山脉的里贾尔·阿尔马古村欢迎您！这座古村建于700多年前，多层石砌堡垒装饰着鲜艳的卡特·阿西里几何壁画与白色石英框。欢迎体验精彩的南部文化与高山风貌。`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    }
  },
  'alahsa-oasis': {
    ar: {
      text: `حياكم الله وبياكم، أبو فيصل يحدثكم من أكبر واحة نخيل مستقلة في العالم "واحة الأحساء"! تُظلل هذه الواحة العريقة أكثر من 2.5 مليون نخلة خضراء، وتضم جبل القارة بمغاراته الباردة صيفاً والدافئة شتاءً وقصر إبراهيم الأثري. سُجلت الأحساء باليونسكو عام 2018م كمنظر ثقافي متجدد. أتمنى لكم رحلة طيبة بين ينابيع الماء والتمور الحساوية اللذيذة!`,
      sources: [
        { title: 'Al-Ahsa Development Authority', url: 'https://www.alahsa.gov.sa/' },
        { title: 'UNESCO World Heritage - Al-Ahsa Oasis', url: 'https://whc.unesco.org/en/list/1563/' }
      ]
    },
    en: {
      text: `Welcome! Abu Faisal welcomes you to the world's largest self-contained oasis: Al-Ahsa Oasis! Sheltering over 2.5 million date palms, historic springs, and Al-Qarah Mountain with its climate-controlled caves, Al-Ahsa became a UNESCO site in 2018. Enjoy a serene journey amid green palm groves and famous Hasawi dates!`,
      sources: [
        { title: 'Al-Ahsa Development Authority', url: 'https://www.alahsa.gov.sa/' },
        { title: 'UNESCO World Heritage - Al-Ahsa Oasis', url: 'https://whc.unesco.org/en/list/1563/' }
      ]
    },
    zh: {
      text: `欢迎！阿布·费萨尔在世界上最大的独立绿洲——阿哈萨绿洲欢迎您！这里拥有250多万株椰枣树、古泉以及拥有天然避暑石窟的卡拉山，2018年列入世遗。祝您在绿色椰林与甜美椰枣中度过愉快的时光！`,
      sources: [
        { title: 'Al-Ahsa Development Authority', url: 'https://www.alahsa.gov.sa/' },
        { title: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' }
      ]
    }
  },
  'rock-art-hail': {
    ar: {
      text: `حياكم الله يا أرحام حائل وأهل الكرم، أبو فيصل يرحب بكم في الفنون الصخرية بحائل (جبّة والشويمس)! هذا الموقع المدرج لدى اليونسكو منذ 2015م هو أكبر معرض مفتوح للنقوش الحجرية في الشرق الأوسط. على صخور جبل أم سنمان بجبة، نقش الإنسان القديم قبل أكثر من 10,000 عام صوراً بديعة للجمال والأسود والخيل ورجال الصيد. أتمنى لكم جولة ممتعة تتأملون فيها إبداع أجدادنا عبر العصور!`,
      sources: [
        { title: 'Hail Region Development Authority', url: 'https://hail.gov.sa/' },
        { title: 'UNESCO World Heritage - Rock Art in Hail', url: 'https://whc.unesco.org/en/list/1472/' }
      ]
    },
    en: {
      text: `Greetings! Abu Faisal welcomes you to the Rock Art in Hail Region (Jubbah & Shuwaymis)! Inscribed on the UNESCO World Heritage list in 2015, Mount Umm Sinman features thousands of ancient petroglyphs created over 10,000 years ago, portraying camels, lions, horses, and human hunters in breathtaking detail.`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage - Rock Art in Hail', url: 'https://whc.unesco.org/en/list/1472/' }
      ]
    },
    zh: {
      text: `大家好！阿布·费萨尔在哈伊勒岩画遗址（朱巴与舒韦米斯）欢迎您！该遗址于2015年被列入世遗，阿姆·辛曼山的石壁上展示着一万多年前早期人类雕刻的骆驼、狮子、猎人等古老岩画。`,
      sources: [
        { title: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' }
      ]
    }
  },
  'hima-najran': {
    ar: {
      text: `أهلاً ومرحباً بكم يا كرام، أبو فيصل يحييكم من أقصى الجنوب في منطقة حمى الثقافية بنجران! هذا الموقع اليونسكو الساحر المسجل عام 2021م يُعد ملتقى القوافل القديم عبر نجد واليمن. تضم حمى آبار مياه تاريخية صامدة منذ آلاف السنين ونقوشاً صخرية شاسعة بالخطوط المسندية والثمودية والنبطية والكوفية المبكرة. أهلاً بكم في واحة الخطوط والتاريخ الخالد!`,
      sources: [
        { title: 'Najran Development Authority', url: 'https://www.najran.gov.sa/' },
        { title: 'UNESCO World Heritage - Hima Cultural Area', url: 'https://whc.unesco.org/en/list/1619/' }
      ]
    },
    en: {
      text: `Warmest welcome! Abu Faisal greets you from Hima Cultural Area in Najran! A UNESCO World Heritage Site since 2021, Hima was a vital desert oasis along ancient trade routes, featuring millennial water wells and rocks inscribed with ancient Musnad, Thamudic, and Kufic scripts.`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' },
        { title: 'UNESCO World Heritage - Hima', url: 'https://whc.unesco.org/en/list/1619/' }
      ]
    },
    zh: {
      text: `热烈欢迎！阿布·费萨尔在奈季兰希马文化区向您致意！2021年列入世遗，这里曾是古沙漠商队的集结地，以古老甘泉与各种文字岩画闻名。`,
      sources: [
        { title: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' }
      ]
    }
  },
  'dumat-aljandal': {
    ar: {
      text: `حياكم الله أهل الشمال، أبو فيصل ينقلكم اليوم إلى دومة الجندل بالجوف! هنا تقف قلعة مارد الحجرية الشامخة على مرتفع صخري يعود للقرن الأول الميلادي، وإلى جوارها مسجد الخليفة الراشد عمر بن الخطاب بمئذنته التاريخية الشهيرة التي تُعد واحدة من أقدم المآذن الإسلامية المعمورة في التاريخ. أهلاً بكم في أصالة الجوف الشامخة!`,
      sources: [
        { title: 'Al-Jouf Region Tourism', url: 'https://visitsaudi.com/' },
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    en: {
      text: `Greetings from the North! Abu Faisal welcomes you to Dumat al-Jandal in Al-Jouf! Standing tall atop a rocky hill is the 1st-century Marid Sandstone Castle, alongside the historic Caliph Omar ibn Al-Khattab Mosque featuring one of the oldest surviving Islamic minarets in history.`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    zh: {
      text: `北部朋友们好！阿布·费萨尔在焦夫地区的杜马特占达勒欢迎您！这里伫立着公元1世纪的马里德砂岩古堡，以及建有历史上最古老宣礼塔之一的哈里发欧麦尔清真寺。`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    }
  },
  'tarout-castle': {
    ar: {
      text: `أهلاً وسهلاً بضيوفنا الكرام، أبو فيصل يحدثكم من جزيرة تاروت بالقطيف! تتربع قلعة تاروت العريقة على تلة أثرية شهدت استيطاناً بشرياً يمتد لأكثر من 5000 عام. جمعت هذه القلعة بين هندسة الخليج البحري وحضارات دلمون والبرتغال. أدعوكم لتأمل الأقواس والأسوار الممتدة بين بساتين النخيل وسواحل الخليج العربي!`,
      sources: [
        { title: 'Eastern Province Tourism', url: 'https://visitsaudi.com/' },
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    en: {
      text: `Welcome! Abu Faisal welcomes you to Tarout Island in Qatif! Perched atop a historic mound with 5,000 years of continuous human settlement, Tarout Castle reflects the rich maritime heritage of the Arabian Gulf and Dilmun civilizations. Enjoy exploring its ancient ramparts!`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    zh: {
      text: `欢迎！阿布·费萨尔在卡提夫的塔鲁特岛欢迎您！塔鲁特城堡建于具有5000年人类文明历史的古丘之上，融合了海湾海洋文明与迪尔蒙遗产。`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    }
  },
  'uqair-port': {
    ar: {
      text: `حياكم الله أهل الجود، أبو فيصل يحييكم من ميناء العقير التاريخي على شواطئ الشرقية! كان العقير البوابة البحرية الأولى والرئيسية للدولة السعودية الأولى ومركز التجارة والدبلوماسية في عهد الملك عبد العزيز. تشهد خاناته وبواباته وأقواسه الإسلامية العريقة على استقبال البضائع والرحالة عبر عقود طوال. جولة ممتعة مع نسيم البحر والتاريخ!`,
      sources: [
        { title: 'Al-Ahsa Development Authority', url: 'https://www.alahsa.gov.sa/' },
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    en: {
      text: `Warm greetings! Abu Faisal welcomes you to Historic Uqair Sea Port on the Arabian Gulf! As the primary maritime trade gateway during the First Saudi State and King Abdulaziz era, Uqair features remarkable arched caravanserais, customs houses, and coastal views.`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    },
    zh: {
      text: `大家好！阿布·费萨尔在波斯湾畔的阿古尔历史海港欢迎您！作为第一沙特王国的核心海洋门户，阿古尔留存着带有精美拱门的古客栈与海关建筑。`,
      sources: [
        { title: 'Saudi Heritage Commission', url: 'https://heritage.moc.gov.sa/' }
      ]
    }
  },
  'elephant-rock': {
    ar: {
      text: `أهلاً ومرحباً بكم، أبو فيصل يحدثكم من تحت ظلال صخرة الفيل (جبل الفيل) بالعلا! تشخص هذه العجيبة الطبيعية المذهلة بارتفاع 52 متراً في قلب الصحراء الأرجوانية. نحتتها الرياح والزمن عبر ملايين السنين لتشبه فيلاً ضخماً يلامس الرمال. أدعوكم للاستمتاع بروعة المنظر مع غروب الشمس وجلسات النجوم الساحرة!`,
      sources: [
        { title: 'Royal Commission for AlUla', url: 'https://www.rcu.gov.sa/' },
        { title: 'Experience AlUla', url: 'https://www.experiencealula.com/' }
      ]
    },
    en: {
      text: `Welcome! Abu Faisal welcomes you to Elephant Rock (Jabal AlFil) in AlUla! This breathtaking 52-meter natural sandstone monolith was shaped over millions of years by wind erosion to resemble a giant elephant touching the desert sands. Enjoy spectacular sunsets and stargazing!`,
      sources: [
        { title: 'Royal Commission for AlUla', url: 'https://www.rcu.gov.sa/' }
      ]
    },
    zh: {
      text: `欢迎！阿布·费萨尔在埃尔奥拉象岩（Jabal AlFil）欢迎您！这座52米高的砂岩自然巨石经数百万年风蚀形成，造型酷似巨象。落日与星空下景色令人叹为观止。`,
      sources: [
        { title: 'Experience AlUla', url: 'https://www.experiencealula.com/' }
      ]
    }
  }
};

export function getFallbackStory(siteId: string, lang: string = 'ar'): CuratedStory {
  const siteStories = CURATED_FALLBACK_STORIES[siteId] || CURATED_FALLBACK_STORIES['diriyah'];
  const story = siteStories[lang] || siteStories['ar'] || CURATED_FALLBACK_STORIES['diriyah']['ar'];
  return story;
}
