<script setup lang="ts">
import { useQuizBuilderStore } from "../store/useQuizBuilderStore";
import { QuestionTypeList, QuestionTypes } from "../models/question";
import Question from "../components/Question.vue";
import { uuid } from "vue-uuid";
const questionTypesList: QuestionTypeList[] = [
  {
    id: 1,
    title: "Правда/не правда",
    type: "boolean",
  },
  {
    id: 2,
    title: "З однією відповіддю",
    type: "single",
  },
  {
    id: 3,
    title: "З декількома відповідями",
    type: "multiple",
  },
];

const quizStore = useQuizBuilderStore();

const handleClickAddQuestion = (type: QuestionTypes) => {
  quizStore.addQuestion(type);
};

const handleClickSaveQuiz = () => {
  const quiz = {
    id: uuid.v4(),
    title: quizStore.quizTitle,
    questions: quizStore.questionList,
  };

  const localStorageQuizzes = localStorage.getItem("quiz");

  if (!localStorageQuizzes) {
    localStorage.setItem("quiz", JSON.stringify([quiz]));
  } else {
    const quizzes = JSON.parse(localStorageQuizzes);
    quizzes.push(quiz);
    localStorage.setItem("quiz", JSON.stringify(quizzes));
  }
};
</script>

<template>
  <v-main class="px-10 pb-10">
    <h1 class="text-center">Конструктор</h1>
    <div class="d-flex ga-5 justify-start mt-5">
      <v-text-field
        max-width="350px"
        label="Назва вікторини"
        variant="outlined"
        v-model="quizStore.quizTitle"
      />
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
      <v-btn size="x-large" color="primary" @click="handleClickSaveQuiz"
        >Зберегти</v-btn
      >
    </div>
    <div class="d-flex flex-column ga-5">
      <Question
        v-for="question of quizStore.questionList"
        :question
        :key="question.id"
      />
    </div>
  </v-main>
</template>

<style scoped>
.item-title:hover {
  cursor: pointer;
  background-color: aqua;
}
</style>
