import { post, get } from '../untils/request'
import type { loginTypes, loginData } from '../types/login-type'
import type { IAdministratorrole} from '../types/admin-type'
class login { 
  static Login(data:loginTypes) { 
    return post('/api/admin/checklogin', data)
  }
}
class admin { 
  static Administratorrole(data:IAdministratorrole){ 
    return get('/api/administratorrole/list',data)
  }
}
class record { 
  static RecordsList(data:any) { 
    return get('/api/records/list')
  }
}
export default {
  login,
  admin,
  record
}