import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Engagement } from '../engagement/engagement';
import { InterviewService } from '../interview.service';
import { Interview } from '../interview/interview';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  constructor(private interviewService: InterviewService, private route: ActivatedRoute) { }

  interview: Interview ;
  engagement: Engagement ;


  ngOnInit(): void {

     // See if a parameter (Client Id) was passed.
     this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.interviewService.findInterview(x).subscribe(interview => {


        this.interview = interview ;
        this.engagement = interview.engagement ; 

        this.interviewService.selectedInterview.next(this.interview.interviewId) ;

      }) ;

    })



  }

}
