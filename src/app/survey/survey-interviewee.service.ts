import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { SurveyIntervieweeVO } from './survey-conduct/surveyintervieweevo';
import { Survey } from './survey';
import { SurveyInterviewee } from './survey-conduct/surveyinterviewee';

@Injectable({
  providedIn: 'root'
})
export class SurveyIntervieweeService {


  baseurl = '/api/surveyinterviewee/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  surveyIntervieweeChanged = new Subject<SurveyIntervieweeVO>() ;
  surveySelectedSubscription = new Subject<SurveyIntervieweeVO>() ;


  constructor(private httpClient: HttpClient) { }


  // Find SurveyInterviewee
  public findSurveyInterviewee(id: number): Observable<SurveyIntervieweeVO> {

    const url = `${this.baseurl}${id}` ;

    return this.httpClient.get<SurveyIntervieweeVO>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findSurveyInterviewee', _));
      })
    );

  }

  // Find all SurveyInterviewees by Survey
  public findBySurvey(surveyId: number): Observable<SurveyIntervieweeVO[]> {

    const url = `${this.baseurl}survey/${surveyId}` ;

    return this.httpClient.get<SurveyIntervieweeVO[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findBySurvey', []));
      })
    );

  }

  // Find Surveys by Interviewee
  public findByInterviewee(intervieweeId: number): Observable<SurveyInterviewee[]> {

    const url = `${this.baseurl}interviewee/${intervieweeId}` ;

    return this.httpClient.get<SurveyInterviewee[]>(url).pipe(
      tap(_=> {
        catchError(this.handleError('findBySurvey', []));
      })
    );

  }

  // Find All SurveyInterviewees
  public findAll(): Observable<SurveyIntervieweeVO[]> {
    return this.httpClient.get<SurveyIntervieweeVO[]>(this.baseurl).pipe(
      tap(_=> {
        catchError(this.handleError('findAll', [])) ;
      })
    );
  }

  // Create a SurveyInterviewee
  public createSurveyInterviewee(si: SurveyIntervieweeVO): Observable<SurveyIntervieweeVO> {

    return this.httpClient.post<SurveyIntervieweeVO>(this.baseurl, si, this.httpOptions).pipe(
      tap(_=> {
        this.surveyIntervieweeChanged.next(_) ;
        catchError(this.handleError('createSurveyInterviewee', _)) ;
      })
    );
  }

  // Update a SurveyInterviewee
  public updateSurveyInterviewee(siId: number, si: SurveyIntervieweeVO): Observable<SurveyIntervieweeVO> {

    const url = `${this.baseurl}${siId}` ;

    return this.httpClient.put<SurveyIntervieweeVO>(url, si, this.httpOptions).pipe(
      tap(_ => {
        this.surveyIntervieweeChanged.next(_) ;
        catchError(this.handleError('updateSurveyInterviewee', _));
      })
    );

  }


   // Downloads the Excel Spreadsheet of the Survey.
   downloadSurveyQuestions(surveyIntervieweeId: number): Observable<any> {

    const url = `${this.baseurl}excel/${surveyIntervieweeId}`

    console.log(url) ;
    return this.httpClient.get<any>(url, {observe: 'response', responseType: 'arraybuffer' as 'json'}).pipe(
      tap(_ => {

        catchError(this.handleError('downloadQuestions', [])) ;
      })
    );

  }


  // Delete a SurveyInterveiwee

 // Handle errors.
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error) ;
    return of(result as T) ;
  }
}



}
