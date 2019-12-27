import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { BankService } from 'src/app/services/bank/bank.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {

  public valorBarba: string = '0';
  public valorCabelo: string = '0';
  public valorBigode: string = '0';

  public afterContent: string = ',00';

  constructor(
    private bankService: BankService,
    private alertCtrl: AlertController
  ) {

  }

  ngOnInit() {
    this.valorBarba += this.afterContent;
    this.valorCabelo += this.afterContent;
    this.valorBigode += this.afterContent;
  }

  public checkInput(value: string) {
    if (value) {
      value = value.replace(/[^1234567890]$/g, '');
    }
    return value;
  }

  public removeFloatPart(value: string) {
    return value.slice(0, -3);
  }

  public addFloatPart(value: string) {
    if (!value) {
      return '0,00';
    }
    return value += ",00";
  }

  public checkValues() {
    const tempValorBarba: number = Number(this.removeFloatPart(this.valorBarba));
    const tempValorCabelo: number = Number(this.removeFloatPart(this.valorCabelo));
    const tempValorBigode: number = Number(this.removeFloatPart(this.valorBigode));
    if (tempValorBigode !== 0 && tempValorCabelo !== 0 && tempValorBarba !== 0) {
      this.bankService.updateValues(tempValorBarba, tempValorCabelo, tempValorBigode).subscribe((response: any) => {
        if (response.errors) {
          console.log(response.errors);
        } else {  
  
          this.alertSavePrices();
        }
      });
    }
  }

  public alertSavePrices(): void {
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
