/*
 * @creater: panan
 * @message: DataPie
 * @since: 2024-12-04 15:27:03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-20 14:55:16
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/AntvChart/DataPie/index.tsx
 */
import { Card, Col, Row, Space, Table } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { Column, Pie } from '@antv/g2plot'
interface Props {
  data: any[]
}

const DataPie: FC<Props> = ({ data }) => {
  const lineCahrtRef = useRef<any>()
  const [dataSource, setDataSource] = useState<any>([])

  useEffect(() => {
    if (!data) return
    setDataSource(data)
  }, [data])

  const renderPieChart = (data: any[]) => {
    const options = {
      data,
      isStack: true,
      xField: 'year',
      yField: 'value',
      seriesField: 'type',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle'
        // 可配置附加的布局方法
        layout: [
          // 柱形图数据标签位置自动调整
          { type: 'interval-adjust-position' },
          // 数据标签防遮挡
          { type: 'interval-hide-overlap' },
          // 数据标签文颜色自动调整
          { type: 'adjust-color' },
        ],
      },
    } as any

    if (lineCahrtRef.current) {
      lineCahrtRef.current.changeData(data)
      lineCahrtRef.current.update(data)
      return
    }
    const stackedColumnPlot = new Column('PieChart', options);
    stackedColumnPlot.render();
    lineCahrtRef.current = stackedColumnPlot
  }

  useEffect(() => {
    if (!dataSource) return
    renderPieChart(dataSource)
  }, [dataSource])

  return (
    <Card
      title={
        <Space>
          <span>问题总览趋势</span>
        </Space>
      }
      styles={{ body: { padding: '0', margin: '10px' } }}
    >
      <Row>
        <Col span={24}>
          <div id="PieChart"></div>
        </Col>
      </Row>
    </Card>
  )
}

export default DataPie