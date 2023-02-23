import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, catchError, of } from 'rxjs';
import { InterviewEvidence } from './interviewevidence';


@Injectable({
  providedIn: 'root'
})
export class InterviewEvidenceService {

  baseUrl = '/api/interviewevidence/' ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  evidenceChanged = new Subject<boolean>() ;
  evidenceSelected = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  // findEvidence
  findInterviewEvidence(interviewEvidenceId: number): Observable<InterviewEvidence> {

    const url = `${this.baseUrl}${interviewEvidenceId}` ;

    return this.httpClient.get<InterviewEvidence>(url).pipe(
      tap((e: InterviewEvidence) => {
        catchError(this.handleError('findInterviewEvidence', e)) ;
      })
    );

  }

  // FindAll Evidences
  findAll(): Observable<InterviewEvidence[]> {

    return this.httpClient.get<InterviewEvidence[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ;
      })
    ) ;

  }


  // Find by Interview Id
  findByInterviewId(interviewId: number): Observable<InterviewEvidence[]> {

    const url = `${this.baseUrl}Interview/${interviewId}`;

    return this.httpClient.get<InterviewEvidence[]>(url).pipe(
      tap((e: InterviewEvidence[]) => {
        catchError(this.handleError('findByInterviewId', e)) ;
      })
    );

  }


  // Add Evidence
  addInterviewEvidence(interviewevidence: InterviewEvidence): Observable<InterviewEvidence> {

    return this.httpClient.post<InterviewEvidence>(this.baseUrl, interviewevidence, this.httpOptions).pipe(
      tap((e: InterviewEvidence) => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('addInterviewEvidence', e));
      })
    );

  }

  // Update Evidence
  updateInterviewEvidence(interviewEvidenceId: number, interviewEvidence: InterviewEvidence): Observable<InterviewEvidence> {

    const url = `${this.baseUrl}${interviewEvidenceId}` ;

    return this.httpClient.put<InterviewEvidence>(url, interviewEvidence, this.httpOptions).pipe(
      tap((e: InterviewEvidence) => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('updateInterviewEvidence', e)) ;
      })
    ) ;

  }

  // Delete Evidence
  deleteInterviewEvidence(interviewEvidenceId: number): Observable<InterviewEvidence> {

    const url = `${this.baseUrl}${interviewEvidenceId}` ;

    return this.httpClient.delete<InterviewEvidence>(url).pipe(
      tap(_ => {
        this.evidenceChanged.next(true) ;
        catchError(this.handleError('deleteInterviewEvidence', {})) ;
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
