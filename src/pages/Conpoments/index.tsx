/*
 * @creater: panan
 * @message: Conpoments小组件
 * @since: 2024-11-07 09:48:56
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-10 15:40:49
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/index.tsx
 */

import { Card, Col, Row } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import SearchFormCom from './SearchFormCompoment/SearchFormCom'
import AntvChart from './AntvChart'
import AntvG6 from './AntvG6'
import Fuhe from './Fuhe'
interface Props {
  [key: string]: any
}

const Conpoments: FC<Props> = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        {/* 搜索框小组件 */}
        <Card title="搜索框小组件">
          <SearchFormCom />
        </Card>
        <Card title="弹窗图标">
          <AntvChart />
        </Card>
        <Card title="复核">
          <Fuhe curNumber={2}/>
        </Card>
        <Card title="可视化">
          <AntvG6 />
        </Card>
      </Col>
    </Row>
  )
}

export default Conpoments
