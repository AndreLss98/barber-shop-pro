import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aviso-agendamento',
  templateUrl: './aviso-agendamento.component.html',
  styleUrls: ['./aviso-agendamento.component.scss'],
})
export class AvisoAgendamentoComponent implements OnInit {

  public endereco: string;

  constructor(
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {

  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

}
