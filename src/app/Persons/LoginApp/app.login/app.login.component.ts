import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Person } from '../../models/person.interface';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
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
  ) { }
  appComponent: AppComponent;
  person: Person[];
  personList: Array<Person>;
  
    login: string;
    password: string;
  
  isValid: boolean;
  message: any;


  ngOnInit(): void {

  }

  /*public checkLogin(login: string, password: string) {

    this.apiService.getAll().subscribe(data => {
      this.person = data;

      for (const pers of this.person) {
        if (login === pers.login && password === pers.password) {
          this.isValid = true;
          alert('Login successfull by ' + login);
          if (pers.role === 'ADMIN') {
            this.router.navigate(['/root']);
          }
          break;
        }

      }
      if (!this.isValid) {
        alert('Incorrect data');
      }
    }
    );
  }
*/

  public checkLogin() {
    let resp = this.apiService.login(this.login, this.password);
    resp.subscribe(data => {
      this.message = data;
      this.router.navigate(['/root']);
    });
  }
}
