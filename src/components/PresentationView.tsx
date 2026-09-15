import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Volume2, 
  VolumeX, 
  ListOrdered, 
  Sparkles,
  PlayCircle,
  FlaskConical,
  Compass,
  Ship,
  HelpCircle
} from 'lucide-react';
import { SlideContent } from '../types';
import { ACADEMIC_PILLARS } from '../data/slidesData';
import { SlideVisuals } from './SlideVisuals';
import { EngineeringRationale } from './EngineeringRationale';
import { ShipIcon } from './SmartNavigationShip';

interface PresentationViewProps {
  slides: SlideContent[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onNavigateToSimulation: () => void;
  onNavigateToExperiments: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  slides,
  currentIndex,
  onSelectSlide,
  onNavigateToSimulation,
  onNavigateToExperiments
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const currentSlide = slides[currentIndex] || slides[0];

  // Soft slide click audio tone
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // AudioContext unavailable
    }
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      playClickSound();
      onSelectSlide(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      playClickSound();
      onSelectSlide(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'Escape') {
        setShowDrawer(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-stone-950 overflow-hidden relative select-none">
      
      {/* Top Slide Header with Progress Bar (Warm Brown & Bronze Theme) */}
      <div className="bg-stone-900/90 border-b border-stone-800/80 px-4 py-2.5 flex items-center justify-between">
        
        {/* Academic Pillar Indicator with Warm Bronze styling */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-950/50 text-amber-300 border border-amber-700/40">
            <ShipIcon className="w-4 h-4 text-amber-400" />
            <span>{currentSlide.pillar}</span>
          </span>
          {currentSlide.badge && (
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-stone-800/90 text-stone-300 border border-stone-700 font-mono hidden sm:inline-block">
              {currentSlide.badge}
            </span>
          )}
        </div>

        {/* Slide Counter & Pillar Jump */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="flex items-center gap-1.5 text-xs text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 px-3 py-1.5 rounded-lg border border-stone-700 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>فهرس الشرائح ({currentSlide.numberStr} / {slides.length})</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="مؤثر صوتي للتنقل"
            className="p-1.5 rounded-lg text-xs bg-stone-800 text-stone-400 border border-stone-700 hover:text-stone-200"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Progress Linear Bar (Amber Gold gradient) */}
      <div className="w-full bg-stone-900 h-1">
        <div 
          className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 h-1 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-stone-900/95 rounded-2xl border border-stone-800 shadow-2xl p-4 sm:p-7 flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          
          {/* Background Warm Radial Glow Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Slide Header */}
          <div className="relative z-10">
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 font-bold border border-amber-700/40">
                    الشريحة {currentSlide.numberStr} / {slides.length}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    الملاحة الذكية • SMART NAVIGATION
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-100 tracking-tight leading-tight">
                  {currentSlide.title}
                </h2>
                {currentSlide.subtitle && (
                  <p className="text-xs sm:text-sm text-amber-400/90 font-mono mt-0.5" dir="ltr">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>

              {/* Slide Number Badge */}
              <div className="w-12 h-12 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center font-mono font-bold text-amber-400 text-lg shadow-inner">
                #{currentSlide.numberStr}
              </div>
            </div>

            {/* Formula Callout if present */}
            {currentSlide.formula && (
              <div className="mb-3 p-2.5 rounded-xl bg-stone-950 border border-amber-600/40 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 font-bold border border-amber-700/30">
                    الصيغة الرياضية
                  </span>
                  <span className="text-base sm:text-lg font-mono font-bold text-stone-100 tracking-wide" dir="ltr">
                    {currentSlide.formula}
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse hidden sm:block" />
              </div>
            )}

            {/* MAIN VISUAL COMPONENT */}
            <div className="my-2">
              <SlideVisuals 
                slideId={currentSlide.id}
                onNavigateToSimulation={onNavigateToSimulation}
                onNavigateToExperiments={onNavigateToExperiments}
              />
            </div>

            {/* "WHY THIS? / RATIONALE" EXPLANATION (Addressing user request) */}
            <EngineeringRationale slideId={currentSlide.id} />

            {/* CONCISE, NON-OVERLAPPING BULLET POINTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {currentSlide.keyPoints.map((point, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-950/70 border border-stone-800/90 text-stone-300 text-xs sm:text-sm leading-relaxed"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </span>
                  <div className="flex-1">{point}</div>
                </div>
              ))}
            </div>

            {/* Code Snippet if present */}
            {currentSlide.codeSnippet && (
              <div className="mt-3 rounded-xl bg-stone-950 border border-stone-800 p-3 font-mono text-xs text-stone-300 overflow-x-auto" dir="ltr">
                <pre className="text-amber-300 font-mono leading-relaxed">
                  {currentSlide.codeSnippet.code}
                </pre>
              </div>
            )}

            {/* Metrics Chips if present */}
            {currentSlide.metrics && currentSlide.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {currentSlide.metrics.map((m, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-stone-950/80 border border-stone-800 text-center">
                    <div className="text-[10px] text-stone-400">{m.label}</div>
                    <div className="text-sm sm:text-base font-bold font-mono text-amber-400" dir="ltr">{m.value}</div>
                    {m.sublabel && <div className="text-[9px] text-stone-400 mt-0.5">{m.sublabel}</div>}
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Slide Footer */}
          <div className="relative z-10 mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-2">
              <span className="font-mono">Smart Navigation Project</span>
              <span>•</span>
              <span className="text-amber-400">أبوبكر الخولاني & كريم السمان</span>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span>{currentIndex + 1} من {slides.length}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Floating Navigation Dock (Warm Bronze / Brown Theme) */}
      <div className="bg-stone-900/90 border-t border-stone-800/80 px-6 py-2.5 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-800 text-stone-200 text-xs font-bold transition-all"
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
          <span className="text-[10px] text-stone-400 hidden sm:inline">(Arrow Left)</span>
        </button>

        {/* Slide Number Pills */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto max-w-xl px-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSelectSlide(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center ${
                currentIndex === idx
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-30 disabled:hover:bg-amber-600 text-stone-950 text-xs font-bold transition-all shadow-md shadow-amber-900/30"
        >
          <span>التالي</span>
          <span className="text-[10px] text-amber-950 hidden sm:inline font-mono">(Space)</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Index Modal Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-stone-900 h-full border-r border-stone-800 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-stone-100">فهرس شرائح العرض ({slides.length} شريحة)</h3>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="text-stone-400 hover:text-white text-xs px-2.5 py-1 rounded bg-stone-800 border border-stone-700"
                >
                  إغلاق (Esc)
                </button>
              </div>

              <div className="space-y-1.5">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSlide(idx);
                      setShowDrawer(false);
                    }}
                    className={`w-full text-right p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                      currentIndex === idx
                        ? 'bg-amber-950/60 border-amber-500 text-stone-100'
                        : 'bg-stone-800/50 border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-amber-400 font-bold">{s.numberStr}</span>
                      <span className="truncate">{s.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 shrink-0 font-mono">
                      #{s.pillarNumber}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 text-center text-xs text-stone-400">
              مشروع الملاحة الذكية — إعداد: أبوبكر الخولاني & كريم السمان
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
