import { post, get } from '../untils/request'
import type { loginTypes, loginData } from '../types/login-type'
import type { IAdministratorrole } from '../types/admin-type'
import type { IRecordsType,IRecordsData,IAddRecordType } from '@/types/records-type'
// 登录
class login { 
  static Login(data:loginTypes){ 
    return post<loginData>('/api/admin/checklogin', data)
  }
}
// 管理员
class admin { 
  static Administratorrole(data:IAdministratorrole){ 
    return get('/api/administratorrole/list',data)
  }
}
// 大事记
class record { 
  static RecordsList(data:IRecordsType) { 
    return get<IRecordsData>('/api/records/list',data)
  }
  static addRecords(data:IAddRecordType) { 
    return post('/api/records/add',data)
  }
}
export default {
  login,
  admin,
  record
}