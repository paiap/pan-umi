/*
 * @creater: panan
 * @message: ShowForm
 * @since: 2024-06-05 19:37:16
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-06 09:55:47
 * @文件相对于项目的路径: /pan-umi/src/pages/AntdForm/ShowForm/index.tsx
 */
import { Button, Form } from 'antd'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { antdComponentsMap, typeOptions } from '../init';
import MonacoEditor from '@monaco-editor/react';

import 'bytemd/dist/index.css'
interface Props {
  items: dataParam[]
  [key: string]: any
}

interface dataParam {
  key: any,
  label: string,
  name: string,
  type: number,
  dependence: string
}
const ShowForm: FC<Props> = ({ items }) => {
  const [form] = Form.useForm()
  const [context, setContext] = useState<any>()

  useEffect(() => {
    if (items.length === 0) return
    console.log(items)
  }, [items])

  const getFormItem = (): any[] => {
    return items.map((item: dataParam) => {
      const { label, name, type, dependence } = item
      const CurLabel = typeOptions.find((item) => item.value === type)?.label
      if (!CurLabel) return null
      if (dependence) {
        return (`
        <Form.Item noStyle shouldUpdate key={'${item.key}'}>
            {
              ({ getFieldValue }) => {
                const val = getFieldValue('${dependence}')
                if (!val) return null
                return (
                  <Form.Item key={'${item.key}'} label={'${label}'} name={'${name}'}>
                    {${CurLabel} && <${CurLabel} placeholder={\`请填写${name}字段\`} />}
                  </Form.Item>
                )
              }
            }
          </Form.Item>`
        )
      }
      return (`
        <Form.Item key={'${item.key}'} label={'${label}'} name={'${name}'}>
            <${CurLabel} placeholder={\`请填写${name}字段\`} />
        </Form.Item>`
      )
    })
  }

  const handleContext = () => {
    const text = getFormItem().join('\n')
    return `
    <Form form={form} >
      ${text}
    </Form>
    `
  }

  const renderFormItem = useMemo(() => {
    return items.map((item) => {
      const { label, name, type, dependence } = item
      const CurLabel = typeOptions.find((item) => item.value === type)?.label
      if (!CurLabel) return null
      const CurComponent = antdComponentsMap[CurLabel as keyof typeof antdComponentsMap]
      if (dependence) {
        return (
          <Form.Item noStyle shouldUpdate key={item.key}>
            {
              ({ getFieldValue }) => {
                const val = getFieldValue(dependence)
                if (!val) return null
                return (
                  <Form.Item key={item.key} label={label} name={name}>
                    {CurComponent && <CurComponent placeholder={`请填写${name}字段`} />}
                  </Form.Item>
                )
              }
            }
          </Form.Item>
        )
      }
      return (
        <Form.Item key={item.key} label={label} name={name}>
          {CurComponent && <CurComponent placeholder={`请填写${name}字段`} />}
        </Form.Item>
      )
    })
  }, [items])

  return (
    <>
      <Form form={form} >
        {renderFormItem}
        <Button onClick={() => {
          const curContext = handleContext()
          console.log(curContext)
          setContext(curContext)
        }}>输出</Button>
      </Form>
      {
        context && (
          <MonacoEditor
            height="800px"
            defaultLanguage="json"
            theme="vs-dark"
            options={{
              readOnly: true,
            }}
            value={context}
          />
        )
      }
    </>
  )
}

export default ShowForm