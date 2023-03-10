// 后台给我们的数据类型如下
// 泛型T指定了Response类型中result的类型，默认为any
export interface Response<T = any> {
  // 描述
  errCode: number
  errMsg: string
  // 返回的数据
  data?: T
}