import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Client } from '../client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  clientsSubscription: Subscription ;

  displayedColumns = ['logo', 'name', 'actions'] ;


  constructor(private clientService: ClientService, private router: Router) { }

  ngOnDestroy(): void {

    this.clientsSubscription.unsubscribe() ;

  }

  clients: Client[] = [] ;
  selectedClient?: Client ;

  ngOnInit(): void {

    this.clientsSubscription = this.clientService.clientsChanged.subscribe(x => this.clients = x) ;

    this.clientService.findAllClients().subscribe(x=> this.clients = x) ;

  }

  onSelect(client: Client) {
    this.clientService.startedEditing.next(client.clientId) ;
  }

  onEditClient(clientId: number) {
    this.router.navigate(['addclient', clientId]) ;
  }

}
