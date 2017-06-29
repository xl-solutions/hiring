import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueMask from 'v-mask'
import VueMaterial from 'vue-material'
import Vue2Filters from 'vue2-filters'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VueMask)
Vue.use(Vue2Filters)

Vue.http.options.root = 'http://localhost:8888/stocks'

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
