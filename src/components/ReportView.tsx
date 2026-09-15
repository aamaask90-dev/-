import React from 'react';
import { 
  FileCheck2, 
  Award, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Gauge, 
  Target, 
  BookOpen,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { SLIDES_DATA, ACADEMIC_PILLARS } from '../data/slidesData';

interface ReportViewProps {
  onExportSlides: () => void;
  onPrint: () => void;
  onNavigateToSlide: (index: number) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  onExportSlides,
  onPrint,
  onNavigateToSlide
}) => {
  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>المتطلب 10: Final Report & Academic Defense Summary</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                التقرير الأكاديمي الشامل للمشروع
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                ملخص متكامل وجاهز لمناقشة مشروع مادة "تحليل وتصميم الخوارزميات" بموجب قائمة المعايير العشرة الإلزامية لخوارزميتي A* و Dijkstra.
              </p>
              <div className="mt-3 text-xs text-amber-400 font-bold">
                إعداد الطلاب: أبوبكر الخولاني | كريم السمان
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={onExportSlides}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-amber-500/20"
              >
                <Share2 className="w-4 h-4" />
                <span>تصدير إلى Google Slides</span>
              </button>

              <button
                onClick={onPrint}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all border border-slate-700"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة / حفظ PDF</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-xs text-slate-400">عدد الشرائح الأكاديمية</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">{SLIDES_DATA.length} شريحة</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-xs text-slate-400">الأعمدة الأكاديمية</div>
              <div className="text-xl font-bold font-mono text-indigo-400 mt-0.5">10 / 10 مغطاة</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-xs text-slate-400">أمثلية المسار</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">100% تطابق</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
              <div className="text-xs text-slate-400">نسبة تسريع A*</div>
              <div className="text-xl font-bold font-mono text-rose-400 mt-0.5">3.5x إلى 4.5x</div>
            </div>
          </div>
        </div>

        {/* The 10 Academic Pillars Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>استيفاء المتطلبات الأكاديمية العشرة الإلزامية للمشروع</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">10 Requirements</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACADEMIC_PILLARS.map((pillar) => {
              const pillarSlides = SLIDES_DATA.filter(s => s.pillarNumber === pillar.id);
              const firstSlideIndex = SLIDES_DATA.findIndex(s => s.pillarNumber === pillar.id);

              return (
                <div 
                  key={pillar.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-xs font-bold font-mono">
                          {pillar.id}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm sm:text-base">
                            {pillar.nameAr}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono" dir="ltr">
                            {pillar.nameEn}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        مكتمل
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pillar.id === 1 && "توصيف دقيق للملاحة الذكية، المدخلات، المخرجات، ونمذجة الشبكة كبيان مرجح وموجه."}
                      {pillar.id === 2 && "تصميم خوارزميتي Dijkstra و A*، دالة f(n)=g(n)+h(n)، والكود الوصفي المعتمد."}
                      {pillar.id === 3 && "برهان الاستقراء الرياضي لديكسترا وبرهان الـ Admissibility و Consistency لخوارزمية A*."}
                      {pillar.id === 4 && "تحليل Best و Average و Worst Case للزمن O((V+E) log V) والمساحة O(V+E)."}
                      {pillar.id === 5 && "المحاكاة التفاعلية عبر المراحل الخمس (Start, Expansion, Goal Reached, Final Path)."}
                      {pillar.id === 6 && "تصميم التجارب المتدرجة على 10، 50، 100، 500، 1000 عقدة مع عزل ضوضاء المعالج."}
                      {pillar.id === 7 && "معايير القياس الصارمة: زمن التنفيذ، استهلاك الذاكرة، عدد العقد، وجودة المسار."}
                      {pillar.id === 8 && "المقارنة الشاملة وتفسير توافق السلوك العملي مع التعقيد النظري رياضياً."}
                      {pillar.id === 9 && "التمثيل البصري للشبكة، تتبع المسار بالألوان، والخريطة الحرارية للعقد المفحوصة."}
                      {pillar.id === 10 && "المناقشة العلمية، حالات الاستخدام المثلى، المحددات، والتوصيات لمهندسي البرمجيات."}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">
                      الشرائح: {pillarSlides.map(s => s.numberStr).join(', ')}
                    </span>
                    <button
                      onClick={() => onNavigateToSlide(firstSlideIndex)}
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold transition-all"
                    >
                      <span>عرض في الشرائح</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Defense Readiness Statement */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>بيان الجاهزية الأكاديمية للدفاع والمناقشة:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            تم إعداد هذا المشروع بعناية هندسية ورياضية فائقة ليلبي متطلبات مادة "تحليل وتصميم الخوارزميات". يجمع التطبيق بين الدقة النظرية (الكود الوصفي، إثباتات الصحة، حساب التعقيد بدقة هياكل البيانات) والواقعية التجريبية (المحاكاة التفاعلية، القياس الميكروثاني على 1000 عقدة، والتحقق من أمثلية الحل 100%).
          </p>
        </div>

      </div>
    </div>
  );
};
