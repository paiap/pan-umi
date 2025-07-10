import React, { useState, useEffect } from 'react';
import { Table, Pagination, Input, Button, Space, Form, Switch, Radio } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchMirrorPage } from '../../service';
import './index.css';

// 定义镜像数据类型
interface ImageItem {
  id: string;
  alias: string;
  tags: string[];
  mirrorUrl: string;
  source: string;
  cudaVersion: string;
  pythonVersion: string;
  framework: string;
  usage: string;
  tpcCodeList?: string[]; // 算法组镜像特有的字段
}

interface ImageTableProps {
  imageType: 'all' | 'official' | 'algorithm' | 'private';
  onAddImage: () => void;
  onEditImage: (record: ImageItem) => void;
  onRowClick?: (record: ImageItem) => void; // 新增行点击回调
  initialSearchAlias?: string; // 初始搜索别名
  selectedImageAddress?: string; // 已选中的镜像地址
  isSelectionMode?: boolean; // 是否处于选择模式，控制是否显示选中列
  onMoveToAlgorithmGroup?: (record: any) => void; // 移入算法组回调
}

const ImageTable: React.FC<ImageTableProps> = ({ imageType, onAddImage, onEditImage, onRowClick, initialSearchAlias, selectedImageAddress, isSelectionMode, onMoveToAlgorithmGroup }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ImageItem[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formParams, setFormParams] = useState<any>({}); // 表单参数
  const [filterParams, setFilterParams] = useState<any>({}); // 表头筛选参数
  const [columnFilters, setColumnFilters] = useState<any>({}); // 受控表头筛选

  useEffect(() => {
    // 移除 internalSelectedRowKeys 的逻辑，因为现在是单选 Radio
    // 选中状态直接由 selectedImageAddress 控制
  }, [selectedImageAddress, dataSource]);

  /**
   * 拉取镜像数据（真实接口）
   * @param page 当前页码
   * @param size 每页大小
   * @param searchValues 搜索参数
   */
  const fetchData = async (page: number, size: number, searchValues: any) => {
    setLoading(true);
    // type参数映射
    let type: number | undefined = undefined;
    if (imageType === 'official') type = 1;
    if (imageType === 'algorithm') type = 2;
    if (imageType === 'private') type = 3;
    // 组装参数
    const params: any = {
      page,
      pageSize: size,
      ...(type ? { type } : {}),
      ...searchValues,
    };
    try {
      const res = await fetchMirrorPage(params);
      setDataSource(res?.data?.data || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      setDataSource([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 初始加载或 imageType/initialSearchAlias 变化时，重置页码和参数
    const values = form.getFieldsValue();
    let params = { ...values };
    if (initialSearchAlias) {
      form.setFieldsValue({ alias: initialSearchAlias });
      params = { ...params, alias: initialSearchAlias };
    }
    setFormParams(params);
    setFilterParams({});
    setCurrentPage(1);
  }, [imageType, initialSearchAlias]);

  useEffect(() => {
    // 合并参数，优先 filterParams（表头筛选）覆盖 formParams（表单）
    const mergedParams = { ...formParams, ...filterParams };
    fetchData(currentPage, pageSize, mergedParams);
  }, [currentPage, pageSize, formParams, filterParams]);

  const onPageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const onFinish = (values: any) => {
    setFormParams(values);
    setCurrentPage(1);
  };

  const onReset = () => {
    form.resetFields();
    setFormParams({});
    setFilterParams({});
    setColumnFilters({});
    setCurrentPage(1);
  };

  // 处理表头筛选变化
  const handleTableChange: TableProps<any>["onChange"] = (_pagination, filters) => {
    // 只要 filters 变化就重置页码为1
    const cleanFilters: any = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        cleanFilters[key] = Array.isArray(filters[key]) ? filters[key][0] : filters[key];
      }
    });
    setFilterParams(cleanFilters);
    setColumnFilters(filters);
    setCurrentPage(1);
  };

  const getColumnSearchProps = (dataIndex: any, placeholder: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`搜索${placeholder}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => {
            confirm();
            // 这里不再直接调用 handleSearch，而是通过 Form 的 onFinish 统一处理
            // handleSearch(selectedKeys[0], dataIndex);
          }}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
              // handleSearch(selectedKeys[0], dataIndex);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button onClick={() => {
            clearFilters();
            // handleSearch('', dataIndex);
          }} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  const columns: TableProps<ImageItem>['columns'] = [
    ...(isSelectionMode ? [
      {
        title: '选择',
        key: 'selection',
        width: 60,
        render: (_: any, record: ImageItem) => (
          <Radio
            checked={selectedImageAddress === record.mirrorUrl}
            onChange={() => onRowClick?.(record)}
          />
        ),
      },
    ] : []),
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      filteredValue: columnFilters.id || null,
    },
    {
      title: '镜像别名',
      dataIndex: 'mirrorAlias',
      key: 'mirrorAlias',
      width: 180,
      render: (text: string) => <a href="#">{text}</a>,
      ellipsis: true,
      // ...getColumnSearchProps('mirrorProjectName', '镜像别名'),
      // filteredValue: columnFilters.alias || null,
    },
    {
      title: '镜像标签',
      dataIndex: 'tags',
      key: 'tags',
      width: 250,
      render: (_: any, record: any) => (
        <Space wrap>
          {[...(record?.sceneLabels || []), ...(record?.fieldLabels || [])].map(tag => (
            <Button key={tag} size="small" style={{ marginRight: 8 }}>
              {tag}
            </Button>
          ))}
        </Space>
      ),
      ellipsis: true,
      // ...getColumnSearchProps('tags', '镜像标签'),
      // filteredValue: columnFilters.tags || null,
    },
    {
      title: '镜像地址',
      dataIndex: 'mirrorUrl',
      key: 'mirrorUrl',
      width: 300,
      ellipsis: true,
      filteredValue: columnFilters.mirrorUrl || null,
    },
    {
      title: '镜像来源',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      ellipsis: true,
      // ...getColumnSearchProps('source', '镜像来源'),
      filteredValue: columnFilters.source || null,
      render: (text: number) => {
        const sourceMap = {
          0: '内部镜像',
          1: '开源镜像',
          2: 'DSW保存镜像',
          3: 'CI构建镜像'
        };
        return sourceMap[text as keyof typeof sourceMap] || '-';
      },
      // 添加表头options筛选
      filters: [
        { text: '内部镜像', value: 0 },
        { text: '开源镜像', value: 1 },
        { text: 'DSW保存镜像', value: 2 },
        { text: 'CI构建镜像', value: 3 }
      ],

    },
    {
      title: 'CUDA版本',
      dataIndex: 'cudaVersion',
      key: 'cudaVersion',
      width: 100,
      ellipsis: true,
      filteredValue: columnFilters.cudaVersion || null,
    },
    {
      title: 'Python',
      dataIndex: 'pythonVersion',
      key: 'pythonVersion',
      width: 100,
      ellipsis: true,
      filteredValue: columnFilters.pythonVersion || null,
    },
    {
      title: '框架',
      dataIndex: 'framework',
      key: 'framework',
      width: 120,
      ellipsis: true,
      filteredValue: columnFilters.framework || null,
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: isSelectionMode ? 80 : 300, // 根据是否是选择模式调整宽度
      render: (_, record) => (
        <Space size="middle">
          <a>详情</a>
          {!isSelectionMode && (
            <>
              <a onClick={() => onEditImage(record)}>编辑</a>
              <a>同步历史</a>
              <a>删除</a>
              {(imageType === 'official' || imageType === 'private') && onMoveToAlgorithmGroup && (
                <a onClick={() => onMoveToAlgorithmGroup(record)}>移入算法组</a>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];

  // 算法组镜像特有的列
  if (imageType === 'algorithm') {
    columns.splice(4, 0, {
      title: '所属算法组',
      dataIndex: 'tpcCodeList',
      key: 'tpcCodeList',
      width: 150,
      render: (groups: string[]) => groups ? groups.join(', ') : '-',
      ...getColumnSearchProps('tpcCodeList', '所属算法组'),
      filteredValue: columnFilters.tpcCodeList || null,
    });
  }

  return (
    <>
      <Form
        form={form}
        name="image_search"
        layout="inline"
        onFinish={onFinish}
        // initialValues={{ creator: false }}
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="mirrorWarehouseId" label="镜像仓库">
          <Input placeholder="请选择镜像仓库" style={{ width: '200px' }}/>
        </Form.Item>
        <Form.Item name="name" label="镜像搜索">
          <Input placeholder="支持模糊搜索镜像别名和镜像地址" style={{ width: '250px' }} />
        </Form.Item>
        {/* <Form.Item name="alias" label="镜像别名">
          <Input placeholder="请输入镜像别名" />
        </Form.Item> */}
        {imageType === 'algorithm' ? (
          <Form.Item name="tpcCode" label="所属算法组">
            <Input placeholder="请输入所属算法组" />
          </Form.Item>
        ) : null}
        {/* <Form.Item name="source" label="镜像来源">
            <Input placeholder="请输入镜像来源" />
          </Form.Item> */}
        <Form.Item name="creator" label="我的创建" valuePropName="checked">
          <Switch onChange={checked => {
            form.setFieldsValue({ creator: checked });
            setFormParams({ ...form.getFieldsValue(), creator: checked });
            setCurrentPage(1);
          }} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
        {/* 选择模式下不显示新增镜像按钮 */}
        {!isSelectionMode && (
          <Form.Item style={{ marginLeft: 'auto' }}>
            <Button type="primary" onClick={onAddImage}>+ 新增镜像</Button>
          </Form.Item>
        )}
      </Form>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loading}
        rowKey="id"
        scroll={{
          x: 1500
        }}
        onChange={handleTableChange}
        // 移除 rowSelection 属性，因为现在使用单独的 Radio 列进行选择
        onRow={(record) => {
          return {
            onClick: () => {
              // 如果是选择模式，点击行时触发 Radio 的选中
              if (isSelectionMode && onRowClick) {
                onRowClick(record);
              }
            },
            className:
              isSelectionMode && selectedImageAddress === record.mirrorUrl
                ? 'pan-image-table-row-selected'
                : '',
          };
        }}
      />
      <Pagination
        showQuickJumper
        showSizeChanger
        total={total}
        showTotal={(total) => `共 ${total} 条数据`}
        pageSizeOptions={['10', '20', '50', '100']}
        defaultPageSize={10}
        current={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
        style={{
          marginTop: 16,
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      />
    </>
  )
}

export default ImageTable;