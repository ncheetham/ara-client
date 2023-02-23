import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservedValueOf, of, Subject, tap } from 'rxjs';
import { Theme } from './theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  baseUrl = '/api/theme/' ;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  themeSelected = new Subject<number>() ;
  themeChanged = new Subject<boolean>() ;

  constructor(private httpClient: HttpClient) { }

  // Find a Theme
  findTheme(themeId: number): Observable<Theme> {

    const url = `${this.baseUrl}${themeId}` ;

    return this.httpClient.get<Theme>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findTheme', {}));
      })
    );

  }

  // Find All Themes
  findAll(): Observable<Theme[]> {

    return this.httpClient.get<Theme[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ;
      })
    ) ;

  }

  // Add a Theme
  saveTheme(theme: Theme): Observable<Theme> {

    return this.httpClient.post<Theme>(this.baseUrl, theme, this.httpOptions).pipe(
      tap((t: Theme) => {
        this.themeChanged.next(true) ;
        catchError(this.handleError('saveTheme', t)) ;
      })
    ) ;

  }

  // Update a Theme
  updateTheme(themeId: number, theme: Theme): Observable<Theme> {

    const url = `${this.baseUrl}${themeId}` ;

    return this.httpClient.put<Theme>(url, theme, this.httpOptions).pipe(
      tap((t: Theme) => {
        this.themeChanged.next(true) ;
        catchError(this.handleError('updateTheme', t));
      })
    );

  }

  // Delete a Theme
  deleteTheme(themeId: number): Observable<Theme> {

    const url = `${this.baseUrl}${themeId}` ;

    return this.httpClient.delete<Theme>(url).pipe(
      tap((t:Theme) => {
        this.themeChanged.next(true) ;
        catchError(this.handleError('deleteTheme', t)) ;
      })
    );
  }

  // Handle Any Errors:
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

}
