/*
 * @creater: panan
 * @message: FilterSetting
 * @since: 2024-12-24 15:41:02
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-01-07 20:08:41
 * @文件相对于项目的路径: /pan-umi/src/pages/FilterSetting/index.tsx
 */

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, InputNumber, message, Radio, Row, Select, Slider, Space, Switch } from 'antd'
import React, { FC, useState, useEffect } from 'react'
interface Props {
  [key: string]: any
}
const initMap = [
  // 意图、主题
  {
    label: '意图',
    value: 'intent',
  },
  {
    label: '主题',
    value: 'theme',
  },
]
// 逻辑关系
const initLogic = [
  // 等于、不等于、包含、不包含、大于等于、小于等于、
  {
    label: '等于',
    value: 'equal',
  },
  {
    label: '不等于',
    value: 'notEqual',
  },
  {
    label: '包含',
    value: 'contain',
  },
  {
    label: '不包含',
    value: 'notContain',
  },
  {
    label: '大于等于',
    value: 'greaterEqual',
  },
  {
    label: '小于等于',
    value: 'lessEqual',
  },
]

const initData = [
  [
    {
      name: 'intent',
      logic: 'notEqual',
      value: [1, 2, 3]
    },
    {
      name: 'theme',
      logic: 'contain',
      value: [4, 5, 6]
    }
  ],
  [
    {
      name: 'intent',
      logic: 'lessEqual',
      value: ['AAA', 'BBB', 'CCC']
    },
    {
      name: 'theme',
      logic: 'lessEqual',
      value: ['DDD', 'EEE', 'FFF']
    }
  ]
]

const typeOptions = [
  // 剔除、保留
  {
    label: '剔除',
    value: 'remove',
  },
  {
    label: '保留',
    value: 'keep',
  },
]


import type { InputNumberProps } from 'antd';

export const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  return (
    <Row>
      <Col span={20}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 8px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};


