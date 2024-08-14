/*
 * @creater: panan
 * @message: 柱状图
 * @since: 2024-07-12 14:09:45
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-12 14:19:47
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentReport/ColumnChart/index.tsx
 */
import { Button, Card, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { columnData } from '../mock'
import { Column } from '@antv/g2plot'
interface Props {
  record: any
}

const ColumnChart: FC<Props> = ({ record }) => {
  const columnCahrtRef = useRef<any>()

  const renderColumnChart = () => {
    if (columnCahrtRef.current) {
      columnCahrtRef.current.changeData(columnData)
      columnCahrtRef.current.update(columnData)
      return
    }
    const stackedColumnPlot = new Column('ColumnChart', {
      data: columnData,
      isGroup: true,
      xField: '月份',
      yField: '月均降雨量',
      seriesField: 'name',
      /** 设置颜色 */
      //color: ['#1ca9e6', '#f88c24'],
      /** 设置间距 */
      // marginRatio: 0.1,
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'middle', 'bottom'
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
    });
    stackedColumnPlot.render();
    columnCahrtRef.current = stackedColumnPlot
  }

  useEffect(() => {
    // if (!record) return
    renderColumnChart()
  }, [record])
  return (
    <Card
      title={
        <Space>
          <span>裁判员模型分数分布</span>
          <Button type='link'>刷新</Button>
        </Space>
      }
      styles={{ body: { padding: '0', margin: '10px' } }}
    >
      <div id="ColumnChart"></div>
    </Card>
  )
}

export default ColumnChart