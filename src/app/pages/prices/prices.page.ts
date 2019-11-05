import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {

  constructor(private alertCtrl: AlertController) {

  }

  ngOnInit() {

  }

  public savePrices(): void {
    this.alertCtrl.create({
      message: 'Preços cadastrados com sucesso',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    }).then((alert) => alert.present());
  }

}
