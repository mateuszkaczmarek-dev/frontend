import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Questions } from 'src/app/Persons/models/questions/questions.interface';
import { AppUserComponent } from '../app.user.component';
import { ExcelService } from 'src/app/shared/excel.service';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css']
})
export class DescriptionsComponent implements OnInit {
  public static validation = true;
  username: string;
  question: Questions[];
  description: string;
  excelConstruct: any = [];

  constructor(private router: Router, private apiService: ApiService , private excelService: ExcelService) { }

  ngOnInit(): void {
  }
  validateUser() {
    this.username = sessionStorage.getItem('username');
    if (sessionStorage.getItem('username') === null || !(DescriptionsComponent.validation)) {

      this.router.navigate(['/login']);
    }
  }



  getDescription(description: string) {

     // tslint:disable-next-line: align
      this.excelConstruct.push({Opis: description});
      this.excelService.exportExcel(this.excelConstruct, 'Opis ');
      this.excelConstruct.clear();
  }

}

