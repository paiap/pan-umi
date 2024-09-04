/*
 * @creater: panan
 * @message: columsn
 * @since: 2024-07-04 15:59:23
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-05 14:22:54
 * @文件相对于项目的路径: /pan-umi/src/pages/Fileviewer/columns.tsx
 */

export const initColumns = [
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name',
    width: 600
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
    width: 200,
    render: (size: number, record: any) => {
      if (record?.isDirectory === true) {
        return '-'
      }
      // size为字节大小，可转为KB、MB、GB
      if (size < 1024) {
        return `${size}B`
      } else if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(2)}KB`
      } else if (size < 1024 * 1024 * 1024) {
        return `${(size / 1024 / 1024).toFixed(2)}MB`
      } else if(size < 1024 * 1024 * 1024 * 1024) {
        return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`
      }else{
        return `${(size / 1024 / 1024 / 1024 / 1024).toFixed(2)}TB`
      }
      return null
    },
  },
  {
    title: '文件类型',
    dataIndex: 'type',
    key: 'type',
    render: (_: any, record: any) => <span>{record?.isDirectory === true ? '文件夹' : 'document'}</span>,
    width: 100
  },
  {
    title: '子文件数',
    dataIndex: 'fileCount',
    key: 'fileCount',
    render: (fileCount: number, record: any) => {
      if (record.isDirectory === true) {
        return fileCount
      }
      return '-'
    },
    width: 100
  },
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 200
  // },

]