import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { InterviewFinding } from './interviewfinding';

@Injectable({
  providedIn: 'root'
})
export class InterviewFindingService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = "/api/interviewfinding/" ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  // Find an Interview Finding
  findInterviewFinding(interviewFindingId: number): Observable<InterviewFinding> {

    const url = `${this.baseUrl}${interviewFindingId}` ;

    return this.httpClient.get<InterviewFinding>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findInterviewFinding', {}))
      })
    )
  }

  // Find InterviewFinding by Interview
  findInterviewFindingByInterview(interviewId: number): Observable<InterviewFinding[]> {

    const url = `${this.baseUrl}interview/${interviewId}` ;

    return this.httpClient.get<InterviewFinding[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findInterviewFindingsByInterview', []))
      })
    );

  }

  // Add an InterviewFinding
  addInterviewFinding(interviewFinding: InterviewFinding): Observable<InterviewFinding> {

    return this.httpClient.post<InterviewFinding>(this.baseUrl, interviewFinding, this.httpOptions).pipe(
      tap(_=> {
        catchError(this.handleError('addInterviewFinding', {}))
      })
    )

  }

  deleteInterviewFinding(interviewFindingId: number): Observable<InterviewFinding> {

    const url = `${this.baseUrl}${interviewFindingId}`;

    return this.httpClient.delete<InterviewFinding>(url).pipe(
      tap(_=> {
        catchError(this.handleError('deleteInterviewFinding', {}))
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
