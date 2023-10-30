import { Component, Input, OnInit } from '@angular/core';
import { Interviewee } from '../interviewee';
import { IntervieweeService } from '../interviewee.service';
import { InterviewIntervieweeService } from 'src/app/interview-interviewee.service';
import { InterviewInterviewee } from 'src/app/interviewinterviewee';

@Component({
  selector: 'app-interview-interviewee-add-existing',
  templateUrl: './interview-interviewee-add-existing.component.html',
  styleUrls: ['./interview-interviewee-add-existing.component.css']
})
export class InterviewIntervieweeAddExistingComponent implements OnInit  {
 
  
  @Input() engagementId: number ;
  @Input() interviewId: number ; 

  interviewees: Interviewee[] = [] ; 
  selectedId: number ; 

  // set up the subscription.

 
  constructor(private iService: IntervieweeService, private iiService: InterviewIntervieweeService) {

  } 
  
  ngOnInit(): void {
      
      this.iService.findIntervieweeByEngagement(this.engagementId).subscribe(x=> {
        this.interviewees = x ; 
      })
  }


  onAddInterviewee() {
    
    // Get the Interviewee ID 
    const ii: InterviewInterviewee = new InterviewInterviewee(); 

    ii.interview.interviewId = this.interviewId ; 
    ii.interviewee.intervieweeId = this.selectedId ; 

    // Get the Interview ID 

    // Add the IntervieweeID to the Interview.
    this.iiService.addInterviewInterviewee(ii).subscribe(x => {
      this.iiService.intervieweesChanged.next(true);  
    }); 

    // Notify the users.

  }



  


}
