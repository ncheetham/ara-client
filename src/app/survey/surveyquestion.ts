import { Question } from "../question/question";
import { Survey } from "./survey";
import { SurveyQuestionCategory } from "./survey-question-category/surveyquestioncategory";

export class SurveyQuestion {
  surveyQuestionId: number ;
  survey: Survey ;
  category: SurveyQuestionCategory ;
  question: Question ;
  answer: string ;
  questionNumber: number ;

  constructor() {
    this.surveyQuestionId = 0 ;
    this.survey = new Survey() ;
    this.category = new SurveyQuestionCategory() ;
    this.question = new Question() ;
    this.questionNumber = 0 ;
  }

}
