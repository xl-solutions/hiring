import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Quote from "../views/Quote.vue";
import Gains from "../views/Gains.vue";
import History from "../views/History.vue";
import Compare from "../views/Compare.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/", name: "Quote", component: Quote },
  { path: "/gains", name: "Gains", component: Gains },
  { path: "/history", name: "History", component: History },
  { path: "/compare", name: "Compare", component: Compare },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
