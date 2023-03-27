import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { InterviewService } from 'src/app/interview.service';
import { QuestionService } from 'src/app/question.service';
import { Question } from '../question';
import { DomSanitizer } from '@angular/platform-browser';
import { Engagement } from 'src/app/engagement/engagement';
import { EngagementTheme } from 'src/app/engagement/engagement-theme/engagementtheme';
import { EngagementThemeService } from 'src/app/engagement-theme.service';
import { InterviewQuestionService } from 'src/app/interview-question.service';
import { InterviewQuestion } from 'src/app/interviewquestion';
import { Location } from '@angular/common';




@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit, OnDestroy {


  @Input() engagement: Engagement ;
  @Input() interviewId: number;
  @ViewChild('f', {static: false}) qForm: NgForm ;

  question: Question = new Question() ;
  editMode = false ;
  selectedQuestionSubscription: Subscription ;
  interviewQuestion: InterviewQuestion ;
  nextQuestionNumber: number ;
  engagementThemes: EngagementTheme[] = [] ;
  engagementThemeId: number;
  fileUrl: any ;

  constructor(private interviewService: InterviewService, private interviewQuestionService: InterviewQuestionService,
    private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private location: Location,
    private etService: EngagementThemeService, private questionService: QuestionService) { }

  ngOnDestroy(): void {
    this.selectedQuestionSubscription.unsubscribe() ;
  }

  ngOnInit(): void
  {

    this.selectedQuestionSubscription = this.interviewQuestionService.startedEditing.subscribe(interviewQuestionId=> {
        console.log("A question has been selected: "+ interviewQuestionId) ;
        // Find the Selected interview Question
        this.interviewQuestionService.findInterviewQuestion(interviewQuestionId).subscribe(iq => {
          // Find the interview Question
          this.interviewQuestion = iq ;
          // Find the Actual Question.
        this.questionService.findQuestion(iq.question.questionId).subscribe(question => this.question = question) ;
        this.editMode = true ;
        }
      ) ;
    })


    // Find the Questions.
    this.interviewQuestionService.findByInterviewId(this.interviewId).subscribe(questions => {
      this.nextQuestionNumber = questions.length+1;

    });


    // Find the engagement Themes.
    this.etService.findByEngagementId(this.engagement.engagementId).subscribe(x=> this.engagementThemes = x) ;

    // Set the File Download url
    this.fileUrl = `/api/interviewquestion/excel/${this.interviewId}`

  }

  onAddQuestion(form: NgForm) {

    const value = form.value ;

    var newQuestion: Question = {questionId: value.questionId, description: value.description}

    console.log('About to update question: ' + JSON.stringify(newQuestion)) ;

    if(this.editMode) {
      this.questionService.updateQuestion(newQuestion.questionId, newQuestion).subscribe() ;
    }else {
      this.questionService.addQuestion(newQuestion).subscribe(q => {

        // Create a new Interview Question.
        const iq = new InterviewQuestion() ;
        iq.interview.interviewId = this.interviewId ;
        iq.question.questionId = q.questionId ;
        iq.questionNumber = this.nextQuestionNumber++ ;
        this.interviewQuestionService.addInterviewQuestion(iq).subscribe() ;
      }
      ) ;
    }

    this.onClear() ;

  }

  onDelete() {

    this.interviewQuestionService.deleteQuestion(this.interviewQuestion.interviewQuestionId).subscribe() ;
    this.onClear() ;

  }


  onClear() {

    this.qForm.reset() ;
    //this.question = new Question() ;
    this.editMode = false;

  }



  onDownloadQuestions() {

    // Build the Spreadsheet
    this.interviewQuestionService.downloadQuestions(this.interviewId).subscribe(
    (response: any) =>
      {

        const contentDisposition = response.headers.get('Content-Disposition');
        console.log("content Disposition: " + contentDisposition) ;
        let fileName = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        console.log(fileName) ;

        let blob = new Blob([response.body], {type: 'application/octet-stream'} ) ;

        let downloadLink = document.createElement('a');
        downloadLink.download=fileName ;
        downloadLink.href = window.URL.createObjectURL(blob) ;
        downloadLink.click() ;

      }
    );

  }

  // Import from a spreadsheet.
  onImport() {

  }

  onCopy() {
    this.router.navigate(['questioncopy',this.interviewId]);
  }

  onBack() {
    this.location.back() ;
  }

}