const FilterSetting: FC<Props> = () => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [type, setType] = useState<string>('remove')
  const [executionMode, setExecutionMode] = useState<string>('auto')

  useEffect(() => {
    setDataSource(initData)
  }, [])

  const updateDataSource = (index: number, subIndex: number, key: string, value: any) => {
    const newData = [...dataSource]
    newData[index][subIndex][key] = value
    setDataSource(newData)
  }

  const addDataSource = () => {
    const newData = [...dataSource]
    newData.push([
      {
        name: undefined,
        logic: undefined,
        value: []
      },
    ])
    setDataSource(newData)
  }

  const addDataSourceItem = (index: number) => {
    const newData = [...dataSource]
    newData[index].push({
      name: undefined,
      logic: undefined,
      value: []
    })
    setDataSource(newData)
  }

  const deleteDataSourceItem = (index: number, subIndex: number) => {
    const newData = [...dataSource]
    newData[index].splice(subIndex, 1)
    setDataSource(newData)
  }

  const ShowNumber = (index: number) => {
    return (
      <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#1678fe', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{index + 1}</div>
    )
  }

  /**
   * @description: 点击事件
   * @param 
   * @return message提示最多展示三行
   */
  // const hadleCilck = () => {
  //   //随机给1000字字符串
  //   const str = '呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔呢就防护方便和U币方法手打NBDEVBFGERGBIRGBRGBIDS保护的成本发班干部二高版本和热U币发v额发v度表v额uVB额VB额v发热方便如果如果热风VR额v二隔热隔壁热u隔热隔壁热固人吧固然VB如VB人VB二付不热办法VR额发热管发热隔壁热IG热IG热IGgrtgbtrgbnfkmfplbi9enfijrebhurefbewfn分别热u根本热u好吧吧隔壁热U币额我不服IE我染发吧 何瑞部分i入额不规范二八嘎r诶八嘎如诶八嘎grbreibgewr9bg9ub rehf9urehgf9eruhfg9thr9eg9uregher9ugh9urehg热乎饭个如果好热u符合仍无法不饿不然热火锅入额更换热u戈贝尔'
  //   // 设置messgae最多展示三行，超过三行的省略号
  //   message.warning({
  //     content: (
  //       <div style={{
  //         //最多展示三行的css
  //         display: '-webkit-box',
  //         WebkitLineClamp: 3,
  //         WebkitBoxOrient: 'vertical',
  //         overflow: 'hidden',
  //         textOverflow: 'ellipsis',
  //       }}>
  //         {str}
  //       </div>
  //     )
  //   })
  // }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title={
            <Space>
              <div>筛选执行方式</div>
            </Space>
          }
        >
          <Radio.Group
            optionType='button'
            buttonStyle='solid'
            value={executionMode}
            onChange={(e) => {
              setExecutionMode(e.target.value)
            }}
          >
            {/* 自动筛选、人工筛选、全量保留 */}
            <Radio.Button value="auto">自动筛选</Radio.Button>
            <Radio.Button value="manual">人工筛选</Radio.Button>
            <Radio.Button value="all">全量保留</Radio.Button>
          </Radio.Group>
        </Card>
      </Col>
      {
        executionMode === 'auto' && (
          <>
            <Col span={24}>
              <Card
                title={
                  <Space>
                    <div>筛选条件配置</div>
                    <Button onClick={addDataSource} type='primary'>新增条件</Button>
                  </Space>
                }
                extra={
                  <Select
                    style={{ width: 120 }}
                    options={typeOptions}
                    value={type}
                    onChange={setType}
                  />
                }
              >
                <Space direction="vertical">
                  {
                    dataSource.map((item: any[], index) => {
                      return (
                        <Space direction="vertical" key={index}>
                          {
                            item?.map((subItem, subIndex) => {
                              return (
                                <Space key={subIndex}>
                                  {
                                    index === 0 && subIndex === 0 && ShowNumber(index)
                                  }
                                  {
                                    index !== 0 && subIndex === 0 && ShowNumber(index)
                                  }
                                  {
                                    subIndex !== 0 && <div>且</div>
                                  }
                                  <Select
                                    style={{ width: 80 }}
                                    options={initMap}
                                    placeholder='请选择'
                                    value={subItem.name}
                                    onChange={(value) => {
                                      updateDataSource(index, subIndex, 'name', value)
                                    }}
                                  />
                                  <Select
                                    style={{ width: 100 }}
                                    options={initLogic}
                                    value={subItem.logic}
                                    placeholder='请选择'
                                    onChange={(value) => {
                                      updateDataSource(index, subIndex, 'logic', value)
                                    }}
                                  />
                                  <Select
                                    mode="tags"
                                    style={{ width: 200 }}
                                    value={subItem.value}
                                    placeholder='请选择'
                                    onChange={(value) => {
                                      updateDataSource(index, subIndex, 'value', value)
                                    }}
                                    maxTagCount={3}
                                  />
                                  {
                                    subIndex === 0 && <Button
                                      type='link'
                                      onClick={() => {
                                        addDataSourceItem(index)
                                      }} icon={<PlusOutlined />}></Button>
                                  }
                                  <Button
                                    onClick={() => {
                                      deleteDataSourceItem(index, subIndex)
                                    }}
                                    danger
                                    type='link'
                                    icon={<DeleteOutlined />}></Button>
                                </Space>
                              )
                            })
                          }
                          <br />
                        </Space>
                      )
                    })
                  }
                </Space>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title={
                  <Space>
                    <div>数据采样配置</div>
                    <Switch />
                  </Space>
                }
              >
                <Space direction="vertical">
                  <Space>
                    <div>采样维度:</div>
                    {/* 多选的select组件 */}
                    <Select
                      // mode="tags"
                      mode='multiple'
                      style={{ width: 200 }}
                      placeholder='请选择'
                      options={initMap}
                      maxTagCount={2}
                    />
                  </Space>
                  <Space>
                    <div>每个维度采样值数量:</div>
                    <IntegerStep />
                  </Space>
                </Space>
              </Card>
            </Col>
          </>
        )
      }
      {
        executionMode === 'manual' && (
          <Col span={24}>
            <Card>
              {/* 居中显示：说明：任务执行到过滤环节时，会自动暂停任务，等待人工介入筛选数据 */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,

              }}>说明：任务执行到过滤环节时，会自动暂停任务，等待人工介入筛选数据</div>
            </Card>
          </Col>
        )
      }
      {
        executionMode === 'all' && (
          <Col span={24}>
            <Card>
              {/* 居中显示：说明：任务执行到过滤环节时，会自动暂停任务，等待人工介入筛选数据 */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,

              }}>说明：任务执行时，会直接跳过该步骤</div>
            </Card>
          </Col>
        )
      }
    </Row>
  )
}

export default FilterSetting
