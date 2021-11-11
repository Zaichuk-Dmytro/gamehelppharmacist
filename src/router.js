import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',  
    component: () => import('./pages/StartGame.vue'),   
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('./components/game.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
