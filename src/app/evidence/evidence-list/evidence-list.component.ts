import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EngagementEvidenceService } from 'src/app/engagement-evidence.service';
import { EvidenceService } from 'src/app/evidence.service';
import { Evidence } from '../evidence';

@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.css']
})
export class EvidenceListComponent implements OnInit, OnDestroy {

  @Input() engagementId: number;
  @Input() interviewId: number ;

  evidences: Evidence[] = [] ;
  selectedEvidence: Evidence ;
  displayedColumns = ['evidenceId', 'name', 'Type', 'Status'] ;
  evidenceChangedSubscription: Subscription ;


  constructor(private evidenceService: EvidenceService, private route: ActivatedRoute, private eeService: EngagementEvidenceService) { }

  ngOnDestroy(): void {
    this.evidenceChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {


    // Find the Evidnece by EngagementId
    this.eeService.findByEngagementId(this.engagementId).subscribe(
      x => this.evidences = x.map(x => x.evidence)
    ) ;

      this.evidenceChangedSubscription = this.evidenceService.evidenceChanged.subscribe(x => {
      this.evidenceService.findByInterview(this.interviewId).subscribe(x => this.evidences = x) ;
      
    }) ;

  }

  onSelect(row: Evidence) {
    this.selectedEvidence = row ;
    this.evidenceService.evidenceSelected.next(this.selectedEvidence.evidenceId);
  }

}
