import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvisoAgendamentoComponent } from '../aviso-agendamento/aviso-agendamento.component';

@Component({
  selector: 'app-notificacao-agenda',
  templateUrl: './notificacao-agenda.component.html',
  styleUrls: ['./notificacao-agenda.component.scss'],
})
export class NotificacaoAgendaComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public confirmAgenda() {
    this.modalCtrl.dismiss().then(() => {
      this.modalCtrl.create(({ component: AvisoAgendamentoComponent })).then((modal) => modal.present());
    });
  }

  public cancelAgenda() {
    this.modalCtrl.dismiss();
  }

}
