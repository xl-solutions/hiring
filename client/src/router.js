import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: load('layouts/DefaultLayout'),
      children: [
        {
          path: '/portfolio',
          component: load('pages/stocks/Portfolio')
        }, {
          path: '/history',
          component: load('pages/stocks/History')
        }, {
          path: '/gains',
          component: load('pages/stocks/Gains')
        }
      ]
    }
  ]
})
