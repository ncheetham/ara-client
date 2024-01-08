import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.css']
})
export class DeviceViewComponent implements OnInit {


  @Input({required: true}) engagementId: number ; 

  engagement: Engagement  = new Engagement() ;
  
  constructor(private eService: EngagementService, private route: ActivatedRoute, private router: Router) {}
   
  ngOnInit(): void {
    this.eService.findEngagement(this.engagementId).subscribe(x=> this.engagement) ; 
  }



}
