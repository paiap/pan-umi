/*
 * @creater: panan
 * @message: CreateForm
 * @since: 2025-03-14 15:48:34
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-14 16:06:00
 * @文件相对于项目的路径: /pan-umi/src/pages/CreateModel/CreaateForm.tsx
 */
import React from 'react';
import { Form, Input, Card, InputNumber } from 'antd';

interface CreateFormProps {
  [key: string]: any;
}

export const CreateForm: React.FC<CreateFormProps> = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Card title="基础信息" style={{ marginBottom: 16 }}>
        <Form.Item
          label="模型名称"
          name="modelName"
          rules={[{ required: true, message: '请输入模型名称' }]}
        >
          <Input placeholder="请输入模型名称" />
        </Form.Item>

        <Form.Item
          label="模型地址"
          name="modelUrl"
          rules={[{ required: true, message: '请输入模型地址' }]}
        >
          <Input placeholder="请输入模型地址" />
        </Form.Item>

        <Form.Item
          label="模型类型"
          name="modelType"
          rules={[{ required: true, message: '请输入模型类型' }]}
        >
          <Input placeholder="请输入模型类型" />
        </Form.Item>
      </Card>

      <Card title="模型属性" style={{ marginBottom: 16 }}>
        <Form.Item
          label="模型规模"
          name="modelSize"
          rules={[{ required: true, message: '请输入模型规模' }]}
        >
          <Input placeholder="请输入模型规模，例如：13B" />
        </Form.Item>

        <Form.Item
          label="训练次数"
          name="trainingCount"
          rules={[{ required: true, message: '请输入训练次数' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入训练次数" />
        </Form.Item>

        <Form.Item
          label="应用领域"
          name="applicationField"
          rules={[{ required: true, message: '请输入应用领域' }]}
        >
          <Input placeholder="请输入应用领域" />
        </Form.Item>
      </Card>
    </Form>
  );
};
