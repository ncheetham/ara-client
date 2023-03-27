import { Component, OnInit } from '@angular/core';
import { Probability } from '../probability';
import { ProbabilityService } from '../probability.service';

@Component({
  selector: 'app-probability-list',
  templateUrl: './probability-list.component.html',
  styleUrls: ['./probability-list.component.css']
})
export class ProbabilityListComponent implements OnInit {

  probabilities: Probability[] = [] ;
  selectedProbability: Probability ;
  displayedColumns = ['score', 'name', 'description'] ;

  constructor(private pService: ProbabilityService) { }

  ngOnInit(): void {

    this.pService.findAll().subscribe(x=> {
      this.probabilities = x ; 
    })
  }

  onSelect(row: Probability) {
    this.selectedProbability = row ;
  }

}
