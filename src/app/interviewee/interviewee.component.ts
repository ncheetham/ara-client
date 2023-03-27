import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { InterviewService } from '../interview.service';
import { Interview } from '../interview/interview';

@Component({
  selector: 'app-interviewee',
  templateUrl: './interviewee.component.html',
  styleUrls: ['./interviewee.component.css']
})
export class IntervieweeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private interviewService: InterviewService) { }

  interviewId: number ;
  interview: Interview ;

  ngOnInit(): void {
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {
      this.interviewId = x ;

      //console.log('interviewId: '+ this.interviewId) ;
      this.interviewService.findInterview(this.interviewId).subscribe(x=> this.interview = x) ;


    });
  }

}
