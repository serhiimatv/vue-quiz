export type QuestionTypes = 'single' | 'multiple' | 'boolean'

export type QuestionTypeList = {
  id: number
  title: string
  type: QuestionTypes
}
// remove???
export type QuestionOption = {
  title: string
  editable: boolean
}

export type Question = {
  id: string
  title: string
  type: QuestionTypes
  options: string[]
  correctAnswer: string | string[]
}
