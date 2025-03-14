/*
 * @creater: panan
 * @message: Fuhe
 * @since: 2024-12-10 14:22:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-10 16:24:26
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/Fuhe/index.tsx
 */

import { Button, Col, DatePicker, Modal, Radio, Row, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
import { mockData } from './mock'
import { set } from 'lodash';

interface AimeScores {
  avg: number;
  verify: boolean;
  [key: string]: any;
}

interface MockData {
  aime_scores: {
    [key: string]: AimeScores;
  };
  [key: string]: any;
}

interface Props {
  curNumber: number;
  [key: string]: any
}

const Fuhe: FC<Props> = ({ curNumber }) => {
  const [dataSource, setDataSource] = useState<MockData[]>([])
  const [data, setData] = useState<MockData>()
  const [curIndex, setCurIndex] = useState<number>(curNumber)
  const [visible, setVisible] = useState<boolean>(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!mockData) return
    setDataSource(mockData)
  }, [mockData])

  useEffect(() => {
    if (!curNumber) return
    setCurIndex(curNumber)
  }, [curNumber])

  useEffect(() => {
    if (!dataSource || !curIndex) return
    setData(dataSource[curIndex - 1])
  }, [curIndex, dataSource])

  const openModal = () => {
    setVisible(true)
  }

  const cancelVisible = () => {
    setVisible(false)
  }

  /**
   * 
   * @param item 
   * description: 修改iframe参数
   */
  const changeIframe = (item: any) => {
    if (visible && iframeRef.current) {
      const iframe = iframeRef.current
      iframe.onload = () => {
        const message = {
          type: 'initHistoryContext',
          data: {
            traceId: item?.id,
            indexTime: item?.time,
          }
        }
        iframe.contentWindow?.postMessage(message, '*')
      }
    }
  }

  const handleAimsScores = (key: string, value: boolean) => {
    const newMockData: MockData = JSON.parse(JSON.stringify(data))
    newMockData.aime_scores[key].verify = value
    setData(newMockData)
  }

  const handlePre = () => {
    setCurIndex(curIndex - 1)
  }

  const handleNext = () => {
    changeIframe(dataSource[curIndex + 1])
    setCurIndex(curIndex + 1)
  }
  return (
    <>
      <Button type='link' onClick={openModal}>查看</Button>

      <Modal
        title='数据看板'
        open={visible}
        onCancel={cancelVisible}
        onOk={cancelVisible}
        width={1400}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space>
              <span>筛选时间:</span>
              <DatePicker.RangePicker />
            </Space>
          </Col>
          <Col span={24}>
            <div>
              <iframe
                ref={iframeRef}
                src='https://www.baidu.com/#/historyQueryDebug?noPath=1&hideEval=1&traceId=20003020173336518191400000000254&indexTime=20241205'
                width='100%'
                height='600px'
              />
            </div>
            <Space style={{
              float: 'left',
            }}>
              {
                data?.aime_scores && Object.keys(data.aime_scores).map((key: string) => {
                  const aimeScores = data.aime_scores
                  const avg = aimeScores?.[key as keyof typeof aimeScores].avg
                  const verify = aimeScores?.[key as keyof typeof aimeScores].verify
                  return (
                    <Space key={key} direction='vertical'>
                      <div>
                        <span>{key}：</span>
                        <span style={{ color: '#1777FF' }}>{avg}</span>
                      </div>
                      <div>
                        <Radio.Group value={verify} optionType='button' onChange={(e) => {
                          console.log(e.target.value)
                          handleAimsScores(key, e.target.value)
                        }}>
                          <Radio value={true}>正确</Radio>
                          <Radio value={false}>错误</Radio>
                        </Radio.Group>
                      </div>
                    </Space>
                  )
                })
              }
            </Space>
            <Space style={{ float: 'right', margin: 'auto', textAlign: 'right', marginTop: '16px' }}>
              <Button onClick={handlePre} disabled={curIndex === 1}>上一句</Button>
              <Button type='primary' onClick={handleNext} disabled={curIndex === dataSource.length} >保存并下一句</Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default Fuhe