import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { InterviewStatus } from 'src/app/interview/interview-status/interviewstatus';
import { IntervieweeService } from 'src/app/interviewee/interviewee.service';
import { Interviewee } from '../interviewee';
import { IntervieweeStatusVO } from '../intervieweestatus';

@Component({
  selector: 'app-interviewee-all-list',
  templateUrl: './interviewee-all-list.component.html',
  styleUrls: ['./interviewee-all-list.component.css']
})
export class IntervieweeListAllComponent implements OnInit, OnDestroy {

  interviewees: IntervieweeStatusVO[] = [] ;
  displayedColumns = ['name', 'title', 'reportsto', 'interviewsplanned', 'interviewsscheduled', 'interviewscompleted'] ;
  selectedInterviewee: Interviewee ;
  @Input() engagementId: number ;

  constructor(private iService: IntervieweeService) { }


  ngOnDestroy(): void {
   
  }

  ngOnInit(): void {


    // Find all the Interview's Interviewees
    this.iService.findIntervieweeStatusByEngagement(this.engagementId).subscribe(x =>
      this.interviewees = x) ;

  }

  onSelect(i: Interviewee) {

    this.selectedInterviewee = i ;

  }

}
