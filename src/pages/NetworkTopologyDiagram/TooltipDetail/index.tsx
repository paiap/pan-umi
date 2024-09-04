/*
 * @creater: panan
 * @message: tooltip
 * @since: 2024-08-28 19:27:22
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-09-02 15:11:55
 * @文件相对于项目的路径: /pan-umi/src/pages/NetworkTopologyDiagram/TooltipDetail/index.tsx
 */

import { Alert, Card, Descriptions, Space, Tabs, Tag } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { nodeMap, colorMap } from '../index'
import { Graph } from '@antv/g6'
import Marquee from 'react-fast-marquee';
interface Props {
  item: any,
  graph: Graph,
  targetType: 'node' | 'edge',
  name: string,
  status: string
}

const netTypeMap = {
  compute: '计算网络',
  storage: '存储网络',
  paas: 'paas网络',
  outband: '带外网络'
}

const TooltipDetail: FC<Props> = ({ item, graph, targetType, name, status }) => {
  const [title, setTitle] = useState<string | null>(null)

  const getEdgeName = () => {
    const [sourceNodeId, targetNodeId] = [item?.source as string, item?.target as string]
    const [sourceNode, targetNode] = graph.getNodeData([sourceNodeId, targetNodeId])
    const sourceName = (sourceNode as any)?.properties?.name
    const targetName = (targetNode as any)?.properties?.name
    return `${sourceName || '-'}—>${targetName || '-'}`
  }

  useEffect(() => {
    console.log(item)
    if (!item || targetType === 'node') {
      setTitle(null)
      return
    }
    const name = getEdgeName()
    setTitle(name)
  }, [item, targetType])

  useEffect(() => {
    console.log(name, status)
  }, [name, status])


  const getCount = (num: number) => {
    if (!num) return '-'
    // 如果大于1万，转为万，不超过就返回原来的
    if (num > 10000) {
      return `${(num / 10000).toFixed(2)}w`
    }
    return num
  }

  return (
    <>
      <Card
        title={
          <Space>
            <span>{title || item?.properties?.name}</span>
            {
              item?.properties?.name && <Tag color={colorMap[item?.type as keyof typeof colorMap]}>{nodeMap[item?.type as keyof typeof nodeMap]}</Tag>
            }
          </Space>
        }
        bordered={false}
        styles={{
          body: {
            padding: '0px',
            margin: '0',
            width: name === '边' ? '800px' : 'auto',
            background: '#fff'
          },
          header: {
            padding: '8px',
            margin: '0',
            fontSize: '14px',
            width: name === '边' ? '800px' : 'auto',
            background: '#fff'
          }
        }}
      >
        {
          name === '交换机' && (
            <div style={{ padding: '8px' }}>
              <div>交换机名称：{item?.properties?.name}</div>
              <div>CPU：{item?.properties?.cpu}</div>
              <div>内存：{item?.properties?.memory}</div>
              <div>温度：{item?.properties?.temp}</div>
              <div>风扇：{item?.properties?.fan}</div>
              <div>p电压：{item?.properties?.power}</div>
            </div>
          )
        }
        {
          name === '边' && (
            <div style={{ padding: '8px', }}>
              <Tabs
                type='card'
                tabPosition='left'
                style={{
                  maxHeight: '600px',
                  overflow: 'auto'
                }}
                items={
                  (item?.properties?.data || []).map((dataItem: any, index: number) => {
                    const color = colorMap[dataItem?.type as keyof typeof colorMap] === 'green' ? '#000' : colorMap[dataItem?.type as keyof typeof colorMap]
                    return {
                      key: index + 1,
                      label: (
                        <Space>
                          <div style={{ color: color }}>连接{index + 1}</div>
                          <Tag color={colorMap[dataItem?.type as keyof typeof colorMap]}>{nodeMap[dataItem?.type as keyof typeof nodeMap]}</Tag>
                        </Space>
                      ),
                      // label: <div style={{ color: color }}>连接{index + 1}</div>,
                      children: (
                        <div>
                          {
                            nodeMap[dataItem?.type as keyof typeof nodeMap] === '警告' && (
                              <Alert
                              banner
                              type="warning"
                              showIcon
                              message={
                                <Marquee pauseOnHover gradient={false}>
                                  交换机SW1-400G FourHundredGigE 1/0/5 端口down
                                </Marquee>
                              }
                            />
                            )
                          }
                          {
                            nodeMap[dataItem?.type as keyof typeof nodeMap] === '出错' && (
                              <Alert
                              banner
                              type="error"
                              showIcon
                              message={
                                <Marquee pauseOnHover gradient={false}>
                                  交换机SW1-400G FourHundredGigE 1/0/5 端口down
                                </Marquee>
                              }
                            />
                            )
                          }
                          <Descriptions
                            title='基础信息'
                            size='small'
                            items={[
                              {
                                key: '1',
                                label: '所属网络',
                                children: netTypeMap[dataItem?.netType as keyof typeof netTypeMap],
                              },
                              {
                                key: '3',
                                label: '协商带宽',
                                children: dataItem?.actualbandwidth,
                                span: 2
                              },
                              {
                                key: '7',
                                label: '交换机名',
                                children: dataItem?.switchName,
                              },
                              {
                                key: '2',
                                label: '交换机端口',
                                children: dataItem?.ifname,
                                span: 2
                              },
                              {
                                key: '8',
                                label: '主机名',
                                children: dataItem?.serverName,
                              },
                              {
                                key: '5',
                                label: '网卡名',
                                children: dataItem?.hca,
                              },
                              ...(dataItem?.netType === 'compute' ? [{
                                key: '6',
                                label: '关联GPU',
                                children: dataItem?.gpu || '-',
                                span: 3
                              }] : [])

                            ]}
                          />
                          <Descriptions
                            title='交换机指标'
                            size='small'
                            items={[
                              {
                                key: '9',
                                label: '端口状态',
                                children: dataItem?.switch?.portStatus,
                              },
                              {
                                key: '10',
                                label: '丢包(In/Out)',
                                children: `${dataItem?.switch?.InDiscard}/${dataItem?.switch?.OutDiscard}`,
                              },
                              {
                                key: '11',
                                label: '丢包速率(In/Out)',
                                children: `${dataItem?.switch?.InDisPS}/${dataItem?.switch?.OutDisPS}`,
                              },
                              {
                                key: '12',
                                label: '错误包(In/Out)',
                                children: `${dataItem?.switch?.InErrors}/${dataItem?.switch?.OutErrors}`,
                              },
                              {
                                key: '13',
                                label: '错误速率(In/Out)',
                                children: `${dataItem?.switch?.InErrPS}/${dataItem?.switch?.OutErrPS}`,
                              },
                              // {
                              //   key: '14',
                              //   label: '字节总数(In/Out)',
                              //   children: `${dataItem?.switch?.InBytes}/${dataItem?.switch?.OutBytes}`,
                              // },
                              // {
                              //   key: '15',
                              //   label: '带宽(In/Out)',
                              //   children: `${dataItem?.switch?.InBPS}/${dataItem?.switch?.OutBPS}`,
                              // },
                              // {
                              //   key: '16',
                              //   label: '包总数(In/Out)',
                              //   children: `${getCount(dataItem?.switch?.InPkts)}/${getCount(dataItem?.switch?.OutPkts)}`,
                              // },
                              // {
                              //   key: '17',
                              //   label: '包速率(In/Out)',
                              //   children: `${dataItem?.switch?.InPPS}/${dataItem?.switch?.OutPPS}`,
                              // },
                              {
                                key: '18',
                                label: '光模块状态',
                                children: dataItem?.switch?.optStatus,
                              },
                              {
                                key: '19',
                                label: '光模块温度',
                                children: dataItem?.switch?.optTemp,
                              },
                              {
                                key: '20',
                                label: '光模块电压',
                                children: dataItem?.switch?.optVol,
                              },
                              {
                                key: '21',
                                label: '光模块偏置电流',
                                children: dataItem?.switch?.optBias,
                              },
                              {
                                key: '22',
                                label: '光模块功率(In/Out)',
                                children: `${dataItem?.switch?.optRXPower}/${dataItem?.switch?.optTXPower}`,
                                span: 3
                              },

                            ]}
                          />
                          <Descriptions
                            title='服务器指标'
                            size='small'
                            items={[
                              {
                                key: '25',
                                label: '网卡状态',
                                children: dataItem?.server?.portStatus,
                              },
                              // {
                              //   key: '27',
                              //   label: '丢包(In/Out)',
                              //   children: `${dataItem?.server?.InDiscard}/${dataItem?.server?.OutDiscard}`,
                              // },
                              // {
                              //   key: '28',
                              //   label: '丢包速率(In/Out)',
                              //   children: `${dataItem?.server?.InDisPS}/${dataItem?.server?.OutDisPS}`,
                              // },
                              // {
                              //   key: '29',
                              //   label: '错误包(In/Out)',
                              //   children: `${dataItem?.server?.InErrors}/${dataItem?.server?.OutErrors}`,
                              // },
                              // {
                              //   key: '30',
                              //   label: '错误速率(In/Out)',
                              //   children: `${dataItem?.server?.InErrPS}/${dataItem?.server?.OutErrPS}`,
                              // },
                              {
                                key: '31',
                                label: '光模块状态',
                                children: dataItem?.server?.optStatus,
                              },
                              {
                                key: '32',
                                label: '光模块温度',
                                children: dataItem?.server?.optTemp,
                              },
                              {
                                key: '33',
                                label: '光模块电压',
                                children: dataItem?.server?.optVol,
                              },
                              {
                                key: '34',
                                label: '光模块偏置电流',
                                children: dataItem?.server?.optBias,
                              },
                              {
                                key: '35',
                                label: '光模块功率(In/Out)',
                                children: `${dataItem?.server?.optRXPower}/${dataItem?.server?.optTXPower}`,
                              },
                            ]}
                          />
                        </div>
                      )
                    }
                  })
                }
              />

            </div>
          )
        }
      </Card>
    </>
  )
}

export default TooltipDetail