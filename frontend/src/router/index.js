import Vue from 'vue'
import Router from 'vue-router'
import Portifolio from '@/components/Portifolio'
import NewStock from '@/components/NewStock'
import History from '@/components/History'
import Gains from '@/components/Gains'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'dashboard', component: Portifolio, meta: { title: 'Portfolio' }
    },
    {
      path: '/stock', component: NewStock, name: 'stock', meta: { title: 'New Stock' }
    },
    {
      path: '/history', component: History, name: 'history', meta: { title: 'History' }
    },
    {
      path: '/gains', component: Gains, name: 'gains', meta: { title: 'Gains' }
    }
  ]
})
