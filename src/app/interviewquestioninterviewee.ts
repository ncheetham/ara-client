import { Interviewee } from "./interviewee/interviewee";
import { InterviewQuestion } from "./interviewquestion";

export class InterviewQuestionInterviewee{

  interviewQuestionIntervieweeId: number ;
  interviewQuestion: InterviewQuestion ;
  interviewee: Interviewee ;

  constructor() {
    this.interviewQuestionIntervieweeId = 0 ;
    this.interviewQuestion = new InterviewQuestion() ;
    this.interviewee = new Interviewee() ;
  }


}
