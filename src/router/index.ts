import store from '../store'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
