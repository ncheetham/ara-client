import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Probability } from '../probability';
import { ProbabilityService } from '../probability.service';

@Component({
  selector: 'app-probability-edit',
  templateUrl: './probability-edit.component.html',
  styleUrls: ['./probability-edit.component.css']
})
export class ProbabilityEditComponent implements OnInit, OnDestroy {

  selectedProbability: Probability = new Probability();
  editMode = false ;
  probabilitySelectedSubscription: Subscription ;

  constructor(private pService: ProbabilityService, private location: Location) { }


  ngOnDestroy(): void {
    this.probabilitySelectedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    this.probabilitySelectedSubscription = this.pService.probabilitySelected.subscribe(x => {
      this.pService.findProbability(x).subscribe(p => {
        this.selectedProbability = p ;
      })
    })
  }


  onAddProbability(f: NgForm) {

    const p = new Probability() ;

    const value = f.value ;

    p.probabilityId = value.probabilityId ;
    p.name = value.name ;
    p.description = value.description ;
    p.score = value.score ;


    if(p.probabilityId > 0) {

      // Edit the Probablity.
      this.pService.updateProbability(p.probabilityId, p).subscribe(
        x => this.pService.probabilityChanged.next(true)
      ) ;
    }else {

      // Add the probability
      this.pService.addProbability(p).subscribe(
        x => this.pService.probabilityChanged.next(true)
      ) ;

    }

    this.onCancel() ;

  }



  onCancel() {
    this.location.back() ;
  }



}
