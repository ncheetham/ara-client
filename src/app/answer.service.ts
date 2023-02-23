import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  baseUrl = '/api/answer/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  constructor(private httpClient: HttpClient) { }


  // Add an Answer
  public addAnswer(answer: Answer): Observable<Answer> {

    return this.httpClient.post<Answer>(this.baseUrl, answer, this.httpOptions).pipe(
      tap((a: Answer) => {
        catchError(this.handleError('addAnswer', a))
      })
    )
  }

  // Find An Answer
  public findAnswer(answerId: number): Observable<Answer> {

    const url = `${this.baseUrl}${answerId}` ;

    return this.httpClient.get<Answer>(url).pipe(
      tap((a: Answer) => {
        catchError(this.handleError('addAnswer', a))
      })
    ) ;

  }

  // Find an Answer by QuestionId
  findByQuestionId(qId: number): Observable<Answer[]> {

    const url = `${this.baseUrl}question/${qId}` ;

    return this.httpClient.get<Answer[]>(url).pipe(
      tap((a: Answer[]) => {
        catchError(this.handleError('findByQuestionId', []))
      })
    );


  }

  // Find all Answers by InterviewId
  findByInterviewId(iId: number): Observable<Answer[]> {

    const url = `${this.baseUrl}interview/${iId}` ;

    return this.httpClient.get<Answer[]>(url).pipe(
      tap((a: Answer[]) => {
        catchError(this.handleError('findByInterviewId', a))
      })
    )

  }

  // Delete an Answer
  deleteAnswer(answerId: number) {

    const url = `${this.baseUrl}${answerId}` ;

    return this.httpClient.delete(url).pipe(
      tap(_ => {
        catchError(this.handleError('deleteAnswer', {}))
      })
    )
  }

  // Update an Answer.
  updateAnswer(aId: number, answer: Answer): Observable<Answer> {

    const url = `${this.baseUrl}${aId}` ;

    return this.httpClient.put<Answer>(url, answer, this.httpOptions).pipe(
      tap((a: Answer) => {
        catchError(this.handleError('updateAnswer', a))
      })
    );

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }

  }

}
