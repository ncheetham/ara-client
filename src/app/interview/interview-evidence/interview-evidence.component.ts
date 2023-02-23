import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { InterviewService } from '../../interview.service';
import { Interview } from '../interview';

@Component({
  selector: 'app-interview-evidence',
  templateUrl: './interview-evidence.component.html',
  styleUrls: ['./interview-evidence.component.css']
})
export class InterviewEvidenceComponent implements OnInit {

  interview: Interview;

  constructor(private interviewService: InterviewService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

        // Find the Interview
        this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

          this.interviewService.findInterview(x).subscribe(interview => {

            console.log('setting Interview') ;

            this.interview = interview ;

          }) ;
  })
  }


  onBack() {
    this.location.back() ;
  }


}
