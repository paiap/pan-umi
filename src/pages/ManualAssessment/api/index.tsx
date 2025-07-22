/*
 * @creater: panan
 * @message: ManualAssessment API 接口
 * @since: 2025-07-10 12:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-17 16:19:52
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/api/index.tsx
 */

import { request } from 'umi';
import { shouldUseMock, getApiBaseUrl } from '../../../config/env';
import { ApiDebugger } from '../../../utils/apiDebug';
// 导入 mock 数据
import {
  getTrainingTasksResponse,
  getTrainingTaskDetailResponse,
  getWorkloadOptionsResponse,
  createEvaluationTaskResponse,
  createTaskValidationErrorResponse
} from './mock';

// 新增多版本对比评估接口类型定义
export interface VersionComparisonData {
  id: string;
  name: string;
  description?: string;
  progress: number;
  totalLineCount?: number;
  completedLineCount?: number;
  dimensions: DimensionData[];
}

export interface DimensionData {
  name: string;
  averageScore: number;
  versions: VersionStats[];
}

export interface VersionStats {
  version: string;
  winCount: number;
  loseCount: number;
  tieCount: number;
  totalCount: number;
  winRate: number;
  loseRate: number;
  tieRate: number;
}

export interface DetailTableItem {
  id: string;
  modelA: string;
  modelB: string;
  comparisonStatus: '已对比' | '未对比';
  query: string;
  result: string;
  // 支持动态字段，用于存储不同版本的数据
  [key: string]: any;
}

export interface SearchParams {
  comparisonType: 'all' | 'compared' | 'uncomp ared';
  dimension?: string;
  keyword?: string;
}

