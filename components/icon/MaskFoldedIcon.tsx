import React from 'react';
import { IconProps } from './types';

/**
 * 折叠型口罩图标
 * 用于表示 Folded (3-Panel) 类型的 N95 口罩
 */
export const MaskFoldedIcon: React.FC<IconProps> = ({ 
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
    <path d="M4 6h16l-2 6-2 6H8l-2-6-2-6z" />
    <path d="M2 6h20" />
    <path d="M4 12h16" />
  </svg>
);

export default MaskFoldedIcon;
