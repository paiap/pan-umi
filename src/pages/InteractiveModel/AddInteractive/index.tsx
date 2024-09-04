/*
 * @creater: panan
 * @message: AddInteractive
 * @since: 2024-08-19 11:06:14
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-19 14:36:43
 * @文件相对于项目的路径: /pan-umi/src/pages/InteractiveModel/AddInteractive/index.tsx
 */

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Affix, Button, Card, Col, Collapse, Form, Input, InputNumber, Radio, Row, Select, Space, Switch, message } from 'antd'
import React, { FC, useState } from 'react'
interface Props {
  [key: string]: any
}

const AddInteractive: FC<Props> = () => {
  const [custom, setCustom] = useState<number>(8)
  const [form] = Form.useForm()

  const handleChange = (value: any[]) => {
    const filteredValue = value.filter((item: any) => /^\d+$/.test(item));
    return filteredValue;
  };

  return (
    <Row gutter={[16, 16]} style={{ margin: '0' }}>
      <Col span={24}>
        <Card
          title={
            <Space>
              <a >返回</a>
              <span>交互式建模-新建实例</span>
            </Space>
          }
          styles={{
            body: {
              margin: '0',
              padding: '0'
            }
          }}
        />
      </Col>
      <Col span={24} >
        <Form form={form} labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
          <Collapse
            // style={{ marginBottom: '0' }}

            items={[
              // 基础信息
              {
                key: '1',
                label: '基础信息',
                children: (
                  <>
                    <Form.Item label='实例名称' name='实例名称'>
                      <Input placeholder='请输入交互式实例名称' />
                    </Form.Item>
                    <Form.Item label='项目组' name='项目组'>
                      <Select placeholder='请选择项目组' options={[]} />
                    </Form.Item>
                    <Form.Item label='简介' name='简介'>
                      <Input.TextArea
                        placeholder='请输入交互式建模简介'
                        autoSize={{
                          minRows: 4,
                          maxRows: 6
                        }}
                      />
                    </Form.Item>
                  </>
                ),
              },
              // 资源信息
              {
                key: '2',
                label: '资源信息',
                children: <p>copy训练任务</p>,
              },
              // 环境信息
              {
                key: '3',
                label: '环境信息',
                children: (
                  <>
                    <div>镜像信息</div>
                    <Form.Item label='镜像' name='镜像'>
                      <Select placeholder='请选择镜像' options={[]} />
                    </Form.Item>
                    <div>环境配置</div>
                    <Form.Item label='Host管理' style={{ marginBottom: '0' }}>
                      <Form.List name='Host管理' initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Row key={key}>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'key']}
                                    rules={[{ required: true, message: 'Missing key' }]}
                                  >
                                    <Input placeholder="Key" />
                                  </Form.Item>
                                </Col>
                                <Col span={11} offset={1}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{ required: true, message: 'Missing value' }]}
                                  >
                                    <Input placeholder="Value" />
                                  </Form.Item>
                                </Col>
                                <Col span={1} offset={1}>
                                  <Button shape='circle' style={{ border: 'none' }} danger icon={<MinusCircleOutlined style={{ fontSize: '25px' }} />} onClick={() => remove(name)}></Button>

                                </Col>
                              </Row>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Host
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    <Form.Item label='注解' style={{ marginBottom: '0' }}>
                      <Form.List name='注解' initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Row key={key}>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'key']}
                                    rules={[{ required: true, message: 'Missing key' }]}
                                  >
                                    <Input placeholder="Key" />
                                  </Form.Item>
                                </Col>
                                <Col span={11} offset={1}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{ required: true, message: 'Missing value' }]}
                                  >
                                    <Input placeholder="Value" />
                                  </Form.Item>
                                </Col>
                                <Col span={1} offset={1}>
                                  <Button shape='circle' style={{ border: 'none' }} danger icon={<MinusCircleOutlined style={{ fontSize: '25px' }} />} onClick={() => remove(name)}></Button>

                                </Col>
                              </Row>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add 注解
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    <Form.Item label='环境变量' style={{ marginBottom: '0' }}>
                      <Form.List name='环境变量' initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Row key={key}>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'key']}
                                    rules={[{ required: true, message: 'Missing key' }]}
                                  >
                                    <Input placeholder="Key" />
                                  </Form.Item>
                                </Col>
                                <Col span={11} offset={1}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{ required: true, message: 'Missing value' }]}
                                  >
                                    <Input placeholder="Value" />
                                  </Form.Item>
                                </Col>
                                <Col span={1} offset={1}>
                                  <Button shape='circle' style={{ border: 'none' }} danger icon={<MinusCircleOutlined style={{ fontSize: '25px' }} />} onClick={() => remove(name)}></Button>

                                </Col>
                              </Row>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add 环境变量
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    <Form.Item label='标签' style={{ marginBottom: '0' }}>
                      <Form.List name='标签' initialValue={[{}]}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Row key={key}>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'key']}
                                    rules={[{ required: true, message: 'Missing key' }]}
                                  >
                                    <Input placeholder="Key" />
                                  </Form.Item>
                                </Col>
                                <Col span={11} offset={1}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    rules={[{ required: true, message: 'Missing value' }]}
                                  >
                                    <Input placeholder="Value" />
                                  </Form.Item>
                                </Col>
                                <Col span={1} offset={1}>
                                  <Button shape='circle' style={{ border: 'none' }} danger icon={<MinusCircleOutlined style={{ fontSize: '25px' }} />} onClick={() => remove(name)}></Button>

                                </Col>
                              </Row>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add 标签
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                  </>
                ),
              },
              // 挂载信息
              {
                key: '4',
                label: '挂载信息',
                children: <p>copy训练任务</p>,
              },
              // 高级设置
              {
                key: '5',
                label: '高级设置',
                children: (
                  <>
                    <Form.Item label='容器端口' name='容器端口'>
                      <Select
                        placeholder='请输入新增容器端口'
                        mode='tags'
                        options={[]}
                        onChange={(value) => {
                          const filteredValue = handleChange(value || []);
                          // 手动更新表单值
                          form.setFieldsValue({ '容器端口': filteredValue });
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label='启用定时关机'
                      name='isShutDown'
                      valuePropName='checked'
                      initialValue={false}
                    >
                      <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate>
                      {
                        ({ getFieldValue }) => {
                          const isShutDown = getFieldValue('isShutDown')
                          if (isShutDown) {
                            return (
                              <Form.Item name={'time'} label='定时关机时间' initialValue={1}>
                                <Radio.Group>
                                  <Radio value={1}>1小时后</Radio>
                                  <Radio value={2}>2小时后</Radio>
                                  <Radio value={4}>4小时后</Radio>
                                  <Radio value={6}>6小时后</Radio>
                                  <Radio value={custom}>自定义(小时) <InputNumber min={1} value={custom} onChange={(val: number | null) => {
                                    if (!val) {
                                      message.warning('自定义关机时间不能为空')
                                      setCustom(8)
                                      return
                                    }
                                    setCustom(val)
                                  }} /></Radio>
                                </Radio.Group>
                              </Form.Item>
                            )
                          }
                          return null
                        }
                      }
                    </Form.Item>
                  </>
                ),
              },
            ]} defaultActiveKey={['1', '2', '3', '4', '5']} />
        </Form>
        <Affix offsetBottom={30}>
          <Col span={24} style={{ textAlign: 'right', marginTop: '16px' }}>
            <Space>
              <Button>取消</Button>
              <Button type='primary'>提交</Button>
            </Space>
          </Col>
        </Affix>
      </Col>
    </Row >
  )
}

export default AddInteractive