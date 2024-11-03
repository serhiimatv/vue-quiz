import { defineStore } from "pinia";
import { Question, QuestionTypes } from "../models/question";

interface QuizBuilderState {
  quizTitle: string;
  questionList: Question[];
}

export const useQuizBuilderStore = defineStore("quizBuilder", {
  state: (): QuizBuilderState => ({
    quizTitle: "",
    questionList: [
      {
        id: new Date().getTime(),
        title: "test question",
        type: "boolean",
        options: ["Правда", "Не правда"],
        correctAnswer: "Правда",
      },
    ],
  }),
  actions: {
    addQuestion(type: QuestionTypes) {
      const question: Question = {
        id: new Date().getTime(),
        title: "",
        type,
        options: type === "boolean" ? ["Правда", "Не правда"] : [],
        correctAnswer: "",
      };

      this.questionList.push(question);
    },
    removeQuestion(id: number) {
      this.questionList = this.questionList.filter(
        (question) => question.id !== id
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
          (questionOption) => questionOption !== option
        );
      }
    },
  },
});
