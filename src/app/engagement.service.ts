import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, Subscription, tap } from 'rxjs';
import { Client } from './client/client';
import { Engagement } from './engagement/engagement';

@Injectable({
  providedIn: 'root'
})
export class EngagementService {

  engagementsChangedSubscription = new Subject<boolean>() ;
  clientSelected = new Subject<number>() ;

  clientId: number ;
  startedEditing = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  private url = '/api/engagement/' ;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public findEngagement(engagementId: number): Observable<Engagement> {


    console.log("finding Engagement by Id: " + engagementId) ;

    const url = `${this.url}${engagementId}` ;
    return this.httpClient.get<Engagement>(url).pipe() ;

  }

  public findAllEngagements(): Observable<Engagement[]> {

    return this.httpClient.get<Engagement[]>(this.url).pipe() ;

  }

  public findEngagementsByClientId(clientId: number): Observable<Engagement[]> {

    console.log('finding Engagments for clientId: ' + clientId) ;

    const url = `${this.url}client/${clientId}`

    return  this.httpClient.get<Engagement[]>(url).pipe(
      catchError(this.handleError<Engagement[]>('findEngagementsByClientId', []))
    ) ;

  }

  public addEngagement(newEngagement: Engagement): Observable<Engagement> {

    console.log("adding Engagment for client: " + newEngagement.client.clientId) ;

    return this.httpClient.post<Engagement>(this.url, newEngagement, this.httpOptions).pipe(
      tap((ne: Engagement) => {
 //       this.findScopedEngagements().subscribe(x => {
          this.engagementsChangedSubscription.next(true);
 //       }) ;
        catchError(this.handleError<Engagement>('addEngagement', ne));
      })
    ) ;

  }


  public updateEngagement(engagementId: number, engagement: Engagement): Observable<Engagement> {

    console.log("updating Engagment for client: " + engagement.client.clientId + " Engagement: " + JSON.stringify(engagement))  ;

    const url = `${this.url}${engagementId}` ;

    return this.httpClient.put<Engagement>(url, engagement, this.httpOptions).pipe(
      tap((newEngagement: Engagement) => {
        console.log('update has been called') ;
  //      this.findScopedEngagements().subscribe(x => this.engagementsChangedSubscription.next(x)) ;
          this.engagementsChangedSubscription.next(true) ;
        catchError(this.handleError<Engagement>('updateEngagement', newEngagement)) ;
      } )
    );

  }


  public findScopedEngagements() : Observable<Engagement[]> {

    if(this.clientId) {
      return this.findEngagementsByClientId(this.clientId).pipe() ;
    }else {
      return this.findAllEngagements().pipe() ;
    }

  }

  public deleteEngagement(engagementId: number): Observable<Engagement> {

    const url = `${this.url}${engagementId}` ;

    return this.httpClient.delete<Engagement>(url).pipe(
      tap((d: Engagement) =>
      {
        this.engagementsChangedSubscription.next(true);
        //this.findScopedEngagements().subscribe(x=> this.engagementsChangedSubscription.next(x)) ;
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
