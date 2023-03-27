import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Finding } from '../finding';
import { FindingService } from '../finding.service';

@Component({
  selector: 'app-finding-list',
  templateUrl: './finding-list.component.html',
  styleUrls: ['./finding-list.component.css']
})
export class FindingListComponent implements OnInit {

  @Input() engagementId: number ;


  constructor(private findingService: FindingService, private route: ActivatedRoute, private router: Router) { }

  findings: Finding[] = [] ;
  displayedColumns = ['name', 'description', 'risktype', 'impact', 'probability', 'actions'] ;
  selectedFinding: Finding ;

  ngOnInit(): void {

    this.findingService.findByEngagement(this.engagementId).subscribe(
      x=> this.findings = x
    ) ;

  }

  onFinding(id: number) {

    this.findingService.findingSelected.next(id);

    this.router.navigate(['editfinding', id]) ;

  }

  onSelect(row: Finding) {
    this.selectedFinding = row  ;
  }

}
