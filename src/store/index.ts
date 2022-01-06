import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import QIANKUN from './qiankun'

const modules = {
  QIANKUN
}

const state = {
  defaultTitle: '脚手架' // document.title默认值，用于router.js中不指定title的路由显示
}

const getters = {}

const mutations = {
  SET_BROWSER (state: any, browser: {}) {
    state.browser = browser
  }
}

const actions = {
  // 轻提示
  showToast ({}, { type = 'html', message = '操作成功~', duration = 3000 } = {}) {
    
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
