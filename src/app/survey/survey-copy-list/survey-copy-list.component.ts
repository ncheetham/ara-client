import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Survey } from '../survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-copy-list',
  templateUrl: './survey-copy-list.component.html',
  styleUrls: ['./survey-copy-list.component.css']
})
export class SurveyCopyListComponent implements OnInit {

  surveys: Survey[] ;
  displayedColumns: string[] = ['surveyId', 'name', 'description', 'createdDate', 'copy'] ;
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

  onCopy(surveyId: number) {

  }

}
