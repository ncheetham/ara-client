import { Component, OnInit } from '@angular/core';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';
import { IntervieweeService } from '../interviewee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Interviewee } from '../interviewee';
import { Interview } from 'src/app/interview/interview';
import { Location } from '@angular/common';
import { SurveyIntervieweeService } from 'src/app/survey/survey-interviewee.service';
import { SurveyInterviewee } from 'src/app/survey/survey-conduct/surveyinterviewee';
import { InterviewStatus } from 'src/app/interview/interview-status/interviewstatus';
import { InterviewInterviewee } from 'src/app/interviewinterviewee';
import { InterviewIntervieweeService } from 'src/app/interview-interviewee.service';

@Component({
  selector: 'app-interviewee-status',
  templateUrl: './interviewee-status.component.html',
  styleUrls: ['./interviewee-status.component.css']
})
export class IntervieweeStatusComponent implements OnInit {

  engagement: Engagement ;
  selectedInterviewee: Interviewee ;
  reportsTo: Interviewee ;
  surveyStatus: SurveyInterviewee[] = [] ;
  interviewStatus: InterviewInterviewee[] = [] ;
  displayedSurveyColumns = ['survey','status'] ; //,'actions'
  displayedInterviewColumns = ['interview', 'status', 'actions'] ;
  selectedSurveyInterviewee: SurveyInterviewee ;
  isEdit:boolean = false ; 

  constructor(private eService: EngagementService, private iService: IntervieweeService, private route: ActivatedRoute
    , private router: Router, private location: Location, private siService: SurveyIntervieweeService,
    private iiService: InterviewIntervieweeService) { }



  ngOnInit(): void {


    // Find the Interviewee
    const intervieweeId = Number(this.route.snapshot.paramMap.get('intervieweeid')) ;

    this.setup(intervieweeId) ;

    this.route.params.subscribe(
      params => {
          const id = +params['intervieweeid'];
          this.setup(id) ;
      }
  );

  }

  setup(intervieweeId: number) {

    if(intervieweeId) {
      this.iService.findInterviewee(intervieweeId).subscribe(x=> {
      this.selectedInterviewee = x;
        if(this.selectedInterviewee.reportsToId && this.selectedInterviewee.reportsToId > 0) {
          this.iService.findInterviewee(this.selectedInterviewee.reportsToId).subscribe(y => this.reportsTo = y) ;
        }else {
          //this.reportsTo.intervieweeId = 0 ;
        }

        this.eService.findEngagement(this.selectedInterviewee.engagementId).subscribe(x => this.engagement = x) ;


        // // Find the Survey Status
        this.siService.findByInterviewee(intervieweeId).subscribe(x => {

          this.surveyStatus = x ;
          console.log(JSON.stringify(this.surveyStatus));
          //this.surveyStatus[0].surveyIntervieweeStatus.

        })

        // Find the Interviewee Status.
        this.iiService.findInterviewsByInterviewee(intervieweeId).subscribe(x => {
          this.interviewStatus = x ;
        })


      }) ;
    }

  }

  onBack() {
    this.location.back() ;
  }

  onEdit() {

    // this.isEdit = true ; 

    //this.router.navigate(['editinterviewee', this.selectedInterviewee.intervieweeId]);

    //this.router.navigate(['editInterviewee', this.engagement.engagementId , this.selectedInterviewee.intervieweeId]) ;

    //this.iiService.interviewIntervieweeSelected.next(this.selectedInterviewee.intervieweeId) ;

    this.router.navigate(['editinterviewee', this.engagement.engagementId, this.selectedInterviewee.intervieweeId]);
  }

  onShowBoss() {

  }

  onSurveySelect(row: SurveyInterviewee){

  }

  onInterviewSelect(row: InterviewStatus) {

  }

}
