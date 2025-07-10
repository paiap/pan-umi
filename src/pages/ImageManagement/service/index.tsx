/*
 * @creater: panan
 * @message: 
 * @since: 2025-06-26 11:27:13
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-06-26 16:27:59
 * @文件相对于项目的路径: /pan-umi/src/pages/ImageManagement/service/index.tsx
 */
import axios from 'axios';

// 接口前缀，已适配本地代理
const BASE_URL = '/asset-market-backend';


/**
 * 分页查询镜像
 * @param params 查询参数
 */
export async function fetchMirrorPage(params: any): Promise<any> {
  const res = await axios.post(`${BASE_URL}/mirror/page`, params);
  return res.data;
}

/**
 * 创建开源镜像
 * @param params 创建参数
 */
export async function createOpenSourceMirror(params: any): Promise<any> {
  const res = await axios.post(`${BASE_URL}/mirror/create/open_source`, params);
  return res.data;
}

/**
 * 创建内部镜像
 * @param params 创建参数
 */
export async function createInternalMirror(params: any): Promise<any> {
  const res = await axios.post(`${BASE_URL}/mirror/create`, params);
  return res.data;
}

// 获取全量标签，/mirror/labels get请求
export async function fetchAllLabels(): Promise<any> {
  const res = await axios.get(`${BASE_URL}/mirror/labels`);
  return res.data;
}