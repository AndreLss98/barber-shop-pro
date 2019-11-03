import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { Component } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

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
    private menuCtrl: MenuController,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public toggleMenu() {
    this.menuCtrl.toggle();
  }

  public navigatePage(page: string) {
    if (page === "perfil") {
      this.route.navigateByUrl("perfil");
    } else if (page === "cartao") {
      this.route.navigateByUrl("cartoes");
    } else if (page === "historico") {
      this.route.navigateByUrl("historico");
    } else if (page === 'agenda') {
      this.route.navigateByUrl("agenda");
    }else if (page === "chat") {
      this.route.navigateByUrl("home-chat");
    }
    this.toggleMenu();
  }

}
