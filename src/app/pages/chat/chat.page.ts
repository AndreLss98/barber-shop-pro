import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent } from '@ionic/angular';

import { chat } from 'src/app/models/chat.model';

import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  private idcliente: number;
  public currentChat: chat;
  public message: string = '';

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    public chatService: ChatService,
    private userService: UserService,
    private actionSheetCtrl: ActionSheetController
  ) {

  }

  ngOnInit() {
    this.idcliente = +this.route.snapshot.params.id;
    this.currentChat = this.chatService.getCurrentChat(this.idcliente);
    /* if (this.route.snapshot.data['conversas']) {
      this.chatService.setConversas(this.route.snapshot.data['conversas'].data.conversas, this.idcliente);
    } */
    this.updateScreen();
    this.socket.fromEvent('private-message').subscribe((message) => { this.updateScreen() });
  }

  public deleteChat(): void {
    this.actionSheetCtrl.create({
      header: 'Ao excluir, você perderá todas as mensagens.',
      buttons: [
        {
          text: 'Excluir o chat',
          role: 'destructive'
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ],
      mode: 'ios'
    }).then((action) => {
      action.present();
    });
  }

  public sendMessage() {
    if (this.message) {
      const tempMessage = this.message;
      this.message = '';
      this.chatService.sendMessage(this.userService.user, this.idcliente, this.chatService.currentChat.cliente.idsocket, tempMessage).subscribe((response: any) => {
        if (response.error) {
          console.log(response.error);
        } else {
          this.currentChat.conversas.push(response.data.sendMessage);
          this.updateScreen();
        }
      });
    }
  }

  private updateScreen() {
    setTimeout(() => {
      this.content.scrollToBottom(200);
    })
  }

}
