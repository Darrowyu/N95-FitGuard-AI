import React from 'react';
import { IconProps } from './types';

/**
 * 勾选图标
 * 用于表示成功状态和无泄漏提示
 */
export const CheckIcon: React.FC<IconProps> = ({ 
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
      d="M5 13l4 4L19 7" 
    />
  </svg>
);

export default CheckIcon;
