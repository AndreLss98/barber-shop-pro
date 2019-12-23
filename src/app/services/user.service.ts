import { Injectable } from '@angular/core';

import { profissional } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: profissional;

  constructor() {

  }

  get user(): profissional {
    return this._user;
  }

  set user(user: profissional) {
    this._user = user;
  }
}
