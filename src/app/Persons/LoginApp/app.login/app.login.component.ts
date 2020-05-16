import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Person } from '../../models/person.interface';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AppAdminComponent } from '../../ADMIN/admin/app.admin.component';
import { AppUserComponent } from '../../USER/user/app.user.component';
@Component({
  selector: 'app-app.login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter , :leave', [
        animate(2000)
      ])
    ])
  ]
})
export class AppLoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
    //private http: HttpClient
  ) { }

  
  appComponent: AppComponent;
  person: Person[];
  per: Person = {
    username: '',
    password: ''
  };
  personList: Array<Person>;
  
  
  public isValid: boolean = false;
  message: any;


  ngOnInit(): void {
    
  }

  public checkLogin(username: string, password: string) {

    this.apiService.getAll().subscribe(data => {
      this.person = data;
      /*if(username === null && password === null){
        alert('Empty fields detected ! Please refill empty fields');
      }*/
      
      for (const pers of this.person) {
        
        if (username === pers.username && password === pers.password) {
          this.isValid = true;
          AppUserComponent.validation = this.isValid;
          AppAdminComponent.validation = this.isValid;
          alert('Login successfull by ' + username);
          if (pers.roles === 'ROLE_ADMIN') {
            
            this.router.navigate(['/root']);
            sessionStorage.setItem('username', username);
          } else if (pers.roles === 'ROLE_USER') {
            this.router.navigate(['/user']);
            sessionStorage.setItem('username', username);
          }
          break;
        }

      
      else {
        AppAdminComponent.validation = false;
       AppUserComponent.validation = false;
        
        alert('Incorrect data');
      }
      }
  } 
    );
  }


 /* login() {
   let resp = this.apiService.login(this.person.username, this.person.password);
   resp.subscribe(data => {
      console.log(data); })
  }*/
  /*public checkLogin() {
    let url = 'http://localhost:8080/api/login';
    let result = this.http.post(url, {
          login: this.person.login,
          password: this.person.password
      }).subscribe(isValid => {
          if (isValid) {
              sessionStorage.setItem(
                'token', btoa(this.person.login + ':' + this.person.password)
              );
          this.router.navigate(['/root']);
          } else {
              alert('Authentication failed.')
          }
      });
}*/
}
