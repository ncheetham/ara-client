export class IntervieweeStatusVO
{
  intervieweeId: number ;
  fullName: string ;
  title: string;
  reportsToName: string ;
  reportsToId: number ;
  interviewsScheduled: number ;
  interviewsPlanned: number ;
  interviewsCompleted: number ;

  constructor() {
    this.interviewsScheduled = 0 ;
    this.interviewsCompleted = 0 ;
    this.interviewsPlanned = 0 ;
    this.reportsToId = 0 ;
    this.reportsToName = "" ; 
  }

}
