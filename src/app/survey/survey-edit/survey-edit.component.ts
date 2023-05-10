import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/user';
import { Survey } from '../survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit, OnDestroy {


  selectedSurvey: Survey = new Survey() ;
  editMode = false ;
  @ViewChild('f', {static: false}) sForm: NgForm ;
  selectedSurveySubscription: Subscription ;
  engagementId: number ;
  surveyId: number ;

  constructor(private sService: SurveyService, private location: Location, private route: ActivatedRoute, private router: Router) { }


  ngOnDestroy(): void {
    this.selectedSurveySubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    // Get the EngagementId
    this.engagementId = Number(this.route.snapshot.paramMap.get("id")) ;

    // Listen for a selected Survey
    this.selectedSurveySubscription = this.sService.surveySelected.subscribe(
      x => {this.setSelectedSurvey(x)
    }) ;

    // See if we've been passed a survey to edit.
    this.surveyId = Number(this.route.snapshot.paramMap.get("surveyid")) ;

    if(this.surveyId) {
      this.sService.findById(this.surveyId).subscribe(x=> {
        this.selectedSurvey = x ;
        this.editMode = true ;
      }
      );
    }
}

 private setSelectedSurvey(id: number) {
    this.sService.findById(id).subscribe(
      x => {
        this.selectedSurvey = x ;
        this.editMode = true ;
      } );
  }

  onAddSurvey(f: NgForm) {
      const value = f.value ;

      // Assign the id of the person who entered the finding.
      const user  = JSON.parse(localStorage.getItem('userData') ||'null') as User ;

      this.selectedSurvey.createdByUserId = user.userId ;
      this.selectedSurvey.createdDate = new Date() ;
      this.selectedSurvey.engagement.engagementId = this.engagementId ;

      console.log(JSON.stringify(this.selectedSurvey));

      if(this.editMode) {
        this.sService.updateSurvey(this.selectedSurvey.surveyId, this.selectedSurvey).subscribe() ;
      }else {
        this.sService.addSurvey(this.selectedSurvey).subscribe() ;
      }

      this.onClear() ;

  }

  onDelete() {

    this.sService.deleteSurvey(this.selectedSurvey.surveyId).subscribe() ;
    this.onClear() ;
  }

  onClear() {
    this.editMode = false ;
    this.sForm.reset() ;
  }

  onBack() {
    this.location.back() ;
  }

  onAddQuestion() {
    this.router.navigate(['addsurveyquestion', this.selectedSurvey.surveyId]);
    }


    onInitiateSurvey() {
      this.router.navigate(['conductsurvey', this.selectedSurvey.surveyId]);
    }
}
