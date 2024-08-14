/*
 * @creater: panan
 * @message: test
 * @since: 2024-07-16 15:32:42
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-16 19:26:12
 * @文件相对于项目的路径: /pan-umi/src/pages/Test/index.tsx
 */

import React, { FC, useState, useEffect, useRef } from 'react'
import PanSelectCard from './PanSelectCard'
import { Button, Space } from 'antd'
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import ProcessSummary from './ProcessSummary'
interface Props {
  [key: string]: any
}

const data = [
  {
    id: 1,
    name: '自定义Python方法打分',
    // 描述随便来个三十字
    description: '自由组合单位数据python处理方法以及指标计算汇总python方法 两个步骤，用户仅需选择两个python方法，即可完成指标计算',
  },
  {
    id: 2,
    name: '正则解析打分',
    description: '包含“正则解析数据”指标计算汇总python方法两个步骤'
  },
  {
    id: 3,
    name: 'name333',
    description: 'dnvbifdv'
  },
  {
    id: 4,
    name: 'name444',
    description: 'cndfjvavinfdcfvif'
  },
]

const Test: FC<Props> = () => {
  return (
    <>
      <PanSelectCard data={data} />
      <ProcessSummary />
    </>
  )
}

export default Test