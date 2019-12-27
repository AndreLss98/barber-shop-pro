import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { HistoricoService } from '../services/historico/historico.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoResolverService implements Resolve<any>{

  constructor(
    private historicoService: HistoricoService
  ) {

  }

  resolve() {
    return this.historicoService.getHistorico();
  }
}
