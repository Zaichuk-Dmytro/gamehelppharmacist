import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: [],
  },
  mutations: {
  },
  actions: {
    async clientsApi() {
      return await import('@/api/clients.js').then(res => res.default)
    }
  },
  modules: {
  },
})
