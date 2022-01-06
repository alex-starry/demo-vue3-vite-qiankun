const modules = {}

const state = {
  history: {}
}

const getters = {}

const mutations = {
  SET_HISTORY (state: any, history: any) {
    state.history = history
  }
}

const actions = {}

export default {
  namespaced: true,
  modules,
  state,
  getters,
  mutations,
  actions
}
