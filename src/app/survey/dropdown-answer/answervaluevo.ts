export class AnswerValueVO
{
  answerValueId: number ;
  value: string ;
  score: number ;
  questionId: number;

  public constructor() {
    
    this.answerValueId = 0 ;
    this.score = 0 ;
    this.questionId = 0 ;

  }

}
