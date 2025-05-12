/*
 * @creater: panan
 * @message: DataLine
 * @since: 2024-12-04 15:25:21
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-20 14:44:04
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/AntvChart/DataLine/index.tsx
 */

import { Line } from '@antv/g2plot'
import { Button, Card, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
interface Props {
  data: any[]
}

const DataLine: FC<Props> = ({ data }) => {

  const lineCahrtRef = useRef<any>()

  const renderLineChart = (data: any[]) => {

    const options = {
      data: data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      xAxis: {
        type: 'time',
      },
      yAxis: {
        label: {
          // 数值格式化为千分位
          formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      tooltip:{
        reversed: true
      }
    } as any
    if (lineCahrtRef.current) {
      lineCahrtRef.current.changeData(data)
      lineCahrtRef.current.update(options)
      return
    }
    const line = new Line('LineChart', options);
    line.render();
    lineCahrtRef.current = line
  }

  useEffect(() => {
    if (!data) return
    renderLineChart(data)
  }, [data])

  return (
    <Card
      title={
        <Space>
          <span>问题总览趋势</span>
        </Space>
      }
      styles={{ body: { padding: '0', margin: '10px' } }}
    >
      <div id="LineChart"></div>
    </Card>
  )
}

export default DataLine
