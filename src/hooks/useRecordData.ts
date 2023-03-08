import api from '@/api/index'
import type { IRecordsType } from '@/types/records-type'
/**
 * 
 * @getTable 获取大事记表格数据
 * @tableColumn 表格列表
 */
let tableColumn = [
    {
      id: 0,
      prop: 'id',
      label: 'id'
    },
    {
      id: 1,
      prop: 'title',
      isSlot: false,
      label: '标题'
    },
    {
      id: 2,
      prop: 'comment',
      isSlot: false,
      label: '描述'
    },
    {
      id: 3,
      prop: 'photo',
      isSlot: true,
      label: '图片',
      slotName: 'img'
    },
    {
      id: 4,
      prop: 'content',
      isSlot: false,
      label: '内容'
    },
    {
      id: 5,
      prop: '',
      isSlot: true,
      label: '操作',
      slotName: 'button'
    }
]
async function getTable(query: IRecordsType) { 
  interface ITableData { 
    tableData: Array<object> | undefined
    counts:number | undefined
  }
  let data:ITableData = reactive({
    tableData: [],
    counts:0
  })
  let res: any = await api.record.RecordsList(query)
  if (res.errCode === 10000) {
    data.tableData = res.data.list
    data.counts = res.data.counts
  } else { 
    ElMessage.error(res.errMsg)
  }
 
  return data
}
export default {
  getTable,
  tableColumn
}