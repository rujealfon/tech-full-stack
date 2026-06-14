import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/task/:id",
      component: () => import("../views/TaskView.vue"),
    },
    {
      path: "/task/:id/edit",
      component: () => import("../views/TaskEditView.vue"),
    },
  ],
});
