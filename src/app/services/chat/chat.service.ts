import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { chat, conversa } from 'src/app/models/chat.model';

import { Socket } from 'ngx-socket-io';

import { UserService } from '../user.service';
import { BASE_URL_GRAPHQL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { NotificacaoAgendaComponent } from 'src/app/pages/modals/notificacao-agenda/notificacao-agenda.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private data: any[] = [];
  private _chats: chat[] = [];
  private _currentChat: chat = new Object() as chat;

  private requestListener: Subscription;
  private messageListener: Subscription;

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private userService: UserService,
    private modalCtrl: ModalController
  ) {

  }

  get chats(): chat[] {
    return this._chats;
  }

  set chats(chats: chat[]) {
    this._chats = chats;
  }

  get currentChat(): chat {
    return this._currentChat;
  }

  set currentChat(chat: chat) {
    this._currentChat = chat;
  }

  public setConversas(conversas: conversa[], idcliente: number) {
    this._chats.forEach(chat => {
      if (chat.cliente.idcliente === idcliente) {
        chat.conversas = conversas;
        return;
      }
    });
  }

  public getCurrentChat(idcliente: number): chat {
    this.currentChat = this._chats.find(chat => chat.cliente.idcliente === idcliente);
    return this.currentChat;
  }

  public startConnection() {
    this.socket.connect();
  }

  public afteLogin() {
    this.socket.emit('login-profissional', { idprofissional: this.userService.user.idprofissional });
    this.messageListener = this.socket.fromEvent('private-message').subscribe((message: any) => {
      this._chats.find(chat => chat.cliente.idcliente === message.idcliente).conversas.push({ idcliente: message.idcliente, idprofissional: this.userService.user.idprofissional, iscliente: true, texto: message.texto, dthorario: message.dthorario });
    });

    this.requestListener = this.socket.fromEvent('new-request').subscribe((request: any) => {
      this.modalCtrl.create({component: NotificacaoAgendaComponent, componentProps: {nome: request.nome, dia: request.dia, mes: request.mes, horario: request.horario, endereco: request.endereco, idservico: request.idservico}}).then((modal) => modal.present());
    });
  }

  public getChats({ idprofissional }) {
    const body =
    `{
      profissionalChats(idprofissional: ${idprofissional}) {
        cliente {
          idcliente nome
        }
        conversas {
          iscliente texto dthorario
        }
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getConversas({ idprofissional }, idcliente: number) {
    const body = 
    `{
      conversas(idcliente: ${idcliente}, idprofissional: ${idprofissional}) {
        iscliente texto dthorario
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendMessage({ idprofissional }, idcliente: number, texto: string) {
    const body =
    `mutation {
      sendMessage(idcliente: ${idcliente}, idprofissional: ${idprofissional}, iscliente: false, texto: "${texto}") {
        idprofissional idcliente iscliente dthorario texto
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public sendMessageViaSocket(message: any) {
    this.socket.emit('profissional-send-private-message', message);
  }
}
