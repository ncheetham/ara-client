import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
import { MeetingType } from './meeting-type/meetingType';

@Injectable({
  providedIn: 'root'
})
export class MeetingTypeService {


  startedEditing = new Subject<number>() ;


  meetingTypesChangedSubscription = new Subject<MeetingType[]>() ;

  url = '/api/meetingtype/' ;

  constructor(private httpClient: HttpClient) { }


  findAll(): Observable<MeetingType[]> {

    return this.httpClient.get<MeetingType[]>(this.url).pipe(
      tap(_ =>
        catchError(this.handleError<MeetingType[]>('findAll', [])
      ))
    );
  }

  findMeetingType(meetingTypeId: number): Observable<MeetingType> {


    const url = `${this.url}${meetingTypeId}`;

    return this.httpClient.get<MeetingType>(url).pipe(
      tap(_ =>
        catchError(this.handleError<MeetingType[]>('findMeetingType', [])
      ))
    );
  }

  // Add Meeting Type
  addMeetingType(meetingType: MeetingType): Observable<MeetingType> {

    return this.httpClient.post<MeetingType>(this.url, meetingType).pipe(
      tap((newMeetingType: MeetingType) => {
        this.findAll().subscribe(x =>
          this.meetingTypesChangedSubscription.next(x)) ;
      } )
    ) ;

  }

  // Update Meeting Type
  updateMeetingType(meetingTypeId: number, meetingType: MeetingType): Observable<MeetingType> {

    console.log('Updating Meeting Types: ' + JSON.stringify(meetingType)) ;

    const url = `${this.url}${meetingTypeId}`;

    return this.httpClient.put<MeetingType>(url, meetingType).pipe(tap(_ =>
      this.findAll().subscribe(x =>
        this.meetingTypesChangedSubscription.next(x))
        )
    );


  }


  // Delete Meeting Type
  deleteMeetingType(meetingTypeId: number): Observable<MeetingType> {

    const url = `${this.url}${meetingTypeId}`;

    return this.httpClient.delete<MeetingType>(url).pipe(
      tap(_ => {
        this.findAll().subscribe(x =>
          this.meetingTypesChangedSubscription.next(x)) ;
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
