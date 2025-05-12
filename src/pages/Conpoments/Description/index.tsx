/*
 * @creater: panan
 * @message: decription
 * @since: 2025-03-27 14:06:42
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-27 14:59:51
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/Description/index.tsx
 */
import { Descriptions, DescriptionsProps } from 'antd';
import React, { useMemo } from 'react';

interface PanDescriptionProps extends Omit<DescriptionsProps, 'items'> {
  items: DescriptionsProps['items'];
  column?: number;
}

const PanDescription: React.FC<PanDescriptionProps> = ({ items = [], column = 3, ...props }) => {
  // 计算每个描述项的span值，确保布局均匀
  const processedItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    const totalItems = items.length;
    const lastRowItems = totalItems % column || column;
    
    return items.map((item: any, index) => {
      // 如果是最后一行的项目
      if (index >= totalItems - lastRowItems) {
        const isLongContent = item?.children?.toString().length > 50;
        // 如果内容较长，让它独占一行
        if (isLongContent) {
          return { ...item, span: column };
        }
        // 计算最后一行每个项目应该占用的列数
        const span = Math.ceil(column / lastRowItems);
        return { ...item, span };
      }
      return item;
    });
  }, [items, column]);

  return (
    <Descriptions
      {...props}
      items={processedItems}
      // bordered
      // column={column}
    />
  );
};

export default PanDescription;
