import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import prive from '../untils/prive'
const useUserStore = defineStore('user', {
  state: () => { 
    return {
      token: '',
      menus: [],//所有权限
    }
  },
  persist: { // 自定义持久化方式
    storage: window.sessionStorage,//存储的位置
  },
  getters: {
    // 一级菜单，用户可以使用的功能，根据登陆账号来进行筛选
    power():Array<object> { 
      return this.menus.filter((item:any)=> { 
        return item.pid === 0
      })
    }
  },
  actions: {
    // 通过名字获取功能
    OWNPRIV(name: string) {
      let arr = prive.getownpriv(name) as any[]
      return arr
    }
  }
})
export default useUserStore