import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { ChartData } from '../engagementInterviewsummaryvo';
import { Survey } from './survey';
import { SurveyStatusVO } from './survey-dashboard/surveystatusvo';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {


  baseUrl: string = "/api/survey/";

  surveySelected = new Subject<number>() ;
  surveyChanged = new Subject<true>() ;

  constructor(private httpClient: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  // Find a Survey
  findById(id: number): Observable<Survey> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.get<Survey>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findById', {}))
      })

    );


  }

  // Find Surveys by Engagement.
  findByEngagementId(engagementId: number): Observable<Survey[]> {

    const url = `${this.baseUrl}engagement/${engagementId}` ;

    return this.httpClient.get<Survey[]>(url).pipe(
      tap(_ => {
        console.log("finding Surveys by Engagement"+ engagementId) ;
        catchError(this.handleError('findByEngagementId', {}))
      })

    );


  }

  // Find All Surveys
  findAll(): Observable<Survey[]> {
    return this.httpClient.get<Survey[]>(this.baseUrl).pipe(
    );
  }

  // Find Surveys by Created By
  findByUserId(userId: number): Observable<Survey[]> {

    const url = `${this.baseUrl}user/${userId}` ;

    return this.httpClient.get<Survey[]>(url).pipe() ;


  }

  // Find Survey Statistics by Engagement
  findSurveyStatistics(engagementId: number): Observable<SurveyStatusVO[]> {
    const url  = `${this.baseUrl}statistics/${engagementId}`;

    return this.httpClient.get<SurveyStatusVO[]>(url).pipe(
      tap((s) => {
        catchError(this.handleError('findSurveyStatistics', s));
      })
    );

  }

  // add a survey
  addSurvey(survey: Survey): Observable<Survey> {
    console.log("posting to:" + this.baseUrl) ;
    return this.httpClient.post<Survey>(this.baseUrl, survey, this.httpOptions).pipe(
      tap((s: Survey) => {
        console.log(JSON.stringify(s)) ;
        catchError(this.handleError('addEngagement', s));
      })
    )
  }

  // update a survey
  updateSurvey(sId: number, survey: Survey): Observable<Survey> {

    const url = `${this.baseUrl}${sId}` ;

    return this.httpClient.put<Survey>(url, survey, this.httpOptions).pipe(
      tap((s: Survey) => {
        catchError(this.handleError('addEngagement', s));
      })
    )

  }

  // delete a survey
  deleteSurvey(sId: number): Observable<Survey> {
    const url = `${this.baseUrl}${sId}`;

    return this.httpClient.delete<Survey>(url).pipe(
      tap((s: Survey) => {
        catchError(this.handleError('deleteSurvey', s));
      })
    )
  }

   // Handle errors.
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }


}

