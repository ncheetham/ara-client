import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { RiskType } from './risktype';


@Injectable({
  providedIn: 'root'
})
export class RiskTypeService {

  baseUrl = '/api/risktype/' ;

  riskTypeChanged = new Subject<boolean>() ;
  riskTypeSelected = new Subject<number>() ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  // Find a Finding Status
  findRiskType(RiskTypeId: number): Observable<RiskType> {

    const url = `${this.baseUrl}${RiskTypeId}`

    return this.httpClient.get<RiskType>(url).pipe(
      tap((fs: RiskType)=>{
        catchError(this.handleError('findRiskType', {}));
      }
    ));
  }

  // Find all Risk Types
  findAll(): Observable<RiskType[]> {

    return this.httpClient.get<RiskType[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []))
      })
    );
  }


  // Add a finding Status
  addRiskType(RiskType: RiskType): Observable<RiskType> {

    return this.httpClient.post<RiskType>(this.baseUrl, RiskType, this.httpOptions).pipe(
      tap((fs: RiskType) => {
        this.riskTypeChanged.next(true) ;
        catchError(this.handleError('addRiskType', fs));
      })
    ) ;

  }

  // Delete a Risk Type
  deleteRiskType(RiskTypeId: number): Observable<RiskType> {

    const url = `${this.baseUrl}${RiskTypeId}` ;

    return this.httpClient.delete<RiskType>(url).pipe(
      tap((fs: RiskType) => {
        this.riskTypeChanged.next(true) ;
        catchError(this.handleError('deleteRiskType', fs))
      })
    );

  }


  // Update a RiskType
  updateRiskType(fsId: number, fs: RiskType): Observable<RiskType> {

    const url = `${this.baseUrl}${fsId}` ;

    return this.httpClient.put<RiskType>(url, fs, this.httpOptions).pipe(
    tap((fs: RiskType)=> {
      this.riskTypeChanged.next(true) ;
      catchError(this.handleError('updateRiskType',fs ))
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
