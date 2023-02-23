import { InterviewQuestionInterviewee } from "./interviewquestioninterviewee";
import { Question } from "./question/question";

export class InterviewQuestion {
  interviewQuestionId: number ;
  interviewId: number ;
  question: Question ;
  answer: string ;
  notes: string ;
  escalationRequired: boolean ;
  resolutionId: number ;
  resolutionMethodId: number;
  evidenceTypeId: number  ;
  questionNumber: number ;
  answerers: InterviewQuestionInterviewee[] ;

  constructor() {
    this.interviewQuestionId = 0 ;
    this.question = new Question() ;
    this.answerers = [] ;
  }

}
