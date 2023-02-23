import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { InterviewQuestionService } from 'src/app/interview-question.service';
import { InterviewQuestion } from 'src/app/interviewquestion';
import { QuestionService } from 'src/app/question.service';
import { Question } from '../question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  questions: InterviewQuestion[] = []
  @Input() interviewId: number ;
  questionChangedSubscription: Subscription ;
  displayedColumns: string[] = [ 'number','description'];
  selectedQuestion: InterviewQuestion;

  constructor(private iqService: InterviewQuestionService, private route: ActivatedRoute, private router: Router) { }


  ngOnDestroy(): void {
    this.questionChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    // Find the questions for the interview
    this.iqService.findByInterviewId(this.interviewId).subscribe(questions => this.questions = questions);
    
    // Setup the Subscription to listen to changed Questions.
    this.questionChangedSubscription = this.iqService.interviewQuestionChanged.subscribe(t => {
      this.iqService.findByInterviewId(this.interviewId).subscribe(questions => this.questions = questions);
    });

  }

  onSelect(question: InterviewQuestion) {

    this.selectedQuestion = question ;
    console.log("Selected Question:"+ this.selectedQuestion.interviewQuestionId) ;
    // Let new service know that a question has been selected.
    this.iqService.startedEditing.next(this.selectedQuestion.interviewQuestionId) ;

  }

  onAnswer() {
    console.log('Answer clicked') ;
  }

}
