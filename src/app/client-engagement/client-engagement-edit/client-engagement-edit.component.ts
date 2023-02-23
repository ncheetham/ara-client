import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/client/client';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-engagement-edit',
  templateUrl: './client-engagement-edit.component.html',
  styleUrls: ['./client-engagement-edit.component.css']
})
export class ClientEngagementEditComponent implements OnInit {

  @ViewChild('f', {static: false}) eForm: NgForm ;
  editMode: boolean = false ;
  subscription: Subscription ;
  @Input() client: Client ;

  constructor(private engagementService: EngagementService, private clientService: ClientService, private route: ActivatedRoute,  private router: Router, private location: Location) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe() ;
  }

  selectedEngagement: Engagement = {
    engagementId: 0, client: {clientId: 0, name: "", url: ""}, name: "", description: "", startDate: new Date()
  } ;

  ngOnInit(): void {

      //  // See if a parameter (Client Id) was passed.
      //  this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      //   this.clientService.findClient(x).subscribe(client => {

      //     console.log('setting client') ;
      //     this.client = client ;

      //   }) ;

      // })

    this.subscription = this.engagementService.startedEditing.subscribe((engagementId: number) => {
        this.engagementService.findEngagement(engagementId).subscribe(x=> this.selectedEngagement = x) ;
        this.editMode = true ;
    }) ;

  }

  onAddEngagement(eForm: NgForm) {

      const value = eForm.value ;

      const newEngagement: Engagement = {engagementId: value.engagementId, client: this.client, name: value.name, description: value.description, startDate: value.startDate}

      if(this.editMode) {
        this.engagementService.updateEngagement(newEngagement.engagementId, newEngagement).subscribe() ;
      } else {
        this.engagementService.addEngagement(newEngagement).subscribe() ;
      }

      this.location.back() ;
  }

  onDelete() {

    this.engagementService.deleteEngagement(this.selectedEngagement.engagementId).subscribe()  ;

    this.onClear() ;

  }

  onClear() {
    this.eForm.reset() ;
    this.editMode = false ;
  }

  onViewInterviews() {
    this.router.navigate(['interviews/',this.selectedEngagement.engagementId]);
  }

  onViewThemes() {
    this.router.navigate(['engagementthemes/',this.selectedEngagement.engagementId]);
  }

  onEngagementQuestions() {
    this.router.navigate(['engagementquestions/', this.selectedEngagement.engagementId]) ;
  }

  // Go Back!
  onCancel() {
    this.location.back() ;
  }

}
