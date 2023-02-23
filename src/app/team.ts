import { Engagement } from "./engagement/engagement";

export class Team {
  teamId: number ;
  name: string ;
  engagement: Engagement ;

  constructor() {
    this.engagement = new Engagement() ;
  }
}
