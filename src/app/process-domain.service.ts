import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { ProcessDomain } from './processdomain';

@Injectable({
  providedIn: 'root'
})
export class ProcessDomainService {

  baseUrl = '/api/processdomain/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  processDomainSelected = new Subject<number>() ;
  processDomainChanged = new Subject<boolean>() ;


  constructor(private httpClient: HttpClient) { }

  // Find a process Domain
  findProcessDomain(processDomainId: number): Observable<ProcessDomain> {

    const url = `${this.baseUrl}${processDomainId}` ;

    return this.httpClient.get<ProcessDomain>(url).pipe(
      tap((pd: ProcessDomain) => {
        catchError(this.handleError('findProcessDomain', pd)) ;
      })
    ) ;

  }

  // Find all Process Domains
  findAll(): Observable<ProcessDomain[]> {

    return this.httpClient.get<ProcessDomain[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ;
      })
    );
  }

  // Add a process Domain
  addProcessDomain(processDomain: ProcessDomain): Observable<ProcessDomain> {

    return this.httpClient.post<ProcessDomain>(this.baseUrl, processDomain, this.httpOptions).pipe(
      tap((pd: ProcessDomain) => {
        this.processDomainChanged.next(true) ;
        catchError(this.handleError('addProcessDomain', pd)) ;
      })
    );

  }

  // Update a process Domain
  updateProcessDomain(processDomainId: number, processDomain: ProcessDomain): Observable<ProcessDomain> {

    const url = `${this.baseUrl}${processDomainId}` ;

    return this.httpClient.put<ProcessDomain>(url, processDomain, this.httpOptions).pipe(
      tap((pd: ProcessDomain) => {
        this.processDomainChanged.next(true) ;
        catchError(this.handleError('updateProcessDomain', pd)) ;
      })
    );
  }

  // Delete a process domain
  deleteProcessDomain(processDomainId: number): Observable<ProcessDomain> {

    const url = `${this.baseUrl}${processDomainId}` ;

    return this.httpClient.delete<ProcessDomain>(url).pipe(
      tap(_ => {
        this.processDomainChanged.next(true) ; 
        catchError(this.handleError('deleteProcessDomain', {})
        )}
      )
    );
  }

  // Handle errors.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

}
