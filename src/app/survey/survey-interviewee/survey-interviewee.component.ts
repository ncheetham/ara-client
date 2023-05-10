import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../survey';
import { SurveyIntervieweeService } from '../survey-interviewee.service';
import { IntervieweeService } from 'src/app/interviewee/interviewee.service';

@Component({
  selector: 'app-survey-interviewee',
  templateUrl: './survey-interviewee.component.html',
  styleUrls: ['./survey-interviewee.component.css']
})
export class SurveyIntervieweeComponent implements OnInit {

  survey: Survey ;


  constructor(private siService: SurveyIntervieweeService, private surveyService: SurveyService,
    private router: Router, private route: ActivatedRoute, private location: Location, private iService: IntervieweeService) { }

  ngOnInit(): void {

    const surveyIntervieweeId: number = Number(this.route.snapshot.paramMap.get("surveyintervieweeid"));


    if(surveyIntervieweeId) {
      this.siService.findSurveyInterviewee(surveyIntervieweeId).subscribe(x => {

        const surveyId = x.surveyId ;

        this.surveyService.findById(surveyId).subscribe(
          s => this.survey = s
        );
      })
    }



  }

}
