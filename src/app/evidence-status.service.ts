import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { EvidenceStatus } from './evidence/evidence-status/evidencestatus';

@Injectable({
  providedIn: 'root'
})
export class EvidenceStatusService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = '/api/evidencestatus/' ;
  evidenceStatusUpdated = new Subject<boolean>() ;
  evidenceStatusSelected = new Subject<number>() ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  // Find an Evidence Status
  findEvidenceStatus(evidenceStatusId: number): Observable<EvidenceStatus> {

    const url = `${this.baseUrl}${evidenceStatusId}` ;

    return this.httpClient.get<EvidenceStatus>(url).pipe(
      tap((es: EvidenceStatus) => {
        catchError(this.handleError('findEvidenceStatus', es));
      })
    );

  }

  // Find All Evidence Statuses
  findAll(): Observable<EvidenceStatus[]> {
    return this.httpClient.get<EvidenceStatus[]>(this.baseUrl).pipe(
      tap((es: EvidenceStatus[]) => {
        catchError(this.handleError('findAll', [])) ;
      })
    );
  }

  // Add an Evidence Status
  addEvidenceStatus(evidenceStatus: EvidenceStatus): Observable<EvidenceStatus> {

    return this.httpClient.post<EvidenceStatus>(this.baseUrl, evidenceStatus, this.httpOptions).pipe(
      tap((es: EvidenceStatus) => {
        this.evidenceStatusUpdated.next(true) ;
        catchError(this.handleError('addEvidenceStatus', es)) ;
      })
    );

  }

  // Update an Evidence Status
  updateEvidenceStatus(evidenceStatusId: number, es: EvidenceStatus): Observable<EvidenceStatus> {

    const url = `${this.baseUrl}${evidenceStatusId}` ;

    return this.httpClient.put<EvidenceStatus>(url, es, this.httpOptions).pipe(
      tap((es: EvidenceStatus) => {
        this.evidenceStatusUpdated.next(true) ;
        catchError(this.handleError('updateEvidenceStatus', es)) ;
      })
    ) ;
  }

  // Delete an Evidence Status
  deleteEvidenceStatus(evidenceStatusId: number): Observable<EvidenceStatus> {

    const url = `${this.baseUrl}${evidenceStatusId}` ;

    return this.httpClient.delete<EvidenceStatus>(url).pipe(
      tap((es: EvidenceStatus) => {
        this.evidenceStatusUpdated.next(true) ;
        catchError(this.handleError('deleteEvidenceStatus', es)) ;
      })
    ) ;
  }

  // Handle Errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }

  }
}