// 分页内容列表相关类型定义
export interface ContentListItem {
  id: string;
  query: string;                    // 对应原来的prompt
  primaryTargetAnswer: string;      // 对应原来的expectedResult
  comparisonTargetAnswer: string;   // 对应原来的modelAnswer
  status: 'NOT_COMPARE' | 'COMPARED'; // 新增状态字段
  evaluationStatus: 'PENDING' | 'COMPLETED';
  scores: {
    truthfulness: number;
    usability: number;
    consistency: number;
  } | null;
  evaluationComment: {
    text: string;
    screenshots: string[];
  } | null;
  comment: {
    text: string;
    images: string[];
  } | null;
  primaryTargetScore: Array<{
    metricId: string;
    metricName: string;
    metricDescription: string;
    metricScore: number;
    compareResult: 'win' | 'lose' | 'draw';
    createTime: string;
  }>;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ContentListResponse {
  total: number;
  pageNum: number;
  pageSize: number;
  pages: number;
  list: ContentListItem[];
}

// 模拟详情表格数据 - 扩展更多数据以测试分页
const mockDetailTableData: DetailTableItem[] = Array.from({ length: 25 }, (_, index) => ({
  id: `${index + 1}`,
  V260: `["代理公司及子公司未发票的车牌车辆及其有限公司国运...${index + 1}`,
  V261: `{"result": "James originally had 40 cards. After losing 8, he has 40 - 8 = 32 cards. So the answer is ${32 + index}."}`,
  V262: `{"analysis": "根据题目分析，James原有40张卡，失去8张后剩余${32 + index}张，因此答案是${32 + index}张卡片。", "confidence": ${85 + (index % 15)}}`,
  modelA: index % 3 === 0 ? 'V260 > V261' : index % 3 === 1 ? 'V260 < V261' : 'V260 = V261',
  modelB: index % 2 === 0 ? 'V260 = V261' : 'V260 > V261',
  comparisonStatus: index % 3 === 0 ? '已对比' : '未对比',
  query: `你是一名投资领域的研究员，请撰写一批正式的不少于800字以下不少于3种回答评估结果...${index + 1}`,
  result: '评价详情',
}));

// 模拟接口数据
const mockAssessmentData = {
  taskId: 1,
  name: '大语言模型评估任务 - V1.0',
  description: '手动评估任务类型描述',
  totalLineCount: 100,
  completedLineCount: 45,
  statisticsList: [
    // 兼容性数据 - 英文维度名（用于单个评估详情页）
    {
      targetId: 1,
      targetType: 1, // MODEL_VERSION
      targetRole: 'PRIMARY',
      targetName: '主要模型版本',
      metricId: 1, // 添加 metricId
      metricScore: 4.2,
      metricName: 'truthfulness',
      metricDescription: '真实性评估指标',
      winCount: 25,
      loseCount: 15,
      drawCount: 5
    },
    {
      targetId: 1,
      targetType: 1,
      targetRole: 'PRIMARY',
      targetName: '主要模型版本',
      metricId: 2, // 添加 metricId
      metricScore: 3.8,
      metricName: 'usability',
      metricDescription: '可用性评估指标',
      winCount: 20,
      loseCount: 18,
      drawCount: 7
    },
    {
      targetId: 1,
      targetType: 1,
      targetRole: 'PRIMARY',
      targetName: '主要模型版本',
      metricId: 3, // 添加 metricId
      metricScore: 4.0,
      metricName: 'consistency',
      metricDescription: '一致性评估指标',
      winCount: 28,
      loseCount: 12,
      drawCount: 5
    }
  ]
};

const mockContentData = {
  '1': {
    id: '1',
    prompt: '请解释什么是人工智能，并列举三个实际应用场景。',
    expectedResult: '人工智能是一种模拟人类智能的技术，包括学习、推理、感知等能力。三个应用场景：1. 智能语音助手（如Siri、小爱同学）2. 自动驾驶汽车 3. 医疗诊断系统',
    modelAnswer: '人工智能（AI）是一种让计算机系统能够执行通常需要人类智能的任务的技术。它包括机器学习、深度学习、自然语言处理等技术。三个实际应用场景：1. 智能客服系统 2. 图像识别技术 3. 推荐系统',
    scores: {
      truthfulness: 1, // 已有评分示例 (好)
      usability: 2, // 很好
      consistency: 0, // 中性
    },
    evaluationComment: {
      text: '模型回答基本准确，对人工智能的定义清晰，应用场景举例恰当。但与预期结果相比，具体应用场景有所不同，智能客服系统、图像识别技术、推荐系统都是很好的实例。整体回答质量较高，逻辑清晰。',
      screenshots: [
        {
          id: 'screenshot_1',
          name: '模型回答截图1.png',
          url: 'https://via.placeholder.com/800x600/4285f4/ffffff?text=AI+Definition+Screenshot',
          description: '人工智能定义部分的回答截图'
        },
        {
          id: 'screenshot_2',
          name: '应用场景对比截图.png',
          url: 'https://via.placeholder.com/800x600/34a853/ffffff?text=AI+Applications+Comparison',
          description: '预期结果与模型回答的应用场景对比截图'
        }
      ]
    },
    previousId: null,
    nextId: '2',
  },
  '2': {
    id: '2',
    prompt: '解释机器学习中的监督学习和无监督学习的区别。',
    expectedResult: '监督学习使用标注数据进行训练，有明确的输入输出关系；无监督学习不使用标注数据，主要发现数据中的模式和结构。',
    modelAnswer: '监督学习需要训练数据包含正确答案，通过学习输入输出的映射关系来预测新数据；无监督学习不需要标注数据，主要用于聚类、降维等任务。',
    scores: {
      truthfulness: 1,
      usability: 0,
      consistency: 2,
    },
    evaluationComment: {
      text: '模型对监督学习和无监督学习的区别解释清晰准确。监督学习的描述完整，强调了标注数据和输入输出映射关系；无监督学习的解释也很到位，提到了聚类和降维等具体应用。整体回答逻辑性强，术语使用准确。',
      screenshots: [
        {
          id: 'screenshot_3',
          name: '机器学习对比图.png',
          url: 'https://via.placeholder.com/800x600/ff6d01/ffffff?text=ML+Supervised+vs+Unsupervised',
          description: '监督学习与无监督学习对比示意图'
        }
      ]
    },
    previousId: '1',
    nextId: '3',
  },
  '3': {
    id: '3',
    prompt: '什么是深度学习？它与传统机器学习有什么区别？',
    expectedResult: '深度学习是机器学习的一个分支，使用多层神经网络来学习数据表示。与传统机器学习相比，深度学习能够自动学习特征，处理更复杂的数据。',
    modelAnswer: '深度学习是一种基于人工神经网络的机器学习方法，通过多层网络结构来学习数据的层次特征。相比传统机器学习，深度学习不需要手动设计特征，能够处理更复杂的任务。',
    scores: {
      truthfulness: -999, // 未评估状态，使用特殊值
      usability: -999,
      consistency: -999,
    },
    evaluationComment: {
      text: '', // 空的评估说明，供用户填写
      screenshots: []
    },
    previousId: '2',
    nextId: null,
  },
};

// 接口1：获取评估任务进度信息（支持多对比评估详情页使用）
export const getAssessmentInfo = async (taskId: string) => {
  // 实际接口路径：/api/manual/compare/task/v1/{taskId}/progress
  console.log('🔗 [API] getAssessmentInfo 请求参数:', { taskId });

  return new Promise((resolve) => {
    setTimeout(() => {
      // 按照接口格式的statisticsList数据
      const mockStatisticsList = [
        // 真实性维度 - 不同版本的统计数据
        {
          targetId: 1,
          targetType: 1, // MODEL_VERSION
          targetRole: 'PRIMARY',
          targetName: 'V260',
          metricId: 1, // 添加 metricId
          metricScore: 4.2,
          metricName: '真实性',
          metricDescription: '回答内容的准确性和真实性',
          winCount: 7,
          loseCount: 3,
          drawCount: 0
        },
        {
          targetId: 2,
          targetType: 1,
          targetRole: 'COMPARISON',
          targetName: 'V261',
          metricId: 1, // 添加 metricId
          metricScore: 4.1,
          metricName: '真实性',
          metricDescription: '回答内容的准确性和真实性',
          winCount: 8,
          loseCount: 2,
          drawCount: 0
        },
        {
          targetId: 3,
          targetType: 1,
          targetRole: 'COMPARISON',
          targetName: 'V262',
          metricId: 1, // 添加 metricId
          metricScore: 3.6,
          metricName: '真实性',
          metricDescription: '回答内容的准确性和真实性',
          winCount: 5,
          loseCount: 4,
          drawCount: 1
        },
        // 可用性维度 - 不同版本的统计数据
        {
          targetId: 1,
          targetType: 1,
          targetRole: 'PRIMARY',
          targetName: 'V260',
          metricId: 2, // 添加 metricId
          metricScore: 3.8,
          metricName: '可用性',
          metricDescription: '回答的实用性和可操作性',
          winCount: 6,
          loseCount: 4,
          drawCount: 0
        },
        {
          targetId: 2,
          targetType: 1,
          targetRole: 'COMPARISON',
          targetName: 'V261',
          metricId: 2, // 添加 metricId
          metricScore: 4.5,
          metricName: '可用性',
          metricDescription: '回答的实用性和可操作性',
          winCount: 9,
          loseCount: 1,
          drawCount: 0
        },
        {
          targetId: 3,
          targetType: 1,
          targetRole: 'COMPARISON',
          targetName: 'V262',
          metricId: 2, // 添加 metricId
          metricScore: 3.5,
          metricName: '可用性',
          metricDescription: '回答的实用性和可操作性',
          winCount: 4,
          loseCount: 5,
          drawCount: 1
        },
        // 一致性维度 - 不同版本的统计数据
        {
          targetId: 1,
          targetType: 1,
          targetRole: 'PRIMARY',
          targetName: 'V260',
          metricId: 3, // 添加 metricId
          metricScore: 4.0,
          metricName: '一致性',
          metricDescription: '回答的逻辑一致性',
          winCount: 6,
          loseCount: 3,
          drawCount: 1
        },
        {
          targetId: 2,
          targetType: 1,
          targetRole: 'COMPARISON',
          targetName: 'V261',
          metricId: 3, // 添加 metricId
          metricScore: 3.7,
          metricName: '一致性',
          metricDescription: '回答的逻辑一致性',
          winCount: 5,
          loseCount: 5,
          drawCount: 0
        },
        {
          targetId: 3,
          targetType: 1,
          targetRole: 'COMPARISON',
          targetName: 'V262',
          metricId: 3, // 添加 metricId
          metricScore: 4.3,
          metricName: '一致性',
          metricDescription: '回答的逻辑一致性',
          winCount: 9,
          loseCount: 1,
          drawCount: 0
        }
      ];

      const responseData = {
        code: 0,
        msg: 'Success',
        data: {
          taskId: parseInt(taskId),
          name: mockAssessmentData.name,
          description: mockAssessmentData.description,
          totalLineCount: mockAssessmentData.totalLineCount,
          completedLineCount: mockAssessmentData.completedLineCount,
          statisticsList: mockStatisticsList,

          // 为了兼容单个评估详情页面，计算并返回传统字段
          totalCount: mockAssessmentData.totalLineCount,
          evaluatedCount: mockAssessmentData.completedLineCount,
          unevaluatedCount: mockAssessmentData.totalLineCount - mockAssessmentData.completedLineCount,
          progress: Math.round((mockAssessmentData.completedLineCount / mockAssessmentData.totalLineCount) * 100),

          // 单个评估详情页面通过metricName匹配获取metricScore（取PRIMARY角色的分数）
          averageScores: {
            truthfulness: mockStatisticsList.find(item => item.metricName === '真实性' && item.targetRole === 'PRIMARY')?.metricScore ?? '-',
            usability: mockStatisticsList.find(item => item.metricName === '可用性' && item.targetRole === 'PRIMARY')?.metricScore ?? '-',
            consistency: mockStatisticsList.find(item => item.metricName === '一致性' && item.targetRole === 'PRIMARY')?.metricScore ?? '-',
          },

          firstContentId: '1', // 第一条内容的ID
        },
      };
      console.log('🔗 [API] getAssessmentInfo 响应数据:', responseData);
      resolve(responseData);
    }, 500);
  });
};

// 接口2：发布成绩
export const publishGrades = async (assessmentId: string, grades: any) => {
  console.log('🔗 [API] publishGrades 请求参数:', { assessmentId, grades });

  return new Promise((resolve) => {
    setTimeout(() => {
      const responseData = {
        code: 0,
        msg: '成绩发布成功',
        data: {},
      };
      console.log('🔗 [API] publishGrades 响应数据:', responseData);
      resolve(responseData);
    }, 800);
  });
};

// 接口3：获取内容详情
export const getContentDetail = async (contentId: string, type: 'all' | 'evaluated' | 'unevaluated' = 'all') => {
  console.log('🔗 [API] getContentDetail 请求参数:', { contentId, type });

  return new Promise((resolve) => {
    setTimeout(() => {
      const contentData = mockContentData[contentId as keyof typeof mockContentData];
      let responseData;
      if (contentData) {
        responseData = {
          code: 0,
          msg: 'Success',
          data: contentData,
        };
      } else {
        responseData = {
          code: 1,
          msg: '内容不存在',
          data: {},
        };
      }
      console.log('🔗 [API] getContentDetail 响应数据:', responseData);
      resolve(responseData);
    }, 300);
  });
};

// 接口4：提交评分
export const submitScores = async (contentId: string, scores: { truthfulness: number; usability: number; consistency: number }) => {
  console.log('🔗 [API] submitScores 请求参数:', { contentId, scores });

  return new Promise((resolve) => {
    setTimeout(() => {
      // 更新模拟数据
      if (mockContentData[contentId as keyof typeof mockContentData]) {
        mockContentData[contentId as keyof typeof mockContentData].scores = scores;

        // 更新总体统计信息
        mockAssessmentData.completedLineCount += 1;

        // 重新计算平均分并更新statisticsList
        const allScores = Object.values(mockContentData).filter(item =>
          item.scores.truthfulness > -999 && item.scores.usability > -999 && item.scores.consistency > -999
        );

        if (allScores.length > 0) {
          // 更新truthfulness统计
          const truthfulnessMetric = mockAssessmentData.statisticsList.find(item => item.metricName === 'truthfulness');
          if (truthfulnessMetric) {
            truthfulnessMetric.metricScore = Math.round(allScores.reduce((sum, item) => sum + item.scores.truthfulness, 0) / allScores.length);
          }

          // 更新usability统计
          const usabilityMetric = mockAssessmentData.statisticsList.find(item => item.metricName === 'usability');
          if (usabilityMetric) {
            usabilityMetric.metricScore = Math.round(allScores.reduce((sum, item) => sum + item.scores.usability, 0) / allScores.length);
          }

          // 更新consistency统计
          const consistencyMetric = mockAssessmentData.statisticsList.find(item => item.metricName === 'consistency');
          if (consistencyMetric) {
            consistencyMetric.metricScore = Math.round(allScores.reduce((sum, item) => sum + item.scores.consistency, 0) / allScores.length);
          }
        }
      }

      const responseData = {
        code: 0,
        msg: '评分提交成功',
        data: {},
      };
      console.log('🔗 [API] submitScores 响应数据:', responseData);
      console.log('📊 [API] submitScores 更新后的统计信息:', mockAssessmentData);
      resolve(responseData);
    }, 600);
  });
};

// 获取统计信息（用于更新头部数据）
export const getStatistics = async (taskId: string) => {
  console.log('🔗 [API] getStatistics 请求参数:', { taskId });

  return new Promise((resolve) => {
    setTimeout(() => {
      // 计算进度百分比
      const progress = Math.round((mockAssessmentData.completedLineCount / mockAssessmentData.totalLineCount) * 100);

      // 从statisticsList中提取实时得分
      const truthfulnessScore = mockAssessmentData.statisticsList.find(item => item.metricName === 'truthfulness')?.metricScore ?? '-';
      const usabilityScore = mockAssessmentData.statisticsList.find(item => item.metricName === 'usability')?.metricScore ?? '-';
      const consistencyScore = mockAssessmentData.statisticsList.find(item => item.metricName === 'consistency')?.metricScore ?? '-';

      const responseData = {
        code: 0,
        msg: 'Success',
        data: {
          totalCount: mockAssessmentData.totalLineCount,
          evaluatedCount: mockAssessmentData.completedLineCount,
          unevaluatedCount: mockAssessmentData.totalLineCount - mockAssessmentData.completedLineCount,
          averageScores: {
            truthfulness: truthfulnessScore,
            usability: usabilityScore,
            consistency: consistencyScore,
          },
          progress: progress,
        },
      };
      console.log('🔗 [API] getStatistics 响应数据:', responseData);
      resolve(responseData);
    }, 200);
  });
};

// ================ 多个评估详情页接口 ================

// 数据处理函数：将statisticsList转换为多对比评估页面需要的格式
function processStatisticsListToComparisonData(rawData: any): VersionComparisonData {
  const { taskId, name, description, totalLineCount, completedLineCount, statisticsList } = rawData;

  // 按metricName（维度）分组统计数据
  const dimensionMap = new Map<string, any[]>();

  statisticsList.forEach((stat: any) => {
    const dimension = stat.metricName; // metricName是维度
    if (!dimensionMap.has(dimension)) {
      dimensionMap.set(dimension, []);
    }
    dimensionMap.get(dimension)!.push(stat);
  });

  // 构建dimensions数组
  const dimensions: DimensionData[] = Array.from(dimensionMap.entries()).map(([dimensionName, stats]) => {
    // 计算平均得分 - 排除未评估状态的-999值
    const validScores = stats.filter(stat => stat.metricScore !== -999);
    const averageScore = validScores.length > 0
      ? validScores.reduce((sum, stat) => sum + stat.metricScore, 0) / validScores.length
      : 0; // 如果没有有效分数，平均分为0

    // 构建versions数组（每个版本的targetName）
    const versions: VersionStats[] = stats.map(stat => {
      const totalCount = stat.winCount + stat.loseCount + stat.drawCount;
      return {
        version: stat.targetName, // targetName是版本（V260, V261, V262）
        winCount: stat.winCount,
        loseCount: stat.loseCount,
        tieCount: stat.drawCount,
        totalCount: totalCount,
        winRate: totalCount > 0 ? (stat.winCount / totalCount) * 100 : 0,
        loseRate: totalCount > 0 ? (stat.loseCount / totalCount) * 100 : 0,
        tieRate: totalCount > 0 ? (stat.drawCount / totalCount) * 100 : 0,
      };
    });

    return {
      name: dimensionName, // metricName作为维度名称
      averageScore: Math.round(averageScore * 100) / 100, // 保留两位小数
      versions: versions,
    };
  });

  // 计算整体进度
  const progress = totalLineCount > 0 ? (completedLineCount / totalLineCount) * 100 : 0;

  return {
    id: taskId.toString(),
    name: name,
    description: description,
    progress: Math.round(progress * 100) / 100,
    totalLineCount: totalLineCount,
    completedLineCount: completedLineCount,
    dimensions: dimensions,
  };
}// 接口1：获取多个评估任务的基本信息和维度得分（直接使用getAssessmentInfo）
export async function getAssessmentMultiDetail(id: string) {
  console.log('Fetching multi assessment detail for id:', id);

  // 直接调用getAssessmentInfo获取统一的数据结构
  try {
    const response = await getAssessmentInfo(id) as any;
    if (response.code === 0) {
      const data = response.data;

      // 处理statisticsList，按维度聚合数据
      const processedData = processStatisticsListToComparisonData(data);

      return {
        code: 0,
        msg: 'Success',
        data: processedData,
      };
    } else {
      return response;
    }
  } catch (error) {
    console.error('Error in getAssessmentMultiDetail:', error);
    return {
      code: -1,
      msg: 'Error fetching assessment detail',
      data: null,
    };
  }
}

// 接口2：获取详情表格数据
export async function getAssessmentMultiTable(params: {
  id: string;
  tab: string;
  dimensionKey?: string;
  query?: string;
  status?: string;
  pageNum?: number;
  pageSize?: number;
}) {
  console.log('Fetching multi assessment table with params:', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      // 根据tab和其他条件过滤数据
      let filteredData = [...mockDetailTableData];

      if (params.tab === 'compared') {
        filteredData = filteredData.filter(item => item.comparisonStatus === '已对比');
      } else if (params.tab === 'uncompared') {
        filteredData = filteredData.filter(item => item.comparisonStatus === '未对比');
      }

      if (params.query) {
        filteredData = filteredData.filter(item =>
          item.query.includes(params.query!) ||
          item.V260.includes(params.query!) ||
          item.V261.includes(params.query!) ||
          item.V262.includes(params.query!)
        );
      }

      // 分页处理
      const pageNum = params.pageNum || 1;
      const pageSize = params.pageSize || 10;
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      resolve({
        code: 0,
        msg: 'Success',
        data: {
          list: paginatedData,
          total: filteredData.length,
          pageNum,
          pageSize,
        },
      });
    }, 300);
  });
}

