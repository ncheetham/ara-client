import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap } from 'rxjs';
import { Device } from './device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {


  baseUrl: string = '/api/device/' ;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  deviceChanged = new Subject<boolean>() ; 
  devicesChanged = new Subject<Device[]> ; 
  deviceSelected = new Subject<number>() ; 
  

  public findById(id: number): Observable<Device> {
    
    const url = `${this.baseUrl}${id}` ; 

    return this.httpClient.get<Device>(url).pipe(
      tap((x: Device)=> {
        catchError(this.handleError<Device>('findById', x)) ; 
      })
    );
  }

  public findByEngagement(engagementId: number): Observable<Device[]> {

    const url = `${this.baseUrl}engagement/${engagementId}`

    return this.httpClient.get<Device[]>(url) ; 

  }


  public addDevice(device: Device): Observable<Device> {
    
    return this.httpClient.post<Device>(this.baseUrl, device, this.httpOptions).pipe(
      tap((d: Device) => {
        this.deviceChanged.next(true) ;
        this.findByEngagement(d.engagement.engagementId).subscribe(x=> this.devicesChanged.next(x)) ;
        catchError(this.handleError<Device>('addDevice', d));
      })
    )

  }

  public updateDevice(deviceId: number, device: Device): Observable<Device> {

    const url = `${this.baseUrl}${deviceId}`
    
    return this.httpClient.put<Device>(url, device, this.httpOptions).pipe(
      tap((d: Device) => {
        this.deviceChanged.next(true) ;
        this.findByEngagement(d.engagement.engagementId).subscribe(x=> this.devicesChanged.next(x)) ;
        catchError(this.handleError<Device>('update', d));
      })
    )

  }

  public deleteDevice(deviceId: number): Observable<Device> {

    const url = `${this.baseUrl}${deviceId}`
    
    return this.httpClient.delete<Device>(url).pipe(
      tap((d: Device) => {
        this.deviceChanged.next(true) ;
        catchError(this.handleError<Device>('delete', d));
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
