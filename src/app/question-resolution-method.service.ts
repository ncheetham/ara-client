import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { QuestionResolutionMethod } from './question-resolution-method/questionresolutionmethod';
import { Question } from './question/question';


@Injectable({
  providedIn: 'root'
})
export class QuestionResolutionMethodService {

  private baseUrl = '/api/qrm/' ;
  qrmChanged = new Subject<boolean>() ;
  qrmSelected = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  // Find a QRM
  findQuestionResolutionMethod(qrmId: number): Observable<QuestionResolutionMethod> {

    const url = `${this.baseUrl}${qrmId}` ;

    return this.httpClient.get<QuestionResolutionMethod>(url).pipe(
      tap((qrm: QuestionResolutionMethod) => {
        catchError(this.handleError('findQuestionResolutionMethod', qrm)) ;
      })
    );

  }

  // Find All QRM's
  findAll(): Observable<QuestionResolutionMethod[]> {

    return this.httpClient.get<QuestionResolutionMethod[]>(this.baseUrl).pipe(
      tap(_=> {
        catchError(this.handleError('findAll', [])) ;
      })
    );

  }

  // Add a QRM
  addQuestionResolutionMethod(qrm: QuestionResolutionMethod): Observable<QuestionResolutionMethod> {
    return this.httpClient.post<QuestionResolutionMethod>(this.baseUrl, qrm, this.httpOptions).pipe(
      tap((qrm:QuestionResolutionMethod) => {
        this.qrmChanged.next(true) ;
        catchError(this.handleError('addQuestionResolutionMethod', qrm));
      })
    ) ;
  }

  // Update a QRM
  updateQuestionResolutionMethod(id: number, qrm: QuestionResolutionMethod): Observable<QuestionResolutionMethod> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.put<QuestionResolutionMethod>(url, qrm, this.httpOptions).pipe(
      tap((x: QuestionResolutionMethod)=> {
        this.qrmChanged.next(true) ;
        catchError(this.handleError('updateQuestionResolutionMethod', x))
      })
    );

  }

  // Delete a QRM
  deleteQuestionResolutionMethod(qrmId: number): Observable<QuestionResolutionMethod> {

    const url = `${this.baseUrl}${qrmId}` ;

    return this.httpClient.delete<QuestionResolutionMethod>(url).pipe(
      tap((_) => {
        this.qrmChanged.next(true) ;
        catchError(this.handleError('deleteQuestionResolutionMethod', {}))
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
