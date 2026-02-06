import { SVGProps } from 'react';

/**
 * 图标组件通用属性接口
 * 
 * 继承自 React SVGProps，提供类型安全的图标组件属性
 * 
 * @example
 * // 基本用法
 * <CameraIcon className="w-6 h-6 text-teal-600" />
 * 
 * // 指定尺寸
 * <CameraIcon size={32} />
 * 
 * // 点击事件
 * <CloseIcon className="w-6 h-6" onClick={handleClose} />
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  /**
   * CSS 类名，用于设置图标大小和颜色
   * @default 根据具体图标而异
   */
  className?: string;
  
  /**
   * 图标尺寸（宽度和高度）
   * 如果设置，将覆盖 className 中的尺寸设置
   */
  size?: number;
}
