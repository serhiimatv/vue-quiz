<script setup lang="ts">
import { useQuizBuilderStore } from '../store/useQuizBuilderStore'
import { QuestionTypes } from '../models/question'
import { questionTypesList } from '../constants'
import Question from '../components/Question.vue'
import { uuid } from 'vue-uuid'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { Quiz } from '../models/quiz'

const quizStore = useQuizBuilderStore()
const router = useRouter()

const handleClickAddQuestion = (type: QuestionTypes) => {
  quizStore.addQuestion(type)
}

const handleClickSaveQuiz = () => {
  if (router.currentRoute.value.query.id) {
    updateQuiz(router.currentRoute.value.query.id as string)
  } else {
    createQuiz()
  }

  router.push('/')
}

const createQuiz = () => {
  const quiz = {
    id: uuid.v4(),
    title: quizStore.quizTitle,
    questions: quizStore.questionList,
  }

  const localStorageQuizzes = localStorage.getItem('quiz')

  if (!localStorageQuizzes) {
    localStorage.setItem('quiz', JSON.stringify([quiz]))
  } else {
    const quizzes = JSON.parse(localStorageQuizzes)
    quizzes.push(quiz)
    localStorage.setItem('quiz', JSON.stringify(quizzes))
  }
}

const updateQuiz = (id: string) => {
  const quiz: Quiz = {
    id: id,
    title: quizStore.quizTitle,
    questions: quizStore.questionList,
  }

  const localStorageQuizzes = localStorage.getItem('quiz')

  if (localStorageQuizzes) {
    const quizzes = JSON.parse(localStorageQuizzes)
    const quizIndex = quizzes.findIndex((quiz: any) => quiz.id === id)

    if (quizIndex !== -1) {
      quizzes[quizIndex] = quiz
      localStorage.setItem('quiz', JSON.stringify(quizzes))
    }
  }
}

onMounted(() => {
  const quizId = router.currentRoute.value.query.id as string

  if (quizId) {
    const localStorageQuizzes = localStorage.getItem('quiz')
    if (localStorageQuizzes) {
      const quizzes = JSON.parse(localStorageQuizzes)
      const quiz = quizzes.find((quiz: any) => quiz.id === quizId)

      if (quiz) {
        quizStore.setQuiz(quiz)
      }
    }
  }
})

onUnmounted(() => {
  quizStore.eraseQuiz()
})
</script>

<template>
  <v-main class="px-10 pb-10">
    <h1 class="text-center">Конструктор</h1>
    <div class="d-flex ga-5 justify-start mt-5">
      <v-text-field max-width="350px" label="Назва вікторини" variant="outlined" v-model="quizStore.quizTitle" />
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn size="x-large" color="primary" :="props">Додати питання</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="type of questionTypesList"
            class="item-title"
            @click="handleClickAddQuestion(type.type)"
            :key="type.id"
          >
            <v-list-item-title>{{ type.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn size="x-large" color="primary" @click="handleClickSaveQuiz">Зберегти</v-btn>
    </div>
    <div class="d-flex flex-column ga-5">
      <Question v-for="question of quizStore.questionList" :question :key="question.id" />
    </div>
  </v-main>
</template>

<style scoped>
.item-title:hover {
  cursor: pointer;
  background-color: aqua;
}
</style>
