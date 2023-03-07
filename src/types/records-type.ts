export interface IRecordsType { 
  key:string
  typeid:number	
  page:number	
  psize:number
}
export interface IRecordsData { 
  counts: number
  pageCounts: number
  pageSize: number
  list: Array<object>
}
export interface IAddRecordType { 
  id: number
  state:number
  title:string
  typeid: number
  photo: string
  commont: string
  addtime:string
  content: string
  videos?: Array<object>
  pictures?:Array<object>
}