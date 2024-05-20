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
  user = new BehaviorSubject<User>({userId: 0 , firstName: '', lastName: '', fullName: '', emailAddress: '', loginToken: ''}) ;

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
      tap((u: User) => {
        this.user.next(u) ; 
        catchError(this.handleError('authenticate', u)) ;
    })
  ); 
  }

  autoLogon() {

    if('user' in localStorage) {
      const user = localStorage.getItem('user') ; 



    }else {
      return ; 
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
    // this.user.next({}) ;
    localStorage.removeItem('userData') ;
    localStorage.removeItem('token') ; 
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
