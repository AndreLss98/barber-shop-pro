import { NOME_MESES } from './../../constants/constants';
import { Component, OnInit, Input } from '@angular/core';

import { pagamento } from 'src/app/models/pagamento';

const ONE_HOUR = 3600000;

@Component({
  selector: 'pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss'],
})
export class PagamentosComponent implements OnInit {

  readonly  NOME_MESES = NOME_MESES;

  @Input() pagamento: pagamento;
  
  private date: Date;
  public dia: number;
  public valor: string = '';
  public horarioFormatado: string = '';

  public nomeMes: string;

  constructor() {

  }

  ngOnInit() {
    this.date = new Date(Number(this.pagamento.horario) + ONE_HOUR);
    this.dia = this.date.getDate();
    this.nomeMes = NOME_MESES[this.date.getMonth()].substr(0, 3);
    this.valor = Number(this.pagamento.valor).toFixed(2).replace('.', ',');
    this.horarioFormatado = (this.date.getHours()) + ':' + ("0" + this.date.getMinutes()).substr(-2);
  }

}
