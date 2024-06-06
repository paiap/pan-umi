/*
 * @creater: panan
 * @message: antd的form表单生成器
 * @since: 2024-06-05 16:52:33
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-06 09:58:09
 * @文件相对于项目的路径: /pan-umi/src/pages/AntdForm/index.tsx
 */

import React, { FC, useState } from 'react'
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels'
import DesignForm from './DesignForm'
import ShowForm from './ShowForm'

interface Props {
  [key: string]: any
}

const AntdForm: FC<Props> = () => {
  const [items, setItems] = useState<any[]>([])

  return (
    <PanelGroup direction="horizontal" style={{ height: '1000px' }}>
      <Panel style={{
        backgroundColor: '#EEEEEE',
        padding: '8px'
      }} minSize={20} defaultSize={75}>
        <DesignForm setItems={setItems}/>
      </Panel>
      <PanelResizeHandle />
      <Panel style={{
        backgroundColor: '#CCFFFF',
        padding: '8px'
      }} minSize={20}>
        <ShowForm items={items}/>
      </Panel>
    </PanelGroup>
  )
}

export default AntdForm