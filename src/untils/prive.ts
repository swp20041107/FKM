
// 通过一级菜单名字来获取菜单下的功能
const getownpriv = (modulename: string): Array<object> => { 
  let menus = JSON.parse(sessionStorage.getItem('user') || '').menus
  let power = menus.filter((item:any) => item.pid ===0)
  let module = power.filter((item:any) => item.name === modulename)  
  return menus.filter((item:any) => item.pid == module[0].id)
}
export default {
  getownpriv
}