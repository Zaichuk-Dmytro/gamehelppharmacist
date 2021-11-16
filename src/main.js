import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import mainScss from './styles/main.scss'

Vue.config.productionTip = false

Vue.config.productionTip = false
const req = require.context('@/components', true, /\.(js|vue)$/i)
req.keys().map(key => {
  if (!(req(key).default || {}).name) {
    return
  }
  Vue.component(req(key).default.name, req(key).default)
})

const req1 = require.context('@/pages', true, /\.(js|vue)$/i)
req1.keys().map(key => {
  if (!(req1(key).default || {}).name) {
    return
  }
  Vue.component(req1(key).default.name, req1(key).default)
})

const req2 = require.context('@/assets', true, /\.(js|vue)$/i)
req2.keys().map(key => {
  if (!(req2(key).default || {}).name) {
    return
  }
  Vue.component(req2(key).default.name, req2(key).default)
})


new Vue({
  router,
  store,
  mainScss,
  render: (h) => h(App),
  created() {
    if (sessionStorage.redirect) {
      const redirect = sessionStorage.redirect
      delete sessionStorage.redirect
      this.$router.push(redirect)
    }
  }
}).$mount('#app')
