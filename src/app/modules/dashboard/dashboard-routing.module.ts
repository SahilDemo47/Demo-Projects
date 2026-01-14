import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { StudentlistComponent } from '../studentlist/studentlist.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,   
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent ,data:{title:'Home'}},
      {path:'student',component:StudentlistComponent,data:{title:'Student List'}},
      
{
  path: 'student/:id',
  component: StudentlistComponent,
  data: { title: 'Student List' }
}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
