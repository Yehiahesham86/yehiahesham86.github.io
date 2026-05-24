/* ================================================================
   REFERRAL KNOWLEDGE BOOK — Creative Interactive Edition
   ================================================================ */

// ── Language ─────────────────────────────────────────────────────
let currentLang = localStorage.getItem('rkb-lang') || 'en';

// ── Analysis Fields ─────────────────────────────────────────────
const FIELDS = [
  { icon:'🎯', label:'Main Objective',        label_ar:'الهدف الرئيسي',             list:false,
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { icon:'🧠', label:'Customer Psychology',   label_ar:'علم نفس العميل',             list:false,
    text:'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { icon:'⏱️', label:'Best Timing',           label_ar:'أفضل توقيت',                list:false,
    text:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
  { icon:'📊', label:'Customer Indicators',   label_ar:'مؤشرات العميل',              list:true,
    items:['Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit','Neque porro quisquam est qui dolorem ipsum quia dolor sit amet','Ut labore et dolore magnam aliquam quaerat voluptatem minima','Quis autem vel eum iure reprehenderit in ea voluptate velit'] },
  { icon:'🔄', label:'Conversation Flow',     label_ar:'تدفق المحادثة',              list:false,
    text:'1. Nemo enim ipsam → 2. Quia voluptas sit aspernatur → 3. Aut odit aut fugit → 4. Sed quia consequuntur → 5. Perferendis doloribus asperiores repellat.' },
  { icon:'🔁', label:'Common Patterns',       label_ar:'الأنماط الشائعة',            list:true,
    items:['Pattern A — At vero eos et accusamus et iusto odio dignissimos','Pattern B — Nam libero tempore soluta nobis eligendi optio cumque','Pattern C — Temporibus autem quibusdam et aut officiis debitis','Pattern D — Itaque earum rerum hic tenetur a sapiente delectus'] },
  { icon:'💡', label:'Referral Opportunities',label_ar:'فرص الريفيرال',                list:true,
    items:['Quis nostrum exercitationem ullam corporis suscipit laboriosam','Nisi ut aliquid ex ea commodi consequatur quis autem vel','Iure reprehenderit qui in ea voluptate velit esse quam nihil','Molestiae consequatur vel illum qui dolorem eum fugiat quo'] },
  { icon:'⚠️', label:'Objection Indicators',  label_ar:'مؤشرات الاعتراض',           list:true,
    items:['Temporibus autem quibusdam aut officiis debitis rerum necessitatibus','Et harum quidem rerum facilis est et expedita distinctio nam','Tempore cum soluta nobis eligendi optio cumque nihil impedit','Quo minus id quod maxime placeat facere possimus omnis voluptas'] },
  { icon:'✅', label:'Successful Behaviors',  label_ar:'السلوكيات الناجحة',          list:true,
    items:['Assumenda est omnis dolor repellendus temporibus quibusdam','Aut officiis debitis aut rerum necessitatibus saepe eveniet ut','Et voluptates repudiandae sint et molestiae non recusandae','Earum rerum hic tenetur a sapiente delectus ut aut reiciendis'] },
  { icon:'📝', label:'Notes & Insights',      label_ar:'ملاحظات وأفكار',             list:false,
    text:'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus omnis voluptas assumenda est, omnis dolor repellendus temporibus.' },
];

// ── Category Data ────────────────────────────────────────────────
const CATS = [
  { id:'service-calls', icon:'📞', group:'The Conversation', group_ar:'المحادثة',
    title:'Referral During Service Calls', title_ar:'الريفيرال خلال مكالمات الخدمة',
    color:'#4F8EF7', cl:'rgba(79,142,247,.15)', glow:'rgba(79,142,247,.2)',
    grad:'linear-gradient(135deg,#4F8EF7,#6366F1)',
    topics:['Best Timing During Service Calls','Types of Service Calls That Generate Referrals','Customer Engagement Level','Customer Satisfaction Indicators','Referral Request Positioning','Referral Opportunities During Conversation','Referral Objection Patterns','Successful Referral Moments'],
    topics_ar:['أفضل توقيت خلال مكالمات الخدمة','أنواع مكالمات الخدمة التي تولّد إحالات','مستوى تفاعل العميل','مؤشرات رضا العميل','طريقة تقديم طلب الريفيرال','فرص الريفيرال خلال المحادثة','أنماط اعتراض الريفيرال','لحظات الريفيرال الناجحة'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Build the CM\'s image as a "Success Mentor" or "Academic Advisor" fully responsible for the student\'s journey — not just a salesperson. The primary focus is commitment, development plans, personal follow-up, and long-term trust. The referral is introduced by linking it to: trust already built, visible results, gifts & rewards, and mutual benefit.',
        text_ar:'بناء صورة الـ CM بوصفه "مرشد نجاح" أو "مستشار أكاديمي" يتحمل المسؤولية الكاملة عن رحلة الطالب — لا مجرد بائع. ينصبّ التركيز الأساسي على الالتزام، وخطط التطوير، والمتابعة الشخصية، وبناء الثقة على المدى البعيد. يُقدَّم الريفيرال من خلال ربطه بـ: الثقة المتراكمة، والنتائج الملموسة، والهدايا والمكافآت، والمنفعة المتبادلة.',
        text_zh:'将CM的形象塑造为"成功导师"或"学业顾问"，全面负责学生的学习历程，而不仅仅是销售人员。核心重点在于承诺、发展规划、个人跟进以及长期信任关系的建立。推荐邀约的切入点包括：已建立的信任、可见的学习成果、礼品奖励以及双方共赢的利益。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Three psychological approaches used in first calls after payment:\n\n(1) SUCCESS MENTOR: Customer feels they have a dedicated success partner. Referral feels like a natural extension of a trusted relationship — not a sales ask.\n\n(2) VIP GOLDEN SEATS: Status and exclusivity drive referral behavior. The "VIP seat" framing creates a privilege worth sharing.\n\n(3) FRIENDLY EMOTIONAL: Personal rapport and warmth lower all barriers. The customer refers because they like the CM personally, not just the product.',
        text_ar:'ثلاثة مداخل نفسية تُستخدم في المكالمات الأولى بعد الدفع:\n\n(1) مرشد النجاح: يشعر العميل أن لديه شريكاً مخصصاً لنجاحه. يبدو الريفيرال امتداداً طبيعياً لعلاقة ثقة راسخة — لا مجرد طلب بيع.\n\n(2) المقاعد الذهبية VIP: يقود الوضع الاجتماعي والحصرية سلوكَ الريفيرال. يخلق إطار "المقعد VIP" امتيازاً يستحق المشاركة.\n\n(3) الأسلوب الودي العاطفي: يُزيل الألفة الشخصية والدفء كل الحواجز. يرشح العميل لأنه يحبّ الـ CM شخصياً، لا المنتج فحسب.',
        text_zh:'付款后首次通话中使用的三种心理切入方式：\n\n(1) 成功导师法：客户感受到自己拥有一位专属成功伙伴。推荐邀约显得是信任关系的自然延伸，而非推销行为。\n\n(2) VIP尊享席位法：社会地位感与尊享感驱动推荐行为。"VIP席位"的定位创造出一种值得与他人分享的特权体验。\n\n(3) 情感亲近法：个人亲切感与温情化解一切障碍。客户愿意推荐，是因为欣赏CM这个人，而不仅仅是产品本身。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Approach 1 (Success Mentor): Customer asks many system questions and needs academic reassurance',
          'Approach 1 (Success Mentor): Customer has more than one child or is a long-term potential',
          'Approach 2 (VIP Seats): Customer values quality, exclusivity, or financial value',
          'Approach 2 (VIP Seats): Family with multiple children or financially capable parents',
          'Approach 3 (Friendly): Warm, social mothers — ideal for fast, rapport-led calls',
          'Approach 3 (Friendly): Hesitant customers who need comfort before any commitment'
        ],
        items_ar:[
          'النهج 1 (مرشد النجاح): يطرح العميل أسئلة كثيرة حول النظام ويحتاج إلى طمأنة أكاديمية',
          'النهج 1 (مرشد النجاح): لدى العميل أكثر من طفل أو يمتلك إمكانية علاقة طويلة الأمد',
          'النهج 2 (مقاعد VIP): يُقدّر العميل الجودة والحصرية أو القيمة المالية',
          'النهج 2 (مقاعد VIP): عائلة لديها أطفال متعددون أو آباء قادرون مالياً',
          'النهج 3 (الودي): أمهات دافئات واجتماعيات — مثالي للمكالمات السريعة المبنية على الألفة',
          'النهج 3 (الودي): عملاء مترددون يحتاجون إلى راحة نفسية قبل أي التزام'
        ],
        items_zh:[
          '方式一（成功导师）：客户提出大量关于系统的问题，需要学业方面的安抚与引导',
          '方式一（成功导师）：客户家中有多个孩子，或具有长期合作的潜力',
          '方式二（VIP席位）：客户注重品质、尊享体验或性价比',
          '方式二（VIP席位）：多孩家庭或经济实力较强的家长',
          '方式三（情感亲近）：热情外向的妈妈们——适合快节奏、以亲密感为主导的通话',
          '方式三（情感亲近）：犹豫不决的客户，需要在做出承诺前建立心理安全感'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Mentions who referred them — opens door for the referral program explanation',
          'Asks about scheduling in detail — signals genuine commitment intention',
          'Asks about the 12-session rule or level system — academically engaged',
          'Responds positively to "VIP seat" or "golden seat" framing',
          'Warm and friendly tone — ideal signal for Approach 3'
        ],
        items_ar:[
          'يذكر من أحاله — يفتح الباب لشرح برنامج الريفيرال',
          'يسأل عن الجدول بالتفصيل — يدل على نية التزام حقيقية',
          'يسأل عن قاعدة الـ 12 حصة أو نظام المستويات — منخرط أكاديمياً',
          'يستجيب إيجابياً لإطار "المقعد VIP" أو "المقعد الذهبي"',
          'لهجة دافئة وودية — إشارة مثالية للنهج 3'
        ],
        items_zh:[
          '主动提到介绍人——为解释推荐计划打开话题',
          '详细询问课程安排——表明有真实的报名意向',
          '询问"12节课规则"或分级制度——具有较强的学习意识',
          '对"VIP席位"或"黄金席位"的说法反应积极',
          '语气热情友好——方式三的理想信号'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'APPROACH 1 — Success Mentor:\nCongratulate on subscription ⬅️ Introduce as Success Mentor ⬅️ Understand student profile & level ⬅️ Explain 12-session commitment rule ⬅️ Fix weekly schedule ⬅️ Explain prep + homework + follow-up ⬅️ Introduce referral program & rewards\n\nAPPROACH 2 — VIP Golden Seats:\nCongratulate on "golden seats" ⬅️ Analyze children\'s levels ⬅️ Explain Golden or Elite schedule options ⬅️ Explain session minimums ⬅️ Present 5 VIP referral seats ⬅️ Explain cashback & prize options\n\nAPPROACH 3 — Friendly Emotional:\nEmotional welcome ⬅️ Build personal comfort ⬅️ Simple system walkthrough ⬅️ Fix schedule ⬅️ Friendly referral request ⬅️ WhatsApp follow-up',
        text_ar:'النهج 1 — مرشد النجاح:\nالتهنئة بالاشتراك ⬅️ التعريف بالنفس كمرشد نجاح ⬅️ فهم ملف الطالب ومستواه ⬅️ شرح قاعدة الـ 12 حصة ⬅️ تثبيت الجدول الأسبوعي ⬅️ شرح التحضير والواجبات والمتابعة ⬅️ تقديم برنامج الريفيرال والمكافآت\n\nالنهج 2 — المقاعد الذهبية VIP:\nالتهنئة بـ"المقاعد الذهبية" ⬅️ تحليل مستويات الأطفال ⬅️ شرح خيارات الجدول الذهبي أو النخبة ⬅️ شرح الحد الأدنى للحصص ⬅️ تقديم 5 مقاعد VIP للترشيحات ⬅️ شرح خيارات الكاش باك والجوائز\n\nالنهج 3 — الودي العاطفي:\nترحيب عاطفي ⬅️ بناء الراحة الشخصية ⬅️ جولة بسيطة على النظام ⬅️ تثبيت الجدول ⬅️ طلب الريفيرال بأسلوب ودي ⬅️ متابعة واتساب',
        text_zh:'方式一——成功导师：\n恭喜开通会员 ⬅️ 自我介绍为成功导师 ⬅️ 了解学生学情与水平 ⬅️ 说明"12节课承诺规则" ⬅️ 确定每周课程安排 ⬅️ 介绍预习、作业与跟进机制 ⬅️ 介绍推荐计划与奖励\n\n方式二——VIP黄金席位：\n恭喜获得"黄金席位" ⬅️ 分析孩子的学习水平 ⬅️ 介绍黄金或精英课程安排选项 ⬅️ 说明最低课时要求 ⬅️ 推出5个VIP推荐名额 ⬅️ 说明返现与奖品选项\n\n方式三——情感亲近：\n热情欢迎 ⬅️ 建立个人亲密感 ⬅️ 简单介绍系统操作 ⬅️ 确定课程安排 ⬅️ 以友好方式提出推荐请求 ⬅️ 微信/WhatsApp后续跟进' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Pattern A — "You came from [Name], she gets rewards — now you have the same opportunity" (Approach 1)',
          'Pattern B — VIP framing: "مقعدك VIP وبيعطيك 5 مقاعد مجانية تهديهم لزملائك" (Approach 2)',
          'Pattern C — Mention specific reward numbers: 230 SAR cashback, 20 free sessions, or iPad (Approach 2)',
          'Pattern D — Friendly peer comparison: "كوني شاطرة زي صاحبتك وترشحي ناس" (Approach 3)'
        ],
        items_ar:[
          'النمط أ — "أنتِ جاية من طرف [الاسم]، وهي بتستفيد بمكافآت — والآن عندك نفس الفرصة" (النهج 1)',
          'النمط ب — إطار VIP: "مقعدك VIP وبيعطيك 5 مقاعد مجانية تهديهم لزملائك" (النهج 2)',
          'النمط ج — ذكر أرقام المكافآت المحددة: 230 ريال كاش باك، 20 حصة مجانية، أو آيباد (النهج 2)',
          'النمط د — مقارنة الأقران بأسلوب ودي: "كوني شاطرة زي صاحبتك وترشحي ناس" (النهج 3)'
        ],
        items_zh:[
          '模式A——"您是通过[介绍人姓名]来的，她正在享受推荐奖励——现在您也有同样的机会"（方式一）',
          '模式B——VIP框架："您的席位是VIP席位，可以免费赠送5个名额给朋友"（方式二）',
          '模式C——明确奖励数字：230沙特里亚尔返现、20节免费课程或iPad（方式二）',
          '模式D——友好同伴对比："像您的朋友一样聪明，也来推荐一些人吧"（方式三）'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Approach 1 — Success Mentor Openers:\n"حضرتك دخلتي المنصة من طرف أم منى، وهي بتستفيد بهدايا وجوائز من ترشيحك."\n"دلوقتي صار عندك نفس فرصة الترشيحات، وأي شخص يشترك من طرفك بتحصلي على كاش باك أو حصص مجانية."\n\nApproach 2 — VIP Seat Openers:\n"مقعدكم VIP وبيعطيكم 5 مقاعد مجانية تهدوها لزملائكم."\n"أي شخص يسجل من طرفك بتحصلوا على 60 دولار أو حصص مجانية."\n\nApproach 3 — Friendly Openers:\n"بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس."\n"ابعثيلي الأرقام وأنا أتابع معهم بنفسي."',
        text_ar:'النهج 1 — افتتاحيات مرشد النجاح:\n"حضرتك دخلتي المنصة من طرف أم منى، وهي بتستفيد بهدايا وجوائز من ترشيحك."\n"دلوقتي صار عندك نفس فرصة الترشيحات، وأي شخص يشترك من طرفك بتحصلي على كاش باك أو حصص مجانية."\n\nالنهج 2 — افتتاحيات مقاعد VIP:\n"مقعدكم VIP وبيعطيكم 5 مقاعد مجانية تهدوها لزملائكم."\n"أي شخص يسجل من طرفك بتحصلوا على 60 دولار أو حصص مجانية."\n\nالنهج 3 — افتتاحيات ودية:\n"بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس."\n"ابعثيلي الأرقام وأنا أتابع معهم بنفسي."',
        text_zh:'方式一——成功导师开场话术：\n"您是通过[介绍人]加入平台的，她正在因您的注册而获得礼品和奖励。"\n"现在您也拥有同样的推荐机会，任何通过您报名的人，您都能获得返现或免费课程。"\n\n方式二——VIP席位开场话术：\n"您的席位是VIP席位，可以免费赠送5个名额给同学或朋友。"\n"任何通过您注册的人，您都可以获得60美元或免费课程。"\n\n方式三——亲切友好开场话术：\n"我希望您也能像您的朋友一样，积极地推荐身边的人。"\n"把联系方式发给我，我来亲自跟进。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"بدي البنات يعتمدوا على حالهم."\n→ "بالبداية فقط رح يحتاجوا متابعة بسيطة، وبعدها رح يعتمدوا على حالهم بالكامل."\n\n"ما عندي ناس أرشحهم حاليًا."\n→ "عادي جدًا، حتى بالمستقبل لو في أي شخص مهتم ابعثيلي رقمه وأنا أتابع معه."\n\n"ما بعرف إذا الناس رح توافق."\n→ "ابعثيلي الأرقام أول، وأنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."\n\n"ليش ما أخذت جائزة رغم تسجيلي أكثر من طفل؟"\n→ "خليني أرفع لك الطلب وأشوف أفضل استثناء ممكن ينفعكم."',
        text_ar:'"بدي البنات يعتمدوا على حالهم."\n→ "بالبداية فقط رح يحتاجوا متابعة بسيطة، وبعدها رح يعتمدوا على حالهم بالكامل."\n\n"ما عندي ناس أرشحهم حاليًا."\n→ "عادي جدًا، حتى بالمستقبل لو في أي شخص مهتم ابعثيلي رقمه وأنا أتابع معه."\n\n"ما بعرف إذا الناس رح توافق."\n→ "ابعثيلي الأرقام أول، وأنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."\n\n"ليش ما أخذت جائزة رغم تسجيلي أكثر من طفل؟"\n→ "خليني أرفع لك الطلب وأشوف أفضل استثناء ممكن ينفعكم."',
        text_zh:'"我希望孩子能独立学习。"\n→ "最开始只需要一点简单的辅助，之后他们就完全可以自主学习了。"\n\n"目前没有可以推荐的人。"\n→ "完全没问题，以后如果有感兴趣的人，把他们的联系方式发给我，我来跟进。"\n\n"不确定别人会不会感兴趣。"\n→ "先把号码给我，在您和他们沟通之前，我不会主动联系任何人。"\n\n"我注册了不止一个孩子，为什么没有收到奖励？"\n→ "让我来帮您提交申请，看看能为您争取到什么最优方案。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Closing: "أنا رح أكون متابعة معكم طول الرحلة التعليمية."',
          'Closing: "رح أرسل لك كل التفاصيل على الواتساب."',
          'Closing (Friendly): "يا عمري أي شيء تحتاجيه أنا موجودة."',
          'WhatsApp: "هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          'WhatsApp: "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨"'
        ],
        items_ar:[
          'إغلاق: "أنا رح أكون متابعة معكم طول الرحلة التعليمية."',
          'إغلاق: "رح أرسل لك كل التفاصيل على الواتساب."',
          'إغلاق (ودي): "يا عمري أي شيء تحتاجيه أنا موجودة."',
          'واتساب: "هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          'واتساب: "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨"'
        ],
        items_zh:[
          '结束语："我会全程陪伴你们的学习旅程。"',
          '结束语："我会把所有详情发到WhatsApp上给您。"',
          '结束语（亲切版）："亲爱的，有任何需要随时找我。"',
          'WhatsApp："这是推荐计划链接 🎁 任何通过您注册的人都可以获得免费课程或返现。"',
          'WhatsApp："已为您发送平台介绍视频 + 课程进入指南 ✨"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أستاذ أحمد × أم زينب (Approach 1 — Success Mentor):\n"ألف ألف مبروك للأولاد وإن شاء الله تكون بداية خير معهم..مع حضرتك أستاذ أحمد معلم النجاح الخاص بالأولاد وأنا اللي هتابع مع حضرتك إن شاء الله..هنثبت الجدول من السبت للاثنين الساعة 8..مهم جدًا الالتزام بالـ 12 حصة عشان نشوف نتائج حقيقية..آخر حاجة عندنا برنامج الترشيحات..حضرتك دخلتي من طرف أم منى وهي بتستفيد بهدايا وجوائز..وأنت كمان تقدري تستفيدي لما ترشحي أشخاص للمنصة."',
          '🛑 Case 2 — دكتور عمر × أم سلمان (Approach 2 — VIP Golden Seats):\n"حبيت أبارك لك على المقاعد الذهبية اللي سجلتوا عليها..عندكم خيار الجدول الذهبي أو جدول النخبة..والآن صار معكم 5 مقاعد VIP للترشيحات..وأي شخص يسجل من طرفكم بتحصلوا على 60 دولار أو حصص مجانية."',
          '🛑 Case 3 — أستاذة سارة × أم محمد (Approach 3 — Friendly Emotional):\n"يا عمري والله صوتك يخطف القلب..بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس..أي شخص يشترك من طرفك رح أضيف لك حصص مجانية..وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 Case 4 — أستاذة أمواج × أم ملاك (Approach 2 — VIP):\n"هلا يا روحي..معك المشرفة التعليمية أمواج من منصة Five Talk..أم ماريا وصتني عليكم..بدنا نيجي لقسم الجوائز..مقعدكم VIP وبيعطيكم 5 مقاعد مجانية تهدوها لزملائكم..وأي شخص يسجل من طرفكم بتنضاف حصص مجانية على الباقة."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أستاذ أحمد × أم زينب (النهج 1 — مرشد النجاح):\n"ألف ألف مبروك للأولاد وإن شاء الله تكون بداية خير معهم..مع حضرتك أستاذ أحمد معلم النجاح الخاص بالأولاد وأنا اللي هتابع مع حضرتك إن شاء الله..هنثبت الجدول من السبت للاثنين الساعة 8..مهم جدًا الالتزام بالـ 12 حصة عشان نشوف نتائج حقيقية..آخر حاجة عندنا برنامج الترشيحات..حضرتك دخلتي من طرف أم منى وهي بتستفيد بهدايا وجوائز..وأنت كمان تقدري تستفيدي لما ترشحي أشخاص للمنصة."',
          '🛑 الحالة 2 — دكتور عمر × أم سلمان (النهج 2 — المقاعد الذهبية VIP):\n"حبيت أبارك لك على المقاعد الذهبية اللي سجلتوا عليها..عندكم خيار الجدول الذهبي أو جدول النخبة..والآن صار معكم 5 مقاعد VIP للترشيحات..وأي شخص يسجل من طرفكم بتحصلوا على 60 دولار أو حصص مجانية."',
          '🛑 الحالة 3 — أستاذة سارة × أم محمد (النهج 3 — الودي العاطفي):\n"يا عمري والله صوتك يخطف القلب..بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس..أي شخص يشترك من طرفك رح أضيف لك حصص مجانية..وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 الحالة 4 — أستاذة أمواج × أم ملاك (النهج 2 — VIP):\n"هلا يا روحي..معك المشرفة التعليمية أمواج من منصة Five Talk..أم ماريا وصتني عليكم..بدنا نيجي لقسم الجوائز..مقعدكم VIP وبيعطيكم 5 مقاعد مجانية تهدوها لزملائكم..وأي شخص يسجل من طرفكم بتنضاف حصص مجانية على الباقة."'
        ],
        items_zh:[
          '🛑 案例1——Ahmed老师 × Zainab妈妈（方式一——成功导师）：\n"衷心祝贺孩子们开课，希望这是一个美好的开始。我是Ahmed老师，专门负责陪伴孩子们走向成功的旅程，我会全程跟进。我们先把每周课程安排在周六到周一，每天8点。坚持12节课非常重要，这样才能看到真实进步。最后，我们还有一个推荐计划——您是通过[介绍人]加入的，她因您的注册获得了礼品和奖励，您也可以通过推荐身边的人来获得同样的好处。"',
          '🛑 案例2——Omar医生 × Salman妈妈（方式二——VIP黄金席位）：\n"想恭喜您成功获得黄金席位！您可以选择黄金课程或精英课程安排。现在您还拥有5个VIP推荐名额，任何通过您注册的人，您都能获得60美元或免费课程。"',
          '🛑 案例3——Sarah老师 × Mohammad妈妈（方式三——情感亲近）：\n"您的声音真的太好听了！我希望您也能像您的朋友一样，积极推荐身边的人。任何通过您报名的人，我都会为您增加免费课程，所有事情由我来处理，您完全不用操心。"',
          '🛑 案例4——Amwaj老师 × Malak妈妈（方式二——VIP）：\n"您好！我是Five Talk平台的教学督导Amwaj老师，Maria妈妈向我推荐了您。我们今天来到奖励专区——您的席位是VIP席位，可以免费赠送5个名额给您的朋友，任何通过您注册的人都将获得额外免费课程。"'
        ]}
    ]},
  { id:'renewal', icon:'🔄', group:'The Conversation', group_ar:'المحادثة',
    title:'Referral During Renewal', title_ar:'الريفيرال خلال التجديد',
    color:'#14B8A6', cl:'rgba(20,184,166,.15)', glow:'rgba(20,184,166,.2)',
    grad:'linear-gradient(135deg,#14B8A6,#0D9488)',
    topics:['Renewal Satisfaction Level','Renewal Motivation','Retention Confidence','Customer Commitment Indicators','Referral Timing During Renewal'],
    topics_ar:['مستوى رضا التجديد','دوافع التجديد','ثقة الاحتفاظ بالعميل','مؤشرات التزام العميل','توقيت الريفيرال خلال التجديد'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Leverage the renewal moment — the customer\'s highest trust peak — to request referrals. Three proven approaches: (1) VIP Loyalty — make the parent feel like a top client then drop a soft "extra thing I wanted to ask" referral request. (2) Gamification — channel renewal excitement into prize competition (iPhone/iPad/PlayStation) by explaining the reward ladder. (3) Free Investment — for price-sensitive customers, reframe referral as a mechanism to renew the next cycle at zero cost.',
        text_ar:'توظيف لحظة التجديد — وهي قمة الثقة لدى العميل — لطلب الريفيرالات. ثلاثة مداخل مثبتة: (1) الولاء VIP — جعل الوالد يشعر أنه عميل متميز ثم تقديم طلب ريفيرال لطيف بصيغة "شغلة إضافية بسألك فيها". (2) التلعيب — توجيه حماس التجديد نحو منافسة الجوائز (آيفون/آيباد/بلايستيشن) عبر شرح سلّم المكافآت. (3) الاستثمار المجاني — لعملاء الحساسية السعرية، إعادة تأطير الريفيرال كآلية لتجديد الدورة القادمة بتكلفة صفرية.',
        text_zh:'充分利用续费这一时机——客户信任度处于最高峰——发起推荐邀约。三种经过验证的方式：(1) VIP忠诚客户法——让家长感受到自己是尊贵客户，然后以"还有件小事想问您"的方式轻松提出推荐请求。(2) 游戏化法——将续费的兴奋感引导向奖品竞争（iPhone/iPad/PlayStation），通过解释奖励阶梯来激励行动。(3) 免费投资法——针对价格敏感型客户，将推荐重新定位为"零成本续费下一周期"的机制。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Renewal is the ultimate commitment signal. The customer has overcome price resistance and chosen to stay — they feel proud and validated. Three psychological levers:\n\n(1) VIP LOYALTY: Customer feels respected. A quiet referral ask feels like a natural favour between trusted partners, not a sales pitch.\n\n(2) GAMIFICATION: Renewal excitement transfers directly into prize-hunting motivation. Specific math ("5 subscriptions = iPhone") creates a personal challenge they want to win.\n\n(3) FREE INVESTMENT: Reframes the financial outlay — "you could have renewed for free." Converts guilt about cost into motivation to refer.',
        text_ar:'التجديد إشارة الالتزام الأقوى. لقد تجاوز العميل مقاومة السعر واختار البقاء — يشعر بالفخر والتقدير. ثلاثة روافع نفسية:\n\n(1) الولاء VIP: يشعر العميل بالاحترام. يبدو طلب الريفيرال الهادئ معروفاً طبيعياً بين شركاء موثوقين، لا عرضاً تجارياً.\n\n(2) التلعيب: ينتقل حماس التجديد مباشرة إلى دافع الفوز بالجوائز. الحسابات المحددة ("5 اشتراكات = آيفون") تخلق تحدياً شخصياً يريدون الفوز به.\n\n(3) الاستثمار المجاني: يُعيد تأطير الإنفاق المالي — "كان بإمكانك التجديد مجاناً." يحوّل الشعور بالذنب تجاه التكلفة إلى دافع للترشيح.',
        text_zh:'续费是最强的承诺信号。客户已经克服了价格抗拒并选择留下——他们感到自豪和被认可。三大心理杠杆：\n\n(1) VIP忠诚：客户感到被尊重。轻声提出推荐请求，感觉像是信任伙伴之间的自然互帮，而非推销。\n\n(2) 游戏化：续费的兴奋感直接转化为争夺奖品的动力。具体的算法（"5个订阅=iPhone"）创造出他们迫切想要赢得的个人挑战。\n\n(3) 免费投资：重新框架财务支出——"您本可以免费续费。"将对费用的愧疚感转化为推荐的动力。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Immediately after the customer confirms payment for the new cycle — peak commitment window',
          'After praising the child\'s long-term progress or milestone achievement',
          'After discussing the new schedule or upgraded plan details',
          'VIP approach: long-term subscriber or multi-child family',
          'Gamification approach: social customer who mentions groups, friends, or networks',
          'Free Investment approach: customer hesitates about cost or asks for discounts during renewal'
        ],
        items_ar:[
          'فور تأكيد العميل للدفع للدورة الجديدة — نافذة الالتزام في أعلاها',
          'بعد الإشادة بالتقدم طويل الأمد للطفل أو إنجازه لمرحلة محددة',
          'بعد مناقشة تفاصيل الجدول الجديد أو الخطة المطورة',
          'النهج VIP: مشترك قديم أو عائلة لديها أطفال متعددون',
          'نهج التلعيب: عميل اجتماعي يذكر مجموعات أو أصدقاء أو شبكة معارف',
          'نهج الاستثمار المجاني: يتردد العميل في التكلفة أو يطلب خصومات خلال التجديد'
        ],
        items_zh:[
          '客户确认续费付款后立即——承诺窗口处于最高点',
          '称赞孩子的长期进步或阶段性成就之后',
          '讨论完新课程安排或升级计划详情之后',
          'VIP方式：长期订阅用户或多孩家庭',
          '游戏化方式：提到群组、朋友或人脉网络的社交型客户',
          '免费投资方式：客户在续费时对费用犹豫或要求打折'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Just confirmed payment — highest trust and lowest resistance',
          'Mentions child\'s improvement or satisfaction during this subscription cycle',
          'Has multiple children enrolled or is upgrading to a larger package',
          'Mentions friends, family, or school groups spontaneously',
          'Asks about discounts or price — Free Investment opportunity signal'
        ],
        items_ar:[
          'أكّد للتو الدفع — أعلى مستوى للثقة وأدنى مقاومة',
          'يذكر تحسّن الطفل أو رضاه خلال دورة الاشتراك هذه',
          'لديه أطفال متعددون مسجّلون أو يُرقّي إلى باقة أكبر',
          'يذكر الأصدقاء أو العائلة أو مجموعات المدرسة تلقائياً',
          'يسأل عن الخصومات أو السعر — إشارة فرصة الاستثمار المجاني'
        ],
        items_zh:[
          '刚刚确认付款——信任度最高，抗拒感最低',
          '提到孩子在本订阅周期内的进步或满意度',
          '家中有多个孩子已注册，或正在升级到更大套餐',
          '自然地提到朋友、家人或学校群组',
          '询问折扣或价格——免费投资机会的信号'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'APPROACH 1 — VIP Loyalty:\nPraise child + call parent a VIP client ⬅️ Confirm renewal ⬅️ "شغلة إضافية بسألك فيها" ⬅️ Request 1-2 interested numbers ⬅️ Confirm 20 free sessions per referral ⬅️ WhatsApp follow-up\n\nAPPROACH 2 — Gamification:\nConfirm renewal ⬅️ "Did you know about the prize competition?" ⬅️ Explain ladder: sessions → voucher → iPad → iPhone ⬅️ Request numbers + referral code ⬅️ Send brochure via WhatsApp\n\nAPPROACH 3 — Free Investment:\nPraise child ⬅️ Renewal confirmed ⬅️ Financial hesitation or CM introduces idea ⬅️ "You could renew for free" ⬅️ Each referral = 20 free sessions ⬅️ WhatsApp follow-up\n\nAPPROACH 4 — Friendly Recommendation:\nClose renewal ⬅️ Mention friend/relative who might benefit ⬅️ "أرسلي رقمها وأنا أشبكها على الحساب" ⬅️ First notification goes to parent',
        text_ar:'النهج 1 — الولاء VIP:\nمدح الطفل + تسمية الوالد عميلاً VIP ⬅️ تأكيد التجديد ⬅️ "شغلة إضافية بسألك فيها" ⬅️ طلب 1-2 رقم مهتم ⬅️ تأكيد 20 حصة مجانية لكل ريفيرال ⬅️ متابعة واتساب\n\nالنهج 2 — التلعيب:\nتأكيد التجديد ⬅️ "هل تعرف عن منافسة الجوائز؟" ⬅️ شرح السلّم: حصص → قسيمة → آيباد → آيفون ⬅️ طلب الأرقام + كود الريفيرال ⬅️ إرسال البروشور عبر واتساب\n\nالنهج 3 — الاستثمار المجاني:\nمدح الطفل ⬅️ تأكيد التجديد ⬅️ تردد مالي أو يطرح الـ CM الفكرة ⬅️ "كان بإمكانك التجديد مجاناً" ⬅️ كل ريفيرال = 20 حصة مجانية ⬅️ متابعة واتساب\n\nالنهج 4 — التوصية الودية:\nإغلاق التجديد ⬅️ ذكر صديق/قريب قد يستفيد ⬅️ "أرسلي رقمها وأنا أشبكها على الحساب" ⬅️ أول إشعار يذهب للوالد',
        text_zh:'方式一——VIP忠诚：\n夸赞孩子 + 称呼家长为VIP客户 ⬅️ 确认续费 ⬅️ "还有件小事想请教您" ⬅️ 请求1-2个感兴趣的联系方式 ⬅️ 确认每次推荐可获得20节免费课程 ⬅️ WhatsApp后续跟进\n\n方式二——游戏化：\n确认续费 ⬅️ "您了解我们的奖品竞赛吗？" ⬅️ 介绍奖励阶梯：课程→购物券→iPad→iPhone ⬅️ 请求联系方式 + 推荐码 ⬅️ 通过WhatsApp发送宣传资料\n\n方式三——免费投资：\n夸赞孩子 ⬅️ 确认续费 ⬅️ 客户表达财务顾虑或CM主动引出话题 ⬅️ "您本可以免费续费" ⬅️ 每次推荐 = 20节免费课程 ⬅️ WhatsApp后续跟进\n\n方式四——友好推荐：\n完成续费 ⬅️ 提到可能受益的朋友/亲戚 ⬅️ "把她的号码发给我，我来帮她关联账户" ⬅️ 第一条通知发给家长' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'VIP: "شغلة إضافية بسألك فيها... إذا في أحد من محيطك مهتم بتعلم الإنجليزي ممكن ترسلنا رقمه؟ وإذا سجل بيكون في إضافة 20 حصة هدية"',
          'Gamification: "جبتي عيال أخوك أو أختك وسجلوا… بينزل لك 60$ وبيربح بلايستيشن وأيباد" (أم سطام)',
          'Free Investment: "يعني كأنك عملت له تجديد بدون ما تدفعي ولا ريال" (أم إبراهيم)',
          'Friendly: "أرسلي لي رقمها عشان أشبكها على حساب شام… أول ما يدفع برسل لك" (أم شام)'
        ],
        items_ar:[
          'النمط VIP: "شغلة إضافية بسألك فيها... إذا في أحد من محيطك مهتم بتعلم الإنجليزي ممكن ترسلنا رقمه؟ وإذا سجل بيكون في إضافة 20 حصة هدية"',
          'النمط التلعيب: "جبتي عيال أخوك أو أختك وسجلوا… بينزل لك 60$ وبيربح بلايستيشن وأيباد" (أم سطام)',
          'النمط الاستثمار المجاني: "يعني كأنك عملت له تجديد بدون ما تدفعي ولا ريال" (أم إبراهيم)',
          'النمط الودي: "أرسلي لي رقمها عشان أشبكها على حساب شام… أول ما يدفع برسل لك" (أم شام)'
        ],
        items_zh:[
          'VIP模式："还有件小事想问您……如果您周围有对学英语感兴趣的人，能把号码发给我们吗？如果他们注册，孩子可以额外获得20节免费课程"',
          '游戏化模式："把您兄弟姐妹的孩子也带来注册……您可以获得60美元，还能赢得PlayStation和iPad"',
          '免费投资模式："这就相当于您不花一分钱就为孩子完成了续费"',
          '友好模式："把她的号码发给我，我来帮她关联到账户……她付款后，我第一时间通知您"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'VIP Opening:\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."\n\nGameification:\n"جبتي عيال أخوك عيال أختك وسجلوا… بينزل لك 60$ وبيربح بلايستيشن وأيباد."\n\nFree Investment:\n"كل اشتراك بيجي من خلالك تأخذي 20 حصة."\n"كأنك جددتي بدون ما تدفعي ولا ريال."',
        text_ar:'افتتاحية VIP:\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."\n\nالتلعيب:\n"جبتي عيال أخوك عيال أختك وسجلوا… بينزل لك 60$ وبيربح بلايستيشن وأيباد."\n\nالاستثمار المجاني:\n"كل اشتراك بيجي من خلالك تأخذي 20 حصة."\n"كأنك جددتي بدون ما تدفعي ولا ريال."',
        text_zh:'VIP开场话术：\n"还有件想请教您的小事——如果您身边有对学英语感兴趣的朋友，能把他们的手机号发给我们吗？如果他们注册，孩子就能获赠20节额外课程。"\n\n游戏化话术：\n"把您兄弟姐妹的孩子也带来注册……可以获得60美元，还能赢得PlayStation和iPad。"\n\n免费投资话术：\n"每带来一个新订阅，您就能获得20节课程。"\n"相当于您完全不花钱就完成了续费。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"أنا عطيت أرقام قبل."\n→ "ممتاز جداً… وإذا في حدا مهتم زيادة ابعثه مباشرة عشان نضمن إضافته على الحساب."\n\n"بشوف إذا في حد مهتم."\n→ "أكيد، بس يكون شخص فعلاً مهتم حتى تستفيدوا كامل الاستفادة."\n\n"بخليها تدخل من الرابط."\n→ "الأفضل الرقم مباشرة حتى ما يضيع الربط."\n\n"ما أعرف أحد."\n→ "أكيد ممكن يطلع معك حدا لاحقاً… وخلي العرض عندك جاهز."',
        text_ar:'"أنا عطيت أرقام قبل."\n→ "ممتاز جداً… وإذا في حدا مهتم زيادة ابعثه مباشرة عشان نضمن إضافته على الحساب."\n\n"بشوف إذا في حد مهتم."\n→ "أكيد، بس يكون شخص فعلاً مهتم حتى تستفيدوا كامل الاستفادة."\n\n"بخليها تدخل من الرابط."\n→ "الأفضل الرقم مباشرة حتى ما يضيع الربط."\n\n"ما أعرف أحد."\n→ "أكيد ممكن يطلع معك حدا لاحقاً… وخلي العرض عندك جاهز."',
        text_zh:'"我之前已经给过号码了。"\n→ "非常好……如果还有其他感兴趣的人，直接发给我，确保及时关联到账户。"\n\n"我看看有没有感兴趣的人。"\n→ "当然，只要是真正有兴趣的人，您就能充分受益。"\n\n"让她直接用链接注册就好了。"\n→ "最好是直接发号码，避免关联丢失。"\n\n"我现在不认识合适的人。"\n→ "完全没关系，以后肯定会遇到的……先把这个优惠放在心里备用。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'VIP Closing: "أرسل لي الأرقام على الواتساب وأنا أضيفهم مباشرة على حساب عبد الرحمن."',
          'VIP Closing: "أي شخص يسجل من خلالكم بينزل لعبد الرحمن 20 حصة."',
          'Gamification Closing: "أرسل لك اللينك والبروشور وكود الترشيح."',
          'WhatsApp: "أرسل لي الأرقام المهتمة عشان أضيفها مباشرة على حساب عبد الرحمن ❤️"',
          'WhatsApp: "هذا كود الترشيح الخاص فيكم ❤️ أي شخص مهتم ابعثي رقمه مباشرة."'
        ],
        items_ar:[
          'إغلاق VIP: "أرسل لي الأرقام على الواتساب وأنا أضيفهم مباشرة على حساب عبد الرحمن."',
          'إغلاق VIP: "أي شخص يسجل من خلالكم بينزل لعبد الرحمن 20 حصة."',
          'إغلاق التلعيب: "أرسل لك اللينك والبروشور وكود الترشيح."',
          'واتساب: "أرسل لي الأرقام المهتمة عشان أضيفها مباشرة على حساب عبد الرحمن ❤️"',
          'واتساب: "هذا كود الترشيح الخاص فيكم ❤️ أي شخص مهتم ابعثي رقمه مباشرة."'
        ],
        items_zh:[
          'VIP结束语："把号码发到WhatsApp给我，我直接添加到账户中。"',
          'VIP结束语："任何通过您注册的人，孩子账户将自动增加20节课程。"',
          '游戏化结束语："我把链接、宣传册和推荐码都发给您。"',
          'WhatsApp："请把感兴趣的联系方式发给我，我直接添加到孩子账户 ❤️"',
          'WhatsApp："这是您的专属推荐码 ❤️ 有感兴趣的人请直接发号码给我。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أبو عبد الرحمن (VIP Approach):\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."',
          '🛑 Case 2 — أم سطام (Gamification):\n"جبتي عيال أخوك عيال أختك وسجلوا… بينزل لك 60$ وبيربح بلايستيشن وأيباد."',
          '🛑 Case 3 — أم إبراهيم (Free Investment):\n"يعني كأنك عملت له تجديد بدون ما تدفعي ولا ريال… اللهم أرسلتي لي رقم حدا بده يسجل."',
          '🛑 Case 4 — أم شام (Friendly Recommendation):\n"أرسلي لي رقمها عشان أشبكها على حساب شام… أول ما يدفع برسل لك."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أبو عبد الرحمن (النهج VIP):\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."',
          '🛑 الحالة 2 — أم سطام (التلعيب):\n"جبتي عيال أخوك عيال أختك وسجلوا… بينزل لك 60$ وبيربح بلايستيشن وأيباد."',
          '🛑 الحالة 3 — أم إبراهيم (الاستثمار المجاني):\n"يعني كأنك عملت له تجديد بدون ما تدفعي ولا ريال… اللهم أرسلتي لي رقم حدا بده يسجل."',
          '🛑 الحالة 4 — أم شام (التوصية الودية):\n"أرسلي لي رقمها عشان أشبكها على حساب شام… أول ما يدفع برسل لك."'
        ],
        items_zh:[
          '🛑 案例1——某位父亲（VIP方式）：\n"还有件小事想请教您——如果您周围有对学英语感兴趣的朋友，能把手机号发给我们吗？如果他们注册，孩子就能获赠20节额外课程作为礼物。"',
          '🛑 案例2——某位妈妈（游戏化方式）：\n"把您兄弟姐妹的孩子带来注册……可以获得60美元，还能赢得PlayStation和iPad。"',
          '🛑 案例3——某位妈妈（免费投资方式）：\n"这就相当于完全不花钱就为孩子续费了……您愿意把想注册的人的号码发给我吗？"',
          '🛑 案例4——某位妈妈（友好推荐方式）：\n"把她的号码发给我，我来帮她关联到账户……她付款后，我第一时间通知您。"'
        ]}
    ] },
  { id:'upgrade', icon:'⬆️', group:'The Conversation', group_ar:'المحادثة',
    title:'Referral During Upgrade', title_ar:'الريفيرال خلال الترقية',
    color:'#F97316', cl:'rgba(249,115,22,.15)', glow:'rgba(249,115,22,.2)',
    grad:'linear-gradient(135deg,#F97316,#EA580C)',
    topics:['Upgrade Excitement','Value Perception','Customer Motivation','Upsell Satisfaction','Referral Opportunity Timing'],
    topics_ar:['حماس الترقية','إدراك القيمة','دوافع العميل','رضا البيع الإضافي','توقيت فرصة الريفيرال'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Immediately after an upgrade, use cashback, free sessions, or vouchers to reframe the higher cost as an investment that can be partially recovered through referrals. The customer has just committed to a bigger financial step — positioning referral as "you can get part of this back" dramatically lowers their resistance and creates immediate action motivation.',
        text_ar:'فور إتمام الترقية، يُستخدم الكاش باك أو الحصص المجانية أو القسائم لإعادة تأطير التكلفة الأعلى بوصفها استثماراً يمكن استرداد جزء منه عبر الريفيرالات. العميل التزم للتو بخطوة مالية أكبر — تقديم الريفيرال على أنه "يمكنك استعادة جزء من هذا" يُخفّض مقاومته بشكل ملحوظ ويخلق دافعاً فورياً للتصرف.',
        text_zh:'升级完成后，立即利用返现、免费课程或购物券将更高的费用重新定位为"可通过推荐部分回收"的投资。客户刚刚做出了更大的财务承诺——以"您可以找回部分费用"为切入点，显著降低客户阻力，创造立即行动的动力。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Post-upgrade, the customer feels a mix of excitement (they chose to invest more in their child) and mild buyer\'s remorse (it cost more). Cashback/sessions directly target this tension:\n\n(1) COST OFFSET: "You paid more — but you can recover part of it" shifts the math in their favour.\n(2) SMART INVESTOR: Elite/VIP framing validates their upgrade decision — they feel clever, not just wealthy.\n(3) SHARING PRIVILEGE: "Students like your child are rare — people who know you will trust this recommendation more than an ad."',
        text_ar:'بعد الترقية، يشعر العميل بمزيج من الحماس (اختار الاستثمار أكثر في طفله) وندم خفيف على الشراء (التكلفة أعلى). يستهدف الكاش باك/الحصص هذا التوتر مباشرة:\n\n(1) تعويض التكلفة: "دفعت أكثر — لكن يمكنك استرداد جزء منه" يُغيّر الحسابات لصالحهم.\n(2) المستثمر الذكي: إطار Elite/VIP يُصادق على قرارهم بالترقية — يشعرون بالذكاء لا بالإسراف فحسب.\n(3) امتياز المشاركة: "طلاب كطفلك نادرون — من يعرفونك سيثقون بتوصيتك أكثر من أي إعلان."',
        text_zh:'升级后，客户感受到兴奋（选择为孩子投入更多）与轻微后悔（费用更高）的混合情绪。返现/课程正是针对这种张力：\n\n(1) 费用补偿："您多付了——但可以找回部分费用"，让算术向客户倾斜。\n(2) 聪明投资者：Elite/VIP定位验证了升级决定——他们感到聪明，而不仅仅是花了钱。\n(3) 共享特权："像您孩子这样的学生很难得——认识您的人会比广告更信任您的推荐。"' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Immediately after confirming the upgrade payment — financial commitment is fresh',
          'After explaining the new premium features (Elite/Cambridge/Nakhba plans)',
          'When the customer expresses pride about their child\'s level or achievement',
          'When the customer mentions they have relatives or friends with children',
          'For price-hesitant upgraders — cashback converts the hesitation into motivation'
        ],
        items_ar:[
          'فور تأكيد دفع الترقية — الالتزام المالي طازج',
          'بعد شرح الميزات المميزة الجديدة (خطط Elite/Cambridge/النخبة)',
          'حين يُعبّر العميل عن فخره بمستوى طفله أو إنجازه',
          'حين يذكر العميل أقارب أو أصدقاء لديهم أطفال',
          'للمترددين سعرياً عند الترقية — الكاش باك يحوّل التردد إلى دافع'
        ],
        items_zh:[
          '升级付款确认后立即——财务承诺最新鲜',
          '介绍完新的高端功能（Elite/Cambridge/精英计划）之后',
          '客户表达对孩子水平或成就感到骄傲时',
          '客户提到有孩子的亲戚或朋友时',
          '对价格犹豫的升级客户——返现将犹豫转化为动力'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Just completed payment for a larger/premium package',
          'Mentions the child is doing well and deserves the best resources',
          'Has multiple children or has enrolled siblings in the past',
          'Asks "is there a discount?" — cashback is the perfect answer',
          'Is financially capable but careful — responds well to "you can recover part of this"'
        ],
        items_ar:[
          'أتمّ للتو الدفع لباقة أكبر/مميزة',
          'يذكر أن الطفل يسير بشكل جيد ويستحق أفضل الموارد',
          'لديه أطفال متعددون أو سجّل إخوة في السابق',
          'يسأل "هل هناك خصم؟" — الكاش باك هو الجواب المثالي',
          'قادر مالياً لكن حذر — يستجيب جيداً لـ "يمكنك استرداد جزء من هذا"'
        ],
        items_zh:[
          '刚完成更大/高端套餐的付款',
          '提到孩子进步顺利，值得最好的学习资源',
          '有多个孩子，或之前注册过兄弟姐妹',
          '询问"有没有折扣？"——返现就是完美的答案',
          '经济能力强但谨慎——对"可以找回部分费用"反应良好'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Confirm upgrade ⬅️ Reinforce the value of the new plan (Elite/Cambridge level) ⬅️ "There\'s a way to offset part of the cost..." ⬅️ Introduce cashback/sessions/voucher ⬅️ "If you know someone like [child\'s name] who would benefit..." ⬅️ Request potential leads ⬅️ Send referral code to WhatsApp ⬅️ "Any interested person — send me the number and I\'ll handle everything"',
        text_ar:'تأكيد الترقية ⬅️ تعزيز قيمة الخطة الجديدة (مستوى Elite/Cambridge) ⬅️ "هناك طريقة لتعويض جزء من التكلفة..." ⬅️ تقديم الكاش باك/الحصص/القسيمة ⬅️ "إذا كنت تعرف أحداً مثل [اسم الطفل] يستفيد..." ⬅️ طلب العملاء المحتملين ⬅️ إرسال كود الريفيرال على واتساب ⬅️ "أي شخص مهتم — أرسل لي الرقم وأنا أتولى كل شيء"',
        text_zh:'确认升级 ⬅️ 强化新计划的价值（Elite/Cambridge级别） ⬅️ "有一个方法可以补偿部分费用……" ⬅️ 介绍返现/课程/购物券 ⬅️ "如果您认识像[孩子名字]一样会受益的人……" ⬅️ 询问潜在推荐人 ⬅️ 把推荐码发到WhatsApp ⬅️ "有感兴趣的人——把号码发给我，我来处理一切"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Elite Students Pattern: "إذا عندك أحد بتحسيه زي خالد وندى ابعثي لنا إياه. أنتم بتستفيدوا يا كاش باك يا حصص للأولاد." (يزن × أم خالد وندى)',
          'Free Year Pattern: "تخيلي إذا بتجيبي اثنين زي كأنك اشتركتي للرزين خطة سنة." (دانا × أم رزين)',
          'Help Frame: "أنا بدي أخدمك خدمة… أي حدا مهتم أرسلي لي رقمه." (منتصر × أم ديم)',
          'Voucher Handoff: "إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)'
        ],
        items_ar:[
          'نمط طلاب النخبة: "إذا عندك أحد بتحسيه زي خالد وندى ابعثي لنا إياه. أنتم بتستفيدوا يا كاش باك يا حصص للأولاد." (يزن × أم خالد وندى)',
          'نمط السنة المجانية: "تخيلي إذا بتجيبي اثنين زي كأنك اشتركتي للرزين خطة سنة." (دانا × أم رزين)',
          'نمط المساعدة: "أنا بدي أخدمك خدمة… أي حدا مهتم أرسلي لي رقمه." (منتصر × أم ديم)',
          'نمط تسليم القسيمة: "إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)'
        ],
        items_zh:[
          '精英学生模式："如果您认识像Khaled和Nada一样优秀的孩子，把他们介绍给我们。您可以获得返现或孩子的额外课程。"',
          '免费一年模式："想象一下，如果您带来两个人，就相当于为孩子免费订了一年计划。"',
          '帮忙模式："我想帮您一个忙……有感兴趣的人，把号码发给我。"',
          '购物券转让模式："如果您自己不用，可以把购物券送给想注册的人。"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Cashback after Elite Upgrade:\n"إذا عندك أحد بتحسيه زي خالد وندى ابعثي لنا إياه. أنتم بتستفيدوا يا كاش باك يا حصص للأولاد غير الهدايا."\n\nFree Subscription Frame:\n"تخيلي إذا بتجيبي اثنين زي كأنك اشتركتي للرزين خطة سنة. مجرد ما يسجل بتفتحي التطبيق وتختاري مكافأتك."\n\nVoucher Conversion:\n"إذا ما بدك تستفيد من القسيمة ممكن تعطيها لحدا حاب يسجل بالمنصة."',
        text_ar:'كاش باك بعد ترقية النخبة:\n"إذا عندك أحد بتحسيه زي خالد وندى ابعثي لنا إياه. أنتم بتستفيدوا يا كاش باك يا حصص للأولاد غير الهدايا."\n\nإطار الاشتراك المجاني:\n"تخيلي إذا بتجيبي اثنين زي كأنك اشتركتي للرزين خطة سنة. مجرد ما يسجل بتفتحي التطبيق وتختاري مكافأتك."\n\nتحويل القسيمة:\n"إذا ما بدك تستفيد من القسيمة ممكن تعطيها لحدا حاب يسجل بالمنصة."',
        text_zh:'精英升级后返现：\n"如果您认识像这些优秀孩子一样的学生，把他们介绍给我们。您可以获得返现或孩子的额外课程，还有额外礼品。"\n\n免费订阅框架：\n"想象一下，如果您带来两个人，就相当于为孩子免费订了一年计划。只要他们注册，您打开应用就可以选择奖励。"\n\n购物券转换：\n"如果您自己不需要这张购物券，可以送给想注册平台的人。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"رشحت قبل وما استفدت."\n→ "المرة الجاية ابعثي الرقم مباشرة عشان نربطه على حسابك وما يضيع عليك شيء."\n\n"الميزانية ما تكفي."\n→ "عشان هيك الريفيرال ممكن يساعدك تستفيدي بحصص أو مبلغ مالي بدل ما تدفعي كامل المبلغ."\n\n"ما أعرف إذا الناس مهتمة."\n→ "ابدئي بالأشخاص اللي تحسين فعلاً عندهم اهتمام أو أولادهم محتاجين لغة."\n\n"أرسلت قبل بالجروبات."\n→ "الأفضل تبعثي الرقم مباشرة حتى نربطه بحسابك ونضمن الخصم والمكافأة."',
        text_ar:'"رشحت قبل وما استفدت."\n→ "المرة الجاية ابعثي الرقم مباشرة عشان نربطه على حسابك وما يضيع عليك شيء."\n\n"الميزانية ما تكفي."\n→ "عشان هيك الريفيرال ممكن يساعدك تستفيدي بحصص أو مبلغ مالي بدل ما تدفعي كامل المبلغ."\n\n"ما أعرف إذا الناس مهتمة."\n→ "ابدئي بالأشخاص اللي تحسين فعلاً عندهم اهتمام أو أولادهم محتاجين لغة."\n\n"أرسلت قبل بالجروبات."\n→ "الأفضل تبعثي الرقم مباشرة حتى نربطه بحسابك ونضمن الخصم والمكافأة."',
        text_zh:'"我之前推荐过但没有受益。"\n→ "下次请直接发号码，这样我们可以关联到您的账户，确保不会漏掉。"\n\n"预算不够。"\n→ "正因如此，推荐计划可以帮您通过课程或返现来补偿，而不用全额支付。"\n\n"不确定别人感不感兴趣。"\n→ "从您真正觉得感兴趣、或孩子需要提升语言能力的人开始。"\n\n"我之前在群里发过。"\n→ "最好直接发号码，这样我们关联到您账户，确保折扣和奖励都到位。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"راح أرسل لك كود ترشيح لعيالك عشان أي شخص يجي من خلالك نستفيدك أنت."',
          '"إذا بتعرفي أحد أرسلي لي رقمه وبنعطيه كود خصمك."',
          '"أنا بضبط لك الأمور عشان تستفيدي." ',
          'WhatsApp: "هذا كود الترشيح الخاص فيكم ❤️ أي شخص مهتم ابعثي رقمه مباشرة."',
          'WhatsApp: "أي اشتراك جديد من طرفكم = كاش باك أو حصص مجانية للأولاد."'
        ],
        items_ar:[
          '"راح أرسل لك كود ترشيح لعيالك عشان أي شخص يجي من خلالك نستفيدك أنت."',
          '"إذا بتعرفي أحد أرسلي لي رقمه وبنعطيه كود خصمك."',
          '"أنا بضبط لك الأمور عشان تستفيدي."',
          'واتساب: "هذا كود الترشيح الخاص فيكم ❤️ أي شخص مهتم ابعثي رقمه مباشرة."',
          'واتساب: "أي اشتراك جديد من طرفكم = كاش باك أو حصص مجانية للأولاد."'
        ],
        items_zh:[
          '"我会给您发一个专属推荐码，任何通过您来的人，都会帮您获益。"',
          '"如果您认识合适的人，把号码发给我，我们会给他们您的折扣码。"',
          '"我来为您安排好一切，让您最大受益。"',
          'WhatsApp："这是您的专属推荐码 ❤️ 有感兴趣的人，请直接发号码给我。"',
          'WhatsApp："任何通过您的新订阅 = 返现或孩子的免费课程。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — يزن × أم خالد وندى (Elite Upgrade + Cashback):\n"إذا عندك أحد بتحسيه زي خالد وندى ابعثي لنا إياه. أنتم بتستفيدوا يا كاش باك يا حصص للأولاد غير الهدايا." Quality filter: "الناس المهتمين يعني اللي أحس عندهم اهتمام وكذا."',
          '🛑 Case 2 — دانا × أم رزين (Last Package / Free Year Frame):\n"تخيلي إذا بتجيبي اثنين زي كأنك اشتركتي للرزين خطة سنة. مجرد ما يسجل بتفتحي التطبيق وتختاري مكافأتك." Quality filter: "ناس مهتمين بتعليم الإنجليزي."',
          '🛑 Case 3 — منتصر × أم ديم (Elite Upgrade — Financial Objection):\n"أنا بدي أخدمك خدمة… أي حدا مهتم أرسلي لي رقمه. أنا بضبط لك الأمور عشان تستفيدي." Quality filter: "أي حدا مهتم بتعليم اللغة."',
          '🛑 Case 4 — يزن × أبو محمد (Voucher as Referral Tool):\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل. تأخذ خصم على الليفل اللي بعده."'
        ],
        items_ar:[
          '🛑 الحالة 1 — يزن × أم خالد وندى (ترقية النخبة + كاش باك):\n"إذا عندك أحد بتحسيه زي خالد وندى ابعثي لنا إياه. أنتم بتستفيدوا يا كاش باك يا حصص للأولاد غير الهدايا." فلتر الجودة: "الناس المهتمين يعني اللي أحس عندهم اهتمام وكذا."',
          '🛑 الحالة 2 — دانا × أم رزين (آخر باقة / إطار السنة المجانية):\n"تخيلي إذا بتجيبي اثنين زي كأنك اشتركتي للرزين خطة سنة. مجرد ما يسجل بتفتحي التطبيق وتختاري مكافأتك." فلتر الجودة: "ناس مهتمين بتعليم الإنجليزي."',
          '🛑 الحالة 3 — منتصر × أم ديم (ترقية النخبة — اعتراض مالي):\n"أنا بدي أخدمك خدمة… أي حدا مهتم أرسلي لي رقمه. أنا بضبط لك الأمور عشان تستفيدي." فلتر الجودة: "أي حدا مهتم بتعليم اللغة."',
          '🛑 الحالة 4 — يزن × أبو محمد (القسيمة كأداة ريفيرال):\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل. تأخذ خصم على الليفل اللي بعده."'
        ],
        items_zh:[
          '🛑 案例1——精英升级 + 返现：\n"如果您认识像这些优秀孩子一样的学生，介绍给我们。您可以获得返现或额外课程。" 质量筛选："真正感兴趣的人，也就是您感觉他们有意愿的那种。"',
          '🛑 案例2——最后一个套餐/免费一年框架：\n"想象一下，如果您带来两个人，就相当于为孩子免费订了一年计划。只要他们注册，您打开应用就可以选择奖励。" 质量筛选："对英语学习真正感兴趣的人。"',
          '🛑 案例3——精英升级——财务异议：\n"我想帮您一个忙……有感兴趣的人，把号码发给我。我来帮您安排好一切，让您最大受益。" 质量筛选："对语言学习感兴趣的人。"',
          '🛑 案例4——购物券作为推荐工具：\n"如果您自己不需要，可以把购物券送给想注册的人，他们可以享受下一级别的折扣。"'
        ]}
    ] },
  { id:'b-customer', icon:'🤝', group:'The Conversation', group_ar:'المحادثة',
    title:'B Customer — First Call Before Payment', title_ar:'العميل B — أول مكالمة قبل الدفع',
    color:'#EC4899', cl:'rgba(236,72,153,.15)', glow:'rgba(236,72,153,.2)',
    grad:'linear-gradient(135deg,#EC4899,#DB2777)',
    topics:['First Impression','Trust-Building','Payment Hesitation Indicators','Customer Concerns','Interest Level','Follow-Up Indicators'],
    topics_ar:['الانطباع الأول','بناء الثقة','مؤشرات التردد في الدفع','مخاوف العميل','مستوى الاهتمام','مؤشرات المتابعة'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Transform the call from a "sales call" into a "gift from a known person." Build immediate trust and reduce resistance from the first minute — making the referred lead feel specially chosen, not targeted. The goal is to book a free trial session before the customer thinks of objecting.',
        text_ar:'تحويل المكالمة من "مكالمة مبيعات" إلى "هدية من شخص معروف." بناء الثقة الفورية وتقليل المقاومة من الدقيقة الأولى — جعل العميل المُحال يشعر أنه مختار بعناية لا مستهدفاً. الهدف هو حجز حصة تجريبية مجانية قبل أن يفكر العميل في الاعتراض.',
        text_zh:'将通话从"销售电话"转变为"来自熟人的礼物"。从第一分钟起就建立即时信任、降低抗拒感——让被推荐的潜在客户感到自己是被特别选中的，而非被销售目标锁定。目标是在客户想到拒绝之前，就预约好免费体验课。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Hearing a trusted name instantly neutralises resistance. Key psychological triggers:\n\n(1) "I was chosen" — the referral creates a feeling of being selected, not sold to.\n(2) Zero financial risk — the free trial removes all purchase anxiety.\n(3) Gift framing — the session is positioned as something the referrer is sending them, eliminating sales pressure entirely.\n(4) Community belonging — the referral implies social endorsement by someone they already trust.',
        text_ar:'سماع اسم موثوق يُحيّد المقاومة فوراً. المحفزات النفسية الرئيسية:\n\n(1) "أنا مختار" — الريفيرال يخلق شعوراً بأنك مُختار لا مستهدَف.\n(2) صفر مخاطر مالية — التجربة المجانية تُزيل كل قلق الشراء.\n(3) إطار الهدية — الحصة مُقدَّمة على أنها شيء يُرسله المُحيل إليهم، مما يُلغي ضغط البيع كلياً.\n(4) الانتماء المجتمعي — الريفيرال يُشير إلى تأييد اجتماعي من شخص يثقون به أصلاً.',
        text_zh:'听到熟悉名字能立即消除抗拒感。关键心理触发点：\n\n(1) "我是被选中的"——推荐创造出一种被选择而非被销售的感觉。\n(2) 零财务风险——免费体验消除所有购买顾虑。\n(3) 礼物框架——课程被定位为介绍人送出的礼物，完全消除销售压力。\n(4) 社群归属感——推荐意味着来自他们已经信任的人的社会认可。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Customer is completely new to the platform with no prior awareness',
          'Referred directly by a friend, relative, or current active student',
          'Customer sounds hesitant or cold in the first 10 seconds',
          'Customer is a mother or guardian of a school-age child',
          'Customer asks "how did you get my number?" — use the referrer name immediately'
        ],
        items_ar:[
          'العميل جديد كلياً على المنصة ولا يعرف عنها شيئاً',
          'تمت إحالته مباشرة من صديق أو قريب أو طالب نشط حالياً',
          'يبدو العميل مترددًا أو بارداً في أول 10 ثوانٍ',
          'العميل أم أو ولي أمر لطفل في سن المدرسة',
          'يسأل العميل "كيف حصلت على رقمي؟" — استخدم اسم المُحيل فوراً'
        ],
        items_zh:[
          '客户对平台完全陌生，没有任何了解',
          '由朋友、亲戚或当前在读学生直接推荐',
          '客户在最初10秒内语气犹豫或冷淡',
          '客户是学龄儿童的母亲或监护人',
          '客户询问"您怎么得到我号码的？"——立即提及介绍人姓名'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Tone becomes noticeably warmer after the referrer\'s name is mentioned',
          'Asks about trial session timing — shows scheduling intent',
          'Asks about the app or download — moves to practical engagement',
          'Engages with student age or level questions naturally and willingly',
          'Does not push back on "who are you?" after hearing the referrer name'
        ],
        items_ar:[
          'تصبح نبرته أكثر دفئاً بشكل ملحوظ بعد ذكر اسم المُحيل',
          'يسأل عن موعد الحصة التجريبية — يُشير إلى نية الجدولة',
          'يسأل عن التطبيق أو التحميل — يتقدم نحو التفاعل العملي',
          'يتعاون مع أسئلة عمر الطالب أو مستواه بشكل طبيعي وراغب',
          'لا يعترض على "من أنت؟" بعد سماع اسم المُحيل'
        ],
        items_zh:[
          '提到介绍人姓名后，语气明显变得更加热情',
          '询问体验课的时间——表明有安排意向',
          '询问关于应用或下载——进入实际互动阶段',
          '自然积极地配合关于学生年龄或水平的问题',
          '听到介绍人名字后，不再质疑"您是谁？"'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Self-introduction ⬅️ Mention referrer\'s name immediately ⬅️ Present the gift or discount ⬅️ Gather student info (age, level, name) ⬅️ Book the trial session ⬅️ Explain app access and download ⬅️ Confirm attendance & send WhatsApp follow-up',
        text_ar:'التعريف بالنفس ⬅️ ذكر اسم المُحيل فوراً ⬅️ تقديم الهدية أو الخصم ⬅️ جمع معلومات الطالب (العمر، المستوى، الاسم) ⬅️ حجز الحصة التجريبية ⬅️ شرح طريقة الوصول للتطبيق وتحميله ⬅️ تأكيد الحضور وإرسال متابعة واتساب',
        text_zh:'自我介绍 ⬅️ 立即提及介绍人姓名 ⬅️ 呈现礼物或折扣 ⬅️ 收集学生信息（年龄、水平、姓名） ⬅️ 预约体验课 ⬅️ 说明应用下载和使用方式 ⬅️ 确认出席并发送WhatsApp跟进消息' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Open with the referrer\'s name before mentioning the platform — name first, pitch second',
          'Frame the trial as a gift the referrer is sending, not a sales offering from the company',
          'Ask about the student (age, name, level) before offering any service — builds genuine interest',
          'Close by volunteering to handle the app setup yourself via WhatsApp to eliminate friction'
        ],
        items_ar:[
          'ابدأ باسم المُحيل قبل ذكر المنصة — الاسم أولاً، ثم العرض',
          'قدّم التجربة كهدية يُرسلها المُحيل، لا كعرض مبيعات من الشركة',
          'اسأل عن الطالب (العمر، الاسم، المستوى) قبل تقديم أي خدمة — يبني اهتماماً حقيقياً',
          'أغلق بعرض التعامل بنفسك مع إعداد التطبيق عبر واتساب للقضاء على الاحتكاك'
        ],
        items_zh:[
          '先提介绍人的名字，再介绍平台——先说名字，再说产品',
          '将体验定位为介绍人送出的礼物，而不是公司的销售产品',
          '在提供任何服务之前先询问学生情况（年龄、姓名、水平）——建立真诚的关心',
          '以主动协助客户通过WhatsApp完成应用设置作为结束，消除操作摩擦'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'High-Converting Opening Phrases:\n"أنتِ جاية من طرف طالب مسجل معنا."\n"إلك خصم خاص لأنك من ترشيح مباشر."\n"الحصة التجريبية هدية بالكامل."\n"أنا رح أتابع معك خطوة بخطوة."\n"الترشيح أعطاك فرصة تستفيدي من العرض الخاص."\n\nVariation Examples:\n"معك المشرفة التعليمية من Five Talk، أم هزاع رشحتك معنا للحصة التجريبية."\n"لارا صديقة لانا بالمدرسة بعتت رقمك لأنها حابة تهديكم حصة مجانية."\n"أم فاطمة ولطيفة أرسلوا رقمك لأنهم حابين تستفيدوا من الخصم الخاص بالمشتركين."',
        text_ar:'عبارات افتتاح عالية التحويل:\n"أنتِ جاية من طرف طالب مسجل معنا."\n"إلك خصم خاص لأنك من ترشيح مباشر."\n"الحصة التجريبية هدية بالكامل."\n"أنا رح أتابع معك خطوة بخطوة."\n"الترشيح أعطاك فرصة تستفيدي من العرض الخاص."\n\nأمثلة متنوعة:\n"معك المشرفة التعليمية من Five Talk، أم هزاع رشحتك معنا للحصة التجريبية."\n"لارا صديقة لانا بالمدرسة بعتت رقمك لأنها حابة تهديكم حصة مجانية."\n"أم فاطمة ولطيفة أرسلوا رقمك لأنهم حابين تستفيدوا من الخصم الخاص بالمشتركين."',
        text_zh:'高转化率的开场话术：\n"您是通过我们在读学员介绍过来的。"\n"因为是直接推荐，您可以享受专属折扣。"\n"体验课完全免费赠送。"\n"我会一步一步陪您完成。"\n"推荐让您获得了专属优惠的机会。"\n\n不同场景示例：\n"您好，我是Five Talk平台的教学督导，[介绍人]向我们推荐了您来体验免费课程。"\n"[介绍人]是学校的好朋友，她把您的号码发给我，想送您一节免费体验课。"\n"[介绍人]把您的号码分享给我们，希望您能享受会员专属折扣。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"بدي أجرب أول."\n→ "أكيد، عشان هيك عاملين الحصة التجريبية حتى تشوفي المستوى قبل أي قرار."\n\n"لازم أحمل تطبيق؟"\n→ "رح أبعث لك كل الخطوات بالواتساب وأسهل عليك الموضوع كامل."\n\n"مو مناسب الوقت."\n→ "عادي، نحجز الوقت اللي يناسبك بالكامل."',
        text_ar:'"بدي أجرب أول."\n→ "أكيد، عشان هيك عاملين الحصة التجريبية حتى تشوفي المستوى قبل أي قرار."\n\n"لازم أحمل تطبيق؟"\n→ "رح أبعث لك كل الخطوات بالواتساب وأسهل عليك الموضوع كامل."\n\n"مو مناسب الوقت."\n→ "عادي، نحجز الوقت اللي يناسبك بالكامل."',
        text_zh:'"我想先试一下。"\n→ "当然，这正是我们提供体验课的原因——让您在做决定之前先了解孩子的水平。"\n\n"需要下载应用吗？"\n→ "我会通过WhatsApp把所有步骤发给您，让整个过程对您来说非常简单。"\n\n"现在时间不方便。"\n→ "完全没问题，我们可以安排最适合您的时间。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Closing: "خلينا نحجز اليوم عشان أتابع معك بنفسي."',
          'Closing: "أول ما تدخلي الحصة ابعتيلي حتى أتأكد كل شيء تمام."',
          'Closing: "الحصة رح تساعدنا نحدد مستوى الطالب بدقة."',
          'WhatsApp: "أهلًا 🌷 هذا رابط التطبيق — أول ما تخلصي تحميل ابعتيلي 🙏"',
          'WhatsApp: "تم تأكيد الحصة 🎉 موعدكم بكرة الساعة 5:30 وأنا رح أتابع معكم قبل الحصة."'
        ],
        items_ar:[
          'إغلاق: "خلينا نحجز اليوم عشان أتابع معك بنفسي."',
          'إغلاق: "أول ما تدخلي الحصة ابعتيلي حتى أتأكد كل شيء تمام."',
          'إغلاق: "الحصة رح تساعدنا نحدد مستوى الطالب بدقة."',
          'واتساب: "أهلًا 🌷 هذا رابط التطبيق — أول ما تخلصي تحميل ابعتيلي 🙏"',
          'واتساب: "تم تأكيد الحصة 🎉 موعدكم بكرة الساعة 5:30 وأنا رح أتابع معكم قبل الحصة."'
        ],
        items_zh:[
          '结束语："我们今天就预约，我亲自跟进。"',
          '结束语："课程开始后请通知我，我确认一切顺利。"',
          '结束语："这节课帮助我们准确判断孩子的学习水平。"',
          'WhatsApp："您好 🌷 这是应用链接——下载完成后请告诉我 🙏"',
          'WhatsApp："课程已确认 🎉 明天下午5:30见，课前我会跟进联系您。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — آلاء × أم هزاع:\n"الو السلام عليكم.. كيفك.. الحمد لله معك المشرفة الثقافية منصة Five Talk.. تعرفي أم هزاع؟ هي مسجلة بالمنصة وطلعلها ترشح ناس من طرفها، وبصراحة انتي كنتِ من ضمن الترشيحات..في حال التسجيل رح تاخذي خصم لأنك جاية من طرف طالب مسجل..حابين نحجز الحصة التجريبية ونقيم مستوى الطالب..متى بناسبك؟ 6:30 ولا 7؟ رح أبعث لك التطبيق على الواتساب بس بدي تثبتيه عندك..أول ما تنزليه ابعتيلي حتى أتأكد كل شيء تمام."',
          '🛑 Case 2 — آية × أم لانا:\n"الو مرحبا.. كيف حالك يا أم لانا؟ معك آية من منصة Five Talk..لارا صديقة لانا بالمدرسة بعتت رقمك لأنها حابة تهديها حصة تجريبية مجانية..لانا كم عمرها؟ إحنا بنركز على الـ Speaking والـ Reading وبنعمل تقييم كامل للمستوى..شو الوقت المناسب للحصة؟ تمام، بكرة الساعة 3..وأنا هلا رح أبعتلك على الواتساب طريقة الدخول للحصة."',
          '🛑 Case 3 — شادي × شيماء:\n"السلام عليكم.. مستر شادي معك من منصة Five Talk..أم فاطمة ولطيفة أرسلوا رقمك لأنهم حابين تجربوا المنصة معكم..الناس اللي بيجوا من طرف مشتركين بياخذوا خصومات خاصة..وحابين نحجز لكم حصة تجريبية..أي وقت بناسبكم؟ تمام بكرة 2:30..وأنا رح أرسل كل التفاصيل على الواتساب."'
        ],
        items_ar:[
          '🛑 الحالة 1 — آلاء × أم هزاع:\n"الو السلام عليكم.. كيفك.. الحمد لله معك المشرفة الثقافية منصة Five Talk.. تعرفي أم هزاع؟ هي مسجلة بالمنصة وطلعلها ترشح ناس من طرفها، وبصراحة انتي كنتِ من ضمن الترشيحات..في حال التسجيل رح تاخذي خصم لأنك جاية من طرف طالب مسجل..حابين نحجز الحصة التجريبية ونقيم مستوى الطالب..متى بناسبك؟ 6:30 ولا 7؟ رح أبعث لك التطبيق على الواتساب بس بدي تثبتيه عندك..أول ما تنزليه ابعتيلي حتى أتأكد كل شيء تمام."',
          '🛑 الحالة 2 — آية × أم لانا:\n"الو مرحبا.. كيف حالك يا أم لانا؟ معك آية من منصة Five Talk..لارا صديقة لانا بالمدرسة بعتت رقمك لأنها حابة تهديها حصة تجريبية مجانية..لانا كم عمرها؟ إحنا بنركز على الـ Speaking والـ Reading وبنعمل تقييم كامل للمستوى..شو الوقت المناسب للحصة؟ تمام، بكرة الساعة 3..وأنا هلا رح أبعتلك على الواتساب طريقة الدخول للحصة."',
          '🛑 الحالة 3 — شادي × شيماء:\n"السلام عليكم.. مستر شادي معك من منصة Five Talk..أم فاطمة ولطيفة أرسلوا رقمك لأنهم حابين تجربوا المنصة معكم..الناس اللي بيجوا من طرف مشتركين بياخذوا خصومات خاصة..وحابين نحجز لكم حصة تجريبية..أي وقت بناسبكم؟ تمام بكرة 2:30..وأنا رح أرسل كل التفاصيل على الواتساب."'
        ],
        items_zh:[
          '🛑 案例1——CM × 新客户妈妈：\n"您好，我是Five Talk平台的教学督导。您认识[介绍人]吗？她是我们的在读学员，她推荐了您。如果您注册，因为是通过在读学员推荐的，可以享受专属折扣。我们想预约一节体验课来评估孩子水平——什么时间方便？6:30还是7点？我会把应用发到WhatsApp，希望您能下载安装，下载完成后告诉我，我确认一切正常。"',
          '🛑 案例2——CM × 新客户妈妈（Lana）：\n"您好，我是Five Talk平台的CM。[介绍人]是Lana在学校的好朋友，她把您的号码发给我，想送Lana一节免费体验课。Lana几岁了？我们专注口语和阅读，会做全面的水平评估。什么时间适合上课？好的，明天3点。我现在就把课程进入方式发到WhatsApp给您。"',
          '🛑 案例3——CM × 新客户（Shaimaa）：\n"您好，我是Five Talk平台的CM。[介绍人]把您的号码发给我，希望您也来体验平台。通过会员推荐的用户可以享受特别折扣。我们想为您安排一节体验课——什么时间方便？好的，明天2:30。我会把所有详情发到WhatsApp给您。"'
        ]}
    ]},

  { id:'pool-m02', icon:'🌱', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'Customer Pool — M0 to M2', title_ar:'مجموعة العملاء — م0 إلى م2',
    color:'#10B981', cl:'rgba(16,185,129,.15)', glow:'rgba(16,185,129,.2)',
    grad:'linear-gradient(135deg,#10B981,#059669)',
    topics:['Customer Excitement Level','Early Engagement Indicators','Trust-Building Stage','First Impression Impact','Referral Readiness'],
    topics_ar:['مستوى حماس العميل','مؤشرات التفاعل المبكر','مرحلة بناء الثقة','تأثير الانطباع الأول','جاهزية الريفيرال'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'In the first 1–2 months (M0–M2), the CM delivers a concrete service first — solving an academic issue, onboarding the parent to the platform, or activating the schedule — then transitions naturally to the referral ask. The approach succeeds because the customer has just received genuine value and feels reciprocal gratitude.',
        text_ar:'في أول 1-2 شهور (م0-م2)، يُقدّم الـ CM خدمة ملموسة أولاً — حل مشكلة أكاديمية، أو تأهيل الوالد على المنصة، أو تفعيل الجدول — ثم ينتقل بشكل طبيعي إلى طلب الريفيرال. ينجح هذا الأسلوب لأن العميل تلقّى للتو قيمة حقيقية ويشعر بامتنان متبادل.',
        text_zh:'在入学最初1-2个月（M0-M2阶段），CM首先提供实质性服务——解决学术问题、指导家长使用平台或协助确定课程时间表——然后自然地过渡到推荐邀请。这一方法之所以奏效，是因为客户刚刚获得了真正的价值，内心怀有真诚的感恩之情。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Three M0–M2 service psychologies:\n\n(1) ACADEMIC PROBLEM-SOLVING: The CM solves a real issue (boredom, level mismatch, fear). Gratitude drives referral willingness — "You helped my child, so I want to help you."\n\n(2) TECH ONBOARDING: Fresh subscription excitement = highest referral window. Tying prizes (iPad, cashback) to the child\'s engagement anchors the referral as a reward for the child.\n\n(3) GOLDEN SEAT ACTIVATION: Making the customer feel VIP from day one. "You can make your seat golden with just 2 referrals" turns a new subscriber into an ambassador immediately.',
        text_ar:'ثلاثة سيكولوجيات خدمة م0-م2:\n\n(1) حل المشكلة الأكاديمية: يحل الـ CM مشكلة حقيقية (الملل، التوافق مع المستوى، الخوف). يقود الامتنانُ الاستعدادَ للترشيح — "ساعدت طفلي، فأريد مساعدتك."\n\n(2) التأهيل التكنولوجي: حماس الاشتراك الجديد = أعلى نافذة ريفيرال. ربط الجوائز (آيباد، كاش باك) بتفاعل الطفل يُثبّت الريفيرال كمكافأة للطفل.\n\n(3) تفعيل المقعد الذهبي: جعل العميل يشعر بكونه VIP من اليوم الأول. "يمكنك تحويل مقعدك إلى ذهبي بريفيرالين فقط" يُحوّل المشترك الجديد فوراً إلى سفير.',
        text_zh:'M0-M2阶段的三种客户心理策略：\n\n（1）解决学习问题型：CM解决实际问题（课程枯燥、级别不匹配、孩子胆怯）。感激之情驱动推荐意愿——"你帮了我的孩子，我也想帮助你。"\n\n（2）平台引导激活型：新用户的新鲜感最强，是推荐转化率最高的窗口期。将奖励（iPad、现金返还）与孩子的学习投入挂钩，让推荐成为孩子获益的动力。\n\n（3）黄金座位激活型：从第一天起就让客户感受到VIP待遇。"只需推荐2位新用户，您的座位就能升级为黄金席位"——将新订阅客户立刻转变为品牌大使。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Academic: Immediately after resolving a boredom or level issue — gratitude window is open',
          'Academic: When the student needs extra sessions and referral is the free solution',
          'Tech Onboarding: During the very first activation call — excitement is at its peak',
          'Tech Onboarding: When the parent is enthusiastic and asking detailed platform questions',
          'Golden Seat: At first schedule setup — immediately after subscription activation'
        ],
        items_ar:[
          'الأكاديمي: فور حل مشكلة الملل أو المستوى — نافذة الامتنان مفتوحة',
          'الأكاديمي: حين يحتاج الطالب لحصص إضافية والريفيرال هو الحل المجاني',
          'التأهيل التكنولوجي: خلال مكالمة التفعيل الأولى — الحماس في أعلاه',
          'التأهيل التكنولوجي: حين يكون الوالد متحمساً ويطرح أسئلة تفصيلية عن المنصة',
          'المقعد الذهبي: عند أول إعداد للجدول — فور تفعيل الاشتراك'
        ],
        items_zh:[
          '学习型：刚解决孩子的课程枯燥或级别问题后——感激窗口期正开着',
          '学习型：孩子需要额外课时而推荐是免费解决方案时',
          '平台引导型：第一次激活通话期间——热情度最高',
          '平台引导型：家长积极主动、对平台功能提出详细问题时',
          '黄金座位型：第一次设置课程时间表时——订阅激活后立即进行'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Parent thanks the CM for solving a specific problem — high reciprocity signal',
          'Child is excited about app points, competition, or challenges',
          'Parent is engaged, asking detailed questions about lessons and tools',
          'Parent mentions other parents, teachers, or school groups',
          'Parent is warm and responsive throughout the onboarding call'
        ],
        items_ar:[
          'يشكر الوالد الـ CM على حل مشكلة محددة — إشارة مرتفعة للمعاملة بالمثل',
          'الطفل متحمس لنقاط التطبيق أو المنافسات أو التحديات',
          'الوالد منخرط ويطرح أسئلة تفصيلية عن الحصص والأدوات',
          'يذكر الوالد أولياء أمور آخرين أو معلمين أو مجموعات مدرسية',
          'الوالد دافئ ومتجاوب طوال مكالمة التأهيل'
        ],
        items_zh:[
          '家长感谢CM解决了具体问题——互惠意愿信号强烈',
          '孩子对应用积分、竞赛或挑战充满热情',
          '家长积极投入，对课程和工具提出详细问题',
          '家长提到其他家长、老师或学校群组',
          '家长在整个入门通话中态度热情、积极回应'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'TYPE 1 — Academic Problem-Solving:\nSolve academic issue ⬅️ Offer additional tools or solutions ⬅️ Confirm parent satisfaction ⬅️ Link progress to rewards ⬅️ Explain prizes or golden seats ⬅️ Request referral names\n\nTYPE 2 — Tech Onboarding:\nExplain app tools (pre-lesson preview, post-lesson review) ⬅️ Live walkthrough with the child ⬅️ Build excitement around points and competition ⬅️ Mention prizes ⬅️ Link prizes to referrals ⬅️ Send referral link or personal discount code\n\nTYPE 3 — Golden Seat Activation:\nFix weekly schedule ⬅️ Assign a class supervisor ⬅️ Explain the golden seat concept ⬅️ Share success stories ⬅️ Request 2 interested referral numbers ⬅️ Offer a free welcome week',
        text_ar:'النوع 1 — حل المشكلة الأكاديمية:\nحل المشكلة الأكاديمية ⬅️ تقديم أدوات أو حلول إضافية ⬅️ تأكيد رضا الوالد ⬅️ ربط التقدم بالمكافآت ⬅️ شرح الجوائز أو المقاعد الذهبية ⬅️ طلب أسماء الريفيرال\n\nالنوع 2 — التأهيل التكنولوجي:\nشرح أدوات التطبيق (معاينة ما قبل الدرس، مراجعة ما بعده) ⬅️ جولة مباشرة مع الطفل ⬅️ بناء الحماس حول النقاط والمنافسة ⬅️ ذكر الجوائز ⬅️ ربط الجوائز بالريفيرالات ⬅️ إرسال رابط الريفيرال أو كود الخصم الشخصي\n\nالنوع 3 — تفعيل المقعد الذهبي:\nتثبيت الجدول الأسبوعي ⬅️ تعيين مشرف صفي ⬅️ شرح مفهوم المقعد الذهبي ⬅️ مشاركة قصص النجاح ⬅️ طلب رقمَي ريفيرال مهتمَين ⬅️ تقديم أسبوع ترحيبي مجاني',
        text_zh:'方式一——解决学习问题型：\n解决学习问题 ⬅️ 提供额外工具或解决方案 ⬅️ 确认家长满意度 ⬅️ 将进步与奖励挂钩 ⬅️ 介绍奖品或黄金座位 ⬅️ 请求推荐联系人\n\n方式二——平台引导激活型：\n介绍应用工具（课前预习、课后复习）⬅️ 与孩子一起实操演示 ⬅️ 围绕积分和排名营造兴奋感 ⬅️ 提及奖品 ⬅️ 将奖品与推荐挂钩 ⬅️ 发送推荐链接或专属折扣码\n\n方式三——黄金座位激活型：\n确定每周课程时间表 ⬅️ 指定专属课程督导 ⬅️ 讲解黄金座位概念 ⬅️ 分享成功案例 ⬅️ 请求2个感兴趣的推荐联系人 ⬅️ 赠送免费欢迎周' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Pattern A (Academic) — Casual opener after solving the issue: "ما في حولك أحد حاب يجرب كلاس تجريبي؟"',
          'Pattern B (Academic) — Remove all friction: "أرسلي لي الأرقام وأنا أتابع معهم بنفسي"',
          'Pattern C (Tech) — Specific prize math: "إذا سجل أربعة من طرفكم مبروك عليكم الآيباد أو 900 ريال كاش باك"',
          'Pattern D (Golden Seat) — Low ask, high reward: "رشحي رقمين وخذي أسبوع مجاني ترحيبًا منا"'
        ],
        items_ar:[
          'النمط أ (الأكاديمي) — افتتاحية عفوية بعد حل المشكلة: "ما في حولك أحد حاب يجرب كلاس تجريبي؟"',
          'النمط ب (الأكاديمي) — إزالة كل احتكاك: "أرسلي لي الأرقام وأنا أتابع معهم بنفسي"',
          'النمط ج (التكنولوجي) — حسابات جائزة محددة: "إذا سجل أربعة من طرفكم مبروك عليكم الآيباد أو 900 ريال كاش باك"',
          'النمط د (المقعد الذهبي) — طلب بسيط، مكافأة عالية: "رشحي رقمين وخذي أسبوع مجاني ترحيبًا منا"'
        ],
        items_zh:[
          '模式A（学习型）——解决问题后自然引入："您身边有没有朋友想免费体验一节课？"',
          '模式B（学习型）——消除所有障碍："把联系方式发给我，我来亲自跟进他们"',
          '模式C（平台型）——精确奖励计算："如果有4位家长通过您注册，恭喜您获得iPad或900里亚尔现金返还"',
          '模式D（黄金座位型）——门槛低、奖励高："推荐2位联系人，免费送您一周欢迎课程"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Academic Type:\n"ما في حولك أحد حاب يجرب كلاس تجريبي؟"\n"أي ترشيح جديد يساعد كيان تكمل الليفل أسرع."\n"إذا رشحتي أشخاص بتاخدي حصص مجانية وكتب تعليمية."\n\nTech Onboarding Type:\n"إذا سجل أربعة من طرفك بتحصلي على آيباد."\n"باقي اشتراك واحد فقط وتحصلوا على الآيباد."\n"أرسلي رسالة صوتية للجروبات مع الرابط."\n\nGolden Seat Type:\n"تقدري تخلي مقعدك ذهبي."\n"رشحي رقمين وخذي أسبوع مجاني."\n"الواحد يستفيد ويفيد بنفس الوقت."',
        text_ar:'النوع الأكاديمي:\n"ما في حولك أحد حاب يجرب كلاس تجريبي؟"\n"أي ترشيح جديد يساعد كيان تكمل الليفل أسرع."\n"إذا رشحتي أشخاص بتاخدي حصص مجانية وكتب تعليمية."\n\nنوع التأهيل التكنولوجي:\n"إذا سجل أربعة من طرفك بتحصلي على آيباد."\n"باقي اشتراك واحد فقط وتحصلوا على الآيباد."\n"أرسلي رسالة صوتية للجروبات مع الرابط."\n\nنوع المقعد الذهبي:\n"تقدري تخلي مقعدك ذهبي."\n"رشحي رقمين وخذي أسبوع مجاني."\n"الواحد يستفيد ويفيد بنفس الوقت."',
        text_zh:'学习型推荐话术：\n"您身边有朋友想免费体验一节课吗？"\n"每推荐一位新用户，就能帮孩子更快完成当前级别。"\n"成功推荐后，您可以获得免费课时和学习教材。"\n\n平台引导型推荐话术：\n"如果有4位家长通过您注册，您就能获得iPad奖励。"\n"现在只差一个订阅，您就能拿到iPad了。"\n"可以在家长群里发一条语音消息，附上推荐链接。"\n\n黄金座位型推荐话术：\n"您可以把自己的座位升级为黄金席位。"\n"推荐2位联系人，免费送您一周课程。"\n"推荐别人自己也受益，一举两得。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"ما عندي ناس أكيد مهتمة."\n→ "حتى لو شخص واحد فقط مهتم ممكن يستفيد كثير من التجربة."\n\n"الأرقام اللي أرسلتها ما تجاوبت."\n→ "ابعثيهم مرة ثانية وأنا أتابع معهم بشكل مباشر."\n\n"نشرت بالرابط بس ما بعرف مين دخل."\n→ "رح أعمل لك كود خاص باسمك حتى نعرف أي شخص يجي من طرفك."\n\n"بحاول أطلع لك أرقام."\n→ "أي رقم مهتم يكفي والباقي علينا."',
        text_ar:'"ما عندي ناس أكيد مهتمة."\n→ "حتى لو شخص واحد فقط مهتم ممكن يستفيد كثير من التجربة."\n\n"الأرقام اللي أرسلتها ما تجاوبت."\n→ "ابعثيهم مرة ثانية وأنا أتابع معهم بشكل مباشر."\n\n"نشرت بالرابط بس ما بعرف مين دخل."\n→ "رح أعمل لك كود خاص باسمك حتى نعرف أي شخص يجي من طرفك."\n\n"بحاول أطلع لك أرقام."\n→ "أي رقم مهتم يكفي والباقي علينا."',
        text_zh:'异议："我身边没有确定感兴趣的人。"\n→ "没关系，哪怕只有一个人有兴趣，都能从体验课中获益很多。"\n\n异议："我之前发的联系方式没有回复。"\n→ "可以再发一次，我来直接跟进他们。"\n\n异议："我发了推荐链接，但不知道谁点进来了。"\n→ "我来给您设置一个专属推荐码，这样我们就能追踪每一位来自您的用户。"\n\n异议："我会尽量给您找联系方式的。"\n→ "有任何一个感兴趣的就够了，剩下的我们来负责。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Academic Closing: "خلينا نساعد الطالب يوصل أسرع."',
          'Tech Closing: "إن شاء الله نفرحكم بالآيباد قريب."',
          'Golden Seat Closing: "الواحد يستفيد ويفيد بنفس الوقت."',
          'WhatsApp: "🎁 أي اشتراك جديد = حصص إضافية تساعد الطالب يتطور أسرع."',
          'WhatsApp: "الطالب ما شاء الله متطور كثير 🌷 والريفيرال يساعده يكمل الليفل بشكل أسرع."'
        ],
        items_ar:[
          'إغلاق أكاديمي: "خلينا نساعد الطالب يوصل أسرع."',
          'إغلاق تكنولوجي: "إن شاء الله نفرحكم بالآيباد قريب."',
          'إغلاق المقعد الذهبي: "الواحد يستفيد ويفيد بنفس الوقت."',
          'واتساب: "🎁 أي اشتراك جديد = حصص إضافية تساعد الطالب يتطور أسرع."',
          'واتساب: "الطالب ما شاء الله متطور كثير 🌷 والريفيرال يساعده يكمل الليفل بشكل أسرع."'
        ],
        items_zh:[
          '学习型收尾："我们一起帮孩子更快达到目标。"',
          '平台型收尾："期待早日把iPad的喜讯告诉您！"',
          '黄金座位型收尾："推荐别人，自己也受益，一举两得。"',
          'WhatsApp跟进："🎁 每增加一位新订阅 = 额外课时，帮助孩子更快进步。"',
          'WhatsApp跟进："孩子进步真的很棒🌷 推荐计划能帮他更快完成当前级别。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم راكان وبدر (Academic Problem-Solving):\n"راح أضيف له حصص محادثة يختار فيها المواضيع اللي يحبها لأنه شاطر بالكلام..ما في حولك أحد حاب يجرب كلاس تجريبي؟ أرسلي لي الأرقام وأنا أتابع معهم بنفسي."',
          '🛑 Case 2 — أم ياسر / فهد (Tech Onboarding):\n"في عندك المعاينة قبل الدرس والمراجعة بعد الدرس..فهد يجمع نقاط ويتنافس مع الطلاب..وإذا سجل أربعة من طرفكم مبروك عليكم الآيباد أو 900 ريال كاش باك..أرسلي الرابط بالجروبات وأنا أعمل لك كود خاص باسمك."',
          '🛑 Case 3 — أم ناصر (Tech Onboarding — Prize Proximity):\n"عندكم حصص جماعية مجانية مع طلاب من دول مختلفة..وباقي اشتراك واحد فقط وتحصلوا على الآيباد..أي شخص تحسينه مهتم أرسلي رقمه وأنا أتابع معه."',
          '🛑 Case 4 — أم عبد الرحمن (Golden Seat Activation):\n"عينت لك مشرفة صفية تتابع معك كل شيء..وتقدري تخلي مقعدك ذهبي وتزيدي حصصك..فقط رشحي رقمين مهتمين وخذي أسبوع مجاني ترحيبًا منا..الواحد يستفيد ويفيد بنفس الوقت."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم راكان وبدر (حل المشكلة الأكاديمية):\n"راح أضيف له حصص محادثة يختار فيها المواضيع اللي يحبها لأنه شاطر بالكلام..ما في حولك أحد حاب يجرب كلاس تجريبي؟ أرسلي لي الأرقام وأنا أتابع معهم بنفسي."',
          '🛑 الحالة 2 — أم ياسر / فهد (التأهيل التكنولوجي):\n"في عندك المعاينة قبل الدرس والمراجعة بعد الدرس..فهد يجمع نقاط ويتنافس مع الطلاب..وإذا سجل أربعة من طرفكم مبروك عليكم الآيباد أو 900 ريال كاش باك..أرسلي الرابط بالجروبات وأنا أعمل لك كود خاص باسمك."',
          '🛑 الحالة 3 — أم ناصر (التأهيل التكنولوجي — قرب الجائزة):\n"عندكم حصص جماعية مجانية مع طلاب من دول مختلفة..وباقي اشتراك واحد فقط وتحصلوا على الآيباد..أي شخص تحسينه مهتم أرسلي رقمه وأنا أتابع معه."',
          '🛑 الحالة 4 — أم عبد الرحمن (تفعيل المقعد الذهبي):\n"عينت لك مشرفة صفية تتابع معك كل شيء..وتقدري تخلي مقعدك ذهبي وتزيدي حصصك..فقط رشحي رقمين مهتمين وخذي أسبوع مجاني ترحيبًا منا..الواحد يستفيد ويفيد بنفس الوقت."'
        ],
        items_zh:[
          '🛑 案例1——CM × 小明妈妈（解决学习问题型）：\n"我会为孩子增加对话课时，让他自己选择喜欢的话题，他表达能力很强……您身边有没有朋友想免费体验一节课？把联系方式发给我，我来亲自跟进他们。"',
          '🛑 案例2——CM × 法哈德妈妈（平台引导激活型）：\n"平台有课前预习和课后复习功能……法哈德可以积累积分和同学竞争……如果有4位家长通过您注册，恭喜您获得iPad或900里亚尔现金返还……您可以把推荐链接发到家长群，我为您设置专属推荐码。"',
          '🛑 案例3——CM × 纳赛尔妈妈（平台引导型——临近奖励）：\n"平台还有与其他国家学生的免费小组课……现在只差一个订阅，您就能拿到iPad了……有任何感兴趣的朋友，发联系方式给我，我来跟进。"',
          '🛑 案例4——CM × 阿卜杜拉赫曼妈妈（黄金座位激活型）：\n"我已经为您指定了专属课程督导，全程跟进……您可以把座位升级为黄金席位，增加课时……只需推荐2位感兴趣的朋友，我们免费送您一周欢迎课程……推荐别人，自己也受益，一举两得。"'
        ]}
    ]},
  { id:'pool-m36', icon:'📈', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'Customer Pool — M3 to M6', title_ar:'مجموعة العملاء — م3 إلى م6',
    color:'#0EA5E9', cl:'rgba(14,165,233,.15)', glow:'rgba(14,165,233,.2)',
    grad:'linear-gradient(135deg,#0EA5E9,#0284C7)',
    topics:['Customer Experience Level','Satisfaction Indicators','Learning Progress Impact','Consistency Indicators','Referral Confidence Level'],
    topics_ar:['مستوى تجربة العميل','مؤشرات الرضا','تأثير تقدم التعلم','مؤشرات الاتساق','مستوى ثقة الريفيرال'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'M3–M6 customers are "stable but fatigued" — they have likely been asked for referrals before and may have gone quiet. The primary goal is re-engagement using a bold new hook: converting a familiar customer into a revenue-earning Partner through a commission-based system ($100 per subscription). This reframes the referral from a favour into a business opportunity.',
        text_ar:'عملاء م3-م6 "مستقرون لكن مُنهَكون" — على الأرجح طُلب منهم الريفيرال من قبل وربما صمتوا. الهدف الأساسي هو إعادة التفاعل باستخدام خطاف جديد جريء: تحويل العميل المألوف إلى شريك يدرّ دخلاً عبر نظام عمولات (100 دولار لكل اشتراك). يُعيد هذا تأطير الريفيرال من معروف إلى فرصة عمل.',
        text_zh:'M3-M6阶段的客户处于"稳定但疲倦"的状态——他们很可能之前被邀请过推荐，可能已经变得沉默。核心目标是用一个全新的吸引力重新激活他们：将这位熟悉的客户转变为能通过佣金制度赚钱的合作伙伴（每成功订阅100美元）。这将推荐行为从"帮人情"重新定义为"商业机会"。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'After 3–6 months, the customer\'s initial enthusiasm has settled. They are comfortable but no longer surprised. Standard referral asks feel repetitive and are easily deflected. The Partner/Commission approach works because it:\n\n(1) ELEVATES STATUS: "We chose you specifically because you have influence" — from customer to partner.\n(2) CHANGES THE CURRENCY: Cash income vs. gift prizes appeals to a different motivation — practical financial benefit.\n(3) ACTIVATES AMBITION: "$100 per subscription" creates a clear, calculable income opportunity. The customer starts doing the math themselves.\n(4) LEVERAGES SOCIAL CAPITAL: "You have people who trust you" validates their network as an asset.',
        text_ar:'بعد 3-6 أشهر، استقر الحماس الأولي للعميل. يشعرون بالراحة لكنهم لم يعودوا يندهشون. تبدو طلبات الريفيرال المعتادة مكررة ويسهل التهرب منها. يعمل نهج الشراكة/العمولة لأنه:\n\n(1) يرفع المكانة: "اخترناك تحديداً لأن لديك تأثيراً" — من عميل إلى شريك.\n(2) يغيّر العملة: دخل نقدي مقابل جوائز هدايا يستهدف دافعاً مختلفاً — فائدة مالية عملية.\n(3) يُفعّل الطموح: "100 دولار لكل اشتراك" يخلق فرصة دخل واضحة وقابلة للحساب. يبدأ العميل بعمل الحسابات بنفسه.\n(4) يستثمر رأس المال الاجتماعي: "عندك ناس يثقون فيك" يُصادق على شبكتهم كأصل قيّم.',
        text_zh:'入学3-6个月后，客户最初的热情已经趋于平稳。他们感到舒适，但不再有惊喜感。常规的推荐邀请显得重复，容易被敷衍回避。合作/佣金模式之所以奏效，原因如下：\n\n（1）提升地位：\n"我们专门选择了您，因为您有影响力"——从客户升级为合作伙伴。\n（2）改变激励货币：现金收入vs.礼品奖励，针对的是不同的动机——实实在在的经济利益。\n（3）激发商业抱负：\n"每成功介绍一人订阅，您可获得100美元"——创造清晰可量化的收入机会，让客户自己开始算账。\n（4）激活社交资本：\n"您身边有信任您的人"——肯定他们的社交网络是一种有价值的资产。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'After delivering a strong academic progress review that restores confidence',
          'When the customer spontaneously praises the platform or mentions sharing it with someone',
          'When the customer has a large social network — YouTube channel, WhatsApp groups, wide family',
          'After the CM confirms the child\'s level and study plan — credibility is high',
          'When the customer mentions they know people interested in English education'
        ],
        items_ar:[
          'بعد تقديم مراجعة تقدم أكاديمية قوية تُعيد الثقة',
          'حين يمدح العميل المنصة تلقائياً أو يذكر أنه شاركها مع أحد',
          'حين لدى العميل شبكة اجتماعية واسعة — قناة يوتيوب، مجموعات واتساب، عائلة ممتدة',
          'بعد تأكيد الـ CM لمستوى الطفل وخطة الدراسة — المصداقية عالية',
          'حين يذكر العميل أنه يعرف أشخاصاً مهتمين بتعليم الإنجليزي'
        ],
        items_zh:[
          '给出一份有力的学习进展回顾后——重新建立信任',
          '客户主动称赞平台或提到已向他人介绍时',
          '客户拥有广泛的社交网络时——YouTube频道、WhatsApp群组、大家庭圈子',
          'CM确认孩子的级别和学习计划后——可信度处于高峰',
          '客户提到认识对英语教育感兴趣的朋友时'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Customer has a YouTube channel, Instagram account, or large WhatsApp groups',
          'Customer mentions they have told others about the platform already',
          'Customer is socially influential or mentions being part of active parent communities',
          'Customer is engaged, warm, and asks questions throughout the call',
          'Customer says "I\'ve recommended you to people but they didn\'t subscribe" — conversion problem, not intent problem'
        ],
        items_ar:[
          'لدى العميل قناة يوتيوب أو حساب إنستغرام أو مجموعات واتساب كبيرة',
          'يذكر العميل أنه أخبر آخرين عن المنصة مسبقاً',
          'العميل مؤثر اجتماعياً أو يذكر انتماءه لمجتمعات أولياء أمور نشطة',
          'العميل منخرط ودافئ ويطرح أسئلة طوال المكالمة',
          'يقول العميل "رشحت الناس ولكنهم ما اشتركوا" — مشكلة تحويل لا مشكلة نية'
        ],
        items_zh:[
          '客户拥有YouTube频道、Instagram账号或大型WhatsApp群组',
          '客户提到之前已向他人介绍过平台',
          '客户在社交圈中有影响力，或提到参与活跃的家长社群',
          '客户态度积极热情，通话全程主动提问',
          '客户说"我推荐过别人，但他们没有订阅"——这是转化问题，不是意愿问题'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Open with professional academic review of the child ⬅️ Demonstrate genuine understanding of the child\'s progress ⬅️ Transition: "We\'ve created something special for people with wide networks..." ⬅️ Explain the commission system ($100 per subscription or sessions) ⬅️ Ask them to share the link or a video in their groups ⬅️ Set up personal tracking code/link ⬅️ WhatsApp follow-up with the link and commission details',
        text_ar:'افتح بمراجعة أكاديمية احترافية للطفل ⬅️ أظهر فهماً حقيقياً لتقدم الطفل ⬅️ انتقل: "عملنا شيئاً خاصاً للناس اللي عندهم شبكات واسعة..." ⬅️ اشرح نظام العمولات (100 دولار لكل اشتراك أو حصص) ⬅️ اطلب منهم مشاركة الرابط أو فيديو في مجموعاتهم ⬅️ إعداد كود/رابط تتبع شخصي ⬅️ متابعة واتساب بالرابط وتفاصيل العمولة',
        text_zh:'以专业的孩子学习进展回顾开场 ⬅️ 展现对孩子进步的真诚了解 ⬅️ 过渡："我们为拥有广泛人脉的家长设计了一个特别合作计划……" ⬅️ 介绍佣金制度（每成功订阅100美元或等值课时）⬅️ 请客户在群组中分享链接或推荐视频 ⬅️ 设置专属追踪码/推荐链接 ⬅️ WhatsApp跟进发送链接和佣金详情' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Partner Framing: "عملنا شيء خاص للناس اللي عندهم معارف كثيرة." (أبو نايف)',
          'Commission Clarity: "أي شخص بيجي عن طريقك بيشترك لك 100 دولار." (أبو نايف)',
          'Mutual Benefit: "بدنا تستفيد وتأخذ حصص وتأخذ فلوس كمان."',
          'Link Accountability: "لازم يجوا عن طريقي حتى ينربطوا مباشرة باسمك."'
        ],
        items_ar:[
          'نمط الشراكة: "عملنا شيء خاص للناس اللي عندهم معارف كثيرة." (أبو نايف)',
          'وضوح العمولة: "أي شخص بيجي عن طريقك بيشترك لك 100 دولار." (أبو نايف)',
          'المنفعة المتبادلة: "بدنا تستفيد وتأخذ حصص وتأخذ فلوس كمان."',
          'مسؤولية الرابط: "لازم يجوا عن طريقي حتى ينربطوا مباشرة باسمك."'
        ],
        items_zh:[
          '合作伙伴框架："我们为人脉广泛的家长专门设计了一个合作计划。"',
          '佣金明确化："每有一位朋友通过您的链接订阅，您就能获得100美元。"',
          '双赢定位："我们希望您既能获得课时，也能赚到现金。"',
          '链接责任说明："他们必须通过您的专属链接注册，才能直接计入您的名下。"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Partner Commission Opening:\n"عملنا شيء خاص للناس اللي عندهم كثير أشخاص. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\n\nNetwork Activation:\n"إنت عندك ناس تثق فيك. إحنا اخترناك لأن عندك تأثير."\n\nLink + Code System:\n"أبعث لك رابط التسجيل الخاص فيك، أي شخص يسجل عن طريقه ينحسب مباشرة تحت اسمك."\n\nFinancial Clarity:\n"بدنا الناس ييجوا عن طريق شخص فاهم وجرب المنصة. مو مجرد ريفيرال… هذا نظام عمولات."',
        text_ar:'افتتاحية عمولة الشراكة:\n"عملنا شيء خاص للناس اللي عندهم كثير أشخاص. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\n\nتفعيل الشبكة:\n"إنت عندك ناس تثق فيك. إحنا اخترناك لأن عندك تأثير."\n\nنظام الرابط + الكود:\n"أبعث لك رابط التسجيل الخاص فيك، أي شخص يسجل عن طريقه ينحسب مباشرة تحت اسمك."\n\nوضوح مالي:\n"بدنا الناس ييجوا عن طريق شخص فاهم وجرب المنصة. مو مجرد ريفيرال… هذا نظام عمولات."',
        text_zh:'合作佣金开场话术：\n"我们为人脉广泛的家长专门设计了一个合作项目，有点像兼职机会——每有一位朋友通过您的链接订阅，您就能获得100美元。"\n\n激活社交网络：\n"您身边有信任您的朋友。我们选择您，是因为您有影响力。"\n\n专属链接+追踪码：\n"我来给您发一个专属注册链接，任何人通过它注册都会直接计入您的名下。"\n\n财务清晰化定位：\n"我们希望推荐人是真正了解并体验过平台的家长。这不只是普通推荐——这是一个佣金合作制度。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"أنا فقط أشارك الرابط؟"\n→ "لازم يجوا عن طريقي حتى ينربطوا مباشرة باسمك ويأخذوا الخصم."\n\n"ما بعرف إذا الناس رح تتجاوب."\n→ "حتى لو شخص واحد فقط سجل… الكاش كاملاً بتنحسب لك."\n\n"ما عندي وقت أتابع."\n→ "إنت فقط ابعث الرابط… والباقي كله علينا."',
        text_ar:'"أنا فقط أشارك الرابط؟"\n→ "لازم يجوا عن طريقي حتى ينربطوا مباشرة باسمك ويأخذوا الخصم."\n\n"ما بعرف إذا الناس رح تتجاوب."\n→ "حتى لو شخص واحد فقط سجل… الكاش كاملاً بتنحسب لك."\n\n"ما عندي وقت أتابع."\n→ "إنت فقط ابعث الرابط… والباقي كله علينا."',
        text_zh:'异议："我只是分享链接就行了吗？"\n→ "他们必须通过您的专属链接注册，才能直接计入您的名下，同时他们也能享受折扣优惠。"\n\n异议："我不知道大家会不会响应。"\n→ "哪怕只有一个人订阅……佣金就全部计入您的账户。"\n\n异议："我没有时间跟进。"\n→ "您只需要发出链接就好……其余的全部由我们来负责。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"أهم شيء تعبّي البيانات وتنشر الرابط."',
          '"أي شخص يجي عن طريقك أنا أتابعه شخصيًا."',
          '"إن شاء الله تكون فاتحة خير عليك."',
          'WhatsApp: "هذا رابط التسجيل الخاص فيك، أي شخص يسجل عن طريقه ينحسب مباشرة تحت اسمك 🙌 وأي اشتراك جديد = 100$ عمولة مباشرة إلك."',
          'WhatsApp: "أي شخص مهتم ابعثه إلي مباشرة وأنا أتابعه من البداية للنهاية عشان يضمن الخصم وينحسب تحت حسابك."'
        ],
        items_ar:[
          '"أهم شيء تعبّي البيانات وتنشر الرابط."',
          '"أي شخص يجي عن طريقك أنا أتابعه شخصيًا."',
          '"إن شاء الله تكون فاتحة خير عليك."',
          'واتساب: "هذا رابط التسجيل الخاص فيك، أي شخص يسجل عن طريقه ينحسب مباشرة تحت اسمك 🙌 وأي اشتراك جديد = 100$ عمولة مباشرة إلك."',
          'واتساب: "أي شخص مهتم ابعثه إلي مباشرة وأنا أتابعه من البداية للنهاية عشان يضمن الخصم وينحسب تحت حسابك."'
        ],
        items_zh:[
          '"最重要的是填好信息，然后把链接发出去。"',
          '"任何通过您推荐来的人，我都会亲自跟进。"',
          '"希望这是个好的开始，对您来说是个好消息。"',
          'WhatsApp："这是您的专属注册链接，所有通过它注册的人都会直接计入您的名下🙌 每成功订阅一人 = 直接获得100美元佣金。"',
          'WhatsApp："有任何感兴趣的朋友，直接发给我，我从头到尾亲自跟进，确保他们享受折扣并计入您的账户。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Full Case — أبو نايف (Partner/Commission Approach):\nStart: تقييم فونكس + تحليل نطق الحروف + شرح مستوى الطفل\nTransition: "أستاذ بدي أقول لك شغلة مهمة… عملنا شيء للناس اللي عندهم كثير أشخاص."\nOffer: "زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\nValue build: "بدنا تستفيد وتأخذ حصص وتأخذ فلوس كمان."\nObjection: "أنا فقط أشارك الرابط صح؟"\nResponse: "لازم يجوا عن طريقي حتى ينربطوا مباشرة باسمك."\nClose: "أهم شيء تعبّي البيانات وتنشر الرابط."',
          '📌 KEY INSIGHT: The Partner/Commission approach works best when:\n• Customer has been asked multiple times before\n• Customer is socially influential or has large groups\n• Standard referral asks have been deflected or ignored\n• Customer praises the platform spontaneously — they ARE convinced, just need a new motivation',
          '📌 QUALITY FILTERING in M3-M6: Ask for numbers directly tied to the commission: "أي شخص يجي عن طريقك" — the financial incentive naturally encourages customers to only share genuinely interested contacts, because they want the commission to materialise.'
        ],
        items_ar:[
          '🛑 الحالة الكاملة — أبو نايف (نهج الشراكة/العمولة):\nالبداية: تقييم فونكس + تحليل نطق الحروف + شرح مستوى الطفل\nالانتقال: "أستاذ بدي أقول لك شغلة مهمة… عملنا شيء للناس اللي عندهم كثير أشخاص."\nالعرض: "زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\nبناء القيمة: "بدنا تستفيد وتأخذ حصص وتأخذ فلوس كمان."\nالاعتراض: "أنا فقط أشارك الرابط صح؟"\nالرد: "لازم يجوا عن طريقي حتى ينربطوا مباشرة باسمك."\nالإغلاق: "أهم شيء تعبّي البيانات وتنشر الرابط."',
          '📌 نهج الشراكة/العمولة يعمل أفضل حين:\n• طُلب من العميل الريفيرال مرات عديدة من قبل\n• العميل مؤثر اجتماعياً أو لديه مجموعات كبيرة\n• تم تجاهل طلبات الريفيرال المعتادة\n• يمدح العميل المنصة تلقائياً — مقتنع فعلاً، يحتاج فقط دافعاً جديداً',
          '📌 تصفية الجودة في م3-م6: اطلب أرقاماً مرتبطة مباشرة بالعمولة: "أي شخص يجي عن طريقك" — الحافز المالي يشجع العملاء طبيعياً على مشاركة جهات الاتصال المهتمة فعلاً لأنهم يريدون تحقق العمولة.'
        ],
        items_zh:[
          '🛑 完整案例——纳伊夫先生（合作伙伴/佣金模式）：\n开场：进行学习评估 + 发音分析 + 讲解孩子的级别情况\n过渡："有件重要的事想跟您说……我们为人脉广泛的家长专门设计了一个合作计划。"\n提案："有点像兼职机会……每有一位朋友通过您的链接订阅，您就能获得100美元。"\n价值强化："我们希望您既能获得课时，也能赚到现金。"\n异议："我只是分享链接就行了吗？"\n解答："他们必须通过您的专属链接注册，才能直接计入您的名下。"\n收尾："最重要的是填好信息，然后把链接发出去。"',
          '📌 合作/佣金方式在以下情况效果最佳：\n• 客户之前已被邀请推荐多次\n• 客户在社交圈中有影响力或拥有大型群组\n• 常规推荐邀请被回避或忽视\n• 客户主动称赞平台——说明已经认可，只需要新的激励动力',
          '📌 M3-M6阶段的质量筛选：围绕佣金直接请求联系人："任何通过您介绍来的人"——经济激励自然会促使客户只分享真正感兴趣的联系人，因为他们希望佣金真正落地。'
        ]}
    ] },  { id:'pool-m7', icon:'🏆', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'Customer Pool — M7+', title_ar:'مجموعة العملاء — م7+',
    color:'#F59E0B', cl:'rgba(245,158,11,.15)', glow:'rgba(245,158,11,.2)',
    grad:'linear-gradient(135deg,#F59E0B,#D97706)',
    topics:['Loyalty Indicators','Long-Term Satisfaction','Retention Strength','Referral Ambassador Potential','Relationship Depth'],
    topics_ar:['مؤشرات الولاء','الرضا طويل الأمد','قوة الاحتفاظ','إمكانية سفير الريفيرال','عمق العلاقة'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'M7+ customers are long-term loyal brand advocates who have overcome referral fatigue. Three activation strategies: (1) Financial Urgency — "last month" scarcity + "earn enough to cover renewal" for price-sensitive customers near their final sessions. (2) Live Gratification — activate rewards live during the call so the customer experiences the win instantly, then motivate them to repeat it. (3) Academic Support & Referral Education — re-teach the correct referral linking process to customers who tried before but "lost" their reward due to technical errors.',
        text_ar:'عملاء م7+ مؤيدون مخلصون للعلامة التجارية على المدى البعيد تجاوزوا إجهاد الريفيرال. ثلاث استراتيجيات تفعيل: (1) الإلحاح المالي — شُح "آخر شهر" + "اكسبي ما يكفي لتغطية التجديد" للعملاء الحساسين للسعر القريبين من آخر حصصهم. (2) الإشباع الفوري — تفعيل المكافآت مباشرة خلال المكالمة حتى يختبر العميل الفوز فوراً، ثم يتحفز للتكرار. (3) الدعم الأكاديمي وتعليم الريفيرال — إعادة تعليم عملية ربط الريفيرال الصحيحة للعملاء الذين جربوا من قبل لكن "فقدوا" مكافأتهم بسبب أخطاء تقنية.',
        text_zh:'M7+阶段的客户是长期忠实的品牌拥护者，已经度过了推荐疲劳期。三种激活策略：（1）财务紧迫感——"最后一个月"稀缺性 + "赚取足够金额抵扣续费"，针对课时即将耗尽的价格敏感型客户。（2）即时奖励体验——在通话中实时兑换奖励，让客户立刻体验到"获胜"的快感，再激励他们再来一次。（3）学术支持与推荐教育——重新教导之前尝试过但因操作失误"丢失"奖励的客户，掌握正确的推荐绑定流程。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'After 7+ months, customers feel ownership of the platform. They are proud, comfortable, and trusted. Three psychological levers:\n\n(1) FINANCIAL URGENCY: "This is the last month the prizes work at full value." Loss aversion + financial pressure creates urgency that reactivates dormant referral intent.\n\n(2) LIVE GRATIFICATION: Activating a reward in real-time during the call creates an instant "win" feeling. The customer wants to repeat the experience — and the CM immediately ties the next win to a new referral.\n\n(3) TRUST RESTORATION: If a past referral "didn\'t count," the customer feels robbed. Explaining the correct process (direct number linking) turns frustration into motivation — "now I know how to make it work."',
        text_ar:'بعد 7+ أشهر، يشعر العملاء بملكية المنصة. إنهم فخورون، مرتاحون، وموثوق بهم. ثلاثة روافع نفسية:\n\n(1) الإلحاح المالي: "هذا آخر شهر تعمل فيه الجوائز بكامل قيمتها." كراهية الخسارة + الضغط المالي يخلق إلحاحاً يُعيد تفعيل نية الريفيرال الكامنة.\n\n(2) الإشباع الفوري: تفعيل مكافأة في الوقت الحقيقي خلال المكالمة يخلق شعور "فوز" فوري. يريد العميل تكرار التجربة — والـ CM يربط الفوز التالي فوراً بريفيرال جديد.\n\n(3) استعادة الثقة: إذا لم "يُحسب" ريفيرال سابق، يشعر العميل بالغبن. شرح العملية الصحيحة (الربط المباشر بالرقم) يحوّل الإحباط إلى دافع — "الآن أعرف كيف أجعلها تعمل."',
        text_zh:'入学7个月以上后，客户对平台产生了强烈的归属感。他们感到自豪、轻松，并被充分信任。三个核心心理杠杆：\n\n（1）财务紧迫感：\n"这是奖励按满额计算的最后一个月。"损失厌恶 + 财务压力制造出紧迫感，重新激活潜藏的推荐意愿。\n\n（2）即时奖励体验：\n在通话中实时激活奖励，让客户立刻获得"赢了"的满足感。客户会想要重复这种体验——CM随即将下一次"赢"与新的推荐挂钩。\n\n（3）信任修复：\n如果之前的推荐"没有算数"，客户会感到受委屈。清楚地解释正确操作流程（直接绑定号码）能将挫败感转化为动力——"这次我知道该怎么做了。"' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Financial Urgency: When customer\'s session balance is low and renewal hesitation is present',
          'Financial Urgency: In the final month of the subscription — "last chance" window',
          'Live Gratification: When a new child or relative has recently subscribed through their account',
          'Live Gratification: When there is a pending unclaimed reward in the referral log',
          'Academic Support: When the customer says "I shared with people before but got nothing"',
          'Academic Support: When previous referrals were not properly linked to their account'
        ],
        items_ar:[
          'الإلحاح المالي: حين يكون رصيد حصص العميل منخفضاً والتردد في التجديد حاضراً',
          'الإلحاح المالي: في الشهر الأخير من الاشتراك — نافذة "الفرصة الأخيرة"',
          'الإشباع الفوري: حين اشترك طفل جديد أو قريب مؤخراً عبر حسابه',
          'الإشباع الفوري: حين توجد مكافأة معلقة غير مُطالَب بها في سجل الريفيرال',
          'الدعم الأكاديمي: حين يقول العميل "رشحت ناس من قبل وما استفدت شيء"',
          'الدعم الأكاديمي: حين لم تُربط ريفيرالات سابقة بشكل صحيح بحسابه'
        ],
        items_zh:[
          '财务紧迫型：客户课时余额不足，且对续费有所顾虑时',
          '财务紧迫型：订阅即将到最后一个月——"最后机会"窗口期',
          '即时奖励型：近期有新孩子或亲属通过其账号完成订阅时',
          '即时奖励型：推荐记录中有待领取的未兑换奖励时',
          '学术支持型：客户说"我之前推荐过别人，但什么都没得到"时',
          '学术支持型：之前的推荐未正确绑定到其账号时'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Subscription nearing end — session count dropping',
          'Customer has unclaimed rewards in the referral log',
          'Customer mentions they shared the platform previously but didn\'t receive rewards',
          'Customer expresses financial hesitation about renewal',
          'Customer is an active parent in school groups or family networks'
        ],
        items_ar:[
          'الاشتراك يقترب من النهاية — عدد الحصص ينخفض',
          'لدى العميل مكافآت غير مُطالَب بها في سجل الريفيرال',
          'يذكر العميل أنه شارك المنصة سابقاً لكنه لم يتلقَّ مكافآت',
          'يُعبّر العميل عن تردد مالي حول التجديد',
          'العميل ولي أمر نشط في مجموعات مدرسية أو شبكات عائلية'
        ],
        items_zh:[
          '订阅即将到期——剩余课时数量下降',
          '客户的推荐记录中有未领取的待兑换奖励',
          '客户提到曾经介绍过他人使用平台，但从未收到奖励',
          '客户对续费表达了财务方面的顾虑',
          '客户是学校群组或家庭网络中的活跃家长'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'STRATEGY 1 — Financial Urgency ("Last Month"):\nAcknowledge financial pressure without pushing renewal ⬅️ Help with rewards/sessions issue ⬅️ Link prize availability to active sessions ⬅️ "This is the last month for full prizes" ⬅️ Ask for 2-3 interested numbers ⬅️ "Even 2-3 referrals = money to help with renewal"\n\nSTRATEGY 2 — Live Gratification:\nCongratulate on new subscription (child/relative) ⬅️ Open app together: Account → Referral Log → Claim Reward ⬅️ Activate 20 free sessions live ⬅️ Show value: "that\'s worth ~800 SAR" ⬅️ "Anyone else in the family who wants to subscribe?" ⬅️ "I\'ll link them directly to your account"\n\nSTRATEGY 3 — Academic Support:\nAnalyse student level + future plan (IELTS/levels) ⬅️ Offer support or discount ⬅️ "By the way, you mentioned people subscribed through you before..." ⬅️ Explain correct linking process ⬅️ "This time it will work — here\'s exactly how"',
        text_ar:'الاستراتيجية 1 — الإلحاح المالي ("آخر شهر"):\nالاعتراف بالضغط المالي دون الدفع للتجديد ⬅️ المساعدة في مشكلة المكافآت/الحصص ⬅️ ربط توفر الجوائز بالحصص النشطة ⬅️ "هذا آخر شهر للجوائز الكاملة" ⬅️ طلب 2-3 أرقام مهتمة ⬅️ "حتى 2-3 ريفيرالات = مبلغ يساعد في التجديد"\n\nالاستراتيجية 2 — الإشباع الفوري:\nالتهنئة باشتراك جديد (طفل/قريب) ⬅️ فتح التطبيق معاً: حسابي → سجل الدعوات → المطالبة بالمكافأة ⬅️ تفعيل 20 حصة مجانية مباشرة ⬅️ إظهار القيمة: "هذا يساوي ~800 ريال" ⬅️ "هل يوجد أحد آخر في العائلة يريد الاشتراك؟" ⬅️ "سأربطهم مباشرة بحسابك"\n\nالاستراتيجية 3 — الدعم الأكاديمي:\nتحليل مستوى الطالب + الخطة المستقبلية (IELTS/المستويات) ⬅️ عرض الدعم أو الخصم ⬅️ "بالمناسبة، ذكرت أن ناساً اشتركوا من طرفك من قبل..." ⬅️ شرح عملية الربط الصحيحة ⬅️ "هذه المرة ستعمل — إليك كيف بالضبط"',
        text_zh:'策略一——财务紧迫感（"最后一个月"）：\n承认财务压力，不强行推销续费 ⬅️ 帮助解决奖励/课时问题 ⬅️ 将奖励可用性与活跃课时挂钩 ⬅️ "这是奖励按满额计算的最后一个月" ⬅️ 请求2-3个感兴趣的联系人 ⬅️ "哪怕2-3个推荐 = 足以帮助续费的金额"\n\n策略二——即时奖励体验：\n恭喜有新孩子/亲属完成订阅 ⬅️ 一起打开应用：我的账户 → 推荐记录 → 领取奖励 ⬅️ 实时激活20节免费课 ⬅️ 展示价值："这相当于约800里亚尔" ⬅️ "家里还有其他人想订阅吗？" ⬅️ "我来直接绑定到您的账户"\n\n策略三——学术支持型：\n分析学生级别 + 未来计划（雅思/级别晋升）⬅️ 提供支持或折扣 ⬅️ "顺便说一句，您提到之前有人通过您注册过……" ⬅️ 讲解正确的绑定流程 ⬅️ "这次一定没问题——这是具体操作步骤"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Financial Urgency: "هذا اخر شهر هذا اخر شهر فانت حقي شوفي لك اثنين شوفي لك ثلاثه وكسبتي مبلغ زي العالم." (أم مها وبندر)',
          'Live Gratification: "روحي على سجل الدعوات... نصيحه خذي الحصص ترى قيمه الحصص تقريباً حول 800 ريال." (أم علي ومحمد)',
          'Academic Support: "لازم اللي يكون مسجل عن طريقك يدي اعلام ان هو مسجل عن طريقك. خذي بالك المره الجايه الافضل تتواصلي معاه الشخص." (أم ريحانه)',
          'Scarcity Hook: "كل ما قل عدد الحصص الموجوده لاولادك كل ما صار صعب جداً انه أي شو اسمه نخليك تاخذي جائزه."'
        ],
        items_ar:[
          'الإلحاح المالي: "هذا اخر شهر هذا اخر شهر فانت حقي شوفي لك اثنين شوفي لك ثلاثه وكسبتي مبلغ زي العالم." (أم مها وبندر)',
          'الإشباع الفوري: "روحي على سجل الدعوات... نصيحه خذي الحصص ترى قيمه الحصص تقريباً حول 800 ريال." (أم علي ومحمد)',
          'الدعم الأكاديمي: "لازم اللي يكون مسجل عن طريقك يدي اعلام ان هو مسجل عن طريقك. خذي بالك المره الجايه الافضل تتواصلي معاه الشخص." (أم ريحانه)',
          'خطاف الندرة: "كل ما قل عدد الحصص الموجوده لاولادك كل ما صار صعب جداً انه أي شو اسمه نخليك تاخذي جائزه."'
        ],
        items_zh:[
          '财务紧迫型话术："这真的是最后一个月了，您不妨争取推荐2-3个人，赚到的金额足以抵扣一大部分续费。"',
          '即时奖励型话术："去推荐记录那里看看……我建议选课时，课时的实际价值大约相当于800里亚尔。"',
          '学术支持型话术："通过您推荐的人，需要在注册时告知是通过您介绍来的，并且账号要与您的号码关联，这样课时才能计入您的账户。下次记得提醒他们直接联系我。"',
          '稀缺性钩子话术："孩子的课时越少，就越难帮您争取到奖励——所以现在是最佳时机。"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Financial Urgency:\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد."\n"حتى لو شفتي حدا ما حيقدر تاخذي جائزه انت معك بس هذا الشهر."\n\nLive Gratification:\n"روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه."\n"نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\n"اذا احد من ابنائك الثانيين او اقاربك يبي يشترك بربطه على مقعد علي."\n\nAcademic Support:\n"لازم اللي يكون مسجل عن طريقك يدي اعلام ان هو مسجل عن طريقك. ويكون رابط حسابه بحسابك او رقمك عشان تنزل لك الحصص."',
        text_ar:'الإلحاح المالي:\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد."\n"حتى لو شفتي حدا ما حيقدر تاخذي جائزه انت معك بس هذا الشهر."\n\nالإشباع الفوري:\n"روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه."\n"نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\n"اذا احد من ابنائك الثانيين او اقاربك يبي يشترك بربطه على مقعد علي."\n\nالدعم الأكاديمي:\n"لازم اللي يكون مسجل عن طريقك يدي اعلام ان هو مسجل عن طريقك. ويكون رابط حسابه بحسابك او رقمك عشان تنزل لك الحصص."',
        text_zh:'财务紧迫型推荐话术：\n"我建议您试试看——因为孩子的课时越来越少了，现在推荐2-3个人，赚到的金额说不定够续费其中一个孩子。"\n"就算只找到一个人，这个月的奖励您还是能拿到。"\n\n即时奖励体验话术：\n"请进入推荐记录……您会看到小明已经注册并订阅，点击然后选择领取奖励。"\n"我建议选课时，课时的实际价值大约相当于800里亚尔。"\n"如果您其他孩子或亲属也想订阅，我可以直接帮他们绑定到小明的账号下。"\n\n学术支持型推荐话术：\n"通过您推荐的人注册时，需要告知是您介绍来的，并且账号要与您的号码关联，这样课时才能计入您的账户。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"والله ما أقدر أجدد."\n→ "عشان كذا بقولك استفيدي من الريفيرال وخلي المنصة تساعدك بالحصص أو الكاش."\n\n"حالياً ظروفي صعبة."\n→ "ما عندي مشكلة بالتجديد الآن، بس لا يضيع عليك آخر شهر للجوائز."\n\n"آخذ كاش ولا حصص؟" (Live Gratification)\n→ "الحصص قيمتها أعلى كثير وبتفيدكم أكاديمياً أكثر."\n\n"سجلوا من طرفي وما استفدت." (Academic Support)\n→ "لازم يكون مربوط بحسابك أو رقمك حتى تنزل الحصص. خذي بالك المرة الجاية الأفضل تتواصلي معه الشخص."',
        text_ar:'"والله ما أقدر أجدد."\n→ "عشان كذا بقولك استفيدي من الريفيرال وخلي المنصة تساعدك بالحصص أو الكاش."\n\n"حالياً ظروفي صعبة."\n→ "ما عندي مشكلة بالتجديد الآن، بس لا يضيع عليك آخر شهر للجوائز."\n\n"آخذ كاش ولا حصص؟" (الإشباع الفوري)\n→ "الحصص قيمتها أعلى كثير وبتفيدكم أكاديمياً أكثر."\n\n"سجلوا من طرفي وما استفدت." (الدعم الأكاديمي)\n→ "لازم يكون مربوط بحسابك أو رقمك حتى تنزل الحصص. خذي بالك المرة الجاية الأفضل تتواصلي معه الشخص."',
        text_zh:'异议："我真的没办法续费。"\n→ "正是因为这样，我才建议您用推荐来获取课时或现金，让平台来帮助您解决这个问题。"\n\n异议："我现在情况比较难。"\n→ "续费的事先不急，但这是最后一个月享受满额奖励，不要错过这个机会。"\n\n异议（即时奖励型）："我该选现金还是课时？"\n→ "课时的价值高多了，而且对孩子的学习更有帮助。"\n\n异议（学术支持型）："他们通过我注册了，但我什么都没收到。"\n→ "必须要把账号绑定到您的号码才能计入课时。下次记得让他们直接联系我来操作绑定。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Financial Urgency Closing: "أنا بانتظار الأرقام منك. خلينا نحاول نستفيد من الفرصة قبل نهاية الشهر."',
          'Live Gratification: "مبروك عليكم تفعيل الـ 20 حصة 🎉 أي شخص جديد يجي عن طريقكم رح نربطه مباشرة على مقعد علي 🌷"',
          'Academic Support: "أي شخص يسجل من طرفك خليّه يربط حسابه بحسابك."',
          'WhatsApp (Financial Urgency): "هلا أم مها 🌷 مثل ما حكينا، هذا آخر شهر للاستفادة من الجوائز. أي شخص مهتم ابعتي رقمه وأنا أتابع معاه مباشرة 🤍"',
          'WhatsApp (Academic Support): "أي شخص يسجل من طرفك لازم يربط حسابه بحسابك حتى تنزل لك الحصص مباشرة 🤍"'
        ],
        items_ar:[
          'إغلاق الإلحاح المالي: "أنا بانتظار الأرقام منك. خلينا نحاول نستفيد من الفرصة قبل نهاية الشهر."',
          'الإشباع الفوري: "مبروك عليكم تفعيل الـ 20 حصة 🎉 أي شخص جديد يجي عن طريقكم رح نربطه مباشرة على مقعد علي 🌷"',
          'الدعم الأكاديمي: "أي شخص يسجل من طرفك خليّه يربط حسابه بحسابك."',
          'واتساب (الإلحاح المالي): "هلا أم مها 🌷 مثل ما حكينا، هذا آخر شهر للاستفادة من الجوائز. أي شخص مهتم ابعتي رقمه وأنا أتابع معاه مباشرة 🤍"',
          'واتساب (الدعم الأكاديمي): "أي شخص يسجل من طرفك لازم يربط حسابه بحسابك حتى تنزل لك الحصص مباشرة 🤍"'
        ],
        items_zh:[
          '财务紧迫型收尾："我等您的联系方式。我们一起抓住月底前的这个机会。"',
          '即时奖励型收尾："恭喜您成功激活20节课🎉 任何通过您推荐来的新用户，我们都会直接绑定到小明的账号🌷"',
          '学术支持型收尾："任何通过您注册的人，让他们把账号绑定到您的账号下。"',
          'WhatsApp（财务紧迫型）："您好🌷 正如我们聊过的，这是享受满额奖励的最后一个月。有任何感兴趣的朋友，把号码发给我，我来直接跟进🤍"',
          'WhatsApp（学术支持型）："任何通过您推荐注册的人，都需要把账号绑定到您的账号，课时才能直接计入您的账户🤍"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم مها وبندر (Financial Urgency):\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد."\n"هذا اخر شهر هذا اخر شهر فانت حقي شوفي لك اثنين شوفي لك ثلاثه وكسبتي مبلغ زي العالم."',
          '🛑 Case 2 — أم علي ومحمد (Live Gratification):\n"روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه."\n"نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\n"اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد علي."',
          '🛑 Case 3 — أم ريحانه (Academic Support & Referral Education):\n"لازم اللي يكون مسجل عن طريقك يدي اعلام ان هو مسجل عن طريقك."\n"ويكون رابط حسابه بحسابك او رقمك عشان تنزل لك الحصص."\n"خذي بالك المره الجايه الافضل تتواصلي معاه الشخص."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم مها وبندر (الإلحاح المالي):\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد."\n"هذا اخر شهر هذا اخر شهر فانت حقي شوفي لك اثنين شوفي لك ثلاثه وكسبتي مبلغ زي العالم."',
          '🛑 الحالة 2 — أم علي ومحمد (الإشباع الفوري):\n"روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه."\n"نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\n"اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد علي."',
          '🛑 الحالة 3 — أم ريحانه (الدعم الأكاديمي وتعليم الريفيرال):\n"لازم اللي يكون مسجل عن طريقك يدي اعلام ان هو مسجل عن طريقك."\n"ويكون رابط حسابه بحسابك او رقمك عشان تنزل لك الحصص."\n"خذي بالك المره الجايه الافضل تتواصلي معاه الشخص."'
        ],
        items_zh:[
          '🛑 案例1——CM × 妈妈（财务紧迫型）：\n"我建议您试试——孩子的课时快用完了，现在推荐2-3个人赚到的金额，说不定够给其中一个孩子续费。"\n"这真的是最后一个月了，您争取找2-3个人，赚到的金额绝对不少。"',
          '🛑 案例2——CM × 小明妈妈（即时奖励体验型）：\n"请进入推荐记录……您会看到小明已经注册并订阅，点击然后选择领取奖励。"\n"我建议选课时，课时的实际价值大约相当于800里亚尔。"\n"您其他孩子或亲属如果也想订阅，我可以直接帮他们绑定到小明的账号下。"',
          '🛑 案例3——CM × 瑞哈娜妈妈（学术支持与推荐教育型）：\n"通过您推荐注册的人，需要告知是您介绍来的。"\n"账号需要与您的号码关联，这样课时才能计入您的账户。"\n"下次记得让他们直接联系我来操作绑定。"'
        ]}
    ] },
  { id:'cons-high', icon:'🔥', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'High Class Consumption', title_ar:'استهلاك حصص مرتفع',
    color:'#EF4444', cl:'rgba(239,68,68,.15)', glow:'rgba(239,68,68,.2)',
    grad:'linear-gradient(135deg,#EF4444,#DC2626)',
    topics:['Engagement Level','Active Learning Indicators','Satisfaction Patterns','Referral Potential','Positive Experience Indicators'],
    topics_ar:['مستوى التفاعل','مؤشرات التعلم النشط','أنماط الرضا','إمكانية الريفيرال','مؤشرات التجربة الإيجابية'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Convert high class consumption into social proof and referral momentum by anchoring the referral ask to the child\'s visible enthusiasm and proximity to a prize. The customer already believes in the product — the job is to translate that belief into action through urgency and reciprocity.',
        text_ar:'تحويل الاستهلاك المرتفع للحصص إلى دليل اجتماعي وزخم ريفيرال بربط طلب الإحالة بحماس الطفل المرئي وقربه من الجائزة. العميل يؤمن بالمنتج مسبقاً — المهمة هي ترجمة هذا الإيمان إلى فعل عبر الإلحاح والتبادل.',
        text_zh:'将高课时消耗转化为口碑传播力和推荐动力，方法是将推荐邀请与孩子明显的学习热情及临近奖励的节点挂钩。客户已经对产品充满信心——现在的任务是通过紧迫感和互惠心理，将这种信心转化为实际行动。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'High-consumption parents are emotionally invested in their child\'s progress. They respond to prize proximity ("only 2 more referrals for the iPad"), social identity ("you\'re one of our star families"), and the idea that sharing the referral link is doing a favor to other parents — not selling. Guilt around inaction decreases when referral feels effortless and rewarding.',
        text_ar:'أولياء الأمور ذوو الاستهلاك المرتفع مستثمَرون عاطفياً في تقدم أطفالهم. يستجيبون للقرب من الجائزة ("ريفيرالَين فقط للآيباد")، والهوية الاجتماعية ("أنتِ من أسرنا المميزة")، وفكرة أن مشاركة رابط الريفيرال تُعدّ خدمة للأمهات الأخريات — لا مجرد بيع. يتراجع الشعور بالذنب من الجمود حين يبدو الريفيرال سهلاً ومجزياً.',
        text_zh:'高课时消耗的家长对孩子的学习进步有着高度的情感投入。他们对以下三类信号反应强烈：临近奖励（"再推荐2个就能拿到iPad"）、社会认同感（"您是我们的明星家庭之一"），以及"分享推荐链接是帮助其他家长，而非推销"的理念。当推荐行为显得轻松且有实质回报时，不行动的内疚感自然降低。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Right after the parent mentions the child is excited, asking for more, or attending extra sessions',
          'When the parent spontaneously compliments the teaching quality or the child\'s improvement',
          'During a renewal or upgrade call when the emotional high is already present',
          'Right after delivering a positive progress update or session count milestone'
        ],
        items_ar:[
          'فور ذكر الوالد أن الطفل متحمس، يطلب المزيد، أو يحضر حصصاً إضافية',
          'حين يُثني الوالد تلقائياً على جودة التدريس أو تحسن الطفل',
          'خلال مكالمة تجديد أو ترقية حين تكون النشوة العاطفية حاضرة أصلاً',
          'فور تقديم تحديث إيجابي عن التقدم أو إنجاز عدد حصص'
        ],
        items_zh:[
          '家长刚提到孩子很兴奋、主动要求上更多课、或参加了额外课时时',
          '家长主动称赞教学质量或孩子的进步时',
          '续费或升级通话期间——情感高潮已经存在',
          '刚完成正面学习进展更新或课时里程碑时'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Child uses most or all sessions each month — no leftover balance',
          'Parent mentions the child asks about lessons, counts sessions, or is excited to attend',
          'Parent uses phrases like "he loves it," "she won\'t stop asking," "it\'s part of his routine"',
          'Parent is on a multi-subject or premium plan',
          'Parent has already referred once before (warm re-referrer)'
        ],
        items_ar:[
          'الطفل يستخدم معظم أو كل الحصص شهرياً — لا رصيد متبقٍّ',
          'الوالد يذكر أن الطفل يسأل عن الدروس، ويعدّ الحصص، أو متحمس للحضور',
          'الوالد يستخدم عبارات مثل "يحبها"، "ما تتوقف عن السؤال"، "أصبحت جزءاً من روتينه"',
          'الوالد مشترك في خطة متعددة المواد أو خطة بريميوم',
          'الوالد سبق وأرشح مرة من قبل (مُرشِّح دافئ معاد)'
        ],
        items_zh:[
          '孩子每月几乎用完所有课时——没有剩余余额',
          '家长提到孩子主动询问课程、掰着手指数课时，或对上课充满期待',
          '家长使用"很喜欢"、"一直问什么时候上课"、"已经成了日常习惯"等表达',
          '家长订阅了多科目套餐或高级套餐',
          '家长曾经推荐过一次（热度较高的二次推荐潜力客户）'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'1. Open with a genuine observation about the child\'s engagement (use session data if available).\n2. Let the parent confirm and expand — they want to talk about their child\'s success.\n3. Bridge to prize proximity: tie the number of referrals needed directly to the prize the child wants.\n4. Frame the referral link share as a simple WhatsApp forward — minimal effort, maximum reward.\n5. Handle hesitation by offering to draft the message for them.\n6. Close with a clear, specific ask: "Can you think of one parent right now who would love this for their child?"',
        text_ar:'1. افتح بملاحظة صادقة عن تفاعل الطفل (استخدم بيانات الحصص إن توفرت).\n2. دع الوالد يُؤكد ويتوسع — يريد الحديث عن نجاح طفله.\n3. اربط بالقرب من الجائزة: اربط عدد الريفيرالات المطلوبة بالجائزة التي يريدها الطفل مباشرة.\n4. اجعل مشاركة رابط الريفيرال تبدو مجرد إعادة توجيه على واتساب — جهد أدنى، مكافأة أعلى.\n5. تعامل مع التردد بعرض صياغة الرسالة بدلاً عنهم.\n6. أنهِ بطلب واضح ومحدد: "هل تتبادر إلى ذهنك أم واحدة الآن ستحب هذا لطفلها؟"',
        text_zh:'1. 用真诚的观察作为开场——聊聊孩子的参与度（如有课时数据可加以引用）。\n2. 让家长去确认并展开说——他们很乐意分享孩子的成功。\n3. 引入临近奖励：将所需推荐人数直接与孩子心仪的奖品挂钩。\n4. 将推荐链接的分享包装成一次简单的WhatsApp转发——门槛极低，回报实在。\n5. 遇到犹豫时，主动提出为他们起草好消息模板，只需转发即可。\n6. 用清晰具体的请求作为收尾："您现在脑海中有没有哪位家长，会希望她的孩子也能有这样的体验？"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Prize Proximity Hook: "You\'re only 2 referrals away from the iPad your son keeps asking about"',
          'Enthusiasm Mirror: "Since he\'s attending every session and asking for more, you clearly see the value — other parents deserve to know about this too"',
          'Effortless Ask: "You don\'t have to explain anything — just forward this link and let the app speak for itself"',
          'Child as Motivation: "Imagine him seeing his name on the prize board — you\'re closer than you think"',
          'Reciprocity Frame: "A lot of our top families share it because they genuinely feel it helped their child"'
        ],
        items_ar:[
          'النمط أ — خطاف القرب من الجائزة: "أنتِ على بُعد ريفيرالَين فقط من الآيباد الذي يطلبه ابنك باستمرار"',
          'النمط ب — مرآة الحماس: "بما أنه يحضر كل حصة ويطلب المزيد، فأنتِ واضح ترين القيمة — الأمهات الأخريات يستحققن معرفة ذلك أيضاً"',
          'النمط ج — الطلب السهل: "لا يلزمك شرح أي شيء — مجرد إعادة توجيه هذا الرابط ودعي التطبيق يتكلم عن نفسه"',
          'النمط د — الطفل كدافع: "تخيليه يرى اسمه على لوحة الجوائز — أنتِ أقرب مما تتصورين"',
          'النمط ه — إطار التبادل: "كثير من أسرنا المتميزة تشاركه لأنهم يشعرون فعلاً أنه أفاد أطفالهم"'
        ],
        items_zh:[
          '模式A——临近奖励钩子："您现在只差2个推荐，就能拿到儿子一直心心念念的iPad了"',
          '模式B——热情镜像："既然孩子每节课都来而且还想要更多，说明您已经看到了价值——其他妈妈也值得知道这件事"',
          '模式C——零门槛邀请："您不需要解释任何东西——只要转发这个链接，让应用自己说话"',
          '模式D——以孩子为动力："想象一下他看到自己的名字出现在奖励榜上——您比想象中更近了"',
          '模式E——互惠框架："我们很多明星家庭都会分享，因为他们真心觉得这个平台帮助了自己的孩子"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Prize Proximity — بعيدين بس اتنين:\n"أنتِ بعيدة بس اتنين عن الـ iPad اللي [اسم الطفل] بيطلبه من فترة. عندك أي أم في الواتساب جروب المدرسة ممكن تستفيد؟"\n\nEnthusiasm Conversion — ما دام بيحبها:\n"ما دام [اسم الطفل] بيحب الحصص وبيحضر كلها، ده بيقول إن التجربة ممتازة. مش أحسن إنك تعرّفي أم تانية بيها؟"\n\nStar Family Frame:\n"إحنا بنشوف إن الأسر اللي أطفالها بيستخدموا الأبليكيشن بجدية زي أنتِ — هم اللي بيساعدوا باقي الأمهات يعرفوا عنا."',
        text_ar:'القرب من الجائزة — بعيدين بس اتنين:\n"أنتِ بعيدة بس اتنين عن الـ iPad اللي [اسم الطفل] بيطلبه من فترة. عندك أي أم في الواتساب جروب المدرسة ممكن تستفيد؟"\n\nتحويل الحماس — ما دام بيحبها:\n"ما دام [اسم الطفل] بيحب الحصص وبيحضر كلها، ده بيقول إن التجربة ممتازة. مش أحسن إنك تعرّفي أم تانية بيها؟"\n\nإطار الأسرة المميزة:\n"إحنا بنشوف إن الأسر اللي أطفالها بيستخدموا الأبليكيشن بجدية زي أنتِ — هم اللي بيساعدوا باقي الأمهات يعرفوا عنا."',
        text_zh:'临近奖励推荐话术：\n"您现在只差2个推荐，就能拿到[孩子名字]一直想要的iPad了。您学校的家长群里，有没有哪位妈妈可能也感兴趣？"\n\n转化热情推荐话术：\n"既然[孩子名字]这么喜欢课程、每节都来，说明体验真的很棒。何不让其他妈妈也了解一下呢？"\n\n明星家庭框架话术：\n"我们发现，孩子认真使用平台的家庭，就像您一样——他们往往也是帮助其他妈妈了解我们的最好桥梁。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Objection: "مش عارفة حد مناسب"\nResponse: "مش لازم تكوني متأكدة — أي أم عندها ولد في المرحلة الابتدائية أو الإعدادية ممكن تستفيد. بعتيلها اللينك وهي تقرر."\n\nObjection: "هي مش مهتمة بالتعليم الأونلاين"\nResponse: "كتير من أمهاتنا كانوا زي كده — لغاية ما شافوا نتائج ولادنا. اللينك بيشرح نفسه."\n\nObjection: "أنا مش بحب أزعل حد"\nResponse: "تماماً مش بيع — إنتِ بتشاركي حاجة استفدتِ منها فعلاً. ده معروف مش إزعاج."',
        text_ar:'اعتراض: "مش عارفة حد مناسب"\nالرد: "مش لازم تكوني متأكدة — أي أم عندها ولد في المرحلة الابتدائية أو الإعدادية ممكن تستفيد. بعتيلها اللينك وهي تقرر."\n\nاعتراض: "هي مش مهتمة بالتعليم الأونلاين"\nالرد: "كتير من أمهاتنا كانوا زي كده — لغاية ما شافوا نتائج ولادنا. اللينك بيشرح نفسه."\n\nاعتراض: "أنا مش بحب أزعل حد"\nالرد: "تماماً مش بيع — إنتِ بتشاركي حاجة استفدتِ منها فعلاً. ده معروف مش إزعاج."',
        text_zh:'异议："我不知道有没有合适的人"\n→ "不需要特别确定——任何有小学或初中孩子的妈妈都可能感兴趣。把链接发给她，让她自己决定。"\n\n异议："她对网课不感兴趣"\n→ "我们很多妈妈以前也这样——直到她们看到孩子的进步。链接本身就能说明问题。"\n\n异议："我不太喜欢麻烦别人"\n→ "完全不是推销——您是在分享自己真正受益的东西。这是一份好意，不是打扰。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"تمام، هبعتلك اللينك دلوقتي على الواتساب — ابعتيه لأي أم في بالك."',
          '"خليني أبعتلك رسالة جاهزة تبعتيها من غير ما تكتبي حاجة."',
          '"هل عندك جروب مدرسة أو جروب أمهات ممكن تشاركيه فيه؟"',
          '"بمجرد ما حد يشترك من لينكك — هتلاقي نقطة اتضافت للـ iPad."',
          '"إنتِ من أكتر الأمهات اللي أطفالها مستخدمين الأبليكيشن بجدية — كلمتك بتفرق لأمهات تانية."'
        ],
        items_ar:[
          '"تمام، هبعتلك اللينك دلوقتي على الواتساب — ابعتيه لأي أم في بالك."',
          '"خليني أبعتلك رسالة جاهزة تبعتيها من غير ما تكتبي حاجة."',
          '"هل عندك جروب مدرسة أو جروب أمهات ممكن تشاركيه فيه؟"',
          '"بمجرد ما حد يشترك من لينكك — هتلاقي نقطة اتضافت للـ iPad."',
          '"إنتِ من أكتر الأمهات اللي أطفالها مستخدمين الأبليكيشن بجدية — كلمتك بتفرق لأمهات تانية."'
        ],
        items_zh:[
          '"好的，我现在把链接发到您的WhatsApp——转发给您想到的任何一位妈妈都可以。"',
          '"我来给您准备一条现成的消息，您直接转发就行，不用自己写任何东西。"',
          '"您有没有学校家长群或妈妈群，可以在里面分享一下？"',
          '"只要有人通过您的链接订阅——就会立刻给iPad积分榜加上一分。"',
          '"您是孩子最认真使用平台的家长之一——您的推荐对其他妈妈来说很有分量。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم ديالى:\nالموقف: بتشتكي من إن ديالى بتطلب حصص أكتر من اللي عندها.\nالفرصة: استخدم الطلب الزيادة كدليل على قيمة الخدمة وربطه بالريفيرال.\nالسكريبت: "ده بالظبط اللي بيخلينا نقول إن التجربة ناجحة — ديالى بتطلب أكتر. إنتِ بعيدة بس ريفيرال واحد عن حصص مجانية إضافية. في أم في بالك ممكن تستفيد؟"\nالنتيجة: شاركت اللينك في جروب المدرسة في نفس المكالمة.',
          '🛑 Case 2 — أم علي:\nالموقف: علي بيسأل كل يوم امتى الحصة الجاية.\nالفرصة: حول حماس الطفل لحافز اجتماعي للأم.\nالسكريبت: "لما الولد بيسأل كل يوم عن الحصة — ده بيقول إن في حاجة مميزة بتحصل. ما تخليش اللي علي بيستمتع بيه سر — ابعتي اللينك لأم تانية وإنتِ بتساعديها فعلاً."\nالنتيجة: أرسلت اللينك لثلاث أمهات من جروب الفصل.',
          '🛑 Case 3 — أم تميم:\nالموقف: أم تميم ذكرت إن تميم حضر 18 حصة الشهر ده.\nالفرصة: استخدم الرقم كإنجاز وادفعي للريفيرال من خلال الفخر.\nالسكريبت: "18 حصة في شهر واحد — ده رقم مش بنشوفه كتير! إنتِ واضح إنك استثمرتِ بجد في تميم. في حد من صحباتك أو أهلك ممكن يحتاج نفس الحاجة لولده؟"\nالنتيجة: رشحت أختها وانضمت في نفس الأسبوع.'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم ديالى:\nالموقف: بتشتكي من إن ديالى بتطلب حصص أكتر من اللي عندها.\nالفرصة: استخدم الطلب الزيادة كدليل على قيمة الخدمة وربطه بالريفيرال.\nالسكريبت: "ده بالظبط اللي بيخلينا نقول إن التجربة ناجحة — ديالى بتطلب أكتر. إنتِ بعيدة بس ريفيرال واحد عن حصص مجانية إضافية. في أم في بالك ممكن تستفيد؟"\nالنتيجة: شاركت اللينك في جروب المدرسة في نفس المكالمة.',
          '🛑 الحالة 2 — أم علي:\nالموقف: علي بيسأل كل يوم امتى الحصة الجاية.\nالفرصة: حول حماس الطفل لحافز اجتماعي للأم.\nالسكريبت: "لما الولد بيسأل كل يوم عن الحصة — ده بيقول إن في حاجة مميزة بتحصل. ما تخليش اللي علي بيستمتع بيه سر — ابعتي اللينك لأم تانية وإنتِ بتساعديها فعلاً."\nالنتيجة: أرسلت اللينك لثلاث أمهات من جروب الفصل.',
          '🛑 الحالة 3 — أم تميم:\nالموقف: أم تميم ذكرت إن تميم حضر 18 حصة الشهر ده.\nالفرصة: استخدم الرقم كإنجاز وادفعي للريفيرال من خلال الفخر.\nالسكريبت: "18 حصة في شهر واحد — ده رقم مش بنشوفه كتير! إنتِ واضح إنك استثمرتِ بجد في تميم. في حد من صحباتك أو أهلك ممكن يحتاج نفس الحاجة لولده؟"\nالنتيجة: رشحت أختها وانضمت في نفس الأسبوع.'
        ],
        items_zh:[
          '🛑 案例1——CM × 迪亚拉妈妈：\n情况：妈妈抱怨迪亚拉总想上更多课，课时不够用。\n机会：将孩子的强烈需求作为服务价值的佐证，顺势引入推荐邀请。\n话术："这正好说明体验很成功——迪亚拉还想要更多。您只差一个推荐就能获得额外免费课时。您家长群里有哪位妈妈可能感兴趣？"\n结果：当次通话中就在学校群转发了链接。',
          '🛑 案例2——CM × 小明妈妈：\n情况：小明每天都问下次课是什么时候。\n机会：将孩子的热情转化为妈妈的社交驱动力。\n话术："孩子每天都在问下次上课，说明这里有特别的事情在发生。别让小明喜欢的东西成为秘密——把链接发给另一位妈妈，您是在真心帮助她。"\n结果：把链接发给了班级群里的3位妈妈。',
          '🛑 案例3——CM × 泰明妈妈：\n情况：妈妈提到泰明这个月上了18节课。\n机会：将这个数字作为成就感的切入点，通过自豪感推动推荐。\n话术："一个月18节课——这是我们很少见到的！您明显在泰明身上做了真正的投入。您的朋友或家人中，有没有人可能需要为孩子做同样的事情？"\n结果：推荐了自己的姐姐，同一周就加入了。'
        ]}
    ] },
  { id:'cons-low', icon:'📉', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'Low Class Consumption', title_ar:'استهلاك حصص منخفض',
    color:'#8B5CF6', cl:'rgba(139,92,246,.15)', glow:'rgba(139,92,246,.2)',
    grad:'linear-gradient(135deg,#8B5CF6,#7C3AED)',
    topics:['Usage Behavior','Low Engagement Reasons','Service Gaps','Referral Hesitation Indicators','Customer Concerns'],
    topics_ar:['سلوك الاستخدام','أسباب انخفاض التفاعل','فجوات الخدمة','مؤشرات التردد في الريفيرال','مخاوف العميل'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Rehabilitate the customer\'s confidence in the service before asking for a referral. Low consumption is usually a symptom of confusion, guilt, or misaligned expectations — not disinterest. Two proven approaches: (1) Performance Report + VIP Scarcity — use data/reports to restore credibility then pivot to exclusive access; (2) Balance Gap Strategy — highlight that the current balance is insufficient to complete the level, position referral as the mechanism to unlock free sessions and finish strong.',
        text_ar:'إعادة تأهيل ثقة العميل بالخدمة قبل طلب الريفيرال. الاستهلاك المنخفض عادةً عَرَضٌ للارتباك أو الشعور بالذنب أو التوقعات غير المنسجمة — لا انعدام الاهتمام. نهجان مجرّبان: (1) تقرير الأداء + ندرة VIP — استخدم البيانات/التقارير لاستعادة المصداقية ثم انتقل للوصول الحصري؛ (2) استراتيجية فجوة الرصيد — سلّط الضوء على أن الرصيد الحالي لا يكفي لإتمام المستوى، وضَع الريفيرال بوصفه الآلية لفتح حصص مجانية وإنهاية المستوى بقوة.',
        text_zh:'在提出推荐邀请之前，先重建客户对服务的信心。课时消耗少通常是困惑、内疚或期望错位的症状——而不是真的不感兴趣。两种经过验证的方法：（1）学习报告 + VIP稀缺感——用数据/报告重建可信度，再过渡到独家访问权；（2）余额缺口策略——指出当前余额不足以完成当前级别，将推荐定位为获取免费课时、帮助孩子圆满完成学习目标的解决方案。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Low-consumption parents often feel guilty or defensive about unused sessions. They may be waiting for the "right time" or have quietly disengaged without cancelling. Two key levers: (A) Reframe low usage as a solvable problem, not a failure — give them a path forward. (B) Introduce scarcity or loss aversion — "you\'re leaving sessions unused while the level closes" creates urgency. Once confidence is restored and urgency is felt, referral feels like a natural step rather than an add-on ask.',
        text_ar:'أولياء الأمور ذوو الاستهلاك المنخفض كثيراً ما يشعرون بالذنب أو يدافعون عن الحصص غير المستخدمة. ربما ينتظرون "الوقت المناسب" أو انفصلوا بهدوء دون إلغاء. رافعتان رئيسيتان: (أ) أعِد تأطير الاستخدام المنخفض بوصفه مشكلة قابلة للحل لا إخفاقاً — أعطِهم مساراً للأمام. (ب) أدخِل الندرة أو كراهية الخسارة — "أنتِ تتركين حصصاً دون استخدام بينما المستوى يُغلق" يخلق إلحاحاً. حين تستعاد الثقة ويُحسّ بالإلحاح، يبدو الريفيرال خطوة طبيعية لا طلباً إضافياً.',
        text_zh:'课时消耗少的家长往往对未使用的课时感到愧疚或有防御心理。他们可能在等待"合适的时机"，或者悄悄地疏远了平台但没有退订。两个核心心理杠杆：（A）将低使用率重新定义为可解决的问题，而非失败——给他们一条前进的路。（B）引入稀缺感或损失厌恶——"课时在流失，而这个级别还没完成"制造紧迫感。一旦信心恢复、紧迫感产生，推荐邀请就会显得顺理成章，而非额外负担。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'After sending or referencing a progress/performance report — data creates credibility',
          'When the parent mentions they\'ve been "meaning to get back to it" or "life has been busy"',
          'Near the end of the academic level when unused sessions feel like a loss',
          'When the parent reveals their balance is low but their child hasn\'t finished the curriculum',
          'During a reactivation or winback call — low usage is the opening, not a dead end'
        ],
        items_ar:[
          'بعد إرسال أو الإشارة إلى تقرير تقدم/أداء — البيانات تُنشئ مصداقية',
          'حين يذكر الوالد أنهم كانوا "ينوون العودة إليه" أو "الحياة كانت مشغولة"',
          'قرب نهاية المستوى الأكاديمي حين تبدو الحصص غير المستخدمة خسارة',
          'حين يكشف الوالد أن رصيده منخفض لكن طفله لم يُنهِ المنهج',
          'خلال مكالمة إعادة تفعيل أو استعادة — الاستخدام المنخفض هو المدخل لا الطريق المسدود'
        ],
        items_zh:[
          '发送或提及学习进展/成绩报告后——数据建立可信度',
          '家长提到"一直打算回来继续"或"最近生活太忙"时',
          '临近学习级别结束时——未使用的课时感觉像是一种损失',
          '家长坦言余额不多，但孩子还没完成当前学习内容时',
          '重新激活或挽回通话期间——低使用率是切入点，不是死路'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Session balance significantly higher than expected for this stage of the level',
          'Last login or class was weeks ago — system shows inactivity',
          'Parent mentions "we\'ve been busy," "he hasn\'t had time," or "she\'s going to start soon"',
          'Parent sounds hesitant or vague when asked about the child\'s progress',
          'Parent hasn\'t engaged with reports or check-in messages sent by the team'
        ],
        items_ar:[
          'رصيد الحصص أعلى بكثير مما يُتوقع لهذه المرحلة من المستوى',
          'آخر تسجيل دخول أو حصة كانت منذ أسابيع — يُظهر النظام خمولاً',
          'يقول الوالد "كنّا مشغولين"، "ما عنده وقت"، أو "ستبدأ قريباً"',
          'يبدو الوالد مترددًا أو مبهماً حين يُسأل عن تقدم الطفل',
          'الوالد لم يتفاعل مع التقارير أو رسائل المتابعة المرسلة من الفريق'
        ],
        items_zh:[
          '课时余额远高于该阶段的预期水平',
          '最近一次登录或上课是几周前——系统显示不活跃',
          '家长说"最近比较忙"、"孩子没时间"或"快要开始了"',
          '被问到孩子的学习进展时，家长显得犹豫或表达含糊',
          '家长没有回应团队发送的报告或跟进消息'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Approach A — Performance Report + VIP Scarcity:\n1. Lead with a report or data point that shows the child\'s potential ("the report shows strong comprehension when he attends").\n2. Normalize low usage without blame — reframe it as a scheduling issue, not disengagement.\n3. Introduce VIP Scarcity: limited golden seats, exclusive teacher slots, or a closing cohort.\n4. Ask for referral as part of the VIP experience — "our top families get priority spots when they share with one friend."\n\nApproach B — Balance Gap Strategy:\n1. Open by acknowledging the remaining balance vs. sessions needed to complete the level.\n2. Frame the gap as a risk: "at the current pace, the balance runs out before the level ends."\n3. Position referral as the bridge: "each referral adds sessions — that closes the gap."\n4. Make the math simple and specific: "two referrals = 4 free sessions = level complete."',
        text_ar:'النهج أ — تقرير الأداء + ندرة VIP:\n1. ابدأ بتقرير أو نقطة بيانات تُظهر إمكانات الطفل ("التقرير يُظهر استيعاباً قوياً حين يحضر").\n2. طبّع الاستخدام المنخفض بلا توبيخ — أعِد تأطيره على أنه مشكلة جدول لا انفصال.\n3. قدّم ندرة VIP: مقاعد ذهبية محدودة، وقت مع معلمين متخصصين، أو مجموعة تُغلق.\n4. اطلب الريفيرال كجزء من تجربة VIP — "أسرنا المميزة تحصل على أولوية حين تشارك مع صديقة واحدة."\n\nالنهج ب — استراتيجية فجوة الرصيد:\n1. ابدأ بالإقرار بالرصيد المتبقي مقابل الحصص اللازمة لإتمام المستوى.\n2. أطّر الفجوة بوصفها خطراً: "بالوتيرة الحالية، ينتهي الرصيد قبل نهاية المستوى."\n3. ضَع الريفيرال بوصفه الجسر: "كل ريفيرال يُضيف حصصاً — هذا يُغلق الفجوة."\n4. اجعل الحساب بسيطاً ومحدداً: "ريفيرالان = 4 حصص مجانية = المستوى مكتمل."',
        text_zh:'方法A——学习报告 + VIP稀缺感：\n1. 以展示孩子潜力的报告或数据开场（"报告显示只要孩子按时上课，理解能力很强"）。\n2. 不带指责地正视低使用率——将其重新定义为时间安排问题，而不是退出。\n3. 引入VIP稀缺感：名额有限的黄金座位、专属老师的档期，或即将关闭的学习小组。\n4. 将推荐请求融入VIP体验——"我们的优质家庭分享一个链接就能获得优先名额。"\n\n方法B——余额缺口策略：\n1. 开场时指出剩余余额与完成当前级别所需课时之间的差距。\n2. 将差距定义为风险："按照目前的节奏，余额会在级别结束前用完。"\n3. 将推荐定位为弥补缺口的桥梁："每次推荐都能增加课时——这样缺口就弥补上了。"\n4. 让计算简单且具体："2个推荐 = 4节免费课 = 级别完成。"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Report Opener: "I have a report in front of me — when [child\'s name] attends, the comprehension scores are strong. The issue is attendance, not ability."',
          'VIP Scarcity: "We have a limited number of golden seats with our senior teachers next month — I\'d love to reserve one for [child\'s name]."',
          'Balance Gap Alert: "You have X sessions left but need Y to finish the level — that\'s a gap of Z sessions. A referral or two fills that."',
          'Soft Reactivation: "Let\'s get [child\'s name] back on track first — I\'ll set up a makeup schedule — and while we do that, is there one parent you know who might benefit from the same?"',
          'Loss Framing: "The sessions are there waiting — it would be a shame to leave them unused when the level is this close to done."'
        ],
        items_ar:[
          'النمط أ — افتتاح التقرير: "أمامي تقرير — حين يحضر [اسم الطفل]، درجات الاستيعاب قوية. المشكلة في الانتظام لا في القدرة."',
          'النمط ب — ندرة VIP: "لدينا عدد محدود من المقاعد الذهبية مع معلمينا الكبار الشهر القادم — أودّ حجز مقعد لـ [اسم الطفل]."',
          'النمط ج — تنبيه فجوة الرصيد: "لديك X حصة متبقية لكن تحتاجين Y لإنهاء المستوى — الفرق Z حصة. ريفيرال أو اثنان يملآن ذلك."',
          'النمط د — إعادة التفعيل اللطيفة: "لنعِد [اسم الطفل] للمسار أولاً — سأضع جدول تعويضي — وبينما نفعل ذلك، هل تعرفين أماً واحدة ستستفيد من نفس الشيء؟"',
          'النمط ه — إطار الخسارة: "الحصص موجودة تنتظر — سيكون من الحيف تركها دون استخدام والمستوى على وشك الانتهاء."'
        ],
        items_zh:[
          '模式A——报告开场："我这里有一份报告——只要[孩子名字]按时出席，理解能力非常强。问题在于规律性，不在于能力。"',
          '模式B——VIP稀缺："下个月我们有数量有限的黄金座位，专门跟随资深老师——我希望为[孩子名字]预留一个名额。"',
          '模式C——余额缺口预警："您还有X节课时，但完成当前级别需要Y节——相差Z节。一两个推荐就能填补这个缺口。"',
          '模式D——温和重激活："我们先把[孩子名字]拉回正轨——我来设置一个补课计划——同时，您认识哪位妈妈可能也需要这样的帮助？"',
          '模式E——损失框架："课时在那里等着用——眼看级别快要完成了，让它们白白流失太可惜了。"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Balance Gap Bridge:\n"عندها X حصص متبقية بس محتاجة Y عشان تخلص المستوى. لو جبتِ ريفيرال واحد بس — الفجوة دي بتتغطى وهي بتخلص المستوى من غير ما تدفعي أي حاجة زيادة."\n\nVIP Reactivation:\n"عندنا مقاعد VIP محدودة مع مدرسين متخصصين الشهر الجاي — بقدر أحجز لـ [اسم الطفل] لو شاركتِ اللينك مع أم تانية. ده مش متاح للكل."\n\nReport Confidence Restore:\n"التقرير بيقول إن لما بتحضر بتفهم كويس — المشكلة مش في القدرة، المشكلة في الانتظام. خليني أساعدك ترجعي على المسار وفي نفس الوقت تستفيدي من الريفيرال."',
        text_ar:'جسر فجوة الرصيد:\n"عندها X حصص متبقية بس محتاجة Y عشان تخلص المستوى. لو جبتِ ريفيرال واحد بس — الفجوة دي بتتغطى وهي بتخلص المستوى من غير ما تدفعي أي حاجة زيادة."\n\nإعادة تفعيل VIP:\n"عندنا مقاعد VIP محدودة مع مدرسين متخصصين الشهر الجاي — بقدر أحجز لـ [اسم الطفل] لو شاركتِ اللينك مع أم تانية. ده مش متاح للكل."\n\nاستعادة الثقة بالتقرير:\n"التقرير بيقول إن لما بتحضر بتفهم كويس — المشكلة مش في القدرة، المشكلة في الانتظام. خليني أساعدك ترجعي على المسار وفي نفس الوقت تستفيدي من الريفيرال."',
        text_zh:'余额缺口弥补话术：\n"她还剩X节课时，但完成这个级别需要Y节。如果您能推荐一个人——这个缺口就补上了，孩子可以顺利完成级别，完全不需要额外付费。"\n\nVIP重新激活话术：\n"下个月我们有数量有限的VIP名额，可以跟随专业老师——如果您把链接转发给一位妈妈，我可以为[孩子名字]预留一个名额。这不是对所有人开放的。"\n\n报告信心恢复话术：\n"报告显示只要孩子按时上课，理解能力非常好——问题不在能力，在于规律性。让我帮您重回正轨，同时也能通过推荐获益。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Objection: "هي مش بتحضر أصلاً — ما ينفعش أرشح حد"\nResponse: "ده بالظبط اللي بنتكلم فيه — نرجعها على المسار الأول، وبعدين الريفيرال هيساعدك تكملي المستوى معاها بدون تكلفة زيادة."\n\nObjection: "مش متأكدة إن الخدمة كافية عشان أرشح"\nResponse: "أفهمك — خليني أبعتلك التقرير الكامل الأول. لما تشوفيه هتعرفي إيه اللي اتعمل وإيه اللي باقي. كتير من الأمهات اللي كانوا في نفس موقفك رشحوا بعد ما شافوا التقرير."\n\nObjection: "معنديش وقت دلوقتي"\nResponse: "تماماً — ما في داعي لأي حاجة دلوقتي. هبعتلك اللينك على الواتساب وبعتيه لأي أم في بالك في أي وقت يناسبك."',
        text_ar:'اعتراض: "هي مش بتحضر أصلاً — ما ينفعش أرشح حد"\nالرد: "ده بالظبط اللي بنتكلم فيه — نرجعها على المسار الأول، وبعدين الريفيرال هيساعدك تكملي المستوى معاها بدون تكلفة زيادة."\n\nاعتراض: "مش متأكدة إن الخدمة كافية عشان أرشح"\nالرد: "أفهمك — خليني أبعتلك التقرير الكامل الأول. لما تشوفيه هتعرفي إيه اللي اتعمل وإيه اللي باقي. كتير من الأمهات اللي كانوا في نفس موقفك رشحوا بعد ما شافوا التقرير."\n\nاعتراض: "معنديش وقت دلوقتي"\nالرد: "تماماً — ما في داعي لأي حاجة دلوقتي. هبعتلك اللينك على الواتساب وبعتيه لأي أم في بالك في أي وقت يناسبك."',
        text_zh:'异议："孩子根本不来上课——我怎么能推荐别人呢"\n→ "这正是我们要解决的问题——先把孩子拉回正轨，然后推荐计划会帮助您免费完成这个级别，不需要额外付费。"\n\n异议："我不确定服务够好，不敢推荐"\n→ "我理解——让我先把完整报告发给您看看。看完您就能知道已经完成了什么、还剩什么。很多和您处于同样情况的妈妈，看了报告之后都主动推荐了。"\n\n异议："我现在没有时间"\n→ "完全没关系——现在什么都不需要做。我把链接发到您的WhatsApp，您有空的时候转发给任何一位您想到的妈妈就行。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"خليني أبعتلك التقرير دلوقتي — وبعدين نتكلم على الخطوة الجاية سوا."',
          '"المستوى هيخلص في X أسابيع — عندك Y حصة متبقية. ريفيرال واحد بيغطي الفرق."',
          '"هحجزلك مقعد VIP مع المدرس المتخصص بمجرد ما تشاركي اللينك — ده مش متاح للكل."',
          '"مش محتاجة تشرحي أي حاجة — بعتي اللينك وخلي الأبليكيشن يشرح نفسه."',
          '"إيه أقرب أم في بالك دلوقتي — من جروب المدرسة أو من الأهل؟"'
        ],
        items_ar:[
          '"خليني أبعتلك التقرير دلوقتي — وبعدين نتكلم على الخطوة الجاية سوا."',
          '"المستوى هيخلص في X أسابيع — عندك Y حصة متبقية. ريفيرال واحد بيغطي الفرق."',
          '"هحجزلك مقعد VIP مع المدرس المتخصص بمجرد ما تشاركي اللينك — ده مش متاح للكل."',
          '"مش محتاجة تشرحي أي حاجة — بعتي اللينك وخلي الأبليكيشن يشرح نفسه."',
          '"إيه أقرب أم في بالك دلوقتي — من جروب المدرسة أو من الأهل؟"'
        ],
        items_zh:[
          '"我现在把报告发给您——然后我们一起商量下一步怎么做。"',
          '"这个级别还有X周完成——您有Y节剩余课时。一个推荐就能弥补差距。"',
          '"只要您转发链接，我立刻为您预留专属老师的VIP名额——这不是对所有人开放的。"',
          '"您不需要解释任何东西——把链接发出去，让应用自己说明就好。"',
          '"您现在脑海中最近的一位妈妈是谁——学校群里的还是家里的亲戚？"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم سارة:\nالموقف: سارة مش بتحضر منتظمة وأمها حاسة بالذنب.\nالمدخل: التقرير + VIP.\nالسكريبت: "التقرير بيقول لما سارة بتحضر بتتفاعل كويس جداً. المشكلة في الانتظام مش في القدرة. عندنا جروب VIP مع مدرسة متخصصة في القراءة — قدرت أحجزلها مقعد لو شاركتِ اللينك مع أم واحدة بس."\nالنتيجة: أم سارة شاركت اللينك مع أخت جارتها وانضمت في نفس الأسبوع.',
          '🛑 Case 2 — أم سفانا:\nالموقف: سفانا عندها رصيد كبير متبقي وقريبة من نهاية المستوى.\nالمدخل: Balance Gap.\nالسكريبت: "سفانا عندها 8 حصص بس المستوى محتاج 14 عشان يخلص. الفرق 6 حصص — ريفيرالين بيغطوا الفرق ده وبتخلصي المستوى من غير ما تدفعي أي زيادة."\nالنتيجة: شاركت اللينك مع اتنين من صحباتها وكملت المستوى.',
          '🛑 Case 3 — دكتورة سارة:\nالموقف: مشغولة ومش بتتابع — بتقول "هخليها تحضر بعدين".\nالمدخل: Soft reactivation + ريفيرال كحل مش كمطلوب.\nالسكريبت: "أنا فاهمة إنك مشغولة — خليني أبعتلك جدول مرن نبدأ بيه. وفي نفس الوقت، اللينك ده لو بعتيه لأي أم في بالك بيضيف حصص على رصيدك تلقائي."\nالنتيجة: قبلت الجدول وشاركت اللينك مع أم من جروب الكلية.',
          '🛑 Case 4 — أم بدر:\nالموقف: مش راضية تماماً لأن بدر "مش بيتحسن بسرعة".\nالمدخل: Report reframe + scarcity.\nالسكريبت: "التقرير بيقول إن التحسن موجود بس بيحتاج انتظام أكتر. إحنا عندنا مدرس متخصص في الحالات دي — بس مقاعده محدودة. لو عايزاه لبدر، أحتاج تشاركي اللينك مع أم واحدة بس."\nالنتيجة: أم بدر وافقت وشاركت اللينك مع أم من مدرسة بدر.',
          '🛑 Case 5 — أم إيلان:\nالموقف: إيلان مش بتحضر من أسبوعين وأمها مش ردت على الرسايل.\nالمدخل: Winback + balance urgency.\nالسكريبت: "لاحظت إن إيلان مش حضرت من أسبوعين — ده بيأثر على رصيدها اللي باقي. عايزة نرتب حصة تجريبية مجانية الأسبوع ده عشان نرجعها على المسار؟ وفي نفس الوقت — في أم في بالك ممكن تستفيد؟"\nالنتيجة: رجعت للحضور وشاركت اللينك مع أم من النادي.'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم سارة:\nالموقف: سارة مش بتحضر منتظمة وأمها حاسة بالذنب.\nالمدخل: التقرير + VIP.\nالسكريبت: "التقرير بيقول لما سارة بتحضر بتتفاعل كويس جداً. المشكلة في الانتظام مش في القدرة. عندنا جروب VIP مع مدرسة متخصصة في القراءة — قدرت أحجزلها مقعد لو شاركتِ اللينك مع أم واحدة بس."\nالنتيجة: أم سارة شاركت اللينك مع أخت جارتها وانضمت في نفس الأسبوع.',
          '🛑 الحالة 2 — أم سفانا:\nالموقف: سفانا عندها رصيد كبير متبقي وقريبة من نهاية المستوى.\nالمدخل: فجوة الرصيد.\nالسكريبت: "سفانا عندها 8 حصص بس المستوى محتاج 14 عشان يخلص. الفرق 6 حصص — ريفيرالين بيغطوا الفرق ده وبتخلصي المستوى من غير ما تدفعي أي زيادة."\nالنتيجة: شاركت اللينك مع اتنين من صحباتها وكملت المستوى.',
          '🛑 الحالة 3 — دكتورة سارة:\nالموقف: مشغولة ومش بتتابع — بتقول "هخليها تحضر بعدين".\nالمدخل: إعادة تفعيل لطيفة + ريفيرال كحل مش كمطلوب.\nالسكريبت: "أنا فاهمة إنك مشغولة — خليني أبعتلك جدول مرن نبدأ بيه. وفي نفس الوقت، اللينك ده لو بعتيه لأي أم في بالك بيضيف حصص على رصيدك تلقائي."\nالنتيجة: قبلت الجدول وشاركت اللينك مع أم من جروب الكلية.',
          '🛑 الحالة 4 — أم بدر:\nالموقف: مش راضية تماماً لأن بدر "مش بيتحسن بسرعة".\nالمدخل: إعادة تأطير التقرير + الندرة.\nالسكريبت: "التقرير بيقول إن التحسن موجود بس بيحتاج انتظام أكتر. إحنا عندنا مدرس متخصص في الحالات دي — بس مقاعده محدودة. لو عايزاه لبدر، أحتاج تشاركي اللينك مع أم واحدة بس."\nالنتيجة: أم بدر وافقت وشاركت اللينك مع أم من مدرسة بدر.',
          '🛑 الحالة 5 — أم إيلان:\nالموقف: إيلان مش بتحضر من أسبوعين وأمها مش ردت على الرسايل.\nالمدخل: استعادة + إلحاح الرصيد.\nالسكريبت: "لاحظت إن إيلان مش حضرت من أسبوعين — ده بيأثر على رصيدها اللي باقي. عايزة نرتب حصة تجريبية مجانية الأسبوع ده عشان نرجعها على المسار؟ وفي نفس الوقت — في أم في بالك ممكن تستفيد؟"\nالنتيجة: رجعت للحضور وشاركت اللينك مع أم من النادي.'
        ]}
    ] },

  { id:'inc-ipad', icon:'🖥️', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'iPad Incentive', title_ar:'حافز الآيباد',
    color:'#6366F1', cl:'rgba(99,102,241,.15)', glow:'rgba(99,102,241,.2)',
    grad:'linear-gradient(135deg,#6366F1,#4F46E5)',
    topics:['Best Presentation Timing','Customer Reaction Patterns','Interest Indicators','Incentive Positioning'],
    topics_ar:['أفضل توقيت للعرض','أنماط تفاعل العميل','مؤشرات الاهتمام','طريقة تقديم الحافز'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Use iPad prize proximity to convert satisfied parents into active referral sources. The core mechanism: make the customer feel they are ONE or TWO referrals away from a prize their child wants — creating urgency and a personal challenge. The iPad is never introduced as "a company offer" but as "a goal you\'re almost at."',
        text_ar:'استخدام القرب من جائزة الآيباد لتحويل الآباء الراضين إلى مصادر ريفيرال نشطة. الآلية الجوهرية: اجعل العميل يشعر أنه ريفيرال واحد أو اثنان بعيداً عن جائزة يريدها طفله — مما يخلق إلحاحاً وتحدياً شخصياً. لا يُقدَّم الآيباد قط بوصفه "عرض الشركة" بل بوصفه "هدف أنتِ توشكين على الوصول إليه."' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Five psychological triggers make the iPad work:\n\n(1) PRIZE PROXIMITY: "Only 2 more" is the most powerful phrase. Near-completion creates an almost irresistible urge to finish.\n(2) CHILD AS MOTIVATOR: "The iPad goes to your son/daughter" — parent is doing it for the child, not for themselves. Removes ego barrier.\n(3) SOCIAL PROOF: "Other families have already won iPads" normalises the achievement and proves it\'s real.\n(4) REWARD LADDER: Having iPad at step 4 (not step 1) creates a progression that keeps customers engaged across multiple referral attempts.\n(5) GUARANTEED, NOT A DRAW: "الجائزة مو بتدخل سحب" — certainty eliminates doubt.',
        text_ar:'خمسة محفزات نفسية تجعل الآيباد يعمل:\n\n(1) القرب من الجائزة: "اثنان فقط" هي أقوى عبارة. القرب من الإتمام يخلق دافعاً شبه لا يُقاوَم للإنهاء.\n(2) الطفل كمحرّك: "الآيباد سيذهب لابنك/ابنتك" — الوالد يفعله من أجل الطفل لا نفسه. يزيل حاجز الأنا.\n(3) الإثبات الاجتماعي: "أسر أخرى ربحت آيبادات بالفعل" يُطبّع الإنجاز ويُثبت أنه حقيقي.\n(4) سلّم المكافآت: وضع الآيباد في الخطوة 4 (لا الأولى) يُنشئ تقدماً يُبقي العملاء منخرطين عبر محاولات ريفيرال متعددة.\n(5) مضمون لا سحب: "الجائزة مو بتدخل سحب" — اليقين يُزيل الشك.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When the customer has already referred 1-3 people — show them the remaining gap',
          'After delivering a positive progress update on the child — parent is emotionally receptive',
          'When the customer mentions the child wants "something" or asks about rewards',
          'During high-consumption periods — parent is engaged and believes in the value',
          'Near end of month — creating urgency with "this month\'s prize window"'
        ],
        items_ar:[
          'حين سبق للعميل إحالة 1-3 أشخاص — أظهِر له الفجوة المتبقية',
          'بعد تقديم تحديث إيجابي عن تقدم الطفل — الوالد مهيّأ عاطفياً',
          'حين يذكر العميل أن الطفل يريد "شيئاً" أو يسأل عن المكافآت',
          'خلال فترات الاستهلاك المرتفع — الوالد منخرط ويؤمن بالقيمة',
          'قرب نهاية الشهر — خلق إلحاح بـ "نافذة جائزة هذا الشهر"'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Has 1-3 existing referrals in their log — near the iPad threshold',
          'Child attends sessions consistently and enthusiastically',
          'Parent mentions school groups, WhatsApp groups, or teaching communities',
          'Parent has referred before successfully — proven track record',
          'Parent asks "what happens if I refer people?" — actively curious'
        ],
        items_ar:[
          'لديه 1-3 ريفيرالات في سجله — قريب من عتبة الآيباد',
          'الطفل يحضر الحصص باستمرار وبحماس',
          'الوالد يذكر مجموعات مدرسية أو واتساب أو مجتمعات تعليمية',
          'الوالد سبق وأرشح بنجاح — سجل حافل',
          'الوالد يسأل "ماذا يحدث لو أرشحت ناساً؟" — فضولي بشكل إيجابي'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Child progress update ⬅️ Open referral log together in the app ⬅️ Show current count: "you have X subscribed from your side" ⬅️ "You only need Y more for the iPad" ⬅️ Show new prizes (Jarir vouchers, PlayStation, iPad, Umrah) ⬅️ "Share in your WhatsApp groups — I\'ll create a personal discount code for you" ⬅️ "Don\'t let them sign up alone — send me the number and I\'ll link it to your account" ⬅️ Send prize photos via WhatsApp',
        text_ar:'تحديث تقدم الطفل ⬅️ فتح سجل الريفيرال معاً في التطبيق ⬅️ إظهار العدد الحالي: "اشترك X أشخاص من طرفك" ⬅️ "تحتاجين Y فقط للآيباد" ⬅️ عرض الجوائز الجديدة (قسائم جرير، بلاي ستيشن، آيباد، عمرة) ⬅️ "شاركي في مجموعات الواتساب — سأنشئ لك كود خصم شخصي" ⬅️ "لا تدعيهم يسجلون بمفردهم — أرسلي لي الرقم وسأربطه بحسابك" ⬅️ إرسال صور الجوائز عبر الواتساب' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Prize Ladder: "ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة." (أم ديالى)',
          'Number Gap: "هلا لو في كمان اثنين عن طريقك بتاخذي 20 حصه مجانيه عن كل واحد وبتاخذي هيك ايباد." (أم علي)',
          'Near-win Hook: "بما انك انت الحين شفتي كيف لما رشحتي... عندك حدا كمان يعني انت الحين صرت قربتي على الايباد." (أم تميم)',
          'Guarantee Phrase: "الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد." (أم فاطمة)',
          'No Solo Signup: "ما يفوتوا لحالهم — بتزوديني انا بحس برقمهم وبربطهم على حساب علي." (أم علي)'
        ],
        items_ar:[
          'سلّم الجوائز: "ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة." (أم ديالى)',
          'فجوة العدد: "هلا لو في كمان اثنين عن طريقك بتاخذي 20 حصه مجانيه عن كل واحد وبتاخذي هيك ايباد." (أم علي)',
          'خطاف قرب الفوز: "بما انك انت الحين شفتي كيف لما رشحتي... عندك حدا كمان يعني انت الحين صرت قربتي على الايباد." (أم تميم)',
          'عبارة الضمان: "الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد." (أم فاطمة)',
          'لا تسجيل فردي: "ما يفوتوا لحالهم — بتزوديني انا بحس برقمهم وبربطهم على حساب علي." (أم علي)'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Prize Gap Opener:\n"ضيلكم شخصين وبتاخذ وتربحوا الايباد... شوفي الهدايا الجديدة... ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)\n\nReferral Log Walkthrough:\n"افتحي التطبيق وروحي على حسابي → سجل الدعوات. عندك حاليًا شخصين اشتركوا عن طريقك. ولو في شخصين كمان بتاخذي 20 حصة مجانية عن كل واحد + الأيباد." (أم علي)\n\nMonth-End Urgency:\n"باقي اشتراك واحد وتحصلوا على جهاز الآيباد… أي حدا تحسينه مهتم أرسلي رقمه." (أم ناصر)',
        text_ar:'افتتاح فجوة الجائزة:\n"ضيلكم شخصين وبتاخذ وتربحوا الايباد... شوفي الهدايا الجديدة... ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)\n\nعرض سجل الريفيرال:\n"افتحي التطبيق وروحي على حسابي → سجل الدعوات. عندك حاليًا شخصين اشتركوا عن طريقك. ولو في شخصين كمان بتاخذي 20 حصة مجانية عن كل واحد + الأيباد." (أم علي)\n\nإلحاح نهاية الشهر:\n"باقي اشتراك واحد وتحصلوا على جهاز الآيباد… أي حدا تحسينه مهتم أرسلي رقمه." (أم ناصر)' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"جبتنا ناس ووين الهدية؟" (سبق وعدتنا بآيباد)\n→ "طالما انت ليكي ايباد هتاخذي الايباد طالما هو حد قال لك انك ليكي. ما يعني هو ما تقلقيش طالما انت اوعدتي بحاجة باذن الله هتجي لك." (أم خليفة)\n\n"والله ما عندي إلا هذول."\n→ "بحبشي شوفي يا أم تميم، اشتراك هيك كمان واحد أو اثنين توصلي تقريبا للقسائم." (أم تميم)\n\n"الله يرزقنا يا رب."\n→ "انت واسعي وابعثي لي أرقام واتسك الباقي علي." (أم بدر)',
        text_ar:'"جبتنا ناس ووين الهدية؟" (وعد سابق بآيباد)\n→ "طالما انت ليكي ايباد هتاخذي الايباد طالما هو حد قال لك انك ليكي. ما يعني هو ما تقلقيش طالما انت اوعدتي بحاجة باذن الله هتجي لك." (أم خليفة)\n\n"والله ما عندي إلا هذول."\n→ "بحبشي شوفي يا أم تميم، اشتراك هيك كمان واحد أو اثنين توصلي تقريبا للقسائم." (أم تميم)\n\n"الله يرزقنا يا رب."\n→ "انت واسعي وابعثي لي أرقام واتسك الباقي علي." (أم بدر)' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"أبغى ارسلي هذا على الجروبات... هذا رابط جديد للبطلة... حاولي تشجعي الأمهات."',
          '"قولي لها والله قالت لي انك حابه فانا حابه افيدك تاخذين نفس الخصم دياله."',
          'WhatsApp: "🎁 هاي صور الجوائز الجديدة — باقي لكم شخصين فقط للوصول للأيباد ✨"',
          'WhatsApp: "هذا رابط الدعوات الخاص فيكم 🌷 أي شخص يسجل من خلاله ينضاف مباشرة على حسابكم."',
          '"إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت."'
        ],
        items_ar:[
          '"أبغى ارسلي هذا على الجروبات... هذا رابط جديد للبطلة... حاولي تشجعي الأمهات."',
          '"قولي لها والله قالت لي انك حابه فانا حابه افيدك تاخذين نفس الخصم دياله."',
          'واتساب: "🎁 هاي صور الجوائز الجديدة — باقي لكم شخصين فقط للوصول للأيباد ✨"',
          'واتساب: "هذا رابط الدعوات الخاص فيكم 🌷 أي شخص يسجل من خلاله ينضاف مباشرة على حسابكم."',
          '"إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت."'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم ديالى:\n"انتم مشتركين اثنين عن طريقكم صح؟ ايوه واحدة انا متأكدة منهم... ريلام وليلى. ضيلكم شخصين وبتاخذ وتربحوا الايباد... شوفي الهدايا الجديدة... ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال."',
          '🛑 Case 2 — أم علي:\n"هلا بحكي معك انا عشان تاخذي الجوائز... افتحي وروحي على كلمة حسابي... سجل الدعوات. عندك حاليًا شخصين اشتركوا عن طريقك. هلا لو في كمان اثنين عن طريقك بتاخذي 20 حصه مجانيه عن كل واحد وبتاخذي هيك ايباد."',
          '🛑 Case 3 — أم تميم:\n"ألف مبارك اختك أم لميس اللي هي امتيل اشتركت لرتيل... حصلتي انت الحين على 25 حصه لتميم إضافية. بما انك انت الحين شفتي كيف لما رشحتي... انت الحين صرت قربتي على الجوائز الاكبر قربتي على القسائم من جرير قربتي على الايباد."',
          '🛑 Case 4 — أم فاطمة:\n"بدي إياك على الواتساب تبعثي لي أرقام أشخاص مهتمين. 3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          '🛑 Case 5 — أم سلمان:\n"خلاص وافقت قالت خلاص إن شاء الله بس بسجلهم الاثنتين يصير أنا جبت ثلاث اشتراكات.. خلاص كدة أنت خلاص أول ما تسجل تضمنين الآيباد خلاص يوصل لك الآيباد."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم ديالى:\n"انتم مشتركين اثنين عن طريقكم صح؟ ايوه واحدة انا متأكدة منهم... ريلام وليلى. ضيلكم شخصين وبتاخذ وتربحوا الايباد... شوفي الهدايا الجديدة... ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال."',
          '🛑 الحالة 2 — أم علي:\n"هلا بحكي معك انا عشان تاخذي الجوائز... افتحي وروحي على كلمة حسابي... سجل الدعوات. عندك حاليًا شخصين اشتركوا عن طريقك. هلا لو في كمان اثنين عن طريقك بتاخذي 20 حصه مجانيه عن كل واحد وبتاخذي هيك ايباد."',
          '🛑 الحالة 3 — أم تميم:\n"ألف مبارك اختك أم لميس اللي هي امتيل اشتركت لرتيل... حصلتي انت الحين على 25 حصه لتميم إضافية. بما انك انت الحين شفتي كيف لما رشحتي... انت الحين صرت قربتي على الجوائز الاكبر قربتي على القسائم من جرير قربتي على الايباد."',
          '🛑 الحالة 4 — أم فاطمة:\n"بدي إياك على الواتساب تبعثي لي أرقام أشخاص مهتمين. 3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          '🛑 الحالة 5 — أم سلمان:\n"خلاص وافقت قالت خلاص إن شاء الله بس بسجلهم الاثنتين يصير أنا جبت ثلاث اشتراكات.. خلاص كدة أنت خلاص أول ما تسجل تضمنين الآيباد خلاص يوصل لك الآيباد."'
        ]}
    ] },  { id:'inc-iphone', icon:'📲', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'iPhone Incentive', title_ar:'حافز الآيفون',
    color:'#64748B', cl:'rgba(100,116,139,.15)', glow:'rgba(100,116,139,.2)',
    grad:'linear-gradient(135deg,#475569,#1E293B)',
    topics:['Value Perception','Customer Motivation','Engagement Impact','Interest Triggers'],
    topics_ar:['إدراك القيمة','دوافع العميل','تأثير التفاعل','محفزات الاهتمام'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'The iPhone is positioned at step 5 of the reward ladder — the ultimate prize that requires 5 subscriptions. Its role is to prevent customers from stopping after the iPad (step 4) by revealing a bigger goal just above. It is introduced as a progression reward, not a starting offer. Most effective when a customer is already motivated by the iPad and needs a reason to keep going.',
        text_ar:'يُوضع الآيفون في الخطوة 5 من سلّم المكافآت — الجائزة القصوى التي تتطلب 5 اشتراكات. دوره منع العملاء من التوقف بعد الآيباد (الخطوة 4) بالكشف عن هدف أكبر يعلوه مباشرة. يُقدَّم بوصفه مكافأة تقدّم لا عرضاً افتتاحياً. الأكثر فاعلية حين يكون العميل محفوزاً بالآيباد مسبقاً ويحتاج سبباً للاستمرار.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'The iPhone triggers two psychological mechanisms:\n\n(1) REWARD ESCALATION: Having seen the iPad at step 4, the customer naturally wonders "what\'s next?" The iPhone answers that question and extends referral behaviour beyond the first prize win.\n\n(2) STATUS PRIZE: An iPhone is a status symbol. Winning one through referrals means you are "a top referrer" — this appeals to social and competitive personalities.\n\nKey distinction from iPad: the iPhone is not usually the opening offer. It is the "what if I keep going?" answer that a CM drops after the customer has already shown high referral intent.',
        text_ar:'يُفعِّل الآيفون آليتين نفسيتين:\n\n(1) تصاعد المكافأة: بعد رؤية الآيباد في الخطوة 4، يتساءل العميل طبيعياً "ما التالي؟" الآيفون يُجيب على هذا السؤال ويُمدّد سلوك الريفيرال ما بعد الفوز بالجائزة الأولى.\n\n(2) جائزة المكانة: الآيفون رمز مكانة اجتماعية. الفوز به عبر الريفيرال يعني أنك "مرشِّح متميز" — يستهوي الشخصيات الاجتماعية والتنافسية.\n\nالتمييز الجوهري عن الآيباد: الآيفون عادةً ليس العرض الافتتاحي. هو جواب "ماذا لو واصلت؟" الذي يُلقيه الـ CM بعد أن يُظهر العميل نية ريفيرال عالية.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When the customer is at 3-4 referrals and already targeting the iPad',
          'After confirming the iPad milestone: "and if you want to keep going, 5 = iPhone"',
          'With highly motivated social customers who have large networks',
          'When the customer asks "is there anything bigger than the iPad?"',
          'During a partner/commission conversation to show the full reward scale'
        ],
        items_ar:[
          'حين يكون العميل عند 3-4 ريفيرالات ويستهدف الآيباد بالفعل',
          'بعد تأكيد إنجاز الآيباد: "وإذا أردتِ الاستمرار، 5 = آيفون"',
          'مع عملاء اجتماعيين متحمسين يملكون شبكات واسعة',
          'حين يسأل العميل "هل يوجد شيء أكبر من الآيباد؟"',
          'خلال محادثة شريك/عمولة لإظهار سلم المكافآت الكامل'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Already at 2-3 referrals and enthusiastic — will respond to "5 = iPhone"',
          'Has a large social network (teacher, community leader, active WhatsApp group admin)',
          'Mentions the iPad but seems to want "something bigger"',
          'Has previously asked about rewards beyond the current prize tier',
          'High-energy, competitive personality — responds to status-based incentives'
        ],
        items_ar:[
          'بالفعل عند 2-3 ريفيرالات ومتحمس — سيستجيب لـ "5 = آيفون"',
          'يملك شبكة اجتماعية واسعة (معلم، قائد مجتمعي، مشرف جروب واتساب نشط)',
          'يذكر الآيباد لكن يبدو أنه يريد "شيئاً أكبر"',
          'سبق وسأل عن مكافآت تتجاوز الشريحة الحالية من الجوائز',
          'شخصية نشيطة تنافسية — تستجيب للحوافز القائمة على المكانة'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Confirm current referral count ⬅️ Show iPad milestone (4 subscriptions) ⬅️ Transition: "And if you want to keep going..." ⬅️ Reveal iPhone at 5 subscriptions ⬅️ "Some families with large networks have reached this in one month" ⬅️ Create personal discount code or referral link ⬅️ Follow up via WhatsApp with full prize chart',
        text_ar:'تأكيد عدد الريفيرالات الحالي ⬅️ إظهار إنجاز الآيباد (4 اشتراكات) ⬅️ الانتقال: "وإذا أردتِ الاستمرار..." ⬅️ الكشف عن الآيفون عند 5 اشتراكات ⬅️ "بعض الأسر ذات الشبكات الواسعة وصلت إلى هذا في شهر واحد" ⬅️ إنشاء كود خصم شخصي أو رابط ريفيرال ⬅️ متابعة عبر الواتساب بجدول الجوائز الكامل' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Ladder Extension: "شخصين بتاخذ مثلاً آيفون" — after iPad is mentioned at 3 subscriptions (أم فاطمة)',
          'Guarantee Reminder: "الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          'Network Activation: "أي أحد موجود عندك أرسلي له لا تشيلي هم." (أم ياسر/فهد)',
          'Voice Message Prompt: "أرسلي رسالة صوتية للجروبات مع الرابط — الآن بصلح لك كود خصم خاص."'
        ],
        items_ar:[
          'تمديد السلّم: "شخصين بتاخذ مثلاً آيفون" — بعد ذكر الآيباد عند 3 اشتراكات (أم فاطمة)',
          'تذكير الضمان: "الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          'تفعيل الشبكة: "أي أحد موجود عندك أرسلي له لا تشيلي هم." (أم ياسر/فهد)',
          'طلب الرسالة الصوتية: "أرسلي رسالة صوتية للجروبات مع الرابط — الآن بصلح لك كود خصم خاص."'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Prize Ladder Reveal:\n"3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد." (أم فاطمة)\n\nVoice Message Technique:\n"أهم شيء أرسلي رسالة صوتية: يا بنات مساكم الله بالخير اللي تبغى تدخل وتستفيد وتكسب خصم تضغط على الرابط." (أم ياسر/فهد)\n\nTop Referrer Frame:\n"خمس اشتراكات وتفوتي على سحب آيفون." (أم سطام)',
        text_ar:'كشف سلّم الجوائز:\n"3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد." (أم فاطمة)\n\nتقنية الرسالة الصوتية:\n"أهم شيء أرسلي رسالة صوتية: يا بنات مساكم الله بالخير اللي تبغى تدخل وتستفيد وتكسب خصم تضغط على الرابط." (أم ياسر/فهد)\n\nإطار المرشِّح المتميز:\n"خمس اشتراكات وتفوتي على سحب آيفون." (أم سطام)' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"أنا أرسلت في الجروبات كلها بس اللي ما أدري من اللي يدخل على ضمن فهد."\n→ "أهم شيء أرسلي رسالة صوتية... الآن أنا بصلح لك كود خصم خاص حابة كود الخصم يكون باسم أم فهد." (أم ياسر/فهد)\n\n"كثير ما أبغاهم يجون يسجلون في نفس الشهر."\n→ الاستجابة: العميل نفسه أخبر الـ CM أن عنده 3 أشخاص مستعدون — هذه قيمة عالية جداً. (أم سلمان)\n\n"ما عندي ناس زيادة."\n→ "حتى لو شخص أو شخصين فقط ممكن يوصلك للجائزة."',
        text_ar:'"أنا أرسلت في الجروبات كلها بس اللي ما أدري من اللي يدخل على ضمن فهد."\n→ "أهم شيء أرسلي رسالة صوتية... الآن أنا بصلح لك كود خصم خاص حابة كود الخصم يكون باسم أم فهد." (أم ياسر/فهد)\n\n"كثير ما أبغاهم يجون يسجلون في نفس الشهر."\n→ الاستجابة: العميل نفسه أخبر الـ CM أن عنده 3 أشخاص مستعدون — هذه قيمة عالية جداً. (أم سلمان)\n\n"ما عندي ناس زيادة."\n→ "حتى لو شخص أو شخصين فقط ممكن يوصلك للجائزة."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"أبو فارس هذه الحرمة في بالي من زمان خذ رقمها وكلمها وبتسجل."',
          '"الآن أنا بصلح لك كود خصم خاص حابة كود الخصم يكون باسم أم فهد."',
          'WhatsApp: Send the prize chart showing all tiers: sessions → voucher → iPad → iPhone',
          'WhatsApp: "هذا كود الترشيح الخاص فيكم ❤️ أي شخص مهتم ابعثي رقمه مباشرة."',
          '"ما تنسين والله إني حابب إنكم تربحون الآيباد." — keeping personal emotional investment'
        ],
        items_ar:[
          '"أبو فارس هذه الحرمة في بالي من زمان خذ رقمها وكلمها وبتسجل."',
          '"الآن أنا بصلح لك كود خصم خاص حابة كود الخصم يكون باسم أم فهد."',
          'واتساب: أرسل جدول الجوائز يُظهر كل الشرائح: حصص → قسيمة → آيباد → آيفون',
          'واتساب: "هذا كود الترشيح الخاص فيكم ❤️ أي شخص مهتم ابعثي رقمه مباشرة."',
          '"ما تنسين والله إني حابب إنكم تربحون الآيباد." — الحفاظ على الاستثمار العاطفي الشخصي'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case — أم فاطمة (Ladder with iPhone at tier 2):\n"بدي إياك على الواتساب تبعثي لي أرقام أشخاص مهتمين بتعلم اللغة الإنجليزية.. 3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          '🛑 Case — أم سلمان (Customer Self-Reveals High Network):\n"والله العظيم عندي ثلاثة اليوم من صديقاتي بس قلت لهم خلوه شوي أنا ما أبغاهم يجون يسجلون في نفس الشهر.. وعطلتهم شوي ولا أنا عندي كثيرين والله كثيرين يبغون يشتركون." → CM should immediately lock in the commitment and guide the linking process.',
          '📌 KEY INSIGHT: The iPhone works best as a SEQUEL to the iPad, not as the opening pitch. Lead with iPad proximity, close the iPad deal, THEN reveal iPhone as the next challenge.'
        ],
        items_ar:[
          '🛑 الحالة — أم فاطمة (السلّم مع الآيفون في الشريحة 2):\n"بدي إياك على الواتساب تبعثي لي أرقام أشخاص مهتمين بتعلم اللغة الإنجليزية.. 3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          '🛑 الحالة — أم سلمان (العميلة تكشف تلقائياً عن شبكة واسعة):\n"والله العظيم عندي ثلاثة اليوم من صديقاتي بس قلت لهم خلوه شوي أنا ما أبغاهم يجون يسجلون في نفس الشهر.. وعطلتهم شوي ولا أنا عندي كثيرين والله كثيرين يبغون يشتركون." ← على الـ CM أن يُحكم الالتزام فوراً ويُوجّه عملية الربط.',
          '📌 رؤية أساسية: الآيفون يعمل بشكل أفضل كـ "تكملة" للآيباد لا كالطرح الافتتاحي. ابدأ بالقرب من الآيباد، أغلق صفقة الآيباد، ثم اكشف عن الآيفون كالتحدي التالي.'
        ]}
    ] },  { id:'inc-classes', icon:'🎓', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'Show-up Extra Classes', title_ar:'حضور حصص إضافية',
    color:'#7C3AED', cl:'rgba(124,58,237,.15)', glow:'rgba(124,58,237,.2)',
    grad:'linear-gradient(135deg,#7C3AED,#6D28D9)',
    topics:['Academic Motivation','Parent Interest Level','Student Improvement Positioning','Extra Classes Value Perception'],
    topics_ar:['الدافع الأكاديمي','مستوى اهتمام ولي الأمر','طريقة تقديم تحسن الطالب','إدراك قيمة الحصص الإضافية'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Extra/free sessions are the most-used referral incentive because they tie directly to the child\'s academic progress — making the referral feel like a gift to the child, not a favour to the company. Two distinct trigger types: (1) Show-up Trigger: sessions awarded just for the referred person attending a trial class. (2) Subscription/Paid Trigger: sessions awarded only when the referral actually subscribes and pays. Quality filtering is critical — CM must ensure numbers are genuinely interested, not random.',
        text_ar:'الحصص الإضافية/المجانية هي حافز الريفيرال الأكثر استخداماً لأنها ترتبط مباشرة بتقدم الطفل الأكاديمي — مما يجعل الريفيرال يبدو هدية للطفل لا معروفاً للشركة. نوعان مختلفان من المحفزات: (1) محفز الحضور: حصص تُمنح مجرد حضور الشخص المُرشَّح حصة تجريبية. (2) محفز الاشتراك/الدفع: حصص تُمنح فقط حين يشترك الريفيرال ويدفع فعلياً. تصفية الجودة حيوية — يجب على الـ CM التأكد من أن الأرقام مهتمة حقاً لا عشوائية.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Extra sessions work because they bypass the "prize greed" frame and enter the "responsible parent" frame:\n\n(1) CHILD-FIRST MOTIVATION: "Your child gets more sessions" — parent feels they are investing in their child\'s future, not chasing a prize.\n(2) TANGIBLE ACADEMIC VALUE: "20 sessions worth ~800 SAR" — the financial translation makes the reward feel substantial.\n(3) LEVEL COMPLETION URGENCY: "Current balance won\'t finish the level — 2 referrals close the gap" — creates academic FOMO.\n(4) SHOW-UP TRIGGER (lower bar): Even if the referral doesn\'t subscribe, the parent still wins by getting sessions for the trial attendance — lower risk, more willingness.',
        text_ar:'الحصص الإضافية تنجح لأنها تتجاوز إطار "الجشع على الجوائز" وتدخل إطار "الوالد المسؤول":\n\n(1) دافع الطفل أولاً: "طفلك سيحصل على حصص أكثر" — يشعر الوالد أنه يستثمر في مستقبل طفله لا يطارد جائزة.\n(2) القيمة الأكاديمية الملموسة: "20 حصة تساوي ~800 ريال" — الترجمة المالية تجعل المكافأة تبدو ذات ثقل.\n(3) إلحاح إتمام المستوى: "الرصيد الحالي لن يُتم المستوى — ريفيرالان يُغلقان الفجوة" — يخلق خوفاً من الفوات الأكاديمي.\n(4) محفز الحضور (عتبة أدنى): حتى لو لم يشترك الريفيرال، يفوز الوالد بحصول على حصص مقابل الحضور التجريبي — مخاطرة أقل، استعداد أكبر.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Show-up Trigger: Any call where referral is requested — lowest barrier, highest conversion',
          'Subscription Trigger: After a successful referral is confirmed — "your friend subscribed, here\'s your reward"',
          'When the student needs more sessions to complete a level — gap creates urgency',
          'When the parent is price-sensitive and gifts feel less relevant than academic benefits',
          'After a progress update that shows positive momentum — reinforce with "more sessions = faster progress"'
        ],
        items_ar:[
          'محفز الحضور: أي مكالمة يُطلب فيها الريفيرال — أدنى حاجز، أعلى تحويل',
          'محفز الاشتراك: بعد تأكيد ريفيرال ناجح — "صديقتك اشتركت، إليك مكافأتك"',
          'حين يحتاج الطالب حصصاً أكثر لإتمام مستوى — الفجوة تخلق إلحاحاً',
          'حين يكون الوالد حساساً للسعر والهدايا تبدو أقل أهمية من الفوائد الأكاديمية',
          'بعد تحديث تقدم يُظهر زخماً إيجابياً — عزّز بـ "حصص أكثر = تقدم أسرع"'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Parent mentions the child is "running low on sessions" or "will finish soon"',
          'Parent is more interested in the child\'s education than in prizes/gadgets',
          'Parent asks "what do I get if I refer someone?" — direct opening for sessions pitch',
          'Student is in an active level and needs consistency — interruption would harm progress',
          'Parent has already successfully referred someone before — show the reward was real'
        ],
        items_ar:[
          'الوالد يذكر أن الطفل "رصيده على وشك الانتهاء" أو "سينتهي قريباً"',
          'الوالد أكثر اهتماماً بتعليم الطفل من الجوائز/الأجهزة',
          'الوالد يسأل "ماذا أحصل لو رشحت أحداً؟" — فتح مباشر للعرض بالحصص',
          'الطالب في مستوى نشط ويحتاج ثباتاً — الانقطاع سيضر بتقدمه',
          'الوالد سبق وأرشح أحداً بنجاح — أظهِر أن المكافأة كانت حقيقية'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'SHOW-UP TRIGGER:\nService/update call ⬅️ "Do you know someone who might benefit?" ⬅️ "Even just attending a trial session = [X] free sessions for your child" ⬅️ Request 2-3 interested numbers ⬅️ "I\'ll contact them — don\'t let them sign up alone, send me the number" ⬅️ WhatsApp follow-up with referral link\n\nSUBSCRIPTION TRIGGER:\nPrevious referral confirmed ⬅️ "Congratulations — [name] subscribed from your side" ⬅️ "Open the app: Account → Referral Log → Claim reward" ⬅️ Live activation: choose 20 sessions or $60 ⬅️ "Sessions are worth ~800 SAR — take the sessions" ⬅️ "Anyone else in your circle?" ⬅️ WhatsApp link',
        text_ar:'محفز الحضور:\nمكالمة خدمة/تحديث ⬅️ "هل تعرفين أحداً قد يستفيد؟" ⬅️ "حتى مجرد حضور حصة تجريبية = [X] حصص مجانية لطفلك" ⬅️ طلب 2-3 أرقام مهتمة ⬅️ "سأتواصل معهم — لا تتركيهم يسجلون بمفردهم، أرسلي الرقم" ⬅️ متابعة واتساب برابط الريفيرال\n\nمحفز الاشتراك:\nتأكيد ريفيرال سابق ⬅️ "تهانينا — [الاسم] اشترك من طرفك" ⬅️ "افتحي التطبيق: حسابي → سجل الدعوات → المطالبة بالمكافأة" ⬅️ تفعيل مباشر: اختار 20 حصة أو 60 دولار ⬅️ "الحصص تساوي ~800 ريال — خذي الحصص" ⬅️ "هل يوجد أحد آخر في دائرتك؟" ⬅️ رابط الواتساب' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Trial Attendance Reward: "بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا — بمجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس." (أم عباس)',
          'Show-up as Low Bar: "أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية." (أم عباس)',
          'Value Translation: "ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي)',
          'Chain Motivation: "بما انك انت الحين شفتي كيف لما رشحتي ما كنت متوقعه انه حدا يدخل." (أم تميم)',
          'Level Gap: "كل اشتراك بتعرفيه بـ 20 حصة مجانية." — "إذا أربعة أشخاص فقط اشتركوا بتحصلي على آيباد." (أم سارة)'
        ],
        items_ar:[
          'مكافأة الحضور التجريبي: "بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا — بمجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس." (أم عباس)',
          'الحضور كعتبة منخفضة: "أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية." (أم عباس)',
          'ترجمة القيمة: "ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي)',
          'دافع التسلسل: "بما انك انت الحين شفتي كيف لما رشحتي ما كنت متوقعه انه حدا يدخل." (أم تميم)',
          'فجوة المستوى: "كل اشتراك بتعرفيه بـ 20 حصة مجانية." — "إذا أربعة أشخاص فقط اشتركوا بتحصلي على آيباد." (أم سارة)'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Show-up Opening:\n"بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا بالمنصة عادي — بمجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس. أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية." (أم عباس)\n\nSubscription Reward Live:\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه. روحي على حسابي. روحي على سجل الدعوات. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي ومحمد)\n\nLevel Gap Urgency:\n"كيان تحتاج تأسيس أقوى عشان هيك رجعنا للمستوى الأول. والليفل كامل يحتاج 144 حصة. فإذا عندك أي أشخاص مهتمين ابعثيلي أرقامهم حتى كيان تستفيد بحصص إضافية." (أم كيان)',
        text_ar:'افتتاح الحضور:\n"بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا بالمنصة عادي — بمجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس. أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية." (أم عباس)\n\nمكافأة الاشتراك المباشرة:\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه. روحي على حسابي. روحي على سجل الدعوات. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي ومحمد)\n\nإلحاح فجوة المستوى:\n"كيان تحتاج تأسيس أقوى عشان هيك رجعنا للمستوى الأول. والليفل كامل يحتاج 144 حصة. فإذا عندك أي أشخاص مهتمين ابعثيلي أرقامهم حتى كيان تستفيد بحصص إضافية." (أم كيان)' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"زادني 20 حصة هو لأن في ولد من طرفنا سجل... ولد عمي."\n→ "ليش أم محمد مش عايزة تستفيدي بالـ 20. أنا برجع أكلم حتى عمة الولد اللي اشتركت عن طريقنا." (أم محمد)\n\n"انت اجيتي عن طريق حدا صح?"\n→ "هي صديقتك بتكون اخذت 20 حصه مجانيه لما انت اشتركتي. فالموضوع كثير حلو وبدي اياك تكوني شاطره زي صاحبيتك تشوفي لي اشخاص ممكن يشتركوا." (أم محمد وعرفات)\n\n"بحاول أطلع لك أرقام."\n→ "أي رقم مهتم يكفي والباقي علينا."',
        text_ar:'"زادني 20 حصة هو لأن في ولد من طرفنا سجل... ولد عمي."\n→ "ليش أم محمد مش عايزة تستفيدي بالـ 20. أنا برجع أكلم حتى عمة الولد اللي اشتركت عن طريقنا." (أم محمد)\n\n"انت اجيتي عن طريق حدا صح؟"\n→ "هي صديقتك بتكون اخذت 20 حصه مجانيه لما انت اشتركتي. فالموضوع كثير حلو وبدي اياك تكوني شاطره زي صاحبيتك تشوفي لي اشخاص ممكن يشتركوا." (أم محمد وعرفات)\n\n"بحاول أطلع لك أرقام."\n→ "أي رقم مهتم يكفي والباقي علينا."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"رح ابعث لك رابط لمحمد ورح ابعث لك رابط لعرفات. هذا الرابط بس تدخلي بتسجلي عليه رقم رقم عشان ينزل على اسمك."',
          '"أم غنى وفراس دول قرايبكم صح؟.. لو اشتركوا برضه بينزل لك 40 درس أو 120 دولار."',
          'WhatsApp: "🎁 أي اشتراك جديد = حصص إضافية تساعد الطالب يتطور أسرع."',
          'Quality Filter: "لازم يكون شخص فعلاً مهتم حتى تستفيدوا كامل الاستفادة."',
          'Competition Month: "الشهر ده لو أنت رشحتي ثلاث أشخاص والثلاثة أوريدي حضروا الحصة التجريبية وواحد بس منهم اشترك أنت بتحصلي 30 حصة مجاناً." (أم مهنا)'
        ],
        items_ar:[
          '"رح ابعث لك رابط لمحمد ورح ابعث لك رابط لعرفات. هذا الرابط بس تدخلي بتسجلي عليه رقم رقم عشان ينزل على اسمك."',
          '"أم غنى وفراس دول قرايبكم صح؟.. لو اشتركوا برضه بينزل لك 40 درس أو 120 دولار."',
          'واتساب: "🎁 أي اشتراك جديد = حصص إضافية تساعد الطالب يتطور أسرع."',
          'تصفية الجودة: "لازم يكون شخص فعلاً مهتم حتى تستفيدوا كامل الاستفادة."',
          'شهر المسابقة: "الشهر ده لو أنت رشحتي ثلاث أشخاص والثلاثة أوريدي حضروا الحصة التجريبية وواحد بس منهم اشترك أنت بتحصلي 30 حصة مجاناً." (أم مهنا)'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم تميم (Subscription Trigger — Claim Live):\n"ألف مبارك اختك أم لميس اللي هي امتيل اشتركت لرتيل... حصلتي انت الحين على 25 حصه لتميم إضافية... اكبسي اختاري يا الحصص يا 60 دولار لكن صراحه فضل قصص افضل لتميم."',
          '🛑 Case 2 — أم علي ومحمد (Live Activation Walkthrough):\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك.. روحي على حسابي.. روحي على سجل الدعوات.. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه.. بخيرك بين فلوس او 20 حصه.. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."',
          '🛑 Case 3 — أم عباس (Show-up Trigger — Lowest Bar):\n"بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا بالمنصة عادي بدي هيك ترشحي ناس عادي بس مجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس.. أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية."',
          '🛑 Case 4 — أم مهنا (Competition Month — Tiered Bonus):\n"المسابقة بتاعة الترشيحات.. الشهر ده لو أنت رشحتي ثلاث أشخاص لحد يوم 20 الشهر والثلاثة أوريدي حضروا الحصة التجريبية وواحد بس منهم اشترك أنت بتحصلي 30 حصة مجاناً على حساب الأولاد."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم تميم (محفز الاشتراك — مطالبة مباشرة):\n"ألف مبارك اختك أم لميس اللي هي امتيل اشتركت لرتيل... حصلتي انت الحين على 25 حصه لتميم إضافية... اكبسي اختاري يا الحصص يا 60 دولار لكن صراحه فضل قصص افضل لتميم."',
          '🛑 الحالة 2 — أم علي ومحمد (عرض التفعيل المباشر):\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك.. روحي على حسابي.. روحي على سجل الدعوات.. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه.. بخيرك بين فلوس او 20 حصه.. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."',
          '🛑 الحالة 3 — أم عباس (محفز الحضور — أدنى عتبة):\n"بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا بالمنصة عادي بدي هيك ترشحي ناس عادي بس مجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس.. أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية."',
          '🛑 الحالة 4 — أم مهنا (شهر المسابقة — مكافأة متدرجة):\n"المسابقة بتاعة الترشيحات.. الشهر ده لو أنت رشحتي ثلاث أشخاص لحد يوم 20 الشهر والثلاثة أوريدي حضروا الحصة التجريبية وواحد بس منهم اشترك أنت بتحصلي 30 حصة مجاناً على حساب الأولاد."'
        ]}
    ] },  { id:'inc-ebooks', icon:'📖', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'E-books Incentive', title_ar:'حافز الكتب الإلكترونية',
    color:'#0891B2', cl:'rgba(8,145,178,.15)', glow:'rgba(8,145,178,.2)',
    grad:'linear-gradient(135deg,#0891B2,#0E7490)',
    topics:['Educational Value Positioning','Parent Interest','Learning Support Indicators','Student Benefit Presentation'],
    topics_ar:['طريقة تقديم القيمة التعليمية','اهتمام ولي الأمر','مؤشرات دعم التعلم','عرض فوائد الطالب'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'E-books and educational materials are a supporting incentive — rarely the sole referral driver, but highly effective as an add-on for academically-motivated parents. They are mentioned alongside extra sessions in the academic support approach: "If you refer people, you get free sessions AND educational books for the student." The e-book positions the platform as a comprehensive educational partner, not just a tutoring service.',
        text_ar:'الكتب الإلكترونية والمواد التعليمية حافز داعم — نادراً ما تكون المحرك الوحيد للريفيرال، لكنها فعّالة جداً كإضافة للآباء ذوي التوجه الأكاديمي. تُذكر إلى جانب الحصص الإضافية في نهج الدعم الأكاديمي: "لو رشحتِ ناساً بتحصلي على حصص مجانية وكتب تعليمية للطالب." يُرسّخ الكتاب الإلكتروني صورة المنصة بوصفها شريكاً تعليمياً شاملاً لا مجرد خدمة دروس.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'E-books work best with parents who:\n(1) PRIORITISE CURRICULUM: They want structured learning, not just conversation practice. Books signal academic seriousness.\n(2) FEEL THE PLATFORM IS "COMPLETE": Physical/digital books complement online sessions and make the education feel holistic.\n(3) WANT TO SEE RESULTS: Books are tangible — the parent can look at them, confirm they exist, and measure progress. Unlike sessions (which happen then disappear), books stay visible.\n\nBest used alongside sessions as a bundle: "free sessions + educational books" — never as the sole incentive.',
        text_ar:'تنجح الكتب الإلكترونية بشكل أفضل مع الآباء الذين:\n(1) يُولون المنهج أولوية: يريدون تعلماً منظماً لا مجرد تدريب على المحادثة. الكتب تُشير إلى الجدية الأكاديمية.\n(2) يشعرون أن المنصة "متكاملة": الكتب الرقمية/الورقية تُكمّل الحصص الإلكترونية وتجعل التعليم يبدو شاملاً.\n(3) يريدون رؤية نتائج: الكتب ملموسة — يمكن للوالد النظر إليها وتأكيد وجودها وقياس التقدم. خلافاً للحصص (التي تحدث ثم تختفي)، تبقى الكتب مرئية.\n\nيُستخدم بشكل أفضل مع الحصص كحزمة: "حصص مجانية + كتب تعليمية" — لا كحافز وحيد.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'During academic support calls when discussing the student\'s curriculum or study materials',
          'As a bundle with extra sessions — "sessions AND books" increases perceived value',
          'When the parent asks "what resources does my child get?"',
          'With parents who are teachers, educators, or curriculum-focused',
          'When the student is preparing for an exam (IELTS/school) — books feel directly relevant'
        ],
        items_ar:[
          'خلال مكالمات الدعم الأكاديمي عند مناقشة منهج الطالب أو مواد الدراسة',
          'كحزمة مع حصص إضافية — "حصص وكتب" يزيد القيمة المُدرَكة',
          'حين يسأل الوالد "ما الموارد التي سيحصل عليها طفلي؟"',
          'مع آباء معلمين أو تربويين أو مركّزين على المنهج',
          'حين يستعد الطالب لامتحان (IELTS/مدرسة) — الكتب تبدو ذات صلة مباشرة'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Parent asks about curriculum, materials, or what the child studies in sessions',
          'Parent is a teacher or works in education',
          'Child is exam-focused (IELTS, school English, university prep)',
          'Parent compares the platform to school — values structured curriculum',
          'Parent mentions the child reads or studies independently at home'
        ],
        items_ar:[
          'الوالد يسأل عن المنهج أو المواد أو ما يدرسه الطفل في الحصص',
          'الوالد معلم أو يعمل في مجال التربية',
          'الطفل مركّز على امتحان (IELTS، إنجليزية مدرسية، تحضير جامعي)',
          'الوالد يقارن المنصة بالمدرسة — يُقدّر المنهج المنظم',
          'الوالد يذكر أن الطفل يقرأ أو يدرس باستقلالية في المنزل'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Academic support discussion ⬅️ "We also have educational materials that complement the sessions" ⬅️ Introduce e-books as part of the referral reward bundle ⬅️ "If you refer people, you get free sessions AND the educational books" ⬅️ Request interested numbers ⬅️ "I\'ll send you the details and the materials on WhatsApp"',
        text_ar:'نقاش الدعم الأكاديمي ⬅️ "لدينا أيضاً مواد تعليمية تُكمّل الحصص" ⬅️ تقديم الكتب الإلكترونية كجزء من حزمة مكافأة الريفيرال ⬅️ "لو رشحتِ ناساً بتحصلي على حصص مجانية وكتب تعليمية" ⬅️ طلب أرقام مهتمة ⬅️ "سأرسل لك التفاصيل والمواد على الواتساب"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Bundle Offer: "إذا رشحتي أشخاص بتاخدي حصص مجانية وكتب تعليمية." (أم نعيمة وأمل وخديجة)',
          'Assessment Centre Link: "الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية." (أم نعيمة)',
          'Comprehensive Package Frame: E-books + sessions + assessment = full academic partnership'
        ],
        items_ar:[
          'عرض الحزمة: "إذا رشحتي أشخاص بتاخدي حصص مجانية وكتب تعليمية." (أم نعيمة وأمل وخديجة)',
          'رابط مركز التقييم: "الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية." (أم نعيمة)',
          'إطار الحزمة الشاملة: كتب إلكترونية + حصص + تقييم = شراكة أكاديمية متكاملة'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Bundle with Sessions:\n"إذا عندك أي أرقام أرسليهم وأنا ما راح أتأخر علي حتى نفيد سارة حتى نكثر من حصصها لأن كل اشتراك بتعرفيه بـ 20 حصة مجانية."\n\nAssessment + Books:\n"الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية. إذا عندك أي أرقام أرسليهم وأنا أضيفهم لحساب نعيمة."',
        text_ar:'حزمة مع الحصص:\n"إذا عندك أي أرقام أرسليهم وأنا ما راح أتأخر علي حتى نفيد سارة حتى نكثر من حصصها لأن كل اشتراك بتعرفيه بـ 20 حصة مجانية."\n\nالتقييم + الكتب:\n"الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية. إذا عندك أي أرقام أرسليهم وأنا أضيفهم لحساب نعيمة."' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"يكفينا الحصص ما محتاجين كتب."\n→ "عادي — الحصص هي الأساس. الكتب بس مرجع إضافي للطالب يرجع إليه بين الحصص."\n\n"ما بعرف إذا الناس مهتمة."\n→ "حتى لو شخص واحد فقط مهتم ممكن يستفيد كثير من التجربة."',
        text_ar:'اعتراض: "يكفينا الحصص ما محتاجين كتب."\n→ "عادي — الحصص هي الأساس. الكتب بس مرجع إضافي للطالب يرجع إليه بين الحصص."\n\nاعتراض: "ما بعرف إذا الناس مهتمة."\n→ "حتى لو شخص واحد فقط مهتم ممكن يستفيد كثير من التجربة."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always bundle e-books with sessions — "حصص مجانية وكتب تعليمية" sounds more valuable than either alone',
          'Mention assessment centre alongside books — shows the platform has a complete academic ecosystem',
          'WhatsApp: Send the e-book sample or assessment centre screenshot to make it tangible',
          'Use with academically-motivated parents as the primary hook — then mention iPad as secondary'
        ],
        items_ar:[
          'دائماً ضمّ الكتب الإلكترونية مع الحصص — "حصص مجانية وكتب تعليمية" تبدو أكثر قيمة من كل منهما منفرداً',
          'اذكر مركز التقييم إلى جانب الكتب — يُظهر أن المنصة تمتلك منظومة أكاديمية متكاملة',
          'واتساب: أرسل نموذج كتاب إلكتروني أو لقطة شاشة لمركز التقييم لجعله ملموساً',
          'استخدم مع الآباء ذوي الدافع الأكاديمي كمحور رئيسي — ثم اذكر الآيباد ثانوياً'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case — أم نعيمة وأمل وخديجة (Academic Support + Books Bundle):\n"الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية. إذا عندك أي أرقام أرسليهم وأنا أضيفهم لحساب نعيمة."',
          '📌 KEY INSIGHT: E-books are most effective as a bundle upgrade — they make the referral reward feel "complete" rather than purely financial. For academically serious parents, books signal that the platform takes education seriously — which strengthens trust and referral confidence.',
          '📌 USAGE NOTE: Do not lead with e-books as the sole incentive. Always pair with sessions (primary) + books (secondary) for maximum perceived value.'
        ],
        items_ar:[
          '🛑 الحالة — أم نعيمة وأمل وخديجة (دعم أكاديمي + حزمة كتب):\n"الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية. إذا عندك أي أرقام أرسليهم وأنا أضيفهم لحساب نعيمة."',
          '📌 رؤية أساسية: الكتب الإلكترونية الأكثر فاعلية كترقية حزمة — تجعل مكافأة الريفيرال تبدو "مكتملة" لا مالية بحتة. بالنسبة للآباء الجادين أكاديمياً، تُشير الكتب إلى أن المنصة تأخذ التعليم بجدية — مما يُعزز الثقة وثقة الريفيرال.',
          '📌 ملاحظة الاستخدام: لا تبدأ بالكتب الإلكترونية كحافز وحيد. دائماً اجمع مع الحصص (أساسي) + الكتب (ثانوي) لأقصى قيمة مُدرَكة.'
        ]}
    ] },  { id:'inc-vouchers', icon:'🛍️', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'Shopping Vouchers', title_ar:'قسائم التسوق',
    color:'#DB2777', cl:'rgba(219,39,119,.15)', glow:'rgba(219,39,119,.2)',
    grad:'linear-gradient(135deg,#DB2777,#BE185D)',
    topics:['Family Benefit Positioning','Flexibility Appeal','Customer Interest Level','Reward Perception'],
    topics_ar:['طريقة تقديم فائدة الأسرة','جاذبية المرونة','مستوى اهتمام العميل','إدراك المكافأة'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Shopping vouchers (primarily Jarir Bookstore, plus PlayStation and Umrah vouchers) sit at the mid-tier of the reward ladder — typically at 2-3 subscriptions. They are positioned between free sessions (low tier) and iPad/iPhone (high tier). Their flexibility (choose between voucher types) appeals to parents who don\'t necessarily want a tech device but value practical shopping credit for their families.',
        text_ar:'قسائم التسوق (أساساً مكتبة جرير، بالإضافة إلى قسائم بلاي ستيشن والعمرة) تقع في المنتصف من سلّم المكافآت — عادةً عند 2-3 اشتراكات. تُوضع بين الحصص المجانية (الشريحة المنخفضة) والآيباد/الآيفون (الشريحة العليا). مرونتها (الاختيار بين أنواع القسائم) تستهوي الآباء الذين لا يريدون بالضرورة جهازاً تقنياً لكنهم يُقدّرون رصيد تسوق عملياً لعائلاتهم.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Vouchers trigger different motivation from devices:\n\n(1) PRACTICAL UTILITY: "Jarir voucher = I can buy books, supplies, or gifts for my family" — more immediately useful than an iPad for some parents.\n(2) CHOICE POWER: "You can choose: Jarir voucher OR PlayStation OR iPad" — giving the customer a choice creates ownership of the reward.\n(3) HALAL/MODEST ALTERNATIVE: For parents who feel uncomfortable competing for "luxury" items, a 400 SAR Jarir voucher feels more appropriate and attainable.\n(4) UMRAH FRAMING: The Umrah voucher (1600 SAR value at 4 subscriptions) is a deeply emotional incentive for Muslim parents — positions the referral as a spiritually meaningful act.',
        text_ar:'القسائم تُفعِّل دوافع مختلفة عن الأجهزة:\n\n(1) الفائدة العملية: "قسيمة جرير = أقدر أشتري كتب أو لوازم أو هدايا لعائلتي" — أكثر فائدة فورية من الآيباد لبعض الآباء.\n(2) سلطة الاختيار: "تقدرين تختارين: قسيمة جرير أو بلاي ستيشن أو آيباد" — إعطاء العميل خياراً يخلق ملكية للمكافأة.\n(3) البديل المناسب/المتواضع: للآباء الذين يشعرون بعدم ارتياح من التنافس على سلع "فاخرة"، قسيمة جرير بـ 400 ريال تبدو أكثر ملاءمة وقابلية للتحقيق.\n(4) إطار العمرة: قسيمة العمرة (قيمة 1600 ريال عند 4 اشتراكات) حافز عاطفي عميق للآباء المسلمين — يُرسّخ الريفيرال بوصفه عملاً ذا معنى روحي.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When the customer has 1-2 referrals and the iPad seems far away — Jarir voucher is the next milestone',
          'When showing the prize ladder — vouchers appear at step 2-3 as intermediate wins',
          'With parents who explicitly say they don\'t need a device but would value shopping credit',
          'When the Umrah voucher resonates — Islamic holidays or when family pilgrimage is mentioned',
          'As an alternative offer: "You can give the voucher to someone else who might register"'
        ],
        items_ar:[
          'حين لدى العميل 1-2 ريفيرالات والآيباد يبدو بعيداً — قسيمة جرير هي الإنجاز التالي',
          'عند عرض سلّم الجوائز — القسائم تظهر في الخطوة 2-3 كمكاسب متوسطة',
          'مع آباء يقولون صراحةً أنهم لا يحتاجون جهازاً لكن يُقدّرون رصيد التسوق',
          'حين تُحدث قسيمة العمرة صدىً — مناسبات إسلامية أو حين يُذكر الحج العائلي',
          'كعرض بديل: "تقدرين تعطين القسيمة لأحد آخر قد يُسجّل"'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Has 1-2 existing referrals — near the voucher milestone',
          'Mentions books, school supplies, or family shopping needs',
          'Parent is not excited by tech devices — responds better to practical rewards',
          'Parent is spiritually motivated — Umrah voucher creates strong emotional resonance',
          'Parent asks "can I give the reward to someone else?" — vouchers can be gifted'
        ],
        items_ar:[
          'لديه 1-2 ريفيرالات — قريب من إنجاز القسيمة',
          'يذكر الكتب أو اللوازم المدرسية أو احتياجات التسوق الأسرية',
          'الوالد غير متحمس للأجهزة التقنية — يستجيب بشكل أفضل للمكافآت العملية',
          'الوالد متحفّز روحياً — قسيمة العمرة تخلق صدىً عاطفياً قوياً',
          'الوالد يسأل "هل أقدر أعطي المكافأة لشخص ثاني؟" — القسائم قابلة للإهداء'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Open prize ladder ⬅️ Show current referral count ⬅️ "You\'re one referral away from the Jarir voucher" ⬅️ Show options: "3 subscriptions = 400 SAR Jarir OR PlayStation subscription OR..." ⬅️ For 4 subscriptions: "iPad OR 1600 SAR Umrah voucher" ⬅️ "Which would you prefer?" ⬅️ Request numbers ⬅️ Send prize chart via WhatsApp',
        text_ar:'فتح سلّم الجوائز ⬅️ إظهار عدد الريفيرالات الحالي ⬅️ "أنتِ ريفيرال واحد بعيد عن قسيمة جرير" ⬅️ عرض الخيارات: "3 اشتراكات = 400 ريال جرير أو اشتراك بلاي ستيشن أو..." ⬅️ لـ 4 اشتراكات: "آيباد أو قسيمة عمرة بقيمة 1600 ريال" ⬅️ "أيٌّ منها تفضّلين؟" ⬅️ طلب أرقام ⬅️ إرسال جدول الجوائز عبر الواتساب' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Ladder at 3 Subscriptions: "ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن." (أم ديالى)',
          'Ladder at 4 Subscriptions: "أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)',
          'Voucher as Gift: "إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)',
          'Balance Gap + Voucher: "تطلعي كمان 25 حصة عشان يكمل ليفل... تطلعي كمان اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري." (أم بدر)'
        ],
        items_ar:[
          'السلّم عند 3 اشتراكات: "ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن." (أم ديالى)',
          'السلّم عند 4 اشتراكات: "أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)',
          'القسيمة كهدية: "إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)',
          'فجوة الرصيد + القسيمة: "تطلعي كمان 25 حصة عشان يكمل ليفل... تطلعي كمان اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري." (أم بدر)'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Voucher Ladder Reveal:\n"ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)\n\nVoucher as Referral Tool:\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)\n\nBalance Gap + Voucher:\n"في الرقم في رقم لسه مش محكي معه فبعطي لك كمان أرقام — إذا شخصين بيطلع لك هالمرة عاملين 25 حصة طبعاً وغير 25 حصة بيطلع له اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري." (أم بدر)',
        text_ar:'كشف سلّم القسائم:\n"ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)\n\nالقسيمة كأداة ريفيرال:\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)\n\nفجوة الرصيد + القسيمة:\n"في الرقم في رقم لسه مش محكي معه فبعطي لك كمان أرقام — إذا شخصين بيطلع لك هالمرة عاملين 25 حصة طبعاً وغير 25 حصة بيطلع له اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري." (أم بدر)' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"ما أحتاج جرير."\n→ "عادي، في كمان خيار بلايستيشن أو إذا وصلتِ لـ 4 اشتراكات في آيباد أو قسيمة عمرة."\n\n"ما أحب أكون كأني أبيع."\n→ "مو بيع — الخصم اللي يجيهم من طرفك هو هدية. أنت بتقدمي لهم ميزة مو بتبيعين."',
        text_ar:'اعتراض: "ما أحتاج جرير."\n→ "عادي، في كمان خيار بلايستيشن أو إذا وصلتِ لـ 4 اشتراكات في آيباد أو قسيمة عمرة."\n\nاعتراض: "ما أحب أكون كأني أبيع."\n→ "مو بيع — الخصم اللي يجيهم من طرفك هو هدية. أنت بتقدمي لهم ميزة مو بتبيعين."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always present vouchers as CHOICES: "you can choose between Jarir / PlayStation / iPad"',
          'Connect Umrah voucher to Islamic values when culturally appropriate — emotional resonance is very high',
          'Voucher as convertible gift: "you can give it to someone who wants to subscribe" — turns reward into a referral tool itself',
          'WhatsApp: Send prize chart showing all tiers clearly with the Jarir/PlayStation/Umrah options visible',
          '"باقي اشتراك واحد وتحصلين على قسيمة جرير — ما عندك أحد في بالك؟"'
        ],
        items_ar:[
          'دائماً قدّم القسائم كخيارات: "تقدرين تختارين بين جرير / بلاي ستيشن / آيباد"',
          'اربط قسيمة العمرة بالقيم الإسلامية حين يكون ذلك مناسباً ثقافياً — الصدى العاطفي عالٍ جداً',
          'القسيمة كهدية قابلة للتحويل: "تقدرين تعطينها لأحد يريد الاشتراك" — تحوّل المكافأة إلى أداة ريفيرال بحد ذاتها',
          'واتساب: أرسل جدول الجوائز يُظهر كل الشرائح بوضوح مع خيارات جرير/بلاي ستيشن/العمرة مرئية',
          '"باقي اشتراك واحد وتحصلين على قسيمة جرير — ما عندك أحد في بالك؟"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم ديالى (Full Ladder including Jarir + Umrah):\n"ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال."',
          '🛑 Case 2 — أم بدر (Voucher + Sessions Bundle):\n"في الرقم في رقم لسه مش محكي معه فبعطي لك كمان أرقام ليش الناس يشتركون ما شاء الله عليك في عندك ناس تشت عشان في إذا شخصين بيطلع لك هالمرة عاملين 25 حصة طبعاً وغير 25 حصة بيطلع له اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري."',
          '🛑 Case 3 — يزن × أبو محمد (Voucher as Referral Gateway):\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل. تأخذ خصم على الليفل اللي بعده."',
          '📌 KEY INSIGHT: The Umrah voucher should be positioned as the EMOTIONAL PEAK of the prize ladder for Muslim parents. It creates meaning beyond financial reward — positioning the referral as an act of generosity that earns a spiritual journey.'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم ديالى (السلّم الكامل بما فيه جرير + العمرة):\n"ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال."',
          '🛑 الحالة 2 — أم بدر (حزمة القسيمة + الحصص):\n"في الرقم في رقم لسه مش محكي معه فبعطي لك كمان أرقام ليش الناس يشتركون ما شاء الله عليك في عندك ناس تشت عشان في إذا شخصين بيطلع لك هالمرة عاملين 25 حصة طبعاً وغير 25 حصة بيطلع له اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري."',
          '🛑 الحالة 3 — يزن × أبو محمد (القسيمة كبوابة ريفيرال):\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل. تأخذ خصم على الليفل اللي بعده."',
          '📌 رؤية أساسية: يجب تقديم قسيمة العمرة بوصفها الذروة العاطفية لسلّم الجوائز للآباء المسلمين. تُنشئ معنى يتخطى المكافأة المالية — يُرسّخ الريفيرال بوصفه عمل كرم يكسب رحلة روحية.'
        ]}
    ] },  { id:'inc-cashback', icon:'💰', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'Cashback Incentive', title_ar:'حافز الاسترداد النقدي',
    color:'#16A34A', cl:'rgba(22,163,74,.15)', glow:'rgba(22,163,74,.2)',
    grad:'linear-gradient(135deg,#16A34A,#15803D)',
    topics:['Package Refund Positioning','Financial Support Positioning','Cashback Motivation','Customer Financial Concerns','Savings Perception'],
    topics_ar:['طريقة تقديم استرداد الباقة','طريقة تقديم الدعم المالي','دوافع الاسترداد النقدي','مخاوف العميل المالية','إدراك التوفير'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Cashback converts the referral from a social favour into a financial decision. By framing each referral as "$60 or 20 sessions entering your account," the CM makes the value immediate and calculable. Cashback is the primary incentive for price-sensitive customers, customers near the end of their package, and customers who already asked "what do I get?" rather than responding to emotional appeals.',
        text_ar:'يُحوّل الاسترداد النقدي الريفيرال من معروف اجتماعي إلى قرار مالي. بتأطير كل ريفيرال بـ "60 دولار أو 20 حصة تدخل حسابك"، يجعل الـ CM القيمة فورية وقابلة للحساب. الاسترداد النقدي هو الحافز الأساسي للعملاء الحساسين للسعر، والعملاء قرب نهاية باقتهم، والعملاء الذين سبق وسألوا "ماذا سأستفيد؟" بدلاً من الاستجابة للنداءات العاطفية.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Cashback works on four psychological mechanisms:\n\n(1) IMMEDIATE GRATIFICATION: Cash feels real and present — unlike a future iPad, $60 is tangible now.\n(2) COST OFFSET: "Recover part of what you paid" — reframes the subscription cost as partially refundable through action.\n(3) PENDING EARNINGS ACTIVATION: "You have $60 in your account waiting — just tap to withdraw" — creates urgency around unclaimed money.\n(4) FINANCIAL URGENCY HOOK: "This is the last month the prizes are at full value" — time pressure amplifies cashback motivation for near-end-of-subscription customers.',
        text_ar:'يعمل الاسترداد النقدي عبر أربع آليات نفسية:\n\n(1) الإشباع الفوري: المال يبدو حقيقياً وحاضراً — خلافاً لآيباد مستقبلي، الـ 60 دولار ملموسة الآن.\n(2) تعويض التكلفة: "استرجعي جزءاً مما دفعتِه" — يُعيد تأطير تكلفة الاشتراك بوصفها قابلة للاسترداد جزئياً عبر الفعل.\n(3) تفعيل أرباح معلقة: "لديك 60 دولار في حسابك تنتظر — فقط اضغطي لسحبها" — يخلق إلحاحاً حول المال غير المطالَب به.\n(4) خطاف الإلحاح المالي: "هذا آخر شهر الجوائز بقيمتها الكاملة" — الضغط الزمني يُضخّم دافع الاسترداد النقدي للعملاء قرب نهاية الاشتراك.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When the customer asks "what do I get if I refer someone?" — cashback is the clearest answer',
          'When the customer mentions financial pressure or hesitation about renewal',
          'When unclaimed cashback rewards are pending in the referral log',
          'For near-end-of-subscription customers — "last month" urgency amplifies the offer',
          'During upgrade calls — cashback reframes the higher cost as partially recoverable',
          'When the customer has already referred someone and hasn\'t claimed their reward'
        ],
        items_ar:[
          'حين يسأل العميل "ماذا أستفيد لو رشحت أحداً؟" — الاسترداد النقدي هو الجواب الأوضح',
          'حين يذكر العميل ضغطاً مالياً أو تردداً حول التجديد',
          'حين توجد مكافآت استرداد نقدي غير مُطالَب بها في سجل الريفيرال',
          'للعملاء قرب نهاية الاشتراك — إلحاح "آخر شهر" يُضخّم العرض',
          'خلال مكالمات الترقية — الاسترداد النقدي يُعيد تأطير التكلفة الأعلى بوصفها قابلة للاسترداد جزئياً',
          'حين سبق للعميل إحالة أحد ولم يطالب بمكافأته'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Directly asks about financial rewards vs. sessions/prizes',
          'Mentions budget pressure, expensive renewal, or difficulty affording continuation',
          'Has unclaimed cashback in their referral log',
          'Has 1-3 existing referrals and has not yet claimed rewards',
          'Responds more to numbers ($60, 230 SAR) than to emotional or status-based incentives'
        ],
        items_ar:[
          'يسأل مباشرة عن المكافآت المالية مقابل الحصص/الجوائز',
          'يذكر ضغطاً على الميزانية أو تجديداً مكلفاً أو صعوبة الاستمرار',
          'لديه استرداد نقدي غير مُطالَب به في سجل الريفيرال',
          'لديه 1-3 ريفيرالات ولم يطالب بالمكافآت بعد',
          'يستجيب أكثر للأرقام (60 دولار، 230 ريال) من الحوافز العاطفية أو القائمة على المكانة'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Service call or financial hesitation emerges ⬅️ "By the way, you have unclaimed rewards..." / "Each referral gives you $60 or 20 sessions" ⬅️ Open referral log together: Account → Referral Log → Earnings ⬅️ Show pending amount ⬅️ Choice: cash or sessions ⬅️ "Take sessions — they\'re worth ~800 SAR, more than the cash" (recommended) ⬅️ "Now, who else in your circle might benefit?" ⬅️ Request numbers ⬅️ WhatsApp follow-up',
        text_ar:'ظهور مكالمة خدمة أو تردد مالي ⬅️ "بالمناسبة، لديك مكافآت غير مُطالَب بها..." / "كل ريفيرال يمنحك 60 دولار أو 20 حصة" ⬅️ فتح سجل الريفيرال معاً: حسابي → سجل الدعوات → أرباحي ⬅️ إظهار المبلغ المعلق ⬅️ الاختيار: نقداً أو حصصاً ⬅️ "خذي الحصص — تساوي ~800 ريال، أكثر من النقد" (موصى به) ⬅️ "الآن، من آخر في دائرتك قد يستفيد؟" ⬅️ طلب أرقام ⬅️ متابعة الواتساب' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Unclaimed Reward: "بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات — كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي." (أم مها وبندر)',
          'Last Month Urgency: "هذا اخر شهر هذا اخر شهر فانت حقي شوفي لك اثنين شوفي لك ثلاثه وكسبتي مبلغ زي العالم." (أم مها وبندر)',
          'Cash vs Sessions Choice: "20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري?" (أم هزاع)',
          'Value Translation: "نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي)',
          'iPad Alternative: "إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت.. أو بتاخديها كاش باك 900 ريال بتسدد فيها أقساط الولد." (أم ياسر/فهد)'
        ],
        items_ar:[
          'المكافأة غير المُطالَب بها: "بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات — كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي." (أم مها وبندر)',
          'إلحاح آخر شهر: "هذا اخر شهر هذا اخر شهر فانت حقي شوفي لك اثنين شوفي لك ثلاثه وكسبتي مبلغ زي العالم." (أم مها وبندر)',
          'الاختيار بين النقد والحصص: "20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري؟" (أم هزاع)',
          'ترجمة القيمة: "نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي)',
          'بديل الآيباد: "إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت.. أو بتاخديها كاش باك 900 ريال بتسدد فيها أقساط الولد." (أم ياسر/فهد)'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Unclaimed Cash Activation:\n"بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات. كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي." (أم مها وبندر)\n\nLast Month Financial Urgency:\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد." (أم مها وبندر)\n\nCash vs iPad Choice:\n"إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت.. أو بتاخديها كاش باك 900 ريال بتسدد فيها أقساط الولد."',
        text_ar:'تفعيل النقد غير المُطالَب به:\n"بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات. كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي." (أم مها وبندر)\n\nإلحاح مالي آخر شهر:\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد." (أم مها وبندر)\n\nالاختيار بين النقد والآيباد:\n"إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت.. أو بتاخديها كاش باك 900 ريال بتسدد فيها أقساط الولد."' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"المكافاه مر عليها شهر وحاجه ليش ما نزلت في الحساب؟"\n→ "بدك تعملي سحب لهم هسا انت فوتي على سجل الدعوات." (أم مها وبندر)\n\n"والله ما أقدر أجدد."\n→ "عشان كذا بقولك استفيدي من الريفيرال وخلي المنصة تساعدك بالحصص أو الكاش."\n\n"حالياً ظروفي صعبة."\n→ "ما عندي مشكلة بالتجديد الآن، بس لا يضيع عليك آخر شهر للجوائز."',
        text_ar:'اعتراض: "المكافاه مر عليها شهر وحاجه ليش ما نزلت في الحساب؟"\n→ "بدك تعملي سحب لهم هسا انت فوتي على سجل الدعوات." (أم مها وبندر)\n\nاعتراض: "والله ما أقدر أجدد."\n→ "عشان كذا بقولك استفيدي من الريفيرال وخلي المنصة تساعدك بالحصص أو الكاش."\n\nاعتراض: "حالياً ظروفي صعبة."\n→ "ما عندي مشكلة بالتجديد الآن، بس لا يضيع عليك آخر شهر للجوائز."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"اكبسي اختاري يا الحصص يا 60 دولار لكن صراحه فضل قصص افضل لتميم." (recommend sessions over cash for academic benefit)',
          '"20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري?" (أم هزاع) — always give the choice',
          'WhatsApp: "إذا عندك شخصين أو ثلاثة مهتمين أرسليهم لي، وإن شاء الله تستفيدين من الحصص أو الكاش للتجديد 🙏"',
          'WhatsApp: "أرسلت لك الملفات التعليمية + تفاصيل الجوائز الحالية 🌷"',
          'Last Month Frame: "هذا اخر شهر فانت حقي شوفي لك اثنين وكسبتي مبلغ زي العالم."'
        ],
        items_ar:[
          '"اكبسي اختاري يا الحصص يا 60 دولار لكن صراحه فضل قصص افضل لتميم." (أوصِ بالحصص على النقد للفائدة الأكاديمية)',
          '"20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري؟" (أم هزاع) — دائماً أعطِ الاختيار',
          'واتساب: "إذا عندك شخصين أو ثلاثة مهتمين أرسليهم لي، وإن شاء الله تستفيدين من الحصص أو الكاش للتجديد 🙏"',
          'واتساب: "أرسلت لك الملفات التعليمية + تفاصيل الجوائز الحالية 🌷"',
          'إطار آخر شهر: "هذا اخر شهر فانت حقي شوفي لك اثنين وكسبتي مبلغ زي العالم."'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم مها وبندر (Unclaimed Cash + Last Month Urgency):\n"المكافاه مر عليها شهر وحاجه ليش ما نزلت في الحساب؟" CM: "بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات. كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي."\nThen: "هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ."',
          '🛑 Case 2 — أم هزاع (Choice Activation):\n"فوزية اشتركت.. هلا بدي إياك تدخلي من عند حسابي بعديها سجل الدعوات. للان سجل ثلاث أرقام مكتوب تحتيهم اختري المكافأة." "20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري?"',
          '🛑 Case 3 — أم بدر (iPad OR 900 SAR Cashback Choice):\nSC: "هسة شوفي الرد هو تفوتي على الإعدادات سجل الدعوات بتحطي حصول على جائزة بتختاري ال 20 حصة. تطلعي كمان 25 حصة عشان يكمل ليفل... ابعث لنا كمان أحد يشترك أو شخصين اللي بدك إياه بتعرفي إذا أربع أشخاص لك آيباد أو بتخذي جهازه بلاي ستيشن كامل."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم مها وبندر (نقد غير مُطالَب به + إلحاح آخر شهر):\n"المكافاه مر عليها شهر وحاجه ليش ما نزلت في الحساب؟" CM: "بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات. كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي."\nثم: "هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ."',
          '🛑 الحالة 2 — أم هزاع (تفعيل الاختيار):\n"فوزية اشتركت.. هلا بدي إياك تدخلي من عند حسابي بعديها سجل الدعوات. للان سجل ثلاث أرقام مكتوب تحتيهم اختري المكافأة." "20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري؟"',
          '🛑 الحالة 3 — أم بدر (الاختيار بين الآيباد أو 900 ريال استرداد نقدي):\nالـ CM: "هسة شوفي الرد هو تفوتي على الإعدادات سجل الدعوات بتحطي حصول على جائزة بتختاري ال 20 حصة. تطلعي كمان 25 حصة عشان يكمل ليفل... ابعث لنا كمان أحد يشترك أو شخصين اللي بدك إياه بتعرفي إذا أربع أشخاص لك آيباد أو بتخذي جهازه بلاي ستيشن كامل."'
        ]}
    ] },  { id:'inc-appcls', icon:'📱', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'20 App Classes Incentive', title_ar:'حافز 20 حصة تطبيق',
    color:'#D97706', cl:'rgba(217,119,6,.15)', glow:'rgba(217,119,6,.2)',
    grad:'linear-gradient(135deg,#D97706,#B45309)',
    topics:['Extra Usage Motivation','Student Engagement Impact','Learning Continuity','Additional Value Perception'],
    topics_ar:['دوافع الاستخدام الإضافي','تأثير تفاعل الطالب','استمرارية التعلم','إدراك القيمة الإضافية'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'The "20 App Classes" reward is the most specific and operationally immediate incentive in the system. It is credited directly to the student\'s account upon referral subscription — visible in the app, auditable, and real. The CM\'s job is to: (1) walk the parent through the live claim process in the app, (2) recommend taking sessions over cash for maximum value, and (3) use the successful claim as a springboard to motivate the next referral.',
        text_ar:'مكافأة "20 حصة تطبيق" هي الحافز الأكثر تحديداً وفورية تشغيلياً في النظام. تُضاف مباشرة إلى حساب الطالب عند اشتراك الريفيرال — مرئية في التطبيق، قابلة للتدقيق، وحقيقية. مهمة الـ CM: (1) إرشاد الوالد عبر عملية المطالبة المباشرة في التطبيق، (2) التوصية بأخذ الحصص بدلاً من النقد لأقصى قيمة، (3) استخدام المطالبة الناجحة كنقطة انطلاق لتحفيز الريفيرال التالي.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'The 20 app classes incentive works through three mechanisms:\n\n(1) LIVE PROOF: "Open the app right now and see the sessions appear" — real-time validation that the system works builds massive trust and excitement.\n(2) CHILD\'S ACCOUNT LINK: Sessions go specifically to the child\'s seat — parent feels they are directly benefiting their child, not just earning a reward.\n(3) FINANCIAL TRANSLATION: "20 sessions = ~800 SAR value" — the CM converts an abstract number into a meaningful financial figure the parent can compare to what they paid.\n(4) CHAIN MOTIVATION: "You didn\'t expect anyone to join, but they did — imagine who else might." First successful referral creates confidence for the next.',
        text_ar:'حافز "20 حصة تطبيق" يعمل عبر أربع آليات:\n\n(1) الإثبات المباشر: "افتحي التطبيق الآن وشاهدي ظهور الحصص" — التحقق الفوري من عمل النظام يبني ثقة وإثارة هائلة.\n(2) ربط حساب الطفل: الحصص تذهب تحديداً لمقعد الطفل — يشعر الوالد أنه يفيد طفله مباشرة لا مجرد يكسب مكافأة.\n(3) الترجمة المالية: "20 حصة = قيمة ~800 ريال" — يُحوّل الـ CM رقماً مجرداً إلى رقم مالي ذي معنى يمكن للوالد مقارنته بما دفع.\n(4) دافع التسلسل: "لم تتوقعي دخول أحد، لكنهم دخلوا — تخيّلي من آخر قد يدخل." أول ريفيرال ناجح يُنشئ ثقة للتالي.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Immediately after a referral subscription is confirmed — claim the reward live during the call',
          'When the customer has pending unclaimed sessions in their referral log',
          'When the student needs more sessions to complete a level — "20 sessions closes the gap"',
          'After recommending sessions over cash — "sessions are worth ~800 SAR"',
          'As the first live reward claim to build trust and demonstrate the system is real'
        ],
        items_ar:[
          'فور تأكيد اشتراك الريفيرال — طالِب بالمكافأة مباشرة خلال المكالمة',
          'حين لدى العميل حصص غير مُطالَب بها معلقة في سجل الريفيرال',
          'حين يحتاج الطالب حصصاً أكثر لإتمام مستوى — "20 حصة تُغلق الفجوة"',
          'بعد التوصية بالحصص على النقد — "الحصص تساوي ~800 ريال"',
          'كأول مطالبة مباشرة بمكافأة لبناء الثقة وإثبات أن النظام حقيقي'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'A referral has recently confirmed their subscription — reward is ready to claim',
          'Customer has been sceptical about whether the rewards are real',
          'Student is running low on sessions — 20 more is meaningful for level completion',
          'Customer has asked "when will the sessions appear?" — ready for the live claim process',
          'Customer has multiple children — can link any new referral to any child\'s account'
        ],
        items_ar:[
          'ريفيرال أكّد اشتراكه مؤخراً — المكافأة جاهزة للمطالبة بها',
          'العميل يشك في حقيقية المكافآت',
          'الطالب على وشك نفاد الحصص — 20 حصة إضافية ذات معنى لإتمام المستوى',
          'العميل سأل "متى ستظهر الحصص؟" — مستعد لعملية المطالبة المباشرة',
          'العميل لديه أطفال متعددون — يمكن ربط أي ريفيرال جديد بحساب أي طفل'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'"Congratulations — [name] subscribed from your side!" ⬅️ "Open the app now" ⬅️ Go to Account → Referral Log ⬅️ Find the subscriber → "اضغطي عليها وحطي الحصول على المكافأة" ⬅️ Choose: 20 sessions or $60 cash ⬅️ CM recommends: "Take the sessions — they\'re worth ~800 SAR" ⬅️ Sessions appear in account live ⬅️ "Now, is there anyone else from your children or relatives who might want to subscribe?" ⬅️ "I\'ll link them directly to your account"',
        text_ar:'"مبروك — [الاسم] اشترك من طرفك!" ⬅️ "افتحي التطبيق الآن" ⬅️ اذهبي إلى حسابي → سجل الدعوات ⬅️ ابحثي عن المشترك → "اضغطي عليها وحطي الحصول على المكافأة" ⬅️ الاختيار: 20 حصة أو 60 دولار نقداً ⬅️ الـ CM يوصي: "خذي الحصص — تساوي ~800 ريال" ⬅️ الحصص تظهر في الحساب مباشرة ⬅️ "الآن، هل يوجد أحد آخر من أطفالك أو أقاربك قد يريد الاشتراك؟" ⬅️ "سأربطهم مباشرة بحسابك"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Live Walkthrough: "روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه." (أم علي ومحمد)',
          'Sessions vs Cash Recommendation: "نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي ومحمد)',
          'Account Link Chain: "اذا احد من ابنائك الثانيين او اقاربك يبي يشترك بربطه على مقعد علي." (أم علي ومحمد)',
          'Claim Step: "روحي على سجل الدعوات. اكبسي اختاري يا الحصص يا 60 دولار." (أم تميم)',
          'Near-miss with more to gain: "هيه 20 رح ينزل لك على آخر الشهر كمان خمس حصص." (أم تميم)'
        ],
        items_ar:[
          'عرض مباشر: "روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه." (أم علي ومحمد)',
          'توصية الحصص مقابل النقد: "نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي ومحمد)',
          'تسلسل ربط الحساب: "اذا احد من ابنائك الثانيين او اقاربك يبي يشترك بربطه على مقعد علي." (أم علي ومحمد)',
          'خطوة المطالبة: "روحي على سجل الدعوات. اكبسي اختاري يا الحصص يا 60 دولار." (أم تميم)',
          'قرب الفوز مع المزيد: "هيه 20 رح ينزل لك على آخر الشهر كمان خمس حصص." (أم تميم)'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Live Claim + Next Ask:\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك. روحي على حسابي. روحي على سجل الدعوات. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه. بخيرك بين فلوس او 20 حصه. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\nThen: "وان شاء الله اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد علي." (أم علي ومحمد)',
        text_ar:'مطالبة مباشرة + طلب التالي:\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك. روحي على حسابي. روحي على سجل الدعوات. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه. بخيرك بين فلوس او 20 حصه. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\nثم: "وان شاء الله اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد علي." (أم علي ومحمد)' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"آخذ كاش ولا حصص؟"\n→ "الحصص قيمتها أعلى كثير وبتفيدكم أكاديمياً أكثر. نصيحة خذي الحصص — قيمتها تقريباً 800 ريال."\n\n"ما أعرف كيف أفعلها."\n→ "ادخلي على سجل الدعوات وأنا أمشي معك خطوة بخطوة."\n\n"إن شاء الله إذا أحد سجل."\n→ "أي أحد من الأقارب أو الأبناء الجدد نربطه مباشرة على المقعد."',
        text_ar:'اعتراض: "آخذ كاش ولا حصص؟"\n→ "الحصص قيمتها أعلى كثير وبتفيدكم أكاديمياً أكثر. نصيحة خذي الحصص — قيمتها تقريباً 800 ريال."\n\nاعتراض: "ما أعرف كيف أفعلها."\n→ "ادخلي على سجل الدعوات وأنا أمشي معك خطوة بخطوة."\n\nاعتراض: "إن شاء الله إذا أحد سجل."\n→ "أي أحد من الأقارب أو الأبناء الجدد نربطه مباشرة على المقعد."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Walk the parent through the app live: Account → Referral Log → Claim → Choose sessions',
          'Always recommend sessions over cash: "قيمتها تقريبا حول 800 ريال"',
          'Immediately after claiming, link the next potential subscriber: "اذا احد من ابنائك الثانيين... بربطه على مقعد علي"',
          'WhatsApp: "مبروك عليكم تفعيل الـ 20 حصة 🎉 أي شخص جديد يجي عن طريقكم رح نربطه مباشرة على مقعد علي 🌷"',
          'WhatsApp: "الحصص اللي أخذتوها قيمتها تقريباً 800 ريال 🌟"'
        ],
        items_ar:[
          'أرشِد الوالد عبر التطبيق مباشرة: حسابي → سجل الدعوات → المطالبة → اختار الحصص',
          'دائماً أوصِ بالحصص على النقد: "قيمتها تقريبا حول 800 ريال"',
          'فور المطالبة، اربط المشترك المحتمل التالي: "اذا احد من ابنائك الثانيين... بربطه على مقعد علي"',
          'واتساب: "مبروك عليكم تفعيل الـ 20 حصة 🎉 أي شخص جديد يجي عن طريقكم رح نربطه مباشرة على مقعد علي 🌷"',
          'واتساب: "الحصص اللي أخذتوها قيمتها تقريباً 800 ريال 🌟"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Full Case — أم علي ومحمد (Complete Live Activation Script):\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك.. روحي على حسابي.. روحي على سجل الدعوات.. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه.. بخيرك بين فلوس او 20 حصه.. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال.\nوان شاء الله اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد مين؟ على مقعد علي على شان علي ياخذ الحصص عنده ان شاء الله."',
          '📌 KEY INSIGHT: The live activation moment creates a "win" feeling that the CM should immediately leverage. The customer is in their highest state of excitement — asking for the next referral at this exact moment yields the best results.',
          '📌 SESSIONS RECOMMENDATION: Always guide customers to choose sessions over cash. The academic benefit ("it helps the child complete the level") feels more responsible and valuable than taking $60 cash. This also increases the perceived value of the platform.'
        ],
        items_ar:[
          '🛑 الحالة الكاملة — أم علي ومحمد (سكريبت التفعيل المباشر الكامل):\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك.. روحي على حسابي.. روحي على سجل الدعوات.. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه.. بخيرك بين فلوس او 20 حصه.. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال.\nوان شاء الله اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد مين؟ على مقعد علي على شان علي ياخذ الحصص عنده ان شاء الله."',
          '📌 رؤية أساسية: لحظة التفعيل المباشر تُنشئ شعور "فوز" يجب على الـ CM الاستفادة منه فوراً. العميل في أعلى حالة من الإثارة — طلب الريفيرال التالي في هذه اللحظة بالضبط يُحقق أفضل النتائج.',
          '📌 توصية الحصص: دائماً أرشِد العملاء لاختيار الحصص على النقد. الفائدة الأكاديمية ("تساعد الطفل على إتمام المستوى") تبدو أكثر مسؤولية وقيمة من أخذ 60 دولار نقداً. هذا يزيد أيضاً من القيمة المُدرَكة للمنصة.'
        ]}
    ] },
  { id:'par-mother', icon:'👩', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'How to Ask the Mother', title_ar:'كيفية الطلب من الأم',
    color:'#F43F5E', cl:'rgba(244,63,94,.15)', glow:'rgba(244,63,94,.2)',
    grad:'linear-gradient(135deg,#F43F5E,#E11D48)',
    topics:['Emotional Response Indicators','Student Improvement Focus','Care-Based Positioning','Trust Indicators'],
    topics_ar:['مؤشرات الاستجابة العاطفية','التركيز على تحسن الطالب','طريقة التقديم المبنية على الاهتمام','مؤشرات الثقة'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Mothers respond to emotional rapport, child pride, social connection, and prize proximity. The referral is framed as "a gift to your child" or "sharing what worked for you with people who care about their children too." The CM must first make the mother feel proud of her child, then connect that pride to the referral ask. Privacy and social comfort are the main barriers — the approach must feel friendly, not pushy.',
        text_ar:'تستجيب الأمهات للألفة العاطفية وفخر الطفل والتواصل الاجتماعي والقرب من الجائزة. يُؤطَّر الريفيرال بوصفه "هدية لطفلك" أو "مشاركة ما نجح معك مع من يهتمون بأطفالهم أيضاً." يجب على الـ CM أن يُشعر الأم بالفخر بطفلها أولاً، ثم يربط هذا الفخر بطلب الريفيرال. الخصوصية والراحة الاجتماعية هما الحاجزان الرئيسيان — يجب أن يبدو النهج ودياً لا مُلحّاً.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Mothers are driven by three forces:\n\n(1) CHILD PRIDE: When the CM praises the child, the mother\'s emotional defenses lower significantly. She wants to share that pride with others — and sharing the platform is an extension of that.\n(2) SOCIAL ROLE: Mothers see themselves as connectors. "Have you told any of your friends about how well [child] is doing?" positions the referral as natural social sharing, not sales.\n(3) PRIZE AS CHILD\'S GIFT: "If you refer 2 people, your child gets an extra 20 sessions" — the mother isn\'t doing it for herself, she\'s doing it for her child. This removes personal ego from the equation.\n\nMain barrier: fear of seeming like they are "selling to friends." The CM must clearly establish that the friend receives a discount/free trial, NOT a sales call.',
        text_ar:'تتحرك الأمهات بثلاث قوى:\n\n(1) فخر الطفل: حين يُثني الـ CM على الطفل، تنخفض دفاعات الأم العاطفية بشكل ملحوظ. تريد مشاركة هذا الفخر مع الآخرين — ومشاركة المنصة امتداد لذلك.\n(2) الدور الاجتماعي: تنظر الأمهات إلى أنفسهن بوصفهن رابطات. "هل أخبرتِ أياً من صديقاتك كيف يسير [الطفل]؟" يُرسّخ الريفيرال بوصفه تشاركاً اجتماعياً طبيعياً لا بيعاً.\n(3) الجائزة كهدية للطفل: "لو رشحتِ شخصَين، طفلك يحصل على 20 حصة إضافية" — الأم لا تفعله لنفسها، بل لطفلها. هذا يُزيل الأنا الشخصية من المعادلة.\n\nالحاجز الرئيسي: الخوف من الظهور بمظهر من "يبيع للأصدقاء." يجب على الـ CM أن يُرسّخ بوضوح أن الصديقة تحصل على خصم/تجربة مجانية، وليس على مكالمة بيع.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'After mentioning or hearing something positive about the child\'s progress',
          'When the mother spontaneously mentions another mother, friend, or relative',
          'After delivering a prize proximity update ("you\'re 2 referrals from the iPad")',
          'During a warm, friendly conversation where the mother is relaxed and engaged',
          'After the child\'s first positive review — the mother is at peak emotional pride'
        ],
        items_ar:[
          'بعد ذكر أو سماع شيء إيجابي عن تقدم الطفل',
          'حين تذكر الأم تلقائياً أماً أخرى أو صديقة أو قريبة',
          'بعد تقديم تحديث القرب من الجائزة ("أنتِ ريفيرالَين من الآيباد")',
          'خلال محادثة دافئة ودية حيث الأم مرتاحة ومنخرطة',
          'بعد أول تقييم إيجابي للطفل — الأم في ذروة فخرها العاطفي'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Uses warm, personal language ("والله / ماشاء الله / يخطف القلب")',
          'Talks about the child with pride and enthusiasm',
          'Mentions WhatsApp groups (school groups, neighbourhood groups, family groups)',
          'Refers to friends or relatives naturally in conversation',
          'Has already mentioned that friends/relatives asked about the platform'
        ],
        items_ar:[
          'تستخدم لغة دافئة شخصية ("والله / ماشاء الله / يخطف القلب")',
          'تتحدث عن الطفل بفخر وحماس',
          'تذكر مجموعات الواتساب (مجموعات مدرسية، جيران، عائلية)',
          'تُشير إلى الأصدقاء أو الأقارب بشكل طبيعي في المحادثة',
          'سبق وذكرت أن الأصدقاء/الأقارب سألوا عن المنصة'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Build rapport with warm, personal tone ⬅️ Praise child specifically ⬅️ "Do any of your friends have children who would benefit?" ⬅️ Frame it as sharing a gift, not recommending a product ⬅️ Mention prize proximity or reward ⬅️ "Just send me the number — I\'ll contact them, no pressure on you" ⬅️ Remove social anxiety: "They get a free trial, I won\'t pressure them" ⬅️ Close with WhatsApp follow-up sending the link or her personal referral code',
        text_ar:'بناء الألفة بنبرة دافئة شخصية ⬅️ مدح الطفل بشكل محدد ⬅️ "هل لدى أياً من صديقاتك أطفال سيستفيدون؟" ⬅️ أطِّر الأمر على أنه مشاركة هدية لا التوصية بمنتج ⬅️ اذكر القرب من الجائزة أو المكافأة ⬅️ "فقط أرسلي الرقم — سأتواصل معهم، لا ضغط عليك" ⬅️ أزِل القلق الاجتماعي: "سيحصلون على تجربة مجانية، لن أضغط عليهم" ⬅️ أنهِ بمتابعة واتساب إرسال الرابط أو كودها الشخصي' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Child Pride + Ask: "ما شاء الله صراحة كثير مبسوطة من عدد الحصص اللي بتاخذها ديالى.. واضح إنها كثير متحمسة.. طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك." (أم ديالى)',
          'Peer Comparison: "بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس." (أستاذة سارة)',
          'Privacy Guarantee: "أنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."',
          'Group Message Guide: "أبغى ارسلي هذا على الجروبات... هذا رابط جديد للبطلة... حاولي تشجعي الأمهات حتى الأمهات لما يشوفون يسمعون من كلام الأم يختلف." (أم ديالى)',
          'Voice Message Script: "قولي لها والله قالت لي انك حابه فانا حابه افيدك تاخذين نفس الخصم دياله." (أم ديالى)'
        ],
        items_ar:[
          'فخر الطفل + الطلب: "ما شاء الله صراحة كثير مبسوطة من عدد الحصص اللي بتاخذها ديالى.. واضح إنها كثير متحمسة.. طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك." (أم ديالى)',
          'المقارنة بالنظير: "بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس." (أستاذة سارة)',
          'ضمان الخصوصية: "أنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."',
          'دليل رسالة المجموعة: "أبغى ارسلي هذا على الجروبات... هذا رابط جديد للبطلة... حاولي تشجعي الأمهات حتى الأمهات لما يشوفون يسمعون من كلام الأم يختلف." (أم ديالى)',
          'سكريبت الرسالة الصوتية: "قولي لها والله قالت لي انك حابه فانا حابه افيدك تاخذين نفس الخصم دياله." (أم ديالى)'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Warm Opener for Mothers:\n"يا عمري والله صوتك يخطف القلب.. بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس.. أي شخص يشترك من طرفك رح أضيف لك حصص مجانية.. وخلي كل شيء بيني وبينك وأنا أتابع كل شيء." (أستاذة سارة × أم محمد)\n\nPride-to-Referral:\n"طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك.. أنتم باقي لكم شخصين فقط وتربحوا الأيباد." (أم ديالى)\n\nSocial Circle Script:\n"أنتِ جاية من طرف أم فيصل.. اليوم أخذت 35 حصة إضافية.. ولو أي حدا سجل من طرفك اليوم رح تستفيدوا كثير.. ابعثيلي الأرقام وأنا أتابع معهم." (أستاذة سارة × أم عبد الرحمن)',
        text_ar:'افتتاح دافئ للأمهات:\n"يا عمري والله صوتك يخطف القلب.. بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس.. أي شخص يشترك من طرفك رح أضيف لك حصص مجانية.. وخلي كل شيء بيني وبينك وأنا أتابع كل شيء." (أستاذة سارة × أم محمد)\n\nالفخر إلى ريفيرال:\n"طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك.. أنتم باقي لكم شخصين فقط وتربحوا الأيباد." (أم ديالى)\n\nسكريبت الدائرة الاجتماعية:\n"أنتِ جاية من طرف أم فيصل.. اليوم أخذت 35 حصة إضافية.. ولو أي حدا سجل من طرفك اليوم رح تستفيدوا كثير.. ابعثيلي الأرقام وأنا أتابع معهم." (أستاذة سارة × أم عبد الرحمن)' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"بستحي أحكي معهم / بخاف أزعجهم."\n→ "مش مطلوب تبيعي عليهم، بس احكي عن تجربة ابنك وخلي اللي يحب يجرب. إنتِ بس بتقدمي فرصة مجانية، اللي بده يجرب أهلاً فيه."\n\n"ما بعرف إذا الأهل مهتمين."\n→ "ابعثيلي الأرقام أول، وأنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."\n\n"الناس في جروباتي ما يتجاوبون."\n→ "جربي تبعثي رسالة صوتية — لما يسمعوا صوت شخص يثقوا فيه بيكون أوقع من رسالة نصية."',
        text_ar:'اعتراض: "بستحي أحكي معهم / بخاف أزعجهم."\n→ "مش مطلوب تبيعي عليهم، بس احكي عن تجربة ابنك وخلي اللي يحب يجرب. إنتِ بس بتقدمي فرصة مجانية، اللي بده يجرب أهلاً فيه."\n\nاعتراض: "ما بعرف إذا الأهل مهتمين."\n→ "ابعثيلي الأرقام أول، وأنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."\n\nاعتراض: "الناس في جروباتي ما يتجاوبون."\n→ "جربي تبعثي رسالة صوتية — لما يسمعوا صوت شخص يثقوا فيه بيكون أوقع من رسالة نصية."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Use personal language: "يا عمري / يا روحي / يا أختي" — maintains warmth throughout',
          'Always mention the child by name when praising — makes it personal and real',
          'Remove burden: "ابعثيلي الأرقام وأنا أتابع معهم بنفسي — ما عليك أي شيء بعد هيك"',
          'Guide group message strategy: "أرسلي رسالة صوتية للجروبات — أنا أعمل لك كود خاص باسمك"',
          'WhatsApp: "مبروك 🎉 انضافت لكم الحصص المجانية الجديدة على الحساب."'
        ],
        items_ar:[
          'استخدم لغة شخصية: "يا عمري / يا روحي / يا أختي" — يُبقي الدفء طوال المحادثة',
          'دائماً اذكر الطفل بالاسم عند المدح — يجعله شخصياً وحقيقياً',
          'أزِل العبء: "ابعثيلي الأرقام وأنا أتابع معهم بنفسي — ما عليك أي شيء بعد هيك"',
          'أرشِد استراتيجية رسالة المجموعة: "أرسلي رسالة صوتية للجروبات — أنا أعمل لك كود خاص باسمك"',
          'واتساب: "مبروك 🎉 انضافت لكم الحصص المجانية الجديدة على الحساب."'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أم ديالى (Pride-to-Prize Approach):\n"ما شاء الله صراحة كثير مبسوطة من عدد الحصص اللي بتاخذها ديالى.. واضح إنها كثير متحمسة.. طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك.. أنتم باقي لكم شخصين فقط وتربحوا الايباد.. شفتوا الهدايا الجديدة؟ في قسائم جرير وبلايستيشن وأيباد.. رح أرسل لك الرابط والصور على الواتساب."',
          '🛑 Case 2 — أستاذة سارة × أم محمد (Friendly Emotional Approach):\n"يا عمري والله صوتك يخطف القلب.. بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس.. أي شخص يشترك من طرفك رح أضيف لك حصص مجانية.. وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 Case 3 — أستاذة سارة × أم عبد الرحمن (Referrer Benefit Frame):\n"أنتِ جاية من طرف أم فيصل.. اليوم أخذت 35 حصة إضافية.. ولو أي حدا سجل من طرفك اليوم رح تستفيدوا كثير.. ابعثيلي الأرقام وأنا أتابع معهم."',
          '📌 TONE GUIDE: Voice should be warm, slightly slower than normal pace, as if talking to a close friend. Avoid corporate or formal language. Mirror the customer\'s emotional energy — if she is enthusiastic, match that energy; if she is hesitant, drop to a calm reassuring tone.'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم ديالى (نهج الفخر إلى الجائزة):\n"ما شاء الله صراحة كثير مبسوطة من عدد الحصص اللي بتاخذها ديالى.. واضح إنها كثير متحمسة.. طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك.. أنتم باقي لكم شخصين فقط وتربحوا الايباد.. شفتوا الهدايا الجديدة؟ في قسائم جرير وبلايستيشن وأيباد.. رح أرسل لك الرابط والصور على الواتساب."',
          '🛑 الحالة 2 — أستاذة سارة × أم محمد (النهج الودي العاطفي):\n"يا عمري والله صوتك يخطف القلب.. بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس.. أي شخص يشترك من طرفك رح أضيف لك حصص مجانية.. وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 الحالة 3 — أستاذة سارة × أم عبد الرحمن (إطار فائدة المُرشِّح):\n"أنتِ جاية من طرف أم فيصل.. اليوم أخذت 35 حصة إضافية.. ولو أي حدا سجل من طرفك اليوم رح تستفيدوا كثير.. ابعثيلي الأرقام وأنا أتابع معهم."',
          '📌 دليل النبرة: يجب أن يكون الصوت دافئاً، أبطأ قليلاً من الوتيرة الطبيعية، كأنك تتحدث مع صديقة مقربة. تجنب اللغة المؤسسية أو الرسمية. عاكِس الطاقة العاطفية للعميل — إذا كانت متحمسة، طابِق تلك الطاقة؛ إذا كانت مترددة، انخفِض إلى نبرة هادئة مطمئنة.'
        ]}
    ] },  { id:'par-father', icon:'👨', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'How to Ask the Father', title_ar:'كيفية الطلب من الأب',
    color:'#1D4ED8', cl:'rgba(29,78,216,.15)', glow:'rgba(29,78,216,.2)',
    grad:'linear-gradient(135deg,#1D4ED8,#1E40AF)',
    topics:['Results-Focused Positioning','Investment Perception','Achievement Indicators','Practical Value Focus'],
    topics_ar:['طريقة التقديم المركّزة على النتائج','إدراك الاستثمار','مؤشرات الإنجاز','التركيز على القيمة العملية'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Fathers operate on logic, ROI, and efficiency. The referral must be framed as a straightforward value exchange: "Each person you refer = 20 sessions or $100 for your child\'s account." The CM should avoid emotional appeals and instead deliver clear numbers, a precise process, and a specific ask. Fathers appreciate directness — do not over-explain, do not over-flatter. Respect their time and get to the point quickly.',
        text_ar:'يعمل الآباء على المنطق والعائد على الاستثمار والكفاءة. يجب تأطير الريفيرال بوصفه تبادل قيمة مباشر: "كل شخص ترشحه = 20 حصة أو 100 دولار لحساب طفلك." يجب على الـ CM تجنب النداءات العاطفية وبدلاً منها تقديم أرقام واضحة وعملية دقيقة وطلب محدد. الآباء يُقدّرون المباشرة — لا تُطيل الشرح ولا تُبالغ في الإطراء. احترم وقتهم واصل إلى النقطة بسرعة.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Fathers respond to three pragmatic triggers:\n\n(1) INVESTMENT ROI: "You paid for X sessions — refer 2 people and add 40 more for free." Makes the referral feel like a smart financial extension of their existing investment.\n(2) CHILD\'S ACCOUNT MATH: "Each person = 20 sessions on [child\'s name]\'s account" — direct, specific, calculable.\n(3) PROCESS CLARITY: Fathers want to know exactly how it works, step by step. Confusion kills the deal. "Send me the number → I link them → sessions appear in 24-48 hours."',
        text_ar:'يستجيب الآباء لثلاثة محفزات براغماتية:\n\n(1) العائد على الاستثمار: "دفعت مقابل X حصة — رشّح شخصين وأضف 40 حصة مجاناً." يجعل الريفيرال يبدو امتداداً مالياً ذكياً للاستثمار القائم.\n(2) حسابات حساب الطفل: "كل شخص = 20 حصة على حساب [اسم الطفل]" — مباشر، محدد، قابل للحساب.\n(3) وضوح العملية: يريد الآباء معرفة آلية العمل بالضبط، خطوة بخطوة. الغموض يُفسد الصفقة. "ابعثلي الرقم → أربطهم → تظهر الحصص خلال 24-48 ساعة."' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'After confirming academic progress with specific metrics (session count, level completed)',
          'During or immediately after upgrade/renewal conversations — financial mindset is active',
          'When the father mentions a colleague, friend, or business partner with children',
          'When the father asks directly "how does the referral system work?"',
          'Short calls only — if the father is busy, make the ask brief and defer details to WhatsApp'
        ],
        items_ar:[
          'بعد تأكيد التقدم الأكاديمي بمقاييس محددة (عدد الحصص، المستوى المكتمل)',
          'خلال محادثة الترقية/التجديد أو مباشرةً بعدها — الذهنية المالية نشطة',
          'عندما يذكر الأب زميلاً أو صديقاً أو شريكاً في العمل لديه أطفال',
          'عندما يسأل الأب مباشرةً "كيف يشتغل نظام الريفيرال؟"',
          'المكالمات القصيرة فقط — إذا كان الأب مشغولاً، اجعل الطلب موجزاً وأرجئ التفاصيل إلى واتساب'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Father asks direct questions — he is efficient and expects the same',
          'Discusses investment in child\'s education in financial terms',
          'Mentions colleagues or professional contacts who have children',
          'Says "send me the details on WhatsApp" — he will review and decide later',
          'Is satisfied with the child\'s progress and has shown willingness to upgrade'
        ],
        items_ar:[
          'يطرح الأب أسئلة مباشرة — هو كفء ويتوقع الأمر ذاته',
          'يتحدث عن الاستثمار في تعليم طفله بمصطلحات مالية',
          'يذكر زملاء أو معارف مهنيين لديهم أطفال',
          'يقول "ابعثلي التفاصيل على واتساب" — سيراجع ويقرر لاحقاً',
          'راضٍ عن تقدم طفله وأبدى استعداداً للترقية'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Brief progress update with specific numbers ⬅️ Confirm father\'s satisfaction ⬅️ "One more thing I wanted to mention..." ⬅️ "If you know someone interested in English — send me their number" ⬅️ "If they subscribe, [child] gets 20 free sessions" ⬅️ Make it easy: "Send me the number on WhatsApp — I\'ll handle everything" ⬅️ Quality check: "Someone who\'s genuinely interested — not random" ⬅️ Close quickly and send follow-up WhatsApp with the link',
        text_ar:'تحديث موجز للتقدم بأرقام محددة ⬅️ تأكيد رضا الأب ⬅️ "شيء إضافي أردت ذكره..." ⬅️ "إذا تعرف أحداً مهتماً بالإنجليزي — ابعثلي رقمه" ⬅️ "لو سجّل، [الطفل] يحصل على 20 حصة مجانية" ⬅️ اجعلها سهلة: "ابعثلي الرقم على واتساب وأنا أتولى كل شيء" ⬅️ فلتر الجودة: "شخص مهتم فعلاً — مش عشوائي" ⬅️ أغلق بسرعة وابعث واتساب متابعة مع الرابط' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Soft Side Ask: "شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة... إذا في أحد من محيطك مهتم في تعلم اللغة الإنجليزية ممكن ترسلنا رقم جواله." (أبو عبد الرحمن)',
          'Financial Logic: "وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية." (أبو عبد الرحمن)',
          'Quality Filter: "إذا أنت متأكد إنه مهتم." (VIP Renewal Case)',
          'Commission Frame: "أي شخص بيجي عن طريقك بيشترك لك 100 دولار." (أبو نايف — M3-M6 Partner)',
          'WhatsApp Delegation: "أرسل لي الرقم مباشرة على الواتساب وأنا أضيفهم."'
        ],
        items_ar:[
          'الطلب الجانبي اللطيف: "شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة... إذا في أحد من محيطك مهتم في تعلم اللغة الإنجليزية ممكن ترسلنا رقم جواله." (أبو عبد الرحمن)',
          'المنطق المالي: "وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية." (أبو عبد الرحمن)',
          'فلتر الجودة: "إذا أنت متأكد إنه مهتم." (حالة تجديد VIP)',
          'إطار العمولة: "أي شخص بيجي عن طريقك بيشترك لك 100 دولار." (أبو نايف — شريك M3-M6)',
          'تفويض واتساب: "أرسل لي الرقم مباشرة على الواتساب وأنا أضيفهم."'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Direct Professional Ask:\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."\n\nPartner Commission Frame:\n"عملنا شيء خاص للناس اللي عندهم معارف كثيرة. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\n\nSession Count Logic:\n"كل شخص يسجل من طرفك بيضاف 20 حصة لحساب [اسم الطفل] — أي شخص من معارفك عنده ولد بيتعلم إنجليزي؟"',
        text_ar:'الطلب المهني المباشر:\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."\n\nإطار عمولة الشريك:\n"عملنا شيء خاص للناس اللي عندهم معارف كثيرة. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\n\nمنطق عدد الحصص:\n"كل شخص يسجل من طرفك بيضاف 20 حصة لحساب [اسم الطفل] — أي شخص من معارفك عنده ولد بيتعلم إنجليزي؟"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"بشوف إذا في حد مهتم." (soft deflection)\n→ "تمام، بس يكون شخص فعلاً مهتم حتى يستفيدوا كامل الاستفادة. أي رقم ابعثه على الواتساب وأنا أتابع."\n\n"أنا مشغول الحين." (time objection)\n→ "عادي — بس ابعث لي الرقم على الواتساب متى ما تذكر وأنا أعتني بالباقي."\n\n"ما عندي وقت أجمع أرقام." (effort objection)\n→ "مو لازم تجمع أرقام — شخص واحد كافي. أي معارف أو زميل عنده أولاد بيتعلمون إنجليزي."',
        text_ar:'"بشوف إذا في حد مهتم." (تهرب لطيف)\n→ "تمام، بس يكون شخص فعلاً مهتم حتى يستفيدوا كامل الاستفادة. أي رقم ابعثه على الواتساب وأنا أتابع."\n\n"أنا مشغول الحين." (اعتراض الوقت)\n→ "عادي — بس ابعث لي الرقم على الواتساب متى ما تذكر وأنا أعتني بالباقي."\n\n"ما عندي وقت أجمع أرقام." (اعتراض الجهد)\n→ "مو لازم تجمع أرقام — شخص واحد كافي. أي معارف أو زميل عنده أولاد بيتعلمون إنجليزي."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Keep it SHORT: fathers respect efficiency. The referral ask should take less than 30 seconds.',
          '"أرسل لي الرقم مباشرة على الواتساب وأنا أضيفهم مباشرة على حساب عبد الرحمن."',
          'Specific math: "20 حصة على حساب الطفل" is clearer and more motivating than vague "rewards"',
          'Quality ask: "شخص مهتم فعلاً بتعلم اللغة" — ensures the father gives quality leads, not random numbers',
          'WhatsApp (short & direct): "أرسل لي الأرقام المهتمة عشان أضيفها مباشرة على حساب عبد الرحمن ❤️"'
        ],
        items_ar:[
          'اجعلها قصيرة: الآباء يحترمون الكفاءة. طلب الريفيرال يجب أن يستغرق أقل من 30 ثانية.',
          '"أرسل لي الرقم مباشرة على الواتساب وأنا أضيفهم مباشرة على حساب عبد الرحمن."',
          'الرياضيات المحددة: "20 حصة على حساب الطفل" أوضح وأكثر تحفيزاً من "مكافآت" مبهمة',
          'طلب الجودة: "شخص مهتم فعلاً بتعلم اللغة" — يضمن أن يقدم الأب أرقاماً نوعية لا عشوائية',
          'واتساب (قصير ومباشر): "أرسل لي الأرقام المهتمة عشان أضيفها مباشرة على حساب عبد الرحمن ❤️"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أبو عبد الرحمن (Soft VIP Side Ask):\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."',
          '🛑 Case 2 — أبو نايف (Partner Commission Approach — M3-M6):\nStart: professional academic review of the child. Transition: "أستاذ بدي أقول لك شغلة مهمة… عملنا شيء للناس اللي عندهم كثير أشخاص. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار." Close: "أهم شيء تعبّي البيانات وتنشر الرابط."',
          '🛑 Case 3 — أبو ريان وبسام (Record-Level Referrer — Accountability Call):\n"بسام سجل بعد بسام عن طريقه اثنين إخوانه وصوفية وسهيل وسهيل ولجين ومعاذ ومنار وعبد الرحمن مسجلين 10 أشخاص عن طريقه… إذا إنت الحين ما بتعطيني الهدايا حقت هذول كلهم تقول لي خذ هذه الهدية حقته زي ما أعلنتم في الإعلان الأول إنه آيباد ولا لابتوب." [Father demanding accountability for unreceived prizes — important escalation case]',
          '📌 TONE GUIDE: With fathers — confident, direct, professional. Match their pace. If they speak fast, be fast. If they are quiet and measured, slow down. Never over-flatter or use emotional language like "يا عمري" — use professional: "أستاذ / أبو [name]."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أبو عبد الرحمن (الطلب الجانبي VIP اللطيف):\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."',
          '🛑 الحالة 2 — أبو نايف (نهج عمولة الشريك — M3-M6):\nالبداية: مراجعة أكاديمية احترافية للطفل. الانتقال: "أستاذ بدي أقول لك شغلة مهمة… عملنا شيء للناس اللي عندهم كثير أشخاص. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار." الإغلاق: "أهم شيء تعبّي البيانات وتنشر الرابط."',
          '🛑 الحالة 3 — أبو ريان وبسام (أعلى مُحيل — مكالمة المساءلة):\n"بسام سجل بعد بسام عن طريقه اثنين إخوانه وصوفية وسهيل وسهيل ولجين ومعاذ ومنار وعبد الرحمن مسجلين 10 أشخاص عن طريقه… إذا إنت الحين ما بتعطيني الهدايا حقت هذول كلهم تقول لي خذ هذه الهدية حقته زي ما أعلنتم في الإعلان الأول إنه آيباد ولا لابتوب." [الأب يطالب بالمساءلة عن جوائز لم تُستلم — حالة تصعيد مهمة]',
          '📌 دليل النبرة: مع الآباء — واثق، مباشر، احترافي. تزامن مع إيقاعهم. إذا تكلموا بسرعة، كن سريعاً. إذا كانوا هادئين ومتأنين، تمهّل. لا تُبالغ في الإطراء أو تستخدم لغة عاطفية مثل "يا عمري" — استخدم المهني: "أستاذ / أبو [الاسم]."'
        ]}
    ] },
  { id:'sty-academic', icon:'🏛️', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'Academic Communication Style', title_ar:'أسلوب التواصل الأكاديمي',
    color:'#4338CA', cl:'rgba(67,56,202,.15)', glow:'rgba(67,56,202,.2)',
    grad:'linear-gradient(135deg,#4338CA,#3730A3)',
    topics:['Educational Positioning','Student Performance Focus','Academic Improvement Indicators','Learning Outcome Positioning'],
    topics_ar:['التوجيه التعليمي','التركيز على أداء الطالب','مؤشرات التحسن الأكاديمي','طريقة تقديم نتائج التعلم'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'The academic communication style positions the CM as an educational authority — a "Success Mentor" or "Academic Advisor" who deeply understands the student\'s learning journey. Referral requests are introduced as a natural extension of the academic conversation, backed by data, reports, and level analysis. This style works best with parents who ask many questions, want evidence of progress, and respond to structured information rather than emotional appeals.',
        text_ar:'يُقدّم أسلوب التواصل الأكاديمي الـ CM بوصفه مرجعاً تعليمياً — "مرشد نجاح" أو "مستشار أكاديمي" يفهم رحلة الطالب التعليمية بعمق. تُقدَّم طلبات الريفيرال بوصفها امتداداً طبيعياً للحوار الأكاديمي، مدعومةً بالبيانات والتقارير وتحليل المستوى. يُجدي هذا الأسلوب أكثر مع أولياء الأمور الذين يطرحون أسئلة كثيرة، ويريدون دليلاً على التقدم، ويستجيبون للمعلومات المنظمة بدلاً من النداءات العاطفية.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Parents who respond to academic style are: data-oriented, analytically-minded, value evidence over emotion, and need to feel the CM is genuinely competent before they extend trust. Three-step psychology:\n\n(1) AUTHORITY ESTABLISHMENT: CM demonstrates knowledge of the child\'s specific level, progress metrics, and curriculum gap — parent thinks "this person knows my child."\n(2) LOGICAL REFERRAL BRIDGE: "The report shows [data]. Based on this, we recommend [action]. By the way, our referral program works like this..." — the referral is embedded in a logical flow.\n(3) VIP SCARCITY: "Limited golden seats / elite schedule" — academic privilege framing that makes referral feel like exclusive access.',
        text_ar:'أولياء الأمور الذين يستجيبون للأسلوب الأكاديمي: موجّهون بالبيانات، تحليليو التفكير، يقدّرون الدليل على الشعور، ويحتاجون إلى الشعور بكفاءة الـ CM الحقيقية قبل منح الثقة. علم النفس بثلاث خطوات:\n\n(1) تأسيس السلطة: يُظهر الـ CM معرفته بمستوى الطفل المحدد ومقاييس تقدمه وفجوات المنهج — يفكر وليّ الأمر "هذا الشخص يعرف طفلي."\n(2) جسر الريفيرال المنطقي: "التقرير يُظهر [البيانات]. بناءً على ذلك نوصي بـ [الإجراء]. بالمناسبة، برنامج الريفيرال يعمل هكذا..." — الريفيرال مدمج في سياق منطقي.\n(3) شُح VIP: "مقاعد ذهبية محدودة / جدول النخبة" — إطار الامتياز الأكاديمي الذي يجعل الريفيرال يبدو وصولاً حصرياً.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'After sharing a progress report, assessment result, or level completion milestone',
          'When the parent asks detailed questions about the curriculum or teaching methodology',
          'When the parent is an educator, doctor, or works in a professional field',
          'When the child is in a premium plan (Elite/Cambridge) — parent expects high-quality guidance',
          'When introducing the 12-session commitment rule — academic frame is already established'
        ],
        items_ar:[
          'بعد مشاركة تقرير تقدم أو نتيجة تقييم أو إتمام مستوى',
          'عندما يسأل وليّ الأمر أسئلة تفصيلية عن المنهج أو منهجية التدريس',
          'عندما يكون وليّ الأمر معلماً أو طبيباً أو يعمل في مجال مهني',
          'عندما يكون الطفل في خطة متميزة (Elite/Cambridge) — يتوقع وليّ الأمر إرشاداً عالي الجودة',
          'عند تقديم قاعدة الالتزام بـ 12 حصة — الإطار الأكاديمي مؤسَّس بالفعل'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Parent asks "how exactly does the level assessment work?" — analytical mindset',
          'Parent compares the platform to school curriculum or standardised tests',
          'Parent mentions IELTS, school exams, or future academic goals',
          'Parent responds better to numbers and data than to emotional storytelling',
          'Parent is calm, methodical, and asks follow-up questions throughout the call'
        ],
        items_ar:[
          'يسأل وليّ الأمر "كيف يعمل تقييم المستوى بالضبط؟" — عقلية تحليلية',
          'يقارن وليّ الأمر المنصة بالمنهج المدرسي أو الاختبارات الموحّدة',
          'يذكر وليّ الأمر IELTS أو الامتحانات المدرسية أو الأهداف الأكاديمية المستقبلية',
          'يستجيب وليّ الأمر للأرقام والبيانات أفضل من القصص العاطفية',
          'وليّ الأمر هادئ ومنهجي ويطرح أسئلة متابعة طوال المكالمة'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Professional greeting + introduce as "Success Mentor" ⬅️ Share specific progress data (session count, level, performance scores) ⬅️ Discuss the 12-session minimum commitment ⬅️ Explain teacher differentiation policy ⬅️ Present the referral program as structured and data-driven ⬅️ "Any family similar to yours who would benefit from this structured approach?" ⬅️ Ensure numbers are genuinely interested',
        text_ar:'تحية احترافية + التقديم بوصف "مرشد النجاح" ⬅️ مشاركة بيانات التقدم المحددة (عدد الحصص، المستوى، درجات الأداء) ⬅️ مناقشة الحد الأدنى للالتزام بـ 12 حصة ⬅️ شرح سياسة تمييز المعلم ⬅️ تقديم برنامج الريفيرال بوصفه منظماً ومبنياً على البيانات ⬅️ "أي عائلة مثلكم تستفيد من هذا النهج المنظم؟" ⬅️ التأكد من أن الأرقام مهتمة فعلاً' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Authority Intro: "مع حضرتك أستاذ أحمد معلم النجاح الخاص بالأولاد وأنا اللي هتابع مع حضرتك إن شاء الله." (Approach 1 — Service Calls)',
          'Commitment Rule: "مهم جدًا الالتزام بالـ 12 حصة عشان نشوف نتائج حقيقية."',
          'VIP Technical: "مقعدك VIP وبيعطيك 5 مقاعد مجانية تهديهم لزملائك." (Alaa\'s VIP approach)',
          'Assessment Tool: "الاختبارات نزلت بمركز التقييم داخل التطبيق." (Academic support case)',
          'Report-Based Referral: "النتائج واضحة جدًا بالتقرير. سارة ما شاء الله حضرت 21 حصة بدون غياب." (أم سارة — Low Consumption)'
        ],
        items_ar:[
          'تقديم السلطة: "مع حضرتك أستاذ أحمد معلم النجاح الخاص بالأولاد وأنا اللي هتابع مع حضرتك إن شاء الله." (النهج 1 — مكالمات الخدمة)',
          'قاعدة الالتزام: "مهم جدًا الالتزام بالـ 12 حصة عشان نشوف نتائج حقيقية."',
          'VIP التقني: "مقعدك VIP وبيعطيك 5 مقاعد مجانية تهديهم لزملائك." (نهج Alaa VIP)',
          'أداة التقييم: "الاختبارات نزلت بمركز التقييم داخل التطبيق." (حالة الدعم الأكاديمي)',
          'الريفيرال القائم على التقرير: "النتائج واضحة جدًا بالتقرير. سارة ما شاء الله حضرت 21 حصة بدون غياب." (أم سارة — الاستهلاك المنخفض)'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Report-Based Ask:\n"النتائج واضحة جدًا بالتقرير. إحنا فقط بدنا أطفال ممكن يستفيدوا مثل سارة ودانا وهشام. أي اشتراك جديد يعطي سارة 20 حصة مجانية." (أم سارة)\n\nVIP Scarcity:\n"إنت عندك مقعد VIP خاص بالترشيحات لكن لسه ما استفدتي منه.. وإذا ما استخدمتيه ممكن يتم سحبه." (دكتورة سارة — VIP Scarcity)\n\nSuccess Mentor Referral:\n"آخر حاجة عندنا برنامج الترشيحات.. حضرتك دخلتي من طرف أم منى وهي بتستفيد بهدايا وجوائز.. وأنت كمان تقدري تستفيدي لما ترشحي أشخاص للمنصة." (أستاذ أحمد × أم زينب)',
        text_ar:'الطلب القائم على التقرير:\n"النتائج واضحة جدًا بالتقرير. إحنا فقط بدنا أطفال ممكن يستفيدوا مثل سارة ودانا وهشام. أي اشتراك جديد يعطي سارة 20 حصة مجانية." (أم سارة)\n\nشُح VIP:\n"إنت عندك مقعد VIP خاص بالترشيحات لكن لسه ما استفدتي منه.. وإذا ما استخدمتيه ممكن يتم سحبه." (دكتورة سارة — شُح VIP)\n\nريفيرال مرشد النجاح:\n"آخر حاجة عندنا برنامج الترشيحات.. حضرتك دخلتي من طرف أم منى وهي بتستفيد بهدايا وجوائز.. وأنت كمان تقدري تستفيدي لما ترشحي أشخاص للمنصة." (أستاذ أحمد × أم زينب)' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"سجلوا من طرفي وما استفدت." (lost referrals due to wrong linking)\n→ "المرة الجاية ابعثي الرقم مباشرة عشان نربطه على حسابك وما يضيع عليك شيء."\n\n"ليش ما أخذت جائزة رغم تسجيلي أكثر من طفل؟"\n→ "خليني أرفع لك الطلب وأشوف أفضل استثناء ممكن ينفعكم."\n\n"ما عندي ناس على نفس المستوى الأكاديمي."\n→ "مو شرط نفس المستوى — المنصة تقيّم كل طالب من أوله. الأفضل ترشحي أي عائلة مهتمة بتعليم الإنجليزي."',
        text_ar:'"سجلوا من طرفي وما استفدت." (ريفيرالات ضائعة بسبب الربط الخاطئ)\n→ "المرة الجاية ابعثي الرقم مباشرة عشان نربطه على حسابك وما يضيع عليك شيء."\n\n"ليش ما أخذت جائزة رغم تسجيلي أكثر من طفل؟"\n→ "خليني أرفع لك الطلب وأشوف أفضل استثناء ممكن ينفعكم."\n\n"ما عندي ناس على نفس المستوى الأكاديمي."\n→ "مو شرط نفس المستوى — المنصة تقيّم كل طالب من أوله. الأفضل ترشحي أي عائلة مهتمة بتعليم الإنجليزي."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always reference specific data: session count, level, assessment scores — not general praise',
          '"سارة ما شاء الله حضرت 21 حصة بدون غياب والنتائج جدًا ممتازة بالتقرير."',
          'Tie the referral to the report: "واستناداً على هذا التقرير، أي عائلة مثلكم ستستفيد بنفس الطريقة."',
          'VIP framing for academic parents: "مقعدك VIP وبيعطيك 5 مقاعد مجانية"',
          'WhatsApp: "📊 هذا تقرير الأداء الخاص بالطالب [+ prize chart]"'
        ],
        items_ar:[
          'دائماً استشهد ببيانات محددة: عدد الحصص، المستوى، درجات التقييم — لا مديح عام',
          '"سارة ما شاء الله حضرت 21 حصة بدون غياب والنتائج جدًا ممتازة بالتقرير."',
          'اربط الريفيرال بالتقرير: "واستناداً على هذا التقرير، أي عائلة مثلكم ستستفيد بنفس الطريقة."',
          'إطار VIP لأولياء الأمور الأكاديميين: "مقعدك VIP وبيعطيك 5 مقاعد مجانية"',
          'واتساب: "📊 هذا تقرير الأداء الخاص بالطالب [+ جدول الجوائز]"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '📌 CM PERSONA: Academic style requires the CM to speak as an authority, not a friend. Tone: calm, measured, knowledgeable. Avoid over-praising or emotional language. Every statement should feel grounded in data or professional expertise.',
          '📌 ALAA\'S ACADEMIC SIGNATURE: (1) Establish technical authority through precise explanation of platform features. (2) VIP/scarcity framing — "مقاعد محدودة" — creates urgency without emotional pressure. (3) "مقعد VIP" as the primary referral hook — parent feels prestigious, not sold to. (4) Systematic step-by-step process for linking referrals — removes confusion.',
          '📌 KEY DISTINCTION from Friendly Style: Academic style parents need to UNDERSTAND before they FEEL. The CM must explain the referral mechanism clearly and logically before the emotional or financial hook is introduced. Reverse the order with these parents — facts first, feelings second.'
        ],
        items_ar:[
          '📌 شخصية الـ CM: الأسلوب الأكاديمي يتطلب أن يتحدث الـ CM بوصفه مرجعاً لا صديقاً. النبرة: هادئة، متأنية، متمكنة. تجنب المبالغة في الإطراء أو اللغة العاطفية. كل تصريح يجب أن يبدو مبنياً على بيانات أو خبرة مهنية.',
          '📌 بصمة Alaa الأكاديمية: (1) تأسيس السلطة التقنية من خلال الشرح الدقيق لمزايا المنصة. (2) إطار VIP/الشُح — "مقاعد محدودة" — يخلق الإلحاح دون ضغط عاطفي. (3) "مقعد VIP" كخطاف الريفيرال الأساسي — يشعر وليّ الأمر بالتميز لا بأنه يُباع له. (4) عملية منهجية خطوة بخطوة لربط الريفيرالات — تُزيل الارتباك.',
          '📌 الفرق الجوهري عن الأسلوب الودي: أولياء الأمور ذوو الأسلوب الأكاديمي يحتاجون إلى فهم قبل الشعور. يجب على الـ CM شرح آلية الريفيرال بوضوح ومنطقية قبل تقديم الخطاف العاطفي أو المالي. اعكس الترتيب مع هؤلاء الآباء — الحقائق أولاً، المشاعر ثانياً.'
        ]}
    ] },  { id:'sty-friendly', icon:'😊', group:'Know Your Customer', group_ar:'اعرف عميلك',
    title:'Friendly Communication Style', title_ar:'أسلوب التواصل الودي',
    color:'#0284C7', cl:'rgba(2,132,199,.15)', glow:'rgba(2,132,199,.2)',
    grad:'linear-gradient(135deg,#0284C7,#0369A1)',
    topics:['Casual Communication','Relationship-Building','Comfortable Conversation Flow','Engagement Indicators'],
    topics_ar:['التواصل غير الرسمي','بناء العلاقة','تدفق المحادثة المريح','مؤشرات التفاعل'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Build fast personal rapport that turns the customer into an active referral partner. Friendly CMs (Yara, Lubna, Sara) work as "friend + educational consultant" simultaneously — not as salespeople. The referral ask feels natural because the relationship feels real. Two sub-styles: (1) Gamification (Yara) — convert the referral system into a points/earnings game the customer wants to win. (2) Gift Framing (Lubna/Sara) — position the referral as something nice the customer is doing for a friend, with zero pressure.',
        text_ar:'بناء علاقة شخصية سريعة تحوّل العميل إلى شريك ريفيرال فعّال. يعمل الـ CM الودّيون (يارا، لبنى، سارة) بوصفهم "صديق + مستشار تعليمي" في آنٍ واحد — لا بائعين. يبدو طلب الريفيرال طبيعياً لأن العلاقة تبدو حقيقية. أسلوبان فرعيان: (1) التلعيب (يارا) — تحويل نظام الريفيرال إلى لعبة نقاط/أرباح يريد العميل الفوز بها. (2) إطار الهدية (لبنى/سارة) — تقديم الريفيرال بوصفه شيئاً لطيفاً يفعله العميل لصديق، دون أي ضغط.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Friendly-style customers respond to warmth and personal connection above all else. They refer because they like the CM personally, not primarily for the reward. Key psychological levers:\n\n• YARA model: Gamification triggers competitive participation — "إذا وصلتي 3 ريفيرالات بتاخذي الجائزة الكبيرة." The customer becomes a player in a game, not a passive recipient of a sales pitch.\n\n• LUBNA/SARA model: Emotional reciprocity — "أنت وصتيني على صاحبتك وهاد معناه إنك واثقة فينا." The gift framing removes guilt: "أنا رح أتواصل معهم وما رح أضغط عليهم أبدًا."',
        text_ar:'يستجيب عملاء الأسلوب الودّي للدفء والتواصل الشخصي فوق كل شيء. يُحيلون لأنهم يحبون الـ CM شخصياً، ليس بصورة رئيسية للمكافأة. الروافع النفسية الأساسية:\n\n• نموذج يارا: يُحفّز التلعيب المشاركة التنافسية — "إذا وصلتي 3 ريفيرالات بتاخذي الجائزة الكبيرة." يصبح العميل لاعباً في لعبة، لا متلقياً سلبياً لعرض بيع.\n\n• نموذج لبنى/سارة: المعاملة بالمثل العاطفية — "أنت وصتيني على صاحبتك وهاد معناه إنك واثقة فينا." يُزيل إطار الهدية الشعورَ بالذنب: "أنا رح أتواصل معهم وما رح أضغط عليهم أبدًا."' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer laughs, uses terms of endearment, or says "والله صوتك حلو" — rapport is already there',
          'When customer mentions a friend or family member by name during conversation',
          'After a warm personal exchange about children\'s progress — emotional peak moment',
          'When customer expresses satisfaction: "الله يوفقكم" or "إن شاء الله مفيدين"',
          'For Yara/Gamification: after confirming multiple children or premium plan — high reward potential',
          'For Lubna/Gift framing: any warm customer at any point — the softer the ask, the less timing matters'
        ],
        items_ar:[
          'عندما يضحك العميل أو يستخدم كلمات المحبة أو يقول "والله صوتك حلو" — الألفة موجودة بالفعل',
          'عندما يذكر العميل صديقاً أو فرداً من العائلة بالاسم خلال المحادثة',
          'بعد تبادل شخصي دافئ حول تقدم الأطفال — لحظة الذروة العاطفية',
          'عندما يُعبّر العميل عن الرضا: "الله يوفقكم" أو "إن شاء الله مفيدين"',
          'ليارا/التلعيب: بعد تأكيد أطفال متعددين أو خطة متميزة — إمكانية مكافأة عالية',
          'للبنى/إطار الهدية: أي عميل دافئ في أي وقت — كلما كان الطلب أكثر لطفاً، قلّت أهمية التوقيت'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Warm, expressive tone — "يا حبيبتي", "والله كلامك حلو", "بتحبي الكل"',
          'Socially active mother — mentions groups, school events, other parents she knows',
          'Mentions who referred her voluntarily — already trusts the referral chain',
          'Laughs and extends the conversation beyond business topics',
          'Uses WhatsApp voice messages and responds quickly — high social connectivity'
        ],
        items_ar:[
          'نبرة دافئة معبّرة — "يا حبيبتي"، "والله كلامك حلو"، "بتحبي الكل"',
          'أم نشطة اجتماعياً — تذكر مجموعات وفعاليات مدرسية وأولياء أمور آخرين تعرفهم',
          'تذكر من رشّحها طوعاً — تثق بالفعل في سلسلة الريفيرال',
          'تضحك وتمد المحادثة إلى ما وراء المواضيع التجارية',
          'تستخدم رسائل واتساب الصوتية وتردّ بسرعة — اتصالية اجتماعية عالية'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'YARA (Gamification) Flow:\nWarm greeting + personal compliment ⬅️ Understand student level ⬅️ Fix schedule ⬅️ "بدي أحكيلك عن نظام بسيط بتكسبي منه هدايا" ⬅️ Explain prize ladder (3 referrals = prize, 5 = iPad, etc.) ⬅️ Ask: "مين أول وحدة رح تفكري فيها؟" ⬅️ Get name/number ⬅️ WhatsApp follow-up\n\nLUBNA/SARA (Gift Framing) Flow:\nEmotional welcome ⬅️ Personal rapport building ⬅️ System walkthrough ⬅️ "بدي سؤال بسيط — في صاحبات عندهم أطفال يستفيدوا؟" ⬅️ Gift framing: "رح أتواصل معهم كهدية منك وما رح أضغط عليهم" ⬅️ Collect numbers ⬅️ WhatsApp link + voice message',
        text_ar:'تدفق يارا (التلعيب):\nتحية دافئة + مجاملة شخصية ⬅️ فهم مستوى الطالب ⬅️ تثبيت الجدول ⬅️ "بدي أحكيلك عن نظام بسيط بتكسبي منه هدايا" ⬅️ شرح سلّم الجوائز (3 ريفيرالات = جائزة، 5 = iPad، إلخ) ⬅️ الطلب: "مين أول وحدة رح تفكري فيها؟" ⬅️ الحصول على الاسم/الرقم ⬅️ متابعة واتساب\n\nتدفق لبنى/سارة (إطار الهدية):\nترحيب عاطفي ⬅️ بناء الألفة الشخصية ⬅️ جولة النظام ⬅️ "بدي سؤال بسيط — في صاحبات عندهم أطفال يستفيدوا؟" ⬅️ إطار الهدية: "رح أتواصل معهم كهدية منك وما رح أضغط عليهم" ⬅️ جمع الأرقام ⬅️ رابط واتساب + رسالة صوتية' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Pattern A (Yara) — "إذا سجلتي 3 أشخاص بتاخذي [جائزة]، وإذا وصلتي 5 بتاخذي الـ iPad — هاد اشبه نظام النقاط"',
          'Pattern B (Yara) — "مين أول وحدة في بالك دلوقتي؟" — immediately converts talk to action',
          'Pattern C (Lubna/Sara) — "أنا رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا"',
          'Pattern D (Sara) — "بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس" — peer comparison + compliment',
          'Pattern E (Sara) — "وخلي كل شيء بيني وبينك وأنا أتابع كل شيء" — removes all customer burden'
        ],
        items_ar:[
          'النمط أ (يارا) — "إذا سجلتي 3 أشخاص بتاخذي [جائزة]، وإذا وصلتي 5 بتاخذي الـ iPad — هاد اشبه نظام النقاط"',
          'النمط ب (يارا) — "مين أول وحدة في بالك دلوقتي؟" — يحوّل الكلام إلى فعل فوراً',
          'النمط ج (لبنى/سارة) — "أنا رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا"',
          'النمط د (سارة) — "بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس" — مقارنة الأقران + مجاملة',
          'النمط ه (سارة) — "وخلي كل شيء بيني وبينك وأنا أتابع كل شيء" — يُزيل كل عبء عن العميل'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Gamification openers (Yara):\n"بدي أحكيلك عن نظام بسيط بتكسبي منه هدايا وكاش باك."\n"إذا وصلتي 3 ريفيرالات بتاخذي الجائزة الصغيرة، وإذا وصلتي 5 بتاخذي الـ iPad."\n"مين أول وحدة في بالك دلوقتي؟"\n\nGift framing openers (Lubna/Sara):\n"في صاحبات عندهن أطفال يستفيدوا من المنصة؟"\n"رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا."\n"بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس."\n"ابعثيلي الأرقام وأنا أتابع معهم بنفسي — وما رح أذكر إنك وصيتيني عليهم."',
        text_ar:'مقدمات التلعيب (يارا):\n"بدي أحكيلك عن نظام بسيط بتكسبي منه هدايا وكاش باك."\n"إذا وصلتي 3 ريفيرالات بتاخذي الجائزة الصغيرة، وإذا وصلتي 5 بتاخذي الـ iPad."\n"مين أول وحدة في بالك دلوقتي؟"\n\nمقدمات إطار الهدية (لبنى/سارة):\n"في صاحبات عندهن أطفال يستفيدوا من المنصة؟"\n"رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا."\n"بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس."\n"ابعثيلي الأرقام وأنا أتابع معهم بنفسي — وما رح أذكر إنك وصيتيني عليهم."' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"ما بعرف إذا صاحبتي رح توافق."\n→ "ما محتاجة توافق هلق — بس ابعثيلي رقمها وأنا بتواصل معها بأسلوب لطيف."\n\n"خايفة يزعلوا مني."\n→ "بالعكس رح يشكروك — وأنا رح أشرح لهم بنفسي بدون أي ضغط."\n\n"ما عندي ناس هلق."\n→ "عادي — حتى لو بعدين لو فكرتي بأحد ابعثيلي وأنا موجودة."\n\nFor gamification objections:\n"كيف بعرف إذا الريفيرال اشتغل؟"\n→ "رح أبعثلك تأكيد فوري لما يسجل أي شخص من طرفك."',
        text_ar:'"ما بعرف إذا صاحبتي رح توافق."\n→ "ما محتاجة توافق هلق — بس ابعثيلي رقمها وأنا بتواصل معها بأسلوب لطيف."\n\n"خايفة يزعلوا مني."\n→ "بالعكس رح يشكروك — وأنا رح أشرح لهم بنفسي بدون أي ضغط."\n\n"ما عندي ناس هلق."\n→ "عادي — حتى لو بعدين لو فكرتي بأحد ابعثيلي وأنا موجودة."\n\nاعتراضات التلعيب:\n"كيف بعرف إذا الريفيرال اشتغل؟"\n→ "رح أبعثلك تأكيد فوري لما يسجل أي شخص من طرفك."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Use the customer\'s name or her child\'s name warmly throughout — makes conversation feel personal',
          'Yara: always end referral pitch with "مين أول وحدة في بالك؟" — makes it action-oriented',
          'Lubna/Sara: always reassure "ما رح أضغط عليهم أبدًا" — removes social risk for customer',
          'Send WhatsApp immediately after call with the referral link + voice message',
          'Sara closing: "يا عمري أي شيء تحتاجيه أنا موجودة" — leaves the door open always'
        ],
        items_ar:[
          'استخدم اسم العميلة أو اسم طفلها بدفء طوال المحادثة — يجعلها تشعر بالخصوصية',
          'يارا: دائماً اختم طرح الريفيرال بـ "مين أول وحدة في بالك؟" — يجعله موجّهاً بالفعل',
          'لبنى/سارة: دائماً طمئن "ما رح أضغط عليهم أبدًا" — يُزيل الخطر الاجتماعي عن العميلة',
          'أرسل واتساب مباشرة بعد المكالمة مع رابط الريفيرال + رسالة صوتية',
          'إغلاق سارة: "يا عمري أي شيء تحتاجيه أنا موجودة" — يُبقي الباب مفتوحاً دائماً'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — أستاذة سارة × أم محمد (Friendly — Approach 3):\n"يا عمري والله صوتك يخطف القلب..أم عبدالرحمن حدثتني عنكم كثير..رح نثبت الجدول من الأحد إلى الأربعاء الساعة 6..لما ما يلتزم الولد بالجدول الحصص بتروح..بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس..أي شخص يشترك من طرفك رح أضيف لك حصص مجانية..وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 Case 2 — أستاذة سارة × أم عبد الرحمن (Friendly — Approach 3):\n"يا حبيبتي يا أم عبدالرحمن كيف حالك..بنتك شاطرة وبدي أعطيها حصص مجانية..بدي سؤال بسيط — أي صاحباتك بدها أولادها يتحسنوا زي بنتك..ابعثيلي الأرقام وأنا أتابع معهم بنفسي..وما رح أذكر إنك وصيتيني عليهم."',
          '🛑 Yara Pattern (from per-CM profile):\n"تعتمد على Gamification — بتحول الريفيرال لنظام نقاط وأرباح..بتبدأ بتثبيت الجدول والالتزامات بسرعة..بعدها بتحول العميل لشريك في الريفيرال..بتقول: إذا وصلتي 3 بتاخذي [جائزة] وإذا وصلتي 5 بتاخذي iPad..بتسأل: مين أول وحدة في بالك دلوقتي؟"',
          '🛑 Lubna Pattern (from per-CM profile):\n"طلب الريفيرال بأسلوب هدية: رح أعطيهم إياها كهدية..تبدأ بسؤال عن أشخاص مهتمين مش بطلب مباشر..مخصصة للأمهات العاطفيات والناشطات اجتماعيًا..تقول: أنا راح أتواصل معهم وما راح أضغط عليهم أبدًا."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أستاذة سارة × أم محمد (الودّي — النهج 3):\n"يا عمري والله صوتك يخطف القلب..أم عبدالرحمن حدثتني عنكم كثير..رح نثبت الجدول من الأحد إلى الأربعاء الساعة 6..لما ما يلتزم الولد بالجدول الحصص بتروح..بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس..أي شخص يشترك من طرفك رح أضيف لك حصص مجانية..وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 الحالة 2 — أستاذة سارة × أم عبد الرحمن (الودّي — النهج 3):\n"يا حبيبتي يا أم عبدالرحمن كيف حالك..بنتك شاطرة وبدي أعطيها حصص مجانية..بدي سؤال بسيط — أي صاحباتك بدها أولادها يتحسنوا زي بنتك..ابعثيلي الأرقام وأنا أتابع معهم بنفسي..وما رح أذكر إنك وصيتيني عليهم."',
          '🛑 نمط يارا (من ملف الـ CM):\n"تعتمد على التلعيب — بتحول الريفيرال لنظام نقاط وأرباح..بتبدأ بتثبيت الجدول والالتزامات بسرعة..بعدها بتحول العميل لشريك في الريفيرال..بتقول: إذا وصلتي 3 بتاخذي [جائزة] وإذا وصلتي 5 بتاخذي iPad..بتسأل: مين أول وحدة في بالك دلوقتي؟"',
          '🛑 نمط لبنى (من ملف الـ CM):\n"طلب الريفيرال بأسلوب هدية: رح أعطيهم إياها كهدية..تبدأ بسؤال عن أشخاص مهتمين مش بطلب مباشر..مخصصة للأمهات العاطفيات والناشطات اجتماعيًا..تقول: أنا راح أتواصل معهم وما راح أضغط عليهم أبدًا."'
        ]}
    ] },

  { id:'req-direct', icon:'🎯', group:'The Conversation', group_ar:'المحادثة',
    title:'Direct Referral Request', title_ar:'طلب الريفيرال المباشر',
    color:'#DC2626', cl:'rgba(220,38,38,.15)', glow:'rgba(220,38,38,.2)',
    grad:'linear-gradient(135deg,#DC2626,#B91C1C)',
    topics:['Direct Request Timing','Customer Reaction Patterns','Confidence Indicators','Acceptance Signals'],
    topics_ar:['توقيت الطلب المباشر','أنماط تفاعل العميل','مؤشرات الثقة','إشارات القبول'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Ask for referrals explicitly and confidently — no soft framing, no hints. The direct ask works best when the customer is already satisfied and the CM has built enough trust. It puts the referral request on the table clearly: "عندك أي شخص تقدري ترشحيه لنا؟" Then immediately handle any objection from the standard table and close by collecting a name or number before ending the call.',
        text_ar:'اطلب الريفيرالات بصراحة وثقة — لا إطارات ناعمة، لا تلميحات. يُجدي الطلب المباشر أكثر عندما يكون العميل راضياً بالفعل وبنى الـ CM ثقةً كافية. يضع الطلب على الطاولة بوضوح: "عندك أي شخص تقدري ترشحيه لنا؟" ثم يعالج أي اعتراض فوراً من الجدول المعياري ويُغلق بجمع اسم أو رقم قبل انتهاء المكالمة.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Direct request works when the customer already feels positive about the product and the CM. A clear ask signals confidence and respect — it doesn\'t feel pushy when delivered at the right moment. Key psychological dynamic: customers often have someone in mind but don\'t volunteer the information. The direct ask unlocks what\'s already there. After the ask, objections are not refusals — they are stalling patterns with predictable responses. The CM who masters the 12-objection table can handle 95% of direct-ask scenarios.',
        text_ar:'يُجدي الطلب المباشر عندما يشعر العميل بالإيجابية تجاه المنتج والـ CM. يُشير الطلب الواضح إلى الثقة والاحترام — لا يبدو إلحاحاً عند تقديمه في اللحظة المناسبة. الديناميكية النفسية الأساسية: غالباً ما يكون في ذهن العملاء شخص ما لكنهم لا يتطوعون بالمعلومة. يفتح الطلب المباشر ما هو موجود بالفعل. بعد الطلب، الاعتراضات ليست رفضاً — هي أنماط تسويف بردود متوقعة. الـ CM الذي يُتقن جدول الاعتراضات الاثني عشر يستطيع التعامل مع 95% من سيناريوهات الطلب المباشر.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Immediately after the customer expresses satisfaction or gratitude about results',
          'When customer says "الله يوفقكم" or "إن شاء الله الأولاد يتحسنوا" — peak positive emotion',
          'After a renewal conversation — customer just committed again, trust is high',
          'During an upgrade call — customer is already in investment mode',
          'After resolving a complaint — recovery moment creates strong loyalty',
          'Alaa / Academic style: after explaining the VIP system or after creating scarcity around seats'
        ],
        items_ar:[
          'مباشرةً بعد أن يُعبّر العميل عن الرضا أو الامتنان على النتائج',
          'عندما يقول العميل "الله يوفقكم" أو "إن شاء الله الأولاد يتحسنوا" — ذروة المشاعر الإيجابية',
          'بعد محادثة التجديد — العميل التزم مجدداً للتوّ، الثقة عالية',
          'خلال مكالمة الترقية — العميل في وضعية الاستثمار بالفعل',
          'بعد حل شكوى — لحظة التعافي تخلق ولاءً قوياً',
          'Alaa / الأسلوب الأكاديمي: بعد شرح نظام VIP أو بعد خلق شُح حول المقاعد'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Customer mentions they\'ve told someone about the platform already — referral instinct is active',
          'Asks about the referral program on their own — ready for direct ask',
          'High satisfaction: mentions student progress, praises the teacher',
          'Has multiple children or high-value plan — motivated by real reward potential',
          'Quick, decisive tone in conversation — responds well to direct communication'
        ],
        items_ar:[
          'يذكر العميل أنه أخبر شخصاً عن المنصة مسبقاً — غريزة الريفيرال نشطة',
          'يسأل عن برنامج الريفيرال من تلقاء نفسه — مستعد للطلب المباشر',
          'رضا عالٍ: يذكر تقدم الطالب، يمدح المعلم',
          'لديه أطفال متعددون أو خطة ذات قيمة عالية — محفوز بإمكانية مكافأة حقيقية',
          'نبرة سريعة وحاسمة في المحادثة — يستجيب جيداً للتواصل المباشر'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'1. Open with satisfaction check: "كيف ماشي مع الأطفال؟"\n2. Acknowledge the positive feedback briefly\n3. Direct pivot: "عندك أي شخص تقدري ترشحيه لنا؟"\n4. Customer responds — handle with objection table if needed\n5. If soft objection → use specific response from the 12-table\n6. Collect name/number: "تمام، ابعثيلي الرقم وأنا أتولى الباقي"\n7. Close: "رح أبعثلك رابط البرنامج على الواتساب"',
        text_ar:'1. ابدأ بسؤال الرضا: "كيف ماشي مع الأطفال؟"\n2. اعترف بالتغذية الإيجابية بإيجاز\n3. التحوّل المباشر: "عندك أي شخص تقدري ترشحيه لنا؟"\n4. يستجيب العميل — تعامل مع جدول الاعتراضات إذا لزم\n5. إذا كان اعتراضاً ناعماً → استخدم الرد المحدد من الجدول الاثني عشر\n6. جمع الاسم/الرقم: "تمام، ابعثيلي الرقم وأنا أتولى الباقي"\n7. الإغلاق: "رح أبعثلك رابط البرنامج على الواتساب"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Direct opener: "عندك أي شخص تقدري ترشحيه؟" — simple, clean, respectful',
          'After objection: "عادي، حتى لو بعدين لو فكرتي بأحد أنا موجودة"',
          'Number close: "تمام، ابعثيلي الرقم وأنا أتولى كل شيء"',
          'Alaa variation: "المقاعد محدودة وعندي 3 مقاعد VIP بس — مين أول وحدة رح تفكري فيها؟"',
          'Reward anchor before ask: "لما تيجي 3 أشخاص من طرفك بتاخذي [جائزة] — عندك أحد في بالك؟"'
        ],
        items_ar:[
          'الافتتاح المباشر: "عندك أي شخص تقدري ترشحيه؟" — بسيط، نظيف، محترم',
          'بعد الاعتراض: "عادي، حتى لو بعدين لو فكرتي بأحد أنا موجودة"',
          'إغلاق الرقم: "تمام، ابعثيلي الرقم وأنا أتولى كل شيء"',
          'تنويع Alaa: "المقاعد محدودة وعندي 3 مقاعد VIP بس — مين أول وحدة رح تفكري فيها؟"',
          'مرساة المكافأة قبل الطلب: "لما تيجي 3 أشخاص من طرفك بتاخذي [جائزة] — عندك أحد في بالك؟"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'The 12 Common Objections with CM Responses:\n\n1. "عندي ناس بس ما بدهم يتصل فيهم أحد" → "عادي، نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول"\n\n2. "ما عندي ناس أرشحهم" → "عادي جدًا، حتى بالمستقبل لو في أي شخص مهتم ابعثيلي رقمه"\n\n3. "ما بعرف إذا رح يشتروا" → "هذا دورنا، نحنا اللي رح نشرح لهم ونأخذ قرارهم — مش محتاجة تضمني"\n\n4. "صاحبتي مو معها فلوس" → "في باقات بالتقسيط، خليني أشرح لهم الخيارات"\n\n5. "خايفة يزعلوا مني لو ما اشتروا" → "بالعكس لو ما اشتروا مش ذنبك، وأنا رح أعاملهم باحترام"\n\n6. "بدي أجرب الخدمة أول" → "صح تمامًا، لأنه لما تشوفي النتائج رح تصيري أقوى موصية"\n\n7. "رح أشوف وأرجعلك" → "خيرًا إن شاء الله، لو تذكرتي أحد في أي وقت أنا موجودة"\n\n8. "إذا الفلوس رجعت إليّ رح أرشح" → "الفلوس ما رح ترجعلك لكن رح تنضاف حصص مجانية على اشتراكك"\n\n9. "أنا ما عندي تأثير على الناس" → "مش لازم يشتروا لأنك أنت قلتيلهم — يكفي إنك تعطيني الرقم وأنا أتولى الباقي"\n\n10. "مو وقتها هلق" → "تمام، ابعثيلي أي رقم حتى لو بعد أسبوع ما في فرق"\n\n11. "ترشيحاتي اشتروا من قبل" → "حتى لو اشتروا قبل، لو عندهم أطفال ثانيين أو يجددوا بيحسب ريفيرال جديد"\n\n12. "خليني أحكي معهم وأرجعلك" → "تمام، وبعد ما تحكي معهم ابعثيلي رقمهم وأنا أكمل معهم"',
        text_ar:'الاعتراضات الاثنا عشر الشائعة مع ردود الـ CM:\n\n1. "عندي ناس بس ما بدهم يتصل فيهم أحد" → "عادي، نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول"\n\n2. "ما عندي ناس أرشحهم" → "عادي جدًا، حتى بالمستقبل لو في أي شخص مهتم ابعثيلي رقمه"\n\n3. "ما بعرف إذا رح يشتروا" → "هذا دورنا، نحنا اللي رح نشرح لهم ونأخذ قرارهم — مش محتاجة تضمني"\n\n4. "صاحبتي مو معها فلوس" → "في باقات بالتقسيط، خليني أشرح لهم الخيارات"\n\n5. "خايفة يزعلوا مني لو ما اشتروا" → "بالعكس لو ما اشتروا مش ذنبك، وأنا رح أعاملهم باحترام"\n\n6. "بدي أجرب الخدمة أول" → "صح تمامًا، لأنه لما تشوفي النتائج رح تصيري أقوى موصية"\n\n7. "رح أشوف وأرجعلك" → "خيرًا إن شاء الله، لو تذكرتي أحد في أي وقت أنا موجودة"\n\n8. "إذا الفلوس رجعت إليّ رح أرشح" → "الفلوس ما رح ترجعلك لكن رح تنضاف حصص مجانية على اشتراكك"\n\n9. "أنا ما عندي تأثير على الناس" → "مش لازم يشتروا لأنك أنت قلتيلهم — يكفي إنك تعطيني الرقم وأنا أتولى الباقي"\n\n10. "مو وقتها هلق" → "تمام، ابعثيلي أي رقم حتى لو بعد أسبوع ما في فرق"\n\n11. "ترشيحاتي اشتروا من قبل" → "حتى لو اشتروا قبل، لو عندهم أطفال ثانيين أو يجددوا بيحسب ريفيرال جديد"\n\n12. "خليني أحكي معهم وأرجعلك" → "تمام، وبعد ما تحكي معهم ابعثيلي رقمهم وأنا أكمل معهم"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Most objections after a direct ask are not real refusals — they are hesitation patterns. Signs of real resistance (stop pushing):\n• Customer repeats the same objection 3 times despite response\n• Customer says "لا، ما عندي أحد" with a flat, final tone\n• Customer sounds annoyed or rushes to end the call\n\nSigns of hesitation (keep going — use the table):\n• "رح أشوف" / "مو هلق" / "لما يكون معي وقت" — these are delays, not refusals\n• "خايفة" / "ما بعرف" — these are fears, not lack of names',
        text_ar:'معظم الاعتراضات بعد الطلب المباشر ليست رفضاً حقيقياً — هي أنماط تردد. علامات المقاومة الحقيقية (توقف عن الإلحاح):\n• يكرر العميل نفس الاعتراض 3 مرات رغم الرد\n• يقول العميل "لا، ما عندي أحد" بنبرة هادئة نهائية\n• يبدو العميل منزعجاً أو يسرع في إنهاء المكالمة\n\nعلامات التردد (استمر — استخدم الجدول):\n• "رح أشوف" / "مو هلق" / "لما يكون معي وقت" — هذه تأجيلات، لا رفض\n• "خايفة" / "ما بعرف" — هذه مخاوف، لا غياب أسماء' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Ask directly, once: "عندك أي شخص تقدري ترشحيه؟" — don\'t build up to it for 5 minutes',
          'After handling one objection, always close with an action: "ابعثيلي الرقم"',
          'Never argue with an objection — match it with its specific response from the table',
          'If no names given now, plant the seed: "أي وقت تفكري بأحد أنا موجودة"',
          'Alaa approach: add scarcity after the ask — "المقاعد بتخلص بسرعة"'
        ],
        items_ar:[
          'اطلب مباشرةً مرةً واحدة: "عندك أي شخص تقدري ترشحيه؟" — لا تبنِ له 5 دقائق',
          'بعد معالجة اعتراض واحد، أغلق دائماً بإجراء: "ابعثيلي الرقم"',
          'لا تجادل اعتراضاً أبداً — قابله بالرد المحدد من الجدول',
          'إذا لم تُعطَ أسماء الآن، ازرع البذرة: "أي وقت تفكري بأحد أنا موجودة"',
          'نهج Alaa: أضف الشُح بعد الطلب — "المقاعد بتخلص بسرعة"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Alaa Direct Ask Style (from per-CM profile):\n"بتبني سلطة ومصداقية أول ثم تطلب مباشرة..تقول: المقاعد محدودة وعندي 3 مقاعد VIP بس..مين أول وحدة رح تفكري فيها؟..تربط الطلب المباشر بالندرة والوقت المحدود."',
          '🛑 Objection handling in practice (from real calls):\nCustomer: "خايفة يزعلوا مني"\nCM: "بالعكس رح يشكروك لأنك فكرتي فيهم — وأنا ما رح أذكر إنك وصيتيني عليهم أصلًا"\nResult: Customer gave 2 numbers immediately.',
          '🛑 Direct ask after renewal (from renewal section):\n"دام إنك جددتي معنا، يعني رضاكِ عن المنصة واضح..عندك صاحبة أو قريبة ممكن تستفيد؟..ابعثيلي رقمها وأنا أتابع معها بأسلوبي."'
        ],
        items_ar:[
          '🛑 أسلوب Alaa المباشر في الطلب (من ملف الـ CM):\n"بتبني سلطة ومصداقية أول ثم تطلب مباشرة..تقول: المقاعد محدودة وعندي 3 مقاعد VIP بس..مين أول وحدة رح تفكري فيها؟..تربط الطلب المباشر بالندرة والوقت المحدود."',
          '🛑 التعامل مع الاعتراضات عملياً (من مكالمات حقيقية):\nالعميل: "خايفة يزعلوا مني"\nالـ CM: "بالعكس رح يشكروك لأنك فكرتي فيهم — وأنا ما رح أذكر إنك وصيتيني عليهم أصلًا"\nالنتيجة: أعطت العميلة رقمين فوراً.',
          '🛑 الطلب المباشر بعد التجديد (من قسم التجديد):\n"دام إنك جددتي معنا، يعني رضاكِ عن المنصة واضح..عندك صاحبة أو قريبة ممكن تستفيد؟..ابعثيلي رقمها وأنا أتابع معها بأسلوبي."'
        ]}
    ] },
  { id:'req-indirect', icon:'🌊', group:'The Conversation', group_ar:'المحادثة',
    title:'Indirect Referral Request', title_ar:'طلب الريفيرال غير المباشر',
    color:'#7C3AED', cl:'rgba(124,58,237,.15)', glow:'rgba(124,58,237,.2)',
    grad:'linear-gradient(135deg,#7C3AED,#6D28D9)',
    topics:['Soft Referral Positioning','Natural Conversation Flow','Indirect Engagement Indicators','Customer Comfort Level'],
    topics_ar:['طريقة الريفيرال اللطيفة','تدفق المحادثة الطبيعي','مؤشرات التفاعل غير المباشر','مستوى راحة العميل'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Plant the referral idea without directly asking. The indirect approach works by making the customer think of someone on their own — then stepping in to collect. Methods: (1) Gift framing — "أنا رح أعطيهم إياها كهدية منك." (2) Casual mention — "بالمناسبة عندنا برنامج بيكافئ أهالي اللي يرشحوا." (3) Social proof drop — "أم ريم سجلت 3 أشخاص الأسبوع اللي فات وكسبت iPad." No direct ask — let the customer fill the silence.',
        text_ar:'ازرع فكرة الريفيرال دون السؤال مباشرةً. يعمل النهج غير المباشر بجعل العميل يُفكّر في شخص ما من تلقاء نفسه — ثم تتدخل للجمع. الطرق: (1) إطار الهدية — "أنا رح أعطيهم إياها كهدية منك." (2) الذكر العابر — "بالمناسبة عندنا برنامج بيكافئ أهالي اللي يرشحوا." (3) إسقاط الإثبات الاجتماعي — "أم ريم سجلت 3 أشخاص الأسبوع اللي فات وكسبت iPad." لا طلب مباشر — دع العميل يملأ الصمت.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Indirect approach targets customers who feel uncomfortable with sales pressure. Key psychological dynamics:\n\n• GIFT FRAMING removes social risk — "you\'re doing a favour for your friend, not selling to her." The customer becomes a giver, not a recruiter.\n\n• SOCIAL PROOF triggers FOMO — when the customer hears that others are already benefiting from referrals, she wants the same. Drop specific numbers (iPad, $100 cashback) as passing mentions, not pitches.\n\n• SILENCE CLOSE — after planting the idea, stop talking and let the customer name someone. Most referrals happen when the CM stops pushing and creates space.',
        text_ar:'يستهدف النهج غير المباشر العملاء الذين يشعرون بعدم الارتياح من ضغط البيع. الديناميكيات النفسية الأساسية:\n\n• إطار الهدية يُزيل الخطر الاجتماعي — "أنت تُقدّم معروفاً لصديقتك، لا تبيعين لها." يصبح العميل مانحاً لا مُجنِّداً.\n\n• الإثبات الاجتماعي يُحفّز الخوف من الفوات — عندما يسمع العميل أن الآخرين يستفيدون من الريفيرالات بالفعل، يريد الأمر ذاته. أسقط أرقاماً محددة (iPad، كاشباك 100 دولار) كذكريات عابرة لا عروض ترويجية.\n\n• إغلاق الصمت — بعد زرع الفكرة، توقف عن الكلام ودع العميل يُسمّي شخصاً. معظم الريفيرالات تحدث عندما يتوقف الـ CM عن الدفع ويخلق مساحة.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer mentions a friend or family member naturally during the conversation',
          'When customer asks "كيف اشتركت صاحبتي؟" — open door to explain referral system naturally',
          'During a warm, flowing conversation — drop the referral mention casually, not as a transition',
          'After sharing a positive story about another student\'s progress — social proof moment',
          'For hesitant or private customers who shut down when they feel pushed'
        ],
        items_ar:[
          'عندما يذكر العميل صديقاً أو فرداً من العائلة بشكل طبيعي خلال المحادثة',
          'عندما يسأل العميل "كيف اشتركت صاحبتي؟" — باب مفتوح لشرح نظام الريفيرال طبيعياً',
          'خلال محادثة دافئة متدفقة — أسقط ذكر الريفيرال عرضاً لا كتحوّل',
          'بعد مشاركة قصة إيجابية عن تقدم طالب آخر — لحظة الإثبات الاجتماعي',
          'للعملاء المترددين أو المنغلقين الذين يتوقفون عندما يشعرون بالضغط'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Private, reserved tone — short answers, doesn\'t elaborate much',
          'Has said "ما بحب أزعج الناس" or "ما بحب أبيع" in any context',
          'Comes from a referral — already trusts the chain but may feel self-conscious about asking others',
          'Hesitates on direct asks but responds warmly to stories and examples',
          'High social network (mentioned friends, WhatsApp groups) but doesn\'t volunteer names'
        ],
        items_ar:[
          'نبرة خاصة ومنكفئة — إجابات قصيرة، لا يُفصّل كثيراً',
          'قال "ما بحب أزعج الناس" أو "ما بحب أبيع" في أي سياق',
          'جاء عن طريق ريفيرال — يثق بالسلسلة بالفعل لكن قد يشعر بعدم الارتياح من طلب الآخرين',
          'يتردد على الطلبات المباشرة لكن يستجيب بدفء للقصص والأمثلة',
          'شبكة اجتماعية واسعة (ذكر أصدقاء، مجموعات واتساب) لكنه لا يتطوع بالأسماء'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'GIFT FRAMING Flow (Lubna):\nBuild rapport ⬅️ Casual mention: "بالمناسبة في برنامج بيكافئ أهالي اللي يرشحوا" ⬅️ Tell a story: "أم فلانة رشحت صاحبتها وأخذت حصص مجانية" ⬅️ Soft opener: "في أحد بتعرفيه ممكن يستفيد؟" ⬅️ Gift close: "أنا رح أتواصل معهم وما رح أضغط عليهم — رح يكون منك كهدية" ⬅️ Collect number(s)\n\nSOCIAL PROOF Flow:\nMention another parent\'s referral win ⬅️ Pause ⬅️ "كتير أهالي بيستفيدوا منه" ⬅️ Let customer ask ⬅️ Explain simply ⬅️ "لو خطر على بالك أحد ابعثيلي"',
        text_ar:'تدفق إطار الهدية (لبنى):\nبناء الألفة ⬅️ ذكر عابر: "بالمناسبة في برنامج بيكافئ أهالي اللي يرشحوا" ⬅️ حكي قصة: "أم فلانة رشحت صاحبتها وأخذت حصص مجانية" ⬅️ افتتاح ناعم: "في أحد بتعرفيه ممكن يستفيد؟" ⬅️ إغلاق الهدية: "أنا رح أتواصل معهم وما رح أضغط عليهم — رح يكون منك كهدية" ⬅️ جمع الرقم/الأرقام\n\nتدفق الإثبات الاجتماعي:\nذكر فوز ريفيرال وليّ أمر آخر ⬅️ توقف ⬅️ "كتير أهالي بيستفيدوا منه" ⬅️ دع العميل يسأل ⬅️ اشرح ببساطة ⬅️ "لو خطر على بالك أحد ابعثيلي"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Gift opener (Lubna): "رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا"',
          'Social proof drop: "أم ريم الأسبوع اللي فات رشحت صاحبتها وأخذت [جائزة]"',
          'Soft question: "في أحد في بالك ممكن يستفيد زيكِ؟"',
          'Curiosity trigger: "بالمناسبة عندنا برنامج بيكافئ الأهالي اللي يرشحوا — سمعتي عنه؟"',
          'No-pressure close: "لو خطر على بالك أي أحد في أي وقت ابعثيلي رقمه"'
        ],
        items_ar:[
          'افتتاح الهدية (لبنى): "رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا"',
          'إسقاط الإثبات الاجتماعي: "أم ريم الأسبوع اللي فات رشحت صاحبتها وأخذت [جائزة]"',
          'السؤال الناعم: "في أحد في بالك ممكن يستفيد زيكِ؟"',
          'مُحفّز الفضول: "بالمناسبة عندنا برنامج بيكافئ الأهالي اللي يرشحوا — سمعتي عنه؟"',
          'إغلاق بلا ضغط: "لو خطر على بالك أي أحد في أي وقت ابعثيلي رقمه"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Indirect entry points:\n"أم [name] وصتني عليكم — هي بتستفيد من برنامج الترشيحات الآن." [Pause — see if customer asks]\n\n"كتير أهالي بيستفيدوا بحصص مجانية أو كاش باك لما يرشحوا صاحبة." [Pause]\n\n"لو في أي وقت في أحد بتعرفيه وعنده أطفال، أنا موجودة." [Plant and move on]\n\nWhen customer says "في عندي صاحبة...":\n→ Immediately: "ممتاز — عطيني رقمها وأنا أتابع معها وما رح أذكر إنك وصيتيني عليها."',
        text_ar:'نقاط دخول غير مباشرة:\n"أم [الاسم] وصتني عليكم — هي بتستفيد من برنامج الترشيحات الآن." [توقف — شاهد إذا كان العميل يسأل]\n\n"كتير أهالي بيستفيدوا بحصص مجانية أو كاش باك لما يرشحوا صاحبة." [توقف]\n\n"لو في أي وقت في أحد بتعرفيه وعنده أطفال، أنا موجودة." [ازرع وانتقل]\n\nعندما يقول العميل "في عندي صاحبة...":\n→ فوراً: "ممتاز — عطيني رقمها وأنا أتابع معها وما رح أذكر إنك وصيتيني عليها."' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Indirect approach rarely gets hard objections — but watch for these signals:\n\n"ما بحب أتدخل في أمور الناس" → Validate: "تمامًا، ما محتاجة تتدخلي — بس لو ذكرتيلي رقم أنا اللي أتابع بطريقتي"\n\n"أعطيهم الرقم بنفسي" → "ممتاز، وبالنسبة لك كاشباك أو حصص مجانية بتنضاف تلقائيًا لما يسجلوا"\n\nIf customer deflects and changes subject → Don\'t repeat. Say "تمام" and move on. Plant only once.',
        text_ar:'نادراً ما يواجه النهج غير المباشر اعتراضات صعبة — لكن راقب هذه الإشارات:\n\n"ما بحب أتدخل في أمور الناس" → صادق: "تمامًا، ما محتاجة تتدخلي — بس لو ذكرتيلي رقم أنا اللي أتابع بطريقتي"\n\n"أعطيهم الرقم بنفسي" → "ممتاز، وبالنسبة لك كاشباك أو حصص مجانية بتنضاف تلقائيًا لما يسجلوا"\n\nإذا أشاح العميل وغيّر الموضوع → لا تكرر. قل "تمام" وانتقل. ازرع مرةً واحدة فقط.' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Drop the referral mention naturally — never make it feel like you shifted gears',
          'Always use social proof with a specific name or reward amount — vague stories don\'t convert',
          'After planting the seed, go silent — let the customer respond. Don\'t fill the silence.',
          'Lubna style: always end with "ما رح أضغط عليهم أبدًا" — this is the highest-converting phrase for indirect',
          'Follow up on WhatsApp with a soft reminder, not a push: "لو خطر على بالك أحد أنا هون 🌸"'
        ],
        items_ar:[
          'أسقط ذكر الريفيرال بشكل طبيعي — لا تجعله يبدو كتحوّل مفاجئ في المحادثة',
          'استخدم دائماً إثباتاً اجتماعياً باسم محدد أو مبلغ مكافأة — القصص المبهمة لا تُحوَّل',
          'بعد زرع البذرة، اصمت — دع العميل يرد. لا تملأ الصمت.',
          'أسلوب لبنى: أنهِ دائماً بـ "ما رح أضغط عليهم أبدًا" — هذه أعلى عبارة تحويل للنهج غير المباشر',
          'تابع على واتساب بتذكير ناعم لا ضغط: "لو خطر على بالك أحد أنا هون 🌸"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Lubna Profile (from per-CM section):\n"طلب الريفيرال بأسلوب هدية: رح أعطيهم إياها كهدية..تبدأ بسؤال عن أشخاص مهتمين مش بطلب مباشر..مخصصة للأمهات العاطفيات والناشطات اجتماعيًا..تقول: أنا راح أتواصل معهم وما راح أضغط عليهم أبدًا..مخصصة للناشطات اجتماعيًا."',
          '🛑 Indirect → Direct Pivot (advanced technique):\nStart indirect: "بالمناسبة عندنا برنامج ترشيحات..."\nIf customer engages: "ممن تفكرين؟"\nIf customer volunteers a name: immediately go direct: "ممتاز — أعطيني رقمها هلق وأنا أتابع معها."\nThe indirect approach opens the door; the CM closes it with a direct action.',
          '🛑 Why indirect works for B-customer first calls:\n"Before payment, the customer doesn\'t know us yet. Dropping a soft referral mention during the booking conversation (without pressure) makes her think of someone by the time she\'s paid — so the first-call referral ask lands on already-warm ground."'
        ],
        items_ar:[
          '🛑 ملف لبنى (من قسم الـ CM):\n"طلب الريفيرال بأسلوب هدية: رح أعطيهم إياها كهدية..تبدأ بسؤال عن أشخاص مهتمين مش بطلب مباشر..مخصصة للأمهات العاطفيات والناشطات اجتماعيًا..تقول: أنا راح أتواصل معهم وما راح أضغط عليهم أبدًا..مخصصة للناشطات اجتماعيًا."',
          '🛑 التحوّل من غير المباشر إلى المباشر (تقنية متقدمة):\nابدأ غير مباشر: "بالمناسبة عندنا برنامج ترشيحات..."\nإذا تفاعل العميل: "ممن تفكرين؟"\nإذا تطوع العميل باسم: انتقل مباشرةً فوراً: "ممتاز — أعطيني رقمها هلق وأنا أتابع معها."\nالنهج غير المباشر يفتح الباب؛ الـ CM يُغلقه بإجراء مباشر.',
          '🛑 لماذا يُجدي غير المباشر في مكالمات العميل الأول (B-customer):\n"قبل الدفع، العميل لم يعرفنا بعد. إسقاط ذكر ريفيرال ناعم خلال محادثة الحجز (دون ضغط) يجعلها تُفكّر في شخص ما بحلول وقت الدفع — فيصل طلب الريفيرال في المكالمة الأولى على أرضية دافئة بالفعل."'
        ]}
    ] },

  { id:'flt-leads', icon:'🔍', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'Helping Customers Filter Leads', title_ar:'مساعدة العملاء في تصفية العملاء المحتملين',
    color:'#0891B2', cl:'rgba(8,145,178,.15)', glow:'rgba(8,145,178,.2)',
    grad:'linear-gradient(135deg,#0891B2,#0E7490)',
    topics:['Potential Customer Identification','Customer Network Exploration','Referral Quality Indicators','Potential Lead Categories','Customer Recommendation Confidence'],
    topics_ar:['تحديد العملاء المحتملين','استكشاف شبكة العميل','مؤشرات جودة الريفيرال','فئات العملاء المحتملين','ثقة العميل في التوصية'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Help the customer pre-filter their network before giving out any numbers. The CM\'s goal is NOT to collect as many referrals as possible — it\'s to collect QUALITY referrals. The "A handling referrals" strategy: the customer talks to their contact first, confirms interest, then passes the number. This protects: (1) the customer\'s social relationships, (2) the CM\'s time, and (3) the referral conversion rate. One warm qualified lead beats 10 cold numbers.',
        text_ar:'ساعد العميل على التصفية المسبقة لشبكته قبل إعطاء أي أرقام. هدف الـ CM ليس جمع أكبر عدد من الريفيرالات — بل جمع ريفيرالات عالية الجودة. استراتيجية "أ يتعامل مع الريفيرالات": يتحدث العميل مع جهة اتصاله أولاً، يُؤكد الاهتمام، ثم يمرر الرقم. هذا يحمي: (1) علاقات العميل الاجتماعية، (2) وقت الـ CM، (3) معدل تحويل الريفيرال. ليد واحد دافئ مؤهل يتفوق على 10 أرقام باردة.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Customers hesitate to give referrals because they fear: (a) their friend will be annoyed, (b) their friend won\'t buy and they\'ll feel embarrassed, (c) they\'ll seem like they\'re "selling" to their network.\n\nThe filtering framework resolves all three fears:\n• (a) "نحنا ما رح نتصل إلا بعد ما تحكي معهم أنت" — removes cold-call fear\n• (b) "مش محتاجة تضمني" — removes conversion pressure\n• (c) "أنت مش بتبيعي — بتنصحي" — reframes from selling to advising\n\nThis pre-filtering conversation actually INCREASES referral rates because it removes the main blockers.',
        text_ar:'يتردد العملاء في إعطاء الريفيرالات خوفاً من: (أ) أن يتضايق صديقهم، (ب) أن لا يشتري صديقهم ويشعروا بالإحراج، (ج) أن يبدوا وكأنهم "يبيعون" لشبكتهم.\n\nإطار التصفية يحل المخاوف الثلاثة:\n• (أ) "نحنا ما رح نتصل إلا بعد ما تحكي معهم أنت" — يُزيل خوف المكالمة الباردة\n• (ب) "مش محتاجة تضمني" — يُزيل ضغط التحويل\n• (ج) "أنت مش بتبيعي — بتنصحي" — يُعيد الإطار من البيع إلى الإرشاد\n\nمحادثة التصفية المسبقة هذه تزيد فعلياً من معدلات الريفيرال لأنها تُزيل أبرز العوائق.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer says "عندي ناس بس خايفة أزعجهم" — directly pivot to the filtering framework',
          'When customer gives a number but seems hesitant — ask: "هل حكيتي معها قبل؟"',
          'After explaining the referral program — before customer commits, help her think through her network',
          'During network exploration: "مين من اللي تعرفيهم عندهم أطفال بعمر مناسب؟"'
        ],
        items_ar:[
          'عندما يقول العميل "عندي ناس بس خايفة أزعجهم" — انتقل مباشرةً إلى إطار التصفية',
          'عندما يعطي العميل رقماً لكنه يبدو مترددًا — اسأل: "هل حكيتي معها قبل؟"',
          'بعد شرح برنامج الريفيرال — قبل أن يلتزم العميل، ساعده على التفكير في شبكته',
          'خلال استكشاف الشبكة: "مين من اللي تعرفيهم عندهم أطفال بعمر مناسب؟"'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          '"عندي ناس بس ما بدهم يتصل فيهم أحد" — this IS a lead, just needs filtering framework first',
          '"ما بعرف إذا رح يشتروا" — customer has someone in mind but needs reassurance about conversion',
          '"خايفة يزعلوا مني" — strong social anxiety, needs "you talk first" protocol',
          'Customer mentions specific names or contexts (school group, family, neighbours) — active network'
        ],
        items_ar:[
          '"عندي ناس بس ما بدهم يتصل فيهم أحد" — هذا ليد فعلاً، يحتاج فقط إطار التصفية أولاً',
          '"ما بعرف إذا رح يشتروا" — العميل لديه شخص في باله لكن يحتاج طمأنة بشأن التحويل',
          '"خايفة يزعلوا مني" — قلق اجتماعي قوي، يحتاج بروتوكول "أنتِ تتحدثين أولاً"',
          'يذكر العميل أسماء محددة أو سياقات (مجموعة المدرسة، العائلة، الجيران) — شبكة نشطة'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'PRE-FILTERING Protocol:\n1. Customer says "عندي ناس"\n2. CM: "ممتاز — نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول"\n3. Network exploration: "مين من اللي تعرفيهم عندهم أطفال؟"\n4. Customer names someone\n5. Qualification check: "وهي مهتمة بالتعليم الإلكتروني عمومًا؟"\n6. If yes → "ممتاز، حكي معها أول وخبريها إنك استفدتِ — وبعدين أعطيني رقمها"\n7. If unsure → "تمام، لما تتأكدي ابعثيلي"\n\nQUALITY CONTROL Logic:\n→ Customer pre-screens → Confirms interest → Gives number → CM calls confirmed lead',
        text_ar:'بروتوكول التصفية المسبقة:\n1. يقول العميل "عندي ناس"\n2. الـ CM: "ممتاز — نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول"\n3. استكشاف الشبكة: "مين من اللي تعرفيهم عندهم أطفال؟"\n4. يُسمّي العميل شخصاً\n5. فحص التأهيل: "وهي مهتمة بالتعليم الإلكتروني عمومًا؟"\n6. إذا نعم → "ممتاز، حكي معها أول وخبريها إنك استفدتِ — وبعدين أعطيني رقمها"\n7. إذا غير متأكدة → "تمام، لما تتأكدي ابعثيلي"\n\nمنطق مراقبة الجودة:\n→ العميل يُصفّي مسبقاً → يُؤكد الاهتمام → يعطي الرقم → الـ CM يتصل بالليد المؤكد' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          '"نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول" — most important phrase in filtering',
          '"مش محتاجة تضمني — أنا اللي رح أشرح وآخذ قرارهم"',
          '"أنتِ مش بتبيعي لهم — بتنصحيهم زي ما نصحك أحد"',
          'Network exploration: "مين من اللي تعرفيهم عندهم أطفال بين 6 و15 سنة؟"',
          'Quality filter: "وهي مهتمة بتطوير الأطفال عمومًا؟ أو جربت أي منصة تعليمية قبل؟"'
        ],
        items_ar:[
          '"نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول" — أهم عبارة في التصفية',
          '"مش محتاجة تضمني — أنا اللي رح أشرح وآخذ قرارهم"',
          '"أنتِ مش بتبيعي لهم — بتنصحيهم زي ما نصحك أحد"',
          'استكشاف الشبكة: "مين من اللي تعرفيهم عندهم أطفال بين 6 و15 سنة؟"',
          'فلتر الجودة: "وهي مهتمة بتطوير الأطفال عمومًا؟ أو جربت أي منصة تعليمية قبل؟"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Lead quality categories (from best to worst):\n\n★★★ TOP — Customer has spoken to the person, person is interested and expecting a call\n★★☆ GOOD — Customer knows person has children in the right age range and is open to education tech\n★☆☆ WEAK — Customer is giving numbers without any prior conversation\n✗ SKIP — Customer is giving numbers of people who don\'t have children or have shown disinterest before\n\nFiltering questions to ask the customer:\n"هل حكيتي معها قبل عن المنصة؟"\n"عندها أطفال بعمر كم؟"\n"هي مهتمة بالتعليم الإلكتروني عمومًا؟"\n"هل سبق جربت أي منصة مشابهة؟"',
        text_ar:'فئات جودة الليد (من الأفضل إلى الأسوأ):\n\n★★★ ممتاز — العميل تحدث مع الشخص، الشخص مهتم ومنتظر المكالمة\n★★☆ جيد — العميل يعرف أن الشخص لديه أطفال في النطاق العمري المناسب ومنفتح على التعليم الإلكتروني\n★☆☆ ضعيف — العميل يعطي أرقاماً دون أي محادثة مسبقة\n✗ تجاهل — العميل يعطي أرقام أشخاص ليس لديهم أطفال أو أبدوا عدم اهتمام سابقاً\n\nأسئلة التصفية لسؤال العميل:\n"هل حكيتي معها قبل عن المنصة؟"\n"عندها أطفال بعمر كم؟"\n"هي مهتمة بالتعليم الإلكتروني عمومًا؟"\n"هل سبق جربت أي منصة مشابهة؟"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Signs of low-quality leads to gently redirect:\n• Customer gives numbers of adults without children\n• Customer gives numbers of people who "might be interested" with zero context\n• Customer is clearly listing contacts from their phone without any personal connection\n\nHow to redirect without discouraging:\n"شكرًا كتير — بس قبل ما أتواصل معهم، سؤال بسيط: عندهم أطفال؟"\n"هل حكيتي مع أي وحدة منهم قبل؟ بدي أتواصل بس مع اللي تعرفيهم شخصيًا تجنبًا للإزعاج."',
        text_ar:'علامات الليدز منخفضة الجودة التي تحتاج إعادة توجيه لطيفة:\n• العميل يعطي أرقام بالغين ليس لديهم أطفال\n• العميل يعطي أرقام أشخاص "قد يكونون مهتمين" دون أي سياق\n• العميل يُدرج جهات اتصال من هاتفه بوضوح دون أي علاقة شخصية\n\nكيفية إعادة التوجيه دون تثبيط:\n"شكرًا كتير — بس قبل ما أتواصل معهم، سؤال بسيط: عندهم أطفال؟"\n"هل حكيتي مع أي وحدة منهم قبل؟ بدي أتواصل بس مع اللي تعرفيهم شخصيًا تجنبًا للإزعاج."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always confirm: "هل حكيتي معها قبل؟" before accepting any number',
          'Encourage pre-talk: "حكي معها أول وخبريها إنك استفدتِ — وبعدين أعطيني رقمها"',
          'Frame quality as respect: "بدنا نحترم وقتهم وما نزعجهم بدون ما يكونوا مهتمين"',
          'Accept weak leads gracefully: "شكرًا — رح نتواصل معهم بأسلوب محترم"',
          'Follow up: "لما تحكي مع صاحبتك أرسليلي رقمها وأنا أتابع"'
        ],
        items_ar:[
          'دائماً تأكد: "هل حكيتي معها قبل؟" قبل قبول أي رقم',
          'شجّع على الحديث المسبق: "حكي معها أول وخبريها إنك استفدتِ — وبعدين أعطيني رقمها"',
          'قدّم الجودة على أنها احترام: "بدنا نحترم وقتهم وما نزعجهم بدون ما يكونوا مهتمين"',
          'اقبل الليدز الضعيفة بلطف: "شكرًا — رح نتواصل معهم بأسلوب محترم"',
          'تابع: "لما تحكي مع صاحبتك أرسليلي رقمها وأنا أتابع"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 "A handling referrals" strategy (from source content):\n"الاستراتيجية: العميل يتكلم مع المرجح أولاً قبل أن يعطي الرقم للـ CM..الفلسفة: الريفيرال الجيد أفضل من 10 ريفيرالات رديئة..نظام جودة التحكم: CM only contacts after pre-qualification."',
          '🛑 Why pre-filtering improves conversion:\nA filtered lead who heard about the platform from someone they trust converts at 3-4x the rate of a cold number. The extra step of asking the customer to talk first costs 1 day but saves 10 dead calls.',
          '🛑 Alaa\'s filtering method (from per-CM profile):\n"بتطلب من العميل يحكي مع صاحبته أول قبل ما تعطيها الرقم..بتقول: ما رح أتصل بأي أحد إلا لما تحكي معهم أنتِ..هاد بيحمي علاقتها الاجتماعية ويضمن جودة الريفيرال."'
        ],
        items_ar:[
          '🛑 استراتيجية "أ يتعامل مع الريفيرالات" (من المحتوى المصدري):\n"الاستراتيجية: العميل يتكلم مع المرجح أولاً قبل أن يعطي الرقم للـ CM..الفلسفة: الريفيرال الجيد أفضل من 10 ريفيرالات رديئة..نظام مراقبة الجودة: الـ CM يتصل فقط بعد التأهيل المسبق."',
          '🛑 لماذا تُحسّن التصفية المسبقة معدل التحويل:\nليد مصفّى سمع عن المنصة من شخص يثق به يتحول بمعدل 3-4 أضعاف مقارنة بالرقم البارد. الخطوة الإضافية لطلب الحديث المسبق تكلف يوماً واحداً لكنها توفر 10 مكالمات فاشلة.',
          '🛑 طريقة Alaa في التصفية (من ملف الـ CM):\n"بتطلب من العميل يحكي مع صاحبته أول قبل ما تعطيها الرقم..بتقول: ما رح أتصل بأي أحد إلا لما تحكي معهم أنتِ..هاد بيحمي علاقتها الاجتماعية ويضمن جودة الريفيرال."'
        ]}
    ] },
  { id:'flt-talk', icon:'💬', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'Helping Customers Talk to Referrals', title_ar:'مساعدة العملاء على التحدث مع الإحالات',
    color:'#059669', cl:'rgba(5,150,105,.15)', glow:'rgba(5,150,105,.2)',
    grad:'linear-gradient(135deg,#059669,#047857)',
    topics:['Communication Willingness','Referral Preparation Indicators','Trust Transfer','Recommendation Confidence'],
    topics_ar:['الاستعداد للتواصل','مؤشرات التحضير للريفيرال','نقل الثقة','ثقة التوصية'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Give the customer the exact words to say when they talk to their referred friend. The customer\'s biggest fear is not knowing what to say or accidentally sounding like a salesperson. Solve this by providing a ready-made mini-script: simple, natural, and positioned as sharing a personal experience rather than selling. The CM also offers to take over completely after the first mention — removing all pressure from the customer.',
        text_ar:'أعطِ العميل الكلمات الحرفية ليقولها عند التحدث مع صديقه المُحال. أكبر مخاوف العميل هو عدم معرفة ما يقول أو أن يبدو عرضاً بالخطأ. حلّ هذا بتقديم سكريبت صغير جاهز: بسيط، طبيعي، ومُقدَّم بوصفه مشاركة تجربة شخصية لا بيعاً. يعرض الـ CM أيضاً تولّي كل شيء بعد الإشارة الأولى — إزالة كل ضغط عن العميل.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Customers who have names in mind but won\'t share them are usually blocked by one thing: they don\'t know WHAT to say to their friend. They imagine an awkward sales pitch they\'d have to deliver. The solution is to reframe the customer\'s role entirely:\n\n• "أنتِ مش لازم تبيعي — بس قولي: جربت المنصة وأطفالي استفادوا. يلّا أنا مررت الباقي عليهم."\n\nOnce the customer has a script, the hesitation disappears. The CM becomes the closer; the customer is just the warm introduction.',
        text_ar:'العملاء الذين لديهم أسماء في أذهانهم لكنهم لا يشاركونها محجوبون عادةً بشيء واحد: لا يعرفون ما يقولونه لصديقهم. يتخيلون عرض بيع محرجاً عليهم تقديمه. الحل هو إعادة إطار دور العميل بالكامل:\n\n• "أنتِ مش لازم تبيعي — بس قولي: جربت المنصة وأطفالي استفادوا. يلّا أنا مررت الباقي عليهم."\n\nبمجرد أن يكون لدى العميل سكريبت، يختفي التردد. يصبح الـ CM هو المُغلِق؛ والعميل مجرد المقدّمة الدافئة.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'After the customer says "بس ما بعرف شو أقولها" — this is the exact moment to provide the script',
          'When customer has confirmed names but won\'t give numbers yet',
          'When customer says "خليني أحكي معها وأرجعلك" — help her with what to say now',
          'During WhatsApp follow-up: send a ready message she can forward to her friend'
        ],
        items_ar:[
          'عندما يقول العميل "بس ما بعرف شو أقولها" — هذه اللحظة بالذات لتقديم السكريبت',
          'عندما يؤكد العميل أسماءً لكنه لا يعطي أرقاماً بعد',
          'عندما يقول العميل "خليني أحكي معها وأرجعلك" — ساعده بما يقوله الآن',
          'خلال متابعة واتساب: أرسل رسالة جاهزة يمكنه إعادة توجيهها لصديقه'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          '"بس ما بعرف شو أقولها" — blocked by script, not willingness',
          '"خايفة أبدو إني بتبيع" — social image concern, needs the "sharing experience" reframe',
          'Has specific names but hesitates to give numbers until she talks to them first',
          'Responds well to "أنتِ مش لازم تبيعي" — confirms this was the main blocker'
        ],
        items_ar:[
          '"بس ما بعرف شو أقولها" — محجوب بالسكريبت، لا بالاستعداد',
          '"خايفة أبدو إني بتبيع" — قلق الصورة الاجتماعية، يحتاج إعادة إطار "مشاركة التجربة"',
          'لديه أسماء محددة لكن يتردد في إعطاء الأرقام حتى يتحدث إليهم أولاً',
          'يستجيب جيداً لـ "أنتِ مش لازم تبيعي" — يُؤكد أن هذا كان العائق الرئيسي'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'SCRIPT PROVISION Flow:\n1. Customer: "خليني أحكي معها وأرجعلك"\n2. CM: "تمام — وعشان تكوني مرتاحة، رح أعطيك جملة بسيطة تقوليها لها"\n3. Provide script: "قوليلها: جربت نظام تعليمي حلو لأطفالي واستفادوا كتير — عندي شخص من الفريق بدو يشرح عليكِ."\n4. Reassure: "بس هيك، وأنا أتابع الباقي معها"\n5. Or offer WhatsApp forward: "أو أبعثلك رسالة جاهزة على الواتساب ترسليها لها عينكِ"\n6. Collect number OR schedule follow-up',
        text_ar:'تدفق تقديم السكريبت:\n1. العميل: "خليني أحكي معها وأرجعلك"\n2. الـ CM: "تمام — وعشان تكوني مرتاحة، رح أعطيك جملة بسيطة تقوليها لها"\n3. تقديم السكريبت: "قوليلها: جربت نظام تعليمي حلو لأطفالي واستفادوا كتير — عندي شخص من الفريق بدو يشرح عليكِ."\n4. طمأنة: "بس هيك، وأنا أتابع الباقي معها"\n5. أو عرض إعادة التوجيه عبر واتساب: "أو أبعثلك رسالة جاهزة على الواتساب ترسليها لها عينكِ"\n6. جمع الرقم أو جدولة المتابعة' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          '"أنتِ مش لازم تبيعي — بس قولي إنك استفدتِ وأنا أتابع الباقي"',
          'Ready script for customer: "قوليلها: عندي حدا بدو يشرح عليكِ نظام تعليمي استفدنا منه كتير"',
          '"أو أبعثلك رسالة جاهزة على الواتساب ترسليها لها"',
          '"لازم بس يكون منك — لأنها بتثق فيكِ أكتر منها بتثق فينا"',
          'After she talks: "لما تحكي معها ابعثيلي الرقم وأنا أكمل من هون"'
        ],
        items_ar:[
          '"أنتِ مش لازم تبيعي — بس قولي إنك استفدتِ وأنا أتابع الباقي"',
          'سكريبت جاهز للعميل: "قوليلها: عندي حدا بدو يشرح عليكِ نظام تعليمي استفدنا منه كتير"',
          '"أو أبعثلك رسالة جاهزة على الواتساب ترسليها لها"',
          '"لازم بس يكون منك — لأنها بتثق فيكِ أكتر منها بتثق فينا"',
          'بعد أن تتحدث: "لما تحكي معها ابعثيلي الرقم وأنا أكمل من هون"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Ready scripts to give the customer:\n\nSCRIPT 1 (casual):\n"قولي لصاحبتك: جربت منصة تعليمية وأطفالي استفادوا كتير — في شخص من الفريق بدو يشرح عليكِ بدون أي التزام."\n\nSCRIPT 2 (with reward mention):\n"قولي لها: عندي رابط تسجيل وبتاخذي جلسة تجريبية مجانية — لو ما عجبكِ ما في شيء."\n\nSCRIPT 3 (WhatsApp forward message — CM sends to customer to forward):\n"هاي [الاسم] 🌸 كنت بدي أشاركك شيء استفدت منه — منصة تعليمية لأطفالنا. عندهم تجربة مجانية لو بدك تعرفي أكتر. رقم الأستاذة: [CM number]"\n\nSCRIPT 4 (for hesitant friend introduction):\n"قولي: صاحبتي رح تتصل فيكِ من شركة تعليمية — قبلتِ تسمعيها بس."',
        text_ar:'سكريبتات جاهزة لإعطاء العميل:\n\nالسكريبت 1 (عابر):\n"قولي لصاحبتك: جربت منصة تعليمية وأطفالي استفادوا كتير — في شخص من الفريق بدو يشرح عليكِ بدون أي التزام."\n\nالسكريبت 2 (مع ذكر المكافأة):\n"قولي لها: عندي رابط تسجيل وبتاخذي جلسة تجريبية مجانية — لو ما عجبكِ ما في شيء."\n\nالسكريبت 3 (رسالة واتساب لإعادة التوجيه — الـ CM يرسلها للعميل ليعيد توجيهها):\n"هاي [الاسم] 🌸 كنت بدي أشاركك شيء استفدت منه — منصة تعليمية لأطفالنا. عندهم تجربة مجانية لو بدك تعرفي أكتر. رقم الأستاذة: [رقم الـ CM]"\n\nالسكريبت 4 (لتقديم الصديق المتردد):\n"قولي: صاحبتي رح تتصل فيكِ من شركة تعليمية — قبلتِ تسمعيها بس."' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"بدها تشوف الأسعار أول" → "عادي، ابعثيلي رقمها وأنا رح أشرح لها الأسعار والخيارات."\n\n"ما بدها تلزم حالها" → "ما في أي التزام — بس تسمع. وأنا رح أشرح بكل هدوء."\n\n"ما بدها يتصلوا فيها" → "تمام — إذا بدك ارسليلها على الواتساب بدل ما أتصل."',
        text_ar:'"بدها تشوف الأسعار أول" → "عادي، ابعثيلي رقمها وأنا رح أشرح لها الأسعار والخيارات."\n\n"ما بدها تلزم حالها" → "ما في أي التزام — بس تسمع. وأنا رح أشرح بكل هدوء."\n\n"ما بدها يتصلوا فيها" → "تمام — إذا بدك ارسليلها على الواتساب بدل ما أتصل."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always offer a ready script — don\'t assume the customer knows what to say',
          'Offer the WhatsApp forward alternative — some customers prefer text over verbal intro',
          'Emphasize: "أنتِ مش لازم تبيعي" — this unlocks most hesitation',
          'After script is given: "لما تحكي معها ابعثيلي وأنا أتولى الباقي" — clear next step',
          'Send WhatsApp immediately with the ready-to-forward message so the customer can act now'
        ],
        items_ar:[
          'دائماً قدّم سكريبتاً جاهزاً — لا تفترض أن العميل يعرف ما يقول',
          'قدّم بديل إعادة التوجيه عبر واتساب — بعض العملاء يفضلون النص على التقديم الشفهي',
          'أكّد: "أنتِ مش لازم تبيعي" — هذا يفتح معظم التردد',
          'بعد تقديم السكريبت: "لما تحكي معها ابعثيلي وأنا أتولى الباقي" — خطوة تالية واضحة',
          'أرسل واتساب فوراً مع الرسالة الجاهزة للتوجيه حتى يتمكن العميل من التصرف الآن'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Pattern from B-customer pre-payment calls:\n"بعد ما تحجزي جلسة البنت أو الولد..في موضوع بسيط..عندك صاحبة أو أخت أطفالها بنفس العمر؟..لما تحكي معها قولي إنك حجزتي وعندها نفس الفرصة..ابعثيلي رقمها وأنا أتابع معها."',
          '🛑 Sara\'s approach to scripting the customer:\n"ما رح أذكر إنك وصيتيني عليها" — this phrase protects the customer\'s image and is what makes the Sara style so high-converting for indirect/talk approaches.',
          '🛑 WhatsApp-first option:\nFor customers who are too shy to talk in person, offer to send a beautiful WhatsApp message they can forward. This covers the gap between "she said she\'ll talk" and "she actually talks."'
        ],
        items_ar:[
          '🛑 نمط من مكالمات العميل الأول (B-customer) قبل الدفع:\n"بعد ما تحجزي جلسة البنت أو الولد..في موضوع بسيط..عندك صاحبة أو أخت أطفالها بنفس العمر؟..لما تحكي معها قولي إنك حجزتي وعندها نفس الفرصة..ابعثيلي رقمها وأنا أتابع معها."',
          '🛑 نهج سارة في تزويد العميل بالسكريبت:\n"ما رح أذكر إنك وصيتيني عليها" — هذه العبارة تحمي صورة العميل وهي ما يجعل أسلوب سارة عالي التحويل جداً في النهج غير المباشر/التحدث.',
          '🛑 خيار واتساب أولاً:\nللعملاء الخجولين جداً من التحدث شخصياً، عرض إرسال رسالة واتساب جميلة يمكنهم إعادة توجيهها. هذا يسدّ الفجوة بين "قالت ستتحدث" و"تتحدث فعلاً."'
        ]}
    ] },
  { id:'flt-get', icon:'🎣', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'Getting Potential Customers', title_ar:'الحصول على العملاء المحتملين',
    color:'#D97706', cl:'rgba(217,119,6,.15)', glow:'rgba(217,119,6,.2)',
    grad:'linear-gradient(135deg,#D97706,#B45309)',
    topics:['Potential Lead Indicators','Interest Level Signs','Customer Matching','Referral Quality Analysis'],
    topics_ar:['مؤشرات العملاء المحتملين','علامات مستوى الاهتمام','مطابقة العميل','تحليل جودة الريفيرال'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Identify the right potential customers from inside the existing client\'s network. The CM\'s role here is to help the customer think clearly about who in their life would genuinely benefit — not just anyone they know. Quality identification questions guide the customer through their own network, segment by segment (friends, family, neighbours, school contacts, WhatsApp groups), and surface the best-fit leads. A well-identified lead is already half-converted.',
        text_ar:'تحديد العملاء المحتملين المناسبين من داخل شبكة العميل الحالي. دور الـ CM هنا مساعدة العميل على التفكير بوضوح في من في حياته سيستفيد فعلاً — لا أي شخص يعرفه. توجّه أسئلة التحديد النوعية العميل عبر شبكته الخاصة، قطاعاً تلو الآخر (الأصدقاء، العائلة، الجيران، اتصالات المدرسة، مجموعات واتساب)، وتُبرز أفضل الليدز ملاءمةً. الليد المُحدَّد جيداً منتصف الطريق نحو التحويل بالفعل.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Customers tend to think in vague categories: "لازم تعرفي أحد" doesn\'t generate names. The CM needs to make the customer\'s network concrete by triggering specific mental buckets:\n\n• "جيرانك اللي عندهم أطفال" → triggers neighbour network\n• "أهل مدرسة أطفالك" → triggers school network\n• "مجموعات الواتساب اللي فيك" → triggers digital community\n• "أخواتك أو بنات خالتك" → triggers family network\n\nOnce the customer is thinking in concrete groups, names appear naturally. The CM\'s job is just to ask the right segmentation question.',
        text_ar:'يميل العملاء إلى التفكير بفئات مبهمة: "لازم تعرفي أحد" لا تُولّد أسماء. يحتاج الـ CM إلى جعل شبكة العميل ملموسة بتفعيل حاويات ذهنية محددة:\n\n• "جيرانك اللي عندهم أطفال" → يُفعّل شبكة الجيران\n• "أهل مدرسة أطفالك" → يُفعّل شبكة المدرسة\n• "مجموعات الواتساب اللي فيك" → يُفعّل المجتمع الرقمي\n• "أخواتك أو بنات خالتك" → يُفعّل شبكة العائلة\n\nبمجرد أن يفكر العميل في مجموعات ملموسة، تظهر الأسماء بشكل طبيعي. وظيفة الـ CM مجرد طرح سؤال التصنيف الصحيح.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer says "ما عندي أحد" — pivot to network segmentation immediately',
          'After the referral program is explained — while motivation is high, explore the network',
          'When customer is active in the conversation and engaged — she\'ll think harder',
          'During a long call with a high-satisfaction customer — she has time and goodwill'
        ],
        items_ar:[
          'عندما يقول العميل "ما عندي أحد" — انتقل فوراً إلى تصنيف الشبكة',
          'بعد شرح برنامج الريفيرال — بينما الدافعية عالية، استكشف الشبكة',
          'عندما يكون العميل نشطاً في المحادثة ومنخرطاً — سيفكر أكثر',
          'خلال مكالمة طويلة مع عميل ذو رضا عالٍ — لديه وقت وحسن نية'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Mentions school friends, neighbourhood, or WhatsApp groups — active social network',
          'Has multiple children — her social circle likely overlaps with other multi-child parents',
          'Active on social media or in community groups — wider reach potential',
          '"مو عارفة" or "ما فكرت" — not a refusal, just needs a trigger question to activate memory',
          'High satisfaction with the platform — her word-of-mouth is already positive'
        ],
        items_ar:[
          'يذكر أصدقاء المدرسة أو الحي أو مجموعات واتساب — شبكة اجتماعية نشطة',
          'لديه أطفال متعددون — من المرجح أن دائرته الاجتماعية تتداخل مع أولياء أمور متعددي الأطفال',
          'نشط على وسائل التواصل الاجتماعي أو في مجموعات المجتمع — إمكانية وصول أوسع',
          '"مو عارفة" أو "ما فكرت" — ليس رفضاً، يحتاج فقط سؤالاً مُحفّزاً لتنشيط الذاكرة',
          'رضا عالٍ عن المنصة — توصيتها الشفهية إيجابية بالفعل'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'NETWORK SEGMENTATION Flow:\n1. Customer: "ما عندي أحد"\n2. CM: "تمام — بس سؤال بسيط: في أمهات بمدرسة أطفالك عندهم نفس التحديات؟"\n3. If yes → "ممتاز — حتى لو واحدة بكفي. هل تعرفيها كويس؟"\n4. CM: "وجيرانك؟ في أطفال بنفس العمر؟"\n5. CM: "وأخواتك؟ أو بنات خالتك؟"\n6. CM: "عندك مجموعات واتساب فيها أمهات؟"\n7. Customer names someone → immediately go to filtering/talk flow\n8. Close: "ممتاز — ابعثيلي رقمها وأنا أتابع"',
        text_ar:'تدفق تصنيف الشبكة:\n1. العميل: "ما عندي أحد"\n2. الـ CM: "تمام — بس سؤال بسيط: في أمهات بمدرسة أطفالك عندهم نفس التحديات؟"\n3. إذا نعم → "ممتاز — حتى لو واحدة بكفي. هل تعرفيها كويس؟"\n4. الـ CM: "وجيرانك؟ في أطفال بنفس العمر؟"\n5. الـ CM: "وأخواتك؟ أو بنات خالتك؟"\n6. الـ CM: "عندك مجموعات واتساب فيها أمهات؟"\n7. يُسمّي العميل شخصاً → انتقل فوراً إلى تدفق التصفية/الحديث\n8. الإغلاق: "ممتاز — ابعثيلي رقمها وأنا أتابع"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'School bucket: "في أهل من مدرسة أطفالك عندهم نفس الهموم؟"',
          'Family bucket: "أخواتك؟ أو بنات خالتك؟ في عندهم أطفال؟"',
          'Neighbour bucket: "جيرانك — في أطفال بنفس عمر أولادك؟"',
          'WhatsApp bucket: "عندك مجموعات واتساب فيها أمهات؟ مجموعة المدرسة؟"',
          'Work bucket (fathers): "زملاء شغل عندهم أطفال؟"'
        ],
        items_ar:[
          'حاوية المدرسة: "في أهل من مدرسة أطفالك عندهم نفس الهموم؟"',
          'حاوية العائلة: "أخواتك؟ أو بنات خالتك؟ في عندهم أطفال؟"',
          'حاوية الجيران: "جيرانك — في أطفال بنفس عمر أولادك؟"',
          'حاوية واتساب: "عندك مجموعات واتساب فيها أمهات؟ مجموعة المدرسة؟"',
          'حاوية العمل (الآباء): "زملاء شغل عندهم أطفال؟"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Ideal lead profile (what to look for):\n• Has children ages 6-15\n• Has expressed concern about education, grades, or keeping kids busy\n• Has tried or considered online learning before\n• Is from a similar socioeconomic background as the existing customer\n• Is connected to the customer in a real relationship (friend, sister, neighbour — not a distant contact)\n\nHigh-value lead buckets to explore with every customer:\n1. School community — "أهل زملاء أطفالك"\n2. Extended family — "أخواتك، بنات خالتك، زوجات أقاربك"\n3. Neighbours — "جيرانك اللي بتتكلمي معهم"\n4. WhatsApp groups — "مجموعة الأمهات اللي فيك"\n5. Work contacts (for fathers) — "زملاء الشغل اللي عندهم أطفال"',
        text_ar:'الملف المثالي للليد (ما تبحث عنه):\n• لديه أطفال أعمار 6-15\n• أبدى قلقاً بشأن التعليم أو الدرجات أو إشغال الأطفال\n• جرّب أو فكّر في التعلم الإلكتروني سابقاً\n• من خلفية اجتماعية-اقتصادية مشابهة للعميل الحالي\n• مرتبط بالعميل في علاقة حقيقية (صديق، أخت، جار — لا اتصال بعيد)\n\nحاويات الليد ذات القيمة العالية لاستكشافها مع كل عميل:\n1. مجتمع المدرسة — "أهل زملاء أطفالك"\n2. العائلة الممتدة — "أخواتك، بنات خالتك، زوجات أقاربك"\n3. الجيران — "جيرانك اللي بتتكلمي معهم"\n4. مجموعات واتساب — "مجموعة الأمهات اللي فيك"\n5. اتصالات العمل (للآباء) — "زملاء الشغل اللي عندهم أطفال"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Low-quality lead signals — manage expectations before calling:\n• "أي أحد تعرفيه" — too vague, need to qualify before calling\n• Numbers from a contact list with no relationship context\n• Leads who are single, or whose children are too young/old for the platform\n• Leads in a different city or country with no relevant product availability\n\nQuality check before calling any lead:\n"عندها أطفال؟" — if no → skip\n"عمرهم كم؟" — if outside 6-15 → deprioritize\n"أنتِ تعرفيها شخصيًا؟" — if no → flag as cold',
        text_ar:'إشارات الليد منخفض الجودة — إدارة التوقعات قبل الاتصال:\n• "أي أحد تعرفيه" — مبهم جداً، يحتاج تأهيلاً قبل الاتصال\n• أرقام من قائمة جهات اتصال دون سياق علاقة\n• ليدز عزّاب أو أطفالهم صغار/كبار جداً للمنصة\n• ليدز في مدينة أو دولة مختلفة دون توفر المنتج ذي الصلة\n\nفحص الجودة قبل الاتصال بأي ليد:\n"عندها أطفال؟" — إذا لا → تجاهل\n"عمرهم كم؟" — إذا خارج 6-15 → أعطِ أولوية أقل\n"أنتِ تعرفيها شخصيًا؟" — إذا لا → صنّف كبارد' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always segment the network — never accept "ما عندي أحد" at face value',
          'After each bucket question, pause and let customer think — silence is productive here',
          'Once a name appears, immediately validate: "وهي عندها أطفال؟ بعمر كم؟"',
          'Move quickly from identification to collection: "ممتاز — ابعثيلي رقمها"',
          'If customer gives a weak lead, accept gracefully and move to next bucket: "شكرًا — وأهل مدرسة أطفالك؟"'
        ],
        items_ar:[
          'صنّف الشبكة دائماً — لا تقبل "ما عندي أحد" كما هي',
          'بعد كل سؤال حاوية، توقف ودع العميل يفكر — الصمت منتج هنا',
          'بمجرد ظهور اسم، تحقق فوراً: "وهي عندها أطفال؟ بعمر كم؟"',
          'انتقل بسرعة من التحديد إلى الجمع: "ممتاز — ابعثيلي رقمها"',
          'إذا أعطى العميل ليداً ضعيفاً، اقبله بلطف وانتقل إلى الحاوية التالية: "شكرًا — وأهل مدرسة أطفالك؟"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 From "POOLS 3-6" partner system case — أبو نايف:\n"مرحبا أبو نايف، معك يزن من Five Talk..بدنا نكلمك عن شيء مختلف..موضوع بسيط ممكن يفيدك ماديًا..ما اشترط أي شيء بس أسمعك أول..لو مهتم أنا رح أشرح لك النظام بالتفصيل.." [partner model targets people with large networks]',
          '🛑 Network segmentation in practice:\nCM asked a mother: "وجيرانك؟"\nShe said: "والله جارتي باسمة كانت تقولي إنها دورت على شي لأولادها."\nResult: warm lead who converted in the same week.',
          '🛑 Getting leads from M7+ customers (from pool-m7 section):\nLong-term customers have the widest network trust. Their referral carries social proof that no CM pitch can match. The "Live Gratification" approach works particularly well: show the customer exactly what their referral friend will get, so she can describe it naturally when she talks to them.'
        ],
        items_ar:[
          '🛑 من حالة نظام الشريك "POOLS 3-6" — أبو نايف:\n"مرحبا أبو نايف، معك يزن من Five Talk..بدنا نكلمك عن شيء مختلف..موضوع بسيط ممكن يفيدك ماديًا..ما اشترط أي شيء بس أسمعك أول..لو مهتم أنا رح أشرح لك النظام بالتفصيل.." [نموذج الشريك يستهدف الناس ذوي الشبكات الواسعة]',
          '🛑 تصنيف الشبكة عملياً:\nسألت الـ CM أماً: "وجيرانك؟"\nقالت: "والله جارتي باسمة كانت تقولي إنها دورت على شي لأولادها."\nالنتيجة: ليد دافئ تحوّل في نفس الأسبوع.',
          '🛑 الحصول على ليدز من عملاء M7+ (من قسم pool-m7):\nالعملاء على المدى الطويل لديهم أوسع ثقة شبكية. ريفيرالهم يحمل إثباتاً اجتماعياً لا يمكن لأي عرض للـ CM مضاهاته. نهج "الإشباع الفوري" يعمل بشكل خاص: أرِ العميل بالضبط ما سيحصل عليه صديقه المُحال، حتى يتمكن من وصفه بشكل طبيعي عند التحدث إليه.'
        ]}
    ] },

  { id:'wide-ch', icon:'🌐', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'Sharing Referral Links', title_ar:'مشاركة روابط الريفيرال',
    color:'#2563EB', cl:'rgba(37,99,235,.15)', glow:'rgba(37,99,235,.2)',
    grad:'linear-gradient(135deg,#2563EB,#1D4ED8)',
    topics:['Sharing Motivation','Social Sharing Behavior','Referral Reach Potential','Customer Engagement Level','Link-Sharing Opportunities'],
    topics_ar:['دوافع المشاركة','سلوك المشاركة الاجتماعية','إمكانية وصول الريفيرال','مستوى تفاعل العميل','فرص مشاركة الرابط'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Scale referral reach beyond 1-to-1 by enabling the customer to share a referral link widely — WhatsApp groups, family chats, statuses, and direct forwards. Wide channel also includes the Partner/Commission model: turning high-network customers into recurring referral generators who earn $100 per subscription. Two modes: (1) Passive sharing — customer posts the link or status. (2) Active partner — customer actively refers and earns a commission per sign-up.',
        text_ar:'وسّع نطاق الريفيرال إلى أبعد من 1-1 بتمكين العميل من مشاركة رابط الريفيرال على نطاق واسع — مجموعات واتساب، محادثات العائلة، الستاتس، والتوجيه المباشر. تشمل القناة الواسعة أيضاً نموذج الشريك/العمولة: تحويل العملاء ذوي الشبكات الواسعة إلى مولّدين متكررين للريفيرال يكسبون 100 دولار لكل اشتراك. وضعان: (1) المشاركة السلبية — ينشر العميل الرابط أو الستاتس. (2) الشريك النشط — يُحيل العميل بنشاط ويكسب عمولة لكل تسجيل.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Wide-channel customers are motivated by one of two things:\n\n• SOCIAL GENEROSITY — "I want to share something good with my community." Triggered by the gift/helpful-resource framing. They share because it feels good to help, not because of the reward.\n\n• FINANCIAL OPPORTUNITY — "I want to make money from this." Triggered by the partner/commission framing. The $100-per-subscription partner model converts referral from a favour into a small home business.\n\nKey insight: don\'t pitch both to the same customer. Read which motivation is dominant and use only that frame.',
        text_ar:'عملاء القناة الواسعة مدفوعون بأحد شيئين:\n\n• الكرم الاجتماعي — "أريد مشاركة شيء جيد مع مجتمعي." مُحرَّك بإطار الهدية/المورد المفيد. يشاركون لأن المساعدة تُشعرهم بالطيب، لا بسبب المكافأة.\n\n• الفرصة المالية — "أريد كسب المال من هذا." مُحرَّك بإطار الشريك/العمولة. نموذج الشريك بـ 100 دولار لكل اشتراك يحوّل الريفيرال من معروف إلى مشروع صغير من البيت.\n\nالرؤية الأساسية: لا تقدّم الاثنين لنفس العميل. اقرأ أيّ الدوافع هو السائد واستخدم ذلك الإطار فقط.' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'For link sharing: any satisfied customer with a WhatsApp group (school, family, neighbourhood)',
          'For partner model (M3-M6 customers): after confirming they have an active social network',
          'For status sharing: after a positive emotional moment in the call',
          'For group sharing: when customer mentions she\'s in active parent WhatsApp groups',
          'For partner pitch (father/professional): when customer seems financially motivated and has wide professional network'
        ],
        items_ar:[
          'لمشاركة الرابط: أي عميل راضٍ لديه مجموعة واتساب (المدرسة، العائلة، الحي)',
          'لنموذج الشريك (عملاء M3-M6): بعد تأكيد وجود شبكة اجتماعية نشطة',
          'لمشاركة الستاتس: بعد لحظة عاطفية إيجابية في المكالمة',
          'لمشاركة المجموعة: عندما يذكر العميل أنه في مجموعات واتساب نشطة لأولياء الأمور',
          'لعرض الشريك (أب/مهني): عندما يبدو العميل ذا دوافع مالية ولديه شبكة مهنية واسعة'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Mentions WhatsApp groups actively — high sharing potential',
          '"عندي مجموعة أمهات كبيرة" — group sharing opportunity',
          'Socially active, mentions events, school activities — organiser type',
          'For partner model: mentions financial pressure, wants to earn from home, or asks about the reward size',
          'M3-M6 customer with wide family/community network — ideal partner candidate'
        ],
        items_ar:[
          'يذكر مجموعات واتساب بنشاط — إمكانية مشاركة عالية',
          '"عندي مجموعة أمهات كبيرة" — فرصة مشاركة المجموعة',
          'نشط اجتماعياً، يذكر فعاليات ومناشط مدرسية — نوع المنظّم',
          'لنموذج الشريك: يذكر ضغطاً مالياً، يريد الكسب من البيت، أو يسأل عن حجم المكافأة',
          'عميل M3-M6 بشبكة عائلة/مجتمع واسعة — مرشح الشريك المثالي'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'LINK SHARING Flow:\n1. After referral program explained, ask: "عندك مجموعات واتساب فيها أمهات؟"\n2. If yes → "ممتاز — رح أبعثلك رابط جاهز تشاركيه فيها"\n3. Send link with pre-written group message (see Referral Opportunities)\n4. Optional: ask to share as WhatsApp Status for wider reach\n5. Follow up in 24h to confirm sharing\n\nPARTNER MODEL Flow (M3-M6, POOLS 3-6):\n1. Open: "بدنا نكلمك عن شيء مختلف — موضوع ممكن يفيدك ماديًا"\n2. Explain: "مقابل كل اشتراك يجي من طرفك بتاخذ $100 أو حصص مجانية بقيمتها"\n3. If interested → explain system + give link + set expectations\n4. Close: "فكر في الموضوع وارجعلي — مو لازم تلتزم هلق"',
        text_ar:'تدفق مشاركة الرابط:\n1. بعد شرح برنامج الريفيرال، اسأل: "عندك مجموعات واتساب فيها أمهات؟"\n2. إذا نعم → "ممتاز — رح أبعثلك رابط جاهز تشاركيه فيها"\n3. أرسل الرابط مع رسالة مجموعة مكتوبة مسبقاً (انظر فرص الريفيرال)\n4. اختياري: اطلب المشاركة كستاتس واتساب لوصول أوسع\n5. تابع في 24 ساعة لتأكيد المشاركة\n\nتدفق نموذج الشريك (M3-M6، POOLS 3-6):\n1. الافتتاح: "بدنا نكلمك عن شيء مختلف — موضوع ممكن يفيدك ماديًا"\n2. الشرح: "مقابل كل اشتراك يجي من طرفك بتاخذ $100 أو حصص مجانية بقيمتها"\n3. إذا مهتم → اشرح النظام + أعطِ الرابط + حدّد التوقعات\n4. الإغلاق: "فكر في الموضوع وارجعلي — مو لازم تلتزم هلق"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Group message template: "هاي أمهات 🌸 شاركتكم شيء استفدنا منه كتير [رابط]"',
          'Partner opener: "بدنا نكلمك عن شيء مختلف — موضوع بسيط ممكن يفيدك ماديًا"',
          'Partner pitch: "مقابل كل اشتراك يجي من طرفك بتاخذ [مبلغ] — مشروع صغير من البيت"',
          'Status sharing: "ارسليلي رابطك الخاص وحطيه على ستاتس الواتساب"',
          'Voice message option: "بدلًا من النص، ممكن ترسلي رسالة صوتية بكلامك الطبيعي — أكتر تأثيرًا"'
        ],
        items_ar:[
          'قالب رسالة المجموعة: "هاي أمهات 🌸 شاركتكم شيء استفدنا منه كتير [رابط]"',
          'افتتاح الشريك: "بدنا نكلمك عن شيء مختلف — موضوع بسيط ممكن يفيدك ماديًا"',
          'عرض الشريك: "مقابل كل اشتراك يجي من طرفك بتاخذ [مبلغ] — مشروع صغير من البيت"',
          'مشاركة الستاتس: "ارسليلي رابطك الخاص وحطيه على ستاتس الواتساب"',
          'خيار الرسالة الصوتية: "بدلًا من النص، ممكن ترسلي رسالة صوتية بكلامك الطبيعي — أكتر تأثيرًا"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Ready-to-share WhatsApp group message (CM sends to customer to copy/paste):\n"هاي أمهات 🌸 مشاركتكم شيء جربته وأطفالي استفادوا كتير — منصة تعليمية ممتازة وعندهم تجربة مجانية. رابط التسجيل: [LINK] — لو عندكم أسئلة أنا معكم 💙"\n\nWhatsApp Status caption:\n"جربنا وأعجبنا 🎯 منصة تعليمية لأطفالنا — من اهتم يراسلني 🌸"\n\nVoice message guide (what to say):\n"هاي، بشاركك شيء استفدنا منه — منصة تعليمية أولادي بيتعلموا فيها أونلاين وبيتحسنوا كتير. لو مهتمة أعطيكِ رقم المشرفة ترسلك التفاصيل."\n\nPartner pitch key message:\n"كل اشتراك يجي من طرفك = $100 — مشروع صغير من البيت بدون أي رأس مال."',
        text_ar:'رسالة واتساب جاهزة للمشاركة في المجموعة (الـ CM يرسلها للعميل ليتوجه بها):\n"هاي أمهات 🌸 مشاركتكم شيء جربته وأطفالي استفادوا كتير — منصة تعليمية ممتازة وعندهم تجربة مجانية. رابط التسجيل: [LINK] — لو عندكم أسئلة أنا معكم 💙"\n\nتعليق ستاتس واتساب:\n"جربنا وأعجبنا 🎯 منصة تعليمية لأطفالنا — من اهتم يراسلني 🌸"\n\nدليل الرسالة الصوتية (ما تقوله):\n"هاي، بشاركك شيء استفدنا منه — منصة تعليمية أولادي بيتعلموا فيها أونلاين وبيتحسنوا كتير. لو مهتمة أعطيكِ رقم المشرفة ترسلك التفاصيل."\n\nرسالة عرض الشريك الرئيسية:\n"كل اشتراك يجي من طرفك = $100 — مشروع صغير من البيت بدون أي رأس مال."' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"ما بحب أبعث إعلانات على المجموعات"\n→ "هاد مش إعلان — هاد تجربتك الشخصية. الناس بتسمع للناس اللي يثقوا فيهم."\n\n"المجموعة عندها قوانين ضد الإعلانات"\n→ "تمام — ممكن تبعثي بشكل خاص لأمهات محددة بدل المجموعة."\n\nFor partner model:\n"ما بدي يحسوا إني بكسب من ورا ترشيحهم"\n→ "هذا شيء طبيعي جدًا — كتير ناس بيرشحوا وبياخذوا كاش باك. مش سر وما في شيء غلط فيه."',
        text_ar:'"ما بحب أبعث إعلانات على المجموعات"\n→ "هاد مش إعلان — هاد تجربتك الشخصية. الناس بتسمع للناس اللي يثقوا فيهم."\n\n"المجموعة عندها قوانين ضد الإعلانات"\n→ "تمام — ممكن تبعثي بشكل خاص لأمهات محددة بدل المجموعة."\n\nلنموذج الشريك:\n"ما بدي يحسوا إني بكسب من ورا ترشيحهم"\n→ "هذا شيء طبيعي جدًا — كتير ناس بيرشحوا وبياخذوا كاش باك. مش سر وما في شيء غلط فيه."' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always send the ready-made message — never ask customer to write it herself',
          'For groups: send a specific, short, non-spammy message template that feels personal',
          'For partner model: frame as "مشروع صغير من البيت" — normalizes the earning aspect',
          'Follow up 24h after sending the link: "هل قدرتي تشاركي الرابط؟"',
          'Track wide-channel referrals separately — they convert slower but at scale'
        ],
        items_ar:[
          'أرسل الرسالة الجاهزة دائماً — لا تطلب من العميل كتابتها بنفسها',
          'للمجموعات: أرسل قالب رسالة محدد وقصير وغير مزعج يبدو شخصياً',
          'لنموذج الشريك: قدّمه بوصف "مشروع صغير من البيت" — يُطبّع جانب الكسب',
          'تابع بعد 24 ساعة من إرسال الرابط: "هل قدرتي تشاركي الرابط؟"',
          'تتبع ريفيرالات القناة الواسعة بشكل منفصل — تتحول بشكل أبطأ لكن بحجم أكبر'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Partner model case — أبو نايف (from POOLS 3-6):\n"مرحبا أبو نايف، معك يزن من Five Talk..بدنا نكلمك عن شيء مختلف..موضوع بسيط ممكن يفيدك ماديًا..ما اشترط أي شيء بس أسمعك أول..لو مهتم أنا رح أشرح لك النظام بالتفصيل.. [$100 per subscription model]"',
          '🛑 Wide channel from POOLS 3-6 strategy:\n"بعد ما يمضي 3-6 شهور والعميل ما رشح أحد، بيكون التحدي إنه \"فقد الحماس\". الحل: تحويله لشريك بدل مجرد مشترك. لما يكون معه $100 لكل ريفيرال، بيتحرك بمبادرة ذاتية."',
          '🛑 Voice message vs text — why voice wins:\nA customer who sends a voice message to her friend saying "جربتها وأعجبتني" converts 2-3x better than a forwarded text template. Train customers to use their own voice — the CM prepares the talking points, not the exact words.'
        ],
        items_ar:[
          '🛑 حالة نموذج الشريك — أبو نايف (من POOLS 3-6):\n"مرحبا أبو نايف، معك يزن من Five Talk..بدنا نكلمك عن شيء مختلف..موضوع بسيط ممكن يفيدك ماديًا..ما اشترط أي شيء بس أسمعك أول..لو مهتم أنا رح أشرح لك النظام بالتفصيل.. [نموذج $100 لكل اشتراك]"',
          '🛑 القناة الواسعة من استراتيجية POOLS 3-6:\n"بعد ما يمضي 3-6 شهور والعميل ما رشح أحد، بيكون التحدي إنه \'فقد الحماس\'. الحل: تحويله لشريك بدل مجرد مشترك. لما يكون معه $100 لكل ريفيرال، بيتحرك بمبادرة ذاتية."',
          '🛑 الرسالة الصوتية مقابل النص — لماذا الصوت يفوز:\nعميل يرسل رسالة صوتية لصديقه يقول "جربتها وأعجبتني" يتحول بمعدل 2-3 أضعاف أفضل من قالب نصي معاد توجيهه. درّب العملاء على استخدام أصواتهم — الـ CM يُعدّ النقاط الأساسية، لا الكلمات الحرفية.'
        ]}
    ] },

  { id:'whatsapp', icon:'💬', group:'Close & Follow Up', group_ar:'الإغلاق والمتابعة',
    title:'WhatsApp Follow-Up', title_ar:'متابعة واتساب',
    color:'#25D366', cl:'rgba(37,211,102,.15)', glow:'rgba(37,211,102,.2)',
    grad:'linear-gradient(135deg,#25D366,#1EA952)',
    topics:['Customer Commitment Indicators','Follow-Up Confirmation','Referral Submission Willingness','WhatsApp Response Patterns','Delayed Referral Handling'],
    topics_ar:['مؤشرات التزام العميل','تأكيد المتابعة','استعداد تقديم الريفيرال','أنماط الردود على واتساب','التعامل مع الريفيرال المتأخرة'],
    fields:[
      { icon:'🎯', label:'Main Objective', label_ar:'الهدف الرئيسي', list:false,
        text:'Convert verbal referral commitments made during calls into actual numbers submitted via WhatsApp. The WhatsApp follow-up is the bridge between "رح أفكر" and a real lead. It must be sent within minutes of the call ending — not hours. The message should: (1) remind the customer of the reward, (2) make it effortless to send a number (just reply with a name/number), and (3) feel personal, not automated. Every CM has a distinct WhatsApp signature style.',
        text_ar:'حوّل التزامات الريفيرال اللفظية المُقدَّمة خلال المكالمات إلى أرقام فعلية مُقدَّمة عبر واتساب. متابعة واتساب هي الجسر بين "رح أفكر" وليد حقيقي. يجب إرسالها في غضون دقائق من انتهاء المكالمة — لا ساعات. يجب أن تكون الرسالة: (1) تُذكّر العميل بالمكافأة، (2) تجعل إرسال الرقم سهلاً (مجرد الرد باسم/رقم)، (3) تبدو شخصية لا آلية. لكل CM أسلوب واتساب مميز.' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'After a call, customers have a short action window — usually 15-30 minutes before the referral intention fades. WhatsApp follow-up within this window is critical. Key psychological principles:\n\n• IMMEDIACY — the message arrives while the emotional high from the call is still active\n• EFFORTLESSNESS — "Just reply with a name and number" removes all friction\n• SOCIAL RECIPROCITY — sending a thoughtful WhatsApp with the referral link feels like continuing a friendship, not a sales follow-up\n• VISUAL REWARD — including the prize/reward again in the WhatsApp reignites motivation without a new call',
        text_ar:'بعد المكالمة، لدى العملاء نافذة إجراء قصيرة — عادةً 15-30 دقيقة قبل أن يتلاشى نية الريفيرال. متابعة واتساب خلال هذه النافذة بالغة الأهمية. المبادئ النفسية الأساسية:\n\n• الفورية — تصل الرسالة بينما لا تزال الذروة العاطفية من المكالمة نشطة\n• السهولة — "فقط رد باسم ورقم" يُزيل كل احتكاك\n• المعاملة بالمثل الاجتماعية — إرسال واتساب مدروس مع رابط الريفيرال يبدو كاستمرار صداقة، لا متابعة مبيعات\n• المكافأة المرئية — تضمين الجائزة/المكافأة مرةً أخرى في واتساب يُعيد إشعال الدافعية دون مكالمة جديدة' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Send within 5 minutes of ending the call — action window is narrowest here',
          'For "رح أفكر" responses: follow up the next day at the same time (same availability window)',
          'For promised referrals not yet submitted: follow up 24h and 48h after the initial promise',
          'For wide-channel sharing: follow up 24h after sending the group template to check if shared',
          'Avoid follow-up on weekends for formal/academic customers; OK for friendly customers any time'
        ],
        items_ar:[
          'أرسل في غضون 5 دقائق من انتهاء المكالمة — نافذة الإجراء أضيق هنا',
          'لردود "رح أفكر": تابع في اليوم التالي في نفس الوقت (نفس نافذة التوفر)',
          'للريفيرالات الموعودة التي لم تُقدَّم بعد: تابع بعد 24 و48 ساعة من الوعد الأولي',
          'لمشاركة القناة الواسعة: تابع بعد 24 ساعة من إرسال قالب المجموعة للتحقق من المشاركة',
          'تجنب المتابعة في عطلات نهاية الأسبوع للعملاء الرسميين/الأكاديميين؛ مناسب للعملاء الودّيين في أي وقت'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Said "إن شاء الله" or "رح أفكر" during call — needs a warm reminder, not a push',
          'Promised to ask a specific person — follow up with: "هل حكيتي معها؟"',
          'High engagement during call but slow WhatsApp responder — use voice note instead of text',
          'Already shared a link to a group — follow up: "في أحد اهتم؟ بعثيلي رقمه"',
          'Gave numbers but hasn\'t confirmed they were contacted yet — check in: "تواصلنا معهم وبنحكم"'
        ],
        items_ar:[
          'قال "إن شاء الله" أو "رح أفكر" خلال المكالمة — يحتاج تذكيراً دافئاً لا ضغطاً',
          'وعد بسؤال شخص محدد — تابع بـ: "هل حكيتي معها؟"',
          'تفاعل عالٍ خلال المكالمة لكن بطيء في الرد على واتساب — استخدم رسالة صوتية بدل النص',
          'شارك الرابط بالفعل في مجموعة — تابع: "في أحد اهتم؟ بعثيلي رقمه"',
          'أعطى أرقاماً لكن لم يُؤكد التواصل معهم بعد — تحقق: "تواصلنا معهم وبنحكم"'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'IMMEDIATE POST-CALL Template (within 5 min):\n→ Send: referral link + reward reminder + action ask\n\n24H FOLLOW-UP for "رح أفكر":\n→ Soft check-in: "هاي [اسم] كيف حالك 🌸 تذكرتي أحد ممكن يستفيد؟"\n→ Attach: referral link again\n\n48H FOLLOW-UP for uncommitted:\n→ "بالمناسبة عندي مقعد VIP بقي — لو في أحد في بالك ابعثيلي الرقم قبل ما يخلص"\n→ [Scarcity trigger if customer is Alaa-type]\n\nREWARD REMINDER (for gamification customers):\n→ "تذكري إنك وصلتِ [X] ريفيرالات — بعد [Y] بتاخذي [جائزة] 🎁"\n\nVOICE MESSAGE OPTION:\n→ Record a short 15-second personal voice note: "هاي يا [اسم]، بعثلك رابط البرنامج — أي رقم ترسليه إلي أنا أتابع 🌸"',
        text_ar:'قالب ما بعد المكالمة الفوري (في غضون 5 دقائق):\n→ أرسل: رابط الريفيرال + تذكير المكافأة + طلب الإجراء\n\nمتابعة 24 ساعة لـ"رح أفكر":\n→ تحقق لطيف: "هاي [اسم] كيف حالك 🌸 تذكرتي أحد ممكن يستفيد؟"\n→ أرفق: رابط الريفيرال مرةً أخرى\n\nمتابعة 48 ساعة لغير الملتزمين:\n→ "بالمناسبة عندي مقعد VIP بقي — لو في أحد في بالك ابعثيلي الرقم قبل ما يخلص"\n→ [مُحفّز الشُح إذا كان العميل من نوع Alaa]\n\nتذكير المكافأة (لعملاء التلعيب):\n→ "تذكري إنك وصلتِ [X] ريفيرالات — بعد [Y] بتاخذي [جائزة] 🎁"\n\nخيار الرسالة الصوتية:\n→ سجّل رسالة صوتية شخصية قصيرة 15 ثانية: "هاي يا [اسم]، بعثلك رابط البرنامج — أي رقم ترسليه إلي أنا أتابع 🌸"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Approach 1 (Success Mentor): "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨ وهاد رابط برنامج الترشيحات 🎁"',
          'Approach 2 (VIP): "هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك"',
          'Approach 3 (Friendly): "يا عمري هاد رابطك الخاص 🌸 أي شخص يسجل منه بضيف لك حصص — ابعثيلي الأرقام وأنا أتابع"',
          'Renewal: "تذكري إنك قدرتي تجددي مجانًا بالريفيرالات اللي عندك — الرابط هنا [link]"',
          'Gamification (Yara): "وصلتِ [X] من أصل [Y] — [prize] قريب 🔥 مين الجايي؟"'
        ],
        items_ar:[
          'النهج 1 (مرشد النجاح): "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨ وهاد رابط برنامج الترشيحات 🎁"',
          'النهج 2 (VIP): "هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك"',
          'النهج 3 (الودّي): "يا عمري هاد رابطك الخاص 🌸 أي شخص يسجل منه بضيف لك حصص — ابعثيلي الأرقام وأنا أتابع"',
          'التجديد: "تذكري إنك قدرتي تجددي مجانًا بالريفيرالات اللي عندك — الرابط هنا [رابط]"',
          'التلعيب (يارا): "وصلتِ [X] من أصل [Y] — [الجائزة] قريب 🔥 مين الجايي؟"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Complete WhatsApp Template Library:\n\nTEMPLATE 1 — After first call (Success Mentor):\n"أهلاً 🌟 أرسلت لكم:\n✅ فيديو شرح المنصة\n✅ طريقة الدخول للحصص\n✅ رابط برنامج الترشيحات 🎁\nأي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك. أنا موجود لأي سؤال 🙌"\n\nTEMPLATE 2 — After first call (VIP Seats):\n"هذا رابط برنامج الترشيحات 🎁\nأي شخص يسجل من طرفكم بتحصلوا على:\n🎁 حصص مجانية\n💰 كاش باك\n🏆 جوائز قيّمة\nابعثولي الأرقام وأنا أتابع 🌟"\n\nTEMPLATE 3 — Friendly style:\n"يا روحي 🌸 هاد رابطك الخاص — أي شخص يسجل منه بضيف لك حصص مجانية تلقائيًا 💙\nابعثيلي الأرقام وأنا أتابع كل شيء بيني وبينك"\n\nTEMPLATE 4 — Renewal follow-up:\n"تذكري إنك قدرتِ تجددي مجانًا كمان مرة بالريفيرالات 🔄\nعندك أي شخص في بالك؟ ابعثيلي الرقم وأنا أتابع 🌟"\n\nTEMPLATE 5 — Gamification reminder (Yara):\n"وصلتِ [X] ريفيرالات من أصل [Y] 🔥\n[الجائزة] قريبة — مين الجايي؟ 🎁"\n\nTEMPLATE 6 — 24h soft re-engagement:\n"هاي [اسم] كيف حالك 🌸 تذكرتِ أحد ممكن يستفيد من البرنامج؟\nالرابط هنا [link] — أي وقت ابعثيلي"\n\nTEMPLATE 7 — Scarcity follow-up (Alaa style):\n"بالمناسبة عندي مقعد VIP بقي هالأسبوع ⚠️ لو في أحد في بالك ابعثيلي الرقم قبل ما يخلص 🙏"\n\nTEMPLATE 8 — After customer talked to referral:\n"أهلاً 🌟 ابعثيلي رقمها وأنا أتابع معها مباشرة — رح تشكريكِ 🌸"',
        text_ar:'مكتبة قوالب واتساب الكاملة:\n\nالقالب 1 — بعد المكالمة الأولى (مرشد النجاح):\n"أهلاً 🌟 أرسلت لكم:\n✅ فيديو شرح المنصة\n✅ طريقة الدخول للحصص\n✅ رابط برنامج الترشيحات 🎁\nأي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك. أنا موجود لأي سؤال 🙌"\n\nالقالب 2 — بعد المكالمة الأولى (مقاعد VIP):\n"هذا رابط برنامج الترشيحات 🎁\nأي شخص يسجل من طرفكم بتحصلوا على:\n🎁 حصص مجانية\n💰 كاش باك\n🏆 جوائز قيّمة\nابعثولي الأرقام وأنا أتابع 🌟"\n\nالقالب 3 — الأسلوب الودّي:\n"يا روحي 🌸 هاد رابطك الخاص — أي شخص يسجل منه بضيف لك حصص مجانية تلقائيًا 💙\nابعثيلي الأرقام وأنا أتابع كل شيء بيني وبينك"\n\nالقالب 4 — متابعة التجديد:\n"تذكري إنك قدرتِ تجددي مجانًا كمان مرة بالريفيرالات 🔄\nعندك أي شخص في بالك؟ ابعثيلي الرقم وأنا أتابع 🌟"\n\nالقالب 5 — تذكير التلعيب (يارا):\n"وصلتِ [X] ريفيرالات من أصل [Y] 🔥\n[الجائزة] قريبة — مين الجايي؟ 🎁"\n\nالقالب 6 — إعادة التفاعل اللطيف بعد 24 ساعة:\n"هاي [اسم] كيف حالك 🌸 تذكرتِ أحد ممكن يستفيد من البرنامج؟\nالرابط هنا [رابط] — أي وقت ابعثيلي"\n\nالقالب 7 — متابعة الشُح (أسلوب Alaa):\n"بالمناسبة عندي مقعد VIP بقي هالأسبوع ⚠️ لو في أحد في بالك ابعثيلي الرقم قبل ما يخلص 🙏"\n\nالقالب 8 — بعد أن تتحدث العميلة مع الإحالة:\n"أهلاً 🌟 ابعثيلي رقمها وأنا أتابع معها مباشرة — رح تشكريكِ 🌸"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'No reply after 24h:\n→ Send once more with different angle (reward or scarcity, depending on customer type)\n→ If still no reply after 48h — stop. Don\'t spam.\n\n"ما رد على صاحبتي بعد"\n→ "عادي، خليها ترتاح — لو بدها أنا موجود. ابعثيلي رقمها وأنا أحكي معها برفق."\n\n"ما حكيت معها بعد"\n→ "تمام — أي وقت تحكي معها ابعثيلي. أنا موجودة دايمًا 🌸"\n\n"إيش الرابط هذا؟" (customer doesn\'t recognize the program)\n→ Re-explain briefly in WhatsApp: "هاد رابط برنامج الترشيحات اللي حكينا عنه — أي شخص يسجل منه بيضاف لك [reward] تلقائيًا"',
        text_ar:'لا رد بعد 24 ساعة:\n→ أرسل مرةً أخرى بزاوية مختلفة (مكافأة أو شُح، حسب نوع العميل)\n→ إذا لا يزال بلا رد بعد 48 ساعة — توقف. لا تُرسل رسائل مزعجة.\n\n"ما رد على صاحبتي بعد"\n→ "عادي، خليها ترتاح — لو بدها أنا موجود. ابعثيلي رقمها وأنا أحكي معها برفق."\n\n"ما حكيت معها بعد"\n→ "تمام — أي وقت تحكي معها ابعثيلي. أنا موجودة دايمًا 🌸"\n\n"إيش الرابط هذا؟" (العميل لا يتعرف على البرنامج)\n→ اشرح باختصار عبر واتساب: "هاد رابط برنامج الترشيحات اللي حكينا عنه — أي شخص يسجل منه بيضاف لك [المكافأة] تلقائيًا"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Send within 5 minutes of ending the call — the action window closes fast',
          'Always include the referral link in the first message — never make her ask for it',
          'Personalize with the customer\'s name — never send a fully generic message',
          'For warm/friendly customers: add an emoji and a personal line, not just the template',
          'Gamification customers: include their current progress "وصلتِ X من أصل Y"',
          'If no reply in 24h: send once more, different angle. After 48h silence — stop and note for future call.'
        ],
        items_ar:[
          'أرسل في غضون 5 دقائق من انتهاء المكالمة — نافذة الإجراء تُغلَق بسرعة',
          'دائماً ضمّن رابط الريفيرال في الرسالة الأولى — لا تجعله يطلبه',
          'خصّص باسم العميل — لا ترسل رسالة عامة تماماً',
          'للعملاء الدافئين/الودّيين: أضف رمزاً تعبيرياً وسطراً شخصياً، لا القالب فحسب',
          'عملاء التلعيب: ضمّن تقدمهم الحالي "وصلتِ X من أصل Y"',
          'إذا لا رد في 24 ساعة: أرسل مرةً أخرى، زاوية مختلفة. بعد 48 ساعة صمت — توقف وسجّل للمكالمة القادمة.'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Approach 1 WhatsApp (from service-calls, Success Mentor):\n"رح أرسل لك كل التفاصيل على الواتساب." → [sends] "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨ وهذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          '🛑 Approach 2 WhatsApp (from service-calls, VIP Seats):\n"هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          '🛑 Approach 3 WhatsApp (from service-calls, Friendly):\n"يا عمري أي شيء تحتاجيه أنا موجودة." + [separate message] "هاد رابطك على البرنامج — ابعثيلي أي رقم وأنا أتابع 🌸"',
          '🛑 B-customer WhatsApp (pre-payment, from b-customer section):\n"ألف مبروك على التسجيل 🎉 رح أبعثلك رابط الجائزة هلق — أي شخص يسجل من طرفك بتاخذي [جائزة] مجانًا."',
          '🛑 Cashback WhatsApp (from inc-cashback section):\n"إذا كان في أحد من معارفك يبحث عن منصة تعليمية، ابعثيلي رقمه وأنا أتابع — وبتحصلوا أنتوا وهم على [مبلغ] كاش باك 💰"'
        ],
        items_ar:[
          '🛑 واتساب النهج 1 (من مكالمات الخدمة، مرشد النجاح):\n"رح أرسل لك كل التفاصيل على الواتساب." → [يرسل] "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨ وهذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          '🛑 واتساب النهج 2 (من مكالمات الخدمة، مقاعد VIP):\n"هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          '🛑 واتساب النهج 3 (من مكالمات الخدمة، الودّي):\n"يا عمري أي شيء تحتاجيه أنا موجودة." + [رسالة منفصلة] "هاد رابطك على البرنامج — ابعثيلي أي رقم وأنا أتابع 🌸"',
          '🛑 واتساب B-customer (قبل الدفع، من قسم b-customer):\n"ألف مبروك على التسجيل 🎉 رح أبعثلك رابط الجائزة هلق — أي شخص يسجل من طرفك بتاخذي [جائزة] مجانًا."',
          '🛑 واتساب الكاشباك (من قسم inc-cashback):\n"إذا كان في أحد من معارفك يبحث عن منصة تعليمية، ابعثيلي رقمه وأنا أتابع — وبتحصلوا أنتوا وهم على [مبلغ] كاش باك 💰"'
        ]}
    ] },
];

// ── Helpers ──────────────────────────────────────────────────────
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const tid  = (cid, idx) => `${cid}__t${idx}`;
const $    = id => document.getElementById(id);
const qs   = (sel, el = document) => el.querySelector(sel);
const qsa  = (sel, el = document) => [...el.querySelectorAll(sel)];

const ar          = () => currentLang === 'ar';
const zh          = () => currentLang === 'zh';
const catTitle    = c => ar() ? c.title_ar : zh() ? (c.title_zh || c.title) : c.title;
const catGroup    = c => ar() ? c.group_ar : c.group;
const catTopics   = c => c.topics;
const topicTitle  = t => ar() ? (t.title_ar || t.title) : t.title;
const fieldLabel  = f => ar() ? f.label_ar : zh() ? (f.label_zh || f.label) : f.label;

const ZH_CAT_TITLES = {
  'service-calls':'服务通话推荐',  'renewal':'续费推荐',
  'upgrade':'升级推荐',            'b-customer':'B类客户首次通话',
  'pool-m02':'M0–M2 客户群',       'pool-m36':'M3–M6 客户群',
  'pool-m7':'M7+ 客户群',          'cons-high':'高课消客户',
  'cons-low':'低课消客户',          'inc-ipad':'iPad 奖励',
  'inc-iphone':'iPhone 奖励',      'inc-classes':'额外课时',
  'inc-ebooks':'电子书奖励',        'inc-vouchers':'购物券',
  'inc-cashback':'现金返还',        'inc-appcls':'应用课程',
  'par-mother':'妈妈类型',          'par-father':'爸爸类型',
  'sty-academic':'学术型沟通',      'sty-friendly':'亲切型沟通',
  'req-direct':'直接邀约',          'req-indirect':'间接邀约',
  'flt-leads':'筛选潜在客户',       'flt-talk':'跟进被推荐人',
  'flt-get':'获取潜在客户',         'wide-ch':'分享推荐链接',
  'whatsapp':'WhatsApp 跟进',
};

const ZH_FIELD_LABELS = ['核心目标','客户心理','最佳时机','客户信号','对话流程','常见话术','推荐时机','异议信号','成功行为','注意事项'];

function normalizeCats() {
  FIELDS.forEach((f, i) => { f.label_zh = ZH_FIELD_LABELS[i] || f.label; });
  CATS.forEach(cat => {
    cat.title_zh = ZH_CAT_TITLES[cat.id] || cat.title;
    if (cat.fields) cat.fields.forEach((f, i) => { f.label_zh = ZH_FIELD_LABELS[i] || f.label; });
    if (cat.topics.length && typeof cat.topics[0] === 'string') {
      cat.topics = cat.topics.map((title, i) => ({
        title,
        title_ar: (cat.topics_ar || [])[i] || title,
        fields: null
      }));
      delete cat.topics_ar;
    }
  });
}

// ── Render Topnav (dropdown groups) ─────────────────────────────
function buildSidebar() {
  const nav = $('sbNav');
  const groups = {};
  STAGES.forEach(stage => {
    const label = ar() ? stage.key_ar : zh() ? stage.key_zh : stage.key;
    const cats  = CATS.filter(c => c.group === stage.key);
    if (cats.length) groups[label] = cats;
  });

  const MAX_VISIBLE = 7;
  const entries = Object.entries(groups);
  const visible = entries.slice(0, MAX_VISIBLE);
  const overflow = entries.slice(MAX_VISIBLE);

  const makeGroup = (name, cats) => {
    const stageIdx = STAGES.findIndex(s => s.key === cats[0].group);
    const pageId   = stageIdx >= 0 ? STAGES[stageIdx].pageId : '';
    const links = cats.map(c =>
      `<a class="tn-item" data-section="${c.id}" href="#${c.id}">
        <span class="tn-item-ico">${c.icon}</span>
        <span class="tn-item-name">${catTitle(c)}</span>
      </a>`
    ).join('');
    return `
      <div class="tn-group">
        <button class="tn-trigger" type="button" data-page="${pageId}">
          <span>${name}</span>
          <svg class="tn-arr" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="tn-drop">${links}</div>
      </div>`;
  };

  let html = visible.map(([name, cats]) => makeGroup(name, cats)).join('');

  if (overflow.length) {
    const overflowLinks = overflow.map(([groupName, cats]) => {
      const items = cats.map(c =>
        `<a class="tn-item" data-section="${c.id}" href="#${c.id}">
          <span class="tn-item-ico">${c.icon}</span>
          <span class="tn-item-name">${catTitle(c)}</span>
        </a>`
      ).join('');
      return `<div class="tn-sub-group">
        <div class="tn-sub-label">${groupName}</div>
        ${items}
      </div>`;
    }).join('');
    html += `
      <div class="tn-group">
        <button class="tn-trigger" type="button">
          <span>Other</span>
          <svg class="tn-arr" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="tn-drop tn-drop--grouped">${overflowLinks}</div>
      </div>`;
  }

  nav.innerHTML = html;

  // Click to open/close dropdown (all screen sizes)
  qsa('.tn-trigger', nav).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (btn.dataset.page) switchPage(btn.dataset.page);
      const group = btn.closest('.tn-group');
      const isOpen = group.classList.contains('open');
      qsa('.tn-group.open', nav).forEach(g => g.classList.remove('open'));
      if (!isOpen) group.classList.add('open');
    });
  });

  qs('.sb-home span:last-child').textContent = ar() ? 'الرئيسية' : zh() ? '主页' : 'Home';
}

// ── Render Hero ──────────────────────────────────────────────────
function buildHero() {
  const totalTopics = CATS.reduce((s, c) => s + c.topics.length, 0);
  const groups = new Set(CATS.map(c => c.group)).size;
  const pts = totalTopics * FIELDS.length;

  const labels = ar()
    ? ['قسماً', 'موضوعاً', 'فئات', 'نقطة تحليل']
    : zh()
    ? ['个部分', '个主题', '个类别', '个分析点']
    : ['Sections', 'Topics', 'Categories', 'Analysis Points'];

  $('heroStats').innerHTML = [
    { n: CATS.length, l: labels[0] },
    { n: totalTopics, l: labels[1] },
    { n: groups,      l: labels[2] },
    { n: pts,         l: labels[3] },
  ].map(s => `
    <div class="stat">
      <div class="stat-n" data-target="${s.n}">0</div>
      <div class="stat-l">${s.l}</div>
    </div>
  `).join('');

  qsa('.stat-n').forEach(el => {
    const target = +el.dataset.target;
    const dur = 1600, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  const text = ar()
    ? 'دليلك الشامل لاستراتيجيات الريفيرال، وعلم نفس العملاء، والتقنيات المُثبتة لتحقيق أقصى نجاح في كل تفاعل.'
    : zh()
    ? '全面的推荐策略指南，涵盖客户心理与实战技巧，助您在每次沟通中实现最大成功。'
    : 'Your comprehensive guide to referral strategies, customer psychology, and proven techniques for maximising success across every interaction.';
  const sub = $('heroSub');
  sub.innerHTML = '<span class="cursor"></span>';
  let i = 0;
  const tw = setInterval(() => {
    if (i < text.length) sub.insertBefore(document.createTextNode(text[i++]), sub.lastChild);
    else clearInterval(tw);
  }, 22);

  $('heroTitle').innerHTML = ar()
    ? 'كتاب معرفة<br><span class="grad-text">الريفيرال</span>'
    : zh()
    ? '推荐<br><span class="grad-text">知识手册</span>'
    : 'Referral<br><span class="grad-text">Knowledge Book</span>';

  qs('.grid-label').textContent = ar() ? 'جميع الأقسام — وصول سريع' : zh() ? '所有部分 — 快速访问' : 'All Sections — Quick Access';

  qs('.brand-name').innerHTML = ar()
    ? 'مرجع <strong>الريفيرال</strong>'
    : zh()
    ? '推荐 <strong>知识库</strong>'
    : 'Referral <strong>KB</strong>';

  $('searchInput').placeholder = ar() ? 'بحث… (Ctrl K)' : zh() ? '搜索… (Ctrl K)' : 'Search… (Ctrl K)';

  qs('.sb-home span:last-child').textContent = ar() ? 'الرئيسية' : zh() ? '主页' : 'Home';
}

// ── Render Category Grid ─────────────────────────────────────────
function buildGrid() {
  const moreWord   = ar() ? 'المزيد'    : zh() ? '更多'   : 'more';
  const topicsWord = ar() ? 'موضوعات'  : zh() ? '个主题' : 'topics';

  $('catGrid').innerHTML = CATS.map((c, i) => {
    const tops = catTopics(c);
    return `
    <div class="cc" data-id="${c.id}"
         style="--ccc:${c.color};--ccl:${c.cl};--ccglow:${c.glow};animation:fadeUp .5s ease ${i * .035}s both"
         role="button" tabindex="0">
      <div class="cc-head">
        <div class="cc-ico">${c.icon}</div>
        <div class="cc-info">
          <div class="cc-title">${catTitle(c)}</div>
          <div class="cc-count">${tops.length} ${topicsWord}</div>
        </div>
      </div>
      <div class="cc-tags">
        ${tops.slice(0,3).map(t => `<span class="cc-tag">${topicTitle(t)}</span>`).join('')}
        ${tops.length > 3 ? `<span class="cc-tag">+${tops.length-3} ${moreWord}</span>` : ''}
      </div>
    </div>`;
  }).join('');

  qsa('.cc').forEach(card => {
    card.addEventListener('click', e => {
      addRipple(e, card);
      const secId  = card.dataset.id;
      const pageId = sectionPageMap[secId];
      if (pageId) { switchPage(pageId); setTimeout(() => goTo(secId), 50); }
    });
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `perspective(700px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-4px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ── Page State ───────────────────────────────────────────────────
let activePage = 'home';
const sectionPageMap = {};

const STAGES = [
  { key:'Know Your Customer', key_ar:'اعرف عميلك',        key_zh:'了解客户',   num:'01', pageId:'page-1', color:'#10B981' },
  { key:'The Conversation',   key_ar:'المحادثة',           key_zh:'沟通技巧',   num:'02', pageId:'page-2', color:'#4F8EF7' },
  { key:'Close & Follow Up',  key_ar:'الإغلاق والمتابعة', key_zh:'成交与跟进', num:'03', pageId:'page-3', color:'#F97316' },
];

function buildStageTabs() {
  const inner = $('stageTabsInner');
  if (!inner) return;
  inner.innerHTML = STAGES.map(s => {
    const label  = ar() ? s.key_ar : zh() ? s.key_zh : s.key;
    const active = activePage === s.pageId ? ' active' : '';
    return `<button class="stage-tab${active}" data-page="${s.pageId}" style="--sc:${s.color}">
      <span class="stage-tab-num">${s.num}</span>
      <span>${label}</span>
    </button>`;
  }).join('');
  qsa('.stage-tab', inner).forEach(btn =>
    btn.addEventListener('click', () => switchPage(btn.dataset.page))
  );
}

function switchPage(pageId) {
  activePage = pageId;
  qsa('.page-view').forEach(p => p.classList.toggle('active', p.id === pageId));
  window.scrollTo({ top: 0, behavior: 'instant' });
  qsa('.tn-trigger[data-page]').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.page === pageId)
  );
  qs('.sb-home')?.classList.toggle('active', pageId === 'home');
  qsa('.stage-tab').forEach(tab =>
    tab.classList.toggle('active', tab.dataset.page === pageId)
  );
}

// ── Render Sections ──────────────────────────────────────────────

function buildSections() {
  CATS.forEach(c => {
    const idx = STAGES.findIndex(s => s.key === c.group);
    if (idx >= 0) sectionPageMap[c.id] = STAGES[idx].pageId;
  });

  $('sections').innerHTML = STAGES.map(stage => {
    const label = ar() ? stage.key_ar : zh() ? stage.key_zh : stage.key;
    const cats  = CATS.filter(c => c.group === stage.key);
    const sections = cats.map(c => {
      const fields = c.fields || FIELDS;
      return `
        <section id="${c.id}" class="sec">
          <div class="sec-hd" style="background:${c.grad}">
            <div class="sec-icon-wrap">${c.icon}</div>
            <span class="sec-title">${catTitle(c)}</span>
          </div>
          <div class="sec-body">
            <div class="a-grid" style="--tc:${c.color}">
              ${fields.map(f => buildCard(f)).join('')}
            </div>
          </div>
        </section>
      `;
    }).join('');
    return `
      <div class="page-view" id="${stage.pageId}">
        <div class="page-hd">
          <span class="page-num">${stage.num}</span>
          <h2 class="page-title">${label}</h2>
        </div>
        ${sections}
      </div>
    `;
  }).join('');

  // Restore active page after re-render (language switch)
  qsa('.page-view').forEach(p => p.classList.toggle('active', p.id === activePage));
}

function buildCard(f) {
  const toUl = arr => `<ul>${arr.map(s => `<li>${s.trim().replace(/\n/g,'<br>')}</li>`).join('')}</ul>`;
  const bodyItems = f.list
    ? (ar() && f.items_ar ? f.items_ar : zh() && f.items_zh ? f.items_zh : f.items)
    : null;
  const bodyText = !f.list
    ? (ar() && f.text_ar ? f.text_ar : zh() && f.text_zh ? f.text_zh : f.text)
    : null;
  const body = f.list
    ? toUl(bodyItems)
    : toUl(bodyText.split(/\n\n+/).filter(s => s.trim()));
  return `
    <div class="a-card">
      <div class="a-card-top">
        <div class="a-ico">${f.icon}</div>
        <span class="a-label">${fieldLabel(f)}</span>
      </div>
      <div class="a-body">${body}</div>
    </div>
  `;
}

// ── Accordion ────────────────────────────────────────────────────

// ── Navigation ───────────────────────────────────────────────────
function goTo(id, openTid) {
  const el = $(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 124;
  window.scrollTo({ top, behavior: 'smooth' });
  closeSidebar();
  if (openTid) {
    setTimeout(() => {
      const body = $(`${openTid}-body`);
      const arr  = $(`${openTid}-arr`);
      const head = body?.previousElementSibling;
      if (body && !body.classList.contains('open')) {
        body.classList.add('open');
        arr?.classList.add('open');
        head?.classList.add('open');
      }
    }, 500);
  }
}

document.addEventListener('click', e => {
  const link = e.target.closest('[data-section]');
  if (!link) return;
  e.preventDefault();
  const secId = link.dataset.section;
  if (secId === 'home') { switchPage('home'); return; }
  const pageId = sectionPageMap[secId];
  if (pageId) {
    switchPage(pageId);
    setTimeout(() => goTo(secId), 50);
  }
});

function setupScrollTracking() {
  const ids = ['home', ...CATS.map(c => c.id)];
  const setActive = id => {
    qsa('[data-section]').forEach(el =>
      el.classList.toggle('active', el.dataset.section === id)
    );
    // Highlight parent group trigger when a child section is active
    qsa('.tn-trigger').forEach(btn => {
      const drop = btn.nextElementSibling;
      btn.classList.toggle('active', !!(drop && drop.querySelector('.tn-item.active')));
    });
  };
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      let cur = activePage === 'home' ? 'home' : null;
      ids.forEach(id => {
        const el = $(id);
        if (el && el.offsetParent !== null && el.getBoundingClientRect().top <= 124) cur = id;
      });
      if (!cur) return;
      setActive(cur);
      ticking = false;
    });
  }, { passive: true });
}

// ── Search ───────────────────────────────────────────────────────
function setupSearch() {
  const input = $('searchInput');
  const clear = $('searchClear');
  const drop  = $('searchDrop');
  const list  = $('searchList');
  const esc   = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clear.classList.toggle('show', !!q);
    if (!q) { drop.classList.remove('show'); return; }

    const ql = q.toLowerCase();
    const secs = [], tops = [];
    CATS.forEach(c => {
      const title  = catTitle(c);
      const topics = catTopics(c);
      if (title.toLowerCase().includes(ql))
        secs.push({ icon:c.icon, name:title, sub:catGroup(c), id:c.id });
      topics.forEach(t => {
        const name = topicTitle(t);
        if (name.toLowerCase().includes(ql))
          tops.push({ icon:'📌', name, sub:title, id:c.id });
      });
    });

    const noRes = ar() ? `لا نتائج لـ "<strong>${q}</strong>"` : zh() ? `未找到 "<strong>${q}</strong>" 的结果` : `No results for "<strong>${q}</strong>"`;
    if (!secs.length && !tops.length) {
      list.innerHTML = `<div class="sd-empty">${noRes}</div>`;
    } else {
      const hl = s => s.replace(new RegExp(`(${esc(q)})`, 'gi'), '<mark>$1</mark>');
      const row = r => `
        <div class="sd-item" data-id="${r.id}" data-tid="${r.tid||''}">
          <span class="sd-item-ico">${r.icon}</span>
          <div>
            <div class="sd-item-name">${hl(r.name)}</div>
            <div class="sd-item-sec">${r.sub}</div>
          </div>
        </div>`;
      const secLbl = ar() ? 'الأقسام'    : zh() ? '部分' : 'Sections';
      const topLbl = ar() ? 'الموضوعات' : zh() ? '主题' : 'Topics';
      list.innerHTML =
        (secs.length ? `<div class="sd-label">${secLbl}</div>${secs.slice(0,4).map(row).join('')}` : '') +
        (tops.length ? `<div class="sd-label">${topLbl}</div>${tops.slice(0,8).map(row).join('')}` : '');
    }
    drop.classList.add('show');

    qsa('.sd-item', list).forEach(item => {
      item.addEventListener('click', () => {
        input.value = ''; clear.classList.remove('show'); drop.classList.remove('show');
        const secId  = item.dataset.id;
        const pageId = sectionPageMap[secId];
        if (pageId) { switchPage(pageId); setTimeout(() => goTo(secId), 50); }
        else switchPage('home');
      });
    });
  });

  clear.addEventListener('click', () => {
    input.value = ''; clear.classList.remove('show'); drop.classList.remove('show'); input.focus();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { drop.classList.remove('show'); input.blur(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); input.focus(); input.select(); }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap') && !e.target.closest('.search-drop'))
      drop.classList.remove('show');
  });
}

// ── Language Toggle ──────────────────────────────────────────────
const LANG_META = {
  en: { flagSrc: 'https://flagcdn.com/24x18/gb.png', code: 'EN' },
  zh: { flagSrc: 'https://flagcdn.com/24x18/cn.png', code: 'ZH' },
  ar: { flagSrc: 'https://flagcdn.com/24x18/sa.png', code: 'AR' },
};

function applyLang() {
  document.documentElement.setAttribute('data-lang', currentLang);
  document.documentElement.setAttribute('dir', ar() ? 'rtl' : 'ltr');
  const meta = LANG_META[currentLang] || LANG_META.en;
  const flagEl = $('langFlag');
  if (flagEl) { flagEl.src = meta.flagSrc; flagEl.alt = meta.code; }
  const codeEl = $('langCode'); if (codeEl) codeEl.textContent = meta.code;
  qsa('.lang-opt').forEach(opt =>
    opt.classList.toggle('active', opt.dataset.lang === currentLang)
  );
}

function rebuildAll() {
  buildSidebar();
  buildHero();
  buildGrid();
  buildSections();
  buildStageTabs();
  setupAnimations();
}

function setupLang() {
  applyLang();
  const wrap = $('langWrap');
  const btn  = $('langBtn');
  const drop = $('langDrop');

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  drop.addEventListener('click', e => {
    const opt = e.target.closest('.lang-opt');
    if (!opt) return;
    currentLang = opt.dataset.lang;
    localStorage.setItem('rkb-lang', currentLang);
    wrap.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    applyLang();
    rebuildAll();
  });

  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Theme ────────────────────────────────────────────────────────
function setupTheme() {
  const saved = localStorage.getItem('rkb-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  $('themeBtn').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('rkb-theme', next);
  });
}

// ── Mobile Sidebar ───────────────────────────────────────────────
function setupMobile() {
  const btn = $('menuBtn'), sb = $('sidebar'), ov = $('overlay');
  btn.addEventListener('click', () => {
    const open = sb.classList.toggle('open');
    btn.classList.toggle('open', open);
    ov.classList.toggle('on', open);
  });
  ov.addEventListener('click', closeSidebar);
}
function closeSidebar() {
  $('sidebar').classList.remove('open');
  $('menuBtn').classList.remove('open');
  $('overlay').classList.remove('on');
}

// ── Mouse Spotlight ──────────────────────────────────────────────
function setupSpotlight() {
  const el = $('spotlight');
  document.addEventListener('mousemove', e => {
    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';
  }, { passive: true });
}

// ── Back to Top ──────────────────────────────────────────────────
function setupBTT() {
  const btn = $('btt');
  window.addEventListener('scroll', () =>
    btn.classList.toggle('show', window.scrollY > 420), { passive: true });
  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Progress Bar ─────────────────────────────────────────────────
function setupProgress() {
  const bar = $('progressBar');
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    bar.style.width = `${(d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100}%`;
  }, { passive: true });
}

// ── Scroll Animations ────────────────────────────────────────────
function setupAnimations() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
    }),
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
  );
  qsa('.sec').forEach(s => obs.observe(s));
}

// ── Ripple Effect ────────────────────────────────────────────────
function addRipple(e, el) {
  const r = document.createElement('span');
  const rect = el.getBoundingClientRect();
  r.className = 'ripple';
  r.style.left = (e.clientX - rect.left) + 'px';
  r.style.top  = (e.clientY - rect.top)  + 'px';
  el.style.position = 'relative';
  el.appendChild(r);
  setTimeout(() => r.remove(), 600);
}

// ── Init ─────────────────────────────────────────────────────────
function init() {
  normalizeCats();
  setupTheme();
  setupLang();
  buildSidebar();
  document.addEventListener('click', () => {
    const nav = $('sbNav');
    qsa('.tn-group.open', nav).forEach(g => g.classList.remove('open'));
  });
  buildHero();
  buildGrid();
  buildSections();
  buildStageTabs();
  setupScrollTracking();
  setupSearch();
  setupMobile();
  setupSpotlight();
  setupBTT();
  setupProgress();
  setupAnimations();
}

document.addEventListener('DOMContentLoaded', init);
