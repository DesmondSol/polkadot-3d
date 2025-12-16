import React, { useState, useEffect } from 'react';
import { PolkadotWorld } from './components/PolkadotWorld';
import { OverlayUI } from './components/OverlayUI';
import { ViewMode, EcosystemState } from './types';
import { TOUR_STEPS } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<EcosystemState>({
    selectedId: null,
    hoveredId: null,
    viewMode: 'beginner',
    showLayer0: true,
    showLayer1: true,
    showLayer2: true,
    isTourActive: false,
    tourStep: 0,
  });

  const handleSelectNode = (id: string | null) => {
    setState(prev => ({ ...prev, selectedId: id }));
  };

  const toggleViewMode = () => {
    setState(prev => ({ ...prev, viewMode: prev.viewMode === 'beginner' ? 'advanced' : 'beginner' }));
  };

  const toggleLayer = (layer: 'l0' | 'l1' | 'l2') => {
    setState(prev => {
      if (layer === 'l0') return { ...prev, showLayer0: !prev.showLayer0 };
      if (layer === 'l1') return { ...prev, showLayer1: !prev.showLayer1 };
      if (layer === 'l2') return { ...prev, showLayer2: !prev.showLayer2 };
      return prev;
    });
  };

  const startTour = () => {
    setState(prev => ({
      ...prev,
      isTourActive: true,
      tourStep: 0,
      selectedId: TOUR_STEPS[0].targetId,
      // Reset visibility for tour start
      showLayer0: true,
      showLayer1: true,
      showLayer2: true
    }));
  };

  const endTour = () => {
    setState(prev => ({ ...prev, isTourActive: false, selectedId: null }));
  };

  const nextTourStep = () => {
    if (state.tourStep < TOUR_STEPS.length - 1) {
      const nextStep = state.tourStep + 1;
      applyTourState(nextStep);
    } else {
      endTour();
    }
  };

  const prevTourStep = () => {
    if (state.tourStep > 0) {
      const prevStep = state.tourStep - 1;
      applyTourState(prevStep);
    }
  };

  const applyTourState = (stepIndex: number) => {
    const stepData = TOUR_STEPS[stepIndex];
    
    // Logic to highlight/dim layers based on step
    let layers = { showLayer0: true, showLayer1: true, showLayer2: true };
    if (stepData.layerFocus === 'layer0') layers = { showLayer0: true, showLayer1: false, showLayer2: false };
    if (stepData.layerFocus === 'layer1') layers = { showLayer0: true, showLayer1: true, showLayer2: false };
    // Layer 2 keeps previous layers visible for context

    setState(prev => ({
      ...prev,
      tourStep: stepIndex,
      selectedId: stepData.targetId,
      ...layers
    }));
  };

  return (
    <div className="w-full h-full relative bg-[#050205] text-white">
      {/* 3D World */}
      <div className="absolute inset-0 z-0">
        <PolkadotWorld 
          selectedId={state.selectedId}
          onSelectNode={handleSelectNode}
          showLayer0={state.showLayer0}
          showLayer1={state.showLayer1}
          showLayer2={state.showLayer2}
        />
      </div>

      {/* UI Overlay */}
      <OverlayUI 
        selectedId={state.selectedId}
        onClosePanel={() => setState(prev => ({ ...prev, selectedId: null }))}
        viewMode={state.viewMode}
        onToggleViewMode={toggleViewMode}
        layers={{ l0: state.showLayer0, l1: state.showLayer1, l2: state.showLayer2 }}
        onToggleLayer={toggleLayer}
        tourActive={state.isTourActive}
        tourStep={state.tourStep}
        onStartTour={startTour}
        onEndTour={endTour}
        onNextTourStep={nextTourStep}
        onPrevTourStep={prevTourStep}
      />
    </div>
  );
};

export default App;