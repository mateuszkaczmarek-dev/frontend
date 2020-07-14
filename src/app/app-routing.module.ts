import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRegisterComponent } from './Persons/RegisterApp/app.register.component';
import { AppLoginComponent } from './Persons/LoginApp/app.login/app.login.component';
import { AppAdminComponent } from './Persons/ADMIN/admin/app.admin.component';
import { AppComponent } from './app.component';
import { AppUserComponent } from './Persons/USER/user/app.user.component';
import { YesnoComponent } from './Persons/USER/user/yesno/yesno.component';
import { NumericComponent } from './Persons/USER/user/numeric/numeric.component';
import { DescriptionsComponent } from './Persons/USER/user/descriptions/descriptions.component';
import { AboutComponent } from './About/about/about.component';



const routes: Routes = [
  {path: 'home' , component: AppComponent},
  {path: 'register' , component: AppRegisterComponent},
  {path: 'login' , component: AppLoginComponent},
  {path: 'root' , component: AppAdminComponent},
  {path: 'user' , component: AppUserComponent},
  {path: 'user/yesno' , component: YesnoComponent},
  {path: 'user/numeric' , component: NumericComponent},
  {path: 'user/descriptions' , component: DescriptionsComponent},
  {path: 'about' , component: AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingCompomponents = [AppRegisterComponent, AppLoginComponent, AppAdminComponent , AppUserComponent,
   YesnoComponent, NumericComponent , DescriptionsComponent, AboutComponent];
