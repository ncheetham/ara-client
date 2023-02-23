import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { FindingStatus } from './findingstatus';

@Injectable({
  providedIn: 'root'
})
export class FindingStatusService {

  baseUrl = '/api/findingstatus/' ;

  findingStatusChanged = new Subject<boolean>() ;
  findingStatusSelected = new Subject<number>() ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  // Find a Finding Status
  findFindingStatus(findingStatusId: number): Observable<FindingStatus> {

    const url = `${this.baseUrl}${findingStatusId}`

    return this.httpClient.get<FindingStatus>(url).pipe(
      tap((fs: FindingStatus)=>{
        catchError(this.handleError('findFindingStatus', {}));
      }
    ));
  }

  // Find all Finding Statuses
  findAll(): Observable<FindingStatus[]> {

    return this.httpClient.get<FindingStatus[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []))
      })
    );
  }


  // Add a finding Status
  addFindingStatus(findingStatus: FindingStatus): Observable<FindingStatus> {

    return this.httpClient.post<FindingStatus>(this.baseUrl, findingStatus, this.httpOptions).pipe(
      tap((fs: FindingStatus) => {
        this.findingStatusChanged.next(true) ;
        catchError(this.handleError('addFindingStatus', fs));
      })
    ) ;

  }

  // Delete a Finding Status
  deleteFindingStatus(findingStatusId: number): Observable<FindingStatus> {

    const url = `${this.baseUrl}${findingStatusId}` ;

    return this.httpClient.delete<FindingStatus>(url).pipe(
      tap((fs: FindingStatus) => {
        this.findingStatusChanged.next(true) ;
        catchError(this.handleError('deleteFindingStatus', fs))
      })
    );

  }


  // Update a FindingStatus
  updateFindingStatus(fsId: number, fs: FindingStatus): Observable<FindingStatus> {

    const url = `${this.baseUrl}${fsId}` ;

    return this.httpClient.put<FindingStatus>(url, fs, this.httpOptions).pipe(
    tap((fs: FindingStatus)=> {
      this.findingStatusChanged.next(true) ;
      catchError(this.handleError('updateFindingStatus',fs ))
    }));
  }

  // Handle Any errors.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

}
