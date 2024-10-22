/*
 * @creater: panan
 * @message: 数据挖掘
 * @since: 2024-10-22 13:44:21
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-22 15:07:24
 * @文件相对于项目的路径: /pan-umi/src/pages/Dataminer/index.tsx
 */

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Button, Radio, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { GithubIssueItem, initColumns } from './columns';
import AddTask from './AddTask';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const Dataminer = () => {
  const [type, setType] = useState<string>('sft')
  const [columns, setColumns] = useState<any[]>(initColumns)
  const [total, setTotal] = useState<number>(0)
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    const curColumns = initColumns.map((item) => {
      if (item.key === 'option') {
        item.render = (text: any, record: any) => [
          <a key='copy' onClick={() => {
            console.log(
              record
            )
          }}>复制</a>,
          <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
            查看
          </a>,
        ]
      }
      return item
    })
    setColumns(curColumns)
  }, [])


  const fetchData = async (params: any, sort: any, filter: any) => {
    console.log(params, sort, filter);
    const result = await request('https://proapi.azurewebsites.net/github/issues', {
      params,
    });

    console.log(result);
    const { data, total } = result;
    setTotal(total)
    return {
      data: data || [],
      success: true,
    };
  }

  return (
    <>
      <Space style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '17px', fontWeight: 700 }}>类型</div>
        <Radio.Group value={type} onChange={(e) => setType(e.target.value)}>
          <Radio.Button value="sft">SFT</Radio.Button>
          <Radio.Button value="rlhf" disabled>RLHF</Radio.Button>
        </Radio.Group>
      </Space>
      <ProTable<GithubIssueItem>
        headerTitle={
          <div>共计<span style={{ margin: '0 5px', color: 'red' }}>{total}</span>条数据</div>
        }
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          return fetchData(params, sort, filter)
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        // search={{
        //   labelWidth: 'auto',
        // }}
        options={{
          setting: {
            listsHeight: 300,
          },
        }}

        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddTask key="addTask" />,
        ]}
      />
    </>
  );
};

export default Dataminer