import { Component, OnInit } from '@angular/core';
import { Historico } from 'src/app/models/Historico.model';
import { HistoricoService } from 'src/app/services/historico/historico.service';
import { AvaliacoesService } from 'src/app/services/avaliacoes/avaliacoes.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public abaSelecionada: string = 'realizado';
  public historicoRealizados: Historico[] = [];
  public historicoCancelados: Historico[] = [];
  public avaliacoes = [];

  constructor(
    private historicoService: HistoricoService,
    private avaliacoesServices: AvaliacoesService
  ) {

  }

  ngOnInit() {
    this.historicoRealizados = this.historicoService.getHistorico();
    this.avaliacoes = this.avaliacoesServices.getRatings();
  }

}
