/*
 * @creater: panan
 * @message: 算法组概览
 * @since: 2025-04-17 21:37:45
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-18 11:21:26
 * @文件相对于项目的路径: /pan-umi/src/pages/AlgorithmSuite/index.tsx
 */

import { Button, Card, Col, DatePicker, Form, Radio, Row, Select, Space, Table } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { columns, columnsWithPerson } from './columns';
import { getAlgorithmOverview } from './service';

interface AlgorithmSuiteProps {
  [key: string]: any;
}

const { RangePicker } = DatePicker;

// 防抖搜索处理函数
const handleSearchDebounce = debounce((value: string) => {
  console.log('搜索关键词:', value);
  // 这里可以添加搜索逻辑，如果需要的话
}, 3000); // 3秒防抖

const AlgorithmSuite: FC<AlgorithmSuiteProps> = () => {
  // 表单实例
  const [form] = Form.useForm();

  // 视图类型：算法组/算法组人员
  const [viewType, setViewType] = useState<'group' | 'person'>('group');

  // 表格数据和列定义
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [tableColumns, setTableColumns] = useState<any[]>(columns);
  // 获取数据
  const fetchData = async () => {
    try {
      // 获取表单值
      const formValues = form.getFieldsValue();

      // 处理日期格式
      let params = { ...formValues };
      if (formValues.dateRange && formValues.dateRange.length === 2) {
        params.startDate = formValues.dateRange[0].format('YYYY-MM-DD');
        params.endDate = formValues.dateRange[1].format('YYYY-MM-DD');
        delete params.dateRange;
      }

      // 添加视图类型参数
      params.viewType = viewType;

      // 调用服务获取数据
      const result = await getAlgorithmOverview(params) as any;

      if (result && result?.success) {
        setDataSource(result.data || []);
      }
    } catch (error) {
      console.error('获取数据失败', error);
    }
  };

  // 初始化表格列
  useEffect(() => {
    // 根据视图类型设置不同的列
    setTableColumns(viewType === 'group' ? columns : columnsWithPerson);
  }, [viewType]);

  // 处理视图类型切换
  const handleViewTypeChange = (e: any) => {
    const newType = e.target.value;
    setViewType(newType);
    // 重新获取数据
    fetchData();
  };

  // 处理时间范围和近几天联动
  const handleDateRangeChange = (dates: any) => {
    if (dates) {
      // 清除近几天选择和快捷选择按钮
      form.setFieldValue('recentDays', null);
      form.setFieldValue('presetDate', null);
    }
  };

  // 不再需要handleRecentDaysChange函数，因为我们使用了快捷按钮

  // 处理查询
  const handleSearch = () => {
    fetchData();
  };

  // 处理重置
  const handleReset = () => {
    form.resetFields();
    fetchData();
  };

  // 初始化加载数据
  useEffect(() => {
    // 组件挂载时加载初始数据
    fetchData();
  }, []);

  return (
    <Card title="算法组概览">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* 视图类型切换 */}
        <Space >
          <div style={{ fontSize: '16px', fontWeight: 600 }}>维度统计：</div>
          <Radio.Group value={viewType} onChange={handleViewTypeChange}>
            <Radio.Button value="group">算法组</Radio.Button>
            <Radio.Button value="person">算法组人员</Radio.Button>
          </Radio.Group>
        </Space>

        {/* 筛选表单 */}
        <Form form={form} layout="inline">
          <Row gutter={[16, 16]} style={{ width: '100%' }}>
            <Col span={5}>
              <Form.Item label="算法组" name="algorithmGroup">
                <Select
                  placeholder="请选择算法组"
                  style={{ width: '100%' }}
                  options={[]}
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col span={5}>
              <Form.Item label="算法人员" name="algorithmPerson">
                <Select
                  placeholder="请选择算法人员"
                  style={{ width: '100%' }}
                  options={[]}
                  allowClear
                  showSearch
                  onSearch={handleSearchDebounce}
                  filterOption={false} // 关闭本地过滤，使用远程搜索
                />
              </Form.Item>
            </Col>

            <Col span={5}>
              <Form.Item label="时间范围" name="dateRange">
                <RangePicker
                  style={{ width: '100%' }}
                  onChange={handleDateRangeChange}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="presetDate">
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  onChange={({ target: { value } }) => {
                    const today = dayjs();
                    let dates: [dayjs.Dayjs, dayjs.Dayjs] | null = null;
                    switch (value) {
                      case 'today':
                        dates = [today.startOf('day'), today.endOf('day')];
                        break;
                      case 'yesterday':
                        dates = [today.subtract(1, 'day').startOf('day'), today.subtract(1, 'day').endOf('day')];
                        break;
                      case '3days':
                        dates = [today.subtract(2, 'day').startOf('day'), today.endOf('day')];
                        break;
                      case 'week':
                        dates = [today.subtract(6, 'day').startOf('day'), today.endOf('day')];
                        break;
                      case 'month':
                        dates = [today.subtract(29, 'day').startOf('day'), today.endOf('day')];
                        break;
                    }
                    form.setFieldValue('dateRange', dates);
                    form.setFieldValue('presetDate', value);
                  }}
                >
                  <Radio.Button value="today">今日</Radio.Button>
                  <Radio.Button value="yesterday">昨日</Radio.Button>
                  <Radio.Button value="3days">近三日</Radio.Button>
                  <Radio.Button value="week">近一周</Radio.Button>
                  <Radio.Button value="month">近一个月</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={2} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Space>
                  <Button type="primary" onClick={handleSearch}>查询</Button>
                  <Button onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* 表格 */}
        <div>
          {/* <div style={{ marginBottom: '16px' }}>
            共计<span style={{ margin: '0 5px', color: 'red' }}>{totalCount}</span>条数据
          </div> */}
          <Table
            columns={tableColumns}
            dataSource={dataSource}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
            scroll={{ x: 2500 }}
            size="middle"
          />
        </div>
      </Space>
    </Card>
  );
};

export default AlgorithmSuite;
