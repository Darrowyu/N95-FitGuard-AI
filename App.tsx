import React, { useState, useCallback, useRef } from 'react';
import { CameraView } from './components/CameraView';
import { Loader } from './components/Loader';
import { ResultsDashboard } from './components/ResultsDashboard';
import { analyzeFaceForMaskFit } from './services/geminiService';
import { AppState, AnalysisResult, Language } from './types';
import { TRANSLATIONS } from './constants';

export default function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [language, setLanguage] = useState<Language>('en');
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[language];

  const handleStart = () => setAppState('camera');

  const handleCapture = useCallback(async (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setAppState('analyzing');
    try {
      const result = await analyzeFaceForMaskFit(imageSrc, language);
      setAnalysisResult(result);
      setAppState('results');
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : "Unknown error occurred");
      setAppState('error');
    }
  }, [language]);

  const handleRetry = () => {
    setAnalysisResult(null);
    setCurrentImage(null);
    setErrorMsg('');
    setAppState('camera');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset file input so same file can be selected again if needed
    event.target.value = '';
    
    setAppState('analyzing');
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        if (typeof reader.result === 'string') {
          setCurrentImage(reader.result);
          const result = await analyzeFaceForMaskFit(reader.result, language);
          setAnalysisResult(result);
          setAppState('results');
        } else {
          throw new Error("Failed to read file");
        }
      } catch (error) {
        console.error(error);
        setErrorMsg(error instanceof Error ? error.message : "Failed to analyze uploaded image");
        setAppState('error');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAppState('idle')}>
            <div className="bg-teal-600 text-white p-1.5 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">{t.subtitle}<span className="text-teal-600">{t.subtitleHighlight}</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm font-semibold border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <span className={language === 'en' ? 'text-teal-600' : 'text-slate-400'}>EN</span>
              <span className="text-slate-300">/</span>
              <span className={language === 'zh' ? 'text-teal-600' : 'text-slate-400'}>中</span>
            </button>

            {appState === 'results' && (
              <button onClick={handleRetry} className="text-sm text-slate-500 hover:text-teal-600 font-medium hidden md:block">
                {t.newScan}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative">
        
        {/* Idle / Landing State */}
        {appState === 'idle' && (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur opacity-25"></div>
               <div className="relative bg-white p-6 rounded-full shadow-xl">
                 <svg className="w-20 h-20 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
               </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900">
                {t.heroTitle} <br/>
                <span className="text-teal-600">{t.heroSubtitle}</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
              <button 
                onClick={handleStart}
                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-teal-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t.startScan}
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button 
                onClick={triggerFileUpload}
                className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-2 py-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {t.uploadHint}
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400 pt-8">
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                 {t.features.topology}
              </div>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                 {t.features.ai}
              </div>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                 {t.features.medical}
              </div>
            </div>
          </div>
        )}

        {/* Camera State */}
        {appState === 'camera' && (
          <div className="absolute inset-0 bg-black z-10">
            <CameraView 
              onCapture={handleCapture} 
              onError={() => {
                 setErrorMsg(t.cameraError);
                 setAppState('error');
              }}
              onUpload={triggerFileUpload}
              lang={language}
            />
            <button 
              onClick={() => setAppState('idle')}
              className="absolute top-4 right-4 z-30 text-white/80 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Analyzing State */}
        {appState === 'analyzing' && (
          <div className="absolute inset-0 z-20 bg-slate-900 flex items-center justify-center">
            <Loader lang={language} imageSrc={currentImage} />
          </div>
        )}

        {/* Results State */}
        {appState === 'results' && analysisResult && (
          <ResultsDashboard 
            result={analysisResult} 
            onRetry={handleRetry} 
            lang={language} 
            imageSrc={currentImage} 
          />
        )}

        {/* Error State */}
        {appState === 'error' && (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6">
             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
               <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <h3 className="text-xl font-bold text-slate-800">{t.analysisFailed}</h3>
             <p className="text-slate-600 max-w-md">{errorMsg}</p>
             <div className="flex flex-col sm:flex-row gap-4">
               <button 
                 onClick={handleRetry}
                 className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-lg font-medium"
               >
                 {t.tryAgain}
               </button>
               <button 
                 onClick={triggerFileUpload}
                 className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
               >
                 <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                 </svg>
                 {t.uploadPhoto}
               </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}