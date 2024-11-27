/*
 * @creater: panan
 * @message: SearchFormCompoment
 * @since: 2024-11-07 09:53:34
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-11-25 21:18:08
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/SearchFormCompoment/index.tsx
 */

import React, { FC, useState, useEffect } from 'react'
import { Tree, Input } from 'antd';
import FileIcon from './icon/FileIcon';
import TemplateIcon from './icon/TemplateIcon';

interface Props {
  // 基础配置
  basicConfig?: {
    key: string,
    name: string
  }[];
  // value
  valueConfig?: {
    key: string,
    name: string,
    value: string
  }[];
  onChange?: (config: {
    key: string,
    name: string,
    value: string
  }[]) => void

  [key: string]: any
}


const mockData = [
  {
    "key": "0-0",
    "title": "parent 1",
    "children": [
      {
        "key": "0-0-0",
        "title": "parent 1-1",
        "children": [
          {
            "key": "0-0-0-0",
            "title": "leaf 0-0-0-0"
          },
          {
            "key": "0-0-0-1",
            "title": "leaf 0-0-0-1"

          },
          {
            "key": "0-0-0-2",
            "title": "leaf 0-0-0-2"
          }
        ]
      },
      {
        "key": "0-0-1",
        "title": "parent 0-0-1",
        "children": [
          {
            "key": "0-0-1-0",
            "title": "leaf 0-0-1-0"
          },
          {
            "key": "0-0-1-1",
            "title": "leaf 0-0-1-1"
          },
          {
            "key": "0-0-1-2",
            "title": "leaf 0-0-1-2"
          }
        ]
      },
      {
        "key": "0-0-2",
        "title": "leaf 0-0-2"
      }
    ]
  },
  {
    "key": "0-1",
    "title": "parent 0-1",
    "children": [
      {
        "key": "0-1-0",
        "title": "parent 0-1-0",
        "children": [
          {
            "key": "0-1-0-0",
            "title": "leaf 0-1-0-0"
          },
          {
            "key": "0-1-0-1",
            "title": "leaf 0-1-0-1"
          },
          {
            "key": "0-1-0-2",
            "title": "leaf 0-1-0-2"
          }
        ]
      },
      {
        "key": "0-1-1",
        "title": "parent 0-1-1",
        "children": [
          {
            "key": "0-1-1-0",
            "title": "leaf 0-1-1-0"
          },
          {
            "key": "0-1-1-1",
            "title": "leaf 0-1-1-1"
          },
          {
            "key": "0-1-1-2",
            "title": "leaf 0-1-1-2"
          }
        ]
      },
      {
        "key": "0-1-2",
        "title": "leaf 0-1-2"
      }
    ]
  },
  {
    "key": "0-2",
    "title": "leaf 0-2"
  }
]

const Search = Input.Search;

const SearchFormCompoment: FC<Props> = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [treeData, setTreeData] = useState<any[]>([])
  const [filterTreeData, setFilterTreeData] = useState<any[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  const handleDrag = async (info: any) => {
    console.log(info)
  }


  const handleTreeData = (initData: any[]): any[] => {
    const data = initData.map((item: any) => {
      const children = item.children?.length > 0 ? handleTreeData(item.children) : []
      return {
        key: item.key,
        title: <span onDrag={() => handleDrag(item)} > {item.title}</span >,
        icon: item.children ? <FileIcon /> : <TemplateIcon />,
        children
      }
    })
    return data
  }

  const handleTreeDataKey = (data: any[]): string[] => {
    const keys: string[] = []
    const extractKeys = (items: any[]) => {
      items.forEach(item => {
        keys.push(item.key)
        if (item.children && item.children.length > 0) {
          extractKeys(item.children)
        }
      })
    }
    extractKeys(data)
    return keys
  }

  const handleFilterTreeData = (data: any[], value: string) => {
    // 入参为树形结构数据和搜索关键字，树形结构中的title为搜索关键字的匹配项，匹配到的节点，从根节点到该节点节点以及所有子节点都需要返回，返回格式同样为树形结构
    const filterData: any[] = []

    data.forEach((item) => {
      const title = item.title.props.children.join('');
      if (title.indexOf(value) > -1) {
        filterData.push(item);
      } else if (item.children && item.children.length > 0) {
        const filteredChildren = handleFilterTreeData(item.children, value);
        if (filteredChildren.length > 0) {
          filterData.push({ ...item, children: filteredChildren });
        }
      }
    });

    return filterData;
  }

  useEffect(() => {
    const data = handleTreeData(mockData)
    setTreeData(data)

    const keys = handleTreeDataKey(mockData)
    setExpandedKeys(keys)
  }, [])

  useEffect(() => {
    if (!treeData.length) return
    console.log(treeData)
  }, [treeData])

  useEffect(() => {
    if (!inputValue) {
      setFilterTreeData(treeData)
      const keys = handleTreeDataKey(treeData)
      setExpandedKeys(keys)
      return
    }
    const curData = handleFilterTreeData(treeData, inputValue)
    setFilterTreeData(curData)

    const keys = handleTreeDataKey(curData)
    setExpandedKeys(keys)
  }, [inputValue])

  return (
    <>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Tree
        treeData={filterTreeData}
        expandedKeys={expandedKeys}
        // 展开受控
        onExpand={(keys: any[]) => {
          setExpandedKeys(keys)
        }}
      />
    </>
  )
}

export default SearchFormCompoment