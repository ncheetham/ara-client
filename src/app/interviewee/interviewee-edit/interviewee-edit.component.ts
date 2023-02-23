import { Location } from '@angular/common';
import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, throwIfEmpty } from 'rxjs';
import { InterviewIntervieweeService } from 'src/app/interview-interviewee.service';
import { IntervieweeService } from 'src/app/interviewee.service';
import { InterviewInterviewee } from 'src/app/interviewinterviewee';
import { Interviewee } from '../interviewee';

@Component({
  selector: 'app-interviewee-edit',
  templateUrl: './interviewee-edit.component.html',
  styleUrls: ['./interviewee-edit.component.css']
})
export class IntervieweeEditComponent implements OnInit, OnDestroy {


  @ViewChild('f', {static: false}) iForm: NgForm ;
  editMode = false ;
  interviewInterviewee: InterviewInterviewee = new InterviewInterviewee() ;
  intervieweeSelectedSubscription: Subscription ;
  @Input() interviewId: number ;

  constructor(private intervieweeService: IntervieweeService, private iiService: InterviewIntervieweeService, private location: Location) { }



  ngOnDestroy(): void {
    this.intervieweeSelectedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

      this.intervieweeSelectedSubscription = this.iiService.interviewIntervieweeSelected.subscribe(x=>
        this.iiService.findInterviewInterviewee(x).subscribe(i => {
          this.interviewInterviewee = i ;
          this.editMode = true;
        })

      )


  }

  onAddInterviewee(f: NgForm) {

    const value = f.value ;

    const newInterviewee = new Interviewee() ;

    newInterviewee.intervieweeId = value.intervieweeId;
    newInterviewee.firstName = value.firstName ;
    newInterviewee.lastName = value.lastName ;
    newInterviewee.title = value.title ;
    newInterviewee.role = value.role ;


    console.log("InterviewId:" + this.interviewId) ;

    console.log("In onAddInterviewee: " + JSON.stringify(newInterviewee)) ;

    if(this.editMode) {

      this.intervieweeService.updateInterviewee(newInterviewee.intervieweeId, newInterviewee).subscribe() ;

    }else {

      console.log("Adding Interviewee") ;
      // Add the Interviewee
      this.intervieweeService.addInterviewee(newInterviewee).subscribe(x => {


        // Add the Interviewee to the Interview
        this.iiService.addIntervieweeToInterview(this.interviewId, x).subscribe(x =>
          this.intervieweeService.intervieweesChanged.next(true)
        );
      }) ;
    }

    this.onClear() ;


  }

  onDelete() {

    console.log('calling delete Interviewee from InterviewInterviewee service. Id:' + this.interviewInterviewee.interviewIntervieweeId);
    // Remove the Interviewee from the Interview
    this.iiService.deleteInterviewInterviewee(this.interviewInterviewee.interviewIntervieweeId).subscribe() ;

    this.onClear();
  }

  onClear() {
    this.iForm.reset() ;
    this.interviewInterviewee = new InterviewInterviewee() ;
    this.editMode = false ;
  }

  onBack() {
    this.location.back() ;
  }

}

