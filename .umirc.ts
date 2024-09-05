/*
 * @creater: panan
 * @message: .umirc.ts
 * @since: 2024-05-29 17:00:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-09-05 14:51:33
 * @文件相对于项目的路径: /pan-umi/.umirc.ts
 */
import { defineConfig } from '@umijs/max';
import { routes } from './src/pages/route';

export default defineConfig({
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  antd: {
    configProvider:{
      prefixCls: 'panan',
    }
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'panan-umi',
  },
  mfsu: {},
  runtimePublicPath: false,
  hash: true,
  fastRefresh: true,
  esbuildMinifyIIFE: true,
  clientLoader: {}, //路由数据加载
  clickToComponent:{},//开启后，可通过 Option+Click/Alt+Click 
  cssMinifier: 'esbuild',//配置构建时使用的 CSS 压缩工具: esbuild, cssnano, parcelCSS, none
  jsMinifier: 'esbuild',//配置构建时使用的 JS 压缩工具: esbuild, terser, uglifyjs, none
  qiankun: {
    slave: {},
  },
  routes,
  npmClient: 'yarn',
});
