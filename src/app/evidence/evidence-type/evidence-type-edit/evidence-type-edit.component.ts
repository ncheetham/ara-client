import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EvidenceTypeService } from 'src/app/evidence-type.service';
import { EvidenceType } from '../evidencetype';

@Component({
  selector: 'app-evidence-type-edit',
  templateUrl: './evidence-type-edit.component.html',
  styleUrls: ['./evidence-type-edit.component.css']
})
export class EvidenceTypeEditComponent implements OnInit, OnDestroy {

  constructor(private evidenceTypeService: EvidenceTypeService) { }

  ngOnDestroy(): void {
    this.evidenceTypeSelected.unsubscribe() ;
  }

  @ViewChild('f', {static: false}) etForm: NgForm;

  editMode = false ;
  evidenceType: EvidenceType ={evidenceTypeId: 0, name: ''} ;
  evidenceTypeSelected: Subscription  ;

  ngOnInit(): void {

    // Listen for a selected EvidenceType
    this.evidenceTypeSelected = this.evidenceTypeService.evidenceTypeSelected.subscribe(((id: number) => {
      this.evidenceTypeService.findEvidenceType(id).subscribe(x => this.evidenceType = x) ;
      this.editMode = true ;
    }))

  }

  onAddEvidenceType(f: NgForm) {

    const value = f.value ;

    const et: EvidenceType = {evidenceTypeId: value.evidenceTypeId , name: value.name } ;

    if(this.editMode) {
      this.evidenceTypeService.updateEvidenceType(et.evidenceTypeId, et).subscribe() ;
    }else {
      this.evidenceTypeService.addEvidenceType(et).subscribe() ;
    }

    this.onClear() ;

  }

  onDelete() {
    this.evidenceTypeService.deleteEvidenceType(this.evidenceType.evidenceTypeId).subscribe() ;
    this.onClear() ; 
  }

  onClear() {
    this.etForm.reset() ;
    this.editMode = false ;
  }
}
