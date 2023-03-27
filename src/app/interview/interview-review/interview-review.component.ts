import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from '../interview';

@Component({
  selector: 'app-interview-review',
  templateUrl: './interview-review.component.html',
  styleUrls: ['./interview-review.component.css']
})
export class InterviewReviewComponent implements OnInit {

  constructor(private interviewService: InterviewService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  interview: Interview ;
  isAddingFinding = false  ;


  ngOnInit(): void {

     // Get the interview Id
     const interviewId = Number(this.route.snapshot.paramMap.get('id'));

     // find the Interview.
     this.interviewService.findInterview(interviewId).subscribe(x=> {
       this.interview = x ;
       this.interviewService.selectedInterview.next(x.interviewId) ;

     }) ;

  }

  onAddFinding(interviewQuestionId: number) {
      this.isAddingFinding = (interviewQuestionId > 0);
  }

  onCancel() {
    this.location.back() ;
  }

}
