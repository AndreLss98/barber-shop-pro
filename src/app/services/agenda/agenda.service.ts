import { fromEvent } from 'rxjs';
import { timeout, debounceTime } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../user.service';

import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private changeDayEvent = fromEvent(window, 'change-day');

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    
  }

  public getAgenda() {
    const body = 
    `{
      agendaProfissional(idprofissional: ${this.userService.user.idprofissional}) {
        dia mes ano valortotal horario
        idservico
        endereco {
          endereco numero complemento pto_referencia
        }
        servicos {
          nome
        }
        cliente {
          nome
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public updateDiasTrabalho({ dom, seg, ter, qua, qui, sex, sab }) {
    const body =
    `mutation {
      updateDayService(idprofissional: ${this.userService.user.idprofissional}, dom: ${dom}, seg: ${seg}, ter: ${ter}, qua: ${qua}, qui: ${qui}, sex: ${sex}, sab: ${sab})
    }`
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public cancelService(idservico: number) {
    const body =
    `mutation {
      profissionalCancelService(idprofissional: ${this.userService.user.idprofissional}, idservico: ${idservico})
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}