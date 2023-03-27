import { Location } from '@angular/common';
import { APP_ID, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { Answer } from '../answer';
import { AnswerService } from '../answer.service';
import { AnswerInterviewee } from '../answerinterviewee';
import { InterviewIntervieweeService } from '../interview-interviewee.service';
import { InterviewQuestionIntervieweeService } from '../interview-question-interviewee.service';
import { InterviewQuestionService } from '../interview-question.service';
import { InterviewService } from '../interview.service';
import { Interview } from '../interview/interview';
import { Interviewee } from '../interviewee/interviewee';
import { InterviewQuestion } from '../interviewquestion';
import { InterviewQuestionInterviewee } from '../interviewquestioninterviewee';

@Component({
  selector: 'app-conduct-interview',
  templateUrl: './conduct-interview.component.html',
  styleUrls: ['./conduct-interview.component.css']
})
export class ConductInterviewComponent implements OnInit, OnDestroy {

  constructor(private iqService: InterviewQuestionService, private route: ActivatedRoute,
    private interviewService: InterviewService, private iiService: InterviewIntervieweeService,
    private iqiService: InterviewQuestionIntervieweeService,  private router: Router, private location: Location) { }


  @Input() interviewId: number ;
  @ViewChild('f', {static: false}) ciForm: NgForm  ;

  interview: Interview ;
  questions: InterviewQuestion[] = [] ;
  answersMap = new Map() ; ;
  progress: number = 0 ;
  questionCount: number = 0 ;
  questionIndex: number = 0 ;
  question: InterviewQuestion ;
  interviewees: Interviewee[] = [] ;
  questionChanged = new Subject<number>() ;
  questionChangedSubscription: Subscription  ;

  answerers: any[] ;

  ngOnInit(): void {


     // See if a parameter (Client Id) was passed.
     this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.interviewId = x ;

      // Find the Interview
      this.interviewService.findInterview(this.interviewId).subscribe(i => this.interview = i) ;

      // Get the Questions:
      this.iqService.findByInterviewId(this.interviewId).subscribe((interviewQuestions: InterviewQuestion[])=> {

        // Get the number of Questions.
        this.questions = interviewQuestions ;

        this.questionCount = this.questions.length ;
        console.log('Question Count: ' + this.questionCount) ;

        // set the first Question
        this.question = this.questions[this.questionIndex];

        this.questionChangedSubscription = this.questionChanged.subscribe(interviewQuestionId =>
          // find the InterviewQuestionAnswerers
          this.iqiService.findByInterviewQuestion(interviewQuestionId).subscribe(x =>
            this.answerers = x.map(y => y.interviewee.intervieweeId)
            )
        );

        this.updateProgress() ;

        // Build the list of interviewInterviewees.
        this.iiService.findIntervieweesByInterview(this.interviewId).subscribe(x =>
          {
            //console.log("Interviewees Found:" + JSON.stringify(x)) ;
            this.interviewees = x.map(function (ii) {
              return new Interviewee(ii.interviewee.intervieweeId, ii.interviewee.firstName, ii.interviewee.lastName) ;
            })
          })
      }) ;
    })

  }

  ngOnDestroy(): void {
    this.questionChangedSubscription.unsubscribe() ;
  }

  onNextQuestion() {

    // Save the current Answer
    this.onAddAnswer(this.ciForm).subscribe(x => {
      this.questions[this.questionIndex] = x;
    }) ;


    if(this.questionIndex < this.questionCount){
      this.question = this.questions[++this.questionIndex] ;
      this.questionChanged.next(this.question.interviewQuestionId) ;
      this.updateProgress() ;
    }
  }


  onAddAnswer(f: NgForm): Observable<InterviewQuestion> {

    const value = f.value ;

    const interviewquestion = new InterviewQuestion() ;
    interviewquestion.question = this.question.question ;
    interviewquestion.questionNumber = this.question.questionNumber ;
    interviewquestion.escalationRequired = value.escalationRequired ;
    interviewquestion.answer = value.answer ;
    interviewquestion.notes = value.notes ;
    interviewquestion.interviewQuestionId = this.question.interviewQuestionId ;
    interviewquestion.interview.interviewId = this.interview.interviewId ;

     // Add the answerers.
    console.log(this.answerers) ;
    const iqi: InterviewQuestionInterviewee[] = [] ;
    this.answerers.forEach(intervieweeId => {
      console.log('parsed: '+intervieweeId) ;
       const ai = new InterviewQuestionInterviewee() ;
       ai.interviewee.intervieweeId = intervieweeId ;
       ai.interviewQuestion.interviewQuestionId = interviewquestion.interviewQuestionId ;
       iqi.push(ai) ;
    })

    this.iqiService.addAllInterviewQuestionInterviewees(iqi).subscribe(x=> {
      this.answerers = x.map(y => y.interviewee.intervieweeId)
    })

      console.log("updating interviewQuestion with ID: " + interviewquestion.interviewQuestionId) ;
      return this.iqService.updateInterviewQuestion(interviewquestion.interviewQuestionId, interviewquestion) ;

  }


  onPreviousQuestion() {

    // Save the current Answer
    this.onAddAnswer(this.ciForm).subscribe(x =>
      {
        this.questions[this.questionIndex] = x;
      }) ;

    if(this.questionIndex >= 0) {

      this.question = this.questions[--this.questionIndex] ;
      this.questionChanged.next(this.question.interviewQuestionId) ;
      this.updateProgress() ;

    }
  }


  onConclude() {

    // Save the current Answer
    this.onAddAnswer(this.ciForm).subscribe(x => {

      // Change the intervie Status
      this.interviewService.concludeInterview(this.interview).subscribe(
        i=> {
          this.router.navigate(['viewinterviews', this.interview.engagement.engagementId]) ;
        }
      )
      // Navigate back to the interview.

    }) ;

  }

  private updateProgress() {

    if(this.questionCount == 0) {
      this.progress = 100 ;
    }else {
      this.progress = (this.question.questionNumber / this.questionCount) * 100 ;
    }
  }

  onBack() {
    this.location.back() ;
  }


}

