/*
 * @creater: panan
 * @message: 实验组 AddexperimentalGroup
 * @since: 2025-04-22 16:47:24
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 15:23:04
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/AddexperimentalGroup/index.tsx
 */

import React, { useEffect, useState } from 'react'
import { Form, Select, Space } from 'antd'
import CreateExperimentalGroup from '../experimentalGroupTable/CreateExperimentalGroup';
import { debounce } from 'lodash';


// 模拟数据 - 已有实验组
const mockExistingGroups = [
  { id: '1', name: '实验组A', description: '这是实验组A的描述' },
  { id: '2', name: '实验组B', description: '这是实验组B的描述' },
  { id: '3', name: '实验组C', description: '这是实验组C的描述' },
]

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  modelFolderId?: string;
}

const AddexperimentalGroup: React.FC<Props> = ({ modelFolderId, value, onChange }) => {
  const [options, setOptions] = useState<any[]>([])

  // 获取实验组列表数据
  const refresh = async (name?: string) => {
    console.log(name)
    const curOptions = mockExistingGroups.map(c => ({
      value: c?.id,
      label: <Space>
        <span>{c?.name}</span>
        <span style={{ color: '#8c8c8c' }}>{c?.description}</span>
      </Space>
    }))
    setOptions(curOptions)
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Space>
      <Select
        placeholder="请选择实验组"
        options={options}
        value={value}
        onChange={onChange}
        style={{ width: 400 }}
        showSearch
        filterOption={false}
        onSearch={debounce(refresh, 1000)}
      />
      <CreateExperimentalGroup refresh={refresh} />
    </Space>
  )
}

export default AddexperimentalGroup
