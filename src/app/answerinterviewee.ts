import { Answer } from "./answer";
import { Interviewee } from "./interviewee/interviewee";

export class AnswerInterviewee {
  answerIntervieweeId: number ;
  answer: Answer ;
  interviewee: Interviewee ;

  constructor() {
    this.answer = new Answer() ;
    this.interviewee = new Interviewee() ; 
  }
}
