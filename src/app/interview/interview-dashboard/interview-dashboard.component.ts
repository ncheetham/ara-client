import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { ChartData } from 'src/app/engagementInterviewsummaryvo';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from '../interview';

@Component({
  selector: 'app-interview-dashboard',
  templateUrl: './interview-dashboard.component.html',
  styleUrls: ['./interview-dashboard.component.css']
})
export class InterviewDashboardComponent implements OnInit {

  @Input() engagementId: number;
  //@ViewChild('interviewtype', { static: true }) chart: ElementRef;
  interviews: Interview[] = [] ;
  status: ChartData[] ;
  displayedColumns = ['name', 'value'] ;

  constructor(private interviewService: InterviewService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    // Find the Interviews by Engagement
    this.interviewService.findInterviewsByEngagement(this.engagementId).subscribe(interviews => {
      this.interviews = interviews;
    })

    this.interviewService.findInterviewSummaryByEngagementId(this.engagementId).subscribe(x =>
      this.makeChart('interviewtype', x)
      ) ;

    this.interviewService.findInterviewerSummaryByEngagementId(this.engagementId).subscribe(x =>
      this.makeChart('interviewer', x));

      this.interviewService.findInterviewStatusSummaryByEngagementId(this.engagementId).subscribe(x =>
        this.status = x);

  }

  onAddInterview() {
    // Add an interview to the Engagement.
    this.router.navigate(['addinterview',this.engagementId]);

  }

  onViewInterviews() {
    // Show the Interviews
    this.router.navigate(['viewinterviews', this.engagementId]) ;
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
