import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { servico } from 'src/app/models/servico.model';

import { AvaliacoesService } from 'src/app/services/avaliacoes/avaliacoes.service';
import { HistoricoService } from 'src/app/services/historico/historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public abaSelecionada: string = 'realizado';
  public avaliacoes = [];

  constructor(
    private route: ActivatedRoute,
    public historicoService: HistoricoService,
    private avaliacoesServices: AvaliacoesService
  ) {

  }

  ngOnInit() {
    console.log(this.route.snapshot.data);
    if (this.route.snapshot.data.realizados) {
      this.historicoService.servicosRealizados = this.route.snapshot.data.realizados.data.profissionalServices;
    }
    if (this.route.snapshot.data.cancelados) {
      this.historicoService.servicosCancelados = this.route.snapshot.data.cancelados.data.profissionalCanceledService;
    }
  }

}
