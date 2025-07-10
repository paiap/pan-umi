/*
 * @creater: panan
 * @message: 
 * @since: 2025-05-14 16:53:32
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 17:16:02
 * @文件相对于项目的路径: /pan-umi/src/pages/StorageDetail/components/AddDirectoryModal/index.tsx
 */

import React, { useState } from 'react';
import { Modal, Input, Form, Button } from 'antd';

interface AddDirectoryModalProps {
  [x: string]: any;
}

const AddDirectoryModal: React.FC<AddDirectoryModalProps> = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);

  const handleCreate = (values: { path: string; owner: string; description: string }) => {
    console.log('New Directory Created:', values);
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        handleCreate(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };


  return (

    <>
      <Button type='primary' onClick={() => setVisible(true)}>+新建数据目录</Button>
      <Modal
        visible={visible}
        title="新建数据目录"
        okText="创建"
        cancelText="取消"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={handleOk}
        width={700}
      >
        <Form
          form={form}
          labelCol={{
            span: 4
          }}
        >
          <Form.Item
            name="path"
            label="目录名称"
            rules={[{ required: true, message: '请输入目录名称!' }]}
          >
            <Input placeholder='请输入目录名称' />
          </Form.Item>
          <Form.Item
            name="owner"
            label="负责人"
            rules={[{ required: true, message: '请输入负责人!' }]}
          >
            <Input placeholder='请选择负责人' />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea
              autoSize={{
                minRows: 3,
                maxRows: 6,
              }}
              placeholder='请输入描述'
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddDirectoryModal;