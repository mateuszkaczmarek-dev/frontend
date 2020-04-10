import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Person } from '../../models/person.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './app.admin.component.html',
  styleUrls: ['./app.admin.component.css']
})
export class AppAdminComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  person: Person[];
  ngOnInit(): void {
    this.showAllPerson();
  }

  showAllPerson() {
    this.apiService.getAll().subscribe(
      data =>
      this.person = data
      );
  }
}
