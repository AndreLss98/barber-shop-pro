import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { NOME_MESES } from './../../../constants/constants';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-mes-agenda',
  templateUrl: './mes-agenda.component.html',
  styleUrls: ['./mes-agenda.component.scss'],
})
export class MesAgendaComponent implements OnInit {

  readonly NOME_MESES = NOME_MESES;

  constructor(
    private agendaService: AgendaService,
    private popoverCtrl: PopoverController
  ) {

  }

  ngOnInit() {
    
  }

  public closePopover(pos: number) {
    this.popoverCtrl.dismiss(pos);
  }

}
