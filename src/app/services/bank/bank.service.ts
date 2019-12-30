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

  public registerBankAccount({agencia, contacorrente, banco, nome, cnpj}) {
    const body =
    `mutation {
      contabancaria: registerBankAccount(idprofissional: ${this.userService.user.idprofissional}, agencia: ${agencia}, contacorrente: "${contacorrente}", banco: "${banco}", nome: "${nome}", cnpj: "${cnpj}") {
        idcontabancaria agencia contacorrente banco nome cnpj
      }
    }`;
    console.log(body);
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getValues() {
    const body =
    `{
      valores: profissionalServiceValues(idprofissional: ${this.userService.user.idprofissional}) {
        valor idtiposervico
      }
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public updateValues(valorBarba: number, valorCabelo: number, valorBigode: number) { 
    const body =
    `mutation {
      updateServicesValues(idprofissional: ${this.userService.user.idprofissional}, valorBarba: ${valorBarba}, valorCabelo: ${valorCabelo}, valorBigode: ${valorBigode})
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }

  public getPayments() {
    
  }

  public deleteBankAccount() {
    const body =
    `mutation {
      deleteAccount(idcontabancaria: ${this.userService.user.contabancaria.idcontabancaria})
    }`;
    return this.http.post(BASE_URL, body, HTTP_OPTIONS).pipe(timeout(TIMEOUT_SIZE));
  }
}
