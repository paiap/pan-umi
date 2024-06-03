import { request } from '@umijs/max';

export const getModelList = async (params: any) => {
  return request('https://panan.usemock.com/list', {
    method: 'GET',
    params
  });
};
