import { Interview } from "./interview/interview";
import { Interviewee } from "./interviewee/interviewee";

export class InterviewInterviewee {
  interviewIntervieweeId: number ;
  interview: Interview ;
  interviewee: Interviewee ;

  constructor() {
    this.interviewIntervieweeId = 0 ; 
    this.interview = new Interview() ;
    this.interviewee = new Interviewee() ;
  }
}
