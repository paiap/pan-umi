/*
 * @creater: panan
 * @message: 过滤（人工）
 * @since: 2024-10-22 17:16:58
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-23 16:35:58
 * @文件相对于项目的路径: /pan-umi/src/pages/Dataminer/Config/Filtration/index.tsx
 */

import React, { FC, useState, useEffect, useRef } from 'react'
import MarkingSetting from '../../components/MarkingSetting'
import { Button, Card, Form, Input, Popconfirm, Radio, Select, Space, Table, Tooltip } from 'antd'
import { Column } from '@antv/g2plot';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface Props {
  [key: string]: any
}

const mockRefData = [
  {
    type: '聚类1',
    sales: 38,
  },
  {
    type: '聚类2',
    sales: 52,
  },
  {
    type: '聚类3',
    sales: 61,
  },
  {
    type: '聚类4',
    sales: 145,
  },
  {
    type: '聚类5',
    sales: 48,
  },
  {
    type: '聚类6',
    sales: 38,
  },
  {
    type: '聚类7',
    sales: 38,
  },
  {
    type: '聚类8',
    sales: 38,
  },
];

const mockRefData2 = [
  {
    type: '聚类1',
    sales: 378,
  },
  {
    type: '聚类2',
    sales: 520,
  },
  {
    type: '聚类3',
    sales: 619,
  },
  {
    type: '聚类4',
    sales: 245,
  },
  {
    type: '聚类5',
    sales: 348,
  },
  {
    type: '聚类6',
    sales: 438,
  },
  {
    type: '聚类7',
    sales: 138,
  },
  {
    type: '聚类8',
    sales: 328,
  },
];

const mockData = [
  {
    key: 'julei',
    name: '聚类标签',
    description: '聚类描述'
  },
  {
    key: 'yitu',
    name: '意图标签',
    description: '意图描述'
  },
  {
    key: 'zhuti',
    name: '主题标签',
    description: '主题描述'
  }
]

const initColumnsData = [
  {
    key: 'index',
    name: '序号',
  },
  {
    key: 'message',
    name: 'message',
  },
  {
    key: 'prompt',
    name: 'prompt',
  },
  {
    key: 'answer',
    name: 'answer',
  },
]

const finalColumnsData = [
  {
    key: 'status',
    name: '状态',
  },
  {
    key: 'option',
    name: '操作',
  }
]

const mockClusteringData = [
  {
    message: 'message1',
    prompt: 'prompt1',
    answer: 'answer1',
    julei: '聚类1',
    yitu: '意图1',
    zhuti: '主题1',
    inputLength: 10,
    outputLength: 10,
    inputType: '文本',
    outputType: '文本',
    status: '未处理',
  },
  {
    message: 'message2',
    prompt: 'prompt2',
    answer: 'answer2',
    julei: '聚类2',
    yitu: '意图2',
    zhuti: '主题2',
    inputLength: 20,
    outputLength: 20,
    inputType: '图片',
    outputType: '图片',
    status: '已处理',
  },
  {
    message: 'message3',
    prompt: 'prompt3',
    answer: 'answer3',
    julei: '聚类3',
    yitu: '意图3',
    zhuti: '主题3',
    inputLength: 30,
    outputLength: 30,
    inputType: '音频',
    outputType: '音频',
    status: '未处理',
  }
]

