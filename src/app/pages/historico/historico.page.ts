import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HistoricoService } from 'src/app/services/historico/historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public abaSelecionada: string = 'realizado';

  constructor(
    private route: ActivatedRoute,
    public historicoService: HistoricoService
  ) {

  }

  ngOnInit() {
    if (this.route.snapshot.data.realizados) {
      this.historicoService.servicosRealizados = this.route.snapshot.data.realizados.data.profissionalServices;
    }
    if (this.route.snapshot.data.cancelados) {
      this.historicoService.servicosCancelados = this.route.snapshot.data.cancelados.data.profissionalCanceledService;
    }
  }

}
