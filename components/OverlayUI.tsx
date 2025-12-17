import React, { useState } from 'react';
import { NodeData, ViewMode, NodeType } from '../types';
import { ECOSYSTEM_DATA, TOUR_STEPS } from '../constants';
import { 
  Info, 
  Layers, 
  Maximize2, 
  Minimize2, 
  ChevronRight, 
  ChevronLeft, 
  Map,
  X,
  User,
  ExternalLink
} from 'lucide-react';

interface OverlayUIProps {
  selectedId: string | null;
  onClosePanel: () => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  layers: { l0: boolean; l1: boolean; l2: boolean };
  onToggleLayer: (layer: 'l0' | 'l1' | 'l2') => void;
  tourActive: boolean;
  tourStep: number;
  onStartTour: () => void;
  onNextTourStep: () => void;
  onPrevTourStep: () => void;
  onEndTour: () => void;
}

export const OverlayUI: React.FC<OverlayUIProps> = ({
  selectedId,
  onClosePanel,
  viewMode,
  onToggleViewMode,
  layers,
  onToggleLayer,
  tourActive,
  tourStep,
  onStartTour,
  onNextTourStep,
  onPrevTourStep,
  onEndTour
}) => {
  const [showAbout, setShowAbout] = useState(false);
  const selectedNode = selectedId ? ECOSYSTEM_DATA.find(n => n.id === selectedId) : null;
  const currentTour = TOUR_STEPS[tourStep];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-8 z-10 overflow-hidden">
      
      {/* Header / Brand */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(230,0,122,0.8)]">
            POLKADOT <span className="text-[#E6007A]">EXPLORER</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm max-w-xs">
            Interactive visualization of the heterogeneous multi-chain framework.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
              <button 
                onClick={onToggleViewMode}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${viewMode === 'beginner' ? 'bg-[#E6007A] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Beginner
              </button>
              <button 
                onClick={onToggleViewMode}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${viewMode === 'advanced' ? 'bg-[#570081] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Advanced
              </button>
            </div>
            
            {/* About Button */}
            <button 
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs text-gray-300 hover:text-white transition-all"
            >
              <User size={12} />
              <span>About Us</span>
            </button>
        </div>
      </div>

      {/* Main Content Area (Center-Right for Info) */}
      <div className="flex-1 relative">
         {/* Info Panel */}
         {selectedNode && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-96 bg-black/60 backdrop-blur-xl border-l-4 border-[#E6007A] p-6 text-white pointer-events-auto shadow-2xl transition-all animate-in fade-in slide-in-from-right-10 rounded-r-none md:rounded-l-2xl">
               <button onClick={onClosePanel} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                 <X size={20} />
               </button>
               
               <div className="mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/10 text-[#E6007A]`}>
                    {selectedNode.category || selectedNode.type}
                  </span>
               </div>
               
               <h2 className="text-3xl font-bold mb-2">{selectedNode.name}</h2>
               <p className="text-gray-200 leading-relaxed mb-6 text-sm md:text-base">
                 {selectedNode.description}
               </p>

               {/* Advanced Content */}
               {viewMode === 'advanced' && selectedNode.technicalDetails && (
                 <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                   <h3 className="text-[#570081] font-bold text-xs uppercase mb-2 flex items-center gap-2">
                     <Maximize2 size={12} /> Technical Specifications
                   </h3>
                   <p className="text-gray-400 text-xs leading-relaxed font-mono">
                     {selectedNode.technicalDetails}
                   </p>
                 </div>
               )}

               {/* Bridges Section */}
               {selectedNode.bridgesTo && (
                 <div className="mt-4 pt-4 border-t border-white/10">
                   <p className="text-xs text-cyan-400 font-bold mb-2">CONNECTED BRIDGES</p>
                   <div className="flex gap-2">
                     {selectedNode.bridgesTo.map(b => (
                       <span key={b} className="px-3 py-1 bg-cyan-900/40 border border-cyan-500/30 rounded text-xs text-cyan-200">
                         {b}
                       </span>
                     ))}
                   </div>
                 </div>
               )}
            </div>
         )}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-auto">
         
         {/* Layer Toggles */}
         <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1 uppercase font-bold tracking-wider">
               <Layers size={14} /> Layers
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
               <div className={`w-4 h-4 rounded-sm border ${layers.l0 ? 'bg-[#E6007A] border-[#E6007A]' : 'border-gray-500'} flex items-center justify-center transition-colors`}>
                  {layers.l0 && <div className="w-2 h-2 bg-white rounded-full" />}
               </div>
               <span className={`text-sm ${layers.l0 ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>Layer 0 (Relay)</span>
               <input type="checkbox" checked={layers.l0} onChange={() => onToggleLayer('l0')} className="hidden" />
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
               <div className={`w-4 h-4 rounded-sm border ${layers.l1 ? 'bg-purple-600 border-purple-600' : 'border-gray-500'} flex items-center justify-center transition-colors`}>
                  {layers.l1 && <div className="w-2 h-2 bg-white rounded-full" />}
               </div>
               <span className={`text-sm ${layers.l1 ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>Layer 1 (Parachains)</span>
               <input type="checkbox" checked={layers.l1} onChange={() => onToggleLayer('l1')} className="hidden" />
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
               <div className={`w-4 h-4 rounded-sm border ${layers.l2 ? 'bg-white border-white' : 'border-gray-500'} flex items-center justify-center transition-colors`}>
                  {layers.l2 && <div className="w-2 h-2 bg-black rounded-full" />}
               </div>
               <span className={`text-sm ${layers.l2 ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>Layer 2 (dApps)</span>
               <input type="checkbox" checked={layers.l2} onChange={() => onToggleLayer('l2')} className="hidden" />
            </label>
         </div>

         {/* Guided Tour Controls */}
         <div className={`bg-gradient-to-r from-gray-900 to-black p-4 rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 ${tourActive ? 'w-full md:w-1/2' : 'w-auto'}`}>
            {!tourActive ? (
              <button 
                onClick={onStartTour}
                className="flex items-center gap-3 text-white hover:text-[#E6007A] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#E6007A] flex items-center justify-center shadow-lg shadow-pink-500/30">
                  <Map size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm">Start Guided Tour</p>
                  <p className="text-xs text-gray-400">Learn Polkadot in 4 steps</p>
                </div>
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                 <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-[#E6007A] font-bold text-xs uppercase tracking-widest">
                       STEP {tourStep + 1} / {TOUR_STEPS.length}
                    </span>
                    <button onClick={onEndTour} className="text-xs text-gray-500 hover:text-white">Exit Tour</button>
                 </div>
                 <h3 className="text-lg font-bold text-white">{currentTour.title}</h3>
                 <p className="text-sm text-gray-300">{currentTour.content}</p>
                 <div className="flex gap-2 mt-2">
                    <button 
                      onClick={onPrevTourStep} 
                      disabled={tourStep === 0}
                      className="p-2 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={onNextTourStep}
                      disabled={tourStep === TOUR_STEPS.length - 1}
                      className="flex-1 bg-[#E6007A] hover:bg-pink-600 text-white font-bold py-2 px-4 rounded text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:bg-gray-700"
                    >
                      {tourStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={14} />
                    </button>
                 </div>
              </div>
            )}
         </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto p-4 animate-in fade-in duration-200">
           <div className="bg-[#111] border border-[#E6007A]/50 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(230,0,122,0.2)] relative">
              <button 
                onClick={() => setShowAbout(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center text-center mb-6">
                 <div className="w-16 h-16 bg-[#E6007A]/10 rounded-full flex items-center justify-center mb-4 border border-[#E6007A]/30">
                    <User size={32} className="text-[#E6007A]" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-1">About Us</h2>
                 <p className="text-gray-400 text-sm">Polkadot Ecosystem Explorer</p>
              </div>

              <div className="space-y-4">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-gray-300 text-sm mb-1">Created by</p>
                    <a 
                      href="https://x.com/solomon_t0" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between text-lg font-bold text-white hover:text-[#E6007A] transition-colors group"
                    >
                      Solomon T
                      <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                 </div>

                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-gray-300 text-sm mb-2">Collaboration</p>
                    <p className="text-white font-medium text-sm">
                       Feel free to contact us for collab on open source projects.
                    </p>
                 </div>
              </div>

              <div className="mt-8 text-center">
                 <button 
                   onClick={() => setShowAbout(false)}
                   className="text-gray-500 hover:text-white text-sm transition-colors"
                 >
                   Close
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};