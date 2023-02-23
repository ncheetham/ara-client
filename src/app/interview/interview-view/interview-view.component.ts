import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from '../interview';
import { Location } from '@angular/common';

@Component({
  selector: 'app-interview-view',
  templateUrl: './interview-view.component.html',
  styleUrls: ['./interview-view.component.css']
})
export class InterviewViewComponent implements OnInit {

  interview: Interview ;

  constructor(private route: ActivatedRoute, private interviewService: InterviewService, private location: Location) { }

  ngOnInit(): void {
    // Get the interview Id
    const interviewId = Number(this.route.snapshot.paramMap.get('id'));

    // find the Interview.
    this.interviewService.findInterview(interviewId).subscribe(x=> {
      this.interview = x ;
      this.interviewService.selectedInterview.next(x.interviewId) ; 
    }) ;


  }

  onCancel() {
    this.location.back() ;
  }

}
