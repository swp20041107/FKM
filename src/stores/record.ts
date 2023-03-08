// 大事记
import { defineStore } from 'pinia'


interface IState { 
  isDrawer:boolean
}
const useRecordStore = defineStore('record', {
  state: () => { 
    return {
      // 控制抽屉效果显示隐藏
      isDrawer:false
    } as IState
  },
  getters: {
   
  },
  actions: {
 
  }
})
export default useRecordStore