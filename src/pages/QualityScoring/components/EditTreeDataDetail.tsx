/*
 * @creater: panan
 * @message: EditTreeDataDetail
 * @since: 2024-12-26 17:38:54
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-26 18:06:41
 * @文件相对于项目的路径: /pan-umi/src/pages/QualityScoring/components/EditTreeDataDetail.tsx
 */

import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
interface Props {
  node: any;
  type: 'create' | 'edit';
  addNode?: (key: string) => void;
  [key: string]: any
}

const EditTreeDataDetail: FC<Props> = ({ type, node, addNode }) => {

  const [open, setOpen] = useState<boolean>(false)

  const openModal = () => {
    setOpen(true)
  }

  const cancelOpen = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!node || !open) return
    if (type === 'edit') {
      // TODO 编辑回显逻辑
    }
  }, [type, node, open])

  return (
    <>
      {
        type === 'create' && (
          <Button
            type='link'
            size="small"
            icon={<PlusOutlined />}
            onClick={openModal}
          // onClick={() => addNode && addNode(node.key)}
          />
        )
      }
      {
        type === 'edit' && (
          <Button
            type='link'
            size="small"
            icon={<EditOutlined />}
            onClick={openModal}
          />
        )
      }

      <Modal
        open={open}
        title={type === 'create' ? '新增维度' : '编辑维度'}
        onCancel={cancelOpen}
        width={1000}
      >
      </Modal>
    </>
  )
}

export default EditTreeDataDetail