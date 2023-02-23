import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { InterviewObservation } from './interviewobservation';

@Injectable({
  providedIn: 'root'
})
export class InterviewObservationService {

  baseUrl  = "/api/interviewobservation/" ;


  constructor(private httpClient: HttpClient) { }


  // Find an InterviewObservation
  findInterviewObservation(ioId: number): Observable<InterviewObservation> {

    const url = `${this.baseUrl}${ioId}` ;

    return this.httpClient.get<InterviewObservation>(url).pipe(
      tap((x: InterviewObservation)=> {
        catchError(this.handleError('findInterviewObservation',x)) ;
      })
    )
  }


  // Find an InterviewObservation by Interview



  // Find an InterviewObjservation by Engagement



  // Save an InterviewObservation



  // Update an InterviewObservation



  // Delete an Interviewobservation



  // Handle  Errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

}
