import { defineStore } from "pinia";
import { SingleQuestion, QuestionTypes } from "../models/question";

interface QuizBuilderState {
  quizTitle: string;
  questionList: SingleQuestion[];
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
      const question: SingleQuestion = {
        id: new Date().getTime(),
        title: "",
        type,
        options: type === "boolean" ? ["Правда", "Не правда"] : [],
        correctAnswer: "",
      };

      this.questionList.push(question);
    },
  },
});
