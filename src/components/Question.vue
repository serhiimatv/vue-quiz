<script setup lang="ts">
import useQuizStore from '../store/useQuizStore'

const quizStore = useQuizStore()
</script>

<template>
  <v-sheet :elevation="21" width="50%" class="pepper rounded-lg">
    <v-row>
      <v-col class="header"> {{ quizStore.currentQuestionCount }} з {{ quizStore.totalCountQuestion }} </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ quizStore.currentQuestion?.title }}</h2>
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
