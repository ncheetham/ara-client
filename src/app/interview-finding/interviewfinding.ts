import { Finding } from "../finding/finding";
import { Interview } from "../interview/interview";

export class InterviewFinding {
  interviewFindingId: number ;
  interview: Interview ;
  finding: Finding ;

  constructor() {
    this.interviewFindingId = 0 ;
    this.interview = new Interview() ;
    this.finding = new Finding() ; 
  }
}
