import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { EngagementThemeService } from '../../engagement-theme.service';
import { EngagementTheme } from '../engagement-theme/engagementtheme';
import { EngagementService } from '../../engagement.service';
import { Engagement } from '../engagement';
import { Theme } from '../../theme';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-engagement-question',
  templateUrl: './engagement-question.component.html',
  styleUrls: ['./engagement-question.component.css']
})
export class EngagementQuestionComponent implements OnInit {

  engagement: Engagement ;
  engagementThemes: EngagementTheme[] = [] ;
  engagementThemeId: number ;

  constructor(private engagementService: EngagementService, private route: ActivatedRoute,
    private engagementThemeService: EngagementThemeService) { }

  ngOnInit(): void {

    // Get the Engagement from the Input Parameter.
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.engagementService.findEngagement(x).subscribe(engagement => {

        console.log('setting Engagement') ;
        this.engagement = engagement ;

        // Build the list of Themese
        this.engagementThemeService.findByEngagementId(this.engagement.engagementId).subscribe(x=> {
          this.engagementThemes = x ;
        })

    }) ;

    })
  }

  onEngagementThemeChanged() {
    // Notify Interested Listeners that the EngagementTheme was changed
    this.engagementThemeService.engagementThemeChanged.next(this.engagementThemeId) ;
  }



}
