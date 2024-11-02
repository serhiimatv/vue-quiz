import { createRouter, createWebHistory } from "vue-router";
import QuizBuilder from "./pages/QuizBuilder.vue";
import QuizView from "./pages/QuizView.vue";

const routes = [
  {
    path: "/",
    component: QuizView,
  },
  {
    path: "/builder",
    component: QuizBuilder,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});
