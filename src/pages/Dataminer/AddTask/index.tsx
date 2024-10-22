/*
 * @creater: panan
 * @message: 新建任务
 * @since: 2024-10-22 15:08:24
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-22 15:50:43
 * @文件相对于项目的路径: /pan-umi/src/pages/Dataminer/AddTask/index.tsx
 */

import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { history } from '@umijs/max'
import { Button, Form, Input, Modal, Radio, Space, Tooltip } from 'antd'
import { set } from 'lodash'
import React, { FC, useState } from 'react'
interface Props {
  [key: string]: any
}

const basicRules = {
  required: true,
  message: '该字段必填项'
}

const AddTask: FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const onOk = async () => {
    const values = await form.validateFields()
    console.log(values)

    try {
      setLoading(true)
      // TODO 处理创建任务逻辑
      // 成功之后关闭弹窗，跳转至配置页面
      setOpen(false)
      const id = '123'
      history.push(`/dataminer/config/${id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        key="button"
        icon={<PlusOutlined />}
        onClick={() => {
          setOpen(true)
        }}
        type="primary"
      >
        新建任务
      </Button>
      <Modal
        title="创建任务"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText="开始配置"
        confirmLoading={loading}
      >
        <Form form={form}>
          <Form.Item label={
            <Space>
              <span>任务类型</span>
              <Tooltip title='针对已上线的业务，挖掘线上模型回答较差的问句'>
                <QuestionCircleOutlined />
              </Tooltip>
            </Space>
          } name="type" initialValue={'sft'} rules={[basicRules]}>
            <Radio.Group>
              <Radio value="sft">SFT 难例</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="任务名称"
            name="name"
            rules={[basicRules, {
              pattern: /^(?!_)(?!.*__)(?!.*_$)(?!.*^_)[^_]+_[^_]+_[^_]+$/,
              message: '请输入正确格式：任务类型_日期_序号'
            }]}

          >
            <Input
              placeholder="任务类型_日期_序号"
            />
          </Form.Item>
          <Form.Item label="任务描述" name="description" rules={[basicRules]}>
            <Input.TextArea
              placeholder='请输入任务描述'
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}

export default AddTask