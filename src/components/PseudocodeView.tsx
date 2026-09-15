import React, { useState } from 'react';
import { 
  FileCode2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Layers, 
  Calculator,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export const PseudocodeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pseudocode' | 'correctness'>('pseudocode');
  const [selectedAlgo, setSelectedAlgo] = useState<'both' | 'dijkstra' | 'astar'>('both');

  const dijkstraCode = `Algorithm Dijkstra(Graph G, Node start, Node target):
  // 1. التهيئة الأولية: المسافات باللانهاية وأسلاف العقد فارغة
  FOR each node v in G.vertices():
    dist[v] = INFINITY
    parent[v] = NIL
  dist[start] = 0

  // 2. إنشاء طابور الأولوية الأصغري وإدراج نقطة البداية
  PQ = MinPriorityQueue()
  PQ.insert(start, priority=0)
  visited = empty set

  // 3. حلقة البحث الرئيسية
  WHILE not PQ.isEmpty():
    u = PQ.extractMin()
    IF u == target:
      RETURN ReconstructPath(parent, target)
    visited.add(u)

    // 4. استرخاء الحواف للجيران المباشرين (Edge Relaxation)
    FOR each neighbor v of u with weight w(u, v):
      IF v not in visited:
        tentative_dist = dist[u] + w(u, v)
        IF tentative_dist < dist[v]:
          dist[v] = tentative_dist
          parent[v] = u
          PQ.decreaseKeyOrInsert(v, priority=tentative_dist)

  RETURN NO_PATH_FOUND`;

  const astarCode = `Algorithm AStar(Graph G, Node start, Node target, Function h):
  // 1. التهيئة: gScore المسافة الفعلية، fScore التكلفة المقدرة الكلية
  FOR each node v in G.vertices():
    gScore[v] = INFINITY
    fScore[v] = INFINITY
    parent[v] = NIL
  
  gScore[start] = 0
  fScore[start] = h(start, target) // f(start) = 0 + h(start)

  // 2. إدراج البداية في المجموعة المفتوحة مرتبة وفق f(n)
  openSet = MinPriorityQueue()
  openSet.insert(start, priority=fScore[start])
  closedSet = empty set

  // 3. حلقة الاستكشاف الموجهة
  WHILE not openSet.isEmpty():
    current = openSet.extractMin() // العقدة ذات أدنى f(n)
    IF current == target:
      RETURN ReconstructPath(parent, target)
    closedSet.add(current)

    // 4. فحص الجيران وتحديث دالة التقييم f(n) = g(n) + h(n)
    FOR each neighbor in G.neighbors(current):
      IF neighbor in closedSet:
        CONTINUE
      tentative_g = gScore[current] + weight(current, neighbor)
      IF tentative_g < gScore[neighbor]:
        parent[neighbor] = current
        gScore[neighbor] = tentative_g
        fScore[neighbor] = tentative_g + h(neighbor, target)
        openSet.decreaseKeyOrInsert(neighbor, priority=fScore[neighbor])

  RETURN NO_PATH_FOUND`;

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <FileCode2 className="w-4 h-4" />
              <span>المتطلب 2 و 3: الكود الوصفي (Pseudocode) وتحليل الصحة الرياضية (Correctness Analysis)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              الكود الوصفي والبراهين الرياضية للأمثلية
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              صياغة قياسية عالية الوضوح مع البرهان الرياضي بالاستقراء ونظرية دالة الـ Heuristic المقبولة.
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('pseudocode')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'pseudocode'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              الكود الوصفي (Pseudocode)
            </button>
            <button
              onClick={() => setActiveTab('correctness')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'correctness'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              تحليل وإثبات الصحة (Correctness)
            </button>
          </div>
        </div>

        {/* View 1: Pseudocode */}
        {activeTab === 'pseudocode' && (
          <div className="space-y-6">
            
            {/* Algorithm selector pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">عرض:</span>
              <button
                onClick={() => setSelectedAlgo('both')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  selectedAlgo === 'both' ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-800 text-slate-400'
                }`}
              >
                مقارنة متجاورة لكلا الخوارزميتين
              </button>
              <button
                onClick={() => setSelectedAlgo('dijkstra')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  selectedAlgo === 'dijkstra' ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-800 text-slate-400'
                }`}
              >
                Dijkstra فقط
              </button>
              <button
                onClick={() => setSelectedAlgo('astar')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  selectedAlgo === 'astar' ? 'bg-amber-600 border-amber-500 text-white' : 'border-slate-800 text-slate-400'
                }`}
              >
                A* فقط
              </button>
            </div>

            {/* Pseudocode Blocks Grid */}
            <div className={`grid gap-6 ${selectedAlgo === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              
              {/* Dijkstra Block */}
              {(selectedAlgo === 'both' || selectedAlgo === 'dijkstra') && (
                <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <h3 className="font-bold text-white text-sm">خوارزمية ديكسترا (Dijkstra Pseudocode)</h3>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      O((V + E) log V)
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950/60 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed" dir="ltr">
                    <pre className="text-emerald-400/90">
                      {dijkstraCode}
                    </pre>
                  </div>

                  <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                    <div className="font-bold text-emerald-400 mb-1">نقاط التصميم الجوهرية:</div>
                    <div>• يعتمد ترتيب طابور الأولوية حصراً على أقل مسافة متراكمة مؤكدة dist[u].</div>
                    <div>• استرخاء الحواف يضمن تحديث المسافة عند اكتشاف مسار بديل أقل تكلفة.</div>
                    <div>• لا تملك أي توجيه مسبق باتجاه الهدف (Uninformed Search).</div>
                  </div>
                </div>
              )}

              {/* A* Block */}
              {(selectedAlgo === 'both' || selectedAlgo === 'astar') && (
                <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl">
                  <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <h3 className="font-bold text-white text-sm">خوارزمية إيه ستار (A* Pseudocode)</h3>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      f(n) = g(n) + h(n)
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950/60 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed" dir="ltr">
                    <pre className="text-amber-400/90">
                      {astarCode}
                    </pre>
                  </div>

                  <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                    <div className="font-bold text-amber-400 mb-1">نقاط التصميم الجوهرية:</div>
                    <div>• دالة التقييم f(n) تجمع بين التكلفة الفعلية g(n) والتقدير المتبقي h(n).</div>
                    <div>• طابور الأولوية يرتب العقد وفق f(n)، ما يوجه رأس البحث مباشرة نحو الهدف.</div>
                    <div>• تمنع المجموعة المغلقة Closed Set إعادة فحص العقد المستقرة نهائياً.</div>
                  </div>
                </div>
              )}

            </div>

            {/* Formula Explanation Callout */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>التشريح الرياضي لدالة التقييم في خوارزمية A*: f(n) = g(n) + h(n)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-amber-400 font-mono text-lg font-bold mb-1">g(n)</div>
                  <div className="text-xs font-bold text-slate-200 mb-1">التكلفة الفعلية المؤكدة (Exact Cost)</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    مجموع أوزان الحواف الحقيقية المقطوعة من نقطة الانطلاق (Start) حتى العقدة الحالية n. تحسب بدقة تامة وبلا أي تخمين.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-indigo-400 font-mono text-lg font-bold mb-1">h(n)</div>
                  <div className="text-xs font-bold text-slate-200 mb-1">الدالة التقديرية (Heuristic Function)</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    تقدير المسافة أو التكلفة المتبقية من العقدة n إلى الوجهة (Target). في شبكات الطرق نستخدم المسافة الإقليدية المستوية كخط مستقيم.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-emerald-400 font-mono text-lg font-bold mb-1">f(n)</div>
                  <div className="text-xs font-bold text-slate-200 mb-1">التكلفة الإجمالية المتوقعة (Total Score)</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    حاصل جمع g(n) + h(n)، وهو المعيار الوحيد الذي يحدد أولوية سحب العقدة التالية من طابور الأولوية (Min-Heap).
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* View 2: Correctness Analysis */}
        {activeTab === 'correctness' && (
          <div className="space-y-6">
            
            {/* Correctness Intro Card */}
            <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <span>لماذا نحصل دائماً على الحل الصحيح والأمثل؟ (Why Correctness Holds)</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                في مادة تحليل وتصميم الخوارزميات، لا يُقبل إثبات صحة الخوارزمية بمجرد تشغيل أمثلة تجريبية. بل يتعين تقديم برهان رياضي محكم يثبت تحقق شرطي: 
                <strong> الانتهاء الحتمي (Termination)</strong> و <strong>الأمثلية القطعية (Optimality)</strong>.
              </p>
            </div>

            {/* Proof 1: Dijkstra Induction */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                    البرهان 1
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    إثبات صحة خوارزمية ديكسترا بالاستقراء الرياضي (Mathematical Induction)
                  </h3>
                </div>
                <span className="text-xs text-slate-400">الشرط: w(e) ≥ 0</span>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-400">الفرضية الاستقرائية (Loop Invariant):</strong>
                  <p className="mt-1">
                    لكل عقدة u تنضم إلى مجموعة العقد المستكشفة والمغلقة S، فإن القيمة المخزنة في dist[u] تساوي تماماً أقصر مسافة حقيقية δ(start, u) من نقطة البداية إلى u.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-400">أساس الاستقراء (Base Case):</strong>
                  <p className="mt-1">
                    في البداية، تحتوي المجموعة S على نقطة الانطلاق {`{start}`} فقط، حيث dist[start] = 0 = δ(start, start). هذا صحيح بديهياً لأن المسافة من النقطة إلى نفسها تساوي صفراً.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-400">خطوة الاستقراء والبرهان بالتناقض (Inductive Step & Contradiction):</strong>
                  <p className="mt-1">
                    لنفترض جدلاً أن العقدة u هي أول عقدة يتم استخراجها من طابور الأولوية وتملك مسافة غير مثلى: dist[u] &gt; δ(start, u).
                    إذاً، يجب أن يوجد مسار بديل خفي P* أقصر يصل إلى u. هذا المسار ينطلق من داخل S ثم يعبر حافة خارج S عبر عقدة x إلى y.
                    بما أن جميع أوزان الحواف غير سالبة (w ≥ 0)، فإن:
                    <br />
                    <span className="font-mono text-amber-400 block my-1.5 p-2 bg-slate-900 rounded" dir="ltr">
                      δ(start, u) = δ(start, y) + δ(y, u) ≥ δ(start, y) = dist[y] ≥ dist[u]
                    </span>
                    وهذا يقتضي أن δ(start, u) ≥ dist[u]، وهو تناقض صريح مع فرضية التناقض!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300">
                  <strong>الخلاصة الرياضية:</strong> يستحيل أن يوجد مسار خفي أقصر، وقرار ديكسترا الجشع (Greedy choice) قطعي وصحيح 100% بشرط عدم وجود أوزان سالبة.
                </div>
              </div>
            </div>

            {/* Proof 2: A* Admissibility */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                    البرهان 2
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    إثبات صحة خوارزمية A* عبر شرط القبول (Admissibility & Consistency)
                  </h3>
                </div>
                <span className="text-xs text-slate-400">h(n) ≤ h*(n)</span>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400">1. تعريف دالة الـ Heuristic المقبولة (Admissibility):</strong>
                  <p className="mt-1">
                    نقول عن الدالة التقديرية h(n) أنها مقبولة إذا كانت لا تبالغ أبداً في تقدير التكلفة الحقيقية الصغرى المتبقية h*(n) للوصول إلى الهدف:
                    <span className="font-mono text-amber-400 block my-1" dir="ltr">h(n) ≤ h*(n)  for all n ∈ V</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400">2. شرط الاتساق ومتباينة المثلث (Consistency / Monotonicity):</strong>
                  <p className="mt-1">
                    الدالة المتسقة تحقق متباينة المثلث: تقدير العقدة u لا يتجاوز تكلفة الانتقال c(u, v) مضافاً إليها تقدير الجار v:
                    <span className="font-mono text-amber-400 block my-1" dir="ltr">h(u) ≤ c(u, v) + h(v)</span>
                    هذا الشرط يضمن أن قيم f(n) على طول أي مسار غير متناقصة رتيباً، مما يمنع الحاجة لإعادة فتح العقد المغلقة.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <strong className="text-amber-400">3. برهان الأمثلية بالتناقض (Optimality Proof):</strong>
                  <p className="mt-1">
                    لنفترض أن خوارزمية A* اختارت هدفاً غير أمثل G2 بتكلفة f(G2) = g(G2) &gt; C* حيث C* هي تكلفة المسار الأمثل الحقيقي.
                    بما أن هناك مساراً أمثلاً واصلاً إلى الهدف المثالي G، فلا بد أن تكون هناك عقدة n على هذا المسار الأمثل متواجدة داخل طابور الأولوية (Open Set).
                    وفق شرط القبول:
                    <span className="font-mono text-indigo-400 block my-1.5 p-2 bg-slate-900 rounded" dir="ltr">
                      f(n) = g(n) + h(n) ≤ g(n) + h*(n) = C* &lt; f(G2)
                    </span>
                    بما أن f(n) &lt; f(G2)، فإن طابور الأولوية سيستخرج العقدة n حتماً قبل G2!
                    وهذا تناقض يثبت استحالة اختيار أي هدف غير أمثل.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300">
                  <strong>الخلاصة:</strong> المسافة الإقليدية الجغرافية (Straight-Line Euclidean Distance) مقبولة ومتسقة تماماً في شبكات الطرق، ما يجعل A* مثالية بنسبة 100%.
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
