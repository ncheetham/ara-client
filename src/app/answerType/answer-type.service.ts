import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { AnswerType } from './answertype';

@Injectable({
  providedIn: 'root'
})
export class AnswerTypeService {

  baseUrl = "/api/answertype/" ;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  constructor(private httpClient: HttpClient) { }


  // Find an Answer type
  public findAnswerType(id: number): Observable<AnswerType> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.get<AnswerType>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findAnswerType', {}));
      })
    ) ;

  }

  // Find all Ansser Types
  public findAll(): Observable<AnswerType[]> {
    return this.httpClient.get<AnswerType[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []));
      })
    ) ;
  }

  // Create an Ansser Type
  public createAnswerType(at: AnswerType): Observable<AnswerType> {

    return this.httpClient.post<AnswerType>(this.baseUrl, at, this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError('createAnswerType', {})) ;
      })
    ) ;

  }

  // Update an Answer Type
  public updateAnswerType(id: number, at: AnswerType): Observable<AnswerType> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.put<AnswerType>(url, at, this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError('createAnswerType', {})) ;
      })
    ) ;

  }

  // Delete An AnswerType
  public deleteAnswerType(id: number): Observable<AnswerType> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.delete<AnswerType>(url).pipe(
      tap(_ => {
        catchError(this.handleError('deleteAnswerType', {}))
      })
    ) ;

  }

  // Handle errors.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }

  }




}


