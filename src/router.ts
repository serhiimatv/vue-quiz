import { createRouter, createWebHistory } from 'vue-router'
import QuizBuilder from './pages/QuizBuilder.vue'
import QuizList from './pages/QuizList.vue'

const routes = [
  {
    path: '/',
    component: QuizList,
  },
  {
    path: '/builder',
    component: QuizBuilder,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})
