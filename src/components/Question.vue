<script setup lang="ts">
import { router } from '../router'
import useQuizStore from '../store/useQuizStore'

const quizStore = useQuizStore()

const toMainPageAndResetQuiz = () => {
  quizStore.resetQuiz()
  router.push('/')
}
</script>

<template>
  <v-sheet v-if="!quizStore.isQuizFinished" :elevation="21" width="50%" class="pepper rounded-lg">
    <v-row>
      <v-col class="header"> {{ quizStore.currentQuestionCount }} з {{ quizStore.totalCountQuestion }} </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ quizStore.currentQuestion?.title }}</h2>
      </v-col>
    </v-row>
    <!-- boolean and single Question -->
    <v-row v-if="quizStore.currentQuestion?.type === 'boolean' || quizStore.currentQuestion?.type === 'single'">
      <v-col>
        <v-radio-group v-model="quizStore.activeQuestionChooseOption">
          <v-radio v-for="option in quizStore.currentQuestion?.options" :key="option" :label="option" :value="option" />
        </v-radio-group>
      </v-col>
    </v-row>
    <!-- multiple Question -->
    <v-row v-else>
      <v-col>
        <v-checkbox
          v-for="option in quizStore.currentQuestion?.options"
          v-model="quizStore.activeQuestionChooseOption"
          :key="option"
          :label="option"
          :value="option"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-col cols="auto">
        <v-btn
          v-if="quizStore.currentQuestionCount !== quizStore.totalCountQuestion"
          color="primary"
          :disabled="quizStore.activeQuestionChooseOption.length === 0"
          @click="quizStore.nextQuestion"
        >
          Наступне питання
        </v-btn>
        <v-btn
          v-else
          color="primary"
          :disabled="quizStore.activeQuestionChooseOption.length === 0"
          @click="quizStore.nextQuestion"
        >
          Закінчити вікторину
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <v-sheet v-else :elevation="21" width="50%" class="pepper rounded-lg">
    <v-row>
      <v-col>
        <h2>Вікторина завершена</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col> Ваш результат: {{ quizStore.score }} з {{ quizStore.totalCountQuestion }} </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="toMainPageAndResetQuiz"> На головну</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>
.pepper {
  padding: 20px;
  margin-top: 30px;
}
.header {
  display: flex;
  justify-content: end;
  font-size: 20px;
  font-weight: bold;
}
</style>
