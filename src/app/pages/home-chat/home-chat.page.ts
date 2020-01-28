import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.page.html',
  styleUrls: ['./home-chat.page.scss'],
})
export class HomeChatPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public chatService: ChatService,
  ) {

  }

  ngOnInit() {
    if (this.route.snapshot.data.chats) {
      this.chatService.chats = this.route.snapshot.data.chats.data.profissionalChats;
    }
    console.log(this.chatService.chats);
  }

  public viewChat(pos: number) {
    this.router.navigateByUrl(`chat/${this.chatService.chats[pos].cliente.idcliente}`);
  }

}