// 新增分页内容列表接口
export async function getContentList(
  taskId: string,
  evaluationType: 'NOT_COMPARE' | 'COMPARED',
  pageNum: number = 1,
  pageSize: number = 1,
  query?: {
    targetId?: number;
    metricId?: number;
    compareResult?: string;
    comment?: string;
    status?: string;
  }
) {
  console.log('🔍 [getContentList] 请求分页内容列表:', {
    taskId,
    evaluationType,
    pageNum,
    pageSize,
    query
  });

  const requestData = {
    taskId,
    evaluationType,
    pageNum,
    pageSize,
    ...query
  };

  console.log('📤 [getContentList] 请求参数:', requestData);

  // 记录API调试信息
  ApiDebugger.logRequest('getContentList', requestData);

  // 判断是否使用Mock数据
  if (!shouldUseMock()) {
    // 生产环境调用真实API
    try {
      const apiUrl = `${getApiBaseUrl()}/api/manual/assessment/${taskId}/content`;
      console.log('🌐 [getContentList] 调用真实API:', apiUrl);

      const response = await request(apiUrl, {
        method: 'GET',
        params: requestData,
      });

      ApiDebugger.logResponse('getContentList', response);
      return response;
    } catch (error) {
      console.error('🚨 [getContentList] API调用失败:', error);
      ApiDebugger.logError('getContentList', error);

      // 如果API调用失败，返回错误信息
      const errorMessage = error instanceof Error ? error.message : '网络错误';
      return {
        code: -1,
        msg: `API调用失败: ${errorMessage}`,
        data: null
      };
    }
  }

  // 开发环境或启用Mock时使用Mock数据
  console.log('🎭 [getContentList] 使用Mock数据');
  return new Promise((resolve) => {
    setTimeout(() => {
      // 生成多条数据用于分页测试
      const pageData = Array.from({ length: pageSize }, (_, index) => {
        const dataIndex = (pageNum - 1) * pageSize + index + 1;
        const randomStatus = evaluationType === 'NOT_COMPARE' ? 'NOT_COMPARE' : 'COMPARED';
        const isCompleted = randomStatus === 'COMPARED';

        return {
          id: `content-${taskId}-${dataIndex}`,
          query: `这是第${dataIndex}条评估内容的问题描述。请分析以下数据的特征并给出详细解释。在机器学习项目中，如何选择合适的特征工程方法来提升模型性能？具体包括特征选择、特征变换和特征组合等方面的内容。`,
          primaryTargetAnswer: `这是模型A对第${dataIndex}条问题的回答。根据分析，数据呈现正态分布特征，主要体现在均值附近数据点密集分布。特征工程是机器学习项目中的关键步骤，需要考虑数据类型、业务场景和模型特点来选择合适的方法。

具体建议：
1. 特征选择：使用过滤法、包装法和嵌入法进行特征筛选
2. 特征变换：标准化、归一化、对数变换等处理异常值
3. 特征组合：创建新的特征维度，提升模型表达能力
4. 领域知识：结合业务理解，构造有意义的特征

实施步骤应该从数据探索开始，逐步迭代优化特征集合。`,
          comparisonTargetAnswer: `这是模型B对第${dataIndex}条问题的回答。从统计学角度看，该数据集具有良好的分布特性，可以用于后续的机器学习建模。特征工程方法包括特征选择、特征变换、特征组合等技术。

主要方法：
1. 统计方法：利用相关性分析选择重要特征
2. 机器学习方法：使用树模型的特征重要性
3. 深度学习方法：自动特征提取和表示学习
4. 业务驱动：基于领域专知识构造特征

但在实际应用中，需要平衡模型复杂度和性能指标。`,
          status: randomStatus,
          evaluationStatus: isCompleted ? 'COMPLETED' : 'PENDING',
          creator: `评估员${(dataIndex % 5) + 1}`, // 模拟不同的评估员
          createTime: new Date(Date.now() - ((dataIndex % 30) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] + ' ' +
            String(9 + (dataIndex % 12)).padStart(2, '0') + ':' +
            String((dataIndex * 13) % 60).padStart(2, '0') + ':' +
            String((dataIndex * 17) % 60).padStart(2, '0'), // 模拟不同的创建时间
          scores: isCompleted ? {
            truthfulness: [-2, 0, 2][Math.floor(Math.random() * 3)],
            usability: [-2, 0, 2][Math.floor(Math.random() * 3)],
            consistency: [-2, 0, 2][Math.floor(Math.random() * 3)],
          } : null, // 未完成时设置为null，而不是-999
          evaluationComment: isCompleted ? {
            text: '模型A的回答更加准确和详细，在特征工程方法的介绍上更为全面，提供了具体的实施步骤',
            screenshots: []
          } : null,
          comment: isCompleted ? {
            text: `【评估说明 - 第${dataIndex}条】模型A在真实性、可用性和一致性方面都表现更好。`,
            images: []
          } : null,
          primaryTargetScore: isCompleted ? [
            {
              metricId: 1, // 数字ID，不是字符串
              metricName: '真实性',
              metricDescription: '真实性评估',
              metricScore: [-2, 0, 2][Math.floor(Math.random() * 3)],
              compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
              createTime: new Date().toISOString()
            },
            {
              metricId: 2, // 数字ID，不是字符串
              metricName: '可用性',
              metricDescription: '可用性评估',
              metricScore: [-2, 0, 2][Math.floor(Math.random() * 3)],
              compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
              createTime: new Date().toISOString()
            },
            {
              metricId: 3, // 数字ID，不是字符串
              metricName: '一致性',
              metricDescription: '一致性评估',
              metricScore: [-2, 0, 2][Math.floor(Math.random() * 3)],
              compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
              createTime: new Date().toISOString()
            }
          ] : [],
          hasNext: dataIndex < (evaluationType === 'NOT_COMPARE' ? 25 : 15), // 增加总数用于测试
          hasPrevious: dataIndex > 1
        };
      });

      // 模拟分页数据
      const mockPageData = {
        code: 0,
        msg: 'Success',
        data: {
          total: evaluationType === 'NOT_COMPARE' ? 25 : 15, // 增加总数
          pageNum,
          pageSize,
          pages: Math.ceil((evaluationType === 'NOT_COMPARE' ? 25 : 15) / pageSize),
          list: pageData
        }
      };

      console.log('📥 [getContentList] Mock响应数据:', mockPageData);
      resolve(mockPageData);
    }, 300);
  });
}

// 新增：单个评估详情分页接口（用于多对比评估详情页面）
export async function getTaskLineDetail(
  taskId: string,
  pageNum: number = 1,
  pageSize: number = 1
) {
  console.log('🔍 [getTaskLineDetail] 请求单个评估详情分页:', {
    taskId,
    pageNum,
    pageSize
  });

  const requestData = {
    taskId,
    pageNum,
    pageSize
  };

  console.log('📤 [getTaskLineDetail] 请求参数:', requestData);

  // Mock 实现 - 使用 /api/manual/compare/task/line/v1/page 接口格式
  return new Promise((resolve) => {
    setTimeout(() => {
      // 单条数据（分页但每页只有一条）
      const dataIndex = pageNum;
      const isCompleted = Math.random() > 0.3; // 70% 概率已完成
      const status = isCompleted ? 'COMPARED' : 'NOT_COMPARE';

      const pageData = {
        id: `task-line-${taskId}-${dataIndex}`,
        taskId: parseInt(taskId),
        instruction: `任务指示语 - 第${dataIndex}条：请分析人工智能在医疗领域的应用前景和挑战。`,
        query: `请分析人工智能在医疗领域的应用前景和挑战。结合当前技术发展现状，分析AI在诊断、治疗、药物研发等方面的潜在价值，以及可能面临的技术、伦理和监管挑战。请提供具体的案例和数据支持。`,
        primaryTargetId: 101 + dataIndex,
        primaryTargetName: `主对象名称_${dataIndex}`,
        primaryTargetAnswer: `人工智能在医疗领域的应用前景广阔，主要体现在以下几个方面：

一、技术应用现状
人工智能技术在医疗领域已经取得了显著进展，主要表现以下几个方向：

1. 医学影像诊断
- CT、MRI影像的自动化识别和分析
- 病理切片的自动化分析
- 眼底病变和皮肤病变检测

2. 临床决策支持
- 基于大数据的诊断建议
- 药物发现和个性化治疗方案
- 手术机器人辅助

【技术优势】
- 处理海量医疗数据
- 24/7不间断工作
- 减少人为错误
- 提升诊断效率`,
        primaryTargetScore: [
          {
            metricId: 'truthfulness',
            metricName: '真实性',
            metricDescription: '评估回答的真实性和准确性',
            metricScore: isCompleted ? [-2, 0, 2][Math.floor(Math.random() * 3)] : 0,
            compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
            createTime: new Date().toISOString()
          },
          {
            metricId: 'usability',
            metricName: '可用性',
            metricDescription: '评估回答的实用性和可操作性',
            metricScore: isCompleted ? [-2, 0, 2][Math.floor(Math.random() * 3)] : 0,
            compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
            createTime: new Date().toISOString()
          },
          {
            metricId: 'consistency',
            metricName: '一致性',
            metricDescription: '评估回答的逻辑一致性',
            metricScore: isCompleted ? [-2, 0, 2][Math.floor(Math.random() * 3)] : 0,
            compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
            createTime: new Date().toISOString()
          }
        ],
        comparisonTargetId: 201 + dataIndex,
        comparisonTargetName: 201 + dataIndex,
        comparisonTargetAnswer: `AI医疗：机遇与挑战并存

【应用领域】
✅ 影像诊断：准确率已超越人类专家
✅ 药物发现：大幅缩减研发周期
✅ 精准医疗：个性化治疗方案
✅ 远程医疗：提升医疗资源可及性

【技术优势】
- 处理海量医疗数据
- 24/7不间断工作
- 减少人为错误
- 提升诊断效率

【主要挑战】
【技术层面】
- 数据隐私保护
- 算法黑盒问题
- 医疗责任归属

实际应用中，需要平衡创新速度与安全监管。`,
        comparisonTargetScore: isCompleted ? [
          {
            metricId: 'truthfulness',
            metricName: '真实性',
            metricDescription: '评估回答的真实性和准确性',
            metricScore: [-2, 0, 2][Math.floor(Math.random() * 3)],
            compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
            createTime: new Date().toISOString()
          },
          {
            metricId: 'usability',
            metricName: '可用性',
            metricDescription: '评估回答的实用性和可操作性',
            metricScore: [-2, 0, 2][Math.floor(Math.random() * 3)],
            compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
            createTime: new Date().toISOString()
          },
          {
            metricId: 'consistency',
            metricName: '一致性',
            metricDescription: '评估回答的逻辑一致性',
            metricScore: [-2, 0, 2][Math.floor(Math.random() * 3)],
            compareResult: (['win', 'lose', 'draw'][Math.floor(Math.random() * 3)] as 'win' | 'lose' | 'draw'),
            createTime: new Date().toISOString()
          }
        ] : [],
        comment: isCompleted ? {
          text: `【评估说明 - 第${dataIndex}条】\n\n**综合评价：**\n- 答案A：采用传统学术风格，详细系统，适合深度学习\n- 答案B：采用现代化展示元素，信息密度高，阅读体验好\n\n**主要区别：**\n- 答案A更注重理论深度和完整性\n- 答案B更注重实用性，突出了技术优势和挑战`,
          images: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==']
        } : null,
        status: status,
        creator: `评估员${(dataIndex % 5) + 1}`,
        createTime: new Date(Date.now() - ((dataIndex % 30) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] + ' ' +
          String(9 + (dataIndex % 12)).padStart(2, '0') + ':' +
          String((dataIndex * 13) % 60).padStart(2, '0') + ':' +
          String((dataIndex * 17) % 60).padStart(2, '0')
      };

      // 模拟分页响应
      const mockResponse = {
        code: 0,
        msg: 'Success',
        data: {
          total: 30, // 总共30条数据
          page: pageNum,
          pageSize: pageSize,
          totalPage: 30,
          data: [pageData] // 数组格式，但只有一项
        }
      };

      console.log('📥 [getTaskLineDetail] Mock响应数据:', mockResponse);
      resolve(mockResponse);
    }, 300);
  });
}

// 多对比评估详情相关类型定义
export interface MultiCompareOption {
  key: string;
  title: string;
  description: string;
}

export interface MultiCompareDimension {
  key: string;
  title: string;
  description?: string;
  options: MultiCompareOption[];
  selectedOption?: string;
}

export interface MultiCompareDetailData {
  id: string;
  assessmentId: string;
  contentId: string;
  prompt: string;
  resultA: string;
  resultB: string;
  dimensions: MultiCompareDimension[];
  comment?: {
    text?: string;
    images?: string[]; // base64
  };
  totalCount: number;
  currentIndex: number;
  prevId?: string;
  nextId?: string;
}

export interface MultiCompareSubmitData {
  assessmentId: string;
  contentId: string;
  dimensionResults: Record<string, string>; // 维度key -> 选择的选项key
  comment?: {
    text?: string;
    images?: string[];
  };
}

// ================ 多个评估详情页接口 ================

// 多对比评估详情相关类型定义
export interface MultiCompareOption {
  key: string;
  title: string;
  description: string;
}

export interface MultiCompareDimension {
  key: string;
  title: string;
  description?: string;
  options: MultiCompareOption[];
  selectedOption?: string;
}

export interface MultiCompareDetailData {
  id: string;
  assessmentId: string;
  contentId: string;
  prompt: string;
  resultA: string;
  resultB: string;
  dimensions: MultiCompareDimension[];
  comment?: {
    text?: string;
    images?: string[]; // base64
  };
  totalCount: number;
  currentIndex: number;
  prevId?: string;
  nextId?: string;
}

// Mock数据
const mockBasicOptions: MultiCompareOption[] = [
  { key: '-2', title: '更喜欢这个', description: '更喜欢左侧结果' },
  { key: '0', title: '无法判断', description: '无法判断优劣' },
  { key: '2', title: '更喜欢那个', description: '更喜欢右侧结果' },
];

const mockDimensions: MultiCompareDimension[] = [
  {
    key: 'overall',
    title: '综合表现',
    description: '请选择你认为更好的答案',
    options: mockBasicOptions,
    selectedOption: undefined,
  },
  {
    key: 'fluency',
    title: '流畅度',
    description: '评估回答的流畅性和连贯性',
    options: mockBasicOptions,
    selectedOption: undefined,
  },
];

// 第一条数据的预设维度（带回显选项）
const mockDimensionsWithPreset: MultiCompareDimension[] = [
  {
    key: 'overall',
    title: '综合表现',
    description: '请选择你认为更好的答案',
    options: mockBasicOptions,
    selectedOption: '2', // 预选"更喜欢那个"（值为2）
  },
  {
    key: 'fluency',
    title: '流畅度',
    description: '评估回答的流畅性和连贯性',
    options: mockBasicOptions,
    selectedOption: '-2', // 预选"更喜欢这个"（值为-2）
  },
];

// 原始数据（中间位置）
const mockMultiCompareData: MultiCompareDetailData = {
  id: '2',
  assessmentId: '123',
  contentId: '2',
  prompt: '你是一名投资领域的研究员，请撰写一批正式的、不少于800字的关于新能源汽车行业的投资分析报告。',
  resultA: `新能源汽车行业投资分析报告

一、行业概述
新能源汽车行业作为全球汽车产业转型升级的重要方向，正迎来前所未有的发展机遇。随着环保意识的增强和政策支持力度的加大，新能源汽车市场呈现出快速增长的态势。

二、市场现状
目前，全球新能源汽车市场已进入快速发展阶段。据统计，2023年全球新能源汽车销量达到1400万辆，同比增长35%。中国作为全球最大的新能源汽车市场，占据了全球销量的60%以上。

三、投资机会
1. 产业链上游：锂电池材料、稀土永磁材料等关键原材料领域存在较大投资机会
2. 产业链中游：动力电池、电机电控等核心零部件制造企业具有较强的投资价值
3. 产业链下游：整车制造企业和充电基础设施建设运营企业前景广阔

四、风险分析
1. 政策风险：补贴政策退坡可能影响短期市场需求
2. 技术风险：电池技术迭代速度较快，存在技术路线选择风险
3. 竞争风险：市场竞争日趋激烈，企业盈利能力面临挑战

五、投资建议
建议重点关注具有核心技术优势、产业链布局完善、财务状况良好的龙头企业。同时，应密切关注政策变化和技术发展趋势，适时调整投资策略。`,
  resultB: `新能源汽车行业投资分析

【行业背景】
新能源汽车产业是国家战略性新兴产业，受到政府高度重视。在"双碳"目标驱动下，新能源汽车行业迎来历史性发展机遇。

【市场分析】
全球新能源汽车市场快速扩张，2023年销量突破1400万辆。中国市场表现尤为突出，市场渗透率已超过30%。特斯拉、比亚迪等头部企业引领行业发展。

【技术趋势】
1. 电池技术持续进步，能量密度不断提升
2. 自动驾驶技术日趋成熟
3. 车联网技术快速发展
4. 充电技术不断创新

【投资价值】
- 上游：锂矿、镍矿等资源类企业价值凸显
- 中游：宁德时代、比亚迪等电池龙头具备长期投资价值
- 下游：理想、蔚来等新势力车企成长空间巨大

【风险提示】
需关注原材料价格波动、技术路线变化、国际贸易摩擦等风险因素。

【投资策略】
采用分散投资策略，重点配置行业龙头企业，关注技术创新能力强、商业模式清晰的公司。建议长期持有，享受行业成长红利。`,
  dimensions: mockDimensions,
  comment: undefined,
  totalCount: 3,
  currentIndex: 2,
  prevId: '1',
  nextId: '3',
};

// 第一条数据 - 没有上一条
const mockMultiCompareDataFirst: MultiCompareDetailData = {
  id: '1',
  assessmentId: '123',
  contentId: '1',
  prompt: '请分析人工智能在医疗领域的应用前景和挑战。',
  resultA: `人工智能在医疗领域的应用前景

一、技术应用现状
人工智能技术在医疗领域已经取得了显著进展，主要体现在以下几个方面：

1. 医学影像诊断
- CT、MRI等影像的智能识别和分析
- 病理切片的自动化分析
- 眼底筛查和皮肤病变检测

2. 临床决策支持
- 基于大数据的诊断建议
- 药物研发和个性化治疗方案
- 手术机器人辅助

二、市场前景
根据市场研究报告，全球AI医疗市场预计将从2023年的150亿美元增长到2030年的1480亿美元，复合年增长率达到38.4%。

三、面临挑战
1. 数据隐私和安全问题
2. 监管政策滞后
3. 医生接受度有待提高
4. 技术标准化程度不够

四、发展建议
建议加强产学研合作，完善相关法规标准，提升医护人员AI素养，推动技术成果转化应用。`,
  resultB: `AI医疗：机遇与挑战并存

【应用领域】
✅ 影像诊断：准确率已超越人类专家
✅ 药物发现：大幅缩短研发周期  
✅ 精准医疗：个性化治疗方案
✅ 远程医疗：提升医疗资源可及性

【技术优势】
• 处理海量医疗数据
• 24/7不间断工作
• 减少人为错误
• 提高诊断效率

【主要挑战】
⚠️ 法律责任界定不清
⚠️ 医疗数据质量参差不齐
⚠️ 算法"黑盒"问题
⚠️ 高昂的部署成本

【投资建议】
重点关注头部科技公司的医疗AI项目，以及专业医疗AI独角兽企业。建议采用组合投资策略，分散风险。

【未来展望】
预计未来5年AI将在医疗领域实现更深度融合，但需要政策、技术、伦理等多维度协同发展。`,
  dimensions: mockDimensionsWithPreset, // 使用带预设选项的维度
  comment: {
    text: `对比分析：

📊 **结构对比**
- 答案A：采用传统学术写作风格，结构清晰，层次分明
- 答案B：使用现代化视觉元素，信息密度高，阅读体验好

🎯 **内容深度**
- 答案A：理论分析较为深入，提供了具体的市场数据和发展建议
- 答案B：更注重实用性，突出了技术优势和投资价值

✨ **表达方式**
- 答案A：正式学术风格，适合专业报告
- 答案B：现代化表达，使用emoji和符号，更易理解

综合评价：两个答案各有特色，A偏重理论深度，B偏重实用性和可读性。`,
    images: [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmOWZmIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzNzNkYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFJ5Yy754mp6KeG6KGMPC90ZXh0Pgo8L3N2Zz4=',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmZmYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSIzMCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzUyYzQxYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuW4guWcuuWJjeaZrzwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjcwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNTJjNDFhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+MzglIOWinumVvzwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjcwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNTJjNDFhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+MjAzMOW5tOmineacnzwvdGV4dD4KPC9zdmc+',
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmMGYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSIzMCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2RjMzYyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaMkeaImDwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjZGMzNjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6ZqQ56eB5LiO5a6J5YWoPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNzAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNkYzM2MjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7ms5XlvovnrZTlh4Y8L3RleHQ+Cjwvc3ZnPg=='
    ]
  },
  totalCount: 3,
  currentIndex: 1,
  prevId: undefined, // 第一条没有上一条
  nextId: '2',
};

// 最后一条数据 - 没有下一条
const mockMultiCompareDataLast: MultiCompareDetailData = {
  id: '3',
  assessmentId: '123',
  contentId: '3',
  prompt: '请评价区块链技术在金融行业的应用价值和风险。',
  resultA: `区块链技术在金融行业的应用分析

一、技术特点
区块链技术具有去中心化、不可篡改、透明可追溯等特点，为金融行业带来了新的解决方案。

二、应用场景
1. 数字货币和央行数字货币(CBDC)
2. 跨境支付和汇款
3. 供应链金融
4. 智能合约和去中心化金融(DeFi)
5. 身份认证和KYC

三、应用价值
• 降低交易成本：减少中介环节，提高效率
• 增强安全性：加密技术保障数据安全
• 提升透明度：所有交易记录公开可查
• 扩大金融包容性：为无银行账户人群提供服务

四、面临风险
1. 技术风险：可扩展性问题、51%攻击风险
2. 监管风险：法律法规不完善
3. 操作风险：私钥丢失、智能合约漏洞
4. 市场风险：价格波动剧烈

五、发展建议
建议金融机构应该积极拥抱区块链技术，但要注意风险控制，选择合适的应用场景，循序渐进地推进技术应用。`,
  resultB: `区块链金融：革命还是泡沫？

【核心价值】
🚀 去中介化：减少传统金融中介
🔒 安全可信：密码学保障数据安全  
⚡ 高效便捷：7*24小时不间断服务
🌍 全球化：打破地域限制

【成功案例】
✓ JPMorgan的JPM Coin
✓ Visa的区块链跨境支付
✓ 中国人民银行数字货币(DCEP)
✓ DeFi协议总锁仓量超1000亿美元

【技术挑战】
❌ 性能瓶颈：TPS远低于传统系统
❌ 能耗问题：工作量证明机制耗能巨大
❌ 用户体验：技术门槛较高
❌ 治理争议：去中心化治理机制不成熟

【监管态度】
各国监管态度分化明显，从严厉禁止到积极拥抱不等。

【投资策略】
建议关注基础设施建设类项目，避免炒作性强的项目。长期看好技术发展前景，短期需要注意波动风险。`,
  dimensions: mockDimensions,
  comment: undefined,
  totalCount: 3,
  currentIndex: 3,
  prevId: '2',
  nextId: undefined, // 最后一条没有下一条
};

// 只有一条数据 - 既没有上一条也没有下一条
const mockMultiCompareDataSingle: MultiCompareDetailData = {
  id: '1',
  assessmentId: '456',
  contentId: '1',
  prompt: '请简要说明量子计算的基本原理和潜在应用。',
  resultA: `量子计算基本原理与应用

【基本原理】
量子计算基于量子力学的叠加态和纠缠态原理：
• 量子比特(qubit)可以同时处于0和1状态
• 量子纠缠实现比特间的强关联
• 量子门操作实现计算逻辑

【技术优势】
相比经典计算机，量子计算机在特定问题上具有指数级加速能力。

【潜在应用】
1. 密码学：RSA加密破解
2. 优化问题：交通路线、投资组合优化
3. 机器学习：量子机器学习算法
4. 药物发现：分子模拟
5. 材料科学：新材料设计

【发展现状】
目前处于NISQ（含噪中等规模量子）时代，Google、IBM、IonQ等公司在硬件方面取得重要进展。

【挑战与限制】
• 量子态易受环境干扰
• 错误率较高
• 需要极低温环境
• 编程复杂度高`,
  resultB: `量子计算：未来计算的新范式

🔬 【核心概念】
量子计算利用量子力学现象进行信息处理，核心在于：
- 叠加态：一个量子比特可同时为0和1
- 纠缠：量子比特间的神秘关联
- 测量：观测会使量子态坍缩

💡 【杀手级应用】
🔐 破解传统加密算法
🧬 模拟分子和化学反应
📈 金融风险建模
🤖 加速机器学习训练
🌐 优化复杂网络

📊 【市场前景】
预计2030年量子计算市场规模将达850亿美元，年增长率超过30%。

⚡【技术路线】
• 超导量子比特（IBM、Google）
• 离子阱（IonQ、Honeywell）  
• 光量子（Xanadu、PsiQuantum）
• 拓扑量子（Microsoft）

🎯 【投资建议】
关注量子硬件制造商、量子软件公司和量子云服务提供商。`,
  dimensions: mockDimensions,
  comment: undefined,
  totalCount: 1,
  currentIndex: 1,
  prevId: undefined, // 既没有上一条
  nextId: undefined, // 也没有下一条
};

// 获取多对比评估详情
export function getMultiCompareDetail(assessmentId: string, contentId?: string) {
  console.log('Fetching multi compare detail:', { assessmentId, contentId });
  return new Promise((resolve) => {
    setTimeout(() => {
      let data: MultiCompareDetailData;

      // 根据contentId选择不同的mock数据来测试边界情况
      if (contentId === '1' || (!contentId && assessmentId !== '456')) {
        // 第一条数据 - 没有上一条
        data = { ...mockMultiCompareDataFirst };
      } else if (contentId === '2') {
        // 第二条数据 - 中间数据，既有上一条也有下一条
        data = { ...mockMultiCompareData };
      } else if (contentId === '3') {
        // 最后一条数据 - 没有下一条
        data = { ...mockMultiCompareDataLast };
      } else if (assessmentId === '456') {
        // 只有一条数据的任务，没有下一条
        data = { ...mockMultiCompareDataSingle };
      } else {
        // 默认返回第一条数据
        data = { ...mockMultiCompareDataFirst };
      }

      // 设置当前参数
      data.assessmentId = assessmentId;
      data.contentId = contentId || data.contentId;
      data.id = contentId || data.id;

      // 调试输出维度信息
      console.log('API返回的维度数据:', data.dimensions.map(dim => ({
        key: dim.key,
        title: dim.title,
        selectedOption: dim.selectedOption
      })));

      resolve({
        code: 0,
        msg: 'Success',
        data,
      });
    }, 300);
  });
}

// 提交多对比评估结果
export function submitMultiCompareResult(submitData: MultiCompareSubmitData) {
  console.log('Submitting multi compare result:', submitData);
  return new Promise((resolve) => {
    setTimeout(() => {
      let nextContentId: string | undefined;

      // 根据当前contentId确定下一条的ID
      if (submitData.assessmentId === '456') {
        // 单条数据的任务，没有下一条
        nextContentId = undefined;
      } else {
        // 正常的3条数据任务
        if (submitData.contentId === '1') {
          nextContentId = '2';
        } else if (submitData.contentId === '2') {
          nextContentId = '3';
        } else if (submitData.contentId === '3') {
          // 已经是最后一条，没有下一条
          nextContentId = undefined;
        } else {
          // 默认情况，返回下一条
          nextContentId = (parseInt(submitData.contentId) + 1).toString();
        }
      }

      resolve({
        code: 0,
        msg: '提交成功',
        data: {
          nextContentId,
        },
      });
    }, 500);
  });
};

// ================ 获取行详情和导航信息接口 ================

// 行详情数据类型
export interface RowDetailData {
  rowId: string;
  contentId: string;
  prevRowId?: string;
  nextRowId?: string;
  prevContentId?: string;
  nextContentId?: string;
}

// 获取行详情和导航信息
export async function getRowDetailInfo(assessmentId: string, rowId: string) {
  console.log('Fetching row detail info:', { assessmentId, rowId });
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟根据rowId获取对应的contentId和导航信息
      // 这里假设rowId和contentId有对应关系，实际中应该从数据库查询
      const rowData: RowDetailData = {
        rowId,
        contentId: rowId, // 简单映射，实际应该查询数据库
        prevRowId: rowId === '1' ? undefined : (parseInt(rowId) - 1).toString(),
        nextRowId: rowId === '3' ? undefined : (parseInt(rowId) + 1).toString(),
        prevContentId: rowId === '1' ? undefined : (parseInt(rowId) - 1).toString(),
        nextContentId: rowId === '3' ? undefined : (parseInt(rowId) + 1).toString(),
      };

      resolve({
        code: 0,
        msg: 'Success',
        data: rowData,
      });
    }, 200);
  });
}

