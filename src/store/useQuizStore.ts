import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Quiz } from '../models/quiz'
import useQuizzesStore from './useQuizzesStore'

const useQuizStore = defineStore('quiz', () => {
  const quizzesStore = useQuizzesStore()

  const quiz = ref<Quiz | null>(null)
  const questionIndex = ref(0)
  const activeQuestionChooseOption = ref([])

  const score = ref(0)

  const isQuizFinished = ref(false)

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

  const checkAnswerAndAddScore = () => {
    if (currentQuestion.value?.type === 'boolean' || currentQuestion.value?.type === 'single') {
      if (currentQuestion.value?.correctAnswer === activeQuestionChooseOption.value) {
        score.value = score.value + 1
      }
    } else if (currentQuestion.value?.type === 'multiple') {
      const optionPrice = 1 / currentQuestion.value?.correctAnswer.length

      if (activeQuestionChooseOption.value.length > currentQuestion.value?.correctAnswer.length) return

      activeQuestionChooseOption.value.forEach((option) => {
        if (currentQuestion.value?.correctAnswer.includes(option)) {
          score.value = score.value + optionPrice
        }
      })
    }
  }

  const nextQuestion = () => {
    checkAnswerAndAddScore()
    if (quiz.value?.questions[questionIndex.value + 1]) {
      questionIndex.value++
    } else {
      isQuizFinished.value = true
    }

    activeQuestionChooseOption.value = []
  }

  return {
    quiz,
    setQuiz,
    currentQuestionCount,
    totalCountQuestion,
    currentQuestion,
    activeQuestionChooseOption,
    nextQuestion,
    score,
    isQuizFinished,
  }
})

export default useQuizStore
