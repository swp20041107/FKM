//引入axios
import axios,{AxiosError, type AxiosRequestConfig,type AxiosResponse} from 'axios'
//使用指定配置创建axios实例
const instance = axios.create({
  // 基础路径
  baseURL: 'http://www.eshareedu.cn/fkm',
  // 请求超时时间
  timeout: 5000,
  // ....其他配置
})
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 10000 // 请求成功
}

// 后台给我们的数据类型如下
// 泛型T指定了Response类型中result的类型，默认为any
type Response<T = any> = {
  // 描述
  errCode:string
  errMsg: string
  // 返回的数据
  data?: T
}

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    let token = sessionStorage.getItem('token')||''
        return {
          ...config,
          headers: {
            Authorization: token // 请求头中携带token信息
          }
        }
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )

// 添加响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
        const { data, config } = response // 解构
        if (data.errCode === RequestEnums.OVERDUE) { //如果等于600就代表登录失败
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          sessionStorage.setItem('token', '')
          // router.replace({
          //   path: '/login'
          // })
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.errCode && data.errCode !== RequestEnums.SUCCESS) {
          ElMessage.error(data.errMsg) // 此处也可以使用组件提示报错信息
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          console.log(response)
        }
        if (!window.navigator.onLine) {
          ElMessage.error('网络连接失败')
          // 可以跳转到错误页面，也可以不做操作
          // return router.replace({
          //   path: '/404'
          // });
        }
      }
    )

// 普通封装
//#region
// AxiosRequestConfig从axios中导出的，将config声明为AxiosRequestConfig，这样我们调用函数时就可以获得TS带来的类型提示
// 泛型T用来指定Reponse类型中result的类型
// function request<T> (config: AxiosRequestConfig):Promise<Response<T>> {
  // 指定promise实例成功之后的回调函数的第一个参数的类型为Response<T>
  // return new Promise<Response<T>>((resolve, reject) => {
    // instance是我们在上面创建的axios的实例
    // 我们指定instance.request函数的第一个泛型为Response，并把Response的泛型指定为函数的泛型T
    // 第二个泛型AxiosResponse的data类型就被自动指定为Response<T>
    // AxiosResponse从axios中导出的，也可以不指定，TS会自动类型推断
    // instance.request<Response<T>>(config)
      // .then((res: AxiosResponse<Response<T>>) => {
      // response类型就是AxiosResponse<Response<T>>，而data类型就是我们指定的Response<T>
      // 请求成功后就我们的数据从response取出并使返回的promise实例的状态变为成功的
      // resolve(res.data)
    // }).catch((error :any) => {
      // 请求失败的处理
      // reject(error)
    // })
  // })
// }
//#endregion

// 四个常用请求封装
// post封装
export const post = <T>(url:string,params?:object): Promise<Response<T>> => { 
  return instance.post(url, params)
}
export const get = <T>(url: string, params?: object): Promise<Response<T>> => { 
  return instance.get(url, { params })
}
export const put = <T>(url: string, params?: object): Promise<Response<T>> => { 
  return instance.put(url,params)
}
export const del = <T>(url: string, params?: object): Promise<Response<T>> => { 
  return instance.delete(url, { params })
}