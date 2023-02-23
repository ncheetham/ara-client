import { AnswerInterviewee } from "./answerinterviewee";

export class Answer {
  answerId: number ;
  interviewQuestionId: number ;
  answer: string ;
  notes: string ;
  escalationRequired: boolean ;
  answerers: AnswerInterviewee[] ;

  constructor() {
    this.answerId = 0 ;
  }

}
