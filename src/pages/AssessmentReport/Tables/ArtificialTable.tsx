/*
 * @creater: panan
 * @message: 规则打分指标
 * @since: 2024-07-12 14:28:00
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-12 14:31:30
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentReport/Tables/RuleTable.tsx
 */
import { Table } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { columnsTable1 } from '../mock'
interface Props {
  record: any
}

const ArtificialTable: FC<Props> = () => {

  return (
    <Table
    size='small'
    columns={columnsTable1}
    dataSource={[]}
  />
  )
}

export default ArtificialTable