import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from '../client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit, OnDestroy{


  @ViewChild('f', {static: false}) cForm: NgForm ;
  selectedClient: Client = new Client() ;
  subscription: Subscription ;
  editMode: boolean = false ;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router, private location: Location) { }


  ngOnDestroy(): void {

    this.subscription.unsubscribe() ;

  }


  ngOnInit(): void {

    // Read the paramters - to see if we are editing the client.
    const clientId = Number(this.route.snapshot.paramMap.get('id'));

    if(clientId) {
        this.clientService.findClient(clientId).subscribe(
          client => this.selectedClient = client);
          this.editMode = true ;

    }


    this.subscription = this.clientService.startedEditing.subscribe((index: number) =>
    {

        this.clientService.findClient(index).subscribe(x=> this.selectedClient = x) ;

        this.editMode = true ;
    }
    );



  }

  onAddClient(form: NgForm) {

    const value = form.value ;

    const newClient = {clientId: value.clientId, name: value.name , url: value.url} ;

    if(this.editMode) {
      this.clientService.updateClient(newClient.clientId, newClient).subscribe() ;
    }else {
      this.clientService.addClient(newClient).subscribe() ;
    }

    this.onClear() ;

  }

  onDelete() {
    this.clientService.deleteClient(this.selectedClient.clientId).subscribe()  ;
    this.selectedClient = {clientId: 0, name: "", url: ""} ;
    this.onClear()  ;
  }


  onClear() {
    this.cForm.reset() ;
    this.editMode = false ;
  }


  // Navigate to the selected client's engagements.
  onShowEngagements() {
    // Navigate to Engagements component - but pass the selected Client as the filter.
    this.router.navigate(['clientengagements', this.selectedClient.clientId]) ;
  }

  onCancel() {
    this.location.back() ;
  }

}
