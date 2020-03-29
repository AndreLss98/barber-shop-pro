import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
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
    public userService: UserService,
    private bankService: BankService,
    private alertCtrl: AlertController,
  ) {

  }

  ngOnInit() {
    this.valorBarba += this.afterContent;
    this.valorCabelo += this.afterContent;
    this.valorBigode += this.afterContent;

    if (this.userService.user.valores && this.userService.user.valores.length > 0) {
      this.valorBarba = this.userService.user.valores.find(valor => valor.idtiposervico === 2).valor + ',00';
      this.valorCabelo = this.userService.user.valores.find(valor => valor.idtiposervico === 1).valor + ',00';
      this.valorBigode = this.userService.user.valores.find(valor => valor.idtiposervico === 3).valor + ',00';
    }
  }

  public checkInput(value: string) {
    if (value) {
      value = value.replace(/[a-z A-Z]/g, '');
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
          this.userService.updateValores(tempValorBarba, tempValorCabelo, tempValorBigode);
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
