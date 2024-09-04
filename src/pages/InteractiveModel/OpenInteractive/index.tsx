/*
 * @creater: panan
 * @message: OpenInteractive
 * @since: 2024-08-19 09:39:26
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-19 10:28:19
 * @文件相对于项目的路径: /pan-umi/src/pages/InteractiveModel/OpenInteractive/index.tsx
 */

import { Modal } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import PanSelectCard from './PanSelectCard'
interface Props {
  record: any
}

const data = [
  {
    id: 1,
    name: '远程终端',
    description: '远程终端进入容器执行命令，访问文件',
  },
  {
    id: 2,
    name: 'JupyterLab',
    description: '一个开源的跨平台应用，支持web交互式开发环境'
  },
  {
    id: 3,
    name: 'SSH远程连接',
    description: '通过SSH协议建立远程安全连接，支持保存SSH秘钥免密登录'
  }
]

const OpenInteractive: FC<Props> = ({ record }) => {

  const [open,setOpen] = useState<boolean>(false)
  const [selectId, setSelected] = useState<number>(1)

  return (
    <>
      <a onClick={() => setOpen(true)}>打开</a>
      <Modal
        title="请选择创建方式"
        visible={open}
        open={open}
        onOk={() => {
          console.log(selectId)
        }}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <PanSelectCard data={data} value={selectId} onChange={(val: number) => setSelected(val)}/>
      </Modal>
    </>
  )
}

export default OpenInteractive