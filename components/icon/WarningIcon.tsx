import React from 'react';
import { IconProps } from './types';

/**
 * 警告图标
 * 用于显示潜在泄漏点和警告信息
 */
export const WarningIcon: React.FC<IconProps> = ({ 
  className = 'w-5 h-5', 
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
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
    />
  </svg>
);

export default WarningIcon;
