import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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


  constructor(private surveyService: SurveyService) {

    this.engagementSubscription = surveyService.engagementSelected.subscribe(x => {

      this.surveyService.findByEngagementId(x).subscribe(x=> {
        this.surveys = x ;
      })
    })

  }

  ngOnDestroy(): void {
    this.engagementSubscription.unsubscribe() ;
  }

  ngOnInit(): void {
  }

  onSelect(row: Survey) {
    this.selectedSurvey = row ;
  }

}
