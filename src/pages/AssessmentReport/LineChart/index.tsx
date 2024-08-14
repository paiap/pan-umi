/*
 * @creater: panan
 * @message: 折线图
 * @since: 2024-07-12 14:09:45
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-12 14:19:15
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentReport/LineChart/index.tsx
 */

import { Button, Card, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { lineData } from '../mock'
import { Line } from '@antv/g2plot'
interface Props {
  record: any
}

const LineChart: FC<Props> = ({ record }) => {
  const lineCahrtRef = useRef<any>()

  const renderLineChart = () => {
    if (lineCahrtRef.current) {
      lineCahrtRef.current.changeData(lineData)
      lineCahrtRef.current.update(lineData)
      return
    }
    const line = new Line('LineChart', {
      data: lineData,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      xAxis: {
        type: 'time',
      },
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
    });

    line.render();
    lineCahrtRef.current = line
  }

  useEffect(() => {
    // if (!record) return
    renderLineChart()
  }, [record])

  return (
    <Card
      title={
        <Space>
          <span>模型评估指标趋势</span>
          <Button type='link'>刷新</Button>
        </Space>
      }
      styles={{ body: { padding: '0', margin: '10px' } }}
    >
      <div id="LineChart"></div>
    </Card>
  )
}

export default LineChart