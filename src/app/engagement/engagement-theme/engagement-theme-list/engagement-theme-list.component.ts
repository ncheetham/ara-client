import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { EngagementThemeService } from 'src/app/engagement-theme.service';
import { EngagementTheme } from '../engagementtheme';

@Component({
  selector: 'app-engagement-theme-list',
  templateUrl: './engagement-theme-list.component.html',
  styleUrls: ['./engagement-theme-list.component.css']
})
export class EngagementThemeListComponent implements OnInit, OnDestroy {

  engagementThemes: EngagementTheme[] = [] ;
  engagementId: number ;
  displayedColumns = ['theme', 'actions'] ;
  selectedEngagementTheme: EngagementTheme ;
  engagementThemeChangedSubscription: Subscription;

  constructor(private engagementThemeService: EngagementThemeService, private route: ActivatedRoute) { }


  ngOnDestroy(): void {
    this.engagementThemeChangedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    // Get the Engagement
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.engagementId = +x ;

      // Get the Engagement's Themes
      this.engagementThemeService.findByEngagementId(this.engagementId).subscribe(t =>
        this.engagementThemes = t) ;

    }) ;

    // Listen for changed EngagementThemes.
    this.engagementThemeChangedSubscription = this.engagementThemeService.engagementThemeChanged.subscribe(x => {
      this.engagementThemeService.findByEngagementId(this.engagementId).subscribe(t =>
        this.engagementThemes = t) ;
    })
  }

  removeEngagementTheme(etId: number) {

    this.engagementThemeService.deleteEngagementTheme(etId).subscribe() ;

  }

  onSelect(r: EngagementTheme) {
    this.selectedEngagementTheme = r ;
  }


}
