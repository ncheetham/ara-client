import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EvidenceStatusService } from 'src/app/evidence-status.service';
import { EvidenceStatus } from '../evidencestatus';

@Component({
  selector: 'app-evidence-status-edit',
  templateUrl: './evidence-status-edit.component.html',
  styleUrls: ['./evidence-status-edit.component.css']
})
export class EvidenceStatusEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) esForm: NgForm ;
  evidenceStatus: EvidenceStatus = {evidenceStatusId: 0, name: ''} ;
  editMode = false ;
  evidenceStatusSelected: Subscription ;

  constructor(private evidenceStatusService: EvidenceStatusService) { }


  ngOnDestroy(): void {
    this.evidenceStatusSelected.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for selected Evidence Statuses.
    this.evidenceStatusSelected = this.evidenceStatusService.evidenceStatusSelected.subscribe(x => {
      this.evidenceStatusService.findEvidenceStatus(x).subscribe(es => this.evidenceStatus = es ) ;
      this.editMode = true ;
    })

  }

  onAddEvidenceStatus(f: NgForm) {

    const value = f.value ;

    const evidenceStatus: EvidenceStatus = {evidenceStatusId: value.evidenceStatusId, name: value.name} ;

    if(this.editMode) {
      this.evidenceStatusService.updateEvidenceStatus(evidenceStatus.evidenceStatusId, evidenceStatus).subscribe() ;
    }else {
      this.evidenceStatusService.addEvidenceStatus(evidenceStatus).subscribe() ;
    }

    this.onClear() ;
  }

  onDelete() {

    this.evidenceStatusService.deleteEvidenceStatus(this.evidenceStatus.evidenceStatusId).subscribe() ;
    this.onClear() ;
  }

  onClear() {
    this.esForm.reset() ;
    this.editMode = false ;
  }

}
