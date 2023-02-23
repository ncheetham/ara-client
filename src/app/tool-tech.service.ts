import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { ToolTech } from './tooltech';

@Injectable({
  providedIn: 'root'
})
export class ToolTechService {

  baseUrl = '/api/tooltech/' ;

  selectedToolTech = new Subject<number>() ;
  toolTechChanged = new Subject<boolean>() ;


  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  // Find a ToolTech.
  findToolTech(toolTechId: number): Observable<ToolTech> {

    const url = `${this.baseUrl}${toolTechId}`

    return this.httpClient.get<ToolTech>(url).pipe(
      tap((tt: ToolTech) => {
        catchError(this.handleError('findToolTech', tt))
      })
    ) ;

  }

  // Find All ToolTechs
  findAll(): Observable<ToolTech[]> {

    return this.httpClient.get<ToolTech[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', {}))
      })
    ) ;

  }

  // Add a ToolTech
  addToolTech(toolTech: ToolTech): Observable<ToolTech> {

    return this.httpClient.post<ToolTech>(this.baseUrl, toolTech, this.httpOptions).pipe(
      tap((tt: ToolTech) => {
        this.toolTechChanged.next(true) ;
        catchError(this.handleError('addToolTech', tt))
      })
    ) ;

  }

  // Update a ToolTech
  updateToolTech(toolTechId: number, toolTech: ToolTech): Observable<ToolTech> {

    const url = `${this.baseUrl}${toolTechId}` ;

    return this.httpClient.put<ToolTech>(url, toolTech, this.httpOptions).pipe(
      tap((tt: ToolTech) => {
        this.toolTechChanged.next(true) ;
        catchError(this.handleError('updateToolTech', tt)) ;
      })
    ) ;

  }


  // Delete a ToolTech
  deleteToolTech(toolTech: number): Observable<ToolTech> {

    const url = `${this.baseUrl}${toolTech}` ;

    return this.httpClient.delete<ToolTech>(url).pipe(
      tap((tt: ToolTech) => {
        this.toolTechChanged.next(true) ; 
        catchError(this.handleError('deleteToolTech', tt));
      }
    ));

  }

  // Handle Errors.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }


}
