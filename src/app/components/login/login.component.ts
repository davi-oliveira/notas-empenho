import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Conta } from 'src/app/interfaces/Conta';
import { LogarService } from 'src/app/services/login/logar.service';
import { EmitService } from 'src/app/services/messages/emit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private service: LogarService, public messageService: EmitService) {

  }

  conta: Conta = {
    usuario: "",
    senha: ""
  }

  logged = false;

  async mostrarConta() {
    try{
      let tokenObj = await firstValueFrom(this.service.logar(this.conta))
      console.log('certo: ', tokenObj.tokenJWT)
      this.logged = true;
      localStorage.setItem('token-empenho', tokenObj.tokenJWT);
      console.log("token no storage: ",localStorage.getItem('token-empenho'));

      this.shareLogged();
    }catch(err){
      console.log('erro: ', err)
      this.messageService.setMessage('<strong>Atenção!</strong> Usuário/senha incorretos')
    }
  }
  @Output() loggedBool: EventEmitter<any> = new EventEmitter()
  shareLogged(){
    this.loggedBool.emit({logado: this.logged});
  }
}
