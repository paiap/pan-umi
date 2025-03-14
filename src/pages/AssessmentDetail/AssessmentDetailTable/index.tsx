/*
 * @creater: panan
 * @message: AssessmentDetailTable
 * @since: 2024-12-25 10:59:20
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-25 14:25:30
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentDetail/AssessmentDetailTable/index.tsx
 */
import { Table } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { initColumns } from './columns'
interface Props {
  data: any[]
}

const AssessmentDetailTable: FC<Props> = ({ data }) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  useEffect(() => {
    if (!data) return
    setDataSource(data)
  }, [data])

  useEffect(() => {
    const curColumns = [...initColumns]
    setColumns(curColumns)
  }, [dataSource])

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      size='small'
    />
  )
}

export default AssessmentDetailTable