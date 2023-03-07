import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
interface IState { 
  isCollapse:boolean
}

const useCommonStore = defineStore('common', {
  state: () => { 
    return {
      isCollapse:false
    } as IState
  },

  getters: {
  },
  actions: {
 
  }
})
export default useCommonStore