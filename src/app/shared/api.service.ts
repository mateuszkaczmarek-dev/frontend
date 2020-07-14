import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../Persons/models/person.interface';
import { map } from 'rxjs/operators';
import { Questions } from '../Persons/models/questions/questions.interface';
import { QuestionsYesNo } from '../Persons/models/questions/questionYesNo.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public API_URL = 'http://localhost:8080/api/all';

  person: Person[];
  pers: Person = new Person();
  constructor(private http: HttpClient ) {
  }

  getAll(): Observable<Person[]> {
     return this.http.get<Person[]>('http://localhost:8080/api/all');
  }

  getAllFirstQuestions(): Observable<QuestionsYesNo[]> {
    return this.http.get<QuestionsYesNo[]>('http://localhost:8080/api/firstQuestionsList');
  }

  getAllSecondQuestions(): Observable<Questions[]> {
    return this.http.get<Questions[]>('http://localhost:8080/api/secondQuestionsList');
  }

  postRegistration(person: Person): Observable<any> {
    return this.http.post('http://localhost:8080/api', person);
  }

  addFirstQuestion(question: QuestionsYesNo): Observable<any> {
    return this.http.post('http://localhost:8080/api/firstQuestions', question);
  }

  addSecondQuestion(question: Questions): Observable<any> {
    return this.http.post('http://localhost:8080/api/secondQuestions', question);
  }

}
