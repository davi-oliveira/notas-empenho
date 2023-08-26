import { Component, OnInit, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EventEmitter } from '@angular/core';

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
    this.usuarioLogado.admin = this.tokenInfo.admin;
  }


  token: any = localStorage.getItem('token-empenho');
  tokenInfo: any;

  usuarioLogado: {
    grad: String,
    nome: String,
    admin: boolean
  } = {grad: 'P/G', nome: "Nome", admin: false}

  mostrarInfos(){
   console.log(this.tokenInfo)
   console.log(localStorage.hasOwnProperty('token-empenho'))
  }

  @Output() loggedBool: EventEmitter<any> = new EventEmitter()
  deslogar(){
    this.loggedBool.emit({logado: false});
    localStorage.removeItem('token-empenho');
  }
}
