import { createRouter, createWebHistory } from 'vue-router'
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
          component: () => import('../components/content/Records7/Records7.vue'),
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
    // 判断有没有token如果有token就继续跳，没有就跳到登录页
    let token: string = sessionStorage.getItem('token') || ''
    if (token) {
      next()
      // 添加动态路由
      //  原路由
      let paths = JSON.parse(sessionStorage.getItem('paths') || '')
      paths.forEach((item: IITEM) => {
        let name = item.url.substring(1)
        // 使用vite创建的项目添加动态路由时必须要使用glod导入方式
        const modules = import.meta.glob('../components/*/*/*.vue')
        let url = '../components/content/' + name + item.url + '.vue'
        // 在welcome下面添加
        router.addRoute('welcome',{
          name: item.name.substring(1),
          path: item.url,
          component: modules[url],
        })
      })
    } else { 
      router.push({name:'login'})
    }
  }
})
export default router
