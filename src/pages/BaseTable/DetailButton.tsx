/*
 * @creater: panan
 * @message: 
 * @since: 2025-03-24 15:22:03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-24 15:57:11
 * @文件相对于项目的路径: /pan-umi/src/pages/BaseTable/DetailButton.tsx
 */
import React, { useRef, useState, useEffect } from 'react';
import { Button, Drawer, message } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Paragraph } = Typography;

interface DetailButtonProps {
  text: string;
  field: string;
}

const DetailButton: React.FC<DetailButtonProps> = ({ text, field }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      setShowButton(element.scrollHeight > element.clientHeight);
    }
  }, [text]);

  const containerStyle: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    position: 'relative',
    paddingRight: showButton ? '60px' : '0',
    minHeight: '44px'
  };

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    bottom: 0
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {text}
      {showButton && (
        <Button 
          type="link" 
          style={buttonStyle}
          onClick={() => setDrawerVisible(true)}
        >
          详情
        </Button>
      )}
      <Drawer
        title={field}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        extra={
          <Button
            type={isCopied ? "default" : "primary"}
            color={isCopied ? "default" : "primary"}
            variant="filled"
            icon={isCopied ? <CheckOutlined /> : <CopyOutlined />}
            onClick={() => {
              if(isCopied) return;
              navigator.clipboard.writeText(text).then(() => {
                setIsCopied(true);
                message.success('复制成功');
                setTimeout(() => setIsCopied(false), 3000);
              }).catch(() => {
                message.error('复制失败');
              });
            }}
          >
            {isCopied ? '已复制' : '复制文本'}
          </Button>
        }
        width={800}
      >
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {(() => {
            try {
              const parsedJson = JSON.parse(text);
              return (
                <Paragraph>
                  <pre style={{ margin: 0, backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
                    <code>
                      {JSON.stringify(parsedJson, null, 2)}
                    </code>
                  </pre>
                </Paragraph>
              );
            } catch (e) {
              return (
                <Paragraph
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: '1.5715',
                    color: 'rgba(0, 0, 0, 0.85)',
                    backgroundColor: '#f5f5f5',
                    padding: '12px',
                    borderRadius: '4px',
                    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'
                  }}
                >
                  {text}
                </Paragraph>
              )
            }
          })()}
        </div>
      </Drawer>
    </div>
  );
};

export default DetailButton;