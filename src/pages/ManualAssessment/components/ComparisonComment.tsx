/*
 * @creater: panan
 * @message: 对比说明组件 - 支持文本和图片粘贴
 * @since: 2025-07-14 00:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-21 14:59:01
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/ComparisonComment.tsx
 */

import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Space, message, Image } from 'antd';
import { DeleteOutlined, PictureOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface ComparisonCommentProps {
  value?: {
    text?: string;
    images?: string[]; // base64 images
  };
  onChange?: (value: { text?: string; images?: string[] }) => void;
  placeholder?: string;
  disabled?: boolean;
  height?: string; // 新增高度属性
}

const ComparisonComment: React.FC<ComparisonCommentProps> = ({
  value = { text: '', images: [] },
  onChange,
  placeholder = '请输入对比说明...',
  disabled = false,
  // height, // 保留接口但暂时不使用，组件内部自动计算高度
}) => {
  const [text, setText] = useState(value.text || '');
  const [images, setImages] = useState<string[]>(value.images || []);
  const textAreaRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState(80); // 减小默认高度

  // 最大图片数量限制
  const MAX_IMAGES = 4;

  // 同步外部值变化
  useEffect(() => {
    setText(value.text || '');
    setImages(value.images || []);
  }, [value]);

  // 动态计算TextArea高度
  const calculateHeight = () => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight;
    const headerHeight = 36; // 标题区域高度
    const footerHeight = 18; // 底部提示区域高度
    const imageHeight = images.length > 0 ? (Math.ceil(images.length / 4) * 86 + 28) : 0; // 恢复80px图片尺寸 (80px + 6px 间距)
    const margins = 20; // 间距余量
    const availableHeight = containerHeight - headerHeight - footerHeight - imageHeight - margins;

    // 有图片时减小文本框高度
    const minHeight = 40; // 有图片时更小的最小高度
    const maxHeight = images.length > 0 ? 40 : 180; // 有图片时更小的最大高度

    const newHeight = Math.max(minHeight, Math.min(maxHeight, availableHeight));
    setTextAreaHeight(newHeight);
  };

  useEffect(() => {
    // 立即计算一次高度
    calculateHeight();

    // 监听容器尺寸变化
    const resizeObserver = new ResizeObserver(() => {
      // 使用 requestAnimationFrame 确保在下一帧更新
      requestAnimationFrame(calculateHeight);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [images.length]);

  // 图片数量变化时立即重新计算高度
  useEffect(() => {
    // 使用 setTimeout 确保 DOM 已更新
    const timer = setTimeout(calculateHeight, 0);
    return () => clearTimeout(timer);
  }, [images.length]);

  // 触发值变化回调
  const triggerChange = (newText: string, newImages: string[]) => {
    onChange?.({ text: newText, images: newImages });
  };

  // 文件转base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 文本变化处理
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    triggerChange(newText, images);
  };

  // 处理粘贴事件
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();

        // 检查图片数量限制
        if (images.length >= MAX_IMAGES) {
          message.warning(`最多只能添加${MAX_IMAGES}张图片`);
          return;
        }

        const file = item.getAsFile();
        if (file) {
          try {
            const base64 = await fileToBase64(file);
            const newImages = [...images, base64];
            setImages(newImages);
            triggerChange(text, newImages);

            // 立即触发高度重新计算
            requestAnimationFrame(() => {
              calculateHeight();
            });

            message.success('图片粘贴成功');
          } catch (error) {
            message.error('图片处理失败');
          }
        }
      }
    }
  };

  // 删除图片
  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    triggerChange(text, newImages);

    // 立即触发高度重新计算
    requestAnimationFrame(() => {
      calculateHeight();
    });
  };

  // 清空所有内容
  const handleClear = () => {
    setText('');
    setImages([]);
    triggerChange('', []);

    // 立即触发高度重新计算
    requestAnimationFrame(() => {
      calculateHeight();
    });
  };

  return (
    <div ref={containerRef} className="comparison-comment" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      <div style={{ marginBottom: 12, flexShrink: 0 }}>
        <Space>
          <span style={{ fontWeight: 500 }}>对比说明：</span>
          {(text || images.length > 0) && (
            <Button
              size="small"
              type="text"
              icon={<DeleteOutlined />}
              onClick={handleClear}
              disabled={disabled}
            >
              清空
            </Button>
          )}
        </Space>
      </div>

      <TextArea
        ref={textAreaRef}
        value={text}
        onChange={handleTextChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          marginBottom: images.length > 0 ? 12 : 0,
          height: `${textAreaHeight}px`,
          resize: 'none',
          flexShrink: 0,
          transition: 'height 0.05s ease-out' // 极速响应，几乎无延迟
        }}
      />

      {images.length > 0 && (
        <div className="comment-images" style={{ flexShrink: 0 }}>
          <div style={{ marginBottom: 6, fontSize: 11, color: '#666' }}>
            <PictureOutlined /> 已添加 {images.length}/{MAX_IMAGES} 张图片
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            padding: 6,
            backgroundColor: '#fafafa'
          }}>
            {images.map((img, index) => (
              <div key={index} style={{ position: 'relative', flexShrink: 0 }}>
                <Image
                  src={img}
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                  preview={{
                    mask: false,
                  }}
                />
                {!disabled && (
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      background: '#ff4d4f',
                      color: 'white',
                      borderRadius: '50%',
                      minWidth: 18,
                      height: 18,
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      fontSize: '10px'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 8, fontSize: 12, color: '#999', flexShrink: 0 }}>
        支持直接粘贴图片 (Ctrl+V) 或输入文字说明，最多支持{MAX_IMAGES}张图片
      </div>
    </div>
  );
};

export default ComparisonComment;
