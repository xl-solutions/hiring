import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ApiService from './service/ApiService';
import {ConfigClass} from './classes/ConfigClass';

let server = `${ConfigClass.getUrlApi().toString()}`;

Vue.prototype.$apiService = ApiService;
Vue.prototype.$server = server;

Vue.use(VueRouter);

Vue.config.productionTip = false

const routes = [
  {
    name: '/',
    path: '/',
    component: Home
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({mode: 'history', routes: routes});

new Vue({
  render: h => h(App),
  router 
}).$mount('#app')
