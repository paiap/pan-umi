/*
 * @creater: panan
 * @message: 内容展示组件
 * @since: 2025-07-10 12:35:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-10 12:35:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/ContentDisplay.tsx
 */

import React from 'react';
import { Card, Button } from 'antd';
import { ExpandOutlined } from '@ant-design/icons';

interface ContentDisplayProps {
  title: string;
  content: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  onFullscreen?: (title: string, content: string) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  title,
  content,
  width = '100%',
  height = '300px',
  style,
  onFullscreen,
}) => {

  const handleFullscreen = () => {
    if (onFullscreen) {
      onFullscreen(title, content);
    }
  };

  const cardStyle: React.CSSProperties = {
    width,
    height,
    display: 'flex',
    flexDirection: 'column',
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '12px',
    backgroundColor: '#fafafa',
    margin: 0,
    fontSize: '14px',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: '100%',
  };


  return (
    <React.Fragment>
      <Card
        title={title}
        style={cardStyle}
        bodyStyle={{ 
          padding: 0, 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        extra={
          <Button
            type="text"
            icon={<ExpandOutlined />}
            onClick={handleFullscreen}
            size="small"
            title="全屏查看"
          />
        }
      >
        <div style={contentStyle}>
          {content}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ContentDisplay;
