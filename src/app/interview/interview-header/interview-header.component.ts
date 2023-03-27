import { Component, Input, OnInit } from '@angular/core';
import { Interview } from '../interview';

@Component({
  selector: 'app-interview-header',
  templateUrl: './interview-header.component.html',
  styleUrls: ['./interview-header.component.css']
})
export class InterviewHeaderComponent implements OnInit {

  constructor() { }

  @Input() interview: Interview ;

  ngOnInit(): void {
  }

}
