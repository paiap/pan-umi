/*
 * @creater: panan
 * @message: BillsTable
 * @since: 2025-03-26 10:36:05
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-26 19:41:25
 * @文件相对于项目的路径: /pan-umi/src/pages/BillsTable/index.tsx
 */

import { useEffect, useState } from 'react';
import { DatePicker, Select, Space, Spin } from 'antd';
import { useSearchParams } from '@umijs/max';
import dayjs from 'dayjs';
import TpcTable from './components/TpcTable';
import GpuTable from './components/GpuTable';
import CloudTable from './components/CloudTable';
import React from 'react';

const { MonthPicker } = DatePicker;

const BillsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedTpc, setSelectedTpc] = useState('');
  const [tpcOptions, setTpcOptions] = useState([]);
  const [tpcData, setTpcData] = useState([]);
  const [gpuData, setGpuData] = useState([]);
  const [cloudData, setCloudData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取TPC项目组列表
  const fetchTpcOptions = async () => {
    try {
      // TODO: 替换为实际的API调用
      const response = await fetch('/api/tpc-options');
      const data = await response.json();
      setTpcOptions(data);
      if (data.length > 0 && !selectedTpc) {
        setSelectedTpc(data[0].value);
      }
    } catch (error) {
      console.error('获取TPC项目组失败:', error);
    }
  };

  // 获取表格数据
  const fetchTableData = async () => {
    try {
      // TODO: 替换为实际的API调用
      const month = selectedMonth.format('YYYY-MM');
      setLoading(true);
      const [tpcResponse, gpuResponse, cloudResponse] = await Promise.all([
        fetch(`/api/tpc-data?month=${month}&tpc=${selectedTpc}`),
        fetch(`/api/gpu-data?month=${month}&tpc=${selectedTpc}`),
        fetch(`/api/cloud-data?month=${month}&tpc=${selectedTpc}`)
      ]);

      const [tpcData, gpuData, cloudData] = await Promise.all([
        tpcResponse.json(),
        gpuResponse.json(),
        cloudResponse.json()
      ]);

      setTpcData(tpcData);
      setGpuData(gpuData);
      setCloudData(cloudData);
    } catch (error) {
      console.error('获取表格数据失败:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // 从URL参数初始化
  useEffect(() => {
    const monthParam = searchParams.get('month');
    const tpcParam = searchParams.get('tpc');

    if (monthParam) {
      setSelectedMonth(dayjs(monthParam));
    }
    if (tpcParam) {
      setSelectedTpc(tpcParam);
    }

    fetchTpcOptions();
  }, []);

  // 监听选择器变化
  useEffect(() => {
    if (selectedTpc) {
      fetchTableData();
      // 更新URL参数
      setSearchParams({
        month: selectedMonth.format('YYYY-MM'),
        tpc: selectedTpc
      });
    }
  }, [selectedMonth, selectedTpc]);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <MonthPicker
          value={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          placeholder="选择月份"
        />
        <Select
          value={selectedTpc}
          onChange={setSelectedTpc}
          options={tpcOptions}
          style={{ width: 200 }}
          placeholder="选择TPC项目组"
        />
      </Space>

      <Spin spinning={loading}>
        <TpcTable dataSource={tpcData} refresh={fetchTableData} />
        <GpuTable dataSource={gpuData} />
        <CloudTable dataSource={cloudData} />
      </Spin>


    </div>
  );
};

export default BillsTable;
