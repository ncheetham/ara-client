import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observation } from 'src/app/observation';
import { ObservationService } from 'src/app/observation.service';

@Component({
  selector: 'app-observation-add',
  templateUrl: './observation-add.component.html',
  styleUrls: ['./observation-add.component.css']
})
export class ObservationAddComponent implements OnInit {

  @Input() engagementId: number ;
  editmode = false ;

  observation: Observation ;

  constructor(private location: Location, private observationService: ObservationService) { }

  ngOnInit(): void {
  }

  onAdd(f: NgForm) {

      const value = f.value;

      const o = new Observation()  ;
      o.description = value.description ;
      o.enteredByUserId = 0;//
      o.recordedDate = new Date() ;
      o.engagementId = this.engagementId ;
      o.observationId = value.observationId;

      if(this.editmode) {
        this.observationService.updateObservation(o.observationId, o).subscribe() ; 
      }else {
        this.observationService.saveObservation(o).subscribe() ;
      }

  }

  onBack() {
    this.location.back() ;
  }


}
