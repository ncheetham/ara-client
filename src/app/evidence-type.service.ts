import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { EvidenceType } from './evidence/evidence-type/evidencetype';

@Injectable({
  providedIn: 'root'
})
export class EvidenceTypeService {

  constructor(private httpClient: HttpClient) { }


  evidenceTypeChanged = new Subject<boolean> ;
  evidenceTypeSelected = new Subject<number> ;

  baseUrl: string = '/api/evidencetype/' ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }
  // Find an Evidence Type
  public findEvidenceType(evidenceTypeId: number): Observable<EvidenceType> {

    const url = `${this.baseUrl}${evidenceTypeId}` ;

    return this.httpClient.get<EvidenceType>(url).pipe(
      tap((et: EvidenceType) => {
        catchError(this.handleError('findEvidenceType', et))
      }
    )) ;
  }

  // Find All Evidence Types
  public findAll(): Observable<EvidenceType[]> {

    return this.httpClient.get<EvidenceType[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []));
      })
    );

  }

  // Add an Evidence Type
  public addEvidenceType(et: EvidenceType): Observable<EvidenceType> {

    return this.httpClient.post<EvidenceType>(this.baseUrl, et, this.httpOptions).pipe(
      tap((et: EvidenceType) => {
        this.evidenceTypeChanged.next(true) ;
        catchError(this.handleError('addEvidenceType', et)) ;
      })
    );

  }

  // Update an Evidence Type
  public updateEvidenceType(evidenceTypeId: number, et: EvidenceType): Observable<EvidenceType> {

    const url = `${this.baseUrl}${evidenceTypeId}`;

    return this.httpClient.put<EvidenceType>(url, et, this.httpOptions).pipe(
      tap((et: EvidenceType) => {
        this.evidenceTypeChanged.next(true) ;
        catchError(this.handleError('updateEvidenceType', et)) ;
      })
    );

  }

  // Delete an Evidence type
  public deleteEvidenceType(evidenceTypeId: number): Observable<EvidenceType> {

    const url = `${this.baseUrl}${evidenceTypeId}` ;

    return this.httpClient.delete<EvidenceType>(url).pipe(
      tap((et: EvidenceType) => {
        this.evidenceTypeChanged.next(true) ;
        catchError(this.handleError('deleteEvidenceType', et)) ;
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

