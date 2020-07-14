import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingCompomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation/navigation.component';
import { AppUserComponent } from './Persons/USER/user/app.user.component';
import { YesnoComponent } from './Persons/USER/user/yesno/yesno.component';
import { NumericComponent } from './Persons/USER/user/numeric/numeric.component';
import { DescriptionsComponent } from './Persons/USER/user/descriptions/descriptions.component';
import { AboutComponent } from './About/about/about.component';






@NgModule({
  declarations: [
    AppComponent,
    routingCompomponents,
    NavigationComponent,
    AppUserComponent,
    YesnoComponent,
    NumericComponent,
    DescriptionsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
