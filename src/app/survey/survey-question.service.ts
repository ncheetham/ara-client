import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { SurveyQuestion } from './surveyquestion';
import { Survey } from './survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionService {

  baseUrl = "/api/surveyquestion/" ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  surveyQuestionCreatedSubscription = new Subject<SurveyQuestion>() ;


  constructor(private httpClient: HttpClient) { }


  // Find a Survey Question
  public findSurveyQuestion(id: number): Observable<SurveyQuestion> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.get<SurveyQuestion>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findSurveyQuestion', {}));
      })
    );
  }

  // Find all Survey Questions
  public findAll(id: number): Observable<SurveyQuestion[]> {

    return this.httpClient.get<SurveyQuestion[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findById', []));
      })
    );
  }

  // Find Survey Quesetions by Survey
  public findSurveyQuestionBySurvey(surveyId: number): Observable<SurveyQuestion[]> {

    const url = `${this.baseUrl}survey/${surveyId}` ;

    return this.httpClient.get<SurveyQuestion[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findSurveyQuestionBySurvey', {}));
      })
    );
  }

  // Add a Survey Question
  public createSurveyQuestion(sq: SurveyQuestion): Observable<SurveyQuestion> {


    return this.httpClient.post<SurveyQuestion>(this.baseUrl, sq, this.httpOptions).pipe(
      tap((sq: SurveyQuestion) => {
        this.surveyQuestionCreatedSubscription.next(sq) ;
        catchError(this.handleError('createSurveyQuestion', sq));
      })
    );
  }

  // Update a Survey Question
  public updateSurveyQuestion(id: number, sq: SurveyQuestion): Observable<SurveyQuestion> {

    const url = `${this.baseUrl}${id}`

    return this.httpClient.put<SurveyQuestion>(this.baseUrl, sq, this.httpOptions).pipe(
      tap((sq: SurveyQuestion) => {
        this.surveyQuestionCreatedSubscription.next(sq) ;
        catchError(this.handleError('updateSurveyQuestion', {}));
      })
    );
  }

  // Delete a Survey Question
  public deleteSurveyQuestion(id: number): Observable<SurveyQuestion> {

    const url = `${this.baseUrl}${id}`;

    return this.httpClient.delete<SurveyQuestion>(url).pipe(
      tap(_ => {
        catchError(this.handleError('updateSurveyQuestion', {}));
      })
    );
  }


  // Handle errors.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

}
