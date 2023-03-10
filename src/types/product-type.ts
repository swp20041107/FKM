// 商品类型接口
export interface IProductType{ 
  page: number
  psize:number
}
// 返回的数据接口
export interface IProductTypeDataType{ 
  pacounts: number
  pageCounts: number
  pageSize: number
  list:[]
}