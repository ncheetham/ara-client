import { Engagement } from "../engagement/engagement";
import { InterviewStatus } from "./interview-status/interviewstatus";
import { MeetingType } from "../meeting-type/meetingType";
import { Team } from "../team";
import { User } from "../user/user";


export class Interview {
  interviewId: number ;
  engagement: Engagement ;
  enteredByUser: User ;
  interviewDate: Date ;
  meetingType: MeetingType ;
  notes: string ;
  team: Team ;
  interviewStatus: InterviewStatus ;

  constructor() {
    this.interviewId = 0 ;
    this.engagement = new Engagement() ;
    this.enteredByUser = new User(0, '', '', '',undefined, undefined, undefined, undefined) ;
    this.meetingType = new MeetingType() ;
    this.interviewStatus = new InterviewStatus() ;
    this.interviewStatus.interviewStatusId = 1 ;
    this.interviewDate = new Date() ;
    this.team = new Team() ;
  }
}
