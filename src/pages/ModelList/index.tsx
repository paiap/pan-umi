import React, { FC, useEffect, useState } from 'react'
import ModelCard from './ModelCard'
import ModelSearch from './ModelSearch'
import { Button, Select, Space, Spin, Tabs } from 'antd'
import './index.less'

interface Props {
  [key: string]: any
}

const options = [
  {
    label: '训练集-数量',
    value: 'trainDatasetNum'
  },
  {
    label: '训练集-数据条数',
    value: 'trainDatasetTaggingRefNum'
  },
  {
    label: '训练任务-成功次数',
    value: 'trainTaskSuccess'
  },
  {
    label: '训练任务-训练次数',
    value: 'trainTaskCount'
  },
  {
    label: '训练任务-训练时间',
    value: 'trainTaskTrainHour'
  },
  {
    label: '训练任务-算力成本',
    value: 'trainTaskCost'
  },
  {
    label: '训练任务-卡时',
    value: 'trainTaskCardHour'
  },
  {
    label: '模型版本-版本数',
    value: 'modelVersionNum'
  },
  {
    label: '验证-最优结果',
    value: 'evaluationBest'
  },
  {
    label: '验证-最大提升',
    value: 'evaluationUp'
  },
  {
    label: '测试-最优结果',
    value: 'testBest'
  },
  {
    label: '测试-最大提升',
    value: 'testUp'
  },
  {
    label: '推理-应用数',
    value: 'illationAppNum'
  },
  {
    label: '推理-最近应用部署时间',
    value: 'illationAppRecent'
  },
  {
    label: '推理-应用卡时',
    value: 'illationAppCardHour'
  }
]

const sortOptions = [
  {
    label: '升序',
    value: 'asc'
  },
  {
    label: '降序',
    value: 'desc'
  }
]

const ModelList: FC<Props> = () => {

  const [items, setItems] = useState<any[]>([])
  const [focused, setFocused] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(false)
  const [orderType, setOrderType] = useState<string | number>(1)
  const [orderOptions, setOrderOptions] = useState<string | number>(1)
  const [total, setTotal] = useState<number>(1)
  const [dataSource, setDataSource] = useState<any[]>([])

  const fetchItems = () => {
    setItems([
      {
        label: '全部(123)',
        key: 'all'
      },
      {
        label: '收藏(24)',
        key: 'focused'
      }
    ])
  }

  useEffect(() => {
    fetchItems()
  }, [])


  return (
    <>
      <ModelSearch
        focused={focused}
        orderType={orderType}
        orderOptions={orderOptions}
        setLoading={setLoading}
        setDataSource={setDataSource}
        setTotal={setTotal}
      />
      <Tabs
        activeKey={focused}
        onChange={(key) => setFocused(key)}
        indicator={{ size: (origin) => origin - 20, align: 'center' }}
        tabBarExtraContent={{
          right: (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Button type='primary'>+ 新建模型</Button>
            </div>
          )
        }}
      >
        {
          items?.length > 0 && items.map((item: any) => {
            return (
              <Tabs.TabPane key={item.key} tab={item.label} />
            )
          })
        }
        <Tabs.TabPane disabled tab={
          <Space>
            <Select
              value={orderType}
              options={options}
              style={{ width: 200 }}
              placeholder="请选择"
              onChange={c => setOrderType(c)}
            />
            <Select
              value={orderOptions}
              options={sortOptions}
              style={{ width: 100 }}
              placeholder="请选择"
              onChange={c => setOrderOptions(c)}
            />
          </Space>
        } />
      </Tabs>
      <Spin spinning={loading}>
        {
          dataSource.map((item: ModelList.modeldetailParam) => {
            return <ModelCard data={item} refresh={fetchItems} key={item.modelFolderId} />
          })
        }
      </Spin>
    </>
  )
}

export default ModelList