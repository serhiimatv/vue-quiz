export type QuestionTypes = "single" | "multiple" | "boolean";

export type QuestionTypeList = {
  id: number;
  title: string;
  type: QuestionTypes;
};

export type SingleQuestion = {
  id: number;
  title: string;
  type: QuestionTypes;
  options: string[];
  correctAnswer: string;
};
