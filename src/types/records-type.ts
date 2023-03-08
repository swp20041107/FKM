// 获取列表
export interface IRecordsType { 
  key:string
  typeid:number	
  page:number	
  psize:number
}
// 返回数据类型
export interface IRecordsData { 
  counts: number
  pageCounts: number
  pageSize: number
  list: Array<object>
}
// 添加数据
export interface IAddRecordType { 
  id: number
  state:number
  title:string
  typeid: number
  photo: string
  comment: string
  addtime:string
  content: string
  videos?: Array<object>
  pictures?:Array<object>
}
// 删除数据
export interface IDeleRecordsType { 
  id:number
}