<script setup lang="ts">
import { computed, ref } from "vue";
import { Question } from "../models/question";
import { useQuizBuilderStore } from "../store/useQuizBuilderStore";
import { VALIDATION_ANSWER_MESSAGE } from "../constants";

const quizStore = useQuizBuilderStore();

const props = defineProps<{
  question: Question;
}>();

const answerTitle = ref("");
const validateAnswerTitle = ref("");

const handleClickRemove = () => {
  quizStore.removeQuestion(props.question.id);
};

const handleClickAddOption = () => {
  if (answerTitle.value === "") {
    validateAnswerTitle.value = VALIDATION_ANSWER_MESSAGE.empty;
    return;
  }

  if (
    props.question.options.find(
      (option) =>
        option.toLocaleLowerCase() === answerTitle.value.toLocaleLowerCase(),
    )
  ) {
    validateAnswerTitle.value = VALIDATION_ANSWER_MESSAGE.duplicate;
    return;
  }

  quizStore.addOption(props.question.id, answerTitle.value);
  answerTitle.value = "";
  validateAnswerTitle.value = "";
};
const handleClickRemoveOption = (option: string) => {
  quizStore.removeOption(props.question.id, option);
};

const isRadioInputType = computed(() => {
  return props.question.type === "single" || props.question.type === "boolean";
});
</script>

<template>
  <v-card>
    <template #title>
      <v-card-title>{{
        props.question.title || "Введіть питання"
      }}</v-card-title>
    </template>
    <template #text>
      <div class="d-flex ga-5">
        <v-text-field
          max-width="350px"
          label="Питання"
          variant="outlined"
          v-model.trim="props.question.title"
        />
        <v-btn size="x-large" color="red" @click="handleClickRemove"
          >Видалити</v-btn
        >
      </div>
      <div v-if="props.question.type !== 'boolean'" class="d-flex ga-5">
        <v-text-field
          max-width="350px"
          label="Відповідь"
          variant="outlined"
          v-model.trim="answerTitle"
          :error-messages="validateAnswerTitle"
        />
        <v-btn size="x-large" color="green" @click="handleClickAddOption"
          >Додати відповідь</v-btn
        >
      </div>
      <v-radio-group
        v-if="isRadioInputType"
        v-model="props.question.correctAnswer"
      >
        <div
          class="d-flex"
          v-for="option of props.question.options"
          :key="option"
        >
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
        <div
          class="d-flex"
          v-for="option of props.question.options"
          :key="option"
        >
          <v-checkbox
            class="flex-0-0 mr-2"
            :value="option"
            :label="option"
            color="primary"
            :checked="props.question.correctAnswer.includes(option)"
            v-model="props.question.correctAnswer"
          />
          <v-btn
            icon="$delete"
            variant="plain"
            @click="handleClickRemoveOption(option)"
          />
        </div>
      </div>
    </template>
  </v-card>
</template>

<style scoped></style>
