import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionResolutionMethodService } from 'src/app/question-resolution-method.service';
import { QuestionResolutionMethod } from '../questionresolutionmethod';

@Component({
  selector: 'app-question-resolution-method-edit',
  templateUrl: './question-resolution-method-edit.component.html',
  styleUrls: ['./question-resolution-method-edit.component.css']
})
export class QuestionResolutionMethodEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) qrmForm: NgForm ;
  qrm: QuestionResolutionMethod = {questionResolutionMethodId: 0, name: ''}
  editMode = false ;
  selectedQrm: Subscription ;

  constructor(private qrmService: QuestionResolutionMethodService) { }


  ngOnDestroy(): void {
    this.selectedQrm.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for a selected QuestionResolutionMethod
    this.selectedQrm = this.qrmService.qrmSelected.subscribe((qrmId: number) => {
      this.qrmService.findQuestionResolutionMethod(qrmId).subscribe(x => {
        this.qrm = x;
        this.editMode = true ;
      })
    }) ;

  }

  onDelete() {

    this.qrmService.deleteQuestionResolutionMethod(this.qrm.questionResolutionMethodId).subscribe() ;
    this.onClear() ;
    
  }

  onClear() {
    this.qrmForm.reset() ;
    this.editMode = false ;
  }

  onAddQuestionResolutionMethod(f: NgForm) {

    const value = f.value ;

    const newQrm: QuestionResolutionMethod = {questionResolutionMethodId: value.questionResolutionMethodId, name: value.name} ;

    if(this.editMode) {
      this.qrmService.updateQuestionResolutionMethod(newQrm.questionResolutionMethodId, newQrm).subscribe() ;
    }else {
      this.qrmService.addQuestionResolutionMethod(newQrm).subscribe() ;
    }

    this.onClear() ;
  }



}
