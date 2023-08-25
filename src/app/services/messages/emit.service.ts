import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitService{

  constructor() { }

  private msg: String = "";
  private type: String = "";
  private icon: String = "";

  getMessage() {
    return {
      msg: this.msg,
      type: this.type,
    };
  }

  setMessage(message: String, type: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark", icon: String): void {
    this.msg = `<i class='bx ${icon} msg-icon p-1'></i> ${message}</span>`;
    this.type = type;

    setTimeout(() => this.msg = "", 3000)
  }

}
