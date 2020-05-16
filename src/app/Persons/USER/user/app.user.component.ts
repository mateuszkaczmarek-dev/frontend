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
  public static validation: boolean;
  username: string;
  question: Questions[];
  constructor(private router: Router , private apiService:ApiService) { }

  ngOnInit(): void {
    this.validateUser();
    }
  validateUser() {
    this.username = sessionStorage.getItem('username');
    if (sessionStorage.getItem('username') === null || !(AppUserComponent.validation)) {
        this.router.navigate(['/login']);
    }
  else{
    this.apiService.getAllQuestions().subscribe(
      data =>
      this.question = data);
  }}
}
