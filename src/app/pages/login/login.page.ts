import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { IntroModalPage } from '../modals/intro-modal/intro-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public login(): void {
    this.modalCtrl.create({ component: IntroModalPage }).then((modal) => modal.present());
  }

}
