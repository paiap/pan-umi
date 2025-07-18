/*
 * @creater: panan
 * @message: 可复用的全屏显示组件
 * @since: 2025-07-14 17:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-14 17:30:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/FullscreenDisplay.tsx
 */

import React, { useEffect } from 'react';
import { Button, Card } from 'antd';
import { CompressOutlined } from '@ant-design/icons';

interface FullscreenDisplayProps {
  visible: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const FullscreenDisplay: React.FC<FullscreenDisplayProps> = ({
  visible,
  title,
  content,
  onClose,
}) => {
  // ESC键监听
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && visible) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 9999,
        padding: '16px',
        overflow: 'auto'
      }}
    >
      <Card 
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{title}</span>
            <Button
              type="text"
              icon={<CompressOutlined />}
              onClick={onClose}
              size="small"
              title="退出全屏 (ESC)"
              style={{ color: '#666' }}
            >
              退出全屏
            </Button>
          </div>
        }
        style={{ height: '100vh' }}
      >
        <div style={{
          padding: '16px',
          fontSize: '16px',
          lineHeight: '1.8',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          height: 'calc(100vh - 120px)',
          overflow: 'auto'
        }}>
          {content}
        </div>
      </Card>
    </div>
  );
};

export default FullscreenDisplay;
