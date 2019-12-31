import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.page.html',
  styleUrls: ['./intro-modal.page.scss'],
})
export class IntroModalPage implements OnInit {

  constructor(
    private route: Router,
    private statusbar: StatusBar,
    private userService: UserService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
  ) {

  }

  ionViewWillEnter() {
    this.statusbar.hide();
  }

  ngOnInit() {
    this.route.navigateByUrl("agenda");
  }

  public goToAgenda(): void {
    this.statusbar.show();
    this.modalCtrl.dismiss().then(() => {
      
    });
  }

}
