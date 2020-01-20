import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvisoAgendamentoComponent } from '../aviso-agendamento/aviso-agendamento.component';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-notificacao-agenda',
  templateUrl: './notificacao-agenda.component.html',
  styleUrls: ['./notificacao-agenda.component.scss'],
})
export class NotificacaoAgendaComponent implements OnInit {

  public dia: number;
  public mes: string;
  public nome: string;
  public horario: string;
  public endereco: string;
  public idservico: number;

  constructor(
    private modalCtrl: ModalController,
    private agendaService: AgendaService
  ) {

  }

  ngOnInit() {

  }

  public confirmAgenda() {
    this.modalCtrl.dismiss().then(() => {
      this.modalCtrl.create(({ component: AvisoAgendamentoComponent, componentProps: { endereco: this.endereco } })).then((modal) => modal.present());
    });
  }

  public cancelAgenda() {
    this.agendaService.cancelService(this.idservico).subscribe((response: any) => {
      if (response.errors) {
        console.error(response.errors);
      } else {
        this.modalCtrl.dismiss();
      }
    });
  }

}
