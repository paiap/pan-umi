/*
 * @creater: panan
 * @message: Conpoments小组件
 * @since: 2024-11-07 09:48:56
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-11-18 16:31:16
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/index.tsx
 */

import { Card, Col, Row } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import SearchFormCom from './SearchFormCompoment/SearchFormCom'
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
      </Col>
    </Row>
  )
}

export default Conpoments
