import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  usersChangeSubscription = new Subject<boolean>()  ;
  userSelected = new Subject<number>() ;

  private url = '/api/user/' ;


  // Find All users
  findAllUsers(): Observable<User[]> {

    console.log('finding all users') ;

    return this.httpClient.get<User[]>(this.url).pipe(
      tap(_ => {
        catchError(this.handleError('findAllUser', [])) ;
      })
    ) ;

  }

  // Find a User By ID
  findUser(userId: number): Observable<User> {

    console.log("Finding User with ID: " + userId) ;

    const url = `${this.url}${userId}` ;

    return this.httpClient.get<User>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findUser', {})) ;
      })
    ) ;

  }

  // Find a user by Email Address.
  findUserByEmailAddress(emailAddress: string): Observable<User> {

    const url = `${this.url}email/${emailAddress}` ;

    return this.httpClient.get<User>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findUserByEmailAddress', {})) ;
      })
    ) ;

  }


  // Add a user
  addUser(user: User): Observable<User> {

    console.log("Adding User:" + JSON.stringify(user)) ;

    return this.httpClient.post<User>(this.url, user, this.httpOptions).pipe(
      tap(_ => {
        this.usersChangeSubscription.next(true);
        catchError(this.handleError('addUser', {})) ;
      })
    ) ;

  }

  // update a User
  updateUser(userId: number, user: User): Observable<User>{

    console.log("Updating User: " + userId + " to:" + JSON.stringify(user)) ;

    const url = `${this.url}${userId}` ;

    return this.httpClient.put<User>(this.url, user, this.httpOptions).pipe(
      tap(_ => {
        this.usersChangeSubscription.next(true) ;
        catchError(this.handleError('updateUser', {})) ;
      })
    ) ;
  }

  // delete a user
  deleteUser(userId: number): Observable<User> {

    const url = `${this.url}${userId}` ;

    return this.httpClient.delete<User>(url).pipe(
      tap(_ => {
        this.usersChangeSubscription.next(true);
        catchError(this.handleError('deleteUser', {})) ;
      })
    ) ;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }


}
