import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Questions } from '../../models/questions/questions.interface';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './app.user.component.html',
  styleUrls: ['./app.user.component.css']
})
export class AppUserComponent implements OnInit {
  public validation = true;
  username: string;
  questionYesNo: Questions[];
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.validateUser();
  }
  validateUser() {
    this.username = sessionStorage.getItem('username');
    if (sessionStorage.getItem('username') === null || !(this.validation)) {
      this.router.navigate(['/login']);
      console.log(this.validation);
    } else {
      this.router.navigate(['/user']);
    }
  }

  yesno() {
    this.router.navigate(['/user/yesno']);
  }

  numeric() {
    this.router.navigate(['/user/numeric']);
  }

  descriptions() {
    this.router.navigate(['/user/descriptions']);
  }
}
