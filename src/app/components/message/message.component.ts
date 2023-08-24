import { Component, OnInit } from '@angular/core';
import { EmitService } from 'src/app/services/messages/emit.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent{

  constructor(public messageService: EmitService){}
}
