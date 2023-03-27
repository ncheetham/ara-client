import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EngagementService } from '../../engagement.service';
import { Engagement } from '../engagement';
import { Location } from '@angular/common';

@Component({
  selector: 'app-engagement-view',
  templateUrl: './engagement-view.component.html',
  styleUrls: ['./engagement-view.component.css']
})
export class EngagementViewComponent implements OnInit {

  engagement: Engagement ;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private engagementService: EngagementService) { }

  ngOnInit(): void {

    const engagementId = Number(this.route.snapshot.paramMap.get('id'));
    this.engagementService.findEngagement(engagementId).subscribe(
      engagement => this.engagement = engagement);
  }


  onAddInterview() {

  }


}
