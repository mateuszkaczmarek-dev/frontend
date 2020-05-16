import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate(2000)
      ])
    ])
  ]
})
export class AppComponent implements OnInit{
  public isLoggedIn = true;
  title = 'newApplication';
  
  constructor(private router: Router ){}
  ngOnInit(): void {
    
  }

  logout(){
    sessionStorage.removeItem('username');
    this.router.navigate(['/home/login']);
  }


}
