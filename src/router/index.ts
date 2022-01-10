import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import store from '../store'
import { IUser } from '../types'

const routes: Array<RouteRecordRaw> = [{
  path: '/', name: 'index', redirect: { name: 'welcome' }
}, {
  path: '/login', name: 'login', meta: { layout: 'blank' },
  component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
}, {
  path: '/welcome', name: 'welcome',
  component: () => import(/* webpackChunkName: "welcome" */ '../views/welcome.vue')
}, {
  path: '/:pathMatch(.*)*', name: '404',
  component: () => import(/* webpackChunkName: "404" */ '../components/404.vue')
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const user = store.state.user as IUser
  // 没有用户信息或者用户信息过期，访问非登录页时强制跳转登录页
  const now = Date.now()
  if ((!user || !user.id || now >= user.tokenExpires) && to.name !== 'login') {
    return next({ name: 'login' })
  }
  // 有用户信息并且用户信息过期，访问登录页时强制跳转欢迎页
  if (user && user.id && now < user.tokenExpires && to.name === 'login') {
    return next({ name: 'welcome' })
  }
  const meta = to.meta
  let title = meta.title
  if (!title) {
    title = store.state.title
  }
  store.commit('SET_META', meta)
  setTimeout(() => {
    document.title = title as string
  }, 0)
  next()
})

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {

})

export default router
