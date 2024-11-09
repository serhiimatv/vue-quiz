<script setup lang="ts">
import { ref } from 'vue'
import type { Quiz } from '../models/quiz'

const localStorageQuizString = localStorage.getItem('quiz')
const localStorageQuiz = localStorageQuizString ? JSON.parse(localStorageQuizString) : []

const quizzes = ref<Quiz[]>(localStorageQuiz)
</script>

<template>
  <v-main class="mt-10 px-15">
    <v-list class="d-flex flex-column ga-5">
      <v-list-item v-for="quiz of quizzes" class="d-flex list-item rounded-lg" :key="quiz.id">
        <v-list-item-title>
          {{ quiz.title }}
        </v-list-item-title>
        <v-btn icon="mdi-pencil" size="x-small" />
      </v-list-item>
    </v-list>
  </v-main>
</template>

<style scoped>
.list-item {
  font-size: 30px;
  cursor: pointer;
  border: 1px solid black;
}
</style>