// 根据contentId获取rowId
export async function getRowIdByContentId(assessmentId: string, contentId: string) {
  console.log('Getting rowId by contentId:', { assessmentId, contentId });
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟contentId到rowId的映射，实际中应该从数据库查询
      const rowId = contentId; // 简单映射，实际应该查询数据库

      resolve({
        code: 0,
        msg: 'Success',
        data: { rowId },
      });
    }, 100);
  });
}

// 创建人工评估任务相关接口类型定义
export interface TestDataset {
  id: string;
  name: string;
  description?: string;
}

export interface DatasetVersion {
  id: string;
  version: string;
  description?: string;
  datasetId: string;
}

export interface ModelVersion {
  id: string;
  version: string;
  description?: string;
  modelId: string;
}

export interface InferenceResultSet {
  id: string;
  name: string;
  description?: string;
  createTime: string;
}

export interface EvaluationMetric {
  id: string;
  name: string;
  description?: string;
  weight?: number;
}

export interface CreateTaskParams {
  taskName: string;
  taskDescription: string;
  datasetId: string;
  datasetVersionId: string;
  taskType: 'dual' | 'single'; // 两个对象对比 | 单个对象对比

  // 评估对象
  evaluationTarget: {
    objectType: 'model_version' | 'checkpoint';
    modelVersionId?: string;
    checkpointId?: string;
    inferenceType: 'new_data' | 'existing_data'; // 新数据 | 已有数据
    inferenceResultSetId?: string; // 已有数据时需要
  };

