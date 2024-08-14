import { Button, Card, Col, DatePicker, Row, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import ModelExpression from './ModelExpression'
import CapabilityReport from './CapabilityReport'
interface Props {
  [key: string]: any
}

const ModelPerformance: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ModelExpression />
      </Col>
      <Col span={24}>
        <CapabilityReport />
      </Col>
    </Row>
  )
}

export default ModelPerformance