/*
 * @creater: panan
 * @message: DesignForm
 * @since: 2024-06-05 19:36:16
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-05 21:13:59
 * @文件相对于项目的路径: /pan-umi/src/pages/AntdForm/DesignForm/index.tsx
 */

import { Button, Form, Input, Select, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { typeOptions } from '../init';
interface Props {
  setItems: (c: any[]) => void
  [key: string]: any
}

interface dataParam {
  key: any,
  label: string,
  name: string,
  type: number,
  dependence: string
}

const basicRules = {
  required: true,
  message: '该字段必填'
}

const Item = Form.Item

const DesignForm: FC<Props> = ({ setItems }) => {
  const [dataSource, setDataSource] = useState<dataParam[]>([])
  const [options, setOptions] = useState<any[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    const curOptions = dataSource.map(c => ({
      value: c?.name,
      label: c?.label
    }))
    setOptions(curOptions)
  }, [dataSource])


  const handleData = (param: {
    id: number, name: string, value: string
  }) => {
    const { id, name, value } = param
    const filterDataSource = dataSource.map(c => {
      if (c.key === id) {
        return {
          ...c,
          [name]: value
        }
      }
      return { ...c }
    })
    setDataSource(filterDataSource)
  }

  const onValuesChange = (formValues: any) => {
    const curSelect = Object.keys(formValues).map((key: string) => {
      const name = key.split('-')[0]
      const id = Number(key.split('-')[1])
      const value = formValues[key]
      return {
        name,
        id,
        value
      }
    })
    handleData(curSelect[0])
  }


  const handleSubmit = async () => {
    await form.validateFields()
    setItems(dataSource)
  }

  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <Item>
        {
          dataSource.map((item: dataParam) => {
            if (!item) return null
            return (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap'
              }} key={item.key}>
                <Item style={{ marginLeft: '8px' }} label='name' name={`name-${item.key}`} rules={[basicRules]}>
                  <Input style={{ width: '200px' }} placeholder='属性' value={item?.name} />
                </Item>
                <Item style={{ marginLeft: '8px' }} label='label' name={`label-${item.key}`} rules={[basicRules]}>
                  <Input style={{ width: '200px' }} placeholder='展示的标签名称' value={item?.label} />
                </Item>
                <Item style={{ marginLeft: '8px' }} label='type' name={`type-${item.key}`} rules={[basicRules]}>
                  <Select options={typeOptions} style={{ width: '200px' }} placeholder='组件类型' value={item?.type} />
                </Item>
                <Item style={{ marginLeft: '8px' }} label='dependence' name={`dependence-${item.key}`}>
                  <Select options={options} style={{ width: '200px' }} placeholder='组件类型' value={item?.dependence} />
                </Item>
              </div>
            )
          })
        }
        <Button style={{ width: '100%' }} type='dashed' onClick={() => {
          setDataSource([...dataSource, {
            key: Date.now(),
            label: '',
            name: '',
            type: 1,
            dependence: ''
          }])
        }}>+</Button>
      </Item>
      <Item>
        <Button type='primary' onClick={handleSubmit}>确定</Button>
      </Item>
    </Form>
  )
}

export default DesignForm