import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-modal',
  templateUrl: './intro-modal.page.html',
  styleUrls: ['./intro-modal.page.scss'],
})
export class IntroModalPage implements OnInit {

  constructor(
    private route: Router,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public goToAgenda(): void {
    this.route.navigateByUrl("agenda").then(() => this.modalCtrl.dismiss());
  }

}
