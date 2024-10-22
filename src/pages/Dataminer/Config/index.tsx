/*
 * @creater: panan
 * @message: 数据挖掘配置入口文件
 * @since: 2024-10-22 15:47:34
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-22 17:23:44
 * @文件相对于项目的路径: /pan-umi/src/pages/Dataminer/Config/index.tsx
 */

import { LeftOutlined } from '@ant-design/icons'
import { history, useParams } from '@umijs/max'
import { Button, Card, Col, Row, Steps } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import SelectionData from './SelectionData'
import Pretreatment from './Pretreatment'
import DiversityMarking from './DiversityMarking'
import Filtration from './Filtration'
import QualityScoring from './QualityScoring'
import ManualSampling from './ManualSampling'
interface Props {
  [key: string]: any
}

const resultData = ['选择数据', '预处理', '多样性打标', '过滤(人工)', '质量打分', '采样(人工)']

const DataMinerConfig: FC<Props> = () => {
  const { id } = useParams()
  const [stepsData, setStepsData] = useState<string[]>([])
  const [stepsItems, setStepsItems] = useState<any[]>([])
  const [curSteps, setCurSteps] = useState<number>(0)

  const stepsMap = {
    '选择数据': <SelectionData />,
    '预处理': <Pretreatment />,
    '多样性打标': <DiversityMarking />,
    '过滤(人工)': <Filtration />,
    '质量打分': <QualityScoring />,
    '采样(人工)': <ManualSampling />,
  }

  const fetchStepsData = async () => {
    setStepsData(resultData)
  }

  useEffect(() => {
    if (!id) return
    fetchStepsData()
  }, [id])


  useEffect(() => {
    const curSteps = stepsData.map((item: string) => {
      return {
        title: item,
      }
    })
    setStepsItems(curSteps)
  }, [stepsData])

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Card
          styles={{
            body: {
              margin: '8px',
              padding: '0'
            }
          }}
        >
          <Button type='link' onClick={() => {
            history.push('/dataminer')
          }}><LeftOutlined /> 返回</Button>
        </Card>
      </Col>
      <Col span={24}>
        <Card
          styles={{
            body: {
              paddingBottom: '20px'
            }
          }}
        >
          <Steps
            // 文本放置位置到下方
            // labelPlacement="vertical"
            current={curSteps}
            items={stepsItems}
            onChange={(current) => {
              console.log(current)
              // TODO 判断是否可以点击步骤条切换
              // if(type === 'create') {
              //   return
              // }
              setCurSteps(current)
            }}
          // 禁止切换步骤条
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card
          styles={{
            body: {
              padding: '8px',
              margin: '0',
            }
          }}
        >
          <div style={{ flex: 1, overflow: 'auto', height: '100%', }}>
            {
              stepsMap[stepsData[curSteps] as keyof typeof stepsMap]
            }
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default DataMinerConfig