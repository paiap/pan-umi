/*
 * @creater: panan
 * @message: 
 * @since: 2025-01-20 15:48:18
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-02-05 10:37:45
 * @文件相对于项目的路径: /pan-umi/src/pages/PanTabs/index.tsx
 */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  {
    children: 'Content of Tab 1',
    closable: false,
    name: 'Tab 1',
    editable: false
  },
  {
    children: 'Content of Tab 2',
    name: 'Tab 2',
    editable: false
  },
  {
    children: 'Content of Tab 3',
    name: 'Tab 3',
    editable: false
  },
];


const PanTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState<any>();
  const [items, setItems] = useState<any[]>([]);
  const newTabIndex = useRef(items?.length);

  const handleItemName = (key: string, keyword: string) => {
    const newItems = items.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          name: keyword
        }
      }
      return item;
    });
    setItems(newItems);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // const curItems = handleItemKeys(newItems);
    // setItems(curItems);
  }

  const handleItemEditable = (name: string, editable: boolean) => {
    const newItems = items.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          editable
        }
      }
      return item;
    });
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const curItems = handleItemKeys(newItems);
    setItems(curItems);
  }

  const handleItemKeys = (items: any[]) => {
    return items.map((item) => {
      return {
        ...item,
        key: item.name,
        label: (
          <>
            {
              item.editable ? (
                <Space>
                  <Input style={{ width: '100px' }} value={item.name} onChange={(e) => handleItemName(item.key, e.target.value)} />
                  <Button onClick={() => handleItemEditable(item.key, false)} type='link'>完成</Button>
                </Space>
              ) : (
                <Space>
                  <span>{item.name}</span>
                  <EditOutlined onClick={() => handleItemEditable(item.name, true)} />
                </Space>
              )
            }
          </>
        )
      };
    });
  }

  useEffect(() => {
    const curItems = handleItemKeys(initialItems);
    setItems(curItems);
  }, [])

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `New Tab ${newTabIndex.current++ + 1}`;
    const newPanes = [...items];
    newPanes.push({
      children: 'Content of new Tab',
      name: newActiveKey,
      editable: false
    });
    const curItems = handleItemKeys(newPanes);
    setItems(curItems);
    
    setActiveKey(newActiveKey);

  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};

export default PanTabs;