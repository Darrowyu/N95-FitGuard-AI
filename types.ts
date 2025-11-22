export type Language = 'en' | 'zh';

export enum FaceShape {
  OVAL = 'Oval',
  ROUND = 'Round',
  SQUARE = 'Square',
  HEART = 'Heart',
  LONG = 'Long',
  DIAMOND = 'Diamond'
}

export enum MaskType {
  CUP = 'Cup Style',
  FOLDED = 'Folded (3-Panel)',
  DUCKBILL = 'Duckbill',
  CONE = 'Cone Style'
}

export interface FacialDimensions {
  noseBridgeHeight: 'Low' | 'Medium' | 'High';
  chinWidth: 'Narrow' | 'Medium' | 'Wide';
  faceWidth: 'Narrow' | 'Medium' | 'Wide';
  cheekboneProminence: 'Low' | 'Medium' | 'High';
}

export interface RecommendedMask {
  type: MaskType;
  modelName: string;
  matchScore: number;
  reason: string;
}

export interface AnalysisResult {
  faceShape: FaceShape;
  dimensions: FacialDimensions;
  overallFitScore: number; // 0-100
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

export type AppState = 'idle' | 'camera' | 'analyzing' | 'results' | 'error';