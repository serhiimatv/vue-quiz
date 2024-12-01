import { Question } from './question'

export type Quiz = {
  id: string
  title: string
  questions: Question[]
}

export interface QuizBuilderState {
  quizTitle: string
  questionList: Question[]
}
