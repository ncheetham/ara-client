import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessDomainService } from 'src/app/process-domain.service';
import { ProcessDomain } from 'src/app/processdomain';

@Component({
  selector: 'app-process-domain-list',
  templateUrl: './process-domain-list.component.html',
  styleUrls: ['./process-domain-list.component.css']
})
export class ProcessDomainListComponent implements OnInit, OnDestroy {

  processDomains: ProcessDomain[] = [] ;
  selectedProcessDomain: ProcessDomain ;
  displayedColumns = ['processDomainId', 'name'] ;
  processDomainChanged: Subscription ;

  constructor(private processDomainService: ProcessDomainService) { }


  ngOnDestroy(): void {
    this.processDomainChanged.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for changed Process Domains.
    this.processDomainChanged = this.processDomainService.processDomainChanged.subscribe(x=> {
      this.processDomainService.findAll().subscribe(x=> this.processDomains = x) ;
    })

    // Find the process Domains
    this.processDomainService.findAll().subscribe(x=> this.processDomains = x) ;

  }

  onSelect(pd: ProcessDomain) {

    this.selectedProcessDomain = pd ;

    // Notify interested listeners that a row has been selected.
    this.processDomainService.processDomainSelected.next(this.selectedProcessDomain.processDomainId) ;

  }

}
