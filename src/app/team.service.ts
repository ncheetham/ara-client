import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, catchError, tap, of } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamChangedSubscription = new Subject<boolean>() ;

  teamSelected = new Subject<number>() ;
  startedEditing = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  private url = '/api/team/' ;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public findTeam(teamId: number): Observable<Team> {


    console.log("finding Team by Id: " + teamId) ;

    const url = `${this.url}${teamId}` ;
    return this.httpClient.get<Team>(url).pipe() ;

  }

  public findAllTeams(): Observable<Team[]> {

    return this.httpClient.get<Team[]>(this.url).pipe() ;

  }

  public findTeamsByEngagementId(engagementId: number): Observable<Team[]> {

    console.log('finding Teams for clientId: ' + engagementId) ;

    const url = `${this.url}engagement/${engagementId}`

    return  this.httpClient.get<Team[]>(url).pipe(
      catchError(this.handleError<Team[]>('findTeamsByEngagementId', []))
    ) ;

  }

  public addTeam(newTeam: Team): Observable<Team> {

    console.log("adding Team for engagement: " + JSON.stringify(newTeam)) ;

    return this.httpClient.post<Team>(this.url, newTeam, this.httpOptions).pipe(
      tap((ne: Team) => {

          this.teamChangedSubscription.next(true);

        catchError(this.handleError<Team>('addTeam', ne));
      })
    ) ;

  }


  public updateTeam(teamId: number, team: Team): Observable<Team> {


    const url = `${this.url}${teamId}` ;

    return this.httpClient.put<Team>(url, team, this.httpOptions).pipe(
      tap((newTeam: Team) => {
          this.teamChangedSubscription.next(true) ;
        catchError(this.handleError<Team>('updateTeam', newTeam)) ;
      } )
    );

  }

  public deleteTeam(teamId: number): Observable<Team> {

    const url = `${this.url}${teamId}` ;

    return this.httpClient.delete<Team>(url).pipe(
      tap((d: Team) =>
      {
        this.teamChangedSubscription.next(true);

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
