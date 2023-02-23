import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EngagementService } from '../engagement.service';
import { Engagement } from './engagement';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.css']
})
export class EngagementComponent implements OnInit, OnDestroy {

  constructor(private engagementService: EngagementService) { }

  ngOnDestroy(): void {
    this.engagementSubScription.unsubscribe() ;
  }

  selectedEngagement: Engagement
  engagementSubScription: Subscription


  ngOnInit(): void {

    this.engagementSubScription = this.engagementService.startedEditing.subscribe((engagementId: number) => {
      this.engagementService.findEngagement(engagementId).subscribe(x => this.selectedEngagement = x) ;
    }) ;
    
  }
}