const Filtration: FC<Props> = () => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [selectTgs, setSelectTags] = useState<string[] | boolean>(false)
  const [selectClustering, setSelectClustering] = useState<string | null>(null)
  const [selectedRowKeys, setSelectRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [columns, setColumns] = useState<any[]>([])
  const [clusteringData, setClusteringData] = useState<any[]>([])
  const [form] = Form.useForm()
  const distributionRef = useRef<any>(null)
  const [showType, setShowType] = useState<string>('all')

  useEffect(() => {
    setDataSource(mockData)
  }, [])

  useEffect(() => {
    if (!selectClustering) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      fetchClusteringList()
      // 获取所有数据
      const curData = mockClusteringData.map((item: any, index: number) => {
        return {
          ...item,
          index: index + 1,
          key: index + 1,
        }
      })
      setClusteringData(curData)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getColumns()
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    fetchClusteringList()
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    fetchClusteringData()
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    getColumns()
  }, [selectClustering])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    renderDataDistribution(mockRefData)
  }, [])

  const renderDataDistribution = (data: any[]) => {

    if (distributionRef.current) {
      distributionRef.current.changeData(data)
      return
    }
    const columnPlot = new Column('distributionRef', {
      data,
      xField: 'type',
      yField: 'sales',
      label: {
        // 可手动配置 label 数据标签位置
        position: 'middle', // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      // y轴放右边
      yAxis: {
        position: 'right',
      },
      meta: {
        type: {
          alias: '类别',
        },
        sales: {
          alias: '数量',
        },
      },
    });
    distributionRef.current = columnPlot

    distributionRef.current.on('element:click', (e: any) => {
      console.log(e?.data?.data)
      setSelectClustering(e?.data?.data?.type)
    })

    columnPlot.render();
  }

  const fetchClusteringList = async () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const fetchClusteringData = async () => {
    const curData = mockClusteringData.map((item: any, index: number) => {
      return {
        ...item,
        index: index + 1,
        key: index + 1,
      }
    })
    setClusteringData(curData)
  }

  const getColumns = () => {
    const allColumnsData = [...initColumnsData, ...mockData, ...finalColumnsData]
    const curColumns = allColumnsData.map((item) => {
      if (item.key === 'option') {
        return {
          title: item.name,
          dataIndex: item.key,
          key: item.key,
          render: (_: any, record: any) => {
            return (
              <Button type='link' onClick={() => {
                console.log(record)
              }}>过滤</Button>
            )
          }
        }
      }
      return {
        title: item.name,
        dataIndex: item.key,
        key: item.key,
      }
    })
    setColumns(curColumns)
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues)
    // TODO: 数据分布
    renderDataDistribution(mockRefData2)
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div id='setting' style={{ width: '300px', overflow: 'auto' }}>
        <MarkingSetting
          disabled
          title='多样性打标配置'
          description='配置关闭后，将不会对数据进行多样性打标'
          data={dataSource}
          defaultValue={false}
          onChange={(val: string[] | boolean) => {
            console.log(val)
            if (val === false) {
              setSelectTags(false)
              return
            }
            setSelectTags(val)
          }} />
      </div>
      <div id='content' style={{ flex: 1 }}>
        <Space direction='vertical'>
          <Card
            title={
              <Space>
                <span>数据分布</span>
                <Tooltip title='点击柱状图查看数据详情'>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Space>
            }
            extra={
              <Form form={form} onValuesChange={onValuesChange}>
                <Space>
                  <Form.Item name='type' initialValue={1} style={{ marginBottom: '0' }}>
                    <Radio.Group optionType='button'>
                      <Radio value={1}>正序</Radio>
                      <Radio value={2}>倒序</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name='select' style={{ marginBottom: '0' }}>
                    <Select
                      placeholder='请选择'
                      options={[]}
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                  <Form.Item name='search' style={{ marginBottom: '0' }}>
                    <Input.Search
                      placeholder='请输入关键词'
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Space>
              </Form>
            }
            style={{ width: 'calc(100vw - 720px)' }}
          >
            <div id="distributionRef" style={{ height: '160px' }}></div>
          </Card>

          <Card
            title={
              <Space>
                <span>{selectClustering || 'All'}-结果预览( <span style={{ color: 'red' }}>33</span> 条)</span>
              </Space>
            }
            style={{ width: 'calc(100vw - 720px)' }}
            loading={loading}
            extra={
              <Button type='primary' onClick={() => setSelectClustering(null)}>查看所有数据</Button>
            }
          >
            <div style={{ marginBottom: '8px' }}>
              <Space>
                <Radio.Group optionType='button' value={showType} onChange={(e) => setShowType(e.target.value)}>
                  <Radio.Button value='all'>全部</Radio.Button>
                  <Radio.Button value='filtered'>已过滤</Radio.Button>
                  <Radio.Button value='unfiltered'>未过滤</Radio.Button>
                </Radio.Group>
                <Button type='primary' disabled={selectedRowKeys.length === 0} onClick={() => {
                  console.log(selectedRowKeys)
                }}>批量过滤</Button>
              </Space>
            </div>
            <Table
              dataSource={clusteringData}
              columns={columns}
              size='small'
              // 批量选择
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(selectedRowKeys, selectedRows)
                  setSelectRowKeys(selectedRowKeys)
                }
              }}
            />
          </Card>

        </Space>
      </div>
    </div>
  )
}

export default Filtration