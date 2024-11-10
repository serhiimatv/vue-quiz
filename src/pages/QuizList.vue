<script setup lang="ts">
import { useRouter } from 'vue-router'
import useQuizzesStore from '../store/useQuizzesStore'

const router = useRouter()
const quizzesStore = useQuizzesStore()

const removeQuiz = (id: string) => {
  quizzesStore.removeQuiz(id)
}

const editQuiz = (id: string) => {
  router.push({ path: 'builder', query: { id } })
}

const goToQuiz = (id: string) => {
  router.push(`/quiz/${id}`)
}
</script>

<template>
  <v-main class="my-10 px-15 d-flex justify-center items-center">
    <v-sheet v-if="quizzesStore.quizzes.length !== 0" :elevation="21" width="50%" class="pepper rounded-lg">
      <div class="d-flex flex-column ga-5">
        <div
          v-for="quiz of quizzesStore.quizzes"
          class="list-item rounded-lg"
          :key="quiz.id"
          @click="goToQuiz(quiz.id)"
        >
          {{ quiz.title }}
          <div class="buttons">
            <v-btn icon="mdi-pencil" size="x-small" @click.stop="editQuiz(quiz.id)" />
            <v-btn icon="mdi-delete" size="x-small" @click.stop="removeQuiz(quiz.id)" />
          </div>
        </div>
      </div>
    </v-sheet>
    <div v-else class="header-wrapper">
      <h1>Поки ще немає вікторин</h1>
      <v-btn color="primary">
        <RouterLink to="/builder" class="link">Створити вікторину</RouterLink>
      </v-btn>
    </div>
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
}
.buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
}
.header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: black;
}
.link {
  color: white;
  text-decoration: none;
}
</style>
