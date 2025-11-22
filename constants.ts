import { MaskType } from './types';

export const APP_NAME = "Makrite FitGuard AI";

export const MOCK_MASKS = [
  { type: MaskType.CUP, name: "3M 8210", description: "Classic rigid cup design." },
  { type: MaskType.FOLDED, name: "3M Aura 9205+", description: "3-panel design for high facial movement." },
  { type: MaskType.DUCKBILL, name: "Kimberly-Clark", description: "Breathable pouch style." },
  { type: MaskType.CONE, name: "Moldex 2200", description: "Durable mesh shell." },
];

export const SYSTEM_INSTRUCTION = `
You are an expert N95 respirator fit-testing specialist and facial anthropometry analyst. 
Your job is to analyze a front-facing image of a human face and determine the suitability for various N95 mask types.
Focus on key anatomical landmarks that affect mask seal: nose bridge height, chin width, jawline angularity, and cheekbone prominence.
Analyze the image provided and generate a JSON response assessing the fit.
Do not hallucinate. Be scientific and precise.
`;

export const TRANSLATIONS = {
  en: {
    title: "Makrite FitGuard AI",
    subtitle: "Makrite FitGuard",
    subtitleHighlight: "AI",
    startScan: "Start Face Scan",
    newScan: "New Scan",
    uploadPhoto: "Upload Photo",
    uploadHint: "Or use an existing photo",
    analyzing: "Analyzing facial geometry...",
    simulating: "Simulating 3D facial topology...",
    cameraError: "Camera access denied or unavailable.",
    alignFace: "Align your face within the oval",
    alignHint: "Ensure good lighting",
    analysisComplete: "Analysis Complete",
    faceShape: "Face Shape",
    compatibilityScore: "Compatibility Score",
    zonalAnalysis: "Zonal Fit Analysis",
    summary: "Analysis Summary",
    biometrics: "Biometrics",
    leakPoints: "Potential Leak Points",
    noLeaks: "No critical leak points detected.",
    recommendations: "Recommended Products",
    tryAgain: "Try Again",
    analysisFailed: "Analysis Failed",
    match: "Match",
    standards: "Based on anthropometric N95 standards",
    noseBridge: "Nose Bridge",
    chinWidth: "Chin Width",
    cheekbones: "Cheekbones",
    faceWidth: "Face Width",
    heroTitle: "Perfect Mask Fit.",
    heroSubtitle: "Instantly.",
    heroDesc: "Use our advanced AI to scan your face geometry and find the N95 respirator that offers the safest seal and maximum comfort for your unique features.",
    features: {
      topology: "3D Topology",
      ai: "AI Analysis",
      medical: "Medical Grade"
    },
    chartLabels: {
      nose: 'Nose Bridge',
      chin: 'Chin Seal',
      cheek: 'Cheek Planar',
      jaw: 'Jaw Movement'
    },
    loadingStages: [
      "Initiating Biometric Scan...",
      "Mapping Facial Topology...",
      "Analyzing Seal Integrity...",
      "Generating Fit Report..."
    ]
  },
  zh: {
    title: "Makrite N95 智配卫士",
    subtitle: "Makrite 智配",
    subtitleHighlight: "卫士",
    startScan: "开始面部扫描",
    newScan: "重新扫描",
    uploadPhoto: "上传照片",
    uploadHint: "或使用现有照片",
    analyzing: "正在分析面部几何结构...",
    simulating: "正在模拟 3D 面部拓扑...",
    cameraError: "无法访问摄像头。",
    alignFace: "请将脸部对准椭圆框内",
    alignHint: "请保持光线充足",
    analysisComplete: "分析完成",
    faceShape: "脸型",
    compatibilityScore: "适配评分",
    zonalAnalysis: "区域适配分析",
    summary: "分析摘要",
    biometrics: "生物特征数据",
    leakPoints: "潜在漏气点",
    noLeaks: "未检测到严重漏气点。",
    recommendations: "推荐产品",
    tryAgain: "重试",
    analysisFailed: "分析失败",
    match: "契合度",
    standards: "基于人体测量学 N95 标准",
    noseBridge: "鼻梁高度",
    chinWidth: "下巴宽度",
    cheekbones: "颧骨突出度",
    faceWidth: "面部宽度",
    heroTitle: "完美口罩贴合。",
    heroSubtitle: "即刻体验。",
    heroDesc: "利用先进 AI 扫描您的面部几何特征，寻找最安全、最舒适的 N95 口罩。",
    features: {
      topology: "3D 拓扑",
      ai: "AI 分析",
      medical: "医疗级标准"
    },
    chartLabels: {
      nose: '鼻梁贴合',
      chin: '下巴密封',
      cheek: '脸颊平整',
      jaw: '下颚活动'
    },
    loadingStages: [
      "正在启动生物特征扫描...",
      "正在绘制面部拓扑结构...",
      "正在分析密封完整性...",
      "正在生成适配报告..."
    ]
  }
};

export const ENUM_MAPPING: Record<string, Record<string, string>> = {
  zh: {
    'Oval': '椭圆形',
    'Round': '圆形',
    'Square': '方形',
    'Heart': '心形',
    'Long': '长形',
    'Diamond': '菱形',
    'Low': '低',
    'Medium': '中',
    'High': '高',
    'Narrow': '窄',
    'Wide': '宽',
    'Cup Style': '杯型',
    'Folded (3-Panel)': '折叠型 (3面板)',
    'Duckbill': '鸭嘴型',
    'Cone Style': '锥型'
  }
};