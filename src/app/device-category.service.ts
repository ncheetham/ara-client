import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceCategory } from './device-category';
import { Observable, Subject, catchError, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceCategoryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }


  public deviceCategoriesChanged = new Subject<DeviceCategory[]>() ;
  public startedEditing = new Subject<number>() ;
  public deviceCategoryChanged = new Subject<boolean>() ;

  private baseUrl = '/api/devicecategory/';

  constructor(private httpClient: HttpClient) { 

  }


  public findById(id: number): Observable<DeviceCategory> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.get<DeviceCategory>(url).pipe(
      tap((dc: DeviceCategory) => {
        catchError(this.handleError('findDeviceCategory', dc)) ;
      }
    ));

  }


  public findAll(): Observable<DeviceCategory[]> {

    return this.httpClient.get<DeviceCategory[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAllDeviceCategories', [])) ;
      })
    ) ;

  }



  public addDeviceCategory(dc: DeviceCategory): Observable<DeviceCategory> {
    return this.httpClient.post<DeviceCategory>(this.baseUrl, dc, this.httpOptions).pipe(
      tap((dt: DeviceCategory) => {
        this.deviceCategoryChanged.next(true) ;
        this.findAll().subscribe(x => this.deviceCategoriesChanged.next(x));
      })
      ) ; 
  }

  public updateDeviceCategory(id: number, dc: DeviceCategory): Observable<DeviceCategory> {

    const url = `${this.baseUrl}${id}` ;

    return this.httpClient.post<DeviceCategory>(url, dc, this.httpOptions).pipe(
      tap((udc: DeviceCategory) => {
        this.deviceCategoryChanged.next(true) ; 
        this.findAll().subscribe(x => this.deviceCategoriesChanged.next(x)); 
      }));
  }

  public deleteDeviceCategory(id: number): Observable<DeviceCategory> {

    const url = `${this.baseUrl}${id}` ;

      return this.httpClient.delete<DeviceCategory>(url).pipe(
        tap((dc: DeviceCategory) => {
          this.deviceCategoryChanged.next(true) ;
          this.findAll().subscribe(x=> this.deviceCategoriesChanged.next(x)) ;
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
