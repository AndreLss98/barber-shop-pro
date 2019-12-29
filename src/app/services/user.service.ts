import { Injectable } from '@angular/core';

import { profissional, valorServico } from '../models/profissional.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: profissional;
  public isAccountRegister: boolean = false;

  constructor() {

  }

  get user(): profissional {
    return this._user;
  }

  set user(user: profissional) {
    this._user = user;
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
}
