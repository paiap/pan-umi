/*
 * @creater: panan
 * @message: Viewer
 * @since: 2024-07-05 14:25:13
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-05 14:29:42
 * @文件相对于项目的路径: /pan-umi/src/pages/Fileviewer/Viewer.tsx
 */

import React, { FC, useState, useEffect, useRef } from 'react'
import './index.css'
import { Drawer } from 'antd';
interface Props {
  name: string;
  record: any;
}

const Viewer: FC<Props> = ({ name, record }) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <span className='fileName' style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>{name}</span>
      <Drawer
        open={open}
        title={`${name} 预览`}
        onClose={() => setOpen(false)}
        width={800}
      >

      </Drawer>
    </>
  )
}

export default Viewer