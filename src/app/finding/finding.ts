import { Engagement } from "../engagement/engagement";
import { FindingStatus } from "../findingstatus";
import { Impact } from "../impact/impact";
import { Probability } from "../probability/probability";
import { RiskType } from "../risktype/risktype";

export class Finding {

  findingId: number ;
  name: String ;

  description: String ;
  recordedDate: Date ;
  riskScore: number ;

  enteredByUserId: number ;

  engagement: Engagement ;

  findingStatus: FindingStatus ;
  probability: Probability;

  impact: Impact ;

  riskType: RiskType ;

  constructor() {
    this.findingId = 0 ;
    this.engagement = new Engagement() ;
    this.recordedDate = new Date() ;
    this.findingStatus = {findingStatusId: 0, name: ''} ;
    this.riskType = new RiskType() ;
    this.impact = new Impact() ;
    this.probability = new Probability() ;
  }

}
