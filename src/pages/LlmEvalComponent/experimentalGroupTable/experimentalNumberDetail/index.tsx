/*
 * @creater: panan
 * @message: 
 * @since: 2025-04-22 21:30:43
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 11:44:00
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/experimentalGroupTable/experimentalNumberDetail/index.tsx
 */
import React, { useEffect, useState } from 'react';
import { Modal, Pagination, Space, Table } from 'antd';
import { initColumns, mockData } from './columns';

interface Props {
  text: string;
  record: {
    id: string;
    // 其他record字段
  };
}
const initPagination = {
  pageNum: 1,
  pageSize: 10,
  total: 0,
}
const ExperimentalNumberDetail: React.FC<Props> = ({ text, record }) => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<any[]>([])
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
    total: number;
    [key: string]: any;
  }>(initPagination);

  useEffect(() => {
    setColumns(initColumns)
    setDataSource(mockData)
  }, [])

  const fetchData = async () => {
    setLoading(true);
    try {
      // 这里调用实际接口，使用record.id作为参数
      // const response = await api.fetchData(record.id);
      // setDataSource(response.data);

      // 暂时使用mock数据
      setDataSource(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.pageNum, pagination.pageSize]);

  const handleClick = () => {
    setVisible(true);
    fetchData();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <a onClick={handleClick}>{text}</a>
      <Modal
        title="实验列表"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={1200}
      >
        <Space direction="vertical">
          <Table
          style={{ width: '100%' }}
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
            // scroll={{ x: true }}
          />
          <Pagination
            style={{ textAlign: 'right', width: '100%', display: 'block' }}
            current={pagination.pageNum}
            pageSize={pagination.pageSize}
            total={pagination.total}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条`}
            onChange={(page, pageSize) => {
              setPagination({
                ...pagination,
                pageNum: page,
                pageSize,
              });
            }}
          />
        </Space>
      </Modal>
    </>
  );
};

export default ExperimentalNumberDetail;


