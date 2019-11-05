import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  public isCadastro: boolean = false;
  private _myBank = null;

  constructor() {

  }

  get myBank() {
    return this._myBank;
  }

  set myBank(myBank) {
    this._myBank = myBank;
  }
}
