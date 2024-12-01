import useNotification from '../composables/useNotification'
import { Question } from '../models/question'
import { QuizBuilderState } from '../models/quiz'

type EmptyTitle = {
  index: number
  question: Question
}

export const quizValidation = (quizBuilderState: QuizBuilderState): boolean => {
  const { errorNotification } = useNotification()

  const emptyQuestionTitle = quizBuilderState.questionList.reduce((acc, question) => {
    if (question.title === '') {
      return {
        index: quizBuilderState.questionList.indexOf(question),
        question,
      }
    }

    return acc
  }, {} as EmptyTitle)

  if (quizBuilderState.quizTitle === '') {
    errorNotification('Назва вікторини не може бути порожньою')
    return false
  }

  if (quizBuilderState.questionList.length === 0) {
    errorNotification('Додайте хоча б одне питання')
    return false
  }

  if (!emptyQuestionTitle.index) {
    errorNotification(`Питання №${emptyQuestionTitle.index + 1} не може бути порожнім`)
    return false
  }

  return true
}
