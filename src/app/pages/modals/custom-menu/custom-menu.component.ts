import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent implements OnInit {

  constructor(
    private route: Router,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public closeMenu() {
    this.modalCtrl.dismiss();
  }

  public navigateMenu(url: string) {
    this.route.navigateByUrl(url).then(() => {
      this.modalCtrl.dismiss();
    });
  }

}
