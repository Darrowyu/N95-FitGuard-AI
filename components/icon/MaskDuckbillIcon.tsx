import React from 'react';
import { IconProps } from './types';

/**
 * 鸭嘴型口罩图标
 * 用于表示 Duckbill 类型的 N95 口罩
 */
export const MaskDuckbillIcon: React.FC<IconProps> = ({ 
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
    <path d="M2 12c0 4 9 8 10 8s10-4 10-8-9-8-10-8-10 4-10 8z" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 12v-4" />
  </svg>
);

export default MaskDuckbillIcon;
