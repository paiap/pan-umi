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
    dataIndex: 'key',
    key: 'key',
    width: 60,
    ellipsis: true,
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
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
    title: '评估主体',
    dataIndex: 'evaluationBody',
    key: 'evaluationBody',
    width: 120,
    ellipsis: true,
  },
  {
    title: '比对对象',
    dataIndex: 'comparisonTarget',
    key: 'comparisonTarget',
    width: 120,
    ellipsis: true,
  },
  {
    title: '测试集',
    dataIndex: 'testSet',
    key: 'testSet',
    width: 150,
    ellipsis: true,
  },
  {
    title: '评估流程',
    dataIndex: 'evaluationProcess',
    key: 'evaluationProcess',
    width: 120,
    ellipsis: true,
  },
  {
    title: '评估结果',
    dataIndex: 'evaluationResult',
    key: 'evaluationResult',
    width: 120,
    ellipsis: true,
  },
  {
    title: '成功状态',
    dataIndex: 'successStatus',
    key: 'successStatus',
    render: (text: any) => {
      if (text === '已完成') {
        return <Tag color='green'>已完成</Tag>;
      } else if (text === '进行中') {
        return <Tag color='cyan'>进行中</Tag>;
      } else if (text === '失败') {
        return <Tag color='red'>失败</Tag>;
      } else {
        return <Tag>等待中</Tag>;
      }
    },
    width: 100,
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
