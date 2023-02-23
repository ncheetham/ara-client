import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { TeamInterviewee } from './teaminterviewee';

@Injectable({
  providedIn: 'root'
})
export class TeamIntervieweeService {

  teamIntervieweeChangedSubscription = new Subject<boolean>() ;

  teamIntervieweeSelected = new Subject<number>() ;
  startedEditing = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  private url = '/api/teaminterviewee/' ;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public findTeamInterviewee(TeamIntervieweeId: number): Observable<TeamInterviewee> {


    console.log("finding TeamInterviewee by Id: " + TeamIntervieweeId) ;

    const url = `${this.url}${TeamIntervieweeId}` ;
    return this.httpClient.get<TeamInterviewee>(url).pipe() ;

  }

  public findAllTeamInterviewees(): Observable<TeamInterviewee[]> {

    return this.httpClient.get<TeamInterviewee[]>(this.url).pipe() ;

  }

  public findTeamIntervieweesByEngagementId(engagementId: number): Observable<TeamInterviewee[]> {

    console.log('finding TeamInterviewees for clientId: ' + engagementId) ;

    const url = `${this.url}engagement/${engagementId}`

    return  this.httpClient.get<TeamInterviewee[]>(url).pipe(
      catchError(this.handleError<TeamInterviewee[]>('findTeamIntervieweesByEngagementId', []))
    ) ;

  }

  public addTeamInterviewee(newTeamInterviewee: TeamInterviewee): Observable<TeamInterviewee> {


    console.log("Adding TeamInterviewee: " + JSON.stringify(newTeamInterviewee)) ; 

    return this.httpClient.post<TeamInterviewee>(this.url, newTeamInterviewee, this.httpOptions).pipe(
      tap((ne: TeamInterviewee) => {
          this.teamIntervieweeChangedSubscription.next(true);
        catchError(this.handleError<TeamInterviewee>('addTeamInterviewee', ne));
      })
    ) ;

  }


  public updateTeamInterviewee(TeamIntervieweeId: number, TeamInterviewee: TeamInterviewee): Observable<TeamInterviewee> {


    const url = `${this.url}${TeamIntervieweeId}` ;

    return this.httpClient.put<TeamInterviewee>(url, TeamInterviewee, this.httpOptions).pipe(
      tap((newTeamInterviewee: TeamInterviewee) => {
          this.teamIntervieweeChangedSubscription.next(true) ;
        catchError(this.handleError<TeamInterviewee>('updateTeamInterviewee', newTeamInterviewee)) ;
      } )
    );

  }

  public deleteTeamInterviewee(TeamIntervieweeId: number): Observable<TeamInterviewee> {

    const url = `${this.url}${TeamIntervieweeId}` ;

    return this.httpClient.delete<TeamInterviewee>(url).pipe(
      tap((d: TeamInterviewee) =>
      {
        this.teamIntervieweeChangedSubscription.next(true);

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
