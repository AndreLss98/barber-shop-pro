import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-mes-agenda',
  templateUrl: './mes-agenda.component.html',
  styleUrls: ['./mes-agenda.component.scss'],
})
export class MesAgendaComponent implements OnInit {

  public months: any[] = [];

  constructor(
    private agendaService: AgendaService,
    private popoverCtrl: PopoverController
  ) {

  }

  ngOnInit() {
    this.months = this.agendaService.getMonths();
  }

  public closePopover(pos: number) {
    this.popoverCtrl.dismiss(pos);
  }

}
