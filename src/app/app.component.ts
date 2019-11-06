import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { Component } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { NetworkService } from './services/network/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private route: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private network: NetworkService,
    private menuCtrl: MenuController,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString('#313131');
      }
      this.splashScreen.hide();
      this.network.initializeNetworkEvents();
    });
  }

  public toggleMenu() {
    this.menuCtrl.toggle();
  }

  public navigatePage(page: string) {
    this.route.navigateByUrl(page).then(() => this.toggleMenu());
  }

}
