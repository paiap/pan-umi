/*
 * @creater: panan
 * @message: data
 * @since: 2024-06-05 20:21:07
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-05 21:06:26
 * @文件相对于项目的路径: /pan-umi/src/pages/AntdForm/init.tsx
 */

import { Input, Radio, Select } from "antd";

export const typeOptions = [
  {
    value: 1,
    label: 'Input',
  },
  {
    value: 2,
    label: 'Select',
  },
]

export const antdComponentsMap = {
  Input: Input,
  Select: Select,
  Radio: Radio
}