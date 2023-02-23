import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { ClientService } from '../client.service';
import { Client } from '../client/client';
import { EngagementService } from '../engagement.service';
import { Engagement } from '../engagement/engagement';

@Component({
  selector: 'app-inteview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit, OnDestroy {

  //engagementSelectedSubscription: Subscription ;
  selectedEngagement: Engagement ;
  engagementId: number ;
  client: Client ;

  constructor(private engagementService: EngagementService, private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
   // this.engagementSelectedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    // Capture the ID of the Interview.
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      // Find the Interiew
      
      this.engagementId = x ;

    });

    console.log("EngagementId: " + this.engagementId) ;

    this.engagementService.findEngagement(this.engagementId).subscribe(engagement => {
      this.selectedEngagement = engagement;
      this.clientService.findClient(this.selectedEngagement.client.clientId).subscribe(client => this.client = client) ;
    }) ;

    // this.engagementSelectedSubscription = this.engagementService.startedEditing.subscribe((engagementId: number) => {
    //     console.log('initializing selected engagement in component InterviewComponet') ;
    //     this.engagementService.findEngagement(engagementId).subscribe(engagement => this.selectedEngagement = engagement) ;
    //     this.engagementService.startedEditing.next(this.selectedEngagement.engagementId) ;
    //   }) ;



  }

}
