import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { SurveyQuestionCategory } from './survey-question-category/surveyquestioncategory';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionCategoryService {


  baseUrl = "/api/surveyquestioncategory/" ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  // Find SurveyQuestionCategory
  public findById(sqcId: number): Observable<SurveyQuestionCategory> {

    const url = `${this.baseUrl}${sqcId}` ;

    return this.httpClient.get<SurveyQuestionCategory>(url).pipe(
      tap(_ => {
        catchError(this.handleError("findById", {}))
      })
    );

  }

  // Find All SurveyQuestionCategories
  public findAll(): Observable<SurveyQuestionCategory[]> {
    return this.httpClient.get<SurveyQuestionCategory[]>(this.baseUrl).pipe(
      tap(_=> {
        catchError(this.handleError("findAll", [])) ;
      })
    );
  }


  // Create a SurveyQuestionCategory
  public createSurveyQuesetionCategory(sqc: SurveyQuestionCategory): Observable<SurveyQuestionCategory> {

    return this.httpClient.post<SurveyQuestionCategory>(this.baseUrl, sqc, this.httpOptions).pipe(
      tap(_ => {
        catchError(this.handleError("createSurveyQuestionCategory", {}));
      })
    );

  }

  // Update a Survey QuestionCategory
  public updateSurveyQuestionCategory(id: number, sqc: SurveyQuestionCategory): Observable<SurveyQuestionCategory> {

    const url =   `${this.baseUrl}${id}` ;

    return this.httpClient.put<SurveyQuestionCategory>(url, sqc, this.httpOptions).pipe(
      tap(_=> {
        catchError(this.handleError("updateSurveyQuestionCategory", {}));
      })
    ) ;

  }

  // Delete a SurveyQuestionCategory
  public deleteSurveyQuestionCategory(id: number): Observable<SurveyQuestionCategory> {

    const url =   `${this.baseUrl}${id}` ;

    return this.httpClient.delete<SurveyQuestionCategory>(url).pipe(
      tap(_=> {
        catchError(this.handleError("deleteSurveyQuestionCategory", {}));
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
