import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  ar: {
    // Brand & Identity
    appName: 'أوابد',
    tagline: 'حيث يُحكى التراث',
    storytellerName: 'الراوي أبو فيصل',
    storytellerRole: 'حكواتي المملكة الافتراضي',
    
    // Nav
    navHome: 'الرئيسية',
    navCatalog: 'معالم التراث',
    navPlanner: 'مخطط اليوم',
    navChat: 'اسأل الراوي',
    navDashboard: 'حجوزاتي',
    navSignIn: 'تسجيل الدخول',
    navSignOut: 'خروج',
    
    // Landing
    heroTitle: 'في الحجارة حكاية... دَعْها تتكلم',
    heroSubtitle: 'استمع إلى أسرار المعالم السعودية الأسطورية برواية دافئة وصوت نجدِي أصيل، موثقة ومعتمدة بالكامل.',
    heroCtaExplore: 'استكشف المعالم',
    heroCtaPlanner: 'خطط يومك مع الصلاة',
    
    statSitesCount: '٦ معالم يونسكو وتاريخية',
    statLanguages: '٣ لغات عالمية',
    statGrounded: '١٠٠٪ حكايات موثقة ومحققة',
    
    howItWorksTitle: 'كيف تعمل أوابد؟',
    howItWorksSubtitle: 'رحلتك إلى عمق التاريخ في ثلاث خطوات سهلة',
    step1Title: 'اسمع الحكاية',
    step1Desc: 'اختر المعلم وشاهد الراوي أبو فيصل يسرد لك سيرة المكان وقاطنيه بصوت دافئ وصور أصلية.',
    step2Title: 'احجز زيارتك',
    step2Desc: 'اختر التاريخ والتجربة المناسبة لك واستلم تأكيد الحجز المباشر.',
    step3Title: 'أدر رحلتك',
    step3Desc: 'تابع حجوزاتك ومواعيدك من لوحة تحكمك الشخصية بكل يسر وسهولة.',
    
    quoteTitle: 'حكمة أبو فيصل',
    quoteText: '«ليس التراث أحجاراً صامتة، بل أنفاس الأجداد ورسائل الشرف المكتوبة في وجه الصخر»',
    
    whyDifferentTitle: 'لماذا أوابد؟',
    diff1Title: 'حكايات موثقة لا تُبتدع',
    diff1Desc: 'كل اسم قبيلة، تاريخ، ورقم مستند إلى مصادر بحثية حية وموثقة.',
    diff2Title: 'مخطط يراعي أوقات الصلاة والطقس',
    diff2Desc: 'جدول يناسب أجواء المملكة مع فترات راحة للصلاة والظل في الهجير.',
    diff3Title: 'سهولة بـ ٣ لغات',
    diff3Desc: 'العربية، الإنجليزية، والصينية بتبديل فوري دون فقدان عبق الأصالة.',
    
    closingCtaTitle: 'جاهز للاستماع إلى أولى الحكايات؟',
    closingCtaSub: 'انضم إلى آلاف الزوار واستمتع برحلة تاريخية لا تُنسى في أنحاء المملكة.',
    
    // Catalog
    catalogTitle: 'موسوعة المعالم الخالدة',
    catalogSubtitle: 'تصفح كنز المملكة التراثي واستمع إلى الحكايات الموثقة',
    searchPlaceholder: 'ابحث باسم المعلم، المنطقة، أو الكلمات المفتاحية...',
    filterRegionAll: 'جميع المناطق',
    filterTypeAll: 'جميع الأنواع',
    filterOutdoor: 'خارجي (مفتوح)',
    filterMixed: 'مزيج (مفتوح ومغلق)',
    filterIndoor: 'مغلق (مكَيَّف)',
    unescoOnlyToggle: 'معالم اليونسكو فقط',
    matchCount: 'تم العثور على {count} معلم',
    noSitesFound: 'لم نجد معلماً يطابق بحثك. جرب تغيير كلمات البحث.',
    
    // Detail
    siteDetails: 'تفاصيل المعلم',
    unescoBadge: 'موقع يونسكو للتراث العالمي',
    bestTimeLabel: 'أفضل وقت للزيارة',
    crowdLabel: 'حالة الزحام',
    drivingTimeLabel: 'المسافة من الرياض',
    startingPriceLabel: 'سعر التجربة تبدأ من',
    sarUnit: 'ر.س',
    
    narrateButton: 'احكِ لي القصة',
    narrateLoading: 'أبو فيصل يستحضر التاريخ لكم...',
    narrationLangLabel: 'لغة السرد:',
    sourcesLabel: 'المصادر والوثائق المحققة:',
    instantVoiceBadge: 'صوت الراوي السريع',
    
    btnPlanDay: 'خطط يوماً هنا',
    btnAskStoryteller: 'اسأل الراوي',
    btnBookVisit: 'احجز زيارة',
    btnNextStory: 'الحكاية التالية',
    
    // Booking Form
    bookingTitle: 'احجز زيارة إلى المعلم',
    bookingSubtitle: 'اختر موعدك وتجربتك المفضلة',
    dateLabel: 'تاريخ الزيارة',
    timeSlotLabel: 'الفترة المفضلّة (مراعاة للحرارة)',
    slotMorning: 'الصباح الباكر (برودة لطيفة)',
    slotAfternoon: 'بعد العصر (أجواء الأصيل)',
    slotEvening: 'المساء (إضاءة ساحرة)',
    expTypeLabel: 'نوع التجربة',
    expGuided: 'جولة مع مرشد تراثي متخصص',
    expSelf: 'زيارة حرة مسارات استكشافية',
    expVip: 'تجربة ضيافة ملكية VIP',
    partySizeLabel: 'عدد الزوار',
    totalPriceLabel: 'الإجمالي التقديري:',
    confirmBookingBtn: 'تأكيد الحجز الآن',
    loginToBookNotice: 'يرجى تسجيل الدخول أو المتابعة كضيف لإتمام الحجز.',
    bookingSuccess: 'تم تأكيد حجزك بنجاح! رقم المرجع: ',
    
    // Day Planner
    plannerTitle: 'مخطط اليوم التراثي الذكي',
    plannerSubtitle: 'جدول رحلتك بذكاء الاصطناعي مع مراعاة أوقات الصلاة والطقس وحركة السير',
    selectSitesLabel: '١. اختر المعالم المراد زيارتها:',
    enterPrayersLabel: '٢. مواعيد الصلاة والطقس اليوم:',
    autofillPrayersBtn: 'تعبئة تلقائية (الرياض)',
    generateItineraryBtn: 'صمم لي جدول اليوم',
    generatingItinerary: 'أبو فيصل ينظم لك جدول الرحلة والصلاة...',
    itineraryResultsTitle: 'جدول رحلتك المعتمد مع أبو فيصل',
    
    // Chat
    chatTitle: 'مجلس الراوي أبو فيصل',
    chatSubtitle: 'تبادل أطراف الحديث عن تاريخ المملكة، القبائل، المأكولات التراثية والمعالم',
    chatPlaceholder: 'اكتب سؤالك لأبو فيصل هنا...',
    suggestedQuestionsLabel: 'أسئلة مقترحة:',
    q1: 'من الذي بنى الحِجر وكيف عاشوا؟',
    q2: 'ما هي أشهر الأكلات التراثية بالقرب من جدة التاريخية؟',
    q3: 'حدثني عن تاريخ الدرعية وقصر سلوى',
    q4: 'متى الوقت الأفضل لزيارة رجال ألمع وكيف أصل إليها؟',
    listenAloudBtn: 'استمع بصوت الراوي',
    
    // Auth
    authTitle: 'مرحباً بك في أوابد',
    authSubtitle: 'سجل دخولك لحفظ حجوزاتك وإدارة رحلاتك التراثية',
    emailLabel: 'البريد الإلكتروني',
    sendCodeBtn: 'إرسال رمز التحقق',
    otpLabel: 'رمز التحقق (OTP)',
    verifyBtn: 'تأكيد والدخول',
    guestBtn: 'المتابعة كضيف',
    otpSentNotice: 'تم إرسال الرمز (استخدم 123456 للتجربة المباشرة)',
    
    // Dashboard
    dashboardTitle: 'لوحة الحجوزات الشخصية',
    dashboardSubtitle: 'إدارة رحلاتك القادمة ومراجعة سجل زياراتك',
    tabUpcoming: 'الحجوزات القادمة',
    tabPast: 'السابقة والملغاة',
    noBookings: 'لا توجد حجوزات في هذه القائمة حالياً.',
    cancelBookingBtn: 'إلغاء الحجز',
    confirmCancelTitle: 'تأكيد إلغاء الحجز',
    confirmCancelBody: 'هل أنت أصل في رغبتك بإلغاء حجز المعلم رقم ',
    confirmCancelYes: 'نعم، قم بالإلغاء',
    confirmCancelNo: 'تراجع',
    bookingReference: 'رقم المرجع:',
    
    // 404
    notFoundTitle: 'هذه الصفحة ضلّت طريقها مع القوافل!',
    notFoundDesc: 'يبدو أنك سلكت درباً غير مطروق في صحراء التراث. دعنا نعد بك إلى الواحة.',
    backHomeBtn: 'العودة للرئيسية',
  },
  en: {
    // Brand & Identity
    appName: 'AWABID',
    tagline: 'Where heritage is told',
    storytellerName: 'Storyteller Abu Faisal',
    storytellerRole: 'Virtual Saudi Storyteller',
    
    // Nav
    navHome: 'Home',
    navCatalog: 'Heritage Sites',
    navPlanner: 'Day Planner',
    navChat: 'Ask Storyteller',
    navDashboard: 'My Bookings',
    navSignIn: 'Sign In',
    navSignOut: 'Sign Out',
    
    // Landing
    heroTitle: 'The stones have stories… Let them speak.',
    heroSubtitle: 'Listen to the secrets of legendary Saudi monuments narrated in a warm Saudi storytelling voice, 100% grounded and verified.',
    heroCtaExplore: 'Explore Monuments',
    heroCtaPlanner: 'Plan Prayer-Aware Day',
    
    statSitesCount: '6 UNESCO & Historic Sites',
    statLanguages: '3 Global Languages',
    statGrounded: '100% Grounded Stories',
    
    howItWorksTitle: 'How AWABID Works',
    howItWorksSubtitle: 'Your journey into deep history in three simple steps',
    step1Title: 'Hear the Story',
    step1Desc: 'Choose a site and let Abu Faisal narrate its history, original tribes, and monuments with warm audio.',
    step2Title: 'Book Your Visit',
    step2Desc: 'Select your preferred date, heat-aware time slot, and experience type to receive instant booking.',
    step3Title: 'Manage Your Journey',
    step3Desc: 'Keep track of all upcoming and past visits directly from your personal dashboard.',
    
    quoteTitle: 'Abu Faisal\'s Wisdom',
    quoteText: '“Heritage is not silent stone, but the breath of ancestors and honor written upon the face of the rocks.”',
    
    whyDifferentTitle: 'Why AWABID is Different',
    diff1Title: 'Grounded & Never Invented',
    diff1Desc: 'Every tribe name, historical date, and figure is verified by live web grounding search.',
    diff2Title: 'Prayer & Heat Aware Itineraries',
    diff2Desc: 'Schedules tailored to Saudi weather with dedicated stops for prayer and midday shade.',
    diff3Title: 'Instant Trilingual Switch',
    diff3Desc: 'Arabic, English, and Chinese with seamless instant switching without losing authenticity.',
    
    closingCtaTitle: 'Ready to Listen to the First Story?',
    closingCtaSub: 'Join visitors from around the world in exploring Saudi Arabia\'s timeless monuments.',
    
    // Catalog
    catalogTitle: 'Encyclopedia of Timeless Monuments',
    catalogSubtitle: 'Browse Saudi Arabia\'s heritage treasure and listen to documented narratives',
    searchPlaceholder: 'Search by site name, region, or keywords...',
    filterRegionAll: 'All Regions',
    filterTypeAll: 'All Site Types',
    filterOutdoor: 'Outdoor (Open Air)',
    filterMixed: 'Mixed (Outdoor & Covered)',
    filterIndoor: 'Indoor (Air Conditioned)',
    unescoOnlyToggle: 'UNESCO Sites Only',
    matchCount: 'Found {count} monuments',
    noSitesFound: 'No monuments matched your search query. Try adjusting your filters.',
    
    // Detail
    siteDetails: 'Monument Details',
    unescoBadge: 'UNESCO World Heritage Site',
    bestTimeLabel: 'Best Time to Visit',
    crowdLabel: 'Crowd Profile',
    drivingTimeLabel: 'Drive Time from Riyadh',
    startingPriceLabel: 'Starting Experience Price',
    sarUnit: 'SAR',
    
    narrateButton: 'Tell Me the Story',
    narrateLoading: 'Abu Faisal is evoking history for you...',
    narrationLangLabel: 'Narration Language:',
    sourcesLabel: 'Verified Sources & Citations:',
    instantVoiceBadge: 'Instant Storyteller Voice',
    
    btnPlanDay: 'Plan a Day Here',
    btnAskStoryteller: 'Ask Storyteller',
    btnBookVisit: 'Book a Visit',
    btnNextStory: 'Next Story',
    
    // Booking Form
    bookingTitle: 'Book a Visit to Monument',
    bookingSubtitle: 'Choose your date and preferred experience',
    dateLabel: 'Visit Date',
    timeSlotLabel: 'Preferred Time Slot (Heat Aware)',
    slotMorning: 'Early Morning (Cool Breeze)',
    slotAfternoon: 'Late Afternoon (Golden Hour)',
    slotEvening: 'Evening (Magical Illumination)',
    expTypeLabel: 'Experience Type',
    expGuided: 'Guided Tour with Heritage Expert',
    expSelf: 'Self-Guided Explorer Pass',
    expVip: 'VIP Royal Hospitality Experience',
    partySizeLabel: 'Number of Guests',
    totalPriceLabel: 'Estimated Total:',
    confirmBookingBtn: 'Confirm Booking Now',
    loginToBookNotice: 'Please sign in or continue as guest to complete booking.',
    bookingSuccess: 'Your booking has been confirmed! Reference Code: ',
    
    // Day Planner
    plannerTitle: 'Smart Heritage Day Planner',
    plannerSubtitle: 'AI itinerary planner respecting prayer times, driving distance, and weather',
    selectSitesLabel: '1. Select monuments you wish to visit:',
    enterPrayersLabel: '2. Today\'s Prayer Times & Weather:',
    autofillPrayersBtn: 'Autofill (Riyadh Default)',
    generateItineraryBtn: 'Generate My Itinerary',
    generatingItinerary: 'Abu Faisal is organizing your travel timeline & prayer stops...',
    itineraryResultsTitle: 'Your Approved Itinerary with Abu Faisal',
    
    // Chat
    chatTitle: 'Storyteller\'s Majlis',
    chatSubtitle: 'Converse with Abu Faisal about Saudi history, local tribes, cuisine, and culture',
    chatPlaceholder: 'Ask Abu Faisal anything about Saudi heritage...',
    suggestedQuestionsLabel: 'Suggested Questions:',
    q1: 'Who built Hegra and how did they live?',
    q2: 'What are famous heritage dishes near Historic Jeddah?',
    q3: 'Tell me the history of Diriyah and Salwa Palace',
    q4: 'When is the best time to visit Rijal Almaa and how do I get there?',
    listenAloudBtn: 'Listen Aloud',
    
    // Auth
    authTitle: 'Welcome to AWABID',
    authSubtitle: 'Sign in to manage your heritage bookings and saved itineraries',
    emailLabel: 'Email Address',
    sendCodeBtn: 'Send Verification Code',
    otpLabel: 'Verification Code (OTP)',
    verifyBtn: 'Verify & Enter',
    guestBtn: 'Continue as Guest',
    otpSentNotice: 'Code sent! (Use 123456 for instant testing)',
    
    // Dashboard
    dashboardTitle: 'Personal Bookings Dashboard',
    dashboardSubtitle: 'Manage upcoming trips and review past monument visits',
    tabUpcoming: 'Upcoming Trips',
    tabPast: 'Past & Cancelled',
    noBookings: 'No bookings found in this category.',
    cancelBookingBtn: 'Cancel Booking',
    confirmCancelTitle: 'Confirm Cancellation',
    confirmCancelBody: 'Are you sure you want to cancel booking reference ',
    confirmCancelYes: 'Yes, Cancel Booking',
    confirmCancelNo: 'Keep Booking',
    bookingReference: 'Reference Number:',
    
    // 404
    notFoundTitle: 'This page wandered off with the caravans!',
    notFoundDesc: 'It seems you followed an untrodden path into the desert. Let us guide you back to the oasis.',
    backHomeBtn: 'Return to Home',
  },
  zh: {
    // Brand & Identity
    appName: 'AWABID',
    tagline: '听遗迹诉说历史',
    storytellerName: '说书人 阿布·法伊萨尔',
    storytellerRole: '虚拟沙特说书人',
    
    // Nav
    navHome: '首页',
    navCatalog: '遗产遗迹',
    navPlanner: '一日行程规划',
    navChat: '咨询说书人',
    navDashboard: '我的预订',
    navSignIn: '登录',
    navSignOut: '退出',
    
    // Landing
    heroTitle: '石头也有故事… 听它们诉说。',
    heroSubtitle: '倾听沙特传奇历史遗迹的秘密，以温暖的沙特说书风貌呈现，100%基于事实与验证。',
    heroCtaExplore: '探索遗迹',
    heroCtaPlanner: '规划含祷告时间的一天',
    
    statSitesCount: '6大联合国教科文组织及历史遗迹',
    statLanguages: '3种全球语言',
    statGrounded: '100%考证真实故事',
    
    howItWorksTitle: 'AWABID 如何工作',
    howItWorksSubtitle: '只需三步，开启您的深度历史之旅',
    step1Title: '倾听故事',
    step1Desc: '选择遗迹，聆听阿布·法伊萨尔叙述历史、原始部落与绝美遗迹。',
    step2Title: '预订参观',
    step2Desc: '选择日期、避暑时段及体验类型，即可获得即时预订确认。',
    step3Title: '管理行程',
    step3Desc: '直接在个人控制面板中轻松查看与管理您所有的参观预订。',
    
    quoteTitle: '阿布·法伊萨尔的智慧',
    quoteText: '“文化遗产不是冰冷的石头，而是先辈的呼吸与刻在岩石上的荣耀。”',
    
    whyDifferentTitle: '为什么选择 AWABID',
    diff1Title: '考据严密 绝不凭空捏造',
    diff1Desc: '每一个部落名称、历史年份与人物事件均经实时网络搜索核实。',
    diff2Title: '兼顾祷告与避暑行程',
    diff2Desc: '根据沙特气候量身定制，预留祷告与正午避暑时间。',
    diff3Title: '三语即时切换',
    diff3Desc: '阿拉伯语、英语、中文即时切换，原汁原味。',
    
    closingCtaTitle: '准备好倾听第一个故事了吗？',
    closingCtaSub: '与来自世界各地的游客一同探索沙特阿拉伯的永恒遗迹。',
    
    // Catalog
    catalogTitle: '永恒遗迹宝典',
    catalogSubtitle: '浏览沙特阿拉伯遗产宝藏，倾听考证严密的历史故事',
    searchPlaceholder: '按遗迹名称、地区或关键词搜索...',
    filterRegionAll: '所有地区',
    filterTypeAll: '所有类型',
    filterOutdoor: '户外（露天）',
    filterMixed: '混合（露天与室内）',
    filterIndoor: '室内（空调）',
    unescoOnlyToggle: '仅联合国教科文组织遗迹',
    matchCount: '找到 {count} 个遗迹',
    noSitesFound: '未找到符合条件的遗迹，请尝试调整筛选条件。',
    
    // Detail
    siteDetails: '遗迹详情',
    unescoBadge: '联合国教科文组织世界遗产',
    bestTimeLabel: '最佳游览时间',
    crowdLabel: '人流情况',
    drivingTimeLabel: '距利雅得车程',
    startingPriceLabel: '体验起始价格',
    sarUnit: '沙特里亚尔',
    
    narrateButton: '讲故事给我听',
    narrateLoading: '阿布·法伊萨尔正在为您召唤历史...',
    narrationLangLabel: '讲述语言：',
    sourcesLabel: '经核实来源与文献：',
    instantVoiceBadge: '即时说书人语音',
    
    btnPlanDay: '在此规划一日游',
    btnAskStoryteller: '咨询说书人',
    btnBookVisit: '预订参观',
    btnNextStory: '下一个故事',
    
    // Booking Form
    bookingTitle: '预订遗迹参观',
    bookingSubtitle: '选择您的日期与偏好体验',
    dateLabel: '参观日期',
    timeSlotLabel: '偏好时段（避暑设计）',
    slotMorning: '清晨（清凉微风）',
    slotAfternoon: '傍晚（金色夕阳）',
    slotEvening: '夜间（璀璨灯光）',
    expTypeLabel: '体验类型',
    expGuided: '文化遗产专家讲解游',
    expSelf: '自助探索通行证',
    expVip: 'VIP 皇家款待体验',
    partySizeLabel: '参观人数',
    totalPriceLabel: '预估总价：',
    confirmBookingBtn: '立即确认预订',
    loginToBookNotice: '请登录或以访客身份继续以完成预订。',
    bookingSuccess: '您的预订已成功确认！参考编号：',
    
    // Day Planner
    plannerTitle: '智能遗产一日游规划器',
    plannerSubtitle: '人工智能行程规划，兼顾祷告时间、车程与天气',
    selectSitesLabel: '1. 选择您希望参观的遗迹：',
    enterPrayersLabel: '2. 今日祷告时间与天气：',
    autofillPrayersBtn: '自动填充（利雅得默认）',
    generateItineraryBtn: '生成我的行程',
    generatingItinerary: '阿布·法伊萨尔正在为您安排行程时间表与祷告停靠...',
    itineraryResultsTitle: '阿布·法伊萨尔认可的行程表',
    
    // Chat
    chatTitle: '说书人茶室 (Majlis)',
    chatSubtitle: '与阿布·法伊萨尔交谈，探索沙特历史、部落、美食与文化',
    chatPlaceholder: '向阿布·法伊萨尔询问关于沙特遗产的任何问题...',
    suggestedQuestionsLabel: '推荐问题：',
    q1: '谁建造了黑格拉，他们当时是如何生活的？',
    q2: '吉达古城附近有哪些著名的传统美食？',
    q3: '告诉我德里耶和萨尔瓦宫的历史',
    q4: '什么时候游览里贾尔·阿尔马最好，怎么去？',
    listenAloudBtn: '朗读回答',
    
    // Auth
    authTitle: '欢迎来到 AWABID',
    authSubtitle: '登录以管理您的遗产预订与保存的行程',
    emailLabel: '电子邮件地址',
    sendCodeBtn: '发送验证码',
    otpLabel: '验证码 (OTP)',
    verifyBtn: '验证并进入',
    guestBtn: '以访客身份继续',
    otpSentNotice: '验证码已发送！（体验请输入 123456）',
    
    // Dashboard
    dashboardTitle: '个人预订控制面板',
    dashboardSubtitle: '管理即将到来的行程并查看以往参观记录',
    tabUpcoming: '即将行程',
    tabPast: '往期与已取消',
    noBookings: '该分类下暂无预订。',
    cancelBookingBtn: '取消预订',
    confirmCancelTitle: '确认取消',
    confirmCancelBody: '您确定要取消编号为以下内容的预订吗：',
    confirmCancelYes: '是的，取消预订',
    confirmCancelNo: '保留预订',
    bookingReference: '参考编号：',
    
    // 404
    notFoundTitle: '这个页面随商队走迷路了！',
    notFoundDesc: '您似乎走上了沙漠中未有人走过的小径。让我们带您回到绿洲。',
    backHomeBtn: '返回首页',
  },
};
