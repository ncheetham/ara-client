import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Interviewee } from './interviewee/interviewee';
import { InterviewInterviewee } from './interviewinterviewee';

@Injectable({
  providedIn: 'root'
})
export class InterviewIntervieweeService {


  intervieweesChanged = new Subject<boolean>() ;
  interviewIntervieweeSelected = new Subject<number>() ;

  baseUrl: string = '/api/interviewinterviewee/' ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

// Find an Interviewee
findInterviewInterviewee(interviewIntervieweeId: number): Observable<InterviewInterviewee> {

  const url = `${this.baseUrl}${interviewIntervieweeId}` ;

  return this.httpClient.get<InterviewInterviewee>(url).pipe(
    tap((i:InterviewInterviewee) => {
      catchError(this.handleError('findInterviewInterviewee', i)) ;
    })
  ) ;

}


// Find all Interviewees by Interview
findIntervieweesByInterview(interviewId: number): Observable<InterviewInterviewee[]> {

  const url = `${this.baseUrl}interview/${interviewId}` ;

  return this.httpClient.get<InterviewInterviewee[]>(url).pipe(
    tap(_ => {
      catchError(this.handleError('findIntervieweeByInterview', []))
    })
  ) ;
}

// Find all Interviews by Interviewee
findInterviewsByInterviewee(intervieweeId: number): Observable<InterviewInterviewee[]> {

  const url = `${this.baseUrl}interviewee/${intervieweeId}` ;

  return this.httpClient.get<InterviewInterviewee[]>(url).pipe(
    tap(_ => {
      catchError(this.handleError('findInterviewsByInterviewee', []))
    })
  ) ;
}

// // Find all Interviewees by Team
// findIntervieweeByTeam(teamId: number): Observable<Interviewee[]> {

//   const url = `${this.baseUrl}team/${teamId}` ;

//   return this.httpClient.get<Interviewee[]>(url).pipe(
//     tap(_ => {
//       catchError(this.handleError('findIntervieweeByTeam', []))
//     })
//   ) ;
// }


findInterviewIntervieweesAll(): Observable<InterviewInterviewee[]> {

  return this.httpClient.get<InterviewInterviewee[]>(this.baseUrl).pipe(
    tap(_ => {
      catchError(this.handleError('findInterviewIntervieweesAll', []))
    })
  );
}

// Add an Interivewee
addInterviewInterviewee(interviewInterviewee: InterviewInterviewee): Observable<InterviewInterviewee> {


  console.log("Inside addIntervieweeToInterview:" + JSON.stringify(interviewInterviewee)) ;


  return this.httpClient.post<InterviewInterviewee>(this.baseUrl, interviewInterviewee, this.httpOptions).pipe(
    tap((i: InterviewInterviewee) => {
      this.intervieweesChanged.next(true) ;
      catchError(this.handleError('addInterviewInterviewee', i)) ;
    })
  ) ;

}

// Add an Interivewee
addIntervieweeToInterview(interviewId: number, interviewee: Interviewee): Observable<InterviewInterviewee> {


  console.log("In addIntervieweeToInterview") ;

  const interviewInterviewee = new InterviewInterviewee() ;
  interviewInterviewee.interviewee = interviewee ;
  interviewInterviewee.interview.interviewId = interviewId ;


  return this.addInterviewInterviewee(interviewInterviewee).pipe();


}




// // Add an Interivewee to Team
  // addIntervieweeToTeam(teamId: number, interviewee: Interviewee): Observable<Interviewee> {

  //   const url = `${this.baseUrl}team/${teamId}`

  //   return this.httpClient.post<Interviewee>(this.baseUrl, interviewee, this.httpOptions).pipe(
  //     tap((i: Interviewee) => {
  //       this.intervieweesChanged.next(true) ;
  //       catchError(this.handleError('addIntervieweeToTeam', i)) ;
  //     })
  //   ) ;

