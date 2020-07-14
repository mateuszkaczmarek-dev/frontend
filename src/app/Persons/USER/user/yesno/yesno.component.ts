import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Questions } from 'src/app/Persons/models/questions/questions.interface';
import { ExcelService } from 'src/app/shared/excel.service';
import { QuestionsYesNo } from 'src/app/Persons/models/questions/questionYesNo.interface';

@Component({
  selector: 'app-yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.css']
})
export class YesnoComponent implements OnInit {
  public static validation = true;
  username: string;
  firstQuestion: QuestionsYesNo[];
  question: QuestionsYesNo[];
  secondQuestionCount: Questions[];
  addQuestion: QuestionsYesNo = new QuestionsYesNo();
  answers: Array<string> = [];
  counterYesNo = 0;
  counterNumeric = 0;
  excelConstruct: any = [];
  constructor(private router: Router, private apiService: ApiService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.validate();
    this.listOfFirstQuestion();
    this.listOfSecondQuestion();
  }
  validate() {
    this.username = sessionStorage.getItem('username');
    if (sessionStorage.getItem('username') === null || !(YesnoComponent.validation)) {

      this.router.navigate(['/login']);

    } else {
      this.apiService.getAllFirstQuestions().subscribe(
        data =>
          this.firstQuestion = data);
    }
  }
  check() {
    let i = 0;
    let check = 0;

    for (const quest of this.firstQuestion) {
      if (this.answers[i] === null || this.answers[i] === undefined) {
        check = 1;
      }
      i++;
    }
    if (check === 1) {
      alert('Wypełnij wszystkie pola.');
    } else {
      let i = 0;
      // tslint:disable-next-line: align
      for (const quest of this.firstQuestion) {
        this.excelConstruct.push({ Pytanie: quest.question, Odpowiedź: this.answers[i] });
        i++;
      }
      this.excelService.exportExcel(this.excelConstruct, 'pytaniaTakNie');
      this.excelConstruct.clear();
    }
  }

  add(addQ: string) {
    {

      this.addQuestion.question = addQ;
      console.log(this.addQuestion.question);
      if (this.addQuestion.question != null) {
        this.apiService.addFirstQuestion(this.addQuestion)
          .subscribe(res => {
            location.reload();
            alert('Question added.');
          }
          );
      }
    }
  }

  listOfFirstQuestion() {
    this.apiService.getAllFirstQuestions().subscribe(data => {
      this.firstQuestion = data;
      for (const quest of this.firstQuestion) {
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
