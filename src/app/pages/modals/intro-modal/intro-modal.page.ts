import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.page.html',
  styleUrls: ['./intro-modal.page.scss'],
})
export class IntroModalPage implements OnInit {

  constructor(
    private route: Router,
    private statusbar: StatusBar,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.statusbar.hide();
  }

  public goToAgenda(): void {
    this.route.navigateByUrl("agenda").then(() => {
        this.statusbar.show();
        this.modalCtrl.dismiss();
    });
  }

}
