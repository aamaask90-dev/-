import { SlideContent } from '../types';

export const ACADEMIC_PILLARS = [
  { id: 1, nameAr: 'تعريف المشكلة والنموذج', nameEn: 'Problem & Model', icon: 'Target' },
  { id: 2, nameAr: 'تصميم الخوارزميات', nameEn: 'Algorithm Design', icon: 'Cpu' },
  { id: 3, nameAr: 'الكود الوصفي', nameEn: 'Pseudocode', icon: 'FileCode2' },
  { id: 4, nameAr: 'تحليل الصحة والإثبات', nameEn: 'Correctness Analysis', icon: 'CheckCircle2' },
  { id: 5, nameAr: 'التعقيد النظري والحالات', nameEn: 'Theoretical Complexity & Cases', icon: 'Calculator' },
  { id: 6, nameAr: 'المحاكاة البصرية الحية', nameEn: 'Visual Simulation', icon: 'PlayCircle' },
  { id: 7, nameAr: 'التحليل التجريبي', nameEn: 'Experimental Analysis', icon: 'FlaskConical' },
  { id: 8, nameAr: 'معايير القياس', nameEn: 'Measurements', icon: 'Gauge' },
  { id: 9, nameAr: 'المقارنة النظرية والتجريبية', nameEn: 'Theory vs Experiment', icon: 'GitCompare' },
  { id: 10, nameAr: 'الخلاصة ومناقشة المشروع', nameEn: 'Conclusion & Report', icon: 'FileText' },
];

