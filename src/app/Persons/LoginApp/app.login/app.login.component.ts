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
    private router: Router,
    private apiService: ApiService
  ) { }
  appComponent: AppComponent;
  person: Person[];
  per: Person = {
    username: '',
    password: ''
  };
  personList: Array<Person>;


  ngOnInit(): void {
    sessionStorage.clear();
  }

  public checkLogin(username: string, password: string) {


    this.apiService.getAll().subscribe(data => {
      this.person = data;
      let correct = true;
      if (username === '' || password === '') {
          alert('Wypełnij puste pola');
        } else {
      for (const pers of this.person) {

        if (username === pers.username && password === pers.password) {
          correct = true;
          alert('Zalogowałeś się jako ' + username);
          sessionStorage.setItem('username', username);
          this.router.navigate(['/user']);
          break;

        } else if (username !== pers.username && password !== pers.password) {
          correct = false;
        } else {
          correct = true;
        }
      }
      if (!correct) {
      alert('zly login lub hasło');
    }
    }
  });
  }

}
