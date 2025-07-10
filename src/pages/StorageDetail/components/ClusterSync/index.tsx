/*
 * @creater: panan
 * @message: ClusterSync-跨集群同步数据
 * @since: 2025-05-13 22:15:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-13 21:28:02
 */

import React, { useState } from 'react';
import { Button, Modal, Select, Form } from 'antd';

interface ClusterSyncProps {
  [x: string]: any;
}

const ClusterSync: React.FC<ClusterSyncProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleConfirm = () => {
    form.validateFields().then(values => {
      console.log('跨集群同步数据:', values);
      setIsModalOpen(false);
      form.resetFields();
    }).catch(error => {
      console.error('表单验证失败:', error);
    });
  };

  return (
    <>
      <Button type='link' onClick={showModal}>同步</Button>
      <Modal 
        title="跨集群同步数据" 
        open={isModalOpen} 
        onCancel={handleCancel}
        onOk={handleConfirm}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            name="targetCluster" 
            label="将试卷网数学题目同步至共享存储：" 
            rules={[{ required: true, message: '请选择目标共享存储' }]}
          >
            <Select placeholder="请选择">
              <Select.Option value="cluster1">共享存储1</Select.Option>
              <Select.Option value="cluster2">共享存储2</Select.Option>
              <Select.Option value="cluster3">共享存储3</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClusterSync;