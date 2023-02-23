import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EngagementService } from 'src/app/engagement.service';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from '../interview';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit, OnDestroy {

  constructor(private engagementService: EngagementService, private interviewService: InterviewService, private router: Router, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.selectedEngagementSubscription.unsubscribe() ;
    this.interviewChangedSubscription.unsubscribe() ;
  }

  @Input() interviews: Interview[] ;
  displayedColumns: string[] = ['interviewId',  'date', 'interviewer', 'team' , 'type', 'status'];
  selectedEngagementSubscription: Subscription ;
  interviewChangedSubscription: Subscription ;
  engagementId: number ;
  selectedInterview: Interview ;
  rowClicked = false ;

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

  }


  onSelect(row: Interview) {
    //console.log("interview selected with ID:" + row.interviewId) ;
    // Navigate to the Edit Interview Screen
    this.router.navigate(['viewinterview', row.interviewId]) ;
  }

}
