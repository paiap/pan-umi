/*
 * @creater: panan
 * @message: 批量纳入实验组
 * @since: 2025-04-23 15:59:32
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 16:10:22
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/BatchExperimentalGroup/index.tsx
 */
import React, { FC, useState } from 'react'
import { Button, Modal, Form, Space } from 'antd'
import AddexperimentalGroup from '../AddexperimentalGroup';

interface Props {
  trainTasks: number[] | string[];
}

const BatchExperimentalGroup: FC<Props> = ({ trainTasks }) => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const handleOpen = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      console.log(values)
      // 这里可以处理实验组名称的提交逻辑
      setVisible(false)
      form.resetFields()
    } catch (error) {
      // 校验失败
    }
  }

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        批量纳入实验组
      </Button>
      <Modal
        title={
          <Space>
            <span>纳入实验组</span>
            <span style={{ color: '#8c8c8c', fontSize: '12px' }}>(已选择{trainTasks?.length}个任务)</span>
          </Space>
        }

        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        width={700}
      >
        <Form form={form}>
          <Form.Item
            label="实验组名称"
            name="experimentGroupId"
            rules={[{ required: true, message: '请输入实验组名称' }]}
          >
            <AddexperimentalGroup />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default BatchExperimentalGroup
