import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import prive from '../untils/prive'
interface IITEM { 
  pid:number
}
interface IOWNPRIVE { 
  id: number,
  url: string,
  name:string
}
interface IState { 
  token: string
  menus: [],
  paths: {}[]
}
const useUserStore = defineStore('user', {
  state: () => { 
    return {
      token: '',
      menus: [],//所有权限
      paths:[]
    } as IState
  },
  persist: { // 自定义持久化方式
    storage: window.sessionStorage,//存储的位置
    paths:['token','menus']
  },
  getters: {
    // 一级菜单，用户可以使用的功能，根据登陆账号来进行筛选
    power():Array<object> { 
      return this.menus.filter((item:IITEM)=> { 
        return item.pid === 0
      })
    },
  },
  actions: {
    // 通过名字获取功能
    OWNPRIV(name: string) {
      let arr = prive.getownpriv(name) as IOWNPRIVE[]
      return arr
    },
   
  }
})
export default useUserStore