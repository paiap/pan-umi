import React, { useState } from 'react';
import { Tabs, Input, Button } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import TaskTagModal from './TaskTagModel';

const PanTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('1');
  const [panes, setPanes] = useState<{ key: string; title: string; editable: boolean }[]>([
    { key: '1', title: 'Tab 1', editable: false },
  ]);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newKey = `${panes.length + 1}`;
    const newPanes = [...panes, { key: newKey, title: `Tab ${newKey}`, editable: false }];
    setPanes(newPanes);
    setActiveKey(newKey);
  };

  const remove = (targetKey: any) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent  | string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const updateTitle = (key: string, newTitle: string,editable:boolean ) => {
    const newPanes = panes.map(pane => {
      if (pane.key === key) {
        return { ...pane, title: newTitle, editable};
      }
      return pane;
    });
    setPanes(newPanes);
  };

  const toggleEditable = (key: string, editable: boolean) => {
    const newPanes = panes.map(pane => {
      if (pane.key === key) {
        return { ...pane, editable };
      }
      return pane;
    });
    setPanes(newPanes);
  };

  const items = panes.map((pane, index) => ({
    label: pane.editable ? (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          value={pane.title}
          onChange={e => updateTitle(pane.key, e.target.value, true)}
          style={{ width: '100px' }}
        />
        <Button
          icon={<CheckOutlined />}
          onClick={() => updateTitle(pane.key, pane.title, false)}
          style={{ marginLeft: 8 }}
        />
      </div>
    ) : (
      <div onClick={() => toggleEditable(pane.key, true)}>{pane.title}</div>
    ),
    key: pane.key,
    closable: index !== 0,
  }));

  return (
    <div>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        hideAdd
      />
      <Button onClick={add} type="dashed" style={{ marginTop: 16 }}>
        <PlusOutlined /> 新增标签页
      </Button>

      <TaskTagModal record={{}} refresh={() => {
        console.log('refresh');
      }}/>
    </div>
  );
};

export default PanTabs;