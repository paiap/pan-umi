/*
 * @creater: panan
 * @message: .umirc.ts
 * @since: 2024-05-29 17:00:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-05 17:22:47
 * @文件相对于项目的路径: /pan-umi/.umirc.ts
 */
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
  esbuildMinifyIIFE: true
});
