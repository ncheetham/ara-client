import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ClientService } from '../../client.service';
import { Client } from '../../client/client';
import { EngagementService } from '../../engagement.service';

@Component({
  selector: 'app-engagement-add',
  templateUrl: './engagement-add.component.html',
  styleUrls: ['./engagement-add.component.css']
})
export class EngagementAddComponent implements OnInit {

  client: Client ;

  constructor(private route: ActivatedRoute, private engagementService: EngagementService, private clientService: ClientService) { }

  ngOnInit(): void {

    // See if a Client ID was passed to this component. If so, set the selected Client!
    this.route.params.pipe(map(p => p['id'])).subscribe(clientId=> {
       this.clientService.findClient(clientId).subscribe(x=> this.client = x) ;
    }) ;

  }




}
