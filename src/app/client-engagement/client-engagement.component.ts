import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ClientService } from '../client.service';
import { Client } from '../client/client';
import { EngagementService } from '../engagement.service';

@Component({
  selector: 'app-client-engagement',
  templateUrl: './client-engagement.component.html',
  styleUrls: ['./client-engagement.component.css']
})
export class ClientEngagementComponent implements OnInit, OnDestroy {

  constructor(private clientService: ClientService, private engagementService: EngagementService, private router: Router, private route: ActivatedRoute) { }

  ngOnDestroy(): void {

  }

  client: Client ;

  ngOnInit(): void {
        // See if a parameter (Client Id) was passed.
        this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

          this.clientService.findClient(x).subscribe(client => {

            console.log('setting client') ;
            this.client = client ;

            this.engagementService.clientSelected.next(this.client.clientId) ;
            
          }) ;

        })

  }
}
