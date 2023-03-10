/**
 * 
 * @debounce 防抖函数
 */

//防抖函数
type CallbackFn = (item?: any) => void
let timer: any = null
export function debounce (Callback: CallbackFn, delay = 500) {
  timer != null ? clearTimeout(timer) : null
  timer = setTimeout(() => {
    Callback && Callback() //当有值才会执行
  }, delay)
}

