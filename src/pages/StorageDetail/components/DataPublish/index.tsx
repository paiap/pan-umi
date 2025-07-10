/*
 * @creater: panan
 * @message: DataPublish-数据打版
 * @since: 2025-05-13 22:25:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 11:25:33
 */

import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { ExportOutlined, EyeOutlined, ApiOutlined } from '@ant-design/icons';
import './index.less';

interface DataPublishProps {
  [x: string]: any;
}

const DataPublish: React.FC<DataPublishProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publishMethod, setPublishMethod] = useState<string>('ui'); // 默认选中界面化操作归档

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    console.log('数据打版方式:', publishMethod);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button icon={<ExportOutlined />} onClick={showModal}>数据打版</Button>
      <Modal 
        title="数据打版" 
        open={isModalOpen} 
        onCancel={handleCancel}
        onOk={handleConfirm}
        okText="确认"
        cancelText="取消"
      >
        <p>将数据按约定格式整理规范后打版数据集，格式说明<a href="#">点这</a>，</p>
        <p>打版方式见以下两种：</p>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div 
            className={`publish-card-item ${publishMethod === 'ui' ? 'selected' : ''}`}
            onClick={() => setPublishMethod('ui')}
          >
            <div style={{display: 'flex', alignItems: 'center'}}>
              <EyeOutlined style={{fontSize: '20px', marginRight: '12px'}} />
              <span style={{fontSize: '16px', fontWeight: 'bold'}}>界面化操作归档</span>
            </div>
            <div style={{marginTop: '8px', color: '#999', fontSize: '14px'}}>{'进入数据集，点击"导入数据"按提示操作'}</div>
          </div>
          <div
            className={`publish-card-item ${publishMethod === 'api' ? 'selected' : ''}`}
            onClick={() => setPublishMethod('api')}
          >
            <div style={{display: 'flex', alignItems: 'center'}}>
              <ApiOutlined style={{fontSize: '20px', marginRight: '12px'}} />
              <span style={{fontSize: '16px', fontWeight: 'bold'}}>API请求归档</span>
            </div>
            <div style={{marginTop: '8px', color: '#999', fontSize: '14px'}}>按接口说明发起归档</div>
          </div>
        </Space>
      </Modal>
    </>
  );
};

export default DataPublish;