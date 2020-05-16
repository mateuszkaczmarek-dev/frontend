import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Person } from '../../models/person.interface';
import { Router } from '@angular/router';
import { AppLoginComponent } from '../../LoginApp/app.login/app.login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './app.admin.component.html',
  styleUrls: ['./app.admin.component.css']
})

export class AppAdminComponent implements OnInit {
  public static validation: boolean;
  constructor(private apiService: ApiService, private router: Router) { }

  person: Person[];
  ngOnInit(): void {
    this.showAllPerson();
  }
  showAllPerson() {
      if(sessionStorage.getItem('username') === null || !(AppAdminComponent.validation)) {
      this.router.navigate(['/login']);
    } else {
      this.apiService.getAll().subscribe(
        data =>
        this.person = data); }
  }
}
