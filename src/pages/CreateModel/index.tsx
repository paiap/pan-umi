/*
 * @creater: panan
 * @message: 
 * @since: 2025-03-14 15:07:54
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-14 16:00:25
 * @文件相对于项目的路径: /pan-umi/src/pages/CreateModel/index.tsx
 */
import React, { useState } from 'react';
import { Modal, Card, Button } from 'antd';
import { CodeOutlined, CloudOutlined } from '@ant-design/icons';

const CreateModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelType, setModelType] = useState('self');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModelTypeChange = (type: string) => {
    setModelType(type);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={showModal} size="large">
        创建模型
      </Button>

      <Modal
        title="选择模型类型"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        width={800}
        centered
      >
        <div style={{ display: 'flex', gap: '24px', padding: '12px 0' }}>
          <Card
            hoverable
            style={{
              flex: 1,
              cursor: 'pointer',
              padding: '32px',
              border: modelType === 'self' ? '2px solid #1890ff' : '1px solid #d9d9d9',
              transition: 'all 0.3s ease',
              boxShadow: modelType === 'self' ? '0 8px 24px rgba(24, 144, 255, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
              borderRadius: '8px',
              background: modelType === 'self' ? 'rgba(24, 144, 255, 0.02)' : '#fff'
            }}
            onClick={() => handleModelTypeChange('self')}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <CodeOutlined style={{ fontSize: '40px', color: '#1890ff', marginRight: '12px' }} />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#262626' }}>自研模型</h3>
              </div>
              <p style={{ color: '#595959', margin: 0, fontSize: '14px', lineHeight: '22px', textAlign: 'left' }}>
                即公司内部训练的模型，需要登记详细的算法组、模型负责人、管理数据集等信息
              </p>
            </div>
          </Card>
          <Card
            hoverable
            style={{
              flex: 1,
              cursor: 'pointer',
              padding: '32px',
              border: modelType === 'open' ? '2px solid #1890ff' : '1px solid #d9d9d9',
              transition: 'all 0.3s ease',
              boxShadow: modelType === 'open' ? '0 8px 24px rgba(24, 144, 255, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
              borderRadius: '8px',
              background: modelType === 'open' ? 'rgba(24, 144, 255, 0.02)' : '#fff'
            }}
            onClick={() => handleModelTypeChange('open')}
            bodyStyle={{ padding: 0 }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <CloudOutlined style={{ fontSize: '40px', color: '#1890ff', marginRight: '12px' }} />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#262626' }}>开源模型</h3>
              </div>
              <p style={{ color: '#595959', margin: 0, fontSize: '14px', lineHeight: '22px', textAlign: 'left' }}>
                即国内外网络公开的模型资源，可将其下载至模型广场，currently支持 HuggingFace、Github、ModelScope等多个来源
              </p>
            </div>
          </Card>
        </div>
      </Modal>
    </div>
  );
};


export default CreateModel;