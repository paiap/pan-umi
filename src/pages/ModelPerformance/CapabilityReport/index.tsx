import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
interface Props {
  [key: string]: any
}

const CapabilityReport: FC<Props> = () => {
  return (
    <Card
      title='能力进展报告'
      extra={
        <Space>
          <DatePicker.RangePicker />
          <Select options={[]} placeholder='请选择能力进展对象' style={{ width: '250px' }} />
          <Button type='primary'>生成报告</Button>
        </Space>
      }
    >
      <Row>
        <Col span={24}>
          <div style={{ color: '#b3b3b3', marginBottom: '16px' }}>
            <span>能力进展报告可针对danger特定评测集或全部评测集生成</span>
            <div>
              <span>针对单个评测集，则指标项为评估任务产生的基础指标；</span>
              <span>针对全部评测集，则指标项为各个评测集的综合得分；</span>
              <span>选择评估日期范围后，如果存在数量大于4个的评估记录，则采样其中4次评估记录生成能力进展报告。</span>
            </div>

          </div>
        </Col>
        <Col span={24}>
          <Form labelCol={{ span: 2 }}>
            <Form.Item label='进展概要描述'>
              <Input.TextArea
                autoSize={{
                  minRows: 4,
                  maxRows: 6
                }}
                // style={{width:'800px'}}
                placeholder='进展概要描述'
              />
            </Form.Item>

            <Form.Item label='进展趋势示意图'></Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

export default CapabilityReport