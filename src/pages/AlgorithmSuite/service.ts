/*
 * @creater: panan
 * @message: 算法组概览服务
 * @since: 2025-04-17 21:45:45
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-17 21:48:17
 * @文件相对于项目的路径: /pan-umi/src/pages/AlgorithmSuite/service.ts
 */

import { mockData } from './columns';

// 获取算法组概览数据
// 模拟接口响应
function mockApiResponse(params: any) {
  // 延迟模拟网络请求
  return new Promise((resolve) => {
    setTimeout(() => {
      // 根据视图类型过滤数据
      let filteredData = [...mockData];

      // 如果是算法组视图，需要按算法组聚合数据
      if (params.viewType === 'group') {
        // 这里简化处理，实际项目中应该进行数据聚合
        filteredData = mockData.filter((_, index) => index < 3);
      }

      // 如果指定了算法组，进行过滤
      if (params.algorithmGroup) {
        filteredData = filteredData.filter(
          (item) => item.algorithmGroup === params.algorithmGroup,
        );
      }

      // 如果是人员视图且指定了算法人员，进行过滤
      if (params.viewType === 'person' && params.algorithmPerson) {
        filteredData = filteredData.filter(
          (item) => item.algorithmPerson === params.algorithmPerson,
        );
      }

      // 如果指定了时间范围，进行过滤（实际项目中应该根据日期字段过滤）
      if (params.startDate && params.endDate) {
        // 这里简化处理，实际项目中应该进行日期比较
        // filteredData = filteredData.filter(item =>
        //   item.date >= params.startDate && item.date <= params.endDate
        // );
      }

      resolve({
        success: true,
        data: filteredData,
        total: filteredData.length,
      });
    }, 500); // 模拟500ms网络延迟
  });
}
export async function getAlgorithmOverview(params: any) {
  // 实际项目中应该调用真实接口
  // return request('/api/algorithm/overview', {
  //   method: 'GET',
  //   params,
  // });

  // 模拟接口响应
  return mockApiResponse(params);
}
