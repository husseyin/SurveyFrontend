import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { QuestionManagerComponent } from './components/question-manager/question-manager.component';
import { ReportComponent } from './components/report/report.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SurveyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'question-manager', component: QuestionManagerComponent, canActivate: [LoginGuard] },
  { path: 'report', component: ReportComponent , canActivate: [LoginGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
