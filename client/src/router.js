import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => import(`views/${component}.vue`)
}

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: load('layouts/default'),
      children: [
        {
          path: '/portfolio',
          component: load('pages/stocks/portfolio')
        },
        {
          path: '/history',
          component: load('pages/stocks/history')
        }
      ]
    }
  ]
})
