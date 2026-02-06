// 引入 ReactNode 类型
import type { ReactNode } from 'react';

// 语言类型定义
export type Language = 'en' | 'zh';

// 脸型枚举
export enum FaceShape {
  OVAL = 'Oval',
  ROUND = 'Round',
  SQUARE = 'Square',
  HEART = 'Heart',
  LONG = 'Long',
  DIAMOND = 'Diamond'
}

// 口罩类型枚举
export enum MaskType {
  CUP = 'Cup Style',
  FOLDED = 'Folded (3-Panel)',
  DUCKBILL = 'Duckbill',
  CONE = 'Cone Style'
}

// 面部尺寸接口
export interface FacialDimensions {
  noseBridgeHeight: 'Low' | 'Medium' | 'High';
  chinWidth: 'Narrow' | 'Medium' | 'Wide';
  faceWidth: 'Narrow' | 'Medium' | 'Wide';
  cheekboneProminence: 'Low' | 'Medium' | 'High';
}

// 推荐口罩接口
export interface RecommendedMask {
  type: MaskType;
  modelName: string;
  matchScore: number;
  reason: string;
}

// 分析结果接口
export interface AnalysisResult {
  faceShape: FaceShape;
  dimensions: FacialDimensions;
  overallFitScore: number; // 总体适配评分 0-100
  sealIssues: string[];
  recommendations: RecommendedMask[];
  summary: string;
  metrics: {
    noseFit: number;
    chinFit: number;
    cheekFit: number;
    jawFit: number;
  };
}

// 应用状态类型
export type AppState = 'idle' | 'camera' | 'analyzing' | 'results' | 'error';

// ========== 错误边界类型定义 ==========

// 错误边界组件 Props
export interface ErrorBoundaryProps {
  children: ReactNode;
  lang: Language;
}

// 错误边界组件 State
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// 错误边界翻译文本
export interface ErrorBoundaryTranslations {
  title: string;
  description: string;
  retry: string;
  reload: string;
  details: string;
}