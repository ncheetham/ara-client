import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { FindingStatusService } from 'src/app/finding-status.service';
import { FindingStatus } from 'src/app/findingstatus';
import { Impact } from 'src/app/impact/impact';
import { ImpactService } from 'src/app/impact/impact.service';
import { InterviewFindingService } from 'src/app/interview-finding/interview-finding.service';
import { InterviewFinding } from 'src/app/interview-finding/interviewfinding';
import { Probability } from 'src/app/probability/probability';
import { ProbabilityService } from 'src/app/probability/probability.service';
import { RiskTypeService } from 'src/app/risktype/risk-type.service';
import { RiskType } from 'src/app/risktype/risktype';
import { User } from 'src/app/user/user';
import { Finding } from '../finding';
import { FindingService } from '../finding.service';

@Component({
  selector: 'app-finding-edit',
  templateUrl: './finding-edit.component.html',
  styleUrls: ['./finding-edit.component.css']
})
export class FindingEditComponent implements OnInit, OnDestroy {

  constructor(private findingService: FindingService, private findingStatusService: FindingStatusService, private route: ActivatedRoute,
    private riskTypeService: RiskTypeService, private pService: ProbabilityService, private iService: ImpactService,
    private location: Location, private ifService: InterviewFindingService) { }

  @Output() addFinding = new EventEmitter<number>();
  @Input() engagementId: number ;
  @Input() interviewId?: number ;

  myControl = new FormControl<string | RiskType>('');
  selectedFinding: Finding  = new Finding() ;
  findingStatuses: FindingStatus[] = [] ;
  riskTypes: RiskType[] = [] ;
  editMode = false ;

  filteredOptions: Observable<RiskType[]>

  probabilities: Probability[] = [] ;
  impacts: Impact[] = [] ;

  selectedFindingSubscription: Subscription ;


  ngOnInit(): void {

    // Build the list of Finding Statuses
    this.findingStatusService.findAll().subscribe(x=> this.findingStatuses = x) ;
    this.riskTypeService.findAll().subscribe(x=> this.riskTypes = x) ;
    this.pService.findAll().subscribe(x => this.probabilities = x) ;
    this.iService.findAll().subscribe(x => this.impacts = x) ;

    this.selectedFindingSubscription = this.findingService.findingSelected.subscribe(x => {
        this.findFinding(x) ;
    }
    );


    const findingId = Number(this.route.snapshot.paramMap.get("id"));

    if(this.route.snapshot.paramMap.has('engagementid')) {
      console.log("has EngagementId: " + this.route.snapshot.paramMap.get("engagementid")) ;
      this.engagementId = Number(this.route.snapshot.paramMap.get("engagementid"));
    }

    if(findingId) {
      console.log("Has FindingID") ;
      this.findFinding(findingId) ;
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.riskTypes.slice();
        }),

    );

  }

  private findFinding(id: number) {

    this.findingService.findById(id).subscribe(i => {
      this.selectedFinding = i;
      this.engagementId = this.selectedFinding.engagement.engagementId ;
      this.editMode = true ;
    })
  }


  private _filter(name: string): RiskType[] {
    const filterValue = name.toLowerCase();

    return this.riskTypes.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  ngOnDestroy() {
    this.selectedFindingSubscription.unsubscribe() ;
  }

  onAddFinding(f: NgForm) {

    // Assign the Engagement Id to the Finding.
    this.selectedFinding.engagement.engagementId = this.engagementId ;

    // Assign the id of the person who entered the finding.
    const user  = JSON.parse(localStorage.getItem('userData') ||'null') as User ;

    this.selectedFinding.enteredByUserId = user.userId ;

    // console.log(JSON.stringify(this.selectedFinding));

    // Find the Risk Type.
    // We have to process the Team first to make sure it is set.
    const formValue = this.myControl.value ;
    const aRiskType: RiskType = new RiskType() ;

    // See if a team has been provided.
    if(typeof formValue === 'string') {
      // Create new Risk Type

      //aRiskType.engagement.engagementId = this.engagementId ;
      aRiskType.name = formValue ;

      // Create the Risk Type
      this.riskTypeService.addRiskType(aRiskType).subscribe(
        x=> {
          // Add the Team to the
          this.selectedFinding.riskType = x ;
          this.createFinding(this.selectedFinding) ;
        }
      )


    } else {
        this.selectedFinding.riskType = formValue as RiskType ;
        this.createFinding(this.selectedFinding);
    }


    if(this.editMode) {
      this.onCancel() ;
    }else {
      this.onCloseWindow() ;
    }


  }

  private createFinding(finding: Finding) {
    // Save the Finding
    this.findingService.createFinding(this.selectedFinding).subscribe(
      f => {
        // If we have an interviewId - create an Interview_Finding.
        if(this.interviewId && this.interviewId > 0) {
          const interviewFinding = new InterviewFinding() ;
          interviewFinding.finding = f ;
          interviewFinding.interview.interviewId = this.interviewId ;

          this.ifService.addInterviewFinding(interviewFinding).subscribe() ;

        }
      }
    ) ;
  }

  displayFn(riskType: RiskType): string {
    return riskType && riskType.name ? riskType.name : '';
  }


  onCancel() {
    this.location.back() ;
  }

  onCloseWindow() {
    if(this.interviewId) {
      this.addFinding.emit(-1) ;
    }else {
      this.onCancel() ;
    }
  }

}
