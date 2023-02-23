import { EvidenceStatus } from "./evidence-status/evidencestatus";
import { EvidenceType } from "./evidence-type/evidencetype";
import { Interview } from "../interview/interview";

export class Evidence {

  evidenceId: number ;
  evidenceType: EvidenceType  ;
  name: string ;
  description: string ;
  evidenceStatus: EvidenceStatus  ;
  createdDate: Date ;

  constructor() {
    this.evidenceType = {evidenceTypeId: 0, name: ''};
    this.evidenceStatus = {evidenceStatusId: 0, name: ''} ;
    this.evidenceId = 0 ;
    this.name = '' ;
    this.description = '' ;
    this.createdDate = new Date() ;
  }

}
