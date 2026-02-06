import React, { useState, useCallback, useRef } from 'react';
import { CameraView } from './components/CameraView';
import { Loader } from './components/Loader';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { analyzeFaceForMaskFit } from './services/geminiService';
import { AppState, AnalysisResult, Language } from './types';
import { TRANSLATIONS } from './constants';
import { 
  CameraIcon, 
  UploadIcon, 
  CloseIcon,
  LogoIcon,
} from './components/Icons';
import { 
  ArrowIcon, 
  ErrorIcon 
} from './components/Icons';

// 内部应用组件 props 接口
interface AppContentProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

// 内部应用组件
function AppContent({ language, onLanguageChange }: AppContentProps) {
  // 应用状态管理
  const [appState, setAppState] = useState<AppState>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
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
    onLanguageChange(language === 'en' ? 'zh' : 'en');
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 重置文件输入，以便在需要时可以再次选择相同的文件
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
      {/* 隐藏的文件输入 */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* 头部导航 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAppState('idle')}>
            <div className="bg-teal-600 text-white p-1.5 rounded-lg">
              <LogoIcon className="w-6 h-6" />
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

      {/* 主要内容区域 */}
      <main className="flex-grow flex flex-col relative">

        {/* 空闲/着陆页状态 */}
        {appState === 'idle' && (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur opacity-25"></div>
              <div className="relative bg-white p-6 rounded-full shadow-xl">
                <CameraIcon className="w-20 h-20 text-teal-600" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900">
                {t.heroTitle} <br />
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
                <ArrowIcon className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={triggerFileUpload}
                className="text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-2 py-2"
              >
                <UploadIcon className="w-4 h-4" />
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

        {/* 相机状态 */}
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
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* 分析中状态 */}
        {appState === 'analyzing' && (
          <div className="absolute inset-0 z-20 bg-slate-900 flex items-center justify-center">
            <Loader lang={language} imageSrc={currentImage} />
          </div>
        )}

        {/* 结果展示状态 */}
        {appState === 'results' && analysisResult && (
          <ResultsDashboard
            result={analysisResult}
            onRetry={handleRetry}
            lang={language}
            imageSrc={currentImage}
          />
        )}

        {/* 错误状态 */}
        {appState === 'error' && (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
              <ErrorIcon className="w-10 h-10" />
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
                <UploadIcon className="w-5 h-5 text-slate-500" />
                {t.uploadPhoto}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// 主 App 组件，使用 ErrorBoundary 包裹应用内容
export default function App(): React.ReactElement {
  const [language, setLanguage] = useState<Language>('en');
  
  return (
    <ErrorBoundary lang={language}>
      <AppContent 
        language={language} 
        onLanguageChange={setLanguage} 
      />
    </ErrorBoundary>
  );
}
