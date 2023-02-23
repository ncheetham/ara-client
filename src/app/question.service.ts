import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Question } from './question/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {



  private baseUrl = '/api/question/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  questionChangedSubscription = new Subject<boolean>() ;
  startedEditing = new Subject<number>() ;

  constructor(private httpClient: HttpClient) { }

  // Find all the Questions.
  public findAll() : Observable<Question[]> {

    return this.httpClient.get<Question[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ;
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
  public findByInterviewId(interviewId: number): Observable<Question[]> {

    const url = `${this.baseUrl}interview/${interviewId}` ;

    return this.httpClient.get<Question[]>(this.baseUrl).pipe(
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
  public findQuestion(questionId: number): Observable<Question> {

    const url = `${this.baseUrl}${questionId}` ;

   return this.httpClient.get<Question>(url).pipe(tap(_ => {
          catchError(this.handleError('findQuestion', {})) ;
    })) ;

  }

  // Add a Question.
  public addQuestion(question: Question): Observable<Question> {

    return this.httpClient.post<Question>(this.baseUrl, question, this.httpOptions).pipe(
      tap(_ => {
        this.questionChangedSubscription.next(true) ;
        catchError(this.handleError('addQuestion', {})) ;
      })
    ) ;

  }

  // Update a question
  public updateQuestion(questionId: number, question: Question): Observable<Question> {

      console.log("Updated Question " + JSON.stringify(question)) ;

      const url = `${this.baseUrl}${questionId}` ;

      return this.httpClient.put<Question>(url, question, this.httpOptions).pipe(
        tap(_ => {
          this.questionChangedSubscription.next(true) ;
          catchError(this.handleError('updateQuestion', {})) ;
        })
      ) ;

  }


  // Delete a question.
  public deleteQuestion(questionId: number): Observable<Question> {

    const url = `${this.baseUrl}${questionId}` ;

    return this.httpClient.delete<Question>(url).pipe(
      tap(_ => {
        this.questionChangedSubscription.next(true) ;
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
  findQuestionCountByEngagementThemeId(engagementThemeId: number): Observable<number> {
    const url = `${this.baseUrl}count/engagementtheme/${engagementThemeId}` ;

    return this.httpClient.get<number>(this.baseUrl).pipe(
      tap((x: number) => {
        console.log(JSON.stringify(x)) ;
        catchError(this.handleError('findQuestionCountByEngagementThemeId', 0)) ;
      })
    ) ;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }


}


