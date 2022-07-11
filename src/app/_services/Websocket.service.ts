// src\app\services\websocket.service.ts
import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LiveURL } from "../_enums/StaticValues.enum";

// const CHAT_URL = "ws://emphasized-superb-bard.glitch.me/";
const CHAT_URL = LiveURL.WSS_VALUE;
// const CHAT_URL = "ws://localhost:3000/";

export interface Message {
    source: string;
    content: string;
}

@Injectable()
export class WebsocketService {
    private subject: AnonymousSubject<MessageEvent> | undefined;
    public messages: Subject<Message>;

    constructor() {
        this.messages = <Subject<Message>>this.connect(CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log("response: ", response)
                    console.log(response.data);

                    var string1 = JSON.stringify(response.data);
                    let data = JSON.parse(string1);  
                    
                    // let data = JSON.parse(response.data)
                    return data;
                }
            )
        );
    }

    public connect(url: any): AnonymousSubject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url: any): AnonymousSubject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = function() {
                console.log("error!!!!", obs)
                obs.error.bind(obs)
            };
            ws.onclose = function() {
                console.log("connection closed")
                obs.complete.bind(obs)
            };
            return ws.close.bind(ws);
        });
        let observer = { // Type 'null' is not assignable to type '(err: any) => void'
            error: function(){},
            complete: function(){},
            next: (data: Object) => {
                console.log('Message sent to websocket: ', data);
                console.log("ws.readyState", ws.readyState)
                console.log("WebSocket.OPEN",WebSocket.OPEN)
                if (ws.readyState === WebSocket.OPEN) {
                    console.log("inside if statement")
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return new AnonymousSubject<MessageEvent>(observer, observable);
    }
}