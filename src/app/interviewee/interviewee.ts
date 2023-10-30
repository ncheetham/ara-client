export class Interviewee {
  intervieweeId: number ;
  firstName: string ;
  lastName: string ;
  title: string ;
  role?: string ;
  engagementId: number ;
  reportsToId: number ;
  emailAddress: string ; 
  phone: string ; 

  constructor(intervieweeId = 0, firstName = '', lastName = '', title = '') {
    this.intervieweeId = intervieweeId ;
    this.firstName = firstName ;
    this.lastName = lastName ;
    this.title = title ;
    this.engagementId = 0 ;
    this.reportsToId = 0 ; 
    this.emailAddress = '';
    this.phone = '' ;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName ;
  }

}
