import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { EngagementTheme } from './engagement/engagement-theme/engagementtheme';

@Injectable({
  providedIn: 'root'
})
export class EngagementThemeService {

  private baseUrl = '/api/engagementtheme/' ;

  engagementThemeChanged = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  // Find By Engagement ID's
  public findByEngagementId(engagementId: number): Observable<EngagementTheme[]> {

    const url = `${this.baseUrl}engagement/${engagementId}` ;

    return this.httpClient.get<EngagementTheme[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findByEngagementId', [])) ;
      })
    )
  }

  // Find a Theme.
  public findEngagementTheme(etId: number): Observable<EngagementTheme> {

    const url = `${this.baseUrl}${etId}`;

    return this.httpClient.get<EngagementTheme>(url).pipe(
      tap((et: EngagementTheme) => {
        catchError(this.handleError('findEngagementTheme', et)) ;
      })
    ) ;

  }

  // Add a Theme
  public saveEngagementTheme(et: EngagementTheme): Observable<EngagementTheme> {

    return this.httpClient.post<EngagementTheme>(this.baseUrl, et, this.httpOptions).pipe(
      tap((et: EngagementTheme) => {
        // Notify Interested Listeners that the Engagement Themes have changed.
        this.engagementThemeChanged.next(et.engagementThemeId) ;
        catchError(this.handleError('saveEngagementTheme', et)) ;
      }
     )) ;
  }

  // Update a Theme
  public updateEngagementTheme(etId: number, et: EngagementTheme): Observable<EngagementTheme> {

    const url = `${this.baseUrl}${etId}` ;

    return this.httpClient.put<EngagementTheme>(url, et, this.httpOptions).pipe(
      tap((et: EngagementTheme) => {
        catchError(this.handleError('updateEngagementTheme', et)) ;
      })
    )

  }

  // Delete a Theme
  public deleteEngagementTheme(etId: number): Observable<EngagementTheme> {

    const url = `${this.baseUrl}${etId}` ;

    return this.httpClient.delete<EngagementTheme>(url).pipe(
      tap(_ => {
         // Notify Interested Listeners that the Engagement Themes have changed.
         this.engagementThemeChanged.next(etId) ;
        catchError(this.handleError('deleteEngagementTheme', {}))
      })
    );

  }

  // Handle Errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

}
