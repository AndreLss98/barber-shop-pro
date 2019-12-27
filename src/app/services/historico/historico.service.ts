import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';
import { servico } from 'src/app/models/servico.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  private _servicosRealizados: servico[] = [];
  private _servicosCancelados: servico[] = [];

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
  }

  get servicosCancelados(): servico[] {
    return this._servicosCancelados;
  }

  set servicosCancelados(servicos: servico[]) {
    this._servicosCancelados = servicos;
  }

  public getRealizados() {
    const body =
    `{
      profissionalServices(idprofissional: ${this.userService.user.idprofissional}) {
        idservico
        dia mes ano horario cancelado
        valortotal nota
        cliente {
          nome sobrenome
        }
        endereco {
          endereco
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getCancelados() {
    const body =
    `{
      profissionalCanceledService(idprofissional: ${this.userService.user.idprofissional}) {
        dia mes ano valortotal horario cancelado
        cliente {
          nome sobrenome
        }
        endereco {
          endereco
        }
      }
    }`;

    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
