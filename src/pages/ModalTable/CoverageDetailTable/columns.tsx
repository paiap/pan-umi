/*
 * @creater: panan
 * @message:
 * @since: 2025-05-08 14:26:09
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-05-08 16:25:17
 * @文件相对于项目的路径: /pan-umi/src/pages/ModalTable/CoverageDetailTable/columns.tsx
 */
export const initColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 50,
    fixed: 'left',
    // onCell: (record: any) => {
    //   return {
    //     rowSpan: record.rowSpan?.index || 0,
    //   }
    // },
  },
  {
    title: '模型名称',
    dataIndex: 'modelFolderName',
    key: 'modelFolderName',
    width: 200,
    ellipsis: true,
    onCell: (record: any) => {
      return {
        rowSpan: record.rowSpan?.modelFolderName || 0,
      }
    },
  },
  {
    title: '评估覆盖率',
    dataIndex: 'coverageRate',
    key: 'coverageRate',
    width: 100,
    ellipsis: true,
    onCell: (record: any) => {
      return {
        rowSpan: record.rowSpan?.coverageRate || 0,
      }
    },
  },
  {
    title: '模型版本',
    dataIndex: 'modelVersion',
    key: 'modelVersion',
    width: 100,
    ellipsis: true,
  },
  {
    title: '模型评估状态',
    dataIndex: 'isEvaluation',
    key: 'isEvaluation',
    width: 120,
    ellipsis: true,
    // boolean，是否已评估
    render: (text: string, record: any) => {
      return record.isEvaluation ? '已评估' : '未评估'
    },
  },
  {
    title: '最近评估时间',
    dataIndex: 'beginTime',
    key: 'beginTime',
    width: 150,
    ellipsis: true,
  },
  {
    title: '最近评估任务',
    dataIndex: 'taskName',
    key: 'taskName',
    width: 200,
    ellipsis: true,
  },
  {
    title: '最近评估结果',
    dataIndex: 'evaluationResults',
    key: 'evaluationResults',
    width: 150,
    ellipsis: true,
  },
  {
    title: '评估人',
    dataIndex: 'user',
    key: 'user',
    width: 200,
    ellipsis: true,
  }
];

// 模拟数据 - 嵌套结构原始数据
export const rawData = [
  {
    modelFolderName: 'AIME-大模型-NLU-PARSER-标准sql',
    coverageRate: '50%',
    tasks: [
      {
        modelVersion: 'v261',
        isEvaluation: true,
        beginTime: '2025/3/25 20:36:04',
        taskName: 'sft 续写prompt为mschema格式',
        evaluationResults: [],
        user: 'chenkangming@myheixin.com'
      },
      {
        modelVersion: 'v260',
        isEvaluation: false,
        beginTime: '--',
        taskName: '--',
        evaluationResults: [],
        user: '--'
      }
    ]
  },
  {
    modelFolderName: 'AIME-大模型-NLU-PARSER-标准sql',
    coverageRate: '50%',
    tasks: [
      {
        modelVersion: 'v261',
        isEvaluation: true,
        beginTime: '2025/3/25 20:36:04',
        taskName: 'sft 续写prompt为mschema格式',
        evaluationResults: [],
        user: 'chenkangming@myheixin.com'
      },
      {
        modelVersion: 'v260',
        isEvaluation: false,
        beginTime: '--',
        taskName: '--',
        evaluationResults: [],
        user: '--'
      }
    ]
  },
];

/**
 * 将嵌套数据结构转换为扁平结构，同时保留单元格合并信息
 * @param data 嵌套结构的原始数据
 * @returns 扁平化的数据，包含rowSpan信息
 */
export const transformData = (data: any[]) => {
  const flatData: any[] = [];
  data.forEach((parentItem) => {
    const childrenCount = parentItem.tasks?.length || 0;

    if (childrenCount === 0) {
      // 如果没有子项，直接添加父项
      flatData.push({
        ...parentItem,
        rowSpan: {
          // index: 1,
          modelFolderName: 1,
          coverageRate: 1
        }
      });
    } else {
      // 有子项，展开子项并设置第一个子项的rowSpan
      parentItem.tasks.forEach((childItem: any, index: number) => {
        const newItem = {
          ...childItem,
          // index: parentItem.index,
          modelFolderName: parentItem.modelFolderName,
          coverageRate: parentItem.coverageRate,
          rowSpan: {
            // index: index === 0 ? childrenCount : 0,
            modelFolderName: index === 0 ? childrenCount : 0,
            coverageRate: index === 0 ? childrenCount : 0
          }
        };
        flatData.push(newItem);
      });
    }
  });

  return flatData;
};

// 转换后的扁平数据，用于表格展示
export const initData = transformData(rawData);