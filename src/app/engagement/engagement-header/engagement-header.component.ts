import { Component, Input, OnInit } from '@angular/core';
import { Engagement } from '../engagement';

@Component({
  selector: 'app-engagement-header',
  templateUrl: './engagement-header.component.html',
  styleUrls: ['./engagement-header.component.css']
})
export class EngagementHeaderComponent implements OnInit {

  @Input() engagement: Engagement ;
  constructor() { }

  ngOnInit(): void {
  }

}
