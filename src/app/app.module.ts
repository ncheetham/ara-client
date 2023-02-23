import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientItemComponent } from './client/client-list/client-item/client-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EngagementComponent } from './engagement/engagement.component';
import { EngagementListComponent } from './engagement/engagement-list/engagement-list.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { EngagementEditComponent } from './engagement/engagement-edit/engagement-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card' ;
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { InterviewComponent } from './interview/interview.component';
import { InterviewListComponent } from './interview/interview-list/interview-list.component';
import { InterviewEditComponent } from './interview/interview-edit/interview-edit.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { QuestionComponent } from './question/question.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { QuestionEditComponent } from './question/question-edit/question-edit.component';
import { MeetingTypeComponent } from './meeting-type/meeting-type.component';
import { MeetingTypeListComponent } from './meeting-type/meeting-type-list/meeting-type-list.component';
import { MeetingTypeEditComponent } from './meeting-type/meeting-type-edit/meeting-type-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ClientEngagementComponent } from './client-engagement/client-engagement.component';
import { ClientEngagementListComponent } from './client-engagement/client-engagement-list/client-engagement-list.component';
import { ClientEngagementEditComponent } from './client-engagement/client-engagement-edit/client-engagement-edit.component';
import { AuthComponent } from './auth/auth.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { EvidenceListComponent } from './evidence/evidence-list/evidence-list.component';
import { EvidenceEditComponent } from './evidence/evidence-edit/evidence-edit.component';
import { EvidenceTypeComponent } from './evidence/evidence-type/evidence-type.component';
import { EvidenceTypeEditComponent } from './evidence/evidence-type/evidence-type-edit/evidence-type-edit.component';
import { EvidenceTypeListComponent } from './evidence/evidence-type/evidence-type-list/evidence-type-list.component';
import { EvidenceStatusComponent } from './evidence/evidence-status/evidence-status.component';
import { EvidenceStatusEditComponent } from './evidence/evidence-status/evidence-status-edit/evidence-status-edit.component';
import { EvidenceStatusListComponent } from './evidence/evidence-status/evidence-status-list/evidence-status-list.component';
import { QuestionResolutionMethodComponent } from './question-resolution-method/question-resolution-method.component';
import { QuestionResolutionMethodEditComponent } from './question-resolution-method/question-resolution-method-edit/question-resolution-method-edit.component';
import { QuestionResolutionMethodListComponent } from './question-resolution-method/question-resolution-method-list/question-resolution-method-list.component';
import { QuestionResolutionComponent } from './question-resolution/question-resolution.component';
import { QuestionResolutionEditComponent } from './question-resolution/question-resolution-edit/question-resolution-edit.component';
import { QuestionResolutionListComponent } from './question-resolution/question-resolution-list/question-resolution-list.component';
import { FindingStatusComponent } from './finding-status/finding-status.component';
import { FindingStatusListComponent } from './finding-status/finding-status-list/finding-status-list.component';
import { FindingStatusEditComponent } from './finding-status/finding-status-edit/finding-status-edit.component';
import { ThemeComponent } from './theme/theme.component';
import { ThemeListComponent } from './theme/theme-list/theme-list.component';
import { ThemeEditComponent } from './theme/theme-edit/theme-edit.component';
import { ProcessDomainComponent } from './process-domain/process-domain.component';
import { ProcessDomainEditComponent } from './process-domain/process-domain-edit/process-domain-edit.component';
import { ProcessDomainListComponent } from './process-domain/process-domain-list/process-domain-list.component';
import { ProcessComponent } from './process/process.component';
import { ProcessEditComponent } from './process/process-edit/process-edit.component';
import { ProcessListComponent } from './process/process-list/process-list.component';
import { ToolTechComponent } from './tool-tech/tool-tech.component';
import { ToolTechEditComponent } from './tool-tech/tool-tech-edit/tool-tech-edit.component';
import { ToolTechListComponent } from './tool-tech/tool-tech-list/tool-tech-list.component';
import { EngagementThemeComponent } from './engagement/engagement-theme/engagement-theme.component';
import { EngagementThemeListComponent } from './engagement/engagement-theme/engagement-theme-list/engagement-theme-list.component';
import { EngagementThemeEditComponent } from './engagement/engagement-theme/engagement-theme-edit/engagement-theme-edit.component';
import { IntervieweeComponent } from './interviewee/interviewee.component';
import { IntervieweeEditComponent } from './interviewee/interviewee-edit/interviewee-edit.component';
import { IntervieweeListComponent } from './interviewee/interviewee-list/interviewee-list.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { InterviewStatusComponent } from './interview/interview-status/interview-status.component';
import { InterviewStatusEditComponent } from './interview/interview-status/interview-status-edit/interview-status-edit.component';
import { InterviewStatusListComponent } from './interview/interview-status/interview-status-list/interview-status-list.component';
import { ConductInterviewComponent } from './conduct-interview/conduct-interview.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EngagementQuestionComponent } from './engagement/engagement-question/engagement-question.component';
import { EngagementQuestionListComponent } from './engagement/engagement-question/engagement-question-list/engagement-question-list.component';
import { EngagementQuestionEditComponent } from './engagement/engagement-question/engagement-question-edit/engagement-question-edit.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { EngagementAddComponent } from './engagement/engagement-add/engagement-add.component';
import { EngagementViewComponent } from './engagement/engagement-view/engagement-view.component';
import { InterviewDashboardComponent } from './interview/interview-dashboard/interview-dashboard.component';
import { InterviewAddComponent } from './interview/interview-add/interview-add.component';
import { InterviewsViewComponent } from './interview/interviews-view/interviews-view.component';
import { EvidenceDashboardComponent } from './evidence/evidence-dashboard/evidence-dashboard.component';
import { InterviewEvidenceComponent } from './interview/interview-evidence/interview-evidence.component';
import { EngagementEvidenceComponent } from './engagement/engagement-evidence/engagement-evidence.component';
import { EvidenceViewComponent } from './evidence/evidence-view/evidence-view.component';
import { InterviewViewComponent } from './interview/interview-view/interview-view.component';
import { TeamComponent } from './team/team/team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { ObservationViewComponent } from './observation/observation-view/observation-view.component';
import { ObservationListComponent } from './observation/observation-list/observation-list.component';
import { ObservationAddComponent } from './observation/observation-add/observation-add.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './shared/auth/auth-interceptor.service';
import { QuestionCopyComponent } from './question/question-copy/question-copy.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SurveyViewComponent } from './survey/survey-view/survey-view.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { SurveyCopyListComponent } from './survey/survey-copy-list/survey-copy-list.component';
import { InterviewCopyListComponent } from './interview/interview-copy-list/interview-copy-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientComponent,
    ClientListComponent,
    ClientItemComponent,
    EngagementComponent,
    EngagementListComponent,
    ClientEditComponent,
    EngagementEditComponent,
    InterviewComponent,
    InterviewListComponent,
    InterviewEditComponent,
    UserComponent,
    UserListComponent,
    UserEditComponent,
    QuestionComponent,
    QuestionListComponent,
    QuestionEditComponent,
    MeetingTypeComponent,
    MeetingTypeListComponent,
    MeetingTypeEditComponent,
    ClientEngagementComponent,
    ClientEngagementListComponent,
    ClientEngagementEditComponent,
    AuthComponent,
    EvidenceComponent,
    EvidenceListComponent,
    EvidenceEditComponent,
    EvidenceTypeComponent,
    EvidenceTypeEditComponent,
    EvidenceTypeListComponent,
    EvidenceStatusComponent,
    EvidenceStatusEditComponent,
    EvidenceStatusListComponent,
    QuestionResolutionMethodComponent,
    QuestionResolutionMethodEditComponent,
    QuestionResolutionMethodListComponent,
    QuestionResolutionComponent,
    QuestionResolutionEditComponent,
    QuestionResolutionListComponent,
    FindingStatusComponent,
    FindingStatusListComponent,
    FindingStatusEditComponent,
    ThemeComponent,
    ThemeListComponent,
    ThemeEditComponent,
    ProcessDomainComponent,
    ProcessDomainEditComponent,
    ProcessDomainListComponent,
    ProcessComponent,
    ProcessEditComponent,
    ProcessListComponent,
    ToolTechComponent,
    ToolTechEditComponent,
    ToolTechListComponent,
    EngagementThemeComponent,
    EngagementThemeListComponent,
    EngagementThemeEditComponent,
    IntervieweeComponent,
    IntervieweeEditComponent,
    IntervieweeListComponent,
    InterviewStatusComponent,
    InterviewStatusEditComponent,
    InterviewStatusListComponent,
    ConductInterviewComponent,
    EngagementQuestionComponent,
    EngagementQuestionListComponent,
    EngagementQuestionEditComponent,
    ClientViewComponent,
    ClientAddComponent,
    EngagementAddComponent,
    EngagementViewComponent,
    InterviewDashboardComponent,
    InterviewAddComponent,
    InterviewsViewComponent,
    EvidenceDashboardComponent,
    InterviewEvidenceComponent,
    EngagementEvidenceComponent,
    EvidenceViewComponent,
    InterviewViewComponent,
    TeamComponent,
    TeamListComponent,
    ObservationViewComponent,
    ObservationListComponent,
    ObservationAddComponent,
    ConfirmPasswordDirective,
    LoadingSpinnerComponent,
    QuestionCopyComponent,
    SurveyViewComponent,
    SurveyListComponent,
    SurveyCopyListComponent,
    InterviewCopyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgDynamicBreadcrumbModule,
    MatProgressBarModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
