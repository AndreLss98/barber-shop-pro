import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ganhos',
  templateUrl: './ganhos.page.html',
  styleUrls: ['./ganhos.page.scss'],
})
export class GanhosPage implements OnInit {

  public bankForm: FormGroup;

  public typeView: string = 'saldo';
  public isCadastro: boolean = false;

  constructor(
    private route: Router,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
  ) {
    this.bankForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,}( [a-zA-Z]{2,})+$')]],
      bank: ['', [Validators.required, Validators.pattern('^[\D]{2,}$')]],
      agency: ['', [Validators.required, Validators.pattern('^[1234567890]{3,4}$')]],
      contaCorrente: ['', [Validators.required, Validators.pattern('^[1234567890]{2,10}$')]],
      cpf: [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  ionViewWillLeave() {
    console.log('Estou saindo da tela de ganhos')
    this.userService.isAccountRegister = false;
  }

  public seeAllPayments(): void {
    this.route.navigateByUrl('pagamentos');
  }

  public saveCard(): void {
    this.alertController.create({
      message: 'Dados bancários salvo com sucesso!',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //this.bankService.myBank = this.bankForm.value;
            //this.bankService.isCadastro = false;
          }
        }
      ]
    }).then((alert) => alert.present());
  }

}
