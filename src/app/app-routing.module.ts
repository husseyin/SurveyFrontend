import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionManagerComponent } from './components/question-manager/question-manager.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SurveyComponent },
  { path: 'question-manager', component: QuestionManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
