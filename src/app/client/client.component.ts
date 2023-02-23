import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private clientService: ClientService) { }


  clientSelectedSubscription: Subscription ;

  ngOnInit(): void {


    // Listen for a select Client and then Show the View Client Component.
    this.clientSelectedSubscription = this.clientService.startedEditing.subscribe((clientId: number) => {
      this.router.navigate(['client', clientId]) ;
    }) ;
  }

  onAddClient() {
    this.router.navigate(['addclient']) ;
  }

  ngOnDestroy(): void {
    this.clientSelectedSubscription.unsubscribe() ;
  }

}
