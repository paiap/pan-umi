// mockApi.ts
// 人工评估详情页相关mock接口

/**
 * 接口1：获取评估任务详情
 * @param {string} id 评估任务id
 */
export const fetchAssessmentDetail = async (id: string) => {
  // 模拟数据
  return {
    id,
    name: `人工评估任务-${id}`,
    total: 20,
    finished: 8,
    unfinished: 12,
    score: {
      truth: 3.5,
      usability: 4.2,
      consistency: 3.8,
    },
    tabList: [
      { type: 'all', count: 20, firstId: '1' },
      { type: 'finished', count: 8, firstId: '2' },
      { type: 'unfinished', count: 12, firstId: '3' },
    ],
  };
};

/**
 * 接口2：发布成绩
 * @param {string} id 评估任务id
 * @param {object} score 打分情况
 */
export const publishAssessmentScore = async (id: string, score: any) => {
  // 模拟发布
  return { success: true };
};

/**
 * 接口3：获取评估内容详情
 * @param {string} type all/finished/unfinished
 * @param {string} contentId 内容id
 */
export const fetchAssessmentContent = async (type: string, contentId: string) => {
  // 模拟内容
  return {
    contentId,
    prompt: '请对以下内容进行评估',
    expected: '期望模型输出xxx',
    modelAnswer: '模型实际输出yyy',
    score: {
      truth: 3,
      usability: 4,
      consistency: 2,
    },
    prevId: contentId === '1' ? '' : String(Number(contentId) - 1),
    nextId: contentId === '20' ? '' : String(Number(contentId) + 1),
  };
};

/**
 * 接口4：提交打分
 * @param {string} contentId 内容id
 * @param {object} score 打分
 */
export const submitAssessmentScore = async (contentId: string, score: any) => {
  // 模拟提交
  return { success: true };
};