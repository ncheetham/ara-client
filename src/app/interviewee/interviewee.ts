export class Interviewee {
  intervieweeId: number ;
  firstName: string ;
  lastName: string ;
  title: string ;
  role?: string ;

  constructor(intervieweeId = 0, firstName = '', lastName = '', title = '') {
    this.intervieweeId = intervieweeId ;
    this.firstName = firstName ;
    this.lastName = lastName ;
    this.title = title ;
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName ;
  }

}
