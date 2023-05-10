import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { ChartData } from 'src/app/engagementInterviewsummaryvo';
import { SurveyService } from '../survey.service';
import { SurveyStatusVO } from './surveystatusvo';

@Component({
  selector: 'app-survey-dashboard',
  templateUrl: './survey-dashboard.component.html',
  styleUrls: ['./survey-dashboard.component.css']
})
export class SurveyDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private sService: SurveyService) { }

  @Input() engagementId: number;
  surveyStatus: SurveyStatusVO[] = [] ;
  selectedSurvey: SurveyStatusVO ;
  displayedColumns = ['survey', 'interviewees', 'excluded', 'planned', 'scheduled', 'sent', 'completed'] ;

  ngOnInit(): void {

    // Let's show the Survey Chart.
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.engagementId = id ;

    // Setup the survey charts.
    this.sService.findSurveyStatistics(this.engagementId).subscribe(
      x => this.surveyStatus = x
    );

  }

  onAddSurvey() {
    this.router.navigate(["addengagementsurvey", this.engagementId]);
  }

  onViewSurveys() {
    this.router.navigate(["viewengagementsurveys", this.engagementId]) ;
  }

  onSelect(row: SurveyStatusVO) {
    this.selectedSurvey = row ;
    this.router.navigate(['editengagementsurvey', this.engagementId, this.selectedSurvey.surveyId]) ;
  }


  makeChart(element: string, data: ChartData[]) {
    var chartDom = document.getElementById(element) as HTMLElement;
    //var myChart = echarts.init(chartDom);
    var myChart = echarts.init(chartDom);
    var option;

      // console.log(JSON.stringify(data));

    option = {
      title: {
        //text: 'Interview Detail',
        //subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Breakdown',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }



}
