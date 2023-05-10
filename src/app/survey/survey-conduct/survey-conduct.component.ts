import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IntervieweeVO } from 'src/app/interviewee/intervieweevo';
import { SurveyIntervieweeVO } from './surveyintervieweevo';
import { Location } from '@angular/common';
import { Survey } from '../survey';
import { SurveyService } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IntervieweeService } from 'src/app/interviewee/interviewee.service';
import { Interviewee } from 'src/app/interviewee/interviewee';
import { SurveyIntervieweeService } from '../survey-interviewee.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-survey-conduct',
  templateUrl: './survey-conduct.component.html',
  styleUrls: ['./survey-conduct.component.css']
})
export class SurveyConductComponent implements OnInit, OnDestroy {


  interviewees: Interviewee[] = []  ;
  surveyInterviewee = new  SurveyIntervieweeVO() ;
  surveyInterviewees: SurveyIntervieweeVO[] = [] ;
  survey: Survey ;
  surveyIntervieweeChangedSubscription: Subscription ;


  constructor(private location: Location, private sService: SurveyService, private router: Router,
    private route: ActivatedRoute, private iService: IntervieweeService, private siService: SurveyIntervieweeService) { }


  ngOnDestroy(): void {
    this.surveyIntervieweeChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    const surveyId = Number(this.route.snapshot.paramMap.get("surveyid"));

    if(surveyId) {
      this.sService.findById(surveyId).subscribe(x =>
        {
          this.survey = x;
          this.iService.findIntervieweeByEngagement(this.survey.surveyId).subscribe(x => this.interviewees = x) ;
          // Find the Survey Interviewees - that have been created for this survey.
          this.siService.findBySurvey(surveyId).subscribe(x => this.surveyInterviewees = x) ;
          this.surveyInterviewee.surveyId = surveyId ;
        });

        this.surveyIntervieweeChangedSubscription = this.siService.surveyIntervieweeChanged.subscribe(x =>
          this.siService.findBySurvey(surveyId).subscribe(x => this.surveyInterviewees = x)
        );

    }

  }

  onConduct(f: NgForm) {

    const value = f.value ;

    // Get the interviewee id
    this.surveyInterviewee.intervieweeId = +value.intervieweeId ;

    let surveyIntervieweeId = this.getInitiated(this.surveyInterviewee.intervieweeId);

      // Check the status of the Survey
      if(surveyIntervieweeId > 0){

      }else {

        // Start the process of the Survey by setting the status to Planned.
        this.surveyInterviewee.statusId = 2 ; // Planned.
        this.siService.createSurveyInterviewee(this.surveyInterviewee).subscribe(
          x => surveyIntervieweeId = x.surveyIntervieweeId
        ) ;
        
      }

      // Navigate to answer the Questions.
      this.router.navigate(["conductintervieweesurvey", surveyIntervieweeId]) ;

  }

  // Check to see if the Survey has already been initiated for this Interviewee.
  getInitiated(iId: number): number {


    const filtered = this.surveyInterviewees.filter(x => x.intervieweeId == iId);

    if(filtered && filtered.length > 0) {
      return filtered[0].surveyIntervieweeId ;
    }

    return 0;

  }

  onBack() {
    this.location.back();
  }

  onDownloadSurvey(f: NgForm) {

    const value = f.value ;

    this.surveyInterviewee.intervieweeId = +value.intervieweeId ;

    const id: number = this.getInitiated(this.surveyInterviewee.intervieweeId) ;

    // Check the status of the Survey
    if( id > 0){
      this.siService.downloadSurveyQuestions(id).subscribe(x => this.handleDownload(x)) ;
    }else {
      this.surveyInterviewee.statusId = 4; // Sent.
      this.siService.createSurveyInterviewee(this.surveyInterviewee).subscribe(
        x => this.siService.downloadSurveyQuestions(x.surveyIntervieweeId).subscribe(x => this.handleDownload(x))
      ) ;
    }

  }

  handleDownload(response: any)
  {

    const contentDisposition = response.headers.get('Content-Disposition');
    console.log("content Disposition: " + contentDisposition) ;
    let fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
    console.log(fileName) ;

    let blob = new Blob([response.body], {type: 'application/octet-stream'} ) ;

    let downloadLink = document.createElement('a');
    downloadLink.download=fileName ;
    downloadLink.href = window.URL.createObjectURL(blob) ;
    downloadLink.click() ;

  }

}
