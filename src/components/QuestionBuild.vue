<script setup lang="ts">
import { computed, ref } from 'vue'
import { Question } from '../models/question'
import { useQuizBuilderStore } from '../store/useQuizBuilderStore'
import type { VTextField } from 'vuetify/components'
import useValidationRules from '../composables/useValidationRules'

const quizStore = useQuizBuilderStore()
const { required, duplicateAnswer } = useValidationRules()

const props = defineProps<{
  question: Question
  questionNumber: number
}>()

const answerTitle = ref<string | null>(null)
const answerTitleInputRef = ref<VTextField | null>(null)

const answerTitleRules = computed(() => {
  return [required, duplicateAnswer(props.question.options)]
})

const handleClickRemove = () => {
  quizStore.removeQuestion(props.question.id)
}

const handleClickAddOption = () => {
  if (!answerTitleInputRef.value?.isValid) {
    return
  }
  if (answerTitle.value) {
    quizStore.addOption(props.question.id, answerTitle.value)
    answerTitleInputRef.value?.reset()
    answerTitleInputRef.value?.resetValidation()
  }
}
const handleClickRemoveOption = (option: string) => {
  quizStore.removeOption(props.question.id, option)
}

const isRadioInputType = computed(() => {
  return props.question.type === 'single' || props.question.type === 'boolean'
})
</script>

<template>
  <v-card>
    <template #title>
      <v-card-title>Питання №{{ questionNumber }}: {{ props.question.title || 'Введіть питання' }}</v-card-title>
    </template>
    <template #text>
      <div class="d-flex ga-5">
        <v-text-field
          max-width="350px"
          label="Питання"
          variant="outlined"
          v-model.trim="props.question.title"
          :rules="[required]"
        />
        <v-btn size="x-large" color="red" @click="handleClickRemove">Видалити</v-btn>
      </div>
      <div v-if="props.question.type !== 'boolean'" class="d-flex ga-5">
        <v-text-field
          ref="answerTitleInputRef"
          max-width="350px"
          label="Відповідь"
          variant="outlined"
          v-model.trim="answerTitle"
          :rules="answerTitleRules"
        />
        <v-btn size="x-large" color="green" @click="handleClickAddOption">Додати відповідь</v-btn>
      </div>
      <v-radio-group v-if="isRadioInputType" v-model="props.question.correctAnswer">
        <div class="d-flex" v-for="option of props.question.options" :key="option">
          <v-radio
            class="flex-0-0 mr-2"
            :value="option"
            :label="option"
            color="primary"
            :checked="option === props.question.correctAnswer"
          />
          <v-btn
            v-if="props.question.type !== 'boolean'"
            icon="$delete"
            variant="plain"
            @click="handleClickRemoveOption(option)"
          />
        </div>
      </v-radio-group>
      <div v-else>
        <div class="d-flex" v-for="option of props.question.options" :key="option">
          <v-checkbox
            class="flex-0-0 mr-2"
            :value="option"
            :label="option"
            color="primary"
            :checked="props.question.correctAnswer.includes(option)"
            v-model="props.question.correctAnswer"
          />
          <v-btn icon="$delete" variant="plain" @click="handleClickRemoveOption(option)" />
        </div>
      </div>
    </template>
  </v-card>
</template>

<style scoped></style>
