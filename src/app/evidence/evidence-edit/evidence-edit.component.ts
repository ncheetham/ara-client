import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EngagementEvidenceService } from 'src/app/engagement-evidence.service';
import { EngagementEvidence } from 'src/app/engagementevidence';
import { EvidenceStatusService } from 'src/app/evidence-status.service';
import { EvidenceStatus } from 'src/app/evidence/evidence-status/evidencestatus';
import { EvidenceTypeService } from 'src/app/evidence-type.service';
import { EvidenceType } from 'src/app/evidence/evidence-type/evidencetype';
import { EvidenceService } from 'src/app/evidence.service';
import { InterviewEvidenceService } from 'src/app/interview-evidence.service';
import { InterviewEvidenceComponent } from 'src/app/interview/interview-evidence/interview-evidence.component';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from 'src/app/interview/interview';
import { InterviewEvidence } from 'src/app/interviewevidence';
import { Evidence } from '../evidence';

@Component({
  selector: 'app-evidence-edit',
  templateUrl: './evidence-edit.component.html',
  styleUrls: ['./evidence-edit.component.css']
})
export class EvidenceEditComponent implements OnInit, OnDestroy {

  @Input() engagementId: number;
  @Input() interviewId: number;

  @ViewChild('f', {static: false}) eForm: NgForm ;
  editMode = false ;
  evidence: Evidence = new Evidence() ;
  evidenceStatuses: EvidenceStatus[] = [] ;
  evidenceTypes: EvidenceType[] = [] ;
  interviews: Interview[] = [] ;

  constructor(private evidenceService: EvidenceService, private evidenceTypeService: EvidenceTypeService,
    private evidenceStatusService: EvidenceStatusService, private eeService: EngagementEvidenceService,
    private interviewService: InterviewService, private ieService: InterviewEvidenceService,  private route: ActivatedRoute, private location: Location) { }


    interview: Interview ;
    selectedEvidenceSubscription: Subscription ;


    ngOnDestroy(): void {
      this.selectedEvidenceSubscription.unsubscribe() ;
   }


  ngOnInit(): void {

    this.evidenceTypeService.findAll().subscribe(x=> this.evidenceTypes = x) ;
    this.evidenceStatusService.findAll().subscribe(x=> this.evidenceStatuses = x) ;

    // Listen for selected Evidence
    this.selectedEvidenceSubscription = this.evidenceService.evidenceSelected.subscribe((evidenceId: number) =>

    this.evidenceService.findEvidence(evidenceId).subscribe(x=> this.evidence = x)) ;

    // Subscribe to the selected Evidence
    this.selectedEvidenceSubscription = this.evidenceService.evidenceSelected.subscribe(x => {
      this.evidenceService.findEvidence(x).subscribe((e: Evidence) => {
        this.evidence = e ;
        this.editMode = true ;
      })
    })

  }


  onAddEvidence(f: NgForm) {

    const value = f.value ;

    const newEvidence: Evidence = new Evidence() ;
    newEvidence.evidenceId = value.evidenceId ;
    newEvidence.evidenceType.evidenceTypeId =  value.evidenceTypeId;
    newEvidence.name = value.name ;
    newEvidence.description = value.description ;
    newEvidence.evidenceStatus.evidenceStatusId = value.evidenceStatusId;


    if(this.editMode) {
      this.evidenceService.updateEvidence(newEvidence.evidenceId, newEvidence).subscribe()  ;
    }else {
      this.evidenceService.addEvidence(newEvidence).subscribe(
        x => {
          // Add the evidence to the Engagement
          const ee: EngagementEvidence = new EngagementEvidence() ;
          ee.engagement.engagementId = this.engagementId ;
          ee.evidence.evidenceId = x.evidenceId ;
          this.eeService.addEngagementEvidence(ee).subscribe() ;

          // If there is an interviewId add the evidence to the Interview.
          if(this.interviewId) {
            const ie: InterviewEvidence = new InterviewEvidence() ;
            ie.evidenceId = x.evidenceId ;
            ie.interviewId = this.interviewId ;
          }
        }
      ) ;

    }

    this.onClear() ;
  }

  onDelete() {

    this.onClear()
  }

  onClear() {
    this.eForm.reset() ;
    this.editMode = false ;
  }

  onBack() {
    this.location.back() ;
  }

}
