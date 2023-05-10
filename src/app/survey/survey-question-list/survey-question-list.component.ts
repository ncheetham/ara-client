import { Component, Input, OnInit } from '@angular/core';
import { SurveyQuestionService } from '../survey-question.service';
import { SurveyQuestion } from '../surveyquestion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-question-list',
  templateUrl: './survey-question-list.component.html',
  styleUrls: ['./survey-question-list.component.css']
})
export class SurveyQuestionListComponent implements OnInit {

  questions: SurveyQuestion[] = []

  @Input() surveyId: number ;
  // questionChangedSubscription: Subscription ;
  displayedColumns: string[] = [ 'number','category','description'];
  selectedQuestion: SurveyQuestion;

  constructor(private sqService: SurveyQuestionService, private router: Router) { }

  ngOnInit(): void {

    this.sqService.findSurveyQuestionBySurvey(this.surveyId).subscribe( x => {
      this.questions = x ;
    })

  }

  onSelect(row: SurveyQuestion) {
    // Edit the Survey Question.
    this.selectedQuestion = row ;
    this.router.navigate(['editsurveyquestion', this.selectedQuestion.survey.surveyId, this.selectedQuestion.surveyQuestionId]);

  }

}
