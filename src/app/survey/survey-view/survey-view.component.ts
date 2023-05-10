import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from 'src/app/engagement/engagement';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {

  constructor(private location: Location, private router: Router, private eService: EngagementService, private route: ActivatedRoute) { }

  engagement: Engagement ;

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.eService.findEngagement(id).subscribe(x=> this.engagement = x) ;
  }

  onBack() {
    this.location.back() ;
  }

  onAddSurvey() {
    this.router.navigate(['addengagementsurvey', this.engagement.engagementId]) ;
  }

}
