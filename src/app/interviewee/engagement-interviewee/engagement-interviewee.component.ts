import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';
import { IntervieweeService } from '../interviewee.service';

@Component({
  selector: 'app-engagement-interviewee',
  templateUrl: './engagement-interviewee.component.html',
  styleUrls: ['./engagement-interviewee.component.css']
})
export class EngagementIntervieweeComponent implements OnInit {

  constructor(private eService: EngagementService, private iService: IntervieweeService, private route: ActivatedRoute, private location: Location) { }

  engagement: Engagement;

  ngOnInit(): void {

    // Find the engagement.

    const engagementId = Number(this.route.snapshot.paramMap.get("id"));
    this.eService.findEngagement(engagementId).subscribe(x =>
      this.engagement = x
    );


  }

}
