import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as echarts from 'echarts';
import { EngagementService } from 'src/app/engagement.service';
import { IntervieweeService } from '../interviewee.service';
import { IntervieweeVO } from '../intervieweevo';

@Component({
  selector: 'app-interviewee-dashboard',
  templateUrl: './interviewee-dashboard.component.html',
  styleUrls: ['./interviewee-dashboard.component.css']
})
export class IntervieweeDashboardComponent implements OnInit {

  @Input() engagementId: number ;
  data: IntervieweeVO ;
  nodeHeadingProperty = "name";
  nodeContentProperty = "title";

  constructor(private iService: IntervieweeService, private engagementService: EngagementService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {


    this.engagementService.findEngagement(this.engagementId).subscribe(
      e =>

      this.iService.findOrgChartByEngagement(this.engagementId).subscribe(x=> {

        const root: IntervieweeVO = new IntervieweeVO() ;
        root.name = e.client.name ;
        root.title = e.name ;
        root.hideChildren = false ; 
        root.children = x ;

        this.data = root ;
      })

    )




  }


  makeChart(element: string, data: IntervieweeVO) {

    var chartDom = document.getElementById(element) as HTMLElement;

    var myChart = echarts.init(chartDom);
    var option;

    option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          id: 0,
          name: 'tree1',
          data: [data],

          top: '10%',
          left: '8%',
          bottom: '22%',
          right: '20%',

          symbolSize: 7,

          edgeShape: 'polyline',
          edgeForkPosition: '63%',
          initialTreeDepth: 3,

          lineStyle: {
            width: 2
          },

          label: {
            backgroundColor: '#fff',
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',

          },

          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },

          emphasis: {
            focus: 'descendant'
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    };


    option && myChart.setOption(option);
  }

  selectNode(nodeData: IntervieweeVO) {
    alert("Hi All. I'm " + nodeData.name + ". I'm a " + nodeData.title + ".");
  }

  onAddInterviewee() {
    this.router.navigate(['addinterviewee', this.engagementId]);
  }


  onViewInterviewees() {

    this.router.navigate(['viewintervieweesall', this.engagementId ]);

  }

  onSelectInterviewee(id: number) {
    if(id && id > 0) {
      this.router.navigate(['viewinterviewee', id]) ;
    }
  }

  onPrint() {
    
  }

}
