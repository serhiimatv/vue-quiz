import useNotification from '../composables/useNotification'
import { Question } from '../models/question'
import { QuizBuilderState } from '../models/quiz'

type EmptySomeProperty = {
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
  }, {} as EmptySomeProperty)

  const emptyQuestionOption = quizBuilderState.questionList.reduce((acc, question) => {
    if (question.options.length === 0) {
      return {
        index: quizBuilderState.questionList.indexOf(question),
        question,
      }
    }
    return acc
  }, {} as EmptySomeProperty)

  const emptyCurrentQuestionOption = quizBuilderState.questionList.reduce((acc, question) => {
    if (question.correctAnswer.length === 0 || question.correctAnswer === '') {
      return {
        index: quizBuilderState.questionList.indexOf(question),
        question,
      }
    }
    return acc
  }, {} as EmptySomeProperty)

  if (quizBuilderState.quizTitle === '') {
    errorNotification('Назва вікторини не може бути порожньою')
    return false
  }

  if (quizBuilderState.questionList.length === 0) {
    errorNotification('Додайте хоча б одне питання')
    return false
  }

  if (emptyQuestionTitle.index !== undefined) {
    errorNotification(`Питання №${emptyQuestionTitle.index + 1} не може бути порожнім`)
    return false
  }

  if (emptyQuestionOption.index !== undefined) {
    errorNotification(`В питанні №${emptyQuestionOption.index + 1} повинні бути варіанти відповідей`)
    return false
  }

  if (emptyCurrentQuestionOption.index !== undefined) {
    errorNotification(`В питанні №${emptyCurrentQuestionOption.index + 1} повинна бути вибрана вірна відповідь`)
    return false
  }
  return true
}
