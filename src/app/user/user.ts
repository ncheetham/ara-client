export class User{

  constructor(public userId: number,
  public emailAddress: string,
  public firstName: string,
  public lastName: string,
  public password?: string,
  public fullName?: string,
  private _loginToken?: string,
  public expirationDate?: Date ) {}

    get loginToken() {

      if(this.expirationDate == null || new Date() > this.expirationDate) {

        return null ;
        
      }else {
        return this._loginToken ;
      }
    }


}
