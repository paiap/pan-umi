import React, { FC, useState, useEffect } from 'react'
import { Pagination, Space, Table, Tag } from 'antd'
import { initColumns, initData } from './columns'

interface Props {
  record: any
}

const initPagination = {
  total: 0,
  pageNum: 1,
  pageSize: 10,
}

const ModelDetailTable: FC<Props> = ({ record }) => {
  // 使用useState存储columns变量，方便后续修改
  const [columns, setColumns] = useState<any[]>(initColumns)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [pagination, setPagination] = useState<{
    total: number,
    pageNum: number,
    pageSize: number,
    [key: string]: any
  }>(initPagination)
  const [loading, setLoading] = useState<boolean>(false)

  const getColumns = () => {
    const curColumns = (initColumns || []).map((item: any) => {
      if (item.key === 'versions') {
        item.render = (version: any[]) => {
          return (
            <Space wrap>
              {
                version.map((item: any) => {
                  return (
                    <Space key={item?.version}>
                      <Tag color="blue">{item.version}</Tag>
                      <span>{item.description}</span>
                    </Space>
                  )
                })
              }
            </Space>
          )
        }
      }
      if (item.key === 'appNames') {
        item.render = (app: string[]) => {
          return (
            <Space wrap>
              {
                app.map((name: any) => {
                  return (
                    <Tag key={name}> {name}</Tag>
                  )
                })
              }
            </Space>
          )
        }
      }
      if(item.key === 'businessTpcs') {
        item.render = (businessTpcs: string[]) => {
          return (
            <Space wrap>
              {
                businessTpcs.map(businessTpc => {
                  return (
                    <Tag key={businessTpc}> {businessTpc}</Tag>
                  )
                })
              }
            </Space>
          )
        }
      }
      return item
    })
    setColumns(curColumns)
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const curData = (initData || []).map((item: any, index: number) => {
        return {
          ...item,
          index: pagination.pageSize * (pagination.pageNum - 1) + index + 1
        }
      })
      setDataSource(curData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!pagination.pageNum || !pagination.pageSize || !record) return
    fetchData()
  }, [pagination.pageNum, pagination.pageSize, record])

  useEffect(() => {
    getColumns()
  }, [dataSource])

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        scroll={{ x: 1000 }}
        pagination={false}
        loading={loading}
      />
      <Pagination
        total={pagination.total}
        showSizeChanger={false}
        showTotal={(total: number) => `共 ${total} 条`}
        style={{ textAlign: 'right', width: '100%', display: 'block', marginTop: 10 }}
        current={pagination.pageNum}
        pageSize={pagination.pageSize}
        onChange={(page, pageSize) => {
          setPagination({
            ...pagination,
            pageNum: page,
            pageSize: pageSize
          })
        }}
      />
    </>
  )
}

export default ModelDetailTable
