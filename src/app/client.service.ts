import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { Client } from './client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsChanged = new Subject<Client[]>() ;
  startedEditing = new Subject<number>() ;
  clientChanged = new Subject<boolean>() ;

  // Adds a new Client
  public addClient(newClient: Client): Observable<Client> {

    const url = `${this.baseUrl}` ;

    return this.httpClient.post<Client>(url, newClient, this.httpOptions).pipe(
      tap((c: Client) => {
        this.clientChanged.next(true) ;
        this.findAllClients().subscribe(x=> this.clientsChanged.next(x)) ;
        catchError(this.handleError<Client>('addClient', c));
      })
    )

  }

  // Delete a client
  public deleteClient(clientId: number): Observable<Client> {

    const url = `${this.baseUrl}${clientId}` ;

    return this.httpClient.delete<Client>(url).pipe(
      tap((dc: Client) => {
        this.clientChanged.next(true) ;
        this.findAllClients().subscribe(x=> this.clientsChanged.next(x)) ;
      })
    );

  }

  // Find a specific Client.
  public findClient(id: number): Observable<Client> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.get<Client>(url).pipe(
      tap((nc: Client) => {
        catchError(this.handleError('findClient', nc)) ;
      }
    ));

  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  private baseUrl = '/api/client/';

  constructor(private httpClient: HttpClient) { }

  // Find all Clients
  public findAllClients(): Observable<Client[]> {

    return this.httpClient.get<Client[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAllClients', [])) ;
      })
    ) ;

  }

  // Update a client.
  public updateClient(clientId: number, newClient: Client): Observable<Client> {

    const url = `${this.baseUrl}${clientId}` ;

    return this.httpClient.put<Client>(url, newClient, this.httpOptions).pipe(
      tap(_ => {
        this.clientChanged.next(true) ;
        this.findAllClients().subscribe(x => this.clientsChanged.next(x)) ;
        catchError(this.handleError('updateClient', {})) ;
      })
    ) ;

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }

  }

}
