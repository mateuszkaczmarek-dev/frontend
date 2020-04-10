import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Person } from '../models/person.interface';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';





@Component({
  selector: 'app-register',
  templateUrl: './app.register.component.html',
  styleUrls: ['./app.register.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter , :leave', [
        animate(2000)
      ])
    ])
  ]
})


export class AppRegisterComponent implements OnInit {
  personTwo: Person[] = [];
  person: Person = new Person();
 constructor(private apiService: ApiService) { }
  emailPattern = '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$';
  ngOnInit() {
      this.getAllPerson();
  }
postRegistration(ngForm: NgForm): void {
  if (this.person.login != null && this.person.password != null && this.person.email != null) {
  this.apiService.postRegistration(this.person)
      .subscribe( res => {
        location.reload();
        alert('User created successfully.');
      }
      );
 } else {
   alert('Empty fields detected');
 }
 }
public getAllPerson() {
      this.apiService.getAll().subscribe(
      res => {
        this.personTwo = res;
      },
      err => {
        alert('An error is accurated');
      }); }


}