  // 对比对象 (只有双对象对比时需要)
  comparisonTarget?: {
    objectType: 'model_version' | 'checkpoint';
    modelVersionId?: string;
    checkpointId?: string;
    inferenceType: 'new_data' | 'existing_data';
    inferenceResultSetId?: string;
  };

  // 评估指标
  evaluationMetrics: {
    metricId: string;
    weight: number;
  }[];
}

export interface TaskDetail extends CreateTaskParams {
  id: string;
  status: 'draft' | 'running' | 'completed' | 'failed';
  creator: string;
  createTime: string;
  updateTime: string;
}

// 搜索测试集
export async function searchTestDatasets(params: { name?: string; pageNum?: number; pageSize?: number }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: TestDataset[] = [
        { id: '1', name: '保存测试集', description: '用于模型保存测试的数据集' },
        { id: '2', name: '通用问答测试集', description: '涵盖各种问答场景的测试数据' },
        { id: '3', name: '代码生成测试集', description: '专门用于测试代码生成能力' },
        { id: '4', name: '数学推理测试集', description: '数学计算和逻辑推理测试' },
        { id: '5', name: '多语言翻译测试集', description: '多语言翻译能力测试' },
      ].filter(item => !params.name || item.name.includes(params.name));

      resolve({
        code: 0,
        msg: 'Success',
        data: {
          list: mockData,
          total: mockData.length,
        },
      });
    }, 300);
  });
}

