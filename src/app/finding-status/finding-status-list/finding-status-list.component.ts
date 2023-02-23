import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FindingStatusService } from 'src/app/finding-status.service';
import { FindingStatus } from 'src/app/findingstatus';

@Component({
  selector: 'app-finding-status-list',
  templateUrl: './finding-status-list.component.html',
  styleUrls: ['./finding-status-list.component.css']
})
export class FindingStatusListComponent implements OnInit, OnDestroy {

  findingStatuses: FindingStatus[] = [];
  displayedColumns = ['findingStatusId', 'name'] ;
  selectedFindingStatus: FindingStatus ;
  findingStatusChanged: Subscription ;

  constructor(private findingStatusService: FindingStatusService) { }
  ngOnDestroy(): void {
    this.findingStatusChanged.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for changes to the FindingStatus.
    this.findingStatusChanged = this.findingStatusService.findingStatusChanged.subscribe(x=> {
      this.findingStatusService.findAll().subscribe(x=> this.findingStatuses = x) ;
    })

    this.findingStatusService.findAll().subscribe(x=> this.findingStatuses = x) ;

  }

  onSelect(fs: FindingStatus) {
    this.selectedFindingStatus = fs ;
    this.findingStatusService.findingStatusSelected.next(this.selectedFindingStatus.findingStatusId) ;
  }
}
