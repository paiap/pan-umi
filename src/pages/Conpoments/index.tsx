/*
 * @creater: panan
 * @message: Conpoments小组件
 * @since: 2024-11-07 09:48:56
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-27 14:37:46
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/index.tsx
 */

import { Card, Col, Row } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import SearchFormCom from './SearchFormCompoment/SearchFormCom'
import AntvChart from './AntvChart'
import AntvG6 from './AntvG6'
import Fuhe from './Fuhe'
import PanDescription from './Description'
import PanTreeSelect from './PanTreeSelect'
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
        <Card title="描述">
          <PanDescription 
            items={[
              { key: '1', label: '项目名称', children: '智能分析平台' },
              { key: '2', label: '创建时间', children: '2024-03-27' },
              { key: '3', label: '项目版本', children: 'v1.0.0' },
              { key: '4', label: '负责人', children: '张三' },
              // { key: '5', label: '开发语言', children: 'TypeScript' },
              { key: '6', label: '模型描述', children: '这是一个基于机器学习的智能分析平台，集成了数据处理、模型训练、结果分析等多个功能模块。该平台采用最新的深度学习技术，支持多种数据格式的输入和处理，具有高效的计算性能和良好的可扩展性。' }
            ]}
          />
        </Card>
        <Card title="定制化TreeSelect">
          <PanTreeSelect />
        </Card>
      </Col>
    </Row>
  )
}

export default Conpoments
