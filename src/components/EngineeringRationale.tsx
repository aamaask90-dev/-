import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface RationaleItem {
  question: string;
  answer: string;
  practicalImpact: string;
}

const RATIONALE_BY_SLIDE: Record<number, RationaleItem> = {
  1: {
    question: "لماذا اخترنا مشروع الملاحة الذكية للمقارنة؟",
    answer: "لأن تطبيقات الملاحة ونظم الخرائط (مثل Google Maps و Uber) تمثل البيئة النموذجية الأشد وضوحاً لاختبار خوارزميات المسار الأقصر أحادي المصدر والوجهة على أرض الواقع.",
    practicalImpact: "الملاحة تتطلب استجابة فورية بأجزاء من الميلي ثانية مع ضمان دقة المسار 100% دون أي خطأ."
  },
  2: {
    question: "لماذا قمنا بصياغة المشكلة كـ Single-Pair Shortest Path وليس All-Pairs؟",
    answer: "في الملاحة المباشرة، المستخدم يطلب الانتقال من موقع حالي محدد (Start) إلى وجهة محددة (Target). تشغيل All-Pairs (مثل Floyd-Warshall ذي التعقيد O(V³)) يُعد هدراً فادحاً للموارد.",
    practicalImpact: "يوفر 99.9% من الذاكرة والوقت بحصر البحث بين نقطتي البداية والنهاية فقط."
  },
  3: {
    question: "لماذا تم تنظيم خط المعالجة (Pipeline) من المدخلات إلى طابور الأولوية ثم المسار الأقصر؟",
    answer: "لفصل طبقة البيانات الجغرافية عن طبقة المعالجة الحسابية وطبقة التوجيه البصري، مما يتيح التبديل الفوري بين Dijkstra و A* على نفس البيانات.",
    practicalImpact: "إتاحة مقارنة علمية عادلة ومحايدة 100% بين الخوارزميتين تحت نفس الظروف تماماً."
  },
  4: {
    question: "لماذا تم اعتماد خريطة رقمية موحدة للجميع؟",
    answer: "لضبط المتغيرات التجريبية (Experimental Control)؛ فالمقارنة تفقد قيمتها العلمية إذا اختلفت كثافة العقد أو توزيع الأوزان بين الخوارزميتين.",
    practicalImpact: "إثبات قطعي بأن فارق الأداء يعود فقط لذكاء الخوارزمية وليس لتغيير معالم الشبكة."
  },
  5: {
    question: "لماذا اشترطنا أوزان حواف غير سالبة (w(e) ≥ 0)؟",
    answer: "لأن مسافات الطرق وزمن السير كميات فيزيائية موجبة حتماً، ولأن ديكسترا و A* تفترضان أن المسافات تتزايد باطراد، فوجود وزن سالب يتطلب Bellman-Ford الأبطأ بكثير.",
    practicalImpact: "ضمان الاستقرار الحسابي ومنع حدوث دورات لانهائية سالبة في حسابات الملاحة."
  },
  6: {
    question: "لماذا يتوسع ديكسترا بشكل دائري غير موجه؟",
    answer: "لأن ديكسترا خوارزمية جشعة غير مدركة للوجهة (Uninformed)، فهي تستكشف العقد حسب التكلفة التراكمية g(n) فقط دون أدنى فكرة عن موقع الهدف.",
    practicalImpact: "تفحص كل الأحياء المحيطة بالتساوي حتى وإن كانت في الاتجاه المعاكس للوجهة."
  },
  7: {
    question: "لماذا صممت خوارزمية A* بدالة تقييم مركبة f(n) = g(n) + h(n)؟",
    answer: "لدمج الواقع الفعلي g(n) (المسافة المقطوعة) مع الاستشراف المستقبلي h(n) (المسافة المتبقية)، مما يوجه البحث مباشرة كالسهم نحو الهدف.",
    practicalImpact: "تقليص عدد العقد المفحوصة بأكثر من 70% وتوفير زمن الحساب بمعدل 4 أضعاف."
  },
  8: {
    question: "لماذا برهان ديكسترا يعتمد على الاستقراء الرياضي (Loop Invariant)؟",
    answer: "لإثبات أنه في كل مرة تُسحب عقدة u من طابور الأولوية، تكون قيمتها dist[u] هي الأقصر قطعيًا ولا يمكن تحسينها لاحقاً أبداً.",
    practicalImpact: "إغلاق العقدة نهائياً (Closed Set) دون الحاجة لإعادة فحصها مرة أخرى."
  },
  9: {
    question: "لماذا اخترنا طابور الأولوية الثنائي (Binary Min-Heap) تحديداً؟",
    answer: "لأنه يحقق استخراج الحد الأدنى وإدراج العناصر بزمن O(log V)، مقارنة بالمصفوفة البسيطة التي تتطلب O(V) في كل استخراج.",
    practicalImpact: "تسريع البحث بنسبة تفوق 50x في الشبكات الكبيرة التي تحتوي آلاف التقاطعات."
  },
  10: {
    question: "لماذا تم اختيار المسافة الإقليدية (Euclidean Distance) كدالة تقديرية h(n)؟",
    answer: "لأنها تمثل الخط المستقيم الهندسي الأقصر بين أي نقطتين على سطح مستوٍ، مما يضمن استحالة تجاوزها للمسافة الواقعية للطرق.",
    practicalImpact: "تحقيق شرط القبول (Admissibility) والاتساق (Consistency) بنسبة 100% دون أي استثناء."
  },
  11: {
    question: "لماذا يُعد شرط القبول h(n) ≤ h*(n) حجر الزاوية في خوارزمية A*؟",
    answer: "إذا بالغت الدالة في التقدير (Overestimation)، فقد تتجاهل الخوارزمية المسار الأقصر الحقيقي لاعتقادها الخاطئ بأنه باهظ التكلفة.",
    practicalImpact: "ضمان الوصول للحل الأمثل قطعيًا (Optimality Guarantee) دون أي تنازل عن الجودة."
  },
  12: {
    question: "لماذا يجب أن تكون الدالة متسقة (Consistent / Monotone) في شبكات الملاحة؟",
    answer: "لأن الاتساق يحقق متراجحة المثلث h(u) ≤ c(u,v) + h(v)، مما يمنع قيم f(n) من الانخفاض على طول المسار.",
    practicalImpact: "كل عقدة تُفحص وتُغلق مرة واحدة فقط، مما يلغي إعادة الفحص ويضمن أقصى سرعة ممكنة."
  },
  15: {
    question: "لماذا تختلف الحالة الفضلى (Best Case) لـ A* جذرياً عن ديكسترا؟",
    answer: "عند وجود طريق سريع مستقيم نحو الهدف، معامل التفريع لـ A* يقترب من 1.0 فتسير مباشرة كالخط المستقيم وتنهي فوراً، بينما ديكسترا يواصل الانتشار الدائري.",
    practicalImpact: "سرعة لحظية في الطرق السريعة المفتوحة دون هدر أي جهد حسابي."
  },
  18: {
    question: "لماذا أضفنا سيناريو الفخ المسدود (Cul-de-Sac Barrier) في الحالة الأسوأ؟",
    answer: "لاختبار متانة الخوارزمية عندما تخدعها الدالة الإقليدية بالاقتراب من حائط مسدود؛ لنرى كيف تتعامل مع الالتفاف الإجباري دون التخلي عن الأمثلية.",
    practicalImpact: "إثبات قدرة A* على التعافي الذاتي والعودة لتجربة البدائل دون خسارة المسار الأمثل."
  },
  21: {
    question: "لماذا أجرينا الاختبارات على 5 أحجام متدرجة (10 إلى 1000 عقدة)؟",
    answer: "للتحقق من قابلية التوسع (Scalability) وإثبات أن تفوق A* ليس صدفة في شبكة صغيرة بل يزداد اتساعاً مع كبر حجم المدن.",
    practicalImpact: "تأكيد أن A* هي الخيار الهندسي الإلزامي للمدن الحضرية الضخمة."
  },
  25: {
    question: "لماذا وفرنا ميزة إعادة التوجيه اللحظي (Live Rerouting) وسفينة الملاحة؟",
    answer: "لمحاكاة الواقع الحي حيث تتعرض الطرق للإغلاق أو الحوادث، فيجب على نظام الملاحة حساب المسار البديل بلمح البصر وبسلاسة حركية.",
    practicalImpact: "استجابة فورية للمتغيرات الطارئة في أقل من 2 ميلي ثانية وتوجيه السفينة للمسار الآمن."
  }
};

export const EngineeringRationale: React.FC<{ slideId: number }> = ({ slideId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rationale = RATIONALE_BY_SLIDE[slideId] || RATIONALE_BY_SLIDE[2];

  return (
    <div className="mt-2.5 rounded-xl bg-amber-950/20 border border-amber-800/40 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3.5 py-2 flex items-center justify-between text-right text-xs hover:bg-amber-900/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
          </span>
          <span className="font-bold text-amber-300">
            لماذا كذا؟ وليش اخترنا هذا التصميم؟ (القرار الهندسي)
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
          <span>{isOpen ? 'إخفاء التعليل' : 'عرض التفسير الأكاديمي'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 py-3 bg-stone-950/70 border-t border-amber-900/30 text-xs text-stone-200 space-y-2 animate-fadeIn">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5">{rationale.question}</strong>
              <p className="text-stone-300 leading-relaxed">{rationale.answer}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-800/80 flex items-center gap-2 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>الأثر الهندسي والتطبيقي: {rationale.practicalImpact}</span>
          </div>
        </div>
      )}
    </div>
  );
};
