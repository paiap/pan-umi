/*
 * @creater: panan
 * @message: 
 * @since: 2024-05-29 17:00:15
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-28 21:18:19
 * @文件相对于项目的路径: /pan-umi/src/app.ts
 */
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

/**
 * @function message: 全局初始化数据配置
 * @return {*}
 */
export async function getInitialState(): Promise<{ name: string, user: string }> {
  return {
    name: 'panan-umi',
    user: 'panan',
  };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
