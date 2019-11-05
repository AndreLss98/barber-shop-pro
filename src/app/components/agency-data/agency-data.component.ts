import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { BankService } from 'src/app/services/bank/bank.service';

@Component({
  selector: 'agency-data',
  templateUrl: './agency-data.component.html',
  styleUrls: ['./agency-data.component.scss'],
})
export class AgencyDataComponent implements OnInit {

  constructor(
    public bankService: BankService,
    private actionCtrl: ActionSheetController,
  ) {

  }

  ngOnInit() {

  }

  public moreOptions(): void {
    if (!this.bankService.myBank) {
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
            this.bankService.isCadastro = true;
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
        {
          text: 'Editar',
          handler: () => {
            this.bankService.isCadastro = true;
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.bankService.myBank = null;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    }).then((moda) => moda.present());
  }

}
