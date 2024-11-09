import { defineStore } from 'pinia'
import { Quiz } from '../models/quiz'
import { onMounted, ref, watch } from 'vue'

const useQuizzesStore = defineStore('quizzes', () => {
  const quizzes = ref<Quiz[]>([])

  const addQuiz = (quiz: Quiz) => {
    quizzes.value.push(quiz)
  }

  const removeQuiz = (id: string) => {
    quizzes.value = quizzes.value.filter((quiz) => quiz.id !== id)
  }

  const setQuizzes = (quizzesList: Quiz[]) => {
    quizzes.value = quizzesList
  }

  watch(
    quizzes,
    (quizzes) => {
      localStorage.setItem('quiz', JSON.stringify(quizzes))
    },
    { deep: true },
  )

  onMounted(() => {
    const quizzesLocalStorage = localStorage.getItem('quiz')

    if (!quizzesLocalStorage) {
      localStorage.setItem('quiz', JSON.stringify([]))
    } else {
      const parsedQuizzes = JSON.parse(quizzesLocalStorage)
      setQuizzes(parsedQuizzes)
    }
  })

  return {
    quizzes,
    addQuiz,
    removeQuiz,
    setQuizzes,
  }
})

export default useQuizzesStore
