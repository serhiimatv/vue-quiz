<script setup lang="ts">
import { useQuizBuilderStore } from '../store/useQuizBuilderStore';
import { QuestionTypeList, QuestionTypes } from '../models/question';
import SingleQuestion from '../components/SingleQuestion.vue';
const questionTypesList: QuestionTypeList[] = [
  {
    id: 1,
    title: 'Правда/не правда',
    type: 'boolean'
  },
  {
    id: 2,
    title: 'З однією відповіддю',
    type: 'single'
  },
  {
    id: 3,
    title: 'З декількома відповідями',
    type: 'multiple'
  }
]

const quizStore = useQuizBuilderStore()

const handleClick = (type: QuestionTypes) => {
  quizStore.addQuestion(type)
}

</script>


<template>
  <v-main class="px-10">
    <h1 class="text-center">Конструктор</h1>
    <div class="d-flex ga-5 justify-start">
      <v-text-field max-width="350px" label="Назва вікторини" variant="outlined" v-model="quizStore.quizTitle" />
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn size="x-large" color="primary" :="props">Додати питання</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="type of questionTypesList" class="item-title" @click="handleClick(type.type)">
            <v-list-item-title>{{ type.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn size="x-large" color="primary">Зберегти</v-btn>
    </div>
    <div class="d-flex flex-column ga-5">
      <SingleQuestion v-for="question of quizStore.questionList" :question />
    </div>
  </v-main>
</template>



<style scoped>
.item-title:hover {
  cursor: pointer;
  background-color: aqua;
}
</style>