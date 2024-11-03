import { defineStore } from "pinia";
import { Question, QuestionTypes } from "../models/question";

interface QuizBuilderState {
  quizTitle: string;
  questionList: Question[];
}

export const useQuizBuilderStore = defineStore("quizBuilder", {
  state: (): QuizBuilderState => ({
    quizTitle: "",
    questionList: [],
  }),
  actions: {
    addQuestion(type: QuestionTypes) {
      const question: Question = {
        id: new Date().getTime(),
        title: "",
        type,
        options: type === "boolean" ? ["Правда", "Не правда"] : [],
        correctAnswer: type === "multiple" ? [] : "",
      };

      this.questionList.push(question);
    },
    removeQuestion(id: number) {
      this.questionList = this.questionList.filter(
        (question) => question.id !== id,
      );
    },
    addOption(id: number, option: string) {
      const question = this.questionList.find((question) => question.id === id);
      if (question) {
        question.options.push(option);
      }
    },
    removeOption(id: number, option: string) {
      const question = this.questionList.find((question) => question.id === id);
      if (question) {
        question.options = question.options.filter(
          (questionOption) => questionOption !== option,
        );
      }
      if (question && question.type !== "multiple") {
        question.correctAnswer =
          question.correctAnswer === option ? "" : question.correctAnswer;
      } else if (question && Array.isArray(question.correctAnswer)) {
        question.correctAnswer = question.correctAnswer.filter(
          (questionOption) => questionOption !== option,
        );
      }
    },
  },
});
