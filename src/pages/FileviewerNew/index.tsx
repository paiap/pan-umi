/* eslint-disable @typescript-eslint/no-use-before-define */
/*
 * @creater: panan
 * @message: Fileviewer
 * @since: 2024-07-04 14:58:42
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-09-06 16:44:10
 * @文件相对于项目的路径: /pan-umi/src/pages/FileviewerNew/index.tsx
 */

import { Button, Space, TreeSelect, TreeSelectProps, message } from 'antd';
import React, { FC, useState, useEffect } from 'react'
// import FileIcon from './icons/FileIcon';
// import DocumentIcon from './icons/DocumentIcon';
import { request } from '@umijs/max';
import './index.css'
import { DefaultOptionType } from 'antd/es/select';
interface Props {
  [key: string]: any
}

// storageId, path, page, pageSize
const FileviewerNew: FC<Props> = () => {
  const id = new URLSearchParams(window.location.search).get('id') || '0'
  const path = new URLSearchParams(window.location.search).get('path') || '/'
  const [value, setValue] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);

  const fetchData = async (id: string | number, path: string, isChild: boolean = false) => {
    console.log(id, path)
    try {
      const res = await request('https://panan.usemock.com/fileList')
      const { code, data } = res || {}
      if (code !== 0) {
        message.warning('请求失败')
        return
      }
      const curData = data.map((item: any) => {
        return {
          ...item,
          id: item?.path,
          pId: 0,
          value: item?.path,
          title: item?.name,
          isLeaf: !(item?.isDirectory === true),
          alias: handlePath(item?.path, path)
        }
      })
      if (!isChild) {
        setTreeData([{
          id: '/a/b/c',
          pId: 0,
          value: '/a/b/c',
          title: 'c',
          isLeaf: true,
          alias: 'b/c'
        },...curData])
      }
      return new Promise((resolve) => {
        resolve(curData)
      })
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchData(id, path, false)
    // console.log(handlePath('/a', '/'))
    // console.log(handlePath('/a/b/c', '/a'))
  }, [])

  const handlePath = (path: string, prePath: string): string => {
    if (path.startsWith(prePath)) {
      return path.slice(prePath.length).replace(/^\//, '');
    }
    const lastSlashIndex = path.lastIndexOf('/');
    return lastSlashIndex !== -1 ? path.slice(lastSlashIndex + 1) : path;
  }


  const onLoadData: TreeSelectProps['loadData'] = async ({ id: parentPath }) => {

    const data = await fetchData(id, parentPath, true) as any[]
    console.log(data)
    const curData = (data || []).map((item: any) => {
      return {
        ...item,
        pId: parentPath,
      }
    })
    return new Promise((resolve) => {
      setTreeData(
        treeData.concat(curData),
      );
      resolve(undefined);
    })
  };

  const onChange = (newValue: string[]) => {
    console.log(newValue);
    setValue(newValue);
  };



  return (
    <Space>
      <TreeSelect
        treeDataSimpleMode
        style={{ width: '500px' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择文件路径，可多选"
        onChange={onChange}
        loadData={onLoadData}
        treeData={treeData}
        treeLine
        multiple
        treeCheckable={true}
        showCheckedStrategy={'SHOW_PARENT'}
        treeNodeLabelProp='alias'
      />
      <Button type='primary' onClick={() => fetchData(id, path)}>刷新</Button>
    </Space>

  )
}

export default FileviewerNew