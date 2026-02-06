import React from 'react';
import { AnalysisResult, MaskType, Language } from '../types';
import { TRANSLATIONS, translateEnum } from '../constants';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarRadiusAxis } from 'recharts';
import { 
  MaskCupIcon, 
  MaskFoldedIcon, 
  MaskDuckbillIcon, 
  MaskConeIcon,
  CheckIcon,
  WarningIcon,
  RefreshIcon,
} from './icon';
import { 
  SummaryIcon,
  CheckCircleIcon,
  MaskBackgroundIcon
} from './Icons';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onRetry: () => void;
  lang: Language;
  imageSrc: string | null;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onRetry, lang, imageSrc }) => {
  const t = TRANSLATIONS[lang];


  const getMaskIcon = (type: string) => {
    switch (type) {
      case MaskType.CUP:
        return <MaskCupIcon className="w-7 h-7 text-teal-600" />;
      case MaskType.FOLDED:
        return <MaskFoldedIcon className="w-7 h-7 text-teal-600" />;
      case MaskType.DUCKBILL:
        return <MaskDuckbillIcon className="w-7 h-7 text-teal-600" />;
      case MaskType.CONE:
        return <MaskConeIcon className="w-7 h-7 text-teal-600" />;
      default:
        return <span className="text-2xl">😷</span>;
    }
  };

  const radarData = [
    { subject: t.chartLabels.nose, A: result.metrics.noseFit, fullMark: 100 },
    { subject: t.chartLabels.chin, A: result.metrics.chinFit, fullMark: 100 },
    { subject: t.chartLabels.cheek, A: result.metrics.cheekFit, fullMark: 100 },
    { subject: t.chartLabels.jaw, A: result.metrics.jawFit, fullMark: 100 },
  ];

  const scoreData = [{ name: 'Fit Score', value: result.overallFitScore, fill: '#0d9488' }];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 animate-fade-in">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">{t.analysisComplete}</h2>
        <p className="text-slate-500 mt-2">{t.simulating}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* 3D 图像分析视口 */}
        {/* 使用透视和变换样式在悬停时创建 3D 深度效果 */}
        <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl overflow-hidden group [perspective:1200px]">
            
            {/* 带 3D 变换逻辑的内部容器 */}
            <div className="absolute inset-0 transition-all duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(4deg)_scale(1.02)] origin-center">
                
                {/* 第 1 层：带视差缩放的背景图像 */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {imageSrc ? (
                        <>
                            <img 
                                src={imageSrc} 
                                className="w-full h-full object-cover object-center opacity-70 transition-transform duration-[2s] ease-in-out scale-100 group-hover:scale-110 group-hover:opacity-60" 
                                alt="分析目标" 
                            />
                            {/* 电影级晕影效果 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-slate-950/50 mix-blend-multiply"></div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">无图像</div>
                    )}
                </div>

                {/* 第 2 层：浮动全息网格（地板） */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,transparent_24%,rgba(45,212,191,.1)_25%,rgba(45,212,191,.1)_26%,transparent_27%,transparent_74%,rgba(45,212,191,.1)_75%,rgba(45,212,191,.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(45,212,191,.1)_25%,rgba(45,212,191,.1)_26%,transparent_27%,transparent_74%,rgba(45,212,191,.1)_75%,rgba(45,212,191,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px] [transform:perspective(600px)_rotateX(60deg)_translateZ(20px)] opacity-40 pointer-events-none"></div>

                {/* 第 3 层：浮动 HUD 元素（中心） */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none [transform:translateZ(40px)] transition-transform duration-700 group-hover:[transform:translateZ(60px)]">
                    <div className="relative w-56 h-72 border-x border-teal-500/30 rounded-[3rem]">
                        {/* 扫描光束 */}
                        <div className="absolute w-full h-0.5 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
                        
                        {/* 四角标记 */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-teal-400 rounded-tl-xl"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-teal-400 rounded-tr-xl"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-teal-400 rounded-bl-xl"></div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-teal-400 rounded-br-xl"></div>
                    </div>
                </div>

                {/* 第 4 层：浮动数据点（分散） */}
                <div className="absolute top-1/4 left-1/4 [transform:translateZ(80px)] transition-all duration-500 group-hover:[transform:translateZ(100px)]">
                    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-teal-500/20 shadow-lg">
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] text-teal-200 font-mono uppercase">{t.faceShape}</span>
                    </div>
                </div>

                <div className="absolute bottom-1/4 right-1/4 [transform:translateZ(80px)] transition-all duration-500 group-hover:[transform:translateZ(100px)]">
                     <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-teal-500/20 shadow-lg">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                        <span className="text-[10px] text-blue-200 font-mono uppercase">深度图</span>
                    </div>
                </div>

                {/* 第 5 层：底部信息卡片 */}
                <div className="absolute bottom-8 inset-x-8 [transform:translateZ(50px)] transition-transform duration-700 group-hover:[transform:translateZ(70px)]">
                    <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-xs text-teal-500 font-mono mb-1 uppercase tracking-widest">分析对象</div>
                                <div className="text-2xl font-bold text-white tracking-tight">{translateEnum(result.faceShape, lang)}</div>
                            </div>
                             <div className="text-right">
                                <div className="text-xs text-slate-400 font-mono mb-1 uppercase tracking-widest">置信度</div>
                                <div className="text-2xl font-bold text-teal-400 tracking-tight">{result.overallFitScore}%</div>
                            </div>
                        </div>
                        <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                             <div className="h-full bg-teal-500 w-[85%] animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 反射/玻璃效果 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>
        </div>

        {/* 主要指标 */}
        <div className="flex flex-col justify-between space-y-6">
            {/* 评分卡片 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                    <CheckCircleIcon className="w-40 h-40" />
                </div>
                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-6">{t.compatibilityScore}</h3>
                <div className="w-56 h-56 relative z-10">
                    <ResponsiveContainer width={224} height={224}>
                    <RadialBarChart innerRadius="85%" outerRadius="100%" barSize={12} data={scoreData} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background dataKey="value" cornerRadius={20} />
                    </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-6xl font-extrabold text-slate-800 tracking-tighter">{result.overallFitScore}</span>
                        <span className="text-sm text-slate-400 font-medium mt-1">/ 100 POINTS</span>
                    </div>
                </div>
            </div>

            {/* 雷达分析 */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex-1 min-h-[320px]">
                 <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">{t.zonalAnalysis}</h3>
                 <div className="w-full" style={{ height: 224 }}>
                    <ResponsiveContainer width="100%" height={224}>
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#f1f5f9" />
                            <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false}/>
                            <Radar name="Fit" dataKey="A" stroke="#0d9488" strokeWidth={3} fill="#14b8a6" fillOpacity={0.2} />
                        </RadarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 生物特征列表 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                {t.biometrics}
            </h3>
            <div className="space-y-5">
                {[
                    { label: t.noseBridge, value: result.dimensions.noseBridgeHeight },
                    { label: t.chinWidth, value: result.dimensions.chinWidth },
                    { label: t.cheekbones, value: result.dimensions.cheekboneProminence },
                    { label: t.faceWidth, value: result.dimensions.faceWidth }
                ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                        <span className="text-slate-500 text-sm font-medium group-hover:text-teal-600 transition-colors">{item.label}</span>
                        <span className="font-bold text-slate-800 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{translateEnum(item.value, lang)}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* 推荐产品 */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                {t.recommendations}
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-start gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all hover:shadow-md">
                         <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0 text-teal-600">
                            {getMaskIcon(rec.type)}
                         </div>
                         <div className="flex-1 w-full">
                             <div className="flex justify-between items-start mb-2">
                                 <div>
                                     <h4 className="font-bold text-slate-900 text-lg">{rec.modelName}</h4>
                                     <p className="text-xs text-teal-600 font-bold uppercase tracking-wide">{translateEnum(rec.type, lang)}</p>
                                 </div>
                                 <div className="flex flex-col items-end">
                                     <span className="bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">{rec.matchScore}%</span>
                                 </div>
                             </div>
                             <p className="text-sm text-slate-600 leading-relaxed">{rec.reason}</p>
                         </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 摘要和操作 */}
      <div className="mt-8 bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <MaskBackgroundIcon className="w-96 h-96" />
          </div>
          
          <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-teal-400">
                  <SummaryIcon className="w-6 h-6" />
                  {t.summary}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-8 text-lg font-light">{result.summary}</p>
              
              <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-white/5">
                 <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">{t.leakPoints}</h4>
                 {result.sealIssues.length > 0 ? (
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         {result.sealIssues.map((issue, i) => (
                             <li key={i} className="flex items-start gap-3 text-amber-300 text-sm">
                                 <WarningIcon className="w-5 h-5 shrink-0 mt-0.5" />
                                 {issue}
                             </li>
                         ))}
                     </ul>
                 ) : (
                     <p className="text-green-400 flex items-center gap-3 text-sm font-medium">
                         <CheckIcon className="w-5 h-5" />
                         {t.noLeaks}
                     </p>
                 )}
              </div>

              <div className="flex justify-center">
                  <button onClick={onRetry} className="bg-teal-500 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-400 transition-all shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:scale-105 active:scale-95 flex items-center gap-3">
                      <RefreshIcon className="w-5 h-5" />
                      {t.newScan}
                  </button>
              </div>
          </div>
      </div>

    </div>
  );
};
