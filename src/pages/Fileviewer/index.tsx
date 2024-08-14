/* eslint-disable @typescript-eslint/no-use-before-define */
/*
 * @creater: panan
 * @message: Fileviewer
 * @since: 2024-07-04 14:58:42
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-05 17:12:01
 * @文件相对于项目的路径: /pan-umi/src/pages/Fileviewer/index.tsx
 */

import { Breadcrumb, Button, Space, Table, message } from 'antd';
import React, { FC, useState, useEffect } from 'react'
import { initColumns } from './columns';
import FileIcon from './icons/FileIcon';
import DocumentIcon from './icons/DocumentIcon';
import { request } from '@umijs/max';
import './index.css'
import Viewer from './Viewer';
interface Props {
  [key: string]: any
}

const initPage = {
  page: 1,
  pageSize: 10
}
// storageId, path, page, pageSize
const Fileviewer: FC<Props> = () => {
  const id = new URLSearchParams(window.location.search).get('id') || '0'
  const path = new URLSearchParams(window.location.search).get('path') || '/'

  const initItem = {
    title: <span onClick={() => {
      fetchData(id, path, true)
      handleJumpFile(path)
    }}>根目录</span>,
    path: path
  }

  const initPath = [
    {
      name: '根目录',
      path: path
    }
  ]

  const [loading, setLoading] = useState<boolean>(false)
  const [columns, setColumns] = useState<any[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])
  const [pathNames, setPathNames] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([initItem])
  const [curPath, setCurPath] = useState<string>(path)
  const [pages, setPages] = useState<any>(initPage)
  const [expandLoading, setExpandLoading] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(true)

  useEffect(() => {
    setPathNames(initPath)
  }, [])

  useEffect(() => {
    const curItems = pathNames.map((item: any) => {
      return {
        title: <a onClick={() => {
          handleJumpFile(item?.path)
        }}>{item?.name}</a>
      }
    })
    setItems(curItems)
  }, [pathNames])

  const handleJumpFile = (curpath: string) => {
    fetchData(id, curpath, true)
    setCurPath(curpath)
    //截取pathNames数组重path为curpath值的前面部分的内容，包括该部分
    const curPathNames = pathNames.slice(0, pathNames.findIndex((item: any) => item.path === curpath) + 1)
    setPathNames(curPathNames)
  }

  const fetchData = async (id: string | number, path: string, isFirst: boolean) => {
    console.log(id, path, isFirst)
    if (isFirst) {
      // 采用initpage
      setLoading(true)
      try {
        const res = await request('https://panan.usemock.com/fileList')
        const { code, data } = res || {}
        if (code !== 0) {
          message.warning('请求失败')
          return
        }
        const curData = data.map((item: any) => ({ ...item, key: item?.path }))
        setDataSource(curData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
      return
    }
    // 采用pages
    setExpandLoading(true)
    try {
      const res = await request('https://panan.usemock.com/fileList')
      const { code, data } = res || {}
      if (code !== 0) {
        message.warning('请求失败')
        return
      }
      if (data?.length === 0) {
        setExpand(false)
        return
      }
      const curData = data.map((item: any) => ({ ...item, key: item?.path }))
      setDataSource(pre => [...pre, ...curData])

    } catch (error) {
      console.log(error)
    } finally {
      setExpandLoading(false)
    }

  }


  const getColumns = () => {
    const curColumns = initColumns.map((item: any) => {
      if (item.key === 'name') {
        item.render = (name: string, record: any) => {
          if (record?.isDirectory === true) {
            return (
              <Space>
                <FileIcon />
                <span className='fileName' style={{ cursor: 'pointer' }} onClick={() => {
                  setPathNames(pre => [...pre, {
                    name: name,
                    path: record?.path
                  }])
                  fetchData(id, record?.path, true)
                }}>{name}</span>
              </Space >
            )
          }
          return (
            <Space>
              <DocumentIcon />
              <Viewer name={name} record={record} />
            </Space>
          )
        }
      }
      return item
    })
    setColumns(curColumns)
  }

  useEffect(() => {
    getColumns()
    fetchData(id, path, true)
  }, [])

  return (
    <>
      <Breadcrumb
        items={items}
      />
      <Table
        loading={loading}
        size='small'
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{
          y: 800
        }}
        footer={() => {
          if (!expand) return null
          return <Button
            type='link'
            loading={expandLoading}
            onClick={() => {
              fetchData(id, curPath, false)
            }}
          >加载更多</Button>
        }}
      />
    </>

  )
}

export default Fileviewer