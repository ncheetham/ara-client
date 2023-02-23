import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToolTechService } from 'src/app/tool-tech.service';
import { ToolTech } from 'src/app/tooltech';

@Component({
  selector: 'app-tool-tech-edit',
  templateUrl: './tool-tech-edit.component.html',
  styleUrls: ['./tool-tech-edit.component.css']
})
export class ToolTechEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) ttForm: NgForm ;
  toolTech: ToolTech = {toolTechId: 0, name: ''}
  editMode = false ;
  toolTechSelected: Subscription ;

  constructor(private toolTechService: ToolTechService) { }

  ngOnDestroy(): void {
    this.toolTechSelected.unsubscribe() ;
  }



  ngOnInit(): void {

    // Listen for a selected toolTech
    this.toolTechSelected = this.toolTechService.selectedToolTech.subscribe(id => {
      this.toolTechService.findToolTech(id).subscribe(x=> this.toolTech = x) ;
      this.editMode = true ;
    })


  }

  onAddToolTech(f: NgForm) {

    const value = f.value ;

    const newToolTech: ToolTech = {toolTechId: value.toolTechId, name: value.name} ;
    console.log('Adding ToolTech:' + JSON.stringify(newToolTech)) ;
    if(this.editMode) {
      this.toolTechService.updateToolTech(newToolTech.toolTechId, newToolTech).subscribe() ;
    }else {
      this.toolTechService.addToolTech(newToolTech).subscribe() ;
    }

    this.onClear() ;
    
  }

  onDelete() {
    this.toolTechService.deleteToolTech(this.toolTech.toolTechId).subscribe()  ;
    this.onClear() ;
  }

  onClear() {
    this.ttForm.reset() ;
    this.editMode =false ;
  }

}
