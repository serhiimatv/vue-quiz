<script setup lang="ts">
import { defineProps } from 'vue'
import { SingleQuestion } from '../models/question';


const props = defineProps<{
  question: SingleQuestion
}>()
</script>

<template>
  <v-card>
    <template #title>
      <v-card-title>{{ props.question.title || 'Введіть питання' }}</v-card-title>
    </template>
    <template #text>
      <v-text-field max-width="350px" label="Питання" variant="outlined" v-model.trim="props.question.title" />
      <v-radio-group v-model="props.question.correctAnswer">
        <v-radio v-for="option of props.question.options" :label="option" :value='option' color="primary"
          :checked="option === props.question.correctAnswer"></v-radio>
      </v-radio-group>
    </template>
  </v-card>
</template>

<style scoped></style>