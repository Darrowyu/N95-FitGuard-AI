import React from 'react';
import { IconProps } from './types';

/**
 * 重试/刷新图标
 * 用于重新扫描和重试操作
 */
export const RetryIcon: React.FC<IconProps> = ({ 
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
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
    />
  </svg>
);

export default RetryIcon;
