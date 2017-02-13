import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { Network } from 'ionic-native';
import { NetworkService } from "./app.helper";
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [NetworkService]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, networkService: NetworkService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      let disconnectSubscription = Network.onDisconnect().subscribe(() => {
        networkService.setIsConnected(false);
        alert(networkService.getIsConnected());

      });
      // check network status 
      let connectSubscription = Network.onConnect().subscribe(() => {
        networkService.setIsConnected(true);
        alert(networkService.getIsConnected());
        //  console.log('network connected!');
      });

    })

  }
}
