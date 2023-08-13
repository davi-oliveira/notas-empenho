import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  conta = {
    user: "",
    password: ""
  }

  logged = false;

  mostrarConta = () => console.log(this.conta)

}
