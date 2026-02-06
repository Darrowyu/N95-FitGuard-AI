import { MaskType, Language, FaceShape } from './types';

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
    ],
    // 摄像头相关
    requestingCameraPermission: 'Requesting camera permission...',
    cameraPermissionHint: 'Please allow camera access in the browser popup',
    cameraPermissionTimeout: 'Camera permission request timed out. Please check your browser permissions.',
    loadingCamera: 'Loading camera...',
    // ARIA 标签
    ariaLabels: {
      takePhoto: 'Take photo',
      uploadFromGallery: 'Upload photo from gallery',
      analysisProgress: 'Analysis progress'
    }
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
    ],
    // 摄像头相关
    requestingCameraPermission: '正在请求摄像头权限...',
    cameraPermissionHint: '请在浏览器弹窗中允许访问摄像头',
    cameraPermissionTimeout: '摄像头权限请求超时，请检查浏览器权限设置。',
    loadingCamera: '正在加载摄像头...',
    // ARIA 标签
    ariaLabels: {
      takePhoto: '拍照',
      uploadFromGallery: '从相册上传照片',
      analysisProgress: '分析进度'
    }
  }
};

// ============================================================================
// 枚举映射系统 - 类型安全的翻译映射
// ============================================================================

/**
 * 枚举类别定义
 * 用于组织和管理不同类型的枚举值
 */
export type EnumCategory = 
  | 'faceShape'      // 脸型
  | 'dimension'      // 面部尺寸（高/中/低，宽/中/窄）
  | 'maskType';      // 口罩类型

/**
 * 枚举映射项接口
 * 定义单个枚举值的翻译结构
 */
export interface EnumMappingItem {
  /** 英文原文 */
  en: string;
  /** 中文翻译 */
  zh: string;
  /** 可选的描述信息 */
  description?: string;
}

/**
 * 类型安全的枚举映射表
 * 
 * 按类别组织枚举值，支持快速查找和扩展
 * 
 * @example
 * // 获取脸型翻译
 * ENUM_MAP.faceShape.Oval.zh // '椭圆形'
 * 
 * // 获取口罩类型翻译
 * ENUM_MAP.maskType['Cup Style'].zh // '杯型'
 */
export const ENUM_MAP: Record<EnumCategory, Record<string, EnumMappingItem>> = {
  faceShape: {
    [FaceShape.OVAL]: { 
      en: FaceShape.OVAL, 
      zh: '椭圆形',
      description: '均衡的面部比例，适合大多数口罩类型'
    },
    [FaceShape.ROUND]: { 
      en: FaceShape.ROUND, 
      zh: '圆形',
      description: '圆润的面部轮廓，需要选择有良好侧封的口罩'
    },
    [FaceShape.SQUARE]: { 
      en: FaceShape.SQUARE, 
      zh: '方形',
      description: '明显的下颌线，适合杯型或折叠型口罩'
    },
    [FaceShape.HEART]: { 
      en: FaceShape.HEART, 
      zh: '心形',
      description: '宽额头窄下巴，需要关注鼻梁密封'
    },
    [FaceShape.LONG]: { 
      en: FaceShape.LONG, 
      zh: '长形',
      description: '纵向较长的面部，适合高杯型口罩'
    },
    [FaceShape.DIAMOND]: { 
      en: FaceShape.DIAMOND, 
      zh: '菱形',
      description: '突出的颧骨，需要灵活的口罩边缘设计'
    },
  },
  dimension: {
    'Low': { en: 'Low', zh: '低', description: '较低的测量值' },
    'Medium': { en: 'Medium', zh: '中', description: '中等的测量值' },
    'High': { en: 'High', zh: '高', description: '较高的测量值' },
    'Narrow': { en: 'Narrow', zh: '窄', description: '较窄的测量值' },
    'Wide': { en: 'Wide', zh: '宽', description: '较宽的测量值' },
  },
  maskType: {
    [MaskType.CUP]: { 
      en: MaskType.CUP, 
      zh: '杯型',
      description: '经典硬质杯型设计，提供良好的呼吸空间'
    },
    [MaskType.FOLDED]: { 
      en: MaskType.FOLDED, 
      zh: '折叠型 (3面板)',
      description: '3面板设计，适合高面部活动和言语交流'
    },
    [MaskType.DUCKBILL]: { 
      en: MaskType.DUCKBILL, 
      zh: '鸭嘴型',
      description: '透气袋式设计，提供最大呼吸空间'
    },
    [MaskType.CONE]: { 
      en: MaskType.CONE, 
      zh: '锥型',
      description: '耐用网状外壳，适合工业环境'
    },
  },
};

