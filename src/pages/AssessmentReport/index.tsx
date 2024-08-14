/*
 * @creater: panan
 * @message: 评估报告
 * @since: 2024-07-12 10:41:40
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-12 14:58:35
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentReport/index.tsx
 */

import React, { FC, useState, useEffect, useRef } from 'react'
import { Button, Card, Col, Row, Space } from 'antd';
import RadarChart from './RadarChart';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import VersionLineChart from './VersionLineChart';
interface Props {
  record?: any
}

const AssessmentReport: FC<Props> = ({ record }) => {

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card
          title={
            <Space>
              <Button type='link'>返回</Button>
              <span>评估报告</span>
            </Space>
          }
          styles={{
            header: {
              padding: '0',
              margin: '0'
            },
            body: {
              margin: '0',
              padding: '0'
            }
          }}
        >
        </Card>
      </Col>
      <Col span={24}>
        {/* 雷达图 */}
        <RadarChart record={record} />
      </Col>
      <Col span={24}>
        <ColumnChart record={record} />
      </Col>
      <Col span={24}>
        <LineChart record={record} />
      </Col>
      {/* 当前版本GSB */}
      <Col span={24}>
        <PieChart record={record} />
      </Col>
      {/* 多版本GSB */}
      <Col span={24}>
        <VersionLineChart record={record} />
      </Col>
    </Row>
  )
}

export default AssessmentReport