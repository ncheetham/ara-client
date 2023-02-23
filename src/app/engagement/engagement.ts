import { Client } from "../client/client";

export class Engagement
{
  engagementId: number ;
  name: string ;
  description?: string ;
  client: Client ;
  startDate: Date ;
  endDate?: Date ;

  constructor() {
    this.client = new Client() ;
    this.engagementId = 0 ;
    this.name = '' ; 
  }

}
