import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../_services/Websocket.service';

@Component({
  selector: 'app-websockets',
  templateUrl: './websockets.component.html',
  styleUrls: ['./websockets.component.css']
})
export class WebsocketsComponent implements OnInit {
  title = 'socketrv';
  content = '';
  received:any=[];
  sent:any=[];


  constructor(private websocketsService: WebsocketService) {
    websocketsService.messages.subscribe(msg => {
      this.received.push(msg);
      console.log("Response from websocket: " + msg);
    });
  }
  
  
  sendMsg() {
    let message = {
      source: '',
      content: ''
    };
    message.source = 'localhost';
    message.content = this.content;

    this.sent.push(message);
    this.websocketsService.messages.next(message);
  }
  ngOnInit(): void {
  }

}
