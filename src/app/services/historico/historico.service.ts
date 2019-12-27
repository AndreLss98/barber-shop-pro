import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  public getHistorico() {
    const body =
    `{
      profissionalServices(idprofissional: ${this.userService.user.idprofissional}) {
        idservico
        dia mes ano horario
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
}
