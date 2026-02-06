import React from 'react';
import { IconProps } from './types';

/**
 * 关闭图标
 * 用于关闭相机视图和弹窗
 */
export const CloseIcon: React.FC<IconProps> = ({ 
  className = 'w-6 h-6', 
  size,
  ...rest
}) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    {...rest}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

export default CloseIcon;
