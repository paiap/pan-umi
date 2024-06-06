/*
 * @creater: panan
 * @message: MarkdownEdit
 * @since: 2024-06-05 14:59:05
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-05 16:25:35
 * @文件相对于项目的路径: /pan-umi/src/pages/MarkdownEdit/index.tsx
 */

import React, { FC, useEffect, useState } from 'react'
import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/react'
import 'bytemd/dist/index.css'
import initData from './index'
import { PageContainer } from '@ant-design/pro-components'

const plugins = [
  gfm(),
]

type Props = Record<string, any>;

const MarkdownEdit: FC<Props> = () => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(initData)
  }, [])
  return (
    <PageContainer ghost header={{
      title: 'markdown编辑器',
    }}>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v)
        }}
      />
    </PageContainer>

  )
}

export default MarkdownEdit
