import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { ElMessage } from 'element-plus'

import QIANKUN from './qiankun'

const modules = {
  QIANKUN
}

const state = {
  title: '脚手架', // document.title默认值，用于router.js中不指定title的路由显示
  meta: {},
  user: {}
}

const getters = {}

const mutations = {
  SET_META (state: any, meta: {}) {
    state.meta = meta
  },
  SET_USER (state: any, user: {}) {
    state.user = user
  }
}

const actions = {
  // 轻提示
  showToast ({}, { type = 'success' as 'success' | 'warning' | 'info' | 'error', message = '操作成功~', duration = 3000 } = {}) {
    ElMessage({
      type,
      message,
      duration
    })
  },
  // async http ({ commit }, { service = 'gateway', api, query = {}, params = {}, handleError, success, error, complete }) { // 统一请求（简单查询返回使用）
  //   return await $http[service][api]({ query, params, handleError, success, error, complete })
  // }
}

const debug = import.meta.env.NODE_ENV !== 'production'

export default createStore({
  modules,
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState({ key: 'jingy-web-saas', storage: window.localStorage })],
  strict: debug
})
