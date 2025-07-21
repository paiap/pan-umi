/*
 * @creater: panan
 * @message: route
 * @since: 2024-05-30 20:14:26
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-15 20:28:58
 * @文件相对于项目的路径: /pan-umi/src/pages/route.tsx
 */
export const routes = [
  {
    name: '首页',
    path: '/',
    component: './Home',
    access: 'home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: '人工评估',
    path: '/ManualAssessment',
    component: './ManualAssessment',
  },
  {
    path: '/ManualAssessment/detail/:id',
    name: '人工评估详情',
    component: './ManualAssessment/pages/AssessmentDetail',
    menu: false
  },
  {
    path: '/ManualAssessment/multiDetail/:id',
    name: '人工评估多对比详情',
    component: './ManualAssessment/pages/AssessmentMultiDetail',
    menu: false
  },
  {
    path: '/ManualAssessment/singleDetail/:id',
    name: '单个评估详情',
    component: './ManualAssessment/pages/AssessmentSingleDetail',
    menu: false
  },
  {
    path: '/ManualAssessment/singleCompareDetail/:assessmentId/content/:contentId',
    component: './ManualAssessment/pages/AssessmentSingleCompareDetail',
    name: '单个评估内容详情',
    menu: false
  },
  {
    path: '/ManualAssessment/multiDetail/:assessmentId/content/:contentId',
    component: './ManualAssessment/pages/AssessmentMultiCompareDetail',
    name: '多对比内容详情',
    menu: false
  },
  {
    path: '/ManualAssessment/multiDetail/task_1/content/:lineId',
    component: './ManualAssessment/pages/AssessmentMultiCompareDetail',
    name: '多对比内容详情(旧版)',
    menu: false
  },
  {
    path: '/manual-assessment/create',
    name: '创建人工评估任务',
    component: './ManualAssessment/pages/CreateEvaluationTask',
    menu: false
  },
  {
    path: '/manual-assessment/edit/:id',
    name: '编辑人工评估任务',
    component: './ManualAssessment/pages/CreateEvaluationTask',
    menu: false
  },
  {
    path: '/manual-assessment/metrics',
    name: '评估指标管理',
    component: './ManualAssessment/EvaluationMetricsPage',
  },
  {
    name: '镜像管理',
    path: '/imageManagement',
    component: './ImageManagement',
  },
  {
    name: 'AntdForm生成器',
    path: '/antdform',
    component: './AntdForm',
  },
  {
    name: 'Markdown编辑器',
    path: '/markdown',
    component: './MarkdownEdit',
  },
  {
    name: '模型列表',
    path: '/ModelList',
    component: './ModelList',
  },
  {
    name: 'json-editor-ajrm',
    path: '/jsoneditor',
    component: './JsonEditor',
  },
  {
    name: '卡片效果',
    path: '/divback',
    component: './DivBack',
  },
  {
    name: '前端-QuickReference',
    path: '/quickreference',
    component: './QuickReference',
  },
  {
    name: 'Ahooks',
    path: '/ahooks',
    component: './Ahooks',
  },
  {
    name: '文件预览',
    path: '/fileviewer',
    component: './Fileviewer',
  },
  {
    name: '文件预览-新交互',
    path: '/fileviewerNew',
    component: './FileviewerNew',
  },
  {
    name: '评估报告',
    path: '/assessment',
    component: './AssessmentReport',
  },
  {
    name: '模型表现',
    path: '/modelperformance',
    component: './ModelPerformance',
  },
  {
    name: 'test',
    path: '/test',
    component: './Test',
  },
  {
    name: 'form',
    path: '/formtest',
    component: './FormTest',
  },
  {
    name: '交互式建模',
    path: '/interactive',
    component: './InteractiveModel',
  },
  {
    name: '新建交互式建模',
    path: '/addinteractive',
    component: './InteractiveModel/AddInteractive',
  },
  {
    name: '网络拓扑图',
    path: '/networktopologydiagram',
    component: './NetworkTopologyDiagram',
  },
  {
    name: '网络拓扑图-新',
    path: '/network',
    component: './NetWork',
  },
  {
    name: '数据挖掘',
    path: '/dataminer',
    component: './Dataminer',
  },
  {
    path: '/dataminer/config/:id',
    name: '配置详情',
    component: './Dataminer/Config',
    menu: false
  },
  {
    path: '/conpoments',
    name: '小组件',
    component: './Conpoments',
  },
  {
    path: '/filterSetting',
    name: '筛选条件配置',
    component: './FilterSetting',
  },
  {
    path: '/assessmentdetail',
    name: '评估详情',
    component: './AssessmentDetail',
  },
  {
    path: '/qualityscoring',
    name: '评估详情',
    component: './QualityScoring',
  },
  {
    path: '/pantabs',
    name: '可编辑tabs',
    component: './PanTabs',
  },
  {
    path: '/monacoEditor',
    name: '编辑器',
    component: './MonacoEditor',
  },
  {
    path: '/baseTable',
    name: '基础表格',
    component: './BaseTable',
  },
  {
    path: '/createModel',
    name: '创建模型',
    component: './CreateModel',
  },
  {
    path: '/createForm',
    name: '创建模型表单',
    component: './CreateModel/CreateForm',
  },
  {
    path: '/BillsTable',
    name: 'tpc账单',
    component: './BillsTable',
  },
  {
    path: '/image',
    name: '镜像管理',
    component: './ImageTest',
  },
  {
    path: '/AlgorithmSuite',
    name: '算法组概览',
    component: './AlgorithmSuite',
  },
  {
    path: '/LlmEvalComponent',
    name: 'llm-eval组件聚类',
    component: './LlmEvalComponent',
  },
  {
    path: '/ExperimentalConclusion',
    name: '实验组',
    component: './ExperimentalConclusion',
  },
  {
    path: '/ModalTableTest',
    name: '表格弹窗组件',
    component: './ModalTableTest',
  },
  {
    path: '/storage',
    name: '共享存储',
    component: './StorageComponent',
  },
  {
    path: '/storagedetail',
    name: '共享存储详情',
    component: './StorageDetail',
  },
  {
    path: '/datasetTable',
    name: '数据集弹窗',
    component: './DatasetTable',
  },
]