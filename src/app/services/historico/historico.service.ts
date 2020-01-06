import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';
import { servico } from 'src/app/models/servico.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private _servicosRealizados: servico[] = [];
  private _servicosCancelados: servico[] = [];
  private _servicosAvaliados: number[] = [];

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  get servicosRealizados(): servico[] {
    return this._servicosRealizados;
  }

  set servicosRealizados(servicos: servico[]) {
    this._servicosRealizados = servicos;
    this._servicosAvaliados = this._servicosRealizados.map(servico => {
      if (servico.nota) return servico.nota;
    });
    console.log(this._servicosAvaliados);
  }

  get servicosCancelados(): servico[] {
    return this._servicosCancelados;
  }

  set servicosCancelados(servicos: servico[]) {
    this._servicosCancelados = servicos;
  }

  get servicosAvaliados(): number[] {
    return this._servicosAvaliados;
  }

  set servicoAvaliados(avaliacoes: number[]) {
    this._servicosAvaliados = avaliacoes;
  }

  public getRealizados() {
    const body =
    `{
      profissionalServices(idprofissional: ${this.userService.user.idprofissional}) {
        idservico
        dia mes ano horario cancelado
        valortotal nota
        cliente {
          nome
        }
        endereco {
          endereco
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getCancelados() {
    const body =
    `{
      profissionalCanceledService(idprofissional: ${this.userService.user.idprofissional}) {
        dia mes ano valortotal horario cancelado
        cliente {
          nome
        }
        endereco {
          endereco
        }
      }
    }`;

    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
