import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { ChartData } from '../engagementInterviewsummaryvo';
import { Finding } from './finding';

@Injectable({
  providedIn: 'root'
})
export class FindingService {


  findFindingSummaryByEngagementId(engagementId: number): Observable<ChartData[]> {

    const url = `${this.baseUrl}engagementsummary/${engagementId}`;

    console.log('calling: ' + url) ; 

    return this.httpClient.get<ChartData[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findFindingSummaryByEngagementId', {}));
      })
    );

  }

  baseUrl = '/api/finding/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  findingChanged = new Subject<boolean>() ;
  findingSelected = new Subject<number>() ;


  constructor(private httpClient: HttpClient) { }


  // Find a Finding
  public findById(findingId: number): Observable<Finding> {

    const url = `${this.baseUrl}${findingId}`

    return this.httpClient.get<Finding>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findById', {}));
      })
    );

  }

  // Find all Finding by Interview
  public findByInterview(interviewId: number): Observable<Finding[]> {

    const url = `${this.baseUrl}interview/${interviewId}`;

    return this.httpClient.get<Finding[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findByInterview', []));
      })
    )

  }


  // Find all Findings by Engagement
  public findByEngagement(interviewId: number): Observable<Finding[]> {

    const url = `${this.baseUrl}engagement/${interviewId}`;

    return this.httpClient.get<Finding[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findByEngagement', []));
      })
    )

  }


  // Add a Finding
  public createFinding(finding: Finding): Observable<Finding> {

    return this.httpClient.post<Finding>(this.baseUrl, finding, this.httpOptions).pipe(
      tap(_=> {
        this.findingChanged.next(true) ;
        catchError(this.handleError('createFinding', {}));
      })
    );

  }

  // Add a Finding to an Intervew


  // Update a Finding
  public updateFinding(findingId: number, finding: Finding): Observable<Finding> {

    const url = `${this.baseUrl}${findingId}` ;

    return this.httpClient.put<Finding>(url, finding, this.httpOptions).pipe(
      tap(_=> {
        this.findingChanged.next(true) ;
        catchError(this.handleError('updateFinding', _));
      })
    );

  }

  // Delete a finding
  public deleteFinding(findingId: number): Observable<Finding> {

    const url = `${this.baseUrl}${findingId}`;


    return this.httpClient.delete<Finding>(url).pipe(
      tap(_=> {
        this.findingChanged.next(true) ;
        catchError(this.handleError('deleteFinding', _)) ;
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
