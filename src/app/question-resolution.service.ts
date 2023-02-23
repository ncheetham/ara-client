import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { QuestionResolution } from './questionresolution';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolutionService {

  baseUrl =  '/api/qr/'

  questionResolutionChanged = new Subject<boolean>() ;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  questionResolutionSelected = new Subject<number>();

  constructor(private httpClient: HttpClient) { }

  // Find A Question Resolution
  findQuestionResolution(qrId: number): Observable<QuestionResolution> {

    const url = `${this.baseUrl}${qrId}`

    return this.httpClient.get<QuestionResolution>(url).pipe(
      tap((qr: QuestionResolution) => {
        catchError(this.handleError('findQuestionResolution', qr)) ;
      })
    );
  }


  // Find All Question Resolutions
  findAll(): Observable<QuestionResolution[]> {
    return this.httpClient.get<QuestionResolution[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []));
      })
    ) ;
  }

  // Add a Question Resolution
  addQuestionResolution(qr: QuestionResolution): Observable<QuestionResolution> {

    return this.httpClient.post<QuestionResolution>(this.baseUrl, qr, this.httpOptions).pipe(
      tap((qr: QuestionResolution) => {
        this.questionResolutionChanged.next(true);
        catchError(this.handleError('addQuestionResolution', qr)) ;
      })
    ) ;

  }

  // Update a Question Resolution
  updateQuestionResolution(qrId: number, qr: QuestionResolution): Observable<QuestionResolution> {

    const url = `${this.baseUrl}${qrId}` ;

    return this.httpClient.put<QuestionResolution>(url, qr, this.httpOptions).pipe(
      tap((qr: QuestionResolution) => {
        // Notify listeners that the QR has changed.
        this.questionResolutionChanged.next(true);
        catchError(this.handleError('updateQuestionResolution', qr));
      })
    ) ;
  }

  // Delete a Question REsolution
  deleteQuestionResolution(qrId: number): Observable<QuestionResolution> {

    const url = `${this.baseUrl}${qrId}` ;

    return this.httpClient.delete<QuestionResolution>(url).pipe(
      tap(_ => {
        this.questionResolutionChanged.next(true);
        catchError(this.handleError('deleteQuestionResolution', {}));
      })
    );
  }

  // Handle any errors.
 private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }


}
