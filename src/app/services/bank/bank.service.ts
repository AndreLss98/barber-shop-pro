import { timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL } from 'src/environments/environment';
import { HTTP_OPTIONS, TIMEOUT_SIZE } from 'src/app/constants/http-constants';

import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  public isCadastro: boolean = false;
  private _myBank = null;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  get myBank() {
    return this._myBank;
  }

  set myBank(myBank) {
    this._myBank = myBank;
  }

  public updateValues(valorBarba: number, valorCabelo: number, valorBigode: number) { 
    const body =
    `mutation {
      updateServicesValues(idprofissional: ${this.userService.user.idprofissional}, valorBarba: ${valorBarba}, valorCabelo: ${valorCabelo}, valorBigode: ${valorBigode})
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
