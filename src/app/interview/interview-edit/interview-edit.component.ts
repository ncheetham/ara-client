import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { map, Observable, startWith, Subscription, VirtualTimeScheduler } from 'rxjs';
import { MeetingType } from 'src/app/meeting-type/meetingType';
import { InterviewService } from 'src/app/interview.service';
import { Interview } from '../interview';
import { MeetingTypeService } from 'src/app/meeting-type.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user.service';
import { EngagementService } from 'src/app/engagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/question.service';
import { InterviewIntervieweeService } from 'src/app/interview-interviewee.service';
import { InterviewQuestionService } from 'src/app/interview-question.service';
import { Location } from '@angular/common';
import { Team } from 'src/app/team';
import { TeamService } from 'src/app/team.service';
import { TeamIntervieweeService } from 'src/app/team-interviewee.service';
import { TeamInterviewee } from 'src/app/teaminterviewee';
import { EngagementTeam } from 'src/app/engagementteam';


@Component({
  selector: 'app-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.css']
})
export class InterviewEditComponent implements OnInit, OnDestroy {


  @Input() interviewId: number ;

  @ViewChild('f', {static: false}) iForm: NgForm ;

  teamControl = new FormControl<string | Team>('');
  selectedInterview: Interview = new Interview();
  selectedInterviewSubscription: Subscription ;
  engagementId: number ;
  editMode = false ;
  meetingTypes: MeetingType[] = [] ;

  users: User[] = [] ;
  questionCount: number = 0 ;
  intervieweeCount: number = 0 ;
  team: Team ;

  options: Team[] = [];
  filteredOptions: Observable<Team[]>;



  constructor(private interviewService: InterviewService, private meetingTypeService: MeetingTypeService,
    private userService: UserService, private iiService: InterviewIntervieweeService, private iqService: InterviewQuestionService
    , private router: Router, private route: ActivatedRoute, private location: Location, private teamService: TeamService,
    private tiService: TeamIntervieweeService ) {
   }

  ngOnDestroy(): void {
    //this.selectedInterviewSubscription.unsubscribe() ;
  }

  ngOnInit(): void {


    if(this.interviewId) {
      this.interviewService.findInterview(this.interviewId).subscribe(x=> this.selectedInterview = x);

      // Find the Interview Questions
      this.iqService.findByInterviewId(this.interviewId).subscribe(
        x=> {
          this.questionCount = x.length;
        }
        );

      // Get the number of Interviewees.
      this.iiService.findIntervieweesByInterview(this.interviewId).subscribe(x=> {
        this.intervieweeCount = x.length ;
      })

      this.editMode = true ;
    }



    // Listen for selected Interviews.
    this.selectedInterviewSubscription = this.interviewService.startedEditing.subscribe((interviewId: number) => {

      console.log("InterviewEditComponent: InterviewSelected") ;

      this.interviewService.findInterview(interviewId).subscribe(x=> this.selectedInterview = x);

      this.iqService.findByInterviewId(interviewId).subscribe(
        x=> {
          console.log('interviewId:' + interviewId +' length:' + x.length)
          this.questionCount = x.length;
        }
        );

        // Get the number of Interviewees.
        this.iiService.findIntervieweesByInterview(interviewId).subscribe(x=> {
          this.intervieweeCount = x.length ;
        })


      this.editMode = true ;

    }) ;

    // Get the Passed EngagementID????????
    this.route.params.pipe(map(p => p['id'])).subscribe(x=> {
      this.engagementId = x ;

      // Load the Teams.
      this.teamService.findTeamsByEngagementId(this.engagementId).subscribe(x =>
        this.options = x) ;
    });

    console.log("EngagementId: " + this.engagementId) ;

    // get the meeting types.
    this.meetingTypeService.findAll().subscribe(x => this.meetingTypes = x) ;

    // Get the users.
    this.userService.findAllUsers().subscribe(x => this.users = x) ;


    this.filteredOptions = this.teamControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

  }

  displayFn(team: Team): string {
    return team && team.name ? team.name : '';
  }

  private _filter(name: string): Team[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  onAddInterview(iForm: NgForm) {

    const value = iForm.value ;

    if(this.editMode) {

      this.interviewService.updateInterview(this.selectedInterview.interviewId, this.selectedInterview).subscribe() ;

    }else {

      let newInterview: Interview = new Interview() ;

      newInterview.enteredByUser.userId = this.selectedInterview.enteredByUser.userId ;
      newInterview.interviewDate = this.selectedInterview.interviewDate ;
      newInterview.meetingType.meetingTypeId = this.selectedInterview.meetingType.meetingTypeId ;
      newInterview.engagement.engagementId = this.engagementId ;
      newInterview.notes = this.selectedInterview.notes ;
      newInterview.interviewStatus.interviewStatusId = this.selectedInterview.interviewStatus.interviewStatusId ;

      // We have to process the Team first to make sure it is set.
      const formValue = this.teamControl.value ;
      const aTeam: Team = new Team() ;

      // See if a team has been provided.
      if(typeof formValue === 'string') {
        // Create new team

        aTeam.engagement.engagementId = this.engagementId ;
        aTeam.name = formValue ;

        // Create the TEam
        this.teamService.addTeam(aTeam).subscribe(
          x=> {
            // Add the Team to the
            newInterview.team = x ;
            // Save the Interview
            this.interviewService.addInterview(newInterview).subscribe() ;
          }
        )


      } else {
         newInterview.team = formValue as Team ;
         this.interviewService.addInterview(newInterview).subscribe() ;
      }


    }

    this.onCancel() ;

  }

  onDelete() {
    this.interviewService.deleteInterview(this.selectedInterview.interviewId).subscribe() ;
    this.onClear() ;
  }


  onClear() {
    this.iForm.reset() ;
    this.editMode = false ;
  }

  onViewQuestions() {

    // Navigate to the interview's Questions.
    this.router.navigate(['interviewquestions', this.selectedInterview.interviewId]) ;

  }

  onInterviewees() {
    this.router.navigate(['interviewees', this.selectedInterview.interviewId]) ;
  }

  onViewEvidence() {

    // Navigate to the interview's Questions.
    this.router.navigate(['interviewevidence', this.selectedInterview.interviewId]) ;

  }

  onConductInterview() {
    this.router.navigate(['conductinterview', this.selectedInterview.interviewId]);
  }

  onCancel() {
    this.location.back() ;
    this.interviewService.interviewChanged.next(true) ;
  }

}
