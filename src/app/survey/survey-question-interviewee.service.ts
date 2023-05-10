import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { SurveyQuestionInterviewee } from './surveyquestioninterviewee';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionIntervieweeService {

  baseUrl = '/api/surveyquestioninterviewee/' ;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  constructor(private httpClient: HttpClient) { }

  // Find a survey question interviewee
  public findById(sqiId: number): Observable<SurveyQuestionInterviewee> {

    const url = `${this.baseUrl}${sqiId}` ;

    return this.httpClient.get<SurveyQuestionInterviewee>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findById', {}))
      })
    );

  }

  // Find all Survey Question Interviewees
  public findAll(): Observable<SurveyQuestionInterviewee[]> {

    return this.httpClient.get<SurveyQuestionInterviewee[]>(this.baseUrl).pipe(
      tap(_=> {
        catchError(this.handleError('findAll', [])) ;
      })
    );
  }

  // Find Survey Questions by Interviewee
  public findByInterviewee(intervieweeId: number): Observable<SurveyQuestionInterviewee[]> {

    const url = `${this.baseUrl}interviewee/${intervieweeId}` ;

    return this.httpClient.get<SurveyQuestionInterviewee[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findByIntervieweeId', {}))
      })
    );
  }

  public findBySurveyQuestion(surveyQuestionId: number): Observable<SurveyQuestionInterviewee[]> {

    const url = `${this.baseUrl}surveyquestion/${surveyQuestionId}` ;

    return this.httpClient.get<SurveyQuestionInterviewee[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findBySurveyQuestion', {}))
      })
    );


  }


  public findBySurveyQuestionInterviewee(surveyQuestionId: number, intervieweeId: number): Observable<SurveyQuestionInterviewee> {

    const url = `${this.baseUrl}surveyquestion/${surveyQuestionId}/interviewee/${intervieweeId}` ;

    return this.httpClient.get<SurveyQuestionInterviewee>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findBySurveyQuestionInterviewee', {}))
      })
    );
  }

  // Create a survey Question Interviewee
  public createSurveyQuestionInterviewee(sqi: SurveyQuestionInterviewee): Observable<SurveyQuestionInterviewee> {

    return this.httpClient.post<SurveyQuestionInterviewee>(this.baseUrl, sqi, this.httpOptions).pipe(
      tap(_=> {
        catchError(this.handleError('createSurveyQuestionInterviewee', {})) ;
      })
    );

  }

  // Update a Survey Question Interviewee
  public updateSurveyQuestionInterviewee(sqiId: number, sqi: SurveyQuestionInterviewee): Observable<SurveyQuestionInterviewee> {

    const url = `${this.baseUrl}${sqiId}` ;

    return this.httpClient.put<SurveyQuestionInterviewee>(url, sqi, this.httpOptions).pipe(
      tap(_=> {
        catchError(this.handleError('createSurveyQuestionInterviewee', {})) ;
      })
    );

  }

  // Delete a Survey Question Interviewee
  public deleteSurveyQuestionInterviewee(sqiId: number): Observable<SurveyQuestionInterviewee> {

    const url = `${this.baseUrl}${sqiId}` ;

    return this.httpClient.delete<SurveyQuestionInterviewee>(url).pipe(
      tap(_=> {
        catchError(this.handleError('deleteSurveyQuestionInterviewee', {}));
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
