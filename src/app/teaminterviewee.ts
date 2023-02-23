import { Interview } from "./interview/interview";
import { Team } from "./team";

export class TeamInterviewee {
  teamIntervieweeId: number ;
  team: Team ;
  interview: Interview;

  constructor() {
    this.interview = new Interview() ; 
  }

}
