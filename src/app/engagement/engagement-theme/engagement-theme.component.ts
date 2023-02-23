import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { EngagementService } from '../../engagement.service';
import { Engagement } from '../engagement';

@Component({
  selector: 'app-engagement-theme',
  templateUrl: './engagement-theme.component.html',
  styleUrls: ['./engagement-theme.component.css']
})
export class EngagementThemeComponent implements OnInit {

  engagement: Engagement ;


  constructor(private engagementService: EngagementService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  // See if a parameter (Client Id) was passed.
  this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

    this.engagementService.findEngagement(x).subscribe((engagement: Engagement)=> {

      console.log('setting engagement') ;
      this.engagement = engagement ;

    }) ;

  })

}

}
