import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, catchError, of } from 'rxjs';
import { InterviewQuestion } from './interviewquestion';



@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionService {


  private baseUrl = '/api/interviewquestion/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  interviewQuestionChanged = new Subject<boolean>() ;
  startedEditing = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  // Find all the Questions.
  public findAll() : Observable<InterviewQuestion[]> {

    return this.httpClient.get<InterviewQuestion[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ;
      })
    );

  }

  // Downloads the questions as an Excel Spreadsheet.
  downloadQuestions(interviewId: number): Observable<any> {

    const url = `${this.baseUrl}excel/${interviewId}` ;

    console.log(url) ;
    return this.httpClient.get<any>(url, {observe: 'response', responseType: 'arraybuffer' as 'json'}).pipe(
      tap(_ => {

        catchError(this.handleError('downloadQuestions', [])) ;
      })
    );

  }



  // Find Questions by EngagementTheme.
  // public findByEngagementTheme(engagementThemeId: number): Observable<Question[]> {

  //   const url = `${this.baseUrl}engagementtheme/${engagementThemeId}` ;

  //   return this.httpClient.get<Question[]>(url).pipe(
  //   tap(_ => {
  //     catchError(this.handleError('findByEngagementTheme', [])) ;
  //   })
  //   );

  // }

  //

  // Find all the questions for an interview.
  public findByInterviewId(interviewId: number): Observable<InterviewQuestion[]> {

    const url = `${this.baseUrl}interview/${interviewId}` ;

    return this.httpClient.get<InterviewQuestion[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findByInterviewId', [])) ;
      })
    ) ;
  }

  // // Find all questions by Theme.
  // public findByEngagemenThemeId(engagementThemeId: number): Observable<Question[]> {

  //   const url = `${this.baseUrl}engagementtheme/${engagementThemeId}` ;

  //   return this.httpClient.get<Question[]>(this.baseUrl).pipe(
  //     tap(_ => {
  //       catchError(this.handleError('findByInterviewId', [])) ;
  //     })
  //   ) ;

  // }


  // Find a question.
  public findInterviewQuestion(interviewQuestionId: number): Observable<InterviewQuestion> {

    const url = `${this.baseUrl}${interviewQuestionId}` ;

   return this.httpClient.get<InterviewQuestion>(url).pipe(tap(_ => {
          console.log("called: " + url) ;
          catchError(this.handleError('findInterviewQuestion', {})) ;
    })) ;

  }

  // Add a Question.
  public addInterviewQuestion(question: InterviewQuestion): Observable<InterviewQuestion> {

    //console.log("Adding Interview Question:"+ JSON.stringify(question)) ;

    return this.httpClient.post<InterviewQuestion>(this.baseUrl, question, this.httpOptions).pipe(
      tap(_ => {
        this.interviewQuestionChanged.next(true) ;
        catchError(this.handleError('addQuestion', {})) ;
      })
    ) ;

  }

  // Update a question
  public updateInterviewQuestion(questionId: number, question: InterviewQuestion): Observable<InterviewQuestion> {

      //console.log("Updated Question " + JSON.stringify(question)) ;

      const url = `${this.baseUrl}${questionId}` ;

      return this.httpClient.put<InterviewQuestion>(url, question, this.httpOptions).pipe(
        tap(_ => {
          this.interviewQuestionChanged.next(true) ;
          catchError(this.handleError('updateInterviewQuestion', {})) ;
        })
      ) ;

  }


  // Delete a question.
  public deleteQuestion(questionId: number): Observable<InterviewQuestion> {

    const url = `${this.baseUrl}${questionId}` ;

    return this.httpClient.delete<InterviewQuestion>(url).pipe(
      tap(_ => {
        this.interviewQuestionChanged.next(true) ;
        catchError(this.handleError('delete', {})) ;
      })
    ) ;

  }

  // Find the Question Count for the Interview
  findQuestionCountByInterviewId(interviewId: number): Observable<number> {
    const url = `${this.baseUrl}count/interview/${interviewId}` ;

    return this.httpClient.get<number>(this.baseUrl).pipe(
      tap((x: number) => {
        console.log(JSON.stringify(x)) ;
        catchError(this.handleError('findQuestionCountById', 0)) ;
      })
    ) ;
  }

  // Find the Question Count by EngagementTheme
  // findQuestionCountByEngagementThemeId(engagementThemeId: number): Observable<number> {
  //   const url = `${this.baseUrl}count/engagementtheme/${engagementThemeId}` ;

  //   return this.httpClient.get<number>(this.baseUrl).pipe(
  //     tap((x: number) => {
  //       console.log(JSON.stringify(x)) ;
  //       catchError(this.handleError('findQuestionCountByEngagementThemeId', 0)) ;
  //     })
  //   ) ;
  // }


  copyQuestions(fromInterviewId: number, toInterviewId: number): Observable<InterviewQuestion[]> {

    const url = `${this.baseUrl}from/${fromInterviewId}/to/${toInterviewId}` ;

    return this.httpClient.get<InterviewQuestion[]>(url).pipe(
      tap((x: InterviewQuestion[]) => {
        console.log(JSON.stringify(x)) ;
        catchError(this.handleError('copyQusetions', [])) ;
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
