import { Component, OnInit } from '@angular/core';
import { Observation } from 'src/app/observation';
import { ObservationService } from 'src/app/observation.service';

@Component({
  selector: 'app-observation-view',
  templateUrl: './observation-view.component.html',
  styleUrls: ['./observation-view.component.css']
})
export class ObservationViewComponent implements OnInit {


  observation: Observation ;


  constructor(private observationService: ObservationService) { }

  ngOnInit(): void {
  }

}
