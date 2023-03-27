import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { map, Observable, startWith, Subscription, throwIfEmpty } from 'rxjs';
import { InterviewIntervieweeService } from 'src/app/interview-interviewee.service';
import { IntervieweeService } from 'src/app/interviewee/interviewee.service';
import { InterviewInterviewee } from 'src/app/interviewinterviewee';
import { Interviewee } from '../interviewee';

@Component({
  selector: 'app-interviewee-edit',
  templateUrl: './interviewee-edit.component.html',
  styleUrls: ['./interviewee-edit.component.css']
})
export class IntervieweeEditComponent implements OnInit, OnDestroy {


  @ViewChild('f', {static: false}) iForm: NgForm ;
  editMode = false ;
  interviewInterviewee: InterviewInterviewee = new InterviewInterviewee() ;
  intervieweeSelectedSubscription: Subscription ;
  superiors: Interviewee[] = []
  myControl = new FormControl<string | Interviewee>('');
  filteredOptions: Observable<Interviewee[]>;

  @Input() interviewId: number ;
  @Input() engagementId: number ;

  constructor(private intervieweeService: IntervieweeService, private iiService: InterviewIntervieweeService, private location: Location) { }



  ngOnDestroy(): void {
    this.intervieweeSelectedSubscription.unsubscribe() ;
  }

  ngOnInit(): void {

      this.intervieweeSelectedSubscription = this.iiService.interviewIntervieweeSelected.subscribe(x=>
        this.iiService.findInterviewInterviewee(x).subscribe(i => {
          this.interviewInterviewee = i ;
          this.editMode = true;
        })

      )

      // Get the list of possible superiors.
      this.intervieweeService.findIntervieweeByEngagement(this.engagementId).subscribe(x => {

        console.log(JSON.stringify(x)) ;
        this.superiors = x ;
      }
      );

      // Reports To Options
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.fullName;
          return name ? this._filter(name as string) : this.superiors.slice();
        }),
      );


  }

  onAddInterviewee(f: NgForm) {

    const value = f.value ;

    const newInterviewee = new Interviewee() ;

    newInterviewee.intervieweeId = value.intervieweeId;
    newInterviewee.firstName = value.firstName ;
    newInterviewee.lastName = value.lastName ;
    newInterviewee.title = value.title ;
    newInterviewee.role = value.role ;
    newInterviewee.engagementId = this.engagementId ;

    const rt =  this.myControl.value  as Interviewee;
    newInterviewee.reportsToId = rt.intervieweeId ;

    if(this.editMode) {

      this.intervieweeService.updateInterviewee(newInterviewee.intervieweeId, newInterviewee).subscribe() ;

    }else {

      console.log("Adding Interviewee to engagement") ;
      // Add the Interviewee
      this.intervieweeService.addInterviewee(newInterviewee).subscribe(x => {

        if(this.interviewId) {
          // Add the Interviewee to the Interview
          this.iiService.addIntervieweeToInterview(this.interviewId, x).subscribe(x =>
            this.intervieweeService.intervieweesChanged.next(true)
          );
        }
      }) ;
    }

    this.onClear() ;


  }

  onDelete() {

    console.log('calling delete Interviewee from InterviewInterviewee service. Id:' + this.interviewInterviewee.interviewIntervieweeId);
    // Remove the Interviewee from the Interview
    this.iiService.deleteInterviewInterviewee(this.interviewInterviewee.interviewIntervieweeId).subscribe() ;

    this.onClear();
  }

  onClear() {
    this.iForm.reset() ;
    this.interviewInterviewee = new InterviewInterviewee() ;
    this.editMode = false ;
  }

  onBack() {
    this.location.back() ;
  }

  displayFn(superior: Interviewee): string {
    return superior && superior.fullName ? superior.fullName : '';
  }

  private _filter(name: string): Interviewee[] {
    const filterValue = name.toLowerCase();

    return this.superiors.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }

}

