import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { InterviewService } from 'src/app/interview.service';
import { InterviewAnswerVO } from './inteviewanswervo';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit, OnDestroy {

  @Input() interviewId: number;
  @Output() addFinding = new EventEmitter<number>();

  interviewAnswers: InterviewAnswerVO[] = [] ;
  displayedColumns: String[] = ['questionNumber','question', 'answer', 'answerers', 'requiresEscalation', 'actions'] ;
  selectedAnswer: InterviewAnswerVO ;
  isAddingFinding = false ;

  constructor(private iService: InterviewService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    // Find the answers for the given Interview
    this.iService.findInterviewWithDetails(this.interviewId).subscribe(x =>
    this.interviewAnswers = x.answers) ;

  }

  onSelect(row: InterviewAnswerVO) {
    this.selectedAnswer = row ;
  }

  onFinding(iqId: number) {

    this.addFinding.emit(iqId) ;

  }


}
