/*
 * @creater: panan
 * @message: 数据挖掘配置入口文件
 * @since: 2024-10-22 15:47:34
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-23 20:15:05
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

const resultData = [
  {
    "id": "b004adefd8664a609248c5e16ef2727a",
    "type": "DOWNLOAD",
  },
  {
    "id": "2400e2ea436449bb92b27d7c154dade0",
    "type": "PREPROCESS",
  },
  {
    "id": "033a5973450c4f6a8b07c72089776fda",
    "type": "TAGGING",
  },
  {
    "id": "033a5973450c4f6a8b07c58392376fda",
    "type": "FILTER",
  },
  {
    "id": "033a597cfeweitrtgiwfr58392376fda",
    "type": "SCORE",
  },
  {
    "id": "erfefr43450c4f6a8b07c58392376fda",
    "type": "SAMPLING",
  }
]

const resultMap = {
  DOWNLOAD: '选择数据',
  PREPROCESS: '预处理',
  TAGGING: '多样性打标',
  FILTER: '过滤(人工)',
  SCORE: '质量打分',
  SAMPLING: '采样(人工)',
}

const DataMinerConfig: FC<Props> = () => {
  const { id } = useParams()
  const [stepsItems, setStepsItems] = useState<any[]>([])
  const [curSteps, setCurSteps] = useState<number>(0)
  const [dataSource, setDataSource] = useState<{
    id: string,
    type: string,
    [key: string]: any
  }[]>([])

  const stepsMap = {
    'DOWNLOAD': <SelectionData item={dataSource?.find(item => item.type === 'DOWNLOAD')} />,
    'PREPROCESS': <Pretreatment item={dataSource?.find(item => item.type === 'PREPROCESS')} />,
    'TAGGING': <DiversityMarking item={dataSource?.find(item => item.type === 'TAGGING')} />,
    'FILTER': <Filtration item={dataSource?.find(item => item.type === 'FILTER')} />,
    'SCORE': <QualityScoring item={dataSource?.find(item => item.type === 'SCORE')} />,
    'SAMPLING': <ManualSampling item={dataSource?.find(item => item.type === 'SAMPLING')} />,
  }

  const fetchStepsData = async () => {
    setDataSource(resultData)
  }

  useEffect(() => {
    if (!id) return
    fetchStepsData()
  }, [id])


  useEffect(() => {
    const curSteps = dataSource.map((item) => {
      return {
        title: item?.type ? resultMap[item.type as keyof typeof resultMap] : '',
      }
    })
    setStepsItems(curSteps)
  }, [dataSource])

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
              margin: '0',
            }
          }}
        >
          <div style={{ overflow: 'auto', height: 'calc(100vh - 280px)', }}>
            {
              stepsMap[dataSource[curSteps]?.type as keyof typeof stepsMap]
            }
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default DataMinerConfig