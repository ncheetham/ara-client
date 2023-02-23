import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from 'src/app/client/client';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from '../engagement';

@Component({
  selector: 'app-engagement-edit',
  templateUrl: './engagement-edit.component.html',
  styleUrls: ['./engagement-edit.component.css']
})
export class EngagementEditComponent implements OnInit, OnDestroy {


  @ViewChild('f', {static: false}) eForm: NgForm ;
  editMode: boolean = false ;
  startedEditingSubscription: Subscription ;
  clients: Client[] = [] ;

  constructor(private engagementService: EngagementService, private clientService: ClientService, private router: Router) { }


  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe() ;
  }

  selectedEngagement: Engagement = {
    engagementId: 0, client: {clientId: 0, name: "", url: ""}, name: "", description: "", startDate: new Date()
  } ;

  ngOnInit(): void {

    this.startedEditingSubscription = this.engagementService.startedEditing.subscribe((engagementId: number) => {
        this.engagementService.findEngagement(engagementId).subscribe(x=> this.selectedEngagement = x) ;
        this.editMode = true ;
    }) ;

    this.clientService.findAllClients().subscribe(x=> this.clients = x) ;

  }

  onAddEngagement(eForm: NgForm) {

      const value = eForm.value ;

      const newEngagement: Engagement = {engagementId: value.engagementId, client: {clientId: value.clientId, name: "", url: ""}, name: value.name, description: value.description, startDate: value.startDate}

      if(this.editMode) {
        this.engagementService.updateEngagement(newEngagement.engagementId, newEngagement).subscribe() ;
      } else {
        this.engagementService.addEngagement(newEngagement).subscribe() ;
      }

      this.onClear() ;
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


}
