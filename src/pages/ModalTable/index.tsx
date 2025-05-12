/*
 * @creater: panan
 * @message: 
 * @since: 2025-05-08 10:58:50
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-05-08 14:00:12
 * @文件相对于项目的路径: /pan-umi/src/pages/ModalTable/index.tsx
 */
// ModalTable
import { Button, Modal } from 'antd';
import React, { FC, useMemo, useState } from 'react'
import ModelDetailTable from './ModelDetailTable';
import TrainDetailTable from './TrainDetailTable';
import AssessmentDetailTable from './AssessmentDetailTable';
import CoverageDetailTable from './CoverageDetailTable';
import DataDetailTable from './DataDetailTable';
import { formatNumber } from '@/utils/format';

interface Props {
  type: 'modelDetail' | 'trainDetail' | 'assessmentDetail' | 'coverageDetail' | 'dataDetail';// 弹窗类型
  // 模型详情、训练详情、评估详情、覆盖率详情、数据详情
  text: string | number;
  record: any;
}

// 根据type值映射组件
const ModalTableMap = {
  modelDetail: ModelDetailTable,
  trainDetail: TrainDetailTable,
  assessmentDetail: AssessmentDetailTable,
  coverageDetail: CoverageDetailTable,
  dataDetail: DataDetailTable,
}

const ModalTableTitleMap = {
  modelDetail: '模型详情',
  trainDetail: '训练详情',
  assessmentDetail: '评估详情',
  coverageDetail: '覆盖率详情',
  dataDetail: '数据详情',
}
const ModalTable: FC<Props> = ({ type, text, record }) => {


  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  }

  const renderModalTable = useMemo(() => {
    if (!open) return null;
    const Component = ModalTableMap[type as keyof typeof ModalTableMap];
    return Component ? <Component record={record} /> : null;
  }, [type, record, open])

  // 使用formatNumber函数格式化显示的数字
  const formattedText = useMemo(() => {
    if (typeof text === 'number') {
      return formatNumber(text);
    }
    return text;
  }, [text]);

  return (
    <>
      <Button type='link' onClick={openModal}>{formattedText}</Button>
      <Modal
        open={open}
        title={ModalTableTitleMap[type as keyof typeof ModalTableTitleMap] || ''}
        onCancel={closeModal}
        footer={null}
        width={1200}
      >
        {renderModalTable}
      </Modal>
    </>
  )
}

export default ModalTable
