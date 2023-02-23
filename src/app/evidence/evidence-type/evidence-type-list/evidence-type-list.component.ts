import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EvidenceTypeService } from 'src/app/evidence-type.service';
import { EvidenceType } from '../evidencetype';

@Component({
  selector: 'app-evidence-type-list',
  templateUrl: './evidence-type-list.component.html',
  styleUrls: ['./evidence-type-list.component.css']
})
export class EvidenceTypeListComponent implements OnInit, OnDestroy {

  evidenceTypes: EvidenceType[] = [];
  displayedColumns: string[] = ['evidenceTypeId', 'name'] ;
  evidenceTypeChanged = new Subscription() ;
  evidenceTypeSelected = new Subscription() ;
  selectedEvidenceType: EvidenceType ;

  constructor(private evidenceTypeService: EvidenceTypeService) { }


  ngOnDestroy(): void {
    this.evidenceTypeChanged.unsubscribe() ;
    this.evidenceTypeSelected.unsubscribe() ;
  }

  ngOnInit(): void {

    // Populate the list of evidence Types.
    this.evidenceTypeService.findAll().subscribe(x => this.evidenceTypes = x) ;

    // Listen for changes to the evidence Types.
    this.evidenceTypeChanged = this.evidenceTypeService.evidenceTypeChanged.subscribe(x=> {
      this.evidenceTypeService.findAll().subscribe(x => this.evidenceTypes = x) ;
    })

  }

  onSelect(evidenceType: EvidenceType) {
    // notify everyone that a row was selected.
    this.evidenceTypeService.evidenceTypeSelected.next(evidenceType.evidenceTypeId) ;
    this.selectedEvidenceType = evidenceType ;
  }

}
