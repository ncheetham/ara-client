import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservedValuesFromArray, of, Subject, tap } from 'rxjs';
import { ChartData } from './engagementInterviewsummaryvo';
import { Evidence } from './evidence/evidence';

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {

  baseUrl = '/api/evidence/' ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  evidenceChanged = new Subject<boolean>() ;
  evidenceSelected = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  // findEvidence
  findEvidence(evidenceId: number): Observable<Evidence> {

    const url = `${this.baseUrl}${evidenceId}` ;

    return this.httpClient.get<Evidence>(url).pipe(
      tap((e: Evidence) => {
        catchError(this.handleError('findEvidence', e)) ;
      })
    );

  }

  // FindAll Evidences
  findAll(): Observable<Evidence[]> {

    return this.httpClient.get<Evidence[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ;
      })
    ) ;

  }


  // Find by Interview Id
  findByInterview(interviewId: number): Observable<Evidence[]> {

    const url = `${this.baseUrl}interview/${interviewId}`;

    return this.httpClient.get<Evidence[]>(url).pipe(
      tap((e: Evidence[]) => {
        catchError(this.handleError('findByInterview', e)) ;
      })
    );

  }

  // Find Summary Status by EngagementID
  findSummaryStatusByEngagemntId(engagementId: number): Observable<ChartData[]> {

    const url = `${this.baseUrl}evidencestatussummary/${engagementId}` ;

    return this.httpClient.get<ChartData[]>(url).pipe(
      tap((e: ChartData[]) => {
        catchError(this.handleError('findSummaryStatusByEngagemntId', e)) ;
      })
    );
  }


  // Find Summary Type by EngagementID
  findSummaryTypeByEngagemntId(engagementId: number): Observable<ChartData[]> {

    const url = `${this.baseUrl}evidencetypesummary/${engagementId}` ;

    return this.httpClient.get<ChartData[]>(url).pipe(
      tap((e: ChartData[]) => {
        catchError(this.handleError('findSummaryTypeByEngagemntId', e)) ;
      })
    );

  }

  // Add Evidence
  addEvidence(evidence: Evidence): Observable<Evidence> {

    return this.httpClient.post<Evidence>(this.baseUrl, evidence, this.httpOptions).pipe(
      tap((e: Evidence) => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('addEvidence', e));
      })
    );

  }

  // Update Evidence
  updateEvidence(evidenceId: number, evidence: Evidence): Observable<Evidence> {

    const url = `${this.baseUrl}${evidenceId}` ;

    return this.httpClient.put<Evidence>(url, evidence, this.httpOptions).pipe(
      tap((e: Evidence) => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('updateEvidence', e)) ;
      })
    ) ;

  }

  // Delete Evidence
  deleteEvidence(evidenceId: number): Observable<Evidence> {

    const url = `${this.baseUrl}${evidenceId}` ;

    return this.httpClient.delete<Evidence>(url).pipe(
      tap(_ => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('deleteEvidence', {})) ;
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
