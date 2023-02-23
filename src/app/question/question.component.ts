import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ClientService } from '../client.service';
import { Client } from '../client/client';
import { EngagementService } from '../engagement.service';
import { Engagement } from '../engagement/engagement';
import { InterviewService } from '../interview.service';
import { Interview } from '../interview/interview';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private interviewService: InterviewService, private route: ActivatedRoute,
    private router: Router, private engagementService: EngagementService) { }


  engagement: Engagement ;
  interviewId: Observable<number> ;
  selectedInterview: Interview ;

  ngOnInit(): void {

    // Find the interview.
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.interviewId = x ;
      this.interviewService.findInterview(x).subscribe((interview: Interview) => {

        this.selectedInterview = interview ;

        this.engagementService.findEngagement(this.selectedInterview.engagement.engagementId).subscribe(x =>
          this.engagement= x ) ; 

      })
    });

    console.log("Interview Id: " + this.interviewId) ;

  }

}
