import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, catchError, of } from 'rxjs';
import { EngagementEvidence } from './engagementevidence';
import { Evidence } from './evidence/evidence';

@Injectable({
  providedIn: 'root'
})
export class EngagementEvidenceService {

  baseUrl = '/api/engagementevidence/' ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  evidenceChanged = new Subject<boolean>() ;
  evidenceSelected = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  // findEvidence
  findEngagementEvidence(evidenceId: number): Observable<EngagementEvidence> {

    const url = `${this.baseUrl}${evidenceId}` ;

    return this.httpClient.get<EngagementEvidence>(url).pipe(
      tap((e: EngagementEvidence) => {
        catchError(this.handleError('findEvidence', e)) ;
      })
    );

  }

  // FindAll Evidences
  findAll(): Observable<EngagementEvidence[]> {

    return this.httpClient.get<EngagementEvidence[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ;
      })
    ) ;

  }


  // Find by Engagement Id
  findByEngagementId(engagemntId: number): Observable<EngagementEvidence[]> {

    const url = `${this.baseUrl}engagement/${engagemntId}`;

    return this.httpClient.get<EngagementEvidence[]>(url).pipe(
      tap((e: EngagementEvidence[]) => {
        catchError(this.handleError('findByEngagementId', e)) ;
      })
    );

  }


  // Add Evidence
  addEngagementEvidence(evidence: EngagementEvidence): Observable<EngagementEvidence> {

    return this.httpClient.post<EngagementEvidence>(this.baseUrl, evidence, this.httpOptions).pipe(
      tap((e: EngagementEvidence) => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('addEvidence', e));
      })
    );

  }

  // Update Evidence
  updateEngagementEvidence(evidenceId: number, evidenceEngagement: EngagementEvidence): Observable<EngagementEvidence> {

    const url = `${this.baseUrl}${evidenceId}` ;

    return this.httpClient.put<EngagementEvidence>(url, evidenceEngagement, this.httpOptions).pipe(
      tap((e: EngagementEvidence) => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('updateEvidence', e)) ;
      })
    ) ;

  }

  // Delete Evidence
  deleteEvidence(evidenceId: number): Observable<EngagementEvidence> {

    const url = `${this.baseUrl}${evidenceId}` ;

    return this.httpClient.delete<EngagementEvidence>(url).pipe(
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
