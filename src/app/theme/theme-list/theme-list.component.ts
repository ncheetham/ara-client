import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/theme';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, OnDestroy {

  themes: Theme[] = [];
  theme: Theme ;
  displayedColumns = ['themeId', 'name'] ;
  themeChanged: Subscription ;

  constructor(private themeService: ThemeService) { }

  ngOnDestroy(): void {
    this.themeChanged.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for changed Themes
    this.themeChanged = this.themeService.themeChanged.subscribe(x => {
      this.themeService.findAll().subscribe(x=> this.themes = x) ;
    })

    this.themeService.findAll().subscribe(x=> this.themes = x);

  }

  onSelect(t: Theme) {
    this.theme = t ;
    // Notify interested listeners that a Theme has been selected.
    this.themeService.themeSelected.next(this.theme.themeId) ;
  }
}
