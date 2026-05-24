/* ================================================================
   REFERRAL KNOWLEDGE BOOK — Creative Interactive Edition
   ================================================================ */

// ── Language ─────────────────────────────────────────────────────
let currentLang = localStorage.getItem('rkb-lang') || 'en';

// ── Analytics Helper ─────────────────────────────────────────────
function track(event, params) {
  if (typeof gtag === 'function') gtag('event', event, params || {});
}

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
          'Pattern B — VIP framing: "Your seat is VIP and gives you 5 free seats to gift to your friends" (Approach 2)',
          'Pattern C — Mention specific reward numbers: 230 SAR cashback, 20 free sessions, or iPad (Approach 2)',
          'Pattern D — Friendly peer comparison: "Be smart like your friend and go ahead and refer people" (Approach 3)'
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
        text:'Approach 1 — Success Mentor Openers:\n"You joined the platform through Um Mona, and she\'s receiving gifts and rewards from your referral."\n"Now you have the same referral opportunity — anyone who subscribes through you earns you cashback or free sessions."\n\nApproach 2 — VIP Seat Openers:\n"Your seat is VIP and gives you 5 free seats to gift to your friends."\n"Anyone who registers through you earns you $60 or free sessions."\n\nApproach 3 — Friendly Openers:\n"I want you to be smart like your friend and go ahead and refer people."\n"Send me the numbers and I\'ll follow up with them myself."',
        text_ar:'النهج 1 — افتتاحيات مرشد النجاح:\n"حضرتك دخلتي المنصة من طرف أم منى، وهي بتستفيد بهدايا وجوائز من ترشيحك."\n"دلوقتي صار عندك نفس فرصة الترشيحات، وأي شخص يشترك من طرفك بتحصلي على كاش باك أو حصص مجانية."\n\nالنهج 2 — افتتاحيات مقاعد VIP:\n"مقعدكم VIP وبيعطيكم 5 مقاعد مجانية تهدوها لزملائكم."\n"أي شخص يسجل من طرفك بتحصلوا على 60 دولار أو حصص مجانية."\n\nالنهج 3 — افتتاحيات ودية:\n"بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس."\n"ابعثيلي الأرقام وأنا أتابع معهم بنفسي."',
        text_zh:'方式一——成功导师开场话术：\n"您是通过[介绍人]加入平台的，她正在因您的注册而获得礼品和奖励。"\n"现在您也拥有同样的推荐机会，任何通过您报名的人，您都能获得返现或免费课程。"\n\n方式二——VIP席位开场话术：\n"您的席位是VIP席位，可以免费赠送5个名额给同学或朋友。"\n"任何通过您注册的人，您都可以获得60美元或免费课程。"\n\n方式三——亲切友好开场话术：\n"我希望您也能像您的朋友一样，积极地推荐身边的人。"\n"把联系方式发给我，我来亲自跟进。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I want the kids to be independent."\n→ "At the beginning they\'ll only need a little bit of support, and after that they\'ll be fully independent."\n\n"I don\'t have anyone to refer right now."\n→ "No problem at all — even in the future, if anyone is interested just send me their number and I\'ll follow up with them."\n\n"I don\'t know if people will agree."\n→ "Send me the numbers first, and I won\'t let anyone contact them before you\'ve spoken with them."\n\n"Why didn\'t I get a reward even though I registered more than one child?"\n→ "Let me raise a request for you and see what\'s the best exception we can arrange for you."',
        text_ar:'"بدي البنات يعتمدوا على حالهم."\n→ "بالبداية فقط رح يحتاجوا متابعة بسيطة، وبعدها رح يعتمدوا على حالهم بالكامل."\n\n"ما عندي ناس أرشحهم حاليًا."\n→ "عادي جدًا، حتى بالمستقبل لو في أي شخص مهتم ابعثيلي رقمه وأنا أتابع معه."\n\n"ما بعرف إذا الناس رح توافق."\n→ "ابعثيلي الأرقام أول، وأنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."\n\n"ليش ما أخذت جائزة رغم تسجيلي أكثر من طفل؟"\n→ "خليني أرفع لك الطلب وأشوف أفضل استثناء ممكن ينفعكم."',
        text_zh:'"我希望孩子能独立学习。"\n→ "最开始只需要一点简单的辅助，之后他们就完全可以自主学习了。"\n\n"目前没有可以推荐的人。"\n→ "完全没问题，以后如果有感兴趣的人，把他们的联系方式发给我，我来跟进。"\n\n"不确定别人会不会感兴趣。"\n→ "先把号码给我，在您和他们沟通之前，我不会主动联系任何人。"\n\n"我注册了不止一个孩子，为什么没有收到奖励？"\n→ "让我来帮您提交申请，看看能为您争取到什么最优方案。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Closing: "I\'ll be following up with you throughout your entire learning journey."',
          'Closing: "I\'ll send you all the details on WhatsApp."',
          'Closing (Friendly): "My dear, whatever you need I\'m here for you."',
          'WhatsApp: "This is the referral program link 🎁 Anyone who registers through you earns you free sessions or cashback."',
          'WhatsApp: "I sent you a platform walkthrough video + how to access your sessions ✨"'
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
          '🛑 Case 1 — Teacher Ahmed × Um Zainab (Approach 1 — Success Mentor):\n"Congratulations to the kids, and God willing this will be a wonderful start for them. I\'m Teacher Ahmed, your children\'s dedicated success teacher, and I\'ll be the one following up with you. We\'ll fix the schedule from Saturday to Monday at 8pm. It\'s very important to stay committed to the 12 sessions so we can see real results. Last thing — we have a referral program. You joined through Um Mona and she\'s receiving gifts and rewards from your referral. You can benefit in the same way when you refer people to the platform."',
          '🛑 Case 2 — Doctor Omar × Um Salman (Approach 2 — VIP Golden Seats):\n"I wanted to congratulate you on the golden seats you registered for. You have the option of the golden schedule or the elite schedule. And now you have 5 VIP referral seats. Anyone who registers through you earns you $60 or free sessions."',
          '🛑 Case 3 — Teacher Sarah × Um Mohammad (Approach 3 — Friendly Emotional):\n"My dear, your voice is truly charming. I want you to be as smart as your friend and go ahead and refer people. Anyone who subscribes through you — I\'ll add free sessions to your account. Leave everything between me and you, and I\'ll take care of it all."',
          '🛑 Case 4 — Teacher Amwaj × Um Malak (Approach 2 — VIP):\n"Hello dear! This is Amwaj, the educational supervisor at Five Talk platform. Um Maria recommended you to us. We\'re going to the rewards section — your seat is VIP and gives you 5 free seats to gift to your friends. And anyone who registers through you earns additional free sessions added to your package."'
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
        text:'APPROACH 1 — VIP Loyalty:\nPraise child + call parent a VIP client ⬅️ Confirm renewal ⬅️ "One extra thing I wanted to ask you about" ⬅️ Request 1-2 interested numbers ⬅️ Confirm 20 free sessions per referral ⬅️ WhatsApp follow-up\n\nAPPROACH 2 — Gamification:\nConfirm renewal ⬅️ "Did you know about the prize competition?" ⬅️ Explain ladder: sessions → voucher → iPad → iPhone ⬅️ Request numbers + referral code ⬅️ Send brochure via WhatsApp\n\nAPPROACH 3 — Free Investment:\nPraise child ⬅️ Renewal confirmed ⬅️ Financial hesitation or CM introduces idea ⬅️ "You could renew for free" ⬅️ Each referral = 20 free sessions ⬅️ WhatsApp follow-up\n\nAPPROACH 4 — Friendly Recommendation:\nClose renewal ⬅️ Mention friend/relative who might benefit ⬅️ "Send me her number and I\'ll link her to the account" ⬅️ First notification goes to parent',
        text_ar:'النهج 1 — الولاء VIP:\nمدح الطفل + تسمية الوالد عميلاً VIP ⬅️ تأكيد التجديد ⬅️ "شغلة إضافية بسألك فيها" ⬅️ طلب 1-2 رقم مهتم ⬅️ تأكيد 20 حصة مجانية لكل ريفيرال ⬅️ متابعة واتساب\n\nالنهج 2 — التلعيب:\nتأكيد التجديد ⬅️ "هل تعرف عن منافسة الجوائز؟" ⬅️ شرح السلّم: حصص → قسيمة → آيباد → آيفون ⬅️ طلب الأرقام + كود الريفيرال ⬅️ إرسال البروشور عبر واتساب\n\nالنهج 3 — الاستثمار المجاني:\nمدح الطفل ⬅️ تأكيد التجديد ⬅️ تردد مالي أو يطرح الـ CM الفكرة ⬅️ "كان بإمكانك التجديد مجاناً" ⬅️ كل ريفيرال = 20 حصة مجانية ⬅️ متابعة واتساب\n\nالنهج 4 — التوصية الودية:\nإغلاق التجديد ⬅️ ذكر صديق/قريب قد يستفيد ⬅️ "أرسلي رقمها وأنا أشبكها على الحساب" ⬅️ أول إشعار يذهب للوالد',
        text_zh:'方式一——VIP忠诚：\n夸赞孩子 + 称呼家长为VIP客户 ⬅️ 确认续费 ⬅️ "还有件小事想请教您" ⬅️ 请求1-2个感兴趣的联系方式 ⬅️ 确认每次推荐可获得20节免费课程 ⬅️ WhatsApp后续跟进\n\n方式二——游戏化：\n确认续费 ⬅️ "您了解我们的奖品竞赛吗？" ⬅️ 介绍奖励阶梯：课程→购物券→iPad→iPhone ⬅️ 请求联系方式 + 推荐码 ⬅️ 通过WhatsApp发送宣传资料\n\n方式三——免费投资：\n夸赞孩子 ⬅️ 确认续费 ⬅️ 客户表达财务顾虑或CM主动引出话题 ⬅️ "您本可以免费续费" ⬅️ 每次推荐 = 20节免费课程 ⬅️ WhatsApp后续跟进\n\n方式四——友好推荐：\n完成续费 ⬅️ 提到可能受益的朋友/亲戚 ⬅️ "把她的号码发给我，我来帮她关联账户" ⬅️ 第一条通知发给家长' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'VIP: "One extra thing I wanted to ask you about... If there\'s anyone in your circle interested in learning English, could you send us their number? If they register, 20 sessions will be added as a gift"',
          'Gamification: "If you bring your brother\'s or sister\'s kids and they register… you get $60 and they win a PlayStation and iPad" (Um Satam)',
          'Free Investment: "It\'s like you renewed for free without paying a single riyal" (Um Ibrahim)',
          'Friendly: "Send me her number so I can link her to Sham\'s account… as soon as she pays I\'ll notify you" (Um Sham)'
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
        text:'VIP Opening:\n"One more thing, Abu Abdul-Rahman — I wanted to ask you honestly, regarding Abdul-Rahman — if there\'s anyone in your circle, among your acquaintances, who might be interested in learning English, could you send us their mobile number? If they register with us, 20 sessions will be added to Abdul-Rahman\'s account as a gift."\n\nGameification:\n"If you bring your brother\'s kids, your sister\'s kids, and they register… you get $60 and they win a PlayStation and an iPad."\n\nFree Investment:\n"Every subscription that comes through you earns you 20 sessions."\n"It\'s like you renewed without paying a single riyal."',
        text_ar:'افتتاحية VIP:\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."\n\nالتلعيب:\n"جبتي عيال أخوك عيال أختك وسجلوا… بينزل لك 60$ وبيربح بلايستيشن وأيباد."\n\nالاستثمار المجاني:\n"كل اشتراك بيجي من خلالك تأخذي 20 حصة."\n"كأنك جددتي بدون ما تدفعي ولا ريال."',
        text_zh:'VIP开场话术：\n"还有件想请教您的小事——如果您身边有对学英语感兴趣的朋友，能把他们的手机号发给我们吗？如果他们注册，孩子就能获赠20节额外课程。"\n\n游戏化话术：\n"把您兄弟姐妹的孩子也带来注册……可以获得60美元，还能赢得PlayStation和iPad。"\n\n免费投资话术：\n"每带来一个新订阅，您就能获得20节课程。"\n"相当于您完全不花钱就完成了续费。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I already gave numbers before."\n→ "Excellent — and if there\'s anyone else interested, send them directly so we can make sure they\'re added to the account."\n\n"I\'ll see if anyone is interested."\n→ "Of course, just make sure it\'s someone who\'s genuinely interested so you get the full benefit."\n\n"I\'ll have her join through the link."\n→ "It\'s better to send the number directly so the link doesn\'t get lost."\n\n"I don\'t know anyone."\n→ "Of course, someone might come up later… keep the offer in mind."',
        text_ar:'"أنا عطيت أرقام قبل."\n→ "ممتاز جداً… وإذا في حدا مهتم زيادة ابعثه مباشرة عشان نضمن إضافته على الحساب."\n\n"بشوف إذا في حد مهتم."\n→ "أكيد، بس يكون شخص فعلاً مهتم حتى تستفيدوا كامل الاستفادة."\n\n"بخليها تدخل من الرابط."\n→ "الأفضل الرقم مباشرة حتى ما يضيع الربط."\n\n"ما أعرف أحد."\n→ "أكيد ممكن يطلع معك حدا لاحقاً… وخلي العرض عندك جاهز."',
        text_zh:'"我之前已经给过号码了。"\n→ "非常好……如果还有其他感兴趣的人，直接发给我，确保及时关联到账户。"\n\n"我看看有没有感兴趣的人。"\n→ "当然，只要是真正有兴趣的人，您就能充分受益。"\n\n"让她直接用链接注册就好了。"\n→ "最好是直接发号码，避免关联丢失。"\n\n"我现在不认识合适的人。"\n→ "完全没关系，以后肯定会遇到的……先把这个优惠放在心里备用。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'VIP Closing: "Send me the numbers on WhatsApp and I\'ll add them directly to Abdul-Rahman\'s account."',
          'VIP Closing: "Anyone who registers through you adds 20 sessions to Abdul-Rahman\'s account."',
          'Gamification Closing: "I\'ll send you the link, the brochure, and the referral code."',
          'WhatsApp: "Send me the interested numbers so I can add them directly to Abdul-Rahman\'s account ❤️"',
          'WhatsApp: "This is your personal referral code ❤️ Anyone interested — send their number directly."'
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
          '🛑 Case 1 — Abu Abdul-Rahman (VIP Approach):\n"One more thing, Abu Abdul-Rahman — I wanted to ask you honestly, regarding Abdul-Rahman — if there\'s anyone in your circle among your acquaintances who might be interested in learning English, could you send us their mobile number? If they register with us, 20 sessions will be added to Abdul-Rahman\'s account as a gift."',
          '🛑 Case 2 — Um Satam (Gamification):\n"If you bring your brother\'s kids, your sister\'s kids, and they register… you get $60 and they win a PlayStation and an iPad."',
          '🛑 Case 3 — Um Ibrahim (Free Investment):\n"It\'s like you renewed for him without paying a single riyal… do you have anyone\'s number who wants to register?"',
          '🛑 Case 4 — Um Sham (Friendly Recommendation):\n"Send me her number so I can link her to Sham\'s account… as soon as she pays I\'ll notify you."'
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
          'Elite Students Pattern: "If you know anyone you feel is like Khaled and Nada, send them to us. You\'ll benefit — either cashback or sessions for the kids." (Yazan × Um Khaled and Nada)',
          'Free Year Pattern: "Imagine if you bring two people — it\'s like you subscribed a full-year plan for Razeen." (Dana × Um Razeen)',
          'Help Frame: "I want to do you a favor… anyone interested, send me their number." (Muntaser × Um Deem)',
          'Voucher Handoff: "If you don\'t want to use the voucher yourself, you can give it to someone who wants to register." (Yazan × Abu Mohammad)'
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
        text:'Cashback after Elite Upgrade:\n"If you know anyone you feel is like Khaled and Nada, send them to us. You\'ll benefit — either cashback or sessions for the kids, on top of the gifts."\n\nFree Subscription Frame:\n"Imagine if you bring two people — it\'s like you subscribed Razeen to a full-year plan. As soon as they register, you open the app and choose your reward."\n\nVoucher Conversion:\n"If you don\'t want to use the voucher yourself, you can give it to someone who wants to register on the platform."',
        text_ar:'كاش باك بعد ترقية النخبة:\n"إذا عندك أحد بتحسيه زي خالد وندى ابعثي لنا إياه. أنتم بتستفيدوا يا كاش باك يا حصص للأولاد غير الهدايا."\n\nإطار الاشتراك المجاني:\n"تخيلي إذا بتجيبي اثنين زي كأنك اشتركتي للرزين خطة سنة. مجرد ما يسجل بتفتحي التطبيق وتختاري مكافأتك."\n\nتحويل القسيمة:\n"إذا ما بدك تستفيد من القسيمة ممكن تعطيها لحدا حاب يسجل بالمنصة."',
        text_zh:'精英升级后返现：\n"如果您认识像这些优秀孩子一样的学生，把他们介绍给我们。您可以获得返现或孩子的额外课程，还有额外礼品。"\n\n免费订阅框架：\n"想象一下，如果您带来两个人，就相当于为孩子免费订了一年计划。只要他们注册，您打开应用就可以选择奖励。"\n\n购物券转换：\n"如果您自己不需要这张购物券，可以送给想注册平台的人。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I referred before and got nothing."\n→ "Next time send the number directly so we can link it to your account and make sure nothing is lost."\n\n"The budget isn\'t enough."\n→ "That\'s exactly why referral can help you benefit through sessions or a cash amount instead of paying the full amount."\n\n"I don\'t know if people are interested."\n→ "Start with people you truly feel are interested, or whose children need language support."\n\n"I posted before in the groups."\n→ "It\'s better to send the number directly so we can link it to your account and guarantee the discount and reward."',
        text_ar:'"رشحت قبل وما استفدت."\n→ "المرة الجاية ابعثي الرقم مباشرة عشان نربطه على حسابك وما يضيع عليك شيء."\n\n"الميزانية ما تكفي."\n→ "عشان هيك الريفيرال ممكن يساعدك تستفيدي بحصص أو مبلغ مالي بدل ما تدفعي كامل المبلغ."\n\n"ما أعرف إذا الناس مهتمة."\n→ "ابدئي بالأشخاص اللي تحسين فعلاً عندهم اهتمام أو أولادهم محتاجين لغة."\n\n"أرسلت قبل بالجروبات."\n→ "الأفضل تبعثي الرقم مباشرة حتى نربطه بحسابك ونضمن الخصم والمكافأة."',
        text_zh:'"我之前推荐过但没有受益。"\n→ "下次请直接发号码，这样我们可以关联到您的账户，确保不会漏掉。"\n\n"预算不够。"\n→ "正因如此，推荐计划可以帮您通过课程或返现来补偿，而不用全额支付。"\n\n"不确定别人感不感兴趣。"\n→ "从您真正觉得感兴趣、或孩子需要提升语言能力的人开始。"\n\n"我之前在群里发过。"\n→ "最好直接发号码，这样我们关联到您账户，确保折扣和奖励都到位。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"I\'ll send you a referral code for your kids so that anyone who comes through you benefits you."',
          '"If you know anyone, send me their number and we\'ll give them your discount code."',
          '"I\'ll sort everything out for you so you benefit."',
          'WhatsApp: "This is your personal referral code ❤️ Anyone interested — send their number directly."',
          'WhatsApp: "Any new subscription through you = cashback or free sessions for the kids."'
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
          '🛑 Case 1 — Yazan × Um Khaled and Nada (Elite Upgrade + Cashback):\n"If you know anyone you feel is like Khaled and Nada, send them to us. You\'ll benefit — either cashback or sessions for the kids, on top of the gifts." Quality filter: "Interested people — meaning ones I feel have genuine interest."',
          '🛑 Case 2 — Dana × Um Razeen (Last Package / Free Year Frame):\n"Imagine if you bring two people — it\'s like you subscribed Razeen to a full-year plan. As soon as they register, you open the app and choose your reward." Quality filter: "People interested in learning English."',
          '🛑 Case 3 — Muntaser × Um Deem (Elite Upgrade — Financial Objection):\n"I want to do you a favor… anyone interested, send me their number. I\'ll sort everything out so you benefit." Quality filter: "Anyone interested in language learning."',
          '🛑 Case 4 — Yazan × Abu Mohammad (Voucher as Referral Tool):\n"If you don\'t want to use the voucher yourself, you can give it to someone who wants to register. They get a discount on the next level."'
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
        text:'High-Converting Opening Phrases:\n"You\'re coming through a student currently registered with us."\n"You have a special discount because you came through a direct referral."\n"The trial session is completely free as a gift."\n"I\'ll follow up with you step by step."\n"The referral gave you the opportunity to benefit from the special offer."\n\nVariation Examples:\n"This is the educational supervisor at Five Talk — Um Hazzaa referred you to us for the trial session."\n"Lara is Lana\'s friend at school and she sent your number because she wants to gift you a free trial session."\n"Um Fatima and Latifa sent your number because they want you to benefit from the subscriber-exclusive discount."',
        text_ar:'عبارات افتتاح عالية التحويل:\n"أنتِ جاية من طرف طالب مسجل معنا."\n"إلك خصم خاص لأنك من ترشيح مباشر."\n"الحصة التجريبية هدية بالكامل."\n"أنا رح أتابع معك خطوة بخطوة."\n"الترشيح أعطاك فرصة تستفيدي من العرض الخاص."\n\nأمثلة متنوعة:\n"معك المشرفة التعليمية من Five Talk، أم هزاع رشحتك معنا للحصة التجريبية."\n"لارا صديقة لانا بالمدرسة بعتت رقمك لأنها حابة تهديكم حصة مجانية."\n"أم فاطمة ولطيفة أرسلوا رقمك لأنهم حابين تستفيدوا من الخصم الخاص بالمشتركين."',
        text_zh:'高转化率的开场话术：\n"您是通过我们在读学员介绍过来的。"\n"因为是直接推荐，您可以享受专属折扣。"\n"体验课完全免费赠送。"\n"我会一步一步陪您完成。"\n"推荐让您获得了专属优惠的机会。"\n\n不同场景示例：\n"您好，我是Five Talk平台的教学督导，[介绍人]向我们推荐了您来体验免费课程。"\n"[介绍人]是学校的好朋友，她把您的号码发给我，想送您一节免费体验课。"\n"[介绍人]把您的号码分享给我们，希望您能享受会员专属折扣。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I want to try it first."\n→ "Absolutely — that\'s exactly why we have the trial session, so you can see the level before making any decision."\n\n"Do I need to download an app?"\n→ "I\'ll send you all the steps on WhatsApp and make the whole thing easy for you."\n\n"The timing isn\'t convenient."\n→ "No problem, we\'ll book whatever time works best for you."',
        text_ar:'"بدي أجرب أول."\n→ "أكيد، عشان هيك عاملين الحصة التجريبية حتى تشوفي المستوى قبل أي قرار."\n\n"لازم أحمل تطبيق؟"\n→ "رح أبعث لك كل الخطوات بالواتساب وأسهل عليك الموضوع كامل."\n\n"مو مناسب الوقت."\n→ "عادي، نحجز الوقت اللي يناسبك بالكامل."',
        text_zh:'"我想先试一下。"\n→ "当然，这正是我们提供体验课的原因——让您在做决定之前先了解孩子的水平。"\n\n"需要下载应用吗？"\n→ "我会通过WhatsApp把所有步骤发给您，让整个过程对您来说非常简单。"\n\n"现在时间不方便。"\n→ "完全没问题，我们可以安排最适合您的时间。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Closing: "Let\'s book today so I can follow up with you personally."',
          'Closing: "As soon as you join the session, send me a message so I can make sure everything is fine."',
          'Closing: "The session will help us determine the student\'s level precisely."',
          'WhatsApp: "Hello 🌷 Here is the app link — as soon as you finish downloading, send me a message 🙏"',
          'WhatsApp: "Session confirmed 🎉 Your appointment is tomorrow at 5:30 and I\'ll follow up with you before the session."'
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
          '🛑 Case 1 — Alaa × Um Hazzaa:\n"Hello, how are you? I\'m the cultural supervisor at Five Talk platform. Do you know Um Hazzaa? She\'s registered on the platform and it turned out she could refer people through her account, and honestly you were among those she referred. If you register, you\'ll get a discount because you came through a registered student. We\'d love to book the trial session and assess the student\'s level. When works for you — 6:30 or 7? I\'ll send you the app on WhatsApp but I\'d like you to install it. As soon as you download it, send me a message so I can confirm everything is fine."',
          '🛑 Case 2 — Aya × Um Lana:\n"Hello, how are you Um Lana? This is Aya from Five Talk platform. Lara is Lana\'s friend at school and she sent your number because she wants to gift her a free trial session. How old is Lana? We focus on Speaking and Reading and do a full level assessment. What time works for the session? Perfect, tomorrow at 3. I\'ll send you the session access details on WhatsApp now."',
          '🛑 Case 3 — Shadi × Shaimaa:\n"Hello, Mr. Shadi here from Five Talk platform. Um Fatima and Latifa sent your number because they want you to try the platform. People who come through registered subscribers get special discounts. We\'d love to book a trial session for you. Any time that works for you? Perfect, tomorrow at 2:30. I\'ll send all the details on WhatsApp."'
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
          'Pattern A (Academic) — Casual opener after solving the issue: "Is there anyone around you who would like to try a trial class?"',
          'Pattern B (Academic) — Remove all friction: "Send me the numbers and I\'ll follow up with them myself"',
          'Pattern C (Tech) — Specific prize math: "If four people register through you, congratulations — you get the iPad or 900 SAR cashback"',
          'Pattern D (Golden Seat) — Low ask, high reward: "Refer two numbers and get a free welcome week from us"'
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
        text:'Academic Type:\n"Is there anyone around you who would like to try a trial class?"\n"Any new referral helps the student complete the level faster."\n"If you refer people you\'ll get free sessions and educational books."\n\nTech Onboarding Type:\n"If four people register through you, you get an iPad."\n"Only one subscription left and you get the iPad."\n"Send a voice message to your groups with the link."\n\nGolden Seat Type:\n"You can make your seat golden."\n"Refer two numbers and get a free welcome week."\n"You benefit and help others at the same time."',
        text_ar:'النوع الأكاديمي:\n"ما في حولك أحد حاب يجرب كلاس تجريبي؟"\n"أي ترشيح جديد يساعد كيان تكمل الليفل أسرع."\n"إذا رشحتي أشخاص بتاخدي حصص مجانية وكتب تعليمية."\n\nنوع التأهيل التكنولوجي:\n"إذا سجل أربعة من طرفك بتحصلي على آيباد."\n"باقي اشتراك واحد فقط وتحصلوا على الآيباد."\n"أرسلي رسالة صوتية للجروبات مع الرابط."\n\nنوع المقعد الذهبي:\n"تقدري تخلي مقعدك ذهبي."\n"رشحي رقمين وخذي أسبوع مجاني."\n"الواحد يستفيد ويفيد بنفس الوقت."',
        text_zh:'学习型推荐话术：\n"您身边有朋友想免费体验一节课吗？"\n"每推荐一位新用户，就能帮孩子更快完成当前级别。"\n"成功推荐后，您可以获得免费课时和学习教材。"\n\n平台引导型推荐话术：\n"如果有4位家长通过您注册，您就能获得iPad奖励。"\n"现在只差一个订阅，您就能拿到iPad了。"\n"可以在家长群里发一条语音消息，附上推荐链接。"\n\n黄金座位型推荐话术：\n"您可以把自己的座位升级为黄金席位。"\n"推荐2位联系人，免费送您一周课程。"\n"推荐别人自己也受益，一举两得。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I don\'t have people who are definitely interested."\n→ "Even if only one person is interested, they can benefit a lot from the experience."\n\n"The numbers I sent didn\'t respond."\n→ "Send them again and I\'ll follow up with them directly."\n\n"I shared the link but I don\'t know who clicked it."\n→ "I\'ll create a special code in your name so we know who comes through you."\n\n"I\'ll try to find some numbers for you."\n→ "Any number that\'s interested is enough — the rest is on us."',
        text_ar:'"ما عندي ناس أكيد مهتمة."\n→ "حتى لو شخص واحد فقط مهتم ممكن يستفيد كثير من التجربة."\n\n"الأرقام اللي أرسلتها ما تجاوبت."\n→ "ابعثيهم مرة ثانية وأنا أتابع معهم بشكل مباشر."\n\n"نشرت بالرابط بس ما بعرف مين دخل."\n→ "رح أعمل لك كود خاص باسمك حتى نعرف أي شخص يجي من طرفك."\n\n"بحاول أطلع لك أرقام."\n→ "أي رقم مهتم يكفي والباقي علينا."',
        text_zh:'异议："我身边没有确定感兴趣的人。"\n→ "没关系，哪怕只有一个人有兴趣，都能从体验课中获益很多。"\n\n异议："我之前发的联系方式没有回复。"\n→ "可以再发一次，我来直接跟进他们。"\n\n异议："我发了推荐链接，但不知道谁点进来了。"\n→ "我来给您设置一个专属推荐码，这样我们就能追踪每一位来自您的用户。"\n\n异议："我会尽量给您找联系方式的。"\n→ "有任何一个感兴趣的就够了，剩下的我们来负责。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Academic Closing: "Let\'s help the student get there faster."',
          'Tech Closing: "God willing we\'ll celebrate the iPad with you soon."',
          'Golden Seat Closing: "You benefit and help others at the same time."',
          'WhatsApp: "🎁 Any new subscription = extra sessions to help the student develop faster."',
          'WhatsApp: "The student is developing so well 🌷 and the referral helps them complete the level faster."'
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
          '🛑 Case 1 — Um Rakan and Badr (Academic Problem-Solving):\n"I\'ll add conversation sessions for him where he chooses topics he likes because he\'s great at talking. Is there anyone around you who would like to try a trial class? Send me the numbers and I\'ll follow up with them myself."',
          '🛑 Case 2 — Um Yaser / Fahad (Tech Onboarding):\n"You have the pre-lesson preview and the post-lesson review. Fahad collects points and competes with students. And if four people register through you, congratulations — you get the iPad or 900 SAR cashback. Send the link in your groups and I\'ll create a special code in your name."',
          '🛑 Case 3 — Um Nasser (Tech Onboarding — Prize Proximity):\n"You have free group sessions with students from different countries. And only one subscription left and you get the iPad. Anyone you feel is interested — send me their number and I\'ll follow up with them."',
          '🛑 Case 4 — Um Abdul-Rahman (Golden Seat Activation):\n"I assigned a class supervisor for you to follow up on everything. And you can make your seat golden and increase your sessions. Just refer two interested numbers and get a free welcome week from us. You benefit and help others at the same time."'
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
          'Partner Framing: "We created something special for people who have a large network of contacts." (Abu Naif)',
          'Commission Clarity: "Anyone who comes through you and subscribes earns you $100." (Abu Naif)',
          'Mutual Benefit: "We want you to benefit — get sessions and get cash too."',
          'Link Accountability: "They need to come through my link so they get linked directly under your name."'
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
        text:'Partner Commission Opening:\n"We created something special for people who have a lot of contacts. It\'s like employment… anyone who comes through you and subscribes earns you $100."\n\nNetwork Activation:\n"You have people who trust you. We chose you because you have influence."\n\nLink + Code System:\n"I\'ll send you your personal registration link — anyone who registers through it gets counted directly under your name."\n\nFinancial Clarity:\n"We want people to come through someone who understands and has experienced the platform. This isn\'t just a referral… this is a commission system."',
        text_ar:'افتتاحية عمولة الشراكة:\n"عملنا شيء خاص للناس اللي عندهم كثير أشخاص. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\n\nتفعيل الشبكة:\n"إنت عندك ناس تثق فيك. إحنا اخترناك لأن عندك تأثير."\n\nنظام الرابط + الكود:\n"أبعث لك رابط التسجيل الخاص فيك، أي شخص يسجل عن طريقه ينحسب مباشرة تحت اسمك."\n\nوضوح مالي:\n"بدنا الناس ييجوا عن طريق شخص فاهم وجرب المنصة. مو مجرد ريفيرال… هذا نظام عمولات."',
        text_zh:'合作佣金开场话术：\n"我们为人脉广泛的家长专门设计了一个合作项目，有点像兼职机会——每有一位朋友通过您的链接订阅，您就能获得100美元。"\n\n激活社交网络：\n"您身边有信任您的朋友。我们选择您，是因为您有影响力。"\n\n专属链接+追踪码：\n"我来给您发一个专属注册链接，任何人通过它注册都会直接计入您的名下。"\n\n财务清晰化定位：\n"我们希望推荐人是真正了解并体验过平台的家长。这不只是普通推荐——这是一个佣金合作制度。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I just share the link?"\n→ "They need to come through my link so they get linked directly under your name and they get the discount."\n\n"I don\'t know if people will respond."\n→ "Even if only one person registers… the full cash gets counted for you."\n\n"I don\'t have time to follow up."\n→ "You just send the link… and the rest is completely on us."',
        text_ar:'"أنا فقط أشارك الرابط؟"\n→ "لازم يجوا عن طريقي حتى ينربطوا مباشرة باسمك ويأخذوا الخصم."\n\n"ما بعرف إذا الناس رح تتجاوب."\n→ "حتى لو شخص واحد فقط سجل… الكاش كاملاً بتنحسب لك."\n\n"ما عندي وقت أتابع."\n→ "إنت فقط ابعث الرابط… والباقي كله علينا."',
        text_zh:'异议："我只是分享链接就行了吗？"\n→ "他们必须通过您的专属链接注册，才能直接计入您的名下，同时他们也能享受折扣优惠。"\n\n异议："我不知道大家会不会响应。"\n→ "哪怕只有一个人订阅……佣金就全部计入您的账户。"\n\n异议："我没有时间跟进。"\n→ "您只需要发出链接就好……其余的全部由我们来负责。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"The most important thing is to fill in the details and share the link."',
          '"Anyone who comes through you — I\'ll follow up with them personally."',
          '"God willing this will be a great start for you."',
          'WhatsApp: "This is your personal registration link — anyone who registers through it gets counted directly under your name 🙌 and every new subscription = $100 commission directly to you."',
          'WhatsApp: "Anyone interested — send them directly to me and I\'ll follow up from start to finish to make sure they get the discount and get counted under your account."'
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
          '🛑 Full Case — Abu Naif (Partner/Commission Approach):\nStart: Phonics assessment + pronunciation analysis + explaining the child\'s level\nTransition: "Teacher, I want to tell you something important… we created something for people who have a large network."\nOffer: "It\'s like employment… anyone who comes through you and subscribes earns you $100."\nValue build: "We want you to benefit — get sessions and get cash too."\nObjection: "I just share the link, right?"\nResponse: "They need to come through my link so they get linked directly under your name."\nClose: "The most important thing is to fill in the details and share the link."',
          '📌 KEY INSIGHT: The Partner/Commission approach works best when:\n• Customer has been asked multiple times before\n• Customer is socially influential or has large groups\n• Standard referral asks have been deflected or ignored\n• Customer praises the platform spontaneously — they ARE convinced, just need a new motivation',
          '📌 QUALITY FILTERING in M3-M6: Ask for numbers directly tied to the commission: "Anyone who comes through you" — the financial incentive naturally encourages customers to only share genuinely interested contacts, because they want the commission to materialise.'
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
          'Financial Urgency: "This is the last month, this is the last month — so please find two or three people and you\'ll earn a great amount." (Um Maha and Bandar)',
          'Live Gratification: "Go to the referral log… my advice is to take the sessions — the sessions are worth around 800 SAR." (Um Ali and Mohammad)',
          'Academic Support: "The person who registered through you needs to inform that they registered through you. Keep in mind next time it\'s better to contact the person directly." (Um Rihana)',
          'Scarcity Hook: "The fewer sessions left for your kids, the harder it becomes to get you a prize."'
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
        text:'Financial Urgency:\n"Please try, dear — and you know why, because if your kids\' sessions run low too, you\'ll earn yourself some money — you know, enough to maybe renew for one of the kids."\n"Even if you find someone, just one person — this month is your only window for the prize."\n\nLive Gratification:\n"Go to the referral log… you\'ll find that Ali is registered and subscribed, click on it and hit \'claim reward.\'"\n"My advice is to take the sessions — the sessions are worth around 800 SAR."\n"If any of your other children or relatives want to subscribe, I\'ll link them to Ali\'s seat."\n\nAcademic Support:\n"The person registered through you needs to inform us they registered through you. And their account needs to be linked to yours or your number so the sessions get added to you."',
        text_ar:'الإلحاح المالي:\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد."\n"حتى لو شفتي حدا ما حيقدر تاخذي جائزه انت معك بس هذا الشهر."\n\nالإشباع الفوري:\n"روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه."\n"نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\n"اذا احد من ابنائك الثانيين او اقاربك يبي يشترك بربطه على مقعد علي."\n\nالدعم الأكاديمي:\n"لازم اللي يكون مسجل عن طريقك يدي اعلام ان هو مسجل عن طريقك. ويكون رابط حسابه بحسابك او رقمك عشان تنزل لك الحصص."',
        text_zh:'财务紧迫型推荐话术：\n"我建议您试试看——因为孩子的课时越来越少了，现在推荐2-3个人，赚到的金额说不定够续费其中一个孩子。"\n"就算只找到一个人，这个月的奖励您还是能拿到。"\n\n即时奖励体验话术：\n"请进入推荐记录……您会看到小明已经注册并订阅，点击然后选择领取奖励。"\n"我建议选课时，课时的实际价值大约相当于800里亚尔。"\n"如果您其他孩子或亲属也想订阅，我可以直接帮他们绑定到小明的账号下。"\n\n学术支持型推荐话术：\n"通过您推荐的人注册时，需要告知是您介绍来的，并且账号要与您的号码关联，这样课时才能计入您的账户。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I honestly can\'t renew."\n→ "That\'s exactly why I\'m telling you to use the referral and let the platform help you with sessions or cash."\n\n"My situation is difficult right now."\n→ "I have no problem with the renewal timing, but don\'t lose your last month for prizes."\n\n"Should I take cash or sessions?" (Live Gratification)\n→ "Sessions are worth much more and benefit you academically more."\n\n"People registered through me and I got nothing." (Academic Support)\n→ "It needs to be linked to your account or number for the sessions to be added. Next time it\'s better to contact the person directly."',
        text_ar:'"والله ما أقدر أجدد."\n→ "عشان كذا بقولك استفيدي من الريفيرال وخلي المنصة تساعدك بالحصص أو الكاش."\n\n"حالياً ظروفي صعبة."\n→ "ما عندي مشكلة بالتجديد الآن، بس لا يضيع عليك آخر شهر للجوائز."\n\n"آخذ كاش ولا حصص؟" (الإشباع الفوري)\n→ "الحصص قيمتها أعلى كثير وبتفيدكم أكاديمياً أكثر."\n\n"سجلوا من طرفي وما استفدت." (الدعم الأكاديمي)\n→ "لازم يكون مربوط بحسابك أو رقمك حتى تنزل الحصص. خذي بالك المرة الجاية الأفضل تتواصلي معه الشخص."',
        text_zh:'异议："我真的没办法续费。"\n→ "正是因为这样，我才建议您用推荐来获取课时或现金，让平台来帮助您解决这个问题。"\n\n异议："我现在情况比较难。"\n→ "续费的事先不急，但这是最后一个月享受满额奖励，不要错过这个机会。"\n\n异议（即时奖励型）："我该选现金还是课时？"\n→ "课时的价值高多了，而且对孩子的学习更有帮助。"\n\n异议（学术支持型）："他们通过我注册了，但我什么都没收到。"\n→ "必须要把账号绑定到您的号码才能计入课时。下次记得让他们直接联系我来操作绑定。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Financial Urgency Closing: "I\'m waiting for the numbers from you. Let\'s try to make the most of the opportunity before the end of the month."',
          'Live Gratification: "Congratulations on activating the 20 sessions 🎉 Anyone new who comes through you — we\'ll link them directly to Ali\'s seat 🌷"',
          'Academic Support: "Anyone who registers through you — have them link their account to yours."',
          'WhatsApp (Financial Urgency): "Hello Um Maha 🌷 As we discussed, this is the last month to benefit from prizes. Anyone interested — send their number and I\'ll follow up with them directly 🤍"',
          'WhatsApp (Academic Support): "Anyone who registers through you must link their account to yours so the sessions get added directly to you 🤍"'
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
          '🛑 Case 1 — Um Maha and Bandar (Financial Urgency):\n"Please try, dear — and you know why, because if your kids\' sessions run low too, you\'ll earn yourself some money — enough to maybe renew for one of the kids."\n"This is the last month, this is the last month — so please find two or three people and you\'ll earn a great amount."',
          '🛑 Case 2 — Um Ali and Mohammad (Live Gratification):\n"Go to the referral log… you\'ll find that Ali is registered and subscribed, click on it and hit \'claim reward.\'"\n"My advice is to take the sessions — the sessions are worth around 800 SAR."\n"If any of your other children or relatives or anyone wants to subscribe, I\'ll link them to Ali\'s seat."',
          '🛑 Case 3 — Um Rihana (Academic Support & Referral Education):\n"The person registered through you needs to inform us that they registered through you."\n"And their account needs to be linked to yours or your number so the sessions get added to you."\n"Keep in mind next time it\'s better to contact the person directly."'
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
        text:'Prize Proximity — Just Two Away:\n"You\'re only two away from the iPad that [child\'s name] has been asking for. Is there any mum in your school WhatsApp group who could benefit?"\n\nEnthusiasm Conversion — Since He Loves It:\n"Since [child\'s name] loves the sessions and attends every one, that says the experience is excellent. Wouldn\'t it be better to introduce another mum to it?"\n\nStar Family Frame:\n"We find that families whose children use the app seriously like you — they\'re the ones who help other mums find out about us."',
        text_ar:'القرب من الجائزة — بعيدين بس اتنين:\n"أنتِ بعيدة بس اتنين عن الـ iPad اللي [اسم الطفل] بيطلبه من فترة. عندك أي أم في الواتساب جروب المدرسة ممكن تستفيد؟"\n\nتحويل الحماس — ما دام بيحبها:\n"ما دام [اسم الطفل] بيحب الحصص وبيحضر كلها، ده بيقول إن التجربة ممتازة. مش أحسن إنك تعرّفي أم تانية بيها؟"\n\nإطار الأسرة المميزة:\n"إحنا بنشوف إن الأسر اللي أطفالها بيستخدموا الأبليكيشن بجدية زي أنتِ — هم اللي بيساعدوا باقي الأمهات يعرفوا عنا."',
        text_zh:'临近奖励推荐话术：\n"您现在只差2个推荐，就能拿到[孩子名字]一直想要的iPad了。您学校的家长群里，有没有哪位妈妈可能也感兴趣？"\n\n转化热情推荐话术：\n"既然[孩子名字]这么喜欢课程、每节都来，说明体验真的很棒。何不让其他妈妈也了解一下呢？"\n\n明星家庭框架话术：\n"我们发现，孩子认真使用平台的家庭，就像您一样——他们往往也是帮助其他妈妈了解我们的最好桥梁。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Objection: "I don\'t know anyone suitable"\nResponse: "You don\'t have to be sure — any mum who has a child in primary or middle school could benefit. Send her the link and she decides."\n\nObjection: "She\'s not interested in online education"\nResponse: "A lot of our mums were the same — until they saw results with their kids. The link speaks for itself."\n\nObjection: "I don\'t like to bother people"\nResponse: "It\'s not a sale at all — you\'re sharing something you genuinely benefited from. That\'s a favour, not a bother."',
        text_ar:'اعتراض: "مش عارفة حد مناسب"\nالرد: "مش لازم تكوني متأكدة — أي أم عندها ولد في المرحلة الابتدائية أو الإعدادية ممكن تستفيد. بعتيلها اللينك وهي تقرر."\n\nاعتراض: "هي مش مهتمة بالتعليم الأونلاين"\nالرد: "كتير من أمهاتنا كانوا زي كده — لغاية ما شافوا نتائج ولادنا. اللينك بيشرح نفسه."\n\nاعتراض: "أنا مش بحب أزعل حد"\nالرد: "تماماً مش بيع — إنتِ بتشاركي حاجة استفدتِ منها فعلاً. ده معروف مش إزعاج."',
        text_zh:'异议："我不知道有没有合适的人"\n→ "不需要特别确定——任何有小学或初中孩子的妈妈都可能感兴趣。把链接发给她，让她自己决定。"\n\n异议："她对网课不感兴趣"\n→ "我们很多妈妈以前也这样——直到她们看到孩子的进步。链接本身就能说明问题。"\n\n异议："我不太喜欢麻烦别人"\n→ "完全不是推销——您是在分享自己真正受益的东西。这是一份好意，不是打扰。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"OK, I\'ll send you the link now on WhatsApp — forward it to any mum you have in mind."',
          '"Let me send you a ready-made message that you can forward without writing anything."',
          '"Do you have a school group or a mums group where you could share it?"',
          '"As soon as someone subscribes through your link — you\'ll find a point added to the iPad count."',
          '"You\'re one of the mums whose children use the app most seriously — your word matters to other mums."'
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
          '🛑 Case 1 — Um Dialaa:\nSituation: She\'s complaining that Dialaa is asking for more sessions than she has.\nOpportunity: Use the extra demand as proof of service value and connect it to the referral.\nScript: "That\'s exactly what tells us the experience is working — Dialaa is asking for more. You\'re only one referral away from extra free sessions. Is there a mum in mind who could benefit?"\nResult: She shared the link in the school group during the same call.',
          '🛑 Case 2 — Um Ali:\nSituation: Ali asks every day when the next session is.\nOpportunity: Turn the child\'s enthusiasm into a social motivator for the mum.\nScript: "When a child asks every day about the session — that says something special is happening. Don\'t keep what Ali enjoys a secret — send the link to another mum and you\'re genuinely helping her."\nResult: She sent the link to three mums from the class group.',
          '🛑 Case 3 — Um Tamim:\nSituation: Um Tamim mentioned that Tamim attended 18 sessions this month.\nOpportunity: Use the number as an achievement and push for referral through pride.\nScript: "18 sessions in one month — that\'s a number we don\'t see often! You\'ve clearly invested seriously in Tamim. Is there anyone among your friends or family who might need the same thing for their child?"\nResult: She referred her sister and she joined the same week.'
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
        text:'Balance Gap Bridge:\n"She has X sessions left but needs Y to finish the level. If you bring just one referral — that gap gets covered and she finishes the level without you paying anything extra."\n\nVIP Reactivation:\n"We have limited VIP spots with specialist teachers next month — I can book a spot for [child\'s name] if you share the link with one other mum. This isn\'t available to everyone."\n\nReport Confidence Restore:\n"The report says when she attends she understands well — the problem isn\'t ability, it\'s consistency. Let me help you get back on track and at the same time benefit from the referral."',
        text_ar:'جسر فجوة الرصيد:\n"عندها X حصص متبقية بس محتاجة Y عشان تخلص المستوى. لو جبتِ ريفيرال واحد بس — الفجوة دي بتتغطى وهي بتخلص المستوى من غير ما تدفعي أي حاجة زيادة."\n\nإعادة تفعيل VIP:\n"عندنا مقاعد VIP محدودة مع مدرسين متخصصين الشهر الجاي — بقدر أحجز لـ [اسم الطفل] لو شاركتِ اللينك مع أم تانية. ده مش متاح للكل."\n\nاستعادة الثقة بالتقرير:\n"التقرير بيقول إن لما بتحضر بتفهم كويس — المشكلة مش في القدرة، المشكلة في الانتظام. خليني أساعدك ترجعي على المسار وفي نفس الوقت تستفيدي من الريفيرال."',
        text_zh:'余额缺口弥补话术：\n"她还剩X节课时，但完成这个级别需要Y节。如果您能推荐一个人——这个缺口就补上了，孩子可以顺利完成级别，完全不需要额外付费。"\n\nVIP重新激活话术：\n"下个月我们有数量有限的VIP名额，可以跟随专业老师——如果您把链接转发给一位妈妈，我可以为[孩子名字]预留一个名额。这不是对所有人开放的。"\n\n报告信心恢复话术：\n"报告显示只要孩子按时上课，理解能力非常好——问题不在能力，在于规律性。让我帮您重回正轨，同时也能通过推荐获益。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Objection: "She\'s not attending anyway — I can\'t really refer anyone"\nResponse: "That\'s exactly what we\'re talking about — let\'s get her back on track first, then the referral helps you complete the level with her without any extra cost."\n\nObjection: "I\'m not sure the service is good enough to refer"\nResponse: "I understand — let me send you the full report first. When you see it you\'ll know what\'s been done and what\'s left. Many mums who were in the same position referred after seeing the report."\n\nObjection: "I don\'t have time right now"\nResponse: "Absolutely — no need for anything right now. I\'ll send you the link on WhatsApp and you can forward it to any mum you have in mind whenever it suits you."',
        text_ar:'اعتراض: "هي مش بتحضر أصلاً — ما ينفعش أرشح حد"\nالرد: "ده بالظبط اللي بنتكلم فيه — نرجعها على المسار الأول، وبعدين الريفيرال هيساعدك تكملي المستوى معاها بدون تكلفة زيادة."\n\nاعتراض: "مش متأكدة إن الخدمة كافية عشان أرشح"\nالرد: "أفهمك — خليني أبعتلك التقرير الكامل الأول. لما تشوفيه هتعرفي إيه اللي اتعمل وإيه اللي باقي. كتير من الأمهات اللي كانوا في نفس موقفك رشحوا بعد ما شافوا التقرير."\n\nاعتراض: "معنديش وقت دلوقتي"\nالرد: "تماماً — ما في داعي لأي حاجة دلوقتي. هبعتلك اللينك على الواتساب وبعتيه لأي أم في بالك في أي وقت يناسبك."',
        text_zh:'异议："孩子根本不来上课——我怎么能推荐别人呢"\n→ "这正是我们要解决的问题——先把孩子拉回正轨，然后推荐计划会帮助您免费完成这个级别，不需要额外付费。"\n\n异议："我不确定服务够好，不敢推荐"\n→ "我理解——让我先把完整报告发给您看看。看完您就能知道已经完成了什么、还剩什么。很多和您处于同样情况的妈妈，看了报告之后都主动推荐了。"\n\n异议："我现在没有时间"\n→ "完全没关系——现在什么都不需要做。我把链接发到您的WhatsApp，您有空的时候转发给任何一位您想到的妈妈就行。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"Let me send you the report now — then we\'ll talk about the next step together."',
          '"The level finishes in X weeks — you have Y sessions left. One referral covers the gap."',
          '"I\'ll book you a VIP spot with the specialist teacher as soon as you share the link — this isn\'t available to everyone."',
          '"You don\'t need to explain anything — send the link and let the app speak for itself."',
          '"Who\'s the closest mum you have in mind right now — from the school group or from family?"'
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
          '🛑 Case 1 — Um Sara:\nSituation: Sara doesn\'t attend regularly and her mum feels guilty.\nApproach: Report + VIP.\nScript: "The report says that when Sara attends she participates very well. The issue is consistency, not ability. We have a VIP group with a reading specialist teacher — I was able to reserve a spot for her if you share the link with just one mum."\nResult: Um Sara shared the link with her neighbor\'s sister and she joined the same week.',
          '🛑 Case 2 — Um Savana:\nSituation: Savana has a large remaining balance and is close to the end of her level.\nApproach: Balance Gap.\nScript: "Savana has 8 sessions left but the level needs 14 to complete. The gap is 6 sessions — two referrals cover that gap and she finishes the level without you paying anything extra."\nResult: She shared the link with two of her friends and completed the level.',
          '🛑 Case 3 — Dr. Sara:\nSituation: Busy and not following up — saying "I\'ll have her attend later."\nApproach: Soft reactivation + referral as a solution not a demand.\nScript: "I understand you\'re busy — let me send you a flexible schedule to start with. And at the same time, this link — if you send it to any mum you have in mind, it automatically adds sessions to your balance."\nResult: She accepted the schedule and shared the link with a mum from her college group.',
          '🛑 Case 4 — Um Badr:\nSituation: Not fully satisfied because Badr "isn\'t improving fast enough."\nApproach: Report reframe + scarcity.\nScript: "The report says improvement is there but it needs more consistency. We have a specialist teacher for cases like this — but his spots are limited. If you want him for Badr, I just need you to share the link with one mum."\nResult: Um Badr agreed and shared the link with a mum from Badr\'s school.',
          '🛑 Case 5 — Um Eilan:\nSituation: Eilan hasn\'t attended for two weeks and her mum hasn\'t responded to messages.\nApproach: Winback + balance urgency.\nScript: "I noticed Eilan hasn\'t attended for two weeks — this is affecting her remaining session balance. Would you like us to arrange a free trial session this week to get her back on track? And at the same time — is there a mum in mind who could benefit?"\nResult: She came back to attending and shared the link with a mum from her gym.'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم سارة:\nالموقف: سارة مش بتحضر منتظمة وأمها حاسة بالذنب.\nالمدخل: التقرير + VIP.\nالسكريبت: "التقرير بيقول لما سارة بتحضر بتتفاعل كويس جداً. المشكلة في الانتظام مش في القدرة. عندنا جروب VIP مع مدرسة متخصصة في القراءة — قدرت أحجزلها مقعد لو شاركتِ اللينك مع أم واحدة بس."\nالنتيجة: أم سارة شاركت اللينك مع أخت جارتها وانضمت في نفس الأسبوع.',
          '🛑 الحالة 2 — أم سفانا:\nالموقف: سفانا عندها رصيد كبير متبقي وقريبة من نهاية المستوى.\nالمدخل: فجوة الرصيد.\nالسكريبت: "سفانا عندها 8 حصص بس المستوى محتاج 14 عشان يخلص. الفرق 6 حصص — ريفيرالين بيغطوا الفرق ده وبتخلصي المستوى من غير ما تدفعي أي زيادة."\nالنتيجة: شاركت اللينك مع اتنين من صحباتها وكملت المستوى.',
          '🛑 الحالة 3 — دكتورة سارة:\nالموقف: مشغولة ومش بتتابع — بتقول "هخليها تحضر بعدين".\nالمدخل: إعادة تفعيل لطيفة + ريفيرال كحل مش كمطلوب.\nالسكريبت: "أنا فاهمة إنك مشغولة — خليني أبعتلك جدول مرن نبدأ بيه. وفي نفس الوقت، اللينك ده لو بعتيه لأي أم في بالك بيضيف حصص على رصيدك تلقائي."\nالنتيجة: قبلت الجدول وشاركت اللينك مع أم من جروب الكلية.',
          '🛑 الحالة 4 — أم بدر:\nالموقف: مش راضية تماماً لأن بدر "مش بيتحسن بسرعة".\nالمدخل: إعادة تأطير التقرير + الندرة.\nالسكريبت: "التقرير بيقول إن التحسن موجود بس بيحتاج انتظام أكتر. إحنا عندنا مدرس متخصص في الحالات دي — بس مقاعده محدودة. لو عايزاه لبدر، أحتاج تشاركي اللينك مع أم واحدة بس."\nالنتيجة: أم بدر وافقت وشاركت اللينك مع أم من مدرسة بدر.',
          '🛑 الحالة 5 — أم إيلان:\nالموقف: إيلان مش بتحضر من أسبوعين وأمها مش ردت على الرسايل.\nالمدخل: استعادة + إلحاح الرصيد.\nالسكريبت: "لاحظت إن إيلان مش حضرت من أسبوعين — ده بيأثر على رصيدها اللي باقي. عايزة نرتب حصة تجريبية مجانية الأسبوع ده عشان نرجعها على المسار؟ وفي نفس الوقت — في أم في بالك ممكن تستفيد؟"\nالنتيجة: رجعت للحضور وشاركت اللينك مع أم من النادي.'
        ],
        items_zh:[
          '🛑 案例1——CM × 萨拉妈妈：\n情况：萨拉上课不规律，妈妈感到愧疚。\n切入点：学习报告 + VIP稀缺感。\n话术："报告显示，萨拉每次来上课都参与度很高。问题在于规律性，不在于能力。我们有一个专注阅读的VIP小组，专业老师带班——如果您把链接分享给一位妈妈，我可以为萨拉预留一个名额。"\n结果：萨拉妈妈把链接分享给了邻居的姐姐，同一周就加入了。',
          '🛑 案例2——CM × 斯法娜妈妈：\n情况：斯法娜还有大量剩余课时，但级别即将结束。\n切入点：余额缺口策略。\n话术："斯法娜还有8节课，但完成这个级别需要14节。差了6节——2个推荐就能填补这个缺口，完全不需要额外付费。"\n结果：她把链接分享给了2位朋友，顺利完成了级别。',
          '🛑 案例3——CM × 萨拉医生：\n情况：很忙、没有跟进——说"等有时间再让孩子上课"。\n切入点：温和重激活 + 将推荐定位为解决方案而非要求。\n话术："我理解您很忙——我来为您设计一个灵活的时间表，我们从这里开始。同时，这个推荐链接，转发给任何一位您想到的妈妈，课时就会自动添加到您的余额里。"\n结果：接受了时间表安排，并把链接分享给了大学群里的一位妈妈。',
          '🛑 案例4——CM × 贝德尔妈妈：\n情况：不太满意，因为贝德尔"进步不够快"。\n切入点：报告重新框架 + 稀缺感。\n话术："报告显示进步是有的，只是需要更规律地上课。我们有一位专门处理这类情况的老师——但名额有限。如果您想让贝德尔跟他学，我需要您把链接分享给一位妈妈。"\n结果：贝德尔妈妈同意了，把链接分享给了贝德尔学校的一位妈妈。',
          '🛑 案例5——CM × 伊兰妈妈：\n情况：伊兰两周没上课，妈妈也没回复消息。\n切入点：挽回 + 余额紧迫感。\n话术："我注意到伊兰已经两周没来上课了——这会影响她剩余的课时余额。这周您愿意安排一节免费体验课让她回来吗？另外——您身边有没有哪位妈妈也可能感兴趣？"\n结果：重新开始上课，并把链接分享给了健身房认识的一位妈妈。'
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
        text_ar:'استخدام القرب من جائزة الآيباد لتحويل الآباء الراضين إلى مصادر ريفيرال نشطة. الآلية الجوهرية: اجعل العميل يشعر أنه ريفيرال واحد أو اثنان بعيداً عن جائزة يريدها طفله — مما يخلق إلحاحاً وتحدياً شخصياً. لا يُقدَّم الآيباد قط بوصفه "عرض الشركة" بل بوصفه "هدف أنتِ توشكين على الوصول إليه."',
        text_zh:'利用iPad奖励的临近感，将满意的家长转化为积极的推荐来源。核心机制：让客户感觉自己距离孩子心仪的奖品只差一两个推荐——制造紧迫感和个人挑战感。iPad从不以"公司优惠"的形式出现，而始终被定位为"您几乎快达到的目标"。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Five psychological triggers make the iPad work:\n\n(1) PRIZE PROXIMITY: "Only 2 more" is the most powerful phrase. Near-completion creates an almost irresistible urge to finish.\n(2) CHILD AS MOTIVATOR: "The iPad goes to your son/daughter" — parent is doing it for the child, not for themselves. Removes ego barrier.\n(3) SOCIAL PROOF: "Other families have already won iPads" normalises the achievement and proves it\'s real.\n(4) REWARD LADDER: Having iPad at step 4 (not step 1) creates a progression that keeps customers engaged across multiple referral attempts.\n(5) GUARANTEED, NOT A DRAW: "The prize is not a raffle" — certainty eliminates doubt.',
        text_ar:'خمسة محفزات نفسية تجعل الآيباد يعمل:\n\n(1) القرب من الجائزة: "اثنان فقط" هي أقوى عبارة. القرب من الإتمام يخلق دافعاً شبه لا يُقاوَم للإنهاء.\n(2) الطفل كمحرّك: "الآيباد سيذهب لابنك/ابنتك" — الوالد يفعله من أجل الطفل لا نفسه. يزيل حاجز الأنا.\n(3) الإثبات الاجتماعي: "أسر أخرى ربحت آيبادات بالفعل" يُطبّع الإنجاز ويُثبت أنه حقيقي.\n(4) سلّم المكافآت: وضع الآيباد في الخطوة 4 (لا الأولى) يُنشئ تقدماً يُبقي العملاء منخرطين عبر محاولات ريفيرال متعددة.\n(5) مضمون لا سحب: "الجائزة مو بتدخل سحب" — اليقين يُزيل الشك.',
        text_zh:'iPad奖励背后的五大心理触发机制：\n\n（1）临近奖励："只差两个了"是最有力的表达。快要完成的感觉会产生几乎无法抗拒的冲动。\n（2）孩子是动力："iPad是给孩子的"——家长是为孩子去做，不是为自己。消除了自我障碍。\n（3）社会证明："已经有其他家庭拿到iPad了"——使这个成就正常化，证明它是真实可得的。\n（4）奖励阶梯：将iPad设置在第4步（而非第1步），营造出一种进阶感，让客户在多次推荐中保持投入。\n（5）保证奖励，非抽奖："奖品不是抽奖制度"——确定性消除疑虑。' },
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
        ],
        items_zh:[
          '客户已推荐1-3人时——向他展示与目标的差距',
          '给出孩子的正面进展更新后——家长在情感上最为开放',
          '客户提到孩子想要"什么东西"或询问奖励时',
          '高课时消耗阶段——家长积极投入，对平台价值充满信心',
          '接近月底时——以"本月奖励窗口"制造紧迫感'
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
        ],
        items_zh:[
          '推荐记录中已有1-3个成功推荐——接近iPad门槛',
          '孩子规律且热情地参与课程',
          '家长提到学校群、WhatsApp群或教育社群',
          '曾经成功推荐过他人——有良好的推荐记录',
          '家长问"如果我推荐别人会怎样？"——表现出主动好奇心'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Child progress update ⬅️ Open referral log together in the app ⬅️ Show current count: "you have X subscribed from your side" ⬅️ "You only need Y more for the iPad" ⬅️ Show new prizes (Jarir vouchers, PlayStation, iPad, Umrah) ⬅️ "Share in your WhatsApp groups — I\'ll create a personal discount code for you" ⬅️ "Don\'t let them sign up alone — send me the number and I\'ll link it to your account" ⬅️ Send prize photos via WhatsApp',
        text_ar:'تحديث تقدم الطفل ⬅️ فتح سجل الريفيرال معاً في التطبيق ⬅️ إظهار العدد الحالي: "اشترك X أشخاص من طرفك" ⬅️ "تحتاجين Y فقط للآيباد" ⬅️ عرض الجوائز الجديدة (قسائم جرير، بلاي ستيشن، آيباد، عمرة) ⬅️ "شاركي في مجموعات الواتساب — سأنشئ لك كود خصم شخصي" ⬅️ "لا تدعيهم يسجلون بمفردهم — أرسلي لي الرقم وسأربطه بحسابك" ⬅️ إرسال صور الجوائز عبر الواتساب',
        text_zh:'孩子学习进展更新 ⬅️ 一起在应用中打开推荐记录 ⬅️ 显示当前数量："已有X人通过您的推荐订阅" ⬅️ "您只需再推荐Y人就能拿到iPad" ⬅️ 展示新奖励（购物券、PlayStation、iPad、朝圣券）⬅️ "在WhatsApp群里分享——我来为您创建专属折扣码" ⬅️ "不要让他们自己注册——把号码发给我，我来绑定到您的账户" ⬅️ WhatsApp发送奖品图片' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Prize Ladder: "Three subscriptions and you get 400 SAR — either a Jarir voucher or a PlayStation subscription — four subscriptions and you choose between an iPad or an Umrah voucher." (Um Dialaa)',
          'Number Gap: "Now if there are two more through you, you get 20 free sessions for each one and you get an iPad just like that." (Um Ali)',
          'Near-win Hook: "Since you\'ve now seen what happens when you refer… do you have someone else? You\'re now getting closer to the iPad." (Um Tamim)',
          'Guarantee Phrase: "The prize is not a draw — the prize is guaranteed, for certain." (Um Fatima)',
          'No Solo Signup: "Don\'t let them sign up alone — give me their number and I\'ll link them directly to Ali\'s account." (Um Ali)'
        ],
        items_ar:[
          'سلّم الجوائز: "ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة." (أم ديالى)',
          'فجوة العدد: "هلا لو في كمان اثنين عن طريقك بتاخذي 20 حصه مجانيه عن كل واحد وبتاخذي هيك ايباد." (أم علي)',
          'خطاف قرب الفوز: "بما انك انت الحين شفتي كيف لما رشحتي... عندك حدا كمان يعني انت الحين صرت قربتي على الايباد." (أم تميم)',
          'عبارة الضمان: "الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد." (أم فاطمة)',
          'لا تسجيل فردي: "ما يفوتوا لحالهم — بتزوديني انا بحس برقمهم وبربطهم على حساب علي." (أم علي)'
        ],
        items_zh:[
          '奖励阶梯话术："3个订阅 = 400里亚尔购物券或PlayStation订阅——4个订阅，您可以选iPad或1600里亚尔的朝圣券。"',
          '数量差距话术："现在只要再有2个人通过您的推荐订阅，每人给您20节免费课，加起来就能拿到iPad了。"',
          '临近成功钩子话术："您已经看到推荐带来的效果……您还有联系人吗？您现在离iPad越来越近了。"',
          '保证奖励话术："奖品不是抽奖制——是百分百确定能得到的。"',
          '禁止单独注册话术："不要让他们自己注册——把号码发给我，我来直接绑定到您的账户上。"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Prize Gap Opener:\n"Only two more people to go and you get the iPad… look at the new gifts… three subscriptions and you get 400 SAR — either a Jarir voucher or a PlayStation subscription — four subscriptions and you choose between an iPad or an Umrah voucher worth 1600 SAR." (Um Dialaa)\n\nReferral Log Walkthrough:\n"Open the app and go to My Account → Referral Log. You currently have two people subscribed through you. And if there are two more through you, you get 20 free sessions per person plus the iPad." (Um Ali)\n\nMonth-End Urgency:\n"Only one subscription left and you get the iPad device… anyone you feel is interested — send me their number." (Um Nasser)',
        text_ar:'افتتاح فجوة الجائزة:\n"ضيلكم شخصين وبتاخذ وتربحوا الايباد... شوفي الهدايا الجديدة... ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)\n\nعرض سجل الريفيرال:\n"افتحي التطبيق وروحي على حسابي → سجل الدعوات. عندك حاليًا شخصين اشتركوا عن طريقك. ولو في شخصين كمان بتاخذي 20 حصة مجانية عن كل واحد + الأيباد." (أم علي)\n\nإلحاح نهاية الشهر:\n"باقي اشتراك واحد وتحصلوا على جهاز الآيباد… أي حدا تحسينه مهتم أرسلي رقمه." (أم ناصر)',
        text_zh:'奖品差距开场话术：\n"再差2个人，您就能拿到iPad了……看看这些新奖励……3个订阅可以选400里亚尔购物券或PlayStation订阅——4个订阅，您可以自己选iPad或1600里亚尔的朝圣券。"\n\n推荐记录展示话术：\n"打开应用，进入我的账户→推荐记录。您目前已有2人通过您成功订阅。如果再有2人，每人给您20节免费课，加上iPad。"\n\n月底紧迫话术：\n"只差最后一个订阅，您就能拿到iPad了……有没有感兴趣的朋友？把号码发给我。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"We brought people and where\'s the prize?" (Previously promised an iPad)\n→ "As long as an iPad was promised to you, you\'ll get it — as long as someone told you that you had it. Don\'t worry — whatever you were promised, God willing it will come to you." (Um Khalifa)\n\n"Honestly, these are the only people I have."\n→ "Let\'s see, Um Tamim — just one or two more subscriptions and you\'ll be close to the vouchers." (Um Tamim)\n\n"May God provide for us."\n→ "Be at ease — just send me numbers on WhatsApp and the rest is on me." (Um Badr)',
        text_ar:'"جبتنا ناس ووين الهدية؟" (وعد سابق بآيباد)\n→ "طالما انت ليكي ايباد هتاخذي الايباد طالما هو حد قال لك انك ليكي. ما يعني هو ما تقلقيش طالما انت اوعدتي بحاجة باذن الله هتجي لك." (أم خليفة)\n\n"والله ما عندي إلا هذول."\n→ "بحبشي شوفي يا أم تميم، اشتراك هيك كمان واحد أو اثنين توصلي تقريبا للقسائم." (أم تميم)\n\n"الله يرزقنا يا رب."\n→ "انت واسعي وابعثي لي أرقام واتسك الباقي علي." (أم بدر)',
        text_zh:'异议："我介绍了那么多人，奖品在哪里？"（之前被承诺过iPad）\n→ "只要iPad是对您的承诺，那这个奖励就是您的。放心，只要当初有人答应过您，这个奖励就会兑现的。"\n\n异议："我真的没有更多人选了。"\n→ "没关系，哪怕再有一两个人订阅，您就离购物券奖励很近了。"\n\n异议："希望老天保佑吧。"\n→ "您放宽心，把号码发给我，剩下的都交给我来处理。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"I want you to send this to your groups… this is a new link for our champion… try to encourage the mums."',
          '"Tell her — she told me you liked it, so I want to help you get the same discount she got."',
          'WhatsApp: "🎁 Here are the new prize photos — only two people left for you to reach the iPad ✨"',
          'WhatsApp: "This is your personal referral link 🌷 Anyone who registers through it gets added directly to your account."',
          '"If four people register through you in the same month — congratulations, the iPad gets delivered to your door."'
        ],
        items_ar:[
          '"أبغى ارسلي هذا على الجروبات... هذا رابط جديد للبطلة... حاولي تشجعي الأمهات."',
          '"قولي لها والله قالت لي انك حابه فانا حابه افيدك تاخذين نفس الخصم دياله."',
          'واتساب: "🎁 هاي صور الجوائز الجديدة — باقي لكم شخصين فقط للوصول للأيباد ✨"',
          'واتساب: "هذا رابط الدعوات الخاص فيكم 🌷 أي شخص يسجل من خلاله ينضاف مباشرة على حسابكم."',
          '"إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت."'
        ],
        items_zh:[
          '"帮我把这个发到家长群里……这是给您这位推荐达人的专属链接……去鼓励其他妈妈们吧。"',
          '"告诉她，她说您很喜欢这个平台，我也希望帮助她享受同样的优惠折扣。"',
          'WhatsApp："🎁 这是最新的奖品图片——您只差2个人就能拿到iPad了✨"',
          'WhatsApp："这是您的专属推荐链接🌷 任何通过它注册的人都会直接计入您的账户。"',
          '"如果本月有4人通过您的推荐订阅，恭喜您，iPad会直接送到您家门口。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — Um Dialaa:\n"You have two subscribed through you, right? Yes, one I\'m sure of… Reilam and Layla. Only two more to go and you get the iPad… look at the new gifts… three subscriptions and you get 400 SAR — either a Jarir voucher or a PlayStation subscription — four subscriptions and you choose between an iPad or an Umrah voucher worth 1600 SAR."',
          '🛑 Case 2 — Um Ali:\n"Let me talk to you so you can get the prizes… open the app and go to My Account… Referral Log. You currently have two people subscribed through you. Now if there are two more through you, you get 20 free sessions for each one and you get an iPad just like that."',
          '🛑 Case 3 — Um Tamim:\n"Congratulations — your sister Um Lamis registered for Reteel today… you\'ve now earned 25 extra sessions for Tamim. Since you\'ve now seen what happens when you refer… you\'re now getting closer to the bigger prizes, closer to Jarir vouchers, closer to the iPad."',
          '🛑 Case 4 — Um Fatima:\n"I want you on WhatsApp to send me numbers of interested people. For example, 3 people and you get an iPad… 2 people and you get an iPhone… the prize is not a draw — the prize is guaranteed, for certain."',
          '🛑 Case 5 — Um Salman:\n"She agreed, she said OK, once both of them register I\'ll have brought three subscriptions… once they register, your iPad is secured — the iPad will come to you."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم ديالى:\n"انتم مشتركين اثنين عن طريقكم صح؟ ايوه واحدة انا متأكدة منهم... ريلام وليلى. ضيلكم شخصين وبتاخذ وتربحوا الايباد... شوفي الهدايا الجديدة... ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال."',
          '🛑 الحالة 2 — أم علي:\n"هلا بحكي معك انا عشان تاخذي الجوائز... افتحي وروحي على كلمة حسابي... سجل الدعوات. عندك حاليًا شخصين اشتركوا عن طريقك. هلا لو في كمان اثنين عن طريقك بتاخذي 20 حصه مجانيه عن كل واحد وبتاخذي هيك ايباد."',
          '🛑 الحالة 3 — أم تميم:\n"ألف مبارك اختك أم لميس اللي هي امتيل اشتركت لرتيل... حصلتي انت الحين على 25 حصه لتميم إضافية. بما انك انت الحين شفتي كيف لما رشحتي... انت الحين صرت قربتي على الجوائز الاكبر قربتي على القسائم من جرير قربتي على الايباد."',
          '🛑 الحالة 4 — أم فاطمة:\n"بدي إياك على الواتساب تبعثي لي أرقام أشخاص مهتمين. 3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          '🛑 الحالة 5 — أم سلمان:\n"خلاص وافقت قالت خلاص إن شاء الله بس بسجلهم الاثنتين يصير أنا جبت ثلاث اشتراكات.. خلاص كدة أنت خلاص أول ما تسجل تضمنين الآيباد خلاص يوصل لك الآيباد."'
        ],
        items_zh:[
          '🛑 案例1——CM × 迪亚拉妈妈：\n"您现在已经有2个推荐订阅了，对吗？是的，我确认有莱拉姆和莱拉。再差2个人，您就能拿到iPad了……看看这些新奖励……3个订阅可以选400里亚尔购物券或PlayStation订阅——4个订阅，您可以自己选iPad或1600里亚尔的朝圣券。"',
          '🛑 案例2——CM × 小明妈妈：\n"我来陪您一起领奖励……打开应用，进入我的账户……推荐记录。您目前已有2人成功订阅。如果再有2人，每人给您20节免费课，加上iPad。"',
          '🛑 案例3——CM × 泰明妈妈：\n"恭喜您！您姐姐已经给罗图尔完成了订阅……您现在已经为泰明额外获得了25节课。既然您已经看到推荐的效果……您现在离更大的奖励越来越近了，越来越近购物券，越来越近iPad。"',
          '🛑 案例4——CM × 法蒂玛妈妈：\n"我希望您在WhatsApp上发给我感兴趣的朋友号码。比如3个人就能拿iPad……2个人可以拿iPhone……奖品不是抽奖制——是百分百确定能得到的。"',
          '🛑 案例5——CM × 萨尔曼妈妈：\n"她同意了，说好的，就这两个人注册完，我就推荐了3个了……好，只要注册完成，您的iPad就锁定了，iPad会送到您手上。"'
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
        text_ar:'يُوضع الآيفون في الخطوة 5 من سلّم المكافآت — الجائزة القصوى التي تتطلب 5 اشتراكات. دوره منع العملاء من التوقف بعد الآيباد (الخطوة 4) بالكشف عن هدف أكبر يعلوه مباشرة. يُقدَّم بوصفه مكافأة تقدّم لا عرضاً افتتاحياً. الأكثر فاعلية حين يكون العميل محفوزاً بالآيباد مسبقاً ويحتاج سبباً للاستمرار.',
        text_zh:'iPhone位于奖励阶梯的第5步——需要5个订阅才能获得的终极大奖。它的作用是在客户拿到iPad（第4步）后，通过揭示紧接其上的更大目标，阻止他们止步不前。iPhone始终作为"进阶奖励"而非开场优惠来呈现。最有效的时机是：客户已经因iPad而充满动力，但需要一个继续推进的理由。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'The iPhone triggers two psychological mechanisms:\n\n(1) REWARD ESCALATION: Having seen the iPad at step 4, the customer naturally wonders "what\'s next?" The iPhone answers that question and extends referral behaviour beyond the first prize win.\n\n(2) STATUS PRIZE: An iPhone is a status symbol. Winning one through referrals means you are "a top referrer" — this appeals to social and competitive personalities.\n\nKey distinction from iPad: the iPhone is not usually the opening offer. It is the "what if I keep going?" answer that a CM drops after the customer has already shown high referral intent.',
        text_ar:'يُفعِّل الآيفون آليتين نفسيتين:\n\n(1) تصاعد المكافأة: بعد رؤية الآيباد في الخطوة 4، يتساءل العميل طبيعياً "ما التالي؟" الآيفون يُجيب على هذا السؤال ويُمدّد سلوك الريفيرال ما بعد الفوز بالجائزة الأولى.\n\n(2) جائزة المكانة: الآيفون رمز مكانة اجتماعية. الفوز به عبر الريفيرال يعني أنك "مرشِّح متميز" — يستهوي الشخصيات الاجتماعية والتنافسية.\n\nالتمييز الجوهري عن الآيباد: الآيفون عادةً ليس العرض الافتتاحي. هو جواب "ماذا لو واصلت؟" الذي يُلقيه الـ CM بعد أن يُظهر العميل نية ريفيرال عالية.',
        text_zh:'iPhone触发两种心理机制：\n\n（1）奖励升级：看到iPad在第4步之后，客户自然会好奇"下一个是什么？"iPhone回答了这个问题，将推荐行为延伸至拿到第一个奖品之后。\n\n（2）地位奖励：iPhone是社会地位的象征。通过推荐赢得一部iPhone，意味着"您是顶级推荐达人"——对社交型和竞争型人格特别有吸引力。\n\n与iPad的核心区别：iPhone通常不是开场优惠，而是CM在客户已经表现出高度推荐意愿之后，给出的"如果继续下去会怎样？"的回答。' },
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
        ],
        items_zh:[
          '客户已有3-4个推荐并正在冲击iPad时',
          '确认iPad里程碑之后："如果您想继续，5个订阅 = iPhone"',
          '对于拥有广泛人脉的高积极性社交型客户',
          '当客户问"有没有比iPad更大的奖励？"时',
          '合作/佣金对话中，用来展示完整的奖励阶梯'
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
        ],
        items_zh:[
          '已有2-3个推荐且充满热情——会对"5个 = iPhone"有强烈反应',
          '拥有广泛社交网络（老师、社区领袖、活跃的WhatsApp群管理员）',
          '提到iPad但似乎想要"更大的东西"',
          '曾询问过超出当前奖励级别的奖励',
          '活力充沛、竞争心强的性格——对地位型激励有强烈反应'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Confirm current referral count ⬅️ Show iPad milestone (4 subscriptions) ⬅️ Transition: "And if you want to keep going..." ⬅️ Reveal iPhone at 5 subscriptions ⬅️ "Some families with large networks have reached this in one month" ⬅️ Create personal discount code or referral link ⬅️ Follow up via WhatsApp with full prize chart',
        text_ar:'تأكيد عدد الريفيرالات الحالي ⬅️ إظهار إنجاز الآيباد (4 اشتراكات) ⬅️ الانتقال: "وإذا أردتِ الاستمرار..." ⬅️ الكشف عن الآيفون عند 5 اشتراكات ⬅️ "بعض الأسر ذات الشبكات الواسعة وصلت إلى هذا في شهر واحد" ⬅️ إنشاء كود خصم شخصي أو رابط ريفيرال ⬅️ متابعة عبر الواتساب بجدول الجوائز الكامل',
        text_zh:'确认当前推荐数量 ⬅️ 展示iPad里程碑（4个订阅）⬅️ 过渡："如果您想继续……" ⬅️ 揭示5个订阅 = iPhone ⬅️ "一些拥有广泛人脉的家庭在一个月内就做到了" ⬅️ 创建专属折扣码或推荐链接 ⬅️ WhatsApp跟进发送完整奖励图表' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Ladder Extension: "Two more and you get an iPhone" — after iPad is mentioned at 3 subscriptions (Um Fatima)',
          'Guarantee Reminder: "The prize is not a draw — the prize is guaranteed, for certain."',
          'Network Activation: "Anyone you have — send them, don\'t hold back." (Um Yaser/Fahad)',
          'Voice Message Prompt: "Send a voice message to your groups with the link — I\'ll now set up a special discount code for you."'
        ],
        items_ar:[
          'تمديد السلّم: "شخصين بتاخذ مثلاً آيفون" — بعد ذكر الآيباد عند 3 اشتراكات (أم فاطمة)',
          'تذكير الضمان: "الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          'تفعيل الشبكة: "أي أحد موجود عندك أرسلي له لا تشيلي هم." (أم ياسر/فهد)',
          'طلب الرسالة الصوتية: "أرسلي رسالة صوتية للجروبات مع الرابط — الآن بصلح لك كود خصم خاص."'
        ],
        items_zh:[
          '阶梯延伸话术："再推荐2人就能拿iPhone"——在提到iPad（3个订阅）之后引出',
          '保证奖励提醒："奖品不是抽奖制，是百分百确定能得到的。"',
          '激活社交网络："您身边有谁，就发给谁，不用担心。"',
          '语音消息引导："在群里发一条语音消息，附上链接——我现在就给您设置一个专属折扣码。"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Prize Ladder Reveal:\n"3 people and you get an iPad… 2 more and you get an iPhone… the prize is not a draw — the prize is guaranteed, for certain." (Um Fatima)\n\nVoice Message Technique:\n"The most important thing is to send a voice message: \'Ladies, good evening — anyone who wants to join and benefit and get a discount, just click the link.\'" (Um Yaser/Fahad)\n\nTop Referrer Frame:\n"Five subscriptions and you qualify for the iPhone." (Um Satam)',
        text_ar:'كشف سلّم الجوائز:\n"3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد." (أم فاطمة)\n\nتقنية الرسالة الصوتية:\n"أهم شيء أرسلي رسالة صوتية: يا بنات مساكم الله بالخير اللي تبغى تدخل وتستفيد وتكسب خصم تضغط على الرابط." (أم ياسر/فهد)\n\nإطار المرشِّح المتميز:\n"خمس اشتراكات وتفوتي على سحب آيفون." (أم سطام)',
        text_zh:'奖励阶梯揭示话术：\n"3个订阅就能拿iPad……再多2个就是iPhone……奖品不是抽奖制，是百分百保证的。"\n\n语音消息技巧：\n"最重要的是在群里发一条语音消息：\'姐妹们好，有想参加、享受优惠、拿折扣的，点击链接就行。\'"（法哈德妈妈案例）\n\n顶级推荐达人框架：\n"5个订阅，您就进入iPhone抽奖资格了。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I posted in all the groups but I don\'t know who\'s entering under Fahad\'s account."\n→ "The most important thing is to send a voice message… now I\'ll set up a special discount code — would you like the code to be in the name of Um Fahad?" (Um Yaser/Fahad)\n\n"I don\'t really want them all coming and registering in the same month."\n→ Response: The customer herself told the CM she has 3 people ready — this is very high value. (Um Salman)\n\n"I don\'t have more people."\n→ "Even just one or two people could get you to the prize."',
        text_ar:'"أنا أرسلت في الجروبات كلها بس اللي ما أدري من اللي يدخل على ضمن فهد."\n→ "أهم شيء أرسلي رسالة صوتية... الآن أنا بصلح لك كود خصم خاص حابة كود الخصم يكون باسم أم فهد." (أم ياسر/فهد)\n\n"كثير ما أبغاهم يجون يسجلون في نفس الشهر."\n→ الاستجابة: العميل نفسه أخبر الـ CM أن عنده 3 أشخاص مستعدون — هذه قيمة عالية جداً. (أم سلمان)\n\n"ما عندي ناس زيادة."\n→ "حتى لو شخص أو شخصين فقط ممكن يوصلك للجائزة."',
        text_zh:'异议："我在所有群里都发了，但不知道谁是通过法哈德的账号进来的。"\n→ "最重要的是发一条语音消息……我现在来给您设置一个专属折扣码，就用法哈德妈妈的名义。"（法哈德妈妈案例）\n\n异议："我不想让太多人在同一个月注册。"\n→ 注意：客户自己透露了她有3位朋友已经准备好了——这是极高价值的线索，CM应立即锁定承诺并引导绑定流程。（萨尔曼妈妈案例）\n\n异议："我没有更多人了。"\n→ "哪怕只有一两个人，就有可能帮您拿到奖励了。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"Abu Faris, this lady has been on my mind for a while — take her number and call her and she\'ll register."',
          '"Now I\'ll set up a special discount code for you — would you like the code to be in the name of Um Fahad?"',
          'WhatsApp: Send the prize chart showing all tiers: sessions → voucher → iPad → iPhone',
          'WhatsApp: "This is your personal referral code ❤️ Anyone interested — send their number directly."',
          '"Don\'t forget — I genuinely want you to win the iPad." — keeping personal emotional investment'
        ],
        items_ar:[
          '"أبو فارس هذه الحرمة في بالي من زمان خذ رقمها وكلمها وبتسجل."',
          '"الآن أنا بصلح لك كود خصم خاص حابة كود الخصم يكون باسم أم فهد."',
          'واتساب: أرسل جدول الجوائز يُظهر كل الشرائح: حصص → قسيمة → آيباد → آيفون',
          'واتساب: "هذا كود الترشيح الخاص فيكم ❤️ أي شخص مهتم ابعثي رقمه مباشرة."',
          '"ما تنسين والله إني حابب إنكم تربحون الآيباد." — الحفاظ على الاستثمار العاطفي الشخصي'
        ],
        items_zh:[
          '主动提供具体联系人："法里斯爸爸，这位妈妈我一直记挂着，把她的号码给我，我去联系她，她会注册的。"',
          '设置专属折扣码："我现在来给您创建一个专属折扣码，就用法哈德妈妈的名字命名，怎么样？"',
          '微信发送奖励阶梯图：展示所有层级：课时 → 购物券 → iPad → iPhone',
          '微信发送专属推荐码："这是您的专属推荐链接❤️ 有感兴趣的朋友，直接把号码发给我就行。"',
          '"一定不要忘了，我真的希望您能赢到iPad。"——持续维系个人情感投入，让客户感受到CM的真诚。'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case — Um Fatima (Ladder with iPhone at tier 2):\n"I want you on WhatsApp to send me numbers of people interested in learning English… 3 people and you get an iPad… 2 more and you get an iPhone… the prize is not a draw — the prize is guaranteed, for certain."',
          '🛑 Case — Um Salman (Customer Self-Reveals High Network):\n"I swear I have three friends today but I told them to wait a bit — I don\'t want them all coming and registering in the same month… I held them back a little — actually I know a lot of people, many who want to subscribe." → CM should immediately lock in the commitment and guide the linking process.',
          '📌 KEY INSIGHT: The iPhone works best as a SEQUEL to the iPad, not as the opening pitch. Lead with iPad proximity, close the iPad deal, THEN reveal iPhone as the next challenge.'
        ],
        items_ar:[
          '🛑 الحالة — أم فاطمة (السلّم مع الآيفون في الشريحة 2):\n"بدي إياك على الواتساب تبعثي لي أرقام أشخاص مهتمين بتعلم اللغة الإنجليزية.. 3 أشخاص مثلاً بتاخذ آيباد.. شخصين بتاخذ مثلاً آيفون.. الجائزة مو بتدخل سحب، الجائزة بتكون من دون سحب على الأكيد."',
          '🛑 الحالة — أم سلمان (العميلة تكشف تلقائياً عن شبكة واسعة):\n"والله العظيم عندي ثلاثة اليوم من صديقاتي بس قلت لهم خلوه شوي أنا ما أبغاهم يجون يسجلون في نفس الشهر.. وعطلتهم شوي ولا أنا عندي كثيرين والله كثيرين يبغون يشتركون." ← على الـ CM أن يُحكم الالتزام فوراً ويُوجّه عملية الربط.',
          '📌 رؤية أساسية: الآيفون يعمل بشكل أفضل كـ "تكملة" للآيباد لا كالطرح الافتتاحي. ابدأ بالقرب من الآيباد، أغلق صفقة الآيباد، ثم اكشف عن الآيفون كالتحدي التالي.'
        ],
        items_zh:[
          '🛑 案例——法蒂玛妈妈（iPhone作为第二档奖励的阶梯话术）：\n"我需要您在微信上给我发几位对学英语感兴趣的朋友号码……3个订阅就能拿iPad……再多2个就能拿iPhone……奖品不是抽奖，是百分之百保证到手的。"',
          '🛑 案例——萨尔曼妈妈（客户主动透露庞大人脉网络）：\n"我今天真的有三个闺蜜，但我告诉她们先等等，不想让她们同一个月注册……其实我认识的人很多，想订阅的也很多。"← CM应立即抓住时机，锁定承诺并引导绑定注册流程，切勿放过高价值线索。',
          '📌 核心洞察：iPhone最好作为iPad的"后续挑战"来呈现，而不是开场话题。策略顺序：先用iPad的近距离感引发兴趣 → 完成iPad订单 → 再揭示iPhone作为下一个目标，层层递进效果最佳。'
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
        text_ar:'الحصص الإضافية/المجانية هي حافز الريفيرال الأكثر استخداماً لأنها ترتبط مباشرة بتقدم الطفل الأكاديمي — مما يجعل الريفيرال يبدو هدية للطفل لا معروفاً للشركة. نوعان مختلفان من المحفزات: (1) محفز الحضور: حصص تُمنح مجرد حضور الشخص المُرشَّح حصة تجريبية. (2) محفز الاشتراك/الدفع: حصص تُمنح فقط حين يشترك الريفيرال ويدفع فعلياً. تصفية الجودة حيوية — يجب على الـ CM التأكد من أن الأرقام مهتمة حقاً لا عشوائية.',
        text_zh:'赠课是使用频率最高的推荐奖励，因为它直接与孩子的学习进步挂钩——让推荐行为变成"送给孩子的礼物"，而非帮公司的忙。两种不同触发机制：(1) 到课触发：被推荐人仅需参加体验课即可获得赠课。(2) 订阅触发：被推荐人实际付费订阅后才计入奖励。质量筛选至关重要——CM必须确保推荐的号码是真正感兴趣的人，而非随机联系人。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Extra sessions work because they bypass the "prize greed" frame and enter the "responsible parent" frame:\n\n(1) CHILD-FIRST MOTIVATION: "Your child gets more sessions" — parent feels they are investing in their child\'s future, not chasing a prize.\n(2) TANGIBLE ACADEMIC VALUE: "20 sessions worth ~800 SAR" — the financial translation makes the reward feel substantial.\n(3) LEVEL COMPLETION URGENCY: "Current balance won\'t finish the level — 2 referrals close the gap" — creates academic FOMO.\n(4) SHOW-UP TRIGGER (lower bar): Even if the referral doesn\'t subscribe, the parent still wins by getting sessions for the trial attendance — lower risk, more willingness.',
        text_ar:'الحصص الإضافية تنجح لأنها تتجاوز إطار "الجشع على الجوائز" وتدخل إطار "الوالد المسؤول":\n\n(1) دافع الطفل أولاً: "طفلك سيحصل على حصص أكثر" — يشعر الوالد أنه يستثمر في مستقبل طفله لا يطارد جائزة.\n(2) القيمة الأكاديمية الملموسة: "20 حصة تساوي ~800 ريال" — الترجمة المالية تجعل المكافأة تبدو ذات ثقل.\n(3) إلحاح إتمام المستوى: "الرصيد الحالي لن يُتم المستوى — ريفيرالان يُغلقان الفجوة" — يخلق خوفاً من الفوات الأكاديمي.\n(4) محفز الحضور (عتبة أدنى): حتى لو لم يشترك الريفيرال، يفوز الوالد بحصول على حصص مقابل الحضور التجريبي — مخاطرة أقل، استعداد أكبر.',
        text_zh:'赠课奖励之所以有效，是因为它绕开了"贪图奖品"的心理框架，直接进入"负责任家长"的框架：\n\n(1) 孩子优先动机："您的孩子能多上课"——家长感觉是在为孩子的未来投资，而不是追逐奖品。\n(2) 可量化的学术价值："20节课价值约800里亚尔"——数字转化让奖励显得更有分量。\n(3) 完成级别的紧迫感："现在的课时余额不够完成这个级别——再推荐2人就能补上缺口"——制造学业上的错失恐惧。\n(4) 到课触发（门槛更低）：就算被推荐人没有订阅，家长光凭对方参加体验课就能拿到赠课——风险更低，参与意愿更强。' },
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
        ],
        items_zh:[
          '到课触发：任何需要推荐的通话均可使用——门槛最低，转化率最高',
          '订阅触发：在确认推荐成功之后——"您朋友已经订阅了，这是您的奖励"',
          '当学生需要更多课时才能完成某个级别时——缺口制造紧迫感',
          '当家长对价格敏感、比起实物奖品更在意学习收益时',
          '在反馈积极进步情况之后——强化"课时越多，进步越快"'
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
        ],
        items_zh:[
          '家长提到孩子"课时快用完了"或"快结束了"',
          '家长比起奖品/设备，更关注孩子的教育本身',
          '家长主动问"推荐别人我能得到什么？"——直接切入赠课话术',
          '学生正处于活跃学习级别，需要稳定输入——中断会影响进步',
          '家长曾成功推荐过——展示奖励是真实到位的'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'SHOW-UP TRIGGER:\nService/update call ⬅️ "Do you know someone who might benefit?" ⬅️ "Even just attending a trial session = [X] free sessions for your child" ⬅️ Request 2-3 interested numbers ⬅️ "I\'ll contact them — don\'t let them sign up alone, send me the number" ⬅️ WhatsApp follow-up with referral link\n\nSUBSCRIPTION TRIGGER:\nPrevious referral confirmed ⬅️ "Congratulations — [name] subscribed from your side" ⬅️ "Open the app: Account → Referral Log → Claim reward" ⬅️ Live activation: choose 20 sessions or $60 ⬅️ "Sessions are worth ~800 SAR — take the sessions" ⬅️ "Anyone else in your circle?" ⬅️ WhatsApp link',
        text_ar:'محفز الحضور:\nمكالمة خدمة/تحديث ⬅️ "هل تعرفين أحداً قد يستفيد؟" ⬅️ "حتى مجرد حضور حصة تجريبية = [X] حصص مجانية لطفلك" ⬅️ طلب 2-3 أرقام مهتمة ⬅️ "سأتواصل معهم — لا تتركيهم يسجلون بمفردهم، أرسلي الرقم" ⬅️ متابعة واتساب برابط الريفيرال\n\nمحفز الاشتراك:\nتأكيد ريفيرال سابق ⬅️ "تهانينا — [الاسم] اشترك من طرفك" ⬅️ "افتحي التطبيق: حسابي → سجل الدعوات → المطالبة بالمكافأة" ⬅️ تفعيل مباشر: اختار 20 حصة أو 60 دولار ⬅️ "الحصص تساوي ~800 ريال — خذي الحصص" ⬅️ "هل يوجد أحد آخر في دائرتك؟" ⬅️ رابط الواتساب',
        text_zh:'到课触发流程：\n服务/进度跟进电话 ⬅️ "您身边有没有可能感兴趣的朋友？" ⬅️ "哪怕对方只是来参加一节体验课，就能为孩子赢得[X]节免费课时" ⬅️ 索取2-3个感兴趣的号码 ⬅️ "号码给我，我来联系——别让他们自己注册，直接给我号码就行" ⬅️ 微信发送推荐链接跟进\n\n订阅触发流程：\n确认推荐成功 ⬅️ "恭喜！[姓名]通过您的推荐已经订阅了" ⬅️ "打开App：我的账户 → 推荐记录 → 领取奖励" ⬅️ 现场操作：选择20节课或60美元现金 ⬅️ "课时价值约800里亚尔，建议选课时" ⬅️ "您还有其他朋友感兴趣吗？" ⬅️ 微信发送推荐链接' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Trial Attendance Reward: "I want you to refer people to me — they don\'t have to register — just by attending a trial session, let me add sessions for Abbas." (Um Abbas)',
          'Show-up as Low Bar: "Just send me three numbers and try — maybe one of them will attend the trial session." (Um Abbas)',
          'Value Translation: "Um Ali, I want you to enter from Mohammad\'s account and take the 20 free sessions. My advice is take the sessions — the sessions are worth around 800 SAR." (Um Ali)',
          'Chain Motivation: "Since you\'ve now seen what happens when you refer — you didn\'t even expect anyone to join." (Um Tamim)',
          'Level Gap: "Every subscription you bring earns 20 free sessions." — "If just four people subscribe, you get an iPad." (Um Sara)'
        ],
        items_ar:[
          'مكافأة الحضور التجريبي: "بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا — بمجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس." (أم عباس)',
          'الحضور كعتبة منخفضة: "أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية." (أم عباس)',
          'ترجمة القيمة: "ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي)',
          'دافع التسلسل: "بما انك انت الحين شفتي كيف لما رشحتي ما كنت متوقعه انه حدا يدخل." (أم تميم)',
          'فجوة المستوى: "كل اشتراك بتعرفيه بـ 20 حصة مجانية." — "إذا أربعة أشخاص فقط اشتركوا بتحصلي على آيباد." (أم سارة)'
        ],
        items_zh:[
          '到课奖励话术："我希望您推荐几位朋友——不需要他们一定注册，只要来参加一节体验课，我就给阿巴斯增加课时。"（阿巴斯妈妈案例）',
          '低门槛话术："您就试着发给我3个号码，说不定其中有人来参加体验课呢。"（阿巴斯妈妈案例）',
          '价值换算话术："请您进入穆罕默德的账号，领取那20节免费课——建议选课时，20节课价值约800里亚尔。"（阿里妈妈案例）',
          '连锁推荐动机："您上次推荐的时候自己都没想到会有人进来——结果真的有人注册了，对不对？"（塔米姆妈妈案例）',
          '级别缺口话术："每推荐一个订阅就送20节免费课时——如果有4位朋友订阅，您就能拿到iPad了。"（萨拉妈妈案例）'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Show-up Opening:\n"I want you to refer people to me — they don\'t have to register on the platform regularly — just by attending a trial session, let me add sessions for Abbas. Just send me three numbers and try — maybe one of them will attend the trial session." (Um Abbas)\n\nSubscription Reward Live:\n"Um Ali, I want you to enter from Mohammad\'s account and take the 20 free sessions. Go to My Account. Go to Referral Log. My advice is take the sessions — the sessions are worth around 800 SAR." (Um Ali and Mohammad)\n\nLevel Gap Urgency:\n"Kian needs a stronger foundation, that\'s why we went back to Level 1. A full level needs 144 sessions. So if you have any interested people, send me their numbers so Kian can benefit from extra sessions." (Um Kian)',
        text_ar:'افتتاح الحضور:\n"بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا بالمنصة عادي — بمجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس. أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية." (أم عباس)\n\nمكافأة الاشتراك المباشرة:\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه. روحي على حسابي. روحي على سجل الدعوات. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي ومحمد)\n\nإلحاح فجوة المستوى:\n"كيان تحتاج تأسيس أقوى عشان هيك رجعنا للمستوى الأول. والليفل كامل يحتاج 144 حصة. فإذا عندك أي أشخاص مهتمين ابعثيلي أرقامهم حتى كيان تستفيد بحصص إضافية." (أم كيان)',
        text_zh:'到课推荐开场话术：\n"我希望您推荐几位朋友——不需要他们一定注册，只要来参加一节体验课，就可以让阿巴斯的课时增加。您就试着给我3个号码，说不定有人会来的。"（阿巴斯妈妈案例）\n\n订阅成功现场领取话术：\n"请您进入穆罕默德的账号，领取那20节免费课时——点我的账户，再点推荐记录，找到阿里的名字，点击领取奖励。建议选课时，价值约800里亚尔。"（阿里与穆罕默德案例）\n\n级别缺口紧迫感话术：\n"奇安需要更扎实的基础，所以我们重新从第一级开始了——整个级别需要144节课。您身边如果有感兴趣的朋友，把号码发给我，让奇安用推荐奖励来补充课时吧。"（奇安妈妈案例）' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I got 20 extra sessions because a child from our side registered… my uncle\'s son."\n→ "Why doesn\'t Um Mohammad want to benefit from the 20 sessions? I\'ll go and talk to the aunt of the child who subscribed through us." (Um Mohammad)\n\n"You came through someone, right?"\n→ "Your friend would have gotten 20 free sessions when you subscribed. So the whole thing is really nice — I want you to be as smart as your friend and look for people who might subscribe." (Um Mohammad and Arafat)\n\n"I\'ll try to find you some numbers."\n→ "Any interested number is enough — the rest is on us."',
        text_ar:'"زادني 20 حصة هو لأن في ولد من طرفنا سجل... ولد عمي."\n→ "ليش أم محمد مش عايزة تستفيدي بالـ 20. أنا برجع أكلم حتى عمة الولد اللي اشتركت عن طريقنا." (أم محمد)\n\n"انت اجيتي عن طريق حدا صح؟"\n→ "هي صديقتك بتكون اخذت 20 حصه مجانيه لما انت اشتركتي. فالموضوع كثير حلو وبدي اياك تكوني شاطره زي صاحبيتك تشوفي لي اشخاص ممكن يشتركوا." (أم محمد وعرفات)\n\n"بحاول أطلع لك أرقام."\n→ "أي رقم مهتم يكفي والباقي علينا."',
        text_zh:'异议："系统显示我有20节额外课时，是因为有个孩子通过我注册了……是我表弟家的孩子。"\n→ "那太好了！为什么不来领取这20节课呢？我再去联系一下那个孩子的妈妈，看看还有没有其他人感兴趣。"（穆罕默德妈妈案例）\n\n异议："您是通过别人介绍来的，对吧？"\n→ "对！当初您订阅的时候，推荐您的那位朋友也拿到了20节免费课时。这个项目真的很好——我希望您也能像她一样聪明，帮我找几位可能想订阅的朋友。"（穆罕默德与阿拉法特妈妈案例）\n\n异议："我努力帮您找号码。"\n→ "有一个真正感兴趣的号码就够了，其他的事情交给我。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"I\'ll send you a link for Mohammad and I\'ll send you a link for Arafat. Just use this link to register your number so it gets recorded under your name."',
          '"Um Ghina and Firas are your relatives, right?.. If they subscribe too, you\'ll get 40 sessions or 120 dollars."',
          'WhatsApp: "🎁 Every new subscription = extra sessions that help the student progress faster."',
          'Quality Filter: "It has to be someone who is genuinely interested so you can get the full benefit."',
          'Competition Month: "This month, if you refer three people and all three have already attended the trial session and even just one of them subscribes, you get 30 free sessions." (Um Mahna)'
        ],
        items_ar:[
          '"رح ابعث لك رابط لمحمد ورح ابعث لك رابط لعرفات. هذا الرابط بس تدخلي بتسجلي عليه رقم رقم عشان ينزل على اسمك."',
          '"أم غنى وفراس دول قرايبكم صح؟.. لو اشتركوا برضه بينزل لك 40 درس أو 120 دولار."',
          'واتساب: "🎁 أي اشتراك جديد = حصص إضافية تساعد الطالب يتطور أسرع."',
          'تصفية الجودة: "لازم يكون شخص فعلاً مهتم حتى تستفيدوا كامل الاستفادة."',
          'شهر المسابقة: "الشهر ده لو أنت رشحتي ثلاث أشخاص والثلاثة أوريدي حضروا الحصة التجريبية وواحد بس منهم اشترك أنت بتحصلي 30 حصة مجاناً." (أم مهنا)'
        ],
        items_zh:[
          '"我来给穆罕默德发一个链接，再给阿拉法特发一个链接——用这个链接注册，就会自动计入您的名下。"',
          '"加纳妈妈和费拉斯是您的亲戚，对吧？……如果他们也订阅，您还能再拿40节课或120美元。"',
          '微信发送："🎁 每新增一个订阅 = 更多免费课时，帮助孩子更快进步。"',
          '质量筛选话术："必须是真正感兴趣的人推荐过来才有效，这样您才能最大化获益。"',
          '竞赛月话术："这个月如果您推荐3位朋友，3位都参加了体验课，哪怕只有1位订阅，您就能拿30节免费课时。"（穆罕纳妈妈案例）'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — Um Tamim (Subscription Trigger — Claim Live):\n"Congratulations — your sister Um Lamis subscribed for Rateel yesterday... You\'ve just earned 25 extra sessions for Tamim... Go in, choose either the sessions or $60 — but honestly, the sessions are better for Tamim."',
          '🛑 Case 2 — Um Ali and Mohammad (Live Activation Walkthrough):\n"Um Ali, I want you to go into Mohammad\'s account and claim the 20 free sessions for you.. Go to My Account.. Go to Referral Log.. You\'ll find that Ali is registered and subscribed — click on it and select Claim Reward.. I\'ll give you the choice between cash or 20 sessions.. My advice is take the sessions — the sessions are worth around 800 SAR."',
          '🛑 Case 3 — Um Abbas (Show-up Trigger — Lowest Bar):\n"I want you to refer people to me — they don\'t have to register on the platform regularly — I just want you to refer regular people, just so they attend a trial session, and let me add sessions for Abbas.. Just send me three numbers and try — maybe one of them will attend the trial session."',
          '🛑 Case 4 — Um Mahna (Competition Month — Tiered Bonus):\n"This is the referral competition.. This month, if you refer three people before the 20th of the month and all three have already attended the trial session and even just one of them subscribes, you\'ll get 30 free sessions on the kids\' account."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم تميم (محفز الاشتراك — مطالبة مباشرة):\n"ألف مبارك اختك أم لميس اللي هي امتيل اشتركت لرتيل... حصلتي انت الحين على 25 حصه لتميم إضافية... اكبسي اختاري يا الحصص يا 60 دولار لكن صراحه فضل قصص افضل لتميم."',
          '🛑 الحالة 2 — أم علي ومحمد (عرض التفعيل المباشر):\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك.. روحي على حسابي.. روحي على سجل الدعوات.. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه.. بخيرك بين فلوس او 20 حصه.. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."',
          '🛑 الحالة 3 — أم عباس (محفز الحضور — أدنى عتبة):\n"بدي إياك ترشحي لي ناس مو شرط إنهم يسجلوا بالمنصة عادي بدي هيك ترشحي ناس عادي بس مجرد إنه يحضروا حصة تجريبية خليني أزيد الحصص لعباس.. أنت ابعثي لي أنت جربي ثلاث أرقام بلكي حدا منهم حضر الحصة التجريبية."',
          '🛑 الحالة 4 — أم مهنا (شهر المسابقة — مكافأة متدرجة):\n"المسابقة بتاعة الترشيحات.. الشهر ده لو أنت رشحتي ثلاث أشخاص لحد يوم 20 الشهر والثلاثة أوريدي حضروا الحصة التجريبية وواحد بس منهم اشترك أنت بتحصلي 30 حصة مجاناً على حساب الأولاد."'
        ],
        items_zh:[
          '🛑 案例1——塔米姆妈妈（订阅触发——现场领取奖励）：\n"恭喜！您姐姐（拉提尔妈妈）昨天为孩子订阅了……您现在已经获得了25节额外课时……点进去，选择课时还是60美元——说真的，课时对塔米姆更有用。"',
          '🛑 案例2——阿里与穆罕默德妈妈（现场操作领取流程）：\n"请进入穆罕默德的账号，领取那20节免费课时——点我的账户，再点推荐记录，找到阿里已注册并订阅的记录，点击领取奖励——选课时还是20美元？建议选课时，价值约800里亚尔。"',
          '🛑 案例3——阿巴斯妈妈（到课触发——最低门槛）：\n"我希望您推荐几位朋友——不需要他们一定注册，只要来参加一节体验课，就可以让阿巴斯的课时增加。您就试着给我3个号码，说不定其中有人来的。"',
          '🛑 案例4——穆罕纳妈妈（竞赛月——阶梯奖励）：\n"这是推荐竞赛活动……本月20日之前，您推荐3位朋友，3位都参加了体验课，哪怕只有1位订阅，您就能在孩子账号上拿到30节免费课时。"'
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
        text_ar:'الكتب الإلكترونية والمواد التعليمية حافز داعم — نادراً ما تكون المحرك الوحيد للريفيرال، لكنها فعّالة جداً كإضافة للآباء ذوي التوجه الأكاديمي. تُذكر إلى جانب الحصص الإضافية في نهج الدعم الأكاديمي: "لو رشحتِ ناساً بتحصلي على حصص مجانية وكتب تعليمية للطالب." يُرسّخ الكتاب الإلكتروني صورة المنصة بوصفها شريكاً تعليمياً شاملاً لا مجرد خدمة دروس.',
        text_zh:'电子书和教学资料属于辅助性激励工具——很少作为推荐的唯一驱动力，但对于注重学习的家长来说，搭配使用效果极佳。通常与赠课一起在学业支持话术中提到："如果您推荐朋友，您就能获得免费课时，还有给孩子的教学书籍。"电子书让平台在家长心中不只是"补课平台"，而是全方位的学习伙伴。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'E-books work best with parents who:\n(1) PRIORITISE CURRICULUM: They want structured learning, not just conversation practice. Books signal academic seriousness.\n(2) FEEL THE PLATFORM IS "COMPLETE": Physical/digital books complement online sessions and make the education feel holistic.\n(3) WANT TO SEE RESULTS: Books are tangible — the parent can look at them, confirm they exist, and measure progress. Unlike sessions (which happen then disappear), books stay visible.\n\nBest used alongside sessions as a bundle: "free sessions + educational books" — never as the sole incentive.',
        text_ar:'تنجح الكتب الإلكترونية بشكل أفضل مع الآباء الذين:\n(1) يُولون المنهج أولوية: يريدون تعلماً منظماً لا مجرد تدريب على المحادثة. الكتب تُشير إلى الجدية الأكاديمية.\n(2) يشعرون أن المنصة "متكاملة": الكتب الرقمية/الورقية تُكمّل الحصص الإلكترونية وتجعل التعليم يبدو شاملاً.\n(3) يريدون رؤية نتائج: الكتب ملموسة — يمكن للوالد النظر إليها وتأكيد وجودها وقياس التقدم. خلافاً للحصص (التي تحدث ثم تختفي)، تبقى الكتب مرئية.\n\nيُستخدم بشكل أفضل مع الحصص كحزمة: "حصص مجانية + كتب تعليمية" — لا كحافز وحيد.',
        text_zh:'电子书最适合以下类型的家长：\n(1) 重视学习体系的家长：他们希望孩子系统学习，而不仅仅是练口语。书籍代表严肃的学术态度。\n(2) 希望平台"体系完整"的家长：数字书籍与在线课程相互补充，让学习感觉更全面。\n(3) 需要看到具体成果的家长：书籍是有形的——家长可以翻看、确认它的存在、追踪进度。与课时不同（上完就消失了），书籍始终可见。\n\n最佳用法是与课时打包推荐："免费课时+教学书籍"——切勿单独作为推荐激励使用。' },
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
        ],
        items_zh:[
          '在讨论学生课程或学习材料的学业支持电话中',
          '搭配赠课打包提出——"课时+书籍"比单独任何一个听起来都更有吸引力',
          '当家长问"我的孩子能获得哪些学习资源？"时',
          '面向从事教育行业、重视课程体系的家长',
          '当学生正备考（雅思/学校英语/大学英语）时——书籍显得格外直接相关'
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
        ],
        items_zh:[
          '家长询问课程内容、学习材料或孩子在课堂上学什么',
          '家长是老师或从事教育行业',
          '孩子正在备考（雅思、学校英语、大学预科）',
          '家长将平台与学校进行比较——重视系统化课程',
          '家长提到孩子在家会自主阅读或自学'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Academic support discussion ⬅️ "We also have educational materials that complement the sessions" ⬅️ Introduce e-books as part of the referral reward bundle ⬅️ "If you refer people, you get free sessions AND the educational books" ⬅️ Request interested numbers ⬅️ "I\'ll send you the details and the materials on WhatsApp"',
        text_ar:'نقاش الدعم الأكاديمي ⬅️ "لدينا أيضاً مواد تعليمية تُكمّل الحصص" ⬅️ تقديم الكتب الإلكترونية كجزء من حزمة مكافأة الريفيرال ⬅️ "لو رشحتِ ناساً بتحصلي على حصص مجانية وكتب تعليمية" ⬅️ طلب أرقام مهتمة ⬅️ "سأرسل لك التفاصيل والمواد على الواتساب"',
        text_zh:'学业支持讨论 ⬅️ "我们还有配套的教学资料，很好地补充了课程内容" ⬅️ 将电子书作为推荐奖励套餐的一部分提出 ⬅️ "推荐朋友来，您就能拿到免费课时，还有孩子专用的教学书籍" ⬅️ 索取感兴趣的联系方式 ⬅️ "我来微信发给您详细资料和相关材料"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Bundle Offer: "If you refer people you get free sessions and educational books." (Um Nuaima, Amal, and Khadija)',
          'Assessment Centre Link: "The assessments are now live in the Assessment Centre inside the app. I had sent you that if you refer people you get free sessions and educational books." (Um Nuaima)',
          'Comprehensive Package Frame: E-books + sessions + assessment = full academic partnership'
        ],
        items_ar:[
          'عرض الحزمة: "إذا رشحتي أشخاص بتاخدي حصص مجانية وكتب تعليمية." (أم نعيمة وأمل وخديجة)',
          'رابط مركز التقييم: "الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية." (أم نعيمة)',
          'إطار الحزمة الشاملة: كتب إلكترونية + حصص + تقييم = شراكة أكاديمية متكاملة'
        ],
        items_zh:[
          '套餐话术："推荐朋友来，您就能获得免费课时和教学书籍。"（纳艾玛、阿迈勒、哈迪贾妈妈案例）',
          '测评中心话术："评测题目已经上线App里的评测中心了。之前跟您说过，推荐朋友可以获得免费课时和教学书籍——您身边有感兴趣的朋友吗？发号码给我，我帮您加入纳艾玛的账号。"（纳艾玛妈妈案例）',
          '全方位学习套餐框架：电子书+课时+测评=完整学习生态，让家长感受到平台的教育深度'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Bundle with Sessions:\n"If you have any numbers, send them to me and I won\'t delay — so we can benefit Sara and increase her sessions, because every subscription you refer earns 20 free sessions."\n\nAssessment + Books:\n"The assessments are now live in the Assessment Centre inside the app. I had sent you that if you refer people you get free sessions and educational books. If you have any numbers, send them to me and I\'ll add them to Nuaima\'s account."',
        text_ar:'حزمة مع الحصص:\n"إذا عندك أي أرقام أرسليهم وأنا ما راح أتأخر علي حتى نفيد سارة حتى نكثر من حصصها لأن كل اشتراك بتعرفيه بـ 20 حصة مجانية."\n\nالتقييم + الكتب:\n"الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية. إذا عندك أي أرقام أرسليهم وأنا أضيفهم لحساب نعيمة."',
        text_zh:'与课时打包推荐：\n"您身边有感兴趣的朋友吗？发号码给我，我马上联系——这样萨拉的课时就能增加，每推荐一个订阅就是20节免费课时。"\n\n测评+书籍话术：\n"评测题目已经上线App里的测评中心了。之前跟您说过，推荐朋友可以获得免费课时和教学书籍。您身边有感兴趣的朋友吗？发号码给我，我帮您添加到纳艾玛的账号里。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"The sessions are enough — we don\'t need books."\n→ "That\'s completely fine — sessions are the foundation. Books are just an extra reference the student can go back to between sessions."\n\n"I don\'t know if people are interested."\n→ "Even if just one person is interested, they can benefit a lot from the experience."',
        text_ar:'اعتراض: "يكفينا الحصص ما محتاجين كتب."\n→ "عادي — الحصص هي الأساس. الكتب بس مرجع إضافي للطالب يرجع إليه بين الحصص."\n\nاعتراض: "ما بعرف إذا الناس مهتمة."\n→ "حتى لو شخص واحد فقط مهتم ممكن يستفيد كثير من التجربة."',
        text_zh:'异议："有课时就够了，我们不需要书。"\n→ "完全没问题——课时是核心。书籍只是额外参考资料，孩子在上课之间可以随时翻阅。"\n\n异议："我不知道有没有人感兴趣。"\n→ "哪怕只有一个人感兴趣，他也能从体验课中受益很多。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always bundle e-books with sessions — "free sessions and educational books" sounds more valuable than either alone',
          'Mention assessment centre alongside books — shows the platform has a complete academic ecosystem',
          'WhatsApp: Send the e-book sample or assessment centre screenshot to make it tangible',
          'Use with academically-motivated parents as the primary hook — then mention iPad as secondary'
        ],
        items_ar:[
          'دائماً ضمّ الكتب الإلكترونية مع الحصص — "حصص مجانية وكتب تعليمية" تبدو أكثر قيمة من كل منهما منفرداً',
          'اذكر مركز التقييم إلى جانب الكتب — يُظهر أن المنصة تمتلك منظومة أكاديمية متكاملة',
          'واتساب: أرسل نموذج كتاب إلكتروني أو لقطة شاشة لمركز التقييم لجعله ملموساً',
          'استخدم مع الآباء ذوي الدافع الأكاديمي كمحور رئيسي — ثم اذكر الآيباد ثانوياً'
        ],
        items_zh:[
          '始终将电子书与课时打包提出——"免费课时+教学书籍"组合听起来比单独任何一项都更有价值',
          '在提到书籍时同步提及测评中心——体现平台具备完整的学习生态系统',
          '微信发送电子书样本或测评中心截图，让奖励变得可感知、可验证',
          '面对学习型家长，以此作为主要切入点——之后再把iPad作为附加升级项提出'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case — Um Nuaima, Amal, and Khadija (Academic Support + Books Bundle):\n"The assessments are now live in the Assessment Centre inside the app. I had sent you that if you refer people you get free sessions and educational books. If you have any numbers, send them to me and I\'ll add them to Nuaima\'s account."',
          '📌 KEY INSIGHT: E-books are most effective as a bundle upgrade — they make the referral reward feel "complete" rather than purely financial. For academically serious parents, books signal that the platform takes education seriously — which strengthens trust and referral confidence.',
          '📌 USAGE NOTE: Do not lead with e-books as the sole incentive. Always pair with sessions (primary) + books (secondary) for maximum perceived value.'
        ],
        items_ar:[
          '🛑 الحالة — أم نعيمة وأمل وخديجة (دعم أكاديمي + حزمة كتب):\n"الاختبارات نزلت بمركز التقييم داخل التطبيق. وكنت بعثت لك إنه إذا رشحتي أشخاص بتحصلي على حصص مجانية وكتب تعليمية. إذا عندك أي أرقام أرسليهم وأنا أضيفهم لحساب نعيمة."',
          '📌 رؤية أساسية: الكتب الإلكترونية الأكثر فاعلية كترقية حزمة — تجعل مكافأة الريفيرال تبدو "مكتملة" لا مالية بحتة. بالنسبة للآباء الجادين أكاديمياً، تُشير الكتب إلى أن المنصة تأخذ التعليم بجدية — مما يُعزز الثقة وثقة الريفيرال.',
          '📌 ملاحظة الاستخدام: لا تبدأ بالكتب الإلكترونية كحافز وحيد. دائماً اجمع مع الحصص (أساسي) + الكتب (ثانوي) لأقصى قيمة مُدرَكة.'
        ],
        items_zh:[
          '🛑 案例——纳艾玛、阿迈勒、哈迪贾妈妈（学业支持+书籍套餐）：\n"评测题目已经上线App里的测评中心了。之前跟您说过，推荐朋友可以获得免费课时和教学书籍。您身边有感兴趣的朋友吗？发号码给我，我帮您添加到纳艾玛的账号里。"',
          '📌 核心洞察：电子书最有效的用法是作为"套餐升级"——让推荐奖励感觉"完整"，而不只是钱的问题。对于认真对待教育的家长，书籍传递出"平台认真做教育"的信号，从而增强信任感和推荐意愿。',
          '📌 使用说明：不要单独以电子书作为推荐激励。始终以课时（主要）+书籍（辅助）的形式搭配出现，效果最大化。'
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
        text_ar:'قسائم التسوق (أساساً مكتبة جرير، بالإضافة إلى قسائم بلاي ستيشن والعمرة) تقع في المنتصف من سلّم المكافآت — عادةً عند 2-3 اشتراكات. تُوضع بين الحصص المجانية (الشريحة المنخفضة) والآيباد/الآيفون (الشريحة العليا). مرونتها (الاختيار بين أنواع القسائم) تستهوي الآباء الذين لا يريدون بالضرورة جهازاً تقنياً لكنهم يُقدّرون رصيد تسوق عملياً لعائلاتهم.',
        text_zh:'购物券（主要是贾里尔书店礼品卡，以及PlayStation和小额旅游券）处于奖励阶梯的中间层——通常对应2-3个订阅。它们夹在免费课时（低档）和iPad/iPhone（高档）之间。其灵活性（可以在多种券型之间选择）吸引那些不一定想要电子设备、但重视实用购物额度的家长。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Vouchers trigger different motivation from devices:\n\n(1) PRACTICAL UTILITY: "Jarir voucher = I can buy books, supplies, or gifts for my family" — more immediately useful than an iPad for some parents.\n(2) CHOICE POWER: "You can choose: Jarir voucher OR PlayStation OR iPad" — giving the customer a choice creates ownership of the reward.\n(3) HALAL/MODEST ALTERNATIVE: For parents who feel uncomfortable competing for "luxury" items, a 400 SAR Jarir voucher feels more appropriate and attainable.\n(4) UMRAH FRAMING: The Umrah voucher (1600 SAR value at 4 subscriptions) is a deeply emotional incentive for Muslim parents — positions the referral as a spiritually meaningful act.',
        text_ar:'القسائم تُفعِّل دوافع مختلفة عن الأجهزة:\n\n(1) الفائدة العملية: "قسيمة جرير = أقدر أشتري كتب أو لوازم أو هدايا لعائلتي" — أكثر فائدة فورية من الآيباد لبعض الآباء.\n(2) سلطة الاختيار: "تقدرين تختارين: قسيمة جرير أو بلاي ستيشن أو آيباد" — إعطاء العميل خياراً يخلق ملكية للمكافأة.\n(3) البديل المناسب/المتواضع: للآباء الذين يشعرون بعدم ارتياح من التنافس على سلع "فاخرة"، قسيمة جرير بـ 400 ريال تبدو أكثر ملاءمة وقابلية للتحقيق.\n(4) إطار العمرة: قسيمة العمرة (قيمة 1600 ريال عند 4 اشتراكات) حافز عاطفي عميق للآباء المسلمين — يُرسّخ الريفيرال بوصفه عملاً ذا معنى روحي.',
        text_zh:'购物券触发的动机与电子设备不同：\n\n(1) 实用价值："书店购物券=可以买书、学习用品或家庭礼品"——对某些家长来说比iPad更直接有用。\n(2) 选择权归属感："您可以选择：书店券、游戏订阅，或者iPad"——让客户自主选择，形成对奖励的主人翁意识。\n(3) 低调务实的替代选项：对于不太愿意为"奢侈品"竞争的家长，400里亚尔的书店券更贴近生活、更有实现感。\n(4) 精神层面的小旅行框架：小额旅游体验券（4个订阅对应1600里亚尔）是深具情感力量的激励——将推荐行为升华为一件有精神价值的事（对重视宗教信仰的家长尤为有效）。' },
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
        ],
        items_zh:[
          '客户已有1-2个推荐，iPad感觉遥不可及时——书店购物券是可以先拿到的里程碑',
          '展示奖励阶梯时——购物券出现在第2-3步，作为中间层的小胜利',
          '当家长明确表示不需要电子设备但重视实用购物额度时',
          '朝觐/旅游优惠券有共鸣时——宗教节日或家庭提到精神追求时',
          '作为替代方案："这张券您可以转赠给有意向注册的朋友"'
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
        ],
        items_zh:[
          '已有1-2个推荐——离购物券里程碑只差一步',
          '提到书籍、学习用品或家庭购物需求',
          '家长对电子设备不感兴趣——更倾向于实用型奖励',
          '家长有宗教情怀——旅游/朝觐体验券能引发强烈情感共鸣',
          '家长问"我能把奖励送给别人吗？"——购物券可以转赠他人'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Open prize ladder ⬅️ Show current referral count ⬅️ "You\'re one referral away from the Jarir voucher" ⬅️ Show options: "3 subscriptions = 400 SAR Jarir OR PlayStation subscription OR..." ⬅️ For 4 subscriptions: "iPad OR 1600 SAR Umrah voucher" ⬅️ "Which would you prefer?" ⬅️ Request numbers ⬅️ Send prize chart via WhatsApp',
        text_ar:'فتح سلّم الجوائز ⬅️ إظهار عدد الريفيرالات الحالي ⬅️ "أنتِ ريفيرال واحد بعيد عن قسيمة جرير" ⬅️ عرض الخيارات: "3 اشتراكات = 400 ريال جرير أو اشتراك بلاي ستيشن أو..." ⬅️ لـ 4 اشتراكات: "آيباد أو قسيمة عمرة بقيمة 1600 ريال" ⬅️ "أيٌّ منها تفضّلين؟" ⬅️ طلب أرقام ⬅️ إرسال جدول الجوائز عبر الواتساب',
        text_zh:'打开奖励阶梯 ⬅️ 显示当前推荐数量 ⬅️ "您再推荐一个人就能拿到购物券了" ⬅️ 展示选项："3个订阅 = 400里亚尔书店券，或游戏订阅，或……" ⬅️ 4个订阅："iPad或1600里亚尔旅游体验券" ⬅️ "您更倾向于哪个？" ⬅️ 索取联系方式 ⬅️ 微信发送奖励阶梯图' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Ladder at 3 Subscriptions: "Three subscriptions — 400 SAR, either Jarir or a PlayStation subscription." (Um Diala)',
          'Ladder at 4 Subscriptions: "Four subscriptions — your choice: iPad or an Umrah voucher worth 1600 SAR." (Um Diala)',
          'Voucher as Gift: "If you don\'t want to use it yourself, you can give it to someone who wants to register." (Yazan × Abu Mohammad)',
          'Balance Gap + Voucher: "You can also get 25 more sessions to complete the level... and on top of that a PlayStation subscription for Bader or a shopping voucher — your choice." (Um Bader)'
        ],
        items_ar:[
          'السلّم عند 3 اشتراكات: "ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن." (أم ديالى)',
          'السلّم عند 4 اشتراكات: "أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)',
          'القسيمة كهدية: "إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)',
          'فجوة الرصيد + القسيمة: "تطلعي كمان 25 حصة عشان يكمل ليفل... تطلعي كمان اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري." (أم بدر)'
        ],
        items_zh:[
          '3个订阅阶梯："3个订阅可以选400里亚尔书店券，或游戏平台订阅。"（迪亚利妈妈案例）',
          '4个订阅阶梯："4个订阅您可以自选：iPad，或1600里亚尔旅游体验券。"（迪亚利妈妈案例）',
          '购物券作为推荐工具："如果您自己用不到，可以送给有意向注册的朋友。"（亚赞与穆罕默德爸爸案例）',
          '课时缺口+购物券捆绑："再推荐2个人这次就能多拿25节课，除了课时之外还能给巴德尔拿一个游戏订阅或者购物券，您来选。"（巴德尔妈妈案例）'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Voucher Ladder Reveal:\n"Three subscriptions — 400 SAR, either Jarir or a PlayStation subscription. Four subscriptions — your choice: iPad or an Umrah voucher worth 1600 SAR." (Um Diala)\n\nVoucher as Referral Tool:\n"If you don\'t want to use it yourself, you can give it to someone who wants to register." (Yazan × Abu Mohammad)\n\nBalance Gap + Voucher:\n"There are numbers that haven\'t been contacted yet so I\'ll give you more numbers — if two people subscribe this time you\'ll get 25 sessions of course, and on top of that a PlayStation subscription for Bader or a shopping voucher — your choice." (Um Bader)',
        text_ar:'كشف سلّم القسائم:\n"ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال." (أم ديالى)\n\nالقسيمة كأداة ريفيرال:\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل." (يزن × أبو محمد)\n\nفجوة الرصيد + القسيمة:\n"في الرقم في رقم لسه مش محكي معه فبعطي لك كمان أرقام — إذا شخصين بيطلع لك هالمرة عاملين 25 حصة طبعاً وغير 25 حصة بيطلع له اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري." (أم بدر)',
        text_zh:'购物券阶梯揭示话术：\n"3个订阅可以选400里亚尔书店券，或游戏平台订阅——4个订阅可以自选iPad，或1600里亚尔旅游体验券。"（迪亚利妈妈案例）\n\n购物券作为推荐工具话术：\n"如果您自己用不到，完全可以送给有意向注册的朋友，他们还能拿到下一个级别的优惠。"（亚赞与穆罕默德爸爸案例）\n\n课时缺口+购物券捆绑话术：\n"还有几个号码没联系到，我来给您多提供几个方向——如果这次2个人订阅，您就能拿到25节课，同时还能为巴德尔选一个游戏平台订阅或购物券，您来决定。"（巴德尔妈妈案例）' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I don\'t need Jarir."\n→ "No problem — there\'s also a PlayStation option, or if you reach 4 subscriptions there\'s an iPad or an Umrah voucher."\n\n"I don\'t like feeling like I\'m selling."\n→ "It\'s not selling — the discount they get through you is a gift. You\'re giving them a benefit, not selling."',
        text_ar:'اعتراض: "ما أحتاج جرير."\n→ "عادي، في كمان خيار بلايستيشن أو إذا وصلتِ لـ 4 اشتراكات في آيباد أو قسيمة عمرة."\n\nاعتراض: "ما أحب أكون كأني أبيع."\n→ "مو بيع — الخصم اللي يجيهم من طرفك هو هدية. أنت بتقدمي لهم ميزة مو بتبيعين."',
        text_zh:'异议："我不需要书店购物券。"\n→ "完全没问题，还有游戏平台订阅可选，或者到了4个订阅就能选iPad或旅游体验券了。"\n\n异议："我不喜欢感觉像在推销东西。"\n→ "这不是推销——通过您推荐过来的朋友能享受优惠，那是您给他们的一份礼物。您是在帮他们，不是在卖东西。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always present vouchers as CHOICES: "you can choose between Jarir / PlayStation / iPad"',
          'Connect Umrah voucher to Islamic values when culturally appropriate — emotional resonance is very high',
          'Voucher as convertible gift: "you can give it to someone who wants to subscribe" — turns reward into a referral tool itself',
          'WhatsApp: Send prize chart showing all tiers clearly with the Jarir/PlayStation/Umrah options visible',
          '"One more subscription and you get the Jarir voucher — do you have anyone in mind?"'
        ],
        items_ar:[
          'دائماً قدّم القسائم كخيارات: "تقدرين تختارين بين جرير / بلاي ستيشن / آيباد"',
          'اربط قسيمة العمرة بالقيم الإسلامية حين يكون ذلك مناسباً ثقافياً — الصدى العاطفي عالٍ جداً',
          'القسيمة كهدية قابلة للتحويل: "تقدرين تعطينها لأحد يريد الاشتراك" — تحوّل المكافأة إلى أداة ريفيرال بحد ذاتها',
          'واتساب: أرسل جدول الجوائز يُظهر كل الشرائح بوضوح مع خيارات جرير/بلاي ستيشن/العمرة مرئية',
          '"باقي اشتراك واحد وتحصلين على قسيمة جرير — ما عندك أحد في بالك؟"'
        ],
        items_zh:[
          '始终将购物券以"选项"形式呈现："您可以在书店券/游戏订阅/iPad之间自由选择"',
          '在文化背景合适时将旅游/朝觐体验券与精神价值挂钩——情感共鸣极强',
          '购物券作为可转赠礼物："您可以把它送给有意向注册的朋友"——让奖励本身也成为推荐工具',
          '微信发送清晰的奖励阶梯图，确保书店券/游戏订阅/旅游券等选项一目了然',
          '"再推荐一个人您就能拿到书店购物券了——您脑海中有没有合适的人选？"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — Um Diala (Full Ladder including Jarir + Umrah):\n"Three subscriptions — 400, either Jarir or a PlayStation subscription. Four subscriptions — your choice of iPad or an Umrah voucher worth 1600 riyals."',
          '🛑 Case 2 — Um Badr (Voucher + Sessions Bundle):\n"There\'s a number, a number that hasn\'t been contacted yet — I\'ll give you more numbers. You\'ve already got people signed up, mashallah. If two people register this time, that\'s 25 sessions for you — plus either a PlayStation subscription for Badr or shopping vouchers, your choice."',
          '🛑 Case 3 — Yazan x Abu Mohammad (Voucher as Referral Gateway):\n"If you don\'t want to use it yourself, you can give it to someone who wants to subscribe. They get a discount on the next level."',
          '📌 KEY INSIGHT: The Umrah voucher should be positioned as the EMOTIONAL PEAK of the prize ladder for Muslim parents. It creates meaning beyond financial reward — positioning the referral as an act of generosity that earns a spiritual journey.'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم ديالى (السلّم الكامل بما فيه جرير + العمرة):\n"ثلاث اشتراكات 400 يا اما جرير يا اشتراك بلاي ستيشن — أربع اشتراكات انت بتختاري يا ايباد يا قسيمة عمرة بقيمة 1600 ريال."',
          '🛑 الحالة 2 — أم بدر (حزمة القسيمة + الحصص):\n"في الرقم في رقم لسه مش محكي معه فبعطي لك كمان أرقام ليش الناس يشتركون ما شاء الله عليك في عندك ناس تشت عشان في إذا شخصين بيطلع لك هالمرة عاملين 25 حصة طبعاً وغير 25 حصة بيطلع له اشتراك بلاي ستيشن لبدر أو قسيم شرائية بتقدري تختاري."',
          '🛑 الحالة 3 — يزن × أبو محمد (القسيمة كبوابة ريفيرال):\n"إذا ما بدك تستفيد منها ممكن تعطيها لحدا حاب يسجل. تأخذ خصم على الليفل اللي بعده."',
          '📌 رؤية أساسية: يجب تقديم قسيمة العمرة بوصفها الذروة العاطفية لسلّم الجوائز للآباء المسلمين. تُنشئ معنى يتخطى المكافأة المالية — يُرسّخ الريفيرال بوصفه عمل كرم يكسب رحلة روحية.'
        ],
        items_zh:[
          '🛑 案例1——迪亚利妈妈（含书店券和旅游券的完整阶梯展示）：\n"3个订阅可以选400里亚尔书店券或游戏平台订阅——4个订阅就可以自选iPad或1600里亚尔旅游体验券。"',
          '🛑 案例2——巴德尔妈妈（购物券+课时捆绑套餐）：\n"还有一些号码没联系到，我再给您提供几个方向——这次如果2个人订阅，就能拿25节课，另外还可以为巴德尔选一个游戏平台订阅或购物券，您来决定。"',
          '🛑 案例3——亚赞与穆罕默德爸爸（购物券作为推荐入口）：\n"如果您自己用不到，完全可以送给想注册的朋友，他们还能享受下一个级别的折扣。"',
          '📌 核心洞察：旅游体验券应作为奖励阶梯中情感价值最高的选项来呈现。它超越了单纯的金钱奖励——将推荐行为升华为一种有意义的义举，帮助家人收获一次难忘的旅行体验。'
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
        text_ar:'يُحوّل الاسترداد النقدي الريفيرال من معروف اجتماعي إلى قرار مالي. بتأطير كل ريفيرال بـ "60 دولار أو 20 حصة تدخل حسابك"، يجعل الـ CM القيمة فورية وقابلة للحساب. الاسترداد النقدي هو الحافز الأساسي للعملاء الحساسين للسعر، والعملاء قرب نهاية باقتهم، والعملاء الذين سبق وسألوا "ماذا سأستفيد؟" بدلاً من الاستجابة للنداءات العاطفية.',
        text_zh:'返现将推荐行为从社会人情转化为财务决策。将每次推荐定义为"60美元或20节课直接到账"，CM让奖励变得即时、可计算。返现是以下客户的首选激励：价格敏感型客户、套餐即将到期的客户，以及那些主动问"我能得到什么？"而非被情感话术驱动的客户。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Cashback works on four psychological mechanisms:\n\n(1) IMMEDIATE GRATIFICATION: Cash feels real and present — unlike a future iPad, $60 is tangible now.\n(2) COST OFFSET: "Recover part of what you paid" — reframes the subscription cost as partially refundable through action.\n(3) PENDING EARNINGS ACTIVATION: "You have $60 in your account waiting — just tap to withdraw" — creates urgency around unclaimed money.\n(4) FINANCIAL URGENCY HOOK: "This is the last month the prizes are at full value" — time pressure amplifies cashback motivation for near-end-of-subscription customers.',
        text_ar:'يعمل الاسترداد النقدي عبر أربع آليات نفسية:\n\n(1) الإشباع الفوري: المال يبدو حقيقياً وحاضراً — خلافاً لآيباد مستقبلي، الـ 60 دولار ملموسة الآن.\n(2) تعويض التكلفة: "استرجعي جزءاً مما دفعتِه" — يُعيد تأطير تكلفة الاشتراك بوصفها قابلة للاسترداد جزئياً عبر الفعل.\n(3) تفعيل أرباح معلقة: "لديك 60 دولار في حسابك تنتظر — فقط اضغطي لسحبها" — يخلق إلحاحاً حول المال غير المطالَب به.\n(4) خطاف الإلحاح المالي: "هذا آخر شهر الجوائز بقيمتها الكاملة" — الضغط الزمني يُضخّم دافع الاسترداد النقدي للعملاء قرب نهاية الاشتراك.',
        text_zh:'返现通过四种心理机制发挥作用：\n\n(1) 即时满足感：现金感觉真实、当下可得——不像未来的iPad，60美元现在就能到手。\n(2) 成本抵消框架："把您付出的钱追回来一部分"——将订阅费用重新定义为可通过行动部分返还的支出。\n(3) 激活待领奖励："您账户里有60美元等待领取——点一下就能提现"——制造围绕未认领奖励的紧迫感。\n(4) 财务紧迫感钩子："这是套餐最后一个月，奖励价值最高"——时间压力放大套餐即将到期客户的返现动机。' },
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
        ],
        items_zh:[
          '当客户问"推荐别人我能得到什么？"——返现是最直接的回答',
          '当客户提到经济压力或对续费犹豫不决',
          '当推荐记录中有未认领的返现奖励时',
          '套餐即将到期的客户——"最后一个月"的紧迫感能放大这个提案的吸引力',
          '在升级套餐的通话中——返现将更高费用重新定义为"可以通过行动部分找回"',
          '客户已推荐过别人但还没有领取奖励时'
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
        ],
        items_zh:[
          '直接询问现金奖励（而非课时或实物奖品）',
          '提到预算压力、续费成本较高或难以持续学习',
          '推荐记录中有未认领的返现奖励',
          '已有1-3个推荐但还没有领取奖励',
          '对数字（60美元、230里亚尔）比情感话术或身份地位激励更有反应'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Service call or financial hesitation emerges ⬅️ "By the way, you have unclaimed rewards..." / "Each referral gives you $60 or 20 sessions" ⬅️ Open referral log together: Account → Referral Log → Earnings ⬅️ Show pending amount ⬅️ Choice: cash or sessions ⬅️ "Take sessions — they\'re worth ~800 SAR, more than the cash" (recommended) ⬅️ "Now, who else in your circle might benefit?" ⬅️ Request numbers ⬅️ WhatsApp follow-up',
        text_ar:'ظهور مكالمة خدمة أو تردد مالي ⬅️ "بالمناسبة، لديك مكافآت غير مُطالَب بها..." / "كل ريفيرال يمنحك 60 دولار أو 20 حصة" ⬅️ فتح سجل الريفيرال معاً: حسابي → سجل الدعوات → أرباحي ⬅️ إظهار المبلغ المعلق ⬅️ الاختيار: نقداً أو حصصاً ⬅️ "خذي الحصص — تساوي ~800 ريال، أكثر من النقد" (موصى به) ⬅️ "الآن، من آخر في دائرتك قد يستفيد؟" ⬅️ طلب أرقام ⬅️ متابعة الواتساب',
        text_zh:'服务电话或出现财务顾虑 ⬅️ "顺便说一下，您有待领取的奖励……"/"每推荐一人就能拿60美元或20节课" ⬅️ 一起打开推荐记录：我的账户 → 推荐记录 → 我的收益 ⬅️ 展示待领金额 ⬅️ 选择：现金还是课时 ⬅️ CM建议："选课时——价值约800里亚尔，比现金划算"（推荐） ⬅️ "那么，您身边还有谁可能感兴趣？" ⬅️ 索取联系方式 ⬅️ 微信跟进' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Unclaimed Reward: "Do you want to withdraw them right now? Go to the referral log — as usual, but after the referral log scroll down and you\'ll see something called My Earnings." (Um Maha and Bandar)',
          'Last Month Urgency: "This is the last month, this is the last month — for your own sake find two people, find three people, and you\'ll earn an incredible amount." (Um Maha and Bandar)',
          'Cash vs Sessions Choice: "20 individual sessions or $60.. which one will you choose?" (Um Hazzaa)',
          'Value Translation: "My advice is take the sessions — the sessions are worth around 800 SAR." (Um Ali)',
          'iPad Alternative: "If four people register through you in the same month, congratulations — the iPad comes to your door.. or you can take 900 SAR cashback to pay off the child\'s installments." (Um Yasser/Fahad)'
        ],
        items_ar:[
          'المكافأة غير المُطالَب بها: "بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات — كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي." (أم مها وبندر)',
          'إلحاح آخر شهر: "هذا اخر شهر هذا اخر شهر فانت حقي شوفي لك اثنين شوفي لك ثلاثه وكسبتي مبلغ زي العالم." (أم مها وبندر)',
          'الاختيار بين النقد والحصص: "20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري؟" (أم هزاع)',
          'ترجمة القيمة: "نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي)',
          'بديل الآيباد: "إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت.. أو بتاخديها كاش باك 900 ريال بتسدد فيها أقساط الولد." (أم ياسر/فهد)'
        ],
        items_zh:[
          '未领取奖励话术："您现在可以把奖励提现——进入推荐记录，往下滑找到"我的收益"，点进去就能提取了。"（玛哈与本达尔妈妈案例）',
          '最后一个月紧迫感："这是最后一个月了！帮我找2个、3个人，您就能赚一笔非常可观的奖励。"（玛哈与本达尔妈妈案例）',
          '现金还是课时的选择："20节单人课还是60美元……您要选哪个？"（哈扎妈妈案例）',
          '价值换算话术："建议您选课时，20节课价值约800里亚尔。"（阿里妈妈案例）',
          'iPad或返现选项："如果同月有4个人通过您注册，恭喜您iPad送到家——或者选900里亚尔返现，可以用来支付孩子的学费分期。"（法哈德妈妈案例）'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Unclaimed Cash Activation:\n"Do you want to withdraw them right now? Go to the referral log — as usual, but after the referral log scroll down and you\'ll see something called My Earnings." (Um Maha and Bandar)\n\nLast Month Financial Urgency:\n"Please try, Um Maha — and you know why? Because if your kids\' sessions are running low, earning this amount could help you renew for one of the kids." (Um Maha and Bandar)\n\nCash vs iPad Choice:\n"If four people register through you in the same month, congratulations — the iPad comes to your door.. or you can take 900 SAR cashback to pay off the child\'s installments."',
        text_ar:'تفعيل النقد غير المُطالَب به:\n"بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات. كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي." (أم مها وبندر)\n\nإلحاح مالي آخر شهر:\n"هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ عرفتي علي بلكي جددتي لواحد من الاولاد." (أم مها وبندر)\n\nالاختيار بين النقد والآيباد:\n"إذا سجلوا أربعة من طرفك بنفس الشهر مبروك عليك الآيباد بيوصلك باب البيت.. أو بتاخديها كاش باك 900 ريال بتسدد فيها أقساط الولد."',
        text_zh:'激活未领取现金话术：\n"您现在就可以提取——进入推荐记录，往下滑找到\'我的收益\'，点进去就能操作了。"（玛哈与本达尔妈妈案例）\n\n最后一个月财务紧迫话术：\n"我希望您能把握这个机会——因为孩子的课时也快用完了，这笔奖励说不定刚好够续费一个孩子的套餐。"（玛哈与本达尔妈妈案例）\n\n现金还是iPad的选择话术：\n"如果同月有4个人通过您注册，恭喜您iPad送到家——或者选900里亚尔返现，用来支付孩子的学费分期也很划算。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"The reward has been there for a month or so — why hasn\'t it appeared in the account?"\n→ "Do you want to withdraw it right now? Go to the referral log." (Um Maha and Bandar)\n\n"Honestly I can\'t renew."\n→ "That\'s exactly why I\'m suggesting you benefit from the referral program and let the platform help you with sessions or cash."\n\n"Things are difficult right now."\n→ "I have no problem with renewal right now, but don\'t let the last month of prizes slip away."',
        text_ar:'اعتراض: "المكافاه مر عليها شهر وحاجه ليش ما نزلت في الحساب؟"\n→ "بدك تعملي سحب لهم هسا انت فوتي على سجل الدعوات." (أم مها وبندر)\n\nاعتراض: "والله ما أقدر أجدد."\n→ "عشان كذا بقولك استفيدي من الريفيرال وخلي المنصة تساعدك بالحصص أو الكاش."\n\nاعتراض: "حالياً ظروفي صعبة."\n→ "ما عندي مشكلة بالتجديد الآن، بس لا يضيع عليك آخر شهر للجوائز."',
        text_zh:'异议："奖励已经过了一个月了，为什么还没到账？"\n→ "您现在就可以自己提取——进入推荐记录，往下滑找到\'我的收益\'就行了。"（玛哈与本达尔妈妈案例）\n\n异议："我真的没办法续费了。"\n→ "正是因为这样，我才建议您利用推荐奖励——让平台用课时或返现来帮您减轻续费压力。"\n\n异议："我现在情况比较困难。"\n→ "续费的事我们可以慢慢商量，但这是套餐最后一个月的奖励了，不要让机会白白溜走。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          '"Go in, choose either the sessions or $60 — but honestly the sessions are better for Tamim." (recommend sessions over cash for academic benefit)',
          '"20 individual sessions or $60.. which one will you choose?" (Um Hazzaa) — always give the choice',
          'WhatsApp: "If you have two or three interested people, send them to me — God willing you\'ll benefit from the sessions or cash toward renewal 🙏"',
          'WhatsApp: "I sent you the educational files + details of the current prizes 🌷"',
          'Last Month Frame: "This is the last month — for your own sake find two people and you\'ll earn an incredible amount."'
        ],
        items_ar:[
          '"اكبسي اختاري يا الحصص يا 60 دولار لكن صراحه فضل قصص افضل لتميم." (أوصِ بالحصص على النقد للفائدة الأكاديمية)',
          '"20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري؟" (أم هزاع) — دائماً أعطِ الاختيار',
          'واتساب: "إذا عندك شخصين أو ثلاثة مهتمين أرسليهم لي، وإن شاء الله تستفيدين من الحصص أو الكاش للتجديد 🙏"',
          'واتساب: "أرسلت لك الملفات التعليمية + تفاصيل الجوائز الحالية 🌷"',
          'إطار آخر شهر: "هذا اخر شهر فانت حقي شوفي لك اثنين وكسبتي مبلغ زي العالم."'
        ],
        items_zh:[
          '"选择课时还是60美元——说真的，选课时对塔米姆更有帮助。"（在学业价值框架下推荐课时而非现金）',
          '"20节单人课还是60美元……您要选哪个？"（哈扎妈妈案例）——始终给客户选择权',
          '微信发送："如果您有2-3位感兴趣的朋友，把号码发给我，用课时或返现来帮助续费 🙏"',
          '微信发送："已给您发送教学资料 + 当前奖励详情 🌷"',
          '最后一个月框架话术："这是最后一个月了——帮我找2个人，您就能赚一笔非常不错的奖励。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — Um Maha and Bandar (Unclaimed Cash + Last Month Urgency):\nClient: "The reward has been there for a month or so — why hasn\'t it appeared in the account?" CM: "Do you want to withdraw it right now? Go to the referral log — as usual, but after the referral log scroll down and you\'ll see something called My Earnings."\nThen: "Please try, Um Maha — because if your kids\' sessions are running low, earning this amount could help you renew for one of the kids."',
          '🛑 Case 2 — Um Hazzaa (Choice Activation):\n"Fawziyya has subscribed.. Now I want you to go to My Account, then the Referral Log. There are already three numbers recorded and under each one it says Choose Reward." "20 individual sessions or $60.. which one will you choose?"',
          '🛑 Case 3 — Um Bader (iPad OR 900 SAR Cashback Choice):\nCM: "Go to Settings, then Referral Log — press Claim Prize and choose the 20 sessions. You can also get 25 more sessions to complete the level... Send me one or two more people who you\'d like — you know that if four people subscribe you get an iPad, or you can take a full PlayStation console."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم مها وبندر (نقد غير مُطالَب به + إلحاح آخر شهر):\n"المكافاه مر عليها شهر وحاجه ليش ما نزلت في الحساب؟" CM: "بدك تعملي سحب لهم هسا انت فوتي مثلا على المبلغ على سجل الدعوات. كالعاده هلا بس بعد سجل الدعوات في تحت عندك شيء اسمه ارباحي."\nثم: "هو حاولي يا امها وبتعرفي ليش هذا الشيء لانه اذا اولادك قل كمان الحصص يعني اكسبي لك هالمبلغ كمان مبلغ."',
          '🛑 الحالة 2 — أم هزاع (تفعيل الاختيار):\n"فوزية اشتركت.. هلا بدي إياك تدخلي من عند حسابي بعديها سجل الدعوات. للان سجل ثلاث أرقام مكتوب تحتيهم اختري المكافأة." "20 حصة فردية أو 60 دولار.. إنتي مين رح تختاري؟"',
          '🛑 الحالة 3 — أم بدر (الاختيار بين الآيباد أو 900 ريال استرداد نقدي):\nالـ CM: "هسة شوفي الرد هو تفوتي على الإعدادات سجل الدعوات بتحطي حصول على جائزة بتختاري ال 20 حصة. تطلعي كمان 25 حصة عشان يكمل ليفل... ابعث لنا كمان أحد يشترك أو شخصين اللي بدك إياه بتعرفي إذا أربع أشخاص لك آيباد أو بتخذي جهازه بلاي ستيشن كامل."'
        ],
        items_zh:[
          '🛑 案例1——玛哈与本达尔妈妈（未认领奖励+最后一个月紧迫感）：\n客户："奖励已经一个多月了，为什么还没到账？"CM："您现在就可以自己提取——进入推荐记录，往下滑找到\'我的收益\'就行了。"\n然后："趁着现在来操作——孩子们的课时也快用完了，这笔钱说不定刚好够续费一个孩子的套餐。"',
          '🛑 案例2——哈扎妈妈（选择权激活）：\n"法维西亚已经订阅了……现在请进入推荐记录——记录里已经有3个号码，每个下面都有\'领取奖励\'按钮。20节单人课还是60美元……您要选哪个？"',
          '🛑 案例3——巴德尔妈妈（iPad还是900里亚尔返现）：\nCM："进入推荐记录，点击\'领取奖励\'，选20节课——这样还能再多25节，够完成一个级别……再帮我推荐1-2个人，如果总共4个人订阅，您就能拿iPad，或者选整套游戏机设备。"'
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
        text_ar:'مكافأة "20 حصة تطبيق" هي الحافز الأكثر تحديداً وفورية تشغيلياً في النظام. تُضاف مباشرة إلى حساب الطالب عند اشتراك الريفيرال — مرئية في التطبيق، قابلة للتدقيق، وحقيقية. مهمة الـ CM: (1) إرشاد الوالد عبر عملية المطالبة المباشرة في التطبيق، (2) التوصية بأخذ الحصص بدلاً من النقد لأقصى قيمة، (3) استخدام المطالبة الناجحة كنقطة انطلاق لتحفيز الريفيرال التالي.',
        text_zh:'"20节App课时"奖励是系统中最直观、操作最即时的激励机制。被推荐人订阅后，课时直接到账——在App中可见、可验证、真实有效。CM的职责：(1) 实时引导家长完成App内领取流程；(2) 推荐选课时而非现金以获得最大价值；(3) 将成功领取的时机作为推动下一次推荐的最佳跳板。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'The 20 app classes incentive works through three mechanisms:\n\n(1) LIVE PROOF: "Open the app right now and see the sessions appear" — real-time validation that the system works builds massive trust and excitement.\n(2) CHILD\'S ACCOUNT LINK: Sessions go specifically to the child\'s seat — parent feels they are directly benefiting their child, not just earning a reward.\n(3) FINANCIAL TRANSLATION: "20 sessions = ~800 SAR value" — the CM converts an abstract number into a meaningful financial figure the parent can compare to what they paid.\n(4) CHAIN MOTIVATION: "You didn\'t expect anyone to join, but they did — imagine who else might." First successful referral creates confidence for the next.',
        text_ar:'حافز "20 حصة تطبيق" يعمل عبر أربع آليات:\n\n(1) الإثبات المباشر: "افتحي التطبيق الآن وشاهدي ظهور الحصص" — التحقق الفوري من عمل النظام يبني ثقة وإثارة هائلة.\n(2) ربط حساب الطفل: الحصص تذهب تحديداً لمقعد الطفل — يشعر الوالد أنه يفيد طفله مباشرة لا مجرد يكسب مكافأة.\n(3) الترجمة المالية: "20 حصة = قيمة ~800 ريال" — يُحوّل الـ CM رقماً مجرداً إلى رقم مالي ذي معنى يمكن للوالد مقارنته بما دفع.\n(4) دافع التسلسل: "لم تتوقعي دخول أحد، لكنهم دخلوا — تخيّلي من آخر قد يدخل." أول ريفيرال ناجح يُنشئ ثقة للتالي.',
        text_zh:'"20节App课时"激励通过四种机制发挥作用：\n\n(1) 现场实证：打开App，亲眼看到课时出现——系统即时验证建立起巨大的信任感和兴奋感。\n(2) 孩子账户绑定：课时直接进入孩子的学习席位——家长感受到的是在直接帮助孩子，而非仅仅赢得奖励。\n(3) 金融换算：20节课≈800里亚尔价值——CM将抽象数字转化为家长能与已付费用对比的有意义金额。\n(4) 连锁推荐动力：第一次成功推荐建立信心——"您没想到会有人来，但还是来了——想想还有谁可能会来。"' },
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
        ],
        items_zh:[
          '推荐订阅确认后立即操作——在通话期间现场领取奖励',
          '客户推荐记录中有未领取的待发课时',
          '学生需要更多课时才能完成某个级别——"20节课正好补上缺口"',
          '在推荐选课时而非现金之后——"课时价值约800里亚尔"',
          '作为第一次现场领取奖励，建立信任并证明系统真实有效'
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
        ],
        items_zh:[
          '最近有推荐确认了订阅——奖励随时可以领取',
          '客户对奖励是否真实持怀疑态度',
          '学生课时快用完了——额外20节课对完成级别很有意义',
          '客户问了"课时什么时候会出现？"——准备好了现场领取流程',
          '客户有多个孩子——新的推荐可以绑定到任何一个孩子的账号'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'"Congratulations — [name] subscribed from your side!" ⬅️ "Open the app now" ⬅️ Go to Account → Referral Log ⬅️ Find the subscriber → "Click on it and press Claim Reward" ⬅️ Choose: 20 sessions or $60 cash ⬅️ CM recommends: "Take the sessions — they\'re worth ~800 SAR" ⬅️ Sessions appear in account live ⬅️ "Now, is there anyone else from your children or relatives who might want to subscribe?" ⬅️ "I\'ll link them directly to your account"',
        text_ar:'"مبروك — [الاسم] اشترك من طرفك!" ⬅️ "افتحي التطبيق الآن" ⬅️ اذهبي إلى حسابي → سجل الدعوات ⬅️ ابحثي عن المشترك → "اضغطي عليها وحطي الحصول على المكافأة" ⬅️ الاختيار: 20 حصة أو 60 دولار نقداً ⬅️ الـ CM يوصي: "خذي الحصص — تساوي ~800 ريال" ⬅️ الحصص تظهر في الحساب مباشرة ⬅️ "الآن، هل يوجد أحد آخر من أطفالك أو أقاربك قد يريد الاشتراك؟" ⬅️ "سأربطهم مباشرة بحسابك"',
        text_zh:'"恭喜！[姓名]通过您注册了！" ⬅️ "现在打开App" ⬅️ 进入我的账户 → 推荐记录 ⬅️ 找到该订阅者 → "点击领取奖励" ⬅️ 选择：20节课或60美元现金 ⬅️ CM建议："选课时——价值约800里亚尔" ⬅️ 课时实时出现在账户中 ⬅️ "那么，您的孩子或亲戚中还有人想订阅吗？" ⬅️ "我来直接绑定到您的账号"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Live Walkthrough: "Go to the Referral Log... you\'ll find that Ali is registered and subscribed — click on it and press Claim Reward." (Um Ali and Mohammad)',
          'Sessions vs Cash Recommendation: "My advice is take the sessions — the sessions are worth around 800 SAR." (Um Ali and Mohammad)',
          'Account Link Chain: "If any of your other children or relatives want to subscribe, I\'ll link them to Ali\'s seat." (Um Ali and Mohammad)',
          'Claim Step: "Go to the Referral Log. Press in, choose either the sessions or $60." (Um Tamim)',
          'Near-miss with more to gain: "Yes, 20 sessions will come through for you at the end of the month — plus another five sessions." (Um Tamim)'
        ],
        items_ar:[
          'عرض مباشر: "روحي على سجل الدعوات... بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه." (أم علي ومحمد)',
          'توصية الحصص مقابل النقد: "نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال." (أم علي ومحمد)',
          'تسلسل ربط الحساب: "اذا احد من ابنائك الثانيين او اقاربك يبي يشترك بربطه على مقعد علي." (أم علي ومحمد)',
          'خطوة المطالبة: "روحي على سجل الدعوات. اكبسي اختاري يا الحصص يا 60 دولار." (أم تميم)',
          'قرب الفوز مع المزيد: "هيه 20 رح ينزل لك على آخر الشهر كمان خمس حصص." (أم تميم)'
        ],
        items_zh:[
          '现场操作引导："进入推荐记录……找到阿里已注册并订阅的记录，点击领取奖励。"（阿里与穆罕默德妈妈案例）',
          '推荐课时而非现金："建议选课时，20节课价值约800里亚尔。"（阿里与穆罕默德妈妈案例）',
          '连续账号绑定话术："如果您其他孩子或亲戚想订阅，我把他们直接绑定到阿里的席位上。"（阿里与穆罕默德妈妈案例）',
          '领取步骤话术："进入推荐记录，点击选择课时还是60美元。"（塔米姆妈妈案例）',
          '接近满额再多一点话术："20节课月底会到账，再加5节课就更圆满了。"（塔米姆妈妈案例）'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Live Claim + Next Ask:\n"Um Ali, I want you to go into Mohammad\'s account and claim the 20 free sessions for you. Go to My Account. Go to the Referral Log. You\'ll find that Ali is registered and subscribed — click on it and press Claim Reward. I\'ll give you the choice between cash or 20 sessions. My advice is take the sessions — the sessions are worth around 800 SAR."\nThen: "And God willing if any of your other children or relatives or anyone wants to subscribe, I\'ll link them to Ali\'s seat." (Um Ali and Mohammad)',
        text_ar:'مطالبة مباشرة + طلب التالي:\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك. روحي على حسابي. روحي على سجل الدعوات. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه. بخيرك بين فلوس او 20 حصه. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال."\nثم: "وان شاء الله اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد علي." (أم علي ومحمد)',
        text_zh:'现场领取+下一轮推荐请求话术：\n"请您进入穆罕默德的账号，领取那20节免费课时——点我的账户，再点推荐记录，找到阿里已注册并订阅的记录，点击领取奖励——选课时还是20美元？建议选课时，价值约800里亚尔。"\n然后："如果您其他孩子、亲戚或任何人想订阅，我来直接绑定到阿里的席位上，让阿里的课时继续增加。"（阿里与穆罕默德妈妈案例）' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"Should I take cash or sessions?"\n→ "Sessions are worth much more and they benefit you academically. My advice is take the sessions — they\'re worth around 800 SAR."\n\n"I don\'t know how to do it."\n→ "Go to the Referral Log and I\'ll walk you through it step by step."\n\n"God willing if someone registers."\n→ "Any relatives or new children we link directly to the seat."',
        text_ar:'اعتراض: "آخذ كاش ولا حصص؟"\n→ "الحصص قيمتها أعلى كثير وبتفيدكم أكاديمياً أكثر. نصيحة خذي الحصص — قيمتها تقريباً 800 ريال."\n\nاعتراض: "ما أعرف كيف أفعلها."\n→ "ادخلي على سجل الدعوات وأنا أمشي معك خطوة بخطوة."\n\nاعتراض: "إن شاء الله إذا أحد سجل."\n→ "أي أحد من الأقارب أو الأبناء الجدد نربطه مباشرة على المقعد."',
        text_zh:'异议："选现金还是课时？"\n→ "课时价值高得多，而且在学业上对孩子更有帮助。建议选课时——价值约800里亚尔。"\n\n异议："我不知道怎么操作。"\n→ "进入推荐记录，我来一步步引导您完成。"\n\n异议："如果有人注册的话……"\n→ "任何亲戚或新孩子想订阅，我直接绑定到席位上就行，非常简单。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Walk the parent through the app live: Account → Referral Log → Claim → Choose sessions',
          'Always recommend sessions over cash: "They\'re worth around 800 SAR"',
          'Immediately after claiming, link the next potential subscriber: "If any of your other children... I\'ll link them to Ali\'s seat"',
          'WhatsApp: "Congratulations on activating the 20 sessions 🎉 Any new person who comes through you we\'ll link directly to Ali\'s seat 🌷"',
          'WhatsApp: "The sessions you claimed are worth around 800 SAR 🌟"'
        ],
        items_ar:[
          'أرشِد الوالد عبر التطبيق مباشرة: حسابي → سجل الدعوات → المطالبة → اختار الحصص',
          'دائماً أوصِ بالحصص على النقد: "قيمتها تقريبا حول 800 ريال"',
          'فور المطالبة، اربط المشترك المحتمل التالي: "اذا احد من ابنائك الثانيين... بربطه على مقعد علي"',
          'واتساب: "مبروك عليكم تفعيل الـ 20 حصة 🎉 أي شخص جديد يجي عن طريقكم رح نربطه مباشرة على مقعد علي 🌷"',
          'واتساب: "الحصص اللي أخذتوها قيمتها تقريباً 800 ريال 🌟"'
        ],
        items_zh:[
          '现场引导家长完成App操作：我的账户 → 推荐记录 → 领取奖励 → 选择课时',
          '始终推荐课时而非现金："价值约800里亚尔"',
          '领取完成后立即绑定下一位潜在推荐人："如果您其他孩子或亲戚想订阅，直接绑到阿里的席位"',
          '微信发送："恭喜激活20节课时🎉 任何新朋友通过您来，我们直接绑定到阿里的席位上🌷"',
          '微信发送："您领取的课时价值约800里亚尔🌟"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Full Case — Um Ali and Mohammad (Complete Live Activation Script):\n"Um Ali, I want you to go into Mohammad\'s account and claim the 20 free sessions for you.. Go to My Account.. Go to the Referral Log.. You\'ll find that Ali is registered and subscribed — click on it and press Claim Reward.. I\'ll give you the choice between cash or 20 sessions.. My advice is take the sessions — the sessions are worth around 800 SAR.\nAnd God willing if any of your other children or relatives or anyone wants to subscribe, I\'ll link them to whose seat? To Ali\'s seat so that Ali gets more sessions, God willing."',
          '📌 KEY INSIGHT: The live activation moment creates a "win" feeling that the CM should immediately leverage. The customer is in their highest state of excitement — asking for the next referral at this exact moment yields the best results.',
          '📌 SESSIONS RECOMMENDATION: Always guide customers to choose sessions over cash. The academic benefit ("it helps the child complete the level") feels more responsible and valuable than taking $60 cash. This also increases the perceived value of the platform.'
        ],
        items_ar:[
          '🛑 الحالة الكاملة — أم علي ومحمد (سكريبت التفعيل المباشر الكامل):\n"ام علي ابيك تدخلين من حساب محمد وتاخذين ال 20 حصه مجانيه لك.. روحي على حسابي.. روحي على سجل الدعوات.. بتلاقين ان علي مسجل ومشترك اضغطي عليها وحطي الحصول على المكافاه.. بخيرك بين فلوس او 20 حصه.. نصيحه خذي الحصص ترى قيمه الحصص ال تقريبا حول 800 ريال.\nوان شاء الله اذا احد من ابنائك الثانيين او اقاربك او ايا كان يبي يشترك بربطه على مقعد مين؟ على مقعد علي على شان علي ياخذ الحصص عنده ان شاء الله."',
          '📌 رؤية أساسية: لحظة التفعيل المباشر تُنشئ شعور "فوز" يجب على الـ CM الاستفادة منه فوراً. العميل في أعلى حالة من الإثارة — طلب الريفيرال التالي في هذه اللحظة بالضبط يُحقق أفضل النتائج.',
          '📌 توصية الحصص: دائماً أرشِد العملاء لاختيار الحصص على النقد. الفائدة الأكاديمية ("تساعد الطفل على إتمام المستوى") تبدو أكثر مسؤولية وقيمة من أخذ 60 دولار نقداً. هذا يزيد أيضاً من القيمة المُدرَكة للمنصة.'
        ],
        items_zh:[
          '🛑 完整案例——阿里与穆罕默德妈妈（完整现场激活话术）：\n"请您进入穆罕默德的账号，领取那20节免费课时——点我的账户，再点推荐记录，找到阿里已注册并订阅的记录，点击领取奖励——选课时还是20美元？建议选课时，价值约800里亚尔。\n如果您其他孩子、亲戚或任何人想订阅，把他们绑定到谁的席位呢？绑到阿里的席位上，这样阿里的课时就能一直增加。"',
          '📌 核心洞察：现场激活时刻会产生强烈的"赢了"感——CM必须立刻把握这个情绪高峰。客户此时处于最兴奋的状态，在这个确切时刻提出下一次推荐请求，转化率最高。',
          '📌 课时建议原则：始终引导客户选择课时而非现金。"帮助孩子完成级别"的学业价值让这个决定显得更负责任、更有意义，胜过拿走60美元现金——同时也提升了平台在家长心中的整体价值感。'
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
        text_ar:'تستجيب الأمهات للألفة العاطفية وفخر الطفل والتواصل الاجتماعي والقرب من الجائزة. يُؤطَّر الريفيرال بوصفه "هدية لطفلك" أو "مشاركة ما نجح معك مع من يهتمون بأطفالهم أيضاً." يجب على الـ CM أن يُشعر الأم بالفخر بطفلها أولاً، ثم يربط هذا الفخر بطلب الريفيرال. الخصوصية والراحة الاجتماعية هما الحاجزان الرئيسيان — يجب أن يبدو النهج ودياً لا مُلحّاً.',
        text_zh:'妈妈群体对情感共鸣、孩子荣誉感、社交连接和奖励近距离感特别敏感。推荐应被框架为"送给孩子的礼物"或"把对自己有用的好东西分享给同样关心孩子的人"。CM必须先让妈妈为孩子感到骄傲，再将这份骄傲感自然连接到推荐请求。隐私顾虑和社交压力是主要障碍——整个方式必须感觉友好、自然，而非强迫。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Mothers are driven by three forces:\n\n(1) CHILD PRIDE: When the CM praises the child, the mother\'s emotional defenses lower significantly. She wants to share that pride with others — and sharing the platform is an extension of that.\n(2) SOCIAL ROLE: Mothers see themselves as connectors. "Have you told any of your friends about how well [child] is doing?" positions the referral as natural social sharing, not sales.\n(3) PRIZE AS CHILD\'S GIFT: "If you refer 2 people, your child gets an extra 20 sessions" — the mother isn\'t doing it for herself, she\'s doing it for her child. This removes personal ego from the equation.\n\nMain barrier: fear of seeming like they are "selling to friends." The CM must clearly establish that the friend receives a discount/free trial, NOT a sales call.',
        text_ar:'تتحرك الأمهات بثلاث قوى:\n\n(1) فخر الطفل: حين يُثني الـ CM على الطفل، تنخفض دفاعات الأم العاطفية بشكل ملحوظ. تريد مشاركة هذا الفخر مع الآخرين — ومشاركة المنصة امتداد لذلك.\n(2) الدور الاجتماعي: تنظر الأمهات إلى أنفسهن بوصفهن رابطات. "هل أخبرتِ أياً من صديقاتك كيف يسير [الطفل]؟" يُرسّخ الريفيرال بوصفه تشاركاً اجتماعياً طبيعياً لا بيعاً.\n(3) الجائزة كهدية للطفل: "لو رشحتِ شخصَين، طفلك يحصل على 20 حصة إضافية" — الأم لا تفعله لنفسها، بل لطفلها. هذا يُزيل الأنا الشخصية من المعادلة.\n\nالحاجز الرئيسي: الخوف من الظهور بمظهر من "يبيع للأصدقاء." يجب على الـ CM أن يُرسّخ بوضوح أن الصديقة تحصل على خصم/تجربة مجانية، وليس على مكالمة بيع.',
        text_zh:'妈妈的行动力来自三股力量：\n\n(1) 孩子的荣耀感：当CM称赞孩子时，妈妈的情感防线会明显降低。她想把这份骄傲分享给别人——分享平台就是这种分享的延伸。\n(2) 社交连接者角色：妈妈们视自己为圈子里的"链接人"。"有没有闺蜜的孩子也需要学英语呢？"让推荐变成自然的社交分享，而非销售。\n(3) 奖励=给孩子的礼物："推荐2个人，孩子就能多拿20节课"——妈妈这样做不是为了自己，而是为了孩子。这消除了个人自我意识的障碍。\n\n主要障碍：担心被朋友觉得在"推销东西"。CM必须明确说明：朋友得到的是优惠/免费体验，不是被推销电话骚扰。' },
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
        ],
        items_zh:[
          '提到或听到孩子进步的正面消息之后',
          '当妈妈主动提到另一位妈妈、朋友或亲戚时',
          '在给出奖励距离更新之后（"再推荐2个人就能拿iPad了"）',
          '在轻松愉快、妈妈放松投入的对话中',
          '在孩子第一次收到正面评价之后——妈妈处于情感骄傲的顶峰时刻'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Uses warm, personal language ("by God / mashallah / what a wonderful voice")',
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
        ],
        items_zh:[
          '使用温暖亲切的语言（"真的好厉害！""太可爱了！""我也开心！"）',
          '充满骄傲和热情地谈论孩子',
          '提到微信群（学校群、邻居群、家庭群）',
          '在对话中自然提到朋友或亲戚',
          '已经提过朋友/亲戚曾问起过这个平台'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Build rapport with warm, personal tone ⬅️ Praise child specifically ⬅️ "Do any of your friends have children who would benefit?" ⬅️ Frame it as sharing a gift, not recommending a product ⬅️ Mention prize proximity or reward ⬅️ "Just send me the number — I\'ll contact them, no pressure on you" ⬅️ Remove social anxiety: "They get a free trial, I won\'t pressure them" ⬅️ Close with WhatsApp follow-up sending the link or her personal referral code',
        text_ar:'بناء الألفة بنبرة دافئة شخصية ⬅️ مدح الطفل بشكل محدد ⬅️ "هل لدى أياً من صديقاتك أطفال سيستفيدون؟" ⬅️ أطِّر الأمر على أنه مشاركة هدية لا التوصية بمنتج ⬅️ اذكر القرب من الجائزة أو المكافأة ⬅️ "فقط أرسلي الرقم — سأتواصل معهم، لا ضغط عليك" ⬅️ أزِل القلق الاجتماعي: "سيحصلون على تجربة مجانية، لن أضغط عليهم" ⬅️ أنهِ بمتابعة واتساب إرسال الرابط أو كودها الشخصي',
        text_zh:'用温暖亲切的语气建立关系 ⬅️ 具体称赞孩子 ⬅️ "您有没有闺蜜的孩子也需要学英语呢？" ⬅️ 以"分享好东西"而非"推荐产品"来定义推荐 ⬅️ 提到奖励距离或奖励本身 ⬅️ "把号码发给我就行——我来联系，您完全不用操心" ⬅️ 消除社交焦虑："他们会拿到免费体验，我不会给他们任何压力" ⬅️ 以微信跟进结尾，发送链接或她的专属推荐码' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Child Pride + Ask: "Mashallah, honestly I\'m really happy about how many sessions Diala is getting.. it\'s clear she\'s very motivated.. since the teachers praise her, they surely have other students who could benefit from the platform through you." (Um Diala)',
          'Peer Comparison: "I want you to be as smart as your friend and refer people." (Teacher Sara)',
          'Privacy Guarantee: "I won\'t let anyone contact them before you\'ve spoken to them."',
          'Group Message Guide: "I\'d like you to send this to the groups... this is a new link for the champion... try to encourage the mothers — when mothers see something from someone they trust, their reaction is completely different." (Um Diala)',
          'Voice Message Script: "Tell her: my friend told me you\'re interested, so I want to help you get the same discount she has." (Um Diala)'
        ],
        items_ar:[
          'فخر الطفل + الطلب: "ما شاء الله صراحة كثير مبسوطة من عدد الحصص اللي بتاخذها ديالى.. واضح إنها كثير متحمسة.. طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك." (أم ديالى)',
          'المقارنة بالنظير: "بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس." (أستاذة سارة)',
          'ضمان الخصوصية: "أنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."',
          'دليل رسالة المجموعة: "أبغى ارسلي هذا على الجروبات... هذا رابط جديد للبطلة... حاولي تشجعي الأمهات حتى الأمهات لما يشوفون يسمعون من كلام الأم يختلف." (أم ديالى)',
          'سكريبت الرسالة الصوتية: "قولي لها والله قالت لي انك حابه فانا حابه افيدك تاخذين نفس الخصم دياله." (أم ديالى)'
        ],
        items_zh:[
          '孩子荣耀感+推荐请求话术："迪亚利老师真的很欣赏她，进步非常明显——老师们都在夸她，说不定她认识的孩子也能从这个平台受益，通过您来的话！"（迪亚利妈妈案例）',
          '同伴比较话术："我希望您也像您的朋友一样聪明，帮我推荐几位朋友来试试。"（萨拉老师案例）',
          '隐私保证话术："我不会让任何人联系他们，除非您先跟他们说了。"',
          '群发消息指导话术："请在群里发这个……就是一个\'英雄妈妈专属链接\'……您可以鼓励其他妈妈——当妈妈们听到自己信任的人说话，反应会完全不一样。"（迪亚利妈妈案例）',
          '语音消息话术模板："告诉她，我朋友跟我说她想学英语，所以我想帮她拿到一样的优惠，你来试试吧。"（迪亚利妈妈案例）'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Warm Opener for Mothers:\n"My dear, honestly your voice is so warm.. I want you to be as smart as your friend and refer people.. anyone who subscribes through you I\'ll add free sessions for you.. and let everything stay between us and I\'ll follow up with everything." (Teacher Sara × Um Mohammad)\n\nPride-to-Referral:\n"Since the teachers praise her, they surely have other students who could benefit from the platform through you.. you only have two referrals left to win the iPad." (Um Diala)\n\nSocial Circle Script:\n"You came through Um Faisal.. today she earned 35 extra sessions.. and if anyone registers through you today you\'ll benefit a lot.. send me the numbers and I\'ll follow up with them." (Teacher Sara × Um Abdul-Rahman)',
        text_ar:'افتتاح دافئ للأمهات:\n"يا عمري والله صوتك يخطف القلب.. بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس.. أي شخص يشترك من طرفك رح أضيف لك حصص مجانية.. وخلي كل شيء بيني وبينك وأنا أتابع كل شيء." (أستاذة سارة × أم محمد)\n\nالفخر إلى ريفيرال:\n"طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك.. أنتم باقي لكم شخصين فقط وتربحوا الأيباد." (أم ديالى)\n\nسكريبت الدائرة الاجتماعية:\n"أنتِ جاية من طرف أم فيصل.. اليوم أخذت 35 حصة إضافية.. ولو أي حدا سجل من طرفك اليوم رح تستفيدوا كثير.. ابعثيلي الأرقام وأنا أتابع معهم." (أستاذة سارة × أم عبد الرحمن)',
        text_zh:'妈妈群体温情开场话术：\n"老师真的很欣赏您——我希望您也能像您的朋友一样聪明，帮我推荐几位朋友来试试。每推荐一个订阅，我就给您增加免费课时。所有事情都由我来跟进，您完全不用操心。"（萨拉老师×穆罕默德妈妈案例）\n\n荣耀感到推荐的转化话术：\n"老师们都在夸她，说不定她认识的孩子也能从这个平台受益——通过您推荐来！现在只差2个人您就能拿iPad了。"（迪亚利妈妈案例）\n\n社交圈激活话术：\n"您是通过费萨尔妈妈介绍来的——今天她已经获得了35节额外课时。如果今天有人通过您注册，您也能得到很大的收益——把号码发给我，我来跟进。"（萨拉老师×阿卜杜拉赫曼妈妈案例）' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I\'m embarrassed to talk to them / I\'m afraid of bothering them."\n→ "You don\'t have to sell anything — just share your child\'s experience and let whoever wants to try it. You\'re just offering a free opportunity; whoever wants to try is welcome."\n\n"I don\'t know if the parents are interested."\n→ "Send me the numbers first, and I won\'t let anyone contact them before you\'ve spoken to them."\n\n"People in my groups don\'t respond."\n→ "Try sending a voice message — when they hear the voice of someone they trust it lands much better than a text."',
        text_ar:'اعتراض: "بستحي أحكي معهم / بخاف أزعجهم."\n→ "مش مطلوب تبيعي عليهم، بس احكي عن تجربة ابنك وخلي اللي يحب يجرب. إنتِ بس بتقدمي فرصة مجانية، اللي بده يجرب أهلاً فيه."\n\nاعتراض: "ما بعرف إذا الأهل مهتمين."\n→ "ابعثيلي الأرقام أول، وأنا ما رح أخلي أي حدا يتواصل معهم قبل ما تحكي معهم."\n\nاعتراض: "الناس في جروباتي ما يتجاوبون."\n→ "جربي تبعثي رسالة صوتية — لما يسمعوا صوت شخص يثقوا فيه بيكون أوقع من رسالة نصية."',
        text_zh:'异议："我不好意思跟她们说这个/怕打扰到她们。"\n→ "完全不需要推销——只是聊聊孩子的学习体验，愿意试的就试。您只是在给她们一个免费体验的机会，感兴趣的自然会来。"\n\n异议："我不知道她们有没有兴趣。"\n→ "先把号码发给我，我不会在您和她们沟通之前主动联系她们。"\n\n异议："我的群里大家都不怎么回消息。"\n→ "试着发一条语音消息——当听到一个信任的朋友的声音，效果会比文字消息好很多。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Use personal language: "my dear / my soul / my sister" — maintains warmth throughout',
          'Always mention the child by name when praising — makes it personal and real',
          'Remove burden: "Send me the numbers and I\'ll follow up with them myself — you don\'t have to do anything after that"',
          'Guide group message strategy: "Send a voice message to the groups — I\'ll set up a special code in your name"',
          'WhatsApp: "Congratulations 🎉 The new free sessions have been added to the account."'
        ],
        items_ar:[
          'استخدم لغة شخصية: "يا عمري / يا روحي / يا أختي" — يُبقي الدفء طوال المحادثة',
          'دائماً اذكر الطفل بالاسم عند المدح — يجعله شخصياً وحقيقياً',
          'أزِل العبء: "ابعثيلي الأرقام وأنا أتابع معهم بنفسي — ما عليك أي شيء بعد هيك"',
          'أرشِد استراتيجية رسالة المجموعة: "أرسلي رسالة صوتية للجروبات — أنا أعمل لك كود خاص باسمك"',
          'واتساب: "مبروك 🎉 انضافت لكم الحصص المجانية الجديدة على الحساب."'
        ],
        items_zh:[
          '使用亲切的私人化语言："亲爱的 / 宝贝 / 姐妹"——在整个对话中保持温度',
          '称赞孩子时始终用名字——让话语更有个人感和真实感',
          '卸下负担感："把号码发给我，我来跟进——您之后什么都不用管"',
          '引导群发消息策略："在群里发一条语音消息——我来为您设置一个以您名字命名的专属推荐码"',
          '微信发送："恭喜🎉 新的免费课时已经加到账户里了。"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — Um Diala (Pride-to-Prize Approach):\n"Mashallah, honestly I\'m really happy about how many sessions Diala is getting.. it\'s clear she\'s very motivated.. since the teachers praise her, they surely have other students who could benefit from the platform through you.. you only have two referrals left to win the iPad.. have you seen the new prizes? There are Jarir vouchers, PlayStation, and iPad.. I\'ll send you the link and photos on WhatsApp."',
          '🛑 Case 2 — Teacher Sara × Um Mohammad (Friendly Emotional Approach):\n"My dear, honestly your voice is so warm.. I want you to be as smart as your friend and refer people.. anyone who subscribes through you I\'ll add free sessions for you.. and let everything stay between us and I\'ll follow up with everything."',
          '🛑 Case 3 — Teacher Sara × Um Abdul-Rahman (Referrer Benefit Frame):\n"You came through Um Faisal.. today she earned 35 extra sessions.. and if anyone registers through you today you\'ll benefit a lot.. send me the numbers and I\'ll follow up with them."',
          '📌 TONE GUIDE: Voice should be warm, slightly slower than normal pace, as if talking to a close friend. Avoid corporate or formal language. Mirror the customer\'s emotional energy — if she is enthusiastic, match that energy; if she is hesitant, drop to a calm reassuring tone.'
        ],
        items_ar:[
          '🛑 الحالة 1 — أم ديالى (نهج الفخر إلى الجائزة):\n"ما شاء الله صراحة كثير مبسوطة من عدد الحصص اللي بتاخذها ديالى.. واضح إنها كثير متحمسة.. طالما المعلمات يمدحوها أكيد عندهم طلاب ممكن يستفيدوا من المنصة عن طريقك.. أنتم باقي لكم شخصين فقط وتربحوا الايباد.. شفتوا الهدايا الجديدة؟ في قسائم جرير وبلايستيشن وأيباد.. رح أرسل لك الرابط والصور على الواتساب."',
          '🛑 الحالة 2 — أستاذة سارة × أم محمد (النهج الودي العاطفي):\n"يا عمري والله صوتك يخطف القلب.. بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس.. أي شخص يشترك من طرفك رح أضيف لك حصص مجانية.. وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 الحالة 3 — أستاذة سارة × أم عبد الرحمن (إطار فائدة المُرشِّح):\n"أنتِ جاية من طرف أم فيصل.. اليوم أخذت 35 حصة إضافية.. ولو أي حدا سجل من طرفك اليوم رح تستفيدوا كثير.. ابعثيلي الأرقام وأنا أتابع معهم."',
          '📌 دليل النبرة: يجب أن يكون الصوت دافئاً، أبطأ قليلاً من الوتيرة الطبيعية، كأنك تتحدث مع صديقة مقربة. تجنب اللغة المؤسسية أو الرسمية. عاكِس الطاقة العاطفية للعميل — إذا كانت متحمسة، طابِق تلك الطاقة؛ إذا كانت مترددة، انخفِض إلى نبرة هادئة مطمئنة.'
        ],
        items_zh:[
          '🛑 案例1——迪亚利妈妈（荣耀感到奖励的转化话术）：\n"老师真的超级欣赏迪亚利，她明显很有热情……老师们都在夸她，说不定她认识的孩子也能从平台里受益，通过您来！现在只差2个人就能拿iPad了……您看到新的奖励了吗？有书店券、游戏订阅、iPad……我来给您发链接和图片到微信。"',
          '🛑 案例2——萨拉老师×穆罕默德妈妈（友好情感化话术）：\n"您的声音真的很亲切——我希望您也能像您的朋友一样聪明，帮我推荐几位来试试。每推荐一个订阅，我就给您加免费课时……所有事情由我来跟进，您完全不用操心。"',
          '🛑 案例3——萨拉老师×阿卜杜拉赫曼妈妈（推荐人受益框架）：\n"您是通过费萨尔妈妈介绍来的——她今天拿到了35节额外课时。如果今天有人通过您注册，您也能得到很多收益——把号码发给我，我来跟进。"',
          '📌 语气指导：声音要温暖，节奏略慢，像与老朋友聊天。避免公司化或正式的措辞。跟随客户的情绪节奏——她兴奋时配合兴奋；她迟疑时换成安慰和引导的语气。'
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
        text_ar:'يعمل الآباء على المنطق والعائد على الاستثمار والكفاءة. يجب تأطير الريفيرال بوصفه تبادل قيمة مباشر: "كل شخص ترشحه = 20 حصة أو 100 دولار لحساب طفلك." يجب على الـ CM تجنب النداءات العاطفية وبدلاً منها تقديم أرقام واضحة وعملية دقيقة وطلب محدد. الآباء يُقدّرون المباشرة — لا تُطيل الشرح ولا تُبالغ في الإطراء. احترم وقتهم واصل إلى النقطة بسرعة.',
        text_zh:'爸爸群体依靠逻辑、投资回报率和效率做决策。推荐必须被框架为直接的价值交换："每推荐一人 = 孩子账号增加20节课或100美元。"CM应避免情感诉求，转而提供清晰数据、精准流程和明确请求。爸爸欣赏直接——不要过度解释，不要过度夸奖。尊重他们的时间，快速切入主题。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Fathers respond to three pragmatic triggers:\n\n(1) INVESTMENT ROI: "You paid for X sessions — refer 2 people and add 40 more for free." Makes the referral feel like a smart financial extension of their existing investment.\n(2) CHILD\'S ACCOUNT MATH: "Each person = 20 sessions on [child\'s name]\'s account" — direct, specific, calculable.\n(3) PROCESS CLARITY: Fathers want to know exactly how it works, step by step. Confusion kills the deal. "Send me the number → I link them → sessions appear in 24-48 hours."',
        text_ar:'يستجيب الآباء لثلاثة محفزات براغماتية:\n\n(1) العائد على الاستثمار: "دفعت مقابل X حصة — رشّح شخصين وأضف 40 حصة مجاناً." يجعل الريفيرال يبدو امتداداً مالياً ذكياً للاستثمار القائم.\n(2) حسابات حساب الطفل: "كل شخص = 20 حصة على حساب [اسم الطفل]" — مباشر، محدد، قابل للحساب.\n(3) وضوح العملية: يريد الآباء معرفة آلية العمل بالضبط، خطوة بخطوة. الغموض يُفسد الصفقة. "ابعثلي الرقم → أربطهم → تظهر الحصص خلال 24-48 ساعة."',
        text_zh:'爸爸对三种务实触发点有反应：\n\n(1) 投资回报率：$"您为X节课付了费——推荐2人就能免费再添40节课。"让推荐感觉像是现有投资的智慧延伸。\n(2) 孩子账户的算账逻辑："每推荐一人 = [孩子名字]账号增加20节课"——直接、具体、可计算。\n(3) 流程透明度：爸爸想知道每一步怎么操作。含糊会毁掉这笔交易。"把号码发给我 → 我来绑定 → 24-48小时内课时到账。"' },
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
        ],
        items_zh:[
          '在用具体数据确认学习进步之后（课时数量、完成的级别）',
          '在升级/续费对话中或刚结束之后——财务思维处于激活状态',
          '当爸爸提到有孩子的同事、朋友或生意伙伴时',
          '当爸爸直接问"推荐系统怎么运作的？"',
          '短时间通话时——如果爸爸很忙，推荐请求要简短，细节留到微信沟通'
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
        ],
        items_zh:[
          '爸爸提问直接——他效率高，期望对话同样简洁',
          '用投资术语谈论孩子的教育支出',
          '提到有孩子的同事或职业圈的熟人',
          '说"发详情到微信"——他会看完后自己决定',
          '对孩子的进步满意，并表示出愿意升级的意向'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Brief progress update with specific numbers ⬅️ Confirm father\'s satisfaction ⬅️ "One more thing I wanted to mention..." ⬅️ "If you know someone interested in English — send me their number" ⬅️ "If they subscribe, [child] gets 20 free sessions" ⬅️ Make it easy: "Send me the number on WhatsApp — I\'ll handle everything" ⬅️ Quality check: "Someone who\'s genuinely interested — not random" ⬅️ Close quickly and send follow-up WhatsApp with the link',
        text_ar:'تحديث موجز للتقدم بأرقام محددة ⬅️ تأكيد رضا الأب ⬅️ "شيء إضافي أردت ذكره..." ⬅️ "إذا تعرف أحداً مهتماً بالإنجليزي — ابعثلي رقمه" ⬅️ "لو سجّل، [الطفل] يحصل على 20 حصة مجانية" ⬅️ اجعلها سهلة: "ابعثلي الرقم على واتساب وأنا أتولى كل شيء" ⬅️ فلتر الجودة: "شخص مهتم فعلاً — مش عشوائي" ⬅️ أغلق بسرعة وابعث واتساب متابعة مع الرابط',
        text_zh:'用具体数字简短汇报进度 ⬅️ 确认爸爸满意 ⬅️ "另外还有一件事……" ⬅️ "您身边有没有对学英语感兴趣的人——把号码发给我" ⬅️ "如果他订阅了，[孩子名字]就能多得20节免费课时" ⬅️ 降低门槛："把号码发到微信就行——剩下的我来处理" ⬅️ 质量把控："真正感兴趣的人——不是随便找的" ⬅️ 快速结束并发送微信跟进（含推荐链接）' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Soft Side Ask: "One more thing, Abu Abdul-Rahman, I wanted to honestly ask you about... if there is anyone in your circle who is interested in learning English, could you send us their mobile number?" (Abu Abdul-Rahman)',
          'Financial Logic: "And if they register with us, there will be an addition of 20 sessions to Abdul-Rahman\'s account as a gift." (Abu Abdul-Rahman)',
          'Quality Filter: "If you are sure they are interested." (VIP Renewal Case)',
          'Commission Frame: "Any person who comes through you and subscribes — you get $100." (Abu Naif — M3-M6 Partner)',
          'WhatsApp Delegation: "Send me the number directly on WhatsApp and I\'ll add them."'
        ],
        items_ar:[
          'الطلب الجانبي اللطيف: "شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة... إذا في أحد من محيطك مهتم في تعلم اللغة الإنجليزية ممكن ترسلنا رقم جواله." (أبو عبد الرحمن)',
          'المنطق المالي: "وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية." (أبو عبد الرحمن)',
          'فلتر الجودة: "إذا أنت متأكد إنه مهتم." (حالة تجديد VIP)',
          'إطار العمولة: "أي شخص بيجي عن طريقك بيشترك لك 100 دولار." (أبو نايف — شريك M3-M6)',
          'تفويض واتساب: "أرسل لي الرقم مباشرة على الواتساب وأنا أضيفهم."'
        ],
        items_zh:[
          '温和附带请求话术："阿卜杜拉赫曼爸爸，顺便想请教您一件事——您身边有没有对英语学习感兴趣的人？能把他的号码发给我吗？"（阿卜杜拉赫曼爸爸案例）',
          '财务逻辑话术："如果他注册了，阿卜杜拉赫曼就能多拿20节免费课时作为礼物。"（阿卜杜拉赫曼爸爸案例）',
          '质量过滤话术："如果您确认他真的感兴趣的话。"（VIP续费案例）',
          '合伙人佣金框架话术："您推荐来的任何人订阅，您就能拿100美元。"（奈夫爸爸——M3-M6合伙人框架）',
          '微信托管话术："直接把号码发到微信给我，我来处理后续。"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Direct Professional Ask:\n"One more thing, Abu Abdul-Rahman — I honestly wanted to ask you something regarding Abdul-Rahman: if there is anyone in your circle or among your acquaintances who is interested in learning English, could you send us their mobile number? And if they register with us there will be an addition of 20 sessions to Abdul-Rahman\'s account as a gift."\n\nPartner Commission Frame:\n"We\'ve set something up specifically for people who have a wide network. Kind of like a work arrangement… any person who comes through you and subscribes — you get $100."\n\nSession Count Logic:\n"Every person who registers through you adds 20 sessions to [child\'s name]\'s account — anyone in your circle who has a child learning English?"',
        text_ar:'الطلب المهني المباشر:\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."\n\nإطار عمولة الشريك:\n"عملنا شيء خاص للناس اللي عندهم معارف كثيرة. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار."\n\nمنطق عدد الحصص:\n"كل شخص يسجل من طرفك بيضاف 20 حصة لحساب [اسم الطفل] — أي شخص من معارفك عنده ولد بيتعلم إنجليزي؟"',
        text_zh:'直接专业型请求话术：\n"阿卜杜拉赫曼爸爸，还有一件事想请教您——您身边有没有对英语学习感兴趣的朋友或熟人？能把他的联系方式发给我吗？如果他注册了，阿卜杜拉赫曼就能多拿20节免费课时作为礼物。"\n\n合伙人佣金框架话术：\n"我们为人脉丰富的家长专门做了一个计划，有点像分销合作——您推荐来的任何人订阅，您就能拿100美元。"\n\n课时计算逻辑话术：\n"每推荐一人订阅，就给[孩子名字]账号增加20节课——您认识的人里有谁家孩子在学英语吗？"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I\'ll see if anyone is interested." (soft deflection)\n→ "Great — just make sure it\'s someone who is genuinely interested so they get the full benefit. Any number, send it on WhatsApp and I\'ll follow up."\n\n"I\'m busy right now." (time objection)\n→ "No problem — just send me the number on WhatsApp whenever you remember and I\'ll take care of the rest."\n\n"I don\'t have time to collect numbers." (effort objection)\n→ "You don\'t need to collect numbers — one person is enough. Any acquaintance or colleague who has children learning English?"',
        text_ar:'"بشوف إذا في حد مهتم." (تهرب لطيف)\n→ "تمام، بس يكون شخص فعلاً مهتم حتى يستفيدوا كامل الاستفادة. أي رقم ابعثه على الواتساب وأنا أتابع."\n\n"أنا مشغول الحين." (اعتراض الوقت)\n→ "عادي — بس ابعث لي الرقم على الواتساب متى ما تذكر وأنا أعتني بالباقي."\n\n"ما عندي وقت أجمع أرقام." (اعتراض الجهد)\n→ "مو لازم تجمع أرقام — شخص واحد كافي. أي معارف أو زميل عنده أولاد بيتعلمون إنجليزي."',
        text_zh:'异议："我看看有没有人感兴趣。"（温和推脱）\n→ "好的——但要找真正感兴趣的人，这样大家都能最大化受益。任何号码直接发微信给我，我来跟进。"\n\n异议："我现在比较忙。"（时间异议）\n→ "没问题——什么时候想到了，就把号码发到微信，剩下的我来处理。"\n\n异议："我没时间收集号码。"（努力异议）\n→ "不需要收集——一个人就够了。您认识的同事或朋友里，有谁家孩子在学英语？"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Keep it SHORT: fathers respect efficiency. The referral ask should take less than 30 seconds.',
          '"Send me the number directly on WhatsApp and I\'ll add them straight to Abdul-Rahman\'s account."',
          'Specific math: "20 sessions on the child\'s account" is clearer and more motivating than vague "rewards"',
          'Quality ask: "Someone who is genuinely interested in learning English" — ensures the father gives quality leads, not random numbers',
          'WhatsApp (short & direct): "Send me the interested numbers so I can add them directly to Abdul-Rahman\'s account ❤️"'
        ],
        items_ar:[
          'اجعلها قصيرة: الآباء يحترمون الكفاءة. طلب الريفيرال يجب أن يستغرق أقل من 30 ثانية.',
          '"أرسل لي الرقم مباشرة على الواتساب وأنا أضيفهم مباشرة على حساب عبد الرحمن."',
          'الرياضيات المحددة: "20 حصة على حساب الطفل" أوضح وأكثر تحفيزاً من "مكافآت" مبهمة',
          'طلب الجودة: "شخص مهتم فعلاً بتعلم اللغة" — يضمن أن يقدم الأب أرقاماً نوعية لا عشوائية',
          'واتساب (قصير ومباشر): "أرسل لي الأرقام المهتمة عشان أضيفها مباشرة على حساب عبد الرحمن ❤️"'
        ],
        items_zh:[
          '简短为上：父亲重视效率。推荐请求应在30秒内完成。',
          '"把号码直接发微信给我，我马上加到孩子账户里。"',
          '具体数字更有效："孩子账户增加20节课"比模糊的"奖励"更清晰、更有吸引力。',
          '质量优先："真正有学英语意愿的人"——确保父亲提供的是精准线索，而非随机号码。',
          '微信跟进（简短直接）："把感兴趣的号码发给我，我直接加到孩子账户 ❤️"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — Abu Abdul-Rahman (Soft VIP Side Ask):\n"One more thing, Abu Abdul-Rahman — I honestly wanted to ask you something regarding Abdul-Rahman: if there is anyone in your circle or among your acquaintances who is interested in learning English, could you send us their mobile number? And if they register with us there will be an addition of 20 sessions to Abdul-Rahman\'s account as a gift."',
          '🛑 Case 2 — Abu Naif (Partner Commission Approach — M3-M6):\nStart: professional academic review of the child. Transition: "Teacher, I want to tell you something important… we\'ve set something up for people who have a lot of contacts. Kind of like an employment arrangement… any person who comes through you and subscribes — you get $100." Close: "The most important thing is to fill in the details and share the link."',
          '🛑 Case 3 — Abu Ryan and Bassam (Record-Level Referrer — Accountability Call):\n"Bassam registered — then through Bassam two of his brothers, and Sofiya, and Suhail, and Suhail, and Lujain, and Muath, and Manar, and Abdul-Rahman — 10 people registered through him… if you\'re not going to give me the prizes for all of them, then at least give me his prize — exactly what you announced in the first announcement: iPad or laptop." [Father demanding accountability for unreceived prizes — important escalation case]',
          '📌 TONE GUIDE: With fathers — confident, direct, professional. Match their pace. If they speak fast, be fast. If they are quiet and measured, slow down. Never over-flatter or use emotional language like "my dear" — use professional: "Teacher / Abu [name]."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أبو عبد الرحمن (الطلب الجانبي VIP اللطيف):\n"شغلة إضافية ابو عبد الرحمن كنت بسألك فيها للأمانة بالنسبة لعبد الرحمن يعني إذا في أحد من محيطك من معارفك مثلاً مهتم في تعلم اللغه الانجليزية ممكن ترسلنا رقم جواله وإذا سجل معنا بيكون في إضافة 20 حصة لعبد الرحمن هدية."',
          '🛑 الحالة 2 — أبو نايف (نهج عمولة الشريك — M3-M6):\nالبداية: مراجعة أكاديمية احترافية للطفل. الانتقال: "أستاذ بدي أقول لك شغلة مهمة… عملنا شيء للناس اللي عندهم كثير أشخاص. زي كأنه توظيف… أي شخص بيجي عن طريقك بيشترك لك 100 دولار." الإغلاق: "أهم شيء تعبّي البيانات وتنشر الرابط."',
          '🛑 الحالة 3 — أبو ريان وبسام (أعلى مُحيل — مكالمة المساءلة):\n"بسام سجل بعد بسام عن طريقه اثنين إخوانه وصوفية وسهيل وسهيل ولجين ومعاذ ومنار وعبد الرحمن مسجلين 10 أشخاص عن طريقه… إذا إنت الحين ما بتعطيني الهدايا حقت هذول كلهم تقول لي خذ هذه الهدية حقته زي ما أعلنتم في الإعلان الأول إنه آيباد ولا لابتوب." [الأب يطالب بالمساءلة عن جوائز لم تُستلم — حالة تصعيد مهمة]',
          '📌 دليل النبرة: مع الآباء — واثق، مباشر، احترافي. تزامن مع إيقاعهم. إذا تكلموا بسرعة، كن سريعاً. إذا كانوا هادئين ومتأنين، تمهّل. لا تُبالغ في الإطراء أو تستخدم لغة عاطفية مثل "يا عمري" — استخدم المهني: "أستاذ / أبو [الاسم]."'
        ],
        items_zh:[
          '🛑 案例1 — 孩子父亲（VIP侧面温和请求）：\n"顺便有件事想请教您——如果您身边有熟人对学英语感兴趣，能把联系方式发给我吗？只要对方成功注册，孩子账户就会额外增加20节课作为礼物。"',
          '🛑 案例2 — 父亲（合作伙伴佣金模式 — 中期学员M3-M6）：\n开场：专业回顾孩子的学习进度。过渡："老师，我想跟您说一件重要的事——我们为人脉广的家长做了一个计划，相当于兼职合作。每推荐一人成功报名，您可以获得相应奖励。" 收尾："最重要的是填好信息，把链接分享出去。"',
          '🛑 案例3 — 高产推荐人父亲（推荐奖励追责电话）：\n某家长通过推荐带来了10名新学员，但承诺的奖品（iPad/笔记本电脑）一直未收到，父亲来电追责。此案例提醒：推荐奖励务必及时兑现，否则将损害信任并引发升级投诉。',
          '📌 沟通风格指南：与父亲沟通时——自信、直接、专业。跟随他们的节奏：语速快则快，沉稳慢则慢。不要过度奉承，避免使用"亲爱的"等情感化称呼——使用专业称谓："老师 / [孩子名]爸爸"。'
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
        text_ar:'يُقدّم أسلوب التواصل الأكاديمي الـ CM بوصفه مرجعاً تعليمياً — "مرشد نجاح" أو "مستشار أكاديمي" يفهم رحلة الطالب التعليمية بعمق. تُقدَّم طلبات الريفيرال بوصفها امتداداً طبيعياً للحوار الأكاديمي، مدعومةً بالبيانات والتقارير وتحليل المستوى. يُجدي هذا الأسلوب أكثر مع أولياء الأمور الذين يطرحون أسئلة كثيرة، ويريدون دليلاً على التقدم، ويستجيبون للمعلومات المنظمة بدلاً من النداءات العاطفية.',
        text_zh:'学术型沟通风格将课程顾问塑造为教育权威——"成功导师"或"学业顾问"，对学员的学习历程有深入了解。推荐请求以学术对话的自然延伸方式提出，以数据、报告和级别分析作为支撑。这种风格最适合那些爱提问、注重进步证据、更倾向于接受结构化信息而非情感诉求的家长。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Parents who respond to academic style are: data-oriented, analytically-minded, value evidence over emotion, and need to feel the CM is genuinely competent before they extend trust. Three-step psychology:\n\n(1) AUTHORITY ESTABLISHMENT: CM demonstrates knowledge of the child\'s specific level, progress metrics, and curriculum gap — parent thinks "this person knows my child."\n(2) LOGICAL REFERRAL BRIDGE: "The report shows [data]. Based on this, we recommend [action]. By the way, our referral program works like this..." — the referral is embedded in a logical flow.\n(3) VIP SCARCITY: "Limited golden seats / elite schedule" — academic privilege framing that makes referral feel like exclusive access.',
        text_ar:'أولياء الأمور الذين يستجيبون للأسلوب الأكاديمي: موجّهون بالبيانات، تحليليو التفكير، يقدّرون الدليل على الشعور، ويحتاجون إلى الشعور بكفاءة الـ CM الحقيقية قبل منح الثقة. علم النفس بثلاث خطوات:\n\n(1) تأسيس السلطة: يُظهر الـ CM معرفته بمستوى الطفل المحدد ومقاييس تقدمه وفجوات المنهج — يفكر وليّ الأمر "هذا الشخص يعرف طفلي."\n(2) جسر الريفيرال المنطقي: "التقرير يُظهر [البيانات]. بناءً على ذلك نوصي بـ [الإجراء]. بالمناسبة، برنامج الريفيرال يعمل هكذا..." — الريفيرال مدمج في سياق منطقي.\n(3) شُح VIP: "مقاعد ذهبية محدودة / جدول النخبة" — إطار الامتياز الأكاديمي الذي يجعل الريفيرال يبدو وصولاً حصرياً.',
        text_zh:'对学术型沟通风格有反应的家长：数据导向、分析性思维、重证据轻情感，需要先感受到顾问真正的专业能力才会建立信任。三步心理机制：\n\n(1) 建立权威：顾问展示对孩子具体级别、进步数据和课程差距的了解——家长心想"这个人真的了解我的孩子。"\n(2) 逻辑推荐过渡："报告显示[数据]。基于此，我们建议[行动]。顺便说一下，我们的推荐计划是这样运作的……"——推荐嵌入逻辑流程中自然引出。\n(3) VIP稀缺感："名额有限的精英席位/精英课表"——以学术特权框架呈现，让推荐感觉像获得专属通道。' },
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
        ],
        items_zh:[
          '分享进度报告、测评结果或完成级别里程碑之后',
          '家长就课程内容或教学方法提出详细问题时',
          '家长是教育工作者、医生或从事专业职业时',
          '孩子加入高端计划（精英版/剑桥版）时——家长期待高水准的专业指导',
          '介绍12节课最低出勤承诺规则时——学术框架已经建立'
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
        ],
        items_zh:[
          '家长问"你们的级别评估是怎么运作的？"——分析型思维的表现',
          '家长将平台与学校课程或标准化考试进行比较',
          '家长提到雅思、学校考试或未来学业目标',
          '家长对数字和数据的反应比情感故事更积极',
          '家长沉稳、有条理，整个通话过程中持续提出追问'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'Professional greeting + introduce as "Success Mentor" ⬅️ Share specific progress data (session count, level, performance scores) ⬅️ Discuss the 12-session minimum commitment ⬅️ Explain teacher differentiation policy ⬅️ Present the referral program as structured and data-driven ⬅️ "Any family similar to yours who would benefit from this structured approach?" ⬅️ Ensure numbers are genuinely interested',
        text_ar:'تحية احترافية + التقديم بوصف "مرشد النجاح" ⬅️ مشاركة بيانات التقدم المحددة (عدد الحصص، المستوى، درجات الأداء) ⬅️ مناقشة الحد الأدنى للالتزام بـ 12 حصة ⬅️ شرح سياسة تمييز المعلم ⬅️ تقديم برنامج الريفيرال بوصفه منظماً ومبنياً على البيانات ⬅️ "أي عائلة مثلكم تستفيد من هذا النهج المنظم؟" ⬅️ التأكد من أن الأرقام مهتمة فعلاً',
        text_zh:'专业问候 + 以"成功导师"身份自我介绍 ⬅️ 分享具体进度数据（课时数、级别、表现评分） ⬅️ 讨论12节课最低出勤承诺 ⬅️ 说明教师差异化政策 ⬅️ 以结构化、数据驱动的方式介绍推荐计划 ⬅️ "像您这样的家庭，有没有同样注重结构化学习的朋友？" ⬅️ 确认对方确实有学习意愿' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Authority Intro: "With you is Teacher Ahmed, the dedicated success teacher for the children, and I\'m the one who will be following up with you, God willing." (Approach 1 — Service Calls)',
          'Commitment Rule: "Commitment to the 12 sessions is very important so we can see real results."',
          'VIP Technical: "Your seat is VIP and gives you 5 free seats to gift to your friends or colleagues." (Alaa\'s VIP approach)',
          'Assessment Tool: "The assessments are now live in the Assessment Centre inside the app." (Academic support case)',
          'Report-Based Referral: "The results are very clear in the report. Sara, mashallah, attended 21 sessions with no absences." (Um Sara — Low Consumption)'
        ],
        items_ar:[
          'تقديم السلطة: "مع حضرتك أستاذ أحمد معلم النجاح الخاص بالأولاد وأنا اللي هتابع مع حضرتك إن شاء الله." (النهج 1 — مكالمات الخدمة)',
          'قاعدة الالتزام: "مهم جدًا الالتزام بالـ 12 حصة عشان نشوف نتائج حقيقية."',
          'VIP التقني: "مقعدك VIP وبيعطيك 5 مقاعد مجانية تهديهم لزملائك." (نهج Alaa VIP)',
          'أداة التقييم: "الاختبارات نزلت بمركز التقييم داخل التطبيق." (حالة الدعم الأكاديمي)',
          'الريفيرال القائم على التقرير: "النتائج واضحة جدًا بالتقرير. سارة ما شاء الله حضرت 21 حصة بدون غياب." (أم سارة — الاستهلاك المنخفض)'
        ],
        items_zh:[
          '权威开场："您好，我是[孩子名]的专属成功导师，负责全程跟进孩子的学习进度。"（常规服务通话用语）',
          '出勤承诺规则："连续完成12节课非常重要，这样我们才能看到真实的进步。"',
          'VIP技术权益："您的席位是VIP，附带5个免费名额可赠送给朋友或同事。"（VIP推荐专属权益）',
          '测评工具："测评已上线，在应用内的评估中心可以查看。"（学业支持案例）',
          '数据驱动推荐："报告数据非常清晰。孩子已完成21节课，零缺勤，进步有目共睹。"（低出勤家长回访）'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Report-Based Ask:\n"The results are very clear in the report. We only want children who can benefit like Sara, Dana, and Hisham. Any new subscription gives Sara 20 free sessions." (Um Sara)\n\nVIP Scarcity:\n"You have a VIP referral seat but you haven\'t used it yet.. and if you don\'t use it, it may be withdrawn." (Dr. Sara — VIP Scarcity)\n\nSuccess Mentor Referral:\n"One last thing — we have the referral program.. you came through Um Mona, and she benefits from gifts and prizes.. and you too can benefit when you refer people to the platform." (Teacher Ahmed × Um Zainab)',
        text_ar:'الطلب القائم على التقرير:\n"النتائج واضحة جدًا بالتقرير. إحنا فقط بدنا أطفال ممكن يستفيدوا مثل سارة ودانا وهشام. أي اشتراك جديد يعطي سارة 20 حصة مجانية." (أم سارة)\n\nشُح VIP:\n"إنت عندك مقعد VIP خاص بالترشيحات لكن لسه ما استفدتي منه.. وإذا ما استخدمتيه ممكن يتم سحبه." (دكتورة سارة — شُح VIP)\n\nريفيرال مرشد النجاح:\n"آخر حاجة عندنا برنامج الترشيحات.. حضرتك دخلتي من طرف أم منى وهي بتستفيد بهدايا وجوائز.. وأنت كمان تقدري تستفيدي لما ترشحي أشخاص للمنصة." (أستاذ أحمد × أم زينب)',
        text_zh:'基于报告的推荐请求：\n"报告数据非常清晰。我们只希望找到像您孩子一样能从中受益的学员。每成功推荐一名新学员，孩子账户就会增加20节免费课。"\n\nVIP稀缺感策略：\n"您有一个专属的VIP推荐席位，但目前还没有使用……如果一直不用，这个名额可能会被收回。"\n\n成功导师推荐衔接：\n"最后还有一件事——我们有一个推荐计划。您当初是通过老学员介绍来的，她因此获得了礼品和奖励……您同样可以通过推荐朋友来享受这些福利。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"They registered through me but I didn\'t benefit." (lost referrals due to wrong linking)\n→ "Next time send me the number directly so we can link it to your account and nothing gets lost."\n\n"Why didn\'t I get a prize even though I registered more than one child?"\n→ "Let me submit the request for you and see what\'s the best exception we can make for you."\n\n"I don\'t know people who are at the same academic level."\n→ "They don\'t have to be the same level — the platform assesses every student from scratch. The best approach is to refer any family that is interested in learning English."',
        text_ar:'"سجلوا من طرفي وما استفدت." (ريفيرالات ضائعة بسبب الربط الخاطئ)\n→ "المرة الجاية ابعثي الرقم مباشرة عشان نربطه على حسابك وما يضيع عليك شيء."\n\n"ليش ما أخذت جائزة رغم تسجيلي أكثر من طفل؟"\n→ "خليني أرفع لك الطلب وأشوف أفضل استثناء ممكن ينفعكم."\n\n"ما عندي ناس على نفس المستوى الأكاديمي."\n→ "مو شرط نفس المستوى — المنصة تقيّم كل طالب من أوله. الأفضل ترشحي أي عائلة مهتمة بتعليم الإنجليزي."',
        text_zh:'异议："我推荐了人，但没有收到奖励。"（因绑定错误导致推荐丢失）\n→ "下次请直接把号码发给我，我帮您绑定到账户，确保不会丢失任何奖励。"\n\n异议："我已经推荐了不止一个孩子，为什么还是没有收到奖品？"\n→ "让我帮您提交申请，看看能为您争取到什么最优方案。"\n\n异议："我认识的人和我们不在同一个学习水平。"\n→ "不需要同等水平——平台会为每位学员独立进行评测。只要对方对学英语感兴趣，就可以推荐。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always reference specific data: session count, level, assessment scores — not general praise',
          '"Sara, mashallah, attended 21 sessions with no absences and the results are excellent in the report."',
          'Tie the referral to the report: "And based on this report, any family like yours will benefit in the same way."',
          'VIP framing for academic parents: "Your seat is VIP and gives you 5 free seats"',
          'WhatsApp: "📊 Here is the student performance report [+ prize chart]"'
        ],
        items_ar:[
          'دائماً استشهد ببيانات محددة: عدد الحصص، المستوى، درجات التقييم — لا مديح عام',
          '"سارة ما شاء الله حضرت 21 حصة بدون غياب والنتائج جدًا ممتازة بالتقرير."',
          'اربط الريفيرال بالتقرير: "واستناداً على هذا التقرير، أي عائلة مثلكم ستستفيد بنفس الطريقة."',
          'إطار VIP لأولياء الأمور الأكاديميين: "مقعدك VIP وبيعطيك 5 مقاعد مجانية"',
          'واتساب: "📊 هذا تقرير الأداء الخاص بالطالب [+ جدول الجوائز]"'
        ],
        items_zh:[
          '始终引用具体数据：课时数、级别、测评分数——而非泛泛的赞美。',
          '"孩子真的很棒，已完成21节课，零缺勤，报告显示进步非常明显。"',
          '将推荐与报告挂钩："基于这份报告，像您这样注重学习质量的家庭，同样可以推荐给有需要的朋友。"',
          '为学术型家长使用VIP框架："您的席位是VIP，附带5个免费推荐名额。"',
          '微信跟进："📊 这是孩子的学习表现报告 [+ 奖励说明图表]"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '📌 CM PERSONA: Academic style requires the CM to speak as an authority, not a friend. Tone: calm, measured, knowledgeable. Avoid over-praising or emotional language. Every statement should feel grounded in data or professional expertise.',
          '📌 ALAA\'S ACADEMIC SIGNATURE: (1) Establish technical authority through precise explanation of platform features. (2) VIP/scarcity framing — "limited seats" — creates urgency without emotional pressure. (3) "VIP seat" as the primary referral hook — parent feels prestigious, not sold to. (4) Systematic step-by-step process for linking referrals — removes confusion.',
          '📌 KEY DISTINCTION from Friendly Style: Academic style parents need to UNDERSTAND before they FEEL. The CM must explain the referral mechanism clearly and logically before the emotional or financial hook is introduced. Reverse the order with these parents — facts first, feelings second.'
        ],
        items_ar:[
          '📌 شخصية الـ CM: الأسلوب الأكاديمي يتطلب أن يتحدث الـ CM بوصفه مرجعاً لا صديقاً. النبرة: هادئة، متأنية، متمكنة. تجنب المبالغة في الإطراء أو اللغة العاطفية. كل تصريح يجب أن يبدو مبنياً على بيانات أو خبرة مهنية.',
          '📌 بصمة Alaa الأكاديمية: (1) تأسيس السلطة التقنية من خلال الشرح الدقيق لمزايا المنصة. (2) إطار VIP/الشُح — "مقاعد محدودة" — يخلق الإلحاح دون ضغط عاطفي. (3) "مقعد VIP" كخطاف الريفيرال الأساسي — يشعر وليّ الأمر بالتميز لا بأنه يُباع له. (4) عملية منهجية خطوة بخطوة لربط الريفيرالات — تُزيل الارتباك.',
          '📌 الفرق الجوهري عن الأسلوب الودي: أولياء الأمور ذوو الأسلوب الأكاديمي يحتاجون إلى فهم قبل الشعور. يجب على الـ CM شرح آلية الريفيرال بوضوح ومنطقية قبل تقديم الخطاف العاطفي أو المالي. اعكس الترتيب مع هؤلاء الآباء — الحقائق أولاً، المشاعر ثانياً.'
        ],
        items_zh:[
          '📌 顾问角色定位：学术风格要求顾问以权威身份而非朋友身份发言。语气：沉稳、措辞精准、专业自信。避免过度赞美或情感化表达。每句话都应有数据或专业经验作支撑。',
          '📌 学术型顾问的核心打法：(1) 通过精准解释平台功能建立技术权威；(2) VIP/稀缺框架——"名额有限"——在不施加情感压力的情况下制造紧迫感；(3) 以"VIP席位"作为推荐核心吸引点——让家长感到的是尊享，而非被推销；(4) 提供系统化的推荐绑定步骤——消除操作疑惑。',
          '📌 与亲友型风格的关键区别：学术型家长需要先理解才会产生感受。顾问必须先清晰、有逻辑地解释推荐机制，再引入情感或利益钩子。对这类家长，顺序要反过来——先摆事实，再讲感受。'
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
        text_ar:'بناء علاقة شخصية سريعة تحوّل العميل إلى شريك ريفيرال فعّال. يعمل الـ CM الودّيون (يارا، لبنى، سارة) بوصفهم "صديق + مستشار تعليمي" في آنٍ واحد — لا بائعين. يبدو طلب الريفيرال طبيعياً لأن العلاقة تبدو حقيقية. أسلوبان فرعيان: (1) التلعيب (يارا) — تحويل نظام الريفيرال إلى لعبة نقاط/أرباح يريد العميل الفوز بها. (2) إطار الهدية (لبنى/سارة) — تقديم الريفيرال بوصفه شيئاً لطيفاً يفعله العميل لصديق، دون أي ضغط.',
        text_zh:'快速建立真实的个人情感联结，将客户转化为积极的推荐合作伙伴。亲和型顾问同时扮演"朋友+教育顾问"两个角色——而非销售员。推荐请求之所以自然流畅，是因为这段关系本身就是真实的。两种子风格：(1) 游戏化（亚拉）——将推荐体系转变为客户想要赢得的积分/奖励游戏；(2) 礼物框架（鲁布娜/萨拉）——将推荐定位为你为朋友做的一件好事，完全无压力。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Friendly-style customers respond to warmth and personal connection above all else. They refer because they like the CM personally, not primarily for the reward. Key psychological levers:\n\n• YARA model: Gamification triggers competitive participation — "If you reach 3 referrals you get the big prize." The customer becomes a player in a game, not a passive recipient of a sales pitch.\n\n• LUBNA/SARA model: Emotional reciprocity — "You recommended your friend to me — that means you trust us." The gift framing removes guilt: "I\'ll contact them and I\'ll never put any pressure on them at all."',
        text_ar:'يستجيب عملاء الأسلوب الودّي للدفء والتواصل الشخصي فوق كل شيء. يُحيلون لأنهم يحبون الـ CM شخصياً، ليس بصورة رئيسية للمكافأة. الروافع النفسية الأساسية:\n\n• نموذج يارا: يُحفّز التلعيب المشاركة التنافسية — "إذا وصلتي 3 ريفيرالات بتاخذي الجائزة الكبيرة." يصبح العميل لاعباً في لعبة، لا متلقياً سلبياً لعرض بيع.\n\n• نموذج لبنى/سارة: المعاملة بالمثل العاطفية — "أنت وصتيني على صاحبتك وهاد معناه إنك واثقة فينا." يُزيل إطار الهدية الشعورَ بالذنب: "أنا رح أتواصل معهم وما رح أضغط عليهم أبدًا."',
        text_zh:'亲和型风格的客户首先回应的是温情和个人联结。她们愿意推荐，是因为真心喜欢这位顾问，而不主要是为了奖励。核心心理杠杆：\n\n• 亚拉模式：游戏化激发竞争参与感——"推荐满3人就能拿小奖，满5人就能拿iPad。"客户变成了游戏参与者，而不是被动接受销售话术的对象。\n\n• 鲁布娜/萨拉模式：情感互惠——"您把朋友介绍给我，说明您非常信任我们。"礼物框架消除愧疚感："我会去联系她们，绝对不会施加任何压力。"' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer laughs, uses terms of endearment, or says "honestly your voice is lovely" — rapport is already there',
          'When customer mentions a friend or family member by name during conversation',
          'After a warm personal exchange about children\'s progress — emotional peak moment',
          'When customer expresses satisfaction: "God bless you all" or "God willing you\'ve been helpful"',
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
        ],
        items_zh:[
          '客户大笑、用亲昵称呼，或说"你的声音真好听"——信任感已经建立',
          '客户在通话中主动提到某位朋友或家人的名字',
          '谈完孩子进步后的温情互动之后——情感高峰时刻',
          '客户表达满意："希望你们一切顺利"或"真的很有帮助"',
          '亚拉/游戏化：确认多名孩子在读或高端套餐后——奖励潜力最大',
          '鲁布娜/礼物框架：任何时候只要客户状态温热——越温和的请求越不依赖时机'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Warm, expressive tone — "my dear", "honestly your words are so lovely", "you love everyone"',
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
        ],
        items_zh:[
          '语气温暖、情感外露——"亲爱的"、"你说话真好听"、"你对所有人都这么好"',
          '社交活跃的妈妈——提到家长群、学校活动或她认识的其他家长',
          '主动提起是谁介绍她来的——本来就信任口碑推荐链',
          '大笑、将话题延伸到业务之外',
          '发微信语音消息、回复迅速——社交连接力强'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'YARA (Gamification) Flow:\nWarm greeting + personal compliment ⬅️ Understand student level ⬅️ Fix schedule ⬅️ "I want to tell you about a simple system where you earn prizes" ⬅️ Explain prize ladder (3 referrals = prize, 5 = iPad, etc.) ⬅️ Ask: "Who is the first person you\'ll think of?" ⬅️ Get name/number ⬅️ WhatsApp follow-up\n\nLUBNA/SARA (Gift Framing) Flow:\nEmotional welcome ⬅️ Personal rapport building ⬅️ System walkthrough ⬅️ "I have a simple question — do you have friends with children who would benefit?" ⬅️ Gift framing: "I\'ll contact them as a gift from you and I\'ll never pressure them" ⬅️ Collect numbers ⬅️ WhatsApp link + voice message',
        text_ar:'تدفق يارا (التلعيب):\nتحية دافئة + مجاملة شخصية ⬅️ فهم مستوى الطالب ⬅️ تثبيت الجدول ⬅️ "بدي أحكيلك عن نظام بسيط بتكسبي منه هدايا" ⬅️ شرح سلّم الجوائز (3 ريفيرالات = جائزة، 5 = iPad، إلخ) ⬅️ الطلب: "مين أول وحدة رح تفكري فيها؟" ⬅️ الحصول على الاسم/الرقم ⬅️ متابعة واتساب\n\nتدفق لبنى/سارة (إطار الهدية):\nترحيب عاطفي ⬅️ بناء الألفة الشخصية ⬅️ جولة النظام ⬅️ "بدي سؤال بسيط — في صاحبات عندهم أطفال يستفيدوا؟" ⬅️ إطار الهدية: "رح أتواصل معهم كهدية منك وما رح أضغط عليهم" ⬅️ جمع الأرقام ⬅️ رابط واتساب + رسالة صوتية',
        text_zh:'亚拉流程（游戏化）：\n温情问候 + 个人赞美 ⬅️ 了解学员级别 ⬅️ 确定课表 ⬅️ "我来介绍一个简单的奖励体系" ⬅️ 讲解奖励阶梯（推荐3人得小奖，5人得iPad等） ⬅️ 发起行动："你现在第一个想到的是谁？" ⬅️ 获取姓名/号码 ⬅️ 微信跟进\n\n鲁布娜/萨拉流程（礼物框架）：\n情感暖场 ⬅️ 建立个人信任感 ⬅️ 介绍平台功能 ⬅️ "问你一个简单的问题——你有没有朋友的孩子也需要学英语？" ⬅️ 礼物定位："我去联系她们就当是你送的礼物，我绝对不会给她们施加压力" ⬅️ 收集号码 ⬅️ 发送微信链接 + 语音消息' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Pattern A (Yara) — "If you register 3 people you get [a prize], and if you reach 5 you get the iPad — it\'s just like a points system"',
          'Pattern B (Yara) — "Who is the first person that comes to mind right now?" — immediately converts talk to action',
          'Pattern C (Lubna/Sara) — "I\'ll contact them as a gift from you and I will never pressure them at all"',
          'Pattern D (Sara) — "I want you to be as smart as your friend and refer people" — peer comparison + compliment',
          'Pattern E (Sara) — "And let everything stay between us and I\'ll follow up with everything" — removes all customer burden'
        ],
        items_ar:[
          'النمط أ (يارا) — "إذا سجلتي 3 أشخاص بتاخذي [جائزة]، وإذا وصلتي 5 بتاخذي الـ iPad — هاد اشبه نظام النقاط"',
          'النمط ب (يارا) — "مين أول وحدة في بالك دلوقتي؟" — يحوّل الكلام إلى فعل فوراً',
          'النمط ج (لبنى/سارة) — "أنا رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا"',
          'النمط د (سارة) — "بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس" — مقارنة الأقران + مجاملة',
          'النمط ه (سارة) — "وخلي كل شيء بيني وبينك وأنا أتابع كل شيء" — يُزيل كل عبء عن العميل'
        ],
        items_zh:[
          '模式A（亚拉）——"推荐满3人得[小奖]，满5人得iPad——就像积分游戏一样"',
          '模式B（亚拉）——"你现在脑海里第一个想到的是谁？"——立刻将想法转化为行动',
          '模式C（鲁布娜/萨拉）——"我去联系她们就当是你送的礼物，绝对不会给她们施加任何压力"',
          '模式D（萨拉）——"我希望你像你的朋友一样厉害，也来推荐几个人"——同伴比较 + 赞美',
          '模式E（萨拉）——"一切都交给我来处理，你完全不用操心"——彻底消除客户的顾虑负担'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Gamification openers (Yara):\n"I want to tell you about a simple system where you earn prizes and cashback."\n"If you reach 3 referrals you get the small prize, and if you reach 5 you get the iPad."\n"Who is the first person that comes to mind right now?"\n\nGift framing openers (Lubna/Sara):\n"Do you have friends with children who would benefit from the platform?"\n"I\'ll contact them as a gift from you and I will never pressure them at all."\n"I want you to be as smart as your friend and refer people."\n"Send me the numbers and I\'ll follow up with them myself — and I won\'t mention that you recommended them."',
        text_ar:'مقدمات التلعيب (يارا):\n"بدي أحكيلك عن نظام بسيط بتكسبي منه هدايا وكاش باك."\n"إذا وصلتي 3 ريفيرالات بتاخذي الجائزة الصغيرة، وإذا وصلتي 5 بتاخذي الـ iPad."\n"مين أول وحدة في بالك دلوقتي؟"\n\nمقدمات إطار الهدية (لبنى/سارة):\n"في صاحبات عندهن أطفال يستفيدوا من المنصة؟"\n"رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا."\n"بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس."\n"ابعثيلي الأرقام وأنا أتابع معهم بنفسي — وما رح أذكر إنك وصيتيني عليهم."',
        text_zh:'游戏化开场（亚拉）：\n"我来介绍一个简单的奖励体系，推荐朋友就能赢礼品和返现。"\n"推荐满3人得小奖，满5人得iPad。"\n"你现在脑海里第一个想到的是谁？"\n\n礼物框架开场（鲁布娜/萨拉）：\n"你有没有朋友的孩子也需要学英语？"\n"我去联系她们就当是你送的礼物，绝对不施加任何压力。"\n"我希望你像你的朋友一样，也来推荐几个人。"\n"把号码发给我，我来跟进——而且不会提是你介绍的。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I don\'t know if my friend will agree."\n→ "She doesn\'t need to agree right now — just send me her number and I\'ll reach out in a gentle way."\n\n"I\'m afraid they\'ll be upset with me."\n→ "On the contrary, they\'ll thank you — and I\'ll explain everything myself without any pressure."\n\n"I don\'t have anyone right now."\n→ "No problem — even later, if you think of someone just send them to me and I\'m here."\n\nFor gamification objections:\n"How do I know if the referral worked?"\n→ "I\'ll send you an immediate confirmation whenever anyone registers through you."',
        text_ar:'"ما بعرف إذا صاحبتي رح توافق."\n→ "ما محتاجة توافق هلق — بس ابعثيلي رقمها وأنا بتواصل معها بأسلوب لطيف."\n\n"خايفة يزعلوا مني."\n→ "بالعكس رح يشكروك — وأنا رح أشرح لهم بنفسي بدون أي ضغط."\n\n"ما عندي ناس هلق."\n→ "عادي — حتى لو بعدين لو فكرتي بأحد ابعثيلي وأنا موجودة."\n\nاعتراضات التلعيب:\n"كيف بعرف إذا الريفيرال اشتغل؟"\n→ "رح أبعثلك تأكيد فوري لما يسجل أي شخص من طرفك."',
        text_zh:'异议："我不知道我朋友会不会同意。"\n→ "不需要她们先同意——把号码发给我，我会用温和的方式去联系。"\n\n异议："我怕她们会怪我。"\n→ "恰恰相反，她们会感谢你的——我会亲自去解释，完全不会有压力。"\n\n异议："我现在想不到合适的人。"\n→ "没关系——等你想到了随时发给我，我一直都在。"\n\n游戏化异议：\n异议："我怎么知道推荐有没有成功绑定？"\n→ "只要有人通过你的推荐注册，我会立刻发确认消息给你。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Use the customer\'s name or her child\'s name warmly throughout — makes conversation feel personal',
          'Yara: always end referral pitch with "Who is the first person that comes to mind?" — makes it action-oriented',
          'Lubna/Sara: always reassure "I will never pressure them at all" — removes social risk for customer',
          'Send WhatsApp immediately after call with the referral link + voice message',
          'Sara closing: "My dear, anything you need I\'m here" — leaves the door open always'
        ],
        items_ar:[
          'استخدم اسم العميلة أو اسم طفلها بدفء طوال المحادثة — يجعلها تشعر بالخصوصية',
          'يارا: دائماً اختم طرح الريفيرال بـ "مين أول وحدة في بالك؟" — يجعله موجّهاً بالفعل',
          'لبنى/سارة: دائماً طمئن "ما رح أضغط عليهم أبدًا" — يُزيل الخطر الاجتماعي عن العميلة',
          'أرسل واتساب مباشرة بعد المكالمة مع رابط الريفيرال + رسالة صوتية',
          'إغلاق سارة: "يا عمري أي شيء تحتاجيه أنا موجودة" — يُبقي الباب مفتوحاً دائماً'
        ],
        items_zh:[
          '全程亲切使用客户名字或孩子名字——让对话更有个人温度',
          '亚拉：推荐话术结尾必问"你现在脑海里第一个想到的是谁？"——将意图转化为具体行动',
          '鲁布娜/萨拉：始终补充"我绝对不会给她们施加任何压力"——消除客户的社交顾虑',
          '挂机后立即发微信跟进，附上推荐链接和语音消息',
          '萨拉收尾语："亲爱的，有任何需要随时找我"——永远为客户留着门'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Case 1 — Teacher Sara × Um Mohammad (Friendly — Approach 3):\n"My dear, honestly your voice is so warm.. Um Abdul-Rahman told me a lot about you.. we\'ll fix the schedule from Sunday to Wednesday at 6.. if the child doesn\'t stick to the schedule the sessions are lost.. I want you to be as smart as your friend and refer people.. anyone who subscribes through you I\'ll add free sessions for you.. and let everything stay between us and I\'ll follow up with everything."',
          '🛑 Case 2 — Teacher Sara × Um Abdul-Rahman (Friendly — Approach 3):\n"My dear, Um Abdul-Rahman, how are you.. your daughter is smart and I want to give her free sessions.. I have a simple question — which of your friends wants her children to improve like your daughter.. send me the numbers and I\'ll follow up with them myself.. and I won\'t mention that you recommended them."',
          '🛑 Yara Pattern (from per-CM profile):\n"Relies on Gamification — converts the referral into a points and earnings system.. starts by quickly fixing the schedule and commitments.. then converts the customer into a referral partner.. says: if you reach 3 you get [prize] and if you reach 5 you get the iPad.. asks: Who is the first person that comes to mind right now?"',
          '🛑 Lubna Pattern (from per-CM profile):\n"Referral request in a gift style: I\'ll give it to them as a gift.. starts with a question about interested people rather than a direct ask.. tailored for emotionally open and socially active mothers.. says: I will contact them and I will never put any pressure on them at all."'
        ],
        items_ar:[
          '🛑 الحالة 1 — أستاذة سارة × أم محمد (الودّي — النهج 3):\n"يا عمري والله صوتك يخطف القلب..أم عبدالرحمن حدثتني عنكم كثير..رح نثبت الجدول من الأحد إلى الأربعاء الساعة 6..لما ما يلتزم الولد بالجدول الحصص بتروح..بدي إياك تكوني شاطرة زي صاحبتك وترشحي ناس..أي شخص يشترك من طرفك رح أضيف لك حصص مجانية..وخلي كل شيء بيني وبينك وأنا أتابع كل شيء."',
          '🛑 الحالة 2 — أستاذة سارة × أم عبد الرحمن (الودّي — النهج 3):\n"يا حبيبتي يا أم عبدالرحمن كيف حالك..بنتك شاطرة وبدي أعطيها حصص مجانية..بدي سؤال بسيط — أي صاحباتك بدها أولادها يتحسنوا زي بنتك..ابعثيلي الأرقام وأنا أتابع معهم بنفسي..وما رح أذكر إنك وصيتيني عليهم."',
          '🛑 نمط يارا (من ملف الـ CM):\n"تعتمد على التلعيب — بتحول الريفيرال لنظام نقاط وأرباح..بتبدأ بتثبيت الجدول والالتزامات بسرعة..بعدها بتحول العميل لشريك في الريفيرال..بتقول: إذا وصلتي 3 بتاخذي [جائزة] وإذا وصلتي 5 بتاخذي iPad..بتسأل: مين أول وحدة في بالك دلوقتي؟"',
          '🛑 نمط لبنى (من ملف الـ CM):\n"طلب الريفيرال بأسلوب هدية: رح أعطيهم إياها كهدية..تبدأ بسؤال عن أشخاص مهتمين مش بطلب مباشر..مخصصة للأمهات العاطفيات والناشطات اجتماعيًا..تقول: أنا راح أتواصل معهم وما راح أضغط عليهم أبدًا."'
        ],
        items_zh:[
          '🛑 案例1 — 萨拉顾问 × 穆罕默德妈妈（亲和风格——模式3）：\n"亲爱的，你的声音真的很好听……Abdulrahman妈妈跟我说了很多你们的事……我们把课表固定在周日到周三晚上六点……如果孩子不按时上课，课时就会失效……我希望你也像你的朋友一样来推荐几个人……每推荐一人成功报名，我就给你加免费课……把一切交给我来处理，你完全不用操心。"',
          '🛑 案例2 — 萨拉顾问 × Abdulrahman妈妈（亲和风格——模式3）：\n"亲爱的Abdulrahman妈妈，你好……你女儿真的很棒，我想给她加免费课……问你一个简单的问题——你有没有朋友的孩子也想像她一样进步？……把号码发给我，我来跟进——而且不会提是你介绍的。"',
          '🛑 亚拉模式（顾问档案摘录）：\n依赖游戏化——将推荐转化为积分和奖励体系；先迅速确定课表和出勤承诺；然后将客户转化为推荐合作伙伴；说："推荐满3人得[奖品]，满5人得iPad"；问："你现在脑海里第一个想到的是谁？"',
          '🛑 鲁布娜模式（顾问档案摘录）：\n以礼物方式发起推荐——"我去联系她们就当是送她们礼物"；先询问感兴趣的人，而非直接要求；专为情感型、社交活跃的妈妈设计；说："我会去联系她们，绝对不会给她们施加任何压力。"'
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
        text:'Ask for referrals explicitly and confidently — no soft framing, no hints. The direct ask works best when the customer is already satisfied and the CM has built enough trust. It puts the referral request on the table clearly: "Do you have anyone you can refer to us?" Then immediately handle any objection from the standard table and close by collecting a name or number before ending the call.',
        text_ar:'اطلب الريفيرالات بصراحة وثقة — لا إطارات ناعمة، لا تلميحات. يُجدي الطلب المباشر أكثر عندما يكون العميل راضياً بالفعل وبنى الـ CM ثقةً كافية. يضع الطلب على الطاولة بوضوح: "عندك أي شخص تقدري ترشحيه لنا؟" ثم يعالج أي اعتراض فوراً من الجدول المعياري ويُغلق بجمع اسم أو رقم قبل انتهاء المكالمة.',
        text_zh:'直接、自信地提出推荐请求——不拐弯抹角，不暗示。直接请求最适合客户已满意且顾问已建立足够信任的情况。清楚地将请求摆上台面："你有没有可以推荐给我们的人？"然后立即用标准异议应对表处理任何异议，并在通话结束前以收集姓名或号码来收尾。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Direct request works when the customer already feels positive about the product and the CM. A clear ask signals confidence and respect — it doesn\'t feel pushy when delivered at the right moment. Key psychological dynamic: customers often have someone in mind but don\'t volunteer the information. The direct ask unlocks what\'s already there. After the ask, objections are not refusals — they are stalling patterns with predictable responses. The CM who masters the 12-objection table can handle 95% of direct-ask scenarios.',
        text_ar:'يُجدي الطلب المباشر عندما يشعر العميل بالإيجابية تجاه المنتج والـ CM. يُشير الطلب الواضح إلى الثقة والاحترام — لا يبدو إلحاحاً عند تقديمه في اللحظة المناسبة. الديناميكية النفسية الأساسية: غالباً ما يكون في ذهن العملاء شخص ما لكنهم لا يتطوعون بالمعلومة. يفتح الطلب المباشر ما هو موجود بالفعل. بعد الطلب، الاعتراضات ليست رفضاً — هي أنماط تسويف بردود متوقعة. الـ CM الذي يُتقن جدول الاعتراضات الاثني عشر يستطيع التعامل مع 95% من سيناريوهات الطلب المباشر.',
        text_zh:'直接请求在客户对产品和顾问已有正面感受时最为有效。清晰的请求传递的是自信和尊重——在合适的时机提出，完全不会显得强迫。核心心理动态：客户脑海里通常已经有人选，只是不主动说出来。直接请求能解锁这些已经存在的信息。提问之后，异议不是拒绝——而是可预测的推脱模式，有对应的应对方法。掌握12条异议应对表的顾问，能处理95%的直接请求场景。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Immediately after the customer expresses satisfaction or gratitude about results',
          'When customer says "God bless you" or "God willing the kids will improve" — peak positive emotion',
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
        ],
        items_zh:[
          '客户表达满意或感谢学习成果之后，立即提出',
          '当客户说"希望你们一切顺利"或"孩子一定会进步"时——情绪正向的高峰',
          '续费沟通结束后——客户刚刚再次承诺，信任度高',
          '升级套餐的通话中——客户已处于投入状态',
          '投诉处理妥善后——修复关系的时刻往往能建立很强的忠诚度',
          '学术型风格（Alaa）：介绍完VIP体系或制造席位稀缺感之后'
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
        ],
        items_zh:[
          '客户主动提到已经向某人介绍过这个平台——推荐本能已被激活',
          '客户主动询问推荐计划——已准备好接受直接请求',
          '高满意度：提及孩子的进步，称赞老师',
          '有多个孩子或高价值套餐——被真实奖励潜力所驱动',
          '通话语气干脆果断——对直接沟通反应良好'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'1. Open with satisfaction check: "How is everything going with the children?"\n2. Acknowledge the positive feedback briefly\n3. Direct pivot: "Do you have anyone you can refer to us?"\n4. Customer responds — handle with objection table if needed\n5. If soft objection → use specific response from the 12-table\n6. Collect name/number: "Great, send me the number and I\'ll handle the rest"\n7. Close: "I\'ll send you the program link on WhatsApp"',
        text_ar:'1. ابدأ بسؤال الرضا: "كيف ماشي مع الأطفال؟"\n2. اعترف بالتغذية الإيجابية بإيجاز\n3. التحوّل المباشر: "عندك أي شخص تقدري ترشحيه لنا؟"\n4. يستجيب العميل — تعامل مع جدول الاعتراضات إذا لزم\n5. إذا كان اعتراضاً ناعماً → استخدم الرد المحدد من الجدول الاثني عشر\n6. جمع الاسم/الرقم: "تمام، ابعثيلي الرقم وأنا أتولى الباقي"\n7. الإغلاق: "رح أبعثلك رابط البرنامج على الواتساب"',
        text_zh:'1. 以满意度确认开场："孩子最近怎么样？"\n2. 简短回应客户的正面反馈\n3. 直接切入："你有没有可以推荐给我们的人？"\n4. 客户回应——如需要则使用异议应对表\n5. 若为轻微异议 → 使用12条表格中对应的回复\n6. 收集姓名/号码："好的，把号码发给我，剩下的我来处理"\n7. 结尾："我会把计划链接发到你的微信"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Direct opener: "Do you have anyone you can refer?" — simple, clean, respectful',
          'After objection: "No problem, even later if you think of someone I\'m here"',
          'Number close: "Great, send me the number and I\'ll handle everything"',
          'Alaa variation: "Seats are limited and I only have 3 VIP seats — who is the first person you\'ll think of?"',
          'Reward anchor before ask: "When 3 people come through you, you get [prize] — do you have anyone in mind?"'
        ],
        items_ar:[
          'الافتتاح المباشر: "عندك أي شخص تقدري ترشحيه؟" — بسيط، نظيف، محترم',
          'بعد الاعتراض: "عادي، حتى لو بعدين لو فكرتي بأحد أنا موجودة"',
          'إغلاق الرقم: "تمام، ابعثيلي الرقم وأنا أتولى كل شيء"',
          'تنويع Alaa: "المقاعد محدودة وعندي 3 مقاعد VIP بس — مين أول وحدة رح تفكري فيها؟"',
          'مرساة المكافأة قبل الطلب: "لما تيجي 3 أشخاص من طرفك بتاخذي [جائزة] — عندك أحد في بالك؟"'
        ],
        items_zh:[
          '直接开场："你有没有可以推荐给我们的人？"——简单、干净、有尊重感',
          '处理一个异议后，总以行动收尾："把号码发给我"',
          '"没关系，以后想到了随时发给我，我一直都在"',
          'Alaa变体："我只有3个VIP席位，名额有限——你现在脑海里第一个想到的是谁？"',
          '请求前先锚定奖励："推荐满3人就能得到[奖品]——你现在有没有想到的人？"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'The 12 Common Objections with CM Responses:\n\n1. "I have people but they don\'t want anyone to call them." → "No problem — we won\'t call anyone until you\'ve spoken with them first."\n\n2. "I don\'t have anyone to refer." → "That\'s completely fine — even in the future, if anyone is interested, send me their number."\n\n3. "I don\'t know if they\'ll buy." → "That\'s our job — we\'re the ones who will explain to them and get their decision. You don\'t need to guarantee anything."\n\n4. "My friend doesn\'t have the money." → "There are installment plans — let me explain the options to them."\n\n5. "I\'m afraid they\'ll be upset with me if they don\'t buy." → "On the contrary, if they don\'t buy it\'s not your fault, and I\'ll treat them with respect."\n\n6. "I want to try the service first." → "That\'s absolutely right — because when you see the results you\'ll be a much stronger recommender."\n\n7. "I\'ll see and get back to you." → "Of course, God willing — whenever you remember someone, I\'m here."\n\n8. "When my money comes back I\'ll refer." → "The money won\'t come back to you directly, but free sessions will be added to your subscription."\n\n9. "I don\'t have influence over people." → "They don\'t have to buy because you told them — it\'s enough that you give me the number and I\'ll handle the rest."\n\n10. "It\'s not the right time right now." → "No problem — send me any number even after a week, it doesn\'t matter."\n\n11. "My referrals already bought before." → "Even if they bought before, if they have other children or renew, it counts as a new referral."\n\n12. "Let me talk to them and get back to you." → "Great — after you\'ve spoken with them, send me their number and I\'ll take it from there."',
        text_ar:'الاعتراضات الاثنا عشر الشائعة مع ردود الـ CM:\n\n1. "عندي ناس بس ما بدهم يتصل فيهم أحد" → "عادي، نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول"\n\n2. "ما عندي ناس أرشحهم" → "عادي جدًا، حتى بالمستقبل لو في أي شخص مهتم ابعثيلي رقمه"\n\n3. "ما بعرف إذا رح يشتروا" → "هذا دورنا، نحنا اللي رح نشرح لهم ونأخذ قرارهم — مش محتاجة تضمني"\n\n4. "صاحبتي مو معها فلوس" → "في باقات بالتقسيط، خليني أشرح لهم الخيارات"\n\n5. "خايفة يزعلوا مني لو ما اشتروا" → "بالعكس لو ما اشتروا مش ذنبك، وأنا رح أعاملهم باحترام"\n\n6. "بدي أجرب الخدمة أول" → "صح تمامًا، لأنه لما تشوفي النتائج رح تصيري أقوى موصية"\n\n7. "رح أشوف وأرجعلك" → "خيرًا إن شاء الله، لو تذكرتي أحد في أي وقت أنا موجودة"\n\n8. "إذا الفلوس رجعت إليّ رح أرشح" → "الفلوس ما رح ترجعلك لكن رح تنضاف حصص مجانية على اشتراكك"\n\n9. "أنا ما عندي تأثير على الناس" → "مش لازم يشتروا لأنك أنت قلتيلهم — يكفي إنك تعطيني الرقم وأنا أتولى الباقي"\n\n10. "مو وقتها هلق" → "تمام، ابعثيلي أي رقم حتى لو بعد أسبوع ما في فرق"\n\n11. "ترشيحاتي اشتروا من قبل" → "حتى لو اشتروا قبل، لو عندهم أطفال ثانيين أو يجددوا بيحسب ريفيرال جديد"\n\n12. "خليني أحكي معهم وأرجعلك" → "تمام، وبعد ما تحكي معهم ابعثيلي رقمهم وأنا أكمل معهم"',
        text_zh:'12条常见异议及应对话术：\n\n1. "我有认识的人，但他们不想被联系。" → "没关系，我们绝对不会联系任何人，除非你先跟他们打过招呼。"\n\n2. "我没有可以推荐的人。" → "完全没问题，以后想到了随时把号码发给我。"\n\n3. "我不知道他们会不会报名。" → "这是我们的工作——解释和帮助他们做决定，你不需要做任何保证。"\n\n4. "我朋友没钱。" → "我们有分期付款套餐，让我来给他们介绍选项。"\n\n5. "我怕他们如果没报名会怪我。" → "恰恰相反，没报名也不是你的责任——我会尊重对待他们。"\n\n6. "我想先试试服务再说。" → "完全正确——等你看到进步，你的推荐会更有说服力。"\n\n7. "我去想想再回复你。" → "好的，随时想到了联系我，我一直都在。"\n\n8. "等我拿到返款我就推荐。" → "钱不会直接退给你，但会以免费课时的形式加到你的账户。"\n\n9. "我对别人没什么影响力。" → "不需要他们因为你说了才报名——只要给我号码，剩下的我来处理。"\n\n10. "现在不是时候。" → "没关系，哪怕一周后发给我也完全来得及。"\n\n11. "我之前推荐的人已经报名了。" → "就算报名过了，如果他们有其他孩子或者续费，同样算新推荐。"\n\n12. "让我先跟他们说一声再回复你。" → "好的，跟他们说完之后把号码发给我，我来跟进。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Most objections after a direct ask are not real refusals — they are hesitation patterns. Signs of real resistance (stop pushing):\n• Customer repeats the same objection 3 times despite response\n• Customer says "No, I really don\'t have anyone" with a flat, final tone\n• Customer sounds annoyed or rushes to end the call\n\nSigns of hesitation (keep going — use the table):\n• "I\'ll see" / "Not right now" / "When I have time" — these are delays, not refusals\n• "I\'m afraid" / "I don\'t know" — these are fears, not lack of names',
        text_ar:'معظم الاعتراضات بعد الطلب المباشر ليست رفضاً حقيقياً — هي أنماط تردد. علامات المقاومة الحقيقية (توقف عن الإلحاح):\n• يكرر العميل نفس الاعتراض 3 مرات رغم الرد\n• يقول العميل "لا، ما عندي أحد" بنبرة هادئة نهائية\n• يبدو العميل منزعجاً أو يسرع في إنهاء المكالمة\n\nعلامات التردد (استمر — استخدم الجدول):\n• "رح أشوف" / "مو هلق" / "لما يكون معي وقت" — هذه تأجيلات، لا رفض\n• "خايفة" / "ما بعرف" — هذه مخاوف، لا غياب أسماء',
        text_zh:'直接请求之后的大多数异议并非真正的拒绝——而是犹豫模式。真实阻力的信号（停止施压）：\n• 客户在得到回应后仍将同一异议重复3次\n• 客户用平静、最终的语气说"不，我真的不认识人"\n• 客户听起来不耐烦或急于结束通话\n\n犹豫信号（继续——使用应对表）：\n• "我再看看" / "现在不行" / "等我有时间" ——这些是拖延，不是拒绝\n• "我担心" / "我不确定" ——这些是顾虑，不是真的没有人选' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Ask directly, once: "Do you have anyone you can refer?" — don\'t build up to it for 5 minutes',
          'After handling one objection, always close with an action: "Send me the number"',
          'Never argue with an objection — match it with its specific response from the table',
          'If no names given now, plant the seed: "Whenever you think of someone I\'m here"',
          'Alaa approach: add scarcity after the ask — "Seats fill up quickly"'
        ],
        items_ar:[
          'اطلب مباشرةً مرةً واحدة: "عندك أي شخص تقدري ترشحيه؟" — لا تبنِ له 5 دقائق',
          'بعد معالجة اعتراض واحد، أغلق دائماً بإجراء: "ابعثيلي الرقم"',
          'لا تجادل اعتراضاً أبداً — قابله بالرد المحدد من الجدول',
          'إذا لم تُعطَ أسماء الآن، ازرع البذرة: "أي وقت تفكري بأحد أنا موجودة"',
          'نهج Alaa: أضف الشُح بعد الطلب — "المقاعد بتخلص بسرعة"'
        ],
        items_zh:[
          '直接问一次："你有没有可以推荐给我们的人？"——不要铺垫五分钟',
          '处理一个异议后，必须用行动来收尾："把号码发给我"',
          '不要跟异议争论——用表格中对应的回复来应对',
          '如果当下没有名字，种下种子："随时想到人，发给我就好"',
          'Alaa风格：请求之后加上稀缺感——"名额很快就会满"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Alaa Direct Ask Style (from per-CM profile):\n"Builds authority and credibility first, then asks directly.. says: Seats are limited and I only have 3 VIP seats.. Who is the first person you\'ll think of?.. Links the direct ask to scarcity and limited time."',
          '🛑 Objection handling in practice (from real calls):\nCustomer: "I\'m afraid they\'ll be upset with me"\nCM: "On the contrary, they\'ll thank you for thinking of them — and I won\'t even mention that you recommended them in the first place"\nResult: Customer gave 2 numbers immediately.',
          '🛑 Direct ask after renewal (from renewal section):\n"Since you\'ve renewed with us, it\'s clear you\'re happy with the platform.. do you have a friend or a relative who could benefit?.. Send me her number and I\'ll follow up with her in my own way."'
        ],
        items_ar:[
          '🛑 أسلوب Alaa المباشر في الطلب (من ملف الـ CM):\n"بتبني سلطة ومصداقية أول ثم تطلب مباشرة..تقول: المقاعد محدودة وعندي 3 مقاعد VIP بس..مين أول وحدة رح تفكري فيها؟..تربط الطلب المباشر بالندرة والوقت المحدود."',
          '🛑 التعامل مع الاعتراضات عملياً (من مكالمات حقيقية):\nالعميل: "خايفة يزعلوا مني"\nالـ CM: "بالعكس رح يشكروك لأنك فكرتي فيهم — وأنا ما رح أذكر إنك وصيتيني عليهم أصلًا"\nالنتيجة: أعطت العميلة رقمين فوراً.',
          '🛑 الطلب المباشر بعد التجديد (من قسم التجديد):\n"دام إنك جددتي معنا، يعني رضاكِ عن المنصة واضح..عندك صاحبة أو قريبة ممكن تستفيد؟..ابعثيلي رقمها وأنا أتابع معها بأسلوبي."'
        ],
        items_zh:[
          '🛑 Alaa直接请求风格（顾问档案摘录）：\n先建立权威和信誉，再直接提出请求；说："名额有限，我只有3个VIP席位"；问："你现在脑海里第一个想到的是谁？"；将直接请求与稀缺感和时间紧迫性挂钩。',
          '🛑 实战异议处理（真实通话案例）：\n客户："我怕她们会怪我"\n顾问："恰恰相反，她们会感谢你想着她们——而且我根本不会提是你介绍的"\n结果：客户立即给了两个号码。',
          '🛑 续费后直接请求（来自续费模块）：\n"既然你选择了续费，说明你对平台非常认可……你有没有朋友或亲戚也可以受益？把号码发给我，我用我的方式去跟进。"'
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
        text:'Plant the referral idea without directly asking. The indirect approach works by making the customer think of someone on their own — then stepping in to collect. Methods: (1) Gift framing — "I\'ll give it to them as a gift from you." (2) Casual mention — "By the way, we have a program that rewards parents who refer people." (3) Social proof drop — "Um Reem registered 3 people last week and won an iPad." No direct ask — let the customer fill the silence.',
        text_ar:'ازرع فكرة الريفيرال دون السؤال مباشرةً. يعمل النهج غير المباشر بجعل العميل يُفكّر في شخص ما من تلقاء نفسه — ثم تتدخل للجمع. الطرق: (1) إطار الهدية — "أنا رح أعطيهم إياها كهدية منك." (2) الذكر العابر — "بالمناسبة عندنا برنامج بيكافئ أهالي اللي يرشحوا." (3) إسقاط الإثبات الاجتماعي — "أم ريم سجلت 3 أشخاص الأسبوع اللي فات وكسبت iPad." لا طلب مباشر — دع العميل يملأ الصمت.',
        text_zh:'在不直接提问的情况下种下推荐的想法。间接方式让客户自发地想到某个人，然后顾问适时介入收集信息。三种方法：(1) 礼物框架——"我去联系她们就当是你送给她们的礼物。"；(2) 随口一提——"顺便说一下，我们有一个奖励推荐家长的计划。"；(3) 社会认同植入——"上周有位妈妈推荐了3个人，赢得了一台iPad。"不做直接请求——让客户自己打破沉默。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Indirect approach targets customers who feel uncomfortable with sales pressure. Key psychological dynamics:\n\n• GIFT FRAMING removes social risk — "you\'re doing a favour for your friend, not selling to her." The customer becomes a giver, not a recruiter.\n\n• SOCIAL PROOF triggers FOMO — when the customer hears that others are already benefiting from referrals, she wants the same. Drop specific numbers (iPad, $100 cashback) as passing mentions, not pitches.\n\n• SILENCE CLOSE — after planting the idea, stop talking and let the customer name someone. Most referrals happen when the CM stops pushing and creates space.',
        text_ar:'يستهدف النهج غير المباشر العملاء الذين يشعرون بعدم الارتياح من ضغط البيع. الديناميكيات النفسية الأساسية:\n\n• إطار الهدية يُزيل الخطر الاجتماعي — "أنت تُقدّم معروفاً لصديقتك، لا تبيعين لها." يصبح العميل مانحاً لا مُجنِّداً.\n\n• الإثبات الاجتماعي يُحفّز الخوف من الفوات — عندما يسمع العميل أن الآخرين يستفيدون من الريفيرالات بالفعل، يريد الأمر ذاته. أسقط أرقاماً محددة (iPad، كاشباك 100 دولار) كذكريات عابرة لا عروض ترويجية.\n\n• إغلاق الصمت — بعد زرع الفكرة، توقف عن الكلام ودع العميل يُسمّي شخصاً. معظم الريفيرالات تحدث عندما يتوقف الـ CM عن الدفع ويخلق مساحة.',
        text_zh:'间接方式针对的是那些对销售压力感到不适的客户。核心心理动态：\n\n• 礼物框架消除社交风险——"你是在帮朋友一个忙，而不是向她推销。"客户变成了给予者，而不是招募者。\n\n• 社会认同触发错失恐惧——当客户听说别人已经在从推荐中获益，她会想要同样的机会。用具体的数字（iPad、100美元返现）作为随口一提，而不是正式推销。\n\n• 沉默收尾——植入想法后，停止说话，让客户主动说出人名。大多数推荐都发生在顾问停止施压、创造空间的时候。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer mentions a friend or family member naturally during the conversation',
          'When customer asks "How did my friend subscribe?" — open door to explain referral system naturally',
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
        ],
        items_zh:[
          '客户在对话中自然地提到某位朋友或家人时',
          '客户问"我朋友是怎么报名的？"——自然地打开了介绍推荐体系的窗口',
          '在温暖、轻松流动的通话中——随口带出推荐话题，不要像换了话题一样',
          '分享另一名学员进步的正面故事之后——社会认同的最佳时刻',
          '对于一旦感受到压力就关闭的犹豫型或内敛型客户'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Private, reserved tone — short answers, doesn\'t elaborate much',
          'Has said "I don\'t like to bother people" or "I don\'t like to sell" in any context',
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
        ],
        items_zh:[
          '语气私密内敛——回答简短，不多展开',
          '曾说过"我不喜欢打扰别人"或"我不喜欢推销东西"',
          '通过推荐进来——本身就信任口碑链，但对于向他人开口可能有顾虑',
          '面对直接请求会犹豫，但对故事和案例反应温暖',
          '社交网络广泛（提到朋友、微信群）但不主动给出名字'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'GIFT FRAMING Flow (Lubna):\nBuild rapport ⬅️ Casual mention: "By the way, we have a program that rewards parents who refer people" ⬅️ Tell a story: "One of the mothers referred her friend and got free sessions" ⬅️ Soft opener: "Do you know anyone who could benefit?" ⬅️ Gift close: "I\'ll contact them as a gift from you and I won\'t pressure them at all" ⬅️ Collect number(s)\n\nSOCIAL PROOF Flow:\nMention another parent\'s referral win ⬅️ Pause ⬅️ "Many parents benefit from it" ⬅️ Let customer ask ⬅️ Explain simply ⬅️ "If you ever think of someone, send them to me"',
        text_ar:'تدفق إطار الهدية (لبنى):\nبناء الألفة ⬅️ ذكر عابر: "بالمناسبة في برنامج بيكافئ أهالي اللي يرشحوا" ⬅️ حكي قصة: "أم فلانة رشحت صاحبتها وأخذت حصص مجانية" ⬅️ افتتاح ناعم: "في أحد بتعرفيه ممكن يستفيد؟" ⬅️ إغلاق الهدية: "أنا رح أتواصل معهم وما رح أضغط عليهم — رح يكون منك كهدية" ⬅️ جمع الرقم/الأرقام\n\nتدفق الإثبات الاجتماعي:\nذكر فوز ريفيرال وليّ أمر آخر ⬅️ توقف ⬅️ "كتير أهالي بيستفيدوا منه" ⬅️ دع العميل يسأل ⬅️ اشرح ببساطة ⬅️ "لو خطر على بالك أحد ابعثيلي"',
        text_zh:'礼物框架流程（鲁布娜）：\n建立信任 ⬅️ 随口一提："顺便说一下，我们有一个奖励推荐家长的计划" ⬅️ 分享故事："有位妈妈推荐了她朋友，获得了免费课时" ⬅️ 温和开场："你有认识的人可能也有需要吗？" ⬅️ 礼物收尾："我去联系她们，不会施加任何压力——就当是你送给她们的礼物" ⬅️ 收集号码\n\n社会认同流程：\n提到另一位家长的推荐奖励 ⬅️ 停顿 ⬅️ "很多家长都在从中受益" ⬅️ 让客户主动提问 ⬅️ 简单解释 ⬅️ "随时想到了人就发给我"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Gift opener (Lubna): "I\'ll contact them as a gift from you and I will never pressure them at all"',
          'Social proof drop: "Um Reem last week referred her friend and got [prize]"',
          'Soft question: "Is there anyone in mind who could benefit like you?"',
          'Curiosity trigger: "By the way, we have a program that rewards parents who refer people — have you heard about it?"',
          'No-pressure close: "Whenever you think of anyone at any time, send me their number"'
        ],
        items_ar:[
          'افتتاح الهدية (لبنى): "رح أتواصل معهم كهدية منك وما رح أضغط عليهم أبدًا"',
          'إسقاط الإثبات الاجتماعي: "أم ريم الأسبوع اللي فات رشحت صاحبتها وأخذت [جائزة]"',
          'السؤال الناعم: "في أحد في بالك ممكن يستفيد زيكِ؟"',
          'مُحفّز الفضول: "بالمناسبة عندنا برنامج بيكافئ الأهالي اللي يرشحوا — سمعتي عنه؟"',
          'إغلاق بلا ضغط: "لو خطر على بالك أي أحد في أي وقت ابعثيلي رقمه"'
        ],
        items_zh:[
          '礼物开场（鲁布娜）："我去联系她们就当是你送给她们的礼物，绝对不会施加任何压力"',
          '社会认同植入："上周有位妈妈推荐了朋友，获得了[奖励]"',
          '温和提问："你有没有认识的人可能也会有需要？"',
          '好奇心触发："顺便说一下，我们有一个奖励推荐家长的计划——你听说过吗？"',
          '无压力收尾："随时想到了人，发给我号码就好"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Indirect entry points:\n"Um [name] recommended you to us — she\'s benefiting from the referral program now." [Pause — see if customer asks]\n\n"Many parents benefit from free sessions or cashback when they refer a friend." [Pause]\n\n"If at any time you know someone with children, I\'m here." [Plant and move on]\n\nWhen customer says "I have a friend...":\n→ Immediately: "Excellent — give me her number and I\'ll follow up with her and I won\'t mention that you recommended her."',
        text_ar:'نقاط دخول غير مباشرة:\n"أم [الاسم] وصتني عليكم — هي بتستفيد من برنامج الترشيحات الآن." [توقف — شاهد إذا كان العميل يسأل]\n\n"كتير أهالي بيستفيدوا بحصص مجانية أو كاش باك لما يرشحوا صاحبة." [توقف]\n\n"لو في أي وقت في أحد بتعرفيه وعنده أطفال، أنا موجودة." [ازرع وانتقل]\n\nعندما يقول العميل "في عندي صاحبة...":\n→ فوراً: "ممتاز — عطيني رقمها وأنا أتابع معها وما رح أذكر إنك وصيتيني عليها."',
        text_zh:'间接切入点：\n"[名字]妈妈把你介绍给我们——她现在正在使用推荐计划获得奖励。" [停顿——看看客户是否主动问]\n\n"很多家长通过推荐朋友，获得了免费课时或返现。" [停顿]\n\n"随时想到认识的有孩子的朋友，我都在。" [种下后继续]\n\n当客户说"我有个朋友……"：\n→ 立即接："太好了——把她的号码给我，我来跟进，不会提是你介绍的。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Indirect approach rarely gets hard objections — but watch for these signals:\n\n"I don\'t like to interfere in other people\'s affairs." → Validate: "Absolutely, you don\'t need to interfere — just mention a number to me and I\'ll follow up in my own way."\n\n"I\'ll give them the number myself." → "Excellent — and as for you, the cashback or free sessions get added automatically when they register."\n\nIf customer deflects and changes subject → Don\'t repeat. Say "No problem" and move on. Plant only once.',
        text_ar:'نادراً ما يواجه النهج غير المباشر اعتراضات صعبة — لكن راقب هذه الإشارات:\n\n"ما بحب أتدخل في أمور الناس" → صادق: "تمامًا، ما محتاجة تتدخلي — بس لو ذكرتيلي رقم أنا اللي أتابع بطريقتي"\n\n"أعطيهم الرقم بنفسي" → "ممتاز، وبالنسبة لك كاشباك أو حصص مجانية بتنضاف تلقائيًا لما يسجلوا"\n\nإذا أشاح العميل وغيّر الموضوع → لا تكرر. قل "تمام" وانتقل. ازرع مرةً واحدة فقط.',
        text_zh:'间接方式很少会遇到强硬异议——但要注意以下信号：\n\n"我不喜欢干涉别人的事。" → 认可："完全理解，你不需要干涉——只要把号码给我，我来用我的方式跟进。"\n\n"我自己去给她们号码。" → "太好了——你报名后，只要她们一注册，返现或免费课时会自动加到你的账户。"\n\n如果客户回避并转换话题 → 不要重复。说"好的"然后继续。只种一次种子。' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Drop the referral mention naturally — never make it feel like you shifted gears',
          'Always use social proof with a specific name or reward amount — vague stories don\'t convert',
          'After planting the seed, go silent — let the customer respond. Don\'t fill the silence.',
          'Lubna style: always end with "I will never pressure them at all" — this is the highest-converting phrase for indirect',
          'Follow up on WhatsApp with a soft reminder, not a push: "Whenever you think of someone I\'m here 🌸"'
        ],
        items_ar:[
          'أسقط ذكر الريفيرال بشكل طبيعي — لا تجعله يبدو كتحوّل مفاجئ في المحادثة',
          'استخدم دائماً إثباتاً اجتماعياً باسم محدد أو مبلغ مكافأة — القصص المبهمة لا تُحوَّل',
          'بعد زرع البذرة، اصمت — دع العميل يرد. لا تملأ الصمت.',
          'أسلوب لبنى: أنهِ دائماً بـ "ما رح أضغط عليهم أبدًا" — هذه أعلى عبارة تحويل للنهج غير المباشر',
          'تابع على واتساب بتذكير ناعم لا ضغط: "لو خطر على بالك أحد أنا هون 🌸"'
        ],
        items_zh:[
          '自然地带出推荐话题——不要让对话感觉像切换了模式',
          '社会认同要用具体名字或奖励金额——模糊的故事没有转化力',
          '种下想法后沉默——让客户自己开口。不要填满沉默。',
          '鲁布娜风格：始终以"我绝对不会给她们施加任何压力"收尾——这是间接推荐中转化率最高的一句话',
          '微信跟进用温柔提醒，不是催促："随时想到了人，我在这里 🌸"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Lubna Profile (from per-CM section):\n"Referral request in a gift style: I\'ll give it to them as a gift.. starts with a question about interested people rather than a direct ask.. tailored for emotionally open and socially active mothers.. says: I will contact them and I will never put any pressure on them at all.. tailored for socially active customers."',
          '🛑 Indirect → Direct Pivot (advanced technique):\nStart indirect: "By the way, we have a referral program..."\nIf customer engages: "Who are you thinking of?"\nIf customer volunteers a name: immediately go direct: "Excellent — give me her number right now and I\'ll follow up with her."\nThe indirect approach opens the door; the CM closes it with a direct action.',
          '🛑 Why indirect works for B-customer first calls:\n"Before payment, the customer doesn\'t know us yet. Dropping a soft referral mention during the booking conversation (without pressure) makes her think of someone by the time she\'s paid — so the first-call referral ask lands on already-warm ground."'
        ],
        items_ar:[
          '🛑 ملف لبنى (من قسم الـ CM):\n"طلب الريفيرال بأسلوب هدية: رح أعطيهم إياها كهدية..تبدأ بسؤال عن أشخاص مهتمين مش بطلب مباشر..مخصصة للأمهات العاطفيات والناشطات اجتماعيًا..تقول: أنا راح أتواصل معهم وما راح أضغط عليهم أبدًا..مخصصة للناشطات اجتماعيًا."',
          '🛑 التحوّل من غير المباشر إلى المباشر (تقنية متقدمة):\nابدأ غير مباشر: "بالمناسبة عندنا برنامج ترشيحات..."\nإذا تفاعل العميل: "ممن تفكرين؟"\nإذا تطوع العميل باسم: انتقل مباشرةً فوراً: "ممتاز — أعطيني رقمها هلق وأنا أتابع معها."\nالنهج غير المباشر يفتح الباب؛ الـ CM يُغلقه بإجراء مباشر.',
          '🛑 لماذا يُجدي غير المباشر في مكالمات العميل الأول (B-customer):\n"قبل الدفع، العميل لم يعرفنا بعد. إسقاط ذكر ريفيرال ناعم خلال محادثة الحجز (دون ضغط) يجعلها تُفكّر في شخص ما بحلول وقت الدفع — فيصل طلب الريفيرال في المكالمة الأولى على أرضية دافئة بالفعل."'
        ],
        items_zh:[
          '🛑 鲁布娜档案（顾问档案摘录）：\n以礼物方式发起推荐——"我去联系她们就当是送她们礼物"；先询问感兴趣的人，而非直接要求；专为情感型、社交活跃的妈妈设计；说："我会去联系她们，绝对不会给她们施加任何压力。"',
          '🛑 间接转直接（进阶技巧）：\n先间接开场："顺便说一下，我们有推荐计划……"\n如果客户有反应："你在想谁？"\n如果客户主动给出名字：立即转为直接："太好了——把她的号码给我，我现在就跟进。"\n间接方式打开门；顾问用直接行动关门。',
          '🛑 为什么间接方式对第一次通话的新客户有效：\n"在付款之前，客户还不了解我们。在预约对话中轻轻提一下推荐计划（不施加压力），能让她在付款时就已经想到了某个人——这样在第一次正式通话中提出推荐请求时，就已经落在了一片温热的土地上。"'
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
        text:'Help the customer pre-filter their network before giving out any numbers. The CM\'s goal is NOT to collect as many referrals as possible — it\'s to collect QUALITY referrals. The "customer handles referrals" strategy: the customer talks to their contact first, confirms interest, then passes the number. This protects: (1) the customer\'s social relationships, (2) the CM\'s time, and (3) the referral conversion rate. One warm qualified lead beats 10 cold numbers.',
        text_ar:'ساعد العميل على التصفية المسبقة لشبكته قبل إعطاء أي أرقام. هدف الـ CM ليس جمع أكبر عدد من الريفيرالات — بل جمع ريفيرالات عالية الجودة. استراتيجية "أ يتعامل مع الريفيرالات": يتحدث العميل مع جهة اتصاله أولاً، يُؤكد الاهتمام، ثم يمرر الرقم. هذا يحمي: (1) علاقات العميل الاجتماعية، (2) وقت الـ CM، (3) معدل تحويل الريفيرال. ليد واحد دافئ مؤهل يتفوق على 10 أرقام باردة.',
        text_zh:'在提交任何号码之前，协助客户对其社交网络进行预筛选。顾问的目标不是尽可能多地收集推荐——而是收集高质量的推荐。"客户先行"策略：客户先与联系人沟通，确认对方有兴趣，再将号码转交给顾问。这保护了：(1) 客户的社交关系，(2) 顾问的时间，(3) 推荐转化率。一个经过预热的优质线索，胜过10个陌生号码。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Customers hesitate to give referrals because they fear: (a) their friend will be annoyed, (b) their friend won\'t buy and they\'ll feel embarrassed, (c) they\'ll seem like they\'re "selling" to their network.\n\nThe filtering framework resolves all three fears:\n• (a) "We won\'t contact anyone until after you\'ve spoken with them first" — removes cold-call fear\n• (b) "You don\'t need to guarantee anything" — removes conversion pressure\n• (c) "You\'re not selling — you\'re advising" — reframes from selling to advising\n\nThis pre-filtering conversation actually INCREASES referral rates because it removes the main blockers.',
        text_ar:'يتردد العملاء في إعطاء الريفيرالات خوفاً من: (أ) أن يتضايق صديقهم، (ب) أن لا يشتري صديقهم ويشعروا بالإحراج، (ج) أن يبدوا وكأنهم "يبيعون" لشبكتهم.\n\nإطار التصفية يحل المخاوف الثلاثة:\n• (أ) "نحنا ما رح نتصل إلا بعد ما تحكي معهم أنت" — يُزيل خوف المكالمة الباردة\n• (ب) "مش محتاجة تضمني" — يُزيل ضغط التحويل\n• (ج) "أنت مش بتبيعي — بتنصحي" — يُعيد الإطار من البيع إلى الإرشاد\n\nمحادثة التصفية المسبقة هذه تزيد فعلياً من معدلات الريفيرال لأنها تُزيل أبرز العوائق.',
        text_zh:'客户迟疑给出推荐号码，通常源于三种顾虑：(甲) 朋友会被打扰；(乙) 朋友不报名会让自己难堪；(丙) 显得在"向朋友推销"。\n\n预筛选框架一次性解决这三个顾虑：\n• (甲) "我们不会联系任何人，除非你先跟他们打过招呼" ——消除陌生电话的顾虑\n• (乙) "你不需要做任何保证" ——消除转化压力\n• (丙) "你不是在推销——你是在给出建议" ——将行为重新定位为分享而非销售\n\n这个预筛选对话实际上会提升推荐率，因为它消除了最主要的障碍。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer says "I have people but I\'m afraid of bothering them" — directly pivot to the filtering framework',
          'When customer gives a number but seems hesitant — ask: "Have you spoken with her before?"',
          'After explaining the referral program — before customer commits, help her think through her network',
          'During network exploration: "Who in your circle has children of the right age?"'
        ],
        items_ar:[
          'عندما يقول العميل "عندي ناس بس خايفة أزعجهم" — انتقل مباشرةً إلى إطار التصفية',
          'عندما يعطي العميل رقماً لكنه يبدو مترددًا — اسأل: "هل حكيتي معها قبل؟"',
          'بعد شرح برنامج الريفيرال — قبل أن يلتزم العميل، ساعده على التفكير في شبكته',
          'خلال استكشاف الشبكة: "مين من اللي تعرفيهم عندهم أطفال بعمر مناسب؟"'
        ],
        items_zh:[
          '当客户说"我有认识的人，但担心打扰他们"——立即切换到预筛选框架',
          '当客户给了号码但显得犹豫——问："你有没有提前跟她沟通过？"',
          '解释完推荐计划之后——在客户做出承诺之前，帮她梳理一下自己的社交圈',
          '进行网络探索时："你认识的人里，有哪些家里有适龄孩子的？"'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          '"I have people but they don\'t want anyone to call them" — this IS a lead, just needs filtering framework first',
          '"I don\'t know if they\'ll buy" — customer has someone in mind but needs reassurance about conversion',
          '"I\'m afraid they\'ll be upset with me" — strong social anxiety, needs "you talk first" protocol',
          'Customer mentions specific names or contexts (school group, family, neighbours) — active network'
        ],
        items_ar:[
          '"عندي ناس بس ما بدهم يتصل فيهم أحد" — هذا ليد فعلاً، يحتاج فقط إطار التصفية أولاً',
          '"ما بعرف إذا رح يشتروا" — العميل لديه شخص في باله لكن يحتاج طمأنة بشأن التحويل',
          '"خايفة يزعلوا مني" — قلق اجتماعي قوي، يحتاج بروتوكول "أنتِ تتحدثين أولاً"',
          'يذكر العميل أسماء محددة أو سياقات (مجموعة المدرسة، العائلة، الجيران) — شبكة نشطة'
        ],
        items_zh:[
          '"我有认识的人，但他们不想被联系"——这本身就是一个线索，只需先走预筛选流程',
          '"我不知道他们会不会报名"——客户心里有人选，只是需要对转化结果的安心保证',
          '"我怕她们会怪我"——社交顾虑较强，需要启用"你先沟通"协议',
          '客户提到具体姓名或情境（学校家长群、家人、邻居）——社交网络活跃'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'PRE-FILTERING Protocol:\n1. Customer says "I have people"\n2. CM: "Excellent — we won\'t contact anyone until after you\'ve spoken with them first"\n3. Network exploration: "Who in your circle has children?"\n4. Customer names someone\n5. Qualification check: "Is she interested in online learning in general?"\n6. If yes → "Excellent, speak with her first and tell her you\'ve benefited — then give me her number"\n7. If unsure → "No problem, once you\'re sure, send her to me"\n\nQUALITY CONTROL Logic:\n→ Customer pre-screens → Confirms interest → Gives number → CM calls confirmed lead',
        text_ar:'بروتوكول التصفية المسبقة:\n1. يقول العميل "عندي ناس"\n2. الـ CM: "ممتاز — نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول"\n3. استكشاف الشبكة: "مين من اللي تعرفيهم عندهم أطفال؟"\n4. يُسمّي العميل شخصاً\n5. فحص التأهيل: "وهي مهتمة بالتعليم الإلكتروني عمومًا؟"\n6. إذا نعم → "ممتاز، حكي معها أول وخبريها إنك استفدتِ — وبعدين أعطيني رقمها"\n7. إذا غير متأكدة → "تمام، لما تتأكدي ابعثيلي"\n\nمنطق مراقبة الجودة:\n→ العميل يُصفّي مسبقاً → يُؤكد الاهتمام → يعطي الرقم → الـ CM يتصل بالليد المؤكد',
        text_zh:'预筛选协议：\n1. 客户说"我有认识的人"\n2. 顾问："太好了——我们不会联系任何人，除非你先跟他们打过招呼"\n3. 探索社交圈："你认识的人里，有哪些家里有孩子的？"\n4. 客户说出一个人名\n5. 资质确认："她对在线教育感兴趣吗？"\n6. 如果是→"太好了，你先跟她说一声，告诉她你从中受益了——然后把号码给我"\n7. 如果不确定→"好的，等你确认了再发给我"\n\n质量控制逻辑：\n→ 客户预筛选 → 确认兴趣 → 给出号码 → 顾问联系已确认的线索' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          '"We won\'t contact anyone until after you\'ve spoken with them first" — most important phrase in filtering',
          '"You don\'t need to guarantee anything — I\'m the one who will explain and get their decision"',
          '"You\'re not selling to them — you\'re advising them, just as someone advised you"',
          'Network exploration: "Who in your circle has children between 6 and 15 years old?"',
          'Quality filter: "Is she interested in child development in general? Or has she tried any educational platform before?"'
        ],
        items_ar:[
          '"نحنا ما رح نتصل في أي حدا إلا بعد ما تحكي معهم أنتِ أول" — أهم عبارة في التصفية',
          '"مش محتاجة تضمني — أنا اللي رح أشرح وآخذ قرارهم"',
          '"أنتِ مش بتبيعي لهم — بتنصحيهم زي ما نصحك أحد"',
          'استكشاف الشبكة: "مين من اللي تعرفيهم عندهم أطفال بين 6 و15 سنة؟"',
          'فلتر الجودة: "وهي مهتمة بتطوير الأطفال عمومًا؟ أو جربت أي منصة تعليمية قبل؟"'
        ],
        items_zh:[
          '"我们不会联系任何人，除非你先跟他们打过招呼"——筛选流程中最重要的一句话',
          '"你不需要做任何保证——我来解释，我来帮助她们做决定"',
          '"你不是在推销——你是在给出建议，就像当初有人给你介绍一样"',
          '网络探索："你认识的人里，有哪些孩子在6到15岁之间的家长？"',
          '质量筛选："她平时关注孩子的教育吗？有没有用过其他在线学习平台？"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Lead quality categories (from best to worst):\n\n★★★ TOP — Customer has spoken to the person, person is interested and expecting a call\n★★☆ GOOD — Customer knows person has children in the right age range and is open to education tech\n★☆☆ WEAK — Customer is giving numbers without any prior conversation\n✗ SKIP — Customer is giving numbers of people who don\'t have children or have shown disinterest before\n\nFiltering questions to ask the customer:\n"Have you spoken with her before about the platform?"\n"How old are her children?"\n"Is she interested in online learning in general?"\n"Has she tried any similar platform before?"',
        text_ar:'فئات جودة الليد (من الأفضل إلى الأسوأ):\n\n★★★ ممتاز — العميل تحدث مع الشخص، الشخص مهتم ومنتظر المكالمة\n★★☆ جيد — العميل يعرف أن الشخص لديه أطفال في النطاق العمري المناسب ومنفتح على التعليم الإلكتروني\n★☆☆ ضعيف — العميل يعطي أرقاماً دون أي محادثة مسبقة\n✗ تجاهل — العميل يعطي أرقام أشخاص ليس لديهم أطفال أو أبدوا عدم اهتمام سابقاً\n\nأسئلة التصفية لسؤال العميل:\n"هل حكيتي معها قبل عن المنصة؟"\n"عندها أطفال بعمر كم؟"\n"هي مهتمة بالتعليم الإلكتروني عمومًا؟"\n"هل سبق جربت أي منصة مشابهة؟"',
        text_zh:'线索质量分类（从最佳到最差）：\n\n★★★ 优质——客户已与对方沟通，对方有意愿并等待来电\n★★☆ 良好——客户知道对方有适龄孩子，且对在线教育持开放态度\n★☆☆ 较弱——客户给出号码但没有任何前期沟通\n✗ 跳过——客户给出的是没有孩子或之前已明确表示不感兴趣的人的号码\n\n向客户询问的筛选问题：\n"你有没有提前跟她聊过这个平台？"\n"她的孩子多大？"\n"她平时对在线教育感兴趣吗？"\n"她之前有没有用过类似的平台？"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Signs of low-quality leads to gently redirect:\n• Customer gives numbers of adults without children\n• Customer gives numbers of people who "might be interested" with zero context\n• Customer is clearly listing contacts from their phone without any personal connection\n\nHow to redirect without discouraging:\n"Thank you so much — but before I reach out, one quick question: do they have children?"\n"Have you spoken with any of them before? I only want to contact people you know personally — to avoid any intrusion."',
        text_ar:'علامات الليدز منخفضة الجودة التي تحتاج إعادة توجيه لطيفة:\n• العميل يعطي أرقام بالغين ليس لديهم أطفال\n• العميل يعطي أرقام أشخاص "قد يكونون مهتمين" دون أي سياق\n• العميل يُدرج جهات اتصال من هاتفه بوضوح دون أي علاقة شخصية\n\nكيفية إعادة التوجيه دون تثبيط:\n"شكرًا كتير — بس قبل ما أتواصل معهم، سؤال بسيط: عندهم أطفال؟"\n"هل حكيتي مع أي وحدة منهم قبل؟ بدي أتواصل بس مع اللي تعرفيهم شخصيًا تجنبًا للإزعاج."',
        text_zh:'低质量线索信号——联系前需温和重新引导：\n• 客户提供的是没有孩子的成年人号码\n• 客户提供的是"可能感兴趣"但毫无背景信息的号码\n• 明显是直接从手机通讯录随机给出的联系人，没有真实关系\n\n如何温和重新引导而不让客户气馁：\n"非常感谢——不过联系之前，简单问一下：她有孩子吗？"\n"你之前有跟她们提过吗？我只想联系你真正认识的人，避免打扰到她们。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always confirm: "Have you spoken with her before?" before accepting any number',
          'Encourage pre-talk: "Talk to her first and let her know you benefited — then give me her number"',
          'Frame quality as respect: "We want to respect their time and not bother them if they\'re not interested"',
          'Accept weak leads gracefully: "Thank you — we\'ll reach out to them in a respectful way"',
          'Follow up: "Once you\'ve spoken with your friend, send me her number and I\'ll follow up"'
        ],
        items_ar:[
          'دائماً تأكد: "هل حكيتي معها قبل؟" قبل قبول أي رقم',
          'شجّع على الحديث المسبق: "حكي معها أول وخبريها إنك استفدتِ — وبعدين أعطيني رقمها"',
          'قدّم الجودة على أنها احترام: "بدنا نحترم وقتهم وما نزعجهم بدون ما يكونوا مهتمين"',
          'اقبل الليدز الضعيفة بلطف: "شكرًا — رح نتواصل معهم بأسلوب محترم"',
          'تابع: "لما تحكي مع صاحبتك أرسليلي رقمها وأنا أتابع"'
        ],
        items_zh:[
          '接受任何号码之前，始终确认："你有没有提前跟她沟通过？"',
          '鼓励提前沟通："你先去跟她说一声，告诉她你从中受益了——然后把号码给我"',
          '将质量定位为尊重："我们希望尊重她们的时间，不在她们没有兴趣的情况下打扰她们"',
          '优雅地接受较弱线索："谢谢——我们会以专业、尊重的方式与她们沟通"',
          '跟进："等你跟她聊完，把号码发给我，我来跟进"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 "Customer-first referral" strategy (from source content):\nStrategy: the customer speaks with the potential referral first before giving the number to the CM. Philosophy: one good referral beats 10 bad ones. Quality control system: CM only contacts after pre-qualification.',
          '🛑 Why pre-filtering improves conversion:\nA filtered lead who heard about the platform from someone they trust converts at 3-4x the rate of a cold number. The extra step of asking the customer to talk first costs 1 day but saves 10 dead calls.',
          '🛑 Alaa\'s filtering method (from per-CM profile):\nShe asks the customer to talk to her friend first before giving the number. She says: "I won\'t contact anyone until you\'ve spoken with them yourself." This protects the customer\'s social relationships and guarantees referral quality.'
        ],
        items_ar:[
          '🛑 استراتيجية "أ يتعامل مع الريفيرالات" (من المحتوى المصدري):\n"الاستراتيجية: العميل يتكلم مع المرجح أولاً قبل أن يعطي الرقم للـ CM..الفلسفة: الريفيرال الجيد أفضل من 10 ريفيرالات رديئة..نظام مراقبة الجودة: الـ CM يتصل فقط بعد التأهيل المسبق."',
          '🛑 لماذا تُحسّن التصفية المسبقة معدل التحويل:\nليد مصفّى سمع عن المنصة من شخص يثق به يتحول بمعدل 3-4 أضعاف مقارنة بالرقم البارد. الخطوة الإضافية لطلب الحديث المسبق تكلف يوماً واحداً لكنها توفر 10 مكالمات فاشلة.',
          '🛑 طريقة Alaa في التصفية (من ملف الـ CM):\n"بتطلب من العميل يحكي مع صاحبته أول قبل ما تعطيها الرقم..بتقول: ما رح أتصل بأي أحد إلا لما تحكي معهم أنتِ..هاد بيحمي علاقتها الاجتماعية ويضمن جودة الريفيرال."'
        ],
        items_zh:[
          '🛑 "客户先行"推荐策略（来源内容摘录）：\n策略：客户先与潜在推荐对象沟通，确认兴趣后再将号码交给顾问。理念：一个高质量推荐胜过10个低质量推荐。质量控制：顾问只在预筛选后才进行联系。',
          '🛑 为什么预筛选能提升转化率：\n经过预热、听说过平台的线索，其转化率是陌生号码的3-4倍。多要求客户提前沟通这一步虽然多花一天时间，但能避免10个无效电话。',
          '🛑 Alaa的筛选方式（顾问档案摘录）：\n"要求客户在给号码之前先跟朋友沟通；说：我不会联系任何人，除非你先跟他们打过招呼；这样既保护了客户的社交关系，也确保了推荐质量。"'
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
        text_ar:'أعطِ العميل الكلمات الحرفية ليقولها عند التحدث مع صديقه المُحال. أكبر مخاوف العميل هو عدم معرفة ما يقول أو أن يبدو عرضاً بالخطأ. حلّ هذا بتقديم سكريبت صغير جاهز: بسيط، طبيعي، ومُقدَّم بوصفه مشاركة تجربة شخصية لا بيعاً. يعرض الـ CM أيضاً تولّي كل شيء بعد الإشارة الأولى — إزالة كل ضغط عن العميل.',
        text_zh:'给客户提供在与推荐对象交谈时可以直接使用的话术。客户最大的顾虑是不知道该说什么，或者一不小心显得像在推销。解决方法是提供一个现成的小脚本：简单、自然，以分享个人经历的方式呈现，而非销售。顾问同时表示愿意在客户提了一句之后全权接手——彻底消除客户的压力。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Customers who have names in mind but won\'t share them are usually blocked by one thing: they don\'t know WHAT to say to their friend. They imagine an awkward sales pitch they\'d have to deliver. The solution is to reframe the customer\'s role entirely:\n\n• "You don\'t have to sell anything — just say: I tried the platform and my children benefited a lot. Go ahead and I\'ll handle the rest with them."\n\nOnce the customer has a script, the hesitation disappears. The CM becomes the closer; the customer is just the warm introduction.',
        text_ar:'العملاء الذين لديهم أسماء في أذهانهم لكنهم لا يشاركونها محجوبون عادةً بشيء واحد: لا يعرفون ما يقولونه لصديقهم. يتخيلون عرض بيع محرجاً عليهم تقديمه. الحل هو إعادة إطار دور العميل بالكامل:\n\n• "أنتِ مش لازم تبيعي — بس قولي: جربت المنصة وأطفالي استفادوا. يلّا أنا مررت الباقي عليهم."\n\nبمجرد أن يكون لدى العميل سكريبت، يختفي التردد. يصبح الـ CM هو المُغلِق؛ والعميل مجرد المقدّمة الدافئة.',
        text_zh:'心里有人选却不愿意开口的客户，通常只有一个障碍：他们不知道该跟朋友说什么。他们脑海中想象的是一段尴尬的推销词，而这正是他们在逃避的。解决办法是彻底重新定义客户的角色：\n\n• "你不需要推销——只要说：我试过这个平台，孩子受益很大。然后把剩下的交给我。"\n\n一旦客户有了话术，犹豫就消失了。顾问负责完成交易；客户只是那个温暖的引荐人。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'After the customer says "But I don\'t know what to say to her" — this is the exact moment to provide the script',
          'When customer has confirmed names but won\'t give numbers yet',
          'When customer says "Let me talk to her and get back to you" — help her with what to say now',
          'During WhatsApp follow-up: send a ready message she can forward to her friend'
        ],
        items_ar:[
          'عندما يقول العميل "بس ما بعرف شو أقولها" — هذه اللحظة بالذات لتقديم السكريبت',
          'عندما يؤكد العميل أسماءً لكنه لا يعطي أرقاماً بعد',
          'عندما يقول العميل "خليني أحكي معها وأرجعلك" — ساعده بما يقوله الآن',
          'خلال متابعة واتساب: أرسل رسالة جاهزة يمكنه إعادة توجيهها لصديقه'
        ],
        items_zh:[
          '当客户说"但我不知道该说什么"——这正是提供话术脚本的最佳时机',
          '客户已确认了名字但还不肯给号码',
          '当客户说"让我先去跟她说一声再回复你"——现在就帮她准备好要说的话',
          '微信跟进时：发一条她可以直接转发给朋友的现成消息'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          '"But I don\'t know what to say to her" — blocked by script, not willingness',
          '"I\'m afraid I\'ll seem like I\'m selling" — social image concern, needs the "sharing experience" reframe',
          'Has specific names but hesitates to give numbers until she talks to them first',
          'Responds well to "You don\'t have to sell anything" — confirms this was the main blocker'
        ],
        items_ar:[
          '"بس ما بعرف شو أقولها" — محجوب بالسكريبت، لا بالاستعداد',
          '"خايفة أبدو إني بتبيع" — قلق الصورة الاجتماعية، يحتاج إعادة إطار "مشاركة التجربة"',
          'لديه أسماء محددة لكن يتردد في إعطاء الأرقام حتى يتحدث إليهم أولاً',
          'يستجيب جيداً لـ "أنتِ مش لازم تبيعي" — يُؤكد أن هذا كان العائق الرئيسي'
        ],
        items_zh:[
          '"但我不知道该说什么"——被话术卡住了，而不是缺乏意愿',
          '"我怕显得像在推销"——社交形象顾虑，需要"分享个人经历"的重新定位',
          '心里有名字，但在跟对方沟通之前不肯给号码',
          '听到"你不需要推销"时反应积极——证实这就是主要障碍'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'SCRIPT PROVISION Flow:\n1. Customer: "Let me talk to her and get back to you"\n2. CM: "Perfect — and so you feel comfortable, I\'ll give you one simple sentence to say to her"\n3. Provide script: "Tell her: I tried a great learning system for my children and they benefited a lot — I have someone from the team who wants to explain it to you."\n4. Reassure: "Just that, and I\'ll follow up the rest with her"\n5. Or offer WhatsApp forward: "Or I\'ll send you a ready-made message on WhatsApp and you can forward it to her yourself"\n6. Collect number OR schedule follow-up',
        text_ar:'تدفق تقديم السكريبت:\n1. العميل: "خليني أحكي معها وأرجعلك"\n2. الـ CM: "تمام — وعشان تكوني مرتاحة، رح أعطيك جملة بسيطة تقوليها لها"\n3. تقديم السكريبت: "قوليلها: جربت نظام تعليمي حلو لأطفالي واستفادوا كتير — عندي شخص من الفريق بدو يشرح عليكِ."\n4. طمأنة: "بس هيك، وأنا أتابع الباقي معها"\n5. أو عرض إعادة التوجيه عبر واتساب: "أو أبعثلك رسالة جاهزة على الواتساب ترسليها لها عينكِ"\n6. جمع الرقم أو جدولة المتابعة',
        text_zh:'提供话术流程：\n1. 客户："让我先去跟她说再回复你"\n2. 顾问："好的——为了让你更轻松，我给你一句简单的话，你就说这句就好"\n3. 提供话术："就告诉她：我试了一个很好的学习系统，孩子受益很多——我们团队有人想给你介绍一下。"\n4. 安心保证："就这样，剩下的我来跟进"\n5. 或提供微信转发选项："或者我发一条现成的消息给你，你直接转发给她就好"\n6. 收集号码或安排跟进' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          '"You don\'t have to sell anything — just say you benefited and I\'ll follow up the rest"',
          'Ready script for customer: "Tell her: I have someone who wants to explain a learning system we\'ve benefited from a lot"',
          '"Or I\'ll send you a ready-made message on WhatsApp and you can forward it to her"',
          '"It just needs to come from you — because she trusts you more than she trusts us"',
          'After she talks: "Once you\'ve spoken with her, send me the number and I\'ll take it from there"'
        ],
        items_ar:[
          '"أنتِ مش لازم تبيعي — بس قولي إنك استفدتِ وأنا أتابع الباقي"',
          'سكريبت جاهز للعميل: "قوليلها: عندي حدا بدو يشرح عليكِ نظام تعليمي استفدنا منه كتير"',
          '"أو أبعثلك رسالة جاهزة على الواتساب ترسليها لها"',
          '"لازم بس يكون منك — لأنها بتثق فيكِ أكتر منها بتثق فينا"',
          'بعد أن تتحدث: "لما تحكي معها ابعثيلي الرقم وأنا أكمل من هون"'
        ],
        items_zh:[
          '"你不需要推销——只要说你从中受益了，剩下的我来跟进"',
          '给客户的现成话术："就告诉她：我有个团队的人想给你介绍一个我们受益很大的学习系统"',
          '"或者我发一条现成的微信消息给你，你直接转发给她"',
          '"一定要由你来说——因为她信任你超过信任我们"',
          '她去沟通之后："等你跟她说完，把号码发给我，我来接着跟进"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Ready scripts to give the customer:\n\nSCRIPT 1 (casual):\n"Tell your friend: I tried an educational platform and my children benefited a lot — there\'s someone from the team who wants to explain it to you with no commitment at all."\n\nSCRIPT 2 (with reward mention):\n"Tell her: I have a registration link and you get a free trial session — if you don\'t like it, no problem."\n\nSCRIPT 3 (WhatsApp forward message — CM sends to customer to forward):\n"Hey [Name] 🌸 I wanted to share something I\'ve benefited from — an educational platform for our children. They have a free trial if you\'d like to know more. Teacher\'s number: [CM number]"\n\nSCRIPT 4 (for hesitant friend introduction):\n"Say: my friend is going to call you from an educational company — just agree to hear her out."',
        text_ar:'سكريبتات جاهزة لإعطاء العميل:\n\nالسكريبت 1 (عابر):\n"قولي لصاحبتك: جربت منصة تعليمية وأطفالي استفادوا كتير — في شخص من الفريق بدو يشرح عليكِ بدون أي التزام."\n\nالسكريبت 2 (مع ذكر المكافأة):\n"قولي لها: عندي رابط تسجيل وبتاخذي جلسة تجريبية مجانية — لو ما عجبكِ ما في شيء."\n\nالسكريبت 3 (رسالة واتساب لإعادة التوجيه — الـ CM يرسلها للعميل ليعيد توجيهها):\n"هاي [الاسم] 🌸 كنت بدي أشاركك شيء استفدت منه — منصة تعليمية لأطفالنا. عندهم تجربة مجانية لو بدك تعرفي أكتر. رقم الأستاذة: [رقم الـ CM]"\n\nالسكريبت 4 (لتقديم الصديق المتردد):\n"قولي: صاحبتي رح تتصل فيكِ من شركة تعليمية — قبلتِ تسمعيها بس."',
        text_zh:'给客户提供的现成话术：\n\n话术1（轻松随口）：\n"就告诉你的朋友：我试了一个学习平台，孩子受益很大——有个团队的人想给你介绍一下，不需要任何承诺。"\n\n话术2（带上奖励）：\n"告诉她：我有一个注册链接，你可以免费试一次——不喜欢的话完全没关系。"\n\n话术3（微信转发消息——顾问发给客户让她转发）：\n"[名字] 🌸 我想和你分享一个我们在用的学习平台，孩子进步很大。他们有免费试课，如果你想了解更多，可以联系老师：[顾问号码]"\n\n话术4（引荐犹豫型朋友）：\n"就说：我的朋友会代表一个教育平台联系你——就先听听看。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"She wants to see the prices first." → "No problem — send me her number and I\'ll explain the prices and options to her."\n\n"She doesn\'t want to commit to anything." → "There\'s no commitment at all — just to listen. And I\'ll explain everything calmly."\n\n"She doesn\'t want anyone to call her." → "That\'s fine — if you prefer, send her a message on WhatsApp instead of a call."',
        text_ar:'"بدها تشوف الأسعار أول" → "عادي، ابعثيلي رقمها وأنا رح أشرح لها الأسعار والخيارات."\n\n"ما بدها تلزم حالها" → "ما في أي التزام — بس تسمع. وأنا رح أشرح بكل هدوء."\n\n"ما بدها يتصلوا فيها" → "تمام — إذا بدك ارسليلها على الواتساب بدل ما أتصل."',
        text_zh:'异议："她想先看价格。" → "没关系，把号码给我，我来给她介绍价格和套餐选项。"\n\n异议："她不想做任何承诺。" → "完全没有任何承诺——就是先听听看。我会平静地给她解释。"\n\n异议："她不想被电话联系。" → "好的——如果你愿意的话，我可以发微信给她，不打电话。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always offer a ready script — don\'t assume the customer knows what to say',
          'Offer the WhatsApp forward alternative — some customers prefer text over verbal intro',
          'Emphasize: "You don\'t have to sell anything" — this unlocks most hesitation',
          'After script is given: "Once you\'ve spoken with her, send me a message and I\'ll take care of the rest" — clear next step',
          'Send WhatsApp immediately with the ready-to-forward message so the customer can act now'
        ],
        items_ar:[
          'دائماً قدّم سكريبتاً جاهزاً — لا تفترض أن العميل يعرف ما يقول',
          'قدّم بديل إعادة التوجيه عبر واتساب — بعض العملاء يفضلون النص على التقديم الشفهي',
          'أكّد: "أنتِ مش لازم تبيعي" — هذا يفتح معظم التردد',
          'بعد تقديم السكريبت: "لما تحكي معها ابعثيلي وأنا أتولى الباقي" — خطوة تالية واضحة',
          'أرسل واتساب فوراً مع الرسالة الجاهزة للتوجيه حتى يتمكن العميل من التصرف الآن'
        ],
        items_zh:[
          '始终提供现成话术——不要假设客户知道该说什么',
          '提供微信转发的备选方案——有些客户更喜欢文字引荐而不是口头介绍',
          '强调："你不需要推销"——这句话能解锁大多数的犹豫',
          '提供话术之后："等你跟她说完，发给我，我来全程跟进"——给出明确的下一步',
          '立即通过微信发送现成的转发消息，让客户可以马上行动'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Pattern from B-customer pre-payment calls:\n"After you book your child\'s session... one simple thing... do you have a friend or sister whose children are the same age?... When you speak with her, tell her you already booked and she has the same opportunity... Send me her number and I\'ll follow up with her."',
          '🛑 Sara\'s approach to scripting the customer:\n"I won\'t mention that you referred me to her" — this phrase protects the customer\'s image and is what makes the Sara style so high-converting for indirect/talk approaches.',
          '🛑 WhatsApp-first option:\nFor customers who are too shy to talk in person, offer to send a beautiful WhatsApp message they can forward. This covers the gap between "she said she\'ll talk" and "she actually talks."'
        ],
        items_ar:[
          '🛑 نمط من مكالمات العميل الأول (B-customer) قبل الدفع:\n"بعد ما تحجزي جلسة البنت أو الولد..في موضوع بسيط..عندك صاحبة أو أخت أطفالها بنفس العمر؟..لما تحكي معها قولي إنك حجزتي وعندها نفس الفرصة..ابعثيلي رقمها وأنا أتابع معها."',
          '🛑 نهج سارة في تزويد العميل بالسكريبت:\n"ما رح أذكر إنك وصيتيني عليها" — هذه العبارة تحمي صورة العميل وهي ما يجعل أسلوب سارة عالي التحويل جداً في النهج غير المباشر/التحدث.',
          '🛑 خيار واتساب أولاً:\nللعملاء الخجولين جداً من التحدث شخصياً، عرض إرسال رسالة واتساب جميلة يمكنهم إعادة توجيهها. هذا يسدّ الفجوة بين "قالت ستتحدث" و"تتحدث فعلاً."'
        ],
        items_zh:[
          '🛑 B类新客户付款前通话模式：\n"预约完孩子的课程之后……顺便问一句——你有没有孩子年龄相仿的朋友或姐妹？……等你去跟她说的时候，告诉她你已经预约了，她也有同样的机会……把号码发给我，我来跟进。"',
          '🛑 萨拉式话术引导技巧：\n"我不会提是你介绍的"——这句话保护了客户的形象，也正是萨拉风格在间接/话术沟通中转化率极高的原因。',
          '🛑 微信优先选项：\n对于太腼腆不好意思当面介绍的客户，提供一条精心设计的微信消息让她转发。这填补了"她说要去说"和"她真正说了"之间的落差。'
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
        text_ar:'تحديد العملاء المحتملين المناسبين من داخل شبكة العميل الحالي. دور الـ CM هنا مساعدة العميل على التفكير بوضوح في من في حياته سيستفيد فعلاً — لا أي شخص يعرفه. توجّه أسئلة التحديد النوعية العميل عبر شبكته الخاصة، قطاعاً تلو الآخر (الأصدقاء، العائلة، الجيران، اتصالات المدرسة، مجموعات واتساب)، وتُبرز أفضل الليدز ملاءمةً. الليد المُحدَّد جيداً منتصف الطريق نحو التحويل بالفعل.',
        text_zh:'从现有客户的社交网络中精准识别合适的潜在客户。顾问的角色是帮助客户清晰地思考——身边哪些人真正能从中受益，而不只是随便找个认识的人。有针对性的识别问题引导客户逐个审视自己的社交圈（朋友、家人、邻居、学校联系人、微信群），找出最匹配的线索。一个被精准识别的线索，已经完成了一半的转化。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Customers tend to think in vague categories: "You must know someone" doesn\'t generate names. The CM needs to make the customer\'s network concrete by triggering specific mental buckets:\n\n• "Your neighbours who have children" → triggers neighbour network\n• "Parents from your children\'s school" → triggers school network\n• "WhatsApp groups you\'re in" → triggers digital community\n• "Your sisters or cousins" → triggers family network\n\nOnce the customer is thinking in concrete groups, names appear naturally. The CM\'s job is just to ask the right segmentation question.',
        text_ar:'يميل العملاء إلى التفكير بفئات مبهمة: "لازم تعرفي أحد" لا تُولّد أسماء. يحتاج الـ CM إلى جعل شبكة العميل ملموسة بتفعيل حاويات ذهنية محددة:\n\n• "جيرانك اللي عندهم أطفال" → يُفعّل شبكة الجيران\n• "أهل مدرسة أطفالك" → يُفعّل شبكة المدرسة\n• "مجموعات الواتساب اللي فيك" → يُفعّل المجتمع الرقمي\n• "أخواتك أو بنات خالتك" → يُفعّل شبكة العائلة\n\nبمجرد أن يفكر العميل في مجموعات ملموسة، تظهر الأسماء بشكل طبيعي. وظيفة الـ CM مجرد طرح سؤال التصنيف الصحيح.',
        text_zh:'客户容易陷入模糊的类别思维："你肯定认识人"这句话产生不了名字。顾问需要通过触发具体的心理分类，让客户的社交网络变得具体可见：\n\n• "你有孩子的邻居" → 激活邻居网络\n• "孩子学校的家长" → 激活学校网络\n• "你参加的微信群" → 激活数字社区\n• "你的姐妹或表亲" → 激活家庭网络\n\n一旦客户开始在具体群体中思考，名字就会自然浮现。顾问的工作就是提出正确的分类引导问题。' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'When customer says "I don\'t have anyone" — pivot to network segmentation immediately',
          'After the referral program is explained — while motivation is high, explore the network',
          'When customer is active in the conversation and engaged — she\'ll think harder',
          'During a long call with a high-satisfaction customer — she has time and goodwill'
        ],
        items_ar:[
          'عندما يقول العميل "ما عندي أحد" — انتقل فوراً إلى تصنيف الشبكة',
          'بعد شرح برنامج الريفيرال — بينما الدافعية عالية، استكشف الشبكة',
          'عندما يكون العميل نشطاً في المحادثة ومنخرطاً — سيفكر أكثر',
          'خلال مكالمة طويلة مع عميل ذو رضا عالٍ — لديه وقت وحسن نية'
        ],
        items_zh:[
          '当客户说"我想不到人"——立即切换到社交圈分类引导',
          '解释完推荐计划之后——趁动力最强时，引导探索社交网络',
          '客户通话积极、状态投入时——她会认真思考',
          '与高满意度客户的长通话中——她有时间也有好意'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Mentions school friends, neighbourhood, or WhatsApp groups — active social network',
          'Has multiple children — her social circle likely overlaps with other multi-child parents',
          'Active on social media or in community groups — wider reach potential',
          '"I don\'t know" or "I haven\'t thought about it" — not a refusal, just needs a trigger question to activate memory',
          'High satisfaction with the platform — her word-of-mouth is already positive'
        ],
        items_ar:[
          'يذكر أصدقاء المدرسة أو الحي أو مجموعات واتساب — شبكة اجتماعية نشطة',
          'لديه أطفال متعددون — من المرجح أن دائرته الاجتماعية تتداخل مع أولياء أمور متعددي الأطفال',
          'نشط على وسائل التواصل الاجتماعي أو في مجموعات المجتمع — إمكانية وصول أوسع',
          '"مو عارفة" أو "ما فكرت" — ليس رفضاً، يحتاج فقط سؤالاً مُحفّزاً لتنشيط الذاكرة',
          'رضا عالٍ عن المنصة — توصيتها الشفهية إيجابية بالفعل'
        ],
        items_zh:[
          '主动提到学校朋友、邻居或微信群——社交网络活跃',
          '有多个孩子——她的社交圈很可能与其他多孩家长重叠',
          '在社交媒体或社区群组中活跃——潜在触达范围更广',
          '"不知道"或"没想过"——不是拒绝，只需要一个触发性问题来激活记忆',
          '对平台高度满意——她的口碑本来就是正面的'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'NETWORK SEGMENTATION Flow:\n1. Customer: "I don\'t have anyone"\n2. CM: "That\'s fine — just a simple question: are there mothers at your children\'s school who face the same challenges?"\n3. If yes → "Excellent — even one person is enough. Do you know her well?"\n4. CM: "And your neighbours? Do they have children the same age?"\n5. CM: "And your sisters? Or your cousins?"\n6. CM: "Do you have any WhatsApp groups with mothers in them?"\n7. Customer names someone → immediately go to filtering/talk flow\n8. Close: "Excellent — send me her number and I\'ll follow up"',
        text_ar:'تدفق تصنيف الشبكة:\n1. العميل: "ما عندي أحد"\n2. الـ CM: "تمام — بس سؤال بسيط: في أمهات بمدرسة أطفالك عندهم نفس التحديات؟"\n3. إذا نعم → "ممتاز — حتى لو واحدة بكفي. هل تعرفيها كويس؟"\n4. الـ CM: "وجيرانك؟ في أطفال بنفس العمر؟"\n5. الـ CM: "وأخواتك؟ أو بنات خالتك؟"\n6. الـ CM: "عندك مجموعات واتساب فيها أمهات؟"\n7. يُسمّي العميل شخصاً → انتقل فوراً إلى تدفق التصفية/الحديث\n8. الإغلاق: "ممتاز — ابعثيلي رقمها وأنا أتابع"',
        text_zh:'社交圈分类引导流程：\n1. 客户："我想不到人"\n2. 顾问："好的——问你一个简单的问题：孩子学校里有没有家长面临同样的困扰？"\n3. 如果有→"太好了——哪怕只有一个人就够了。你认识她吗？"\n4. 顾问："你的邻居呢？有没有年龄相仿的孩子？"\n5. 顾问："你的姐妹呢？或者表亲？"\n6. 顾问："你有没有参加妈妈群之类的微信群？"\n7. 客户说出一个人名→立即进入筛选/沟通引导流程\n8. 收尾："太好了——把她的号码发给我，我来跟进"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'School bucket: "Are there parents from your children\'s school who face the same concerns?"',
          'Family bucket: "Your sisters? Or your cousins? Do any of them have children?"',
          'Neighbour bucket: "Your neighbours — do they have children the same age as yours?"',
          'WhatsApp bucket: "Do you have WhatsApp groups with mothers in them? The school group?"',
          'Work bucket (fathers): "Work colleagues who have children?"'
        ],
        items_ar:[
          'حاوية المدرسة: "في أهل من مدرسة أطفالك عندهم نفس الهموم؟"',
          'حاوية العائلة: "أخواتك؟ أو بنات خالتك؟ في عندهم أطفال؟"',
          'حاوية الجيران: "جيرانك — في أطفال بنفس عمر أولادك؟"',
          'حاوية واتساب: "عندك مجموعات واتساب فيها أمهات؟ مجموعة المدرسة؟"',
          'حاوية العمل (الآباء): "زملاء شغل عندهم أطفال؟"'
        ],
        items_zh:[
          '学校圈："孩子学校的家长里，有没有有类似顾虑的？"',
          '家庭圈："你的姐妹？或者表亲？她们有孩子吗？"',
          '邻居圈："你的邻居——有没有年龄相仿的孩子？"',
          '微信群："你有没有参加妈妈群？学校的家长群？"',
          '工作圈（父亲）："工作上的同事有没有孩子？"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Ideal lead profile (what to look for):\n• Has children ages 6-15\n• Has expressed concern about education, grades, or keeping kids busy\n• Has tried or considered online learning before\n• Is from a similar socioeconomic background as the existing customer\n• Is connected to the customer in a real relationship (friend, sister, neighbour — not a distant contact)\n\nHigh-value lead buckets to explore with every customer:\n1. School community — "parents of your children\'s classmates"\n2. Extended family — "your sisters, cousins, your relatives\' wives"\n3. Neighbours — "your neighbours that you regularly talk to"\n4. WhatsApp groups — "the mothers\' group you\'re in"\n5. Work contacts (for fathers) — "work colleagues who have children"',
        text_ar:'الملف المثالي للليد (ما تبحث عنه):\n• لديه أطفال أعمار 6-15\n• أبدى قلقاً بشأن التعليم أو الدرجات أو إشغال الأطفال\n• جرّب أو فكّر في التعلم الإلكتروني سابقاً\n• من خلفية اجتماعية-اقتصادية مشابهة للعميل الحالي\n• مرتبط بالعميل في علاقة حقيقية (صديق، أخت، جار — لا اتصال بعيد)\n\nحاويات الليد ذات القيمة العالية لاستكشافها مع كل عميل:\n1. مجتمع المدرسة — "أهل زملاء أطفالك"\n2. العائلة الممتدة — "أخواتك، بنات خالتك، زوجات أقاربك"\n3. الجيران — "جيرانك اللي بتتكلمي معهم"\n4. مجموعات واتساب — "مجموعة الأمهات اللي فيك"\n5. اتصالات العمل (للآباء) — "زملاء الشغل اللي عندهم أطفال"',
        text_zh:'理想线索画像（你在寻找什么）：\n• 有6-15岁的孩子\n• 曾表达过对教育、成绩或孩子课外安排的关注\n• 之前尝试过或考虑过在线学习\n• 与现有客户的社会经济背景相近\n• 与客户有真实的关系（朋友、姐妹、邻居——而非疏远的联系人）\n\n每个客户都值得探索的高价值线索来源：\n1. 学校社区——"孩子同学的家长"\n2. 大家庭——"你的姐妹、表亲、亲戚的妻子"\n3. 邻居——"你平时聊得来的邻居"\n4. 微信群——"你参加的妈妈群"\n5. 工作联系人（父亲）——"有孩子的同事"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'Low-quality lead signals — manage expectations before calling:\n• "Anyone you know" — too vague, need to qualify before calling\n• Numbers from a contact list with no relationship context\n• Leads who are single, or whose children are too young/old for the platform\n• Leads in a different city or country with no relevant product availability\n\nQuality check before calling any lead:\n"Does she have children?" — if no → skip\n"How old are they?" — if outside 6-15 → deprioritize\n"Do you know her personally?" — if no → flag as cold',
        text_ar:'إشارات الليد منخفض الجودة — إدارة التوقعات قبل الاتصال:\n• "أي أحد تعرفيه" — مبهم جداً، يحتاج تأهيلاً قبل الاتصال\n• أرقام من قائمة جهات اتصال دون سياق علاقة\n• ليدز عزّاب أو أطفالهم صغار/كبار جداً للمنصة\n• ليدز في مدينة أو دولة مختلفة دون توفر المنتج ذي الصلة\n\nفحص الجودة قبل الاتصال بأي ليد:\n"عندها أطفال؟" — إذا لا → تجاهل\n"عمرهم كم؟" — إذا خارج 6-15 → أعطِ أولوية أقل\n"أنتِ تعرفيها شخصيًا؟" — إذا لا → صنّف كبارد',
        text_zh:'低质量线索信号——联系前管理好预期：\n• "你认识的任何人"——太模糊，需要先做资质确认\n• 通讯录里没有背景信息的随机号码\n• 没有孩子或孩子年龄不在适用范围内的线索\n• 在不同城市或国家、服务不可用的地区的线索\n\n联系任何线索前的质量检核：\n"她有孩子吗？"——如果没有→跳过\n"孩子多大？"——如果不在6-15岁范围内→降低优先级\n"你认识她本人吗？"——如果不认识→标记为冷线索' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always segment the network — never accept "I don\'t have anyone" at face value',
          'After each bucket question, pause and let customer think — silence is productive here',
          'Once a name appears, immediately validate: "And does she have children? How old?"',
          'Move quickly from identification to collection: "Excellent — send me her number"',
          'If customer gives a weak lead, accept gracefully and move to next bucket: "Thank you — and what about parents from your children\'s school?"'
        ],
        items_ar:[
          'صنّف الشبكة دائماً — لا تقبل "ما عندي أحد" كما هي',
          'بعد كل سؤال حاوية، توقف ودع العميل يفكر — الصمت منتج هنا',
          'بمجرد ظهور اسم، تحقق فوراً: "وهي عندها أطفال؟ بعمر كم؟"',
          'انتقل بسرعة من التحديد إلى الجمع: "ممتاز — ابعثيلي رقمها"',
          'إذا أعطى العميل ليداً ضعيفاً، اقبله بلطف وانتقل إلى الحاوية التالية: "شكرًا — وأهل مدرسة أطفالك؟"'
        ],
        items_zh:[
          '永远对社交圈进行分类引导——不要表面接受"我想不到人"',
          '每个分类问题之后停顿，让客户思考——这里的沉默是有价值的',
          '一旦出现名字，立即确认资质："她有孩子吗？多大了？"',
          '迅速从识别推进到收集："太好了——把她的号码发给我"',
          '如果客户给出质量较弱的线索，优雅接受并转到下一个分类："谢谢——孩子学校的家长里呢？"'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 From "POOLS 3-6" partner system case — Abu Nayef:\n"Hello Abu Nayef, this is Yazan from Five Talk... We wanted to talk to you about something different... A simple matter that could benefit you financially... I\'m not requiring any commitment — just let me explain first... If you\'re interested, I\'ll walk you through the system in detail." [partner model targets people with large networks]',
          '🛑 Network segmentation in practice:\nCM asked a mother: "And your neighbours?"\nShe said: "Actually, my neighbour Basma was telling me she\'s been looking for something for her children."\nResult: warm lead who converted in the same week.',
          '🛑 Getting leads from M7+ customers (from pool-m7 section):\nLong-term customers have the widest network trust. Their referral carries social proof that no CM pitch can match. The "Live Gratification" approach works particularly well: show the customer exactly what their referral friend will get, so she can describe it naturally when she talks to them.'
        ],
        items_ar:[
          '🛑 من حالة نظام الشريك "POOLS 3-6" — أبو نايف:\n"مرحبا أبو نايف، معك يزن من Five Talk..بدنا نكلمك عن شيء مختلف..موضوع بسيط ممكن يفيدك ماديًا..ما اشترط أي شيء بس أسمعك أول..لو مهتم أنا رح أشرح لك النظام بالتفصيل.." [نموذج الشريك يستهدف الناس ذوي الشبكات الواسعة]',
          '🛑 تصنيف الشبكة عملياً:\nسألت الـ CM أماً: "وجيرانك؟"\nقالت: "والله جارتي باسمة كانت تقولي إنها دورت على شي لأولادها."\nالنتيجة: ليد دافئ تحوّل في نفس الأسبوع.',
          '🛑 الحصول على ليدز من عملاء M7+ (من قسم pool-m7):\nالعملاء على المدى الطويل لديهم أوسع ثقة شبكية. ريفيرالهم يحمل إثباتاً اجتماعياً لا يمكن لأي عرض للـ CM مضاهاته. نهج "الإشباع الفوري" يعمل بشكل خاص: أرِ العميل بالضبط ما سيحصل عليه صديقه المُحال، حتى يتمكن من وصفه بشكل طبيعي عند التحدث إليه.'
        ],
        items_zh:[
          '🛑 合作伙伴模式案例——"长期学员3-6"计划中的家长（孩子父亲）：\n"您好，我是Five Talk的顾问……我们想跟您聊一件不一样的事……一个简单的项目，可能对您有经济上的帮助……我不需要您做任何承诺，只是先听我说……如果感兴趣，我来详细介绍整个体系。" [合作伙伴模式专门面向社交网络广泛的人]',
          '🛑 社交圈分类引导实战案例：\n顾问问了一位妈妈："你的邻居呢？"\n她说："说起来，我邻居Basma最近一直说想给孩子找点什么。"\n结果：这个热线索在当周就完成了转化。',
          '🛑 从M7+长期学员获取线索（来自长期学员模块）：\n长期学员拥有最广泛的社交信任网络。他们的推荐所承载的社会认可度，是任何顾问话术都无法比拟的。"即时感受"方法在这里尤其有效：让客户清楚地看到被推荐朋友将会得到什么，这样她在跟朋友聊的时候就能自然地描述出来。'
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
        text_ar:'وسّع نطاق الريفيرال إلى أبعد من 1-1 بتمكين العميل من مشاركة رابط الريفيرال على نطاق واسع — مجموعات واتساب، محادثات العائلة، الستاتس، والتوجيه المباشر. تشمل القناة الواسعة أيضاً نموذج الشريك/العمولة: تحويل العملاء ذوي الشبكات الواسعة إلى مولّدين متكررين للريفيرال يكسبون 100 دولار لكل اشتراك. وضعان: (1) المشاركة السلبية — ينشر العميل الرابط أو الستاتس. (2) الشريك النشط — يُحيل العميل بنشاط ويكسب عمولة لكل تسجيل.',
        text_zh:'将推荐触达扩展到1对1以外，让客户能够通过微信群、家庭聊天、朋友圈状态和直接转发广泛分享推荐链接。广渠道还包括合作伙伴/佣金模式：将社交网络广泛的客户转化为持续的推荐贡献者，每个成功注册可获得100美元。两种模式：(1) 被动分享——客户发布链接或状态；(2) 主动合作——客户积极推荐并按注册数量获得佣金。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'Wide-channel customers are motivated by one of two things:\n\n• SOCIAL GENEROSITY — "I want to share something good with my community." Triggered by the gift/helpful-resource framing. They share because it feels good to help, not because of the reward.\n\n• FINANCIAL OPPORTUNITY — "I want to make money from this." Triggered by the partner/commission framing. The $100-per-subscription partner model converts referral from a favour into a small home business.\n\nKey insight: don\'t pitch both to the same customer. Read which motivation is dominant and use only that frame.',
        text_ar:'عملاء القناة الواسعة مدفوعون بأحد شيئين:\n\n• الكرم الاجتماعي — "أريد مشاركة شيء جيد مع مجتمعي." مُحرَّك بإطار الهدية/المورد المفيد. يشاركون لأن المساعدة تُشعرهم بالطيب، لا بسبب المكافأة.\n\n• الفرصة المالية — "أريد كسب المال من هذا." مُحرَّك بإطار الشريك/العمولة. نموذج الشريك بـ 100 دولار لكل اشتراك يحوّل الريفيرال من معروف إلى مشروع صغير من البيت.\n\nالرؤية الأساسية: لا تقدّم الاثنين لنفس العميل. اقرأ أيّ الدوافع هو السائد واستخدم ذلك الإطار فقط.',
        text_zh:'广渠道客户的动力来源有两种：\n\n• 社交慷慨心——"我想把好东西分享给我的圈子。"由礼物/有益资源框架触发。他们分享是因为帮助别人让自己感觉良好，而不主要是为了奖励。\n\n• 财务机会——"我想从中赚钱。"由合作伙伴/佣金框架触发。每推荐一人注册获得100美元的合作模式，将推荐从人情转化为一个小型居家副业。\n\n关键洞察：不要对同一个客户同时使用两种框架。读出哪种动机占主导，只用那个框架。' },
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
        ],
        items_zh:[
          '链接分享：任何有微信群（学校、家人、邻居）的满意客户',
          '合作伙伴模式（M3-M6学员）：确认对方有活跃的社交网络之后',
          '状态分享：通话中情绪正向高峰之后',
          '群组分享：当客户提到自己在活跃的家长微信群中',
          '合作伙伴话术（父亲/职业人士）：当客户似乎有财务动机且职业网络广泛时'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Mentions WhatsApp groups actively — high sharing potential',
          '"I have a large mothers\' group" — group sharing opportunity',
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
        ],
        items_zh:[
          '积极提到微信群——分享潜力高',
          '"我有一个很大的妈妈群"——群组分享机会',
          '社交活跃，提到活动、学校事务——组织者类型的家长',
          '合作伙伴模式：提到经济压力、想在家赚钱，或询问奖励金额',
          'M3-M6学员且家庭/社区网络广泛——最理想的合作伙伴候选人'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'LINK SHARING Flow:\n1. After referral program explained, ask: "Do you have any WhatsApp groups with mothers in them?"\n2. If yes → "Excellent — I\'ll send you a ready link to share in the group"\n3. Send link with pre-written group message (see Referral Opportunities)\n4. Optional: ask to share as WhatsApp Status for wider reach\n5. Follow up in 24h to confirm sharing\n\nPARTNER MODEL Flow (M3-M6, POOLS 3-6):\n1. Open: "We wanted to talk to you about something different — something that could benefit you financially"\n2. Explain: "For every subscription that comes through you, you get $100 or free sessions of the same value"\n3. If interested → explain system + give link + set expectations\n4. Close: "Think about it and get back to me — no need to commit right now"',
        text_ar:'تدفق مشاركة الرابط:\n1. بعد شرح برنامج الريفيرال، اسأل: "عندك مجموعات واتساب فيها أمهات؟"\n2. إذا نعم → "ممتاز — رح أبعثلك رابط جاهز تشاركيه فيها"\n3. أرسل الرابط مع رسالة مجموعة مكتوبة مسبقاً (انظر فرص الريفيرال)\n4. اختياري: اطلب المشاركة كستاتس واتساب لوصول أوسع\n5. تابع في 24 ساعة لتأكيد المشاركة\n\nتدفق نموذج الشريك (M3-M6، POOLS 3-6):\n1. الافتتاح: "بدنا نكلمك عن شيء مختلف — موضوع ممكن يفيدك ماديًا"\n2. الشرح: "مقابل كل اشتراك يجي من طرفك بتاخذ $100 أو حصص مجانية بقيمتها"\n3. إذا مهتم → اشرح النظام + أعطِ الرابط + حدّد التوقعات\n4. الإغلاق: "فكر في الموضوع وارجعلي — مو لازم تلتزم هلق"',
        text_zh:'链接分享流程：\n1. 解释完推荐计划后，问："你有没有参加妈妈相关的微信群？"\n2. 如果有→"太好了——我发给你一条现成消息，你分享到群里就好了"\n3. 发送链接 + 预写好的群组消息（见推荐时机栏）\n4. 可选：请她设置微信朋友圈状态，扩大覆盖面\n5. 24小时后跟进确认是否已分享\n\n合作伙伴模式流程（M3-M6，长期学员3-6计划）：\n1. 开场："我们想跟你聊一件不一样的事——一个可能对你有经济价值的项目"\n2. 说明："每推荐一人成功注册，你可以获得100美元或等值的免费课时"\n3. 如果感兴趣→详细介绍体系 + 给出链接 + 设定预期\n4. 收尾："先想想，随时回复我——不需要现在就承诺"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Group message template: "Hey moms 🌸 I\'m sharing something we benefited from a lot [link]"',
          'Partner opener: "We wanted to talk to you about something different — a simple matter that could benefit you financially"',
          'Partner pitch: "For every subscription that comes through you, you get [amount] — a small home-based project"',
          'Status sharing: "Send me your personal link and post it on your WhatsApp Status"',
          'Voice message option: "Instead of text, you can send a voice message in your own natural words — it\'s more impactful"'
        ],
        items_ar:[
          'قالب رسالة المجموعة: "هاي أمهات 🌸 شاركتكم شيء استفدنا منه كتير [رابط]"',
          'افتتاح الشريك: "بدنا نكلمك عن شيء مختلف — موضوع بسيط ممكن يفيدك ماديًا"',
          'عرض الشريك: "مقابل كل اشتراك يجي من طرفك بتاخذ [مبلغ] — مشروع صغير من البيت"',
          'مشاركة الستاتس: "ارسليلي رابطك الخاص وحطيه على ستاتس الواتساب"',
          'خيار الرسالة الصوتية: "بدلًا من النص، ممكن ترسلي رسالة صوتية بكلامك الطبيعي — أكتر تأثيرًا"'
        ],
        items_zh:[
          '话术1（成功导师型）："给大家发了平台介绍视频 + 上课方式说明 ✨ 这是推荐计划的链接 🎁"',
          '话术2（VIP型）："这是推荐计划链接 🎁 通过你推荐成功注册的，可以获得免费课时或现金返还"',
          '话术3（亲切型）："宝贝儿，这是你的专属链接 🌸 通过这个链接注册的都会自动给你加课时——把号码发给我，我来跟进"',
          '续费话术："记得哦，你可以用推荐换免费续费——链接在这里 [链接]"',
          '游戏化话术（Yara式）："你已经完成了 [X] 个，距 [Y] 个还差一点——[奖励] 快到了 🔥 下一个是谁？"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Ready-to-share WhatsApp group message (CM sends to customer to copy/paste):\n"Hey moms 🌸 I\'m sharing something I tried and my children benefited from a lot — an excellent educational platform with a free trial. Registration link: [LINK] — if you have questions I\'m here 💙"\n\nWhatsApp Status caption:\n"We tried it and loved it 🎯 An educational platform for our children — anyone interested message me 🌸"\n\nVoice message guide (what to say):\n"Hey, I\'m sharing something we benefited from — an educational platform my children use to learn online and they\'ve improved a lot. If you\'re interested I\'ll give you the supervisor\'s number and she\'ll send you the details."\n\nPartner pitch key message:\n"Every subscription that comes through you = $100 — a small home-based project with no capital required."',
        text_ar:'رسالة واتساب جاهزة للمشاركة في المجموعة (الـ CM يرسلها للعميل ليتوجه بها):\n"هاي أمهات 🌸 مشاركتكم شيء جربته وأطفالي استفادوا كتير — منصة تعليمية ممتازة وعندهم تجربة مجانية. رابط التسجيل: [LINK] — لو عندكم أسئلة أنا معكم 💙"\n\nتعليق ستاتس واتساب:\n"جربنا وأعجبنا 🎯 منصة تعليمية لأطفالنا — من اهتم يراسلني 🌸"\n\nدليل الرسالة الصوتية (ما تقوله):\n"هاي، بشاركك شيء استفدنا منه — منصة تعليمية أولادي بيتعلموا فيها أونلاين وبيتحسنوا كتير. لو مهتمة أعطيكِ رقم المشرفة ترسلك التفاصيل."\n\nرسالة عرض الشريك الرئيسية:\n"كل اشتراك يجي من طرفك = $100 — مشروع صغير من البيت بدون أي رأس مال."',
        text_zh:'微信群现成消息（由CM发给家长，直接复制转发）：\n"各位妈妈们 🌸 分享一个我们用过的好东西——一个很棒的在线学习平台，还有免费试课机会。注册链接：[LINK] ——有问题随时找我 💙"\n\n微信朋友圈状态文案：\n"我们试了，觉得很好 🎯 孩子们用的在线学习平台——感兴趣的联系我 🌸"\n\n语音消息话术要点：\n"嗨，分享一个我们在用的东西——一个在线学习平台，孩子进步很明显。感兴趣的话我把顾问的联系方式给你，她会发详情给你。"\n\n合作伙伴邀请核心话术：\n"每推荐一个人成功注册 = 100美元——不需要任何本金，在家就能做的小项目。"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'"I don\'t like sending ads to groups."\n→ "This isn\'t an ad — it\'s your personal experience. People listen to people they trust."\n\n"The group has rules against advertising."\n→ "That\'s fine — you can send it privately to specific mothers instead of the group."\n\nFor partner model:\n"I don\'t want them to feel I\'m earning from referring them."\n→ "This is completely normal — many people refer and receive cashback. It\'s not a secret and there\'s nothing wrong with it."',
        text_ar:'"ما بحب أبعث إعلانات على المجموعات"\n→ "هاد مش إعلان — هاد تجربتك الشخصية. الناس بتسمع للناس اللي يثقوا فيهم."\n\n"المجموعة عندها قوانين ضد الإعلانات"\n→ "تمام — ممكن تبعثي بشكل خاص لأمهات محددة بدل المجموعة."\n\nلنموذج الشريك:\n"ما بدي يحسوا إني بكسب من ورا ترشيحهم"\n→ "هذا شيء طبيعي جدًا — كتير ناس بيرشحوا وبياخذوا كاش باك. مش سر وما في شيء غلط فيه."',
        text_zh:'"我不想在群里发广告"\n→ "这不是广告——这是你自己的亲身体验。大家只会听信任的人说的话。"\n\n"群里有规定不能发推广内容"\n→ "完全理解——那可以单独发给几个你觉得会感兴趣的妈妈，不用发群。"\n\n合作伙伴模式下的顾虑：\n"不想让朋友觉得我在靠他们赚钱"\n→ "这很正常——很多人都这样做，推荐朋友同时获得返利，不是什么秘密，也没有任何问题。"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Always send the ready-made message — never ask customer to write it herself',
          'For groups: send a specific, short, non-spammy message template that feels personal',
          'For partner model: frame as "a small home-based project" — normalizes the earning aspect',
          'Follow up 24h after sending the link: "Were you able to share the link?"',
          'Track wide-channel referrals separately — they convert slower but at scale'
        ],
        items_ar:[
          'أرسل الرسالة الجاهزة دائماً — لا تطلب من العميل كتابتها بنفسها',
          'للمجموعات: أرسل قالب رسالة محدد وقصير وغير مزعج يبدو شخصياً',
          'لنموذج الشريك: قدّمه بوصف "مشروع صغير من البيت" — يُطبّع جانب الكسب',
          'تابع بعد 24 ساعة من إرسال الرابط: "هل قدرتي تشاركي الرابط؟"',
          'تتبع ريفيرالات القناة الواسعة بشكل منفصل — تتحول بشكل أبطأ لكن بحجم أكبر'
        ],
        items_zh:[
          '永远发现成的消息模板——不要让家长自己想怎么写',
          '群发消息要简短、自然、有个人感，不像广告',
          '合作伙伴模式：定位为"在家就能做的小副业"——让赚钱这件事显得正常、合理',
          '发完链接后24小时跟进确认："分享了吗？有人感兴趣吗？"',
          '广泛渠道推荐单独记录追踪——转化慢，但覆盖面大'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Partner model case — Abu Nayef (from POOLS 3-6):\n"Hello Abu Nayef, this is Yazan from Five Talk... We wanted to talk to you about something different... A simple matter that could benefit you financially... I\'m not requiring any commitment — just let me explain first... If you\'re interested, I\'ll walk you through the system in detail. [$100 per subscription model]"',
          '🛑 Wide channel from POOLS 3-6 strategy:\n"After 3-6 months pass and the customer hasn\'t referred anyone, the challenge is that they\'ve \'lost enthusiasm.\' The solution: convert them into a partner rather than just a subscriber. When they have $100 per referral waiting, they move with self-initiative."',
          '🛑 Voice message vs text — why voice wins:\nA customer who sends a voice message to her friend saying "I tried it and loved it" converts 2-3x better than a forwarded text template. Train customers to use their own voice — the CM prepares the talking points, not the exact words.'
        ],
        items_ar:[
          '🛑 حالة نموذج الشريك — أبو نايف (من POOLS 3-6):\n"مرحبا أبو نايف، معك يزن من Five Talk..بدنا نكلمك عن شيء مختلف..موضوع بسيط ممكن يفيدك ماديًا..ما اشترط أي شيء بس أسمعك أول..لو مهتم أنا رح أشرح لك النظام بالتفصيل.. [نموذج $100 لكل اشتراك]"',
          '🛑 القناة الواسعة من استراتيجية POOLS 3-6:\n"بعد ما يمضي 3-6 شهور والعميل ما رشح أحد، بيكون التحدي إنه \'فقد الحماس\'. الحل: تحويله لشريك بدل مجرد مشترك. لما يكون معه $100 لكل ريفيرال، بيتحرك بمبادرة ذاتية."',
          '🛑 الرسالة الصوتية مقابل النص — لماذا الصوت يفوز:\nعميل يرسل رسالة صوتية لصديقه يقول "جربتها وأعجبتني" يتحول بمعدل 2-3 أضعاف أفضل من قالب نصي معاد توجيهه. درّب العملاء على استخدام أصواتهم — الـ CM يُعدّ النقاط الأساسية، لا الكلمات الحرفية.'
        ],
        items_zh:[
          '🛑 案例：合作伙伴模式——Abu Nayif（来自POOLS 3-6）：\n"您好Abu Nayif，我是Five Talk的Yazan……想跟您聊一件不一样的事……一个简单的项目，可能对您有经济价值……不需要您承诺任何事，先听听看……如果感兴趣我来详细介绍……[每推荐一人成功注册获$100]"',
          '🛑 POOLS 3-6的广泛渠道策略：\n"客户入学3-6个月后仍未推荐任何人，挑战在于他们\'失去了热情\'。解决方案：把他们从普通学员变成合作伙伴。当每次推荐都有$100报酬时，他们会主动行动。"',
          '🛑 语音消息 vs 文字消息——为什么语音更有效：\n家长发一条语音给朋友说"我们用了觉得很好"，转化率比转发文字模板高2-3倍。训练家长用自己的声音说话——CM准备要点，不是逐字稿。'
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
        text:'Convert verbal referral commitments made during calls into actual numbers submitted via WhatsApp. The WhatsApp follow-up is the bridge between "I\'ll think about it" and a real lead. It must be sent within minutes of the call ending — not hours. The message should: (1) remind the customer of the reward, (2) make it effortless to send a number (just reply with a name/number), and (3) feel personal, not automated. Every CM has a distinct WhatsApp signature style.',
        text_ar:'حوّل التزامات الريفيرال اللفظية المُقدَّمة خلال المكالمات إلى أرقام فعلية مُقدَّمة عبر واتساب. متابعة واتساب هي الجسر بين "رح أفكر" وليد حقيقي. يجب إرسالها في غضون دقائق من انتهاية المكالمة — لا ساعات. يجب أن تكون الرسالة: (1) تُذكّر العميل بالمكافأة، (2) تجعل إرسال الرقم سهلاً (مجرد الرد باسم/رقم)، (3) تبدو شخصية لا آلية. لكل CM أسلوب واتساب مميز.',
        text_zh:'将通话中家长口头承诺的推荐，转化为实际通过微信提交的联系人号码。微信跟进是连接"我考虑考虑"与真实线索之间的桥梁——必须在挂电话后几分钟内发出，而不是几小时后。消息要做到：(1) 提醒家长有奖励，(2) 让发号码这件事毫无压力（回复一个名字/号码就够了），(3) 有人情味，不像机器发的。每位CM都应形成自己独特的微信沟通风格。' },
      { icon:'🧠', label:'Customer Psychology', label_ar:'علم نفس العميل', list:false,
        text:'After a call, customers have a short action window — usually 15-30 minutes before the referral intention fades. WhatsApp follow-up within this window is critical. Key psychological principles:\n\n• IMMEDIACY — the message arrives while the emotional high from the call is still active\n• EFFORTLESSNESS — "Just reply with a name and number" removes all friction\n• SOCIAL RECIPROCITY — sending a thoughtful WhatsApp with the referral link feels like continuing a friendship, not a sales follow-up\n• VISUAL REWARD — including the prize/reward again in the WhatsApp reignites motivation without a new call',
        text_ar:'بعد المكالمة، لدى العملاء نافذة إجراء قصيرة — عادةً 15-30 دقيقة قبل أن يتلاشى نية الريفيرال. متابعة واتساب خلال هذه النافذة بالغة الأهمية. المبادئ النفسية الأساسية:\n\n• الفورية — تصل الرسالة بينما لا تزال الذروة العاطفية من المكالمة نشطة\n• السهولة — "فقط رد باسم ورقم" يُزيل كل احتكاك\n• المعاملة بالمثل الاجتماعية — إرسال واتساب مدروس مع رابط الريفيرال يبدو كاستمرار صداقة، لا متابعة مبيعات\n• المكافأة المرئية — تضمين الجائزة/المكافأة مرةً أخرى في واتساب يُعيد إشعال الدافعية دون مكالمة جديدة',
        text_zh:'挂完电话后，家长的行动窗口很短——通常只有15-30分钟，之后推荐意愿就会迅速消退。在这个窗口内发出微信跟进至关重要。核心心理原则：\n\n• 即时性——趁着通话带来的情绪热度还在，消息就到了\n• 零门槛——"回复一个名字和号码就好"，把所有阻力降到最低\n• 社交互惠——一条带推荐链接的贴心微信，感觉像延续友谊，不像销售跟进\n• 视觉化奖励——在微信里再次展示奖励/礼品，不需要打新电话就能重新点燃家长的积极性' },
      { icon:'⏱️', label:'Best Timing', label_ar:'أفضل توقيت', list:true,
        items:[
          'Send within 5 minutes of ending the call — action window is narrowest here',
          'For "I\'ll think about it" responses: follow up the next day at the same time (same availability window)',
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
        ],
        items_zh:[
          '挂电话后5分钟内发送——这是行动窗口最窄的时刻',
          '回复"考虑一下"的家长：第二天同一时间跟进（同样的可用时间段）',
          '已承诺推荐但还未提交的：初次承诺后24小时和48小时各跟进一次',
          '广泛渠道分享：发出群组模板后24小时跟进，确认是否已分享',
          '正式/学术型家长避免周末联系；亲切型家长任何时间都可以'
        ]},
      { icon:'📊', label:'Customer Indicators', label_ar:'مؤشرات العميل', list:true,
        items:[
          'Said "God willing" or "I\'ll think about it" during call — needs a warm reminder, not a push',
          'Promised to ask a specific person — follow up with: "Did you speak with her?"',
          'High engagement during call but slow WhatsApp responder — use voice note instead of text',
          'Already shared a link to a group — follow up: "Did anyone show interest? Send me their number"',
          'Gave numbers but hasn\'t confirmed they were contacted yet — check in: "We\'ve reached out to them and will keep you posted"'
        ],
        items_ar:[
          'قال "إن شاء الله" أو "رح أفكر" خلال المكالمة — يحتاج تذكيراً دافئاً لا ضغطاً',
          'وعد بسؤال شخص محدد — تابع بـ: "هل حكيتي معها؟"',
          'تفاعل عالٍ خلال المكالمة لكن بطيء في الرد على واتساب — استخدم رسالة صوتية بدل النص',
          'شارك الرابط بالفعل في مجموعة — تابع: "في أحد اهتم؟ بعثيلي رقمه"',
          'أعطى أرقاماً لكن لم يُؤكد التواصل معهم بعد — تحقق: "تواصلنا معهم وبنحكم"'
        ],
        items_zh:[
          '通话中说了"再想想"或"到时候说"——需要温和提醒，不是催促',
          '承诺要问某个具体的人——跟进："问了吗？"',
          '通话时很热情但微信回复慢——用语音消息代替文字',
          '已经把链接分享到群里——跟进："有人感兴趣吗？把号码发给我"',
          '给了号码但还没确认是否联系过——确认："我们已经联系了，会告诉你进展的"'
        ]},
      { icon:'🔄', label:'Conversation Flow', label_ar:'تدفق المحادثة', list:false,
        text:'IMMEDIATE POST-CALL Template (within 5 min):\n→ Send: referral link + reward reminder + action ask\n\n24H FOLLOW-UP for "I\'ll think about it":\n→ Soft check-in: "Hey [Name] how are you 🌸 Did you think of anyone who could benefit?"\n→ Attach: referral link again\n\n48H FOLLOW-UP for uncommitted:\n→ "By the way, I have one VIP seat left — if anyone comes to mind, send me the number before it\'s gone"\n→ [Scarcity trigger if customer is Alaa-type]\n\nREWARD REMINDER (for gamification customers):\n→ "Remember you\'ve reached [X] referrals — after [Y] you get [prize] 🎁"\n\nVOICE MESSAGE OPTION:\n→ Record a short 15-second personal voice note: "Hey [Name], I sent you the program link — any number you send me, I\'ll follow up 🌸"',
        text_ar:'قالب ما بعد المكالمة الفوري (في غضون 5 دقائق):\n→ أرسل: رابط الريفيرال + تذكير المكافأة + طلب الإجراء\n\nمتابعة 24 ساعة لـ"رح أفكر":\n→ تحقق لطيف: "هاي [اسم] كيف حالك 🌸 تذكرتي أحد ممكن يستفيد؟"\n→ أرفق: رابط الريفيرال مرةً أخرى\n\nمتابعة 48 ساعة لغير الملتزمين:\n→ "بالمناسبة عندي مقعد VIP بقي — لو في أحد في بالك ابعثيلي الرقم قبل ما يخلص"\n→ [مُحفّز الشُح إذا كان العميل من نوع Alaa]\n\nتذكير المكافأة (لعملاء التلعيب):\n→ "تذكري إنك وصلتِ [X] ريفيرالات — بعد [Y] بتاخذي [جائزة] 🎁"\n\nخيار الرسالة الصوتية:\n→ سجّل رسالة صوتية شخصية قصيرة 15 ثانية: "هاي يا [اسم]، بعثلك رابط البرنامج — أي رقم ترسليه إلي أنا أتابع 🌸"',
        text_zh:'挂电话后立即发送模板（5分钟内）：\n→ 发送：推荐链接 + 奖励提醒 + 行动引导\n\n针对"考虑一下"的24小时跟进：\n→ 轻柔问候："嗨[姓名]，最近好吗 🌸 想到有谁可能感兴趣了吗？"\n→ 附上：推荐链接（再次）\n\n针对未承诺家长的48小时跟进：\n→ "顺便说一句，这周还有一个VIP名额——如果有合适的人，把号码发我，别等名额满了"\n→ [适用于Alaa类型家长的稀缺性触发]\n\n奖励进度提醒（游戏化家长）：\n→ "你已经推荐了[X]个——再[Y]个就可以得到[奖励] 🎁"\n\n语音消息选项：\n→ 录一段15秒的个人语音："嗨[姓名]，给你发了项目链接——随时把号码发给我，我来跟进 🌸"' },
      { icon:'🔁', label:'Common Patterns', label_ar:'الأنماط الشائعة', list:true,
        items:[
          'Approach 1 (Success Mentor): "I sent you the platform intro video + session access guide ✨ and here is the referral program link 🎁"',
          'Approach 2 (VIP): "This is the referral program link 🎁 Anyone who registers through you gets free sessions or cashback"',
          'Approach 3 (Friendly): "My dear, here is your personal link 🌸 Anyone who registers through it gets sessions added to you — send me the numbers and I\'ll follow up"',
          'Renewal: "Remember you can renew for free with your current referrals — the link is here [link]"',
          'Gamification (Yara): "You\'ve reached [X] out of [Y] — [prize] is close 🔥 Who\'s next?"'
        ],
        items_ar:[
          'النهج 1 (مرشد النجاح): "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨ وهاد رابط برنامج الترشيحات 🎁"',
          'النهج 2 (VIP): "هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك"',
          'النهج 3 (الودّي): "يا عمري هاد رابطك الخاص 🌸 أي شخص يسجل منه بضيف لك حصص — ابعثيلي الأرقام وأنا أتابع"',
          'التجديد: "تذكري إنك قدرتي تجددي مجانًا بالريفيرالات اللي عندك — الرابط هنا [رابط]"',
          'التلعيب (يارا): "وصلتِ [X] من أصل [Y] — [الجائزة] قريب 🔥 مين الجايي؟"'
        ],
        items_zh:[
          '话术1（成功导师型）："给大家发了平台介绍视频 + 上课说明 ✨ 还有这个推荐计划链接 🎁"',
          '话术2（VIP型）："这是推荐计划链接 🎁 通过你推荐成功注册的，可以获得免费课时或现金返还"',
          '话术3（亲切型）："亲爱的，这是你的专属链接 🌸 通过这个链接注册的，课时会自动加给你——把号码发给我，我来跟进"',
          '续费话术："记得哦，用手上的推荐可以免费续费——链接在这里 [链接]"',
          '游戏化话术（Yara式）："你完成了 [X] 个，还差 [Y] 个——[奖励] 快到了 🔥 下一个是谁？"'
        ]},
      { icon:'💡', label:'Referral Opportunities', label_ar:'فرص الريفيرال', list:false,
        text:'Complete WhatsApp Template Library:\n\nTEMPLATE 1 — After first call (Success Mentor):\n"Hello 🌟 I\'ve sent you:\n✅ Platform intro video\n✅ How to access sessions\n✅ Referral program link 🎁\nAnyone who registers through you gets free sessions or cashback. I\'m here for any questions 🙌"\n\nTEMPLATE 2 — After first call (VIP Seats):\n"Here is the referral program link 🎁\nAnyone who registers through you gets:\n🎁 Free sessions\n💰 Cashback\n🏆 Valuable prizes\nSend me the numbers and I\'ll follow up 🌟"\n\nTEMPLATE 3 — Friendly style:\n"My dear 🌸 here is your personal link — anyone who registers through it automatically gets you free sessions 💙\nSend me the numbers and I\'ll handle everything between us"\n\nTEMPLATE 4 — Renewal follow-up:\n"Remember you can renew for free again with your referrals 🔄\nDo you have anyone in mind? Send me the number and I\'ll follow up 🌟"\n\nTEMPLATE 5 — Gamification reminder (Yara):\n"You\'ve reached [X] referrals out of [Y] 🔥\n[Prize] is close — who\'s next? 🎁"\n\nTEMPLATE 6 — 24h soft re-engagement:\n"Hey [Name] how are you 🌸 Did you think of anyone who could benefit from the program?\nThe link is here [link] — send me anytime"\n\nTEMPLATE 7 — Scarcity follow-up (Alaa style):\n"By the way I have one VIP seat left this week ⚠️ If anyone comes to mind, send me the number before it\'s gone 🙏"\n\nTEMPLATE 8 — After customer talked to referral:\n"Hello 🌟 Send me her number and I\'ll follow up with her directly — she\'ll thank you for it 🌸"',
        text_ar:'مكتبة قوالب واتساب الكاملة:\n\nالقالب 1 — بعد المكالمة الأولى (مرشد النجاح):\n"أهلاً 🌟 أرسلت لكم:\n✅ فيديو شرح المنصة\n✅ طريقة الدخول للحصص\n✅ رابط برنامج الترشيحات 🎁\nأي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك. أنا موجود لأي سؤال 🙌"\n\nالقالب 2 — بعد المكالمة الأولى (مقاعد VIP):\n"هذا رابط برنامج الترشيحات 🎁\nأي شخص يسجل من طرفكم بتحصلوا على:\n🎁 حصص مجانية\n💰 كاش باك\n🏆 جوائز قيّمة\nابعثولي الأرقام وأنا أتابع 🌟"\n\nالقالب 3 — الأسلوب الودّي:\n"يا روحي 🌸 هاد رابطك الخاص — أي شخص يسجل منه بضيف لك حصص مجانية تلقائيًا 💙\nابعثيلي الأرقام وأنا أتابع كل شيء بيني وبينك"\n\nالقالب 4 — متابعة التجديد:\n"تذكري إنك قدرتِ تجددي مجانًا كمان مرة بالريفيرالات 🔄\nعندك أي شخص في بالك؟ ابعثيلي الرقم وأنا أتابع 🌟"\n\nالقالب 5 — تذكير التلعيب (يارا):\n"وصلتِ [X] ريفيرالات من أصل [Y] 🔥\n[الجائزة] قريبة — مين الجايي؟ 🎁"\n\nالقالب 6 — إعادة التفاعل اللطيف بعد 24 ساعة:\n"هاي [اسم] كيف حالك 🌸 تذكرتِ أحد ممكن يستفيد من البرنامج؟\nالرابط هنا [رابط] — أي وقت ابعثيلي"\n\nالقالب 7 — متابعة الشُح (أسلوب Alaa):\n"بالمناسبة عندي مقعد VIP بقي هالأسبوع ⚠️ لو في أحد في بالك ابعثيلي الرقم قبل ما يخلص 🙏"\n\nالقالب 8 — بعد أن تتحدث العميلة مع الإحالة:\n"أهلاً 🌟 ابعثيلي رقمها وأنا أتابع معها مباشرة — رح تشكريكِ 🌸"',
        text_zh:'完整微信消息模板库：\n\n模板1——通话后立即发送（成功导师型）：\n"您好 🌟 给您发了：\n✅ 平台介绍视频\n✅ 上课流程说明\n✅ 推荐计划链接 🎁\n通过您推荐成功注册的，都可以获得免费课时或现金返还。有任何问题随时找我 🙌"\n\n模板2——通话后立即发送（VIP名额型）：\n"这是推荐计划链接 🎁\n通过您推荐成功注册的，可以获得：\n🎁 免费课时\n💰 现金返还\n🏆 精美礼品\n把号码发给我，我来跟进 🌟"\n\n模板3——亲切型风格：\n"亲爱的 🌸 这是你的专属链接——通过这个链接注册的，课时会自动加给你 💙\n把号码发给我，我来帮你搞定一切"\n\n模板4——续费跟进：\n"记得哦，你还可以再次用推荐免费续费 🔄\n有合适的人吗？把号码发给我，我来跟进 🌟"\n\n模板5——游戏化进度提醒（Yara式）：\n"你已经完成了 [X] 个推荐 🔥\n[奖励] 快到了——下一个是谁？ 🎁"\n\n模板6——24小时温和再激活：\n"嗨[姓名]，最近好吗 🌸 有没有想到谁可能对这个项目感兴趣的？\n链接在这里 [链接]——随时发给我"\n\n模板7——稀缺性跟进（Alaa式）：\n"顺便说一句，这周还有一个VIP名额 ⚠️ 如果有合适的人，赶紧把号码发给我，名额有限 🙏"\n\n模板8——家长已跟朋友聊过之后：\n"太好了 🌟 把她的号码发给我，我直接跟进——她会感谢你的 🌸"' },
      { icon:'⚠️', label:'Objection Indicators', label_ar:'مؤشرات الاعتراض', list:false,
        text:'No reply after 24h:\n→ Send once more with different angle (reward or scarcity, depending on customer type)\n→ If still no reply after 48h — stop. Don\'t spam.\n\n"My friend hasn\'t replied yet."\n→ "No problem, let her take her time — if she\'s interested I\'m here. Send me her number and I\'ll reach out to her gently."\n\n"I haven\'t spoken with her yet."\n→ "That\'s fine — whenever you speak with her, send me the number. I\'m always here 🌸"\n\n"What is this link?" (customer doesn\'t recognize the program)\n→ Re-explain briefly in WhatsApp: "This is the referral program link we talked about — anyone who registers through it automatically gets you [reward]"',
        text_ar:'لا رد بعد 24 ساعة:\n→ أرسل مرةً أخرى بزاوية مختلفة (مكافأة أو شُح، حسب نوع العميل)\n→ إذا لا يزال بلا رد بعد 48 ساعة — توقف. لا تُرسل رسائل مزعجة.\n\n"ما رد على صاحبتي بعد"\n→ "عادي، خليها ترتاح — لو بدها أنا موجود. ابعثيلي رقمها وأنا أحكي معها برفق."\n\n"ما حكيت معها بعد"\n→ "تمام — أي وقت تحكي معها ابعثيلي. أنا موجودة دايمًا 🌸"\n\n"إيش الرابط هذا؟" (العميل لا يتعرف على البرنامج)\n→ اشرح باختصار عبر واتساب: "هاد رابط برنامج الترشيحات اللي حكينا عنه — أي شخص يسجل منه بيضاف لك [المكافأة] تلقائيًا"',
        text_zh:'24小时无回复：\n→ 换个角度再发一次（奖励或稀缺性，根据家长类型选择）\n→ 如果48小时后仍无回应——停止。不要刷屏骚扰。\n\n"朋友还没回我"\n→ "没关系，让她慢慢考虑——她需要的话我随时在。你把她号码发给我，我来轻松跟进。"\n\n"我还没跟她说"\n→ "没关系——什么时候方便聊了发给我就好。我一直在 🌸"\n\n"这个链接是什么？"（家长不记得项目了）\n→ 在微信里简单解释："这是我们聊过的推荐计划链接——通过这个链接注册的，[奖励]会自动加到你账户"' },
      { icon:'✅', label:'Successful Behaviors', label_ar:'السلوكيات الناجحة', list:true,
        items:[
          'Send within 5 minutes of ending the call — the action window closes fast',
          'Always include the referral link in the first message — never make her ask for it',
          'Personalize with the customer\'s name — never send a fully generic message',
          'For warm/friendly customers: add an emoji and a personal line, not just the template',
          'Gamification customers: include their current progress "You\'ve reached X out of Y"',
          'If no reply in 24h: send once more, different angle. After 48h silence — stop and note for future call.'
        ],
        items_ar:[
          'أرسل في غضون 5 دقائق من انتهاء المكالمة — نافذة الإجراء تُغلَق بسرعة',
          'دائماً ضمّن رابط الريفيرال في الرسالة الأولى — لا تجعله يطلبه',
          'خصّص باسم العميل — لا ترسل رسالة عامة تماماً',
          'للعملاء الدافئين/الودّيين: أضف رمزاً تعبيرياً وسطراً شخصياً، لا القالب فحسب',
          'عملاء التلعيب: ضمّن تقدمهم الحالي "وصلتِ X من أصل Y"',
          'إذا لا رد في 24 ساعة: أرسل مرةً أخرى، زاوية مختلفة. بعد 48 ساعة صمت — توقف وسجّل للمكالمة القادمة.'
        ],
        items_zh:[
          '挂电话后5分钟内发送——行动窗口关得很快',
          '第一条消息里就附上推荐链接——不要让家长主动问',
          '一定要带上家长的名字——不要发完全通用的消息',
          '亲切/温和型家长：加个表情包和一句贴心的话，不只是模板',
          '游戏化家长：带上当前进度"你已完成X个，共Y个"',
          '24小时无回复：换角度再发一次。48小时沉默——停下来，下次通话再记录跟进。'
        ]},
      { icon:'📝', label:'Notes & Insights', label_ar:'ملاحظات وأفكار', list:true,
        items:[
          '🛑 Approach 1 WhatsApp (from service-calls, Success Mentor):\n"I\'ll send you all the details on WhatsApp." → [sends] "I\'ve sent you the platform intro video + session access guide ✨ and here is the referral program link 🎁 Anyone who registers through you gets free sessions or cashback."',
          '🛑 Approach 2 WhatsApp (from service-calls, VIP Seats):\n"This is the referral program link 🎁 Anyone who registers through you gets free sessions or cashback."',
          '🛑 Approach 3 WhatsApp (from service-calls, Friendly):\n"My dear, anything you need I\'m here." + [separate message] "Here is your program link — send me any number and I\'ll follow up 🌸"',
          '🛑 B-customer WhatsApp (pre-payment, from b-customer section):\n"Congratulations on registering 🎉 I\'ll send you the prize link now — anyone who registers through you, you get [prize] for free."',
          '🛑 Cashback WhatsApp (from inc-cashback section):\n"If you have anyone in your circle looking for an educational platform, send me their number and I\'ll follow up — and both of you get [amount] cashback 💰"'
        ],
        items_ar:[
          '🛑 واتساب النهج 1 (من مكالمات الخدمة، مرشد النجاح):\n"رح أرسل لك كل التفاصيل على الواتساب." → [يرسل] "أرسلت لكم فيديو شرح المنصة + طريقة الدخول للحصص ✨ وهذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          '🛑 واتساب النهج 2 (من مكالمات الخدمة، مقاعد VIP):\n"هذا رابط برنامج الترشيحات 🎁 أي شخص يسجل من طرفكم بتحصلوا على حصص مجانية أو كاش باك."',
          '🛑 واتساب النهج 3 (من مكالمات الخدمة، الودّي):\n"يا عمري أي شيء تحتاجيه أنا موجودة." + [رسالة منفصلة] "هاد رابطك على البرنامج — ابعثيلي أي رقم وأنا أتابع 🌸"',
          '🛑 واتساب B-customer (قبل الدفع، من قسم b-customer):\n"ألف مبروك على التسجيل 🎉 رح أبعثلك رابط الجائزة هلق — أي شخص يسجل من طرفك بتاخذي [جائزة] مجانًا."',
          '🛑 واتساب الكاشباك (من قسم inc-cashback):\n"إذا كان في أحد من معارفك يبحث عن منصة تعليمية، ابعثيلي رقمه وأنا أتابع — وبتحصلوا أنتوا وهم على [مبلغ] كاش باك 💰"'
        ],
        items_zh:[
          '🛑 话术1微信（来自服务通话，成功导师型）：\n"我来把所有细节发给你到微信。" → [发送] "给您发了平台介绍视频 + 上课流程说明 ✨ 这是推荐计划链接 🎁 通过您推荐成功注册的，可以获得免费课时或现金返还。"',
          '🛑 话术2微信（来自服务通话，VIP名额型）：\n"这是推荐计划链接 🎁 通过您推荐成功注册的，可以获得免费课时或现金返还。"',
          '🛑 话术3微信（来自服务通话，亲切型）：\n"亲爱的，有什么需要我一直在。" + [另一条消息] "这是你的项目专属链接——把任何号码发给我，我来跟进 🌸"',
          '🛑 B类客户微信（付款前，来自b-customer板块）：\n"恭喜注册成功 🎉 马上给你发奖励链接——通过你推荐成功注册的，可以免费获得[奖励]。"',
          '🛑 现金返还微信（来自inc-cashback板块）：\n"如果你有朋友在找学习平台，把号码发给我我来跟进——你们双方都可以获得[金额]现金返还 💰"'
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
      if (pageId) {
        const cat = CATS.find(c => c.id === secId);
        track('category_click', { category_id: secId, category_name: cat ? catTitle(cat) : secId, source: 'home_grid' });
        switchPage(pageId);
        setTimeout(() => goTo(secId), 50);
      }
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
  // Update URL hash so GA4 sees distinct pages
  const hash = pageId === 'home' ? '' : '#' + pageId;
  history.pushState({ pageId }, '', location.pathname + location.search + hash);

  // Analytics: virtual page view (GA4 recommended SPA pattern)
  const stage = STAGES.find(s => s.pageId === pageId);
  const pageTitle = pageId === 'home' ? 'Home'
    : stage ? (ar() ? stage.key_ar : zh() ? stage.key_zh : stage.key) : pageId;
  const pagePath = pageId === 'home' ? '/' : '/' + pageId;
  if (typeof gtag === 'function') {
    gtag('config', 'G-94LX4JF4L3', {
      page_title: pageTitle,
      page_path: pagePath,
      page_location: location.origin + pagePath
    });
  }
  if (stage) track('stage_navigate', { stage_id: pageId, stage_name: pageTitle, stage_num: stage.num });
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
    const cat = CATS.find(c => c.id === secId);
    track('nav_click', { section_id: secId, section_name: cat ? catTitle(cat) : secId, source: 'sidebar' });
    switchPage(pageId);
    setTimeout(() => goTo(secId), 50);
  }
});

function setupScrollTracking() {
  const ids = ['home', ...CATS.map(c => c.id)];
  const viewedSections = new Set();
  const setActive = id => {
    qsa('[data-section]').forEach(el =>
      el.classList.toggle('active', el.dataset.section === id)
    );
    // Highlight parent group trigger when a child section is active
    qsa('.tn-trigger').forEach(btn => {
      const drop = btn.nextElementSibling;
      btn.classList.toggle('active', !!(drop && drop.querySelector('.tn-item.active')));
    });
    // Track first-time section view + update URL sub-path
    if (id && id !== 'home' && !viewedSections.has(id)) {
      viewedSections.add(id);
      const cat = CATS.find(c => c.id === id);
      if (cat) {
        const sectionPath = '/' + (sectionPageMap[id] || activePage) + '/' + id;
        const sectionTitle = catTitle(cat) + ' — ' + catGroup(cat);
        history.replaceState({ pageId: activePage, sectionId: id }, '', location.pathname + location.search + '#' + activePage + '/' + id);
        if (typeof gtag === 'function') {
          gtag('config', 'G-94LX4JF4L3', {
            page_title: sectionTitle,
            page_path: sectionPath,
            page_location: location.origin + sectionPath
          });
        }
        track('section_view', { section_id: id, section_name: catTitle(cat), section_group: catGroup(cat) });
      }
    }
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
  let searchTimer;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    clearTimeout(searchTimer);
    if (q.length >= 2) searchTimer = setTimeout(() => track('search', { search_term: q }), 600);
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
        const q = input.value.trim();
        input.value = ''; clear.classList.remove('show'); drop.classList.remove('show');
        const secId  = item.dataset.id;
        const cat = CATS.find(c => c.id === secId);
        track('search_result_click', { search_term: q, result_id: secId, result_name: cat ? catTitle(cat) : secId });
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
    track('language_change', { language: currentLang });
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
    track('theme_change', { theme: next });
  });
}

// ── Mobile Sidebar ───────────────────────────────────────────────
function setupMobile() {
  const btn = $('menuBtn'), sb = $('sidebar'), ov = $('overlay');
  btn.addEventListener('click', () => {
    const open = sb.classList.toggle('open');
    btn.classList.toggle('open', open);
    ov.classList.toggle('on', open);
    if (open) track('sidebar_open', { page: activePage });
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
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    track('back_to_top', { page: activePage });
  });
}

// ── Progress Bar ─────────────────────────────────────────────────
function setupProgress() {
  const bar = $('progressBar');
  const depthHits = new Set();
  const milestones = [25, 50, 75, 90];
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
    bar.style.width = `${pct}%`;
    milestones.forEach(m => {
      if (pct >= m && !depthHits.has(m)) {
        depthHits.add(m);
        track('scroll_depth', { depth: m + '%', page: activePage });
      }
    });
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

// Handle browser back/forward navigation
window.addEventListener('popstate', e => {
  const state = e.state;
  if (state?.pageId) {
    activePage = state.pageId;
    qsa('.page-view').forEach(p => p.classList.toggle('active', p.id === state.pageId));
    qsa('.tn-trigger[data-page]').forEach(btn => btn.classList.toggle('active', btn.dataset.page === state.pageId));
    qs('.sb-home')?.classList.toggle('active', state.pageId === 'home');
    qsa('.stage-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.page === state.pageId));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
});
