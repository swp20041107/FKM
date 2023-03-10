import { post, get } from '../untils/request'
import type { loginTypes, loginData } from '../types/login-type'
import type { IAdminType,IAdminDataType,IAdministratorroleType } from '../types/admin-type'
import type { IRecordsType, IRecordsData, IAddRecordType, IDeleRecordsType } from '@/types/records-type'
import type { IProductType,IProductTypeDataType } from '@/types/product-type'
// 登录
class login { 
  static Login(data:loginTypes){ 
    return post<loginData>('/api/admin/checklogin', data)
  }
}
// 商品
class product { 
  // 商品分类
  static productType(data:IProductType) {
    return get<IProductTypeDataType>('/api/productcat/list',data)
  }
  // 商品规格      用到的参数、返回的类型和商品分类一样所以使用他的接口
  static productNorms(data:IProductType) { 
    return get<IProductTypeDataType>('/api/productnorms/list',data)
  }
}
// 管理员
class admin { 
  // 管理员列表信息
  static Admin(data:IAdminType){ 
    return get<IAdminDataType>('/api/admin/list',data)
  }
}
// 大事记
class record { 
  // 获取列表
  static RecordsList(data:IRecordsType) { 
    return get<IRecordsData>('/api/records/list',data)
  }
  // 添加数据
  static addRecords(data:IAddRecordType) { 
    return post('/api/records/add',data)
  }
  // 删除数据
  static deleRecords(data:IDeleRecordsType) { 
    return get('/api/records/delete',data)
  }
}
export default {
  login,
  admin,
  record,
  product
}