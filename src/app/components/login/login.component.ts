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
      this.logged = true;
      localStorage.setItem('token-empenho', tokenObj.tokenJWT);
      this.messageService.setMessage('Logado com sucesso!', "success", "bx-check")

      this.shareLogged();
    }catch(err){
      this.messageService.setMessage('<strong class="me-1">Atenção!</strong> Usuário/senha incorretos', "danger", "bx-info-circle")
    }
  }
  @Output() loggedBool: EventEmitter<any> = new EventEmitter()
  shareLogged(){
    this.loggedBool.emit({logado: this.logged});
  }
}
