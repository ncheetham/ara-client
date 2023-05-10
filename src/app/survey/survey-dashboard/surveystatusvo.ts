export class SurveyStatusVO {
  surveyId: number;
  survey: string ;
  interviewees: number ;
  excluded: number ;
  planned: number ;
  scheduled: number ;
  sent: number ;
  completed: number ;

  constructor() {
    this.surveyId = 0 ;
    this.interviewees = 0 ;
    this.excluded = 0 ;
    this.planned = 0 ;
    this.scheduled = 0 ;
    this.sent = 0 ;
    this.completed = 0;
  }
}
