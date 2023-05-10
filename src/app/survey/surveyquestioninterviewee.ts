import { Interviewee } from "../interviewee/interviewee";
import { SurveyQuestion } from "./surveyquestion";

export class SurveyQuestionInterviewee {
  answer: string  ;
  interviewee: Interviewee ;
  surveyQuestionIntervieweeId: number ;
  surveyQuestion: SurveyQuestion ;

  constructor() {
    
    this.interviewee = new Interviewee() ;
    this.surveyQuestion = new SurveyQuestion() ;

  }
}
