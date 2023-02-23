import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EngagementService } from 'src/app/engagement.service';
import { InterviewQuestionService } from 'src/app/interview-question.service';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from '../interview';

@Component({
  selector: 'app-interview-copy-list',
  templateUrl: './interview-copy-list.component.html',
  styleUrls: ['./interview-copy-list.component.css']
})
export class InterviewCopyListComponent implements OnInit, OnDestroy {

  constructor(private engagementService: EngagementService, private interviewService: InterviewService, private router: Router
    , private route: ActivatedRoute, private iqService: InterviewQuestionService, private location: Location) { }

  ngOnDestroy(): void {
    this.selectedEngagementSubscription.unsubscribe() ;
    this.interviewChangedSubscription.unsubscribe() ;
    this.interviewSelectedSubscription.unsubscribe() ;

  }

  interviews: Interview[] ;
  displayedColumns: string[] = ['interviewId',  'date', 'interviewer', 'team' , 'type', 'status', 'copy'];
  selectedEngagementSubscription: Subscription ;
  interviewChangedSubscription: Subscription ;
  interviewSelectedSubscription: Subscription ;
  engagementId: number ;
  selectedInterview: Interview ;

  ngOnInit(): void {

    // Listen to changed Engagements.
    this.selectedEngagementSubscription = this.engagementService.startedEditing.subscribe((engagementId: number) => {

      //console.log("InterviewList: finding by engagement"+this.engagementId) ;

      this.interviewService.findInterviewsByEngagement(engagementId).subscribe(i => this.interviews = i) ;

    });

    // Listen to changed Interviews.
    this.interviewChangedSubscription = this.interviewService.interviewChanged.subscribe(x=> {

      this.interviewService.findInterviewsByEngagement(this.engagementId).subscribe(interviews => this.interviews = interviews) ;

    });

    this.interviewSelectedSubscription = this.interviewService.selectedInterview.subscribe((interviewId: number) => {
      this.interviewService.findInterview(interviewId).subscribe(x => this.selectedInterview = x) ;

    })

  }


  onSelect(row: Interview) {
  }


  onCopy(interviewId: number) {

    // Copy the Questions for this Interview to the interview passed in.
    this.iqService.copyQuestions(interviewId, this.selectedInterview.interviewId).subscribe(x => {

         // Navigate back to the Interview.
         this.location.back() ;

         this.interviewService.selectedInterview.next(this.selectedInterview.interviewId) ;
    }

    ) ;

  }

}
