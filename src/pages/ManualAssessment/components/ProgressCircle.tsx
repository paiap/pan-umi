/*
 * @creater: panan
 * @message: 圆形进度条组件
 * @since: 2025-07-12 16:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-12 16:30:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/ProgressCircle.tsx
 */

import React from 'react';
import { Progress } from 'antd';

interface ProgressCircleProps {
  percent: number;
  size?: number;
  strokeColor?: string;
  title?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percent,
  size = 120,
  strokeColor = '#1890ff',
  title = '评估进度',
}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
        {title}
      </div>
      <Progress
        type="circle"
        percent={percent}
        size={size}
        strokeColor={strokeColor}
        format={(percent) => `${percent}%`}
      />
    </div>
  );
};

export default ProgressCircle;
