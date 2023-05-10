import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Question } from 'src/app/question/question';
import { NgForm } from '@angular/forms';
import { SurveyQuestion } from '../surveyquestion';
import { Interviewee } from 'src/app/interviewee/interviewee';
import { Observable, Subject, Subscription } from 'rxjs';
import { SurveyQuestionService } from '../survey-question.service';
import { SurveyQuestionIntervieweeService } from '../survey-question-interviewee.service';
import { SurveyIntervieweeService } from '../survey-interviewee.service';
import { SurveyIntervieweeVO } from '../survey-conduct/surveyintervieweevo';
import { IntervieweeService } from 'src/app/interviewee/interviewee.service';
import { AnswerValueService } from 'src/app/answer-value.service';
import { AnswerValueVO } from '../dropdown-answer/answervaluevo';
import { SurveyQuestionInterviewee } from '../surveyquestioninterviewee';

@Component({
  selector: 'app-survey-question-answer',
  templateUrl: './survey-question-answer.component.html',
  styleUrls: ['./survey-question-answer.component.css']
})
export class SurveyQuestionAnswerComponent implements OnInit, OnDestroy {

  survey: Survey ;
  surveyInterviewee: SurveyIntervieweeVO ;
  questions: SurveyQuestion[] = [] ;
  answersMap = new Map() ; ;
  progress: number = 0 ;
  questionCount: number = 0 ;
  questionIndex: number = 0 ;
  question: SurveyQuestion ;
  interviewee: Interviewee ;
  questionChanged = new Subject<number>() ;
  questionChangedSubscription: Subscription  ;
  answerValues: AnswerValueVO[] = [] ;
  surveyQuestionIntervieweeId: number;

  answerer: Interviewee ;

  @Input() surveyId: number ;
  @ViewChild('f', {static: false}) csForm: NgForm  ;

  constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router,
    private location: Location, private sqService: SurveyQuestionService, private sqiService: SurveyQuestionIntervieweeService,
    private siService: SurveyIntervieweeService, private iService: IntervieweeService, private avService: AnswerValueService) { }


  ngOnDestroy(): void {
    this.questionChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    const surveyintervieweeId: number = Number(this.route.snapshot.paramMap.get('surveyintervieweeid')) ;

    if(surveyintervieweeId){

      // Find the SurveyInterviewee
      this.siService.findSurveyInterviewee(surveyintervieweeId).subscribe(
        x=> {

          this.surveyInterviewee = x ;

        // Find The Survey
        this.surveyService.findById(this.surveyInterviewee.surveyId).subscribe(x =>
          { this.survey = x ;

          // Find the SurveyQuestions
           this.sqService.findSurveyQuestionBySurvey(x.surveyId).subscribe(
            (surveyQuestions: SurveyQuestion[]) => {

              this.questions = surveyQuestions ;

              // Get the number of questions
              this.questionCount = this.questions.length ;

              // Get the first question
              this.question = this.questions[this.questionIndex]  ;


              // Find the Interviewee
              this.iService.findInterviewee(this.surveyInterviewee.intervieweeId).subscribe(x => this.interviewee = x) ;

              this.questionChangedSubscription = this.questionChanged.subscribe(surveyQuestionId =>

               //   find the Survey Question
                this.sqiService.findBySurveyQuestionInterviewee(surveyQuestionId, this.surveyInterviewee.intervieweeId).subscribe(sqi => {

                  this.question.answer = sqi.answer ;
                  this.surveyQuestionIntervieweeId = sqi.surveyQuestionIntervieweeId ;
                  // Find the Answer Values.
                  this.avService.findByQuestion(sqi.surveyQuestion.question.questionId).subscribe(av => this.answerValues = av);

                }
              )
              );

              this.updateProgress() ;

              if(this.questions.length > 0) {
                this.questionChanged.next(this.questions[0].surveyQuestionId) ;
              }


          }) ;

        }) ;

    });

      // Set the First Question

      //
    }

  }


  onBack() {
    this.location.back() ;
  }



  onNextQuestion() {

    // Save the current Answer
    this.onAddAnswer(this.csForm).subscribe(x => {
      this.questions[this.questionIndex] = x.surveyQuestion;
    }) ;


    if(this.questionIndex < this.questionCount){
      this.question = this.questions[++this.questionIndex] ;
      this.questionChanged.next(this.question.surveyQuestionId) ;
      this.updateProgress() ;
    }
  }


  onAddAnswer(f: NgForm): Observable<SurveyQuestionInterviewee> {

    const value = f.value ;

    const sqi = new SurveyQuestionInterviewee() ;
    sqi.answer = value.answer ;
    sqi.surveyQuestion = this.question ;
    sqi.interviewee = this.interviewee ;
    sqi.surveyQuestionIntervieweeId = this.surveyQuestionIntervieweeId ;

    // surveyquestion.questionNumber = this.question.questionNumber ;
    // surveyquestion.escalationRequired = value.escalationRequired ;
    // surveyquestion.answer = value.answer ;
    // surveyquestion.notes = value.notes ;
    // surveyquestion.interviewQuestionId = this.question.interviewQuestionId ;
    // surveyquestion.interview.interviewId = this.interview.interviewId ;

     // Add the answerers.
    //console.log(this.answerers) ;
    // const iqi: InterviewQuestionInterviewee[] = [] ;
    // this.answerers.forEach(intervieweeId => {
    //   console.log('parsed: '+intervieweeId) ;
    //    const ai = new InterviewQuestionInterviewee() ;
    //    ai.interviewee.intervieweeId = intervieweeId ;
    //    ai.interviewQuestion.interviewQuestionId = surveyquestion.interviewQuestionId ;
    //    iqi.push(ai) ;
    // })

    //this.iqiService.addAllInterviewQuestionInterviewees(iqi).subscribe(x=> {
    // this.answerers = x.map(y => y.interviewee.intervieweeId)
    //})

      console.log("updating SurveyQuestion with ID: " + sqi.surveyQuestionIntervieweeId) ;
      return this.sqiService.updateSurveyQuestionInterviewee(sqi.surveyQuestionIntervieweeId, sqi) ;

  }


  onPreviousQuestion() {

    // Save the current Answer
    this.onAddAnswer(this.csForm).subscribe(x =>
      {
        this.questions[this.questionIndex] = x.surveyQuestion;
      }) ;

    if(this.questionIndex >= 0) {

      this.question = this.questions[--this.questionIndex] ;
      this.questionChanged.next(this.question.surveyQuestionId) ;
      this.updateProgress() ;

    }
  }


  onConclude() {

    // Save the current Answer
    // this.onAddAnswer(this.csForm).subscribe(x => {

    //   // Change the intervie Status
    //   this.surveyService.concludeInterview(this.survey).subscribe(
    //     i=> {
    //       this.router.navigate(['viewinterviews', this.interview.engagement.engagementId]) ;
    //     }
    //   )
      // Navigate back to the interview.

    // }) ;

  }

  private updateProgress() {

    if(this.questionCount == 0) {
      this.progress = 100 ;
    }else {
      this.progress = (this.question.questionNumber / this.questionCount) * 100 ;
    }
  }



}
