import React from 'react';
import { IconProps } from './types';

/**
 * 杯型口罩图标
 * 用于表示 Cup Style 类型的 N95 口罩
 */
export const MaskCupIcon: React.FC<IconProps> = ({ 
  className = 'w-7 h-7', 
  size,
  ...rest
}) => (
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
    {...rest}
  >
    <path d="M12 20c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M2 12h20" />
    <path d="M12 2v20" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default MaskCupIcon;
