/*
 * @creater: panan
 * @message: StorageComponent-共享存储
 * @since: 2025-05-13 10:49:51
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-13 21:04:32
 * @文件相对于项目的路径: /pan-umi/src/pages/StorageComponent/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Alert, Typography, Flex, Form, Pagination, Spin, Space } from 'antd';
import styles from './index.less';
import CardList from './component/CardList';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

const { Text } = Typography;
const { Option } = Select;

const mockData = [
  {
    "id": 183,
    "createTime": "2025-04-16 16:56:26",
    "updateTime": "2025-04-16 16:56:26",
    "name": "ftp-test",
    "tenantId": 160,
    "proCode": "793",
    "mountPath": "/mnt/data/ftptest",
    "storagePathId": 61952,
    "clusterCode": "ucwlcc",
    "quota": 1073741824,
    "description": "ftp-测试",
    "creator": "liukejie@myhexin.com",
    "tenantName": "devinfra",
    "proName": "代码生成",
    "storageId": 19,
    "filepath": "/sharestorage/devinfra/ftptest",
    "quotaShow": "1 GB",
    "usedShow": null,
    "creatorName": "刘科杰",
    //----------------  以上都是原先得数据 ----------------
    "usedSize": 100000, //对应上边进度条得全部，减去下边三个为 其他
    "datasetSize": 20000, // 数据目录
    "teamWorkSpaceSize": 30000, //团队
    "userWorkSpaceSize": 40000 //个人
  }
]

const totalStorage = '243个共享存储，3462TB';

// 定义搜索表单字段接口
interface SearchFormValues {
  name?: string;
  proCode?: string;
  creator?: string;
  clusterCode?: string;
}

// 定义分页参数接口
interface PaginationParams {
  page: number;
  pageSize: number;
}

const StorageComponent: React.FC = () => {
  // 表单实例
  const [form] = useForm();

  // 状态管理
  const [storageList, setStorageList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 10
  });
  const [total, setTotal] = useState<number>(0);

  // 获取数据的方法
  const fetchStorageList = async (params: SearchFormValues & PaginationParams) => {
    setLoading(true);

    console.log(params, '>>>')
    try {
      // 这里应该是实际的API调用
      // const response = await fetchAPI(params);
      // setStorageList(response.data);
      // setTotal(response.total);

      // 模拟API调用
      setTimeout(() => {
        setStorageList(mockData);
        setTotal(243); // 模拟总数
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('获取存储列表失败:', error);
      setLoading(false);
    }
  };

  // 处理表单提交
  const handleSearch = () => {
    const values = form.getFieldsValue();
    setPagination({
      ...pagination,
      page: 1 // 搜索时重置为第一页
    });
    fetchStorageList({
      ...values,
      page: 1,
      pageSize: pagination.pageSize
    });
  };

  // 处理分页变化
  const handlePageChange = (page: number, pageSize?: number) => {
    const newPagination = {
      page,
      pageSize: pageSize || pagination.pageSize
    };
    setPagination(newPagination);
    fetchStorageList({
      ...form.getFieldsValue(),
      ...newPagination
    });
  };

  // 初始化加载数据
  useEffect(() => {
    fetchStorageList({
      page: pagination.page,
      pageSize: pagination.pageSize
    });
  }, [])

  return (
    <div className={styles.storageContainer}>
      {/* 功能说明 */}
      <Alert
        message="功能说明：xxxxxxxxxxxxxxxxxxxxxxx"
        type="info"
        showIcon
        closable
        className={styles.alertInfo}
      />

      {/* 搜索筛选区域 */}
      <div className={styles.searchArea}>
        <Form form={form} layout="horizontal">
          <Space>
            <Form.Item name="name" label="名称：">
              <Input placeholder="关键词搜索" style={{ width: '250px' }} />
            </Form.Item>
            <Form.Item name="proCode" label="算法组：" >
              <Select placeholder="选择算法组" style={{ width: '250px' }}>
                <Option value="option1">选项1</Option>
                <Option value="option2">选项2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="creator" label="创建人：" >
              <Input placeholder="关键词搜索" style={{ width: '250px' }} />
            </Form.Item>
            <Form.Item name="clusterCode" label="共享存储集群：" >
              <Select placeholder="选择" style={{ width: '250px' }}>
                <Option value="option1">选项1</Option>
                <Option value="option2">选项2</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleSearch} style={{ marginRight: '8px' }}>
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="default" onClick={() => {
                form.resetFields();
              }} style={{ marginRight: '8px' }}>
                重置
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon={<PlusOutlined />}>
                新建共享群组
              </Button>
            </Form.Item>

          </Space>


        </Form>
      </div>

      {/* 存储总量显示 */}
      <div className={styles.totalInfo}>
        <Text>{totalStorage}</Text>
      </div>

      {/* 卡片列表 */}
      <Spin spinning={loading} tip="加载中...">
        <Flex wrap="wrap" gap="16px" className={styles.cardList}>
          {storageList.map((item) => (
            <CardList key={item.id} item={item} />
          ))}
        </Flex>

        {/* 分页组件 */}
        <div className={styles.paginationContainer}>
          <Pagination
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={total}
            onChange={handlePageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条记录`}
          />
        </div>
      </Spin>
    </div>
  );
};

export default StorageComponent;
