import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { ChartData } from 'src/app/engagementInterviewsummaryvo';
import { Finding } from '../finding';
import { FindingService } from '../finding.service';

@Component({
  selector: 'app-finding-dashboard',
  templateUrl: './finding-dashboard.component.html',
  styleUrls: ['./finding-dashboard.component.css']
})
export class FindingDashboardComponent implements OnInit {

  findings: Finding[] = [] ;
  displayedColumns: string[] = [] ;
  status = [] ;

  @Input() engagementId: number ;

  constructor(private findingService: FindingService, private router: Router) { }

  ngOnInit(): void {


    this.findingService.findFindingSummaryByEngagementId(this.engagementId).subscribe(x =>
      this.makeChart('findingstatus', x)
    ) ;

    this.findingService.findByEngagement(this.engagementId).subscribe(x =>
      this.findings = x ) ;

  }

  onViewFindings() {
    this.router.navigate(['viewfindings',this.engagementId]);
  }

  onAddFinding() {
    this.router.navigate(['addengagementfinding', this.engagementId]);

  }

  makeChart(element: string, data: ChartData[]) {
    var chartDom = document.getElementById(element) as HTMLElement;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
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
