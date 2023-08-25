import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  async ngOnInit() {
    const helper = new JwtHelperService();  
    this.tokenInfo = await helper.decodeToken(this.token)

    this.usuarioLogado.nome = this.tokenInfo.nome_guerra;
    this.usuarioLogado.grad = this.tokenInfo.posto_grad;
  }


  token: any = localStorage.getItem('token-empenho');
  tokenInfo: any;

  usuarioLogado: {
    grad: String,
    nome: String,
  } = {grad: 'P/G', nome: "Nome"}

  mostrarInfos(){
   console.log(this.tokenInfo)
   console.log(localStorage.hasOwnProperty('token-empenho'))
  }

  deslogar(){
    localStorage.removeItem('token-empenho');
  }
}
