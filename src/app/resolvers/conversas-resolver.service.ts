import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '../services/user.service';
import { ChatService } from '../services/chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ConversasResolverService implements Resolve<any>{

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    const idcliente: number = +route.paramMap.get('id');
    return this.chatService.getConversas(this.userService.user, idcliente);
  }

}
