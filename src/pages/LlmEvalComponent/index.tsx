/*
 * @creater: panan
 * @message: LlmEvalComponent
 * @since: 2025-04-22 15:00:16
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 16:58:12
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/index.tsx
 */

import { Form, Space } from 'antd'
import React from 'react'
import AddexperimentalGroup from './AddexperimentalGroup'
import ExperimentalGroupTable from './experimentalGroupTable'
import BatchExperimentalGroup from './BatchExperimentalGroup'
import MaxVersion from './MaxVersion'

const LlmEvalComponent = () => {
  const [form] = Form.useForm()
  return (
    <Space direction='vertical' size="large" style={{ width: '100%', padding: '24px' }}>
      <Form form={form}>
        <Form.Item
          name="existingGroup"
          label="实验组名称"
          rules={[{ required: true, message: '请选择所属实验组' }]}
        >
          <AddexperimentalGroup />
        </Form.Item>
        <Form.Item
          name="version"
          label="版本号"
          rules={[{ required: true, message: '请选择版本号' }]}
        >
          <MaxVersion currentVersion="4.7.1" />
        </Form.Item>
      </Form>

      <BatchExperimentalGroup trainTasks={[1, 2, 3]} />
      <ExperimentalGroupTable />
    </Space>
  )
}

export default LlmEvalComponent