// 获取测试集版本列表
export async function getDatasetVersions(datasetId: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockVersions: DatasetVersion[] = [
        { id: '1', version: 'V0.0.1', description: '初始版本', datasetId },
        { id: '2', version: 'V0.0.2', description: '优化版本', datasetId },
        { id: '3', version: 'V1.0.0', description: '正式版本', datasetId },
      ];

      resolve({
        code: 0,
        msg: 'Success',
        data: mockVersions,
      });
    }, 200);
  });
}

// 获取模型版本列表
export async function getModelVersions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockVersions: ModelVersion[] = [
        { id: '1', version: 'V260', description: 'qwen模型V260版本', modelId: '1' },
        { id: '2', version: 'V261', description: 'qwen模型V261版本', modelId: '1' },
        { id: '3', version: 'V262', description: 'qwen模型V262版本', modelId: '1' },
      ];

      resolve({
        code: 0,
        msg: 'Success',
        data: mockVersions,
      });
    }, 200);
  });
}

// 扩展推理结果集接口，添加关联信息
export interface InferenceResultSet {
  id: string;
  name: string;
  description?: string;
  createTime: string;
  // 关联信息，用于过滤
  modelVersionId?: string; // 关联的模型版本ID
  checkpointId?: string;   // 关联的checkpointID
  trainingTaskId?: string; // 关联的训练任务ID
  workloadPath?: string;   // 关联的工作负载路径
}

