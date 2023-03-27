import { Component, OnInit } from '@angular/core';
import { Impact } from '../impact';
import { ImpactService } from '../impact.service';

@Component({
  selector: 'app-impact-list',
  templateUrl: './impact-list.component.html',
  styleUrls: ['./impact-list.component.css']
})
export class ImpactListComponent implements OnInit {

  constructor(private iService: ImpactService) { }
  impacts: Impact[] = [] ;
  selectedImpact: Impact;
  displayedColumns = ['score', 'name', 'description'] ;


  ngOnInit(): void {

    this.iService.findAll().subscribe(x=> this.impacts = x) ;

  }

  onSelect(row: Impact) {
    this.selectedImpact = row  ;
  }

}
