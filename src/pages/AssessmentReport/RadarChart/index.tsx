/*
 * @creater: panan
 * @message: 雷达图
 * @since: 2024-07-12 14:09:45
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-15 10:53:44
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentReport/RadarChart/index.tsx
 */

import { Button, Card, Checkbox, Row, Select, Space, Col, Spin, Tabs, message } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { radarInitData } from '../mock'
import { Radar } from '@antv/g2plot'
import RuleTable from '../Tables/RuleTable'
import RefereeTable from '../Tables/RefereeTable'
import ArtificialTable from '../Tables/ArtificialTable'
interface Props {
  record: any
}

const defaultTypes = [
  {
    label: <div style={{ borderLeft: '6px solid #E57869', padding: '0 8px', borderRadius: '5px' }}>人工打分指标</div>,
    value: 'type1',
    // disabled: true
  },
  {
    label: <div style={{ borderLeft: '6px solid green', padding: '0 8px', borderRadius: '5px' }}>自动规则打分指标</div>,
    value: 'type2'
  },
  {
    label: <div style={{ borderLeft: '6px solid blue', padding: '0 8px', borderRadius: '5px' }}>自动裁判员打分指标</div>,
    value: 'type3'
  }
]

const RadarChart: FC<Props> = ({ record }) => {
  const [indicatorType, setIndicatorType] = useState<string[]>(['type1', 'type2', 'type3'])
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<any[]>([])
  const radarCahrtRef = useRef<any>()

  const renderRadarChart = () => {
    if (radarCahrtRef.current) {
      radarCahrtRef.current.changeData(radarInitData)
      radarCahrtRef.current.update(radarInitData)
      return
    }
    const radarPlot = new Radar('radarChart', {
      data: radarInitData,
      xField: 'item',
      yField: 'score',
      seriesField: 'type',
      meta: {
        score: {
          alias: '分数',
          min: 0,
          max: 80,
        },
        parent: {}
      },
      xAxis: {
        label: {
          style: (val: string) => {
            const tooltipOpt = radarInitData.filter(c => c?.item === val)
            if (tooltipOpt?.[0]?.parent === 'type1') {
              return {
                fill: '#E57869',
              }
            } else if (tooltipOpt?.[0]?.parent === 'type2') {
              return {
                fill: 'green'
              }
            } else if (tooltipOpt?.[0]?.parent === 'type3') {
              return {
                fill: 'blue'
              }
            }

          }
        }
      },
      // smooth: true,
      // area: {},
      // 开启辅助点
      point: {
        size: 2,
      },
    });

    radarPlot.render();
    radarCahrtRef.current = radarPlot
  }

  useEffect(() => {
    // if (!record) return
    renderRadarChart()
  }, [record])

  const refresh = () => {
    setLoading(true)
    setTimeout(() => {
      renderRadarChart()
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    if (!indicatorType) return
    console.log(indicatorType)
    refresh()

    const curItems = indicatorType.map((item: string, index: number) => {
      if (item === 'type1') {
        return {
          label: '人工打分',
          key: 'type1',
          children: <ArtificialTable key={index + 1} record={record} />
        }
      }
      if (item === 'type2') {
        return {
          label: '规则打分',
          key: 'type2',
          children: <RuleTable key={index + 1} record={record} />
        }
      }
      if (item === 'type3') {
        return {
          label: '裁判员打分',
          key: 'type3',
          children: <RefereeTable key={index + 1} record={record} />
        }
      }
      return null
    })

    setItems(curItems)
  }, [indicatorType])
  
  return (
    <Card
      title={
        <Space>
          <span>指标类型</span>
          <Checkbox.Group
            options={defaultTypes}
            value={indicatorType}
            onChange={(val: string[]) => {
              if (val?.length === 0) {
                message.warning('至少选择一项')
                return
              }
              setIndicatorType(val)
            }}
          />
        </Space>
      }
      extra={
        <Button type='link' onClick={refresh}>刷新</Button>
      }
      styles={{ body: { padding: '0', margin: '10px' } }}
      // bordered={false}
    >
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card
              title={
                <Space>
                  <span >对比版本:</span>
                  <Select
                    options={[
                      {
                        label: 'V1.0',
                        value: 'V1.0'
                      },
                      {
                        label: 'V2.0',
                        value: 'V2.0'
                      },
                      {
                        label: 'V3.0',
                        value: 'V3.0'
                      },
                      {
                        label: 'V4.0',
                        value: 'V4.0'
                      },
                      {
                        label: 'V5.0',
                        value: 'V5.0'
                      },
                      {
                        label: 'V6.0',
                        value: 'V6.0'
                      },
                      {
                        label: 'V7.0',
                        value: 'V7.0'
                      },
                      {
                        label: 'V8.0',
                        value: 'V8.0'
                      },
                      {
                        label: 'V9.0',
                        value: 'V9.0'
                      },
                      {
                        label: 'V10.0',
                        value: 'V10.0'
                      }
                    ]}
                    style={{ width: '500px' }}
                    placeholder='请选择对比版本，可多选'
                    mode='multiple'
                  />
                </Space>
              }
              extra={
                <Button type='primary'>对比</Button>
              }
              bordered={false}
            >
              <div id='radarChart'></div>
            </Card>
          </Col>
          <Col span={12}>
            <Tabs
              items={items}
              // tabBarExtraContent={
              //   <Button type='primary'>上榜</Button>
              // }
            />
          </Col>
        </Row>
      </Spin>
    </Card>
  )
}

export default RadarChart