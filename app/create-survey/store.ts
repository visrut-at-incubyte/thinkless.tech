import { proxy } from "valtio";
import { Question, QuestionType } from "../models/types";

type Store = {
    surveyName: string;
    questionNumber: number;
    questions: Question[];
}

export const store = proxy<Store>({
    surveyName: "General Survey",
    questionNumber: 0,
    questions: [{ question: "", type: QuestionType.NOT_DECIDED }],
});