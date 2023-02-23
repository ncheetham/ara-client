import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //user: Subject<User | null> = new BehaviorSubject<User | null>(null) ;
  user = new BehaviorSubject<User>(new User(0,'','','', undefined, undefined,undefined,undefined)) ;

  private baseUrl: string = "/api/auth/" ;

  private authExpirationTimer: any ;

  constructor(private httpClient: HttpClient, private router: Router) { }


  // authenticate
  authenticate(email: string, password: string): Observable<User> {

    const url = `${this.baseUrl}token` ;

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', this.createBasicAuthToken(email,password))
    .set('X-Requested-With','XMLHttpRequest');

    let httpOptions = {headers: headers} ;


    // Post the request
    return this.httpClient.post<User>(url,{},httpOptions).pipe(
      tap((u: User)=> {
        console.log('User returned from Authenticate') ;

        // Need to set the expiration date - for one hour hence.
        u.expirationDate = new Date(new Date().getMilliseconds() + 1000 * 60 * 60);

        this.user.next(u);

        // Store the user.
        localStorage.setItem('userData', JSON.stringify(u));

        catchError(this.handleError('authenticate', u))
      })
    )
  }

  autoLogon() {
    const user: {
      userId: number ;
      emailAddress: string ;
      firstName: string ;
      lastName: string ;
      fullName?: string ;
      loginToken?: string ;
      _expirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') ||'null');
    if(!user) {
      return ;
    }

    const loadedUser = new User(user.userId, user.emailAddress, user.firstName, user.lastName, '', user.fullName, user.loginToken, new Date(user._expirationDate)) ;

    if(loadedUser) {
      this.user.next(loadedUser) ;
    }





  }

  private createBasicAuthToken(email: string, password: string) {

    const encode =  btoa(email + ':' + password)  ;  //Buffer.from(username + ":" + password, 'utf8').toString('base64') ;

    console.log("encode: " + encode) ;
    return 'Basic ' + encode ;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

  logout() {
    this.user.next(new User(0, '','','',undefined,undefined,undefined,undefined)) ;
    localStorage.removeItem('userData') ;
    this.router.navigate(['/auth']) ;
    if(this.authExpirationTimer) {
      clearTimeout(this.authExpirationTimer) ;
    }
    this.authExpirationTimer = null ;
  }

  autoLogout(expirationDuration: number) {
    this.authExpirationTimer = setTimeout(() => {
      this.logout() ;
    }, expirationDuration)

  }


}
