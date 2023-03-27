import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Impact } from './impact';

@Injectable({
  providedIn: 'root'
})
export class ImpactService {

  baseUrl: string = "/api/impact/" ;

  impactSelected = new Subject<number>() ;
  impactChanged = new Subject<boolean>() ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }


  findImpact(id: number): Observable<Impact> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.get<Impact>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findImpact', {})) ;
      })
    );

  }

  findAll(): Observable<Impact[]> {

    return this.httpClient.get<Impact[]>(this.baseUrl).pipe(
      tap(_=> {
        catchError(this.handleError('findAll', []));
      })
    ) ;
  }

  addImpact(impact: Impact): Observable<Impact> {

    return this.httpClient.post<Impact>(this.baseUrl, impact, this.httpOptions).pipe(
      tap(_ => {
        this.impactChanged.next(true) ;
        catchError(this.handleError('addImpact', {}));
      })
    );
  }


  updateImpact(id: number, impact: Impact): Observable<Impact> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.put<Impact>(url, impact, this.httpOptions).pipe(
      tap(_=> {
        this.impactChanged.next(true) ;
        catchError(this.handleError('updateImpact', {}));
      })
    );

  }

  deleteImpact(id: number): Observable<Impact> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.delete<Impact>(url).pipe(
      tap(_=> {
        this.impactChanged.next(true) ;
        catchError(this.handleError('deleteImpact', {}));
      })
    );

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }


}
