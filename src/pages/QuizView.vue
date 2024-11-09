<script setup lang="ts">
import { ref } from 'vue'
import type { Quiz } from '../models/quiz'
import { useRouter } from 'vue-router'

const router = useRouter()

const localStorageQuizString = localStorage.getItem('quiz')
const localStorageQuiz = localStorageQuizString ? JSON.parse(localStorageQuizString) : []

const quizzes = ref<Quiz[]>(localStorageQuiz)

const deleteQuiz = (id: string) => {
  const newQuizzes = quizzes.value.filter((quiz) => quiz.id !== id)
  quizzes.value = newQuizzes
  localStorage.setItem('quiz', JSON.stringify(newQuizzes))
}

const editQuiz = (id: string) => {
  router.push({ path: 'builder', query: { id } })
}
</script>

<template>
  <v-main class="my-10 px-15 d-flex justify-center items-center">
    <v-sheet :elevation="21" width="50%" class="pepper rounded-lg">
      <div class="d-flex flex-column ga-5">
        <div v-for="quiz of quizzes" class="list-item rounded-lg" :key="quiz.id">
          {{ quiz.title }}
          <div class="buttons">
            <v-btn icon="mdi-pencil" size="x-small" @click="editQuiz(quiz.id)" />
            <v-btn icon="mdi-delete" size="x-small" @click="deleteQuiz(quiz.id)" />
          </div>
        </div>
      </div>
    </v-sheet>
  </v-main>
</template>

<style scoped>
.pepper {
  padding: 20px;
}
.list-item {
  display: flex;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  border: 1px solid black;
  padding: 10px 20px;
  text-decoration: none;
  color: black;
}
.buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
</style>
