import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { cliente } from 'src/app/models/cliente.model';
import { BASE_URL } from '../../../environments/environment';
import { endereco } from 'src/app/models/profissional.model';

import { MapService } from 'src/app/services/map/map.service';

@Component({
  selector: 'item-agenda',
  templateUrl: './item-agenda.component.html',
  styleUrls: ['./item-agenda.component.scss'],
})
export class ItemAgendaComponent implements OnInit {

  readonly BASE_URL = BASE_URL;

  @Input() local: endereco;
  @Input() horario: string;
  @Input() servicos: any[];
  @Input() valor: string;
  @Input() cliente: cliente;
  @Output() cancelService = new EventEmitter();

  public isInverted: boolean = false;

  constructor(
    private route: Router,
    private mapService: MapService,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ngOnInit() {
    this.valor = Number(this.valor).toFixed(2).replace('.', ',');
    this.horario = this.horario.substr(0, 5);
  }

  public showAlertOnCancel() {
    this.actionSheetCtrl.create({
      header: 'Deseja realmente cancelar o agendamento? Será cobrado uma taxa de cancelamento em seu cartão!',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          role: 'destructive',
          handler: () => {
            this.cancelService.emit('canceled');
          }
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
    this.mapService.currentClientAddress = this.local;
    this.route.navigateByUrl('rota');
  }

}
