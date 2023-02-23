import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { EngagementService } from 'src/app/engagement.service';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from 'src/app/interview/interview';
import { SurveyService } from 'src/app/survey/survey.service';

@Component({
  selector: 'app-question-copy',
  templateUrl: './question-copy.component.html',
  styleUrls: ['./question-copy.component.css']
})
export class QuestionCopyComponent implements OnInit {

  source?: string ;
  fontStyle?: string ;
  interviewId: number ;
  interview: Interview ;

  constructor(private route: ActivatedRoute, private router: Router, private engagementService: EngagementService
    , private interviewService: InterviewService, private location: Location, private surveyService: SurveyService) {
  }

  ngOnInit(): void {

    // interview Id.
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.interviewId = x ;

      // Find the Interview.
      this.interviewService.findInterview(this.interviewId).subscribe(x=> {
        this.interview = x;
      }) ;

    })

    // Need to pass in the Interview Id

  }

  onInterviews() {
    this.interviewService.selectedInterview.next(this.interview.interviewId) ;
    this.engagementService.startedEditing.next(this.interview.engagement.engagementId) ;
  }

  onBack() {
    this.location.back() ;
  }

  onSurveys() {
    this.interviewService.selectedInterview.next(this.interview.interviewId) ;
    this.surveyService.engagementSelected.next(this.interview.engagement.engagementId) ;
  }

}
