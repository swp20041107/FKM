import { post, get } from '../untils/request'
import type { loginTypes } from '../types/login-type'
class login { 
  static Login(data:loginTypes) { 
    return post('/api/admin/checklogin', data)
  }
}

export default {
  login
}