import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionResolutionMethodService } from 'src/app/question-resolution-method.service';
import { Question } from 'src/app/question/question';
import { QuestionResolutionMethod } from '../questionresolutionmethod';

@Component({
  selector: 'app-question-resolution-method-list',
  templateUrl: './question-resolution-method-list.component.html',
  styleUrls: ['./question-resolution-method-list.component.css']
})
export class QuestionResolutionMethodListComponent implements OnInit, OnDestroy {

  questionResolutionMethods: QuestionResolutionMethod[] = []  ;
  displayedColumns = ['questionResolutionMethodId', 'name'] ;
  selectedQrm: QuestionResolutionMethod ;
  qrmChanged = new Subscription() ;

  constructor(private qrmService: QuestionResolutionMethodService) { }

  ngOnDestroy(): void {
    this.qrmChanged.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for changed QRM's.
    this.qrmService.qrmChanged.subscribe(x=> {
      this.qrmService.findAll().subscribe(y=> this.questionResolutionMethods = y) ;
    })

    // Find all the question Resolution Methods.
    this.qrmService.findAll().subscribe(x=> this.questionResolutionMethods = x) ;

  }

  onSelect(row: QuestionResolutionMethod) {
    this.selectedQrm = row ;
    this.qrmService.qrmSelected.next(this.selectedQrm.questionResolutionMethodId) ;
  }



}
