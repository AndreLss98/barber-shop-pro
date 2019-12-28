import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from './../../../environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from './../../constants/http-constants';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {

  }

  public login(email: string, senha: string) {
    const body =
    `{
      loginProfissional(email: "${ email }", senha: "${ senha }") {
        idprofissional nome sobrenome email
        telefones {
          ddd numero
        }
        diasTrabalho {
          dom seg ter qua qui sex sab
        }
        valores {
          valor idtiposervico
        }
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public changePassword(senha: string) {
    const body =
    `mutation {
      updateProfissionalPassword(idprofissional: ${this.userService.user.idprofissional}, senha: "${senha}")
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
