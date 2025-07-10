/*
 * @creater: panan
 * @message: 
 * @since: 2025-05-14 17:45:13
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 18:23:31
 * @文件相对于项目的路径: /pan-umi/src/pages/StorageComponent/service/index.tsx
 */

// 分页接口 POST /sharestorage/page
interface a {
  name: string;
  proCode: string;
  creator: string;
  clusterCode: string;
  page: number;
  pageSize: number;
}

// 删除 DELETE /sharestorage/{id}/share
// 更新 无大修改，加上team

// 详情
// 获取共享存储详情 GET /sharestorage/{id}
// 取数据目录列表 GET /sharestorage/{id}/list_d
// 删除 DELETE /sharestorage/{id}/dataset
// 新增 POST /sharestorage/add_dataset
interface b {
  path: string;
  shareStorageId: string | number;
  owner: string;
  description: string;
}

// 获取个人空间列表 GET /sharestorage/{id}/list_user_workspace

// 删除 DELETE /sharestorage/{id}/user_workspace

// 新增 POST /sharestorage/add_dataset



// 查询共享存储关联的租户 GET  /sharestorage/{共享存储id}/tenant/list

// 添加租户绑定 POST  /sharestorage/{共享存储id}/tenant/add
interface c {
  tenantIds: number[]
}

// 删除租户绑定 DELETE  /sharestorage/{共享存储id}/tenant/remove
interface d {
  tenantIds: number[]
}


