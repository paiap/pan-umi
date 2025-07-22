import { Button, Card, DatePicker, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import ModelExpression from './ModelExpression'
import CapabilityReport from './CapabilityReport'
interface Props {
  [key: string]: any
}

const ModelPerformance: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ModelExpression />
      <CapabilityReport />
    </div>
  )
}

export default ModelPerformance