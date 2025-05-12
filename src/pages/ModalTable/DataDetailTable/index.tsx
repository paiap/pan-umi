import React, { FC, useState, useEffect } from 'react'
import { Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { initColumns, initData } from './columns'

interface Props {
  record: any
}

const initPagination = {
  total: 0,
  pageNum: 1,
  pageSize: 10,
}

const DataDetailTable: FC<Props> = ({ record }) => {
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
      if (item.key === 'trainDatasets') {
        item.render = (version: any[], record: any) => {
          return (
            <Space wrap>
              {
                (record?.trainDatasets || [])?.map((item: any, index: number) => {
                  return (
                    <Tooltip title={item?.datasetVersionName} key={index}>
                      <Space>
                        <Tag color={item?.isUpdate ? 'cyan' : 'blue'}>{item?.isUpdate ? '更新' : '新增'} {item?.version}</Tag>
                        <span>{item?.time}</span>
                        <span>{item?.user}</span>
                        <span>{item?.datasetVersionName}</span>
                      </Space>
                    </Tooltip>
                  )
                })
              }
            </Space>
          )
        }
      }
      if (item.key === 'testDatasets') {
        item.render = (version: any[], record: any) => {
          return (
            <Space wrap>
              {
                (record?.testDatasets || [])?.map((item: any, index: number) => {
                  return (
                    <Tooltip title={item?.datasetVersionName} key={index}>
                      <Space>
                        <Tag color={item?.isUpdate ? 'cyan' : 'blue'}>{item?.isUpdate ? '更新' : '新增'} {item?.version}</Tag>
                        <span>{item?.time}</span>
                        <span>{item?.user}</span>
                        <span>{item?.datasetVersionName}</span>
                      </Space>
                    </Tooltip>
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

export default DataDetailTable
