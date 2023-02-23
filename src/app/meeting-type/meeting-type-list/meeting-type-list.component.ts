import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MeetingTypeService } from 'src/app/meeting-type.service';
import { MeetingType } from '../meetingType';

@Component({
  selector: 'app-meeting-type-list',
  templateUrl: './meeting-type-list.component.html',
  styleUrls: ['./meeting-type-list.component.css']
})
export class MeetingTypeListComponent implements OnInit, OnDestroy {


  meetingTypes: MeetingType[] ;
  meetingTypeChangedSubscription: Subscription ;

  meetingType: MeetingType ;
  displayedColumns = ['meetingTypeId', 'name'] ;

  constructor(private meetingTypeService: MeetingTypeService) { }


  ngOnDestroy(): void {
    this.meetingTypeChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {


    this. meetingTypeChangedSubscription = this.meetingTypeService.meetingTypesChangedSubscription.subscribe(x=> {
      this.meetingTypes = x ;
    })

    this.meetingTypeService.findAll().subscribe(x=> this.meetingTypes = x) ;

  }

  onSelect(row: MeetingType)  {
    this.meetingType = row ;
    this.meetingTypeService.startedEditing.next(row.meetingTypeId) ;
  }

}
