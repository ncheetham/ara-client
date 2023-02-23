import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Observation } from './observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  baseUrl = '/api/observation/';

  observationChanged = new Subject<boolean>() ;


  constructor(private httpClient: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  // find observation
  public findObservation(observationId: number): Observable<Observation> {

    const url = `${this.baseUrl}${observationId}` ;

    return this.httpClient.get<Observation>(url).pipe(
      tap(o => {
        catchError(this.handleError('findObservation', o))
      })
    ) ;
  }


  // Find all Observations
  public findAll(): Observable<Observation[]> {

    return this.httpClient.get<Observation[]>(this.baseUrl).pipe(
      tap(o => {
        catchError(this.handleError('findAll', o))
      })
    ) ;

  }

 // Find all Observations by Engagement
 public findByEngagement(engagementId: number): Observable<Observation[]> {

  const url = `${this.baseUrl}engagement/${engagementId}` ;

  return this.httpClient.get<Observation[]>(this.baseUrl).pipe(
    tap(o => {
      catchError(this.handleError('findByEngagement', o))
    })
  ) ;
  }




  // Add An Observation
  public saveObservation(observation: Observation): Observable<Observation> {

    return this.httpClient.post<Observation>(this.baseUrl, observation, this.httpOptions).pipe(
      tap(o => {
        catchError(this.handleError('findAll', o))
      })
    )
  }



  // update an Observation
  public updateObservation(observationId: number, observation: Observation): Observable<Observation> {
    const url = `${this.baseUrl}${observationId}` ;

    return this.httpClient.put<Observation>(url, observation, this.httpOptions).pipe(
      tap(o => {
        catchError(this.handleError('findAll', o))
      })
    ) ;


  }

  // delete an Observation
public deleteObservation(observationId: number): Observable<Observation> {

    const url = `${this.baseUrl}${observationId}` ;

    return this.httpClient.delete<Observation>(url).pipe(
      tap(o => {
        catchError(this.handleError('findAll', o))
      })
    )

  }


  // Handle Errors

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }


}
