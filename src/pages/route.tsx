export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
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
    path: '/reacteditor',
    component: './ReactEditor',
  },
]