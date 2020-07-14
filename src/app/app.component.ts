import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';
import { AppUserComponent } from './Persons/USER/user/app.user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(2000)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  session = sessionStorage.getItem('username');
  title = 'newApplication';
  value: string;
  spr: number;
  constructor(private router: Router ) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('username') === null) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    sessionStorage.removeItem('username');
    this.router.navigate(['/home/login']);
  }
  check() {
    this.value = sessionStorage.getItem('username');
    if (this.value !== null) {
      this.spr = 1;
    } else {
      this.spr = 0;
    }
    return this.spr;
  }

}
