/*
 * @creater: panan
 * @message: SaveMirror
 * @since: 2024-08-19 10:55:33
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-19 11:03:17
 * @文件相对于项目的路径: /pan-umi/src/pages/InteractiveModel/SaveMirror/idnex.tsx
 */

import { Form, Input, Modal, Select } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
interface Props {
  record: any,
  [key: string]: any
}

const SaveMirror: FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue()
    console.log(formValues)
  }

  return (
    <>
      <a onClick={() => setOpen(true)}>保存镜像</a>
      <Modal
        title="保存镜像"
        visible={open}
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <Form form={form} labelCol={{ span: 3 }} >
          <Form.Item
            label='节点名称'
            name='name'
          >
            <Input placeholder='请输入节点名称' />
          </Form.Item>
          <Form.Item
            label='镜像资产'
            name='iamges'
          >
            <Select placeholder='请选择镜像资产' options={[]} />
          </Form.Item>
          <Form.Item
            label='Tag'
            name='tag'
            rules={[
              {
                // 仅支持小写字母，数字和中划线
                pattern:/^[a-z0-9-]+$/,
                message:'仅支持小写字母，数字和中划线'
              }
            ]}
          >
            <Input placeholder='仅支持小写字母，数字和中划线用于自定义版本' />
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default SaveMirror