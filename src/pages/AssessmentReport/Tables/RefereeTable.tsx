/*
 * @creater: panan
 * @message: 裁判员打分指标
 * @since: 2024-07-12 14:29:10
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-12 14:31:20
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentReport/Tables/RefereeTable.tsx
 */

import { Table } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { columnsTable3 } from '../mock'
interface Props {
  record: any
}

const RefereeTable: FC<Props> = () => {

  return (
    <Table
      size='small'
      columns={columnsTable3}
      dataSource={[]}
    />
  )
}

export default RefereeTable