import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvidenceStatusService } from 'src/app/evidence-status.service';
import { EvidenceStatus } from '../evidencestatus';

@Component({
  selector: 'app-evidence-status-list',
  templateUrl: './evidence-status-list.component.html',
  styleUrls: ['./evidence-status-list.component.css']
})
export class EvidenceStatusListComponent implements OnInit, OnDestroy {

  displayedColumns = ['evidenceStatusId', 'name'] ;
  evidenceStatuses: EvidenceStatus[] = [] ;
  selectedEvidenceStatus: EvidenceStatus ;
  evidenceStatusChanged = new Subscription() ;


  constructor(private evidenceStatusService: EvidenceStatusService) { }

  ngOnDestroy(): void {
    this.evidenceStatusChanged.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for changes of Evidence Statuses.
    this.evidenceStatusChanged = this.evidenceStatusService.evidenceStatusUpdated.subscribe(x => {
      this.evidenceStatusService.findAll().subscribe(x=> this.evidenceStatuses = x) ;
    })

    // Load the Evidence Statuses.
    this.evidenceStatusService.findAll().subscribe(x=> this.evidenceStatuses = x) ;

  }

  onSelect(es: EvidenceStatus) {
    // Notify listeners that a row has been selected.
    this.selectedEvidenceStatus = es ;
    this.evidenceStatusService.evidenceStatusSelected.next(es.evidenceStatusId) ;
  }

}
