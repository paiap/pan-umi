/*
 * @creater: panan
 * @message: columns
 * @since: 2024-10-22 13:46:14
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-22 14:39:31
 * @文件相对于项目的路径: /pan-umi/src/pages/Dataminer/columns.tsx
 */

import { ProColumns } from "@ant-design/pro-components";

export type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export const initColumns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '任务名称',
    dataIndex: 'title',
    key: 'title',
    copyable: true,
    ellipsis: true,
    width: 160,
    // tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '任务类型',
    dataIndex: 'type',
    key: 'type',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '任务状态',
    dataIndex: 'state',
    // filters: true,
    // onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '关联数据集',
    dataIndex: 'dataset',
    key: 'dataset',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '任务描述',
    dataIndex: 'description',
    key: 'description',
    copyable: true,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '原始数据量',
    dataIndex: 'initDataNumber',
    key: 'initDataNumber',
    copyable: true,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '采样数据量',
    key: 'sampleDataNumber',
    dataIndex: 'sampleDataNumber',
    copyable: true,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建人',
    key: 'creator',
    dataIndex: 'creator',
    hideInSearch: true,
  },
  {
    title: '操作时间',
    key: 'actionTime',
    dataIndex: 'actionTime',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作人',
    key: 'actionCreator',
    dataIndex: 'actionCreator',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    dataIndex: 'option'
  },
];