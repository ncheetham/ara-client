import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { Client } from '../client/client';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  client: Client ;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

      // Get the Client.
      const clientId = Number(this.route.snapshot.paramMap.get('id'));
        this.clientService.findClient(clientId).subscribe(
          client => this.client = client);
  }

  onAddEngagment() {
      // Navigate to the Add Engagement component
      this.router.navigate(['addengagement', this.client.clientId]);
  }

}
