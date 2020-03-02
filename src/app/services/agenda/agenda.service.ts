import { timeout} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BASE_URL_GRAPHQL, BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';
import { servico } from 'src/app/models/servico.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    
  }

  public getAgenda() {
    const body =
    `{
      agendaProfissional(idprofissional: ${this.userService.user.idprofissional}) {
        dia mes ano valortotal horario paymentid
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

  public acceptService(idservico: number) {
    const body =
    `mutation {
      acceptService(idservico: ${idservico})
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public cancelService(paymentid, idservico, idprofissional) {
    let params = new HttpParams()
    .set('idpagamento', paymentid)
    .set('idservico', idservico.toString())
    .set('idprofissional', idprofissional.toString());
    return this.http.post(BASE_URL + '/cancel-service', null, {params}).pipe(timeout(TIMEOUT_SIZE));
  }
}