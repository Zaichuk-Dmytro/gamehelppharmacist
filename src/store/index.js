import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: [],
    medicines: [
      {name: 'Препарат 1', value: 'UNHAPPY'},
      {name: 'Препарат 2', value: 'HAPPY'},
      {name: 'Препарат 3', value: 'HEART'},
    ],
    result: { 
      UNHAPPY: [],
      HAPPY: [],
      HEART: []
    },
  }, 
  getters: {
    getMedicines(state) {
      return state.medicines
    },
    getResult(state) {
      return state.result
    },
    clientLength(state) {
      return state.clients.length
    }
  },
  mutations: {
    clearResult(state) {
      state.result = {
        UNHAPPY: [],
        HAPPY: [],
        HEART: []
      }
    },

    recordResults(state, payload) {
      state.result[payload.value].push(payload)
    },
    addClients(state, payload) {
      state.clients = payload
    }
  },
  actions: {
    async clientsApi(store) {
      let clients = await import('@/api/clients.js').then(res => res.default)      
      store.commit('addClients', clients)
      return clients
    }
  },
  modules: {
  },
})
