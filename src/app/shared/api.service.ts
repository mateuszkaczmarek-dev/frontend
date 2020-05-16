import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../Persons/models/person.interface';
import { map } from 'rxjs/operators';
import { Questions } from '../Persons/models/questions/questions.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string = 'http://localhost:8080/api/all';

  person: Person[];
  pers: Person = new Person();
  constructor(private http: HttpClient ) {
  }

  getAll(): Observable<Person[]> {
     return this.http.get<Person[]>('http://localhost:8080/api/all');
  }

  getAllQuestions(): Observable<Questions[]> {
    return this.http.get<Questions[]>('http://localhost:8080/api/allquestions');
  }

  postRegistration(person: Person): Observable<any> {
    return this.http.post('http://localhost:8080/api', person);
  }
//autoryzacja , sprawdzanie czy zalogowany i wylogowywanie
  public login(username: string , password: string) {
    console.log(username+ ':' +password)
    let headers = new HttpHeaders();
    headers.append('Authorization' , 'Basic' + btoa(username + ':' + password));
    return this.http.get('http://localhost:8080/api/login', {headers, responseType: 'text' as 'json'}).pipe(map(userData =>{
      sessionStorage.setItem('login', JSON.stringify(userData));
      return userData;
    }));
  }
  isUserLoggedIn() {
    let person = sessionStorage.getItem('login');
    console.log(!(person == null));
    return !(person == null);
  }

  logout() { 
    sessionStorage.removeItem('login');
  }




}
