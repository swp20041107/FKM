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
      component: () => import('../views/Welcome.vue')
    }
  ]
})
// 添加动态路由
let arr = JSON.parse(sessionStorage.getItem('paths')||'')
arr.forEach((item: any) => { 
  if (item.url === '/records/7' || item.url === '/records/6') { 
    console.log(item.url.substring(0,1))
  }
  console.log(item)
  // 在welcome下面添加
  router.addRoute('welcome', {
    name: `${item.name}`,
    redirect: `/records/7`,
    path:`${item.url}`
  })
})

// 前置路由守卫判断非法登录
router.beforeEach((to, from, next) => {
    //判断是否有权限返回登录界面
  if (to.path === '/login') {
    next()
  } else { 
    // 判断有没有token如果有token就继续跳，没有就跳到登录页
    let token: string = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '').token : ''
    if (token) {
      next()
    } else { 
      router.push({name:'login'})
    }
  }
})
export default router