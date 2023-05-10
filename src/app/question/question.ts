import { AnswerType } from "../answerType/answertype";

export class Question {
  questionId: number ;
  description: string ;
  answerType: AnswerType ;

  constructor() {
    this.questionId = 0 ;
    this.answerType = new AnswerType() ;
  }

}
