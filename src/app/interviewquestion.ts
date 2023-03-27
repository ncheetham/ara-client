import { Interview } from "./interview/interview";
import { Question } from "./question/question";

export class InterviewQuestion {
  interviewQuestionId: number ;
  interview: Interview ;
  question: Question ;
  answer: string ;
  notes: string ;
  escalationRequired: boolean ;
  resolutionId: number ;
  resolutionMethodId: number;
  evidenceTypeId: number  ;
  questionNumber: number ;

  constructor() {
    this.interviewQuestionId = 0 ;
    this.question = new Question() ;
    this.interview = new Interview() ;
  }

}
