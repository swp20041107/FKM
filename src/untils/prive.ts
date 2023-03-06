
// 通过一级菜单名字来获取菜单下的功能
const getownpriv = (modulename: string): Array<object> => { 
  let menus = JSON.parse(sessionStorage.getItem('user') || '').menus
  let power = menus.filter((item:any) => item.pid ===0)
  let module = power.filter((item:any) => item.name === modulename)  
  return menus.filter((item:any) => item.pid == module[0].id)
}
interface IITEM{
  url: string,
  pid:number
}
// 处理路由(带/和尾部为数字)
const getpaths = (data:any) => { 
  let arr: Array<object> = data.filter((item: IITEM) => {
      return item.url !== '' && item.pid !== 0
    })
    // 中间没有带/，尾部不是数字的路由
    let arr1: Array<object> = arr.filter((item:any) => { 
      // 如果结尾不是数值并且/只出现了一次就返回
      return isNaN(Number(item.url.slice(-1))) === true && item.url.lastIndexOf('/') === 0
    })
    // 带/，数值结尾的路由
    let arr2: Array<object>= arr.filter((item: any) => {
      return isNaN(Number(item.url.slice(-1))) === false && item.url.lastIndexOf('/') !==0
    })
    // 将数值结尾带/的url转为不带/的
    arr2.forEach((item: any) => { 
      // 在/处分割字符串然后在通过''合并成字符串重新赋给item里url
      item.url = '/'+item.url.split('/').join('')
    })
    // 合并数组 处理完成的数组
    let detailArr = arr1.concat(arr2)
    detailArr.forEach((item: any):void => {
      item.url = item.url.substring(1, 2).toUpperCase() + item.url.substring(2) 
    })
  return detailArr
}
export default {
  getownpriv,
  getpaths
}