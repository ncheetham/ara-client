import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-header',
  templateUrl: './survey-header.component.html',
  styleUrls: ['./survey-header.component.css']
})
export class SurveyHeaderComponent implements OnInit {

  constructor() { }

  @Input() survey: Survey ;

  ngOnInit(): void {


  }

}