// 推理结果集查询参数
export interface InferenceResultSetParams {
  keyword?: string;
  modelVersionId?: string;
  checkpointId?: string;
  trainingTaskId?: string;
  workloadPath?: string;
  pageNum?: number;
  pageSize?: number;
}

// 获取推理结果集列表
export async function getInferenceResultSets(params: InferenceResultSetParams = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 丰富的mock数据，覆盖各种场景
      const allMockResultSets: InferenceResultSet[] = [
        // 模型版本相关的推理结果集
        { 
          id: '1', 
          name: 'qwen模型V260推理结果集', 
          description: '基于qwen模型V260版本的推理结果，包含通用问答数据', 
          createTime: '2025-07-10 10:00:00',
          modelVersionId: '1' // 对应V260
        },
        { 
          id: '2', 
          name: 'qwen模型V261推理结果集', 
          description: '基于qwen模型V261版本的推理结果，优化后的版本', 
          createTime: '2025-07-11 14:30:00',
          modelVersionId: '2' // 对应V261
        },
        { 
          id: '3', 
          name: 'qwen模型V262推理结果集', 
          description: '基于qwen模型V262版本的推理结果，最新稳定版本', 
          createTime: '2025-07-12 09:15:00',
          modelVersionId: '3' // 对应V262
        },
        
        // checkpoint相关的推理结果集
        { 
          id: '4', 
          name: 'checkpoint_001推理结果集', 
          description: '基于checkpoint_001的推理结果，早期检查点', 
          createTime: '2025-07-08 16:45:00',
          checkpointId: 'checkpoint_001'
        },
        { 
          id: '5', 
          name: 'checkpoint_002推理结果集', 
          description: '基于checkpoint_002的推理结果，训练中期检查点', 
          createTime: '2025-07-09 11:20:00',
          checkpointId: 'checkpoint_002',
          trainingTaskId: '1',
          workloadPath: '/workload/checkpoint_002'
        },
        { 
          id: '6', 
          name: 'checkpoint_003推理结果集', 
          description: '基于checkpoint_003的推理结果，最新检查点', 
          createTime: '2025-07-13 13:10:00',
          checkpointId: 'checkpoint_003',
          trainingTaskId: '2',
          workloadPath: '/workload/checkpoint_003'
        },
        
        // 训练任务相关的推理结果集
        { 
          id: '7', 
          name: '数据处理任务推理结果集', 
          description: '基于数据处理训练任务生成的推理结果集', 
          createTime: '2025-07-07 10:30:00',
          trainingTaskId: '1',
          workloadPath: '/workload/data_processing',
          checkpointId: 'data_processing_checkpoint'
        },
        { 
          id: '8', 
          name: '微调任务推理结果集', 
          description: '基于模型微调训练任务生成的推理结果集', 
          createTime: '2025-07-14 15:45:00',
          trainingTaskId: '2',
          workloadPath: '/workload/fine_tuning',
          checkpointId: 'fine_tuning_checkpoint'
        },
        
        // 通用推理结果集
        { 
          id: '9', 
          name: '通用推理结果集_0701', 
          description: '7月1日生成的通用推理结果，适用于多种评估场景', 
          createTime: '2025-07-01 09:00:00'
        },
        { 
          id: '10', 
          name: '基准测试推理结果集', 
          description: '用于基准测试的标准推理结果集', 
          createTime: '2025-07-05 14:20:00'
        }
      ];

      // 根据参数过滤数据
      let filteredResults = [...allMockResultSets];
      
      // 按模型版本过滤
      if (params.modelVersionId) {
        filteredResults = filteredResults.filter(item => 
          item.modelVersionId === params.modelVersionId
        );
      }
      
      // 按checkpoint过滤
      if (params.checkpointId) {
        filteredResults = filteredResults.filter(item => 
          item.checkpointId === params.checkpointId
        );
      }
      
      // 按训练任务过滤
      if (params.trainingTaskId) {
        filteredResults = filteredResults.filter(item => 
          item.trainingTaskId === params.trainingTaskId
        );
      }
      
      // 按工作负载路径过滤
      if (params.workloadPath) {
        filteredResults = filteredResults.filter(item => 
          item.workloadPath === params.workloadPath
        );
      }
      
      // 按关键词搜索
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase();
        filteredResults = filteredResults.filter(item => 
          item.name.toLowerCase().includes(keyword) ||
          (item.description && item.description.toLowerCase().includes(keyword))
        );
      }
      
      // 分页处理
      const pageSize = params.pageSize || 20;
      const pageNum = params.pageNum || 1;
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResults = filteredResults.slice(startIndex, endIndex);
      
      console.log('🔍 [getInferenceResultSets] 过滤参数:', params);
      console.log('📊 [getInferenceResultSets] 过滤后结果数量:', filteredResults.length);
      console.log('📄 [getInferenceResultSets] 分页结果:', paginatedResults);

      resolve({
        code: 0,
        msg: 'Success',
        data: {
          list: paginatedResults,
          total: filteredResults.length,
          pageNum,
          pageSize
        }
      });
    }, 200);
  });
}