/**
 * 扁平化的枚举翻译映射表（向后兼容）
 * 
 * 结构: Record<Language, Record<枚举值, 翻译>>
 * 英文作为默认语言，不需要翻译，使用原值
 * 
 * @deprecated 推荐使用 translateEnum 函数或 ENUM_MAP
 */
export const ENUM_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // 英文是默认语言，返回原值
  },
  zh: {
    // 脸型
    'Oval': '椭圆形',
    'Round': '圆形',
    'Square': '方形',
    'Heart': '心形',
    'Long': '长形',
    'Diamond': '菱形',
    // 面部尺寸
    'Low': '低',
    'Medium': '中',
    'High': '高',
    'Narrow': '窄',
    'Wide': '宽',
    // 口罩类型
    'Cup Style': '杯型',
    'Folded (3-Panel)': '折叠型 (3面板)',
    'Duckbill': '鸭嘴型',
    'Cone Style': '锥型'
  }
};

/**
 * 翻译枚举值 - 类型安全版本
 * 
 * @param value - 需要翻译的枚举值（英文）
 * @param lang - 目标语言
 * @returns 翻译后的值，如果没有翻译则返回原值
 * 
 * @example
 * translateEnum('Oval', 'zh') // '椭圆形'
 * translateEnum('Oval', 'en') // 'Oval'
 * translateEnum(MaskType.CUP, 'zh') // '杯型'
 */
export const translateEnum = (value: string, lang: Language): string => {
  if (lang === 'en') {
    return value;
  }
  return ENUM_TRANSLATIONS[lang]?.[value] ?? value;
};

/**
 * 翻译枚举值 - 增强版本（带类型推断）
 * 
 * @param category - 枚举类别
 * @param value - 枚举值
 * @param lang - 目标语言
 * @returns 翻译后的字符串
 * 
 * @example
 * translateEnumByCategory('faceShape', FaceShape.OVAL, 'zh') // '椭圆形'
 * translateEnumByCategory('maskType', MaskType.CUP, 'zh') // '杯型'
 */
export const translateEnumByCategory = (
  category: EnumCategory,
  value: string,
  lang: Language
): string => {
  if (lang === 'en') {
    return value;
  }
  return ENUM_MAP[category]?.[value]?.[lang] ?? value;
};

/**
 * 获取枚举项的完整信息
 * 
 * @param category - 枚举类别
 * @param value - 枚举值
 * @returns 枚举项的完整信息，如果不存在返回 null
 * 
 * @example
 * getEnumItem('faceShape', FaceShape.OVAL)
 * // { en: 'Oval', zh: '椭圆形', description: '...' }
 */
export const getEnumItem = (
  category: EnumCategory,
  value: string
): EnumMappingItem | null => {
  return ENUM_MAP[category]?.[value] ?? null;
};

/**
 * 获取枚举类别的所有值
 * 
 * @param category - 枚举类别
 * @param lang - 目标语言
 * @returns 该类别下所有枚举值的翻译数组
 * 
 * @example
 * getEnumValues('faceShape', 'zh')
 * // ['椭圆形', '圆形', '方形', '心形', '长形', '菱形']
 */
export const getEnumValues = (
  category: EnumCategory,
  lang: Language
): string[] => {
  const items = ENUM_MAP[category];
  if (!items) return [];
  
  return Object.values(items).map(item => 
    lang === 'en' ? item.en : item.zh
  );
};

/**
 * @deprecated 请使用 translateEnum 或 translateEnumByCategory 函数替代
 * 保留此常量以兼容旧代码，但建议使用新的翻译函数
 */
export const ENUM_MAPPING: Record<string, Record<string, string>> = ENUM_TRANSLATIONS;
