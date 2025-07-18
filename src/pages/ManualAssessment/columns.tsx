/*
 * @creater: panan
 * @message: 
 * @since: 2025-07-09 15:07:55
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-09 15:13:59
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/columns.tsx
 */
import React from "react";
import { Tag } from "antd";

export const initColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 60,
    ellipsis: true,
  },
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    ellipsis: true,
  },
  {
    title: '任务类型',
    dataIndex: 'taskType',
    key: 'taskType',
    width: 120,
    ellipsis: true,
  },
  {
    title: '任务类型描述',
    dataIndex: 'taskTypeDesc',
    key: 'taskTypeDesc',
    width: 140,
    ellipsis: true,
  },
  {
    title: '模型A',
    dataIndex: 'modelA',
    key: 'modelA',
    width: 120,
    ellipsis: true,
  },
  {
    title: '模型B',
    dataIndex: 'modelB',
    key: 'modelB',
    width: 120,
    ellipsis: true,
    render: (text: string) => text || '-',
  },
  {
    title: '评估进度',
    dataIndex: 'progressPercent',
    key: 'progressPercent',
    width: 120,
    ellipsis: true,
    render: (text: number, record: any) => `${record.completedItems}/${record.totalItems} (${text}%)`,
  },
  {
    title: '任务状态',
    dataIndex: 'statusDesc',
    key: 'status',
    render: (text: any, record: any) => {
      if (record.status === 'completed') {
        return <Tag color='green'>{text}</Tag>;
      } else if (record.status === 'running') {
        return <Tag color='cyan'>{text}</Tag>;
      } else if (record.status === 'failed') {
        return <Tag color='red'>{text}</Tag>;
      } else {
        return <Tag>{text}</Tag>;
      }
    },
    width: 100,
  },
  {
    title: '创建人',
    dataIndex: 'createByName',
    key: 'createByName',
    width: 100,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    width: 180,
    fixed: 'right',
    ellipsis: true,
  }
];