// 获取评估指标列表
export async function getEvaluationMetrics() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockMetrics: EvaluationMetric[] = [
        { id: '1', name: '正确性', description: '评估回答的准确性和正确性', weight: 100 },
        { id: '2', name: '流畅度', description: '评估语言表达的流畅程度', weight: 100 },
        { id: '3', name: '相关性', description: '评估回答与问题的相关程度', weight: 100 },
        { id: '4', name: '完整性', description: '评估回答的完整性和全面性', weight: 100 },
      ];

      resolve({
        code: 0,
        msg: 'Success',
        data: mockMetrics,
      });
    }, 200);
  });
}

// 创建评估任务
export async function createEvaluationTask(params: CreateTaskParams) {
  console.log('🔗 [API] createEvaluationTask 请求参数:', params);

  // 记录API调试信息
  ApiDebugger.logRequest('createEvaluationTask', params);

  // 判断是否使用Mock数据
  if (!shouldUseMock()) {
    // 生产环境调用真实API
    try {
      const apiUrl = `${getApiBaseUrl()}/api/manual/assessment/task`;
      console.log('🌐 [createEvaluationTask] 调用真实API:', apiUrl);

      const response = await request(apiUrl, {
        method: 'POST',
        data: params,
      });

      ApiDebugger.logResponse('createEvaluationTask', response);
      return response;
    } catch (error) {
      console.error('🚨 [createEvaluationTask] API调用失败:', error);
      ApiDebugger.logError('createEvaluationTask', error);

      return {
        code: -1,
        msg: `API调用失败: ${error instanceof Error ? error.message : '网络错误'}`,
        data: null
      };
    }
  }

  // 开发环境使用Mock数据
  console.log('🎭 [createEvaluationTask] 使用Mock数据');
  return new Promise((resolve) => {
    setTimeout(() => {
      // 简单的参数验证
      if (!params.taskName || !params.datasetId) {
        resolve(createTaskValidationErrorResponse('invalid_params'));
        return;
      }

      // 模拟任务名称重复检查（随机）
      if (Math.random() < 0.1) {
        resolve(createTaskValidationErrorResponse('duplicate_task'));
        return;
      }

      const mockResponse = createEvaluationTaskResponse(params);
      console.log('📥 [createEvaluationTask] Mock响应数据:', mockResponse);
      resolve(mockResponse);
    }, 500);
  });
}

// 更新评估任务
export async function updateEvaluationTask(id: string, params: Partial<CreateTaskParams>) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating evaluation task:', { id, params });

      resolve({
        code: 0,
        msg: '评估任务更新成功',
        data: {},
      });
    }, 500);
  });
}

// 获取评估任务详情
export async function getEvaluationTaskDetail(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟返回任务详情
      const mockDetail: TaskDetail = {
        id,
        taskName: `pre_training_data_curation_task_${id}`,
        taskDescription: '这是一个用于测试的评估任务描述，包含了详细的任务说明和要求。',
        datasetId: '1',
        datasetVersionId: '1',
        taskType: 'dual',
        evaluationTarget: {
          objectType: 'checkpoint',
          checkpointId: 'checkpoint_001',
          inferenceType: 'existing_data',
          inferenceResultSetId: '1',
        },
        comparisonTarget: {
          objectType: 'model_version',
          modelVersionId: '2',
          inferenceType: 'existing_data',
          inferenceResultSetId: '2',
        },
        evaluationMetrics: [
          { metricId: '1', weight: 100 },
          { metricId: '2', weight: 100 },
        ],
        status: 'draft',
        creator: '张三',
        createTime: '2025-07-15 10:00:00',
        updateTime: '2025-07-15 10:00:00',
      };

      resolve({
        code: 0,
        msg: 'Success',
        data: mockDetail,
      });
    }, 300);
  });
}

// ================ 统一评估提交接口 ================

// 新的统一提交数据类型
export interface UnifiedSubmitData {
  lineId: string;
  score: Array<{
    metricId: string;
    score: number;
  }>;
  comment?: {
    text?: string;
    images?: string[];
  };
}

// 统一的评估提交接口
export const submitTaskLineScoring = async (submitData: UnifiedSubmitData) => {
  console.log('🔗 [API] submitTaskLineScoring 请求参数:', submitData);

  try {
    const response = await request('/api/manual/compare/task/line/v1/scoring', {
      method: 'POST',
      data: submitData,
    });
    console.log('🔗 [API] submitTaskLineScoring 响应数据:', response);
    return response;
  } catch (error) {
    console.error('🔗 [API] submitTaskLineScoring 请求失败:', error);
    throw error;
  }
};

// ================ 新增接口函数 ================

/**
 * 获取训练任务列表
 */
export const getTrainingTasks = async (params: {
  pageNum?: number;
  pageSize?: number;
  status?: string; // 'all' | 'completed' | 'running' | 'pending' | 'failed'
  keyword?: string;
}) => {
  console.log('🔗 [API] getTrainingTasks 请求参数:', params);

  // 记录API调试信息
  ApiDebugger.logRequest('getTrainingTasks', params);

  // 判断是否使用Mock数据
  if (!shouldUseMock()) {
    // 生产环境调用真实API
    try {
      const apiUrl = `${getApiBaseUrl()}/api/training/tasks`;
      console.log('🌐 [getTrainingTasks] 调用真实API:', apiUrl);

      const response = await request(apiUrl, {
        method: 'GET',
        params: params,
      });

      ApiDebugger.logResponse('getTrainingTasks', response);
      return response;
    } catch (error) {
      console.error('🚨 [getTrainingTasks] API调用失败:', error);
      ApiDebugger.logError('getTrainingTasks', error);

      return {
        code: -1,
        msg: `API调用失败: ${error instanceof Error ? error.message : '网络错误'}`,
        data: null
      };
    }
  }

  // 开发环境使用Mock数据
  console.log('🎭 [getTrainingTasks] 使用Mock数据');
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = getTrainingTasksResponse(
        params.pageNum,
        params.pageSize,
        params.status
      );
      console.log('📥 [getTrainingTasks] Mock响应数据:', mockResponse);
      resolve(mockResponse);
    }, 300);
  });
};

/**
 * 获取单个训练任务详情
 */
export const getTrainingTaskDetail = async (taskId: string) => {
  console.log('🔗 [API] getTrainingTaskDetail 请求参数:', { taskId });

  // 记录API调试信息
  ApiDebugger.logRequest('getTrainingTaskDetail', { taskId });

  // 判断是否使用Mock数据
  if (!shouldUseMock()) {
    // 生产环境调用真实API
    try {
      const apiUrl = `${getApiBaseUrl()}/api/training/tasks/${taskId}`;
      console.log('🌐 [getTrainingTaskDetail] 调用真实API:', apiUrl);

      const response = await request(apiUrl, {
        method: 'GET',
      });

      ApiDebugger.logResponse('getTrainingTaskDetail', response);
      return response;
    } catch (error) {
      console.error('🚨 [getTrainingTaskDetail] API调用失败:', error);
      ApiDebugger.logError('getTrainingTaskDetail', error);

      return {
        code: -1,
        msg: `API调用失败: ${error instanceof Error ? error.message : '网络错误'}`,
        data: null
      };
    }
  }

  // 开发环境使用Mock数据
  console.log('🎭 [getTrainingTaskDetail] 使用Mock数据');
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = getTrainingTaskDetailResponse(taskId);
      console.log('📥 [getTrainingTaskDetail] Mock响应数据:', mockResponse);
      resolve(mockResponse);
    }, 200);
  });
};

/**
 * 获取工作负载选项列表
 */
export const getWorkloadOptions = async () => {
  console.log('🔗 [API] getWorkloadOptions 请求工作负载选项列表');

  // 记录API调试信息
  ApiDebugger.logRequest('getWorkloadOptions', {});

  // 判断是否使用Mock数据
  if (!shouldUseMock()) {
    // 生产环境调用真实API
    try {
      const apiUrl = `${getApiBaseUrl()}/api/workload/options`;
      console.log('🌐 [getWorkloadOptions] 调用真实API:', apiUrl);

      const response = await request(apiUrl, {
        method: 'GET',
      });

      ApiDebugger.logResponse('getWorkloadOptions', response);
      return response;
    } catch (error) {
      console.error('🚨 [getWorkloadOptions] API调用失败:', error);
      ApiDebugger.logError('getWorkloadOptions', error);

      return {
        code: -1,
        msg: `API调用失败: ${error instanceof Error ? error.message : '网络错误'}`,
        data: null
      };
    }
  }

  // 开发环境使用Mock数据
  console.log('🎭 [getWorkloadOptions] 使用Mock数据');
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = getWorkloadOptionsResponse();
      console.log('📥 [getWorkloadOptions] Mock响应数据:', mockResponse);
      resolve(mockResponse);
    }, 200);
  });
};
