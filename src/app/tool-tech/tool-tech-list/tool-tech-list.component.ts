import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolTechService } from 'src/app/tool-tech.service';
import { ToolTech } from 'src/app/tooltech';

@Component({
  selector: 'app-tool-tech-list',
  templateUrl: './tool-tech-list.component.html',
  styleUrls: ['./tool-tech-list.component.css']
})
export class ToolTechListComponent implements OnInit, OnDestroy {

  toolTechs: ToolTech[] = []
  displayedColumns = ['toolTechId', 'name'] ;
  selectedToolTech: ToolTech ;
  changedToolTechSubscription: Subscription ;


  constructor(private toolTechService: ToolTechService) { }

  ngOnDestroy(): void {
    this.changedToolTechSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

    // Listen for changed ToolTechs.
    this.changedToolTechSubscription = this.toolTechService.toolTechChanged.subscribe(x => {
      this.toolTechService.findAll().subscribe(x=> this.toolTechs = x) ;
    })
    // Load the Tool Tech List
    this.toolTechService.findAll().subscribe(x=> this.toolTechs = x) ;


  }


  onSelect(t: ToolTech) {
    this.selectedToolTech = t ;
    // Notify listeners that a row has been selected.
    this.toolTechService.selectedToolTech.next(this.selectedToolTech.toolTechId) ; 
  }

}
