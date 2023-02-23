import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Engagement } from '../../engagement/engagement';
import { Location } from '@angular/common'
import { EngagementService } from '../../engagement.service';


@Component({
  selector: 'app-evidence-view',
  templateUrl: './evidence-view.component.html',
  styleUrls: ['./evidence-view.component.css']
})
export class EvidenceViewComponent implements OnInit {

  engagement: Engagement ;


  constructor(private route: ActivatedRoute, private location: Location, private engagementService: EngagementService,
    private router: Router) { }

  ngOnInit(): void {

  // Get the Engagement.
   const engagementId = Number(this.route.snapshot.paramMap.get('id'));
   this.engagementService.findEngagement(engagementId).subscribe(
     engagement => this.engagement = engagement);

  }

  onAddEvidence() {
    this.router.navigate(['addengagementevidence', this.engagement.engagementId]) ;
  }

  onBack() {
    this.location.back() ;
  }

}
