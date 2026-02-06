import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Logo 盾牌图标
export const LogoIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
    />
  </svg>
);

// 相机图标
export const CameraIcon: React.FC<IconProps> = ({ className = 'w-20 h-20', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.5} 
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={1.5} 
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
    />
  </svg>
);

// 箭头图标（向右）
export const ArrowIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M13 7l5 5m0 0l-5 5m5-5H6" 
    />
  </svg>
);

// 上传图标
export const UploadIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
    />
  </svg>
);

// 关闭图标
export const CloseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

// 错误/警告图标
export const ErrorIcon: React.FC<IconProps> = ({ className = 'w-10 h-10', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
    />
  </svg>
);

// 杯型口罩图标
export const MaskCupIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 20c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M2 12h20" />
    <path d="M12 2v20" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// 折叠型口罩图标
export const MaskFoldedIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 6h16l-2 6-2 6H8l-2-6-2-6z" />
    <path d="M2 6h20" />
    <path d="M4 12h16" />
  </svg>
);

// 鸭嘴型口罩图标
export const MaskDuckbillIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 12c0 4 9 8 10 8s10-4 10-8-9-8-10-8-10 4-10 8z" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 12v-4" />
  </svg>
);

// 锥型口罩图标
export const MaskConeIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 3L3 19h18L12 3z" />
    <path d="M12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
  </svg>
);

// 摘要/文档图标
export const SummaryIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
    />
  </svg>
);

// 警告图标
export const WarningIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
    />
  </svg>
);

// 勾选图标
export const CheckIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M5 13l4 4L19 7" 
    />
  </svg>
);

// 刷新/重新扫描图标
export const RefreshIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
    />
  </svg>
);

// 勾选圆形图标（用于评分卡片背景）
export const CheckCircleIcon: React.FC<IconProps> = ({ className = 'w-40 h-40', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// 口罩图标（用于摘要区域背景）
export const MaskBackgroundIcon: React.FC<IconProps> = ({ className = 'w-96 h-96', size }) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);
