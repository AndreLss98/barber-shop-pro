import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { UserService } from 'src/app/services/user.service';
import { BankService } from 'src/app/services/bank/bank.service';

@Component({
  selector: 'agency-data',
  templateUrl: './agency-data.component.html',
  styleUrls: ['./agency-data.component.scss'],
})
export class AgencyDataComponent implements OnInit {

  @Output() deleteAccount = new EventEmitter();

  constructor(
    public bankService: BankService,
    public userService: UserService,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
  ) {

  }

  ngOnInit() {

  }

  public moreOptions(): void {
    if (!this.userService.user.contabancaria) {
      this.openCadastro();
    } else {
      this.openCadastroOptions();
    }
  }

  public openCadastro(): void {
    this.actionCtrl.create({
      mode: 'ios',
      buttons: [
        {
          text: 'Cadastrar',
          handler: () => {
            this.userService.isAccountRegister = true;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then((action) => action.present());
  }

  public openCadastroOptions(): void {
    this.actionCtrl.create({
      mode: 'ios',
      buttons: [
        /* {
          text: 'Editar',
          handler: () => {
            this.userService.isAccountRegister = true;
          }
        }, */
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.bankService.deleteBankAccount().subscribe((response: any) => {
              if (response.errors) {
                console.error(response.errors);
              } else {
                this.userService.user.contabancaria = null;
                this.deleteAccount.emit('deleted');
                this.showAlert('Conta excluída com sucesso!');
              }
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).then((modal) => modal.present());
  }

  public showAlert(message: string) {
    this.alertCtrl.create({
      message,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'Cancel'
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

}
