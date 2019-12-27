import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { AgendaService } from '../services/agenda/agenda.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaResolverService implements Resolve<any> {

  constructor(
    private agendaService: AgendaService
  ) {

  }

  resolve() {
    return this.agendaService.getAgenda();
  }
}
