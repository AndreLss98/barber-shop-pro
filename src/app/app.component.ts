import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { Component } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { UserService } from './services/user.service';
import { MapService } from './services/map/map.service';
import { GpsService } from './services/gps/gps.service';
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

  private isVisualizedIntro: boolean = false;

  constructor(
    private route: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private mapService: MapService,
    private gpsService: GpsService,
    private network: NetworkService,
    private userService: UserService,
    private menuCtrl: MenuController,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      try {
        this.userService.user = JSON.parse(localStorage.getItem('user'));
        this.isVisualizedIntro = JSON.parse(localStorage.getItem('intro'));
        if (this.isVisualizedIntro && !this.userService.user) {
          this.route.navigateByUrl('/login');
        } else if (this.userService.user) {
          this.route.navigateByUrl('/agenda');
        }
      } catch (error) {
        console.log(error);
      }
      this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString('#313131');
      }
      this.splashScreen.hide();
      this.network.initializeNetworkEvents();
      this.gpsService.requestFullPermission();
      this.mapService.initializeMap();
    });
  }

  public toggleMenu() {
    this.menuCtrl.toggle();
  }

  public navigatePage(page: string) {
    this.route.navigateByUrl(page).then(() => this.toggleMenu());
  }

}
