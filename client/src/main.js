require(`quasar/dist/quasar.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = true
Vue.use(Quasar)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default)
  })
})
