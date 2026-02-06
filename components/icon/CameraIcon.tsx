import React from 'react';
import { IconProps } from './types';

/**
 * 相机图标
 * 用于触发相机扫描和作为主界面主要操作图标
 */
export const CameraIcon: React.FC<IconProps> = ({ 
  className = 'w-20 h-20', 
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

export default CameraIcon;
