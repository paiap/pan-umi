/*
 * @creater: panan
 * @message: 获取工作负载选项的 mock 数据
 * @since: 2025-07-10 12:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-17 16:19:52
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/api/mock/workloadOptions.ts
 */

// 工作负载选项的 mock 数据
export const mockWorkloadOptions = [
  {
    id: 'option_1',
    name: '轻负载',
    description: '适用于开发测试阶段的轻量化工作负载环境',
    maxInstances: 10,
    cpu: '2核',
    memory: '4GB',
    networkBandwidth: '1Gbps'
  },
  {
    id: 'option_2',
    name: '中等负载',
    description: '适用于中等规模应用的标准负载环境',
    maxInstances: 20,
    cpu: '4核',
    memory: '8GB',
    networkBandwidth: '5Gbps'
  },
  {
    id: 'option_3',
    name: '重负载',
    description: '适用于大型应用的高性能负载环境',
    maxInstances: 50,
    cpu: '8核',
    memory: '16GB',
    networkBandwidth: '10Gbps'
  }
];

// 获取工作负载选项的 mock 数据
export const getWorkloadOptionsResponse = () => {
  return {
    code: 0,
    msg: '获取工作负载选项成功',
    data: mockWorkloadOptions
  };
};
