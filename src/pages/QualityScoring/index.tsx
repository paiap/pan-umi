/*
 * @creater: panan
 * @message: QualityScoring
 * @since: 2024-12-26 16:42:04
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-26 18:05:16
 * @文件相对于项目的路径: /pan-umi/src/pages/QualityScoring/index.tsx
 */

import React, { FC, useEffect, useState } from 'react'
import { Tree, Button, Popconfirm, Space } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { DeleteOutlined } from '@ant-design/icons'
import EditTreeDataDetail from './components/EditTreeDataDetail'

interface Props {
  [key: string]: any
}

const initialTreeData: any[] = [
  {
    title: 'Node1',
    key: '0-0',
    // 是否系统维度
    isSystem: true,
    children: [
      {
        title: 'Child Node1',
        key: '0-0-0',
        isSystem: true
      },
    ],
  },
  {
    title: 'Node2',
    key: '0-1',
    isSystem: true,
    children: [
      {
        title: 'Child Node2',
        key: '0-1-0',
        isSystem: true
      },
      {
        title: 'Child Node3',
        key: '0-1-1',
      },
    ],
  },
]

const QualityScoring: FC<Props> = () => {
  const [treeData, setTreeData] = useState<DataNode[]>(initialTreeData)
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])

  const getAllExpandedKeys = (data: DataNode[], selectKeys: React.Key[]): React.Key[] => {
    data.forEach((item: DataNode) => {
      selectKeys.push(item.key)
      if (item.children) {
        getAllExpandedKeys(item.children, selectKeys)
      }
    })
    return selectKeys
  }

  useEffect(() => {
    if (!treeData) return
    const keys = getAllExpandedKeys(treeData, [])
    setExpandedKeys(keys)
  }, [treeData])



  const addNode = (key: React.Key) => {
    const newTreeData = [...treeData]
    const addNodeRecursively = (nodes: DataNode[]) => {
      nodes.forEach(node => {
        if (node.key === key) {
          if (!node.children) {
            node.children = []
          }
          node.children.push({
            title: `New Node`,
            key: `${key}-${node.children.length + 1}`,
          })
        } else if (node.children) {
          addNodeRecursively(node.children)
        }
      })
    }
    addNodeRecursively(newTreeData)
    setTreeData(newTreeData)
  }

  const deleteNode = (key: React.Key) => {
    const deleteNodeRecursively = (nodes: DataNode[]): DataNode[] => {
      return nodes
        .filter(node => node.key !== key)
        .map(node => ({
          ...node,
          children: node.children ? deleteNodeRecursively(node.children) : [],
        }))
    }
    setTreeData(deleteNodeRecursively(treeData))
  }

  const renderTreeNodes = (nodes: DataNode[], level: number): DataNode[] => {
    return nodes.map((node: any) => ({
      ...node,
      expanded: true,
      title: (
        <Space>
          <span>{node.title}</span>
          {/* 创建*/}
          <EditTreeDataDetail
            node={node}
            type='create'
            addNode={addNode}
          />
          {!node.isSystem && (
            <Popconfirm
              title="确认删除这个节点以及子节点？"
              onConfirm={() => deleteNode(node.key)}
              okText="是"
              cancelText="否"
            >
              <Button
                type='link'
                size="small"
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          )}
          {/* 编辑*/}
          {!node.isSystem && (
            <EditTreeDataDetail
              node={node}
              type='edit'
            />
          )}
        </Space>
      ),
      children: node.children ? renderTreeNodes(node.children, level + 1) : [],
    }))
  }

  return (
    <Tree
      defaultExpandAll
      treeData={renderTreeNodes(treeData, 0)}
      expandedKeys={expandedKeys}
    />
  )
}

export default QualityScoring