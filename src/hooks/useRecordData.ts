import api from '@/api/index'
import type { IRecordsType,IRecordsData } from '@/types/records-type'
import type { Response } from '@/types/common-type'
/**
 * 
 * @getTable 获取大事记表格数据
 * @tableColumn 表格列表
 */
// 表格列表数据
//#region
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
//#endregion
// 获取表格数据
 interface ITableData { 
    tableData: Array<object> | undefined
    counts:number | undefined
  }
//#region 
async function getTable(query: IRecordsType) { 
  let data:ITableData = reactive({
    tableData: [],
    counts:0
  })
  let res: Response<IRecordsData> = await api.record.RecordsList(query)
  if (res.errCode === 10000) {
    data.tableData = res.data?.list
    data.counts = res.data?.counts
  } else { 
    ElMessage.error(res.errMsg)
  }
 
  return data
}
//#endregion
// 删除表格数据
// 删除
//#region
function dele(id: number, query: IRecordsType) {
  let data: ITableData = reactive({
    tableData: [],
    counts:0
  })
  return ElMessageBox.confirm('请问您确定要删除当前数据吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      //如果删除了数据就重新请求接口更新页面
      let res:any = await api.record.deleRecords({ id:id })
      if (res.errCode === 10000) {
        ElMessage.success('删除成功')
        let val = await getTable(query)
        data.counts = val.counts  
        data.tableData = val.tableData
        return data
      } else {
        ElMessage.error(res.errMsg)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消操作'
      })
    })
}
//#endregion

export default {
  getTable,
  tableColumn,
  dele
}