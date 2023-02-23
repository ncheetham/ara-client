import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { EngagementService } from 'src/app/engagement.service';
import { Engagement } from '../engagement';

@Component({
  selector: 'app-engagement-evidence',
  templateUrl: './engagement-evidence.component.html',
  styleUrls: ['./engagement-evidence.component.css']
})
export class EngagementEvidenceComponent implements OnInit {

  engagement: Engagement ;

  constructor(private route: ActivatedRoute, private engagementService: EngagementService) { }

  ngOnInit(): void {

    // Read the EngagementID from the Parameters.
        // Find the Interview
        this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

          this.engagementService.findEngagement(x).subscribe(engagement => {

            console.log('setting Engagement') ;

            this.engagement = engagement ;

          }) ;
  })


  }

}
