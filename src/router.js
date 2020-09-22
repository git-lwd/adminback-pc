import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@pages/index/index.vue'),
    redirect: { name: 'Home' },
    children: [
      {
        path: '/home',
        name: "Home",
        component: () => import("@pages/index/home.vue"),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/user',
        name: "User",
        component: () => import("@pages/userIndex/user.vue"),
        meta: {
          title: '用户管理'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@pages/login/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@pages/login/register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('userToken')
  // 如果用户未能验证身份，则 `next` 会被调用两次
  if (to.name !== 'Login' && !token) next({ name: 'Login' })
  next()
})

export default router
