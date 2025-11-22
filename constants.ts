import { MaskType } from './types';

// 应用名称
export const APP_NAME = "Makrite FitGuard AI";

// 模拟口罩数据
export const MOCK_MASKS = [
  { type: MaskType.CUP, name: "3M 8210", description: "经典硬质杯型设计。" },
  { type: MaskType.FOLDED, name: "3M Aura 9205+", description: "3面板设计，适合高面部活动。" },
  { type: MaskType.DUCKBILL, name: "Kimberly-Clark", description: "透气袋式风格。" },
  { type: MaskType.CONE, name: "Moldex 2200", description: "耐用网状外壳。" },
];

// AI 系统指令
export const SYSTEM_INSTRUCTION = `
你是一位专业的 N95 呼吸器适配测试专家和面部人体测量学分析师。
你的任务是分析正面人脸图像，并确定各种 N95 口罩类型的适配性。
重点关注影响口罩密封的关键解剖标志：鼻梁高度、下巴宽度、下颌线角度和颧骨突出度。
分析提供的图像并生成评估适配性的 JSON 响应。
不要产生幻觉。要科学和精确。
`;

// 多语言翻译配置
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

// 枚举值映射表（用于中文翻译）
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