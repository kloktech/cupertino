import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { PersonalDashboardComponent } from './personal-dashboard/personal-dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '', pathMatch: 'full', component: MainComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'personal', component: PersonalDashboardComponent },
  { path: '**', redirectTo: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
