import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

import { cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'item-agenda',
  templateUrl: './item-agenda.component.html',
  styleUrls: ['./item-agenda.component.scss'],
})
export class ItemAgendaComponent implements OnInit {

  @Input() local: string;
  @Input() horario: string;
  @Input() servicos: any[];
  @Input() valor: string;
  @Input() cliente: cliente;

  public isInverted: boolean = false;

  constructor(
    private route: Router,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ngOnInit() {
    this.valor = Number(this.valor).toFixed(2).replace('.', ',');
    this.horario = this.horario.substr(0, 5);
  }

  public cancelService() {
    this.actionSheetCtrl.create({
      header: 'Deseja realmente cancelar o agendamento? Será cobrado uma taxa de cancelamento em seu cartão!',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          role: 'destructive'
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ],
      mode: 'ios'
    }).then((action) => {
      action.present();
    });
  }

  public initializeService() {
    this.route.navigateByUrl('rota');
  }

}
