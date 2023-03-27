import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { ChartData } from './engagementInterviewsummaryvo';
import { Interview } from './interview/interview';
import { InterviewReviewVO } from './interviewreview';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {


  selectedInterview = new Subject<number>() ;


  private baseUrl = '/api/interview/' ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  interviewChanged = new Subject<boolean>() ;
  startedEditing = new Subject<number>() ;


  public findInterviewsByEngagementWithDetail(engagementId: number): Observable<Interview[]> {

    const url = `${this.baseUrl}engagement/${engagementId}/with-details`;

    return this.httpClient.get<Interview[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findInterviewsByEngagementWithDetail', [])) ;
      })
    );

  }

   // Find the interview answers and answerers.
   public findInterviewWithDetails(interviewId: number): Observable<InterviewReviewVO> {

    const url = `${this.baseUrl}interviewreview/${interviewId}`;

    return this.httpClient.get<InterviewReviewVO>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findInterviewsByEngagementWithDetail', [])) ;
      })
    );
  }

  public findInterviewSummaryByEngagementId(engagementId: number): Observable<ChartData[]> {

    const url = `${this.baseUrl}engagementsummary/${engagementId}`;

    return this.httpClient.get<ChartData[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findInterviewsByEngagementWithDetail', [])) ;
      })
    );

  }


  //interviewersummary
  public findInterviewerSummaryByEngagementId(engagementId: number): Observable<ChartData[]> {

    const url = `${this.baseUrl}interviewersummary/${engagementId}`;

    return this.httpClient.get<ChartData[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findInterviewerSummaryByEngagementId', [])) ;
      })
    );

  }

  // interviewstatussummary
  public findInterviewStatusSummaryByEngagementId(engagementId: number): Observable<ChartData[]> {

    const url = `${this.baseUrl}interviewstatussummary/${engagementId}`;

    return this.httpClient.get<ChartData[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findInterviewStatusSummaryByEngagementId', [])) ;
      })
    );

  }


  public  findInterviewsByEngagement(engagementId: number): Observable<Interview[]> {

    // console.log("Finding Interviews for engagement: " + engagementId)

    const url = `${this.baseUrl}engagement/${engagementId}`

    return this.httpClient.get<Interview[]>(url).pipe(
      tap(_ => {
        // console.log("Found Interviews: " + JSON.stringify(_));
        catchError(this.handleError('findInterviewsByEngagement', [])) ;
      })
    );

  }

  public findInterviewsAll(): Observable<Interview[]> {

    return this.httpClient.get<Interview[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findInterviewsAll', [])) ;
      })
    );

  }


  public findInterview(interviewId: number): Observable<Interview> {

    const url = `${this.baseUrl}${interviewId}`

    return this.httpClient.get<Interview>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findInterview', {})) ;
      })
    ) ;

  }

  public addInterview(newInterview: Interview) : Observable<Interview> {

    console.log("Adding Interview: " + JSON.stringify(newInterview))

    return this.httpClient.post<Interview>(this.baseUrl, newInterview, this.httpOptions).pipe (
      tap(_ => {
        this.interviewChanged.next(true) ;
        catchError(this.handleError('addInterview', {})) ;
      })
    ) ;

  }

  public updateInterview(interviewId: number, newInterview: Interview): Observable<Interview> {

    console.log("Updating interview ID:" + interviewId + " with: " + JSON.stringify(newInterview)) ;

    const url = `${this.baseUrl}${interviewId}` ;

    return this.httpClient.put<Interview>(url, newInterview, this.httpOptions).pipe(
      tap(_ => {
        this.interviewChanged.next(true) ;
        catchError(this.handleError('updateInterview', {})) ;
      })
    ) ;

  }

  public deleteInterview(interviewId: number): Observable<Interview> {

    const url = `${this.baseUrl}${interviewId}` ;

    console.log("calling delete method of: "+url) ;

    return this.httpClient.delete<Interview>(this.baseUrl).pipe(
      tap((di : Interview) => {
        this.interviewChanged.next(true) ;
        catchError(this.handleError('deletInterview', {})) ;
      })
    ) ;

  }

  concludeInterview(interview: Interview): Observable<Interview> {

    // 3 is the ID for Conducted. @TODO - this needs to be changed.
    interview.interviewStatus.interviewStatusId = 3 ;
    return this.updateInterview(interview.interviewId, interview)

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }



}
