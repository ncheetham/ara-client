import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';
import { IntervieweeService } from '../interviewee.service';
import { IntervieweeStatusVO } from '../intervieweestatus';

@Component({
  selector: 'app-interviewee-all-view',
  templateUrl: './interviewee-all-view.component.html',
  styleUrls: ['./interviewee-all-view.component.css']
})
export class IntervieweeAllViewComponent implements OnInit {


  @Input() engagementId: number ;
  engagement: Engagement  ;
  //iStatusVO: IntervieweeStatusVO[] = []


  constructor(private iService: IntervieweeService, private route: ActivatedRoute, private location: Location,
    private engagementService: EngagementService, private router: Router) { }

  ngOnInit(): void {

    // get the EngagementId.
    this.engagementId = Number(this.route.snapshot.paramMap.get("id")) ;

    this.engagementService.findEngagement(this.engagementId).subscribe(
      x=> this.engagement = x
    ) ;

  }

  onCancel() {
    this.location.back() ;
  }

  onAddInterviewee() {
    this.router.navigate(['addinterviewee', this.engagementId]) ;
  }

  onDownloadTemplate() {
     // Build the Spreadsheet
     this.iService.downloadTemplate(this.engagementId).subscribe(

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
}
