/*
 * @creater: panan
 * @message: AssessmentDetail
 * @since: 2024-12-25 09:50:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-25 15:04:40
 * @文件相对于项目的路径: /pan-umi/src/pages/AssessmentDetail/index.tsx
 */

import React, { FC, useState, useEffect, useRef } from 'react'
import { Button, Card, Col, Form, InputNumber, Row, Select, Space } from 'antd';
import AssessmentDetailTable from './AssessmentDetailTable';
interface Props {
  [key: string]: any
}

const logicOptions = [
  // <=、<、=、>、>=、!=
  { label: '小于等于', value: '<=' },
  { label: '小于', value: '<' },
  { label: '等于', value: '=' },
  { label: '大于', value: '>' },
  { label: '大于等于', value: '>=' },
  { label: '不等于', value: '!=' },
]

const AssessmentDetail: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [form] = Form.useForm()

  const fetchDetailList = async (params?: any) => {
    console.log(params ? 'init请求' : '搜索请求')
    setLoading(true)
    try {
      // const res = await api.getDetailList(params?params:{})
      setDataSource([])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    const values = await form.validateFields()
    console.log(values)
    fetchDetailList(values)
  }

  useEffect(() => {
    fetchDetailList()
  }, [])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title={
            <Space>
              <Button type='link'>返回</Button>
              <span>模型评估任务详情</span>
            </Space>
          }
          extra={
            <Form form={form}>
              <Space>
                <div>单条评估结果筛选:</div>
                <Form.Item name='field' style={{ marginBottom: '0' }}>
                  <Select
                    options={[]}
                    placeholder='请选择'
                    style={{ width: 200 }}
                  />
                </Form.Item>
                <Form.Item name='logic' style={{ marginBottom: '0' }}>
                  <Select
                    options={logicOptions}
                    placeholder='请选择'
                    style={{ width: 120 }}
                  />
                </Form.Item>
                <Form.Item name='number' style={{ marginBottom: '0' }}>
                  <InputNumber
                    placeholder='数字'
                    style={{ width: 120 }}
                    min={0}
                    max={100}
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: '0', marginRight: '16px' }}>
                  <Button type='primary' loading={loading} onClick={handleSearch}>筛选</Button>
                </Form.Item>
              </Space>
            </Form>
          }
          styles={{
            header: {
              padding: '0',
              margin: '0',
            },
            body: {
              margin: '0',
              padding: '0'
            }
          }}
        >
        </Card>
      </Col>
      <Col span={24}>
        <AssessmentDetailTable data={dataSource} />
      </Col>
    </Row>
  )
}

export default AssessmentDetail