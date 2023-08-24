import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitService{

  constructor() { }

  private msg: String = "";

  getMessage(): String {
    return this.msg;
  }

  setMessage(message: String): void {
    this.msg = message;

    setTimeout(() => this.msg = "", 4000)
  }

}
