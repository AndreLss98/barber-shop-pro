import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { servico } from 'src/app/models/servico.model';

import { AvaliacoesService } from 'src/app/services/avaliacoes/avaliacoes.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public abaSelecionada: string = 'realizado';
  public historicoRealizados: servico[] = [];
  public historicoCancelados: servico[] = [];
  public avaliacoes = [];

  constructor(
    private route: ActivatedRoute,
    private avaliacoesServices: AvaliacoesService
  ) {

  }

  ngOnInit() {
    console.log(this.route.snapshot);
  }

}
