import Vue from 'vue';
import App from './App';
import router from './router/index';
import vueRes from 'vue-resource';
import store from './store/index';
Vue.use(vueRes);
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
