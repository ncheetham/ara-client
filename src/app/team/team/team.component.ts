import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  engagement: Engagement;

  constructor(private engagementService: EngagementService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

      // Get the EngagementId from the Team.
      const engagementId = Number(this.route.snapshot.paramMap.get('id'));

      // Find the Engagement.
      this.engagementService.findEngagement(engagementId).subscribe(x => this.engagement = x) ;

  }

  onImport() {

  }

  onBack() {
    this.location.back() ;
  }

}
