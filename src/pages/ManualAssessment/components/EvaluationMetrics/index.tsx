/*
 * @creater: panan
 * @message: 评估指标管理组件
 * @since: 2025-07-15 15:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16 18:00:56
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationMetrics/index.tsx
 */

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  Typography,
  Tooltip,
  Tag,
  Input,
  Card
} from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import {
  EvaluationMetric,
  queryMetrics,
  deleteMetric,
  QueryMetricsParams
} from './api';
import AddMetricButton from './AddMetricButton';
import EditMetricButton from './EditMetricButton';

const { Text } = Typography;

interface EvaluationMetricsProps {
  // 是否作为表单项嵌入使用
  embedded?: boolean;
  // 选中的指标值，用于表单回显
  value?: string[];
  // 值变化回调，用于表单联动
  onChange?: (selectedMetrics: EvaluationMetric[]) => void;
  // 是否允许多选
  multiple?: boolean;
}

type EvaluationMetricsRef = {
  // 获取选中的指标
  getSelectedMetrics: () => EvaluationMetric[];
  // 重置选择
  resetSelection: () => void;
  // 刷新数据
  refresh: () => void;
  // 在弹窗打开时设置选中的值
  setPreSelectedRows: (initialData: EvaluationMetric[], value: string[]) => void;
};

export type { EvaluationMetricsRef };

