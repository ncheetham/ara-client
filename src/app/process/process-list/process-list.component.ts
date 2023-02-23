import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Process } from 'src/app/process';
import { ProcessService } from 'src/app/process.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit, OnDestroy {


  processes: Process[] = [] ;
  displayedColumns= ['processId', 'name', 'processDomainId'];
  selectedProcess: Process ;
  processChangedSubscription: Subscription ;

  constructor(private processService: ProcessService) { }
  ngOnDestroy(): void {
    this.processChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for any changes to the model.
    this.processChangedSubscription = this.processService.processChanged.subscribe(x=> {
      this.processService.findAll().subscribe(x=> this.processes = x) ;
    });

    // Load the initial list of processes.
    this.processService.findAll().subscribe(x=> this.processes = x) ;

  }

  onSelect(p: Process) {
    this.selectedProcess = p ;
    // Notify the listeners that a process has been selected.
    this.processService.processSelected.next(this.selectedProcess.processId) ;
  }

}
