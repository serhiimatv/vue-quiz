import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Quiz } from '../models/quiz'
import useQuizzesStore from './useQuizzesStore'

const useQuizStore = defineStore('quiz', () => {
  const quizzesStore = useQuizzesStore()

  const quiz = ref<Quiz | null>(null)
  const questionIndex = ref(0)

  const currentQuestionCount = computed(() => {
    return questionIndex.value + 1
  })

  const totalCountQuestion = computed(() => {
    if (quiz.value) {
      return quiz.value.questions.length || 0
    }
  })

  const currentQuestion = computed(() => {
    return quiz.value?.questions[questionIndex.value]
  })

  const setQuiz = (id: string) => {
    quiz.value = quizzesStore.quizzes.find((quiz) => quiz.id === id) || ({} as Quiz)
  }

  return {
    quiz,
    setQuiz,
    currentQuestionCount,
    totalCountQuestion,
    currentQuestion,
  }
})

export default useQuizStore
