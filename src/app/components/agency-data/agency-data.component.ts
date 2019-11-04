import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'agency-data',
  templateUrl: './agency-data.component.html',
  styleUrls: ['./agency-data.component.scss'],
})
export class AgencyDataComponent implements OnInit {

  constructor(private actionCtrl: ActionSheetController) {

  }

  ngOnInit() {

  }

  public openActionSheet(): void {
    this.actionCtrl.create({
      mode: 'ios',
      buttons: [
        {
          text: 'Cadastrar'
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).then((action) => action.present());
  }

}
