/*
 * @creater: panan
 * @message: 折线图
 * @since: 2024-07-12 14:09:45
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-12 14:19:15
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentReport/PieChart/index.tsx
 */

import { Button, Card, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { pieData } from '../mock'
import { Pie } from '@antv/g2plot'
interface Props {
  record: any
}

const PieChart: FC<Props> = ({ record }) => {
  const pieCahrtRef = useRef<any>()

  const renderPieChart = () => {
    if (pieCahrtRef.current) {
      pieCahrtRef.current.changeData(pieData)
      pieCahrtRef.current.update(pieData)
      return
    }
    const piePlot = new Pie('PieChart', {
      appendPadding: 10,
      data:pieData,
      angleField: 'value',
      colorField: 'type',
      radius: 0.75,
      label: {
        type: 'spider',
        labelHeight: 28,
        content: '{name}\n{percentage}',
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    });
    
    piePlot.render();
    pieCahrtRef.current = piePlot
  }

  useEffect(() => {
    // if (!record) return
    renderPieChart()
  }, [record])

  return (
    <Card
      title={
        <Space>
          <span>当前版本GSB</span>
          <Button type='link'>刷新</Button>
        </Space>
      }
      styles={{ body: { padding: '0', margin: '10px' } }}
    >
      <div id="PieChart"></div>
    </Card>
  )
}

export default PieChart