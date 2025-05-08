/*
 * @creater: panan
 * @message: columns.tsx
 * @since: 2025-04-22 21:46:00
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 11:36:13
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/experimentalGroupTable/experimentalNumberDetail/columns.tsx
 */
import React from "react";
import { Tag } from "antd";
import dayjs from "dayjs";

export const initColumns = [
  // 序号 任务名称 任务描述 任务状态 任务标签 训练数据集 评估状态 发布状态 创建人 创建时间
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    width: 60,
    ellipsis: true,
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
    width: 100,
    ellipsis: true,
  },
  {
    title: '任务描述',
    dataIndex: 'description',
    key: 'description',
    width: 150,
    ellipsis: true,
  },
  {
    title: '任务状态',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    ellipsis: true,
    // 1 等待运行 2 运行中 3 运行成功 4 运行失败
    render: (text: number) => {
      switch (text) {
        case 1:
          return <Tag>等待运行</Tag>;
        case 2:
          return <Tag color='cyan'>运行中</Tag>;
        case 3:
          return <Tag color='green'>成功</Tag>;
        case 4:
          return <Tag color='red'>失败</Tag>;
        default:
          return '-';
      }
    },
    width: 100,
  },
  {
    title: '任务标签【】',
    dataIndex: 'tag',
    key: 'tag',
    width: 100,
    ellipsis: true,
  },
  {
    title: '训练数据集【】',
    dataIndex: 'dataset',
    key: 'dataset',
    width: 100,
    ellipsis: true,
  },
  {
    title: '评估状态【】',
    dataIndex: 'evaluationStatus',
    key: 'evaluationStatus',
    width: 100,
    ellipsis: true,
  },
  {
    title: '发布状态【】',
    dataIndex: 'releaseStatus',
    key: 'releaseStatus',
    width: 100,
    ellipsis: true,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    width: 100,
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
    ellipsis: true,
  }
]

export const mockData = [
  {
    key: '1',
    taskName: '任务1',
    description: '任务1描述',
    taskStatus: 1,
    tag: '标签1',
    dataset: '数据集1',
    evaluationStatus: '评估状态1',
    releaseStatus: '发布状态1',
    creator: '创建人1',
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    key: '2',
    taskName: '任务2',
    description: '任务2描述',
    taskStatus: 2,
    tag: '标签2',
    dataset: '数据集2',
    evaluationStatus: '评估状态2',
    releaseStatus: '发布状态2',
    creator: '创建人2',
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    key: '3',
    taskName: '任务3',
    description: '任务3描述',
    taskStatus: 3,
    tag: '标签3',
    dataset: '数据集3',
    evaluationStatus: '评估状态3',
    releaseStatus: '发布状态3',
    creator: '创建人3',
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }
]