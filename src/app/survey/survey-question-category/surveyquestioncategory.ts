import { Survey } from "../survey";

export class SurveyQuestionCategory {
  surveyQuestionCategoryId: number ;
  name: string ;
  description?: string ;
  survey: Survey ;

  constructor() {
    this.surveyQuestionCategoryId = 0 ;
    this.survey = new Survey() ;
  }

}
