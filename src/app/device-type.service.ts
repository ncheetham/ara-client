import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceType } from './device-type';
import { Observable, Subject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceTypeService {

  deviceTypesChanged = new Subject<DeviceType[]>() ;
  startedEditing = new Subject<number>() ;
  deviceTypeChanged = new Subject<boolean>() ;

  private baseUrl: string =  "/api/devicetype/" ;

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) {}  


  public deleteDeviceType(deviceTypeId: number): Observable<DeviceType>  {

    const url = `${this.baseUrl}${deviceTypeId}` ;

    return this.httpClient.delete<DeviceType>(url).pipe(
      tap((dc: DeviceType) => {
        this.deviceTypeChanged.next(true) ;
        this.findAllDeviceTypes().subscribe(x=> this.deviceTypesChanged.next(x)) ;
      })
    );


  }
  
  public addDeviceType(dt: DeviceType): Observable<DeviceType> {

    const url = `${this.baseUrl}` ;

    return this.httpClient.post<DeviceType>(url, dt, this.httpOptions).pipe(
      tap((dt: DeviceType) => {
        this.deviceTypeChanged.next(true) ;
        this.findAllDeviceTypes().subscribe(x=> this.deviceTypesChanged.next(x)) ;
        catchError(this.handleError<DeviceType>('addDeviceType', dt));
      })
    )
  }
  
  public updateDeviceType(dtId: number , dt: DeviceType): Observable<DeviceType> {
    
    const url = `${this.baseUrl}${dtId}` ;

    return this.httpClient.put<DeviceType>(url, dt, this.httpOptions).pipe(
      tap(_ => {
        this.deviceTypeChanged.next(true) ;
        this.findAllDeviceTypes().subscribe(x => this.deviceTypesChanged.next(x)) ;
        catchError(this.handleError('updateDeviceType', {})) ;
      })
    ) ;

  }

 
 // Find all DeviceTypes
 public findAllDeviceTypes(): Observable<DeviceType[]> {

  return this.httpClient.get<DeviceType[]>(this.baseUrl).pipe(
    tap(_ => {
      catchError(this.handleError('findAllDeviceTypes', [])) ;
    })
  ) ;

  }

 
   // Find a specific DeviceType.
   public findDeviceType(id: number): Observable<DeviceType> {

      const url = `${this.baseUrl}${id}` ;

      return this.httpClient.get<DeviceType>(url).pipe(
        tap((ntd: DeviceType) => {
          catchError(this.handleError('findDeviceType', ntd)) ;
        }
      ));

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error) ;
      return of(result as T) ;
    }
  }

}
