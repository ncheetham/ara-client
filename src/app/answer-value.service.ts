import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { AnswerValueVO } from './survey/dropdown-answer/answervaluevo';

@Injectable({
  providedIn: 'root'
})
export class AnswerValueService {

  baseUrl = "/api/answervalue/" ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  constructor(private httpClient: HttpClient) { }


  // Find AnswerValue
  public findAnswerValue(id: number): Observable<AnswerValueVO> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.get<AnswerValueVO>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findAnswerValue', {}));
      })
    );


  }

  // Find All AnswerValues
  public findAll(): Observable<AnswerValueVO[]> {
    return this.httpClient.get<AnswerValueVO[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []));
      })
    );
  }

  // Find AnswerValues by Quesstion
  public findByQuestion(questionId: number): Observable<AnswerValueVO[]> {

    const url = `${this.baseUrl}question/${questionId}` ;

    return this.httpClient.get<AnswerValueVO[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findByQuestion', [])) ;
      })
    );
  }

  // Create AnswerValue
  public createAnswerValue(av: AnswerValueVO): Observable<AnswerValueVO> {

    return this.httpClient.post<AnswerValueVO>(this.baseUrl, av, this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError('createAnswerValue', _)) ;
      })
    );

  }

  // Create AnswerValues
  public createAnswerValues(avs: AnswerValueVO[]): Observable<AnswerValueVO[]> {

    const url = `${this.baseUrl}multiple/` ;

    return this.httpClient.post<AnswerValueVO[]>(url, avs, this.httpOptions).pipe(
      tap(_=> {
        catchError(this.handleError('createAnswerValues', [])) ;
      })
    );

  }

  // Update AnswerValue
  public updateAnswerValue(avId: number, av: AnswerValueVO): Observable<AnswerValueVO> {

    const url = `${this.baseUrl}${avId}` ;

    return this.httpClient.put<AnswerValueVO>(url, av, this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError('updateAnswerValue', _)) ;
      })
    );

  }

  // Update AnsserValues
  public updateAnswerValues(avs: AnswerValueVO[]): Observable<AnswerValueVO[]> {

    const url = `${this.baseUrl}multiple/` ;

    return this.httpClient.put<AnswerValueVO[]>(url, avs, this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError('updateAnswerValues', _));
      })
    );

  }

  // Delete Answer Value
  public deleteAnswerValue(id: number): Observable<AnswerValueVO> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.delete<AnswerValueVO>(url).pipe(
      tap(_=> {
        catchError(this.handleError('deleteAnswerValue', {})) ;
      })
    );

  }

  // Delete Ansser Value
  public deleteAnswerValueByQuestion(qId: number): Observable<AnswerValueVO> {

    const url = `${this.baseUrl}question/${qId}` ;

    return this.httpClient.delete<AnswerValueVO>(url).pipe(
      tap(_ => {
        catchError(this.handleError('deleteAnswerByQuestion', {})) ;
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
