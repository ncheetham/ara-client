import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MeetingTypeService } from 'src/app/meeting-type.service';
import { MeetingType } from '../meetingType';

@Component({
  selector: 'app-meeting-type-edit',
  templateUrl: './meeting-type-edit.component.html',
  styleUrls: ['./meeting-type-edit.component.css']
})
export class MeetingTypeEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: true}) mtForm: NgForm ;

  constructor(private meetingTypeService: MeetingTypeService) { }

  startedEditingSubscription: Subscription ;
  selectedMeetingType: MeetingType = {meetingTypeId: 0, name: ''} ;

  editMode = false ;


 ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe() ;
  }


  ngOnInit(): void {

    this.startedEditingSubscription = this.meetingTypeService.startedEditing.subscribe((x: number)=> {
      this.meetingTypeService.findMeetingType(x).subscribe(meetingType => {
        this.selectedMeetingType = meetingType ;
        this.editMode = true ;
      }) ;
    } )
  }

  onAddMeetingType(f: NgForm) {

    let newMeetingType: MeetingType = {meetingTypeId: this.selectedMeetingType.meetingTypeId, name: this.selectedMeetingType.name} ;

    if(this.editMode) {
      this.meetingTypeService.updateMeetingType(this.selectedMeetingType.meetingTypeId, newMeetingType)
      .subscribe(x => {this.selectedMeetingType = x;
        this.onClear() ;
      }) ;
    } else {
      this.meetingTypeService.addMeetingType(newMeetingType).subscribe() ;
    }

    this.onClear() ;

  }

  onDelete() {
    this.meetingTypeService.deleteMeetingType(this.selectedMeetingType.meetingTypeId).subscribe() ;
    this.onClear() ;
  }

  onClear() {
    this.mtForm.reset() ;
    this.editMode = false ;
  }

}
