/*
 * @creater: panan
 * @message: AntvChart
 * @since: 2024-12-04 15:05:56
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-20 14:52:12
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/AntvChart/index.tsx
 */
import { Button, Col, DatePicker, Modal, Row, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useState, useEffect, useRef } from 'react'
import DataLine from './DataLine'
import DataPie from './DataPie'
import { lineData } from './DataLine/mock'
import { mockData } from './DataPie/mock'
interface Props {
  [key: string]: any
}

const AntvChart: FC<Props> = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const openModal = () => {
    setVisible(true)
  }

  const cancelVisible = () => {
    setVisible(false)
  }

  return (
    <>
      <Button type='link' onClick={openModal}>查看</Button>

      <Modal
        title='数据看板'
        open={visible}
        onCancel={cancelVisible}
        onOk={cancelVisible}
        width={1200}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <DataLine data={lineData} />
          </Col>
          <Col span={24}>
            <DataPie data={mockData}/>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default AntvChart