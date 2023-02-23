import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/theme';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) tForm: NgForm ;
  theme: Theme = {themeId: 0, name: ''} ;
  editMode = false ;
  themeSelected:  Subscription ;

  constructor(private themeService: ThemeService) { }

  ngOnDestroy(): void {
    this.themeSelected.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for a selected Theme.
    this.themeSelected = this.themeService.themeSelected.subscribe(x=> {
      this.themeService.findTheme(x).subscribe(t => this.theme = t) ;
      this.editMode = true ;
    });



  }

  onAddTheme(f: NgForm) {

    const value = f.value ;

    const newTheme: Theme = {themeId: value.themeId, name: value.name} ;

    if(this.editMode) {
      this.themeService.updateTheme(newTheme.themeId, newTheme).subscribe() ;
    }else {
      this.themeService.saveTheme(newTheme).subscribe() ;
    }

    this.onClear() ;

  }

  onDelete() {
    this.themeService.deleteTheme(this.theme.themeId).subscribe() ;
    this.onClear() ;
  }

  onClear() {
    this.tForm.reset() ;
    this.editMode = false ;
  }

}
