import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap, catchError, of } from 'rxjs';
import { Probability } from '../probability/probability';

@Injectable({
  providedIn: 'root'
})
export class ProbabilityService {

  baseUrl: string = "/api/probability/" ;

  probabilityChanged = new Subject<boolean>() ;
  probabilitySelected = new Subject<number>() ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  // Find a Probability
  findProbability(probabilityId: number): Observable<Probability> {

    const url = `${this.baseUrl}${probabilityId}`

    return this.httpClient.get<Probability>(url).pipe(
      tap((fs: Probability)=>{
        catchError(this.handleError('findprobability', {}));
      }
    ));
  }

  // Find all Probability
  findAll(): Observable<Probability[]> {

    return this.httpClient.get<Probability[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', []))
      })
    );
  }


  // Add a Probability
  addProbability(probability: Probability): Observable<Probability> {

    return this.httpClient.post<Probability>(this.baseUrl, probability, this.httpOptions).pipe(
      tap((fs: Probability) => {
        this.probabilityChanged.next(true) ;
        catchError(this.handleError('addprobability', fs));
      })
    ) ;

  }

  // Delete a Probability
  deleteProbability(probabilityId: number): Observable<Probability> {

    const url = `${this.baseUrl}${probabilityId}` ;

    return this.httpClient.delete<Probability>(url).pipe(
      tap((fs: Probability) => {
        this.probabilityChanged.next(true) ;
        catchError(this.handleError('deleteprobability', fs))
      })
    );

  }


  // Update a probability
  updateProbability(pId: number, fs: Probability): Observable<Probability> {

    const url = `${this.baseUrl}${pId}` ;

    return this.httpClient.put<Probability>(url, fs, this.httpOptions).pipe(
    tap((fs: Probability)=> {
      this.probabilityChanged.next(true) ;
      catchError(this.handleError('updateprobability',fs ))
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
