import { NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnswerValueVO } from './answervaluevo';
import { Answer } from 'src/app/answer';
import { Subscription } from 'rxjs';
import { QuestionService } from 'src/app/question.service';
import { AnswerValueService } from 'src/app/answer-value.service';
import { SurveyQuestionService } from '../survey-question.service';
import { Survey } from '../survey';
import { SurveyQuestion } from '../surveyquestion';

@Component({
  selector: 'app-dropdown-answer',
  templateUrl: './dropdown-answer.component.html',
  styleUrls: ['./dropdown-answer.component.css']
})
export class DropdownAnswerComponent implements OnInit {

  constructor(private qService: QuestionService, private avService: AnswerValueService, private sqService: SurveyQuestionService) { }

  @ViewChild('f', {static: false}) oForm: NgForm ;
  @Input() answerTypeId: number ;
  @Input() questionId: number;

  answers: AnswerValueVO[] = [] ;
  selectedValue = new AnswerValueVO() ;
  editMode = false ;
  selectedIndex = -1;
  questionCreatedSubscription = new Subscription() ;
  surveyQuestionChangedSubscription = new Subscription() ;

  ngOnInit(): void {

    this.questionCreatedSubscription = this.qService.questionCreatedSubscription.subscribe(question => {

      // Save the Answer Values.
      this.answers.forEach(x  => {
        if(x.questionId == 0) {
            x.questionId = question.questionId ;
            this.avService.createAnswerValue(x).subscribe() ;
        }else {
            this.avService.updateAnswerValue(x.answerValueId, x).subscribe() ;
        }
      }
      );
    }) ;


    if(this.questionId && this.questionId > 0) {
      this.avService.findByQuestion(this.questionId).subscribe(x =>
        this.answers = x) ;
    }


  }


  onRemove(index: number) {

    const av = this.answers[index] ;

    if(av.questionId != 0) {
      // Delete it.
      this.avService.deleteAnswerValue(av.answerValueId).subscribe() ;
    }

    this.answers.splice(index, 1) ;
    this.onResetForm() ;
  }

  onAddOption(f: NgForm) {
    //console.log(this.selectedValue) ;


    const newValue = new AnswerValueVO() ;

    newValue.answerValueId = this.selectedValue.answerValueId ;
    newValue.questionId = this.selectedValue.questionId ;
    newValue.score = this.selectedValue.score;
    newValue.value = this.selectedValue.value  ;

      // If the selectedValue is not in the option list - add it.
      if(this.selectedIndex >= 0){

        this.answers[this.selectedIndex] = newValue ;

      }else {

        this.answers.push(newValue) ;

      }

    this.onResetForm() ;
  }

  onSelect(index: number) {
    this.selectedValue = this.answers[index];
    this.selectedIndex = index  ;
    this.editMode = true ;
  }

  onResetForm() {
    this.oForm.resetForm() ;
    this.selectedIndex = -1 ;
    this.editMode = false ;
  }

}
