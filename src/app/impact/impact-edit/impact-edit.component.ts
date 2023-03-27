import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Impact } from '../impact';
import { ImpactService } from '../impact.service';

@Component({
  selector: 'app-impact-edit',
  templateUrl: './impact-edit.component.html',
  styleUrls: ['./impact-edit.component.css']
})
export class ImpactEditComponent implements OnInit, OnDestroy {

  constructor(private iService: ImpactService, private location: Location) { }

  ngOnDestroy(): void {
    this.impactSelectedSubscription.unsubscribe() ; 
  }

  selectedImpact: Impact ;
  impactSelectedSubscription: Subscription ;

  ngOnInit(): void {

    this.impactSelectedSubscription = this.iService.impactSelected.subscribe(x=> {
      this.iService.findImpact(x).subscribe(impact =>
        this.selectedImpact = impact
      )
    });

  }

  onAddProbability(f: NgForm) {

    const value = f.value ;

    const impact = new Impact() ;

    impact.impactId = value.impactId ;
    impact.name = value.name ;
    impact.description = value.description ;
    impact.score = value.score ;

    if(impact.impactId == 0) {
      this.iService.addImpact(impact).subscribe() ;
    }else {
      this.iService.updateImpact(impact.impactId, impact).subscribe() ;
    }

    this.onCancel() ;

  }

  onCancel() {
    this.location.back()  ;
  }


}
