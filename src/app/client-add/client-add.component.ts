import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ClientService } from '../client.service';
import { Client } from '../client/client';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) { }

  clientChangedSubscription: Subscription;
  client: Client ;

  ngOnInit(): void {

    // See if a Client ID was passed to this component. If so, set the selected Client!
    this.route.params.pipe(map(p => p['id'])).subscribe(clientId=> {

      this.clientService.findClient(clientId).subscribe((client: Client)=> {

        this.client = client ;

      }) ;

    })

    // Listen for Changes to the Client!
    this.clientChangedSubscription = this.clientService.clientChanged.subscribe(
      x => {
        // navigate back to the clients List.
        this.router.navigate(['clients']) ;
      }
    )

  }

}
