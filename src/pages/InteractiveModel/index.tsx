/*
 * @creater: panan
 * @message: InteractiveModel 交互式建模
 * @since: 2024-08-14 15:54:06
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-19 10:54:38
 * @文件相对于项目的路径: /pan-umi/src/pages/InteractiveModel/index.tsx
 */

import { Button, Card, Col, Form, Input, Popconfirm, Row, Select, Space, Switch, Table } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { initColumns, initData } from './columns'
import OpenInteractive from './OpenInteractive'
import Timingshutdown from './Timingshutdown'
import SaveMirror from './SaveMirror/idnex'
interface Props {
  [key: string]: any
}

const InteractiveModel: FC<Props> = () => {

  const [columns, setColumns] = useState<any[]>(initColumns)
  const [dataSource, setDatasource] = useState<any[]>([])

  useEffect(() => {
    setDatasource(initData)
  }, [])

  const [form] = Form.useForm()

  const getColumns = () => {
    const curColumns = initColumns.map((item: any) => {
      if (item.dataIndex === 'action') {
        item.render = (_: any, record: any) => {
          return (
            <Space>
              <Popconfirm title='确定要启动吗？' onConfirm={() => { console.log('启动') }}>
                <a>启动</a>
              </Popconfirm>
              <Popconfirm title='确定要停止吗？' onConfirm={() => { console.log('停止') }}>
                <a style={{ color: 'red' }}>停止</a>
              </Popconfirm>

              <OpenInteractive record={record} />

              <SaveMirror record={record} />
              {/* 编辑 */}
              <a>变更配置</a>
              <Timingshutdown record={record} />
              <Popconfirm title='确定要删除吗？' onConfirm={() => { console.log('删除') }}>
                <a style={{ color: 'red' }}>删除</a>
              </Popconfirm>

            </Space>
          )
        }
      }
      return item
    })

    setColumns(curColumns)
  }

  useEffect(() => {
    getColumns()
  }, [dataSource])

  const handleSearch = async () => {
    console.log(form.getFieldsValue())
  }

  return (
    <>
      <Card title={
        <>
          <span>交互式建模</span>
        </>
      }>
        <Row gutter={[16, 16]} style={{ margin: '0' }}>
          <Col span={24}>
            <Form form={form}>
              <Space>
                <Form.Item label='实例名称' name='name'>
                  <Input
                    placeholder='请输入实例名称'
                    style={{
                      width: '350px'
                    }}
                  />
                </Form.Item>

                <Form.Item label='算法组' name='code'>
                  <Select
                    placeholder='请选择算法组'
                    style={{
                      width: '350px'
                    }}
                    options={[]}
                    // showSearch
                  />
                </Form.Item>

                {/* Switchd在表单中的字段为checked，而不是value */}
                <Form.Item label='查看所有租户' name='isAllTenant' valuePropName='checked' >
                  <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                </Form.Item>

                <Form.Item >
                  <Button type='primary' onClick={handleSearch}>查询</Button>
                </Form.Item>
              </Space>
            </Form>
          </Col>
          <Col span={24}>
            <Table
              size='small'
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default InteractiveModel