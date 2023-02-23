import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/client/client';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from '../engagement';

@Component({
  selector: 'app-engagement-list',
  templateUrl: './engagement-list.component.html',
  styleUrls: ['./engagement-list.component.css']
})
export class EngagementListComponent implements OnInit, OnDestroy {


  engagementsChangedSubscription: Subscription ;

  engagements: Engagement[] = [] ;
  selectedEngagement?: Engagement ;
  client?: Client ;
  displayedColumns = ['name', 'client', 'startDate', 'endDate'] ;

  constructor(private clientService: ClientService, private engagementService: EngagementService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.engagementService.findAllEngagements().subscribe(x => this.engagements = x) ;

    this.engagementsChangedSubscription = this.engagementService.engagementsChangedSubscription.subscribe(x=> {
      this.engagementService.findAllEngagements().subscribe(x => this.engagements = x) ;
    }) ;

  }


  onSelect(engagement: Engagement) {

//    console.log("engagement Selected with ID: "+ engagement) ;
//    this.selectedEngagement = engagement ;
//    this.engagementService.startedEditing.next(this.selectedEngagement.engagementId) ;

    this.router.navigate(['viewengagement', engagement.engagementId ]) ;

  }

  ngOnDestroy(): void {
      this.engagementsChangedSubscription.unsubscribe() ;
  }

}