export const SLIDES_DATA: SlideContent[] = [
  // Slide 01: Cover & Student Information
  {
    id: 1,
    numberStr: "01",
    title: "الملاحة الذكية — Smart Navigation",
    subtitle: "A* Algorithm vs. Dijkstra Algorithm — مشروع مادة تحليل وتصميم الخوارزميات",
    pillar: "Problem & Model — تعريف المشكلة والنموذج",
    pillarNumber: 1,
    badge: "مشروع أكاديمي متكامل",
    keyPoints: [
      "دراسة مقارنة خوارزمية وتطبيقية شاملة بين بحث ديكسترا الشامل وبحث A* الاسترشادي.",
      "تطبيق حي على شبكات الملاحة الحضرية وتوجيه المركبات اللحظي (Smart GPS Routing).",
      "إعداد الطلاب: أبوبكر الخولاني | كريم السمان"
    ],
    metrics: [
      { label: "الخوارزميتان", value: "Dijkstra & A*", sublabel: "تنفيذ فعلي 100%" },
      { label: "أحجام الشبكات", value: "10 → 1000", sublabel: "عقدة حضرية مجربة" },
      { label: "الأمثلية", value: "100%", sublabel: "أقصر مسار قطعي" }
    ],
    diagramType: 'city-graph'
  },

  // Slide 02: Problem Definition
  {
    id: 2,
    numberStr: "02",
    title: "Problem Definition — تعريف المشكلة والمدخلات والمخرجات",
    subtitle: "صياغة مشكلة المسار الأقصر أحادي المصدر والوجهة (Single-Pair Shortest Path)",
    pillar: "Problem & Model — تعريف المشكلة والنموذج",
    pillarNumber: 1,
    badge: "المتطلب الأكاديمي 1",
    keyPoints: [
      "المشكلة: شبكة طرق ممثلة في شكل بيان مرجح، ويريد نظام الملاحة إيجاد أفضل مسار من نقطة البداية إلى الوجهة بأقل تكلفة أو زمن.",
      "المدخلات (Inputs): عقد التقاطعات (Nodes)، مقاطع الطرق (Edges)، أوزان المسافات/الزمن (Weights w ≥ 0)، نقطتا البداية (Start) والوجهة (Target).",
      "المخرجات (Outputs): تسلسل المسار النهائي (Final Route)، التكلفة الصغرى (Path Cost)، العقد المفحوصة (Explored Nodes)، وإحصائيات البحث (Search Statistics).",
      "الهدف الهندسي: تقليص زمن الاستجابة واستهلاك الذاكرة في أنظمة الملاحة اللحظية مع ضمان قطعية الوصول للحل الأمثل."
    ],
    diagramType: 'none'
  },

  // Slide 03: Problem Flow Pipeline
  {
    id: 3,
    numberStr: "03",
    title: "Problem Flow — مخطط التدفق البصري للملاحة",
    subtitle: "مسار معالجة طلب الملاحة من مدخلات المستخدم حتى المسار الأمثل النهائي",
    pillar: "Problem & Model — تعريف المشكلة والنموذج",
    pillarNumber: 1,
    badge: "مخطط التدفق",
    keyPoints: [
      "التسلسل البصري: USER ↓ START ↓ ROAD NETWORK ↓ DESTINATION ↓ SMART ROUTING ↓ BEST PATH.",
      "عزل المتغيرات: استخدام نفس الشبكة والمعطيات لكلا الخوارزميتين لضمان مقارنة علمية نزيهة وعادلة.",
      "محرك الحساب: معالجة طابور الأولوية (Priority Queue) واستخراج العقد ذات التكلفة المتوقعة الصغرى."
    ],
    diagramType: 'none'
  },

  // Slide 04: Digital Map & Road Network
  {
    id: 4,
    numberStr: "04",
    title: "Digital Map — الخريطة الرقمية وشبكة الطرق الموحدة",
    subtitle: "التمثيل البصري للبيئة الحضرية المستخدمة في كافة المقارنات والمحاكاة الحية",
    pillar: "Problem & Model — تعريف المشكلة والنموذج",
    pillarNumber: 1,
    badge: "الخريطة الموحدة للمشروع",
    keyPoints: [
      "نفس الخريطة، ونفس الإحداثيات الجغرافية، ونفس نقطتي البداية والنهاية مستخدمة في جميع اختبارات ديكسترا و A*.",
      "نقطة الانطلاق (Start): محطة الشحن الغربية (x:60, y:250).",
      "نقطة الوجهة (Target): المركز المالي الدولي (x:780, y:220).",
      "تنوع تصنيف الطرق: شوارع رئيسية، طرق سريعة (Highways)، ومسارات فرعية بأوزان موجبة."
    ],
    diagramType: 'city-graph'
  },

  // Slide 05: Graph Modeling & Formulation
  {
    id: 5,
    numberStr: "05",
    title: "Graph Model — النمذجة الرياضية للشبكة الحضرية",
    subtitle: "تحويل خريطة المدينة الواقعية إلى بيان مرجح وموجه G = (V, E, w)",
    pillar: "Problem & Model — تعريف المشكلة والنموذج",
    pillarNumber: 1,
    formula: "G = (V, E, w),  where  w: E → ℝ⁺",
    keyPoints: [
      "التقاطعات (Intersections) ← العقد (Nodes V): تمثل مفارق الطرق والمعالم الحضرية.",
      "الشوارع (Roads) ← الحواف (Edges E): تمثل مقاطع الطرق الرابطة بين التقاطعات.",
      "أوزان الطرق (Weights w): تمثل مسافة الطريق بالكيلومتر أو زمن العبور الفعلي بالدقائق (w ≥ 0 دائمًا).",
      "الإحداثيات المكانية (x, y): تتيح حساب المسافة الإقليدية المستقيمة لدعم دالة التوجيه Heuristic."
    ],
    diagramType: 'none'
  },

  // Slide 06: Algorithm Design: Dijkstra
  {
    id: 6,
    numberStr: "06",
    title: "Algorithm Design: Dijkstra — تصميم خوارزمية ديكسترا",
    subtitle: "البحث الشامل غير الموجه المعتمد على استرخاء الحواف وطابور الأولوية",
    pillar: "Algorithm Design — تصميم الخوارزميات",
    pillarNumber: 2,
    formula: "dist[v] = min(dist[v], dist[u] + w(u, v))",
    keyPoints: [
      "تصنيف الخوارزمية: بحث جشع شامل غير موجه (Uninformed Greedy Search).",
      "آلية العمل: Start ↓ اختيار أقل Distance ↓ استرخاء الحواف Relaxation ↓ تحديث المسافات ↓ اختيار العقدة التالية ↓ Destination ↓ أقصر مسار.",
      "هيكل البيانات المعتمد: طابور أولوية أصغري (Min-Heap Priority Queue) مرتب وفق المسافة المتراكمة dist[u].",
      "المحددات: تتوسع دائرياً في كل الاتجاهات دون بوصلة توجيه، فتفحص عقدًا تقع في الاتجاه المعاكس للهدف."
    ],
    diagramType: 'queue-flow'
  },

  // Slide 07: Dijkstra Pseudocode
  {
    id: 7,
    numberStr: "07",
    title: "Dijkstra Pseudocode — الكود الوصفي لخوارزمية ديكسترا",
    subtitle: "الصياغة الخوارزمية القياسية المتطابقة تمامًا مع الكود البرمجي الفعلي المنفذ",
    pillar: "Pseudocode — الكود الوصفي",
    pillarNumber: 3,
    badge: "مطابق للتنفيذ الفعلي",
    codeSnippet: {
      language: "pseudocode",
      code: `Algorithm Dijkstra(G, start, target):
  PQ = MinPriorityQueue() // مرتب وفق dist[u]
  dist[start] = 0; PQ.insert(start, 0)
  WHILE not PQ.isEmpty():
    u = PQ.extractMin()
    IF u == target: RETURN ReconstructPath(parent, target)
    IF visited[u]: CONTINUE
    visited[u] = true
    FOR each neighbor v of u with weight w(u, v):
      IF not visited[v] and dist[u] + w(u, v) < dist[v]:
        dist[v] = dist[u] + w(u, v)
        parent[v] = u
        PQ.insertOrUpdate(v, dist[v])`
    },
    keyPoints: [
      "مطابقة تامة: الكود الوصفي يمثل بدقة فئات MinHeap و solveDijkstra المنفذة داخل المشروع.",
      "إيقاف مبكر (Early Exit): تتوقف الخوارزمية فور استخراج عقدة الهدف من طابور الأولوية لتحقيق أفضل أداء ممكن."
    ],
    diagramType: 'none'
  },

  // Slide 08: Dijkstra Correctness Analysis
  {
    id: 8,
    numberStr: "08",
    title: "Correctness Analysis — تحليل وإثبات صحة خوارزمية ديكسترا",
    subtitle: "البرهان الرياضي المنطقي للأمثلية الحتمية والشرط الأساسي للأوزان",
    pillar: "Correctness Analysis — تحليل الصحة والإثبات",
    pillarNumber: 4,
    badge: "الإثبات المنطقي",
    keyPoints: [
      "المسار المنطقي: Non-negative Edge Weights ↓ اختيار أقل Distance ↓ لا توجد طريق أقصر لاحقًا بعد تثبيت العقدة ↓ Final Shortest Path.",
      "الشرط الأساسي: تتطلب ديكسترا أوزان حواف غير سالبة (w ≥ 0)؛ وإذا وُجدت أوزان سالبة فإن الخوارزمية لا تضمن الصحة وتفشل.",
      "الاستقراء الرياضي: كل عقدة تُضاف للمجموعة المغلقة تمتلك بالفعل أقصر مسار ممكن مثبت نهائيًا.",
      "برهان التناقض: لو وُجد مسار بديل أقصر يمر بعقدة في طابور الأولوية لكانت تلك العقدة قد استُخرجت أولاً لأن أوزان الحواف موجبة."
    ],
    diagramType: 'heuristic-triangle'
  },

  // Slide 09: Dijkstra Visual Simulation
  {
    id: 9,
    numberStr: "09",
    title: "Dijkstra Simulation — المحاكاة البصرية الحية لخوارزمية ديكسترا",
    subtitle: "تتبع موجة انتشار ديكسترا الدائرية وعرض العقد المستكشفة والتكلفة التراكمية",
    pillar: "Visual Simulation — المحاكاة البصرية الحية",
    pillarNumber: 6,
    badge: "محاكاة حية من المحرك الفعلي",
    keyPoints: [
      "موجة استكشاف دائرية منتظمة التكلفة (Uniform Cost Wave).",
      "القيم المعروضة فعلياً: Current Node، المسافة الحالية Distance، العقد المفحوصة Visited Nodes، وتكلفة المسار Path Cost.",
      "المسار الناتج فعليًا: Start → West Gate → Central Junction → Highway 10 → Financial Center بتكلفة 78.",
      "إحصائية: فحصت ديكسترا ما يقارب 85% من إجمالي عقد الشبكة الحضرية للوصول لنفس الهدف."
    ],
    diagramType: 'dijkstra-vs-astar'
  },

  // Slide 10: Algorithm Design: A*
  {
    id: 10,
    numberStr: "10",
    title: "Algorithm Design: A* — تصميم خوارزمية A* والبحث الاسترشادي",
    subtitle: "توجيه البحث نحو الهدف باستخدام دالة التقييم الشاملة f(n) = g(n) + h(n)",
    pillar: "Algorithm Design — تصميم الخوارزميات",
    pillarNumber: 2,
    formula: "f(n) = g(n) + h(n)",
    keyPoints: [
      "g(n) - التكلفة الفعلية المؤكدة (Actual Cost From Start): مجموع أوزان الطرق المقطوعة فعلياً من نقطة البداية حتى n.",
      "h(n) - التكلفة المقدرة للهدف (Estimated Cost To Goal): المسافة الإقليدية المستقيمة (Straight-Line Distance) من n إلى الوجهة.",
      "f(n) - التكلفة الكلية المتوقعة (Estimated Total Cost): معيار طابور الأولوية؛ سحب العقدة ذات أدنى f(n) دائمًا.",
      "التوجيه الذكي: يتم حصر فضاء البحث في مخروط ضيق متجه نحو الشرق، متجاهلاً التفرعات الغربية والشمالية البعيدة."
    ],
    diagramType: 'heuristic-triangle'
  },

  // Slide 11: A* Pseudocode
  {
    id: 11,
    numberStr: "11",
    title: "A* Pseudocode — الكود الوصفي لخوارزمية A*",
    subtitle: "الصياغة الخوارزمية القياسية المطابقة تمامًا للـ Implementation المنفذ داخل المشروع",
    pillar: "Pseudocode — الكود الوصفي",
    pillarNumber: 3,
    badge: "مطابق للتنفيذ الفعلي",
    codeSnippet: {
      language: "pseudocode",
      code: `Algorithm AStar(G, start, target, h):
  OpenSet = MinPriorityQueue() // مرتب وفق f(n) = g(n) + h(n)
  gScore[start] = 0; fScore[start] = h(start, target)
  OpenSet.insert(start, fScore[start])
  WHILE not OpenSet.isEmpty():
    u = OpenSet.extractMin()
    IF u == target: RETURN ReconstructPath(parent, target)
    closedSet.add(u)
    FOR each neighbor v of u with weight w(u, v):
      IF v in closedSet: CONTINUE
      tentative_g = gScore[u] + w(u, v)
      IF tentative_g < gScore[v]:
        parent[v] = u; gScore[v] = tentative_g
        fScore[v] = tentative_g + h(v, target)
        OpenSet.insertOrUpdate(v, fScore[v])`
    },
    keyPoints: [
      "مطابقة تامة: الكود الوصفي يمثل بدقة دالة solveAStar البرمجية المعتمدة على Min-Heap.",
      "تحديث العقد: إمكانية تحديث قيمة fScore للعقدة إذا وُجد مسار ذو gScore أقل قبل إغلاقها."
    ],
    diagramType: 'none'
  },

  // Slide 12: A* Correctness Analysis
  {
    id: 12,
    numberStr: "12",
    title: "Correctness Analysis — تحليل وإثبات صحة خوارزمية A*",
    subtitle: "شرط القبول (Admissibility) والاتساق (Consistency) لضمان الأمثلية الحتمية",
    pillar: "Correctness Analysis — تحليل الصحة والإثبات",
    pillarNumber: 4,
    badge: "الإثبات الرياضي للأمثلية",
    keyPoints: [
      "المسار المنطقي: Admissible Heuristic + Appropriate Search ↓ Optimal Path.",
      "شرط القبول الأساسي: h(n) ≤ h*(n) دائمًا؛ دالة التقدير لا تبالغ إطلاقًا في تقدير التكلفة الحقيقية المتبقية.",
      "المسافة الإقليدية في الملاحة: تعتبر دالة مقبولة قطعاً لأن أقصر مسافة هندسية بين نقطتين في المستوى هي الخط المستقيم.",
      "شرط الاتساق (Consistency / Triangle Inequality): h(u) ≤ c(u, v) + h(v) يضمن عدم تناقص f(n) وعدم الحاجة لإعادة فتح العقد المغلقة."
    ],
    diagramType: 'heuristic-triangle'
  },

  // Slide 13: A* Visual Simulation
  {
    id: 13,
    numberStr: "13",
    title: "A* Simulation — المحاكاة البصرية الحية لخوارزمية A*",
    subtitle: "ظهور قيم g(n) و h(n) و f(n) مباشرة على العقد أثناء خط سير البحث",
    pillar: "Visual Simulation — المحاكاة البصرية الحية",
    pillarNumber: 6,
    badge: "محاكاة حية من المحرك الفعلي",
    keyPoints: [
      "ظهور القيم الرياضية لحظياً على العقد: g(n) باللون البرتقالي، h(n) بالأزرق، و f(n) الكلية بالأخضر.",
      "توفير الجهد الحسابي: استكشاف 3 عقد فقط للوصول للهدف مقارنة بـ 10 عقد في ديكسترا.",
      "تطابق التكلفة الأمثل: الوصول للهدف بنفس التكلفة الصغرى القطعية (78 وحدة).",
      "سرعة الإنجاز: تقليص زمن التنفيذ بنسبة تتجاوز 70% على نفس شبكة المدينة."
    ],
    diagramType: 'dijkstra-vs-astar'
  },

  // Slide 14: Direct Visual Comparison
  {
    id: 14,
    numberStr: "14",
    title: "Comparison — المقارنة البصرية المباشرة: Dijkstra مقابل A*",
    subtitle: "مقارنة متزامنة على نفس الخريطة: فضاء البحث، العقد المستكشفة، والتكلفة الصغرى",
    pillar: "Theory vs Experiment — المقارنة النظرية والتجريبية",
    pillarNumber: 9,
    badge: "المقارنة الجوهرية",
    keyPoints: [
      "مساحة البحث (Search Area): ديكسترا تملأ دائرة عريضة غير موجهة | A* تحصر البحث في قطاع موجه نحو الشرق.",
      "العقد المستكشفة: ديكسترا فحصت 85% من الشبكة | A* اكتفت بفحص 25% من الشبكة فقط.",
      "تكلفة المسار وجودة الحل: متطابقة 100% (Cost = 78 لكلا الخوارزميتين).",
      "ملاحظة علمية هامة: تفوق A* يعتمد على جودة دالة Heuristic وكثافة الشبكة وطريقة التنفيذ البرمجي."
    ],
    diagramType: 'dijkstra-vs-astar'
  },

  // Slide 15: Theoretical Complexity
  {
    id: 15,
    numberStr: "15",
    title: "Theoretical Complexity — التعقيد النظري (Time & Space)",
    subtitle: "التحليل الحسابي الدقيق بدلالة V=Nodes و E=Edges باستخدام Min-Heap Priority Queue",
    pillar: "Theoretical Complexity & Cases — التعقيد النظري والحالات",
    pillarNumber: 5,
    formula: "Time: O((V + E) log V)  |  Space: O(V + E)",
    keyPoints: [
      "اعتمادية التنفيذ: التعقيد مشتق بدقة من هيكل البيانات المستخدم (Binary Min-Heap) وتمثيل Adjacency List.",
      "تعقيد الزمن لدكسترا: O((V + E) log V)؛ استخراج العقد يستغرق O(V log V) وتحديث الحواف يستغرق O(E log V).",
      "تعقيد الزمن لـ A*: Worst-Case O((V + E) log V) عندما يكون h(n) = 0 | Best-Case O(b* · d) مسار مستقيم.",
      "تعقيد المساحة (Space): O(V + E) لتخزين مصفوفات dist، parent، وطابور الأولوية وشبكة الحواف."
    ],
    diagramType: 'complexity-table'
  },

  // Slide 16: Best Case Scenario
  {
    id: 16,
    numberStr: "16",
    title: "Best Case Scenario — سيناريو الحالة الفضلى في الملاحة",
    subtitle: "مسار مباشر وشبه مستقيم نحو الهدف مع قلة التفرعات وإيقاف مبكر",
    pillar: "Theoretical Complexity & Cases — التعقيد النظري والحالات",
    pillarNumber: 5,
    badge: "سيناريو الحالة الفضلى",
    keyPoints: [
      "المعطيات: الهدف قريب جداً، مسار مستقيم شبه مباشر (Corridor Highway)، وعدد قليل جداً من العقد.",
      "سلوك A*: دالة التوجيه Heuristic توجه البحث مباشرة على طول الخط المستقيم دون فحص أي فروع جانبية.",
      "سلوك Dijkstra: بفضل استراتيجية التوقف المبكر (Early Exit)، تتوقف فور سحب الهدف دون الحاجة لبقية الشبكة.",
      "تنبيه علمي: نميز بدقة بين Best-Case Scenario في التجربة وبين التعقيد المقارب النظري (Asymptotic Big-O)."
    ],
    diagramType: 'none'
  },

  // Slide 17: Average Case Scenario
  {
    id: 17,
    numberStr: "17",
    title: "Average Case — سيناريو الحالة المتوسطة / النمطية",
    subtitle: "شبكة حضرية واقعية متعددة البدائل والمسارات المتنافسة",
    pillar: "Theoretical Complexity & Cases — التعقيد النظري والحالات",
    pillarNumber: 5,
    badge: "سيناريو الحالة المتوسطة",
    keyPoints: [
      "المعطيات: خريطة مدينة واقعية، تقاطعات متعددة، شوارع سريعة وأخرى بطيئة، ونقطتا بداية ونهاية غير متجاورتين.",
      "سلوك الخوارزميات: ديكسترا تتوسع بتماثل دائري عبر الأحياء؛ بينما تقلص A* عدد العقد المفحوصة بنسبة ~74%.",
      "التأصيل العلمي: Average-case behavior depends on the distribution and structure of the input graph.",
      "النتيجة: تقديم Typical Empirical Case واقعي مع الفصل الواضح بينه وبين التعقيد النظري البحت."
    ],
    diagramType: 'none'
  },

  // Slide 18: Worst Case Scenario
  {
    id: 18,
    numberStr: "18",
    title: "Worst Case Scenario — سيناريو الحالة الأسوأ في الملاحة",
    subtitle: "حاجز مسدود مضلل هندسيًا (Cul-de-Sac Barrier) وتفرعات كثيرة متقاربة التكلفة",
    pillar: "Theoretical Complexity & Cases — التعقيد النظري والحالات",
    pillarNumber: 5,
    badge: "سيناريو الحالة الأسوأ",
    keyPoints: [
      "التصميم الهندسي للحالة: حاجز جداري على شكل U-barrier؛ المسافة الإقليدية المستقيمة تسحب A* إلى شارع مسدود!",
      "بالنسبة إلى A*: تضطر لفحص كل عقد الفخ المسدود قبل أن تدرك ضرورة الالتفاف شمالاً حول الحاجز (مع بقاء h مقبولة).",
      "بالنسبة إلى Dijkstra: وجود تفرعات كثيرة ذات تكاليف متقاربة وصغيرة يجبرها على استكشاف فضاء ضخم جداً قبل بلوغ الهدف.",
      "الدرس الأكاديمي: انخفاض كفاءة A* عند ضعف دلالة الـ Heuristic أو تعارض المعالم الجغرافية مع المسافة المستقيمة."
    ],
    diagramType: 'none'
  },

  // Slide 19: Best vs Average vs Worst Comparison
  {
    id: 19,
    numberStr: "19",
    title: "Scenarios Comparison — المقارنة البصرية الشاملة بين الحالات الثلاث",
    subtitle: "مقارنة حية: Best Case (بحث صغير) ← Average (بحث متوسط) ← Worst (بحث واسع)",
    pillar: "Theoretical Complexity & Cases — التعقيد النظري والحالات",
    pillarNumber: 5,
    badge: "مقارنة الحالات الثلاث",
    keyPoints: [
      "Best Case: فحص 4 عقد فقط، زمن شبه لحظي (<0.02ms)، وأقصر مسار مباشر.",
      "Average Case: فحص 3 عقد في A* مقابل 10 في ديكسترا، تسريع 4x، وتوفير ملحوظ في الذاكرة.",
      "Worst Case: اتساع فضاء البحث وفحص 10-12 عقدة مع اضطرار A* للالتفاف الكامل حول الحاجز المسدود.",
      "الخلاصة: الأداء العملي يتأثر مباشرة بطوبولوجيا الشبكة وهندسة الحواجز ومدى دقة دالة التوجيه."
    ],
    diagramType: 'none'
  },

  // Slide 20: Simulation Engine & Interactive Controls
  {
    id: 20,
    numberStr: "20",
    title: "Simulation Engine — محرك المحاكاة التفاعلي وأدوات التحكم",
    subtitle: "إمكانية ضبط المدخلات والتحكم التفاعلي بالخطوات (Run, Step, Pause, Reset)",
    pillar: "Visual Simulation — المحاكاة البصرية الحية",
    pillarNumber: 6,
    badge: "محرك تفاعلي كامل",
    keyPoints: [
      "أدوات التحكم الكاملة: أزرار التشغيل التلقائي (RUN)، الخطوة الواحدة (STEP)، الإيقاف المؤقت (PAUSE)، وإعادة التعيين (RESET).",
      "تعديل المدخلات: إمكانية تغيير نقطة البداية (Start) ونقطة الوجهة (Target) واختيار الخوارزمية المراد تشغيلها.",
      "إدارة الحواجز اللحظية (Dynamic Obstacles): النقر على أي طريق لإغلاقه ورؤية استجابة الخوارزمية لإعادة التوجيه (Rerouting).",
      "محرك حسابي فعلي: العقد المستكشفة والمسار وتحديثات المسافات ناتجة حصرًا عن خوارزميتي Dijkstra و A* الحقيقيتين."
    ],
    diagramType: 'steps-flow'
  },

  // Slide 21: Experimental Analysis: Multiple Input Sizes
  {
    id: 21,
    numberStr: "21",
    title: "Experimental Analysis — تجارب الأحجام المتدرجة (10 إلى 1000 عقدة)",
    subtitle: "مولد شبكات إجرائي فعلي يختبر 5 مستويات حجمية: 10 → 50 → 100 → 500 → 1000",
    pillar: "Experimental Analysis — التحليل التجريبي",
    pillarNumber: 7,
    badge: "تجارب برمجية حية",
    keyPoints: [
      "تطبيق حرفي لمتطلب الدكتور: اختبار أحجام متدرجة (10، 50، 100، 500، 1000 عقدة) عبر مولد إجرائي حقيقي.",
      "ضمان المقارنة العادلة (Fair Comparison): استخدام Seed ثابت (42) ونفس قواعد توليد الحواف وكثافتها لكلا الخوارزميتين.",
      "مختبر تجارب آلي: تشغيل تلقائي لـ Dijkstra ثم A*، وتسجيل أزمنة التنفيذ ومعدل فحص العقد واستهلاك الذاكرة.",
      "الملاحظة التجريبية: اتساع الفارق الأدائي لصالح A* باطراد مع تضاعف عدد عقد الشبكة."
    ],
    diagramType: 'benchmark-chart'
  },

  // Slide 22: Performance Measurements
  {
    id: 22,
    numberStr: "22",
    title: "Measurement — معايير القياس الخمسة وفق متطلبات المادة",
    subtitle: "التسجيل الدقيق لـ: Execution Time, Memory, Operations, Nodes, Solution Quality",
    pillar: "Measurements — معايير القياس",
    pillarNumber: 8,
    badge: "معايير قياس صارمة",
    keyPoints: [
      "1. Execution Time: مقاس بمؤقت عالي الدقة (performance.now()) من لحظة البدء حتى استخراج المسار النهائي.",
      "2. Memory Usage: مقاس منهجيًا لحجم هياكل البيانات (Sets, Maps, Priority Queue Footprint) دون أرقام وهمية.",
      "3. Number of Operations: عدادات فعلية لتوسيع العقد (Node Expansions)، استرخاء الحواف (Relaxations)، وعمليات الطابور (PQ Ops).",
      "4. Explored Nodes: عدد العقد التي أُضيفت للمجموعة المغلقة واستُخرجت من طابور الأولوية.",
      "5. Solution Quality: التحقق من نسبة الأمثلية المطلقة Cost(A*) / Cost(Dijkstra) = 1.0 (تطابق 100%)."
    ],
    metrics: [
      { label: "تسريع التنفيذ", value: "3.5x - 4.5x", sublabel: "أسرع لصالح A*" },
      { label: "توفير العقد", value: "~74%", sublabel: "أقل فحصًا للعقد" },
      { label: "جودة الحل", value: "100%", sublabel: "تطابق قطعي للأمثلية" }
    ],
    diagramType: 'none'
  },

  // Slide 23: Benchmark Charts & Result Visualization
  {
    id: 23,
    numberStr: "23",
    title: "Benchmark Charts — الرسوم البيانية المتدرجة للنتائج التجريبية",
    subtitle: "تمثيل بصري متدرج: الحجم مقابل الزمن، استهلاك الذاكرة، والعقد المفحوصة",
    pillar: "Measurements — معايير القياس",
    pillarNumber: 8,
    badge: "بيانات توضيحية وقياسية (Illustrative & Measured Data)",
    keyPoints: [
      "Chart 1 (Input Size vs Time): منحنى ديكسترا يتصاعد بمعدل أعلى بينما ينمو منحنى A* بهدوء وانسيابية.",
      "Chart 2 (Input Size vs Explored Nodes): ثبات نسبي لنسبة العقد المفحوصة في A* (~25%) مقابل 85% في ديكسترا.",
      "Chart 3 (Input Size vs Memory Footprint): انخفاض واضح في استهلاك الذاكرة لدى A* بفضل تقليص فضاء الطابور المفتوح.",
      "التوثيق العلمي: كافة المنحنيات مصحوبة بتسمية رسمية توضح أنها بيانات قياسية من بيئة التشغيل."
    ],
    diagramType: 'benchmark-chart'
  },

  // Slide 24: Theoretical vs Experimental Comparison
  {
    id: 24,
    numberStr: "24",
    title: "Theoretical vs Experimental — هل يتوافق السلوك العملي مع التعقيد النظري؟",
    subtitle: "تحليل علمي رصين يجيب مباشرة على المتطلب الأكاديمي الثامن للمادة",
    pillar: "Theory vs Experiment — المقارنة النظرية والتجريبية",
    pillarNumber: 9,
    badge: "المطابقة العلمية",
    keyPoints: [
      "توافق نمو التعقيد: يتوافق السلوك العملي لديكسترا مع المنحنى النظري O((V + E) log V) الناتج عن هيكل Min-Heap.",
      "فجوة الحالة المتوسطة لـ A*: أظهرت التجارب أن A* عملياً أفضل بكثير من أسوأ حالاتها النظرية بفضل تقليص معامل التفريع الحركي.",
      "إثبات شرط القبول تجريبياً: تطابق تكلفة المسار 100% بين الخوارزميتين يبرهن عملياً أن دالة المسافة الإقليدية Admissible قطعاً.",
      "الخلاصة: السلوك العملي متوافق تماماً مع التوقعات النظرية، مع إبراز تأثير بيئة تشغيل JavaScript وتوزيع كثافة الطرق."
    ],
    diagramType: 'none'
  },

  // Slide 25: Real Smart Navigation Application
  {
    id: 25,
    numberStr: "25",
    title: "Real Smart Navigation — التطبيق الواقعي وتوجيه المركبة الحي",
    subtitle: "ربط المشروع بنظم GPS الحديثة: الموقع الحالي، الوجهة، وسهم الملاحة المتحرك",
    pillar: "Visual Simulation — المحاكاة البصرية الحية",
    pillarNumber: 6,
    badge: "ملاحة حية تفاعلية",
    keyPoints: [
      "نظام ملاحة متكامل: محاكاة لمركبة ذكية تعرض الموقع الحالي (Current Location) والوجهة (Destination) وسهم الملاحة المتحرك.",
      "المسارات البديلة: مقارنة المسار الأقصر المعتمد مع مسارات فرعية بديلة متوفرة في الشبكة الحضرية.",
      "إعادة التوجيه التلقائي (Dynamic Rerouting): عند إغلاق أي طريق، يعيد محرك A* احتساب المسار في أجزاء من الميلي ثانية.",
      "محاكاة حركية: سهم الملاحة يتحرك انسيابياً على طول المسار الأمثل حتى الوصول النهائي للمركز المالي."
    ],
    diagramType: 'city-graph'
  },

  // Slide 26: Conclusion & Academic Defense
  {
    id: 26,
    numberStr: "26",
    title: "Conclusion — الخلاصة ومناقشة المشروع الأكاديمي",
    subtitle: "استيفاء المحاور الأكاديمية العشرة الإلزامية وجاهزية المشروع للتقييم والمناقشة",
    pillar: "Conclusion & Report — الخلاصة ومناقشة المشروع",
    pillarNumber: 10,
    badge: "خاتمة المشروع",
    keyPoints: [
      "استيفاء كامل للمتطلبات: Problem, Model, Algorithm, Pseudocode, Correctness, Complexity, Simulation, Experiments, Measurements, Comparison.",
      "التفوق التطبيقي لـ A*: خفض 74% في العقد المفحوصة وتسريع 4x مع ضمان الأمثلية المطلقة بنسبة 100%.",
      "الحالات الثلاث المحققة: Best Case (مسار مباشر وسريع)، Average Case (شبكة حضرية)، و Worst Case (حاجز مضلل).",
      "شكر وتقدير: نتقدم بالشكر الجزيل للدكتور ولجنة المناقشة الأكاديمية المحترمة — إعداد: أبوبكر الخولاني & كريم السمان."
    ],
    metrics: [
      { label: "المتطلبات المنجزة", value: "10 / 10", sublabel: "استيفاء أكاديمي كامل" },
      { label: "الشرائح الأكاديمية", value: "26", sublabel: "شاملة وعالية البصرية" },
      { label: "الأمثلية المحققة", value: "100%", sublabel: "أقصر مسار قطعي" }
    ],
    diagramType: 'none'
  }
];
