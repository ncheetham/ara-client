import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Process } from './process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  baseUrl = '/api/process/'

  processSelected = new Subject<number>() ;
  processChanged = new Subject<boolean>() ;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  // Find a Process
  findProcess(processId: number): Observable<Process> {

    const url = `${this.baseUrl}${processId}`;

    return this.httpClient.get<Process>(url).pipe(
      tap((p: Process) => {
        console.log('Found Process: '+ JSON.stringify(p))
        catchError(this.handleError('findProcess', p)) ;
      })
    );

  }

  // Find All Processes
  findAll(): Observable<Process[]> {

    return this.httpClient.get<Process[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []))
      })
    ) ;
  }

  // Add a Process
  addProcess(process: Process): Observable<Process> {

    return this.httpClient.post<Process>(this.baseUrl, process, this.httpOptions).pipe(
      tap((p: Process) => {
        this.processChanged.next(true) ;
        catchError(this.handleError('addProcess', p));
      })
    );

  }

  // Update a process
  updateProcess(processId: number, process: Process): Observable<Process> {

    const url = `${this.baseUrl}${processId}` ;

    return this.httpClient.put<Process>(url, process, this.httpOptions).pipe(
      tap((p: Process) => {
        this.processChanged.next(true) ;
        catchError(this.handleError('updateProcess', p));
      })
    ) ;
  }

  // Delete a process
  deleteProcess(processId: number): Observable<Process> {

    const url = `${this.baseUrl}${processId}` ;

    return this.httpClient.delete<Process>(url).pipe(
      tap(_ => {
        this.processChanged.next(true) ;
        catchError(this.handleError('deleteProcess', {}));
      })
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
