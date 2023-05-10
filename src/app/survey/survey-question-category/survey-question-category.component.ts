import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SurveyQuestionCategoryService } from '../survey-question-category.service';
import { SurveyQuestionCategory } from './surveyquestioncategory';

@Component({
  selector: 'app-survey-question-category',
  templateUrl: './survey-question-category.component.html',
  styleUrls: ['./survey-question-category.component.css']
})
export class SurveyQuestionCategoryComponent implements OnInit {

  surveyQuestionCategory: SurveyQuestionCategory = new SurveyQuestionCategory();
  editMode = false ;
  @Input() surveyId: number ;

  constructor(private sqcService: SurveyQuestionCategoryService) { }


  ngOnInit(): void {
  }

  onAddSqC(f: NgForm) {

    const value = f.value ;

    this.surveyQuestionCategory.surveyQuestionCategoryId = value.id ;
    this.surveyQuestionCategory.name = value.name ;
    this.surveyQuestionCategory.description = value.description ;
    // Assign the Survey ID
    this.surveyQuestionCategory.survey.surveyId = this.surveyId ;

    if(this.surveyQuestionCategory.surveyQuestionCategoryId == 0) {
      // Add the Survey Question Category.
      this.sqcService.createSurveyQuesetionCategory(this.surveyQuestionCategory).subscribe();
    }else {
      // Edit the survey question category.
      this.sqcService.updateSurveyQuestionCategory(this.surveyQuestionCategory.surveyQuestionCategoryId,  this.surveyQuestionCategory).subscribe();
    }


  }

  onDelete() {

  }

  onClear() {
  }

}
