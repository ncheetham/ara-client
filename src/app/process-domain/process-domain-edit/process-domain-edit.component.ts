import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcessDomainService } from 'src/app/process-domain.service';
import { ProcessDomain } from 'src/app/processdomain';

@Component({
  selector: 'app-process-domain-edit',
  templateUrl: './process-domain-edit.component.html',
  styleUrls: ['./process-domain-edit.component.css']
})
export class ProcessDomainEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) pdForm: NgForm ;
  processDomain: ProcessDomain = {processDomainId: 0, name: ''};
  editMode = false ;
  processDomainSelectedSubscription: Subscription ;

  constructor(private processDomainService: ProcessDomainService) { }


  ngOnDestroy(): void {
    this.processDomainSelectedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for a selected Process Domain
    this.processDomainSelectedSubscription = this.processDomainService.processDomainSelected.subscribe(x => {
      this.processDomainService.findProcessDomain(x).subscribe(pd => this.processDomain = pd) ;
      this.editMode = true ;
    })

  }


  onAddProcessDomain(f: NgForm) {

    const value = f.value ;

    const newPd: ProcessDomain = {processDomainId: value.processDomainId, name: value.name} ;

    console.log('Adding Process Domain' + JSON.stringify(newPd)) ; 

    if(this.editMode) {
      this.processDomainService.updateProcessDomain(newPd.processDomainId, newPd).subscribe() ;
    }else {
      this.processDomainService.addProcessDomain(newPd).subscribe() ;
    }

    this.onClear();
  }

  onDelete() {
    this.processDomainService.deleteProcessDomain(this.processDomain.processDomainId).subscribe() ;
    this.onClear() ;
  }

  onClear() {
    this.pdForm.reset() ;
    this.editMode = false ;
  }


}
