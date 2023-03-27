import { InterviewAnswerVO } from "./answer/answer-list/inteviewanswervo";

export class InterviewReviewVO {
  interviewId: number ;
  answers: InterviewAnswerVO[] ;

  constructor() {
    this.answers = [] ; 
  }

}
