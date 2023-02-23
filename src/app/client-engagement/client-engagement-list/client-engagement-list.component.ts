import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/client/client';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';

@Component({
  selector: 'app-client-engagement-list',
  templateUrl: './client-engagement-list.component.html',
  styleUrls: ['./client-engagement-list.component.css']
})
export class ClientEngagementListComponent implements OnInit, OnDestroy {

  //selectedClientSubscription: Subscription ;
  engagementsChangedSubsciption: Subscription ;


  engagements: Engagement[] = [] ;
  selectedEngagement?: Engagement ;
  @Input() client: Client ;
  displayedColumns = ['name', 'startDate', 'endDate'] ;

  constructor(private clientService: ClientService, private engagementService: EngagementService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

      this.engagementService.findEngagementsByClientId(this.client.clientId).subscribe(engagements => this.engagements = engagements) ;

      this.engagementsChangedSubsciption = this.engagementService.engagementsChangedSubscription.subscribe(x => {
        this.engagementService.findEngagementsByClientId(this.client.clientId).subscribe(clientEngagements => this.engagements = clientEngagements)  ;
      })

  }

  onSelect(engagement: Engagement) {

    //this.selectedEngagement = engagement ;
    //this.engagementService.startedEditing.next(this.selectedEngagement.engagementId) ;

    this.router.navigate(['viewengagement', engagement.engagementId]) ;

  }

  ngOnDestroy(): void {

      this.engagementsChangedSubsciption.unsubscribe() ;

  }
}

