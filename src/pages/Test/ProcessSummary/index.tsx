/*
 * @creater: panan
 * @message: 
 * @since: 2024-07-16 16:48:47
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-16 17:00:22
 * @文件相对于项目的路径: /pan-umi/src/pages/Test/ProcessSummary/index.tsx
 */
import React, { FC, useState, useEffect, useRef } from 'react'
import PanProgress from './PanProgress'
interface Props {
  [key: string]: any
}

const data = [
  {
    id: 1,
    name: '推理结果数据正则解析',
    description: '推理结果数据正则解析，用于将评测集里数据处理成可对比、可评估的数据，并进行一致性对比',
    completed: false
  },
  {
    id:'',
  },
  {
    id: 2,
    name: '汇总计算评估指标',
    description: '整合单行数据对比判断结果，计算最后的评估指标，产出评估报告',
    completed: false
  }
]

const ProcessSummary: FC<Props> = () => {
  return (
    <PanProgress data={data} />
  )
}

export default ProcessSummary