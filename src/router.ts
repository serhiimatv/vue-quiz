import { createRouter, createWebHistory } from 'vue-router'
import QuizBuilder from './pages/QuizBuilder.vue'
import QuizList from './pages/QuizList.vue'
import Quiz from './pages/Quiz.vue'

const routes = [
  {
    path: '/',
    component: QuizList,
  },
  {
    path: '/builder',
    component: QuizBuilder,
  },
  {
    path: '/quiz/:id',
    component: Quiz,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})
