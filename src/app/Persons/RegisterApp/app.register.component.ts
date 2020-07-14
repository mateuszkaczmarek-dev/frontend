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
    //this.getAllPerson();
  }
  postRegistration(ngForm: NgForm): void {
    let check = 0;
    this.apiService.getAll().subscribe(data => {
      this.personTwo = data;
      if (this.person.username != null && this.person.password != null && this.person.email != null) {

        for (const pers of this.personTwo) {
          if (pers.username === this.person.username) {
            check = 1;
          }

        }
      } else if ((this.person.username === null || this.person.password === null || this.person.email === null) ||
      this.person.username === undefined || this.person.password === undefined || this.person.email === undefined) {
        check = 2;
      }
      if (check === 1) {
        alert('Taki login juz istnieje');
      } else if (check === 0) {
        this.apiService.postRegistration(this.person)
          .subscribe(res => {
            location.reload();
            alert('Użytkownik utworzony poprawnie.');
          }
          );
      } else if(check = 2) {
        alert('Wypełnij puste pola');
      }

      /*public getAllPerson() {
            this.apiService.getAll().subscribe(
            res => {
              this.personTwo = res;
            },
            err => {
              alert('An error is accurated');
            }); }*/


    });
  }
}

