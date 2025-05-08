/*
 * @creater: panan
 * @message: CreateExperimentalGroup 创建实验组
 * @since: 2025-04-22 21:14:07
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 16:12:44
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/experimentalGroupTable/CreateExperimentalGroup/index.tsx
 */

import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Space, Modal, message, Popconfirm } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { TextArea } = Input

// 模拟数据 - 一级标签
const mockFirstLevelTags = [
  { id: '1', name: '标签A' },
  { id: '2', name: '标签B' },
  { id: '3', name: '标签C' },
]

// 模拟数据 - 二级标签
const mockSecondLevelTags = {
  '1': [{ id: '11', name: '标签A-1' }, { id: '12', name: '标签A-2' }],
  '2': [{ id: '21', name: '标签B-1' }, { id: '22', name: '标签B-2' }],
  '3': [{ id: '31', name: '标签C-1' }, { id: '32', name: '标签C-2' }],
}

interface Props {
  refresh?: () => void;
}
const CreateExperimentalGroup: React.FC<Props> = ({ refresh }) => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const handleName = () => {
    const updatedTags = form.getFieldValue('tags');
    if (updatedTags && updatedTags.length > 0) {
      const tagNames = updatedTags.map((tag: any) => {
        if (!tag || !tag.firstTagId || !tag.secondTagId) return '';
        const fTag = mockFirstLevelTags.find(t => t.id === tag.firstTagId);
        const sTag = mockSecondLevelTags[tag.firstTagId as keyof typeof mockSecondLevelTags]?.find((t: any) => t.id === tag.secondTagId);
        return `${fTag?.name || ''}-${sTag?.name || ''}`;
      }).filter(Boolean);
      const name = `${tagNames.join('+')}+${new Date().getTime()}`;
      form.setFieldsValue({ name: name });
    } else {
      form.setFieldsValue({ name: '' });
    }
  }

  // 监听标签变化，自动生成实验组名称
  useEffect(() => {
    const tags = form.getFieldValue('tags') || []
    if (tags.length > 0) {
      const validTags = tags.filter((tag: any) => tag && tag.firstTagId && tag.secondTagId)
      if (validTags.length > 0) {
        handleName()
      }
    }
  }, [form])

  // 打开弹窗
  const showModal = () => {
    setIsModalOpen(true)
    form.resetFields()
    form.setFieldsValue({
      name: '',
      description: ''
    })
  }

  // 关闭弹窗
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setSubmitting(true)
      // 构建提交数据
      const submitData = {
        ...values,
        labelName: (values.tags || []).map((tag: any) => tag?.secondTagId),
        tags: undefined,
      }
      console.log('提交数据:', submitData)

      // 模拟提交
      setTimeout(() => {
        form.resetFields()
        setSubmitting(false)
        setIsModalOpen(false)
        // 将表单中的name复制到剪切板中
        navigator.clipboard.writeText(values.name).then(() => {
          message.success('提交成功，已复制实验组名称到剪切板')
        }).catch((error) => {
          console.error('复制失败:', error)
        })
      }, 1000)
    } catch (error: any) {
      console.log(error)
    } finally {
      if (refresh) {
        refresh();
      }
    }
  }

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        新建实验组
      </Button>

      <Modal
        title="新建实验组"
        open={isModalOpen}
        width={1000}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitting}
            onClick={handleSubmit}
          >
            确定
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="实验组标签" required style={{ marginBottom: 0 }}>
            <Form.List name="tags">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field: any) => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'firstTagId']}
                        fieldKey={[field.fieldKey, 'firstTagId']}
                        rules={[{ required: true, message: '请选择一级标签' }]}
                      >
                        <Select
                          placeholder="选择一级标签"
                          style={{ width: 350 }}
                          onChange={() => {
                            // 当一级标签变化时，清空对应的二级标签
                            const tags = form.getFieldValue('tags');
                            tags[field.name].secondTagId = undefined;
                            form.setFieldsValue({ tags });
                            // 更新实验组名称
                            handleName();
                          }}
                        >
                          {mockFirstLevelTags.map(tag => (
                            <Select.Option key={tag.id} value={tag.id}>
                              {tag.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'secondTagId']}
                        fieldKey={[field.fieldKey, 'secondTagId']}
                        rules={[{ required: true, message: '请选择二级标签' }]}
                      >
                        <Select
                          placeholder="选择二级标签"
                          style={{ width: 350 }}
                          disabled={!form.getFieldValue(['tags', field.name, 'firstTagId'])}
                          onChange={() => {
                            // 更新实验组名称
                            handleName();
                          }}
                        >
                          {form.getFieldValue(['tags', field.name, 'firstTagId']) &&
                            mockSecondLevelTags[form.getFieldValue(['tags', field.name, 'firstTagId']) as keyof typeof mockSecondLevelTags]?.map((tag: any) => (
                              <Select.Option key={tag.id} value={tag.id}>
                                {tag.name}
                              </Select.Option>
                            ))}
                        </Select>
                      </Form.Item>
                      {/* 删除确认框 */}
                      <Popconfirm
                        title="确定要删除该实验组标签吗？"
                        onConfirm={() => {
                          remove(field.name);
                          handleName();
                        }}
                      >
                        <Button type="text" danger>
                          删除
                        </Button>
                      </Popconfirm>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add({})}
                      icon={<PlusOutlined />}
                      style={{ width: '100%' }}
                    >
                      添加标签
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            name="name"
            label="实验组名称"
            rules={[{ required: true, message: '请输入实验组名称' }]}
          >
            <Input
              placeholder="实验组名称自动生成，规则：标签+时间戳"
              disabled
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="实验组描述"
            rules={[{ required: true, message: '请输入实验组描述' }]}
          >
            <TextArea
              placeholder="实验组描述自动生成，允许修改"
              autoSize={{ minRows: 3, maxRows: 6 }}
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateExperimentalGroup
