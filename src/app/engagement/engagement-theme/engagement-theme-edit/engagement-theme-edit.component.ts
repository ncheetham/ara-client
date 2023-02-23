import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { EngagementThemeService } from 'src/app/engagement-theme.service';
import { EngagementService } from 'src/app/engagement.service';
import { Theme } from 'src/app/theme';
import { ThemeService } from 'src/app/theme.service';
import { EngagementTheme } from '../engagementtheme';

@Component({
  selector: 'app-engagement-theme-edit',
  templateUrl: './engagement-theme-edit.component.html',
  styleUrls: ['./engagement-theme-edit.component.css']
})
export class EngagementThemeEditComponent implements OnInit {


  @ViewChild('f', {static: false}) etForm: NgForm ;

  constructor(private engagementService: EngagementService, private themeService: ThemeService, private engagementThemeService: EngagementThemeService, private route: ActivatedRoute) { }

  engagementId: number ;
  engagementTheme: EngagementTheme = new EngagementTheme() ;
  engagementThemes: EngagementTheme[] = [] ;
  themes: Theme[] = [] ;
  submitted=false ;

  
  ngOnInit(): void {

    // Set the Engagement number from the parameters.
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {

      this.engagementId = +x ;
      //this.engagementTheme.engagement.engagementId = this.engagementId ;

      // Get the Engagement's Themes
      this.engagementThemeService.findByEngagementId(this.engagementId).subscribe(t =>
        this.engagementThemes = t) ;

    }) ;


    // Load the Themes
    this.themeService.findAll().subscribe(x=> this.themes = x) ;

  }

  onAddEngagementTheme(f: NgForm) {

    const value = f.value ;

    const newEt = new EngagementTheme() ;

    newEt.theme.themeId = value.themeId ;
    newEt.engagement.engagementId = this.engagementId ;

    this.engagementThemeService.saveEngagementTheme(newEt).subscribe();

    this.onClear() ;
  }

  onDeleteEngagmentTheme() {

  }

  onUpdateEngagmentTheme() {

  }

  onClear() {
    this.etForm.reset ;
    this.engagementTheme = new EngagementTheme() ;
  }

}
