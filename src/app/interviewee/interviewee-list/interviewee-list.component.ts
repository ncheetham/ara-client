import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { InterviewIntervieweeService } from 'src/app/interview-interviewee.service';
import { IntervieweeService } from 'src/app/interviewee.service';
import { InterviewInterviewee } from 'src/app/interviewinterviewee';
import { Interviewee } from '../interviewee';

@Component({
  selector: 'app-interviewee-list',
  templateUrl: './interviewee-list.component.html',
  styleUrls: ['./interviewee-list.component.css']
})
export class IntervieweeListComponent implements OnInit, OnDestroy {

  interviewees: InterviewInterviewee[] = [] ;
  displayedColumns = ['name', 'title'] ;
  selectedInterviewee: InterviewInterviewee ;
  @Input() interviewId: number ;
  intervieweesChangedSubscription: Subscription  ;

  constructor(private intervieweeService: IntervieweeService, private iiService: InterviewIntervieweeService) { }


  ngOnDestroy(): void {
    this.intervieweesChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

      // Listen the changes of the Interviewees.
    this.intervieweesChangedSubscription = this.iiService.intervieweesChanged.subscribe(x => {
      console.log("Refinding Interviewees!") ;
      this.iiService.findIntervieweesByInterview(this.interviewId).subscribe(x =>
        this.interviewees = x) ;
    })

    // Find all the Interview's Interviewees
    this.iiService.findIntervieweesByInterview(this.interviewId).subscribe(x =>
      this.interviewees = x) ;

  }

  onSelect(i: InterviewInterviewee) {

    this.selectedInterviewee = i ;
    this.iiService.interviewIntervieweeSelected.next(this.selectedInterviewee.interviewIntervieweeId) ;

  }

}
