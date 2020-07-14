import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Questions } from 'src/app/Persons/models/questions/questions.interface';
import { ExcelService } from 'src/app/shared/excel.service';
import { QuestionsYesNo } from 'src/app/Persons/models/questions/questionYesNo.interface';

@Component({
  selector: 'app-numeric',
  templateUrl: './numeric.component.html',
  styleUrls: ['./numeric.component.css']
})
export class NumericComponent implements OnInit {

  public static validation = true;
  username: string;
  question: Questions[];
  firstQuestionCount: QuestionsYesNo[];
  secondQuestionCount: Questions[];
  addQuestion: Questions = new Questions();
  min: number;
  max: number;
  answers: Array<number> = [];
  counterNumeric = 0;
  counterYesNo = 0;
  excelConstruct: any = [];
  constructor(private router: Router, private apiService: ApiService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.validate();
    this.listOfFirstQuestion();
    this.listOfSecondQuestion();
  }
  validate() {
    this.username = sessionStorage.getItem('username');
    if (sessionStorage.getItem('username') === null || !(NumericComponent.validation)) {

      this.router.navigate(['/login']);

    } else {
      this.apiService.getAllSecondQuestions().subscribe(data => {
        this.question = data;
      });
    }
  }

  check() {
    let check = 0;
    let i = 0;
    for (const quest of this.question) {
      if (this.answers[i] < quest.min || this.answers[i] > quest.max) {
        check = 1;
      }
      if (this.answers[i] === undefined || this.answers[i] === null) {
        check = 2;
      }
      console.log(this.answers[i]);
      i++;
    }

    // tslint:disable-next-line: align
    if (check === 0) {
      i = 0;
      for (const quest of this.question) {
        this.excelConstruct.push({ Pytanie: quest.question, Odpowiedź: this.answers[i] });
        i++;
      }
      this.excelService.exportExcel(this.excelConstruct, 'pytaniaNumeryczne');
      this.excelConstruct.clear();
    } else if (check === 2) {
      alert('Wpełnij puste pola');
    } else {
      alert('Zle dane min/max');
    }

  }




  add(addQ: string, min: number, max: number) {
    {

      this.addQuestion.question = addQ;
      this.addQuestion.min = min;
      this.addQuestion.max = max;
      console.log(this.addQuestion.question);
      if (this.addQuestion.question != null) {
        this.apiService.addSecondQuestion(this.addQuestion)
          .subscribe(res => {
            location.reload();
            alert('Pytanie dodane.');
          }
          );
      }

    }
  }

  listOfFirstQuestion() {
    this.apiService.getAllFirstQuestions().subscribe(data => {
      this.firstQuestionCount = data;
      for (const quest of this.firstQuestionCount) {
        this.counterYesNo++;
      }
    });

  }

  listOfSecondQuestion() {
    this.apiService.getAllSecondQuestions().subscribe(data => {
      this.secondQuestionCount = data;
      for (const quest of this.secondQuestionCount) {
        this.counterNumeric++;
      }
    });

  }
}

