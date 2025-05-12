/*
 * @creater: panan
 * @message: CreateForm
 * @since: 2025-03-14 15:48:34
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-17 20:18:01
 * @文件相对于项目的路径: /pan-umi/src/pages/CreateModel/CreateForm/index.tsx
 */
import React, { useEffect } from 'react';
import { Form, Input, Card, InputNumber, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface CreateFormProps {
  [key: string]: any;
}

const CreateForm: React.FC<CreateFormProps> = ({ form }: any) => {

  useEffect(() => {
    console.log(form?.getFieldsValue())
  }, [])

  const handleAutoFetch = async () => {
    const modelUrl = form.getFieldValue('modelUrl');
    if (!modelUrl) {
      return;
    }
    // 这里模拟自动获取数据
    const mockData = {
      modelName: '通义千问 QwQ-32B',
      modelEnName: 'QwQ-32B',
      modelDesc: 'XXXXXXXXXXXXXXXXXXXXXXXX',
      modelLogo: null
    };
    form.setFieldsValue(mockData);
  };

  return (
    <>
      <Card title="基础信息" style={{ marginBottom: 16 }}>
        <Form.Item
          label="模型来源"
          name="modelSource"
          rules={[{ required: true, message: '请选择模型来源' }]}
        >
          <Select
            placeholder="请选择模型来源"
            options={[
              { value: 'ModelScope', label: 'ModelScope' },
              { value: 'Github', label: 'Github' },
              { value: 'HuggingFace', label: 'HuggingFace' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="模型地址"
          name="modelUrl"
          rules={[{ required: true, message: '请输入模型地址' }]}
        // style={{ marginBottom: 0 }}
        >
          <Input.Group compact>
            <Form.Item
              name="modelUrl"
              noStyle
              rules={[{ required: true, message: '请输入模型地址' }]}
            >
              <Input style={{ width: 'calc(100% - 120px)' }} placeholder="请输入模型地址，必须是完整的URL地址" />
            </Form.Item>
            <Button type="primary" onClick={handleAutoFetch} style={{ width: 120 }}>
              自动获取模型信息
            </Button>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="模型名称"
          name="name"
          rules={[{ required: true, message: '请输入模型名称' }]}
        >
          <Input placeholder="请输入模型名称，例如：通义千问 QwQ-32B" />
        </Form.Item>

        <Form.Item
          label="模型英文名"
          name="modelName"
          rules={[{ required: true, message: '请输入模型英文名' }]}
        >
          <Input placeholder="请输入模型英文名，例如：QwQ-32B" />
        </Form.Item>

        <Form.Item
          label="模型描述"
          name="description"
          rules={[{ required: true, message: '请输入模型描述' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入模型描述" />
        </Form.Item>

        <Form.Item
          label="模型logo"
          name="modelLogo"
          rules={[{ required: true, message: '请上传模型logo' }]}
        >
          <Upload
            maxCount={1}
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>
      </Card>

      <Card title="模型属性" style={{ marginBottom: 16 }}>
        <Form.Item
          label="模型规模"
          name="modelScale"
          rules={[{ required: true, message: '请选择模型规模' }]}
        >
          <Select
            placeholder="请输入模型规模"
            options={[
              { value: 'bigModel', label: '大模型' },
              { value: 'smallModel', label: '小模型' },
            ]}
          />
        </Form.Item>

        <Form.Item noStyle shouldUpdate>
          {
            ({ getFieldValue }) => {
              const modelScale = getFieldValue('modelScale');
              if (modelScale === 'bigModel') {
                return (
                  <Form.Item
                    label="模型阶段"
                    name="modelPeriod"
                    rules={[{ required: true, message: '请输入模型阶段' }]}
                  >
                    <Input placeholder="请输入模型阶段，例如：RLHF" />
                  </Form.Item>
                )
              }
              return null
            }
          }
        </Form.Item>



        <Form.Item
          label="模型参数"
          name="pamramLevel"
          rules={[{ required: true, message: '请输入模型参数' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入模型参数，例如：13B" />
        </Form.Item>


        <Form.Item noStyle shouldUpdate>
          {
            ({ getFieldValue }) => {
              const modelScale = getFieldValue('modelScale');
              if (modelScale === 'bigModel') {
                return (
                  <Form.Item
                    label="基座类型"
                    name="baseKind"
                    rules={[{ required: true, message: '请输入基座类型' }]}
                  >
                    <Input placeholder="请输入基座类型，例如：语言模型" />
                  </Form.Item>
                )
              }
              return null
            }
          }
        </Form.Item>

        <Form.Item
          label="上下文长度"
          name="contextLength"
          rules={[{ required: true, message: '请输入上下文长度' },{
            pattern: /^[0-9]+[kK]?$/,
            message: '请输入数字或者数字+K(k)',
          }]}
        >
          <Input placeholder="请输入上下文长度，例如：8192" />
        </Form.Item>


        <Form.Item noStyle shouldUpdate>
          {
            ({ getFieldValue }) => {
              const modelScale = getFieldValue('modelScale');
              if (modelScale === 'bigModel') {
                return (
                  <Form.Item
                    label="指令格式"
                    name="directionType"
                    rules={[{ required: true, message: '请输入指令格式' }]}
                  >
                    <Input placeholder="请输入指令格式，例如：llama2" />
                  </Form.Item>
                )
              }
              return null
            }
          }
        </Form.Item>

        <Form.Item
          label="应用领域"
          name="applicationArea"
          rules={[{ required: true, message: '请输入应用领域' }]}
        >
          <Input placeholder="请输入应用领域，例如：通用" />
        </Form.Item>

        <Form.Item
          label="应用语言"
          name="modelLanguage"
          rules={[{ required: true, message: '请输入应用语言' }]}
        >
          <Input placeholder="请输入应用语言，例如：多语言" />
        </Form.Item>
      </Card>

      <Card title="关联数据集" style={{ marginBottom: 16 }}>
        <Form.Item
          label="标注数据集"
          name="datasetTagIdList"
          rules={[{ required: true, message: '请选择标注数据集' }]}
        >
          <Input placeholder="请选择标注数据集" />
        </Form.Item>

        <Form.Item
          label="通用数据集"
          name="sampleFolderIdList"
          rules={[{ required: true, message: '请选择通用数据集' }]}
        >
          <Input placeholder="请选择通用数据集" />
        </Form.Item>
      </Card>
    </>
  );
};

export default CreateForm;
