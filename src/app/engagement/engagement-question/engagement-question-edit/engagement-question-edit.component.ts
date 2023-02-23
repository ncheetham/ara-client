import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EngagementThemeService } from 'src/app/engagement-theme.service';
import { EngagementTheme } from 'src/app/engagement/engagement-theme/engagementtheme';
import { Engagement } from 'src/app/engagement/engagement';
import { QuestionService } from 'src/app/question.service';
import { Question } from 'src/app/question/question';

@Component({
  selector: 'app-engagement-question-edit',
  templateUrl: './engagement-question-edit.component.html',
  styleUrls: ['./engagement-question-edit.component.css']
})
export class EngagementQuestionEditComponent implements OnInit {


  @Input() engagement: Engagement ;
  @Input() engagementThemeId: number ;
  @ViewChild('f', {static: false}) qForm: NgForm ;

  question: Question = {questionId: 0, description: ''};;
  editMode = false ;
  selectedQuestionSubscription: Subscription ;
  questionChangedSubscription: Subscription ;
  engagementThemeChangedSubscription: Subscription ;
  nextQuestionNumber: number ;
  engagementThemes: EngagementTheme[] = [] ;

  constructor(private engagementThemeService: EngagementThemeService, private questionService: QuestionService,
    private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnDestroy(): void {

    this.selectedQuestionSubscription.unsubscribe() ;
    this.questionChangedSubscription.unsubscribe();
    this.engagementThemeChangedSubscription.unsubscribe();
  }

  ngOnInit(): void
  {



    // Subscribe to changes to the engagementTheme
    // this.engagementThemeChangedSubscription = this.engagementThemeService.engagementThemeChanged.subscribe(x => {
    //       this.engagementThemeId = x ;

    //       this.questionService.findByEngagementTheme(this.engagementThemeId).subscribe(questions => {

    //         console.log("Next Question number: " + this.nextQuestionNumber);
    //       });

    // })

    // Subscribe to the Started Editing Service -- to refresh the selected Question.
    this.selectedQuestionSubscription = this.questionService.startedEditing.subscribe(((questionId: number) => {
      this.questionService.findQuestion(questionId).subscribe(question => this.question = question) ;
      this.editMode = true ;
    })) ;


    // this.questionChangedSubscription = this.questionService.questionChangedSubscription.subscribe(x => {

    //   // get the next question number.
    //   this.questionService.findByEngagementTheme(this.engagementThemeId).subscribe(questions => {

    //     console.log("Next Question number: " + this.nextQuestionNumber);

    //   });
    // });

    console.log("EngagementThemeId: " + this.engagementThemeId) ;

  }

  onAddQuestion(form: NgForm) {

    var newQuestion: Question = {questionId: this.question.questionId, description: this.question.description }

    console.log('About to update question: ' + JSON.stringify(newQuestion)) ;

    if(this.editMode) {
      this.questionService.updateQuestion(newQuestion.questionId, newQuestion).subscribe() ;
    }else {
      this.questionService.addQuestion(newQuestion).subscribe() ;
    }

    this.onClear() ;

  }

  onDelete() {

    this.questionService.deleteQuestion(this.question.questionId).subscribe() ;
    this.onClear() ;

  }


  onClear() {

    this.qForm.reset() ;
    this.editMode = false;

  }


}
