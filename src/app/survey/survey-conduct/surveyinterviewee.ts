import { Interviewee } from "src/app/interviewee/interviewee";
import { Survey } from "../survey";
import { SurveyIntervieweeStatus } from "../survey-interviewee/surveyintervieweestatus";

export class SurveyInterviewee {
  survey: Survey ;
  interviewee: Interviewee ;
  status: SurveyIntervieweeStatus;
  surveyIntervieweeId: number ;

  constructor() {
    this.survey = new Survey ;
    this.interviewee = new Interviewee ;
    this.status = new SurveyIntervieweeStatus() ;
  }

}
