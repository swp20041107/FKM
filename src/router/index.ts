import App from '../App.vue'  //在这里注册一下pinia因为在router里pinia还没有被注册
import { createRouter, createWebHistory } from 'vue-router'
import store from '../stores'
const app = createApp(App)
app.use(store)
import useUserStore from '@/stores/user'
const user = useUserStore()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    }, {
      path: '/welcome',
      name: 'welcome',
      redirect:'/Records7',
      component: () => import('../views/Welcome.vue'),
      children: [
        {
          path: '/Records7',
          name: 'Records7',
          component: () => import('../views/Records7.vue'),
        }
      ]
    }
  ]
})
interface IITEM { 
  url: string,
  name: string,
  
}
// 前置路由守卫判断非法登录
router.beforeEach((to, from, next) => {
    //判断是否有权限返回登录界面
  if (to.path === '/login') {
    next()
  } else { 
    let token: string = sessionStorage.getItem('token') || ''
    // 判断有没有token如果有token就继续跳，没有就跳到登录页
    if (token) {
      //利用pinia刷新页面后数据丢失的特性来解决刷新页面动态路由消失的问题      
      if (user.paths.length === 0) {
        // 添加动态路由
        //  原路由
        let paths = JSON.parse(sessionStorage.getItem('paths') || '')
        user.paths = paths
        paths.forEach((item: IITEM) => {
          let name = item.url.substring(1)
          // 使用vite创建的项目添加动态路由时必须要使用glod导入方式
          const modules = import.meta.glob('../views/*.vue')
          let url = '../views' + item.url + '.vue'
          let path = {
            name: name,
            path: item.url,
            component: modules[url],
          }
          // 在welcome下面添加
          router.addRoute('welcome', path)
        })
        next({ ...to, replace: true })
      } else {
        next()
      }
    } else { 
      router.push({name:'login'})
    }
  }
})
export default router
