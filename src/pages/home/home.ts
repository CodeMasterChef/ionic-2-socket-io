import { Component , NgZone } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Http} from "@angular/http";
import * as io from "socket.io-client";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   messages = [];
   socketHost: any;
   zone: any; 
   chatBox: any;
   socket: any;
    constructor(http: Http) {
        this.messages = [];
        this.socketHost = "http://10.88.111.99:1213";
        this.zone = new NgZone({enableLongStackTrace: false});
        http.get(this.socketHost + "/fetch").subscribe((success) => {
            var data = success.json();
            for(var i = 0; i < data.length; i++) {
                this.messages.push(data[i].message);
            }
        }, (error) => {
            console.log(JSON.stringify(error));
        });
        this.chatBox = "";
        this.socket = io(this.socketHost);
        this.socket.on("message", (msg) => {
            this.zone.run(() => {
                this.messages.push(msg);
            });
        });
    }

    send(message) {
        if(message && message != "") {
            this.socket.emit("message", message);
        }
        this.chatBox = "";
    }

}
