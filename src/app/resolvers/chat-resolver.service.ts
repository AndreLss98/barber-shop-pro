import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ChatService } from '../services/chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatResolverService implements Resolve<any>{

  constructor(private chatService: ChatService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    let id = +route.paramMap.get('id');
    return this.chatService.getConversa(id);
  }

}
