<script setup lang="ts">
import Question from '../components/Question.vue'
import { useRouter } from 'vue-router'
import useQuizStore from '../store/useQuizStore'
import { onMounted } from 'vue'

const router = useRouter()
const quizStore = useQuizStore()

onMounted(() => {
  quizStore.setQuiz(router.currentRoute.value.params.id as string)
})
</script>

<template>
  <v-main v-if="quizStore.quiz" class="my-10 px-15 d-flex flex-column justify-center align-center items-center">
    <h1>{{ quizStore.quiz.title }}</h1>
    <Question />
  </v-main>
</template>

<style scoped></style>
