import { Subscription } from 'rxjs';
import { timeout} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';

import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { NotificacaoAgendaComponent } from 'src/app/pages/modals/notificacao-agenda/notificacao-agenda.component';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private notifyListen: Subscription;

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private userService: UserService,
    private modalCtrl: ModalController
  ) {
    
  }

  public startListenAgenda() {
    this.notifyListen = this.socket.fromEvent('new-request').subscribe((request: any) => {
      this.modalCtrl.create({component: NotificacaoAgendaComponent, componentProps: {nome: request.nome, dia: request.dia, mes: request.mes, horario: request.horario, endereco: request.endereco}}).then((modal) => modal.present());
    });
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