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

  teste = setInterval(() => console.log(this.logged), 3000);

  onChangeLogged(event: any){
    console.log('chegando aqui: ', event)
    this.logged = event.logado;
  }
}
