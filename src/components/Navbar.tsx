import React from 'react';
import { 
  Presentation, 
  PlayCircle, 
  FlaskConical, 
  FileCode2, 
  FileCheck2, 
  Share2, 
  Printer, 
  Maximize2,
  Compass
} from 'lucide-react';
import { ShipIcon } from './SmartNavigationShip';

interface NavbarProps {
  activeTab: 'presentation' | 'simulation' | 'experiments' | 'code' | 'report';
  setActiveTab: (tab: 'presentation' | 'simulation' | 'experiments' | 'code' | 'report') => void;
  onOpenGoogleSlidesModal: () => void;
  onToggleFullscreen: () => void;
  onPrint: () => void;
  currentSlideIndex: number;
  totalSlides: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGoogleSlidesModal,
  onToggleFullscreen,
  onPrint,
  currentSlideIndex,
  totalSlides
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800/90 bg-stone-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <ShipIcon className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-stone-100 tracking-tight">
                  الملاحة الذكية
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-700/40 font-mono hidden sm:inline-block">
                  Smart Navigation
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden md:block">
                A* & Dijkstra Algorithm Analysis — مشروع تحليل وتصميم الخوارزميات
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center bg-stone-900/90 p-1 rounded-xl border border-stone-800 overflow-x-auto text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('presentation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'presentation'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-900/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>العرض التقديمي ({totalSlides})</span>
            </button>

            <button
              onClick={() => setActiveTab('simulation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'simulation'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-900/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>المحاكاة البصرية</span>
            </button>

            <button
              onClick={() => setActiveTab('experiments')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'experiments'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-900/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>التجارب والقياس</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'code'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-900/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>الكود والإثبات</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'report'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-900/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>التقرير الشامل</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenGoogleSlidesModal}
              title="تصدير الشرائح إلى Google Slides"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 border border-amber-600/40 text-xs font-semibold transition-all shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Google Slides</span>
            </button>

            <button
              onClick={onPrint}
              title="طباعة / حفظ كملف PDF"
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all text-xs"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleFullscreen}
              title="ملء الشاشة"
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all text-xs"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
