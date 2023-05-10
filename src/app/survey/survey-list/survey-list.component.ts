import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Survey } from '../survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {


  surveys: Survey[] ;
  displayedColumns: string[] = ['surveyId', 'name', 'description', 'createdDate'] ;
  selectedSurvey: Survey ;
  engagementSubscription: Subscription ;
  engagementSubscription2: Subscription ;
  @Input() engagementId: number ;


  constructor(private surveyService: SurveyService, private router: Router) {
  }

  setSelectedSurveys(engagementId: number) {
    this.surveyService.findByEngagementId(engagementId).subscribe(x=> {
      this.surveys = x ;
    })
  }

  ngOnDestroy(): void {
    this.engagementSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    this.engagementSubscription = this.surveyService.surveySelected.subscribe(x => {
      this.setSelectedSurveys(x) ;
    })

    this.surveyService.findByEngagementId(this.engagementId).subscribe(x =>
      this.surveys = x
    );



  }

  onSelect(row: Survey) {
    this.selectedSurvey = row ;

    // Navigate to the edit Survey Screen.
    this.router.navigate(['editengagementsurvey', this.engagementId, this.selectedSurvey.surveyId]) ;

  }

}
