import { Component, OnInit } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';

import { BASE_URL } from '../../../../environments/environment';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

import { AvisoAgendamentoComponent } from '../aviso-agendamento/aviso-agendamento.component';

@Component({
  selector: 'app-notificacao-agenda',
  templateUrl: './notificacao-agenda.component.html',
  styleUrls: ['./notificacao-agenda.component.scss'],
})
export class NotificacaoAgendaComponent implements OnInit {

  readonly BASE_URL = BASE_URL;

  public dia: number;
  public mes: string;
  public nome: string;
  public horario: string;
  public endereco: string;
  public idservico: number;
  public imgPerfil: string;
  public paymentid: string;
  public servicos: any[] = [];

  constructor(
    private events: Events,
    private modalCtrl: ModalController,
    private agendaService: AgendaService
  ) {

  }

  ngOnInit() {
    this.horario = this.horario.substr(0, 5);
  }

  public confirmAgenda() {
    this.agendaService.acceptService(this.idservico).subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors)
      } else {
        this.events.publish('reload-agenda');
        this.modalCtrl.dismiss().then(() => {
          this.modalCtrl.create(({ component: AvisoAgendamentoComponent, componentProps: { endereco: this.endereco } })).then((modal) => modal.present());
        });
      }
    })
  }

  public cancelAgenda() {
    this.agendaService.cancelService(this.paymentid, this.idservico).subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.modalCtrl.dismiss();
      }
    });
  }

}
