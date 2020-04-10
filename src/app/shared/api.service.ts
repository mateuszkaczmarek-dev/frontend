import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../Persons/models/person.interface';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  person: Person[];
  private BASE_URL = 'http://localhost:8080/';
  private  ALL_REGISTER = `${this.BASE_URL}/api`;
  private ALL_PERSON = `${this.BASE_URL}/api/all`;
  constructor(private http: HttpClient ) {
  }

  getAll(): Observable<Person[]> {
     return this.http.get<Person[]>(this.ALL_PERSON);
  }


  postRegistration(person: Person): Observable<any> {
    return this.http.post(this.ALL_REGISTER, person);
  }
//autoryzacja , sprawdzanie czy zalogowany i wylogowywanie
  public login(login: string, password: string) {
    const headers = new HttpHeaders({Authorization: 'Basic' + btoa(login + ':' + password)});
    return this.http.get('http://localhost:8080/', { headers, responseType: 'text' as 'json'});
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
