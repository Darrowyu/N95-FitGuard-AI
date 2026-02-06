import React from 'react';
import { IconProps } from './types';

/**
 * 锥型口罩图标
 * 用于表示 Cone Style 类型的 N95 口罩
 */
export const MaskConeIcon: React.FC<IconProps> = ({ 
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
    <path d="M12 3L3 19h18L12 3z" />
    <path d="M12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
  </svg>
);

export default MaskConeIcon;
