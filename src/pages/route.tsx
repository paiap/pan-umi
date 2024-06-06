/*
 * @creater: panan
 * @message: route
 * @since: 2024-05-30 20:14:26
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-05 17:18:11
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
    name: 'Markdown编辑器',
    path: '/markdown',
    component: './MarkdownEdit',
  },
  {
    name: 'AntdForm生成器',
    path: '/antdform',
    component: './AntdForm',
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

]