/*
 * @creater: panan
 * @message: formtest
 * @since: 2024-08-05 13:45:25
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-05 14:31:55
 * @文件相对于项目的路径: /pan-umi/src/pages/FormTest/index.tsx
 */

import React, { forwardRef } from 'react';
import { Form, Input, Button } from 'antd';

const CustomInput = forwardRef((props: any, ref: any) => {
  const { value, onChange } = props;
  return <Input ref={ref} value={value} onChange={onChange} />;
});

const FormTest: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      console.log('Form values:', values);
    } catch (error) {
      const firstErrorField = (error as any).errorFields[0].name[0];
      console.log(error, firstErrorField);
      form.scrollToField(firstErrorField);
    }
  };

  return (
    <div style={{
      width: '600px',
      height: '200px',
      margin: 'auto',
      overflow: 'auto',
    }}>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <CustomInput />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Class"
          name="class"
          rules={[{ required: true, message: 'Please input your class!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button onClick={onFinish}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTest;