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
    path: '/game-page',
    name: 'game-page',
    component: () => import('./pages/GamePage.vue'),
  },
  {
    path: '/results-page',
    name: 'results-page',
    component: () => import('./pages/ResultsPage.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
