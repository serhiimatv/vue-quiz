import { QuestionTypeList } from './models/question'

export const VALIDATION_ANSWER_MESSAGE = {
  empty: 'Поле відповідь не можу бути пустим',
  duplicate: 'Така відповідь вже існує',
}

export const questionTypesList: QuestionTypeList[] = [
  {
    id: 1,
    title: 'Правда/не правда',
    type: 'boolean',
  },
  {
    id: 2,
    title: 'З однією відповіддю',
    type: 'single',
  },
  {
    id: 3,
    title: 'З декількома відповідями',
    type: 'multiple',
  },
]
