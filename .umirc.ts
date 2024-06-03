import { routes } from './src/pages/route';
import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    // dark: true,
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'panan-umi',
  },
  clientLoader: {}, //路由数据加载
  qiankun: {
    slave: {},
  },
  routes,
  npmClient: 'yarn',
});
