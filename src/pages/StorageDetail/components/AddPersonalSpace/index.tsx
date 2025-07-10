/*
 * @creater: panan
 * @message: AddPersonalSpace-新增个人空间
 * @since: 2025-05-13 22:20:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-13 22:20:00
 */

import React, { useState } from 'react';
import { Button, Modal, Form, Select } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

interface AddPersonalSpaceProps {
  [x: string]: any;
}

const AddPersonalSpace: React.FC<AddPersonalSpaceProps> = () => {
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
      console.log('新增个人空间:', values);
      setIsModalOpen(false);
      form.resetFields();
    }).catch(error => {
      console.error('表单验证失败:', error);
    });
  };

  return (
    <>
      <Button type="dashed" icon={<UserAddOutlined />} style={{ width: '100%' }} onClick={showModal}>+ 添加用户</Button>
      <Modal
        title="新增个人空间"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleConfirm}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="user"
            label="用户名："
            rules={[{ required: true, message: '请选择归属合集' }]}
          >
            <Select placeholder="请选择归属合集">
              <Select.Option value="user1">用户1</Select.Option>
              <Select.Option value="user2">用户2</Select.Option>
              <Select.Option value="user3">用户3</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPersonalSpace;