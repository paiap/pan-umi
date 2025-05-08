// PanTreeSelect
import { TreeSelect } from 'antd';
import React, { useState } from 'react';

const mockData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: 'Grand Child1',
            value: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: 'Grand Child2',
            value: '0-0-0-1',
            key: '0-0-0-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node2',
        value: '0-1-0',
        key: '0-1-0',
      },
    ],
  },
];

const PanTreeSelect = () => {
  const [value, setValue] = useState<string[]>([]);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  return (
    <TreeSelect
      treeData={mockData}
      value={value}
      onChange={onChange}
      treeCheckable={true}
      showCheckedStrategy={TreeSelect.SHOW_PARENT}
      placeholder="请选择"
      treeDefaultExpandAll
      style={{ width: '100%' }}
    />
  );
}

export default PanTreeSelect

