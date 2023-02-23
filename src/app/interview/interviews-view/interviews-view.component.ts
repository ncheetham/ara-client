import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from '../interview';

@Component({
  selector: 'app-interviews-view',
  templateUrl: './interviews-view.component.html',
  styleUrls: ['./interviews-view.component.css']
})


// This class shows the Interviews for a specific Engagment and allows the user to view, edit, delete and analyze them.
export class InterviewsViewComponent implements OnInit {

  //client: Client ;
  engagement: Engagement ;
  interviews: Interview[] = [] ;

  constructor(private engagementService: EngagementService, private interviewService: InterviewService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {

       // Get the Engagment.
       const engagementId = Number(this.route.snapshot.paramMap.get('id'));

       this.engagementService.findEngagement(engagementId).subscribe(
        x=> {
          this.engagement = x ;

          // Find the Client
          //this.clientService.findClient(this.engagement.client.clientId).subscribe(x=> this.client = x) ;


          // Find the interviews
          this.interviewService.findInterviewsByEngagement(engagementId).subscribe(interviews => this.interviews = interviews) ;

        }
       );
  }

  onBack() {
    this.location.back();
  }

  onAddInterview() {
    // Add an interview to the Engagement.
    this.router.navigate(['addinterview',this.engagement.engagementId]);

  }

}
