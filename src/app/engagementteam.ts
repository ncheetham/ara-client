import { Engagement } from "./engagement/engagement";
import { Team } from "./team";

export class EngagementTeam {
  engagementTeamId: number ;
  engagement: Engagement ;
  team: Team ;

  constructor() {
    this.engagement = new Engagement() ;
    this.team = new Team() ;
  }
}
