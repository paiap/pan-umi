/*
 * @creater: panan
 * @message: TagsProgress-标签数据可视化组件
 * @since: 2025-05-14 10:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-11 14:53:16
 * @文件相对于项目的路径: /pan-umi/src/components/TagsProgress/index.tsx
 */

import React, { useMemo } from 'react';
import { Space, Tag, Tooltip } from 'antd';
import styles from './index.less';

export interface TagItem {
  name: string;      // 标签名称
  count: number;     // 标签数量
  color?: string;    // 标签颜色（可选）
}

interface TagsProgressProps {
  tags: TagItem[];                // 标签数据数组
  showTags?: boolean;            // 是否显示标签（默认显示）
  height?: number;               // 进度条高度（默认8px）
  colorMap?: Record<string, string>; // 标签名称到颜色的映射（可选）
  defaultColors?: string[];      // 默认颜色数组（当没有指定颜色时使用）
  showTooltip?: boolean;         // 是否显示提示（默认显示）
  className?: string;            // 自定义类名
  style?: React.CSSProperties;   // 自定义样式
}

// 默认颜色数组
const DEFAULT_COLORS = [
  '#E5C1CD', // 浅粉色
  '#B8D8BA', // 浅绿色
  '#A4C2F4', // 浅蓝色
  '#FFD966', // 浅黄色
];


export const changeUnit = (byte: number): string => {
  if (typeof byte !== 'number' || isNaN(byte) || byte < 0) {
    return '0 B'; // 非法输入返回默认值
  }

  if (byte < 1024) return `${byte} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = byte / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
};

const TagsProgress: React.FC<TagsProgressProps> = ({
  tags,
  showTags = true,
  height = 8,
  colorMap,
  defaultColors = DEFAULT_COLORS,
  showTooltip = true,
  className,
  style,
}) => {
  // 计算总数
  const total = useMemo(() => tags.reduce((sum, tag) => sum + tag.count, 0), [tags]);

  // 计算每个标签的百分比和颜色
  const tagData = useMemo(() => {
    return tags.map((tag, index) => {
      // 计算百分比
      const percent = total > 0 ? (tag.count / total) * 100 : 0;

      // 确定颜色
      let color = tag.color;
      if (!color && colorMap) {
        color = colorMap[tag.name];
      }
      if (!color) {
        color = defaultColors[index % defaultColors.length];
      }

      return {
        ...tag,
        percent,
        color,
      };
    });
  }, [tags, total, colorMap, defaultColors]);

  return (
    <div className={`${styles.tagsProgressContainer} ${className || ''}`} style={style}>
      {/* 进度条 */}
      <div className={styles.progressBar} style={{ height }}>
        {tagData.map((tag, index) => (
          <Tooltip
            key={index}
            title={showTooltip ? `${tag.name}:${changeUnit(tag.count)}(${tag.percent.toFixed(1)}%)` : ''}
            placement="top"
          >
            <div
              className={styles.progressSegment}
              style={{
                width: `${tag.percent}%`,
                backgroundColor: tag.color,
              }}
            />
          </Tooltip>
        ))}
      </div>

      {/* 标签列表 */}
      {showTags && (
        <div className={styles.tagsList}>
          <Space wrap size='small'>
            {tagData.map((tag, index) => (
              <Tag
                key={index}
                color="default"
                style={{ borderLeft: `3px solid ${tag.color}` }}
              >
                {tag.name}
                {changeUnit(tag.count)}
              </Tag>
            ))}
          </Space>
        </div>
      )}
    </div>
  );
};

export default TagsProgress;