import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { EngagementEvidenceService } from 'src/app/engagement-evidence.service';
import { EngagementEvidence } from 'src/app/engagementevidence';
import { ChartData } from 'src/app/engagementInterviewsummaryvo';
import { EvidenceService } from 'src/app/evidence.service';
import { Evidence } from '../evidence';

@Component({
  selector: 'app-evidence-dashboard',
  templateUrl: './evidence-dashboard.component.html',
  styleUrls: ['./evidence-dashboard.component.css']
})
export class EvidenceDashboardComponent implements OnInit {

  @Input() engagementId: number ;
  evidences: EngagementEvidence[] = [] ;
  status: ChartData[] = [] ;
  displayedColumns = ['name', 'value'] ;
  evidenceCount = 0;

  constructor(private evidenceService: EvidenceService, private route: ActivatedRoute, private router: Router, private location: Location,
    private eeService: EngagementEvidenceService) { }

  ngOnInit(): void {

    // Find the evidence by engagement.
    this.eeService.findByEngagementId(this.engagementId).subscribe(x =>  {
      this.evidences = x ;
      this.evidenceCount = this.evidences.length ;
    })

    // Find the Evidence by Type
    this.evidenceService.findSummaryStatusByEngagemntId(this.engagementId).subscribe(x=> {
      this.makeChart('status', x) ;
    })

    // Find the Evidence By Status
    this.evidenceService.findSummaryTypeByEngagemntId(this.engagementId).subscribe(x=> {
      this.makeChart('type', x) ;
    })


  }

  makeChart(element: string, data: ChartData[]) {
    var chartDom = document.getElementById(element) as HTMLElement;
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

  onViewEvidence() {
    this.router.navigate(['viewevidence', this.engagementId]) ;
  }

  onAddEvidence() {
    this.router.navigate(['addengagementevidence', this.engagementId]) ;
  }

}
