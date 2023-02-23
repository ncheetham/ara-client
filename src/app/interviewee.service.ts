import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Interviewee } from './interviewee/interviewee';

@Injectable({
  providedIn: 'root'
})
export class IntervieweeService {

  private baseUrl = '/api/interviewee/' ;

  intervieweesChanged = new Subject<boolean>() ;
  intervieweeSelected = new Subject<number>() ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  constructor(private httpClient: HttpClient) { }

  // Find an Interviewee
  findInterviewee(intervieweeId: number): Observable<Interviewee> {

    const url = `${this.baseUrl}${intervieweeId}` ;

    return this.httpClient.get<Interviewee>(url).pipe(
      tap((i:Interviewee) => {
        catchError(this.handleError('findInterviewee', i)) ;
      })
    ) ;

  }

  // Find all Interviewees by Client
  findIntervieweesByClient(clientId: number): Observable<Interviewee[]> {

    const url = `${this.baseUrl}client/${clientId}` ;

    return this.httpClient.get<Interviewee[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findIntervieweesByClient', []))  ;
      })
    );


  }

  // Find All Interviewees by Engagement
  findIntervieweeByEngagement(engagementId: number): Observable<Interviewee[]> {

    const url = `${this.baseUrl}engagement/${engagementId}` ;

    return this.httpClient.get<Interviewee[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findIntervieweeByEngagement', []))
      })
    ) ;

  }

  // Find all Interviewees by Interview
  findIntervieweeByInterview(interviewId: number): Observable<Interviewee[]> {

    const url = `${this.baseUrl}interview/${interviewId}` ;

    return this.httpClient.get<Interviewee[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findIntervieweeByInterview', []))
      })
    ) ;
  }

  // Find all Interviewees by Interview
  findIntervieweeByTeam(teamId: number): Observable<Interviewee[]> {

    const url = `${this.baseUrl}team/${teamId}` ;

    return this.httpClient.get<Interviewee[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findIntervieweeByTeam', []))
      })
    ) ;
  }


  findIntervieweesAll(): Observable<Interviewee[]> {

    return this.httpClient.get<Interviewee[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findIntervieweesAll', []))
      })
    );
  }

  // Add an Interivewee
  addInterviewee(interviewee: Interviewee): Observable<Interviewee> {

    return this.httpClient.post<Interviewee>(this.baseUrl, interviewee, this.httpOptions).pipe(
      tap((i: Interviewee) => {
        this.intervieweesChanged.next(true) ;
        catchError(this.handleError('addInterviewee', i)) ;
      })
    ) ;

  }

    // Add an Interivewee to Team
    addIntervieweeToTeam(teamId: number, interviewee: Interviewee): Observable<Interviewee> {

      const url = `${this.baseUrl}team/${teamId}`

      return this.httpClient.post<Interviewee>(this.baseUrl, interviewee, this.httpOptions).pipe(
        tap((i: Interviewee) => {
          this.intervieweesChanged.next(true) ;
          catchError(this.handleError('addIntervieweeToTeam', i)) ;
        })
      ) ;

    }

 // Add an Interivewee to Interview
 addIntervieweeToInterview(interviewId: number, interviewee: Interviewee): Observable<Interviewee> {

  const url = `${this.baseUrl}interview/${interviewId}`

  return this.httpClient.post<Interviewee>(this.baseUrl, interviewee, this.httpOptions).pipe(
    tap((i: Interviewee) => {
      this.intervieweesChanged.next(true) ;
      catchError(this.handleError('addIntervieweeToTeam', i)) ;
    })
  ) ;

}

// Add an Interivewee to Engagement
addIntervieweeToEngagement(engagementId: number, interviewee: Interviewee): Observable<Interviewee> {

  const url = `${this.baseUrl}engagement/${engagementId}`

  return this.httpClient.post<Interviewee>(this.baseUrl, interviewee, this.httpOptions).pipe(
    tap((i: Interviewee) => {
      this.intervieweesChanged.next(true) ;
      catchError(this.handleError('addIntervieweeToTeam', i)) ;
    })
  ) ;

}


  // Remove an Interivewee from a Team
  removeIntervieweeFromTeam(teamId: number, intervieweeId: number): Observable<Interviewee> {

    const url = `${this.baseUrl}team/${teamId}/id/${intervieweeId}`;

    return this.httpClient.delete<Interviewee>(url).pipe(
      tap(_ => {
        this.intervieweesChanged.next(true) ;
        catchError(this.handleError('removeIntervieweeFromTeam', {})) ;
      })
    ) ;

  }

  // Remove an Interivewee from a Interview
  removeIntervieweeFromInterview(interviewId: number, intervieweeId: number): Observable<Interviewee> {

    const url = `${this.baseUrl}interview/${interviewId}/id/${intervieweeId}`;

    return this.httpClient.delete<Interviewee>(url).pipe(
      tap(_ => {
        this.intervieweesChanged.next(true) ;
        catchError(this.handleError('removeIntervieweeFromInterview', {})) ;
      })
    ) ;

  }



  // Remove an Interivewee from a Engagement
  removeIntervieweeFromEngagement(engagementId: number, intervieweeId: number): Observable<Interviewee> {

    const url = `${this.baseUrl}engagement/${engagementId}/id/${intervieweeId}`;

    return this.httpClient.delete<Interviewee>(url).pipe(
      tap(_ => {
        this.intervieweesChanged.next(true) ;
        catchError(this.handleError('removeIntervieweeFromEngagement', {})) ;
      })
    ) ;

  }


  // Update an Interviewee
  updateInterviewee(intervieweeId: number, interviewee: Interviewee): Observable<Interviewee> {

    const url = `${this.baseUrl}${intervieweeId}` ;

    return this.httpClient.put<Interviewee>(url, interviewee, this.httpOptions).pipe(
      tap((i: Interviewee) => {
        this.intervieweesChanged.next(true) ;
        catchError(this.handleError('updateInterviewee', i)) ;
      }
    ));

  }

  // Delete an Interviewee
  deleteInterviewee(intervieweeId: number): Observable<Interviewee> {

    const url = `${this.baseUrl}${intervieweeId}`;

    return this.httpClient.delete<Interviewee>(url).pipe(
      tap(_ => {
        console.log('deleted Interviewee calling: ' + url);
        this.intervieweesChanged.next(true) ;
        catchError(this.handleError('deleteInterviewee', {})) ;
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