const EvaluationMetrics = forwardRef<EvaluationMetricsRef, EvaluationMetricsProps>(
  ({ embedded = false, value = [], onChange, multiple = true }, ref) => {
    const [dataSource, setDataSource] = useState<EvaluationMetric[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    });
    const [searchParams, setSearchParams] = useState<Record<string, any>>({});
    const [searchValues, setSearchValues] = useState<Record<string, any>>({});
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(value);
    const [selectedRows, setSelectedRows] = useState<EvaluationMetric[]>([]);

    // 获取数据
    const fetchData = async () => {
      setLoading(true);
      try {
        const params: QueryMetricsParams = {
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
          ...searchParams,
        };

        const response = await queryMetrics(params);
        if (response.code === 0) {
          setDataSource(response.data.list);
          setPagination({
            ...pagination,
            total: response.data.total,
          });
        } else {
          message.error(response.msg || '获取数据失败');
        }
      } catch (error) {
        message.error('网络错误，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    // 搜索处理
    const handleSearch = (selectedKeys: any[], confirm: any, columnKey: string) => {
      confirm();

      const newSearchValues = {
        ...searchValues,
        [columnKey]: selectedKeys[0] || '',
      };
      setSearchValues(newSearchValues);

      const filteredSearchParams = Object.keys(newSearchValues).reduce((acc, key) => {
        if (newSearchValues[key] && newSearchValues[key].trim() !== '') {
          acc[key] = newSearchValues[key].trim();
        }
        return acc;
      }, {} as Record<string, any>);

      setSearchParams(filteredSearchParams);
      setPagination({ ...pagination, pageNum: 1 });
    };

    // 重置搜索
    const handleReset = (clearFilters: any, confirm: any, columnKey: string) => {
      clearFilters();
      confirm();

      const newSearchValues = { ...searchValues };
      delete newSearchValues[columnKey];
      setSearchValues(newSearchValues);

      const newSearchParams = { ...searchParams };
      delete newSearchParams[columnKey];
      setSearchParams(newSearchParams);

      setPagination({ ...pagination, pageNum: 1 });
    };


    // 删除指标
    const handleDelete = async (id: string) => {
      try {
        const response = await deleteMetric(id);
        if (response.code === 0) {
          message.success('删除成功');
          fetchData();

          // 如果删除的是已选中的指标，需要更新选中状态
          if (selectedRowKeys.includes(id)) {
            const newSelectedRowKeys = selectedRowKeys.filter(key => key !== id);
            const newSelectedRows = selectedRows.filter(row => row.id !== id);
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectedRows(newSelectedRows);
            onChange?.(newSelectedRows);
          }
        } else {
          message.error(response.msg || '删除失败');
        }
      } catch (error) {
        message.error('网络错误，请稍后重试');
      }
    };

    // 表单提交成功回调
    const handleFormSuccess = () => {
      fetchData();
    };

    // 清除所有搜索条件
    const clearAllSearch = () => {
      setSearchValues({});
      setSearchParams({});
      setPagination({ ...pagination, pageNum: 1 });
    };

    // 暴露方法给父组件
    useImperativeHandle(ref, () => ({
      getSelectedMetrics: () => selectedRows,
      resetSelection: () => {
        setSelectedRowKeys([]);
        setSelectedRows([]);
      },
      refresh: () => {
        fetchData();
      },
      // 在弹窗打开时设置选中的值
      setPreSelectedRows: (initialData: EvaluationMetric[], value: string[]) => {
        const preSelectedRows = value.map(id => initialData.find(row => row.id === id)).filter(Boolean) as EvaluationMetric[];
        setSelectedRows(preSelectedRows);
      }
    }));

    // 表格列配置
    const getColumns = () => {
      const searchableColumns = ['metricNameCn', 'metricNameEn', 'creator'];

      const baseColumns = [
        {
          title: '序号',
          key: 'index',
          width: 70,
          minWidth: 70,
          align: 'center' as const,
          ellipsis: false,
          render: (_: any, __: any, index: number) =>
            (pagination.pageNum - 1) * pagination.pageSize + index + 1,
        },
        {
          title: '指标中文名',
          dataIndex: 'metricNameCn',
          key: 'metricNameCn',
          width: 150,
          minWidth: 120,
          ellipsis: {
            showTitle: false,
          },
          render: (text: string) => (
            <Tooltip title={text} placement="top">
              <span>{text}</span>
            </Tooltip>
          ),
        },
        {
          title: '指标英文名',
          dataIndex: 'metricNameEn',
          key: 'metricNameEn',
          width: 150,
          minWidth: 120,
          ellipsis: {
            showTitle: false,
          },
          render: (text: string) => (
            <Tooltip title={text} placement="top">
              <span>{text}</span>
            </Tooltip>
          ),
        },
        {
          title: '指标描述',
          dataIndex: 'metricDescription',
          key: 'metricDescription',
          width: 200,
          minWidth: 150,
          ellipsis: {
            showTitle: false,
          },
          render: (text: string) => (
            <Tooltip title={text} placement="top">
              <span>{text}</span>
            </Tooltip>
          ),
        },
        {
          title: '评判标准',
          dataIndex: 'evaluationStandard',
          key: 'evaluationStandard',
          width: 110,
          minWidth: 110,
          align: 'center' as const,
          ellipsis: false,
          render: (value: string) => {
            const config = {
              higher_better: { text: '越大越好', color: 'green' },
              lower_better: { text: '越小越好', color: 'blue' },
            };
            const { text, color } = config[value as keyof typeof config] || { text: value, color: 'default' };
            return <Tag color={color}>{text}</Tag>;
          },
        },
        {
          title: '数值范围',
          key: 'valueRange',
          width: 120,
          minWidth: 100,
          align: 'center' as const,
          ellipsis: false,
          render: (_: any, record: EvaluationMetric) =>
            `${record.valueRangeMin}~${record.valueRangeMax}`,
        },
        {
          title: '精准匹配键',
          dataIndex: 'precisionMatchKey',
          key: 'precisionMatchKey',
          width: 140,
          minWidth: 120,
          ellipsis: {
            showTitle: false,
          },
          render: (text: string) => (
            <Tooltip title={text} placement="top">
              <span>{text}</span>
            </Tooltip>
          ),
        },
        {
          title: '创建人',
          dataIndex: 'creator',
          key: 'creator',
          width: 100,
          minWidth: 80,
          ellipsis: {
            showTitle: false,
          },
          render: (text: string) => (
            <Tooltip title={text} placement="top">
              <span>{text}</span>
            </Tooltip>
          ),
        },
        {
          title: '操作',
          key: 'action',
          width: 160,
          minWidth: 160,
          align: 'center' as const,
          fixed: 'right' as const,
          ellipsis: false,
          render: (_, record: EvaluationMetric) => (
            <Space size="small">
              <EditMetricButton
                metric={record}
                onSuccess={handleFormSuccess}
              // TODO: 添加权限控制逻辑
              // disabled={record.creator !== currentUser.name && !currentUser.isAdmin}
              />
              <Popconfirm
                title="确定要删除这个指标吗？"
                onConfirm={() => handleDelete(record.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  type="link"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  title="删除"
                // TODO: 添加权限控制逻辑
                // disabled={record.creator !== currentUser.name && !currentUser.isAdmin}
                >
                  删除
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
      ];

      // 为可搜索列添加搜索功能
      return baseColumns.map((column: any) => {
        if (searchableColumns.includes(column.key)) {
          return {
            ...column,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
              <div style={{ padding: 8 }}>
                <Input
                  placeholder={`搜索 ${column.title}`}
                  value={selectedKeys[0]}
                  onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => handleSearch(selectedKeys, confirm, column.key)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, column.key)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    搜索
                  </Button>
                  <Button
                    onClick={() => handleReset(clearFilters, confirm, column.key)}
                    size="small"
                    style={{ width: 90 }}
                  >
                    重置
                  </Button>
                </Space>
              </div>
            ),
            filterIcon: () => {
              const hasSearchValue = searchValues[column.key] && searchValues[column.key].trim() !== '';
              return (
                <SearchOutlined style={{ color: hasSearchValue ? '#1890ff' : undefined }} />
              );
            },
            filteredValue: searchValues[column.key] ? [searchValues[column.key]] : null,
          };
        }
        return column;
      });
    };

    // 表格行选择配置
    const rowSelection = embedded ? {
      type: multiple ? 'checkbox' as const : 'radio' as const,
      selectedRowKeys,
      onChange: (newSelectedRowKeys: React.Key[], newSelectedRows: EvaluationMetric[]) => {
        setSelectedRowKeys(newSelectedRowKeys as string[]);

        // 需要维持已选择数据的完整性，不仅仅是当前页面的数据
        // 保留之前选中但不在当前页面的数据
        const existingSelectedRows = selectedRows.filter(row => !dataSource.some(d => d.id === row.id));
        // 加上当前页面的新选中数据
        const finalSelectedRows = [...existingSelectedRows, ...newSelectedRows];

        setSelectedRows(finalSelectedRows);
        onChange?.(finalSelectedRows);
      },
    } : undefined;

    // 初始化选中行
    useEffect(() => {
      setSelectedRows(dataSource.filter(row => selectedRowKeys.includes(row.id)));
    }, [dataSource, selectedRowKeys]);

    useEffect(() => {
      fetchData();
    }, [pagination.pageNum, pagination.pageSize, searchParams]);

    // 监听外部value变化
    useEffect(() => {
      if (JSON.stringify(value) !== JSON.stringify(selectedRowKeys)) {
        setSelectedRowKeys(value);
        // 需要维持已选择数据的完整性，不仅仅是当前页面的数据
        // 如果有新的选中项在当前页面中，添加到 selectedRows
        const currentPageSelectedRows = dataSource.filter(row => value.includes(row.id));
        // 保留之前选中但不在当前页面的数据
        const existingSelectedRows = selectedRows.filter(row => !dataSource.some(d => d.id === row.id));
        // 合并已选中的数据
        const newSelectedRows = [...existingSelectedRows, ...currentPageSelectedRows];
        setSelectedRows(newSelectedRows);
      }
    }, [value, dataSource]);

    const tableContent = (
      <>

        {/* 搜索条件显示 */}
        {Object.keys(searchParams).length > 0 && (
          <div style={{
            background: '#f5f5f5',
            padding: 12,
            borderRadius: 6,
            marginBottom: 16
          }}>
            <Space wrap>
              <Text strong>当前搜索条件：</Text>
              {Object.entries(searchParams).map(([key, value]: any) => {
                const columnTitles: any = {
                  metricNameCn: '指标中文名',
                  metricNameEn: '指标英文名',
                  creator: '创建人',
                };
                const title = columnTitles[key] || key;
                return (
                  <Tag
                    key={key}
                    color="blue"
                    closable
                    onClose={() => {
                      const newSearchValues = { ...searchValues };
                      delete newSearchValues[key];
                      setSearchValues(newSearchValues);

                      const newSearchParams = { ...searchParams };
                      delete newSearchParams[key];
                      setSearchParams(newSearchParams);

                      setPagination({ ...pagination, pageNum: 1 });
                    }}
                  >
                    {title}: {value}
                  </Tag>
                );
              })}
              <Button
                type="text"
                size="small"
                onClick={clearAllSearch}
                style={{ color: '#1890ff' }}
              >
                清除所有
              </Button>
            </Space>
          </div>
        )}

        {/* 已选择指标显示（嵌入模式） */}
        <Space wrap>
          <AddMetricButton onSuccess={handleFormSuccess}>
            新增指标
          </AddMetricButton>
          <Text strong>已选择指标：</Text>
          {embedded && selectedRows.length > 0 && (
            <>
              {selectedRows.map(metric => (
                <Tag
                  key={metric.id}
                  color="green"
                  closable
                  onClose={() => {
                    const newSelectedRowKeys = selectedRowKeys.filter(key => key !== metric.id);
                    const newSelectedRows = selectedRows.filter(row => row.id !== metric.id);
                    setSelectedRowKeys(newSelectedRowKeys);
                    setSelectedRows(newSelectedRows);
                    onChange?.(newSelectedRows);
                  }}
                >
                  {metric.metricNameCn}({metric.metricNameEn})
                </Tag>
              ))}
            </>
          )}

        </Space>

        {/* 表格 */}
        <Table
          columns={getColumns()}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            current: pagination.pageNum,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, pageSize) => {
              setPagination({
                ...pagination,
                pageNum: page,
                pageSize: pageSize || pagination.pageSize,
              });
            },
          }}
          rowKey="id"
          rowSelection={rowSelection}
          scroll={{
            x: 1300, // 增加最小滚动宽度以适应所有列
            y: 600   // 添加垂直滚动高度
          }}
          tableLayout="fixed" // 固定表格布局，确保列宽度稳定
        />
      </>
    );

    if (embedded) {
      return (
        <div>
          {tableContent}
        </div>
      );
    }

    return (
      <Card title="评估指标管理">
        {tableContent}
      </Card>
    );
  }
);

EvaluationMetrics.displayName = 'EvaluationMetrics';

export default EvaluationMetrics;
