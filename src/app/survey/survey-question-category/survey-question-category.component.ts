import { Component, OnInit } from '@angular/core';
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


  constructor(private sqcService: SurveyQuestionCategoryService) { }


  ngOnInit(): void {
  }

  onAddSqC(f: NgForm) {

  }

  onDelete() {

  }

  onClear() {
  }

}
