import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
function load (component) {
	return () => import(`@/components/${component}.vue`);
}
export default new VueRouter({
	mode: 'hash',
	scrollBehavior: () => ({ y: 0 }),
	routes: [{
		path: '/',
		name: 'home',
		component: load('Home')
	}]
});