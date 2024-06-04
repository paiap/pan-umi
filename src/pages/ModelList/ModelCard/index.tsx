import Collection from '@/components/Collection'
import UnCollection from '@/components/Collection/unindex'
import { Badge, Card, Image, Space, Spin, Tooltip } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { WoStatus } from '../param'
import TrainTask from '@/components/icons/TrainTask'
import { InfoCircleOutlined } from '@ant-design/icons'
import TrainSet from '@/components/icons/TrainSet'
import ModelVersion from '@/components/icons/ModelVersion'
import CheckIcon from '@/components/icons/CheckIcon'
import TestIcon from '@/components/icons/TestIcon'
import Reasoning from '@/components/icons/Reasoning'
import './index.less'
interface Props {
  data: ModelList.modeldetailParam,
  refresh: () => void
}

const ModelCard: FC<Props> = ({ data }) => {
  const [item, setItem] = useState<ModelList.modeldetailParam>()
  const [woc, setWoc] = useState<ModelList.WoStatusParam>()

  useEffect(() => {
    if (!data) return
    const curWoc = WoStatus.find((c: ModelList.WoStatusParam, index: number) => index === data?.wosStatus)
    setWoc(curWoc)
    setItem(data)
  }, [data])

  return (
    <div style={{ marginBottom: '8px' }} className='modelListContainer'>
      <Badge.Ribbon text={woc?.name} color={woc?.color}>
        <Card
          title={
            <Space>
              <span>{item?.name}</span>
              <span>{item?.modelVersion}</span>
              {
                item?.focused ? (
                  <span style={{ cursor: 'pointer' }}><Collection /></span>
                ) : (
                  <span style={{ cursor: 'pointer' }}><UnCollection /></span>
                )
              }
            </Space>
          }
          styles={{
            header: {
              padding: '0 8px',
            },
            body: {
              padding: '8px',
              overflowX:'auto',
            }
          }}
        >
          <Space align='start'>
            <Image
              width={150}
              style={{
                borderRadius: '8px',
                boxShadow: '1px 2px 8px rgba(0, 0, 0, 0.15)'
              }}
              src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
              placeholder={
                <Spin spinning={true}></Spin>
              }
            />
            {/* 模型描述 */}
            <div style={{
              width: '200px',
              margin: '0 8px',
              whiteSpace: 'normal', // 允许文本换行
              overflowWrap: 'break-word', // 在长单词处换行
            }}>
              <div style={{
                fontSize: '18px',
                height: '30px',
                lineHeight: '30px',
                fontWeight: 500
              }}>模型描述</div>
              <div>{item?.description}</div>
            </div>
            {/* 训练集 */}
            <div style={{
              width: '160px',
              marginRight: '8px',
              whiteSpace: 'normal', // 允许文本换行
              overflowWrap: 'break-word', // 在长单词处换行
            }}>
              <div style={{
                display: 'flex', // 使用Flexbox布局
                alignItems: 'center', // 水平居中
                fontSize: '18px',
                height: '30px',
                lineHeight: '30px',
              }}>
                <TrainSet />
                <span style={{ fontWeight: 500 }}>训练集</span>
              </div>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '80px' }}>训练集数量</div>
                <div>{item?.trainDatasetNum} 个</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '80px' }}>数据条数</div>
                <div>{item?.trainDatasetTaggingRefNum} 条</div>
              </Space>
            </div>
            {/* 训练任务 */}
            <div style={{
              width: '210px',
              marginRight: '8px',
              whiteSpace: 'normal', // 允许文本换行
              overflowWrap: 'break-word', // 在长单词处换行
            }}>
              <div style={{
                display: 'flex', // 使用Flexbox布局
                alignItems: 'center', // 水平居中
                fontSize: '18px',
                height: '30px',
                lineHeight: '30px',
              }}>
                <TrainTask />
                <span style={{ fontWeight: 500 }}>训练任务</span>
              </div>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '100px' }}>成功训练次数</div>
                <div>{item?.trainTaskSuccess}/{item?.trainTaskCount} 次</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '100px' }}>训练时间</div>
                <div>{item?.trainTaskTrainHour} 小时</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '100px' }}>算力成本</div>
                <div>{item?.trainTaskCost} 元</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '100px' }}>训练卡时</div>
                <div>{item?.trainTaskCardHour}</div>
              </Space>
            </div>
            {/* 模型版本 */}
            <div style={{
              width: '110px',
              marginRight: '8px',
              whiteSpace: 'normal', // 允许文本换行
              overflowWrap: 'break-word', // 在长单词处换行
            }}>
              <div style={{
                display: 'flex', // 使用Flexbox布局
                alignItems: 'center', // 水平居中
                fontSize: '18px',
                height: '30px',
                lineHeight: '30px',
              }}>
                <ModelVersion />
                <span style={{ fontWeight: 500 }}>模型版本</span>
              </div>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div>{item?.modelVersionNum} 个版本</div>
              </Space>
            </div>
            {/* 验证 */}
            <div style={{
              width: '120px',
              marginRight: '8px',
              whiteSpace: 'normal', // 允许文本换行
              overflowWrap: 'break-word', // 在长单词处换行
            }}>
              <div style={{
                display: 'flex', // 使用Flexbox布局
                alignItems: 'center', // 水平居中
                fontSize: '18px',
                height: '30px',
                lineHeight: '30px',
              }}>
                <CheckIcon />
                <span style={{ fontWeight: 500 }}>验证</span>
              </div>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '60px' }}>最优结果</div>
                <div>{(item?.evaluationBest || 0) * 1}%</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '60px' }}>最大提升</div>
                <div>{(item?.evaluationUp || 0) * 1}%</div>
              </Space>
            </div>
            {/* 测试 */}
            <div style={{
              width: '120px',
              marginRight: '8px',
              whiteSpace: 'normal', // 允许文本换行
              overflowWrap: 'break-word', // 在长单词处换行
            }}>
              <div style={{
                display: 'flex', // 使用Flexbox布局
                alignItems: 'center', // 水平居中
                fontSize: '18px',
                height: '30px',
                lineHeight: '30px',
              }}>
                <TestIcon />
                <span style={{ fontWeight: 500 }}>测试</span>
              </div>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '60px' }}>最优结果</div>
                <div>{(item?.testBest || 0) * 1}%</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '60px' }}>最大提升</div>
                <div>{(item?.testUp || 0) * 1}%</div>
              </Space>
            </div>
            {/* 推理 */}
            <div style={{
              width: '320px',
              marginRight: '8px',
              whiteSpace: 'normal', // 允许文本换行
              overflowWrap: 'break-word', // 在长单词处换行
            }}>
              <div style={{
                display: 'flex', // 使用Flexbox布局
                alignItems: 'center', // 水平居中
                fontSize: '18px',
                height: '30px',
                lineHeight: '30px',
              }}>
                <Reasoning />
                <span style={{ fontWeight: 500 }}>推理</span>
              </div>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '130px' }}>最近应用部署时间</div>
                <div>{item?.illationAppRecent}</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '130px' }}>推理应用卡时</div>
                <div>{item?.illationAppCardHour}</div>
              </Space>
              <Space>
                <Tooltip>
                  <InfoCircleOutlined />
                </Tooltip>
                <div style={{ width: '130px' }}>推理应用个数</div>
                <div>{item?.illationAppNum} 个</div>
              </Space>
            </div>
          </Space>
        </Card>
      </Badge.Ribbon>
    </div>
  )
}

export default ModelCard