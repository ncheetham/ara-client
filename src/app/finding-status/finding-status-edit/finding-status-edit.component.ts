import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FindingStatusService } from 'src/app/finding-status.service';
import { FindingStatus } from 'src/app/findingstatus';

@Component({
  selector: 'app-finding-status-edit',
  templateUrl: './finding-status-edit.component.html',
  styleUrls: ['./finding-status-edit.component.css']
})
export class FindingStatusEditComponent implements OnInit, OnDestroy {


  @ViewChild('f', {static: false}) fsForm: NgForm ;

  editMode =false ;
  findingStatus: FindingStatus = {findingStatusId: 0, name: ''} ;

  fsSelected = new Subscription()  ;

  constructor(private findingStatusService: FindingStatusService) { }


  ngOnDestroy(): void {
    this.fsSelected.unsubscribe() ;
  }


  ngOnInit(): void {

    // Listen for a selected FindingStatus
    this.fsSelected = this.findingStatusService.findingStatusSelected.subscribe(x=> {
      this.findingStatusService.findFindingStatus(x).subscribe(fs => this.findingStatus  = fs) ;
      this.editMode = true ;
    })

  }

  // Add a Finding Status
  onAddFindingStatus(f: NgForm) {

    const value = f.value ;

    const findingStatus: FindingStatus = {findingStatusId: value.findingStatusId, name: value.name};
    console.log('adding findingStatus:' + JSON.stringify(findingStatus));
    if(this.editMode) {
      this.findingStatusService.updateFindingStatus(findingStatus.findingStatusId, findingStatus).subscribe() ;
    }else {
      this.findingStatusService.addFindingStatus(findingStatus).subscribe();
    }

    this.onClear() ;

  }

  // Clear the Status
  onClear() {
    this.fsForm.reset() ;
    this.editMode = false;
  }

  // Delete the Status
  onDelete() {
    this.findingStatusService.deleteFindingStatus(this.findingStatus.findingStatusId).subscribe() ;
    this.onClear() ;
  }

}
