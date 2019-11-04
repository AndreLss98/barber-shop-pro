import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChatService } from 'src/app/services/chat/chat.service';
import { chat } from 'src/app/models/chat.model';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.page.html',
  styleUrls: ['./home-chat.page.scss'],
})
export class HomeChatPage implements OnInit {

  public conversas: chat[];

  constructor(
    private route: Router,
    private chatService: ChatService,
  ) {

  }

  ngOnInit() {
    this.conversas = this.chatService.getConversas();
  }

  public viewChat(pos: number) {
    this.route.navigateByUrl(`chat/${pos}`);
  }

}
