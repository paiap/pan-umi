import React, { useEffect, useState } from 'react';
import { Input, Select, Button, Form, Space, InputNumber, message } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { getModelList } from '../request';

const { Option } = Select;
const otherStyles = {
  width: '210px'
}

const ModelSearch = (props: {
  focused: string,
  orderType: string | number
  orderOptions: string | number,
  setLoading: (c: boolean) => void,
  setDataSource: (c: any[]) => void
  setTotal: (c: number) => void;
  pages:{
    page: number,
    pageSize: number
  }
}) => {
  const { focused, setLoading, orderType, orderOptions, setDataSource, setTotal, pages } = props
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  /**
   *
   * @param focused
   * @param formValues
   * @returns 获取模型详情列表
   */
  const fetchData = async (values: any) => {
    try {
      setLoading(true)
      const res = await getModelList(values)
      const { code, msg, data } = res || {}
      if (code !== 0) {
        message.warning(msg)
        return
      }
      setDataSource(data?.data || [])
      setTotal(data?.total || 0)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * @returns 防抖
   */
  const handleDebounceChange = _.debounce((values: any) => {
    fetchData(values)
  }, 1000)

  /**
   * 
   * @param values 
   * @param isTimer 
   * @returns 切换tab以及排序
   */
  const handleChange = (values: any, isTimer: boolean) => {
    if (isTimer) {
      handleDebounceChange(values)
      return
    }
    fetchData(values)
  }


  useEffect(() => {
    if (!focused || !orderType || !orderOptions || !pages) return
    const formValues = form.getFieldsValue();
    handleChange({
      focused,
      orderType,
      orderOptions,
      ...pages,
      ...formValues
    }, false);
  }, [focused, orderType, orderOptions, pages]);

  /**
   * 
   * @param values 
   * @param allValues 监听表单变化
   */
  const onValuesChange = (values: any, allValues: any) => {
    handleChange({
      focused,
      orderType,
      orderOptions,
      ...allValues
    }, true);
  }

  return (
    <div className="search-container">
      <Form onValuesChange={onValuesChange} form={form}>
        <Space>
          <Form.Item label="搜索模型" name={'搜索模型文本'} initialValue={''}>
            <Input placeholder="请输入" style={otherStyles} />
          </Form.Item>
          <Form.Item label="业务标签" name={'业务标签'} initialValue={'all'}>
            <Select style={otherStyles} placeholder='业务标签'>
              <Option value="all">全部</Option>
              <Option value="标签1">标签1</Option>
              <Option value="标签2">标签2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="能力标签" name={'能力标签'} initialValue={'all'}>
            <Select style={otherStyles} placeholder='能力标签'>
              <Option value="all">全部</Option>
              <Option value="标签1">标签1</Option>
              <Option value="标签2">标签2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="语言" name={'语言'} initialValue={'all'}>
            <Select style={otherStyles} placeholder='请选择语言'>
              <Option value="all">全部</Option>
              <Option value="语言1">语言1</Option>
              <Option value="语言2">语言2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="模型规模" name={'模型规模'} initialValue={'all'}>
            <Select style={otherStyles} placeholder='模型规模'>
              <Option value="all">全部</Option>
              <Option value="规模1">规模1</Option>
              <Option value="规模2">规模2</Option>
            </Select>
          </Form.Item>
          {
            !expand && (
              <Form.Item>
                <Button type="link" onClick={() => setExpand(!expand)}>
                  展开筛选<DownOutlined />
                </Button>
              </Form.Item>
            )
          }
        </Space>
        {
          expand && (
            <>
              <Space>
                <Form.Item label="应用领域" name={'应用领域'} initialValue={'all'}>
                  <Select style={otherStyles} placeholder='请选择应用领域'>
                    <Option value="all">全部</Option>
                    <Option value="领域1">领域1</Option>
                    <Option value="领域2">领域2</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="模型阶段" name={'模型阶段'} initialValue={'all'}>
                  <Select style={otherStyles} placeholder='请选择模型阶段'>
                    <Option value="all">全部</Option>
                    <Option value="阶段1">阶段1</Option>
                    <Option value="阶段2">阶段2</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="指令格式" name={'指令格式'} initialValue={'all'}>
                  <Select style={otherStyles} placeholder='请选择指令格式'>
                    <Option value="all">全部</Option>
                    <Option value="格式1">格式1</Option>
                    <Option value="格式2">格式2</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="基座类型" name={'基座类型'} initialValue={'all'}>
                  <Select style={otherStyles} placeholder='请选择基座类型'>
                    <Option value="all">全部</Option>
                    <Option value="类型1">类型1</Option>
                    <Option value="类型2">类型2</Option>
                  </Select>
                </Form.Item>

              </Space>
              <Space>
                <Form.Item label="训练次数" name={'训练次数最小'} >
                  <InputNumber placeholder="最小值" min={0} />
                </Form.Item>
                <Form.Item name={'训练次数最大'}>
                  <InputNumber placeholder="最大值" min={0} />
                </Form.Item>
                <Form.Item label="推理应用次数" name={'推理应用次数最小'}>
                  <InputNumber placeholder="最小值" min={0} />
                </Form.Item>
                <Form.Item name={'推理应用次数最大'}>
                  <InputNumber placeholder="最大值" min={0} />
                </Form.Item>
                <Form.Item >
                  <Button type="link" onClick={() => setExpand(!expand)}>
                    收起筛选<UpOutlined />
                  </Button>
                </Form.Item>
              </Space>
            </>
          )
        }
      </Form>
    </div>
  );
};

export default ModelSearch;
