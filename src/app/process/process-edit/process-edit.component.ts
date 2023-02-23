import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Process } from 'src/app/process';
import { ProcessDomainService } from 'src/app/process-domain.service';
import { ProcessService } from 'src/app/process.service';
import { ProcessDomain } from 'src/app/processdomain';

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.css']
})
export class ProcessEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) pForm: NgForm
  editMode = false ;
  selectedProcess: Process = {processId: 0, name: '', processDomainId: 0};
  processSelected: Subscription ;
  processDomains: ProcessDomain[] = [] ;


  constructor(private processService: ProcessService, private processDomainService: ProcessDomainService) { }

  ngOnDestroy(): void {
    this.processSelected.unsubscribe() ;
  }


  ngOnInit(): void {

    // Populate the list of ProcessDomains
    this.processDomainService.findAll().subscribe(x=> this.processDomains = x) ;

     // Initialize the listener for a selected Process
     this.processSelected = this.processService.processSelected.subscribe((id: number) => {
      this.processService.findProcess(id).subscribe(x=> {
        this.selectedProcess = x ;
        this.editMode=true;
      });

    }) ;

  }


  onAddProcess(f: NgForm) {

    const value = f.value ;

    const newProcess: Process = {processId: value.processId, name: value.name, processDomainId: value.processDomainId} ;

    if(this.editMode) {
      this.processService.updateProcess(newProcess.processId, newProcess).subscribe() ;
    }else {
      this.processService.addProcess(newProcess).subscribe();
    }

    this.onClear() ;

  }

  onDelete() {

    this.processService.deleteProcess(this.selectedProcess.processId).subscribe() ;

    this.onClear() ;

  }

  onClear() {
    this.pForm.reset() ;
    this.editMode = false ;
  }

}
