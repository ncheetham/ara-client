import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { InterviewQuestionInterviewee } from './interviewquestioninterviewee';

@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionIntervieweeService {

  baseUrl: string = '/api/iqi/'


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  // Add All Interview Question Interviewees.
  addAllInterviewQuestionInterviewees(iqi: InterviewQuestionInterviewee[]):Observable<InterviewQuestionInterviewee[]> {

    const url = `${this.baseUrl}multi/`;

    return this.httpClient.post<InterviewQuestionInterviewee[]>(url, iqi, this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError('addAllInterviewQuestionInterviewees', []))
      })
    )
  }

  // Find an InterviewQuestionInterviewee
  public findById(iqiId: number): Observable<InterviewQuestionInterviewee> {

    const url = `${this.baseUrl}${iqiId}` ;

    return this.httpClient.get<InterviewQuestionInterviewee>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findById', {})) ;
      })
    )
  }

  // Find All InterviewQuestionInterviewee's
  public findAll(): Observable<InterviewQuestionInterviewee[]> {

    return this.httpClient.get<InterviewQuestionInterviewee[]>(this.baseUrl).pipe(
      tap(_=> {
        catchError(this.handleError("findAll", [])) ;
      })
    )

  }

  // Find All InterviewQuestionInterviewees by InterviewQuestion
  public findByInterviewQuestion(iqId: number): Observable<InterviewQuestionInterviewee[]> {

    const url = `${this.baseUrl}iq/${iqId}` ;

    return this.httpClient.get<InterviewQuestionInterviewee[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findByInterviewQuestion', []));
      })
    )

  }

  // Add an InterviewQuestionInterviewee
  public addInterviewQuestionInterviewee(iqi: InterviewQuestionInterviewee): Observable<InterviewQuestionInterviewee> {

    return this.httpClient.post<InterviewQuestionInterviewee>(this.baseUrl, iqi,this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError('addInterviewQuetionInterviewee', {})) ;
      })
    );
  }


  // Update an InterviewQuestionInterviewee
  public updateInterviewQuestionInterviewee(iqiId: number, iqi: InterviewQuestionInterviewee): Observable<InterviewQuestionInterviewee> {

    const url = `${this.baseUrl}${iqiId}` ;

    return this.httpClient.put<InterviewQuestionInterviewee>(url, iqi, this.httpOptions).pipe(
      tap(_=> {
        catchError(this.handleError('updateInterviewQuestionInterviewee', {})) ;
      })
    )

  }


  // Delete an InterviewQuestionInterviewee
  public deleteInterviewQuestionInterviewee(iqiId: number): Observable<InterviewQuestionInterviewee> {

    const url = `${this.baseUrl}${iqiId}` ;

    return this.httpClient.delete<InterviewQuestionInterviewee>(url).pipe(
      tap(_=> {
        catchError(this.handleError('deleteInterviewQuestionInterviewee', {})) ;
      })
    )

  }

  // Delete InterviewQuestionInterviewees by InterviewQuestion.
  public deleteInterviewQuestionIntervieweeByIq(iqId: number): Observable<InterviewQuestionInterviewee> {

    const url = `${this.baseUrl}iq/${iqId}` ;

    return this.httpClient.delete<InterviewQuestionInterviewee>(url).pipe(
      tap(_=> {
        catchError(this.handleError('deleteInterviewQuestionIntervieweeByIq', {})) ;
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
