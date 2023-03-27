import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FindingService } from '../finding.service';

@Component({
  selector: 'app-finding-view',
  templateUrl: './finding-view.component.html',
  styleUrls: ['./finding-view.component.css']
})
export class FindingViewComponent implements OnInit {

  constructor(private findingService: FindingService, private location: Location, private route: ActivatedRoute, private router: Router) { }

  engagementId: number;
  ngOnInit(): void {
      this.engagementId = Number(this.route.snapshot.paramMap.get('id'));
    // this.engagementService.findEngagement(engagementId).subscribe(
    //   engagement => this.engagement = engagement);
  }

  onBack() {
    this.location.back() ;
  }

}
