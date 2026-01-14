import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
//import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/changepassword.component';
import { LoginDeactivateGuard } from 'src/app/core/guards/login-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },                // /login
  // { path: 'register', component: RegisterComponent },     // /login/register
  // { path: 'change-password', component: ChangePasswordComponent, canDeactivate: [LoginDeactivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
