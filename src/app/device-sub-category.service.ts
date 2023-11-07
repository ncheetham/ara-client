import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceSubCategory } from './device-subcatgory';
import { Observable, Subject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceSubCategoryService {

  baseUrl: string = "/api/devicesubcategory/" ; 

  public subCategoryChanged  = new Subject<boolean>() ;
  public subCategorySelected = new Subject<number>() ; 
   
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }


  public findById(dscId: number): Observable<DeviceSubCategory> {

    const url = `${this.baseUrl}${dscId}` ;

    return this.httpClient.get<DeviceSubCategory>(url) ; 

  }

  public findByDeviceCategoryId(dcId: number): Observable<DeviceSubCategory[]> {

    const url = `${this.baseUrl}category/${dcId}` ;


    return this.httpClient.get<DeviceSubCategory[]>(url).pipe(
      tap(_ => {
        catchError(this.handleError('findAll', [])) ; 
      })
    )


  }

  public findAll(): Observable<DeviceSubCategory[]> {

    return this.httpClient.get<DeviceSubCategory[]>(this.baseUrl).pipe(
      tap(_ => {
        catchError(this.handleError('findAllDeviceCategories', [])) ;
      })
    ) ;

  }



  public addSubCategory(dsc: DeviceSubCategory) : Observable<DeviceSubCategory> {
      return this.httpClient.post<DeviceSubCategory>(this.baseUrl, dsc, this.httpOptions).pipe(
        tap((ndsc : DeviceSubCategory) => {
          this.subCategoryChanged.next(true) ;  
        })
      )
  }

  public updateSubCategory(dscId: number, dsc: DeviceSubCategory): Observable<DeviceSubCategory> {

    const url =  `${this.baseUrl}${dscId}` ; 

      return this.httpClient.put<DeviceSubCategory>(url, dsc, this.httpOptions).pipe(
        tap((udsc: DeviceSubCategory) => {
          this.subCategoryChanged.next(true) ; 
        })
      )
  }

  public deleteSubCatgory(dscId: number): Observable<DeviceSubCategory> {

    const url = `${this.baseUrl}${dscId}` ; 

    return this.httpClient.delete<DeviceSubCategory>(url).pipe(
      tap(_ => {
        this.subCategoryChanged.next(true) ; 
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
