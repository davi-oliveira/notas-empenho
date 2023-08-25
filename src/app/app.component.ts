import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

  }
  title = 'notas-empenho';
  logged: boolean = localStorage.hasOwnProperty('token-empenho');

  onChangeLogged(event: any){
    this.logged = event.logado;
  }
}
