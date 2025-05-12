/*
 * @creater: panan
 * @message: RequirementShow
 * @since: 2025-04-16 11:05:58
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-16 13:53:45
 * @文件相对于项目的路径: /pan-umi/src/pages/ImageTest/RequirementShow.tsx
 */

import { Button, Drawer } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import BaseMonacoEditor from '../MonacoEditor/BaseMonacoEditor'

interface Props {
  data: any[]
  title: string
  showEditor?: boolean
}

const handleData = (data: any[]) => {
  // const result: Record<string, any> = {}
  // data.forEach((item: string) => {
  //   const name = item.split('==')?.[0]
  //   const version = item.split('==')?.[1]
  //   result[name] = version
  // })
  return data.join('\n')
}
const RequirementShow: FC<Props> = ({ data, title, showEditor = false }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [showData, setShowData] = useState<any>('')

  useEffect(() => {
    if (!showEditor || !data) return
    const curData = handleData(data)
    setShowData(curData)
  }, [data, showEditor])
  // 打开抽屉
  const openDrawer = () => {
    setOpen(true)
    if (!data) return
    const curData = handleData(data)
    setShowData(curData)
  }
  // 关闭抽屉
  const cancelDrawer = () => {
    setOpen(false)
  }


  return (
    <>
      {
        showEditor ? (
          <>
            <BaseMonacoEditor
              mode="edit"
              defaultValue={showData}
              language="yaml"
              height="1000px"
              readOnly
              showEditor
            />
          </>
        ) : (
          <>
            <Button type='link' onClick={openDrawer}>依赖详情</Button >
            <Drawer
              open={open}
              title={title}
              placement="right"
              onClose={cancelDrawer}
              width={800}
              styles={{
                body: {
                  padding: '0px',
                  margin: '0px'
                }
              }}
            >
              <BaseMonacoEditor
                mode="edit"
                defaultValue={showData}
                language="yaml"
                height="1000px"
                readOnly
                showEditor
              />
            </Drawer>
          </>
        )
      }

    </>
  )
}


export default RequirementShow

