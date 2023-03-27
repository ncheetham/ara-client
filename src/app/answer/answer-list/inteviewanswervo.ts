import { InterviewQuestion } from "src/app/interviewquestion";

export class InterviewAnswerVO
{
  interviewQuestion: InterviewQuestion ;
  answerers: String[] ;

  constructor() {
    this.answerers = [] ;
  }

}
