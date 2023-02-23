import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionResolutionMethodListComponent } from 'src/app/question-resolution-method/question-resolution-method-list/question-resolution-method-list.component';
import { QuestionResolutionService } from 'src/app/question-resolution.service';
import { QuestionResolution } from 'src/app/questionresolution';

@Component({
  selector: 'app-question-resolution-edit',
  templateUrl: './question-resolution-edit.component.html',
  styleUrls: ['./question-resolution-edit.component.css']
})
export class QuestionResolutionEditComponent implements OnInit, OnDestroy {


  @ViewChild('f', {static: false}) qrForm: NgForm ;

  selectedQr: Subscription ;
  questionResolution: QuestionResolution = {questionResolutionId: 0, name: ''} ;
  editMode = false ;

  constructor(private questionResolutionService: QuestionResolutionService) { }


  ngOnDestroy(): void {
    this.selectedQr.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for selected Question Resolution.
    this.selectedQr = this.questionResolutionService.questionResolutionSelected.subscribe(x=> {
      this.questionResolutionService.findQuestionResolution(x).subscribe(qr => this.questionResolution = qr) ;
      this.editMode = true ; 
    })

  }


  // Add or Edit the Question Resolution.
  onAddQuestionResolution(f: NgForm) {

    const value = f.value ;

    const newQr: QuestionResolution = {questionResolutionId: value.questionResolutionId, name: value.name} ;

    if(this.editMode) {

      this.questionResolutionService.updateQuestionResolution(newQr.questionResolutionId, newQr).subscribe() ;

    }else {
      this.questionResolutionService.addQuestionResolution(newQr).subscribe() ;
    }

    this.onClear() ;

  }

  onDelete() {
    this.questionResolutionService.deleteQuestionResolution(this.questionResolution.questionResolutionId).subscribe() ;
    this.onClear() ;
  }

  onClear() {
    this.qrForm.reset() ;
    this.editMode = false ;
  }

}
