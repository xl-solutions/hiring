import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Multiselect from 'vue-multiselect';

Vue.config.productionTip = false;

Vue.component('multiselect', Multiselect);


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
