<script setup lang="ts">
import { ref } from "vue";
import { Quiz } from "../models/quiz";

const localStorageQuizString = localStorage.getItem("quiz");
const localStorageQuiz = localStorageQuizString
  ? JSON.parse(localStorageQuizString)
  : [];

const quizes = ref<Quiz[]>(localStorageQuiz);
console.log(quizes.value);
</script>

<template>
  <v-main>
    <v-list>
      <v-list-item v-for="quiz of quizes" class="item-title">
        {{ quiz.title }}
      </v-list-item>
    </v-list>
  </v-main>
</template>

<style scoped></style>
