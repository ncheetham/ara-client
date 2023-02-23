import { Location } from '@angular/common';
import { APP_ID, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Answer } from '../answer';
import { AnswerService } from '../answer.service';
import { AnswerInterviewee } from '../answerinterviewee';
import { InterviewIntervieweeService } from '../interview-interviewee.service';
import { InterviewQuestionService } from '../interview-question.service';
import { InterviewService } from '../interview.service';
import { Interview } from '../interview/interview';
import { Interviewee } from '../interviewee/interviewee';
import { InterviewQuestion } from '../interviewquestion';
import { InterviewQuestionInterviewee } from '../interviewquestioninterviewee';
import { Question } from '../question/question';

@Component({
  selector: 'app-conduct-interview',
  templateUrl: './conduct-interview.component.html',
  styleUrls: ['./conduct-interview.component.css']
})
export class ConductInterviewComponent implements OnInit {

  constructor(private iqService: InterviewQuestionService, private route: ActivatedRoute,
    private interviewService: InterviewService, private iiService: InterviewIntervieweeService,
    private answerService: AnswerService, private router: Router, private location: Location) { }

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

  answerers = new FormControl('');

  ngOnInit(): void {


     // See if a parameter (Client Id) was passed.
     this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.interviewId = x ;

      // Find the Interview
      this.interviewService.findInterview(this.interviewId).subscribe(i => this.interview = i) ;

      // Get the Questions:
      this.iqService.findByInterviewId(this.interviewId).subscribe(x=> {

        // Get the number of Questions.
        this.questions = x ;

        this.questionCount = this.questions.length ;
        console.log('Question Count: ' + this.questionCount) ;

        // set the first Question
        this.question = this.questions[this.questionIndex];

        this.updateProgress() ;

        // Build the list of interviewInterviewees.
        this.iiService.findIntervieweesByInterview(this.interviewId).subscribe(x =>
          {
            console.log("Interviewees Found:" + JSON.stringify(x)) ;
            this.interviewees = x.map(function (ii) {
              return new Interviewee(ii.interviewee.intervieweeId, ii.interviewee.firstName, ii.interviewee.lastName) ;
            })
          })
      }) ;
    })

  }


  onNextQuestion() {
    // Save the current Answer
    this.onAddAnswer(this.ciForm).subscribe() ;
    if(this.questionIndex < this.questionCount){
      this.question = this.questions[++this.questionIndex] ;
      this.updateProgress() ;
    }
  }


  onAddAnswer(f: NgForm): Observable<InterviewQuestion> {

    const value = f.value ;

    const interviewquestion = new InterviewQuestion() ;
    interviewquestion.question = this.questions[this.questionIndex].question ;
    interviewquestion.escalationRequired = value.escalationRequired ;
    interviewquestion.answer = value.answer ;
    interviewquestion.notes = value.notes ;
    interviewquestion.interviewQuestionId = this.questions[this.questionIndex].interviewQuestionId ;
    interviewquestion.interviewId = this.interview.interviewId ;

     // Add the answerers.

     console.log(JSON.stringify(this.answerers.value)) ;
    const answerers  = this.answerers.value?.split(",").map(Number); ;
    answerers?.forEach(intervieweeId => {
       const ai = new InterviewQuestionInterviewee() ;
       ai.interviewee.intervieweeId = intervieweeId ;
       ai.interviewQuestion = interviewquestion ;
       interviewquestion.answerers.push(ai) ;
    })

    console.log("Adding Answer:"+ JSON.stringify(interviewquestion)) ;


    if(interviewquestion.interviewQuestionId == 0){
      // Save the i
      return this.iqService.addQuestion(interviewquestion) ;
    } else {
      return this.iqService.updateInterviewQuestion(interviewquestion.interviewQuestionId, interviewquestion) ;
    }

  }


  onPreviousQuestion() {

    // Save the current Answer
    this.onAddAnswer(this.ciForm).subscribe() ;

    if(this.questionIndex >= 0) {

      this.question = this.questions[--this.questionIndex] ;

      this.updateProgress() ;

    }
  }


  onConclude() {

    // Save the current Answer
    this.onAddAnswer(this.ciForm).subscribe(x => {

      // Change the intervie Status
      this.interviewService.concludeInterview(this.interview).subscribe(
        i=> {
          this.router.navigate(['interviews', i.interviewId]) ;
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