  // }

// Add an Interivewee to Interview
// addIntervieweeToInterview(interviewId: number, interviewee: Interviewee): Observable<Interviewee> {

// const url = `${this.baseUrl}interview/${interviewId}`

// return this.httpClient.post<Interviewee>(this.baseUrl, interviewee, this.httpOptions).pipe(
//   tap((i: Interviewee) => {
//     this.intervieweesChanged.next(true) ;
//     catchError(this.handleError('addIntervieweeToTeam', i)) ;
//   })
// ) ;

// }

// Add an Interivewee to Engagement
// addIntervieweeToEngagement(engagementId: number, interviewee: Interviewee): Observable<Interviewee> {

// const url = `${this.baseUrl}engagement/${engagementId}`

// return this.httpClient.post<Interviewee>(this.baseUrl, interviewee, this.httpOptions).pipe(
//   tap((i: Interviewee) => {
//     this.intervieweesChanged.next(true) ;
//     catchError(this.handleError('addIntervieweeToTeam', i)) ;
//   })
// ) ;

// }


// Remove an Interivewee from a Team
// removeIntervieweeFromTeam(teamId: number, intervieweeId: number): Observable<Interviewee> {

//   const url = `${this.baseUrl}team/${teamId}/id/${intervieweeId}`;

//   return this.httpClient.delete<Interviewee>(url).pipe(
//     tap(_ => {
//       this.intervieweesChanged.next(true) ;
//       catchError(this.handleError('removeIntervieweeFromTeam', {})) ;
//     })
//   ) ;

// }

// Remove an Interivewee from a Interview
removeIntervieweeFromInterview(interviewIntervieweeId: number): Observable<InterviewInterviewee> {

  const url = `${this.baseUrl}id/${interviewIntervieweeId}`;

  return this.httpClient.delete<InterviewInterviewee>(url).pipe(
    tap(_ => {
      console.log('successfully deleted interviewInterviewee') ;
      this.intervieweesChanged.next(true) ;
      catchError(this.handleError('removeIntervieweeFromInterview', {})) ;
    })
  ) ;

}

// Delete Interview Interviewee
deleteInterviewInterviewee(interviewIntervieweeId: number) {
  const url = `${this.baseUrl}${interviewIntervieweeId}`;

  return this.httpClient.delete<InterviewInterviewee>(url).pipe(
    tap(_ => {
      console.log('successfully deleted interviewInterviewee') ;
      this.intervieweesChanged.next(true) ;
      catchError(this.handleError('removeIntervieweeFromInterview', {})) ;
    })
  ) ;
}



// Remove an Interivewee from a Engagement
// removeIntervieweeFromEngagement(engagementId: number, intervieweeId: number): Observable<Interviewee> {

//   const url = `${this.baseUrl}engagement/${engagementId}/id/${intervieweeId}`;

//   return this.httpClient.delete<Interviewee>(url).pipe(
//     tap(_ => {
//       this.intervieweesChanged.next(true) ;
//       catchError(this.handleError('removeIntervieweeFromEngagement', {})) ;
//     })
//   ) ;

// }


// Update an Interviewee
// updateInterviewee(intervieweeId: number, interviewee: Interviewee): Observable<Interviewee> {

//   const url = `${this.baseUrl}${intervieweeId}` ;

//   return this.httpClient.put<Interviewee>(url, interviewee, this.httpOptions).pipe(
//     tap((i: Interviewee) => {
//       this.intervieweesChanged.next(true) ;
//       catchError(this.handleError('updateInterviewee', i)) ;
//     }
//   ));

// }

// Delete an Interviewee
// deleteInterviewee(intervieweeId: number): Observable<Interviewee> {

//   const url = `${this.baseUrl}${intervieweeId}`;

//   return this.httpClient.delete<Interviewee>(url).pipe(
//     tap(_ => {
//       this.intervieweesChanged.next(true) ;
//       catchError(this.handleError('deleteInterviewee', {})) ;
//     })
//   ) ;

// }


// Handle errors.
private handleError<T>(operation = 'operation', result?: T) {
return (error: any): Observable<T> => {
  console.error(error) ;
  return of(result as T) ;
}
}








}
