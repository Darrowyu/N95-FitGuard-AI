import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoaderProps {
  lang: Language;
  imageSrc?: string | null;
}

export const Loader: React.FC<LoaderProps> = ({ lang, imageSrc }) => {
  const t = TRANSLATIONS[lang];
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < t.loadingStages.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [t.loadingStages.length]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-slate-900 font-mono">
      {/* Background Image with Scanning Effect */}
      {imageSrc ? (
        <>
          <div className="absolute inset-0 z-0">
            <img 
              src={imageSrc} 
              alt="Scanning Target" 
              className="w-full h-full object-cover opacity-30 blur-sm transform scale-105" 
            />
            <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
          </div>
          
          {/* Scanning Beam */}
          <div className="scan-line z-0 opacity-50"></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-slate-900 z-0"></div>
      )}

      {/* Central Processing Hub */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full p-6">
        
        {/* Animated Radar/Biometric Circle */}
        <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
          {/* Outer Rings */}
          <div className="absolute inset-0 border border-teal-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-4 border border-teal-500/30 rounded-full border-t-transparent animate-[spin_3s_linear_infinite_reverse]"></div>
          <div className="absolute inset-8 border-2 border-teal-500/10 rounded-full"></div>
          
          {/* Pulsing Core */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-24 h-24 bg-teal-500/10 rounded-full animate-pulse flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
          </div>

          {/* Orbital Dot */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
             <div className="w-2 h-2 bg-teal-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(45,212,191,1)]"></div>
          </div>
        </div>
        
        {/* Stage List */}
        <div className="w-full bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl">
            <div className="space-y-4">
              {t.loadingStages.map((stageText, index) => {
                const isActive = index === currentStage;
                const isCompleted = index < currentStage;
                const isPending = index > currentStage;

                return (
                  <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${isPending ? 'opacity-30' : 'opacity-100'}`}>
                    {/* Status Icon */}
                    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                      {isCompleted ? (
                        <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isActive ? (
                        <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Text */}
                    <span className={`text-sm tracking-wide ${isActive ? 'text-white font-bold animate-pulse' : isCompleted ? 'text-teal-100/70' : 'text-slate-500'}`}>
                      {stageText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Global Progress Bar */}
            <div className="mt-6 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.6)] transition-all duration-1000 ease-out"
                 style={{ width: `${((currentStage + 1) / t.loadingStages.length) * 100}%` }}
               ></div>
            </div>
        </div>

      </div>
    </div>
  );
};