import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRegisterComponent } from './Persons/RegisterApp/app.register.component';
import { AppLoginComponent } from './Persons/LoginApp/app.login/app.login.component';
import { AppAdminComponent } from './Persons/ADMIN/admin/app.admin.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  {path: 'home' , component: AppComponent},
  {path: 'register' , component: AppRegisterComponent},
  {path: 'login' , component: AppLoginComponent},
  {path: 'root' , component: AppAdminComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingCompomponents = [AppRegisterComponent, AppLoginComponent, AppAdminComponent ];
