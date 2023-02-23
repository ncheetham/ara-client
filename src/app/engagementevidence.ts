import { Engagement } from "./engagement/engagement";
import { Evidence } from "./evidence/evidence";

export class EngagementEvidence {

  engagementEvidenceId: number ;
  evidence: Evidence ;
  engagement: Engagement ;

  constructor() {
    this.evidence = new Evidence() ;
    this.engagement = new Engagement() ;
  }


}
