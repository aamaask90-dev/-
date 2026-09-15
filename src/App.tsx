/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PresentationView } from './components/PresentationView';
import { SimulationView } from './components/SimulationView';
import { ExperimentsView } from './components/ExperimentsView';
import { PseudocodeView } from './components/PseudocodeView';
import { ReportView } from './components/ReportView';
import { GoogleSlidesExportModal } from './components/GoogleSlidesExportModal';
import { SLIDES_DATA } from './data/slidesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'presentation' | 'simulation' | 'experiments' | 'code' | 'report'>('presentation');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950" dir="rtl">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGoogleSlidesModal={() => setIsExportModalOpen(true)}
        onToggleFullscreen={handleToggleFullscreen}
        onPrint={handlePrint}
        currentSlideIndex={currentSlideIndex}
        totalSlides={SLIDES_DATA.length}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'presentation' && (
          <PresentationView
            slides={SLIDES_DATA}
            currentIndex={currentSlideIndex}
            onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
            onNavigateToSimulation={() => setActiveTab('simulation')}
            onNavigateToExperiments={() => setActiveTab('experiments')}
          />
        )}

        {activeTab === 'simulation' && (
          <SimulationView />
        )}

        {activeTab === 'experiments' && (
          <ExperimentsView />
        )}

        {activeTab === 'code' && (
          <PseudocodeView />
        )}

        {activeTab === 'report' && (
          <ReportView
            onExportSlides={() => setIsExportModalOpen(true)}
            onPrint={handlePrint}
            onNavigateToSlide={(idx) => {
              setCurrentSlideIndex(idx);
              setActiveTab('presentation');
            }}
          />
        )}
      </main>

      {/* Google Slides Export Modal */}
      <GoogleSlidesExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onPrint={handlePrint}
      />

    </div>
  );
}
