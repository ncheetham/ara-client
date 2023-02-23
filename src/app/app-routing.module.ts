import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientEngagementComponent } from './client-engagement/client-engagement.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ClientComponent } from './client/client.component';
import { ConductInterviewComponent } from './conduct-interview/conduct-interview.component';
import { EngagementAddComponent } from './engagement/engagement-add/engagement-add.component';
import { EngagementQuestionComponent } from './engagement/engagement-question/engagement-question.component';
import { EngagementThemeComponent } from './engagement/engagement-theme/engagement-theme.component';
import { EngagementViewComponent } from './engagement/engagement-view/engagement-view.component';
import { EngagementEvidenceComponent } from './engagement/engagement-evidence/engagement-evidence.component';
import { EngagementComponent } from './engagement/engagement.component';
import { EvidenceStatusComponent } from './evidence/evidence-status/evidence-status.component';
import { EvidenceTypeComponent } from './evidence/evidence-type/evidence-type.component';
import { EvidenceViewComponent } from './evidence/evidence-view/evidence-view.component';
import { EvidenceEditComponent } from './evidence/evidence-edit/evidence-edit.component';
import { EvidenceComponent} from './evidence/evidence.component';
import { FindingStatusComponent } from './finding-status/finding-status.component';
import { InterviewAddComponent } from './interview/interview-add/interview-add.component';
import { InterviewsViewComponent } from './interview/interviews-view/interviews-view.component';
import { InterviewComponent } from './interview/interview.component';
import { IntervieweeComponent } from './interviewee/interviewee.component';
import { MeetingTypeComponent } from './meeting-type/meeting-type.component';
import { ProcessDomainComponent } from './process-domain/process-domain.component';
import { ProcessComponent } from './process/process.component';
import { QuestionResolutionMethodComponent } from './question-resolution-method/question-resolution-method.component';
import { QuestionResolutionComponent } from './question-resolution/question-resolution.component';
import { QuestionComponent } from './question/question.component';
import { ThemeComponent } from './theme/theme.component';
import { ToolTechComponent } from './tool-tech/tool-tech.component';
import { UserComponent } from './user/user.component';
import { InterviewViewComponent } from './interview/interview-view/interview-view.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { QuestionCopyComponent } from './question/question-copy/question-copy.component';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'clients', component: ClientComponent, canActivate: [AuthGuardService],
    data: {
      title: 'Clients',
      breadcrumb: [
        {
          label: 'Clients',
          url: ''
        }
      ]
    },
},
  {path: 'engagements', component: EngagementComponent, canActivate: [AuthGuardService],
    data: {
      title: 'Engagements',
      breadcrumb: [
        {
          label: 'Clients',
          url: '/clients/'
        },
        {
          label: 'Engagements',
          url: ''
        }
      ]
    },
},
  {path: 'clientengagements/:id', component: ClientEngagementComponent, canActivate: [AuthGuardService],
    data: {
      title: 'Engagements',
      breadcrumb: [
        {
          label: 'Clients',
          url: '/clients/'
        },
        {
          label: 'Engagements',
          url: ''
        }
      ]
    },
  },
  {path: 'interviews/:id', component: InterviewComponent, canActivate: [AuthGuardService],
  data: {
    title: 'Engagements',
    breadcrumb: [
      {
        label: 'Clients',
        url: '/clients/'
      },
      {
        label: 'Engagements',
        url: '/clientengagements/:id'
      },
      {
        label: 'Interviews',
        url: ''
      },
    ]
  }, },
  {path: 'interviewquestions/:id', component: QuestionComponent, canActivate: [AuthGuardService],
  data: {
    title: 'Engagements',
    breadcrumb: [
      {
        label: 'Clients',
        url: '/clients/'
      },
      {
        label: 'Engagements',
        url: '/clientengagements/:id'
      },
      {
        label: 'Interviews',
        url: 'interviews/:id'
      },
      {
        label: 'Questions',
        url: ''
      }
    ]
  },  },
  {path: 'conductinterview/:id', component: ConductInterviewComponent, canActivate: [AuthGuardService]},
  {path: 'meetingtypes', component: MeetingTypeComponent, canActivate: [AuthGuardService]},
  {path: 'users', component: UserComponent, canActivate: [AuthGuardService]},
  {path: 'auth', component: AuthComponent},
  {path: 'evidencetypes', component: EvidenceTypeComponent, canActivate: [AuthGuardService]},
  {path: 'evidencestatus', component: EvidenceStatusComponent, canActivate: [AuthGuardService]},
  {path: 'qrm', component: QuestionResolutionMethodComponent, canActivate: [AuthGuardService]},
  {path: 'qr', component: QuestionResolutionComponent, canActivate: [AuthGuardService]},
  {path: 'findingstatus', component: FindingStatusComponent, canActivate: [AuthGuardService]},
  {path: 'themes', component: ThemeComponent, canActivate: [AuthGuardService]},
  {path: 'processdomain', component: ProcessDomainComponent, canActivate: [AuthGuardService]},
  {path: 'process', component: ProcessComponent, canActivate: [AuthGuardService]},
  {path: 'tooltech', component: ToolTechComponent, canActivate: [AuthGuardService]},
  {path: 'engagementquestions/:id', component: EngagementQuestionComponent, canActivate: [AuthGuardService]},
  {path: 'interviewevidence/:id', component: EvidenceComponent, canActivate: [AuthGuardService],
    data: {
      title: 'Engagements',
      breadcrumb: [
        {
          label: 'Clients',
          url: '/clients/'
        },
        {
          label: 'Engagements',
          url: '/clientengagements/:id'
        },
        {
          label: 'Interviews',
          url: 'interviews/:id'
        },
        {
          label: 'Evidence',
          url: ''
        }
      ]
    },

},
  {path: 'engagementthemes/:id', component: EngagementThemeComponent, canActivate: [AuthGuardService],
  data: {
    title: 'Themes',
    breadcrumb: [
      {
        label: 'Clients',
        url: '/clients/'
      },
      {
        label: 'Engagements',
        url: '/clientengagements/:id'
      },
      {
        label: 'Themes',
        url: ''
      }
    ]
  },
},
  {path: 'interviewees/:id', component: IntervieweeComponent, canActivate: [AuthGuardService],
    data: {
      title: 'Interviewees',
      breadcrumb: [
        {
          label: 'Clients',
          url: '/clients/'
        },
        {
          label: 'Engagements',
          url: '/clientengagements/:id'
        },
        {
          label: 'Interviews',
          url: 'interviews/:id'
        },
        {
          label: 'Interviewees',
          url: ''
        }
      ]
    },

},
{path: 'addclient', component: ClientAddComponent , canActivate: [AuthGuardService]},
{path: 'addclient/:id', component: ClientEditComponent , canActivate: [AuthGuardService]},
{path: 'client/:id', component: ClientViewComponent , canActivate: [AuthGuardService]},
{path: 'addengagement/:id', component: EngagementAddComponent, canActivate: [AuthGuardService]},
{path: 'viewengagement/:id', component: EngagementViewComponent, canActivate: [AuthGuardService]},
{path: 'addinterview/:id', component: InterviewAddComponent, canActivate: [AuthGuardService]},
{path: 'viewinterviews/:id', component: InterviewsViewComponent, canActivate: [AuthGuardService]},
{path: 'addengagementevidence/:id', component: EngagementEvidenceComponent, canActivate: [AuthGuardService]},
{path: 'viewevidence/:id', component: EvidenceViewComponent, canActivate: [AuthGuardService]},
{path: 'viewinterview/:id', component: InterviewViewComponent, canActivate: [AuthGuardService]},
{path: 'questioncopy/:id', component: QuestionCopyComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
