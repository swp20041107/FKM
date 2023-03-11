// 添加商品接口
interface IPrices { 
  price:string
  pic:string 
  proPackage:string 
  proPackageIds:string
}
export interface IProductAddType { 
  id:number
  name:string
  photo:string 
  comment: string
  catid:string
  info:string
  displayOrder:string 
  videos?: {}[]
  pictures?: {} []
  prices: Array<IPrices>
}
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