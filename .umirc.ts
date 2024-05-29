import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    dark: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'panan-umi',
  },

  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    }
  ],
  npmClient: 'yarn',
});
