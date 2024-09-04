import { Radar } from '@antv/g2plot'
import { Button, Card, DatePicker, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { modelExpressionInitData } from '../mock'
interface Props {
  [key: string]: any
}

const ModelExpression: FC<Props> = () => {

  const modelExpressionRef = useRef<any>()

  const renderRadarChart = () => {
    if (modelExpressionRef.current) {
      modelExpressionRef.current.changeData(modelExpressionInitData)
      modelExpressionRef.current.update(modelExpressionInitData)
      return
    }
    const radarPlot = new Radar('ModelExpressionChart', {
      data: modelExpressionInitData,
      xField: 'item',
      yField: 'score',
      seriesField: 'type',
      meta: {
        score: {
          alias: '分数',
          min: 0,
          max: 80,
        },
        parent: {}
      },
      // smooth: true,
      area: {},
      // 开启辅助点
      point: {
        size: 2,
      },
    });

    radarPlot.render();
    modelExpressionRef.current = radarPlot
  }

  useEffect(() => {
    renderRadarChart()
  },[])

  return (
    <Card
      title={
        <Space>
          <div>模型综合表现雷达图</div>
          <span style={{ fontSize: '13px', color: '#b3b3b3' }}>模型表现模块用以展示当前模型在多个评测集上展现出的能力变化，用以表现模型的综合能力</span>
        </Space>
      }
      extra={
        <Space>
          <DatePicker.RangePicker />
          <Button type='primary'>过滤评估日期</Button>
        </Space>
      }
    >
      <div id="ModelExpressionChart"></div>
    </Card>
  )
}

export default ModelExpression