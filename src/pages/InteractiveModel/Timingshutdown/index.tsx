/*
 * @creater: panan
 * @message: Timingshutdown
 * @since: 2024-08-19 10:23:52
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-19 10:56:41
 * @文件相对于项目的路径: /pan-umi/src/pages/InteractiveModel/Timingshutdown/index.tsx
 */

import { Alert, Form, InputNumber, message, Modal, Radio, Switch } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
interface Props {
  record: any,
  [key: string]: any
}

const Timingshutdown: FC<Props> = ({ record }) => {

  const [open, setOpen] = useState<boolean>(false)
  const [custom, setCustom] = useState<number>(8)
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue()
    console.log(formValues)
  }

  return (
    <>
      <a onClick={() => setOpen(true)}>定时关机</a>
      <Modal
        title="定时关机设置"
        visible={open}
        open={open}
        onOk={handleSubmit}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Alert
          message="实例【med_group】支持定时关机，开启该选项后，实例将在选定时长后自动关闭"
          type="info"
          showIcon
        />
        <Form form={form}>
          <Form.Item
            label='启用定时关机'
            name='isShutDown'
            valuePropName='checked'
            initialValue={false}
            style={{ marginBottom: '8px', marginTop: '16px' }}
          >
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {
              ({ getFieldValue }) => {
                const isShutDown = getFieldValue('isShutDown')
                if (isShutDown) {
                  return (
                    <Form.Item name={'time'} label='定时关机时间' initialValue={1}>
                      <Radio.Group>
                        <Radio value={1}>1小时后</Radio>
                        <Radio value={2}>2小时后</Radio>
                        <Radio value={4}>4小时后</Radio>
                        <Radio value={6}>6小时后</Radio>
                        <Radio value={custom}>自定义(小时) <InputNumber min={1} value={custom} onChange={(val: number | null) => {
                          if (!val) {
                            message.warning('自定义关机时间不能为空')
                            setCustom(8)
                            return
                          }
                          setCustom(val)
                        }} /></Radio>
                      </Radio.Group>
                    </Form.Item>
                  )
                }
                return null
              }
            }
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Timingshutdown