/*
 * @creater: panan
 * @message: 创建开源模型步骤条
 * @since: 2025-03-17 14:51:12
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-30 17:20:20
 * @文件相对于项目的路径: /pan-umi/src/pages/CreateModel/CreateForm/Steps.tsx
 */

import React, { useState } from 'react';
import { Steps, Button, Form, Input, message } from 'antd';
import CreateForm from './index';

interface StepsFormProps {
  onFinish?: (values: any) => void;
}

const StepsForm: React.FC<StepsFormProps> = ({ onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>({});

  const steps = [
    {
      title: '基本信息',
      content: (
        <>
          <CreateForm form={form} />
        </>
      ),
    },
    {
      title: '描述信息',
      content: (
        <Form.Item
          name="text"
          label="详细描述"
          rules={[{ required: true, message: '请输入详细描述' }]}
        >
          <Input.TextArea
            rows={8}
            placeholder="请输入模型的详细描述信息"
          />
        </Form.Item>
      ),
    },
  ];

  const handleNext = async () => {
    try {
      // const values = await form.validateFields();
      const values = form.getFieldsValue();
      if (current === 0) {
        setFormData({ ...formData, ...values });
        setCurrent(1);
      } else {
        const allData = { ...formData, ...values };
        onFinish?.(allData);
        message.success('提交成功');
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handlePrev = () => {
    form.setFieldsValue(formData);
    setCurrent(0);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Steps
        current={current}
        items={steps.map(item => ({ title: item.title }))}
        style={{ marginBottom: '24px' }}
      />
      <Form
        form={form}
        // layout="vertical"
        style={{ margin: '0 auto' }}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 19 }}
      >
        {steps[current].content}

        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={handlePrev}>
              上一步
            </Button>
          )}
          <Button type="primary" onClick={handleNext}>
            {current < steps.length - 1 ? '下一步' : '提交'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StepsForm;

