import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EngagementThemeService } from 'src/app/engagement-theme.service';
import { QuestionService } from 'src/app/question.service';
import { Question } from 'src/app/question/question';
import { Theme } from 'src/app/theme';

@Component({
  selector: 'app-engagement-question-list',
  templateUrl: './engagement-question-list.component.html',
  styleUrls: ['./engagement-question-list.component.css']
})
export class EngagementQuestionListComponent implements OnInit, OnDestroy {

  @Input() engagementThemeId: number ;
  questions: Question[]  ;
  selectedQuestion: Question ;
  displayedColumns = ['questionId', 'description'] ;

  constructor(private questionService: QuestionService, private engagementThemeService: EngagementThemeService) { }

  engagementThemeChangedSubscription: Subscription ;
  questionChangedSubscription: Subscription ;

  ngOnInit(): void {

    // Get the Theme Questions
    // this.questionService.findByEngagementTheme(this.engagementThemeId).subscribe(x=>
    //   {
    //     this.questions = x ;
    //   })

    //   // Listen for changes to themes
    //   this.engagementThemeChangedSubscription = this.engagementThemeService.engagementThemeChanged.subscribe(x => {
    //     this.engagementThemeId = x ;

    //     // Change the List of Questions - if a theme has been changed.
    //     this.questionService.findByEngagementTheme(this.engagementThemeId).subscribe(x=>
    //       {
    //         this.questions = x ;
    //       })
    //   })


    //   // Listen for added and Changed Questions.
    //   this.questionChangedSubscription = this.questionService.questionChangedSubscription.subscribe(x => {
    //     // refind the list of questions.
    //     this.questionService.findByEngagementTheme(this.engagementThemeId).subscribe(x=>
    //       {
    //         this.questions = x ;
    //       })

      // })


  }

  ngOnDestroy(): void {
    this.engagementThemeChangedSubscription.unsubscribe() ;
    this.questionChangedSubscription.unsubscribe() ;
  }

  onSelect(q: Question) {
    this.selectedQuestion = q ;
    this.questionService.startedEditing.next(q.questionId) ;

  }


}
