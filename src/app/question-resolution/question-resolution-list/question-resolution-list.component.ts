import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionResolutionService } from 'src/app/question-resolution.service';
import { QuestionResolution } from 'src/app/questionresolution';

@Component({
  selector: 'app-question-resolution-list',
  templateUrl: './question-resolution-list.component.html',
  styleUrls: ['./question-resolution-list.component.css']
})
export class QuestionResolutionListComponent implements OnInit, OnDestroy {

  qrs: QuestionResolution[] = [] ;
  displayedColumns = ['questionResolutionId','name'] ;
  selectedQr: QuestionResolution;
  qrChanged: Subscription ;

  constructor(private qrService: QuestionResolutionService) { }

  ngOnDestroy(): void {
    this.qrChanged.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for changed Question Resolutions
    this.qrChanged = this.qrService.questionResolutionChanged.subscribe(x=>
      this.qrService.findAll().subscribe(x => this.qrs = x)
    );

    this.qrService.findAll().subscribe(x => this.qrs = x)
  }

  onSelect(qr: QuestionResolution) {
    this.selectedQr = qr ;
    // Notify interested listeners that a row has been selected.
    this.qrService.questionResolutionSelected.next(this.selectedQr.questionResolutionId) ;
  }

}
