import { timeout } from 'rxjs/operators';
import { from, Subscription } from 'rxjs';
import { Injectable } from '@angular/core'; 
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Socket } from 'ngx-socket-io';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

import { HTTP_OPTIONS, TIMEOUT_SIZE } from '../constants/http-constants';
import { BASE_URL_GRAPHQL, BASE_URL } from 'src/environments/environment';

import { profissional, valorServico, novoUsuario } from '../models/profissional.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: profissional;
  private _newUser: novoUsuario = new Object() as novoUsuario;
  public isAccountRegister: boolean = false;

  private fileTransfer: FileTransferObject;

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private transfer: FileTransfer,
    private modalCtrl: ModalController
  ) {
    this._newUser.dom = false;
    this._newUser.seg = false;
    this._newUser.ter = false;
    this._newUser.qua = false;
    this._newUser.qui = false;
    this._newUser.sex = false;
    this._newUser.sab = false;
  }

  get user(): profissional {
    return this._user;
  }

  set user(user: profissional) {
    this._user = user;
  }

  get newUser(): novoUsuario {
    return this._newUser;
  }

  set newUser(user: novoUsuario) {
    this._newUser = user;
  }

  public updateValores(novoValorBarba, novoValorCabelo, novoValorBigode) {
    const tempObj: valorServico[] = 
    [
      {
        idtiposervico: 1,
        valor: novoValorCabelo
      },
      {
        idtiposervico: 2,
        valor: novoValorBarba
      },
      {
        idtiposervico: 3,
        valor: novoValorBigode
      }
    ];
    this._user.valores = tempObj;
  }

  public sendRegister() {
    const body =
    `mutation {
      registerProfissional(nome: "${this._newUser.nome}", endereco: "${this._newUser.endereco}", email: "${this._newUser.email}", senha: "${this._newUser.senha}", ddd: ${this._newUser.ddd}, numero: "${this._newUser.numero}",
      dom: ${this._newUser.dom}, seg: ${this._newUser.seg}, ter: ${this._newUser.ter}, qua: ${this._newUser.qua}, qui: ${this._newUser.qui}, sex: ${this._newUser.sex}, sab: ${this._newUser.sab}) {
        idprofissional
      }
    }`;
    return this.http.post(BASE_URL_GRAPHQL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public uploadImg(imagePath: string, endPoint: string, idprofissional: number) {
    this.fileTransfer = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      headers: {idprofissional: idprofissional},
      chunkedMode: false
    }
    return from(this.fileTransfer.upload(imagePath, `${BASE_URL}/pro/${endPoint}`, options));
  }
}
