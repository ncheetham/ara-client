import { Engagement } from "../engagement/engagement";

export class Survey {
   surveyId: number;
   name: string ;
   description: string ;
   createdDate: Date;
   createdByUserId: number ;
   engagement: Engagement ;

  constructor() {
    this.engagement = new Engagement() ;
    this.surveyId = 0 ; 
  }
}
